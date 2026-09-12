// GraphView + ReferencePopover — English editorial content.
// Imported directly by GraphView.jsx and ReferencePopover.jsx.
export default {
  // Human-readable labels for the relation types (legend for the "Norme"/"Giurisprudenza" layers).
  relLabels: {
    modifica: 'amends', abroga: 'repeals', sostituisce: 'replaces', inserisce: 'inserts',
    convertito_in: 'conversion', proroga: 'extension', dichiara_incostituzionale: 'unconstitutional',
    infondata: 'unfounded', inammissibile: 'inadmissible', giudica: 'rules on', impugnata: 'challenged (pending)',
  },

  // NodeCard (selected node panel).
  noDescription: 'No description extracted for this entity.',
  // "sentenze della Consulta" = rulings of the Italian Constitutional Court.
  sentenze: (tot) => `${tot} Constitutional Court rulings`,
  incostituzionali: (n) => `${n} unconstitutional`,
  connectedTo: 'Connected to',
  ask: 'Ask the agent ↑',
  close: 'Close',

  // Graph loading state.
  loadingRelations: 'loading relations…',
  loadingGraph: 'building the graph…',

  // Layer toggles.
  layerConcetti: 'Concepts',
  layerConcettiTitle: 'Semantic graph (concepts extracted from the statutes)',
  layerNorme: 'Statutes',
  layerNormeTitle: 'Laws and regulations: how they amend and repeal each other',
  layerGiurisprudenza: 'Case law',
  layerGiurisprudenzaTitle: 'The Constitution, Constitutional Court rulings and pending cases on statutes',

  // Graph search.
  searchRel: 'search for a statute… (e.g. Codice Penale, art. 575)',
  searchConcetti: 'search for an entity… (e.g. Articolo 575, Omicidio)',
  searchTitle: 'Find',

  // Entity-type legend.
  typesTitle: 'Entity types · click to filter',
  typesShort: 'Types',

  // Graph navigation controls (zoom + fit to view).
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  fit: 'Fit to view',
  legendToggle: 'Show/hide legend',

  // Graph stats (the numbers stay inside <b> in the component).
  statEntita: 'entities',
  statRelazioni: 'relations',
  filtersActive: 'filters active',
  expandMore: 'Show more',
  expanding: 'Loading more entities…',
  hint: 'drag · scroll to zoom · click a node',

  // Graph explainer: "What is this / how to read". Shown on first open, then a pill.
  capPill: 'What is this · how to read',
  capTitle: 'What is this graph',
  capBody: 'A map of Italian law. Each dot is an entity (an article, a principle, an offence, a body…); the lines are the links between them. The bigger a dot, the more connections it has — the more central it is to the system.',
  capConcetti: 'Concepts: concepts extracted from the statutes and how they cross-reference each other.',
  capNorme: 'Statutes: hierarchy between primary sources (laws, decrees) and secondary ones (regulations), and how they amend or repeal each other.',
  capGiurisprudenza: 'Case law: the Constitution, the Constitutional Court rulings that interpret it, and cases still pending on statutes.',
  capInteract: 'Drag to pan · scroll/pinch to zoom · tap a dot for the details.',
  capGotIt: 'Got it',

  // Relations legend.
  relTitle: 'Relations',

  // ReferencePopover.
  popClose: 'Close',
  esito: (v) => `outcome: ${v}`,
  findInGraph: '📍 Find in the graph',
  seeRelations: '🔗 See the relations',
  openSource: '📄 Open the official source ↗',
  preview: '📖 Text preview',
  loadingText: 'loading the text…',
  textUnavailable: 'Text not available for this reference.',
  previewUnavailable: 'Preview not available for this reference.',
}
