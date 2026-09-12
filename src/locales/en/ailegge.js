// SEO landing «Artificial intelligence for Italian law» (SEO Phase 3).
// Target query: "AI for Italian law", "Italian law AI", "Italian legislation chatbot",
// "query Italian law with AI", "Italian parliament AI". Imported by AiLeggeItaliana.jsx.
// Inline-emphasis fragments use <0>bold</0> tokens rendered by <Rich>.
export default {
  path: '/intelligenza-artificiale-legge-italiana',
  appPath: '/app',
  inLanguage: 'en-US',
  title: 'Artificial intelligence for Italian law',
  desc: 'OpenLegis is the AI resource for Italian law: query the Constitution, codes, decrees and Parliament data with real, citable sources (ELI/CELEX) on a navigable knowledge graph.',
  keywords:
    'AI for Italian law, Italian law AI, artificial intelligence Italian legislation, Italian law chatbot, query Italian law with AI, Italian parliament AI, legal research AI, Italian law API, MCP server Italian law',
  kicker: 'artificial intelligence · law · real sources',
  h1: 'Artificial intelligence for Italian law',
  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'AI for Italian law',
  lead:
    '<0>OpenLegis</0> is an AI agent that answers questions on <0>Italian and EU law</0> — the Constitution, codes, decrees, EU law and the parliamentary process — always citing the <0>official, verifiable source</0>. No made-up answers: every statement rests on a real reference (ELI/CELEX) on a navigable knowledge graph.',
  sections: [
    {
      h: 'What you can ask',
      body: [
        'Ask in plain language and get the answer with the <0>exact article</0> and a link to the source: “What does the Constitution say about repudiating war?”, “What does Decree-Law 19/2024 change?”, “Where is a bill in its process?”.',
        'The AI does not just generate text: it retrieves the provision, shows its <0>consolidated text</0> and reconstructs the <0>amendment relations</0> (what it repeals, replaces, converts) between acts.',
      ],
      cta: [['Start querying the law', '/app'], ['Explore the graph', '/app?view=explore']],
    },
    {
      h: 'Why it differs from a generic chatbot',
      body: [
        'A general-purpose assistant can <0>hallucinate</0> articles and law numbers. OpenLegis starts from <0>authoritative data</0>: the legal corpus comes from Normattiva in Akoma Ntoso (ELI), EU law from EUR-Lex (CELEX), parliamentary activity from the open data of the Chamber and Senate.',
        'Relations between norms are extracted <0>deterministically</0>, at the single-article level and with the evidence text attached. If a source does not exist, the agent says so instead of inventing it.',
      ],
      cta: [['How it works', '/docs/come-funziona'], ['Data and sources', '/docs/dati']],
    },
    {
      h: 'For developers and other AIs',
      body: [
        'OpenLegis is also built to be <0>consumed by other AIs</0>: a public read-only API exposes norms, articles and relations, and an <0>MCP server</0> lets agents like Claude and ChatGPT query Italian law with citable sources.',
        'The data is open (CC BY 4.0) and citable: ideal for legal research, legal-tech and legislative OSINT.',
      ],
      cta: [['Public API', '/docs/api'], ['MCP server', '/docs/mcp-server'], ['Open data', '/open-data']],
    },
    {
      h: 'Explore the corpus',
      body: [
        'Browse the already-indexed sources: the <0>Constitution</0>, the main <0>codes</0>, laws and decrees — each with per-article text, amendment relations and a link to the official source.',
      ],
      cta: [['Constitution', '/costituzione'], ['Codes', '/codici'], ['All norms', '/norme'], ['Parliament', '/parlamento']],
    },
  ],
  faq: [
    {
      q: 'Is there an artificial intelligence for Italian law?',
      a: 'Yes. OpenLegis is an AI agent that answers on the Constitution, codes, decrees and EU law, always citing the official, verifiable source (ELI/CELEX), on a navigable knowledge graph.',
    },
    {
      q: 'Can the AI get the law wrong or make it up?',
      a: 'Generic models can hallucinate legal references. OpenLegis starts from authoritative data (Normattiva in Akoma Ntoso, EUR-Lex, open parliamentary data) and always cites the source; if a norm is not in the corpus, it says so instead of inventing it.',
    },
    {
      q: 'Can I use OpenLegis from my own AI or tools?',
      a: 'Yes. There is a public read-only API and an MCP server that lets agents like Claude or ChatGPT query Italian law with citable sources. The data is open (CC BY 4.0).',
    },
    {
      q: 'Is OpenLegis legal advice?',
      a: 'No. It is an informational tool that always cites the official source and invites you to verify it; it does not replace legal advice.',
    },
  ],
  ctaPrimary: 'Start querying the law →',
  disclaimer:
    'Informational tool based on public sources (Normattiva, EUR-Lex, open data of the Chamber and Senate). It is not legal advice: always verify against the official source.',
}
