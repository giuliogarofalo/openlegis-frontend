import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteHeader from './SiteHeader.jsx'
import Seo from './seo.jsx'

// Real 404 page. Replaces the old catch-all that silently redirected unknown
// URLs to the homepage (a soft-404: every garbage URL answered 200 + home).
// noindex,follow so Google drops the URL instead of treating it as duplicate
// home content. Build-time prerendered to dist/404.html, which nginx serves with
// a genuine HTTP 404 status for any path that has no prerendered file / SPA route.
export default function NotFound() {
  const { i18n } = useTranslation()
  const en = i18n.language === 'en'
  const home = en ? '/en' : '/'
  return (
    <>
      <Seo
        path={en ? '/en/404' : '/404'}
        title={en ? 'Page not found' : 'Pagina non trovata'}
        noindex
      />
      <SiteHeader variant="docs" />
      <main className="docs-content">
        <article className="docs-article">
          <header className="doc-h">
            <div className="doc-kicker">404</div>
            <h1>{en ? 'Page not found' : 'Pagina non trovata'}</h1>
          </header>
          <p>
            {en
              ? 'This page does not exist or has been moved.'
              : 'Questa pagina non esiste o è stata spostata.'}
          </p>
          <p>
            <Link to={home}>{en ? '← Back to home' : '← Torna alla home'}</Link>
          </p>
        </article>
      </main>
    </>
  )
}
