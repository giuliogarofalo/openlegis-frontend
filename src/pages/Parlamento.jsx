import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb, faqPage } from '../seo.jsx'
import Rich from '../Rich.jsx'
import { enPathOf } from '../locale.js'
import itC from '../locales/it/parlamento.js'
import enC from '../locales/en/parlamento.js'

// Hub evergreen sul Parlamento italiano (Fase 2). Target: "parlamento italiano",
// "camera dei deputati", "senato della repubblica", "come funziona il parlamento".
// Contenuto stabile in src/locales/{it,en}/parlamento.js + deep-link all'app per i dati LIVE.

export default function Parlamento() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC

  const path = lang === 'en' ? enPathOf(c.path) : c.path
  const appHref = lang === 'en' ? enPathOf(c.appPath) : c.appPath
  const localPath = (p) => (lang === 'en' ? enPathOf(p) : p)
  const homePath = lang === 'en' ? '/en' : '/'
  const ask = (q) => `${appHref}?q=` + encodeURIComponent(q)

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: c.headline, description: c.desc, inLanguage: c.inLanguage,
      url: SITE + path, mainEntityOfPage: SITE + path,
      author: { '@type': 'Person', name: 'Giulio Garofalo' }, publisher: { '@id': SITE + '/#org' },
    },
    faqPage(c.faq),
    breadcrumb([[c.breadcrumbHome, homePath], [c.breadcrumbSelf, path]]),
  ]

  const va = c.vediAnche

  return (
    <>
      <Seo path={path} title={c.title} description={c.desc} type="article" jsonLd={ld} keywords={c.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={homePath}>Open·Parlamento</a> › <span>{c.breadcrumbSelf}</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{c.kicker}</div><h1>{c.h1}</h1></header>
          <p className="lead"><Rich s={c.lead} /></p>

          <h2>{c.camereH}</h2>
          <ul className="doc-list">
            {c.camere.map((item, i) => <li key={i}><Rich s={item} /></li>)}
          </ul>
          <p>{c.camereFunzioni}</p>

          <h2>{c.leggeH}</h2>
          <p>
            {c.legge.s0}<a href={localPath(c.iterPath)}>{c.legge.iterLabel}</a>{c.legge.s1}
          </p>

          <h2>{c.organiH}</h2>
          <p>{c.organiP}</p>

          <h2>{c.datiH}</h2>
          <p>{c.datiIntro.s0}<a href={appHref}>{c.datiIntro.appLabel}</a>{c.datiIntro.s1}</p>
          <ul className="doc-list">
            {c.datiLinks.map(([q, label, tail], i) => (
              <li key={i}><a href={ask(q)}>{label}</a>{tail}</li>
            ))}
          </ul>

          <p style={{ marginTop: 18 }}>
            {va.s0}<a href={localPath(va.costPath)}>{va.costLabel}</a>{va.s1}{' '}
            <a href={localPath(va.glossPath)}>{va.glossLabel}</a>{va.s2}<a href={localPath(va.openDataPath)}>{va.openDataLabel}</a>{va.s3}
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
