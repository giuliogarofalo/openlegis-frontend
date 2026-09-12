// Informational guides (long-tail) — English editorial content. Imported by pages/Guida.jsx.
// /en/docs/guida/<slug>. Same shape as locales/it/guida.js (same slug keys), fully translated.
//
// `after` is modelled as an array of segments (data, no JSX): each segment is
//   - a string (rendered by <Rich>, tokens <0>bold</0> <1>italic</1> <2>mono</2>), or
//   - a link { text, href } (internal IT path, mapped to /en/* via enPathOf), or
//   - a link { text, ask } (opens the app with the query) or { text, raw } (ready-made URL).
// Canonical proper nouns / IDs are kept untranslated: ELI, CELEX, MCP, Normattiva,
// Gazzetta Ufficiale, Corte Costituzionale, decreto-legge / decreto legislativo, slug strings.
export default {
  altreGuide: 'Other guides',
  faqTitle: 'Frequently asked questions',
  glossarioLabel: 'Glossary',
  glossarioDesc: ' — ELI, CELEX, MCP server, legislative OSINT',
  disclaimer: 'Informational tool — not legal advice.',
  crumbHome: 'Open·Parlamento',
  crumbDocs: 'Documentation',
  crumbGuide: 'Guides',
  crumbGuidaLabel: 'Guide',

  guides: {
    'iter-di-una-legge': {
      title: 'How an Italian bill becomes law',
      kicker: 'guide · parliament',
      desc: 'The Italian legislative process explained step by step: initiative, committee review, approval by the Chamber of Deputies and the Senate, promulgation and publication in the Official Gazette.',
      keywords: 'how a bill becomes law, Italian legislative process, how an Italian law is passed, parliamentary committee, shuttle between chambers, promulgation, Gazzetta Ufficiale',
      lead: 'How a law is born: from the initiative to publication in the Italian Official Gazette (Gazzetta Ufficiale). A path in which the Chamber of Deputies and the Senate hold equal powers (perfect bicameralism).',
      steps: [
        { name: 'Initiative', text: 'A bill (disegno or proposta di legge) can be introduced by the Government, by any member of Parliament, by the people (50,000 signatures), by the Regional Councils or by the CNEL (Art. 71 of the Italian Constitution).' },
        { name: 'Committee review', text: 'The committee competent for the subject matter reviews the text (sede referente), may amend it and appoints a rapporteur for the floor.' },
        { name: 'Approval by the first chamber', text: 'The floor debates, votes on amendments and approves article by article, then the final text.' },
        { name: 'Transmission to the other chamber (navette)', text: 'The text passes to the other chamber. If it is amended, it goes back: the “shuttle” (navette) continues until both chambers approve an identical text.' },
        { name: 'Promulgation', text: 'The President of the Republic promulgates the law within one month (and may refer it back to the chambers once, Art. 74 of the Italian Constitution).' },
        { name: 'Publication and entry into force', text: 'The law is published in the Official Gazette (Gazzetta Ufficiale) and normally enters into force after 15 days (vacatio legis).' },
      ],
      after: [
        [
          'Special cases: the ',
          { text: 'decreto-legge (emergency decree) and the decreto legislativo (delegated decree)', href: '/docs/guida/decreto-legge-vs-decreto-legislativo' },
          ' follow different paths (urgency and delegation). You can track the real status of a bill in the ',
          { text: 'app', ask: 'What is the status of the bill on nuclear power? Cite the act number and its status.' },
          '.',
        ],
      ],
      faq: [
        { q: 'How long does the legislative process take?', a: 'There is no fixed deadline: it depends on the number of readings (navette) and on complexity. A decreto-legge, by contrast, must be converted into law within 60 days.' },
        { q: 'What is perfect bicameralism?', a: 'In Italy the Chamber of Deputies and the Senate hold the same legislative powers: a law must be approved in the same text by both.' },
      ],
    },
    'decreto-legge-vs-decreto-legislativo': {
      title: 'Decreto-legge and decreto legislativo: the differences',
      kicker: 'guide · sources of law',
      desc: 'The difference between decreto-legge and decreto legislativo: who adopts them, on what basis (urgency vs delegation), the deadlines and what happens if they are not converted or issued in time.',
      keywords: 'decreto-legge, decreto legislativo, difference decreto legge decreto legislativo, enabling act, decree conversion, art 76 77 Italian Constitution',
      lead: 'Two acts having the force of law issued by the Italian Government, often confused. The difference lies in the source of the power: urgency for the decreto-legge, a delegation from Parliament for the decreto legislativo.',
      steps: [
        { name: 'Decreto-legge — emergency decree (Art. 77 of the Italian Constitution)', text: 'Adopted by the Government in extraordinary cases of necessity and urgency. It takes immediate effect but lapses (ex tunc) if the chambers do not convert it into law within 60 days.' },
        { name: 'Decreto legislativo — delegated decree (Art. 76 of the Italian Constitution)', text: 'Issued by the Government under a delegation from Parliament (an enabling act, legge delega) that sets the subject, principles and deadlines. It has no urgency requirement.' },
        { name: 'In short', text: 'Decreto-legge = urgency + subsequent conversion by Parliament. Decreto legislativo = prior delegation by Parliament + implementation by the Government.' },
      ],
      after: [
        [
          'On Open·Parlamento you can see what a decree ',
          { text: 'amends or repeals', ask: 'What does decreto-legge 19 of 2024 amend?' },
          ' (authoritative relations from Normattiva) and follow its conversion status. See the ',
          { text: 'glossary', href: '/docs/glossario#decreto-legge' },
          '.',
        ],
      ],
      faq: [
        { q: 'What happens if a decreto-legge is not converted?', a: 'It lapses retroactively (ex tunc) from the start: it is as if it had never existed, unless Parliament regulates the relationships that arose in the meantime.' },
        { q: 'Does a decreto legislativo need conversion?', a: 'No. It rests on a prior enabling act (legge delega); it requires no conversion, but it must respect the principles and deadlines of the delegation.' },
      ],
    },
    'citare-una-norma-con-eli': {
      title: 'How to cite a law with the ELI',
      kicker: 'guide · citable sources',
      desc: 'What the ELI (European Legislation Identifier) is and how to use it to cite a law or a single article in a stable and verifiable way, with examples.',
      keywords: 'ELI, European Legislation Identifier, how to cite a law, law identifier, Normattiva ELI, citing a legal article',
      lead: 'The ELI is the stable identifier of a law: a permanent “address” pointing to a law or to one of its articles, so the citation stays verifiable over time.',
      steps: [
        { name: 'Structure of the ELI', text: 'In Italy an ELI has the form eli:/it/<type>/<year>/<month>/<day>/<number> — e.g. eli:/it/legge/2024/03/02/19. Adding /art/<n> points to the single article.' },
        { name: 'Why use it', text: 'Unlike a link to a page, the ELI is persistent and unique: it does not break and identifies exactly the law being cited.' },
        { name: 'How to cite it', text: 'Give the human-readable reference (e.g. “Art. 575 of the Italian Criminal Code”) and pair it with the ELI/URN as a stable source; for the EU the analogous CELEX identifier is used.' },
      ],
      after: [
        [
          'Open·Parlamento uses the ELL/ELI as the anchor of every answer and in the ',
          { text: 'corpus pages', href: '/norme' },
          '. See also ',
          { text: 'CELEX', href: '/docs/glossario#celex' },
          ' for European Union acts.',
        ],
      ],
      faq: [
        { q: 'What is the difference between ELI and CELEX?', a: 'ELI identifies national and European laws in a harmonised way; CELEX is the specific identifier of European Union acts and judgments on EUR-Lex.' },
      ],
    },
    'cos-e-un-mcp-server': {
      title: 'What an MCP server is (and how to use it for the law)',
      kicker: 'guide · developer',
      desc: 'What an MCP server (Model Context Protocol) is, what it is for and how to connect Open·Parlamento’s open-source MCP servers to Claude Desktop or Cursor to query Italian law and Parliament.',
      keywords: "what is an MCP server, Model Context Protocol, MCP server tutorial, open source MCP, republic-mcp, open-parlamento-mcp, Claude Desktop MCP",
      lead: 'An MCP server exposes tools (functions) that an AI assistant can call to read real sources instead of making them up. It is the standard way to give a model access to data and actions.',
      steps: [
        { name: 'The Model Context Protocol', text: 'MCP is the open standard that connects an AI client (Claude Desktop, Cursor…) to “servers” offering tools, resources and prompts.' },
        { name: 'What an MCP server does', text: 'It declares a list of functions with their parameters; when the AI invokes them, the server executes (e.g. it looks up a law) and returns structured, citable data.' },
        { name: 'Open·Parlamento’s MCP servers', text: 'republic-mcp (npm) for the Chamber of Deputies, the Senate and OpenPolis; open-parlamento-mcp (PyPI) for law, EU law, case law, statistics and open data. Both open source (MIT).' },
        { name: 'Connecting them', text: 'Add the servers to the client configuration (mcpServers): npx -y republic-mcp; pip install open-parlamento-mcp and the open-parlamento-mcp command.' },
      ],
      after: [
        [
          'Details, snippets and a table of tools are on the ',
          { text: 'MCP server', href: '/docs/mcp-server' },
          ' page (',
          { text: 'Italiano', raw: '/docs/mcp-server' },
          ').',
        ],
      ],
      faq: [
        { q: 'Are Open·Parlamento’s MCP servers free and open source?', a: 'Yes: MIT code on GitHub, packages on npm and PyPI, data from public and open sources.' },
        { q: 'Which clients do they work with?', a: 'With any client compatible with the Model Context Protocol, such as Claude Desktop and Cursor.' },
      ],
    },
    'gerarchia-delle-fonti-del-diritto': {
      title: 'The hierarchy of the sources of Italian law',
      kicker: 'guide · sources of law',
      desc: 'The hierarchy of the sources of law in Italy: the Constitution, constitutional laws, European Union sources, statutes and acts having the force of law, regulations, customs.',
      keywords: 'hierarchy of sources, sources of law, Italian Constitution, primary sources, secondary sources, regulations, EU law primacy',
      lead: 'Laws do not all carry the same “weight”: they are arranged in a hierarchy. A source of lower rank cannot contradict a higher one. Here is the order, from the top.',
      steps: [
        { name: 'The Constitution and constitutional laws', text: 'At the top: the Italian Constitution and constitutional/revision laws (an aggravated procedure, Art. 138). Everything else must conform to it.' },
        { name: 'European Union sources', text: 'EU regulations and directives: by the principle of primacy, they prevail over incompatible domestic rules in the matters within the Union’s competence.' },
        { name: 'Primary sources', text: 'Ordinary statutes of the State and acts of the Government having the force of law: decreto-legge and decreto legislativo. At the territorial level, regional laws in their own matters.' },
        { name: 'Secondary sources', text: 'Regulations (governmental, ministerial): they implement statutes and cannot derogate from them.' },
        { name: 'Usages and customs', text: 'At the bottom, usages: they matter only insofar as statutes and regulations refer to them.' },
      ],
      after: [
        [
          'On Open·Parlamento every law reports its type and identifier (ELI), and the amendment relations show how the sources interweave. See ',
          { text: 'the Italian Constitution', href: '/costituzione' },
          ' and the ',
          { text: 'codes', href: '/codici' },
          '.',
        ],
      ],
      faq: [
        { q: 'What happens if a statute conflicts with the Constitution?', a: 'It may be declared unconstitutional by the Italian Constitutional Court (Corte Costituzionale) in a review of constitutionality, and it loses its effect.' },
        { q: 'Does EU law prevail over Italian law?', a: 'In the matters within the Union’s competence, yes: by the principle of primacy the judge disapplies the incompatible domestic rule.' },
      ],
    },
    'cos-e-normattiva': {
      title: 'What Normattiva is',
      kicker: 'guide · sources',
      desc: 'What Normattiva is: the official database of consolidated Italian legislation, in Akoma Ntoso format with ELI identifiers and a CC BY 4.0 licence.',
      keywords: 'Normattiva, what is Normattiva, consolidated legislation, Akoma Ntoso, ELI, consolidated text of a law, law database',
      lead: 'Normattiva is the official database of Italian legislation: the texts of laws updated with all amendments (consolidated text), in an open and citable format.',
      steps: [
        { name: 'Consolidated text', text: 'For each law you find the text in force, already updated with subsequent amendments — not just the original version.' },
        { name: 'Open formats', text: 'Laws are published in Akoma Ntoso (legal XML) with ELI identifiers, under a CC BY 4.0 licence.' },
        { name: 'Amendment relations', text: 'Normattiva also describes what a law amends/repeals/replaces: authoritative relations between acts.' },
      ],
      after: [
        [
          'Open·Parlamento reuses Normattiva for the ',
          { text: 'corpus of laws', href: '/norme' },
          ' and for the amendment relations (what it amends / who amended it). See also ',
          { text: 'how to cite with the ELI', href: '/docs/guida/citare-una-norma-con-eli' },
          '.',
        ],
      ],
      faq: [
        { q: 'Is Normattiva free?', a: 'Yes, it is the official public service for consulting Italian legislation, with open data under a CC BY 4.0 licence.' },
        { q: 'What is the consolidated text?', a: 'It is the text of a law updated with all the amendments that have occurred over time, as it stands in force today.' },
      ],
    },
    'cos-e-la-gazzetta-ufficiale': {
      title: 'What the Gazzetta Ufficiale is',
      kicker: 'guide · publication',
      desc: 'What the Italian Official Gazette (Gazzetta Ufficiale della Repubblica Italiana) is: where laws are published, the series, when a law enters into force (vacatio legis).',
      keywords: 'Gazzetta Ufficiale, Italian Official Gazette, Serie Generale, publication of laws, vacatio legis, entry into force, legislative news',
      lead: 'The Gazzetta Ufficiale is the bulletin where the State publishes laws: a law exists for citizens once it is published in the Gazzetta.',
      steps: [
        { name: 'The series', text: 'The Serie Generale (General Series) contains laws, decreti-legge, decreti legislativi, presidential decrees (DPR) and other acts; there are then special series (Corte Costituzionale, EU, Regions, Public competitions, Contracts).' },
        { name: 'Publication and entry into force', text: 'After publication, a law normally enters into force after 15 days (vacatio legis), unless otherwise indicated.' },
        { name: 'Updates', text: 'The Serie Generale is updated on working days; Open·Parlamento follows its news (RSS feed) to keep the corpus up to date.' },
      ],
      after: [
        [
          'Ask the ',
          { text: 'app', raw: '/en/app?q=Cosa%20%C3%A8%20stato%20pubblicato%20in%20Gazzetta%20Ufficiale%20di%20recente%3F' },
          ' what was recently published in the Gazzetta. See also ',
          { text: 'how an Italian bill becomes law', href: '/docs/guida/iter-di-una-legge' },
          '.',
        ],
      ],
      faq: [
        { q: 'What is the vacatio legis?', a: 'It is the period (normally 15 days) between the publication of a law in the Official Gazette (Gazzetta Ufficiale) and its entry into force.' },
        { q: 'Where are Italian laws published?', a: 'In the Official Gazette of the Italian Republic (Gazzetta Ufficiale della Repubblica Italiana), Serie Generale, after promulgation.' },
      ],
    },
    'come-funziona-la-corte-costituzionale': {
      title: 'How the Italian Constitutional Court works',
      kicker: 'guide · constitutional justice',
      desc: 'How the Italian Constitutional Court (Corte Costituzionale) works: its composition, the review of the constitutionality of laws and the types of decision (unconstitutional, unfounded, inadmissible).',
      keywords: 'Corte Costituzionale, Italian Constitutional Court, Consulta, review of constitutionality, unconstitutional ruling, challenged laws, question of constitutionality',
      lead: 'The Italian Constitutional Court (Corte Costituzionale, the Consulta) checks that laws comply with the Constitution. It is the guardian of the fundamental charter.',
      steps: [
        { name: 'Composition', text: '15 judges: 5 appointed by the President of the Republic, 5 by Parliament in joint session, 5 by the supreme courts. They serve for 9 years.' },
        { name: 'Review of constitutionality', text: 'It examines whether a law complies with the Constitution, either incidentally (raised by a judge) or directly (by the State or the Regions).' },
        { name: 'The types of decision', text: 'It may declare the law unconstitutional (which then loses its effect), or the question unfounded or inadmissible.' },
      ],
      after: [
        [
          'On Open·Parlamento you can see whether a law has been declared unconstitutional or whether it is ',
          { text: 'currently being challenged', raw: '/en/app?q=L%27art.%204-bis%20ord.%20penit.%20%C3%A8%20attualmente%20impugnato%20davanti%20alla%20Consulta%3F' },
          ' (pending cases). See the ',
          { text: 'Italian Constitution', href: '/costituzione' },
          ' (Arts. 134–137).',
        ],
      ],
      faq: [
        { q: 'What happens when a law is declared unconstitutional?', a: 'It loses its effect from the day after the ruling is published: it can no longer be applied.' },
        { q: 'Who can raise a question of constitutionality?', a: 'Incidentally, a judge during a trial; directly, the State or the Regions for their respective acts.' },
      ],
    },
  },
}
