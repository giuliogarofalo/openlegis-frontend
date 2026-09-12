import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import { authApi, billingApi } from '../api.js'
import { useAuth } from '../auth/AuthContext.jsx'
import itC from '../locales/it/account.js'
import enC from '../locales/en/account.js'

export default function Impostazioni() {
  const { user, refreshMe, logout } = useAuth()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).settings
  const L = lang === 'en' ? '/en' : ''
  const [name, setName] = useState(user?.name || '')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  // change password
  const [curPw, setCurPw] = useState('')
  const [newPw, setNewPw] = useState('')

  const saveProfile = async (e) => {
    e.preventDefault()
    setMsg('')
    setErr('')
    const [first, ...rest] = name.trim().split(' ')
    try {
      await authApi.updateMe({ first_name: first || null, last_name: rest.join(' ') || null })
      await refreshMe()
      setMsg(c.profileSaved)
    } catch (e2) {
      setErr(e2.message)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setMsg('')
    setErr('')
    if (newPw.length < 8) {
      setErr(c.errorShortPassword)
      return
    }
    try {
      await authApi.changePassword(curPw, newPw)
      setCurPw('')
      setNewPw('')
      setMsg(c.passwordSaved)
    } catch (e2) {
      setErr(e2.message)
    }
  }

  const manageBilling = async () => {
    setErr('')
    try {
      const { portal_url } = await billingApi.portal()
      window.location.href = portal_url
    } catch (e2) {
      setErr(e2.message || c.noSubscription)
    }
  }

  const doLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!user) return null

  return (
    <>
      <SiteHeader variant="landing" />
      <main className="settings-wrap">
        <h1>{c.title}</h1>
        {msg && <div className="auth-ok">{msg}</div>}
        {err && <div className="auth-error">{err}</div>}

        <section className="settings-card">
          <h2>{c.accountTitle}</h2>
          <div className="settings-row">
            <span className="k">{c.email}</span>
            <span className="v">{user.email}</span>
          </div>
          <div className="settings-row">
            <span className="k">{c.role}</span>
            <span className="v badge">{user.role}</span>
          </div>
          <form className="auth-form" onSubmit={saveProfile}>
            <label>
              {c.name}
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button className="auth-btn" type="submit">{c.saveProfile}</button>
          </form>
        </section>

        <section className="settings-card">
          <h2>{c.planTitle}</h2>
          <div className="settings-row">
            <span className="k">{c.currentPlan}</span>
            <span className="v badge">{user.plan_slug}{user.plan_status ? ` · ${user.plan_status}` : ''}</span>
          </div>
          <div className="settings-actions">
            <Link className="auth-btn ghost" to={`${L}/piani`}>{c.seePlans}</Link>
            {user.plan_slug !== 'free' && (
              <button className="auth-btn ghost" onClick={manageBilling}>{c.manageBilling}</button>
            )}
          </div>
        </section>

        <section className="settings-card">
          <h2>{c.changePasswordTitle}</h2>
          <form className="auth-form" onSubmit={changePassword}>
            <label>
              {c.currentPassword}
              <input type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} required />
            </label>
            <label>
              {c.newPassword} <span className="opt">{c.newPasswordOpt}</span>
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required />
            </label>
            <button className="auth-btn" type="submit">{c.updatePassword}</button>
          </form>
        </section>

        <section className="settings-card">
          <button className="auth-btn danger" onClick={doLogout}>{c.logout}</button>
        </section>
      </main>
    </>
  )
}
