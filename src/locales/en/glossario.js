// Legal-technical glossary (Glossario.jsx) — English editorial content.
// DefinedTermSet schema. Canonical terms (ELI, CELEX, MCP…) keep their identifier;
// the definitions are translated.
export default {
  path: '/docs/glossario',
  inLanguage: 'en',
  title: 'Glossary — ELI, CELEX, MCP server, legislative OSINT',
  desc: 'OpenLegis glossary: ELI, CELEX, Akoma Ntoso, Normattiva, MCP server, knowledge graph, SPARQL, CKAN, legislative OSINT and the terms of the Italian legislative process.',
  keywords: 'legal glossary, what is ELI, what is CELEX, Akoma Ntoso, what is an MCP server, legal knowledge graph, legislative OSINT, SPARQL, CKAN, decree-law, legislative decree',
  setName: 'Glossary — OpenLegis',

  breadcrumbHome: 'OpenLegis',
  breadcrumbDocs: 'Documentation',
  breadcrumbSelf: 'Glossary',
  docsPath: '/docs',

  kicker: 'documentation · definitions',
  h1: 'Glossary',
  lead: 'The terms of OpenLegis, in plain language: the identifiers of statutes, the open formats, the tools for AI and the vocabulary of the Italian legislative process.',

  // Closing "learn more" paragraph (three internal links).
  more: {
    pre: 'Learn more: ',
    mcpPath: '/docs/guida/cos-e-un-mcp-server',
    mcpLabel: 'what an MCP server is',
    eliPath: '/docs/guida/citare-una-norma-con-eli',
    eliLabel: 'citing a statute with the ELI',
    serverPath: '/docs/mcp-server',
    serverLabel: 'OpenLegis’s MCP servers',
    post: '.',
  },

  terms: [
    { id: 'eli', name: 'ELI (European Legislation Identifier)', description: 'A stable, citable identifier of a statute (or one of its articles) in the European and national legal order. It lets you point uniquely and persistently to a law, e.g. eli:/it/legge/2024/03/02/19.' },
    { id: 'celex', name: 'CELEX', description: 'The unique identifier of European Union acts (regulations, directives, decisions and judgments) in the EUR-Lex database. Sector 6 gathers the case law of the EU Court of Justice.' },
    { id: 'akoma-ntoso', name: 'Akoma Ntoso', description: 'An XML standard (OASIS) for representing legal and parliamentary documents in a structured, machine-readable way: articles, paragraphs, amendments and metadata. It is the format in which Normattiva publishes consolidated statutes.' },
    { id: 'normattiva', name: 'Normattiva', description: 'The official database of consolidated Italian legislation. It publishes texts in Akoma Ntoso with ELI identifiers and the amendment relations between statutes (what amends/repeals/replaces what), under a CC BY 4.0 licence.' },
    { id: 'iter-legislativo', name: 'Iter legislativo (legislative process)', description: 'The path by which a bill or a legislative proposal becomes law: introduction, examination in committee, approval by the Chamber of Deputies and the Senate, promulgation and publication in the Gazzetta Ufficiale.' },
    { id: 'decreto-legge', name: 'Decreto-legge (decree-law, D.L.)', description: 'An act with the force of law adopted by the Italian Government in cases of necessity and urgency; it lapses if not converted into law by Parliament within 60 days (art. 77 of the Italian Constitution).' },
    { id: 'decreto-legislativo', name: 'Decreto legislativo (legislative decree, D.lgs)', description: 'An act with the force of law issued by the Italian Government under a delegation from Parliament (enabling law), within the principles and time limits set by the delegation (art. 76 of the Italian Constitution).' },
    { id: 'mcp-server', name: 'MCP server (Model Context Protocol)', description: 'A program that exposes tools (functions) callable by an AI assistant through the Model Context Protocol, the open standard introduced to connect models with external sources/data. OpenLegis publishes two open-source MCP servers: republic-mcp and open-parlamento-mcp.' },
    { id: 'knowledge-graph', name: 'Knowledge graph', description: 'A representation of data as a network of entities (statutes, articles, acts) linked by typed relations (amends, repeals, refers to). It lets you navigate the law as a graph instead of as isolated text.' },
    { id: 'graphrag', name: 'GraphRAG / LightRAG', description: 'A Retrieval-Augmented Generation technique that combines semantic search and a knowledge graph to give answers anchored to sources. LightRAG is the GraphRAG engine (MIT) used by OpenLegis for the per-article text.' },
    { id: 'sparql', name: 'SPARQL', description: 'A query language for data in RDF format (Linked Open Data). The Chamber of Deputies and the Senate expose their data (acts, parliamentary process, votes) via SPARQL endpoints.' },
    { id: 'ckan', name: 'CKAN', description: 'An open-source platform for open-data portals. A single API (/api/3/action/…) reaches hundreds of portals: dati.gov.it, data.europa.eu and many regional catalogues.' },
    { id: 'osint-legislativo', name: 'Legislative OSINT', description: 'Open-source intelligence applied to legislation: analysis based exclusively on public, open and citable sources (statutes, parliamentary process, parliamentary data), with stable identifiers that make verification possible.' },
  ],
}
