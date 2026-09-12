// Programmatic SEO/GEO generator for the legal corpus (Phase 2).
// Reads the authoritative Normattiva harvest (norme_out: verbatim per-article text
// + modification edges, confidence 1.0) and emits one static HTML page per norma and
// per article into webapp/public/norme/**, plus public/sitemap-corpus.xml.
//
// Run on the HOST (where norme_out exists) before the Vite build:
//   CORPUS_SRC=../lightrag-stack/norme_out node scripts/gen-corpus.mjs
// The generated pages live under public/ → Vite copies them to dist/ → nginx serves
// them as real, crawlable, verbatim legal pages with schema.org Legislation.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE = 'https://openlegis.it'
// Sitemap CURATO. Su un dominio giovane esporre tutte le ~40k pagine causa
// crawl-budget starvation (GSC: "Rilevata, ma non indicizzata" su decine di migliaia).
// Generiamo comunque TUTTE le pagine (restano online e crawlabili via link interni),
// ma nella sitemap includiamo solo il "core" ad alto segnale:
//   • tutte le pagine-norma (act hub) e l'indice /norme
//   • tutti gli articoli di Codici/Costituzione (alto valore canonico)
//   • articoli referenziati dal grafo di modifica CON testo sostanziale (>= CORE_BODY_MIN)
// Espandibile a scaglioni man mano che il dominio guadagna autorità.
// Override: CORE_SITEMAP=all → include tutto (comportamento legacy); CORE_BODY_MIN=<n>.
const CORE_ONLY = process.env.CORE_SITEMAP !== 'all'
const CORE_BODY_MIN = Number(process.env.CORE_BODY_MIN || 500)
const here = dirname(fileURLToPath(import.meta.url))
const SRC = process.env.CORPUS_SRC
  ? (process.env.CORPUS_SRC.startsWith('/') ? process.env.CORPUS_SRC : join(here, '..', process.env.CORPUS_SRC))
  : join(here, '..', '..', 'lightrag-stack', 'norme_out')
const OUT = join(here, '..', 'public', 'norme')

if (!existsSync(join(SRC, 'manifest.json'))) {
  console.error(`✗ corpus: nessun dato in ${SRC} (manifest.json assente). Skip.`)
  process.exit(0)
}

/* ---------- helpers ported from agent-service/.../norme_graph.py ---------- */
const NAMES = {
  'codice-penale': 'Codice Penale', 'codice-civile': 'Codice Civile',
  'codice-procedura-civile': 'Codice di Procedura Civile', 'codice-strada': 'Codice della Strada',
  'codice-consumo': 'Codice del Consumo', 'codice-assicurazioni': 'Codice delle Assicurazioni',
  costituzione: 'Costituzione', dpr: 'D.P.R.', dpcm: 'D.P.C.M.', 'decreto-legge': 'D.L.',
  'decreto-legislativo': 'D.lgs', legge: 'L.', 'regio-decreto': 'R.D.',
}
const TIPO_FULL = {
  'decreto-legge': 'Decreto-legge', 'decreto-legislativo': 'Decreto legislativo', legge: 'Legge',
  dpr: 'D.P.R.', dpcm: 'D.P.C.M.', 'regio-decreto': 'Regio decreto',
}
const actLevel = (nid) => nid.split('/art/')[0]
const artOf = (nid) => (nid.match(/\/art\/([\w-]+)$/) || [])[1] || null

function label(nid, titoli) {
  const base = actLevel(nid), art = artOf(nid)
  let name
  if (base.startsWith('celex')) {
    name = 'UE ' + base.split('/eu/').pop().replace('ue-', '').replace(/\//g, ' ')
  } else {
    const seg = base.replace('eli:/it/', '').split('/')
    const slug = seg[0]
    if (NAMES[slug] && seg.length === 1) name = NAMES[slug]
    else if (NAMES[slug]) name = `${NAMES[slug]} ${seg[seg.length - 1]}/${seg[2]}`
    else name = base
    if (titoli && titoli[base]) name += ` — ${titoli[base].slice(0, 80)}`
  }
  return name + (art ? `, art. ${art}` : '')
}

// eli:/it/decreto-legge/2024/03/02/19 → {tipo, year, mm, dd, num, date}
function parseEli(eli) {
  const seg = eli.replace('eli:/it/', '').split('/')
  const [tipo, year, mm, dd, num] = seg
  const date = year && mm && dd ? `${year}-${mm}-${dd}` : null
  return { tipo, year, mm, dd, num, date }
}
const eliToPath = (eli) => '/norme' + eli.replace(/^eli:/, '')
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const normaUrl = (urn) => urn ? 'https://www.normattiva.it/uri-res/N2Ls?' + urn : null
const clip = (s, n) => { s = (s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s }

/* ---------- load data ---------- */
const manifest = JSON.parse(readFileSync(join(SRC, 'manifest.json'), 'utf8'))
const titoli = {}
for (const [k, v] of Object.entries(manifest)) if (v.titolo) titoli[k] = v.titolo

// articles: artEli → {eli, num, body, rubrica, normaEli}; grouped per norma.
const articlesByNorma = new Map()
const articleByEli = new Map()
for (const f of readdirSync(join(SRC, 'texts'))) {
  if (!f.endsWith('.json')) continue
  const j = JSON.parse(readFileSync(join(SRC, 'texts', f), 'utf8'))
  for (const t of j.texts || []) {
    const m = t.match(/identificativo ELI:\s*(eli:\S+?)\)/)
    if (!m) continue
    const eli = m[1]
    const normaEli = actLevel(eli)
    const num = artOf(eli)
    const body = t.split('\n\n').slice(1).join('\n\n').trim() || t.trim()
    // Codici/testi unici: "Art. N. (Rubrica) testo…" → rubrica tra parentesi. Altri: euristica (fino a comma 1).
    const pm = body.match(/^Art\.\s*[\w-]+\.?\s*\(([^)]{2,100})\)/)
    const rm = body.match(/^Art\.\s*[\w-]+\.?\s*(.+?)(?:\s+1\.\s|\s+1\)\s|\.\s|$)/s)
    const rubrica = clip(pm ? pm[1] : (rm ? rm[1] : ''), 110)
    const art = { eli, num, body, rubrica, normaEli }
    articleByEli.set(eli, art)
    if (!articlesByNorma.has(normaEli)) articlesByNorma.set(normaEli, [])
    articlesByNorma.get(normaEli).push(art)
  }
}
// natural sort articles by number (1, 1-bis, 2, 10, …)
const artKey = (n) => {
  const m = (n || '').match(/^(\d+)(.*)$/)
  return [m ? parseInt(m[1], 10) : 0, m ? m[2] : (n || '')]
}
for (const arr of articlesByNorma.values())
  arr.sort((a, b) => { const ka = artKey(a.num), kb = artKey(b.num); return ka[0] - kb[0] || ka[1].localeCompare(kb[1]) })

// ── Indice testo verbatim per-articolo → public/norme-text.json (anteprima nei riferimenti) ──
// Atti (leggi/decreti) vengono da norme_out/texts; i CODICI (Costituzione, c.p.) NON sono lì:
// si parsano dai sorgenti markdown dell'ingest (lightrag-stack/data/inputs/*.md).
const normeText = {}
for (const [eli, a] of articleByEli) normeText[eli] = { num: a.num, rubrica: a.rubrica, body: clip(a.body, 1400) }
const CODES = [['codice_penale.md', 'codice-penale'], ['costituzione.md', 'costituzione']]
const codesDir = join(here, '..', '..', 'lightrag-stack', 'data', 'inputs')
for (const [file, slug] of CODES) {
  const fp = join(codesDir, file)
  if (!existsSync(fp)) continue
  const parts = readFileSync(fp, 'utf8').split(/\n#{2,6}\s*Art\.\s*/)
  for (let i = 1; i < parts.length; i++) {
    const nm = parts[i].match(/^(\d+[\w-]*)/)
    if (!nm) continue
    const num = nm[1]
    let body = parts[i].slice(nm[0].length).split(/\n#{1,6}\s/)[0].replace(/_{3,}[\s\S]*$/m, '').trim()
    const first = (body.split('\n').map((s) => s.trim()).filter(Boolean)[0]) || ''
    const rubrica = (first.length < 70 && /\.$/.test(first) && /^[A-ZÀ-Ý]/.test(first)) ? first.replace(/\.$/, '') : ''
    normeText[`eli:/it/${slug}/art/${num}`] = { num, rubrica, body: clip(body, 1400) }
  }
}
writeFileSync(join(here, '..', 'public', 'norme-text.json'), JSON.stringify(normeText), 'utf8')
console.log(`✓ norme-text.json: ${Object.keys(normeText).length} articoli (atti + codici)`)

// edges + reverse index
const edges = []
for (const f of readdirSync(join(SRC, 'edges'))) {
  if (!f.endsWith('.jsonl')) continue
  for (const line of readFileSync(join(SRC, 'edges', f), 'utf8').split('\n')) {
    const s = line.trim(); if (!s) continue
    try { edges.push(JSON.parse(s)) } catch {}
  }
}
const outgoingByNorma = new Map()   // normaEli → edges where source act == norma
const incomingByNorma = new Map()   // normaEli → edges where target act == norma
const incomingByArticle = new Map() // artEli → edges where target == artEli
for (const e of edges) {
  const sN = actLevel(e.source), tN = actLevel(e.target)
  if (!outgoingByNorma.has(sN)) outgoingByNorma.set(sN, [])
  outgoingByNorma.get(sN).push(e)
  if (!incomingByNorma.has(tN)) incomingByNorma.set(tN, [])
  incomingByNorma.get(tN).push(e)
  if (!incomingByArticle.has(e.target)) incomingByArticle.set(e.target, [])
  incomingByArticle.get(e.target).push(e)
}

// norme we actually have a page for (status ok)
const norme = Object.entries(manifest)
  .filter(([k, v]) => v.status === 'ok' && k.startsWith('eli:'))
  .map(([eli, v]) => ({ eli, ...v, arts: articlesByNorma.get(eli) || [] }))
const normaSet = new Set(norme.map((n) => n.eli))

/* ---------- HTML building ---------- */
// Google Analytics (GA4) — attivo. (Umami è in standby: si attiverebbe via UMAMI_WEBSITE_ID, vedi LANCIO_E_SOSTENIBILITA.md.)
const GA = `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
if(location.hostname==='openlegis.it'||location.hostname==='www.openlegis.it'){var s=document.createElement('script');s.async=true;
s.src='https://www.googletagmanager.com/gtag/js?id=G-18LNSCHMYE';document.head.appendChild(s);
gtag('js',new Date());gtag('config','G-18LNSCHMYE');}</script>`
const FONTS = `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,900&family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">`

function headerHtml() {
  return `<header class="c-header">
  <a class="c-brand" href="/"><span class="c-seal"></span><span class="c-wordmark">Open<b>·</b>Parlamento</span></a>
  <nav class="c-nav"><a href="/norme">Norme</a><a href="/docs">Documentazione</a><a href="/app">Interroga →</a></nav>
</header>`
}
function footerHtml() {
  return `<footer class="c-foot">
  Fonte: <a href="https://dati.normattiva.it" rel="noopener">Normattiva</a> (Akoma Ntoso, ELI · CC BY 4.0) ·
  relazioni di modifica autoritative. Strumento informativo, non consulenza legale.<br>
  <a href="/">OpenLegis</a> · <a href="/norme">tutte le norme</a> · <a href="/app">interroga la legge</a> · <a href="/intelligenza-artificiale-legge-italiana">intelligenza artificiale per la legge italiana</a> · OSINT legislativo italiano.<br>
  Un progetto di <a href="https://growflow.studio" rel="noopener">GrowFlow Studio</a>.
</footer>`
}
function page({ title, description, path, jsonLd, body }) {
  const url = SITE + path
  const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean)
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — OpenLegis</title>
<meta name="description" content="${esc(description)}">
<meta name="keywords" content="${esc(title)}, normativa italiana, Normattiva, ELI, open data, OSINT legislativo, legge, decreto">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<meta name="theme-color" content="#0b0d11">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/corpus.css">
<meta property="og:site_name" content="OpenLegis"><meta property="og:locale" content="it_IT">
<meta property="og:type" content="article"><meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)} — OpenLegis">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}/og-cover.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)} — OpenLegis">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/og-cover.png">
${FONTS}
${blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n')}
${GA}
</head>
<body>
${headerHtml()}
<main class="wrap">
${body}
</main>
${footerHtml()}
</body>
</html>`
}

// Render a relation target as an internal link (if we have a page) or plain label.
function targetLink(targetEli) {
  const lab = label(targetEli, titoli)
  const actEli = actLevel(targetEli)
  if (articleByEli.has(targetEli)) return `<a href="${eliToPath(targetEli)}">${esc(lab)}</a>`
  if (normaSet.has(actEli)) return `<a href="${eliToPath(actEli)}">${esc(lab)}</a>`
  return `<span>${esc(lab)}</span>`
}
function sourceLink(sourceEli) {
  const lab = label(sourceEli, titoli)
  const actEli = actLevel(sourceEli)
  if (normaSet.has(actEli)) return `<a href="${eliToPath(actEli)}">${esc(lab)}</a>`
  return `<span>${esc(lab)}</span>`
}
const REL_LABEL = { modifica: 'Modifica', abroga: 'Abroga', sostituisce: 'Sostituisce',
  inserisce: 'Inserisce', converte: 'Converte', deroga: 'Deroga', proroga: 'Proroga' }

function relGroups(edgeList, dir /* 'out'|'in' */) {
  // group by type → distinct targets/sources
  const byType = new Map()
  for (const e of edgeList) {
    if (!byType.has(e.type)) byType.set(e.type, new Map())
    const key = dir === 'out' ? e.target : e.source
    const g = byType.get(e.type)
    if (!g.has(key)) g.set(key, e) // keep first edge (for evidence)
  }
  let html = ''
  for (const [type, items] of byType) {
    html += `<div class="rel-group"><div class="rel-type">${esc(REL_LABEL[type] || type)} · ${items.size}</div><ul class="rel-list">`
    for (const [key, e] of items) {
      const link = dir === 'out' ? targetLink(key) : sourceLink(key)
      const ev = e.evidence ? `<span class="ev">${esc(clip(e.evidence, 200))}</span>` : ''
      html += `<li>${link}${e.created_by === 'normattiva' ? '<span class="tag">autoritativo</span>' : ''}${ev}</li>`
    }
    html += `</ul></div>`
  }
  return html
}

/* ---------- write pages ---------- */
rmSync(OUT, { recursive: true, force: true })
const sitemapUrls = ['/norme']
function write(path, html) {
  const dir = join(OUT, path.replace(/^\/norme\/?/, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf8')
}

let nArt = 0
let allPages = 1 // /norme index (già in sitemapUrls); conteggio totale pagine generate
for (const n of norme) {
  const p = parseEli(n.eli)
  // Codici e Costituzione: ELI senza data ⇒ articoli sempre nel core (alto valore canonico).
  const isCode = !!(NAMES[p.tipo] && !p.year)
  const path = eliToPath(n.eli)
  const tipoFull = TIPO_FULL[p.tipo] || p.tipo
  // Codici e Costituzione hanno ELI senza data → niente "tipo num/anno": usa il nome canonico (NAMES).
  const h1 = (NAMES[p.tipo] && !p.year) ? NAMES[p.tipo] : `${tipoFull} ${p.num}/${p.year}`
  const out = outgoingByNorma.get(n.eli) || []
  const inc = incomingByNorma.get(n.eli) || []
  const conv = n.conversione && normaSet.has(n.conversione)
    ? ` · convertito in <a href="${eliToPath(n.conversione)}">${esc(label(n.conversione, titoli).split(' — ')[0])}</a>`
    : (n.conversione ? ` · convertito in ${esc(label(n.conversione, titoli).split(' — ')[0])}` : '')

  const ld = {
    '@context': 'https://schema.org', '@type': 'Legislation',
    name: n.titolo || h1, legislationIdentifier: n.eli.replace('eli:', ''),
    legislationType: p.tipo, legislationDate: p.date, jurisdiction: 'IT', inLanguage: 'it',
    url: SITE + path, isBasedOn: normaUrl(n.urn) || undefined,
    legislationChanges: out.length, sameAs: normaUrl(n.urn) || undefined,
  }
  const crumbsLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [['OpenLegis', '/'], ['Norme', '/norme'], [h1, path]]
      .map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + u })),
  }

  const artList = n.arts.length
    ? `<h2 id="articoli">Articoli (${n.arts.length})</h2><div class="arts">` +
      n.arts.map((a) => `<a href="${eliToPath(a.eli)}"><span class="n">Art. ${esc(a.num)}</span>${esc(clip(a.rubrica, 60))}</a>`).join('') +
      `</div>`
    : ''

  const body = `
<div class="crumbs"><a href="/">Home</a> › <a href="/norme">Norme</a> › <span>${esc(h1)}</span></div>
<div class="kicker">${esc(tipoFull)} · ${esc(p.date || p.year)}</div>
<h1>${esc(h1)}</h1>
<p class="subtitle">${esc(n.titolo || '')}</p>
<div class="meta">
  <span class="chip eli">ELI ${esc(n.eli.replace('eli:', ''))}</span>
  <span class="chip"><b>${n.arts.length}</b> articoli</span>
  <span class="chip"><b>${out.length}</b> relazioni in uscita</span>
  ${inc.length ? `<span class="chip"><b>${inc.length}</b> in entrata</span>` : ''}
</div>
<p class="source">Fonte ufficiale${conv}${normaUrl(n.urn) ? ` · <a href="${normaUrl(n.urn)}" rel="noopener">apri su Normattiva ↗</a>` : ''}</p>
${out.length ? `<h2 id="modifica">Cosa modifica</h2><p class="source">Relazioni autoritative (Normattiva, Akoma Ntoso) verso altre norme.</p>${relGroups(out, 'out')}` : ''}
${inc.length ? `<h2 id="modificata-da">Modificata / richiamata da</h2>${relGroups(inc, 'in')}` : ''}
${artList}
<p class="disclaimer">Testo consolidato da Normattiva (CC BY 4.0). Strumento informativo — non è consulenza legale: verifica sempre sulla fonte ufficiale.</p>
`
  write(path, page({
    title: `${h1}${n.titolo ? ' — ' + clip(n.titolo, 70) : ''}`,
    description: clip(`${h1}: ${n.titolo || ''}. ${out.length} relazioni di modifica, ${n.arts.length} articoli. Testo e fonti su OpenLegis.`, 155),
    path, jsonLd: [ld, crumbsLd], body,
  }))
  allPages++
  sitemapUrls.push(path) // pagina-norma (hub): sempre nel core

  // article pages
  for (let i = 0; i < n.arts.length; i++) {
    const a = n.arts[i]
    const aPath = eliToPath(a.eli)
    const aH1 = `Art. ${a.num}${a.rubrica ? ' — ' + a.rubrica : ''}`
    const aInc = incomingByArticle.get(a.eli) || []
    const prev = n.arts[i - 1], next = n.arts[i + 1]
    const aLd = {
      '@context': 'https://schema.org', '@type': 'Legislation',
      name: `${h1}, art. ${a.num}`, legislationIdentifier: a.eli.replace('eli:', ''),
      legislationType: p.tipo, legislationDate: p.date, jurisdiction: 'IT', inLanguage: 'it',
      url: SITE + aPath,
      isPartOf: { '@type': 'Legislation', name: n.titolo || h1, url: SITE + path, legislationIdentifier: n.eli.replace('eli:', '') },
    }
    const aCrumbs = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [['OpenLegis', '/'], ['Norme', '/norme'], [h1, path], [`Art. ${a.num}`, aPath]]
        .map(([name, u], idx) => ({ '@type': 'ListItem', position: idx + 1, name, item: SITE + u })),
    }
    const aBody = `
<div class="crumbs"><a href="/">Home</a> › <a href="/norme">Norme</a> › <a href="${path}">${esc(h1)}</a> › <span>Art. ${esc(a.num)}</span></div>
<div class="kicker">${esc(h1)}</div>
<h1>${esc(aH1)}</h1>
<div class="meta"><span class="chip eli">ELI ${esc(a.eli.replace('eli:', ''))}</span><span class="chip">parte di <b>${esc(h1)}</b></span></div>
<div class="lex">${esc(a.body)}</div>
${aInc.length ? `<h2 id="modificato-da">Modificato / richiamato da</h2>${relGroups(aInc, 'in')}` : ''}
<p class="source"><a href="${path}#articoli">↑ Tutti gli articoli di ${esc(h1)}</a>${normaUrl(n.urn) ? ` · <a href="${normaUrl(n.urn)}" rel="noopener">fonte Normattiva ↗</a>` : ''}</p>
<div class="prevnext">
  ${prev ? `<a href="${eliToPath(prev.eli)}">← Art. ${esc(prev.num)}</a>` : '<span></span>'}
  ${next ? `<a href="${eliToPath(next.eli)}">Art. ${esc(next.num)} →</a>` : '<span></span>'}
</div>
<p class="disclaimer">Testo consolidato da Normattiva (CC BY 4.0). Strumento informativo — non è consulenza legale.</p>
`
    write(aPath, page({
      title: `${h1}, art. ${a.num}${a.rubrica ? ' — ' + clip(a.rubrica, 50) : ''}`,
      description: clip(`${h1}, articolo ${a.num}. ${a.rubrica || a.body}`, 155),
      path: aPath, jsonLd: [aLd, aCrumbs], body: aBody,
    }))
    allPages++
    nArt++
    // Core: articoli di codici/costituzione, oppure referenziati dal grafo E sostanziali.
    const inCore = isCode || (aInc.length > 0 && (a.body || '').length >= CORE_BODY_MIN)
    if (!CORE_ONLY || inCore) sitemapUrls.push(aPath)
  }
}

/* ---------- index page /norme ---------- */
const byTipo = new Map()
for (const n of norme) { const t = parseEli(n.eli).tipo; if (!byTipo.has(t)) byTipo.set(t, []); byTipo.get(t).push(n) }
const indexLd = {
  '@context': 'https://schema.org', '@type': 'CollectionPage',
  name: 'Norme indicizzate — OpenLegis', url: SITE + '/norme', inLanguage: 'it',
  description: `Catalogo di ${norme.length} norme italiane (decreti, leggi) con testo per-articolo e relazioni di modifica.`,
  isPartOf: { '@type': 'WebSite', url: SITE },
}
const indexBody = `
<div class="crumbs"><a href="/">Home</a> › <span>Norme</span></div>
<div class="kicker">corpus normativo · ${norme.length} norme · ${nArt} articoli</div>
<h1>Norme indicizzate</h1>
<p class="subtitle">Testo consolidato per-articolo e relazioni di modifica autoritative (Normattiva, ELI). Una fonte aperta, citabile e navigabile — pensata anche per l'OSINT legislativo.</p>
${[...byTipo.entries()].map(([tipo, list]) => `
<h2>${esc(NAMES[tipo] || TIPO_FULL[tipo] || tipo)} <span style="color:var(--faint);font-size:14px">(${list.length})</span></h2>
<div class="norme-grid">
${list.map((n) => { const p = parseEli(n.eli); const out = (outgoingByNorma.get(n.eli) || []).length
  const nm = (NAMES[p.tipo] && !p.year) ? NAMES[p.tipo] : `${TIPO_FULL[p.tipo] || p.tipo} ${p.num}/${p.year}`
  return `<a class="norma-card" href="${eliToPath(n.eli)}">
    <div class="nm">${esc(nm)} · ELI ${esc(n.eli.replace('eli:', ''))}</div>
    <h3>${esc(clip(n.titolo || nm, 90))}</h3>
    <p>${n.arts.length} articoli · ${out} relazioni di modifica</p>
  </a>` }).join('\n')}
</div>`).join('\n')}
<p class="disclaimer">Fonte: Normattiva (Akoma Ntoso, CC BY 4.0). Copertura in crescita ad ogni ingest.</p>
`
write('/norme', page({
  title: 'Norme indicizzate',
  description: clip(`${norme.length} norme italiane con testo per-articolo e ${edges.length} relazioni di modifica autoritative (Normattiva, ELI). Open data per ricerca giuridica e OSINT legislativo.`, 155),
  path: '/norme', jsonLd: indexLd, body: indexBody,
}))

/* ---------- corpus sitemap (sharded: max 45k URL/file; lo spec sitemap limita a 50k) ---------- */
const SHARD = 45000
const PUB = join(here, '..', 'public')
const urlXml = (u) => `  <url><loc>${SITE}${u}</loc><changefreq>monthly</changefreq><priority>${u === '/norme' ? '0.8' : u.includes('/art/') ? '0.5' : '0.6'}</priority></url>`
// pulizia: rimuovi shard precedenti (sitemap-corpus.xml legacy + sitemap-corpus-N.xml)
for (const f of readdirSync(PUB)) if (/^sitemap-corpus(-\d+)?\.xml$/.test(f)) rmSync(join(PUB, f))
const shardFiles = []
for (let i = 0; i < sitemapUrls.length; i += SHARD) {
  const chunk = sitemapUrls.slice(i, i + SHARD)
  const fname = `sitemap-corpus-${shardFiles.length + 1}.xml`
  writeFileSync(join(PUB, fname),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${chunk.map(urlXml).join('\n')}\n</urlset>\n`,
    'utf8')
  shardFiles.push(fname)
}

console.log(`✓ corpus: ${norme.length} norme + ${nArt} articoli + indice = ${allPages} pagine generate (tutte online)`)
console.log(`✓ sitemap-corpus: ${shardFiles.length} shard (${shardFiles.join(', ')}) — ${sitemapUrls.length} URL nel core${CORE_ONLY ? ` (${(100 * sitemapUrls.length / allPages).toFixed(0)}% del totale; CORE_BODY_MIN=${CORE_BODY_MIN}, CORE_SITEMAP=all per esporre tutto)` : ' (CORE_SITEMAP=all: tutte le pagine)'}`)
