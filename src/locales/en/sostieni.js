// Sostieni.jsx — English content of the "Support" page.
export default {
  lang: 'en', path: '/en/support', alt: '/sostieni',
  title: 'Support OpenLegis',
  desc: 'OpenLegis is an open-source, free and independent project: making the Italian State queryable by anyone, with real sources. Here is how you can support and contribute.',
  kicker: 'open source · independent',
  h1: 'Support OpenLegis',
  lead: 'OpenLegis is open source, free and independent. The idea is simple: the State — law and data — should be queryable by anyone, not just insiders. Here is how you can help.',
  ways: [
    ['Use it and spread the word', 'The simplest way: use the tool and share it with people who may find it useful (journalists, students, citizens, developers).'],
    ['Contribute', 'It is open source. Add sources/connectors, propose statutes for the corpus (see the coverage map), fix issues, translate. All on GitHub.'],
    ['Help with costs', 'Servers and the domain cost money. A contribution helps keep the service free and independent. (Sponsorship coming soon.)'],
    ['Organizations and grants', 'Are you a foundation, public body or a funding programme for open source / digital commons? Let’s talk: this is open infrastructure with a European dimension.'],
  ],
  infraH: 'Why it is infrastructure, not just an app',
  infraP: 'Beyond the website, OpenLegis ships reusable components: two open-source MCP servers (npm and PyPI), a read-only public API, citable open data (ELI/CELEX, Akoma Ntoso) and a knowledge graph. Open standards, reusable by other projects, beyond Italy too.',
  ctaRepo: 'Code on GitHub ↗', ctaContribuisci: 'How to contribute',
  relH: 'See also',
  faq: [
    { q: 'Is OpenLegis free?', a: 'Yes, it is free and open source (MIT license). Data is public and citable.' },
    { q: 'How can I contribute without coding?', a: 'You can suggest sources and statutes to add, fix mistakes, translate, or simply spread the word.' },
    { q: 'How do I propose a statute for the corpus?', a: 'The coverage map lists the most-cited but missing statutes: find the URN and add it to the seeds (see CONTRIBUTING and CORPUS.md in the repo).' },
  ],
  disclaimer: 'Informational tool — not legal advice.',
}
