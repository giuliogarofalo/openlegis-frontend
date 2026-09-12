import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, SITE_NAME, breadcrumb, faqPage } from '../seo.jsx'
import Rich from '../Rich.jsx'
import { enPathOf } from '../locale.js'
import itC from '../locales/it/ailegge.js'
import enC from '../locales/en/ailegge.js'

// Hub SEO «Intelligenza artificiale per la legge italiana» (Fase 3). Target: chi cerca
// risorse AI per il diritto/parlamento/legislazione italiana. Contenuto editoriale in
// src/locales/{it,en}/ailegge.js. JSON-LD: WebApplication + FAQPage + BreadcrumbList.

export default function AiLeggeItaliana() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC

  const path = lang === 'en' ? enPathOf(c.path) : c.path
  const localPath = (p) => (lang === 'en' ? enPathOf(p) : p)
  const appHref = localPath(c.appPath)

  const webApp = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: SITE_NAME, url: SITE + appHref,
    applicationCategory: 'GovernmentApplication', operatingSystem: 'Web',
    inLanguage: c.inLanguage, isAccessibleForFree: true, description: c.desc,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }
  const ld = [
    webApp,
    faqPage(c.faq),
    breadcrumb([[c.breadcrumbHome, lang === 'en' ? '/en' : '/'], [c.breadcrumbSelf, path]]),
  ]

  return (
    <>
      <Seo path={path} title={c.title} description={c.desc} type="article" jsonLd={ld} keywords={c.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={lang === 'en' ? '/en' : '/'}>OpenLegis</a> › <span>{c.breadcrumbSelf}</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{c.kicker}</div>
            <h1>{c.h1}</h1>
          </header>
          <p className="lead"><Rich s={c.lead} /></p>

          <p>
            <a className="hero-primary" href={appHref}>{c.ctaPrimary}</a>
          </p>

          {c.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.h}</h2>
              {s.body.map((p, j) => <p key={j}><Rich s={p} /></p>)}
              {s.cta && (
                <p>
                  {s.cta.map(([label, href], k) => (
                    <span key={k}>
                      {k > 0 ? ' · ' : ''}
                      <a href={localPath(href)}>{label}</a>
                    </span>
                  ))}
                </p>
              )}
            </section>
          ))}

          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
