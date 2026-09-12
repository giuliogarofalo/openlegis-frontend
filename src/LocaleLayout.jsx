import { Outlet } from 'react-router-dom'
import i18n from './i18n.js'

// Binds the active i18n language to the route subtree it wraps. The guard runs
// synchronously during render (resources are bundled in memory), before the
// <Outlet/> children render — so they paint in the correct locale with no flash,
// which the prerender depends on. App.jsx mounts one per locale (it at `/`, en at `/en`).
export default function LocaleLayout({ lang }) {
  if (i18n.language !== lang) i18n.changeLanguage(lang)
  return <Outlet />
}
