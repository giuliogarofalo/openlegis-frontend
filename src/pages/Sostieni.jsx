import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { breadcrumb, faqPage } from '../seo.jsx'
import itC from '../locales/it/sostieni.js'
import enC from '../locales/en/sostieni.js'

// Pagina "Sostieni / Contribuisci" (IT) + "Support" (EN). Asset per la traccia grant/community
// (vedi docs/strategy/LANCIO_E_SOSTENIBILITA.md). Bilingue, hreflang.

const GITHUB = 'https://github.com/giuliogarofalo/RepublicMCP' // repo pubblico (l'origine) — il monorepo del progetto è privato
const NPM = 'https://www.npmjs.com/package/republic-mcp'
const PYPI = 'https://pypi.org/project/openlegis-mcp/'
const MAIL = 'open-parlament@proton.me'

export default function Sostieni() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const t = lang === 'en' ? enC : itC
  const alternates = [{ lang: 'it', path: itC.path }, { lang: 'en', path: enC.path }]
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: t.title, description: t.desc, inLanguage: t.lang,
      url: 'https://openlegis.it' + t.path, isPartOf: { '@id': 'https://openlegis.it/#website' },
    },
    faqPage(t.faq),
    breadcrumb(lang === 'en' ? [['OpenLegis', '/en'], ['Support', t.path]] : [['OpenLegis', '/'], ['Sostieni', t.path]]),
  ]
  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang} alternates={alternates} jsonLd={ld}
        keywords={lang === 'en' ? 'support open source civic tech, contribute Italian law open data, open infrastructure grant' : 'sostieni open source, contribuisci open data, civic tech italia, beni comuni digitali, open parlamento contribuire'} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={lang === 'en' ? '/en' : '/'}>OpenLegis</a> › <span>{lang === 'en' ? 'Support' : 'Sostieni'}</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{t.kicker}</div><h1>{t.h1}</h1></header>
          <p className="lead">{t.lead}</p>

          <div className="doc-card-grid">
            {t.ways.map(([h, d]) => (
              <div className="doc-card" key={h}><div className="doc-card-glyph">§</div><h3>{h}</h3><p>{d}</p></div>
            ))}
          </div>

          <h2>{t.infraH}</h2>
          <p>{t.infraP}</p>
          <p>
            <a href={GITHUB} target="_blank" rel="noopener">{t.ctaRepo}</a> ·{' '}
            <a href={NPM} target="_blank" rel="noopener">republic-mcp · npm</a> ·{' '}
            <a href={PYPI} target="_blank" rel="noopener">openlegis-mcp · PyPI</a> ·{' '}
            <a href={lang === 'en' ? '/en/api' : '/docs/api'}>{lang === 'en' ? 'public API' : 'API pubblica'}</a>
          </p>
          <p>
            <a href={`mailto:${MAIL}?subject=${encodeURIComponent(lang === 'en' ? 'OpenLegis — support/collaboration' : 'OpenLegis — sostegno/collaborazione')}`}>
              {lang === 'en' ? 'Get in touch ↗' : 'Scrivimi ↗'}
            </a>
          </p>

          <h2>{lang === 'en' ? 'FAQ' : 'Domande frequenti'}</h2>
          {t.faq.map((f, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <h3 style={{ margin: '0 0 4px' }}>{f.q}</h3>
              <p style={{ margin: 0 }}>{f.a}</p>
            </div>
          ))}

          <h2>{t.relH}</h2>
          <p>
            <a href={lang === 'en' ? '/en/mcp-server' : '/docs/mcp-server'}>MCP server</a> ·{' '}
            <a href={lang === 'en' ? '/en/open-data' : '/open-data'}>{lang === 'en' ? 'Open data' : 'Open data'}</a> ·{' '}
            <a href={t.alt}>{lang === 'en' ? 'Versione italiana' : 'English'}</a>
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>{t.disclaimer}</p>
        </article>
      </main>
    </>
  )
}
