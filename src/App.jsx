import { Routes, Route } from 'react-router-dom'
import LocaleLayout from './LocaleLayout.jsx'
import NotFound from './NotFound.jsx'
import { ROUTES } from './routes.config.jsx'
import usePageviews from './usePageviews.js'

// Path-based routing (crawlable URLs). The route list (routes.config.jsx) is rendered
// once per locale: Italian at the root, English mirrored under /en/* (a few routes carry
// a localized `enPath`). Each subtree is wrapped in <LocaleLayout> which binds i18n to the
// locale. Content routes are prerendered to static HTML (scripts/routes.mjs); /app +
// auth/account are client-only and served via the nginx SPA fallback.
const renderRoute = (r, scope, useEnPath) => (
  <Route
    key={scope + ':' + (r.path || 'index')}
    index={r.index || undefined}
    path={r.index ? undefined : useEnPath ? r.enPath || r.path : r.path}
    element={r.element}
  />
)

export default function App() {
  usePageviews()
  return (
    <Routes>
      {/* English mirror — every route (incl. en-only) under /en/* */}
      <Route path="/en" element={<LocaleLayout lang="en" />}>
        {ROUTES.map((r) => renderRoute(r, 'en', true))}
        {/* Unknown /en/* path → real 404 (noindex), keeping the EN locale chrome. */}
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Italian at the root — all routes except en-only */}
      <Route path="/" element={<LocaleLayout lang="it" />}>
        {ROUTES.filter((r) => !r.enOnly).map((r) => renderRoute(r, 'it', false))}
        {/* Unknown path → real 404 (noindex) instead of a soft-404 redirect home. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
