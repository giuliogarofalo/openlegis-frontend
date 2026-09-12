// Glossario giuridico-tecnico (Glossario.jsx) — contenuto editoriale italiano.
// Schema DefinedTermSet. I termini canonici (ELI, CELEX, MCP…) mantengono il loro
// identificativo; le definizioni sono tradotte nella controparte EN.
export default {
  path: '/docs/glossario',
  inLanguage: 'it',
  title: 'Glossario — ELI, CELEX, MCP server, OSINT legislativo',
  desc: 'Glossario di Open·Parlamento: ELI, CELEX, Akoma Ntoso, Normattiva, MCP server, knowledge graph, SPARQL, CKAN, OSINT legislativo e i termini dell’iter legislativo.',
  keywords: "glossario giuridico, cos'è ELI, cos'è CELEX, Akoma Ntoso, cos'è un MCP server, knowledge graph giuridico, OSINT legislativo, SPARQL, CKAN, decreto-legge, decreto legislativo",
  setName: 'Glossario — Open·Parlamento',

  breadcrumbHome: 'Open·Parlamento',
  breadcrumbDocs: 'Documentazione',
  breadcrumbSelf: 'Glossario',
  docsPath: '/docs',

  kicker: 'documentazione · definizioni',
  h1: 'Glossario',
  lead: 'I termini di Open·Parlamento, in chiaro: gli identificatori delle norme, i formati aperti, gli strumenti per l’AI e il vocabolario dell’iter legislativo.',

  // Paragrafo finale di approfondimento (tre link interni).
  more: {
    pre: 'Approfondisci: ',
    mcpPath: '/docs/guida/cos-e-un-mcp-server',
    mcpLabel: 'cos’è un MCP server',
    eliPath: '/docs/guida/citare-una-norma-con-eli',
    eliLabel: 'citare una norma con l’ELI',
    serverPath: '/docs/mcp-server',
    serverLabel: 'gli MCP server di Open·Parlamento',
    post: '.',
  },

  terms: [
    { id: 'eli', name: 'ELI (European Legislation Identifier)', description: 'Identificatore stabile e citabile di una norma (o di un suo articolo) nell’ordinamento europeo e nazionale. Permette di puntare in modo univoco e persistente a una legge, es. eli:/it/legge/2024/03/02/19.' },
    { id: 'celex', name: 'CELEX', description: 'Identificatore univoco degli atti dell’Unione Europea (regolamenti, direttive, decisioni e sentenze) nella banca dati EUR-Lex. Il settore 6 raccoglie la giurisprudenza della Corte di Giustizia UE.' },
    { id: 'akoma-ntoso', name: 'Akoma Ntoso', description: 'Standard XML (OASIS) per rappresentare documenti giuridici e parlamentari in modo strutturato e machine-readable: articoli, commi, modifiche e metadati. È il formato in cui Normattiva pubblica le norme consolidate.' },
    { id: 'normattiva', name: 'Normattiva', description: 'La banca dati ufficiale della legislazione italiana consolidata. Pubblica i testi in Akoma Ntoso con identificatori ELI e le relazioni di modifica tra norme (cosa modifica/abroga/sostituisce cosa), in licenza CC BY 4.0.' },
    { id: 'iter-legislativo', name: 'Iter legislativo', description: 'Il percorso con cui un disegno o una proposta di legge diventa legge: presentazione, esame in commissione, approvazione di Camera e Senato, promulgazione e pubblicazione in Gazzetta Ufficiale.' },
    { id: 'decreto-legge', name: 'Decreto-legge (D.L.)', description: 'Atto con forza di legge adottato dal Governo in casi di necessità e urgenza; decade se non convertito in legge dal Parlamento entro 60 giorni (art. 77 Cost.).' },
    { id: 'decreto-legislativo', name: 'Decreto legislativo (D.lgs)', description: 'Atto con forza di legge emanato dal Governo su delega del Parlamento (legge delega), entro principi e termini fissati dalla delega (art. 76 Cost.).' },
    { id: 'mcp-server', name: 'MCP server (Model Context Protocol)', description: 'Programma che espone strumenti (funzioni) richiamabili da un assistente AI tramite il Model Context Protocol, lo standard aperto introdotto per collegare modelli e fonti/dati esterni. Open·Parlamento pubblica due MCP server open source: republic-mcp e open-parlamento-mcp.' },
    { id: 'knowledge-graph', name: 'Knowledge graph', description: 'Rappresentazione dei dati come rete di entità (norme, articoli, atti) collegate da relazioni tipizzate (modifica, abroga, richiama). Consente di navigare il diritto come un grafo invece che come testo isolato.' },
    { id: 'graphrag', name: 'GraphRAG / LightRAG', description: 'Tecnica di Retrieval-Augmented Generation che combina ricerca semantica e grafo di conoscenza per dare risposte ancorate a fonti. LightRAG è il motore GraphRAG (MIT) usato da Open·Parlamento per il testo per-articolo.' },
    { id: 'sparql', name: 'SPARQL', description: 'Linguaggio di interrogazione per dati in formato RDF (Linked Open Data). Camera e Senato espongono i loro dati (atti, iter, votazioni) via endpoint SPARQL.' },
    { id: 'ckan', name: 'CKAN', description: 'Piattaforma open source per portali open-data. Una stessa API (/api/3/action/…) raggiunge centinaia di portali: dati.gov.it, data.europa.eu e molti cataloghi regionali.' },
    { id: 'osint-legislativo', name: 'OSINT legislativo', description: 'Open-source intelligence applicata alla legislazione: analisi basata esclusivamente su fonti pubbliche, aperte e citabili (norme, iter, dati parlamentari), con identificatori stabili che ne consentono la verifica.' },
  ],
}
