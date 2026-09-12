import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthCard from './AuthCard.jsx'
import { authApi } from '../api.js'
import itC from '../locales/it/auth.js'
import enC from '../locales/en/auth.js'

export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).reset
  const L = lang === 'en' ? '/en' : ''
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
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
      await authApi.resetPassword(token, password)
      setDone(true)
      setTimeout(() => navigate(`${L}/login`, { replace: true }), 1500)
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
      footer={<Link to={`${L}/login`}>{c.footerLink}</Link>}
    >
      {!token ? (
        <p className="auth-error">{c.missingToken}</p>
      ) : done ? (
        <p className="auth-ok">{c.success}</p>
      ) : (
        <form className="auth-form" onSubmit={submit}>
          {error && <div className="auth-error">{error}</div>}
          <label>
            {c.newPassword} <span className="opt">{c.newPasswordOpt}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus />
          </label>
          <button className="auth-btn" type="submit" disabled={busy}>
            {busy ? c.submitting : c.submit}
          </button>
        </form>
      )}
    </AuthCard>
  )
}
