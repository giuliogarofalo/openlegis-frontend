// Progetti.jsx — contenuto italiano della pagina «Progetti & librerie».
// Lista i progetti open source di OpenLegis. RepublicMCP è l'origine del progetto.
// Ogni voce: [nome, registry/tipo, descrizione, chiave-link (vedi LINKS in Progetti.jsx), badge].
export default {
  lang: 'it', path: '/progetti',
  title: 'Progetti & librerie open source di OpenLegis',
  desc: 'I progetti e le librerie open source dietro OpenLegis: RepublicMCP (l’origine), republic-mcp su npm, openlegis-mcp su PyPI e il grafo delle relazioni. Codice Apache-2.0, fonti pubbliche.',
  kicker: 'open source · npm · PyPI · GitHub',
  h1: 'Progetti & librerie',
  lead: 'OpenLegis è reuse-first e open source. Qui trovi i miei progetti e le librerie pubblicate — codice Apache-2.0, dati da fonti ufficiali e citabili. Tutto è installabile e ispezionabile.',

  // Sezione «origine»: il progetto da cui è nato tutto.
  originH: 'Da dove è nato',
  originP: 'Tutto è cominciato da RepublicMCP: un server MCP che espone Camera e Senato come strumenti agentici via SPARQL. Mappando le ontologie OCD (Camera) e OSR (Senato) e le loro relazioni è emersa l’idea più grande — unire legge e dati pubblici in un unico grafo interrogabile. OpenLegis è la naturale evoluzione.',
  originP2: 'Le due ontologie sembrano simili e divergono in modo sottile e insidioso: la Camera usa foaf:surname, il Senato foaf:lastName; la Camera esprime la legislatura come URI completo, il Senato come numero intero; le proprietà di inizio/fine mandato hanno nomi diversi (ocd:startDate/endDate contro osr:inizio/fine). Le ho mappate e documentate una per una, con query di esempio — il tipo di dettaglio che di solito si scopre solo dopo una query fallita.',
  ontologyDiffLabel: 'La mappatura completa Camera ↔ Senato, con query di esempio',

  mineH: 'I miei progetti',
  mine: [
    ['OpenLegis', 'openlegis.it', 'Il progetto: agente con function-calling, connettori, knowledge graph e webapp. Lo strato che rende interrogabili fonti che, da sole, non lo sono. Il monorepo è privato — il codice riusabile è nei progetti pubblici qui sotto.', 'site', 'attivo'],
    ['RepublicMCP', 'GitHub · TypeScript', 'L’origine. Server MCP che espone Camera e Senato (atti, iter, votazioni, firmatari) via SPARQL, con le ontologie OCD/OSR documentate e diagrammate.', 'republicMCP', 'origine'],
    ['republic-mcp', 'npm · TypeScript', 'Il pacchetto pubblicato di RepublicMCP: «npx -y republic-mcp». Camera & Senato + dati Openpolis (parlamentari, indice di forza, votazioni, decreti, organi).', 'republicMCPnpm', 'pubblicato'],
    ['openlegis-mcp', 'GitHub · Python', 'Il server MCP della legge e dei dati: Costituzione e codici, modifiche Normattiva, iter, giurisprudenza UE/Consulta/Cassazione/TAR-CdS, statistiche, Gazzetta Ufficiale, dati CKAN, OpenPolis, PNRR (anche aggiudicazioni appalti) — 25 tool. Su PyPI: «pip install openlegis-mcp».', 'openParlamentoMcpGithub', 'pubblicato'],
  ],

  dataH: 'Dati aperti',
  data: [
    ['Grafo delle relazioni', 'JSON', 'Le relazioni di modifica/abrogazione/sostituzione tra norme e articoli, da Normattiva (Akoma Ntoso), con provenienza e confidenza.', 'graph', 'open'],
    ['Corpus normativo', 'HTML · ELI', 'Testo consolidato per-articolo di decreti e leggi, con identificatori ELI e pagine statiche indicizzabili.', 'norme', 'open'],
  ],

  stackH: 'Su cosa poggia',
  stackP: 'Niente da zero dove esiste uno standard: ',
  stack: [
    ['LightRAG', 'Motore GraphRAG (MIT): testo, grafo e ricerca semantica.', 'lightrag'],
    ['Normattiva OpenData', 'Corpus normativo italiano in Akoma Ntoso (CC BY 4.0).', 'normattiva'],
    ['dati.camera.it', 'Linked Open Data della Camera (ontologia OCD).', 'camera'],
    ['dati.senato.it', 'Open Data del Senato (ontologia OSR).', 'senato'],
    ['EUR-Lex / CELLAR', 'Diritto UE e repository semantico (CELEX, ELI).', 'eurlex'],
  ],

  ctaH: 'Come si installano',
  ctaP: 'Entrambi i server MCP si usano da Claude Desktop, Cursor e altri client compatibili. La guida completa è nella pagina MCP server.',

  relatedH: 'Vedi anche',
  faq: [
    { q: 'Qual è il progetto da cui è nato OpenLegis?', a: 'RepublicMCP: il server MCP che espone Camera e Senato via SPARQL. Mappando le ontologie OCD e OSR è nata l’idea di unire legge e dati in un unico grafo interrogabile.' },
    { q: 'I progetti sono open source?', a: 'Sì. Il codice è pubblicato con licenza Apache-2.0 su GitHub; i pacchetti sono su npm (republic-mcp) e PyPI (openlegis-mcp). I dati provengono da fonti pubbliche e citabili.' },
    { q: 'Posso usare le librerie senza la webapp?', a: 'Sì. I server MCP sono autonomi: «npx -y republic-mcp» o «pip install openlegis-mcp», poi configurali nel tuo client MCP. Funzionano indipendentemente dal sito.' },
  ],
  disclaimer: 'Strumento informativo — non è consulenza legale. Codice Apache-2.0, fonti pubbliche e citabili (ELI/CELEX).',
}
