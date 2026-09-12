import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import itC from '../locales/it/auth.js'
import enC from '../locales/en/auth.js'

// Centered card shell shared by the auth pages (login/register/reset/...).
export default function AuthCard({ title, subtitle, children, footer }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC

  return (
    <>
      <SiteHeader variant="landing" />
      <main className="auth-wrap">
        <div className="auth-card">
          <div className="auth-head">
            <span className="seal" />
            <h1>{title}</h1>
            {subtitle && <p className="auth-sub">{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="auth-foot">{footer}</div>}
        </div>
        <p className="auth-disclaimer">{c.card.disclaimer}</p>
      </main>
    </>
  )
}
