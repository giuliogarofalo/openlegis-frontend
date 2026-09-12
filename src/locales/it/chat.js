// ChatPanel — contenuto editoriale italiano. Importato direttamente da ChatPanel.jsx.
// I frammenti con enfasi inline usano i token <0>grassetto</0> <1>corsivo</1> resi da <Rich>.
export default {
  // Domande suggerite (chip nell'intro). q = domanda, a = riferimento atteso.
  suggestions: [
    { q: 'Cosa dice la Costituzione sul ripudio della guerra?', a: 'art. 11 Cost.' },
    { q: "Qual è la pena prevista per l'omicidio?", a: 'art. 575 c.p.' },
    { q: 'È ammessa la pena di morte in Italia?', a: 'art. 27 Cost.' },
    { q: 'Si può essere puniti per un fatto che non era reato?', a: 'art. 2 c.p.' },
  ],

  // Etichette leggibili per i tool consultati (mostrate nella riga "consultati: …").
  // Fallback client-side: la label autorevole arriva dal backend (localizzata server-side).
  toolLabels: {
    cerca_legge: 'la legge',
    cerca_dati: 'i dati pubblici',
    cerca_statistiche: 'le statistiche',
    novita_normative: 'la Gazzetta Ufficiale',
    cerca_parlamentari: 'i parlamentari',
    indice_di_forza: "l'indice di forza",
    profilo_parlamentare: 'il profilo del parlamentare',
    cerca_votazioni: 'le votazioni',
    decreti_legge: 'i decreti legge',
    attivita_legislativa: "l'attività legislativa",
    organi_parlamentari: 'gli organi parlamentari',
  },

  // Pannello «Processo» espandibile.
  proc: {
    title: 'Processo',
    sourceOne: 'fonte consultata',
    sourceMany: 'fonti consultate',
    problems: (n) => `${n} con problemi`,
    running: 'in corso…',
    unreachable: 'fonte non raggiungibile',
    empty: 'nessun dato',
    scarno: (count, note) => `${count} risultati · dati poco utili${note ? ' (' + note + ')' : ''}`,
    results: (count) => `${count} risultati`,
    searched: (query) => `ha cercato: «${query}»`,
  },

  // Intro (nessun messaggio).
  intro: {
    h2: 'Interroga la legge italiana.',
    // <0>…</0> = corsivo (em) reso da <Rich>
    p: 'Fai una domanda sullo Stato: ricevi una risposta con i <0>riferimenti normativi reali</0> (Costituzione e Codice Penale), verificabili sul grafo a fianco.',
    exploreCta: 'Esplora il grafo della legge',
    knowledgeGraph: 'Apri il knowledge graph ↗',
    relationsGraph: 'grafo delle relazioni ↗',
  },

  // Etichette di ruolo dei messaggi.
  roleUser: 'La tua domanda',
  roleAgent: 'Open Parlamento',

  // Stato "sto pensando".
  thinkingStream: 'sto consultando le fonti…',
  thinkingLoad: 'consulto le fonti normative…',

  // Riga "consultati: …" (fallback quando non c'è il Processo).
  trace: 'consultati:',

  // Intestazioni delle sezioni a chip.
  sections: {
    articoli: 'Articoli citati — clicca per localizzarli sul grafo',
    datasets: 'Dati pubblici · portali open-data',
    statistiche: 'Statistiche ufficiali · Eurostat',
    novita: 'Novità in Gazzetta Ufficiale',
    parlamento: 'Parlamento · Fonte: Openpolis',
  },

  // Card profilo parlamentare (Openpolis).
  presenze: (presente, assente, ribelle) =>
    `Presenze ${presente} · assenze ${assente} · ribelle ${ribelle}`,
  dl: 'DL',

  // Composer.
  placeholder: 'Es. è legale… · qual è la pena per… · cosa dice la Costituzione su…',
  send: 'Invia',
  hint: 'Invio per inviare · Shift+Invio = a capo',
  disclaimer: 'Strumento informativo — non è consulenza legale',
}
