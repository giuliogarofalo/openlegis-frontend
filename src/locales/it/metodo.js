// Metodo.jsx — contenuto italiano della pagina «Come funziona» (obiettivo, grafo,
// relazioni tipizzate, flusso dell'agente e piano di sviluppo). Bilingue (/come-funziona ↔ /how-it-works).
export default {
  lang: 'it', path: '/come-funziona',
  title: 'Come funziona OpenLegis: grafo, relazioni e flusso dell’agente',
  desc: 'Come funziona OpenLegis: l’obiettivo, il knowledge graph in tre livelli, le relazioni tipizzate fra norme e il flusso con cui l’agente recupera, valuta e presenta le fonti. Più la roadmap.',
  keywords: 'come funziona open parlamento, knowledge graph giuridico, relazioni tra norme, agente AI legge, RAG legale, citazioni verbatim, ELI CELEX, roadmap, iter parlamentare',
  kicker: 'metodo · obiettivo · roadmap',
  h1: 'Come funziona OpenLegis',
  lead: 'OpenLegis non è un chatbot legale «fisso»: è un agente che risponde unendo la legge e i dati pubblici, citando sempre la fonte. Qui spiego l’obiettivo, come è costruito il grafo, come l’agente recupera e valuta le informazioni, e dove sta andando il progetto.',

  // 1. Obiettivo / visione
  goalH: 'L’obiettivo',
  goalP1: 'Rendere lo Stato interrogabile da chiunque — non solo da giuristi e addetti ai lavori — con risposte tracciabili fino alla fonte ufficiale.',
  goalP2: 'C’è un fossato che oggi nessuno colma: chi ha i dati pubblici non ha la legge (non sa dirti se una cosa è legittima o costituzionale); i bot legali hanno la legge ma non i dati, e spesso allucinano senza citazioni reali. OpenLegis unisce i due mondi — «legge ↔ dati» — in un unico grafo navigabile.',
  goalCards: [
    ['§', 'Fonti reali e citabili', 'Ogni affermazione giuridica risolve a un articolo con identificativo stabile: ELI per l’Italia, CELEX per l’UE. Mai parafrasato.'],
    ['⚖', 'Rifiuto onesto', 'Se non c’è una fonte, l’agente lo dichiara e non inventa («refuse-on-no-source»).'],
    ['↯', 'Provenienza trasparente', 'Le relazioni autoritative (da Normattiva) sono nettamente distinte da quelle inferite dall’AI, con confidenza visibile.'],
  ],

  // 2. Il grafo in tre livelli
  graphH: 'Il knowledge graph in tre livelli',
  graphP: 'Per evitare il rischio di «un’AI che riscrive la legge», la conoscenza è stratificata. Tre livelli, con ruoli netti.',
  layers: [
    ['l0', 'Layer 0', 'Fonte autorevole (immutabile)', 'Testo verbatim della norma + ID stabile (ELI / CELEX). È ciò a cui ogni citazione risolve. Mai parafrasato dall’LLM.'],
    ['l1', 'Layer 1', 'Grafo delle relazioni', 'Relazioni tipizzate a livello di articolo fra norme, con provenienza e confidenza. È «la conoscenza compilata in anticipo», non inventata al volo.'],
    ['l2', 'Layer 2', 'Wiki esplicativa', 'Pagine in parole semplici e mappe tematiche costruite sopra la norma — commento, non fonte. Ottime anche come contenuto indicizzabile.'],
  ],

  // 3. Relazioni tipizzate
  relH: 'Le relazioni tipizzate',
  relP: 'Il cuore del Layer 1 non è indovinato da un LLM: è estratto in modo deterministico da Normattiva in formato Akoma Ntoso (blocchi activeModifications / passiveModifications). Ogni arco è a livello di articolo, con il testo-prova allegato, «created_by: normattiva» e confidenza 1.0.',
  relTable: [
    ['modifica', 'Una norma modifica articoli di un’altra'],
    ['abroga', 'Abrogazione totale o parziale'],
    ['sostituisce', 'Sostituisce il testo di una disposizione'],
    ['inserisce', 'Inserisce una nuova disposizione'],
    ['proroga', 'Proroga un termine'],
    ['converte', 'Conversione di un decreto-legge in legge'],
    ['attua_delega', 'Attua una delega legislativa'],
    ['traspone', 'Trasposizione di una direttiva UE'],
  ],
  relP2: 'Sopra questa base deterministica si aggiungono archi inferiti dall’AI (impatti su diritti e settori), sempre etichettati come tali («created_by: ai», con confidenza visibile). Onestà sulla fonte prima di tutto.',
  relExample: 'Es. DL 19/2024 (PNRR) → convertito in L. 56/2024; centinaia di relazioni autoritative verso altre norme (modifica, sostituisce, inserisce, abroga…), inclusi i codici già nel grafo.',

  // 4. Il flusso dell'agente
  flowH: 'Come l’agente risponde',
  flowP: 'Al centro c’è un agente con function-calling: legge la domanda, sceglie gli strumenti giusti, li interroga, valuta i risultati e sintetizza una risposta che cita le fonti.',
  flowDiagram: ['Domanda', 'Agente', 'Scelta strumenti', 'Recupero fonti', 'Valutazione', 'Risposta citata + grafo'],
  steps: [
    ['Domanda', 'L’utente chiede in italiano o in inglese. Il sistema carica il prompt e le definizioni di tutti gli strumenti disponibili.'],
    ['Scelta degli strumenti', 'L’agente classifica l’intento e invoca uno o più tool: cerca_legge (Costituzione e codici), cosa_modifica / chi_modifica (relazioni Normattiva), cerca_ddl_senato / cerca_atti_camera (iter), cerca_legge_ue e cerca_sentenze_ue (UE), cerca_sentenze_cost / cassazione (giurisprudenza), cerca_dati e cerca_statistiche (dati pubblici), novita_normative (Gazzetta).'],
    ['Recupero', 'Ogni strumento interroga la fonte reale (SPARQL Camera/Senato, LightRAG, archi JSONL di Normattiva, EUR-Lex, Eurostat, CKAN) e restituisce risultati strutturati.'],
    ['Valutazione', 'L’agente valuta ogni risultato — presente, vuoto o in errore; quanti e quanto ricchi — e dà priorità alle fonti che rispondono davvero. Se non trova una fonte normativa, lo dichiara apertamente e non inventa.'],
    ['Presentazione', 'Sintetizza una risposta che integra norma e dati, con citazioni verbatim cliccabili che deep-linkano al nodo nel grafo. Un pannello «Processo» mostra quali strumenti e fonti hanno risposto, in trasparenza.'],
  ],

  // 5. Roadmap
  roadH: 'Il piano di sviluppo',
  roadP: 'Principio: ogni milestone produce qualcosa di funzionante e visibile. Incrementale, anti «boil-the-ocean».',
  roadmap: [
    ['M0', 'Proof of concept', 'Motore GraphRAG + primo blocco di corpus normativo (Costituzione + codici) con identificatori ELI. Chat con citazioni reali e rifiuto sulle domande senza fonte.', 'fatto'],
    ['M1', 'Il prodotto', 'Frontend con grafo navigabile e chat; citazioni cliccabili che deep-linkano al nodo.', 'fatto'],
    ['M2', 'Agente & utenti', 'Orchestratore agentico, gateway con disclaimer, refuse-on-no-source, rate-limit e cache.', 'fatto'],
    ['M3', 'Primo connettore (CKAN)', 'Un solo tool apre dati.gov.it, data.europa.eu e centinaia di portali; riuso di RepublicMCP per Camera/Senato.', 'fatto'],
    ['M4', 'Più connettori & «legge ↔ dati»', 'Giurisprudenza (Consulta, Cassazione, UE, amministrativa), statistiche Eurostat, Gazzetta Ufficiale, PNRR, accoglienza; cross-link norma ↔ dataset; layer wiki.', 'in corso'],
    ['M5', 'Lancio & sostenibilità', 'Deploy pubblico, freemium (grafo libero; chat avanzata/API a pagamento), B2B/API, candidature a grant.', 'in arrivo'],
  ],

  relatedH: 'Vedi anche',
  faq: [
    { q: 'Come fa l’agente a non inventare le risposte?', a: 'Recupera sempre la fonte prima di rispondere: testo verbatim della norma con ID stabile (ELI/CELEX) e dati dai portali ufficiali. Se non trova una fonte, lo dichiara e non risponde a vanvera (refuse-on-no-source).' },
    { q: 'Da dove vengono le relazioni fra le norme?', a: 'Le relazioni autoritative (modifica, abroga, sostituisce, converte…) sono estratte in modo deterministico da Normattiva in formato Akoma Ntoso, a livello di articolo e con confidenza 1.0. Gli archi inferiti dall’AI sono separati ed etichettati come tali.' },
    { q: 'Qual è l’obiettivo del progetto?', a: 'Rendere lo Stato interrogabile da chiunque, unendo legge e dati pubblici in un unico grafo navigabile, con risposte tracciabili fino alla fonte ufficiale.' },
    { q: 'Dove viene elaborata la mia domanda? È conforme all’AI Act?', a: 'Il modello che genera le risposte gira interamente su Eurouter, un gateway europeo che instrada solo verso fornitori con inferenza nell’EEA (Mistral AI, IONOS, OVHcloud e altri) — nessun provider extra-UE in diretta. Ogni avvio verifica dal vivo dove gira il modello configurato e rifiuta di partire se anche un solo host è fuori dall’EEA; ogni risposta viene poi riverificata contro l’host che l’ha davvero servita, per non fidarsi solo di un elenco statico.' },
  ],
  disclaimer: 'Strumento informativo — non è consulenza legale. Le fonti sono pubbliche e citabili (ELI/CELEX).',
}
