// LightRAG REST client (via Vite proxy at /lr → http://localhost:9621)
const BASE = '/lr'

export async function health() {
  const r = await fetch(`${BASE}/health`)
  if (!r.ok) throw new Error('health ' + r.status)
  return r.json()
}

// max_depth=3 senza un'entità di partenza (label='*') esplora l'intero grafo prima di troncare
// a max_nodes — con un corpus grande (31k+ nodi) questo scala malissimo (20-60s+, a volte il
// container va giù) per un risultato IDENTICO a depth=1 quando max_nodes è basso (verificato
// empiricamente: stesso nodes/edges, 5-8× più lento). depth=1 di default, mai tutto il grafo.
export async function fetchGraph(maxNodes = 300, maxDepth = 1) {
  const r = await fetch(`${BASE}/graphs?label=${encodeURIComponent('*')}&max_depth=${maxDepth}&max_nodes=${maxNodes}`)
  if (!r.ok) throw new Error('graph ' + r.status)
  const g = await r.json()
  const nodes = (g.nodes || []).map((n) => ({
    id: n.id,
    type: (n.properties && n.properties.entity_type) || 'altro',
    description: (n.properties && n.properties.description) || '',
  }))
  const ids = new Set(nodes.map((n) => n.id))
  const links = (g.edges || [])
    .filter((e) => ids.has(e.source) && ids.has(e.target))
    .map((e) => ({
      source: e.source,
      target: e.target,
      description: (e.properties && e.properties.description) || '',
      keywords: (e.properties && e.properties.keywords) || '',
    }))
  return { nodes, links }
}

// Layer RELAZIONI: grafo statico norme↔modifiche↔sentenze↔pendenze (generato a build-time
// da agent-service/gen_relations_graph.py → webapp/public/graph-relations.json). Id ELI, etichette umane.
export async function fetchRelations() {
  const r = await fetch('/graph-relations.json')
  if (!r.ok) throw new Error('relations ' + r.status)
  const g = await r.json()
  const nodes = (g.nodes || []).map((n) => ({
    id: n.id,
    label: n.label || n.id,
    type: n.type || 'altro',
    description: '',
    sentenze: n.sentenze || null,   // conteggio giurisprudenza per articolo (badge)
  }))
  const ids = new Set(nodes.map((n) => n.id))
  const links = (g.links || [])
    .filter((l) => ids.has(l.source) && ids.has(l.target))
    .map((l) => ({ source: l.source, target: l.target, type: l.type || '', layer: l.layer || '' }))
  return { nodes, links }
}

// Conteggio TOTALE delle entità del grafo (non il sottoinsieme caricato per il rendering).
export async function entityCount() {
  try {
    const r = await fetch(`${BASE}/graph/label/list`)
    if (!r.ok) return null
    const d = await r.json()
    return Array.isArray(d) ? d.length : (typeof d?.count === 'number' ? d.count : null)
  } catch {
    return null
  }
}

// PNRR (aziende↔appalti) — public-api read-only, /api/public/pnrr/* (vedi public-api/app.py).
// Piano migrazione ShopBrain, Fase 5a: sempre bounded (limit/max_nodi), mai un dump completo.
const PUBLIC_API = '/api/public'

// Le classifiche (non il grafo) leggono un JSON statico generato a build-time
// (agent-service/gen_classifiche.py, chiamato da deploy.sh) invece dell'endpoint live:
// il prerender Playwright (scripts/prerender.mjs) gira nella build Docker, che non ha
// accesso alla rete docker-compose — un fetch a public-api lì fallisce sempre
// (getaddrinfo ENOTFOUND), lasciando le tabelle vuote nell'HTML statico servito ai
// crawler. Stesso principio già in uso per norme-text.json/graph-relations.json.
// Cache in-memory per pagina: aziende+enti (o parlamentari+gruppi) leggono lo stesso
// file, un solo fetch invece di due.
const _staticJsonCache = new Map()
function _staticJson(path) {
  if (!_staticJsonCache.has(path)) {
    _staticJsonCache.set(path, fetch(path).then((r) => {
      if (!r.ok) throw new Error(path + ' ' + r.status)
      return r.json()
    }).catch((e) => { _staticJsonCache.delete(path); throw e }))
  }
  return _staticJsonCache.get(path)
}

export async function pnrrClassificaAziende(limit = 20) {
  const d = await _staticJson('/pnrr-classifiche.json')
  return { classifica: (d.aziende?.classifica || []).slice(0, limit) }
}

export async function pnrrClassificaEnti(limit = 20) {
  const d = await _staticJson('/pnrr-classifiche.json')
  return { classifica: (d.enti?.classifica || []).slice(0, limit) }
}

export async function pnrrClassificaRegioni(limit = 20) {
  const d = await _staticJson('/pnrr-geo-finanziamenti.json')
  return { classifica: (d.regioni?.classifica || []).slice(0, limit) }
}

export async function pnrrFinanziamenti() {
  const d = await _staticJson('/pnrr-geo-finanziamenti.json')
  return d.finanziamenti || { flussi: [], fonti: [] }
}

// Grafo PNRR: già filtrato/cappato server-side (max_nodi). Adattato alla forma attesa da
// GraphView.jsx (nodes:{id,type,label}, links:{source,target,type}) — stesso client di fetchGraph/fetchRelations.
export async function pnrrGraph({ importoMin = 0, settore = '', maxNodi = 150 } = {}) {
  const qs = new URLSearchParams({ importo_min: importoMin, settore, max_nodi: maxNodi })
  const r = await fetch(`${PUBLIC_API}/pnrr/graph?${qs}`)
  if (!r.ok) throw new Error('pnrr graph ' + r.status)
  const g = await r.json()
  return {
    nodes: (g.nodi || []).map((n) => ({ id: n.id, type: n.tipo, label: n.label })),
    links: (g.archi || []).map((l) => ({ source: l.source, target: l.target, type: l.tipo })),
    totaleNodi: g.totale_nodi, totaleArchi: g.totale_archi,
  }
}

// Politici (parlamentari↔atti) — public-api read-only, /api/public/politici/* (Fase 5b).
// Classifiche da JSON statico a build-time, stesso motivo di pnrrClassifica* sopra.
export async function politiciClassificaParlamentari(limit = 20) {
  const d = await _staticJson('/politici-classifiche.json')
  return { classifica: (d.parlamentari?.classifica || []).slice(0, limit) }
}

export async function politiciClassificaGruppi(limit = 20) {
  const d = await _staticJson('/politici-classifiche.json')
  return { classifica: (d.gruppi?.classifica || []).slice(0, limit) }
}

export async function politiciGraph({ gruppo = '', ramo = '', maxNodi = 200 } = {}) {
  const qs = new URLSearchParams({ gruppo, ramo, max_nodi: maxNodi })
  const r = await fetch(`${PUBLIC_API}/politici/graph?${qs}`)
  if (!r.ok) throw new Error('politici graph ' + r.status)
  const g = await r.json()
  return {
    nodes: (g.nodi || []).map((n) => ({ id: n.id, type: n.tipo, label: n.label })),
    links: (g.archi || []).map((l) => ({ source: l.source, target: l.target, type: l.tipo })),
    totaleNodi: g.totale_nodi, totaleArchi: g.totale_archi,
  }
}

// DDL (esplorazione + conformità) — public-api read-only, /api/public/ddl/* (docs/strategy/DDL_ESPLORA_CONFORMITA.md).
// Dataset piccolo/curato per costruzione (harvest manuale per ora, M2), fetch live come pnrrGraph/politiciGraph
// (non serve il pattern _staticJson: nessun problema di scala su poche decine di righe).
export async function ddlLista() {
  const r = await fetch(`${PUBLIC_API}/ddl/lista`)
  if (!r.ok) throw new Error('ddl lista ' + r.status)
  return r.json()
}

export async function ddlDettaglio(numero) {
  const r = await fetch(`${PUBLIC_API}/ddl/${encodeURIComponent(numero)}`)
  if (!r.ok) throw new Error('ddl dettaglio ' + r.status)
  return r.json()
}

// Direct LightRAG query (legal KG only). history = [{role:'user'|'assistant', content}]
export async function ask(query, history = []) {
  const r = await fetch(`${BASE}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, mode: 'mix', include_references: true, conversation_history: history }),
  })
  if (!r.ok) throw new Error('query ' + r.status)
  return r.json() // { response, references: [{reference_id, file_path}], ... }
}

// ───────────────────────── Gateway auth (token storage + authed fetch) ─────
// The gateway lives behind nginx at /api. Anonymous calls send no Authorization
// header (treated as anon, low rate limit); logged-in calls send the JWT.
const API = '/api'
const TOKEN_KEY = 'op-access-token'
const REFRESH_KEY = 'op-refresh-token'

// Locale corrente dal path (Italiano alla radice, English sotto /en/*). Niente import di i18n:
// api.js resta disaccoppiato. Usato per far rispondere l'agente nella lingua dell'utente.
function currentLang() {
  return (typeof location !== 'undefined' && location.pathname.startsWith('/en')) ? 'en' : 'it'
}

// Id di sessione anonimo (dura quanto la scheda/sessione del browser): raggruppa le conversazioni
// lato server (chat_log) finché la sessione non viene chiusa. Niente login richiesto.
function sessionId() {
  try {
    let s = sessionStorage.getItem('op-session')
    if (!s) {
      s = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
      sessionStorage.setItem('op-session', s)
    }
    return s
  } catch {
    return null
  }
}

export const tokens = {
  get access() {
    return localStorage.getItem(TOKEN_KEY) || ''
  },
  get refresh() {
    return localStorage.getItem(REFRESH_KEY) || ''
  },
  set({ access_token, refresh_token }) {
    if (access_token) localStorage.setItem(TOKEN_KEY, access_token)
    if (refresh_token) localStorage.setItem(REFRESH_KEY, refresh_token)
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

async function rawFetch(path, { method = 'GET', body, auth = false, headers: extra } = {}) {
  const headers = { 'Content-Type': 'application/json', ...(extra || {}) }
  if (auth && tokens.access) headers.Authorization = `Bearer ${tokens.access}`
  return fetch(API + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

async function parse(r) {
  const data = await r.json().catch(() => ({}))
  if (!r.ok) {
    const err = new Error(data.detail || data.message || `HTTP ${r.status}`)
    err.status = r.status
    throw err
  }
  return data
}

// Authenticated request with one transparent refresh-on-401 retry.
export async function authedFetch(path, opts = {}) {
  let r = await rawFetch(path, { ...opts, auth: true })
  if (r.status === 401 && tokens.refresh) {
    try {
      const refreshed = await parse(
        await rawFetch('/auth/refresh', { method: 'POST', body: { refresh_token: tokens.refresh } })
      )
      tokens.set(refreshed)
      r = await rawFetch(path, { ...opts, auth: true })
    } catch {
      tokens.clear()
    }
  }
  return parse(r)
}

function save(resp) {
  tokens.set(resp)
  return resp
}

// ───────────────────────── Auth API ────────────────────────────────────────
export const authApi = {
  register: async (email, password, name) =>
    save(await parse(await rawFetch('/auth/register', { method: 'POST', body: { email, password, name } }))),
  login: async (email, password) =>
    save(await parse(await rawFetch('/auth/login', { method: 'POST', body: { email, password } }))),
  logout: async () => {
    try {
      await rawFetch('/auth/logout', { method: 'POST', auth: true })
    } catch {}
    tokens.clear()
  },
  me: () => authedFetch('/auth/me'),
  updateMe: (patch) => authedFetch('/auth/me', { method: 'PUT', body: patch }),
  changePassword: (current_password, new_password) =>
    authedFetch('/auth/change-password', { method: 'POST', body: { current_password, new_password } }),
  forgotPassword: async (email) =>
    parse(await rawFetch('/auth/forgot-password', { method: 'POST', body: { email } })),
  resetPassword: async (token, new_password) =>
    parse(await rawFetch('/auth/reset-password', { method: 'POST', body: { token, new_password } })),
}

// ───────────────────────── Plans & billing ─────────────────────────────────
export const plansApi = {
  list: async () => parse(await rawFetch('/plans')),
}
export const billingApi = {
  checkout: (plan_slug, billing_cycle = 'monthly') =>
    authedFetch('/billing/checkout', { method: 'POST', body: { plan_slug, billing_cycle } }),
  portal: () => authedFetch('/billing/portal', { method: 'POST' }),
}

// ───────────────────────── Admin ───────────────────────────────────────────
export const adminApi = {
  users: () => authedFetch('/admin/users'),
  patchUser: (id, patch) => authedFetch(`/admin/users/${id}`, { method: 'PATCH', body: patch }),
  gift: (id) => authedFetch(`/admin/users/${id}/gift`, { method: 'POST' }),
}

// STREAMING (SSE): inoltra gli eventi del processo in tempo reale (step_start/step_end/answer).
// Usa fetch (EventSource non supporta POST+Authorization) con un refresh-on-401 trasparente.
export async function askAgentStream(question, conversationId, { onStep, onAnswer, onError } = {}) {
  const doFetch = (tok) =>
    fetch(API + '/ask/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': currentLang(),
        ...(tok ? { Authorization: `Bearer ${tok}` } : {}),
      },
      body: JSON.stringify({ question, conversation_id: conversationId, session_id: sessionId(), lang: currentLang() }),
    })
  let r = await doFetch(tokens.access)
  if (r.status === 401 && tokens.refresh) {
    try {
      const refreshed = await parse(await rawFetch('/auth/refresh', { method: 'POST', body: { refresh_token: tokens.refresh } }))
      tokens.set(refreshed)
      r = await doFetch(tokens.access)
    } catch { tokens.clear() }
  }
  if (!r.ok || !r.body) {
    const e = new Error(`HTTP ${r.status}`); e.status = r.status; throw e
  }
  const reader = r.body.getReader()
  const dec = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    let idx
    while ((idx = buf.indexOf('\n\n')) >= 0) {
      const block = buf.slice(0, idx).trim()
      buf = buf.slice(idx + 2)
      if (!block.startsWith('data:')) continue
      let ev
      try { ev = JSON.parse(block.slice(5).trim()) } catch { continue }
      if (ev.type === 'step_start' || ev.type === 'step_end') onStep?.(ev)
      else if (ev.type === 'answer') onAnswer?.(ev.result)
      else if (ev.type === 'error') onError?.(new Error(ev.error))
    }
  }
}

// LEGGE + DATI agent (Gemini tool-calling) — now via the gateway (/api/ask),
// which enforces per-caller rate limits and saves history for logged-in users.
export async function askAgent(question, conversationId = null) {
  return authedFetch('/ask', {
    method: 'POST',
    headers: { 'Accept-Language': currentLang() },
    body: { question, conversation_id: conversationId, session_id: sessionId(), lang: currentLang() },
  })
  // { answer, articoli_citati[], dataset[], dataset_totali, statistiche[], novita_normative[], tools_used[],
  //   parlamentari[], indice_di_forza[], profilo{}, votazioni[], decreti_legge[], attivita_legislativa[],
  //   organi_parlamentari[], fonte_openpolis }  ← dati OpenPolis (CC-BY-NC)
}
