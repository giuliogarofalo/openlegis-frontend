import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthCard from './AuthCard.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import itC from '../locales/it/auth.js'
import enC from '../locales/en/auth.js'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).login
  const L = lang === 'en' ? '/en' : ''
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate(location.state?.from || '/app', { replace: true })
    } catch (err) {
      setError(err.message || c.errorDefault)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthCard
      title={c.title}
      subtitle={c.subtitle}
      footer={
        <>
          {c.footerPre}<Link to={`${L}/registrati`}>{c.footerLink}</Link>
          <span className="sep">·</span>
          <Link to={`${L}/password-dimenticata`}>{c.footerForgot}</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={submit}>
        {error && <div className="auth-error">{error}</div>}
        <label>
          {c.email}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </label>
        <label>
          {c.password}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? c.submitting : c.submit}
        </button>
      </form>
    </AuthCard>
  )
}
