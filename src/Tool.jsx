import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ChatPanel from './ChatPanel.jsx'
import GraphView from './GraphView.jsx'
import SiteHeader from './SiteHeader.jsx'
import Seo from './seo.jsx'
import { askAgent, askAgentStream, fetchGraph, fetchRelations, health, entityCount } from './api.js'
import { linkify } from './references.js'
import itC from './locales/it/tool.js'
import enC from './locales/en/tool.js'

// Find graph entities mentioned in an answer → clickable chips that locate them on the graph.
function mentionedEntities(answer, nodeIds) {
  if (!answer) return []
  const text = answer.toLowerCase()
  const hits = []
  for (const id of nodeIds) {
    if (!id || id.length < 4) continue
    if (text.includes(id.toLowerCase())) hits.push(id)
  }
  return Array.from(new Set(hits))
    .sort((a, b) => b.length - a.length)
    .slice(0, 8)
}

// "C.p. art. 575" / "Cost. art. 11" → graph node id "Articolo 575"
function artToNode(label) {
  const m = String(label).match(/(\d+[a-z\-]*)/i)
  return m ? 'Articolo ' + m[1] : label
}

// Mai il grafo intero (vedi Tool.jsx più sotto): tier di caricamento del layer "Concetti".
const GRAPH_TIERS = [300, 1500]

// Layer "Relazioni" (ex singolo layer, ora diviso in "Norme" e "Giurisprudenza" — vedi
// ~/.claude/plans/wiggly-sparking-planet.md): file statico (graph-relations.json, 56k+ nodi/97k+
// link) scaricato per intero una volta (nessun endpoint paginato lato server per questo dataset)
// ma MAI passato per intero a GraphView/react-force-graph. Ogni arco porta già un campo `layer`
// (modifiche/giurisprudenza/pendenze, da gen_relations_graph.py) — isolare "Norme" da
// "Giurisprudenza" è un filtro sui dati già scaricati, non un nuovo fetch.
const VALID_LAYERS = ['concetti', 'norme', 'giurisprudenza']
const LAYER_EDGE_TYPES = { norme: ['modifiche'], giurisprudenza: ['giurisprudenza', 'pendenze'] }
// Tier più bassi per "norme" (pool di partenza molto più grande, ~86k archi contro ~10k).
const RELATIONS_TIERS = { norme: [300, 1500], giurisprudenza: [300, 1200] }

function filterByLayer(full, edgeLayers) {
  if (!full) return null
  const wanted = new Set(edgeLayers)
  const links = full.links.filter((l) => wanted.has(l.layer))
  const ids = new Set()
  for (const l of links) {
    ids.add(typeof l.source === 'object' ? l.source.id : l.source)
    ids.add(typeof l.target === 'object' ? l.target.id : l.target)
  }
  return { nodes: full.nodes.filter((n) => ids.has(n.id)), links }
}

// Se c'è un nodo a fuoco (citazione cliccata in chat) lo include sempre col suo vicinato, poi
// riempie fino al tier coi nodi più connessi (il "contesto generale" più informativo di default).
// Nota verificata sui dati reali: zero archi "modifiche" toccano un nodo costituzionale (tutti i
// 7.855 archi che toccano la Costituzione sono di tipo "giurisprudenza" — sentenze della Consulta,
// non modifiche formali) — la Costituzione quindi non compare mai nella vista "Norme" per costruzione
// dei dati, non per un limite del bounding. Forzarla qui produrrebbe solo nodi isolati senza archi,
// nessun valore aggiunto. La sua rete di collegamenti reali vive nella vista "Giurisprudenza".
function boundRelations(full, focusId, limit) {
  if (!full) return null
  const { nodes, links } = full
  const byId = new Set(nodes.map((n) => n.id))
  const neighbors = new Map()
  for (const l of links) {
    const s = typeof l.source === 'object' ? l.source.id : l.source
    const t = typeof l.target === 'object' ? l.target.id : l.target
    if (!neighbors.has(s)) neighbors.set(s, [])
    if (!neighbors.has(t)) neighbors.set(t, [])
    neighbors.get(s).push(t)
    neighbors.get(t).push(s)
  }
  const keep = new Set()
  if (focusId && byId.has(focusId)) {
    keep.add(focusId)
    for (const nb of neighbors.get(focusId) || []) keep.add(nb)
  }
  const byDegree = [...neighbors.entries()].sort((a, b) => b[1].length - a[1].length)
  for (const [id] of byDegree) {
    if (keep.size >= limit) break
    keep.add(id)
  }
  const keepNodes = nodes.filter((n) => keep.has(n.id))
  const keepLinks = links.filter((l) => {
    const s = typeof l.source === 'object' ? l.source.id : l.source
    const t = typeof l.target === 'object' ? l.target.id : l.target
    return keep.has(s) && keep.has(t)
  })
  return { nodes: keepNodes, links: keepLinks }
}

// The interactive tool (chat + live knowledge graph). Client-only, noindex:
// it has no SEO content of its own and depends on the backend at runtime.
export default function Tool() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  // Pre-filled feedback email opened by the floating CTA.
  const feedbackHref = useMemo(() =>
    'mailto:hello@openlegis.it' +
    '?subject=' + encodeURIComponent(c.feedbackSubject) +
    '&body=' + encodeURIComponent(c.feedbackBody), [c])
  const [params, setParams] = useSearchParams()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [graph, setGraph] = useState({ nodes: [], links: [] })
  // 'concetti' (LightRAG) | 'norme' (modifiche, ex parte di "relazioni") | 'giurisprudenza'
  // (sentenze+pendenze, ex parte di "relazioni"). 'relazioni' è il vecchio valore (bookmark/link
  // esterni) — mappato su 'norme' per compatibilità.
  const layerParam = params.get('layer') === 'relazioni' ? 'norme' : params.get('layer')
  const [layer, setLayer] = useState(VALID_LAYERS.includes(layerParam) ? layerParam : 'concetti')
  const [relations, setRelations] = useState(null)        // {nodes,links} | null (fetch lazy)
  const [relError, setRelError] = useState(false)
  const [focus, setFocus] = useState(null) // {id, n}
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState({ ok: false, model: '' })
  const [entCount, setEntCount] = useState(null)   // totale REALE entità (non il sottoinsieme renderizzato)
  const [view, setView] = useState(params.get('view') === 'explore' ? 'explore' : 'chat')
  const [ctaMini, setCtaMini] = useState(false)   // CTA feedback → sola icona dopo 15s
  const nodeIdsRef = useRef([])
  // Mai il grafo intero: il corpus LightRAG è cresciuto a 31k+ nodi/61k+ archi (ingest discorsi in
  // corso), max_depth=3 su tutto il grafo scala malissimo (20-60s+, a volte il container va giù —
  // vedi ~/.claude/plans/quizzical-swimming-cherny.md, Fase 5). Si parte da un sottoinsieme piccolo
  // e veloce; "Mostra di più" (sotto) è il filtro esplicito per attivarne altri, non un default.
  const [graphTier, setGraphTier] = useState(0)
  const [graphExpanding, setGraphExpanding] = useState(false)
  // Dataset completo del layer Relazioni (scaricato una volta, mai reso per intero — vedi
  // boundRelations sopra). Un ref: non deve ri-renderizzare, GraphView riceve solo `relations`.
  // Tier per-layer (norme/giurisprudenza hanno pool di partenza molto diversi, vedi sopra).
  const relationsFullRef = useRef(null)
  const [relationsTier, setRelationsTier] = useState({ norme: 0, giurisprudenza: 0 })
  const [relationsExpanding, setRelationsExpanding] = useState(false)

  const expandGraph = useCallback(() => {
    const next = graphTier + 1
    if (next >= GRAPH_TIERS.length || graphExpanding) return
    setGraphExpanding(true)
    fetchGraph(GRAPH_TIERS[next])
      .then((g) => { setGraph(g); nodeIdsRef.current = g.nodes.map((n) => n.id); setGraphTier(next) })
      .catch((e) => console.error('graph expand', e))
      .finally(() => setGraphExpanding(false))
  }, [graphTier, graphExpanding])

  const loadRelations = useCallback((focusId, targetLayer) => {
    fetchRelations()
      .then((g) => {
        relationsFullRef.current = g
        const sliced = filterByLayer(g, LAYER_EDGE_TYPES[targetLayer])
        setRelations(boundRelations(sliced, focusId, RELATIONS_TIERS[targetLayer][0]))
        setRelationsTier((t) => ({ ...t, [targetLayer]: 0 }))
      })
      .catch(() => setRelError(true))
  }, [])

  // Già scaricato per intero (file statico): "Mostra di più" è solo un ricalcolo client-side sullo
  // stesso dataset (filtrato per il layer corrente), nessuna nuova richiesta di rete.
  const expandRelations = useCallback(() => {
    const tiers = RELATIONS_TIERS[layer]
    if (!tiers || relationsExpanding || !relationsFullRef.current) return
    const cur = relationsTier[layer] ?? 0
    const next = cur + 1
    if (next >= tiers.length) return
    setRelationsExpanding(true)
    const sliced = filterByLayer(relationsFullRef.current, LAYER_EDGE_TYPES[layer])
    setRelations(boundRelations(sliced, focus?.id, tiers[next]))
    setRelationsTier((t) => ({ ...t, [layer]: next }))
    setRelationsExpanding(false)
  }, [layer, relationsTier, relationsExpanding, focus])

  useEffect(() => {
    fetchGraph(GRAPH_TIERS[0])
      .then((g) => { setGraph(g); nodeIdsRef.current = g.nodes.map((n) => n.id) })
      .catch((e) => console.error('graph load', e))
    entityCount().then((n) => { if (n) setEntCount(n) }).catch(() => {})
    health()
      .then((h) => setStatus({ ok: h.status === 'healthy', model: h.configuration?.llm_model || '' }))
      .catch(() => setStatus({ ok: false, model: '' }))
    // deep-link ?layer=norme|giurisprudenza (già limitato, mai il file intero)
    if (layer !== 'concetti') loadRelations(null, layer)
    const t = setTimeout(() => setCtaMini(true), 15000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const focusEntity = useCallback((id) => {
    setFocus((f) => ({ id, n: (f?.n || 0) + 1 }))
    setSelected(null)
  }, [])

  // Cambio layer del grafo: «Concetti» (LightRAG) ↔ «Norme» (modifiche) ↔ «Giurisprudenza»
  // (sentenze+pendenze). Le due viste relazionali condividono lo stesso dataset già scaricato
  // (relationsFullRef) — cambiare layer è solo un re-filtro, mai un nuovo fetch dopo il primo.
  const switchLayer = useCallback((next) => {
    setSelected(null)
    setLayer(next)
    if (next === 'concetti') return
    if (!relationsFullRef.current) {
      if (!relError) loadRelations(null, next)
      return
    }
    const sliced = filterByLayer(relationsFullRef.current, LAYER_EDGE_TYPES[next])
    setRelations(boundRelations(sliced, null, RELATIONS_TIERS[next][relationsTier[next] ?? 0]))
  }, [relError, loadRelations, relationsTier])

  // Citazione → layer relazionale: sceglie Norme o Giurisprudenza in base al TIPO di id (sentenza:/
  // pendenza: → Giurisprudenza, eli: → Norme — un click su una citazione di sentenza non deve aprire
  // la vista sbagliata), poi commuta layer (carica lazy) e focalizza il nodo. Se il dataset completo
  // è già in memoria, ricalcola subito il sottoinsieme centrato sul nodo (nessun fetch); altrimenti
  // il primo fetch lo centra direttamente (evita di mostrare prima il default generico).
  // GraphView centra il nodo dopo il warmup del layout (vedi onEngineStop).
  const focusRelations = useCallback((eli) => {
    const targetLayer = eli.startsWith('sentenza:') || eli.startsWith('pendenza:') ? 'giurisprudenza' : 'norme'
    setSelected(null)
    setLayer(targetLayer)
    setFocus((f) => ({ id: eli, n: (f?.n || 0) + 1 }))
    if (relationsFullRef.current) {
      const sliced = filterByLayer(relationsFullRef.current, LAYER_EDGE_TYPES[targetLayer])
      setRelations(boundRelations(sliced, eli, RELATIONS_TIERS[targetLayer][relationsTier[targetLayer] ?? 0]))
    } else if (!relError) {
      loadRelations(eli, targetLayer)
    }
  }, [relError, loadRelations, relationsTier])

  // Anteprima testo verbatim degli articoli: indice statico lazy (norme-text.json).
  const normaTextRef = useRef(null)
  const loadNormaText = useCallback(async (eli) => {
    if (!normaTextRef.current) {
      try {
        const r = await fetch('/norme-text.json')
        normaTextRef.current = r.ok ? await r.json() : {}
      } catch { normaTextRef.current = {} }
    }
    return normaTextRef.current[eli] || null
  }, [])

  // Costruisce il messaggio agente finale dal dict di risposta (riusato da streaming + fallback JSON).
  const buildMsg = useCallback((res) => {
    const answer = res.answer || c.noAnswer
    const articoli = (res.articoli_citati || []).map((label) => ({ label, node: artToNode(label) }))
    const datasets = res.dataset || []
    const statistiche = res.statistiche || []
    const novita = res.novita_normative || []
    const tools = (res.tools_used || []).map((t) => t.tool)
    const entities = mentionedEntities(answer, nodeIdsRef.current)
    const openpolis = {
      parlamentari: res.parlamentari || [],
      indiceForza: res.indice_di_forza || [],
      profilo: res.profilo && res.profilo.trovato ? res.profilo : null,
      votazioni: res.votazioni || [],
      decreti: res.decreti_legge || [],
      organi: res.organi_parlamentari || [],
    }
    const { text: content, refs } = linkify(answer, {
      articoli,
      sentenzeCost: res.sentenze_cost || [],
      giurisprudenza: res.giurisprudenza_su || [],
      sentenzeCass: res.sentenze_cassazione || [],
      sentenzeUe: res.sentenze_ue || [],
      attiUe: res.atti_ue || [],
      dataset: datasets, statistiche, novita,
    })
    return { role: 'agent', streaming: false, content, refs, processo: res.processo || [],
             articoli, datasets, statistiche, novita, tools, entities, openpolis }
  }, [c])

  const handleSend = useCallback(
    async (q) => {
      // user + placeholder agente in streaming (mostra il «Processo» dal vivo)
      setMessages((prev) => [...prev, { role: 'user', content: q }, { role: 'agent', streaming: true, processo: [], content: '' }])
      setLoading(true)
      const replaceLast = (msg) => setMessages((prev) => { const c = [...prev]; c[c.length - 1] = msg; return c })
      // Risolve ogni step ancora «running» nel processo allo stato passato (es. 'ok' a fine
      // risposta, 'errore' su drop del transport): se il backend non invia mai uno stato
      // terminale, lo spinner non resta comunque a girare per sempre.
      const resolveRunning = (steps, status) =>
        (steps || []).map((s) => (s.status === 'running' ? { ...s, status } : s))
      const finalize = (res) => {
        const msg = buildMsg(res)
        // se la risposta non ricostruisce il processo, conserva quello live ma chiudi gli step aperti
        setMessages((prev) => {
          const arr = [...prev]; const live = arr[arr.length - 1]
          // chiudi SEMPRE eventuali step «running» (sia col processo dal backend, sia conservando
          // quello live): risposta mostrata ⇒ nessuno spinner che gira in eterno
          const processo = resolveRunning(
            (msg.processo && msg.processo.length) ? msg.processo : (live && live.processo),
            'ok',
          )
          arr[arr.length - 1] = { ...msg, processo }
          return arr
        })
        const focusTarget = (msg.articoli[0] && msg.articoli[0].node) || msg.entities[0]
        if (focusTarget) focusEntity(focusTarget)
      }
      const setErr = (e) => replaceLast({
        role: 'agent',
        content: e.status === 429 ? c.errRate(e.message)
          : e.status === 401 || e.status === 403 ? c.errAuth(e.message)
            : c.errAgent(e.message),
      })
      try {
        let answered = false, streamErr = null
        await askAgentStream(q, null, {
          onStep: (ev) => setMessages((prev) => {
            const c = [...prev]; const m = { ...c[c.length - 1] }; const p = [...(m.processo || [])]
            if (ev.type === 'step_start') p.push({ tool: ev.tool, label: ev.label, fonte: ev.fonte, query: ev.query, status: 'running' })
            else if (p.length) {
              // accoppia lo step_end allo step con lo stesso `tool` ancora «running» (fallback: l'ultimo):
              // un frame SSE perso o riordinato non lascia più uno step a girare in eterno
              let idx = p.length - 1
              for (let i = p.length - 1; i >= 0; i--) { if (p[i].status === 'running' && p[i].tool === ev.tool) { idx = i; break } }
              p[idx] = { ...p[idx], status: ev.status, count: ev.count, quality: ev.quality, note: ev.note, ms: ev.ms }
            }
            m.processo = p; c[c.length - 1] = m; return c
          }),
          onAnswer: (res) => { answered = true; finalize(res) },
          onError: (e) => { streamErr = e },
        })
        if (!answered) throw streamErr || new Error('stream interrotto')
      } catch (e) {
        // Streaming non disponibile / interrotto → fallback alla richiesta JSON classica
        try { finalize(await askAgent(q)) } catch (e2) { setErr(e2) }
        // Se il messaggio resta in streaming (placeholder mai sostituito) o conserva uno step
        // «running», chiudi spinner e step: nessuna rotella perpetua su drop del transport.
        setMessages((prev) => {
          const arr = [...prev]; const m = arr[arr.length - 1]
          if (m && m.role === 'agent' && (m.streaming || (m.processo || []).some((s) => s.status === 'running'))) {
            arr[arr.length - 1] = { ...m, streaming: false, processo: resolveRunning(m.processo, 'errore') }
          }
          return arr
        })
      } finally {
        setLoading(false)
      }
    },
    [buildMsg, focusEntity, c],
  )

  const askAboutNode = useCallback(
    (node) => {
      setSelected(null)
      setView('chat')
      handleSend(c.askAboutNode(node))
    },
    [handleSend, c],
  )

  // Honor a question / view passed from the landing page (?q=…&view=explore),
  // then strip the params so a refresh doesn't re-ask.
  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    const q = params.get('q')
    if (q) {
      didInit.current = true
      handleSend(q)
      setParams({}, { replace: true })
    }
  }, [params, handleSend, setParams])

  return (
    <>
      <Seo path="/app" title={c.seoTitle} noindex />
      <SiteHeader variant="app" status={status} graphCount={entCount ?? graph.nodes.length} view={view} setView={setView} />

      <main className={`app-main ${view === 'explore' ? 'explore' : ''}`}>
        {view === 'chat' && (
          <ChatPanel
            messages={messages}
            loading={loading}
            onSend={handleSend}
            onFocusEntity={focusEntity}
            onFocusRelations={focusRelations}
            loadText={loadNormaText}
            onExplore={() => setView('explore')}
          />
        )}
        <GraphView
          key={layer}
          data={layer === 'concetti' ? graph : (relations || { nodes: [], links: [] })}
          layer={layer}
          onLayerChange={switchLayer}
          relLoading={layer !== 'concetti' && !relations && !relError}
          focus={focus}
          selected={selected}
          onSelect={setSelected}
          onClear={() => setSelected(null)}
          onAsk={askAboutNode}
          onExpand={
            layer === 'concetti' ? (graphTier < GRAPH_TIERS.length - 1 ? expandGraph : undefined)
              : ((relationsTier[layer] ?? 0) < RELATIONS_TIERS[layer].length - 1 ? expandRelations : undefined)
          }
          expanding={layer === 'concetti' ? graphExpanding : relationsExpanding}
        />
      </main>

      <a className={`feedback-cta ${ctaMini ? 'mini' : ''}`} href={feedbackHref} title={c.feedbackTitle}>
        <span className="feedback-cta-icon">✉</span>
        <span className="feedback-cta-text">
          <b>{c.feedbackHeading}</b>
          <span>{c.feedbackSub}</span>
        </span>
      </a>
    </>
  )
}
