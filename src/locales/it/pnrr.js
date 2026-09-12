// Pagina PNRR — aziende↔appalti (Pnrr.jsx). Prima fetta del grafo OSINT (piano migrazione
// ShopBrain, Fase 5a): classifiche aggregate, non ancora il grafo interattivo esplorabile.
export default {
  path: '/pnrr',
  inLanguage: 'it',
  title: 'PNRR: chi vince gli appalti — aziende ed enti appaltanti',
  desc: 'Chi ha vinto gli appalti pubblici legati ai progetti del PNRR, per quale importo, e quali enti li hanno banditi. Dati pubblici da OpenPNRR e dal Servizio Contratti Pubblici (MIT).',
  keywords: 'PNRR appalti, chi vince gli appalti PNRR, aziende appalti pubblici, enti appaltanti PNRR, trasparenza appalti pubblici',
  headline: 'PNRR: chi vince gli appalti',

  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'PNRR',

  kicker: 'dati pubblici · OSINT',
  h1: 'PNRR: chi vince gli appalti',
  lead: 'Segui il denaro: quali aziende hanno vinto gli appalti pubblici legati ai progetti del PNRR, e quali enti li hanno banditi. Solo i progetti di importo più rilevante — non un elenco completo, una selezione dei dati con impatto maggiore.',

  loading: 'Caricamento…',
  loadError: 'Impossibile caricare i dati in questo momento.',
  empty: 'Nessun dato disponibile.',

  aziendeH: 'Aziende per importo di appalti vinti',
  aziendeIntro: 'Le aziende che hanno vinto il maggior valore complessivo di appalti PNRR, tra i progetti di importo più alto tracciati.',
  colAzienda: 'Azienda',
  colAppaltiVinti: 'Appalti vinti',
  colImporto: 'Importo totale',

  entiH: 'Enti appaltanti per numero di appalti',
  entiIntro: 'Gli enti pubblici che hanno bandito il maggior numero di appalti tra i progetti considerati.',
  colEnte: 'Ente',
  colAppaltiBanditi: 'Appalti banditi',

  regioniH: 'Regioni per importo di progetti',
  regioniIntro: 'Le regioni toccate dal maggior valore di progetti PNRR tracciati, tra quelli di importo più alto.',
  colRegione: 'Regione',
  colNumeroProgetti: 'Progetti',
  regioniNota: 'Un progetto multiregionale conta per intero in ciascuna regione che tocca — le somme tra regioni superano quindi il totale complessivo.',

  finH: 'Da dove arrivano i finanziamenti',
  finIntro: 'Per i settori più finanziati, quanto viene dal PNRR e quanto da altre fonti — regioni, comuni, province, privati.',
  colSettore: 'Settore',
  viewChart: 'Vedi come grafico',
  viewTable: 'Vedi come tabella',
  fonteLabels: {
    pnrr: 'PNRR', regione: 'Regione', provincia: 'Provincia', comune: 'Comune',
    privato: 'Privato', altro_pubblico: 'Altro pubblico',
  },

  graphH: 'Esplora il grafo',
  graphIntro: 'Progetti, appalti, aziende ed enti: una porzione curata del grafo, non l’intero dataset — usa la soglia per restringerla ulteriormente.',
  graphCta: 'Carica il grafo',
  graphLoading: 'Caricamento del grafo…',
  graphLoadError: 'Impossibile caricare il grafo in questo momento.',
  graphEmpty: 'Nessun nodo sopra questa soglia.',
  graphSoglia: 'Importo minimo progetto',
  graphSoglia1M: '≥ 1 milione €',
  graphSoglia5M: '≥ 5 milioni €',
  graphSoglia20M: '≥ 20 milioni €',
  graphSearchPlaceholder: "cerca un'azienda, un ente, un progetto…",
  graphCapBody: 'Chi ha vinto cosa: progetti PNRR, appalti, aziende ed enti appaltanti. Ogni punto è un\'entità; le linee sono i collegamenti (bandisce, vince, ha appalto).',
  graphCapDetail: 'Più un punto è grande, più è collegato ad altri appalti o progetti.',
  askAboutNode: (node) => `Parlami di "${node.label || node.id}" nel contesto degli appalti PNRR: cosa sappiamo?`,

  relatedH: 'Link correlati',

  disclaimer: 'Fonte: OpenPNRR (Fondazione Openpolis, ODbL 1.0) e Servizio Contratti Pubblici — Ministero delle Infrastrutture e dei Trasporti (dati pubblici). Strumento informativo, verificare sempre la fonte primaria prima di attribuire responsabilità.',
}
