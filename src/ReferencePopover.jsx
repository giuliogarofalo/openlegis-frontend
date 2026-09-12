import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import itC from './locales/it/graph.js'
import enC from './locales/en/graph.js'

const KIND_GLYPH = { articolo: '§', norma: '§', sentenza: '⚖', ue: '🇪🇺', dataset: '🗂', gu: '📰', stat: '📊' }

// Menu contestuale che appare al clic su un riferimento inline. Mostra solo le destinazioni
// pertinenti al riferimento risolto: nodo (grafo Concetti), relazioni (layer Relazioni),
// fonte ufficiale (URL) e anteprima del testo (norma verbatim / massima).
export default function ReferencePopover({ refObj, anchor, onClose, onFocusEntity, onFocusRelations, loadText }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const ref = useRef(null)
  const [text, setText] = useState(null)   // {rubrica, body} | string | null
  const [openText, setOpenText] = useState(false)

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [onClose])

  if (!refObj) return null
  // posizione ancorata al clic, con clamp ai bordi
  const W = 300
  const left = Math.min(Math.max(8, anchor.x - W / 2), (typeof window !== 'undefined' ? window.innerWidth : 1200) - W - 8)
  const top = anchor.y + 10

  const showPreview = async () => {
    setOpenText(true)
    if (text != null) return
    if (refObj.massima) { setText(refObj.massima); return }
    if (loadText && refObj.eli) {
      const t = await loadText(refObj.eli)   // {num, rubrica, body} | null
      setText(t || c.textUnavailable)
    } else {
      setText(c.previewUnavailable)
    }
  }

  const hasPreview = !!(refObj.massima || (loadText && refObj.eli && refObj.kind === 'articolo'))
  const body = typeof text === 'object' && text ? text : null

  return (
    <div className="ref-pop" ref={ref} style={{ left, top, width: W }}>
      <div className="ref-pop-h">
        <span className="g">{KIND_GLYPH[refObj.kind] || '§'}</span>
        <b>{refObj.label}</b>
        <button className="x" onClick={onClose} title={c.popClose}>×</button>
      </div>
      {refObj.esito ? <div className="ref-pop-sub">{c.esito(refObj.esito)}</div> : null}

      <div className="ref-pop-actions">
        {refObj.conceptNode ? (
          <button onClick={() => { onFocusEntity?.(refObj.conceptNode); onClose() }}>{c.findInGraph}</button>
        ) : null}
        {refObj.eli ? (
          <button onClick={() => { onFocusRelations?.(refObj.eli, refObj.label); onClose() }}>{c.seeRelations}</button>
        ) : null}
        {refObj.url ? (
          <a href={refObj.url} target="_blank" rel="noreferrer" onClick={onClose}>{c.openSource}</a>
        ) : null}
        {hasPreview ? (
          <button onClick={showPreview}>{c.preview}</button>
        ) : null}
      </div>

      {openText ? (
        <div className="ref-pop-text">
          {text == null ? (
            <span className="muted">{c.loadingText}</span>
          ) : body ? (
            <>
              {body.rubrica ? <div className="rub">{body.rubrica}</div> : null}
              <p>{(body.body || '').slice(0, 600)}{(body.body || '').length > 600 ? '…' : ''}</p>
            </>
          ) : (
            <p>{String(text).slice(0, 600)}{String(text).length > 600 ? '…' : ''}</p>
          )}
        </div>
      ) : null}
    </div>
  )
}
