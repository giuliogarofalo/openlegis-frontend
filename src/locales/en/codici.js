// Codes hub (Codici.jsx) — English editorial content. Imported by Codici.jsx.
// Inline-emphasis fragments use <0>bold</0> <1>italic</1> <2>mono</2> tokens rendered by <Rich>.
// Slugs and IDs (abbreviations, years, article numbers) stay canonical and are not translated.
// The code NAMES are canonical Italian legal instruments: kept in Italian, glossed in English.
export default {
  // Shared UI labels (index + per-code pages)
  breadcrumbHome: 'OpenLegis',
  breadcrumbCodici: 'Codes',
  inLanguage: 'en',

  // Index /en/codici
  index: {
    collectionName: 'The Italian codes — OpenLegis',
    collectionDesc: 'The main codes of the Italian legal system: criminal, civil, procedure, highway, consumer, insurance.',
    seoTitle: 'The Italian codes — criminal, civil, highway and more',
    seoDesc: 'The main codes of the Italian legal system (criminal, civil, criminal and civil procedure, highway, consumer, insurance): structure, key articles and real sources.',
    seoKeywords: 'Italian codes, Italian Penal Code, Italian Civil Code, Italian Highway Code, Italian Consumer Code, Italian Code of Criminal Procedure, Italian Code of Civil Procedure',
    kicker: 'Italian legal system',
    h1: 'The Italian codes',
    lead: 'The major codes that organise Italian law: structure, key articles and the ability to query them with real sources.',
    seeAlsoPre: 'See also the ',
    seeAlsoCost: 'Constitution',
    seeAlsoMid: ' and the ',
    seeAlsoNorme: 'corpus of indexed statutes',
  },

  // Per-code pages /en/codici/<slug>
  page: {
    kickerPre: 'code · ',
    strutturaH: 'Structure',
    artH: 'Key articles',
    faqH: 'Frequently asked questions',
    // Question sent to the app for a given article: askQ(number, codeName)
    askQ: (n, nome) => `What does article ${n} of the ${nome} provide? Quote the text and the penalty.`,
    artLabel: 'art. ',
    interrogaPre: 'Query the ',
    interrogaApp: 'app',
    interrogaMid: ' with real sources in the ',
    interrogaTuttiPre: '. See also',
    interrogaTutti: 'all the codes',
    interrogaCost: 'Constitution',
    interrogaGlossario: 'glossary',
    disclaimer: 'Informational tool — not legal advice. Official text: Normattiva.',
    seoTitleSuffix: ' — structure and articles',
  },

  // Per-code data
  codici: {
    'codice-penale': {
      nome: 'Codice Penale (Italian Penal Code)', sigla: 'c.p.', anno: '1930',
      desc: 'The Italian Penal Code (Codice Penale): structure, principles (legality, culpability) and the key articles on offences and penalties, to explore with real sources and linked case law.',
      kw: 'Italian Penal Code, codice penale, c.p., offences, penalties, murder art 575, theft art 624, penal code article',
      lead: 'The Codice Penale (Italian Penal Code, R.D. 1398/1930) defines offences and penalties in the Italian legal system. It is divided into three books: principles and penalties, the crimes, the misdemeanours.',
      struttura: [
        ['Book I — On offences in general', 'Principle of legality, mental element, penalty, circumstances, attempt, complicity.'],
        ['Book II — On specific crimes', 'Crimes against the person, property, public administration, public trust, etc.'],
        ['Book III — On misdemeanours', 'Misdemeanours and their sanctions.'],
      ],
      art: [['575', 'murder'], ['624', 'theft'], ['416-bis', 'mafia-type association'], ['595', 'defamation']],
      faq: [
        { q: 'What does art. 575 of the Italian Penal Code provide?', a: 'It punishes murder: anyone who causes the death of a person is punished with imprisonment of no less than twenty-one years.' },
        { q: 'How many books does the Italian Penal Code have?', a: 'Three: offences in general, specific crimes, misdemeanours.' },
      ],
    },
    'codice-civile': {
      nome: 'Codice Civile (Italian Civil Code)', sigla: 'c.c.', anno: '1942',
      desc: 'The Italian Civil Code (Codice Civile): the six books (persons and family, succession, property, obligations, labour, protection of rights) and the key articles.',
      kw: 'Italian Civil Code, codice civile, c.c., obligations, property, succession, family, contracts, civil code article',
      lead: 'The Codice Civile (Italian Civil Code, R.D. 262/1942) governs relations between private parties. It is organised into six books.',
      struttura: [
        ['Book I — On persons and the family', 'Capacity, marriage, filiation, parental authority.'],
        ['Book II — On succession', 'Inheritance, wills, gifts.'],
        ['Book III — On property', 'Goods, ownership, real rights, possession.'],
        ['Book IV — On obligations', 'Contracts, liability, specific contracts.'],
        ['Book V — On labour', 'Enterprise, labour, companies.'],
        ['Book VI — On the protection of rights', 'Evidence, limitation, registration.'],
      ],
      art: [['2043', 'compensation for unlawful act'], ['1321', 'definition of contract'], ['832', 'content of the right of ownership']],
      faq: [
        { q: 'How many books does the Italian Civil Code have?', a: 'Six: persons and family, succession, property, obligations, labour, protection of rights.' },
        { q: 'What does art. 2043 of the Italian Civil Code say?', a: 'It establishes liability for an unlawful act: whoever causes another an unjust harm is obliged to compensate it.' },
      ],
    },
    'codice-procedura-penale': {
      nome: 'Codice di Procedura Penale (Italian Code of Criminal Procedure)', sigla: 'c.p.p.', anno: '1988',
      desc: 'The Italian Code of Criminal Procedure (Codice di Procedura Penale): how the criminal trial unfolds, from the investigation to judgment, with the guarantees of a fair trial.',
      kw: 'Italian Code of Criminal Procedure, codice procedura penale, c.p.p., criminal trial, preliminary investigations, judgment, guarantees',
      lead: 'The Codice di Procedura Penale (Italian Code of Criminal Procedure, D.P.R. 447/1988) governs the conduct of the criminal trial, from the investigation to judgment and appeals.',
      struttura: [
        ['Parties and acts', 'Judge, public prosecutor, parties, defence counsel; acts and evidence.'],
        ['Investigations and preliminary hearing', 'Prosecutor’s investigations, precautionary measures, committal for trial.'],
        ['Trial and appeals', 'Hearing, alternative proceedings, appeal, cassation.'],
      ],
      art: [],
      faq: [{ q: 'What does the Italian Code of Criminal Procedure govern?', a: 'The way in which an offence is established and a trial is held, guaranteeing a fair trial and the right to a defence.' }],
    },
    'codice-procedura-civile': {
      nome: 'Codice di Procedura Civile (Italian Code of Civil Procedure)', sigla: 'c.p.c.', anno: '1940',
      desc: 'The Italian Code of Civil Procedure (Codice di Procedura Civile): how the civil trial unfolds, from the claim to the judgment and enforcement.',
      kw: 'Italian Code of Civil Procedure, codice procedura civile, c.p.c., civil trial, summons, judgment, enforcement',
      lead: 'The Codice di Procedura Civile (Italian Code of Civil Procedure, R.D. 1443/1940) governs the civil trial: adjudication, enforcement, special proceedings.',
      struttura: [
        ['General provisions', 'Jurisdiction, competence, parties, acts.'],
        ['Adjudication proceedings', 'Court, investigation, decision, appeals.'],
        ['Enforcement proceedings', 'Enforcement, expropriation.'],
      ],
      art: [],
      faq: [{ q: 'What is the Italian Code of Civil Procedure for?', a: 'It governs how a right is asserted in civil proceedings: from the claim to the judgment up to enforcement.' }],
    },
    'codice-strada': {
      nome: 'Codice della Strada (Italian Highway Code)', sigla: 'C.d.S.', anno: '1992',
      desc: 'The Italian Highway Code (Codice della Strada): traffic rules, road signs, sanctions and the driving licence. Key articles on speed limits, drink-driving and sanctions.',
      kw: 'Italian Highway Code, codice della strada, CdS, fines, driving licence, speed limits, drink-driving art 186',
      lead: 'The Codice della Strada (Italian Highway Code, D.lgs 285/1992) governs the movement of vehicles and people, road signs, driving licences and sanctions.',
      struttura: [
        ['Vehicles and drivers', 'Categories, driving licences, requirements.'],
        ['Traffic and road signs', 'Rules of conduct, right of way, signs.'],
        ['Sanctions', 'Administrative and criminal offences, licence points.'],
      ],
      art: [['186', 'drink-driving'], ['142', 'speed limits']],
      faq: [{ q: 'What does art. 186 of the Italian Highway Code provide?', a: 'It governs drink-driving: sanctions increasing with the blood-alcohol level, up to criminal consequences.' }],
    },
    'codice-consumo': {
      nome: 'Codice del Consumo (Italian Consumer Code)', sigla: 'cod. cons.', anno: '2005',
      desc: 'The Italian Consumer Code (Codice del Consumo): consumer rights, unfair commercial practices, warranties and distance contracts.',
      kw: 'Italian Consumer Code, codice del consumo, consumer rights, warranty, withdrawal, unfair commercial practices',
      lead: 'The Codice del Consumo (Italian Consumer Code, D.lgs 206/2005) gathers and coordinates consumer protection: information, product safety, warranties, contracts.',
      struttura: [
        ['Information and commercial practices', 'Transparency, advertising, unfair practices.'],
        ['Consumer contracts', 'Unfair terms, distance contracts, right of withdrawal.'],
        ['Warranties and safety', 'Warranty of conformity, product safety.'],
      ],
      art: [],
      faq: [{ q: 'How many days do I have for the right of withdrawal?', a: 'In distance contracts the consumer normally has 14 days to withdraw without giving a reason (Italian Consumer Code).' }],
    },
    'codice-assicurazioni': {
      nome: 'Codice delle Assicurazioni Private (Italian Private Insurance Code)', sigla: 'C.A.P.', anno: '2005',
      desc: 'The Italian Private Insurance Code (Codice delle Assicurazioni Private): rules on insurance activity, contracts, motor third-party liability and supervision.',
      kw: 'Italian Private Insurance Code, codice delle assicurazioni, motor third-party liability, insurance contract, IVASS, policy',
      lead: 'The Codice delle Assicurazioni Private (Italian Private Insurance Code, D.lgs 209/2005) governs insurance activity, contracts, compulsory motor third-party liability insurance and supervision.',
      struttura: [
        ['Carrying on the activity', 'Access, supervision (IVASS).'],
        ['Contracts and motor liability', 'Rules on the contract, compulsory vehicle insurance.'],
        ['Protection of the insured', 'Transparency, complaints, direct indemnity.'],
      ],
      art: [],
      faq: [{ q: 'Is motor third-party liability insurance compulsory?', a: 'Yes: the Italian Private Insurance Code makes third-party liability for the movement of motor vehicles compulsory.' }],
    },
  },
}
