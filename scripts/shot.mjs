import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:5180/'
const errors = []

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 880 }, deviceScaleFactor: 1.5 })
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForSelector('canvas', { timeout: 20000 }).catch(() => {})
await page.waitForTimeout(4500) // let the force layout settle
await page.screenshot({ path: '/tmp/op_home.png' })

const stat = await page.locator('.graph-stat').first().textContent().catch(() => '(no stat)')

// run a real query end-to-end
await page.fill('textarea', process.env.Q || 'Cosa dice la Costituzione sul ripudio della guerra?')
await page.click('.send')
// wait until the completed answer's citation block is rendered (only appears post-answer)
await page.waitForSelector('.cites', { timeout: 90000 }).catch(() => {})
await page.waitForTimeout(3500) // let the graph focus/zoom animation settle
await page.screenshot({ path: '/tmp/op_answer.png' })

const answer = await page.locator('.msg.agent .bubble').last().textContent().catch(() => '(none)')
const chips = await page.locator('.cites .chip').allTextContents().catch(() => [])

console.log('STAT:', (stat || '').trim())
console.log('ANSWER[0:320]:', (answer || '').slice(0, 320).replace(/\s+/g, ' '))
console.log('CHIPS:', JSON.stringify(chips))
console.log('JS_ERRORS:', errors.length ? errors.join(' || ') : 'none')
await browser.close()
