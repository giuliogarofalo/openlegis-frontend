import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb, faqPage, howTo } from '../seo.jsx'
import Rich from '../Rich.jsx'
import { enPathOf } from '../locale.js'
import itC from '../locales/it/guida.js'
import enC from '../locales/en/guida.js'

// Guide informazionali (long-tail). /docs/guida/<slug> (IT) ↔ /en/docs/guida/<slug> (EN).
// Vedi SEO.md (F1.4). Il contenuto editoriale vive in src/locales/{it,en}/guida.js.
// Ogni guida: contenuto + schema Article/HowTo + FAQ + breadcrumb, locale-aware.

export default function Guida() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const GUIDE = c.guides

  const { slug } = useParams()
  const g = GUIDE[slug]
  if (!g) return <Navigate to={lang === 'en' ? '/en/docs' : '/docs'} replace />

  // Path corrente: /docs/guida/<slug> (IT) ↔ /en/docs/guida/<slug> (EN).
  const itPath = `/docs/guida/${slug}`
  const path = lang === 'en' ? enPathOf(itPath) : itPath
  // Link interni: dati come path IT canonici, mappati in EN via enPathOf.
  const href = (itHref) => (lang === 'en' ? enPathOf(itHref) : itHref)
  // Apertura app con query (mirror /en/app in EN).
  const appBase = lang === 'en' ? '/en/app' : '/app'
  const ask = (q) => `${appBase}?q=` + encodeURIComponent(q)
  const guideHref = (s) => href(`/docs/guida/${s}`)

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: g.title, description: g.desc, inLanguage: lang,
      url: SITE + path, mainEntityOfPage: SITE + path,
      author: { '@type': 'Person', name: 'Giulio Garofalo' }, publisher: { '@id': SITE + '/#org' },
    },
    howTo({ name: g.title, description: g.desc, steps: g.steps, lang }),
    ...(g.faq ? [faqPage(g.faq)] : []),
    breadcrumb([
      [c.crumbHome, lang === 'en' ? '/en' : '/'],
      [c.crumbDocs, href('/docs')],
      [c.crumbGuide, href('/docs')],
      [g.title, path],
    ]),
  ]

  // Rende un blocco `after`: array di paragrafi, ciascuno array di segmenti
  // (stringa <Rich> oppure link { text, href|ask|raw }).
  const renderSeg = (seg, i) => {
    if (typeof seg === 'string') return <Rich key={i} s={seg} />
    const url = seg.raw != null ? seg.raw : seg.ask != null ? ask(seg.ask) : href(seg.href)
    return <a key={i} href={url}>{seg.text}</a>
  }

  return (
    <>
      <Seo path={path} title={g.title} description={g.desc} type="article" jsonLd={ld} keywords={g.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={lang === 'en' ? '/en' : '/'}>{c.crumbHome}</a> › <a href={href('/docs')}>{c.crumbDocs}</a> › <span>{c.crumbGuidaLabel}</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{g.kicker}</div>
            <h1>{g.title}</h1>
          </header>
          <p className="lead">{g.lead}</p>
          <ol className="guide-steps" style={{ paddingLeft: 0, listStyle: 'none', counterReset: 'step' }}>
            {g.steps.map((s, i) => (
              <li key={i} style={{ marginBottom: 16 }}>
                <h3 style={{ margin: '0 0 4px' }}>{i + 1}. {s.name}</h3>
                <p style={{ margin: 0 }}>{s.text}</p>
              </li>
            ))}
          </ol>
          {g.after && g.after.map((para, i) => (
            <p key={i}>{para.map(renderSeg)}</p>
          ))}
          {g.faq && (
            <>
              <h2>{c.faqTitle}</h2>
              {g.faq.map((f, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <h3 style={{ margin: '0 0 4px' }}>{f.q}</h3>
                  <p style={{ margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </>
          )}
          <h2>{c.altreGuide}</h2>
          <ul className="doc-list">
            {Object.keys(GUIDE).filter((s) => s !== slug).map((s) => (
              <li key={s}><a href={guideHref(s)}>{GUIDE[s].title}</a></li>
            ))}
            <li><a href={href('/docs/glossario')}>{c.glossarioLabel}</a>{c.glossarioDesc}</li>
          </ul>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
