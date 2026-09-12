// Pagina DDL — esplorazione + conformità (Ddl.jsx). docs/strategy/DDL_ESPLORA_CONFORMITA.md.
// Tabella comparativa (M2) + dossier di conformità per citazione esplicita (M3), stesso pattern di politici.js.
export default {
  path: '/ddl',
  inLanguage: 'it',
  title: 'DDL: tabella comparativa e conformità a citazione',
  desc: 'Disegni di legge raccolti, con stato, giorni fermi, e un dossier di conformità basato solo su citazioni esplicite nel testo — mai un\'opinione senza fonte.',
  keywords: 'ddl senato, disegno di legge, iter parlamentare, conformità costituzionale, giurisprudenza corte costituzionale',
  headline: 'DDL: tabella comparativa e conformità',

  breadcrumbHome: 'Open·Parlamento',
  breadcrumbSelf: 'DDL',

  kicker: 'dati pubblici · citazione per citazione',
  h1: 'Disegni di legge: stato, tempi, conformità',
  lead: 'Un elenco curato di disegni di legge (per ora un piccolo campione raccolto a mano, vedi il metodo) con lo stato dell\'iter, da quanto tempo sono fermi, e — dove disponibile — un dossier di conformità: SOLO citazioni esplicite trovate nel testo del DDL stesso, mai un giudizio senza una fonte a fianco.',

  loading: 'Caricamento…',
  loadError: 'Impossibile caricare i dati in questo momento.',
  empty: 'Nessun DDL raccolto ancora.',

  tabellaH: 'Tabella comparativa',
  tabellaIntro: 'Ordinati per giorni fermi (crescente). Clicca un DDL per il dossier di conformità.',
  colNumero: 'Atto',
  colTitolo: 'Titolo',
  colStato: 'Stato',
  colGiorniFermo: 'Giorni fermo',
  colProponente: 'Proponente',
  colArticoli: 'Articoli',

  timelineH: 'Storico assegnazioni',
  timelineIntro: 'Le commissioni a cui questo DDL è stato assegnato nel tempo (commissione di riferimento in grassetto, le altre solo consultive).',
  timelineVuoto: 'Nessuno storico di assegnazione disponibile.',
  timelineSede: (s) => ({ redigente: 'sede redigente', referente: 'sede referente', deliberante: 'sede deliberante' })[s] || s,
  timelineConsultive: 'Consultive',

  dettaglioH: 'Dossier di conformità',
  dettaglioIntro: 'Ogni riferimento qui sotto è una citazione ESPLICITA presente nel testo del DDL — non un\'inferenza. Se per un riferimento non risulta giurisprudenza, è dichiarato come lacuna del corpus, mai colmato con un\'opinione.',
  dettaglioVuoto: 'Nessuna citazione esplicita a Costituzione o codici trovata nel testo di questo DDL (o il testo non è ancora stato raccolto).',
  articoloLabel: (n) => `Articolo ${n}`,
  citazioneLabel: 'Citazione nel testo del DDL',
  giurisprudenzaLabel: (n) => `${n} pronuncia/e della Corte Costituzionale`,
  giurisprudenzaVuota: 'Nessuna pronuncia della Corte Costituzionale trovata su questo riferimento nel corpus locale.',
  casiPendentiLabel: 'Attualmente impugnata/o davanti alla Corte Costituzionale',
  modificatoDaLabel: 'Già modificata/o da',
  chiudiDettaglio: 'Chiudi',
  vaiAlTesto: 'Scheda ufficiale su senato.it',
  chiediInChat: (numero) => `Analizza il DDL ${numero}: cosa prevede e con quali limiti costituzionali si confronta?`,

  metodoH: 'Metodo e limiti',
  metodoP: 'Il testo dei DDL viene raccolto dal repository ufficiale del Senato (AkomaNtosoBulkData, CC BY 4.0), non tramite un motore che genera opinioni. Le citazioni di giurisprudenza sono estratte automaticamente dai riferimenti espliciti nel testo del DDL, poi incrociate con il corpus della Corte Costituzionale e della Cassazione. Il campione oggi è piccolo (raccolto a mano) — non è ancora una copertura completa di tutti i DDL in discussione.',

  relatedH: 'Link correlati',

  disclaimer: 'Fonte: dati.senato.it (CC BY 3.0) · AkomaNtosoBulkData (CC BY 4.0) · Corte Costituzionale (CC BY-SA 3.0) · Cassazione (SentenzeWeb). Strumento informativo, non consulenza legale — verificare sempre la fonte primaria.',
}
