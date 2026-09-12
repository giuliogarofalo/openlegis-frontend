import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { breadcrumb, dataset, faqPage } from '../seo.jsx'
import itC from '../locales/it/opendata.js'
import enC from '../locales/en/opendata.js'

// Pagina open-data / dataset. Target: "open data parlamento", "dataset norme italiane",
// "OSINT legislativo". Pubblica graph-relations.json come schema.org Dataset. Bilingue. SEO.md (F1.5).

const GRAPH_URL = 'https://openlegis.it/graph-relations.json'

export default function OpenData() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const t = lang === 'en' ? enC : itC
  const alternates = [{ lang: 'it', path: itC.path }, { lang: 'en', path: enC.path }]
  const ld = [
    dataset({
      name: lang === 'en' ? 'Italian law — amendment relations graph' : 'Legge italiana — grafo delle relazioni di modifica',
      description: t.desc, url: GRAPH_URL,
      keywords: ['open data', 'legge italiana', 'Normattiva', 'ELI', 'knowledge graph', 'OSINT legislativo', 'Italian law', 'legal graph'],
      distribution: [{ encodingFormat: 'application/json', contentUrl: GRAPH_URL }], lang,
    }),
    faqPage(t.faq),
    breadcrumb(lang === 'en' ? [['OpenLegis', '/en'], ['Open data', t.path]] : [['OpenLegis', '/'], ['Open data', t.path]]),
  ]
  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang} alternates={alternates} jsonLd={ld}
        keywords="open data parlamento, dataset norme italiane, open data legge, OSINT legislativo, Normattiva open data, knowledge graph giuridico, Italian law open data" />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={lang === 'en' ? '/en' : '/'}>OpenLegis</a> › <span>Open data</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{t.kicker}</div>
            <h1>{t.h1}</h1>
          </header>
          <p className="lead">{t.lead}</p>

          <h2>{t.ds}</h2>
          <div className="doc-table">
            <div className="doc-tr doc-th"><span>{lang === 'en' ? 'Dataset' : 'Dataset'}</span><span>{lang === 'en' ? 'What' : 'Cosa'}</span><span>{lang === 'en' ? 'Format' : 'Formato'}</span></div>
            {t.items.map(([n, d, f]) => (
              <div className="doc-tr" key={n}><span className="mono">{n}</span><span>{d}</span><span className="tag">{f}</span></div>
            ))}
          </div>

          <h2>{t.liveH} <span className="badge live">live</span></h2>
          <p>{t.liveP}</p>
          <div className="doc-table four">
            <div className="doc-tr doc-th"><span>{t.liveCols[0]}</span><span>{t.liveCols[1]}</span><span>{t.liveCols[2]}</span><span>{t.liveCols[3]}</span></div>
            {t.live.map(([src, what, access, cov]) => (
              <div className="doc-tr" key={src}><span className="mono">{src}</span><span>{what}</span><span className="tag">{access}</span><span>{cov}</span></div>
            ))}
          </div>
          <p className="doc-note">{t.liveNote}</p>

          <h2>{t.srcH}</h2>
          <p>{t.src}</p>

          <h2>{t.relatedH}</h2>
          <p>
            <a href={lang === 'en' ? '/en/mcp-server' : '/docs/mcp-server'}>{lang === 'en' ? 'MCP server' : 'MCP server'}</a> ·{' '}
            <a href="/norme">{lang === 'en' ? 'Indexed statutes' : 'Norme indicizzate'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/pnrr' : '/pnrr'}>{lang === 'en' ? 'PNRR contracts' : 'Appalti PNRR'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/politici' : '/politici'}>{lang === 'en' ? 'MPs' : 'Parlamentari'}</a>
            {lang === 'en' ? <> · <a href="/open-data">Versione italiana</a></> : <> · <a href="/en/open-data">English</a> · <a href="/docs/glossario">glossario</a></>}
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>{t.disclaimer}</p>
        </article>
      </main>
    </>
  )
}
