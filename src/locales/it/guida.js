// Guide informazionali (long-tail) — contenuto editoriale italiano. Importato da pages/Guida.jsx.
// /docs/guida/<slug>. Vedi SEO.md (F1.4). Ogni guida: contenuto + schema Article/HowTo + FAQ + breadcrumb.
//
// `after` è modellato come array di segmenti per restare data (no JSX): ogni segmento è
//   - una stringa (resa da <Rich>, con token <0>grassetto</0> <1>corsivo</1> <2>mono</2>), oppure
//   - un link { text, href } (URL interno, mappato in EN via enPathOf), oppure
//   - un link { text, ask } (apre l'app con la query) oppure { text, raw } (URL già pronto).
// La concatenazione dei segmenti riproduce esattamente il testo originale.
export default {
  altreGuide: 'Altre guide',
  faqTitle: 'Domande frequenti',
  glossarioLabel: 'Glossario',
  glossarioDesc: ' — ELI, CELEX, MCP server, OSINT legislativo',
  disclaimer: 'Strumento informativo — non è consulenza legale.',
  crumbHome: 'Open·Parlamento',
  crumbDocs: 'Documentazione',
  crumbGuide: 'Guide',
  crumbGuidaLabel: 'Guida',

  guides: {
    'iter-di-una-legge': {
      title: 'Com’è fatto l’iter di una legge in Italia',
      kicker: 'guida · parlamento',
      desc: 'L’iter legislativo italiano spiegato passo per passo: iniziativa, esame in commissione, approvazione di Camera e Senato, promulgazione e pubblicazione in Gazzetta Ufficiale.',
      keywords: 'iter di una legge, come si approva una legge, iter legislativo, commissione parlamentare, navette, promulgazione, gazzetta ufficiale',
      lead: 'Come nasce una legge: dall’iniziativa alla pubblicazione in Gazzetta Ufficiale. Un percorso in cui Camera e Senato hanno pari poteri (bicameralismo paritario).',
      steps: [
        { name: 'Iniziativa', text: 'Un disegno o proposta di legge può essere presentato dal Governo, da ciascun parlamentare, dal popolo (50.000 firme), dai Consigli regionali o dal CNEL (art. 71 Cost.).' },
        { name: 'Esame in commissione', text: 'La commissione competente per materia esamina il testo (sede referente), può modificarlo e nomina un relatore per l’Aula.' },
        { name: 'Approvazione del primo ramo', text: 'L’Aula discute, vota gli emendamenti e approva articolo per articolo, poi il testo finale.' },
        { name: 'Trasmissione all’altro ramo (navette)', text: 'Il testo passa all’altra Camera. Se viene modificato, torna indietro: le “navette” proseguono finché entrambi i rami approvano un testo identico.' },
        { name: 'Promulgazione', text: 'Il Presidente della Repubblica promulga la legge entro un mese (può rinviarla una volta alle Camere, art. 74 Cost.).' },
        { name: 'Pubblicazione ed entrata in vigore', text: 'La legge è pubblicata in Gazzetta Ufficiale ed entra in vigore di norma dopo 15 giorni (vacatio legis).' },
      ],
      after: [
        [
          'Casi particolari: il ',
          { text: 'decreto-legge e il decreto legislativo', href: '/docs/guida/decreto-legge-vs-decreto-legislativo' },
          ' seguono percorsi diversi (urgenza e delega). Puoi seguire lo stato reale di un disegno di legge sull’',
          { text: 'app', ask: 'A che punto è il disegno di legge sul nucleare? Cita numero atto e stato.' },
          '.',
        ],
      ],
      faq: [
        { q: 'Quanto dura l’iter di una legge?', a: 'Non c’è un termine fisso: dipende dal numero di letture (navette) e dalla complessità. Un decreto-legge va invece convertito entro 60 giorni.' },
        { q: 'Cos’è il bicameralismo paritario?', a: 'In Italia Camera e Senato hanno gli stessi poteri legislativi: una legge deve essere approvata nello stesso testo da entrambi.' },
      ],
    },
    'decreto-legge-vs-decreto-legislativo': {
      title: 'Decreto-legge e decreto legislativo: le differenze',
      kicker: 'guida · fonti del diritto',
      desc: 'Differenza tra decreto-legge e decreto legislativo: chi li adotta, su quale base (urgenza vs delega), i termini e cosa succede se non vengono convertiti o emanati nei tempi.',
      keywords: 'decreto-legge, decreto legislativo, differenza decreto legge decreto legislativo, legge delega, conversione decreto, art 76 77 costituzione',
      lead: 'Due atti con forza di legge del Governo, spesso confusi. La differenza è nella fonte del potere: l’urgenza per il decreto-legge, la delega del Parlamento per il decreto legislativo.',
      steps: [
        { name: 'Decreto-legge (art. 77 Cost.)', text: 'Adottato dal Governo in casi straordinari di necessità e urgenza. Ha effetto immediato ma decade (ex tunc) se le Camere non lo convertono in legge entro 60 giorni.' },
        { name: 'Decreto legislativo (art. 76 Cost.)', text: 'Emanato dal Governo su delega del Parlamento (legge delega), che fissa oggetto, principi e termini. Non ha il requisito dell’urgenza.' },
        { name: 'In sintesi', text: 'Decreto-legge = urgenza + conversione successiva del Parlamento. Decreto legislativo = delega preventiva del Parlamento + attuazione del Governo.' },
      ],
      after: [
        [
          'Su Open·Parlamento puoi vedere cosa un decreto ',
          { text: 'modifica o abroga', ask: 'Cosa modifica il decreto-legge 19 del 2024?' },
          ' (relazioni autoritative da Normattiva) e seguirne lo stato di conversione. Vedi il ',
          { text: 'glossario', href: '/docs/glossario#decreto-legge' },
          '.',
        ],
      ],
      faq: [
        { q: 'Cosa succede se un decreto-legge non viene convertito?', a: 'Decade retroattivamente (ex tunc) dall’inizio: è come se non fosse mai esistito, salvo che il Parlamento regoli i rapporti sorti nel frattempo.' },
        { q: 'Il decreto legislativo ha bisogno di conversione?', a: 'No. Si fonda su una legge delega preventiva; non richiede conversione, ma deve rispettare principi e termini della delega.' },
      ],
    },
    'citare-una-norma-con-eli': {
      title: 'Come citare una norma con l’ELI',
      kicker: 'guida · fonti citabili',
      desc: 'Cos’è l’ELI (European Legislation Identifier) e come usarlo per citare in modo stabile e verificabile una legge o un singolo articolo, con esempi.',
      keywords: 'ELI, European Legislation Identifier, come citare una legge, identificativo norma, Normattiva ELI, citazione articolo di legge',
      lead: 'L’ELI è l’identificatore stabile di una norma: un “indirizzo” permanente che punta a una legge o a un suo articolo, così la citazione resta verificabile nel tempo.',
      steps: [
        { name: 'Struttura dell’ELI', text: 'In Italia un ELI ha la forma eli:/it/<tipo>/<anno>/<mese>/<giorno>/<numero> — es. eli:/it/legge/2024/03/02/19. Aggiungendo /art/<n> si punta al singolo articolo.' },
        { name: 'Perché usarlo', text: 'A differenza di un link a una pagina, l’ELI è persistente e univoco: non si rompe e identifica esattamente la norma citata.' },
        { name: 'Come citarlo', text: 'Indica il riferimento leggibile (es. “art. 575 c.p.”) e affianca l’ELI/URN come fonte stabile; per l’UE si usa l’analogo identificatore CELEX.' },
      ],
      after: [
        [
          'Open·Parlamento usa l’ELL/ELI come ancora di ogni risposta e nelle ',
          { text: 'pagine del corpus', href: '/norme' },
          '. Vedi anche ',
          { text: 'CELEX', href: '/docs/glossario#celex' },
          ' per gli atti dell’Unione Europea.',
        ],
      ],
      faq: [
        { q: 'Qual è la differenza tra ELI e CELEX?', a: 'ELI identifica le norme nazionali ed europee in modo armonizzato; CELEX è l’identificatore specifico degli atti e delle sentenze dell’Unione Europea su EUR-Lex.' },
      ],
    },
    'cos-e-un-mcp-server': {
      title: 'Cos’è un MCP server (e come usarlo per la legge)',
      kicker: 'guida · developer',
      desc: 'Cos’è un MCP server (Model Context Protocol), a cosa serve e come collegare gli MCP server open source di Open·Parlamento a Claude Desktop o Cursor per interrogare legge e Parlamento.',
      keywords: 'cos\'è un MCP server, Model Context Protocol, MCP server tutorial, open source MCP, republic-mcp, open-parlamento-mcp, Claude Desktop MCP',
      lead: 'Un MCP server espone strumenti (funzioni) che un assistente AI può chiamare per leggere fonti reali invece di inventarle. È il modo standard per dare a un modello accesso a dati e azioni.',
      steps: [
        { name: 'Il Model Context Protocol', text: 'MCP è lo standard aperto che collega un client AI (Claude Desktop, Cursor…) a “server” che offrono tool, risorse e prompt.' },
        { name: 'Cosa fa un MCP server', text: 'Dichiara una lista di funzioni con i loro parametri; quando l’AI le invoca, il server esegue (es. cerca una norma) e restituisce dati strutturati e citabili.' },
        { name: 'Gli MCP server di Open·Parlamento', text: 'republic-mcp (npm) per Camera, Senato e OpenPolis; open-parlamento-mcp (PyPI) per legge, diritto UE, giurisprudenza, statistiche e open data. Entrambi open source (MIT).' },
        { name: 'Collegarli', text: 'Aggiungi i server alla configurazione del client (mcpServers): npx -y republic-mcp; pip install open-parlamento-mcp e comando open-parlamento-mcp.' },
      ],
      after: [
        [
          'Dettagli, snippet e tabella dei tool nella pagina ',
          { text: 'MCP server', href: '/docs/mcp-server' },
          ' (',
          { text: 'English', raw: '/en/mcp-server' },
          ').',
        ],
      ],
      faq: [
        { q: 'Gli MCP server di Open·Parlamento sono gratuiti e open source?', a: 'Sì: codice MIT su GitHub, pacchetti su npm e PyPI, dati da fonti pubbliche e aperte.' },
        { q: 'Con quali client funzionano?', a: 'Con qualsiasi client compatibile con il Model Context Protocol, come Claude Desktop e Cursor.' },
      ],
    },
    'gerarchia-delle-fonti-del-diritto': {
      title: 'La gerarchia delle fonti del diritto italiano',
      kicker: 'guida · fonti del diritto',
      desc: 'La gerarchia delle fonti del diritto in Italia: Costituzione, leggi costituzionali, fonti dell’Unione Europea, leggi e atti con forza di legge, regolamenti, usi.',
      keywords: 'gerarchia delle fonti, fonti del diritto, costituzione, fonti primarie, fonti secondarie, regolamenti, diritto UE primato',
      lead: 'Le norme non hanno tutte lo stesso “peso”: si dispongono in una gerarchia. Una fonte di grado inferiore non può contraddire una superiore. Ecco l’ordine, dall’alto.',
      steps: [
        { name: 'Costituzione e leggi costituzionali', text: 'Al vertice: la Costituzione e le leggi costituzionali/di revisione (procedura aggravata, art. 138). Tutto il resto deve esserle conforme.' },
        { name: 'Fonti dell’Unione Europea', text: 'Regolamenti e direttive UE: per il principio del primato, prevalgono sulle norme interne incompatibili nelle materie di competenza dell’Unione.' },
        { name: 'Fonti primarie', text: 'Leggi ordinarie dello Stato e atti con forza di legge del Governo: decreto-legge e decreto legislativo. A livello territoriale, le leggi regionali nelle loro materie.' },
        { name: 'Fonti secondarie', text: 'I regolamenti (governativi, ministeriali): attuano le leggi e non possono derogarvi.' },
        { name: 'Usi e consuetudini', text: 'In coda, gli usi: rilevano solo nei limiti in cui legge e regolamenti vi rinviano.' },
      ],
      after: [
        [
          'Su Open·Parlamento ogni norma riporta tipo e identificativo (ELI), e le relazioni di modifica mostrano come le fonti si intrecciano. Vedi ',
          { text: 'la Costituzione', href: '/costituzione' },
          ' e i ',
          { text: 'codici', href: '/codici' },
          '.',
        ],
      ],
      faq: [
        { q: 'Cosa succede se una legge contrasta con la Costituzione?', a: 'Può essere dichiarata illegittima dalla Corte Costituzionale (giudizio di legittimità) e perde efficacia.' },
        { q: 'Le norme UE prevalgono su quelle italiane?', a: 'Nelle materie di competenza dell’Unione sì: per il principio del primato il giudice disapplica la norma interna incompatibile.' },
      ],
    },
    'cos-e-normattiva': {
      title: 'Cos’è Normattiva',
      kicker: 'guida · fonti',
      desc: 'Cos’è Normattiva: la banca dati ufficiale della legislazione italiana consolidata, in formato Akoma Ntoso con identificatori ELI e licenza CC BY 4.0.',
      keywords: 'Normattiva, cos\'è Normattiva, legislazione consolidata, Akoma Ntoso, ELI, testo consolidato legge, banca dati leggi',
      lead: 'Normattiva è la banca dati ufficiale della legislazione italiana: i testi delle norme aggiornati con tutte le modifiche (testo consolidato), in formato aperto e citabile.',
      steps: [
        { name: 'Testo consolidato', text: 'Per ogni norma trovi il testo vigente, già aggiornato con le modifiche successive — non la sola versione originale.' },
        { name: 'Formati aperti', text: 'Le norme sono pubblicate in Akoma Ntoso (XML giuridico) con identificatori ELI, in licenza CC BY 4.0.' },
        { name: 'Relazioni di modifica', text: 'Normattiva descrive anche cosa una norma modifica/abroga/sostituisce: relazioni autoritative tra atti.' },
      ],
      after: [
        [
          'Open·Parlamento riusa Normattiva per il ',
          { text: 'corpus delle norme', href: '/norme' },
          ' e per le relazioni di modifica (cosa modifica / chi ha modificato). Vedi anche ',
          { text: 'come citare con l’ELI', href: '/docs/guida/citare-una-norma-con-eli' },
          '.',
        ],
      ],
      faq: [
        { q: 'Normattiva è gratuita?', a: 'Sì, è il servizio pubblico ufficiale di consultazione della legislazione italiana, con dati aperti in licenza CC BY 4.0.' },
        { q: 'Cos’è il testo consolidato?', a: 'È il testo di una norma aggiornato con tutte le modifiche intervenute nel tempo, così come è in vigore oggi.' },
      ],
    },
    'cos-e-la-gazzetta-ufficiale': {
      title: 'Cos’è la Gazzetta Ufficiale',
      kicker: 'guida · pubblicazione',
      desc: 'Cos’è la Gazzetta Ufficiale della Repubblica Italiana: dove si pubblicano le norme, le serie, quando una legge entra in vigore (vacatio legis).',
      keywords: 'gazzetta ufficiale, GU, serie generale, pubblicazione leggi, vacatio legis, entrata in vigore, novità normative',
      lead: 'La Gazzetta Ufficiale è il bollettino dove lo Stato pubblica le norme: una legge esiste per i cittadini quando è pubblicata in Gazzetta.',
      steps: [
        { name: 'Le serie', text: 'La Serie Generale contiene leggi, decreti-legge, decreti legislativi, DPR e altri atti; esistono poi serie speciali (Corte Costituzionale, UE, Regioni, Concorsi, Contratti).' },
        { name: 'Pubblicazione ed entrata in vigore', text: 'Dopo la pubblicazione, una norma entra in vigore di norma dopo 15 giorni (vacatio legis), salvo diversa indicazione.' },
        { name: 'Aggiornamenti', text: 'La Serie Generale è aggiornata nei giorni feriali; Open·Parlamento ne segue le novità (feed RSS) per tenere il corpus aggiornato.' },
      ],
      after: [
        [
          'Chiedi all’',
          { text: 'app', raw: '/app?q=Cosa%20%C3%A8%20stato%20pubblicato%20in%20Gazzetta%20Ufficiale%20di%20recente%3F' },
          ' cosa è uscito di recente in Gazzetta. Vedi anche ',
          { text: 'l’iter di una legge', href: '/docs/guida/iter-di-una-legge' },
          '.',
        ],
      ],
      faq: [
        { q: 'Cos’è la vacatio legis?', a: 'È il periodo (di norma 15 giorni) tra la pubblicazione di una norma in Gazzetta Ufficiale e la sua entrata in vigore.' },
        { q: 'Dove si pubblicano le leggi italiane?', a: 'Nella Gazzetta Ufficiale della Repubblica Italiana, Serie Generale, dopo la promulgazione.' },
      ],
    },
    'come-funziona-la-corte-costituzionale': {
      title: 'Come funziona la Corte Costituzionale',
      kicker: 'guida · giustizia costituzionale',
      desc: 'Come funziona la Corte Costituzionale: composizione, il giudizio di legittimità delle leggi e i tipi di decisione (incostituzionale, infondata, inammissibile).',
      keywords: 'corte costituzionale, consulta, giudizio di legittimità, sentenza incostituzionale, norme impugnate, questione di legittimità costituzionale',
      lead: 'La Corte Costituzionale (la Consulta) verifica che le leggi rispettino la Costituzione. È il custode della carta fondamentale.',
      steps: [
        { name: 'Composizione', text: '15 giudici: 5 nominati dal Presidente della Repubblica, 5 dal Parlamento in seduta comune, 5 dalle supreme magistrature. Durano in carica 9 anni.' },
        { name: 'Giudizio di legittimità', text: 'Esamina se una legge è conforme alla Costituzione, in via incidentale (sollevata da un giudice) o principale (Stato/Regioni).' },
        { name: 'I tipi di decisione', text: 'Può dichiarare la norma incostituzionale (che perde efficacia), oppure la questione infondata o inammissibile.' },
      ],
      after: [
        [
          'Su Open·Parlamento puoi vedere se una norma è stata dichiarata incostituzionale o se è ',
          { text: 'attualmente impugnata', raw: '/app?q=L%27art.%204-bis%20ord.%20penit.%20%C3%A8%20attualmente%20impugnato%20davanti%20alla%20Consulta%3F' },
          ' (casi pendenti). Vedi la ',
          { text: 'Costituzione', href: '/costituzione' },
          ' (artt. 134–137).',
        ],
      ],
      faq: [
        { q: 'Cosa succede quando una legge è dichiarata incostituzionale?', a: 'Perde efficacia dal giorno successivo alla pubblicazione della sentenza: non può più essere applicata.' },
        { q: 'Chi può sollevare una questione di legittimità costituzionale?', a: 'In via incidentale un giudice durante un processo; in via principale lo Stato o le Regioni per i rispettivi atti.' },
      ],
    },
  },
}
