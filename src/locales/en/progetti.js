// Progetti.jsx — English content of the «Projects & libraries» page.
// Lists OpenLegis's open-source projects. RepublicMCP is where it all began.
// Each item: [name, registry/type, description, link-key (see LINKS in Progetti.jsx), badge].
export default {
  lang: 'en', path: '/en/projects',
  title: 'Open-source projects & libraries behind OpenLegis',
  desc: 'The open-source projects and libraries behind OpenLegis: RepublicMCP (the origin), republic-mcp on npm, openlegis-mcp on PyPI and the relations graph. Apache-2.0 code, public sources.',
  kicker: 'open source · npm · PyPI · GitHub',
  h1: 'Projects & libraries',
  lead: 'OpenLegis is reuse-first and open source. Here are my projects and published libraries — Apache-2.0 code, data from official and citable sources. Everything is installable and inspectable.',

  originH: 'Where it began',
  originP: 'It all started with RepublicMCP: an MCP server that exposes the Italian Chamber and Senate as agentic tools over SPARQL. Mapping the OCD (Chamber) and OSR (Senate) ontologies and their relations is what sparked the bigger idea — uniting law and public data into a single queryable graph. OpenLegis is the natural evolution.',
  originP2: 'The two ontologies look similar and diverge in subtle, dangerous ways: the Chamber uses foaf:surname, the Senate foaf:lastName; the Chamber expresses the legislature as a full URI, the Senate as a plain integer; mandate start/end properties have different names (ocd:startDate/endDate vs osr:inizio/fine). I mapped and documented them one by one, with example queries — the kind of detail you usually only discover after a failed query.',
  ontologyDiffLabel: 'The full Chamber ↔ Senate mapping, with example queries',

  mineH: 'My projects',
  mine: [
    ['OpenLegis', 'openlegis.it', 'The project: a function-calling agent, connectors, knowledge graph and webapp. The layer that makes queryable the sources that, on their own, are not. The monorepo is private — the reusable code lives in the public projects below.', 'site', 'active'],
    ['RepublicMCP', 'GitHub · TypeScript', 'The origin. An MCP server exposing the Chamber and Senate (acts, legislative process, votes, signatories) over SPARQL, with the OCD/OSR ontologies documented and diagrammed.', 'republicMCP', 'origin'],
    ['republic-mcp', 'npm · TypeScript', 'The published RepublicMCP package: «npx -y republic-mcp». Chamber & Senate + Openpolis data (MPs, power index, votes, decrees, organs).', 'republicMCPnpm', 'published'],
    ['openlegis-mcp', 'GitHub · Python', 'The MCP server for law and data: Constitution and codes, Normattiva amendments, legislative process, EU/Constitutional/Cassation/administrative case law, statistics, Official Gazette, CKAN data, OpenPolis, PNRR (incl. contract awards) — 25 tools. On PyPI: «pip install openlegis-mcp».', 'openParlamentoMcpGithub', 'published'],
  ],

  dataH: 'Open data',
  data: [
    ['Relations graph', 'JSON', 'Amendment/repeal/replacement relations between statutes and articles, from Normattiva (Akoma Ntoso), with provenance and confidence.', 'graph', 'open'],
    ['Legal corpus', 'HTML · ELI', 'Per-article consolidated text of decrees and laws, with ELI identifiers and static, indexable pages.', 'norme', 'open'],
  ],

  stackH: 'What it stands on',
  stackP: 'Nothing from scratch where a standard exists: ',
  stack: [
    ['LightRAG', 'GraphRAG engine (MIT): text, graph and semantic search.', 'lightrag'],
    ['Normattiva OpenData', 'The Italian body of law in Akoma Ntoso (CC BY 4.0).', 'normattiva'],
    ['dati.camera.it', 'Linked Open Data of the Chamber (OCD ontology).', 'camera'],
    ['dati.senato.it', 'Open Data of the Senate (OSR ontology).', 'senato'],
    ['EUR-Lex / CELLAR', 'EU law and the semantic repository (CELEX, ELI).', 'eurlex'],
  ],

  ctaH: 'How to install',
  ctaP: 'Both MCP servers work from Claude Desktop, Cursor and other compatible clients. The full guide is on the MCP server page.',

  relatedH: 'See also',
  faq: [
    { q: 'Which project did OpenLegis grow out of?', a: 'RepublicMCP: the MCP server that exposes the Chamber and Senate over SPARQL. Mapping the OCD and OSR ontologies sparked the idea of uniting law and data into a single queryable graph.' },
    { q: 'Are the projects open source?', a: 'Yes. The code is published under the Apache-2.0 license on GitHub; packages are on npm (republic-mcp) and PyPI (openlegis-mcp). Data comes from public, citable sources.' },
    { q: 'Can I use the libraries without the webapp?', a: 'Yes. The MCP servers are standalone: «npx -y republic-mcp» or «pip install openlegis-mcp», then configure them in your MCP client. They work independently of the website.' },
  ],
  disclaimer: 'Informational tool — not legal advice. Apache-2.0 code, public and citable sources (ELI/CELEX).',
}
