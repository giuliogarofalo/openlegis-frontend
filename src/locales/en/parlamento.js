// Evergreen hub on the Italian Parliament (Parlamento.jsx) — English editorial content.
// Inline-emphasis fragments use <0>bold</0> <1>italic</1> <2>mono</2> tokens rendered by <Rich>.
// The «ask» deep links carry questions to the app, answered on real sources (Camera, Senato, Openpolis).
export default {
  path: '/parlamento',
  appPath: '/app',
  inLanguage: 'en',
  title: 'The Italian Parliament: Chamber, Senate and how it works',
  desc: 'The Italian Parliament explained: the Chamber of Deputies and the Senate of the Republic, how a law is made, groups and bodies. With real data on members, votes and the legislative process.',
  keywords: 'Italian Parliament, Chamber of Deputies, Senate of the Republic, how the Italian Parliament works, bicameralism, parliamentary groups, parliamentary votes, legislative process',
  headline: 'The Italian Parliament: Chamber, Senate and how it works',

  breadcrumbHome: 'Open·Parlamento',
  breadcrumbSelf: 'Parliament',

  faq: [
    { q: 'What is the Italian Parliament made up of?', a: 'Two chambers with equal powers (equal bicameralism): the Chamber of Deputies (400 deputies) and the Senate of the Republic (200 elected senators, plus senators for life).' },
    { q: 'How is a law passed in Italy?', a: 'A law must be approved in the same text by the Chamber of Deputies and the Senate, then promulgated by the President of the Republic and published in the Gazzetta Ufficiale. See the guide to the legislative process.' },
    { q: 'What is a member of Parliament’s “index of strength”?', a: 'An indicator (Openpolis data) that measures the weight and influence of a member of Parliament based on the roles they hold in Parliament and in the Government.' },
  ],

  kicker: 'institutions · 19th legislature',
  h1: 'The Italian Parliament',
  lead: 'The <0>Parliament</0> of the Italian Republic exercises the legislative function. It is bicameral and equal: the <0>Chamber of Deputies</0> and the <0>Senate of the Republic</0> have the same powers.',

  camereH: 'The two Chambers',
  camere: [
    '<0>Camera dei Deputati (Chamber of Deputies)</0> — 400 deputies, elected by universal suffrage. Seat at Montecitorio.',
    '<0>Senato della Repubblica (Senate of the Republic)</0> — 200 elected senators, plus senators for life. Seat at Palazzo Madama.',
  ],
  camereFunzioni: 'Its functions: legislative (making laws), and setting direction and oversight of the Government (confidence votes, questions, motions).',

  leggeH: 'How a law comes about',
  iterPath: '/docs/guida/iter-di-una-legge',
  legge: {
    s0: 'A bill is examined in committee, voted on by the floor and must be approved in the same text by both Chambers, then promulgated and published. All the steps are in the guide ',
    iterLabel: 'how the legislative process of a law works',
    s1: '.',
  },

  organiH: 'Bodies and groups',
  organiP: 'The Presidency, standing committees (by subject matter) and parliamentary groups organise the work. The political forces form groups in the Chamber of Deputies and in the Senate.',

  datiH: 'Real data, in real time',
  datiIntro: {
    s0: 'Query the Italian Parliament with official sources (Camera, Senato, Openpolis) in the ',
    appLabel: 'app',
    s1: ':',
  },
  // App deep links: [queried question, link label, trailing text after the link].
  datiLinks: [
    ['Who are the members of Parliament with the highest index of strength? Source: Openpolis.', 'Who has the most weight in Parliament', ' (index of strength)'],
    ['What stage is the bill on nuclear power at? Quote the act number and its status.', 'What stage a bill is at', ' (Chamber/Senate process)'],
    ['How did the Italian Parliament vote on recent confidence votes? Source: Openpolis.', 'How Parliament voted', ' (votes)'],
    ['Which decree-laws are currently being converted into law and what stage are they at?', 'Decree-laws being converted', ''],
  ],

  // «See also» paragraph with three internal links.
  vediAnche: {
    s0: 'See also: ',
    costPath: '/costituzione',
    costLabel: 'the Italian Constitution',
    s1: ' (Part II — Organisation of the Republic) ·',
    glossPath: '/docs/glossario',
    glossLabel: 'glossary',
    s2: ' · ',
    openDataPath: '/open-data',
    openDataLabel: 'open data',
    s3: '.',
  },

  disclaimer: 'Informational tool — not legal advice. Sources: Camera, Senato, Openpolis.',
}
