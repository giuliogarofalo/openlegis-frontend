import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ForceGraph2D from 'react-force-graph-2d'
import itC from './locales/it/graph.js'
import enC from './locales/en/graph.js'

const FIXED = {
  articolo: '#c9a24b', principio: '#e0bd6a', diritto: '#5aa385', dovere: '#7fa9a0',
  reato: '#c65a48', sanzione: '#d2785f', istituto: '#6592b8', organo: '#8a86d6',
  soggetto: '#93a08a', fonte: '#b08968',
  // layer "Norme"/"Giurisprudenza" (ex "Relazioni", archi ELI) — costituzionale/primario/secondario
  // sostituisce il vecchio flag flat "norma"/"articolo" (vedi ~/.claude/plans/wiggly-sparking-planet.md):
  // gradiente di autorità, dal più al meno vincolante.
  costituzionale: '#e0bd6a', primario: '#b08968', secondario: '#8a8678',
  sentenza: '#8a86d6', atto: '#c65a48',
  person: '#c9a24b', organization: '#5aa385', geo: '#6592b8', location: '#6592b8',
  event: '#c65a48', category: '#93a08a', concept: '#93a08a',
  altro: '#8a8678', other: '#8a8678', unknown: '#8a8678',
  // grafo PNRR (aziende↔appalti, pagina /pnrr)
  progetto: '#c65a48', appalto: '#8a86d6', ente: '#6592b8', azienda: '#5aa385',
}
const PALETTE = ['#c9a24b', '#5aa385', '#6592b8', '#c65a48', '#93a08a', '#b08968', '#cdbb86', '#8a86d6']

// Colore degli archi per TIPO di relazione (layer "Relazioni"). Default per il grafo concetti.
const LINK_DEFAULT = 'rgba(201,162,75,0.13)'
const LINK_COLORS = {
  modifica: 'rgba(101,146,184,0.45)', sostituisce: 'rgba(101,146,184,0.45)',
  inserisce: 'rgba(90,163,133,0.45)', convertito_in: 'rgba(127,169,160,0.5)',
  proroga: 'rgba(160,150,110,0.45)',
  abroga: 'rgba(198,90,72,0.5)',
  dichiara_incostituzionale: 'rgba(198,90,72,0.6)', inammissibile: 'rgba(138,134,120,0.4)',
  infondata: 'rgba(90,163,133,0.4)', giudica: 'rgba(138,134,214,0.4)',
  impugnata: 'rgba(224,189,106,0.5)',
}
// ordine dei tipi di relazione nella legenda (le etichette vivono nei file locale, c.relLabels).
// Separati per layer (Norme vs Giurisprudenza, ex un'unica legenda "Relazioni" con tutti e 11 i
// tipi insieme — vedi ~/.claude/plans/wiggly-sparking-planet.md): mostrare qui gli 11 tipi in
// entrambe le viste sarebbe di nuovo l'accozzaglia che si sta correggendo.
const REL_KEYS_BY_LAYER = {
  norme: ['modifica', 'abroga', 'sostituisce', 'inserisce', 'convertito_in', 'proroga'],
  giurisprudenza: ['dichiara_incostituzionale', 'infondata', 'inammissibile', 'giudica', 'impugnata'],
}

function NodeCard({ node, neighbors, onAsk, onClose, onPick, labelOf, c }) {
  return (
    <div className="node-card">
      <div className="type">{node.type}</div>
      <h3>{node.label || node.id}</h3>
      {node.sentenze && node.sentenze.tot ? (
        <div className="nc-sent">⚖ {c.sentenze(node.sentenze.tot)}
          {node.sentenze.incostituzionale ? ` · ${c.incostituzionali(node.sentenze.incostituzionale)}` : ''}</div>
      ) : null}
      <p>{node.description || c.noDescription}</p>
      {neighbors.length ? (
        <>
          <div className="nc-label">{c.connectedTo}</div>
          <div className="nc-neighbors">
            {neighbors.map((nb) => (
              <span key={nb} className="nc-chip" onClick={() => onPick(nb)}>{labelOf ? labelOf(nb) : nb}</span>
            ))}
          </div>
        </>
      ) : null}
      <div className="actions">
        <button className="ask" onClick={() => onAsk(node)}>{c.ask}</button>
        <button className="close" onClick={onClose}>{c.close}</button>
      </div>
    </div>
  )
}

export default function GraphView({ data, focus, selected, onSelect, onClear, onAsk,
                                    layer = 'concetti', onLayerChange, relLoading = false, initialHidden = [],
                                    copy = {}, onExpand, expanding = false }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const fgRef = useRef(null)
  const wrapRef = useRef(null)
  const colorCache = useRef(new Map())
  const [size, setSize] = useState({ w: 800, h: 600 })
  // Bug reale (mobile): .graph-pane monta con `display:none` in vista Chat (Tool.jsx tiene
  // GraphView sempre montato, css .app-main .graph-pane{display:none}, mostrato solo in
  // .explore). ResizeObserver non riporta mai una dimensione utile per un elemento display:none,
  // quindi il fit automatico su onEngineStop scatta sul default 800×600 mentre il pannello è
  // ancora invisibile. Quando l'utente passa a "Grafo" il pannello ottiene la sua vera
  // dimensione (spesso molto diversa, es. ~627×625 su telefono) ma lo zoom/pan calcolato per
  // 800×600 non si ricalcola da solo — risultato: canvas vuoto o quasi, i nodi restano fuori
  // dal frame. Questi due ref fanno scattare UN SOLO re-fit di recupero, la prima volta che il
  // pannello riceve una dimensione reale DOPO che la simulazione si è già fermata — non ad ogni
  // resize successivo, per non disturbare lo zoom/pan che l'utente ha eventualmente già impostato.
  const engineStoppedRef = useRef(false)
  const catchUpFitDoneRef = useRef(false)
  const [hidden, setHidden] = useState(() => new Set(initialHidden))
  const [term, setTerm] = useState('')
  const isRel = layer === 'norme' || layer === 'giurisprudenza'
  // Le legende partono chiuse su mobile (schermo piccolo), aperte su desktop.
  const isNarrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
  const [legendOpen, setLegendOpen] = useState(!isNarrow)
  const [relLegendOpen, setRelLegendOpen] = useState(!isNarrow)
  // Explainer «cos'è / come si legge»: aperto alla prima visita, poi collassa a pillola (persistito).
  const helpKey = 'op-graph-help-seen-' + layer   // per-layer: Concetti e Relazioni vanno spiegati entrambi
  const [helpOpen, setHelpOpen] = useState(() => {
    try { return !localStorage.getItem(helpKey) } catch { return true }
  })
  const dismissHelp = useCallback(() => {
    setHelpOpen(false)
    try { localStorage.setItem(helpKey, '1') } catch { /* storage non disponibile */ }
  }, [helpKey])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      const w = Math.max(120, cr.width), h = Math.max(120, cr.height)
      setSize({ w, h })
      if (engineStoppedRef.current && !catchUpFitDoneRef.current && cr.width > 0 && cr.height > 0) {
        catchUpFitDoneRef.current = true
        requestAnimationFrame(() => fgRef.current?.zoomToFit(400, 50))
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const colorFor = useCallback((type) => {
    const t = (type || 'altro').toLowerCase()
    if (FIXED[t]) return FIXED[t]
    const c = colorCache.current
    if (!c.has(t)) c.set(t, PALETTE[c.size % PALETTE.length])
    return c.get(t)
  }, [])

  // type list + counts (over the FULL data, for the legend/filter)
  const types = useMemo(() => {
    const m = new Map()
    for (const n of data.nodes) m.set(n.type, (m.get(n.type) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [data.nodes])

  // graph data filtered by hidden types + degree sizing + color
  const graphData = useMemo(() => {
    const visible = data.nodes.filter((n) => !hidden.has(n.type))
    const ids = new Set(visible.map((n) => n.id))
    const links = data.links.filter((l) => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      return ids.has(s) && ids.has(t)
    })
    const deg = {}
    links.forEach((l) => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      deg[s] = (deg[s] || 0) + 1; deg[t] = (deg[t] || 0) + 1
    })
    return {
      nodes: visible.map((n) => ({ ...n, _c: colorFor(n.type), _r: 2.5 + Math.min(9, Math.sqrt(deg[n.id] || 0) * 1.7) })),
      links: links.map((l) => ({ source: (typeof l.source === 'object' ? l.source.id : l.source), target: (typeof l.target === 'object' ? l.target.id : l.target), type: l.type })),
    }
  }, [data, hidden, colorFor])

  const dataRef = useRef(graphData)
  dataRef.current = graphData

  const focusById = useCallback((id, ms = 700) => {
    const n = dataRef.current.nodes.find((x) => x.id === id)
    if (n && n.x != null && fgRef.current) {
      fgRef.current.centerAt(n.x, n.y, ms); fgRef.current.zoom(4.5, ms)
    }
    return n
  }, [])

  // external focus (citation click from chat)
  const focusId = focus && focus.id
  useEffect(() => { if (focusId) focusById(focusId) /* eslint-disable-next-line */ }, [focus])

  const selectedId = selected && selected.id
  const paintNode = useCallback((node, ctx, scale) => {
    const r = node._r || 3
    const isFocus = node.id === focusId
    const isSel = node.id === selectedId
    if (isFocus || isSel) {
      ctx.beginPath(); ctx.arc(node.x, node.y, r + 7, 0, 2 * Math.PI)
      ctx.fillStyle = isFocus ? 'rgba(224,189,106,0.30)' : 'rgba(236,230,216,0.12)'; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 2 * Math.PI)
    ctx.fillStyle = node._c; ctx.fill()
    if (isFocus) { ctx.lineWidth = 1.6 / scale; ctx.strokeStyle = '#e0bd6a'; ctx.stroke() }
    // Etichette: i nodi-hub (r>4, cioè più connessi) sono sempre etichettati così il grafo si
    // legge come una mappa già allo zoom iniziale; oltre 1.6× si etichetta anche il resto.
    if (scale > 1.6 || r > 4 || isFocus || isSel) {
      const disp = node.label || node.id
      const label = disp.length > 30 ? disp.slice(0, 29) + '…' : disp
      ctx.font = `${Math.max(3, 10 / scale)}px 'IBM Plex Mono', monospace`
      ctx.fillStyle = isFocus ? '#e0bd6a' : 'rgba(236,230,216,0.82)'
      ctx.textAlign = 'center'; ctx.textBaseline = 'top'
      ctx.fillText(label, node.x, node.y + r + 2 / scale)
    }
  }, [focusId, selectedId])

  const neighbors = useMemo(() => {
    if (!selectedId) return []
    const out = new Set()
    for (const l of data.links) {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      if (s === selectedId) out.add(t)
      else if (t === selectedId) out.add(s)
    }
    return [...out].slice(0, 10)
  }, [selectedId, data.links])

  const labelById = useMemo(() => {
    const m = new Map()
    for (const n of data.nodes) m.set(n.id, n.label || n.id)
    return m
  }, [data.nodes])
  const labelOf = useCallback((id) => labelById.get(id) || id, [labelById])

  const doSearch = (e) => {
    e.preventDefault()
    const q = term.trim().toLowerCase()
    if (!q) return
    const hit = data.nodes.find((n) => (n.label || n.id).toLowerCase().includes(q) && !hidden.has(n.type))
    if (hit) { onSelect(hit); focusById(hit.id) }
  }
  const pick = (id) => { const n = data.nodes.find((x) => x.id === id); if (n) { onSelect(n); focusById(id) } }
  const toggleType = (t) => setHidden((h) => { const s = new Set(h); s.has(t) ? s.delete(t) : s.add(t); return s })

  // Controlli di navigazione (utili senza touch/touchpad): zoom relativo + adatta alla vista.
  const zoomBy = useCallback((factor) => {
    const fg = fgRef.current
    if (!fg) return
    const z = fg.zoom() || 1
    fg.zoom(Math.max(0.15, Math.min(40, z * factor)), 220)
  }, [])
  const fitView = useCallback(() => { fgRef.current?.zoomToFit(420, 50) }, [])

  return (
    <div className="graph-pane" ref={wrapRef}>
      {data.nodes.length === 0 ? (
        <div className="loading-graph">{relLoading ? c.loadingRelations : c.loadingGraph}</div>
      ) : (
        <ForceGraph2D
          ref={fgRef}
          width={size.w}
          height={size.h}
          graphData={graphData}
          backgroundColor="rgba(0,0,0,0)"
          nodeId="id"
          nodeRelSize={1}
          nodeCanvasObject={paintNode}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color
            ctx.beginPath(); ctx.arc(node.x, node.y, (node._r || 3) + 3, 0, 2 * Math.PI); ctx.fill()
          }}
          linkColor={(l) => (isRel ? (LINK_COLORS[l.type] || LINK_DEFAULT) : LINK_DEFAULT)}
          linkWidth={0.6}
          cooldownTicks={120}
          warmupTicks={20}
          onEngineStop={() => {
            engineStoppedRef.current = true
            if (!fgRef.current) return
            if (focusId && dataRef.current.nodes.some((n) => n.id === focusId)) focusById(focusId)
            else if (!focusId) fgRef.current.zoomToFit(500, 60)
          }}
          onNodeClick={(n) => onSelect(n)}
          onBackgroundClick={() => onClear && onClear()}
        />
      )}

      {onLayerChange && (
        <div className="graph-overlay graph-layer">
          <button className={layer === 'concetti' ? 'on' : ''} onClick={() => onLayerChange('concetti')} title={c.layerConcettiTitle}>{c.layerConcetti}</button>
          <button className={layer === 'norme' ? 'on' : ''} onClick={() => onLayerChange('norme')} title={c.layerNormeTitle}>{c.layerNorme}</button>
          <button className={layer === 'giurisprudenza' ? 'on' : ''} onClick={() => onLayerChange('giurisprudenza')} title={c.layerGiurisprudenzaTitle}>{c.layerGiurisprudenza}</button>
        </div>
      )}

      <form className="graph-overlay graph-search" onSubmit={doSearch}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder={isRel ? c.searchRel : (copy.searchPlaceholder || c.searchConcetti)} />
        <button type="submit" title={c.searchTitle}>⌕</button>
      </form>

      <div className={`graph-overlay legend ${legendOpen ? 'open' : 'closed'}`}>
        <button className="legend-head" onClick={() => setLegendOpen((o) => !o)} aria-expanded={legendOpen} title={c.legendToggle}>
          <span className="title">{legendOpen ? c.typesTitle : c.typesShort}</span>
          <span className="ct">{types.length}</span>
          <span className="chev">{legendOpen ? '▾' : '▸'}</span>
        </button>
        {legendOpen && (
          <div className="legend-body">
            {types.map(([t, n]) => (
              <button className={`row ${hidden.has(t) ? 'off' : ''}`} key={t} onClick={() => toggleType(t)}>
                <span className="swatch" style={{ background: colorFor(t) }} />
                <span className="lt">{t}</span>
                <span className="ct">{n}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="graph-overlay graph-zoom">
        <button onClick={() => zoomBy(1.4)} title={c.zoomIn} aria-label={c.zoomIn}>+</button>
        <button onClick={() => zoomBy(1 / 1.4)} title={c.zoomOut} aria-label={c.zoomOut}>−</button>
        <button onClick={fitView} title={c.fit} aria-label={c.fit}>⤢</button>
      </div>

      <div className="graph-overlay graph-stat">
        <b>{graphData.nodes.length}</b> {c.statEntita} · <b>{graphData.links.length}</b> {c.statRelazioni}
        {hidden.size ? <span className="flt"> · {c.filtersActive}</span> : null}
        {onExpand && (
          <button className="expand-more" onClick={onExpand} disabled={expanding}>
            {expanding ? c.expanding : c.expandMore}
          </button>
        )}
      </div>
      <div className="graph-overlay graph-hint">{c.hint}</div>

      {/* «Cos'è / come si legge»: aperto alla prima visita (pannello), poi pillola cliccabile */}
      <div className={`graph-overlay graph-caption ${helpOpen ? 'open' : 'closed'}`}>
        <button className="gc-pill" onClick={() => (helpOpen ? dismissHelp() : setHelpOpen(true))} aria-expanded={helpOpen} title={c.capTitle}>
          <span className="gc-i">ⓘ</span>
          <span className="lt">{helpOpen ? c.capTitle : c.capPill}</span>
          <span className="chev">{helpOpen ? '▾' : '▸'}</span>
        </button>
        {helpOpen && (
          <div className="gc-body">
            <p>{copy.capBody || c.capBody}</p>
            <span className="gc-row">
              {layer === 'giurisprudenza' ? c.capGiurisprudenza
                : layer === 'norme' ? c.capNorme
                  : (copy.capDetail || c.capConcetti)}
            </span>
            <span className="gc-row">{c.capInteract}</span>
            <button className="gc-got" onClick={dismissHelp}>{c.capGotIt}</button>
          </div>
        )}
      </div>

      {isRel && (
        <div className={`graph-overlay rel-legend ${relLegendOpen ? 'open' : 'closed'}`}>
          <button className="legend-head" onClick={() => setRelLegendOpen((o) => !o)} aria-expanded={relLegendOpen} title={c.legendToggle}>
            <span className="title">{c.relTitle}</span>
            <span className="chev">{relLegendOpen ? '▾' : '▸'}</span>
          </button>
          {relLegendOpen && (
            <div className="legend-body">
              {(REL_KEYS_BY_LAYER[layer] || []).map((t) => (
                <div className="row" key={t}>
                  <span className="line" style={{ background: LINK_COLORS[t] || LINK_DEFAULT }} />
                  <span className="lt">{c.relLabels[t] || t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selected && (
        <NodeCard node={selected} neighbors={neighbors} onAsk={onAsk} onClose={onClear} onPick={pick} labelOf={labelOf} c={c} />
      )}
    </div>
  )
}
