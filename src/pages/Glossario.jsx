import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb, definedTermSet } from '../seo.jsx'
import { enPathOf } from '../locale.js'
import itC from '../locales/it/glossario.js'
import enC from '../locales/en/glossario.js'

// Glossario giuridico-tecnico. Target long-tail: "cos'è ELI/CELEX/Akoma Ntoso",
// "cos'è un MCP server", "OSINT legislativo". Vedi SEO.md (F1.3). Schema DefinedTermSet.
// Contenuto editoriale in src/locales/{it,en}/glossario.js.

export default function Glossario() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC

  const path = lang === 'en' ? enPathOf(c.path) : c.path
  const docsPath = lang === 'en' ? enPathOf(c.docsPath) : c.docsPath
  const localPath = (p) => (lang === 'en' ? enPathOf(p) : p)
  const homePath = lang === 'en' ? '/en' : '/'

  const ld = [
    definedTermSet({ name: c.setName, description: c.desc, terms: c.terms, lang, url: SITE + path }),
    breadcrumb([[c.breadcrumbHome, homePath], [c.breadcrumbDocs, docsPath], [c.breadcrumbSelf, path]]),
  ]
  const m = c.more

  return (
    <>
      <Seo path={path} title={c.title} description={c.desc} type="article" jsonLd={ld} keywords={c.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={homePath}>OpenLegis</a> › <a href={docsPath}>{c.breadcrumbDocs}</a> › <span>{c.breadcrumbSelf}</span>
          </div>
          <header className="doc-h">
            <div className="doc-kicker">{c.kicker}</div>
            <h1>{c.h1}</h1>
          </header>
          <p className="lead">{c.lead}</p>
          {c.terms.map((tm) => (
            <div className="glossary-term" id={tm.id} key={tm.id}>
              <h3 style={{ margin: '0 0 6px' }}>{tm.name}</h3>
              <p style={{ margin: 0 }}>{tm.description}</p>
            </div>
          ))}
          <p style={{ marginTop: 22 }}>
            {m.pre}<a href={localPath(m.mcpPath)}>{m.mcpLabel}</a> ·{' '}
            <a href={localPath(m.eliPath)}>{m.eliLabel}</a> ·{' '}
            <a href={localPath(m.serverPath)}>{m.serverLabel}</a>{m.post}
          </p>
        </article>
      </main>
    </>
  )
}
