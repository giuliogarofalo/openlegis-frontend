import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import GraphView from '../GraphView.jsx'
import Seo, { SITE, breadcrumb } from '../seo.jsx'
import { politiciClassificaParlamentari, politiciClassificaGruppi, politiciGraph } from '../api.js'
import itC from '../locales/it/politici.js'
import enC from '../locales/en/politici.js'

// Grafo OSINT parlamentari↔atti (piano migrazione ShopBrain, Fase 5b): stesso pattern di Pnrr.jsx —
// classifiche aggregate + grafo esplorabile, entrambi già filtrati/cappati server-side
// (public-api/app.py::politici_*). Il grafo riusa GraphView.jsx (vedi Pnrr.jsx per il perché, stesso
// ragionamento: dataset piccolo/curato per costruzione, sigma.js resta per il futuro grafo completo).
// Vincolo di prodotto: mai un dump di migliaia di nodi — classifiche a `limit`, grafo a `max_nodi`.

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

export default function Politici() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const homePath = lang === 'en' ? '/en' : '/'

  const [parlamentari, setParlamentari] = useState(null)
  const [gruppi, setGruppi] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([politiciClassificaParlamentari(20), politiciClassificaGruppi(20)])
      .then(([p, g]) => { setParlamentari(p.classifica); setGruppi(g.classifica) })
      .catch(() => setError(c.loadError))
  }, [c.loadError])

  // Grafo esplorabile: caricato solo su richiesta, mai al mount (stesso principio di Pnrr.jsx).
  const [graphData, setGraphData] = useState(null)
  const [graphLoading, setGraphLoading] = useState(false)
  const [graphError, setGraphError] = useState('')
  const [filtroGruppo, setFiltroGruppo] = useState('')
  const [filtroRamo, setFiltroRamo] = useState('')
  const [graphSelected, setGraphSelected] = useState(null)

  const loadGraph = useCallback((gruppo, ramo) => {
    setGraphLoading(true); setGraphError(''); setGraphSelected(null)
    politiciGraph({ gruppo, ramo, maxNodi: 200 })
      .then((g) => setGraphData(g))
      .catch(() => setGraphError(c.graphLoadError))
      .finally(() => setGraphLoading(false))
  }, [c.graphLoadError])

  const onFiltroChange = (setFn) => (e) => {
    const v = e.target.value
    setFn(v)
    const g = setFn === setFiltroGruppo ? v : filtroGruppo
    const r = setFn === setFiltroRamo ? v : filtroRamo
    if (graphData) loadGraph(g, r)
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
            <a href={homePath}>Open·Parlamento</a> › <span>{c.breadcrumbSelf}</span>
          </div>
          <header className="doc-h"><div className="doc-kicker">{c.kicker}</div><h1>{c.h1}</h1></header>
          <p className="lead">{c.lead}</p>

          {error && <div className="auth-error">{error}</div>}

          <h2>{c.parlamentariH}</h2>
          <p>{c.parlamentariIntro}</p>
          {parlamentari === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : parlamentari && parlamentari.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : parlamentari ? (
            <Tabella
              righe={parlamentari}
              colonne={[
                { key: 'nome', label: c.colParlamentare },
                { key: 'gruppo', label: c.colGruppo },
                { key: 'numero_atti', label: c.colNumeroAtti },
              ]}
            />
          ) : null}

          <h2>{c.gruppiH}</h2>
          <p>{c.gruppiIntro}</p>
          {gruppi === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : gruppi && gruppi.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : gruppi ? (
            <Tabella
              righe={gruppi}
              colonne={[
                { key: 'nome', label: c.colGruppoNome },
                { key: 'numero_atti', label: c.colNumeroAtti },
              ]}
            />
          ) : null}

          <h2>{c.graphH}</h2>
          <p>{c.graphIntro}</p>
          <div className="graph-toolbar">
            <label htmlFor="politici-gruppo">{c.graphGruppoLabel}</label>
            <select id="politici-gruppo" value={filtroGruppo} onChange={onFiltroChange(setFiltroGruppo)}>
              <option value="">{c.graphGruppoTutti}</option>
              {(gruppi || []).map((g) => <option key={g.nome} value={g.nome}>{g.nome}</option>)}
            </select>
            <label htmlFor="politici-ramo">{c.graphRamoLabel}</label>
            <select id="politici-ramo" value={filtroRamo} onChange={onFiltroChange(setFiltroRamo)}>
              <option value="">{c.graphRamoTutti}</option>
              <option value="Camera">{c.graphRamoCamera}</option>
              <option value="Senato">{c.graphRamoSenato}</option>
            </select>
            {!graphData && !graphLoading && (
              <button className="graph-cta" onClick={() => loadGraph(filtroGruppo, filtroRamo)}>{c.graphCta}</button>
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
                layer="politici"
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
            <a href={lang === 'en' ? '/en/pnrr' : '/pnrr'}>PNRR</a> ·{' '}
            <a href={lang === 'en' ? '/en/open-data' : '/open-data'}>Open data</a> ·{' '}
            <a href={lang === 'en' ? '/en/projects' : '/progetti'}>{lang === 'en' ? 'Projects' : 'Progetti'}</a>
          </p>

          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)', marginTop: 18 }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
