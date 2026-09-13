// OpenData.jsx — English content of the open-data / dataset page.
export default {
  lang: 'en', path: '/en/open-data',
  title: 'Open data: Italian law, relations and legal knowledge graph',
  desc: 'Open, citable data on Italian law: per-article legal corpus, authoritative amendment relations (Normattiva) and the legal knowledge graph. For research, data journalism and legislative OSINT.',
  kicker: 'open data · legislative OSINT',
  h1: 'Open data for Italian law',
  lead: 'OpenLegis is built on public, open and citable sources. Here is the data you can reuse: the legal corpus, the amendment relations and the legal knowledge graph.',
  ds: 'The datasets',
  items: [
    ['Relations graph', 'Amendment/repeal/replacement relations between statutes and articles (from Normattiva, confidence 1.0), in JSON.', 'JSON'],
    ['Legal corpus', 'Per-article consolidated text of decrees and laws, with ELI identifiers and internal links — static, indexable pages.', 'HTML / ELI'],
    ['Programmatic access (MCP)', 'The same data via open-source MCP tools: law, legislative process, case law, statistics, datasets.', 'MCP'],
  ],
  // Detailed table of LIVE queryable sources. Columns: [Source, What you query, Access (tool), Coverage & update].
  liveH: 'Live queryable sources',
  liveP: 'The sources the agent queries in real time, with the tool (MCP) that opens each one, what you can ask and how far coverage reaches. All official and open.',
  liveCols: ['Source', 'What you query', 'Access', 'Coverage & update'],
  live: [
    ['Normattiva', 'Consolidated statute text + amendment/repeal relations (Akoma Ntoso, ELI)', 'cerca_legge · cosa_modifica · chi_modifica', 'corpus in force · ~real-time (→ Gazette)'],
    ['Chamber of Deputies', 'Acts, legislative process, votes, signatories (SPARQL, OCD ontology)', 'cerca_atti_camera', 'XIX legislature (2022) · ~daily'],
    ['Senate of the Republic', 'Bills, status, signatories (SPARQL, OSR)', 'cerca_ddl_senato', 'XIX legislature (2022) · ~daily'],
    ['EUR-Lex / CELLAR', 'Regulations, directives and CJEU rulings by topic (CELEX, ELI)', 'cerca_legge_ue · cerca_sentenze_ue', 'since 1954 · incremental'],
    ['Constitutional Court', 'Rulings and headnotes + statutes currently challenged (pending cases)', 'cerca_sentenze_cost · giurisprudenza_su · casi_pendenti_su', 'since 1956 (complete) · daily'],
    ['Cassation — SentenzeWeb', 'Civil and criminal legitimacy judgments by topic', 'cerca_sentenze_cassazione', '~last 6 years · batch'],
    ['Eurostat (SDMX)', 'Official statistics: population, labour, prices, GDP, debt… with value, period and source', 'cerca_statistiche', 'recent series · monthly'],
    ['Official Gazette (RSS)', 'Latest acts published per series — legislative news', 'novita_normative', 'real-time · weekdays'],
    ['CKAN multi-portal', 'Public datasets — national (dati.gov.it), regional/local and EU (data.europa.eu), in parallel fan-out', 'cerca_dati', 'hundreds of portals · varies'],
    ['OpenPNRR — Openpolis', 'PNRR projects by theme/territory: funded amounts and stage', 'cerca_pnrr', 'upd. 2026 · API'],
    ['Centri d’Italia — Openpolis', 'Migrant reception: CAS/CPA/Hotspot centers, capacity, operators and costs per municipality', 'accoglienza_migranti', '2018–2024 · snapshot'],
    ['Openpolis — MPs', 'Profiles, power index, votes, decrees and legislative activity', 'cerca_parlamentari · profilo_parlamentare · indice_di_forza', 'XIX legislature · live'],
  ],
  liveNote: 'Every agent answer shows a «Process» panel with the tools used and the sources consulted — you always know who answered and with how many results.',

  srcH: 'Sources (official and open)',
  src: 'Normattiva (Akoma Ntoso, ELI · CC BY 4.0), Chamber & Senate (SPARQL), EUR-Lex/CELLAR (CELEX), Eurostat (SDMX), dati.gov.it and data.europa.eu (CKAN).',
  relatedH: 'See also',
  faq: [
    { q: 'What license is the data under?', a: 'Sources are public and open: Normattiva is CC BY 4.0; other portals follow their respective open licenses. Always cite the official source.' },
    { q: 'How do I access the data programmatically?', a: 'Through the open-source MCP servers (republic-mcp on npm, open-parlamento-mcp on PyPI) or directly from the sources (Chamber/Senate SPARQL, EUR-Lex, Eurostat, CKAN).' },
  ],
  disclaimer: 'Informational tool — not legal advice.',
}
