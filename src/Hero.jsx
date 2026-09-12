import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Rich from './Rich.jsx'
import { enPathOf } from './locale.js'
import itC from './locales/it/hero.js'
import enC from './locales/en/hero.js'

export default function Hero() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const L = lang === 'en' ? '/en' : ''
  const ask = (q) => navigate(L + '/app?q=' + encodeURIComponent(q))

  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-seal"><span>§</span></div>

        <div className="hero-eyebrow">{c.eyebrow}</div>
        <h1 className="hero-title">
          {c.titleLine1}<br /><span className="accent">{c.titleLine2}</span>
        </h1>
        <p className="hero-sub">
          <Rich s={c.sub} />
        </p>

        <div className="hero-caps">
          {c.caps.map(([g, t, d]) => (
            <div className="hero-cap" key={t}>
              <span className="hero-cap-g">{g}</span>
              <div>
                <b>{t}</b>
                <span>{d}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-actions">
          <button className="hero-primary" onClick={() => navigate(L + '/app')}>{c.ctaPrimary}</button>
          <Link className="hero-secondary" to={lang === 'en' ? '/en/docs' : '/docs'}>{c.ctaDocs}</Link>
          <button className="hero-secondary ghost" onClick={() => navigate(L + '/app?view=explore')}>{c.ctaExplore}</button>
        </div>

        <div className="hero-examples">
          <span className="hero-ex-label">{c.exLabel}</span>
          <div className="hero-ex-row">
            {c.examples.map((q) => (
              <button key={q} className="hero-ex" onClick={() => ask(q)}>{q}</button>
            ))}
          </div>
        </div>

        <nav className="hero-foot-nav" aria-label={lang === 'en' ? 'footer navigation' : 'navigazione piè di pagina'}>
          {c.footLinks.map(([label, itPath]) => (
            <Link key={itPath} to={lang === 'en' ? enPathOf(itPath) : itPath}>{label}</Link>
          ))}
        </nav>
        <div className="hero-foot">
          {c.footPre}{' '}
          <a href="https://growflow.studio" target="_blank" rel="noopener">GrowFlow Studio</a>
        </div>
      </div>
    </div>
  )
}
