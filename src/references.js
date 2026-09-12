// Motore dei RIFERIMENTI OGGETTIVI: trasforma il markdown della risposta dell'agente
// in link interni cliccabili (schema `opref:IDX`) verso documento / relazione / nodo.
//
// È DETERMINISTICO e ancorato ai dati strutturati che l'agente restituisce (ctx): si linka
// un riferimento solo se risolve a un target reale (un nodo del grafo, un id ELI, o un URL/
// item presente in ctx). Meglio sotto-riconoscere che sovra-linkare.
//
// Riuso: stessa logica slug di open_parlamento_mcp/norme_graph (CODICI/TIPI) + artToNode.

// codice → [regex riconoscimento, slug ELI, nome]
const CODICI = [
  [/codice\s+di\s+procedura\s+penale|c\.?\s?p\.?\s?p\.?|cod\.?\s?proc\.?\s?pen/i, 'codice-procedura-penale', 'Codice di Procedura Penale'],
  [/codice\s+di\s+procedura\s+civile|c\.?\s?p\.?\s?c\.?|cod\.?\s?proc\.?\s?civ/i, 'codice-procedura-civile', 'Codice di Procedura Civile'],
  [/codice\s+penale|c\.?\s?p\.?(?![a-z\.])|cod\.?\s?pen/i, 'codice-penale', 'Codice Penale'],
  [/codice\s+civile|c\.?\s?c\.?(?![a-z\.])|cod\.?\s?civ/i, 'codice-civile', 'Codice Civile'],
  [/codice\s+della\s+strada|c\.?\s?d\.?\s?s\.?/i, 'codice-strada', 'Codice della Strada'],
  [/costituzion\w*|cost\.?(?![a-z])/i, 'costituzione', 'Costituzione'],
]
// tipo atto → [regex, slug, sigla]
const TIPI = [
  [/decreto\s+legislativo|d\.?\s?lgs|dlgs/i, 'decreto-legislativo', 'D.lgs'],
  [/decreto[\s-]*legge|d\.?\s?l\.?(?![a-z\.])|\bdl\b/i, 'decreto-legge', 'D.L.'],
  [/d\.?\s?p\.?\s?r\.?|presidente\s+della\s+repubblica/i, 'dpr', 'D.P.R.'],
  [/\blegge\b|\bl\.\s*\d/i, 'legge', 'L.'],
]

const NORMATTIVA = 'https://www.normattiva.it'

// "C.p. art. 575" / "art. 21 Cost." → {slug, name, art}  (riusa CODICI)
function parseArticolo(label) {
  const m = String(label).match(/art(?:icolo)?\.?\s*(\d+[a-z\-]*)/i)
  const art = m ? m[1].replace(/\s+/g, '') : null
  for (const [re, slug, name] of CODICI) if (re.test(label)) return { slug, name, art }
  return { slug: null, name: null, art }
}

function conceptNode(art) {
  return art ? 'Articolo ' + String(art).replace(/[-\s]/g, '') : null
}
function eliArticolo(slug, art) {
  return slug && art ? `eli:/it/${slug}/art/${String(art).replace(/[-\s]/g, '')}` : null
}

// Escape per costruire una regex da una stringa letterale
function rx(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Spezza il markdown in segmenti "liberi" (linkabili) e "protetti" (code fence, inline code,
// link markdown già presenti) così da non rompere il markdown esistente.
function segments(md) {
  const out = []
  const re = /(```[\s\S]*?```|`[^`]*`|\[[^\]]*\]\([^)]*\))/g
  let last = 0, m
  while ((m = re.exec(md))) {
    if (m.index > last) out.push({ free: true, s: md.slice(last, m.index) })
    out.push({ free: false, s: m[0] })
    last = m.index + m[0].length
  }
  if (last < md.length) out.push({ free: true, s: md.slice(last) })
  return out
}

// Costruisce i matcher (regex → ref) a partire da ctx. Ordine = priorità (più specifici prima).
function buildMatchers(ctx, refs) {
  const add = (ref) => { refs.push(ref); return refs.length - 1 }
  const matchers = []  // {re, make(matchText)->idx|null}

  // 1) Articoli citati (ground truth da cerca_legge): linka il numero alla norma citata.
  for (const a of ctx.articoli || []) {
    const { slug, name, art } = parseArticolo(a.label)
    if (!art) continue
    const idx = add({
      kind: 'articolo', label: a.label,
      conceptNode: a.node || conceptNode(art),
      eli: eliArticolo(slug, art),
      norma: name, art,
      url: slug ? `${NORMATTIVA}/ricerca/elenco?art=${art}` : null,
    })
    // "art. 575" / "articolo 575" (anche con suffisso bis/ter)
    matchers.push({ re: new RegExp(`\\bart(?:icolo)?\\.?\\s*${rx(art)}\\b`, 'gi'), idx })
  }

  // 2) Articolo + contesto codice esplicito (non necessariamente in ctx)
  matchers.push({
    re: /\bart(?:icolo)?\.?\s*(\d+[a-z\-]*)\s*,?\s*(c\.?\s?p\.?\s?p\.?|c\.?\s?p\.?\s?c\.?|c\.?\s?p\.?|c\.?\s?c\.?|cost\.?|della\s+costituzione|del\s+codice\s+\w+|c\.?\s?d\.?\s?s\.?)/gi,
    make: (full) => {
      const am = full.match(/(\d+[a-z\-]*)/)
      const art = am ? am[1] : null
      let slug = null, name = null
      for (const [re, s, n] of CODICI) if (re.test(full)) { slug = s; name = n; break }
      if (!art) return null
      return add({
        kind: 'articolo', label: full.trim(), conceptNode: conceptNode(art),
        eli: eliArticolo(slug, art), norma: name, art,
        url: `${NORMATTIVA}/ricerca/elenco?art=${art}`,
      })
    },
  })

  // 3) Leggi / decreti: "L. 197/2022", "D.L. 19/2024", "decreto legislativo 36/2023"
  matchers.push({
    re: /\b(legge|l\.|decreto[\s-]*legge|d\.?\s?l\.?|decreto\s+legislativo|d\.?\s?lgs|d\.?\s?p\.?\s?r\.?)\s*n?\.?\s*(\d+)\s*[\/ ]\s*(\d{4})/gi,
    make: (full) => {
      let slug = null, sigla = null
      for (const [re, s, sg] of TIPI) if (re.test(full)) { slug = s; sigla = sg; break }
      const nm = full.match(/(\d+)\s*[\/ ]\s*(\d{4})/)
      if (!slug || !nm) return null
      const num = nm[1], year = nm[2]
      return add({
        kind: 'norma', label: full.trim(), eli: `eli:/it/${slug}/${year}/${num}`,
        norma: `${sigla} ${num}/${year}`,
        url: `${NORMATTIVA}/ricerca/elenco?annoProvvedimento=${year}&numeroProvvedimento=${num}`,
      })
    },
  })

  // 4) Sentenze (ground truth dai tool giurisprudenza): "sent. 1/2001", "n. 122 del 2022"
  const sent = [
    ...(ctx.sentenzeCost || []).map((s) => ({ ...s, corte: 'Corte Costituzionale', rel: 'cost' })),
    ...(ctx.giurisprudenza || []).map((s) => ({ ...s, corte: 'Corte Costituzionale', rel: 'cost' })),
    ...(ctx.sentenzeCass || []).map((s) => ({ ...s, corte: 'Cassazione', rel: 'cass' })),
  ]
  for (const s of sent) {
    if (!s.numero || !s.anno) continue
    const idx = add({
      kind: 'sentenza', label: `${s.corte} ${s.numero}/${s.anno}`,
      eli: s.rel === 'cost' ? `sentenza:/it/corte-costituzionale/${s.anno}/${s.numero}` : null,
      url: s.url || null, massima: s.massima || null, esito: s.esito || s.tipo || null, corte: s.corte,
    })
    matchers.push({ re: new RegExp(`(?:sent(?:enza)?\\.?\\s*(?:n\\.?\\s*)?|n\\.?\\s*)${rx(String(s.numero))}\\s*[\\/]\\s*${rx(String(s.anno))}\\b`, 'gi'), idx })
    matchers.push({ re: new RegExp(`\\bn\\.?\\s*${rx(String(s.numero))}\\s+del\\s+${rx(String(s.anno))}\\b`, 'gi'), idx })
  }

  // 5) Atti/sentenze UE: aggancio per CELEX presente in ctx
  for (const u of [...(ctx.attiUe || []), ...(ctx.sentenzeUe || [])]) {
    if (!u.celex) continue
    const idx = add({ kind: 'ue', label: u.titolo || `CELEX ${u.celex}`, url: u.url, celex: u.celex })
    matchers.push({ re: new RegExp(`\\b${rx(u.celex)}\\b`, 'g'), idx })
  }
  // Regolamento/Direttiva (UE) YYYY/NNN → EUR-Lex se troviamo l'item, altrimenti link di ricerca
  matchers.push({
    re: /\b(regolamento|direttiva)\s*\(?ue\)?\s*(?:n\.?\s*)?(\d{4})\/(\d+)/gi,
    make: (full) => {
      const nm = full.match(/(\d{4})\/(\d+)/)
      if (!nm) return null
      const year = nm[1], num = nm[2]
      const hit = (ctx.attiUe || []).find((u) => u.celex && u.celex.includes(year) && u.celex.includes(num))
      return add({
        kind: 'ue', label: full.trim(),
        url: hit?.url || `https://eur-lex.europa.eu/search.html?qid=&text=${year}%2F${num}&type=quick`,
        celex: hit?.celex || null,
      })
    },
  })

  // 6) Dataset / DDL / decreti / parlamentari / statistiche / GU: aggancio per TITOLO presente nel testo
  const byTitle = []
  for (const d of ctx.dataset || []) if (d.titolo) byTitle.push({ title: d.titolo, ref: { kind: 'dataset', label: d.titolo, url: d.url, ente: d.ente } })
  for (const n of ctx.novita || []) if (n.titolo) byTitle.push({ title: n.titolo, ref: { kind: 'gu', label: n.titolo, url: n.url } })
  for (const s of ctx.statistiche || []) if (s.indicatore) byTitle.push({ title: s.indicatore, ref: { kind: 'stat', label: s.indicatore, url: s.url } })
  for (const t of byTitle) {
    if (!t.title || t.title.length < 6) continue
    const idx = add(t.ref)
    matchers.push({ re: new RegExp(rx(t.title), 'gi'), idx })
  }

  return matchers
}

// Applica i matcher a un segmento libero, senza sovrapposizioni; ritorna il markdown linkato.
function linkSegment(seg, matchers, refs) {
  const hits = []
  for (const mt of matchers) {
    mt.re.lastIndex = 0
    let m
    while ((m = mt.re.exec(seg))) {
      const text = m[0]
      let idx = mt.idx
      if (idx == null && mt.make) idx = mt.make(text)
      if (idx == null) { if (m.index === mt.re.lastIndex) mt.re.lastIndex++; continue }
      hits.push({ start: m.index, end: m.index + text.length, text, idx })
      if (m.index === mt.re.lastIndex) mt.re.lastIndex++
    }
  }
  if (!hits.length) return seg
  // ordina per inizio, lunghezza decrescente; scarta sovrapposizioni
  hits.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start))
  const kept = []
  let lastEnd = -1
  for (const h of hits) { if (h.start >= lastEnd) { kept.push(h); lastEnd = h.end } }
  let out = '', cur = 0
  for (const h of kept) {
    out += seg.slice(cur, h.start)
    out += `[${h.text}](opref:${h.idx})`
    cur = h.end
  }
  out += seg.slice(cur)
  return out
}

// API: trasforma il markdown in markdown con link `opref:IDX` + ritorna l'array refs.
export function linkify(markdown, ctx = {}) {
  if (!markdown) return { text: markdown || '', refs: [] }
  const refs = []
  const matchers = buildMatchers(ctx, refs)
  if (!matchers.length) return { text: markdown, refs }
  const text = segments(markdown)
    .map((seg) => (seg.free ? linkSegment(seg.s, matchers, refs) : seg.s))
    .join('')
  return { text, refs }
}
