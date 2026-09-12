import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthCard from './AuthCard.jsx'
import { authApi } from '../api.js'
import itC from '../locales/it/auth.js'
import enC from '../locales/en/auth.js'

export default function PasswordDimenticata() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).forgot
  const L = lang === 'en' ? '/en' : ''
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await authApi.forgotPassword(email)
    } catch {
      // Intentionally generic — never reveal whether the email exists.
    } finally {
      setBusy(false)
      setDone(true)
    }
  }

  return (
    <AuthCard
      title={c.title}
      subtitle={c.subtitle}
      footer={<Link to={`${L}/login`}>{c.footerLink}</Link>}
    >
      {done ? (
        <p className="auth-ok">{c.done}</p>
      ) : (
        <form className="auth-form" onSubmit={submit}>
          <label>
            {c.email}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </label>
          <button className="auth-btn" type="submit" disabled={busy}>
            {busy ? c.submitting : c.submit}
          </button>
        </form>
      )}
    </AuthCard>
  )
}
