// Tool — contenuto editoriale italiano. Importato direttamente da Tool.jsx.
export default {
  // Email di feedback precompilata (CTA fluttuante).
  feedbackSubject: 'OpenLegis — il mio feedback',
  feedbackBody: 'Ciao!\n\nHo provato OpenLegis e volevo dirti che…\n\n',

  // CTA feedback.
  feedbackTitle: 'Scrivimi cosa ne pensi',
  feedbackHeading: 'Ti piace il progetto?',
  feedbackSub: 'Fammi sapere cosa ne pensi →',

  // Risposta vuota dall'agente.
  noAnswer: '(nessuna risposta)',

  // Messaggi di errore. message = testo grezzo dal server.
  errAgent: (message) => `⚠️ Errore nel raggiungere l'agente: ${message}.`,
  errRate: (message) => `⏳ ${message}`,
  errAuth: (message) => `🔒 ${message}`,

  // Prompt generato dal clic "Chiedi all'agente" su un nodo del grafo.
  askAboutNode: (node) =>
    `Spiega "${node.label || node.id}" e cosa stabilisce la legge in merito. Cita gli articoli.`,

  // SEO della pagina app.
  seoTitle: 'App · interroga la legge',
}
