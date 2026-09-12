// Per-route SEO + GEO head management (react-helmet-async).
// Emits title/description/canonical, Open Graph, Twitter cards and JSON-LD.
// Every page also carries the global Organization + WebSite structured data,
// so any single crawled page is enough for an engine to understand the site.
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { itPathOf, altsFor } from './locale.js'

export const SITE = 'https://openlegis.it'
export const SITE_NAME = 'Open·Parlamento'
export const DEFAULT_DESC =
  'Un agente che risponde su Costituzione, codici e diritto UE con fonti reali e citabili (ELI/CELEX), su un grafo di conoscenza navigabile.'
export const DEFAULT_DESC_EN =
  'An agent answering questions on the Italian Constitution, codes and EU law with real, citable sources (ELI/CELEX), on a navigable knowledge graph.'
export const OG_IMAGE = SITE + '/og-cover.png'
export const DEFAULT_KEYWORDS =
  'intelligenza artificiale legge italiana, AI diritto italiano, AI legislazione italiana, agente AI legge, legge italiana, Costituzione, codici, decreti, diritto UE, Normattiva, ELI, CELEX, open data, OSINT legislativo, knowledge graph giuridico, iter parlamentare'
export const DEFAULT_KEYWORDS_EN =
  'AI for Italian law, Italian law AI, artificial intelligence Italian legislation, Italian law chatbot, Italian law, Italian Constitution, Italian codes, decrees, EU law, Normattiva, ELI, CELEX, open data, legislative OSINT, legal knowledge graph, Italian parliament'

// Re-export so pages can build hreflang alternates from a single source (locale.js).
export { altsFor }

// JSON-LD present on every page: who we are + the website itself.
function globalLd(lang = 'it') {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': SITE + '/#org',
      name: SITE_NAME,
      alternateName: 'Open Parlamento',
      url: SITE,
      logo: SITE + '/icon-512.png',
      description: DEFAULT_DESC,
      email: 'open-parlament@proton.me',
      founder: { '@type': 'Person', name: 'Giulio Garofalo' },
      knowsAbout: [
        'Costituzione italiana',
        'Codice penale',
        'Diritto dell’Unione Europea',
        'Iter parlamentare',
        'Open data pubblici',
        'OSINT legislativo (open-source intelligence)',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': SITE + '/#website',
      url: SITE,
      name: SITE_NAME,
      inLanguage: lang === 'en' ? 'en-US' : 'it-IT',
      publisher: { '@id': SITE + '/#org' },
    },
  ]
}

export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  jsonLd = [],
  noindex = false,
  keywords,
  lang,
  // hreflang alternates: [{ lang: 'it'|'en', path: '/...' }, ...]. The IT entry (or the
  // first) is also emitted as x-default. When omitted they are auto-derived from `path`
  // (routes mirror 1:1 with /en/*); pass explicitly only for EN-only pages (self-only).
  alternates,
}) {
  const { i18n } = useTranslation()
  const loc = lang || (i18n.language === 'en' ? 'en' : 'it')
  const en = loc === 'en'
  const url = SITE + path
  const desc = description || (en ? DEFAULT_DESC_EN : DEFAULT_DESC)
  const kw = keywords || (en ? DEFAULT_KEYWORDS_EN : DEFAULT_KEYWORDS)
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — ${en ? 'query Italian law' : 'interroga la legge'}`
  const blocks = [...globalLd(loc), ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])].filter(Boolean)
  const alts = alternates && alternates.length ? alternates : altsFor(itPathOf(path))
  const xDefault = alts.find((a) => a.lang === 'it') || alts[0]

  return (
    <Helmet>
      <html lang={loc} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {kw && <meta name="keywords" content={kw} />}
      <link rel="canonical" href={url} />
      {alts.map((a) => (
        <link key={a.lang} rel="alternate" hrefLang={a.lang} href={SITE + a.path} />
      ))}
      {xDefault && <link rel="alternate" hrefLang="x-default" href={SITE + xDefault.path} />}
      <meta
        name="robots"
        content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'}
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={en ? 'en_US' : 'it_IT'} />
      <meta property="og:locale:alternate" content={en ? 'it_IT' : 'en_US'} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(b)}
        </script>
      ))}
    </Helmet>
  )
}

// Small helper to build a BreadcrumbList from [name, path] pairs.
export function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, p], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: SITE + p,
    })),
  }
}

/* ─── JSON-LD helpers riusabili dalle pagine SEO (vedi docs/strategy/SEO.md) ─── */

// SoftwareApplication — per le pagine MCP server (developer tooling, free/open source).
export function softwareApplication({ name, description, url, category = 'DeveloperApplication', os = 'Cross-platform', sameAs = [], lang = 'it' }) {
  return {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name, description, url, applicationCategory: category, operatingSystem: os,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    isAccessibleForFree: true, inLanguage: lang === 'en' ? 'en' : 'it',
    ...(sameAs.length ? { sameAs } : {}),
  }
}

// SoftwareSourceCode — il repository/pacchetto open source.
export function softwareSourceCode({ name, description, codeRepository, programmingLanguage, url, license = 'https://opensource.org/licenses/MIT' }) {
  return {
    '@context': 'https://schema.org', '@type': 'SoftwareSourceCode',
    name, description, codeRepository, programmingLanguage, url, license,
  }
}

// FAQPage — domande/risposte (boost rich-result + GEO). items: [{q, a}]
export function faqPage(items) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

// Dataset — per la pagina open-data (grafo delle relazioni, corpus).
export function dataset({ name, description, url, license = 'https://creativecommons.org/licenses/by/4.0/', keywords = [], distribution = [], lang = 'it' }) {
  return {
    '@context': 'https://schema.org', '@type': 'Dataset',
    name, description, url, license, inLanguage: lang === 'en' ? 'en' : 'it',
    ...(keywords.length ? { keywords } : {}),
    ...(distribution.length ? { distribution: distribution.map((d) => ({ '@type': 'DataDownload', ...d })) } : {}),
    creator: { '@id': SITE + '/#org' },
  }
}

// HowTo — guide passo-passo. steps: [{name, text}]
export function howTo({ name, description, steps = [], lang = 'it' }) {
  return {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name, description, inLanguage: lang === 'en' ? 'en' : 'it',
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
  }
}

// DefinedTermSet — glossario. terms: [{id, name, description}]
export function definedTermSet({ name, description, terms = [], lang = 'it', url = SITE + '/docs/glossario' }) {
  return {
    '@context': 'https://schema.org', '@type': 'DefinedTermSet',
    '@id': url, name, description, inLanguage: lang === 'en' ? 'en' : 'it', url,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm', '@id': `${url}#${t.id}`, name: t.name, description: t.description,
      inDefinedTermSet: url,
    })),
  }
}
