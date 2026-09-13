// EnLaw.jsx — English-only content for the Italian legal corpus landing.
// No Italian twin: this page lives only under /en/italian-law.
export default {
  lang: 'en', path: '/en/italian-law',
  title: 'Italian law, explained and queryable',
  desc: 'Italian law explained and queryable with real, citable sources: the Constitution, the codes (penal, civil…), consolidated statutes and EU law, on a navigable knowledge graph.',
  faq: [
    { q: 'Where can I read Italian law in a structured way?', a: 'OpenLegis exposes Italian statutes per article with stable ELI identifiers and amendment relations, sourced from Normattiva (the official consolidated database, CC BY 4.0).' },
    { q: 'Is the data open?', a: 'Yes. Sources are public and open: Normattiva (Akoma Ntoso, ELI), the Chamber and Senate (SPARQL), EUR-Lex (CELEX) and Eurostat. See the open data page.' },
    { q: 'Can I query Italian law programmatically?', a: 'Yes, via the open-source MCP servers (republic-mcp on npm, open-parlamento-mcp on PyPI) usable from Claude Desktop, Cursor and other clients.' },
  ],
}
