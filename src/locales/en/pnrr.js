// PNRR page — companies↔contracts (Pnrr.jsx). First slice of the OSINT graph (ShopBrain
// migration plan, Fase 5a): aggregate rankings, not yet the explorable interactive graph.
export default {
  path: '/pnrr',
  inLanguage: 'en',
  title: 'Italy PNRR: who wins the public contracts',
  desc: 'Who won the public contracts tied to Italy’s PNRR recovery-fund projects, for how much, and which public bodies awarded them. Public data from OpenPNRR and the Public Contracts Service (Italian Ministry of Infrastructure).',
  keywords: 'PNRR contracts, who wins Italy recovery fund contracts, public contract companies Italy, PNRR contracting authorities, public procurement transparency Italy',
  headline: 'Italy PNRR: who wins the public contracts',

  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'PNRR',

  kicker: 'public data · OSINT',
  h1: 'Italy PNRR: who wins the contracts',
  lead: 'Follow the money: which companies won the public contracts tied to PNRR (Italy’s EU recovery-fund) projects, and which public bodies awarded them. Only the highest-value projects — not a full listing, a curated view of the data that matters most.',

  loading: 'Loading…',
  loadError: 'Could not load the data right now.',
  empty: 'No data available.',

  aziendeH: 'Companies by contract value won',
  aziendeIntro: 'Companies that won the largest combined value of PNRR contracts, among the highest-value projects tracked.',
  colAzienda: 'Company',
  colAppaltiVinti: 'Contracts won',
  colImporto: 'Total value',

  entiH: 'Contracting authorities by number of contracts',
  entiIntro: 'The public bodies that awarded the most contracts among the projects considered.',
  colEnte: 'Authority',
  colAppaltiBanditi: 'Contracts awarded',

  regioniH: 'Regions by project value',
  regioniIntro: 'The regions touched by the largest value of tracked PNRR projects, among the highest-value ones.',
  colRegione: 'Region',
  colNumeroProgetti: 'Projects',
  regioniNota: 'A multi-region project counts in full for each region it touches — the sum across regions therefore exceeds the overall total.',

  finH: 'Where the funding comes from',
  finIntro: 'For the most-funded sectors, how much comes from the PNRR itself versus other sources — regions, municipalities, provinces, private co-financing.',
  colSettore: 'Sector',
  viewChart: 'View as chart',
  viewTable: 'View as table',
  fonteLabels: {
    pnrr: 'PNRR', regione: 'Region', provincia: 'Province', comune: 'Municipality',
    privato: 'Private', altro_pubblico: 'Other public',
  },

  graphH: 'Explore the graph',
  graphIntro: 'Projects, contracts, companies and authorities: a curated slice of the graph, not the full dataset — use the threshold to narrow it further.',
  graphCta: 'Load the graph',
  graphLoading: 'Loading the graph…',
  graphLoadError: 'Could not load the graph right now.',
  graphEmpty: 'No nodes above this threshold.',
  graphSoglia: 'Minimum project value',
  graphSoglia1M: '≥ €1 million',
  graphSoglia5M: '≥ €5 million',
  graphSoglia20M: '≥ €20 million',
  graphSearchPlaceholder: 'search a company, an authority, a project…',
  graphCapBody: 'Who won what: PNRR projects, contracts, companies and contracting authorities. Each point is an entity; lines are the links between them (awards, wins, has-contract).',
  graphCapDetail: 'The bigger a point, the more it is connected to other contracts or projects.',
  askAboutNode: (node) => `Tell me about "${node.label || node.id}" in the context of PNRR public contracts.`,

  relatedH: 'Related links',

  disclaimer: 'Source: OpenPNRR (Fondazione Openpolis, ODbL 1.0) and the Public Contracts Service — Italian Ministry of Infrastructure and Transport (public data). Informational tool, always verify the primary source before attribution.',
}
