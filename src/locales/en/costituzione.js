// Italian Constitution SEO hub (Costituzione.jsx) — English editorial content.
// Inline-emphasis fragments use <0>bold</0> <1>italic</1> <2>mono</2> tokens rendered by <Rich>.
//
// Prose with article links: some sentences alternate text and links to queryable
// articles. Modelled as an array of "segments": a string is text (rendered with <Rich>),
// { art: n } is an «art. n» link that queries the app — so the translation reads
// naturally while the DOM stays identical.
export default {
  path: '/costituzione',
  appPath: '/app',
  inLanguage: 'en',
  title: 'Italian Constitution — structure, articles and principles',
  desc: 'The Constitution of the Italian Republic: structure (fundamental principles, rights and duties, organisation of the State), key articles and how to query its text with real sources on OpenLegis.',
  keywords: 'Italian Constitution, constitution of the Italian Republic, fundamental principles, article 1 Italian Constitution, article 3 Italian Constitution, article 21 Italian Constitution, rights and duties, organisation of the Republic',

  legislationName: 'Constitution of the Italian Republic',
  legislationType: 'Constitution',

  // Queryable question for each article: {n} is replaced by the article number.
  askArt: (n) => `What does article ${n} of the Italian Constitution establish? Quote the text.`,

  breadcrumbHome: 'OpenLegis',
  breadcrumbSelf: 'Constitution',

  faq: [
    { q: 'How many articles does the Italian Constitution have?', a: 'The Constitution is made up of 139 articles (some repealed) plus 18 transitional and final provisions; it entered into force on 1 January 1948.' },
    { q: 'How is the Italian Constitution structured?', a: 'Into Fundamental Principles (arts. 1–12), Part I — Rights and Duties of Citizens (arts. 13–54), Part II — Organisation of the Republic (arts. 55–139) and Transitional and Final Provisions.' },
    { q: 'What does article 1 of the Italian Constitution say?', a: 'It affirms that Italy is a democratic Republic founded on labour, and that sovereignty belongs to the people, who exercise it in the forms and within the limits of the Constitution.' },
  ],

  kicker: 'fundamental charter · 1948',
  h1: 'The Italian Constitution',
  // lead: <0>bold</0> rendered by <Rich>.
  lead: 'The <0>Constitution of the Italian Republic</0> — in force since 1 January 1948 — is the fundamental law of the State: 139 articles setting out principles, rights, duties and the organisation of the Republic. Here is its structure, with the key articles to explore using real sources.',

  fondamentaliH: 'Fundamental principles',
  fondamentaliRange: '(arts. 1–12)',
  // Segment paragraph (string = text with <Rich>; { art: n } = «art. n» link).
  fondamentaliP: [
    'The foundations of the Republic: democratic and founded on labour (', { art: 1 },
    '), the inviolable rights of the individual (', { art: 2 },
    '), formal and substantive <0>equality</0> (', { art: 3 },
    '), the <0>repudiation of war</0> (', { art: 11 },
    '), the protection of the landscape and of research (', { art: 9 },
    ') and of linguistic minorities (', { art: 6 }, ').',
  ],

  parteIH: 'Part I — Rights and Duties of Citizens',
  parteIRange: '(arts. 13–54)',
  // Each list item is an array of segments (see above).
  parteIList: [
    ['<0>Civil relations</0> (13–28): personal liberty, inviolability of the home, freedom of expression (', { art: 21 }, '), the right to a defence (', { art: 24 }, '), the principle of legality in criminal law.'],
    ['<0>Ethical and social relations</0> (29–34): the family, <0>health</0> (', { art: 32 }, '), schools and education (', { art: 34 }, ').'],
    ['<0>Economic relations</0> (35–47): protection of labour, freedom of association in trade unions, <0>private economic initiative</0> (', { art: 41 }, '), property, savings.'],
    ['<0>Political relations</0> (48–54): the vote, parties, duties towards the Republic and loyalty to the Constitution.'],
  ],

  parteIIH: 'Part II — Organisation of the Republic',
  parteIIRange: '(arts. 55–139)',
  iterPath: '/docs/guida/iter-di-una-legge',
  // Items with an optional internal link to the legislative process ({ iter: 'link text' }).
  parteIIList: [
    ['<0>Parliament</0> (55–82): the Chamber of Deputies and the Senate, the making of laws, the ', { iter: 'legislative process' }, '.'],
    ['<0>The President of the Republic</0> (83–91).'],
    ['<0>The Government</0> (92–100): the Council of Ministers, public administration, auxiliary bodies.'],
    ['<0>The Judiciary</0> (101–113): independence, the High Council of the Judiciary (CSM), jurisdiction.'],
    ['<0>Regions, Provinces, Municipalities</0> (114–133): territorial autonomies.'],
    ['<0>Constitutional guarantees</0> (134–139): the <0>Constitutional Court</0> (', { art: 134 }, ') and constitutional revision.'],
  ],

  esploraH: 'Explore the text with sources',
  // Closing paragraph with three internal links: app, ELI guide, statute corpus.
  esploraP: {
    s0: 'Every article can be queried in the ',
    appLabel: 'app',
    s1: ': you get the answer with the real legislative reference and, where available, the related <0>constitutional case law</0>. See also the',
    eliPath: '/docs/guida/citare-una-norma-con-eli',
    eliLabel: 'guide to citing a statute with the ELI',
    s2: 'and the',
    normePath: '/norme',
    normeLabel: 'corpus of indexed statutes',
    s3: '.',
  },

  disclaimer: 'Informational tool — not legal advice. Official text: Gazzetta Ufficiale and Normattiva.',
}
