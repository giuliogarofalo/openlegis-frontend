import SiteHeader from '../SiteHeader.jsx'
import Seo, { breadcrumb, faqPage } from '../seo.jsx'
import enC from '../locales/en/enlaw.js'

// English landing for the Italian legal corpus (Fase 2). Targets "Italian law",
// "Italian constitution in English", "Italian legal data / open data". Links into
// the (Italian) corpus and the app. No strict hreflang twin (content spans many IT pages).

export default function EnLaw() {
  const path = enC.path
  const desc = enC.desc
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'Italian law, explained and queryable', description: desc, inLanguage: 'en',
      url: 'https://openlegis.it' + path, mainEntityOfPage: 'https://openlegis.it' + path,
      author: { '@type': 'Person', name: 'Giulio Garofalo' }, publisher: { '@id': 'https://openlegis.it/#org' },
    },
    faqPage(enC.faq),
    breadcrumb([['OpenLegis', '/en'], ['Italian law', path]]),
  ]
  return (
    <>
      <Seo path={path} title="Italian law, explained and queryable" description={desc} type="article" lang="en" jsonLd={ld}
        alternates={[{ lang: 'en', path: '/en/italian-law' }]}
        keywords="Italian law, Italian constitution, Italian legal code, Italian law in English, Normattiva, EUR-Lex, Italian legal data, open data Italy law" />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href="/en">OpenLegis</a> › <span>Italian law</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">italian law · real sources</div>
            <h1>Italian law, explained and queryable</h1>
          </header>
          <p className="lead">
            OpenLegis turns Italian law into something you can read, navigate and cite: the Constitution,
            the codes, consolidated statutes and EU law — each with a stable identifier (ELI/CELEX) and the real
            amendment relations behind it.
          </p>

          <h2>What you’ll find</h2>
          <ul className="doc-list">
            <li><b>The Constitution</b> — the fundamental law of the Italian Republic (1948): structure and key articles (page in Italian: <a href="/costituzione">Costituzione</a>).</li>
            <li><b>The codes</b> — penal, civil, procedure, road, consumer, insurance (in Italian: <a href="/codici">codici</a>).</li>
            <li><b>Consolidated statutes</b> — decrees and laws with per-article text and amendment relations: <a href="/norme">indexed corpus</a>.</li>
            <li><b>EU law & case law</b> — regulations, directives and CJEU rulings via EUR-Lex (CELEX).</li>
          </ul>

          <h2>Query it</h2>
          <p>
            Ask a question in the <a href="/app">app</a> and get an answer with the real source cited — or, for
            developers, plug the <a href="/en/mcp-server">open-source MCP servers</a> into Claude Desktop or Cursor.
          </p>

          <h2>Open data</h2>
          <p>
            The legal corpus, amendment relations and the knowledge graph are public and citable — see{' '}
            <a href="/en/open-data">open data</a>. Italian site: <a href="/">openlegis.it</a>.
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>
            Informational tool — not legal advice. Sources are public and citable (ELI/CELEX).
          </p>
        </article>
      </main>
    </>
  )
}
