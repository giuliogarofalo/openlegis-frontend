// Metodo.jsx — English content of the «How it works» page (objective, graph,
// typed relations, the agent flow and the roadmap). Bilingual (/come-funziona ↔ /how-it-works).
export default {
  lang: 'en', path: '/en/how-it-works',
  title: 'How OpenLegis works: graph, relations and the agent flow',
  desc: 'How OpenLegis works: the objective, the three-layer knowledge graph, the typed relations between statutes and the flow the agent uses to retrieve, evaluate and present sources. Plus the roadmap.',
  keywords: 'how open parlamento works, legal knowledge graph, relations between statutes, AI law agent, legal RAG, verbatim citations, ELI CELEX, roadmap, legislative process',
  kicker: 'method · objective · roadmap',
  h1: 'How OpenLegis works',
  lead: 'OpenLegis is not a «fixed» legal chatbot: it is an agent that answers by uniting law and public data, always citing the source. Here I explain the objective, how the graph is built, how the agent retrieves and evaluates information, and where the project is heading.',

  goalH: 'The objective',
  goalP1: 'To make the State queryable by anyone — not just lawyers and insiders — with answers traceable back to the official source.',
  goalP2: 'There is a gap no one bridges today: those who hold public data don’t have the law (they can’t tell you whether something is lawful or constitutional); legal bots have the law but no data, and often hallucinate without real citations. OpenLegis unites the two worlds — «law ↔ data» — in a single navigable graph.',
  goalCards: [
    ['§', 'Real, citable sources', 'Every legal statement resolves to an article with a stable identifier: ELI for Italy, CELEX for the EU. Never paraphrased.'],
    ['⚖', 'Honest refusal', 'If there is no source, the agent says so and does not make things up («refuse-on-no-source»).'],
    ['↯', 'Transparent provenance', 'Authoritative relations (from Normattiva) are clearly distinct from AI-inferred ones, with visible confidence.'],
  ],

  graphH: 'The three-layer knowledge graph',
  graphP: 'To avoid the risk of «an AI rewriting the law», knowledge is layered. Three layers, with clear-cut roles.',
  layers: [
    ['l0', 'Layer 0', 'Authoritative source (immutable)', 'Verbatim text of the statute + stable ID (ELI / CELEX). This is what every citation resolves to. Never paraphrased by the LLM.'],
    ['l1', 'Layer 1', 'Relations graph', 'Article-level typed relations between statutes, with provenance and confidence. It is «knowledge compiled ahead of time», not invented on the fly.'],
    ['l2', 'Layer 2', 'Explanatory wiki', 'Plain-language pages and thematic maps built on top of the law — commentary, not source. Also great as indexable content.'],
  ],

  relH: 'The typed relations',
  relP: 'The heart of Layer 1 is not guessed by an LLM: it is extracted deterministically from Normattiva in Akoma Ntoso format (the activeModifications / passiveModifications blocks). Each edge is article-level, with the evidence text attached, «created_by: normattiva» and confidence 1.0.',
  relTable: [
    ['amends', 'One statute amends articles of another'],
    ['repeals', 'Full or partial repeal'],
    ['replaces', 'Replaces the text of a provision'],
    ['inserts', 'Inserts a new provision'],
    ['extends', 'Extends a deadline'],
    ['converts', 'Converts a decree-law into statute'],
    ['implements_delegation', 'Implements a legislative delegation'],
    ['transposes', 'Transposes an EU directive'],
  ],
  relP2: 'On top of this deterministic base, AI-inferred edges are added (impacts on rights and sectors), always labeled as such («created_by: ai», with visible confidence). Honesty about the source comes first.',
  relExample: 'E.g. DL 19/2024 (PNRR) → converted into L. 56/2024; hundreds of authoritative relations toward other statutes (amends, replaces, inserts, repeals…), including the codes already in the graph.',

  flowH: 'How the agent answers',
  flowP: 'At the center is a function-calling agent: it reads the question, picks the right tools, queries them, evaluates the results and synthesizes an answer that cites the sources.',
  flowDiagram: ['Question', 'Agent', 'Tool selection', 'Source retrieval', 'Evaluation', 'Cited answer + graph'],
  steps: [
    ['Question', 'The user asks in Italian or English. The system loads the prompt and the definitions of all available tools.'],
    ['Tool selection', 'The agent classifies intent and invokes one or more tools: cerca_legge (Constitution & codes), cosa_modifica / chi_modifica (Normattiva relations), cerca_ddl_senato / cerca_atti_camera (legislative process), cerca_legge_ue and cerca_sentenze_ue (EU), cerca_sentenze_cost / cassazione (case law), cerca_dati and cerca_statistiche (public data), novita_normative (Official Gazette).'],
    ['Retrieval', 'Each tool queries the real source (Chamber/Senate SPARQL, LightRAG, Normattiva JSONL edges, EUR-Lex, Eurostat, CKAN) and returns structured results.'],
    ['Evaluation', 'The agent assesses each result — present, empty or in error; how many and how rich — and prioritizes the sources that actually answer. If it finds no legal source, it says so openly and does not invent.'],
    ['Presentation', 'It synthesizes an answer that integrates statute and data, with clickable verbatim citations that deep-link to the node in the graph. A «Process» panel shows which tools and sources answered, transparently.'],
  ],

  roadH: 'The development plan',
  roadP: 'Principle: every milestone ships something working and visible. Incremental, anti «boil-the-ocean».',
  roadmap: [
    ['M0', 'Proof of concept', 'GraphRAG engine + first block of legal corpus (Constitution + codes) with ELI identifiers. Chat with real citations and refusal on source-less questions.', 'done'],
    ['M1', 'The product', 'Frontend with a navigable graph and chat; clickable citations that deep-link to the node.', 'done'],
    ['M2', 'Agent & users', 'Agentic orchestrator, gateway with disclaimer, refuse-on-no-source, rate-limit and cache.', 'done'],
    ['M3', 'First connector (CKAN)', 'A single tool opens dati.gov.it, data.europa.eu and hundreds of portals; reuse of RepublicMCP for Chamber/Senate.', 'done'],
    ['M4', 'More connectors & «law ↔ data»', 'Case law (Constitutional Court, Cassation, EU, administrative), Eurostat statistics, Official Gazette, PNRR, reception data; norm ↔ dataset cross-links; wiki layer.', 'in progress'],
    ['M5', 'Launch & sustainability', 'Public deploy, freemium (free graph; paid advanced chat/API), B2B/API, grant applications.', 'next'],
  ],

  relatedH: 'See also',
  faq: [
    { q: 'How does the agent avoid making answers up?', a: 'It always retrieves the source before answering: verbatim statute text with a stable ID (ELI/CELEX) and data from official portals. If it finds no source, it says so and does not improvise (refuse-on-no-source).' },
    { q: 'Where do the relations between statutes come from?', a: 'Authoritative relations (amends, repeals, replaces, converts…) are extracted deterministically from Normattiva in Akoma Ntoso format, at article level and with confidence 1.0. AI-inferred edges are kept separate and labeled as such.' },
    { q: 'What is the project’s objective?', a: 'To make the State queryable by anyone, uniting law and public data into a single navigable graph, with answers traceable back to the official source.' },
    { q: 'Where is my question processed? Is this AI Act compliant?', a: 'The model that generates answers runs entirely on Eurouter, a European gateway that routes only to providers with inference inside the EEA (Mistral AI, IONOS, OVHcloud and others) — never a non-EU provider directly. Every startup live-checks where the configured model actually runs and refuses to start if even one host is outside the EEA; every response is then re-verified against the host that actually served it, rather than trusting a static list alone.' },
  ],
  disclaimer: 'Informational tool — not legal advice. Sources are public and citable (ELI/CELEX).',
}
