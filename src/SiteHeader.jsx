import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from './auth/AuthContext.jsx'
import { otherLocalePath } from './locale.js'

// Shared top bar. `variant` tunes the right-hand controls:
//   'landing' | 'docs' → static links (crawlable)
//   'app'              → live status + chat/explore toggle (centrato)
// Navigazione (Norme, Documentazione, app, account): inline nell'header su desktop,
// in un drawer in alto a destra su mobile (hamburger). Bilingue: i link rispettano
// il locale attivo, con language-switcher e banner di primo accesso (vedi locale.js).
export default function SiteHeader({ variant = 'landing', status, graphCount = 0, view, setView }) {
  const { t, i18n } = useTranslation('common')
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)   // dropdown account
  const [navOpen, setNavOpen] = useState(false)     // drawer nav (mobile)
  const [suggest, setSuggest] = useState(null)      // banner primo accesso: lingua suggerita o null
  const menuRef = useRef(null)
  const rightRef = useRef(null)
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const otherLang = lang === 'en' ? 'it' : 'en'
  const p = (it, en) => (lang === 'en' ? en : it)   // locale-aware internal links

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      if (rightRef.current && !rightRef.current.contains(e.target)) setNavOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // First-visit hint: suggest the language matching the browser if it differs from the page.
  // No redirect (SEO-safe); shown once until the user switches or dismisses.
  useEffect(() => {
    try {
      if (localStorage.getItem('op-lang') || localStorage.getItem('op-lang-dismissed')) return
      const navLang = (navigator.language || '').toLowerCase().startsWith('it') ? 'it' : 'en'
      if (navLang !== lang) setSuggest(navLang)
    } catch {}
  }, [lang])

  const switchTo = (target) => {
    try { localStorage.setItem('op-lang', target) } catch {}
    i18n.changeLanguage(target)
    setSuggest(null)
    navigate(otherLocalePath(pathname) + search + hash)
  }
  const dismissSuggest = () => {
    try { localStorage.setItem('op-lang-dismissed', '1') } catch {}
    setSuggest(null)
  }

  const doLogout = async () => {
    setMenuOpen(false)
    await logout()
    navigate(p('/', '/en'))
  }

  const closeNav = () => setNavOpen(false)
  const initials = (user?.name || user?.email || '?').trim().charAt(0).toUpperCase()
  const SUGGEST = {
    en: { msg: 'This site is also available in English.', cta: 'Read in English →' },
    it: { msg: 'Questo sito è disponibile anche in italiano.', cta: 'Leggi in italiano →' },
  }

  return (
    // Un solo wrapper: così #root (grid: auto 1fr) vede sempre [top][main] anche quando
    // compare il banner lingua — altrimenti il banner ruba la riga 1fr e .app-main collassa.
    <div className="app-top">
      {suggest && (
        <div className="lang-suggest" role="region" aria-label="language suggestion">
          <span>{SUGGEST[suggest].msg}</span>
          <button className="lang-suggest-go" onClick={() => switchTo(suggest)}>{SUGGEST[suggest].cta}</button>
          <button className="lang-suggest-x" aria-label="dismiss" onClick={dismissSuggest}>×</button>
        </div>
      )}
      <header className="app-header">
        <Link className="brand" to={p('/', '/en')} title="Open·Parlamento — home">
          <span className="seal" />
          <div>
            <div className="wordmark">Open<b>·</b>Parlamento</div>
            <div className="tagline">{t('brand.tagline')}</div>
          </div>
        </Link>

        {variant === 'app' && setView && (
          <div className="view-toggle">
            <button className={view === 'chat' ? 'active' : ''} onClick={() => setView('chat')}>{t('view.chat')}</button>
            <button className={view === 'explore' ? 'active' : ''} onClick={() => setView('explore')}>
              <span className="vt-full">{t('view.exploreGraph')}</span><span className="vt-short">{t('view.graph')}</span>
            </button>
          </div>
        )}

        <div className="header-right" ref={rightRef}>
          {variant === 'app' && status && (
            <span className="app-status">
              <span><span className={`dot ${status.ok ? '' : 'off'}`} />{status.ok ? t('status.operativo') : t('status.offline')}</span>
              <span><span className="k">{t('status.model')}</span> <span className="v">{status.model || '—'}</span></span>
              <span><span className="k">{t('status.graph')}</span> <span className="v">{(graphCount ?? 0).toLocaleString(lang === 'en' ? 'en-US' : 'it-IT')} {t('status.entities')}</span></span>
            </span>
          )}

          <button
            className={`nav-burger ${navOpen ? 'on' : ''}`}
            aria-label={t('menu.open')} aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>

          <nav className={`header-nav ${navOpen ? 'open' : ''}`}>
            {/* Plain <a>: /norme is a statically-generated section, not an SPA route. */}
            <a className="header-link" href="/norme" onClick={closeNav}>{t('nav.norme')}</a>
            <Link className="header-link docs" to={p('/docs', '/en/docs')} onClick={closeNav}>{t('nav.docs')}</Link>
            <Link className="header-link" to={p('/come-funziona', '/en/how-it-works')} onClick={closeNav}>{t('nav.how')}</Link>
            <Link className="header-link" to={p('/manifesto', '/en/manifesto')} onClick={closeNav}>{t('nav.manifesto')}</Link>
            <Link className="header-link" to={p('/progetti', '/en/projects')} onClick={closeNav}>{t('nav.projects')}</Link>
            <Link className="header-link" to={p('/pnrr', '/en/pnrr')} onClick={closeNav}>{t('nav.pnrr')}</Link>
            <Link className="header-link" to={p('/politici', '/en/politici')} onClick={closeNav}>{t('nav.politici')}</Link>
            <Link className="header-link" to={p('/ddl', '/en/ddl')} onClick={closeNav}>{t('nav.ddl')}</Link>
            {variant !== 'app' && <Link className="header-link" to={p('/app', '/en/app')} onClick={closeNav}>{t('nav.openApp')}</Link>}

            <button
              className="header-link lang-switch"
              onClick={() => { closeNav(); switchTo(otherLang) }}
              title={t('lang.switch')}
              aria-label={t('lang.switch')}
            >
              <span aria-hidden="true">🌐</span> {t(`lang.${otherLang}`)}
            </button>

            {!isAuthenticated ? (
              <Link className="header-link" to={p('/login', '/en/login')} onClick={closeNav}>
                {t('account.login')}
              </Link>
            ) : (
              <span className="user-menu" ref={menuRef}>
                <button className="avatar" onClick={() => setMenuOpen((o) => !o)} title={user?.email}>{initials}</button>
                {menuOpen && (
                  <div className="user-dropdown">
                    <div className="user-email">{user?.email}</div>
                    <Link to={p('/impostazioni', '/en/impostazioni')} onClick={() => { setMenuOpen(false); closeNav() }}>{t('account.settings')}</Link>
                    <Link to={p('/piani', '/en/piani')} onClick={() => { setMenuOpen(false); closeNav() }}>{t('account.plans')}</Link>
                    {isAdmin && <Link to={p('/admin', '/en/admin')} onClick={() => { setMenuOpen(false); closeNav() }}>{t('account.admin')}</Link>}
                    <button onClick={doLogout}>{t('account.logout')}</button>
                  </div>
                )}
              </span>
            )}
          </nav>
        </div>
      </header>
    </div>
  )
}
