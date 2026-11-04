// Downloads und wo sie angeboten werden. gated: true = nach dem Newsletter-Start nur per Willkommensmail
// (Link in der Willkommensmail bei Substack/beehiiv hinterlegen). Bis dahin frei, damit nichts tot ist.
export const LEADMAGNETS = [
    {
        id: 'prompt-spickzettel',
        title: 'Prompt-Spickzettel',
        teaser: 'Die 8 Techniken, die 6 Bausteine und 10 Profi-Sätze auf einer Seite. Zum Ausdrucken neben die Tastatur.',
        format: 'PDF über „Drucken → Als PDF speichern“',
        href: '/downloads/prompt-spickzettel',
        gated: false,
        icon: 'prompt',
    },
    {
        id: 'coding-agenten-spickzettel',
        title: 'Coding-Agenten-Spickzettel',
        teaser: 'Claude Code, Codex CLI und Aider auf einer Seite: Installation unter Windows, die wichtigsten Befehle und eine AGENTS.md zum Abschreiben.',
        format: 'PDF über „Drucken → Als PDF speichern“',
        href: '/downloads/coding-agenten-spickzettel',
        gated: false,
        icon: 'werkzeug',
    },
    {
        id: 'prompt-paket',
        title: 'Prompt-Paket: alle Vorlagen als Datei',
        teaser: 'Alle Prompts aus der Bibliothek als Markdown-Datei, zum Einfügen in Notion, Obsidian, ChatGPT-Projekte oder Claude Projects.',
        format: 'Markdown (.md)',
        href: '/downloads/prompt-paket.md',
        gated: true,
        icon: 'post',
    },
    {
        id: 'top-50',
        title: 'Top 50 KI-Verzeichnisse als Tabelle',
        teaser: 'Die 50 besten Verzeichnisse mit Score, Preis und Link als CSV für Excel oder Google Sheets.',
        format: 'CSV',
        href: '/top-50.csv',
        gated: true,
        icon: 'pokal',
    },
]

export const getLeadmagnet = (id) => LEADMAGNETS.find((m) => m.id === id)
