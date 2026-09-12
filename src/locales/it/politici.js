// Pagina Politici — parlamentari↔atti (Politici.jsx). Fase 5b (piano migrazione ShopBrain):
// classifiche aggregate + grafo esplorabile, stesso pattern di pnrr.js.
export default {
  path: '/politici',
  inLanguage: 'it',
  title: 'Parlamentari: chi firma più atti alla Camera e al Senato',
  desc: 'Quali parlamentari e quali gruppi hanno firmato o relazionato più atti nella XIX legislatura. Dati pubblici Openpolis.',
  keywords: 'parlamentari attivi, chi firma più leggi, gruppi parlamentari XIX legislatura, primi firmatari camera senato, attività legislativa',
  headline: 'Parlamentari: chi firma più atti',

  breadcrumbHome: 'Open·Parlamento',
  breadcrumbSelf: 'Parlamentari',

  kicker: 'dati pubblici · OSINT',
  h1: 'Chi firma più atti alla Camera e al Senato',
  lead: 'Quali parlamentari e quali gruppi hanno firmato (come primo firmatario) o relazionato più atti nella XIX legislatura. Include anche le leggi di conversione dei decreti, dove figura spesso il Governo — non solo iniziativa parlamentare individuale.',

  loading: 'Caricamento…',
  loadError: 'Impossibile caricare i dati in questo momento.',
  empty: 'Nessun dato disponibile.',

  parlamentariH: 'Parlamentari per numero di atti firmati',
  parlamentariIntro: 'I parlamentari che compaiono più spesso come primo firmatario di un atto (Camera o Senato).',
  colParlamentare: 'Parlamentare',
  colGruppo: 'Gruppo',
  colNumeroAtti: 'Atti firmati',

  gruppiH: 'Gruppi parlamentari per numero di atti firmati',
  gruppiIntro: 'I gruppi i cui membri hanno firmato più atti in totale.',
  colGruppoNome: 'Gruppo',

  graphH: 'Esplora il grafo',
  graphIntro: 'Parlamentari e atti: una porzione curata del grafo, non l’intero dataset — filtra per gruppo o ramo per restringerla.',
  graphCta: 'Carica il grafo',
  graphLoading: 'Caricamento del grafo…',
  graphLoadError: 'Impossibile caricare il grafo in questo momento.',
  graphEmpty: 'Nessun nodo con questi filtri.',
  graphGruppoLabel: 'Gruppo',
  graphGruppoTutti: 'Tutti i gruppi',
  graphRamoLabel: 'Ramo',
  graphRamoTutti: 'Camera e Senato',
  graphRamoCamera: 'Camera',
  graphRamoSenato: 'Senato',
  graphSearchPlaceholder: 'cerca un parlamentare o un atto…',
  graphCapBody: 'Chi ha firmato cosa: parlamentari e atti (proposte di legge, decreti) della XIX legislatura. Ogni punto è un\'entità; le linee sono le firme e le relazioni sugli atti.',
  graphCapDetail: 'Più un punto-parlamentare è grande, più atti ha firmato o relazionato in questa selezione.',
  askAboutNode: (node) => `Parlami di "${node.label || node.id}" nel contesto dell'attività legislativa: cosa sappiamo?`,

  relatedH: 'Link correlati',

  disclaimer: 'Fonte: Openpolis (CC BY-NC 4.0, uso non commerciale). Dati camera.it/senato.it, XIX legislatura. Strumento informativo, verificare sempre la fonte primaria prima di attribuire responsabilità.',
}
