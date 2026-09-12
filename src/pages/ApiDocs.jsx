import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { breadcrumb, faqPage, softwareApplication } from '../seo.jsx'
import itC from '../locales/it/apidocs.js'
import enC from '../locales/en/apidocs.js'

// Pagina API pubblica read-only. Bilingue (it/en) — target "Italian law API",
// "open data norme italiane API". Vedi docs/strategy/API_PUBBLICA_E_GRAFO.md.

const SWAGGER = '/api/public/docs'
const OPENAPI = '/api/public/openapi.json'

const ENDPOINTS = [
  ['GET /api/public/norme', 'Elenco delle norme del corpus (ELI, tipo, titolo, n. articoli/relazioni). Filtri: ?tipo= ?q= ?limit= ?offset=', 'List of statutes (ELI, type, title, counts)'],
  ['GET /api/public/norme/{eli}', 'Dettaglio di una norma: testo per-articolo + cosa modifica / da chi è modificata', 'Statute detail: per-article text + amendment relations'],
  ['GET /api/public/relazioni?norma=', 'Relazioni di modifica di una norma (?dir=out|in|entrambe)', 'Amendment relations of a statute'],
  ['GET /api/public/graph', 'Knowledge graph delle relazioni (nodi + archi). ?livello=norma|articolo', 'Relations knowledge graph (nodes + links)'],
  ['GET /api/public/health', 'Stato del servizio e conteggi', 'Service status and counts'],
]

export default function ApiDocs() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const t = lang === 'en' ? enC : itC
  const alternates = [{ lang: 'it', path: itC.path }, { lang: 'en', path: enC.path }]
  const ld = [
    softwareApplication({
      name: 'Open·Parlamento — Public API', description: t.desc,
      url: 'https://openlegis.it' + t.path, category: 'DeveloperApplication', lang,
    }),
    faqPage(t.faq),
    breadcrumb(lang === 'en' ? [['Open·Parlamento', '/en'], ['API', t.path]] : [['Open·Parlamento', '/'], ['Documentazione', '/docs'], ['API', t.path]]),
  ]
  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang} alternates={alternates} jsonLd={ld}
        keywords="API legge italiana, Italian law API, open data norme API, REST API Normattiva, knowledge graph API, ELI API, open data Italy law" />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={lang === 'en' ? '/en' : '/'}>Open·Parlamento</a> › <span>API</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{t.kicker}</div><h1>{t.h1}</h1></header>
          <p className="lead">{t.lead}</p>

          <h2>{t.docH}</h2>
          <p>{t.docP}</p>
          <p>
            <a href={SWAGGER} target="_blank" rel="noopener">Swagger UI ↗</a> ·{' '}
            <a href={OPENAPI} target="_blank" rel="noopener">openapi.json ↗</a>
          </p>

          <h2>{t.epH}</h2>
          <div className="doc-table">
            <div className="doc-tr doc-th"><span>Endpoint</span><span>{lang === 'en' ? 'What' : 'Cosa'}</span></div>
            {ENDPOINTS.map(([ep, dIt, dEn]) => (
              <div className="doc-tr" key={ep}><span className="mono">{ep}</span><span>{lang === 'en' ? dEn : dIt}</span></div>
            ))}
          </div>

          <h2>{t.exH}</h2>
          <pre className="seo-code"><code>{`# ${lang === 'en' ? 'List laws' : 'Elenco leggi'}
curl "https://openlegis.it/api/public/norme?tipo=legge&limit=5"

# ${lang === 'en' ? 'What a decree amends' : 'Cosa modifica un decreto'}
curl "https://openlegis.it/api/public/relazioni?norma=DL%2019/2024&dir=out"

# ${lang === 'en' ? 'Relations knowledge graph' : 'Knowledge graph delle relazioni'}
curl "https://openlegis.it/api/public/graph?livello=norma"`}</code></pre>

          <h2>{t.licH}</h2>
          <p>{t.licP}</p>

          <h2>{t.relH}</h2>
          <p>
            <a href={lang === 'en' ? '/en/open-data' : '/open-data'}>{lang === 'en' ? 'Open data' : 'Open data'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/mcp-server' : '/docs/mcp-server'}>MCP server</a> ·{' '}
            <a href="/norme">{lang === 'en' ? 'Indexed statutes' : 'Norme indicizzate'}</a> ·{' '}
            <a href={t.alt}>{lang === 'en' ? 'Versione italiana' : 'English'}</a>
          </p>
        </article>
      </main>
    </>
  )
}
