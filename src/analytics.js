// Analytics rispettoso della privacy — Umami (self-hosted, cookieless, nessun IP memorizzato).
// Sostituisce Google Analytics. Lo script viene iniettato SOLO se in build è configurato un
// website-id (VITE_UMAMI_WEBSITE_ID): così i build di dev/anteprima restano senza analytics.
// Umami traccia automaticamente le pageview anche nelle navigazioni SPA (history API) → non
// serve tracciamento manuale per-rotta.
const ID = import.meta.env.VITE_UMAMI_WEBSITE_ID
const SRC = import.meta.env.VITE_UMAMI_SRC || '/umami/script.js'

if (ID && typeof document !== 'undefined') {
  const s = document.createElement('script')
  s.defer = true
  s.src = SRC
  s.setAttribute('data-website-id', ID)
  document.head.appendChild(s)
}
