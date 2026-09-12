// Landing SEO «Intelligenza artificiale per la legge italiana» (Fase 3 SEO).
// Target query: "intelligenza artificiale legge italiana", "AI legislazione italiana",
// "agente AI diritto italiano", "chatbot leggi italiane", "interrogare la legge con AI",
// "AI parlamento italiano". Importato da src/pages/AiLeggeItaliana.jsx.
// I frammenti con enfasi inline usano i token <0>grassetto</0> resi da <Rich>.
export default {
  path: '/intelligenza-artificiale-legge-italiana',
  appPath: '/app',
  inLanguage: 'it-IT',
  title: 'Intelligenza artificiale per la legge italiana',
  desc: 'Open·Parlamento è la risorsa di intelligenza artificiale per il diritto italiano: interroga Costituzione, codici, decreti e dati del Parlamento con fonti reali e citabili (ELI/CELEX).',
  keywords:
    'intelligenza artificiale legge italiana, AI diritto italiano, AI legislazione italiana, agente AI legge, chatbot leggi italiane, interrogare la legge con AI, AI parlamento italiano, ricerca giuridica AI, API legge italiana, MCP server diritto',
  kicker: 'intelligenza artificiale · diritto · fonti reali',
  h1: 'Intelligenza artificiale per la legge italiana',
  breadcrumbHome: 'Open·Parlamento',
  breadcrumbSelf: 'AI per la legge italiana',
  lead:
    '<0>Open·Parlamento</0> è un agente di intelligenza artificiale che risponde sulla <0>legge italiana ed europea</0> — Costituzione, codici, decreti, diritto UE e iter parlamentare — citando sempre la <0>fonte ufficiale e verificabile</0>. Niente risposte inventate: ogni affermazione poggia su un riferimento reale (ELI/CELEX) su un grafo di conoscenza navigabile.',
  sections: [
    {
      h: 'Cosa puoi chiedere',
      body: [
        'Fai una domanda in linguaggio naturale e ottieni la risposta con l’<0>articolo esatto</0> e il link alla fonte: «Cosa dice la Costituzione sul ripudio della guerra?», «Cosa modifica il DL 19/2024?», «A che punto è un disegno di legge?».',
        'L’AI non si limita a generare testo: recupera la norma, ne mostra il <0>testo consolidato</0> e ricostruisce le <0>relazioni di modifica</0> (cosa abroga, sostituisce, converte) tra atti.',
      ],
      cta: [['Inizia a interrogare la legge', '/app'], ['Esplora il grafo', '/app?view=explore']],
    },
    {
      h: 'Perché è diverso da un chatbot generico',
      body: [
        'Un assistente generalista può <0>allucinare</0> articoli e numeri di legge. Open·Parlamento parte dai <0>dati autoritativi</0>: il corpus normativo viene da Normattiva in formato Akoma Ntoso (ELI), il diritto UE da EUR-Lex (CELEX), l’attività parlamentare dai dati aperti di Camera e Senato.',
        'Le relazioni tra norme sono estratte in modo <0>deterministico</0>, a livello di singolo articolo e con il testo-prova allegato. Se una fonte non esiste, l’agente lo dice invece di inventarla.',
      ],
      cta: [['Come funziona', '/docs/come-funziona'], ['I dati e le fonti', '/docs/dati']],
    },
    {
      h: 'Per sviluppatori e altre AI',
      body: [
        'Open·Parlamento è pensato anche per essere <0>consumato da altre intelligenze artificiali</0>: un’API pubblica read-only espone norme, articoli e relazioni, e un <0>server MCP</0> permette ad agenti come Claude e ChatGPT di interrogare la legge italiana con fonti citabili.',
        'I dati sono aperti (CC BY 4.0) e citabili: ideale per ricerca giuridica, legal-tech e OSINT legislativo.',
      ],
      cta: [['API pubblica', '/docs/api'], ['Server MCP', '/docs/mcp-server'], ['Open data', '/open-data']],
    },
    {
      h: 'Esplora il corpus',
      body: [
        'Naviga le fonti già indicizzate: la <0>Costituzione</0>, i principali <0>codici</0>, leggi e decreti — ciascuno con testo per-articolo, relazioni di modifica e link alla fonte ufficiale.',
      ],
      cta: [['Costituzione', '/costituzione'], ['Codici', '/codici'], ['Tutte le norme', '/norme'], ['Parlamento', '/parlamento']],
    },
  ],
  faq: [
    {
      q: 'Esiste un’intelligenza artificiale per la legge italiana?',
      a: 'Sì. Open·Parlamento è un agente AI che risponde su Costituzione, codici, decreti e diritto UE citando sempre la fonte ufficiale e verificabile (ELI/CELEX), su un grafo di conoscenza navigabile.',
    },
    {
      q: 'L’AI può sbagliare o inventare le leggi?',
      a: 'I modelli generici possono allucinare riferimenti normativi. Open·Parlamento parte da dati autoritativi (Normattiva in Akoma Ntoso, EUR-Lex, dati aperti del Parlamento) e cita sempre la fonte; se una norma non esiste nel corpus, lo dichiara invece di inventarla.',
    },
    {
      q: 'Posso usare Open·Parlamento dalla mia AI o dai miei strumenti?',
      a: 'Sì. C’è un’API pubblica read-only e un server MCP che consente ad agenti come Claude o ChatGPT di interrogare la legge italiana con fonti citabili. I dati sono aperti (CC BY 4.0).',
    },
    {
      q: 'Open·Parlamento è una consulenza legale?',
      a: 'No. È uno strumento informativo che cita sempre la fonte ufficiale e invita a verificarla; non sostituisce un parere legale.',
    },
  ],
  ctaPrimary: 'Inizia a interrogare la legge →',
  disclaimer:
    'Strumento informativo basato su fonti pubbliche (Normattiva, EUR-Lex, dati aperti di Camera e Senato). Non costituisce consulenza legale: verifica sempre sulla fonte ufficiale.',
}
