// ApiDocs.jsx — contenuto italiano della pagina API pubblica read-only.
export default {
  lang: 'it', path: '/docs/api', alt: '/en/api',
  title: 'API pubblica — dati aperti sulla legge italiana',
  desc: 'API REST read-only e gratuita sui dati aperti di Open·Parlamento: norme, testo per-articolo, relazioni di modifica e knowledge graph. Solo GET, con OpenAPI/Swagger. Licenza CC BY 4.0.',
  kicker: 'open data · API read-only',
  h1: 'API pubblica',
  lead: 'Tutti i dati del corpus, in JSON, gratuiti e citabili: norme, testo per-articolo, relazioni di modifica e il knowledge graph. È un’API di sola lettura (solo GET), documentata con OpenAPI/Swagger.',
  epH: 'Endpoint', exH: 'Esempi', docH: 'Documentazione interattiva',
  docP: 'Esplora e prova gli endpoint dallo Swagger UI (specifica OpenAPI inclusa):',
  licH: 'Licenza e attribuzione',
  licP: 'Dati da Normattiva (Akoma Ntoso, ELI) in licenza CC BY 4.0. Cita sempre la fonte ufficiale. Strumento informativo, non consulenza legale.',
  relH: 'Vedi anche',
  faq: [
    { q: 'L’API è gratuita?', a: 'Sì, è pubblica e gratuita, in sola lettura (GET). I dati sono aperti e citabili (ELI, CC BY 4.0).' },
    { q: 'Posso scrivere o modificare i dati?', a: 'No: l’API espone solo letture (GET). Non esistono endpoint di scrittura pubblici.' },
    { q: 'Dove trovo la specifica OpenAPI?', a: 'La specifica è disponibile come JSON e lo Swagger UI permette di provare gli endpoint dal browser.' },
  ],
}
