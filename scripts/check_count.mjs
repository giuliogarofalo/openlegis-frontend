import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1300, height: 800 } })
await p.goto('http://localhost:5180/app', { waitUntil: 'networkidle' }).catch(()=>{})
await p.waitForTimeout(4000)
const status = await p.locator('.status').first().innerText().catch(()=>'(no status)')
console.log('HEADER:', status.replace(/\n/g,' | '))
await p.screenshot({ path: '/tmp/op_app_desktop.png' })
await b.close()
