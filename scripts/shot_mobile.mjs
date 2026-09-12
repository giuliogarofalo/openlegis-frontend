import { chromium } from 'playwright'
const base = process.env.URL || 'http://localhost:5180'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
for (const [route, name] of [['/','home'],['/app','app'],['/docs/progetto','docs']]) {
  try {
    await page.goto(base+route, { waitUntil: 'networkidle', timeout: 25000 })
  } catch(e) { console.log(name, 'goto err', e.message) }
  await page.waitForTimeout(2500)
  const ov = await page.evaluate(() => {
    const de = document.documentElement
    // trova elementi che sforano la larghezza viewport
    const wide = [...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > de.clientWidth + 1)
      .slice(0,6).map(el => (el.className && el.className.toString ? el.className.toString().slice(0,40) : el.tagName) + ' →' + Math.round(el.getBoundingClientRect().right))
    return { sw: de.scrollWidth, cw: de.clientWidth, overflowX: de.scrollWidth > de.clientWidth+1, wide }
  })
  console.log(`[${name}] scrollW=${ov.sw} clientW=${ov.cw} OVERFLOW-X=${ov.overflowX}`)
  if (ov.wide.length) console.log('   sforano:', ov.wide)
  await page.screenshot({ path: `/tmp/op_m_${name}.png`, fullPage: false })
}
await browser.close()
