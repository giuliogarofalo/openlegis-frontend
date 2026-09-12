import { useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteHeader from './SiteHeader.jsx'
import Seo, { SITE, breadcrumb } from './seo.jsx'
import Rich from './Rich.jsx'
import { enPathOf } from './locale.js'
import itC from './locales/it/docs.js'
import enC from './locales/en/docs.js'

/* ───────────────────────────────────────────────────────────────
   Link e bio editoriali vivono in src/locales/{it,en}/docs.js.
   Gli URL (LINKS) sono language-neutral e restano qui, condivisi.
   ─────────────────────────────────────────────────────────────── */
const MAIL = 'open-parlament@proton.me'
const LINKS = {
  github: 'https://github.com/giuliogarofalo/RepublicMCP',      // repo pubblico (l'origine) — il monorepo del progetto è privato
  republicMCP: 'https://github.com/giuliogarofalo/RepublicMCP', // repo del connettore republicMCP
  republicMCPnpm: 'https://www.npmjs.com/package/republic-mcp', // pacchetto npm pubblicato
  mcpPypi: 'https://pypi.org/project/openlegis-mcp/',     // server MCP su PyPI
  normattiva: 'https://dati.normattiva.it',
  camera: 'https://dati.camera.it/sparql',
  senato: 'https://dati.senato.it/sparql',
  eurlex: 'https://eur-lex.europa.eu',
  cortecost: 'https://dati.cortecostituzionale.it',
  cassazione: 'https://www.italgiure.giustizia.it/sncass/',
  openga: 'https://dati.giustizia-amministrativa.it',
  openpnrr: 'https://openpnrr.it/opendata',
  centriditalia: 'https://centriditalia.it/pages/open-data',
  cellar: 'https://op.europa.eu/en/web/eu-vocabularies',
  lightrag: 'https://github.com/HKUDS/LightRAG',
  datigov: 'https://www.dati.gov.it',
  dataeuropa: 'https://data.europa.eu',
}

const A = ({ href, children }) =>
  href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <span>{children}</span>

// Risolve un riferimento di sezione → mailto. 'github' resta gestito dal chiamante.
const mailTo = (subject) => `mailto:${MAIL}?subject=${encodeURIComponent(subject)}`

export default function Docs() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const SECTIONS = c.sections

  const { section } = useParams()
  const active = SECTIONS.find((s) => s.id === section)?.id || 'progetto'
  const meta = SECTIONS.find((s) => s.id === active)

  useEffect(() => {
    document.querySelector('.docs-content')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [active])

  // Base path: /docs (IT) ↔ /en/docs (EN). enPathOf gestisce gli slug localizzati.
  const docsBase = lang === 'en' ? enPathOf('/docs') : '/docs'
  const sectionPath = (id) => `${docsBase}/${id}`
  const path = active === 'progetto' && !section ? docsBase : sectionPath(active)

  const techArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: meta.label,
    description: c.sectionDesc[active],
    inLanguage: c.inLanguage,
    url: SITE + sectionPath(active),
    mainEntityOfPage: SITE + sectionPath(active),
    author: { '@type': 'Person', name: c.authorName },
    publisher: { '@id': SITE + '/#org' },
    isPartOf: { '@id': SITE + '/#website' },
  }
  const crumbs = breadcrumb([
    [c.breadcrumbHome, lang === 'en' ? '/en' : '/'],
    [c.breadcrumbDocs, docsBase],
    [meta.label, sectionPath(active)],
  ])

  // I link "Risorse" sono definiti come path IT canonici; in EN mappati via enPathOf
  // (es. /docs/api → /en/api). /norme resta /norme (non localizzato).
  const resourceHref = (itPath) => (lang === 'en' ? enPathOf(itPath) : itPath)

  return (
    <>
      <Seo path={path} title={meta.label} description={c.sectionDesc[active]} type="article" jsonLd={[techArticle, crumbs]} />
      <SiteHeader variant="docs" />
      <div className="docs">
        <aside className="docs-nav">
          <Link className="docs-back" to={lang === 'en' ? '/en/app' : '/app'}>{c.back}</Link>
          <div className="docs-nav-title">{c.navTitle}</div>
          <nav>
            {SECTIONS.map((s) => (
              <Link key={s.id} to={sectionPath(s.id)} className={`docs-nav-item ${active === s.id ? 'on' : ''}`}>
                <span className="num">{s.n}</span>
                <span className="lbl">{s.label}<em>{s.kicker}</em></span>
              </Link>
            ))}
          </nav>
          <div className="docs-nav-title" style={{ marginTop: 18 }}>{c.resourcesTitle}</div>
          <nav>
            {c.resources.map(([itPath, lbl, sub]) => (
              <a key={itPath} className="docs-nav-item" href={resourceHref(itPath)}>
                <span className="num">→</span><span className="lbl">{lbl}<em>{sub}</em></span>
              </a>
            ))}
          </nav>
        <div className="docs-nav-foot">
          <span className="dot-ok" /> {c.navFoot}
        </div>
      </aside>

      <div className="docs-content">
        <article className="docs-article">
          {active === 'progetto' && <Progetto c={c} />}
          {active === 'come-funziona' && <ComeFunziona c={c} />}
          {active === 'grafo' && <Grafo c={c} />}
          {active === 'dati' && <Dati c={c} />}
          {active === 'connettori' && <Connettori c={c} />}
          {active === 'collegati' && <Collegati c={c} />}
          {active === 'chi' && <Chi c={c} />}
          {active === 'collabora' && <Collabora c={c} />}
          <DocsFooter c={c} active={active} sectionPath={sectionPath} appHref={lang === 'en' ? '/en/app' : '/app'} />
        </article>
        </div>
      </div>
    </>
  )
}

const H = ({ kicker, children }) => (
  <header className="doc-h">
    {kicker && <div className="doc-kicker">{kicker}</div>}
    <h1>{children}</h1>
  </header>
)

function Progetto({ c }) {
  const t = c.progetto
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead"><Rich s={t.lead} /></p>
      <p><Rich s={t.p1} /></p>

      <div className="doc-card-grid">
        {t.cards.map(([glyph, title, body]) => (
          <div className="doc-card" key={title}>
            <div className="doc-card-glyph">{glyph}</div>
            <h3>{title}</h3>
            <p><Rich s={body} /></p>
          </div>
        ))}
      </div>

      <h2>{t.principiH}</h2>
      <ul className="doc-list">
        {t.principi.map((p, i) => <li key={i}><Rich s={p} /></li>)}
      </ul>
    </>
  )
}

function ComeFunziona({ c }) {
  const t = c.comeFunziona
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead"><Rich s={t.lead} /></p>

      <div className="doc-flow">
        {t.flow.map((f, i) => (
          <Fragment key={i}>
            <span className={i === 2 || i === 4 ? 'lit' : undefined}>{f}</span>
            {i < t.flow.length - 1 && <i>→</i>}
          </Fragment>
        ))}
      </div>

      <h2>{t.toolsH}</h2>
      <div className="doc-table">
        <div className="doc-tr doc-th"><span>{t.thTool}</span><span>{t.thUse}</span><span>{t.thSource}</span></div>
        {t.tools.map(([tool, d, f]) => (
          <div className="doc-tr" key={tool}><span className="mono">{tool}</span><span>{d}</span><span className="tag">{f}</span></div>
        ))}
      </div>

      <h2>{t.stackH}</h2>
      <ul className="doc-list">
        {t.stack.map((s, i) => (
          s.length > 1
            ? <li key={i}><Rich s={s[0]} />{' '}<A href={LINKS[s[1]]}>{s[2]}</A>{' '}<Rich s={s[3]} /></li>
            : <li key={i}><Rich s={s[0]} /></li>
        ))}
      </ul>
    </>
  )
}

function Grafo({ c }) {
  const t = c.grafo
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead">{t.lead}</p>

      <div className="doc-layers">
        {t.layers.map(([cls, ly, title, body]) => (
          <div className={`doc-layer ${cls}`} key={cls}>
            <span className="ly">{ly}</span>
            <h3>{title}</h3>
            <p><Rich s={body} /></p>
          </div>
        ))}
      </div>

      <h2>{t.archiH}</h2>
      <p>
        <Rich s={t.archiP1Pre} />{' '}
        <A href={LINKS.normattiva}>{t.archiP1Link}</A>{' '}
        <Rich s={t.archiP1Post} />
      </p>
      <div className="doc-quote"><Rich s={t.quote} /></div>
      <p><Rich s={t.archiP2} /></p>
    </>
  )
}

function Dati({ c }) {
  const t = c.dati
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead"><Rich s={t.lead} /></p>
      <div className="doc-table four">
        <div className="doc-tr doc-th"><span>{t.thDomain}</span><span>{t.thWhat}</span><span>{t.thFormat}</span><span>{t.thLicense}</span></div>
        {t.rows.map((r) => (
          <div className="doc-tr" key={r[0]}><span className="mono">{r[0]}</span><span>{r[1]}</span><span className="tag">{r[2]}</span><span>{r[3]}</span></div>
        ))}
      </div>
      <h2>{t.identH}</h2>
      <p><Rich s={t.identP} /></p>

      <h2>{t.coverageH} <span className="badge live">{t.coverageBadge}</span></h2>
      <p>{t.coverageP}</p>
      <div className="doc-table four">
        <div className="doc-tr doc-th"><span>{t.thScope}</span><span>{t.thCoverage}</span><span>{t.thSince}</span><span>{t.thStatus}</span></div>
        {t.coverage.map((r) => (
          <div className="doc-tr" key={r[0]}><span className="mono">{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span><span className="tag">{t.statusActive}</span></div>
        ))}
      </div>
      <ul className="doc-list">
        {t.coverageNotes.map((n, i) => <li key={i}><Rich s={n} /></li>)}
      </ul>

      <h2>{t.stateH} <span className="badge live">{t.stateBadge}</span></h2>
      <p><Rich s={t.stateP1} /></p>
      <ul className="doc-list">
        {t.stateNotes.map((n, i) => <li key={i}><Rich s={n} /></li>)}
      </ul>
      <p><Rich s={t.stateP2} /></p>
    </>
  )
}

function Connettori({ c }) {
  const t = c.connettori
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead"><Rich s={t.lead} /></p>

      <h2>{t.presentiH} <span className="badge live">{t.presentiBadge}</span></h2>
      <div className="doc-conn">
        {t.presenti.map(([n, d, key]) => {
          const href = key && LINKS[key]
          return (
            <div className="conn" key={n}>
              <div className="conn-h"><span className="conn-dot on" /><b>{n}</b>{href && <A href={href}>↗</A>}</div>
              <p>{d}</p>
            </div>
          )
        })}
      </div>

      <h2>{t.futuriH} <span className="badge soon">{t.futuriBadge}</span></h2>
      <div className="doc-conn">
        {t.futuri.map(([n, d]) => (
          <div className="conn dim" key={n}>
            <div className="conn-h"><span className="conn-dot" /><b>{n}</b></div>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <p className="doc-note">
        {t.notePre}<a href={mailTo(t.noteSubject)}>{t.noteCta}</a>
      </p>
    </>
  )
}

function Collegati({ c }) {
  const t = c.collegati
  const { i18n } = useTranslation()
  const minePath = i18n.language === 'en' ? enPathOf(t.minePath) : t.minePath
  const Cards = (rows) => (
    <div className="doc-links">
      {rows.map(([n, d, key]) => {
        const href = key && LINKS[key]
        return (
          <div className="doc-link" key={n}>
            <div className="dl-h"><b>{n}</b>{href ? <A href={href}>↗</A> : <span className="soon-tag">{t.soonTag}</span>}</div>
            <p>{d}</p>
          </div>
        )
      })}
    </div>
  )
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead">{t.lead}</p>

      <h2>{t.mineH}</h2>
      {Cards(t.mine)}
      <p className="doc-note"><Link to={minePath}>{t.mineCta}</Link></p>

      <h2>{t.ecosistemaH}</h2>
      {Cards(t.items)}
    </>
  )
}

function Chi({ c }) {
  const t = c.chi
  const a = c.author
  return (
    <>
      <H kicker={t.kicker}>{a.nome}.</H>
      <p className="lead">{a.ruolo}</p>
      {a.bio.map((p, i) => <p key={i}>{p}</p>)}
      <div className="doc-quote">{t.quote}</div>
      <p className="doc-note">
        {t.notePre}<a href={`mailto:${MAIL}`}>{MAIL}</a>
      </p>
    </>
  )
}

function Collabora({ c }) {
  const t = c.collabora
  return (
    <>
      <H kicker={t.kicker}>{t.h1}</H>
      <p className="lead">{t.lead}</p>
      <div className="doc-collab">
        {t.ways.map(([g, title, d, ref, cta]) => {
          const href = ref === 'github' ? LINKS.github : mailTo(ref.slice(5))
          return (
            <div className="collab" key={title}>
              <div className="collab-g">{g}</div>
              <h3>{title}</h3>
              <p>{d}</p>
              {href
                ? <a className="collab-cta" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{cta} →</a>
                : <span className="collab-cta off">presto</span>}
            </div>
          )
        })}
      </div>
      <p className="doc-note">
        {t.notePre}<a href={`mailto:${MAIL}`}>{MAIL}</a>
        {LINKS.github && <> · <A href={LINKS.github}>GitHub</A></>}
      </p>
    </>
  )
}

function DocsFooter({ c, active, sectionPath, appHref }) {
  const SECTIONS = c.sections
  const idx = SECTIONS.findIndex((s) => s.id === active)
  const next = SECTIONS[(idx + 1) % SECTIONS.length]
  return (
    <>
      <footer className="docs-foot">
        <Link className="docs-next" to={sectionPath(next.id)}>
          <span className="k">{c.nextLabel}</span>
          <span className="v">{next.label} →</span>
        </Link>
        <Link className="docs-toapp" to={appHref}>{c.toApp}</Link>
      </footer>
      <div className="docs-credit" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', marginTop: 18, textAlign: 'center' }}>
        {c.creditPre} <a href="https://growflow.studio" target="_blank" rel="noopener">GrowFlow Studio</a>
      </div>
    </>
  )
}
