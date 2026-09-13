// Writes the sitemaps after `vite build`:
//   dist/sitemap-pages.xml  — the prerendered SPA content routes (Phase 1)
//   dist/sitemap.xml        — a sitemap index referencing sitemap-pages.xml and,
//                             if present (Phase 2 corpus), sitemap-corpus.xml
import { writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { INDEXABLE, HREFLANG_PAIRS, SITE, PRERENDER } from './routes.mjs'

const distDir = fileURLToPath(new URL('../dist/', import.meta.url))
const today = new Date().toISOString().slice(0, 10)
const priority = (p) => (p === '/' ? '1.0' : p === '/docs' ? '0.8' : '0.7')

// path → blocco di <xhtml:link rel="alternate" hreflang> (per le coppie IT↔EN).
const alt = new Map()
for (const [it, en] of HREFLANG_PAIRS) {
  const links =
    `\n    <xhtml:link rel="alternate" hreflang="it" href="${SITE}${it === '/' ? '/' : it}"/>` +
    `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${en}"/>` +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${it === '/' ? '/' : it}"/>`
  alt.set(it, links)
  alt.set(en, links)
}

const pages = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${INDEXABLE.map((p) => `  <url>
    <loc>${SITE}${p === '/' ? '/' : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority(p)}</priority>${alt.get(p) || ''}
  </url>`).join('\n')}
</urlset>
`
writeFileSync(distDir + 'sitemap-pages.xml', pages, 'utf8')

// Corpus sitemap shard(s) prodotte da gen-corpus.mjs in public/ → copiate in dist/ da Vite.
// Supporta sia il legacy sitemap-corpus.xml sia gli shard sitemap-corpus-N.xml.
const corpusShards = readdirSync(distDir)
  .filter((f) => /^sitemap-corpus(-\d+)?\.xml$/.test(f))
  .sort((a, b) => (a.match(/\d+/)?.[0] || 0) - (b.match(/\d+/)?.[0] || 0))
const children = ['sitemap-pages.xml', ...corpusShards]

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children.map((c) => `  <sitemap><loc>${SITE}/${c}</loc><lastmod>${today}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`
writeFileSync(distDir + 'sitemap.xml', index, 'utf8')
console.log(`✓ sitemap index → ${children.join(', ')} (${INDEXABLE.length} pagine + ${corpusShards.length} shard corpus)`)

// Ogni rotta prerenderizzata (eccetto la home) è scritta su disco come dir/index.html
// (vedi prerender.mjs::distFile) — senza una regola esplicita, il file-server di Netlify
// applica di suo un 301 "aggiungi slash finale" per servire l'index della cartella, prima
// ancora di consultare i redirect non-forzati: stesso bug già visto su /norme (canonical
// senza slash ↔ URL servito con slash), ma qui su OGNI pagina del sito. Force (200!) fa
// vincere questa regola sul comportamento di default. Generato qui — non a mano in
// netlify.toml — così resta sempre sincronizzato con l'elenco reale delle rotte.
const prettyRedirects = PRERENDER
  .filter((p) => p !== '/')
  .map((p) => `${p}  ${p}/index.html  200!`)
  .join('\n')
writeFileSync(distDir + '_redirects', prettyRedirects + '\n', { flag: 'a' })
console.log(`✓ _redirects: ${PRERENDER.length - 1} regole pretty-URL (dir/index.html senza redirect)`)
