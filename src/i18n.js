// i18next bootstrap. Translations are BUNDLED synchronously (no HTTP backend):
// the Playwright prerender (scripts/prerender.mjs) snapshots the SPA, so the
// active locale must render with real content on the first paint — no async fetch.
//
// Every `src/locales/<lng>/<ns>.json` is picked up automatically via import.meta.glob,
// so adding a namespace file needs no change here. Rich editorial prose instead lives
// in `src/locales/<lng>/<ns>.js` content modules imported directly by their components
// (only their inline-emphasis fragments go through i18next via <Trans defaults>).
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { langFromPath, DEFAULT_LOCALE } from './locale.js'

const modules = import.meta.glob('./locales/*/*.json', { eager: true })
const resources = {}
for (const [path, mod] of Object.entries(modules)) {
  const m = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/)
  if (!m) continue
  const [, lng, ns] = m
  ;(resources[lng] ||= {})[ns] = mod.default || mod
}
const namespaces = [...new Set(Object.values(resources).flatMap((r) => Object.keys(r)))]

// First paint must be correct for prerender + hard loads: derive the initial
// language from the URL (the route layer keeps it in sync on SPA navigation).
const initialLng =
  typeof window !== 'undefined' ? langFromPath(window.location.pathname) : DEFAULT_LOCALE

i18n.use(initReactI18next).init({
  resources,
  lng: initialLng,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: ['it', 'en'],
  ns: namespaces.length ? namespaces : ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false }, // React already escapes
  react: { useSuspense: false }, // sync resources + prerender: no Suspense
})

export default i18n
