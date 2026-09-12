// Hero (home) — contenuto editoriale italiano. Importato direttamente da Hero.jsx.
// I frammenti con enfasi inline usano i token <0>grassetto</0> resi da <Rich>.
export default {
  eyebrow: 'legge · dati · grafo vivo',
  // <br/> reso nel componente; due righe del titolo:
  titleLine1: 'Interroga lo Stato.',
  titleLine2: 'Con le fonti in mano.',
  sub: '<0>OpenLegis</0> risponde sulla legge italiana ed europea — Costituzione, codici, decreti, diritto UE — su un <0>grafo navigabile</0>, intrecciando i <0>dati pubblici reali</0>. Ogni risposta cita la fonte; se non c’è, lo dice.',
  caps: [
    ['§', 'Chiedi la legge', 'Cosa dice la norma, con l’articolo esatto e citabile.'],
    ['⚖', 'Segui un DDL', 'A che punto è un disegno di legge, chi lo firma, come vota il Parlamento.'],
    ['↯', 'Cosa cambia', 'Quali norme un decreto modifica, abroga o sostituisce — dato autoritativo.'],
    ['◉', 'Trova i dati', 'Dataset pubblici reali italiani ed europei, collegati alla norma.'],
  ],
  ctaPrimary: 'Inizia a chiedere →',
  ctaDocs: 'Scopri il progetto',
  ctaExplore: 'Esplora il grafo',
  exLabel: 'prova a chiedere',
  examples: [
    'Cosa dice la Costituzione sul ripudio della guerra?',
    'A che punto è il disegno di legge sul nucleare?',
    'Cosa modifica il DL 19/2024?',
  ],
  // Riga di link nel footer della landing (slug IT; la versione EN è derivata da enPathOf).
  footLinks: [
    ['Manifesto', '/manifesto'],
    ['Come funziona', '/come-funziona'],
    ['Documentazione', '/docs'],
    ['Progetti', '/progetti'],
    ['AI per la legge italiana', '/intelligenza-artificiale-legge-italiana'],
  ],
  // Il testo del footer è spezzato attorno al link a GrowFlow Studio.
  footPre: 'Strumento informativo — non costituisce consulenza legale. · Un progetto di',
}
