import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb, faqPage } from '../seo.jsx'
import { enPathOf } from '../locale.js'
import itC from '../locales/it/codici.js'
import enC from '../locales/en/codici.js'

// Hub per-codice (Fase 2). /codici (indice) + /codici/<slug> (uno per codice).
// Target ad altissimo volume: "codice penale", "codice civile", "codice della strada"…
// Niente testo integrale (è nel corpus/Normattiva); struttura + articoli chiave → app.
// Contenuto editoriale (IT/EN) in src/locales/{it,en}/codici.js. Gli slug sono
// language-neutral: cambia solo il prefisso /en. Gli URL canonici sono IT; in EN
// mappati via enPathOf.

const ask = (q) => '/app?q=' + encodeURIComponent(q)

// Ordine condiviso (slug language-neutral).
const ORDER = ['codice-penale', 'codice-civile', 'codice-procedura-penale', 'codice-procedura-civile', 'codice-strada', 'codice-consumo', 'codice-assicurazioni']

function Index({ c, lang }) {
  const isEn = lang === 'en'
  const t = c.index
  const codiciBase = isEn ? enPathOf('/codici') : '/codici'
  const appHref = isEn ? enPathOf('/app') : '/app'
  const costHref = isEn ? enPathOf('/costituzione') : '/costituzione'
  const normeHref = isEn ? enPathOf('/norme') : '/norme'
  const homeHref = isEn ? '/en' : '/'
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'CollectionPage',
      name: t.collectionName, url: SITE + codiciBase, inLanguage: c.inLanguage,
      description: t.collectionDesc,
    },
    breadcrumb([[c.breadcrumbHome, homeHref], [c.breadcrumbCodici, codiciBase]]),
  ]
  return (
    <>
      <Seo path={codiciBase} title={t.seoTitle} type="article" jsonLd={ld}
        description={t.seoDesc}
        keywords={t.seoKeywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={homeHref}>Open·Parlamento</a> › <span>{c.breadcrumbCodici}</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{t.kicker}</div><h1>{t.h1}</h1></header>
          <p className="lead">{t.lead}</p>
          <div className="doc-card-grid">
            {ORDER.map((slug) => {
              const cc = c.codici[slug]
              return (
                <a className="doc-card" href={`${codiciBase}/${slug}`} key={slug} style={{ textDecoration: 'none' }}>
                  <div className="doc-card-glyph">§</div>
                  <h3>{cc.nome}</h3>
                  <p>{cc.sigla} · {cc.anno}</p>
                </a>
              )
            })}
          </div>
          <p style={{ marginTop: 20 }}>{t.seeAlsoPre}<a href={costHref}>{t.seeAlsoCost}</a>{t.seeAlsoMid}<a href={normeHref}>{t.seeAlsoNorme}</a>.</p>
        </article>
      </main>
    </>
  )
}

export default function Codici() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const isEn = lang === 'en'

  const { slug } = useParams()
  const codiciBase = isEn ? enPathOf('/codici') : '/codici'
  if (!slug) return <Index c={c} lang={lang} />
  const cc = c.codici[slug]
  if (!cc) return <Navigate to={codiciBase} replace />
  const t = c.page
  const path = `${codiciBase}/${slug}`
  const appHref = isEn ? enPathOf('/app') : '/app'
  const costHref = isEn ? enPathOf('/costituzione') : '/costituzione'
  const glossarioHref = isEn ? enPathOf('/docs/glossario') : '/docs/glossario'
  const homeHref = isEn ? '/en' : '/'
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Legislation',
      name: cc.nome, legislationType: 'Codice', jurisdiction: 'IT', inLanguage: c.inLanguage,
      url: SITE + path, description: cc.desc,
    },
    faqPage(cc.faq),
    breadcrumb([[c.breadcrumbHome, homeHref], [c.breadcrumbCodici, codiciBase], [cc.nome, path]]),
  ]
  return (
    <>
      <Seo path={path} title={`${cc.nome}${t.seoTitleSuffix}`} description={cc.desc} type="article" jsonLd={ld} keywords={cc.kw} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={homeHref}>Open·Parlamento</a> › <a href={codiciBase}>{c.breadcrumbCodici}</a> › <span>{cc.nome}</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{t.kickerPre}{cc.anno}</div><h1>{cc.nome}</h1></header>
          <p className="lead">{cc.lead}</p>
          <h2>{t.strutturaH}</h2>
          <ul className="doc-list">
            {cc.struttura.map(([h, d]) => (<li key={h}><b>{h}</b> — {d}</li>))}
          </ul>
          {cc.art.length > 0 && (
            <>
              <h2>{t.artH}</h2>
              <p>
                {cc.art.map(([n, lbl], i) => (
                  <span key={n}>{i > 0 ? ' · ' : ''}
                    <a href={ask(t.askQ(n, cc.nome))}>{t.artLabel}{n} ({lbl})</a>
                  </span>
                ))}
              </p>
            </>
          )}
          <h2>{t.faqH}</h2>
          {cc.faq.map((f, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <h3 style={{ margin: '0 0 4px' }}>{f.q}</h3>
              <p style={{ margin: 0 }}>{f.a}</p>
            </div>
          ))}
          <p style={{ marginTop: 18 }}>
            {t.interrogaPre}{cc.nome}{t.interrogaMid}<a href={appHref}>{t.interrogaApp}</a>{t.interrogaTuttiPre}{' '}
            <a href={codiciBase}>{t.interrogaTutti}</a> · <a href={costHref}>{t.interrogaCost}</a> · <a href={glossarioHref}>{t.interrogaGlossario}</a>.
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>{t.disclaimer}</p>
        </article>
      </main>
    </>
  )
}
