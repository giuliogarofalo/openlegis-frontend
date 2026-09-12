// One-off brand asset generator (run manually, not in build):
//   node scripts/gen-assets.mjs
// Renders branded HTML with Playwright → PNGs in public/:
//   og-cover.png (1200×630), icon-512.png, icon-192.png, apple-touch-icon.png
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { mkdir } from 'node:fs/promises'

const OUT = new URL('../public/', import.meta.url)
await mkdir(OUT, { recursive: true })

const FONTS = `
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,900&family=IBM+Plex+Mono:wght@500&display=swap">`

const INK = '#0b0d11', BRASS = '#c9a24b', BRASS2 = '#e0bd6a', PARCH = '#ece6d8', MUTED = '#8a8678'

const ogHtml = () => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;font-family:'Fraunces',serif;
    background:radial-gradient(120% 120% at 20% 0%, #161a23 0%, ${INK} 60%);
    color:${PARCH};display:flex;flex-direction:column;justify-content:center;
    padding:70px 80px;position:relative;overflow:hidden}
  .frame{position:absolute;inset:28px;border:1px solid rgba(201,162,75,.28);border-radius:18px}
  .seal{width:88px;height:88px;border-radius:50%;border:2.5px solid ${BRASS};
    display:grid;place-items:center;font-size:34px;letter-spacing:-0.04em;color:${BRASS2};
    background:radial-gradient(circle at 50% 40%, rgba(201,162,75,.22), transparent 70%);margin-bottom:26px}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:19px;letter-spacing:.32em;
    text-transform:uppercase;color:${MUTED};margin-bottom:14px}
  h1{font-weight:600;font-size:72px;line-height:1.03;letter-spacing:.01em}
  h1 b{color:${BRASS2};font-weight:900}
  .accent{color:${BRASS2}}
  p{font-family:'Fraunces',serif;font-weight:500;font-size:27px;line-height:1.3;
    color:${PARCH};opacity:.92;margin-top:22px;max-width:880px}
  .foot{position:absolute;left:80px;bottom:50px;font-family:'IBM Plex Mono',monospace;
    font-size:19px;letter-spacing:.14em;color:${BRASS2}}
</style></head><body>
  <div class="frame"></div>
  <div class="seal">OL</div>
  <div class="eyebrow">legge · dati · grafo vivo</div>
  <h1>Open<b>Legis</b><br><span class="accent">interroga lo Stato, con le fonti.</span></h1>
  <p>Costituzione, codici e diritto UE su un grafo navigabile. Ogni risposta cita la fonte reale (ELI/CELEX).</p>
  <div class="foot">openlegis.it</div>
</body></html>`

const iconHtml = (size) => `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0}
  body{width:${size}px;height:${size}px;background:transparent}</style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="${INK}"/>
    <circle cx="32" cy="32" r="20" fill="none" stroke="${BRASS}" stroke-width="3"/>
    <text x="32" y="34" text-anchor="middle" dominant-baseline="central"
      font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="22" letter-spacing="-1" fill="${BRASS2}">OL</text>
  </svg></body></html>`

const browser = await chromium.launch()
async function shoot(html, w, h, file) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  await page.screenshot({ path: fileURLToPath(new URL(file, OUT)), omitBackground: file !== 'og-cover.png' })
  await page.close()
  console.log('✓ public/' + file)
}

await shoot(ogHtml(), 1200, 630, 'og-cover.png')
await shoot(iconHtml(512), 512, 512, 'icon-512.png')
await shoot(iconHtml(192), 192, 192, 'icon-192.png')
await shoot(iconHtml(180), 180, 180, 'apple-touch-icon.png')
await browser.close()
