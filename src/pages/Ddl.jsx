import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import Seo, { SITE, breadcrumb } from '../seo.jsx'
import { ddlLista, ddlDettaglio } from '../api.js'
import itC from '../locales/it/ddl.js'
import enC from '../locales/en/ddl.js'

// Esplorazione DDL + conformità (M5, docs/strategy/DDL_ESPLORA_CONFORMITA.md): tabella comparativa
// (M2, harvest_ddl_testo.py) + dossier di conformità per citazione esplicita (M3, verifica_conformita)
// + storico assegnazioni a commissione (M4, connectors.py::storico_assegnazioni, osr:assegnazione).
// Timeline resa come lista testuale, non un grafico ad assi (dataviz skill, "choosing-a-form": pochi
// eventi discreti per DDL, una lista curata comunica meglio di un asse temporale con 2-3 punti isolati).
// Dati letti da public-api (sola lettura, precompute_ddl_conformita.py), MAI una chiamata live all'agente.

function Tabella({ righe, colonne, onRowClick, selectedKey, rowKey }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table">
        <thead>
          <tr>{colonne.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {righe.map((r, i) => (
            <tr
              key={i}
              onClick={onRowClick ? () => onRowClick(r) : undefined}
              style={onRowClick ? { cursor: 'pointer', background: r[rowKey] === selectedKey ? 'var(--hover, rgba(127,127,127,.08))' : undefined } : undefined}
            >
              {colonne.map((c) => <td key={c.key}>{c.render ? c.render(r[c.key], r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Riferimento({ rif, c }) {
  const gc = rif.giurisprudenza_costituzionale
  return (
    <div style={{ border: '1px solid var(--border, #ddd)', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 6 }}>
        {c.citazioneLabel}: <strong>{rif.citazione_nel_testo_ddl}</strong>
      </div>
      {gc && gc.totale > 0 ? (
        <details>
          <summary style={{ cursor: 'pointer' }}>{c.giurisprudenzaLabel(gc.totale)}</summary>
          <ul style={{ marginTop: 6 }}>
            {gc.sentenze.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.sentenza}</a>
                {' — '}{s.esito}{s.ecli ? ` (${s.ecli})` : ''}
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{c.giurisprudenzaVuota}</p>
      )}
      {rif.casi_pendenti && (
        <p style={{ fontSize: 13, marginTop: 6 }}>⚠️ {c.casiPendentiLabel}</p>
      )}
      {rif.gia_modificato_da?.trovato && (
        <p style={{ fontSize: 13, marginTop: 6 }}>{c.modificatoDaLabel}: {rif.gia_modificato_da.modificata_da?.length}</p>
      )}
    </div>
  )
}

// Lista eventi raggruppata per data (una riga primaria in grassetto + le consultive compatte a fianco) —
// non un grafico ad assi: pochi eventi discreti, spesso più assegnazioni nello stesso giorno.
function Timeline({ eventi, c }) {
  if (!eventi || eventi.length === 0) return <p className="plans-loading">{c.timelineVuoto}</p>
  const perData = []
  for (const e of eventi) {
    let g = perData.find((x) => x.data === e.data)
    if (!g) { g = { data: e.data, primaria: null, consultive: [] }; perData.push(g) }
    if (e.tipo === 'primaria') g.primaria = e
    else g.consultive.push(e.commissione)
  }
  return (
    <div style={{ borderLeft: '2px solid var(--border, #ddd)', paddingLeft: 16 }}>
      {perData.map((g, i) => (
        <div key={i} style={{ position: 'relative', paddingBottom: 14 }}>
          <span style={{
            position: 'absolute', left: -21, top: 4, width: 8, height: 8, borderRadius: '50%',
            background: 'var(--fg, #333)',
          }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{g.data}</div>
          {g.primaria && (
            <div style={{ fontSize: 14 }}>
              <strong>{g.primaria.commissione}</strong>
              {g.primaria.sede && <span style={{ color: 'var(--muted)' }}> — {c.timelineSede(g.primaria.sede)}</span>}
            </div>
          )}
          {g.consultive.length > 0 && (
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{c.timelineConsultive}: {g.consultive.join(', ')}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Ddl() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const homePath = lang === 'en' ? '/en' : '/'
  const appPath = lang === 'en' ? '/en/app' : '/app'

  const [lista, setLista] = useState(null)
  const [error, setError] = useState('')
  const [selezionato, setSelezionato] = useState(null)
  const [dettaglio, setDettaglio] = useState(null)
  const [dettaglioLoading, setDettaglioLoading] = useState(false)

  useEffect(() => {
    ddlLista().then((d) => setLista(d.ddl)).catch(() => setError(c.loadError))
  }, [c.loadError])

  const onRowClick = useCallback((riga) => {
    setSelezionato(riga.numero)
    setDettaglio(null)
    setDettaglioLoading(true)
    ddlDettaglio(riga.numero).then(setDettaglio).catch(() => setError(c.loadError)).finally(() => setDettaglioLoading(false))
  }, [c.loadError])

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: c.headline, description: c.desc, inLanguage: c.inLanguage,
      url: SITE + c.path, mainEntityOfPage: SITE + c.path,
      author: { '@type': 'Person', name: 'Giulio Garofalo' }, publisher: { '@id': SITE + '/#org' },
    },
    breadcrumb([[c.breadcrumbHome, homePath], [c.breadcrumbSelf, c.path]]),
  ]

  const perArticolo = dettaglio?.conformita?.per_articolo || []

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

          <h2>{c.tabellaH}</h2>
          <p>{c.tabellaIntro}</p>
          {lista === null && !error ? (
            <p className="plans-loading">{c.loading}</p>
          ) : lista && lista.length === 0 ? (
            <p className="plans-loading">{c.empty}</p>
          ) : lista ? (
            <Tabella
              righe={lista}
              rowKey="numero"
              selectedKey={selezionato}
              onRowClick={onRowClick}
              colonne={[
                { key: 'numero', label: c.colNumero },
                { key: 'titolo', label: c.colTitolo, render: (v) => v?.length > 90 ? v.slice(0, 90) + '…' : v },
                { key: 'stato', label: c.colStato },
                { key: 'giorni_fermo', label: c.colGiorniFermo },
                { key: 'proponente', label: c.colProponente },
                { key: 'n_articoli', label: c.colArticoli },
              ]}
            />
          ) : null}

          {selezionato && (
            <>
              {dettaglio?.storico_assegnazioni && (
                <>
                  <h2>{c.timelineH} — {selezionato}</h2>
                  <p>{c.timelineIntro}</p>
                  <Timeline eventi={dettaglio.storico_assegnazioni} c={c} />
                </>
              )}

              <h2>{c.dettaglioH} — {selezionato}</h2>
              <p>{c.dettaglioIntro}</p>
              {dettaglioLoading && <p className="plans-loading">{c.loading}</p>}
              {dettaglio && perArticolo.length === 0 && !dettaglioLoading && (
                <p className="plans-loading">{c.dettaglioVuoto}</p>
              )}
              {perArticolo.map((a, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 15 }}>{c.articoloLabel(a.articolo_ddl)}</h3>
                  {a.riferimenti_espliciti.map((rif, j) => <Riferimento key={j} rif={rif} c={c} />)}
                </div>
              ))}
              {dettaglio && (
                <p style={{ fontSize: 13 }}>
                  {dettaglio.url && <a href={dettaglio.url} target="_blank" rel="noopener noreferrer">{c.vaiAlTesto}</a>}
                  {' · '}
                  <a href={appPath + '?q=' + encodeURIComponent(c.chiediInChat(dettaglio.numero))}>
                    {c.chiediInChat(dettaglio.numero)}
                  </a>
                </p>
              )}
            </>
          )}

          <h2>{c.metodoH}</h2>
          <p>{c.metodoP}</p>

          <h2>{c.relatedH}</h2>
          <p>
            <a href={lang === 'en' ? '/en/politici' : '/politici'}>{lang === 'en' ? 'Politicians' : 'Politici'}</a> ·{' '}
            <a href={lang === 'en' ? '/en/costituzione' : '/costituzione'}>{lang === 'en' ? 'Constitution' : 'Costituzione'}</a>
          </p>

          <p className="disclaimer" style={{ fontSize: 13, color: 'var(--muted)', marginTop: 18 }}>
            {c.disclaimer}
          </p>
        </article>
      </main>
    </>
  )
}
