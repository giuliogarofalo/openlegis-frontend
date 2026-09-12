// Politici page — MPs↔bills (Politici.jsx). Fase 5b (ShopBrain migration plan): aggregate
// rankings + explorable graph, same pattern as pnrr.js.
export default {
  path: '/politici',
  inLanguage: 'en',
  title: 'Italian MPs: who signs the most bills',
  desc: 'Which MPs and parliamentary groups signed or acted as rapporteur on the most bills in the 19th legislature. Public data from Openpolis.',
  keywords: 'most active MPs Italy, who signs the most laws, parliamentary groups 19th legislature, first signers chamber senate, legislative activity Italy',
  headline: 'Italian MPs: who signs the most bills',

  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'MPs',

  kicker: 'public data · OSINT',
  h1: 'Who signs the most bills in the Chamber and Senate',
  lead: 'Which MPs and parliamentary groups signed (as first signer) or acted as rapporteur on the most bills in the 19th legislature. Includes decree-conversion laws, where the Government is often listed — not only individual parliamentary initiative.',

  loading: 'Loading…',
  loadError: 'Could not load the data right now.',
  empty: 'No data available.',

  parlamentariH: 'MPs by number of bills signed',
  parlamentariIntro: 'The MPs who appear most often as first signer of a bill (Chamber or Senate).',
  colParlamentare: 'MP',
  colGruppo: 'Group',
  colNumeroAtti: 'Bills signed',

  gruppiH: 'Parliamentary groups by number of bills signed',
  gruppiIntro: 'The groups whose members signed the most bills overall.',
  colGruppoNome: 'Group',

  graphH: 'Explore the graph',
  graphIntro: 'MPs and bills: a curated slice of the graph, not the full dataset — filter by group or chamber to narrow it.',
  graphCta: 'Load the graph',
  graphLoading: 'Loading the graph…',
  graphLoadError: 'Could not load the graph right now.',
  graphEmpty: 'No nodes match these filters.',
  graphGruppoLabel: 'Group',
  graphGruppoTutti: 'All groups',
  graphRamoLabel: 'Chamber',
  graphRamoTutti: 'Chamber & Senate',
  graphRamoCamera: 'Chamber of Deputies',
  graphRamoSenato: 'Senate',
  graphSearchPlaceholder: 'search an MP or a bill…',
  graphCapBody: 'Who signed what: MPs and bills (proposed laws, decrees) of the 19th legislature. Each point is an entity; lines are signatures and rapporteur relations on bills.',
  graphCapDetail: 'The bigger an MP\'s point, the more bills they signed or reported on in this selection.',
  askAboutNode: (node) => `Tell me about "${node.label || node.id}" in the context of legislative activity.`,

  relatedH: 'Related links',

  disclaimer: 'Source: Openpolis (CC BY-NC 4.0, non-commercial use). Data from camera.it/senato.it, 19th legislature. Informational tool, always verify the primary source before attribution.',
}
