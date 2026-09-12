// ApiDocs.jsx — English content of the read-only public API page.
export default {
  lang: 'en', path: '/en/api', alt: '/docs/api',
  title: 'Public API — open data on Italian law',
  desc: 'Free, read-only REST API over Open·Parlamento open data: statutes, per-article text, amendment relations and the knowledge graph. GET only, with OpenAPI/Swagger. CC BY 4.0.',
  kicker: 'open data · read-only API',
  h1: 'Public API',
  lead: 'All the corpus data, in JSON, free and citable: statutes, per-article text, amendment relations and the knowledge graph. A read-only API (GET only), documented with OpenAPI/Swagger.',
  epH: 'Endpoints', exH: 'Examples', docH: 'Interactive documentation',
  docP: 'Explore and try the endpoints from Swagger UI (OpenAPI spec included):',
  licH: 'License and attribution',
  licP: 'Data from Normattiva (Akoma Ntoso, ELI) under CC BY 4.0. Always cite the official source. Informational tool, not legal advice.',
  relH: 'See also',
  faq: [
    { q: 'Is the API free?', a: 'Yes, it is public, free and read-only (GET). Data is open and citable (ELI, CC BY 4.0).' },
    { q: 'Can I write or modify data?', a: 'No: the API exposes reads only (GET). There are no public write endpoints.' },
    { q: 'Where is the OpenAPI spec?', a: 'The spec is available as JSON, and the Swagger UI lets you try the endpoints from the browser.' },
  ],
}
