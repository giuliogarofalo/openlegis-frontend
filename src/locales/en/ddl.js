// Ddl.jsx (English). Mirror of locales/it/ddl.js — see that file for context/comments.
export default {
  path: '/en/ddl',
  inLanguage: 'en',
  title: 'Bills: comparison table and citation-only compliance',
  desc: 'Bills we\'ve collected, with status, days stalled, and a compliance dossier built only from explicit citations in the bill\'s own text — never an opinion without a source.',
  keywords: 'italian bill, senato ddl, legislative process, constitutional compliance, constitutional court case law',
  headline: 'Bills: comparison table and compliance',

  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'Bills',

  kicker: 'public data · citation by citation',
  h1: 'Bills: status, timing, compliance',
  lead: 'A curated list of bills (for now a small hand-picked sample, see the method note) with their procedural status, how long they\'ve been stalled, and — where available — a compliance dossier: ONLY explicit citations found in the bill\'s own text, never a judgment without a source next to it.',

  loading: 'Loading…',
  loadError: 'Could not load data right now.',
  empty: 'No bills collected yet.',

  tabellaH: 'Comparison table',
  tabellaIntro: 'Sorted by days stalled (ascending). Click a bill for its compliance dossier.',
  colNumero: 'Act',
  colTitolo: 'Title',
  colStato: 'Status',
  colGiorniFermo: 'Days stalled',
  colProponente: 'Sponsor',
  colArticoli: 'Articles',

  timelineH: 'Committee assignment history',
  timelineIntro: 'The committees this bill was assigned to over time (lead committee in bold, others advisory only).',
  timelineVuoto: 'No assignment history available.',
  timelineSede: (s) => ({ redigente: 'drafting capacity', referente: 'reporting capacity', deliberante: 'deliberating capacity' })[s] || s,
  timelineConsultive: 'Advisory',

  dettaglioH: 'Compliance dossier',
  dettaglioIntro: 'Every reference below is an EXPLICIT citation found in the bill\'s own text — not an inference. If a reference has no matching case law, that is stated as a corpus gap, never filled in with an opinion.',
  dettaglioVuoto: 'No explicit citation to the Constitution or a code was found in this bill\'s text (or the text hasn\'t been collected yet).',
  articoloLabel: (n) => `Article ${n}`,
  citazioneLabel: 'Citation in the bill\'s text',
  giurisprudenzaLabel: (n) => `${n} Constitutional Court ruling(s)`,
  giurisprudenzaVuota: 'No Constitutional Court ruling found on this reference in the local corpus.',
  casiPendentiLabel: 'Currently challenged before the Constitutional Court',
  modificatoDaLabel: 'Already amended by',
  chiudiDettaglio: 'Close',
  vaiAlTesto: 'Official record on senato.it',
  chiediInChat: (numero) => `Analyze bill ${numero}: what does it do and what constitutional limits does it touch?`,

  metodoH: 'Method and limits',
  metodoP: 'Bill text is collected from the Senato\'s official repository (AkomaNtosoBulkData, CC BY 4.0), not from an engine that generates opinions. Case-law citations are extracted automatically from the explicit references in the bill\'s own text, then cross-checked against the Constitutional Court and Court of Cassation corpora. Today\'s sample is small (hand-collected) — not yet full coverage of every bill under discussion.',

  relatedH: 'Related',

  disclaimer: 'Source: dati.senato.it (CC BY 3.0) · AkomaNtosoBulkData (CC BY 4.0) · Constitutional Court (CC BY-SA 3.0) · Court of Cassation (SentenzeWeb). Informational tool, not legal advice — always verify the primary source.',
}
