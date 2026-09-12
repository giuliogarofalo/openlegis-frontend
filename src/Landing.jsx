import { useTranslation } from 'react-i18next'
import Hero from './Hero.jsx'
import SiteHeader from './SiteHeader.jsx'
import Seo, { SITE, SITE_NAME, DEFAULT_DESC, DEFAULT_DESC_EN, faqPage, breadcrumb } from './seo.jsx'
import itC from './locales/it/landing.js'
import enC from './locales/en/landing.js'

export default function Landing() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'it'
  const c = lang === 'en' ? enC : itC
  const path = lang === 'en' ? '/en' : '/'
  const desc = lang === 'en' ? DEFAULT_DESC_EN : DEFAULT_DESC

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE + (lang === 'en' ? '/en/app' : '/app'),
    applicationCategory: 'GovernmentApplication',
    operatingSystem: 'Web',
    inLanguage: c.inLanguage,
    isAccessibleForFree: true,
    description: desc,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }

  const faqLd = faqPage(c.faq.map(([q, a]) => ({ q, a })))

  const crumbs = breadcrumb(
    lang === 'en' ? [['Open·Parlamento', '/en']] : [['Open·Parlamento', '/']]
  )

  return (
    <>
      <Seo path={path} description={desc} lang={lang} jsonLd={[webApp, faqLd, crumbs]} />
      <SiteHeader variant="landing" />
      <main className="hero-main">
        <Hero />
      </main>
    </>
  )
}
