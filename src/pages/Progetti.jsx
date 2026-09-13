import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { breadcrumb, softwareSourceCode, faqPage } from '../seo.jsx'
import itC from '../locales/it/progetti.js'
import enC from '../locales/en/progetti.js'

// Pagina «Progetti & librerie»: lista i progetti open source di OpenLegis, con
// RepublicMCP evidenziato come origine. Bilingue (it /progetti ↔ en /projects). SEO + JSON-LD.

// Link esterni, language-neutral (condivisi fra le due lingue).
const LINKS = {
  site: 'https://openlegis.it',            // il monorepo (webapp+agent) è privato: la voce "OpenLegis" punta al sito, non a GitHub
  republicMCP: 'https://github.com/giuliogarofalo/RepublicMCP',
  republicMCPnpm: 'https://www.npmjs.com/package/republic-mcp',
  openParlamentoMcpGithub: 'https://github.com/giuliogarofalo/open-parlamento-mcp',
  mcpPypi: 'https://pypi.org/project/open-parlamento-mcp/',
  ontologyDiff: 'https://github.com/giuliogarofalo/RepublicMCP/blob/main/docs/senato/03-differenze-camera-senato.md',
  lightrag: 'https://github.com/HKUDS/LightRAG',
  normattiva: 'https://dati.normattiva.it',
  camera: 'https://dati.camera.it/sparql',
  senato: 'https://dati.senato.it/sparql',
  eurlex: 'https://eur-lex.europa.eu',
  graph: 'https://openlegis.it/graph-relations.json',
  norme: '/norme',
}

export default function Progetti() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const t = lang === 'en' ? enC : itC
  const home = lang === 'en' ? '/en' : '/'
  const mcpHref = lang === 'en' ? '/en/mcp-server' : '/docs/mcp-server'
  const openDataHref = lang === 'en' ? '/en/open-data' : '/open-data'
  const alternates = [{ lang: 'it', path: itC.path }, { lang: 'en', path: enC.path }]

  const ld = [
    softwareSourceCode({
      name: 'republic-mcp', description: 'MCP server for the Italian Chamber & Senate (SPARQL) + Openpolis.',
      codeRepository: LINKS.republicMCP, programmingLanguage: 'TypeScript', url: LINKS.republicMCPnpm,
    }),
    softwareSourceCode({
      name: 'open-parlamento-mcp', description: 'MCP server for Italian & EU law, case law, statistics and open data.',
      codeRepository: LINKS.openParlamentoMcpGithub, programmingLanguage: 'Python', url: LINKS.mcpPypi,
    }),
    faqPage(t.faq),
    breadcrumb(lang === 'en'
      ? [['OpenLegis', '/en'], ['Projects', t.path]]
      : [['OpenLegis', '/'], ['Progetti', t.path]]),
  ]

  const Row = ([n, reg, d, key, badge]) => {
    const href = key && LINKS[key]
    const live = badge === 'attivo' || badge === 'active' || badge === 'origine' || badge === 'origin'
    return (
      <div className="doc-tr" key={n}>
        <span className="mono">{href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{n} ↗</a> : n}</span>
        <span className="tag">{reg}</span>
        <span>{d} {badge && <span className={`badge ${live ? 'live' : 'soon'}`}>{badge}</span>}</span>
      </div>
    )
  }

  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang} alternates={alternates} jsonLd={ld}
        keywords="open source MCP server, RepublicMCP, republic-mcp, open-parlamento-mcp, Italian parliament MCP, Italian law MCP, knowledge graph giuridico, SPARQL Camera Senato" />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={home}>OpenLegis</a> › <span>{t.h1}</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{t.kicker}</div>
            <h1>{t.h1}</h1>
          </header>
          <p className="lead">{t.lead}</p>

          <h2>{t.originH}</h2>
          <p>{t.originP}</p>
          <p>{t.originP2}</p>
          <p><a href={LINKS.ontologyDiff} target="_blank" rel="noopener noreferrer">{t.ontologyDiffLabel} ↗</a></p>

          <h2>{t.mineH}</h2>
          <div className="doc-table">
            <div className="doc-tr doc-th"><span>{lang === 'en' ? 'Project' : 'Progetto'}</span><span>{lang === 'en' ? 'Type' : 'Tipo'}</span><span>{lang === 'en' ? 'What' : 'Cosa'}</span></div>
            {t.mine.map(Row)}
          </div>

          <h2>{t.dataH}</h2>
          <div className="doc-table">
            <div className="doc-tr doc-th"><span>{lang === 'en' ? 'Dataset' : 'Dataset'}</span><span>{lang === 'en' ? 'Format' : 'Formato'}</span><span>{lang === 'en' ? 'What' : 'Cosa'}</span></div>
            {t.data.map(Row)}
          </div>

          <h2>{t.stackH}</h2>
          <p>{t.stackP}</p>
          <div className="doc-links">
            {t.stack.map(([n, d, key]) => {
              const href = LINKS[key]
              return (
                <div className="doc-link" key={n}>
                  <div className="dl-h"><b>{n}</b>{href && <a href={href} target="_blank" rel="noopener noreferrer">↗</a>}</div>
                  <p>{d}</p>
                </div>
              )
            })}
          </div>

          <h2>{t.ctaH}</h2>
          <p>{t.ctaP}</p>
          <p>
            <a href={LINKS.republicMCPnpm} target="_blank" rel="noopener">republic-mcp · npm ↗</a> ·{' '}
            <a href={LINKS.mcpPypi} target="_blank" rel="noopener">open-parlamento-mcp · PyPI ↗</a> ·{' '}
            <a href={LINKS.republicMCP} target="_blank" rel="noopener">RepublicMCP · GitHub ↗</a> ·{' '}
            <a href={LINKS.openParlamentoMcpGithub} target="_blank" rel="noopener">open-parlamento-mcp · GitHub ↗</a>
          </p>

          <h2>{lang === 'en' ? 'FAQ' : 'Domande frequenti'}</h2>
          <div className="doc-list" style={{ listStyle: 'none', padding: 0 }}>
            {t.faq.map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <h3 style={{ margin: '0 0 4px' }}>{f.q}</h3>
                <p style={{ margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>

          <h2>{t.relatedH}</h2>
          <p>
            <a href={mcpHref}>{lang === 'en' ? 'MCP server' : 'MCP server'}</a> ·{' '}
            <a href={openDataHref}>{lang === 'en' ? 'Open data' : 'Open data'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/pnrr' : '/pnrr'}>{lang === 'en' ? 'PNRR contracts' : 'Appalti PNRR'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/politici' : '/politici'}>{lang === 'en' ? 'MPs' : 'Parlamentari'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/how-it-works' : '/come-funziona'}>{lang === 'en' ? 'How it works' : 'Come funziona'}</a> ·{' '}
            <a href={lang === 'en' ? '/progetti' : '/en/projects'}>{lang === 'en' ? 'Versione italiana' : 'English'}</a>
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>{t.disclaimer}</p>
        </article>
      </main>
    </>
  )
}
