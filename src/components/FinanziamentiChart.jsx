import { useMemo, useState } from 'react'

// Chi paga cosa: composizione dei finanziamenti PNRR per settore (barre orizzontali impilate).
// Palette validata (CVD-safe, 6 categorie, dark mode) — vedi skill dataviz, references/palette.md,
// slot 1-6 in ordine adiacente (già verificato con scripts/validate_palette.js su questo sfondo).
const FONTE_COLOR = {
  pnrr: '#3987e5', regione: '#d95926', provincia: '#199e70',
  comune: '#c98500', privato: '#d55181', altro_pubblico: '#008300',
}

function fmtCompact(n, locale) {
  return new Intl.NumberFormat(locale, { notation: 'compact', style: 'currency', currency: 'EUR', maximumFractionDigits: 1 }).format(n)
}

export default function FinanziamentiChart({ flussi, fonti, c, locale }) {
  const [hover, setHover] = useState(null) // {settore, fonte, importo} | null
  const [tableView, setTableView] = useState(false)

  const { righe, max } = useMemo(() => {
    const perSettore = new Map()
    for (const f of flussi) {
      if (!perSettore.has(f.settore)) perSettore.set(f.settore, { settore: f.settore, tot: 0, segmenti: [] })
      const row = perSettore.get(f.settore)
      row.segmenti.push(f)
      row.tot += f.importo
    }
    const righe = [...perSettore.values()].sort((a, b) => b.tot - a.tot).slice(0, 10)
    for (const r of righe) r.segmenti.sort((a, b) => fonti.indexOf(a.fonte) - fonti.indexOf(b.fonte))
    return { righe, max: Math.max(1, ...righe.map((r) => r.tot)) }
  }, [flussi, fonti])

  if (!righe.length) return null

  return (
    <div className="fin-chart">
      <div className="fin-legend">
        {fonti.map((f) => (
          <span className="fin-legend-item" key={f}>
            <span className="fin-swatch" style={{ background: FONTE_COLOR[f] }} />
            {c.fonteLabels[f] || f}
          </span>
        ))}
        <button className="fin-toggle" onClick={() => setTableView((v) => !v)}>
          {tableView ? c.viewChart : c.viewTable}
        </button>
      </div>

      {tableView ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>{c.colSettore}</th>
                {fonti.map((f) => <th key={f}>{c.fonteLabels[f] || f}</th>)}
              </tr>
            </thead>
            <tbody>
              {righe.map((r) => (
                <tr key={r.settore}>
                  <td>{r.settore}</td>
                  {fonti.map((f) => {
                    const seg = r.segmenti.find((s) => s.fonte === f)
                    return <td key={f}>{seg ? fmtCompact(seg.importo, locale) : '—'}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="fin-bars">
          {righe.map((r) => (
            <div className="fin-row" key={r.settore}>
              <div className="fin-row-label">{r.settore}</div>
              <div className="fin-row-track">
                {r.segmenti.map((s) => {
                  const pct = (s.importo / max) * 100
                  if (pct < 0.3) return null
                  const isHover = hover && hover.settore === r.settore && hover.fonte === s.fonte
                  return (
                    <div
                      key={s.fonte}
                      className={`fin-seg ${isHover ? 'hover' : ''}`}
                      style={{ width: `${pct}%`, background: FONTE_COLOR[s.fonte] }}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(null)}
                    />
                  )
                })}
              </div>
              <div className="fin-row-total">{fmtCompact(r.tot, locale)}</div>
            </div>
          ))}
        </div>
      )}

      {hover && !tableView && (
        <div className="fin-tooltip">
          <b>{c.fonteLabels[hover.fonte] || hover.fonte}</b> — {hover.settore}: {fmtCompact(hover.importo, locale)}
        </div>
      )}
    </div>
  )
}
