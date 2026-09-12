// Hub SEO sulla Costituzione italiana (Costituzione.jsx) — contenuto editoriale italiano.
// I frammenti con enfasi inline usano i token <0>grassetto</0> <1>corsivo</1> <2>mono</2> resi da <Rich>.
//
// Prosa con link-articolo: alcune frasi alternano testo e riferimenti agli articoli
// interrogabili. La modelliamo come array di "segmenti": una stringa è testo (resa con
// <Rich>), { art: n } è un link «art. n» che interroga l'app. Così la traduzione resta
// naturale e il DOM identico.
export default {
  path: '/costituzione',
  appPath: '/app',
  inLanguage: 'it',
  title: 'Costituzione italiana — struttura, articoli e principi',
  desc: 'La Costituzione della Repubblica Italiana: struttura (principi fondamentali, diritti e doveri, ordinamento), articoli chiave e come interrogarne il testo con fonti reali su OpenLegis.',
  keywords: 'Costituzione italiana, costituzione della repubblica, principi fondamentali, articolo 1 costituzione, articolo 3 costituzione, articolo 21 costituzione, diritti e doveri, ordinamento della repubblica',

  legislationName: 'Costituzione della Repubblica Italiana',
  legislationType: 'Costituzione',

  // Domanda interrogabile per ogni articolo: {n} viene sostituito dal numero.
  askArt: (n) => `Cosa stabilisce l'articolo ${n} della Costituzione italiana? Cita il testo.`,

  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'Costituzione',

  faq: [
    { q: 'Da quanti articoli è composta la Costituzione italiana?', a: 'La Costituzione si compone di 139 articoli (alcuni abrogati) più 18 disposizioni transitorie e finali, entrata in vigore il 1° gennaio 1948.' },
    { q: 'Come è strutturata la Costituzione?', a: 'In Principi fondamentali (artt. 1–12), Parte I — Diritti e doveri dei cittadini (artt. 13–54), Parte II — Ordinamento della Repubblica (artt. 55–139) e Disposizioni transitorie e finali.' },
    { q: 'Cosa dice l’articolo 1 della Costituzione?', a: 'Afferma che l’Italia è una Repubblica democratica fondata sul lavoro e che la sovranità appartiene al popolo, che la esercita nelle forme e nei limiti della Costituzione.' },
  ],

  kicker: 'carta fondamentale · 1948',
  h1: 'La Costituzione italiana',
  // lead: <0>grassetto</0> reso da <Rich>.
  lead: 'La <0>Costituzione della Repubblica Italiana</0> — entrata in vigore il 1° gennaio 1948 — è la legge fondamentale dello Stato: 139 articoli che fissano principi, diritti, doveri e l’ordinamento della Repubblica. Qui la sua struttura, con gli articoli chiave da esplorare con fonti reali.',

  fondamentaliH: 'Principi fondamentali',
  fondamentaliRange: '(artt. 1–12)',
  // Paragrafo a segmenti (stringa = testo con <Rich>; { art: n } = link «art. n»).
  fondamentaliP: [
    'Le fondamenta della Repubblica: democratica e fondata sul lavoro (', { art: 1 },
    '), i diritti inviolabili dell’uomo (', { art: 2 },
    '), l’<0>uguaglianza</0> formale e sostanziale (', { art: 3 },
    '), il <0>ripudio della guerra</0> (', { art: 11 },
    '), la tutela del paesaggio e della ricerca (', { art: 9 },
    ') e delle minoranze linguistiche (', { art: 6 }, ').',
  ],

  parteIH: 'Parte I — Diritti e doveri dei cittadini',
  parteIRange: '(artt. 13–54)',
  // Ogni voce della lista è un array di segmenti (vedi sopra).
  parteIList: [
    ['<0>Rapporti civili</0> (13–28): libertà personale, di domicilio, di manifestazione del pensiero (', { art: 21 }, '), diritto di difesa (', { art: 24 }, '), principio di legalità penale.'],
    ['<0>Rapporti etico-sociali</0> (29–34): famiglia, <0>salute</0> (', { art: 32 }, '), scuola e istruzione (', { art: 34 }, ').'],
    ['<0>Rapporti economici</0> (35–47): tutela del lavoro, libertà sindacale, <0>iniziativa economica privata</0> (', { art: 41 }, '), proprietà, risparmio.'],
    ['<0>Rapporti politici</0> (48–54): voto, partiti, doveri verso la Repubblica e fedeltà alla Costituzione.'],
  ],

  parteIIH: 'Parte II — Ordinamento della Repubblica',
  parteIIRange: '(artt. 55–139)',
  iterPath: '/docs/guida/iter-di-una-legge',
  // Voci con eventuale link interno all'iter ({ iter: 'testo del link' }).
  parteIIList: [
    ['<0>Il Parlamento</0> (55–82): Camera e Senato, formazione delle leggi, l’', { iter: 'iter legislativo' }, '.'],
    ['<0>Il Presidente della Repubblica</0> (83–91).'],
    ['<0>Il Governo</0> (92–100): Consiglio dei Ministri, pubblica amministrazione, organi ausiliari.'],
    ['<0>La Magistratura</0> (101–113): indipendenza, CSM, giurisdizione.'],
    ['<0>Regioni, Province, Comuni</0> (114–133): autonomie territoriali.'],
    ['<0>Garanzie costituzionali</0> (134–139): la <0>Corte Costituzionale</0> (', { art: 134 }, ') e la revisione costituzionale.'],
  ],

  esploraH: 'Esplora il testo con le fonti',
  // Paragrafo finale con tre link interni: app, guida ELI, corpus norme.
  esploraP: {
    s0: 'Ogni articolo può essere interrogato sull’',
    appLabel: 'app',
    s1: ': ottieni la risposta con il riferimento normativo reale e, dove disponibile, la <0>giurisprudenza costituzionale</0> collegata. Vedi anche la',
    eliPath: '/docs/guida/citare-una-norma-con-eli',
    eliLabel: 'guida a come citare una norma con l’ELI',
    s2: 'e il',
    normePath: '/norme',
    normeLabel: 'corpus delle norme indicizzate',
    s3: '.',
  },

  disclaimer: 'Strumento informativo — non è consulenza legale. Testo ufficiale: Gazzetta Ufficiale e Normattiva.',
}
