// Manifesto.jsx — English content of the «Manifesto» page. Not a tech sheet: a statement of
// intent. First person, composed voice (no transcription of speech). Arc: conviction →
// problem → method → objective → ambition → collaboration → ethics → mission. The commercial
// side stays out (it lives in docs/strategy/VISIONE.md). Bilingual (/manifesto ↔
// /en/manifesto). Canonical source is MANIFESTO.md in the repo root: keep the two aligned.
export default {
  lang: 'en', path: '/en/manifesto',
  title: 'Manifesto · Open·Parlamento',
  desc: 'The Open·Parlamento manifesto, first person: understanding the law can’t stay a privilege for the few. Why I built a graph of the relations between norms to show where the system doesn’t add up, why I open it in open source, and the limits that come before everything.',
  keywords: 'open parlamento manifesto, italian law knowledge graph, relations between norms, legal inconsistencies, loopholes, regulatory gaps, accountability, public open data, open infrastructure, MCP, open source, citable sources ELI CELEX Akoma Ntoso',
  kicker: 'manifesto · idea · objectives',
  h1: 'Manifesto',
  standfirst: 'Laws are written in public, but understanding them is a trade for the few. That’s the privilege I want to break.',
  lede: [
    'A country is governed by its laws, and almost no one can actually read them. Not because they’re secret — they’re all public — but because there are too many, they refer to one another, they amend and contradict each other, and no one holds the whole picture together. Those with the means to reconstruct it — the big firms, the lobbies, the people who write the laws — they have that picture. Everyone else doesn’t. Open·Parlamento exists to overturn that asymmetry.',
    'I started it more than a year ago, before many others did — and I built it the opposite way to everyone. Not a chatbot that hands you an answer to take on trust: a map of the relations between norms, built to show you where the system doesn’t add up. The site with the moving nodes is just the door. The product is the engine underneath.',
  ],
  sections: [
    {
      h: 'The problem isn’t the answer. It’s the trust.',
      body: [
        'Today anyone connects a model to an archive of PDFs and calls it a legal assistant. Underneath there’s a technique — they call it RAG — that grabs the paragraphs most similar to your question and sums them up in a confident tone. That confident tone is the problem: it doesn’t tell you whether it ignored the ruling that overturns everything, or the law that repealed the one it’s quoting. It gives you a smooth answer on ground that isn’t smooth.',
        'I wanted the opposite. I built the relations first — what amends what, what repeals what, what contradicts what — and only then put the agent on top. A graph doesn’t comfort you with a clean sentence: it shows you where the norms hold and where they collapse. It reads worse. But the real law is uncomfortable, and an answer that hides that is lying to you.',
      ],
    },
    {
      h: 'I look for where it doesn’t add up.',
      body: [
        'The question I care about isn’t what an article says: Google answers that. I care about where it doesn’t add up. The contradictions between two norms nobody ever set side by side. The gaps. The loopholes left out of carelessness, and the ones left on purpose. The laws written by someone for someone.',
        'To find them you reason backwards: from the architecture of the laws to who wrote them, to what they actually change, to who profits. All reconstructed from public data, never from accusations: the graph calls no one a thief. It lines up the facts and leaves the conclusion to you. And when a hole surfaces, that hole is made public so it can be closed — not so someone can slip through it. That’s the line that comes before everything.',
      ],
    },
    {
      h: 'The law is an idea. The data says what it became.',
      body: [
        'A norm, on its own, is half the story. The other half is the data: who spends, how much, where, with what results. That’s why the agent doesn’t only read legal texts — it queries a network of connectors I built over Italian, European and regional open data, and it reaches the right source on its own: ask about healthcare and it ends up in the healthcare datasets.',
        'That data, on paper, is already public. In practice it lives on an old, badly kept infrastructure: dead portals, endpoints that answer empty, «open data» that’s open in name only. My connectors, for now, bridge that legacy. But the ultimate goal is another: once the data that matters has been absorbed, that fragile layer should be replaced with something public, self-managed and AI-native. Not another portal. A new generation of open data.',
      ],
    },
    {
      h: 'I build it in public, and not alone.',
      body: [
        'This isn’t the closed project of a startup. The connectors are open source, the idea is written in the open, the code can be read, reused, contested. RepublicMCP — the servers that query the Italian Chamber and Senate directly — is already on GitHub: it’s the proof in miniature that the method works. Where the Senate didn’t publish its own graph, I rebuilt it following their schema, and I marked the holes the institutions themselves leave among the relations they declare official.',
        'I open all of this not out of abstract generosity, but out of conviction: an infrastructure that calls itself public must be open to scrutiny by anyone, otherwise it’s just another private enclosure with a different plaque. Anyone who wants to build on it — a newsroom, a researcher, a public administration — is welcome. An idea kept in a drawer changes nothing, and this one should have been built long ago.',
      ],
    },
    {
      h: 'The limits come first.',
      body: [
        'A tool that lines up power is powerful, and it has to be handled honestly. That’s why the limits aren’t a footnote, they’re the first line of the project: we work on public roles and public data, never on private citizens; we respect the licenses of the sources; and an infrastructure that calls itself public must have real governance — someone who runs it, with rules — not a slogan. Every claim resolves to a citable source: ELI, CELEX, Akoma Ntoso. No paraphrase passed off as truth, no legal advice, and if the source isn’t there I tell you, instead of inventing it. Transparency only counts if it’s the first thing to be transparent.',
      ],
    },
  ],
  closingH: 'For now Italy. Then the rest.',
  closingP: 'Because understanding your own country — how it works, who writes it, who it favors — can’t stay the trade of a few. The site is the door; what’s behind it is the point.',
  relatedH: 'Continue',
}
