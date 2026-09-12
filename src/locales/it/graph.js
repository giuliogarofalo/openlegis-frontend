// GraphView + ReferencePopover — contenuto editoriale italiano.
// Importato direttamente da GraphView.jsx e ReferencePopover.jsx.
export default {
  // Etichette leggibili dei tipi di relazione (legenda layer "Relazioni").
  relLabels: {
    modifica: 'modifica', abroga: 'abroga', sostituisce: 'sostituisce', inserisce: 'inserisce',
    convertito_in: 'conversione', proroga: 'proroga', dichiara_incostituzionale: 'incostituzionale',
    infondata: 'infondata', inammissibile: 'inammissibile', giudica: 'giudica', impugnata: 'impugnata (pendente)',
  },

  // NodeCard (scheda del nodo selezionato).
  noDescription: 'Nessuna descrizione estratta per questa entità.',
  sentenze: (tot) => `${tot} sentenze della Consulta`,
  incostituzionali: (n) => `${n} incostituzionali`,
  connectedTo: 'Collegato a',
  ask: "Chiedi all'agente ↑",
  close: 'Chiudi',

  // Stato di caricamento del grafo.
  loadingRelations: 'carico le relazioni…',
  loadingGraph: 'costruzione del grafo…',

  // Toggle dei layer.
  layerConcetti: 'Concetti',
  layerConcettiTitle: 'Grafo semantico (concetti estratti dalle norme)',
  layerNorme: 'Norme',
  layerNormeTitle: 'Leggi e regolamenti: come si modificano e abrogano a vicenda',
  layerGiurisprudenza: 'Giurisprudenza',
  layerGiurisprudenzaTitle: 'Costituzione, sentenze della Consulta e pendenze sulle norme',

  // Ricerca nel grafo.
  searchRel: 'cerca una norma… (es. Codice Penale, art. 575)',
  searchConcetti: "cerca un'entità… (es. Articolo 575, Omicidio)",
  searchTitle: 'Trova',

  // Legenda dei tipi di entità.
  typesTitle: 'Tipi di entità · clic per filtrare',
  typesShort: 'Tipi',

  // Controlli di navigazione del grafo (zoom + adatta alla vista).
  zoomIn: 'Ingrandisci',
  zoomOut: 'Riduci',
  fit: 'Adatta alla vista',
  legendToggle: 'Mostra/nascondi legenda',

  // Statistiche del grafo (i numeri restano in <b> nel componente).
  statEntita: 'entità',
  statRelazioni: 'relazioni',
  filtersActive: 'filtri attivi',
  expandMore: 'Mostra di più',
  expanding: 'Carico altre entità…',
  hint: 'trascina · scorri per lo zoom · clicca un nodo',

  // Explainer del grafo: «Cos'è / come si legge». Visibile alla prima apertura, poi pillola.
  capPill: 'Cos’è · come si legge',
  capTitle: 'Cos’è questo grafo',
  capBody: 'Una mappa della legge italiana. Ogni punto è un’entità (un articolo, un principio, un reato, un organo…); le linee sono i collegamenti tra loro. Più un punto è grande, più è collegato — è centrale nel sistema.',
  capConcetti: 'Concetti: concetti estratti dalle norme e come si richiamano tra loro.',
  capNorme: 'Norme: gerarchia tra fonti primarie (leggi, decreti) e secondarie (regolamenti), e come si modificano o abrogano a vicenda.',
  capGiurisprudenza: 'Giurisprudenza: la Costituzione, le sentenze della Corte Costituzionale che la interpretano e i casi ancora pendenti sulle norme.',
  capInteract: 'Trascina per spostare · scorri/pizzica per lo zoom · tocca un punto per i dettagli.',
  capGotIt: 'Ho capito',

  // Legenda delle relazioni.
  relTitle: 'Relazioni',

  // ReferencePopover.
  popClose: 'Chiudi',
  esito: (v) => `esito: ${v}`,
  findInGraph: '📍 Trova nel grafo',
  seeRelations: '🔗 Vedi le relazioni',
  openSource: '📄 Apri la fonte ufficiale ↗',
  preview: '📖 Anteprima del testo',
  loadingText: 'carico il testo…',
  textUnavailable: 'Testo non disponibile per questo riferimento.',
  previewUnavailable: 'Anteprima non disponibile per questo riferimento.',
}
