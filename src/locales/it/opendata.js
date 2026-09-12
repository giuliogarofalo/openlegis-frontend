// OpenData.jsx — contenuto italiano della pagina open-data / dataset.
export default {
  lang: 'it', path: '/open-data',
  title: 'Open data: norme, relazioni e grafo della legge italiana',
  desc: 'Dati aperti e citabili sulla legge italiana: corpus normativo per-articolo, relazioni di modifica autoritative (Normattiva) e grafo delle norme. Per ricerca, giornalismo e OSINT legislativo.',
  kicker: 'dati aperti · OSINT legislativo',
  h1: 'Open data della legge italiana',
  lead: 'OpenLegis è costruito su fonti pubbliche, aperte e citabili. Qui i dati che puoi riusare: il corpus normativo, le relazioni di modifica e il grafo delle norme.',
  ds: 'I dataset',
  items: [
    ['Grafo delle relazioni', 'Le relazioni di modifica/abrogazione/sostituzione tra norme e articoli (da Normattiva, confidenza 1.0), in JSON.', 'JSON'],
    ['Corpus normativo', 'Testo consolidato per-articolo di decreti e leggi, con identificatori ELI e link interni — pagine statiche indicizzabili.', 'HTML / ELI'],
    ['Accesso programmatico (MCP)', 'Gli stessi dati via tool MCP open source: legge, iter, giurisprudenza, statistiche, dataset.', 'MCP'],
  ],
  // Tabella dettagliata delle fonti LIVE interrogabili. Colonne: [Fonte, Cosa interroghi, Accesso (tool), Copertura & aggiornamento].
  liveH: 'Fonti live interrogabili',
  liveP: 'Le fonti che l’agente interroga in tempo reale, con lo strumento (tool MCP) che le apre, cosa puoi chiedere e fin dove arriva la copertura. Tutte ufficiali e aperte.',
  liveCols: ['Fonte', 'Cosa interroghi', 'Accesso', 'Copertura & agg.'],
  live: [
    ['Normattiva', 'Testo consolidato delle norme + relazioni di modifica/abrogazione (Akoma Ntoso, ELI)', 'cerca_legge · cosa_modifica · chi_modifica', 'corpus vigente · ~tempo reale (→ Gazzetta)'],
    ['Camera dei Deputati', 'Atti, iter, votazioni, firmatari (SPARQL, ontologia OCD)', 'cerca_atti_camera', 'XIX legislatura (2022) · ~giornaliero'],
    ['Senato della Repubblica', 'Disegni di legge, stato di avanzamento, firmatari (SPARQL, OSR)', 'cerca_ddl_senato', 'XIX legislatura (2022) · ~giornaliero'],
    ['EUR-Lex / CELLAR', 'Regolamenti, direttive e sentenze CGUE per argomento (CELEX, ELI)', 'cerca_legge_ue · cerca_sentenze_ue', 'dal 1954 · incrementale'],
    ['Corte Costituzionale', 'Pronunce e massime + norme attualmente impugnate (casi pendenti)', 'cerca_sentenze_cost · giurisprudenza_su · casi_pendenti_su', 'dal 1956 (completa) · giornaliero'],
    ['Cassazione — SentenzeWeb', 'Sentenze di legittimità civili e penali per argomento', 'cerca_sentenze_cassazione', '~ultimi 6 anni · batch'],
    ['Eurostat (SDMX)', 'Statistiche ufficiali: popolazione, lavoro, prezzi, PIL, debito… con valore, periodo e fonte', 'cerca_statistiche', 'serie recenti · mensile'],
    ['Gazzetta Ufficiale (RSS)', 'Ultimi atti pubblicati per serie — le novità normative', 'novita_normative', 'tempo reale · feriali'],
    ['CKAN multi-portale', 'Dataset pubblici nazionali (dati.gov.it), regionali/locali e UE (data.europa.eu), in fan-out parallelo', 'cerca_dati', 'centinaia di portali · variabile'],
    ['OpenPNRR — Openpolis', 'Progetti del PNRR per tema/luogo: importi finanziati e fase dell’iter', 'cerca_pnrr', 'agg. 2026 · API'],
    ['Centri d’Italia — Openpolis', 'Accoglienza migranti: centri CAS/CPA/Hotspot, capienza, gestori e costi per comune', 'accoglienza_migranti', '2018–2024 · snapshot'],
    ['Openpolis — parlamentari', 'Profili, indice di forza, votazioni, decreti e attività legislativa', 'cerca_parlamentari · profilo_parlamentare · indice_di_forza', 'XIX legislatura · live'],
  ],
  liveNote: 'Ogni risposta dell’agente mostra un pannello «Processo» con gli strumenti usati e le fonti consultate — sai sempre chi ha risposto e con quanti risultati.',

  srcH: 'Fonti (ufficiali e aperte)',
  src: 'Normattiva (Akoma Ntoso, ELI · CC BY 4.0), Camera e Senato (SPARQL), EUR-Lex/CELLAR (CELEX), Eurostat (SDMX), dati.gov.it e data.europa.eu (CKAN).',
  relatedH: 'Vedi anche',
  faq: [
    { q: 'Con quale licenza sono i dati?', a: 'Le fonti sono pubbliche e aperte: Normattiva è CC BY 4.0; gli altri portali seguono le rispettive licenze open. Cita sempre la fonte ufficiale.' },
    { q: 'Come accedo ai dati a livello programmatico?', a: 'Tramite gli MCP server open source (republic-mcp su npm, openlegis-mcp su PyPI) o direttamente dalle fonti (SPARQL Camera/Senato, EUR-Lex, Eurostat, CKAN).' },
  ],
  disclaimer: 'Strumento informativo — non è consulenza legale.',
}
