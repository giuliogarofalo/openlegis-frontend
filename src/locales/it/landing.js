// Landing (home) — dati strutturati italiani (FAQPage + WebApplication).
// Importato direttamente da Landing.jsx. La descrizione SEO vive in seo.jsx (DEFAULT_DESC).
export default {
  inLanguage: 'it-IT',
  // Q&A esposte come FAQPage structured data — segnale forte sia per i rich result
  // sia per i motori generativi (ChatGPT/Perplexity/Gemini), che estraggono bene Q&A pulite.
  faq: [
    [
      'Cosa dice la Costituzione sul ripudio della guerra?',
      "L'articolo 11 della Costituzione italiana stabilisce che l'Italia ripudia la guerra come strumento di offesa alla libertà degli altri popoli e come mezzo di risoluzione delle controversie internazionali. OpenLegis riporta il testo dell'articolo con il riferimento citabile (ELI).",
    ],
    [
      'A che punto è un disegno di legge?',
      'OpenLegis interroga i dati aperti di Camera e Senato (SPARQL) e restituisce lo stato di avanzamento di un DDL, i firmatari e l’iter parlamentare, con link alla fonte ufficiale.',
    ],
    [
      'Cosa modifica un decreto-legge?',
      'Le relazioni di modifica (modifica, abroga, sostituisce, inserisce, converte) sono estratte in modo deterministico da Normattiva in formato Akoma Ntoso, a livello di singolo articolo e con il testo-prova allegato.',
    ],
    [
      'OpenLegis è una consulenza legale?',
      'No. È uno strumento informativo che cita sempre la fonte ufficiale e invita a verificarla; non sostituisce un parere legale.',
    ],
  ],
}
