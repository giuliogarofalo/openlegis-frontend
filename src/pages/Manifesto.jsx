import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb } from '../seo.jsx'
import itC from '../locales/it/manifesto.js'
import enC from '../locales/en/manifesto.js'

// Pagina «Manifesto»: prosa discorsiva in prima persona (niente card). Idea + metodo, niente
// lato commerciale (vive in docs/strategy/VISIONE.md). Bilingue (/manifesto ↔ /en/manifesto).
// La fonte canonica del testo è MANIFESTO.md nella root: tenere i due allineati.
export default function Manifesto() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const t = lang === 'en' ? enC : itC
  const home = lang === 'en' ? '/en' : '/'
  const alternates = [{ lang: 'it', path: itC.path }, { lang: 'en', path: enC.path }]

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: t.h1, description: t.desc, inLanguage: lang === 'en' ? 'en-US' : 'it-IT',
      url: SITE + t.path, mainEntityOfPage: SITE + t.path,
      author: { '@type': 'Person', name: 'Giulio Garofalo' }, publisher: { '@id': SITE + '/#org' },
    },
    breadcrumb([['OpenLegis', home], [t.h1, t.path]]),
  ]

  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang} alternates={alternates} jsonLd={ld} keywords={t.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article manifesto">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={home}>OpenLegis</a> › <span>{t.h1}</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{t.kicker}</div>
            <h1>{t.h1}</h1>
          </header>

          <div className="doc-quote">{t.standfirst}</div>

          {t.lede.map((p, i) => (
            <p key={i} className={i === 0 ? 'lead' : undefined}>{p}</p>
          ))}

          {t.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.h}</h2>
              {s.body.map((p, j) => <p key={j}>{p}</p>)}
            </section>
          ))}

          <h2>{t.closingH}</h2>
          <p className="lead">{t.closingP}</p>

          <h2>{t.relatedH}</h2>
          <p>
            <a href={lang === 'en' ? '/en/how-it-works' : '/come-funziona'}>{lang === 'en' ? 'How it works' : 'Come funziona'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/projects' : '/progetti'}>{lang === 'en' ? 'Projects' : 'Progetti'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/open-data' : '/open-data'}>Open data</a> ·{' '}
            <a href={lang === 'en' ? '/manifesto' : '/en/manifesto'}>{lang === 'en' ? 'Versione italiana' : 'English'}</a>
          </p>
        </article>
      </main>
    </>
  )
}
