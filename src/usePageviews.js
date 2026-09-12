import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// SPA page_view tracking for GA4. The gtag bootstrap in index.html is configured
// with send_page_view:false, so we emit one page_view per client navigation here.
// gtag only sends to the network on the production host (see index.html guard);
// elsewhere these calls just queue harmlessly in dataLayer.
// (Umami è in standby: src/analytics.js è inattivo senza VITE_UMAMI_WEBSITE_ID.)
export default function usePageviews() {
  const loc = useLocation()
  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    // Defer one tick so react-helmet-async has updated document.title.
    const id = setTimeout(() => {
      window.gtag('event', 'page_view', {
        page_path: loc.pathname + loc.search,
        page_location: window.location.href,
        page_title: document.title,
      })
    }, 0)
    return () => clearTimeout(id)
  }, [loc.pathname, loc.search])
}
