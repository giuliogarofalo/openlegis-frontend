// ChatPanel — English editorial content. Imported directly by ChatPanel.jsx.
// Inline-emphasis fragments use <0>bold</0> <1>italic</1> tokens rendered by <Rich>.
export default {
  // Suggested questions (chips in the intro). q = question, a = expected reference.
  // Proper nouns and reference IDs (art., Cost., c.p.) stay untranslated.
  suggestions: [
    { q: 'What does the Italian Constitution say about the repudiation of war?', a: 'art. 11 Cost.' },
    { q: 'What is the penalty for murder?', a: 'art. 575 c.p.' },
    { q: 'Is the death penalty allowed in Italy?', a: 'art. 27 Cost.' },
    { q: 'Can you be punished for an act that was not a crime?', a: 'art. 2 c.p.' },
  ],

  // Human-readable labels for the consulted tools (shown in the "consulted: …" line).
  // Client-side fallback: the authoritative label comes from the backend (localized server-side).
  toolLabels: {
    cerca_legge: 'the law',
    cerca_dati: 'public data',
    cerca_statistiche: 'statistics',
    novita_normative: 'the Gazzetta Ufficiale',
    cerca_parlamentari: 'members of Parliament',
    indice_di_forza: 'the influence index',
    profilo_parlamentare: "the member's profile",
    cerca_votazioni: 'the votes',
    decreti_legge: 'decree-laws',
    attivita_legislativa: 'legislative activity',
    organi_parlamentari: 'parliamentary bodies',
  },

  // Expandable «Process» panel.
  proc: {
    title: 'Process',
    sourceOne: 'source consulted',
    sourceMany: 'sources consulted',
    problems: (n) => `${n} with issues`,
    running: 'in progress…',
    unreachable: 'source unreachable',
    empty: 'no data',
    scarno: (count, note) => `${count} results · low-value data${note ? ' (' + note + ')' : ''}`,
    results: (count) => `${count} results`,
    searched: (query) => `searched for: «${query}»`,
  },

  // Intro (no messages).
  intro: {
    h2: 'Query Italian law.',
    // <0>…</0> = italic (em) rendered by <Rich>
    p: 'Ask a question about the Italian State: get an answer with <0>real legal references</0> (the Constitution and the Criminal Code), verifiable on the graph alongside.',
    exploreCta: 'Explore the graph of the law',
    knowledgeGraph: 'Open the knowledge graph ↗',
    relationsGraph: 'relations graph ↗',
  },

  // Message role labels.
  roleUser: 'Your question',
  roleAgent: 'OpenLegis',

  // "thinking" state.
  thinkingStream: 'consulting the sources…',
  thinkingLoad: 'consulting the legal sources…',

  // "consulted: …" line (fallback when there is no Process panel).
  trace: 'consulted:',

  // Chip section headings.
  sections: {
    articoli: 'Cited articles — click to locate them on the graph',
    datasets: 'Public data · open-data portals',
    statistiche: 'Official statistics · Eurostat',
    novita: 'Updates in the Gazzetta Ufficiale',
    parlamento: 'Parliament · Source: Openpolis',
  },

  // MP profile card (Openpolis).
  presenze: (presente, assente, ribelle) =>
    `Attendance ${presente} · absences ${assente} · rebel votes ${ribelle}`,
  dl: 'DL',

  // Composer.
  placeholder: 'E.g. is it legal… · what is the penalty for… · what does the Constitution say about…',
  send: 'Send',
  hint: 'Enter to send · Shift+Enter = new line',
  disclaimer: 'Informational tool — not legal advice',
}
