import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb, faqPage } from '../seo.jsx'
import Rich from '../Rich.jsx'
import { enPathOf } from '../locale.js'
import itC from '../locales/it/costituzione.js'
import enC from '../locales/en/costituzione.js'

// Hub SEO sulla Costituzione italiana (struttura + articoli). Target: "costituzione
// italiana", "struttura della costituzione", "articolo X costituzione". Vedi SEO.md (F1.2).
// Contenuto editoriale in src/locales/{it,en}/costituzione.js. Gli articoli linkano
// all'app (/app?q=…) che li interroga sulle fonti reali.

export default function Costituzione() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC

  // Path correnti (EN → /en/… via enPathOf); il deep-link app è localizzato.
  const path = lang === 'en' ? enPathOf(c.path) : c.path
  const appHref = lang === 'en' ? enPathOf(c.appPath) : c.appPath
  const localPath = (p) => (lang === 'en' ? enPathOf(p) : p)
  const ask = (q) => `${appHref}?q=` + encodeURIComponent(q)

  // Link «art. n» interrogabile sull'app.
  const A = ({ n }) => <a href={ask(c.askArt(n))}>art. {n}</a>

  // Rende un array di segmenti: stringa = testo (<Rich>), { art } = link articolo,
  // { iter } = link interno alla guida sull'iter.
  const Segments = ({ parts }) =>
    parts.map((p, i) =>
      typeof p === 'string'
        ? <Rich key={i} s={p} />
        : 'art' in p
          ? <A key={i} n={p.art} />
          : <a key={i} href={localPath(c.iterPath)}>{p.iter}</a>
    )

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Legislation',
      name: c.legislationName,
      legislationType: c.legislationType, jurisdiction: 'IT', inLanguage: c.inLanguage,
      legislationDate: '1947-12-27', url: SITE + path,
      description: c.desc,
    },
    faqPage(c.faq),
    breadcrumb([[c.breadcrumbHome, lang === 'en' ? '/en' : '/'], [c.breadcrumbSelf, path]]),
  ]

  const ep = c.esploraP

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

          <h2>{c.fondamentaliH} <span style={{ color: 'var(--faint)', fontSize: 14 }}>{c.fondamentaliRange}</span></h2>
          <p><Segments parts={c.fondamentaliP} /></p>

          <h2>{c.parteIH} <span style={{ color: 'var(--faint)', fontSize: 14 }}>{c.parteIRange}</span></h2>
          <ul className="doc-list">
            {c.parteIList.map((item, i) => <li key={i}><Segments parts={item} /></li>)}
          </ul>

          <h2>{c.parteIIH} <span style={{ color: 'var(--faint)', fontSize: 14 }}>{c.parteIIRange}</span></h2>
          <ul className="doc-list">
            {c.parteIIList.map((item, i) => <li key={i}><Segments parts={item} /></li>)}
          </ul>

          <h2>{c.esploraH}</h2>
          <p>
            {ep.s0}<a href={appHref}>{ep.appLabel}</a><Rich s={ep.s1} />{' '}
            <a href={localPath(ep.eliPath)}>{ep.eliLabel}</a>{' '}
            <Rich s={ep.s2} />{' '}
            <a href={localPath(ep.normePath)}>{ep.normeLabel}</a>{ep.s3}
          </p>

          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
