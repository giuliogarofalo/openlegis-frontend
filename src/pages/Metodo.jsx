import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb, faqPage, howTo } from '../seo.jsx'
import itC from '../locales/it/metodo.js'
import enC from '../locales/en/metodo.js'

// Pagina «Come funziona» / «How it works»: obiettivo, knowledge graph in tre livelli,
// relazioni tipizzate, flusso dell'agente (recupera → valuta → presenta) e roadmap.
// Bilingue (/come-funziona ↔ /how-it-works). SEO + JSON-LD (Article, HowTo, FAQ).

export default function Metodo() {
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
    howTo({
      name: t.flowH,
      description: t.flowP,
      steps: t.steps.map(([name, text]) => ({ name, text })),
      lang,
    }),
    faqPage(t.faq),
    breadcrumb([['Open·Parlamento', home], [t.h1, t.path]]),
  ]

  return (
    <>
      <Seo path={t.path} title={t.title} description={t.desc} type="article" lang={t.lang} alternates={alternates} jsonLd={ld} keywords={t.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={home}>Open·Parlamento</a> › <span>{t.h1}</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{t.kicker}</div>
            <h1>{t.h1}</h1>
          </header>
          <p className="lead">{t.lead}</p>

          {/* 1. Obiettivo */}
          <h2>{t.goalH}</h2>
          <p>{t.goalP1}</p>
          <p>{t.goalP2}</p>
          <div className="doc-card-grid">
            {t.goalCards.map(([glyph, title, body]) => (
              <div className="doc-card" key={title}>
                <div className="doc-card-glyph">{glyph}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          {/* 2. Grafo a tre livelli */}
          <h2>{t.graphH}</h2>
          <p>{t.graphP}</p>
          <div className="doc-layers">
            {t.layers.map(([cls, ly, title, body]) => (
              <div className={`doc-layer ${cls}`} key={cls}>
                <span className="ly">{ly}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          {/* 3. Relazioni tipizzate */}
          <h2>{t.relH}</h2>
          <p>{t.relP}</p>
          <div className="doc-table">
            <div className="doc-tr doc-th"><span>{lang === 'en' ? 'Relation' : 'Relazione'}</span><span>{lang === 'en' ? 'Meaning' : 'Significato'}</span><span>{lang === 'en' ? 'Source' : 'Fonte'}</span></div>
            {t.relTable.map(([rel, meaning]) => (
              <div className="doc-tr" key={rel}><span className="mono">{rel}</span><span>{meaning}</span><span className="tag">normattiva</span></div>
            ))}
          </div>
          <div className="doc-quote">{t.relExample}</div>
          <p>{t.relP2}</p>

          {/* 4. Flusso dell'agente */}
          <h2>{t.flowH}</h2>
          <p>{t.flowP}</p>
          <div className="doc-flow">
            {t.flowDiagram.map((f, i) => (
              <Fragment key={i}>
                <span className={i === 3 || i === 4 ? 'lit' : undefined}>{f}</span>
                {i < t.flowDiagram.length - 1 && <i>→</i>}
              </Fragment>
            ))}
          </div>
          <div className="doc-layers">
            {t.steps.map(([title, body], i) => (
              <div className="doc-layer" key={title}>
                <span className="ly">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          {/* 5. Roadmap */}
          <h2>{t.roadH}</h2>
          <p>{t.roadP}</p>
          <div className="doc-table four">
            <div className="doc-tr doc-th"><span>{lang === 'en' ? 'Milestone' : 'Milestone'}</span><span>{lang === 'en' ? 'Phase' : 'Fase'}</span><span>{lang === 'en' ? 'What' : 'Cosa'}</span><span>{lang === 'en' ? 'Status' : 'Stato'}</span></div>
            {t.roadmap.map(([m, phase, what, status]) => {
              const live = status === 'fatto' || status === 'done' || status === 'in corso' || status === 'in progress'
              return (
                <div className="doc-tr" key={m}><span className="mono">{m}</span><span>{phase}</span><span>{what}</span><span><span className={`badge ${live ? 'live' : 'soon'}`}>{status}</span></span></div>
              )
            })}
          </div>

          {/* FAQ */}
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
            <a href={lang === 'en' ? '/en/docs/grafo' : '/docs/grafo'}>{lang === 'en' ? 'The knowledge graph (docs)' : 'Il knowledge graph (docs)'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/mcp-server' : '/docs/mcp-server'}>MCP server</a> ·{' '}
            <a href={lang === 'en' ? '/en/open-data' : '/open-data'}>Open data</a> ·{' '}
            <a href={lang === 'en' ? '/en/projects' : '/progetti'}>{lang === 'en' ? 'Projects' : 'Progetti'}</a> ·{' '}
            <a href={lang === 'en' ? '/come-funziona' : '/en/how-it-works'}>{lang === 'en' ? 'Versione italiana' : 'English'}</a>
          </p>
          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)' }}>{t.disclaimer}</p>
        </article>
      </main>
    </>
  )
}
