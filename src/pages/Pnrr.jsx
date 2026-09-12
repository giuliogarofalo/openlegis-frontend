import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import GraphView from '../GraphView.jsx'
import Seo, { SITE, breadcrumb } from '../seo.jsx'
import { pnrrClassificaAziende, pnrrClassificaEnti, pnrrClassificaRegioni, pnrrFinanziamenti, pnrrGraph } from '../api.js'
import FinanziamentiChart from '../components/FinanziamentiChart.jsx'
import itC from '../locales/it/pnrr.js'
import enC from '../locales/en/pnrr.js'

// Grafo OSINT PNRR (piano migrazione ShopBrain, Fase 5a): classifiche aggregate + grafo esplorabile,
// entrambi già filtrati/cappati server-side (public-api/app.py::pnrr_*). Il grafo riusa GraphView.jsx
// (react-force-graph-2d, già in uso su /app) invece di introdurre sigma.js: qui il dataset è per
// costruzione piccolo e curato (max_nodi <= poche centinaia), sigma.js resta il target per il futuro
// grafo OSINT completo (politici↔aziende↔finanziamenti), che avrà una scala molto maggiore.
// Vincolo di prodotto: mai un dump di migliaia di nodi — classifiche a `limit`, grafo a `max_nodi`.

function fmtEuro(n, locale) {
  if (n == null) return '—'
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function Tabella({ righe, colonne }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table">
        <thead>
          <tr>{colonne.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {righe.map((r, i) => (
            <tr key={i}>{colonne.map((c) => <td key={c.key}>{c.render ? c.render(r[c.key], r) : r[c.key]}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Pnrr() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const homePath = lang === 'en' ? '/en' : '/'

  const [aziende, setAziende] = useState(null)
  const [enti, setEnti] = useState(null)
  const [regioni, setRegioni] = useState(null)
  const [finanziamenti, setFinanziamenti] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([pnrrClassificaAziende(20), pnrrClassificaEnti(20), pnrrClassificaRegioni(20), pnrrFinanziamenti()])
      .then(([a, e, r, f]) => { setAziende(a.classifica); setEnti(e.classifica); setRegioni(r.classifica); setFinanziamenti(f) })
      .catch(() => setError(c.loadError))
  }, [c.loadError])

  // Grafo esplorabile: caricato solo su richiesta (bottone), mai al mount — coerente col
  // vincolo "mai tutto insieme" anche lato client (non solo il cap server-side su max_nodi).
  const [graphData, setGraphData] = useState(null)
  const [graphLoading, setGraphLoading] = useState(false)
  const [graphError, setGraphError] = useState('')
  const [soglia, setSoglia] = useState(1000000)
  const [graphSelected, setGraphSelected] = useState(null)

  const loadGraph = useCallback((importoMin) => {
    setGraphLoading(true); setGraphError(''); setGraphSelected(null)
    pnrrGraph({ importoMin, maxNodi: 150 })
      .then((g) => setGraphData(g))
      .catch(() => setGraphError(c.graphLoadError))
      .finally(() => setGraphLoading(false))
  }, [c.graphLoadError])

  const onSogliaChange = (e) => {
    const v = Number(e.target.value)
    setSoglia(v)
    if (graphData) loadGraph(v)
  }

  const appPath = lang === 'en' ? '/en/app' : '/app'
  const askAboutNode = useCallback((node) => {
    window.location.href = appPath + '?q=' + encodeURIComponent(c.askAboutNode(node))
  }, [appPath, c])

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: c.headline, description: c.desc, inLanguage: c.inLanguage,
      url: SITE + c.path, mainEntityOfPage: SITE + c.path,
      author: { '@type': 'Person', name: 'Giulio Garofalo' }, publisher: { '@id': SITE + '/#org' },
    },
    breadcrumb([[c.breadcrumbHome, homePath], [c.breadcrumbSelf, c.path]]),
  ]

  return (
    <>
      <Seo path={c.path} title={c.title} description={c.desc} type="article" jsonLd={ld} keywords={c.keywords} />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <div className="crumbs-mini" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <a href={homePath}>OpenLegis</a> › <span>{c.breadcrumbSelf}</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{c.kicker}</div><h1>{c.h1}</h1></header>
          <p className="lead">{c.lead}</p>

          {error && <div className="auth-error">{error}</div>}

          <h2>{c.aziendeH}</h2>
          <p>{c.aziendeIntro}</p>
          {aziende === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : aziende && aziende.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : aziende ? (
            <Tabella
              righe={aziende}
              colonne={[
                { key: 'nome', label: c.colAzienda },
                { key: 'numero_appalti', label: c.colAppaltiVinti },
                { key: 'importo_totale', label: c.colImporto, render: (v) => fmtEuro(v, lang === 'en' ? 'en-GB' : 'it-IT') },
              ]}
            />
          ) : null}

          <h2>{c.entiH}</h2>
          <p>{c.entiIntro}</p>
          {enti === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : enti && enti.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : enti ? (
            <Tabella
              righe={enti}
              colonne={[
                { key: 'nome', label: c.colEnte },
                { key: 'numero_appalti', label: c.colAppaltiBanditi },
              ]}
            />
          ) : null}

          <h2>{c.regioniH}</h2>
          <p>{c.regioniIntro}</p>
          {regioni === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : regioni && regioni.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : regioni ? (
            <Tabella
              righe={regioni}
              colonne={[
                { key: 'nome', label: c.colRegione },
                { key: 'numero_progetti', label: c.colNumeroProgetti },
                { key: 'importo_totale', label: c.colImporto, render: (v) => fmtEuro(v, lang === 'en' ? 'en-GB' : 'it-IT') },
              ]}
            />
          ) : null}
          <p className="disclaimer" style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: -8 }}>{c.regioniNota}</p>

          <h2>{c.finH}</h2>
          <p>{c.finIntro}</p>
          {finanziamenti === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : finanziamenti && finanziamenti.flussi.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : finanziamenti ? (
            <FinanziamentiChart flussi={finanziamenti.flussi} fonti={finanziamenti.fonti} c={c} locale={lang === 'en' ? 'en-GB' : 'it-IT'} />
          ) : null}

          <h2>{c.graphH}</h2>
          <p>{c.graphIntro}</p>
          <div className="graph-toolbar">
            <label htmlFor="pnrr-soglia">{c.graphSoglia}</label>
            <select id="pnrr-soglia" value={soglia} onChange={onSogliaChange}>
              <option value={1000000}>{c.graphSoglia1M}</option>
              <option value={5000000}>{c.graphSoglia5M}</option>
              <option value={20000000}>{c.graphSoglia20M}</option>
            </select>
            {!graphData && !graphLoading && (
              <button className="graph-cta" onClick={() => loadGraph(soglia)}>{c.graphCta}</button>
            )}
          </div>
          {graphError && <div className="auth-error">{graphError}</div>}
          {graphLoading && !graphData && <p className="plans-loading">{c.graphLoading}</p>}
          {graphData && graphData.nodes.length === 0 && !graphLoading && (
            <p className="plans-loading">{c.graphEmpty}</p>
          )}
          {graphData && graphData.nodes.length > 0 && (
            <div className="embedded-graph">
              <GraphView
                data={graphData}
                layer="pnrr"
                selected={graphSelected}
                onSelect={setGraphSelected}
                onClear={() => setGraphSelected(null)}
                onAsk={askAboutNode}
                copy={{ searchPlaceholder: c.graphSearchPlaceholder, capBody: c.graphCapBody, capDetail: c.graphCapDetail }}
              />
            </div>
          )}

          <h2>{c.relatedH}</h2>
          <p>
            <a href={lang === 'en' ? '/en/politici' : '/politici'}>{lang === 'en' ? 'MPs' : 'Parlamentari'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/open-data' : '/open-data'}>Open data</a> ·{' '}
            <a href={lang === 'en' ? '/en/projects' : '/progetti'}>{lang === 'en' ? 'Projects' : 'Progetti'}</a> ·{' '}
            <a href="/norme">{lang === 'en' ? 'Indexed statutes' : 'Norme indicizzate'}</a>
          </p>

          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)', marginTop: 18 }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
