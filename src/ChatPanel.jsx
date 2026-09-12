import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Rich from './Rich.jsx'
import ReferencePopover from './ReferencePopover.jsx'
import itC from './locales/it/chat.js'
import enC from './locales/en/chat.js'

// Renderer dei link nel markdown della risposta: `opref:IDX` → riferimento oggettivo cliccabile
// (apre il popover con le destinazioni); gli URL normali restano link esterni.
function RefLink({ href, children, refs, onOpen }) {
  if (href && href.startsWith('opref:')) {
    const refObj = refs && refs[parseInt(href.slice(6), 10)]
    if (!refObj) return <span>{children}</span>
    return (
      <a className="ref-link" onClick={(e) => { e.preventDefault(); onOpen({ refObj, anchor: { x: e.clientX, y: e.clientY } }) }}>
        {children}
      </a>
    )
  }
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>
}

// True se ci sono dati OpenPolis da mostrare in questo messaggio
const opHas = (op) =>
  !!op &&
  (op.parlamentari?.length ||
    op.indiceForza?.length ||
    op.votazioni?.length ||
    op.decreti?.length ||
    op.organi?.length ||
    op.profilo)

// Pannello «Processo» espandibile: per ogni fonte consultata mostra cosa ha cercato e com'è andata
// (ok / nessun dato / fonte giù / dati scarni). Trasparenza sul processo, stile debugger.
function procIcon(p) {
  if (p.status === 'running') return { g: '⟳', c: 'run' }
  if (p.status === 'errore') return { g: '✗', c: 'err' }
  if (p.quality === 'scarno') return { g: '⚠', c: 'warn' }
  if (p.status === 'vuoto') return { g: '∅', c: 'empty' }
  return { g: '✓', c: 'ok' }
}
function Processo({ steps, live, c }) {
  if (!steps || !steps.length) return null
  const probs = steps.filter((s) => s.status === 'errore' || s.quality).length
  return (
    <details className="processo" open={live || undefined}>
      <summary>
        <span className="pg">⛭</span> {c.proc.title} — {steps.length} {steps.length === 1 ? c.proc.sourceOne : c.proc.sourceMany}
        {probs ? <span className="pwarn"> · {c.proc.problems(probs)}</span> : null}
      </summary>
      <div className="proc-steps">
        {steps.map((p, i) => {
          const ic = procIcon(p)
          const out =
            p.status === 'running' ? c.proc.running
              : p.status === 'errore' ? `${c.proc.unreachable}${p.note ? ' — ' + p.note : ''}`
                : p.status === 'vuoto' ? c.proc.empty
                  : p.quality === 'scarno' ? c.proc.scarno(p.count, p.note)
                    : c.proc.results(p.count)
          return (
            <div className={`proc-step ${ic.c}`} key={i}>
              <span className="pi">{ic.g}</span>
              <span className="pl">{p.label}{p.fonte ? <em>{p.fonte}</em> : null}</span>
              {p.query ? <span className="pq">{c.proc.searched(p.query)}</span> : null}
              <span className="po">{out}</span>
            </div>
          )
        })}
      </div>
    </details>
  )
}

export default function ChatPanel({ messages, loading, onSend, onFocusEntity, onFocusRelations, loadText, onExplore }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const numLocale = lang === 'en' ? 'en-GB' : 'it-IT'
  const [text, setText] = useState('')
  const [pop, setPop] = useState(null)   // {refObj, anchor} — popover del riferimento inline
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  const submit = () => {
    const q = text.trim()
    if (!q || loading) return
    setText('')
    onSend(q)
  }
  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <section className="chat-pane">
      <div className="chat-scroll" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="chat-intro">
            <h2>{c.intro.h2}</h2>
            <p>
              <Rich s={c.intro.p} />
            </p>
            <div className="suggest">
              {c.suggestions.map((s, i) => (
                <button key={i} onClick={() => onSend(s.q)}>
                  <span className="q">{s.q}</span>
                  <span className="a">→ {s.a}</span>
                </button>
              ))}
            </div>
            <button className="explore-cta" onClick={onExplore}>
              <span className="arrow">🕸️</span> {c.intro.exploreCta}
            </button>
            <span className="webui-link">
              <a href="/app?view=explore&layer=concetti" target="_blank" rel="noopener">{c.intro.knowledgeGraph}</a>
              {' · '}
              <a href="/app?view=explore&layer=relazioni" target="_blank" rel="noopener">{c.intro.relationsGraph}</a>
            </span>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="role">{m.role === 'user' ? c.roleUser : c.roleAgent}</div>
            <div className="bubble">
              {m.role === 'agent' ? (
                m.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ a: (p) => <RefLink {...p} refs={m.refs} onOpen={setPop} /> }}
                  >
                    {m.content}
                  </ReactMarkdown>
                ) : m.streaming ? (
                  <span className="thinking"><span className="bars"><i /><i /><i /><i /></span> {c.thinkingStream}</span>
                ) : null
              ) : (
                m.content
              )}
            </div>
            {m.role === 'agent' && ((m.processo && m.processo.length) || (m.tools && m.tools.length) || (m.articoli && m.articoli.length) || (m.datasets && m.datasets.length) || (m.statistiche && m.statistiche.length) || (m.novita && m.novita.length) || opHas(m.openpolis)) ? (
              <div className="cites">
                {m.processo && m.processo.length ? (
                  <Processo steps={m.processo} live={m.streaming} c={c} />
                ) : m.tools && m.tools.length ? (
                  <div className="trace">
                    ⛭ {c.trace}{' '}
                    {m.tools.map((t) => c.toolLabels[t] || t).join(' + ')}
                  </div>
                ) : null}
                {m.articoli && m.articoli.length ? (
                  <>
                    <span className="label">{c.sections.articoli}</span>
                    <div className="chips">
                      {m.articoli.map((a, j) => (
                        <span key={j} className="chip" onClick={() => onFocusEntity(a.node)}>
                          <span className="glyph">§</span>
                          {a.label}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}
                {m.datasets && m.datasets.length ? (
                  <>
                    <span className="label">{c.sections.datasets}</span>
                    <div className="chips">
                      {m.datasets.map((d, j) => (
                        <a
                          key={j}
                          className="chip data"
                          href={d.url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          title={`${d.ente || ''} · ${d.fonte || ''}`}
                        >
                          <span className="glyph">{(d.fonte || '').includes('europa') ? '🇪🇺' : '🇮🇹'}</span>
                          {d.titolo}
                        </a>
                      ))}
                    </div>
                  </>
                ) : null}
                {m.statistiche && m.statistiche.length ? (
                  <>
                    <span className="label">{c.sections.statistiche}</span>
                    <div className="chips">
                      {m.statistiche.map((s, j) => (
                        <a
                          key={j}
                          className="chip data"
                          href={s.url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          title={`${s.fonte || ''}${s.periodo ? ' · ' + s.periodo : ''}`}
                        >
                          <span className="glyph">📊</span>
                          {s.indicatore}: {typeof s.valore === 'number' ? s.valore.toLocaleString(numLocale) : s.valore}
                          {s.unita ? ` ${s.unita}` : ''}
                          {s.periodo ? ` (${s.periodo})` : ''}
                        </a>
                      ))}
                    </div>
                  </>
                ) : null}
                {m.novita && m.novita.length ? (
                  <>
                    <span className="label">{c.sections.novita}</span>
                    <div className="chips">
                      {m.novita.map((n, j) => (
                        <a
                          key={j}
                          className="chip data"
                          href={n.url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          title={`${n.fonte || ''}${n.data_pubblicazione ? ' · ' + n.data_pubblicazione : ''}`}
                        >
                          <span className="glyph">📰</span>
                          {n.titolo}
                        </a>
                      ))}
                    </div>
                  </>
                ) : null}
                {opHas(m.openpolis) ? (
                  <>
                    <span className="label">{c.sections.parlamento}</span>
                    {m.openpolis.profilo ? (
                      <a className="op-card" href={m.openpolis.profilo.url || '#'} target="_blank" rel="noreferrer">
                        {m.openpolis.profilo.profilo?.immagine ? (
                          <img src={m.openpolis.profilo.profilo.immagine} alt="" className="op-avatar" />
                        ) : null}
                        <span className="op-card-body">
                          <strong>{m.openpolis.profilo.profilo?.nome}</strong>
                          <span className="op-sub">
                            {m.openpolis.profilo.profilo?.ruolo}
                            {m.openpolis.profilo.profilo?.gruppo ? ` · ${m.openpolis.profilo.profilo.gruppo.acronimo}` : ''}
                            {m.openpolis.profilo.profilo?.collegio ? ` · ${m.openpolis.profilo.profilo.collegio}` : ''}
                          </span>
                          {m.openpolis.profilo.profilo?.presenze ? (
                            <span className="op-sub">
                              {c.presenze(
                                m.openpolis.profilo.profilo.presenze.presente,
                                m.openpolis.profilo.profilo.presenze.assente,
                                m.openpolis.profilo.profilo.presenze.ribelle,
                              )}
                            </span>
                          ) : null}
                        </span>
                      </a>
                    ) : null}
                    {m.openpolis.indiceForza?.length ? (
                      <div className="chips">
                        {m.openpolis.indiceForza.map((p, j) => (
                          <a key={j} className="chip op" href={p.url || '#'} target="_blank" rel="noreferrer" title={p.ruolo || ''}>
                            <span className="glyph">🏛️</span>
                            {p.posizione}. {p.nome} · {p.punteggio}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {m.openpolis.parlamentari?.length ? (
                      <div className="chips">
                        {m.openpolis.parlamentari.map((p, j) => (
                          <a key={j} className="chip op" href={p.url || '#'} target="_blank" rel="noreferrer" title={(p.ruoli || []).join(', ')}>
                            <span className="glyph">👤</span>
                            {p.nome}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {m.openpolis.votazioni?.length ? (
                      <div className="chips">
                        {m.openpolis.votazioni.map((v, j) => (
                          <a key={j} className="chip op" href={v.url || '#'} target="_blank" rel="noreferrer" title={`${v.data || ''} · ${v.ramo || ''}${v.fiducia ? ' · fiducia' : ''}`}>
                            <span className="glyph">{v.esito === 'Approvata' ? '✅' : v.esito === 'Respinta' ? '❌' : '🗳️'}</span>
                            {v.titolo} — {v.esito}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {m.openpolis.decreti?.length ? (
                      <div className="chips">
                        {m.openpolis.decreti.map((d, j) => (
                          <a key={j} className="chip op" href={d.url || '#'} target="_blank" rel="noreferrer" title={d.titolo || ''}>
                            <span className="glyph">📜</span>
                            {c.dl} {d.identificativo} — {d.stato}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {m.openpolis.organi?.length ? (
                      <div className="chips">
                        {m.openpolis.organi.map((o, j) => (
                          <span key={j} className="chip op" title={o.nome || ''}>
                            <span className="glyph">⚖️</span>
                            {o.acronimo || o.nome}
                            {o.ruolo ? ` · ${o.ruolo}` : ''}
                            {typeof o.forza === 'number' ? ` · ${o.forza}` : ''}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}

        {loading && !(messages.length && messages[messages.length - 1].role === 'agent' && messages[messages.length - 1].streaming) && (
          <div className="msg agent">
            <div className="role">{c.roleAgent}</div>
            <div className="thinking">
              <span className="bars"><i /><i /><i /><i /></span>
              {c.thinkingLoad}
            </div>
          </div>
        )}
      </div>

      <div className="composer">
        <div className="box">
          <textarea
            rows={1}
            placeholder={c.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
          />
          <button className="send" onClick={submit} disabled={loading || !text.trim()} title={c.send}>
            ↑
          </button>
        </div>
        <div className="hint">
          <span>{c.hint}</span>
          <span className="disclaimer">{c.disclaimer}</span>
        </div>
      </div>

      {pop ? (
        <ReferencePopover
          refObj={pop.refObj}
          anchor={pop.anchor}
          onClose={() => setPop(null)}
          onFocusEntity={onFocusEntity}
          onFocusRelations={onFocusRelations}
          loadText={loadText}
        />
      ) : null}
    </section>
  )
}
