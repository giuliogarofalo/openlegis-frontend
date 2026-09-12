// Manifesto.jsx — contenuto italiano della pagina «Manifesto». Non è una scheda tecnica: è
// una dichiarazione di intenti. Prima persona, voce composta (niente trascrizione del
// parlato). Arco: convinzione → problema → metodo → obiettivo → ambizione → collaborazione →
// etica → missione. Il lato commerciale resta fuori (vive in docs/strategy/VISIONE.md).
// Bilingue (/manifesto ↔ /en/manifesto). La fonte canonica è MANIFESTO.md nella root del
// repo: tenere i due allineati.
export default {
  lang: 'it', path: '/manifesto',
  title: 'Manifesto · Open·Parlamento',
  desc: 'Il manifesto di Open·Parlamento, in prima persona: capire le leggi non può restare un privilegio per pochi. Perché ho costruito un grafo delle relazioni tra le norme per mostrare dove il sistema non torna, perché lo apro in open source, e i paletti che vengono prima di tutto.',
  keywords: 'manifesto open parlamento, knowledge graph diritto italiano, relazioni tra norme, incongruenze leggi, cavilli, lacune normative, accountability, open data pubblici, infrastruttura aperta, MCP, open source, fonti citabili ELI CELEX Akoma Ntoso',
  kicker: 'manifesto · idea · obiettivi',
  h1: 'Manifesto',
  standfirst: 'Le leggi le scrivono in pubblico, ma capirle è un mestiere per pochi. È questo privilegio che voglio rompere.',
  lede: [
    'Un Paese si governa con le sue leggi, e quasi nessuno riesce davvero a leggerle. Non perché siano segrete — sono tutte pubbliche — ma perché sono troppe, si rimandano l’una con l’altra, si modificano, si contraddicono, e nessuno tiene insieme il quadro. Chi ha i mezzi per ricostruirlo — i grandi studi, le lobby, chi le leggi le scrive — quel quadro ce l’ha. Tutti gli altri no. Open·Parlamento nasce per ribaltare questa asimmetria.',
    'L’ho cominciato più di un anno fa, prima che lo facessero in tanti — e l’ho costruito al contrario di tutti. Non un chatbot che ti dà una risposta da prendere sulla fiducia: una mappa delle relazioni tra le norme, fatta per mostrarti dove il sistema non torna. Il sito con i nodi che si muovono è solo la porta. Il prodotto è il motore che c’è sotto.',
  ],
  sections: [
    {
      h: 'Il problema non è la risposta. È la fiducia.',
      body: [
        'Oggi chiunque collega un modello a un archivio di PDF e lo chiama assistente legale. Sotto c’è una tecnica — la chiamano RAG — che pesca i paragrafi più somiglianti alla domanda e te li riassume con tono sicuro. Quel tono sicuro è il problema: non ti dice se ha ignorato la sentenza che ribalta tutto, o la norma che ha abrogato quella che ti sta citando. Ti dà una risposta liscia su un terreno che liscio non è.',
        'Io ho voluto l’opposto. Ho costruito prima le relazioni — cosa modifica cosa, cosa abroga cosa, cosa contraddice cosa — e solo dopo ci ho messo l’agente. Un grafo non ti consola con una frase pulita: ti fa vedere dove le norme reggono e dove crollano. Si legge peggio. Ma la legge vera è scomoda, e una risposta che te lo nasconde ti sta mentendo.',
      ],
    },
    {
      h: 'Cerco dove non torna.',
      body: [
        'La domanda che mi interessa non è cosa dice un articolo: a quella risponde Google. Mi interessa dove non torna. Le contraddizioni tra due norme che nessuno ha mai accostato. Le lacune. I cavilli lasciati per sciatteria, e quelli lasciati apposta. Le leggi scritte da qualcuno per qualcuno.',
        'Per trovarli si ragiona a ritroso: dall’impianto delle leggi fino a chi le ha scritte, a cosa cambiano davvero, a chi ci guadagna. Tutto ricostruito dai dati pubblici, mai dalle accuse: il grafo non dà del ladro a nessuno. Mette in fila i fatti e lascia la conclusione a te. E quando salta fuori un buco, quel buco si rende pubblico perché venga chiuso — non perché qualcuno ci passi. Questa è la riga che viene prima di tutto.',
      ],
    },
    {
      h: 'La legge è un’idea. I dati dicono cosa è diventata.',
      body: [
        'Una norma, da sola, è metà della storia. L’altra metà sono i dati: chi spende, quanto, dove, con quali risultati. Per questo l’agente non legge solo testi di legge — interroga una rete di connettori che ho costruito sopra gli open data italiani, europei e regionali, e va sulla fonte giusta da solo: chiedi di sanità e finisce nei dataset della sanità.',
        'Quei dati, sulla carta, sono già pubblici. Nella pratica vivono su un’infrastruttura vecchia e tenuta male: portali fermi, endpoint che rispondono vuoti, «open data» che di aperto hanno solo il nome. I miei connettori, per ora, fanno da ponte su quel legacy. Ma l’obiettivo finale è un altro: una volta assorbiti i dati che servono, quel livello fragile va sostituito con qualcosa di pubblico, autogestito e nativo per l’AI. Non un altro portale. Una nuova generazione di dato aperto.',
      ],
    },
    {
      h: 'Lo costruisco in pubblico, e non da solo.',
      body: [
        'Questo non è il progetto chiuso di una startup. I connettori sono open source, l’idea è scritta in chiaro, il codice si può leggere, riusare, contestare. RepublicMCP — i server che interrogano direttamente Camera e Senato — è già su GitHub: è la prova in piccolo che il metodo funziona. Dove il Senato non pubblicava il proprio grafo, l’ho ricostruito seguendo il loro schema, e ho segnato i buchi che le istituzioni stesse lasciano tra le relazioni che dichiarano ufficiali.',
        'Apro tutto questo non per generosità astratta, ma per convinzione: un’infrastruttura che si dice pubblica deve poter essere controllata da chiunque, altrimenti è solo un altro recinto privato con una targa diversa. Chi vuole costruirci sopra — una redazione, un ricercatore, una pubblica amministrazione — è il benvenuto. Un’idea tenuta nel cassetto non cambia niente, e questa qualcuno doveva costruirla molto prima.',
      ],
    },
    {
      h: 'I paletti vengono prima.',
      body: [
        'Uno strumento che mette in fila il potere è potente, e va maneggiato con onestà. Per questo i limiti non sono una nota a fondo pagina, sono la prima riga del progetto: si lavora su cariche pubbliche e dati pubblici, mai sui cittadini privati; si rispettano le licenze delle fonti; e un’infrastruttura che si definisce pubblica deve avere una governance vera — qualcuno che la regge, con delle regole — non uno slogan. Ogni affermazione torna a una fonte citabile: ELI, CELEX, Akoma Ntoso. Niente parafrasi spacciate per verità, nessuna consulenza legale, e se la fonte non c’è te lo dico, invece di inventarla. La trasparenza vale solo se è la prima a essere trasparente.',
      ],
    },
  ],
  closingH: 'Per ora l’Italia. Poi il resto.',
  closingP: 'Perché capire il proprio Paese — come funziona, chi lo scrive, a chi conviene — non può restare il mestiere di pochi. Il sito è la porta; quello che c’è dietro è il punto.',
  relatedH: 'Continua',
}
