import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { breadcrumb, softwareApplication, softwareSourceCode, faqPage } from '../seo.jsx'
import itC from '../locales/it/mcp.js'
import enC from '../locales/en/mcp.js'

// Pagina flagship per i developer: gli MCP server open source di OpenLegis.
// Bilingue (it/en) per intercettare "open source MCP server", "Italian law/parliament MCP".
// Vedi docs/strategy/SEO.md (Fase 1.1).

const NPM = 'https://www.npmjs.com/package/republic-mcp'
const PYPI = 'https://pypi.org/project/openlegis-mcp/'
const GITHUB_MCP = 'https://github.com/giuliogarofalo/RepublicMCP'
const GITHUB_OPMCP = 'https://github.com/giuliogarofalo/openlegis-mcp'

const CLAUDE_CFG = `{
  "mcpServers": {
    "republic": { "command": "npx", "args": ["-y", "republic-mcp"] },
    "openlegis": { "command": "openlegis-mcp" }
  }
}`

const TOOLS = [
  ['republic-mcp', 'npm · TypeScript', 'Camera & Senato (SPARQL): atti, iter, votazioni, firmatari + OpenPolis (parlamentari, indice di forza, votazioni, decreti, organi)'],
  ['openlegis-mcp', 'PyPI · Python', 'Costituzione & codici (LightRAG), modifiche normative (Normattiva), diritto e giurisprudenza UE/Consulta/Cassazione, norme impugnate, statistiche Eurostat, Gazzetta Ufficiale, dati pubblici CKAN'],
]

export default function McpServer() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const t = lang === 'en' ? enC : itC
  const alternates = [
    { lang: 'it', path: itC.path },
    { lang: 'en', path: enC.path },
  ]
  const ld = [
    softwareApplication({
      name: 'OpenLegis MCP servers',
      description: t.desc,
      url: 'https://openlegis.it' + t.path,
      sameAs: [NPM, PYPI, GITHUB_MCP, GITHUB_OPMCP], lang,
    }),
    softwareSourceCode({
      name: 'republic-mcp', description: 'MCP server for the Italian Chamber & Senate (SPARQL) + OpenPolis.',
      codeRepository: GITHUB_MCP, programmingLanguage: 'TypeScript', url: NPM,
    }),
    softwareSourceCode({
      name: 'openlegis-mcp', description: 'MCP server for Italian & EU law, case law, statistics and open data.',
      codeRepository: GITHUB_OPMCP, programmingLanguage: 'Python', url: PYPI,
    }),
    faqPage(t.faq),
    breadcrumb(lang === 'en'
      ? [['OpenLegis', '/en'], ['MCP server', t.path]]
      : [['OpenLegis', '/'], ['Documentazione', '/docs'], ['MCP server', t.path]]),
  ]

  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang}
        alternates={alternates} jsonLd={ld}
        keywords="MCP server, open source MCP server, Model Context Protocol, Italian law MCP, parliament MCP, republic-mcp, openlegis-mcp, Normattiva, EUR-Lex" />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={lang === 'en' ? '/en' : '/'}>OpenLegis</a> › <span>MCP server</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{t.kicker}</div>
            <h1>{t.h1}</h1>
          </header>
          <p className="lead">{t.lead}</p>

          <h2>{t.whatH}</h2>
          <p>{t.what}</p>

          <h2>{t.pkgH}</h2>
          <div className="doc-table">
            <div className="doc-tr doc-th"><span>Pacchetto</span><span>Registry</span><span>Copertura</span></div>
            {TOOLS.map(([n, reg, d]) => (
              <div className="doc-tr" key={n}><span className="mono">{n}</span><span className="tag">{reg}</span><span>{d}</span></div>
            ))}
          </div>

          <h2>{t.instH}</h2>
          <pre className="seo-code"><code>{`# republic-mcp (Camera/Senato + OpenPolis)
npx -y republic-mcp

# openlegis-mcp (legge, UE, giurisprudenza, dati)
pip install openlegis-mcp
openlegis-mcp`}</code></pre>

          <h2>{t.cfgH}</h2>
          <p>{t.cfgP}</p>
          <pre className="seo-code"><code>{CLAUDE_CFG}</code></pre>

          <h2>{t.freeH}</h2>
          <p>{t.freeP}</p>
          <p>
            <a href={NPM} target="_blank" rel="noopener">republic-mcp · npm ↗</a> ·{' '}
            <a href={PYPI} target="_blank" rel="noopener">openlegis-mcp · PyPI ↗</a> ·{' '}
            <a href={GITHUB_MCP} target="_blank" rel="noopener">republic-mcp · {lang === 'en' ? 'code' : 'codice'} ↗</a> ·{' '}
            <a href={GITHUB_OPMCP} target="_blank" rel="noopener">openlegis-mcp · {lang === 'en' ? 'code' : 'codice'} ↗</a>
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

          <h2>{t.related}</h2>
          <p>
            {t.relLinks.map(([label, href], i) => (
              <span key={href}>{i > 0 ? ' · ' : ''}
                {href.startsWith('/docs') || href.startsWith('/en') || href === '/' || href === '/costituzione' || href === '/open-data'
                  ? <a href={href}>{label}</a> : <a href={href}>{label}</a>}
              </span>
            ))}
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>{t.disclaimer}</p>
        </article>
      </main>
    </>
  )
}
