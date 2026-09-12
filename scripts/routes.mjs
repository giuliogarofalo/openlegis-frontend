// Single source of truth for build-time routing.
// Keep DOC_SECTIONS in sync with SECTIONS in src/Docs.jsx.
// enPathOf mirrors every IT path under /en/* (honouring localized slugs, e.g.
// /docs/api → /en/api, /sostieni → /en/support); shared with the runtime (src/locale.js).
import { enPathOf } from '../src/locale.js'

export const DOC_SECTIONS = [
  'progetto',
  'come-funziona',
  'grafo',
  'dati',
  'connettori',
  'collegati',
  'chi',
  'collabora',
]

// Slug delle guide (Fase 1) — pagine /docs/guida/<slug>.
export const GUIDE_SLUGS = [
  'iter-di-una-legge',
  'decreto-legge-vs-decreto-legislativo',
  'citare-una-norma-con-eli',
  'cos-e-un-mcp-server',
  'gerarchia-delle-fonti-del-diritto',
  'cos-e-normattiva',
  'cos-e-la-gazzetta-ufficiale',
  'come-funziona-la-corte-costituzionale',
]

// Slug dei codici (Fase 2) — pagine /codici/<slug>.
export const CODICE_SLUGS = [
  'codice-penale',
  'codice-civile',
  'codice-procedura-penale',
  'codice-procedura-civile',
  'codice-strada',
  'codice-consumo',
  'codice-assicurazioni',
]

// Pagine SEO italiane aggiuntive (Fasi 1–2).
export const SEO_PAGES_IT = [
  '/docs/mcp-server',
  '/docs/api',
  '/docs/glossario',
  '/costituzione',
  '/open-data',
  '/parlamento',
  '/pnrr',
  '/politici',
  '/ddl',
  '/progetti',
  '/come-funziona',
  '/manifesto',
  '/intelligenza-artificiale-legge-italiana',
  '/codici',
  '/sostieni',
  ...GUIDE_SLUGS.map((s) => `/docs/guida/${s}`),
  ...CODICE_SLUGS.map((s) => `/codici/${s}`),
]

// Tutte le rotte indicizzabili in italiano — la radice del mirror IT↔EN.
export const INDEXABLE_IT = [
  '/', '/docs',
  ...DOC_SECTIONS.map((s) => `/docs/${s}`),
  ...SEO_PAGES_IT,
]

// Pagine SOLO inglese (nessun gemello italiano): explainer per sviluppatori non italiani.
export const EN_ONLY = ['/en/italian-law']

// Ogni rotta IT ha il suo gemello EN sotto /en/* (slug localizzati via enPathOf).
export const INDEXABLE_EN = [...INDEXABLE_IT.map(enPathOf), ...EN_ONLY]
export const SEO_PAGES_EN = INDEXABLE_EN

// Pages we want in the sitemap (indexable). /app is noindex → excluded.
export const INDEXABLE = [...INDEXABLE_IT, ...INDEXABLE_EN]

// Pages to snapshot to static HTML. /app (+ EN) included so non-JS crawlers see its noindex.
export const PRERENDER = ['/app', '/en/app', ...INDEXABLE]

// Coppie hreflang IT↔EN (per la sitemap): una per ogni pagina con gemello. [it, en]
export const HREFLANG_PAIRS = INDEXABLE_IT.map((it) => [it, enPathOf(it)])

export const SITE = 'https://openlegis.it'
