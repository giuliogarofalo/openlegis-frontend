import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteHeader from '../SiteHeader.jsx'
import { plansApi, billingApi } from '../api.js'
import { useAuth } from '../auth/AuthContext.jsx'
import itC from '../locales/it/account.js'
import enC from '../locales/en/account.js'

function priceLabel(p, c) {
  if (p.is_free || (!p.price_monthly && !p.contact_sales)) return c.free
  if (p.contact_sales) return c.contactSales
  return c.perMonth(p.price_monthly)
}

export default function Piani() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = (lang === 'en' ? enC : itC).plans
  const L = lang === 'en' ? '/en' : ''
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busySlug, setBusySlug] = useState('')

  useEffect(() => {
    plansApi
      .list()
      .then(setPlans)
      .catch(() => setError(c.loadError))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const choose = async (slug, isFree) => {
    if (!isAuthenticated) {
      navigate(`${L}/registrati`, { state: { from: `${L}/piani` } })
      return
    }
    if (isFree) {
      navigate(`${L}/app`)
      return
    }
    setBusySlug(slug)
    setError('')
    try {
      const { checkout_url } = await billingApi.checkout(slug, 'monthly')
      window.location.href = checkout_url
    } catch (err) {
      setError(err.message || c.checkoutError)
      setBusySlug('')
    }
  }

  return (
    <>
      <SiteHeader variant="landing" />
      <main className="plans-wrap">
        <header className="plans-head">
          <h1>{c.title}</h1>
          <p>{c.subtitle}</p>
        </header>

        {error && <div className="auth-error center">{error}</div>}
        {loading ? (
          <p className="plans-loading">{c.loading}</p>
        ) : plans.length === 0 ? (
          <p className="plans-loading">{c.empty}</p>
        ) : (
          <div className="plans-grid">
            {plans.map((p) => {
              const current = user?.plan_slug === p.slug
              const isFree = p.is_free || (!p.price_monthly && !p.contact_sales)
              return (
                <div key={p.slug} className={`plan-card${current ? ' current' : ''}`}>
                  <div className="plan-name">{p.name}</div>
                  <div className="plan-price">{priceLabel(p, c)}</div>
                  {p.description && <p className="plan-desc">{p.description}</p>}
                  <ul className="plan-features">
                    {(p.features || []).map((f, i) => (
                      <li key={i}>
                        <span className="tick">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="auth-btn"
                    disabled={current || busySlug === p.slug}
                    onClick={() => choose(p.slug, isFree)}
                  >
                    {current
                      ? c.current
                      : busySlug === p.slug
                        ? c.busy
                        : isFree
                          ? c.startFree
                          : c.upgradeTo(p.name)}
                  </button>
                </div>
              )
            })}
          </div>
        )}
        <p className="auth-disclaimer">{c.disclaimer}</p>
      </main>
    </>
  )
}
