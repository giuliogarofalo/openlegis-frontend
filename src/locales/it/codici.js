// Hub dei codici (Codici.jsx) — contenuto editoriale italiano. Importato da Codici.jsx.
// I frammenti con enfasi inline usano i token <0>grassetto</0> <1>corsivo</1> <2>mono</2> resi da <Rich>.
// Gli slug e gli ID (sigle, anni, numeri d'articolo) restano canonici e non si traducono.
export default {
  // Etichette UI condivise (indice + pagine per-codice)
  breadcrumbHome: 'OpenLegis',
  breadcrumbCodici: 'Codici',
  inLanguage: 'it',

  // Indice /codici
  index: {
    collectionName: 'I codici italiani — OpenLegis',
    collectionDesc: 'I principali codici dell’ordinamento italiano: penale, civile, procedura, strada, consumo, assicurazioni.',
    seoTitle: 'I codici italiani — penale, civile, strada e altri',
    seoDesc: 'I principali codici dell’ordinamento italiano (penale, civile, procedura penale e civile, strada, consumo, assicurazioni): struttura, articoli chiave e fonti reali.',
    seoKeywords: 'codici italiani, codice penale, codice civile, codice della strada, codice del consumo, codice di procedura penale, codice di procedura civile',
    kicker: 'ordinamento italiano',
    h1: 'I codici italiani',
    lead: 'I grandi codici che organizzano il diritto italiano: struttura, articoli chiave e la possibilità di interrogarli con fonti reali.',
    seeAlsoPre: 'Vedi anche la ',
    seeAlsoCost: 'Costituzione',
    seeAlsoMid: ' e il ',
    seeAlsoNorme: 'corpus delle norme indicizzate',
  },

  // Pagine per-codice /codici/<slug>
  page: {
    kickerPre: 'codice · ',
    strutturaH: 'Struttura',
    artH: 'Articoli chiave',
    faqH: 'Domande frequenti',
    // Domanda inviata all'app per un articolo: askQ(numero, nomeCodice)
    askQ: (n, nome) => `Cosa prevede l'articolo ${n} del ${nome}? Cita il testo e la pena.`,
    artLabel: 'art. ',
    interrogaPre: 'Interroga il ',
    interrogaApp: 'app',
    interrogaMid: ' con fonti reali sull’',
    interrogaTuttiPre: '. Vedi anche',
    interrogaTutti: 'tutti i codici',
    interrogaCost: 'Costituzione',
    interrogaGlossario: 'glossario',
    disclaimer: 'Strumento informativo — non è consulenza legale. Testo ufficiale: Normattiva.',
    seoTitleSuffix: ' — struttura e articoli',
  },

  // Dati per-codice
  codici: {
    'codice-penale': {
      nome: 'Codice Penale', sigla: 'c.p.', anno: '1930',
      desc: 'Il Codice Penale italiano: struttura, principi (legalità, colpevolezza) e gli articoli chiave su reati e pene, da esplorare con fonti reali e giurisprudenza collegata.',
      kw: 'codice penale, c.p., reati, pene, omicidio art 575, furto art 624, articolo codice penale',
      lead: 'Il Codice Penale (R.D. 1398/1930) definisce reati e pene nell’ordinamento italiano. Si divide in tre libri: principi e pene, i delitti, le contravvenzioni.',
      struttura: [
        ['Libro I — Dei reati in generale', 'Principio di legalità, elemento soggettivo, pena, circostanze, tentativo, concorso di persone.'],
        ['Libro II — Dei delitti in particolare', 'Delitti contro la persona, il patrimonio, la pubblica amministrazione, la fede pubblica, ecc.'],
        ['Libro III — Delle contravvenzioni', 'Le contravvenzioni e le relative sanzioni.'],
      ],
      art: [['575', 'omicidio'], ['624', 'furto'], ['416-bis', 'associazione di tipo mafioso'], ['595', 'diffamazione']],
      faq: [
        { q: 'Cosa prevede l’art. 575 del Codice Penale?', a: 'Punisce l’omicidio: chiunque cagiona la morte di un uomo è punito con la reclusione non inferiore a ventun anni.' },
        { q: 'Quanti libri ha il Codice Penale?', a: 'Tre: dei reati in generale, dei delitti in particolare, delle contravvenzioni.' },
      ],
    },
    'codice-civile': {
      nome: 'Codice Civile', sigla: 'c.c.', anno: '1942',
      desc: 'Il Codice Civile italiano: i sei libri (persone e famiglia, successioni, proprietà, obbligazioni, lavoro, tutela dei diritti) e gli articoli chiave.',
      kw: 'codice civile, c.c., obbligazioni, proprietà, successioni, famiglia, contratti, articolo codice civile',
      lead: 'Il Codice Civile (R.D. 262/1942) regola i rapporti tra privati. È organizzato in sei libri.',
      struttura: [
        ['Libro I — Delle persone e della famiglia', 'Capacità, matrimonio, filiazione, potestà.'],
        ['Libro II — Delle successioni', 'Eredità, testamento, donazioni.'],
        ['Libro III — Della proprietà', 'Beni, proprietà, diritti reali, possesso.'],
        ['Libro IV — Delle obbligazioni', 'Contratti, responsabilità, singoli contratti.'],
        ['Libro V — Del lavoro', 'Impresa, lavoro, società.'],
        ['Libro VI — Della tutela dei diritti', 'Prove, prescrizione, trascrizione.'],
      ],
      art: [['2043', 'risarcimento per fatto illecito'], ['1321', 'nozione di contratto'], ['832', 'contenuto del diritto di proprietà']],
      faq: [
        { q: 'Quanti libri ha il Codice Civile?', a: 'Sei: persone e famiglia, successioni, proprietà, obbligazioni, lavoro, tutela dei diritti.' },
        { q: 'Cosa dice l’art. 2043 del Codice Civile?', a: 'Stabilisce la responsabilità per fatto illecito: chi cagiona ad altri un danno ingiusto è obbligato a risarcirlo.' },
      ],
    },
    'codice-procedura-penale': {
      nome: 'Codice di Procedura Penale', sigla: 'c.p.p.', anno: '1988',
      desc: 'Il Codice di Procedura Penale: come si svolge il processo penale, dalle indagini al giudizio, con le garanzie del giusto processo.',
      kw: 'codice procedura penale, c.p.p., processo penale, indagini preliminari, giudizio, garanzie',
      lead: 'Il Codice di Procedura Penale (D.P.R. 447/1988) disciplina lo svolgimento del processo penale, dalle indagini al giudizio e alle impugnazioni.',
      struttura: [
        ['Soggetti e atti', 'Giudice, pubblico ministero, parti, difensore; atti e prove.'],
        ['Indagini e udienza preliminare', 'Indagini del PM, misure cautelari, rinvio a giudizio.'],
        ['Giudizio e impugnazioni', 'Dibattimento, riti alternativi, appello, cassazione.'],
      ],
      art: [],
      faq: [{ q: 'Cosa regola il codice di procedura penale?', a: 'Il modo in cui si accerta un reato e si celebra il processo, garantendo il giusto processo e il diritto di difesa.' }],
    },
    'codice-procedura-civile': {
      nome: 'Codice di Procedura Civile', sigla: 'c.p.c.', anno: '1940',
      desc: 'Il Codice di Procedura Civile: come si svolge il processo civile, dalla domanda alla sentenza e all’esecuzione.',
      kw: 'codice procedura civile, c.p.c., processo civile, citazione, sentenza, esecuzione forzata',
      lead: 'Il Codice di Procedura Civile (R.D. 1443/1940) disciplina il processo civile: cognizione, esecuzione, procedimenti speciali.',
      struttura: [
        ['Disposizioni generali', 'Giurisdizione, competenza, parti, atti.'],
        ['Processo di cognizione', 'Tribunale, istruzione, decisione, impugnazioni.'],
        ['Processo di esecuzione', 'Esecuzione forzata, espropriazione.'],
      ],
      art: [],
      faq: [{ q: 'A cosa serve il codice di procedura civile?', a: 'Regola come si fa valere un diritto in giudizio civile: dalla domanda alla sentenza fino all’esecuzione forzata.' }],
    },
    'codice-strada': {
      nome: 'Codice della Strada', sigla: 'C.d.S.', anno: '1992',
      desc: 'Il Codice della Strada: regole di circolazione, segnaletica, sanzioni e patente. Articoli chiave su limiti, guida in stato di ebbrezza e sanzioni.',
      kw: 'codice della strada, CdS, multe, patente, limiti di velocità, guida in stato di ebbrezza art 186',
      lead: 'Il Codice della Strada (D.lgs 285/1992) disciplina la circolazione di veicoli e persone, la segnaletica, le patenti e le sanzioni.',
      struttura: [
        ['Veicoli e conducenti', 'Categorie, patenti, requisiti.'],
        ['Circolazione e segnaletica', 'Norme di comportamento, precedenze, segnali.'],
        ['Sanzioni', 'Illeciti amministrativi e penali, punti patente.'],
      ],
      art: [['186', 'guida in stato di ebbrezza'], ['142', 'limiti di velocità']],
      faq: [{ q: 'Cosa prevede l’art. 186 del Codice della Strada?', a: 'Disciplina la guida in stato di ebbrezza: sanzioni crescenti in base al tasso alcolemico, fino a conseguenze penali.' }],
    },
    'codice-consumo': {
      nome: 'Codice del Consumo', sigla: 'cod. cons.', anno: '2005',
      desc: 'Il Codice del Consumo: diritti dei consumatori, pratiche commerciali scorrette, garanzie e contratti a distanza.',
      kw: 'codice del consumo, diritti del consumatore, garanzia, recesso, pratiche commerciali scorrette',
      lead: 'Il Codice del Consumo (D.lgs 206/2005) raccoglie e coordina la tutela dei consumatori: informazione, sicurezza dei prodotti, garanzie, contratti.',
      struttura: [
        ['Informazione e pratiche commerciali', 'Trasparenza, pubblicità, pratiche scorrette.'],
        ['Contratti del consumatore', 'Clausole vessatorie, contratti a distanza, diritto di recesso.'],
        ['Garanzie e sicurezza', 'Garanzia di conformità, sicurezza dei prodotti.'],
      ],
      art: [],
      faq: [{ q: 'Quanti giorni ho per il diritto di recesso?', a: 'Nei contratti a distanza il consumatore ha di norma 14 giorni per recedere senza motivazione (Codice del Consumo).' }],
    },
    'codice-assicurazioni': {
      nome: 'Codice delle Assicurazioni Private', sigla: 'C.A.P.', anno: '2005',
      desc: 'Il Codice delle Assicurazioni Private: disciplina dell’attività assicurativa, contratti, RC auto e vigilanza.',
      kw: 'codice delle assicurazioni, RC auto, contratto di assicurazione, IVASS, polizza',
      lead: 'Il Codice delle Assicurazioni Private (D.lgs 209/2005) disciplina l’attività assicurativa, i contratti, l’assicurazione obbligatoria RC auto e la vigilanza.',
      struttura: [
        ['Esercizio dell’attività', 'Accesso, vigilanza (IVASS).'],
        ['Contratti e RC auto', 'Disciplina del contratto, assicurazione obbligatoria veicoli.'],
        ['Tutela dell’assicurato', 'Trasparenza, reclami, risarcimento diretto.'],
      ],
      art: [],
      faq: [{ q: 'L’assicurazione RC auto è obbligatoria?', a: 'Sì: il Codice delle Assicurazioni rende obbligatoria la responsabilità civile per la circolazione dei veicoli a motore.' }],
    },
  },
}
