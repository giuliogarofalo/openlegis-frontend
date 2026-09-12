// Single source of truth for locale ↔ path logic, shared by i18n init,
// LocaleLayout, the SiteHeader language switcher and seo.jsx.
// URL strategy: Italian lives at the root (no prefix, preserves indexed URLs),
// English mirrors every route under `/en/*`.
export const LOCALES = ['it', 'en']
export const DEFAULT_LOCALE = 'it'

// Routes whose English slug differs from the Italian one — either to preserve an
// already-indexed EN URL (the docs pages historically lived at /en/api, /en/mcp-server,
// not /en/docs/...) or for better EN SEO than a transliterated slug.
// [italianPath, englishPathWithoutEnPrefix]. Everything not listed mirrors 1:1
// (`/x` ↔ `/en/x`). Keep in sync with routes.config.jsx `enPath`.
export const SLUG_ALIASES = [
  ['/docs/api', '/api'],
  ['/docs/mcp-server', '/mcp-server'],
  ['/sostieni', '/support'],
  ['/intelligenza-artificiale-legge-italiana', '/ai-italian-law'], // EN slug per la landing AI
  ['/progetti', '/projects'],
  ['/come-funziona', '/how-it-works'],
]

// Locale implied by a pathname.
export function langFromPath(pathname = '/') {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it'
}

// Strip the `/en` prefix → the canonical Italian path (the hreflang base).
export function itPathOf(pathname = '/') {
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/en/')) {
    const en = pathname.slice(3) // '/en/support' → '/support'
    const alias = SLUG_ALIASES.find(([, e]) => e === en)
    return alias ? alias[0] : en
  }
  return pathname
}

// Add the `/en` prefix to an Italian path (honouring localized slugs).
export function enPathOf(itPath = '/') {
  if (itPath === '/') return '/en'
  const alias = SLUG_ALIASES.find(([it]) => it === itPath)
  return '/en' + (alias ? alias[1] : itPath)
}

// Counterpart of `pathname` in the other locale (pure string transform — routes mirror 1:1).
export function otherLocalePath(pathname = '/') {
  return langFromPath(pathname) === 'en' ? itPathOf(pathname) : enPathOf(pathname)
}

// hreflang alternates for a canonical Italian path. The IT entry is also x-default (seo.jsx).
export function altsFor(itPath = '/') {
  return [
    { lang: 'it', path: itPath },
    { lang: 'en', path: enPathOf(itPath) },
  ]
}
