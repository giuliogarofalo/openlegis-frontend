// Build-time prerender: serve dist with Vite preview (SPA fallback), then use
// Playwright to snapshot each content route to static HTML. Crawlers that don't
// run JS (all AI engines, social unfurlers) get real content + populated <head>.
// Runs after `vite build` && `gen-sitemap`.
import { preview } from 'vite'
import { chromium } from 'playwright'
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { PRERENDER } from './routes.mjs'

const distFile = (route) => {
  const rel = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`
  return fileURLToPath(new URL(`../dist/${rel}`, import.meta.url))
}

const server = await preview({ preview: { port: 4199, host: '127.0.0.1' }, logLevel: 'warn' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage()

let ok = 0
for (const route of PRERENDER) {
  try {
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 })
    // Helmet renders the JSON-LD + title after mount → use it as the "ready" signal.
    await page
      .waitForFunction(
        () => document.title && document.querySelector('script[type="application/ld+json"]'),
        { timeout: 15000 },
      )
      .catch(() => {})
    const html = '<!doctype html>\n' + (await page.content()).replace(/^<!doctype html>/i, '')
    const out = distFile(route)
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, html, 'utf8')
    console.log(`✓ prerender ${route}`)
    ok++
  } catch (e) {
    console.error(`✗ prerender ${route}: ${e.message}`)
  }
}

// 404 page: snapshot the catch-all route (any unknown path renders <NotFound/>)
// to dist/404.html. nginx serves it with a real HTTP 404 for paths that have no
// prerendered file and aren't a client-only SPA route — killing the soft-404.
let notFoundOk = false
try {
  await page.goto(base + '/__not_found__', { waitUntil: 'networkidle', timeout: 30000 })
  await page
    .waitForFunction(() => document.title && /404|non trovata|not found/i.test(document.title), {
      timeout: 15000,
    })
    .catch(() => {})
  const html = '<!doctype html>\n' + (await page.content()).replace(/^<!doctype html>/i, '')
  await writeFile(fileURLToPath(new URL('../dist/404.html', import.meta.url)), html, 'utf8')
  console.log('✓ prerender /404.html')
  notFoundOk = true
} catch (e) {
  console.error(`✗ prerender /404.html: ${e.message}`)
}

await browser.close()
await server.httpServer.close()
console.log(`✓ prerendered ${ok}/${PRERENDER.length} routes${notFoundOk ? ' + 404.html' : ''}`)
process.exit(ok === PRERENDER.length && notFoundOk ? 0 : 1)
