// Hub evergreen sul Parlamento italiano (Parlamento.jsx) — contenuto editoriale italiano.
// I frammenti con enfasi inline usano i token <0>grassetto</0> <1>corsivo</1> <2>mono</2> resi da <Rich>.
// I deep-link «ask» portano domande all'app sulle fonti reali (Camera, Senato, Openpolis).
export default {
  path: '/parlamento',
  appPath: '/app',
  inLanguage: 'it',
  title: 'Il Parlamento italiano: Camera, Senato e come funziona',
  desc: 'Il Parlamento italiano spiegato: Camera dei Deputati e Senato della Repubblica, come si fa una legge, gruppi e organi. Con dati reali su parlamentari, votazioni e iter.',
  keywords: 'parlamento italiano, camera dei deputati, senato della repubblica, come funziona il parlamento, bicameralismo, gruppi parlamentari, votazioni parlamento, iter legislativo',
  headline: 'Il Parlamento italiano: Camera, Senato e come funziona',

  breadcrumbHome: 'Open·Parlamento',
  breadcrumbSelf: 'Parlamento',

  faq: [
    { q: 'Da cosa è composto il Parlamento italiano?', a: 'Da due camere con pari poteri (bicameralismo paritario): la Camera dei Deputati (400 deputati) e il Senato della Repubblica (200 senatori elettivi, più i senatori a vita).' },
    { q: 'Come si approva una legge in Italia?', a: 'Una legge deve essere approvata nello stesso testo da Camera e Senato, poi promulgata dal Presidente della Repubblica e pubblicata in Gazzetta Ufficiale. Vedi la guida all’iter legislativo.' },
    { q: 'Cos’è l’indice di forza di un parlamentare?', a: 'Un indicatore (dati Openpolis) che misura il peso e l’influenza di un parlamentare in base ai ruoli ricoperti in Parlamento e nel Governo.' },
  ],

  kicker: 'istituzioni · XIX legislatura',
  h1: 'Il Parlamento italiano',
  lead: 'Il <0>Parlamento</0> della Repubblica Italiana esercita la funzione legislativa. È bicamerale e paritario: <0>Camera dei Deputati</0> e <0>Senato della Repubblica</0> hanno gli stessi poteri.',

  camereH: 'Le due Camere',
  camere: [
    '<0>Camera dei Deputati</0> — 400 deputati, eletti a suffragio universale. Sede a Montecitorio.',
    '<0>Senato della Repubblica</0> — 200 senatori elettivi, più i senatori a vita. Sede a Palazzo Madama.',
  ],
  camereFunzioni: 'Le funzioni: legislativa (le leggi), di indirizzo e di controllo sul Governo (fiducia, interrogazioni, mozioni).',

  leggeH: 'Come nasce una legge',
  iterPath: '/docs/guida/iter-di-una-legge',
  legge: {
    s0: 'Un disegno di legge è esaminato in commissione, votato dall’Aula e deve essere approvato nello stesso testo da entrambe le Camere, poi promulgato e pubblicato. Tutti i passaggi nella guida ',
    iterLabel: 'com’è fatto l’iter di una legge',
    s1: '.',
  },

  organiH: 'Organi e gruppi',
  organiP: 'Presidenza, commissioni permanenti (per materia) e gruppi parlamentari organizzano i lavori. Le forze politiche si costituiscono in gruppi alla Camera e al Senato.',

  datiH: 'I dati reali, in tempo reale',
  datiIntro: {
    s0: 'Interroga il Parlamento con fonti ufficiali (Camera, Senato, Openpolis) sull’',
    appLabel: 'app',
    s1: ':',
  },
  // Deep-link all'app: [domanda interrogata, etichetta del link, coda dopo il link].
  datiLinks: [
    ['Chi sono i parlamentari con il più alto indice di forza? Fonte: Openpolis.', 'Chi ha più peso in Parlamento', ' (indice di forza)'],
    ['A che punto è il disegno di legge sul nucleare? Cita numero atto e stato.', 'A che punto è un disegno di legge', ' (iter Camera/Senato)'],
    ['Come ha votato il Parlamento sui voti di fiducia recenti? Fonte: Openpolis.', 'Come ha votato il Parlamento', ' (votazioni)'],
    ['Quali decreti legge sono in corso di conversione e a che punto sono?', 'Decreti legge in conversione', ''],
  ],

  // Paragrafo «Vedi anche» con tre link interni.
  vediAnche: {
    s0: 'Vedi anche: ',
    costPath: '/costituzione',
    costLabel: 'la Costituzione',
    s1: ' (Parte II — Ordinamento della Repubblica) ·',
    glossPath: '/docs/glossario',
    glossLabel: 'glossario',
    s2: ' · ',
    openDataPath: '/open-data',
    openDataLabel: 'open data',
    s3: '.',
  },

  disclaimer: 'Strumento informativo — non è consulenza legale. Fonti: Camera, Senato, Openpolis.',
}
