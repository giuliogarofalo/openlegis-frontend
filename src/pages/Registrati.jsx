import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthCard from './AuthCard.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import itC from '../locales/it/auth.js'
import enC from '../locales/en/auth.js'

export default function Registrati() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).register
  const L = lang === 'en' ? '/en' : ''
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError(c.errorShortPassword)
      return
    }
    setBusy(true)
    try {
      await register(email, password, name || null)
      navigate('/app', { replace: true })
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
          {c.footerPre}<Link to={`${L}/login`}>{c.footerLink}</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={submit}>
        {error && <div className="auth-error">{error}</div>}
        <label>
          {c.name} <span className="opt">{c.nameOpt}</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          {c.email}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          {c.password} <span className="opt">{c.passwordOpt}</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="auth-btn" type="submit" disabled={busy}>
          {busy ? c.submitting : c.submit}
        </button>
      </form>
    </AuthCard>
  )
}
