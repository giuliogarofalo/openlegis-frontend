import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 880 }, deviceScaleFactor: 1.4 })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })

await page.goto('http://localhost:5180/', { waitUntil: 'networkidle' })
await page.waitForSelector('canvas', { timeout: 20000 }).catch(() => {})
// header toggle: "Esplora il grafo" (2nd button)
await page.click('.view-toggle button:nth-child(2)').catch(() => {})
await page.waitForTimeout(9000) // let the force layout settle for thousands of nodes
const stat = await page.locator('.graph-stat').first().textContent().catch(() => '')
const legend = await page.locator('.legend .row .lt').allTextContents().catch(() => [])
await page.screenshot({ path: '/tmp/op_explore.png' })
console.log('STAT:', (stat || '').trim())
console.log('LEGEND TYPES:', legend.join(', '))
console.log('ERRORS:', errors.length ? errors.join(' || ') : 'none')
await browser.close()
