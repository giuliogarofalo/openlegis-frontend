import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import { adminApi } from '../api.js'
import itC from '../locales/it/account.js'
import enC from '../locales/en/account.js'

const ROLES = ['admin', 'vip', 'normale']

export default function Admin() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).admin
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')

  const load = () => {
    setLoading(true)
    adminApi
      .users()
      .then(setUsers)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const setRole = async (id, role) => {
    setErr('')
    try {
      const updated = await adminApi.patchUser(id, { role })
      setUsers((us) => us.map((u) => (u.id === id ? updated : u)))
    } catch (e) {
      setErr(e.message)
    }
  }

  const toggleActive = async (u) => {
    setErr('')
    try {
      const updated = await adminApi.patchUser(u.id, { is_active: !u.is_active })
      setUsers((us) => us.map((x) => (x.id === u.id ? updated : x)))
    } catch (e) {
      setErr(e.message)
    }
  }

  const filtered = users.filter((u) => u.email.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <SiteHeader variant="landing" />
      <main className="admin-wrap">
        <h1>{c.title}</h1>
        {err && <div className="auth-error">{err}</div>}
        <input
          className="admin-search"
          placeholder={c.search}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {loading ? (
          <p>{c.loading}</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{c.colEmail}</th>
                <th>{c.colRole}</th>
                <th>{c.colPlan}</th>
                <th>{c.colActive}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className={u.is_active ? '' : 'inactive'}>
                  <td>{u.email}</td>
                  <td>
                    <select value={u.role} onChange={(e) => setRole(u.id, e.target.value)}>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td><span className="badge">{u.plan_slug}</span></td>
                  <td>
                    <button className="auth-btn ghost small" onClick={() => toggleActive(u)}>
                      {u.is_active ? c.deactivate : c.activate}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}
