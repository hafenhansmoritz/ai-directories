// Beratungs- und Website-Angebote von Jean an einer Stelle: /beratung, /website-erstellen-lassen und die AngebotBox
// lesen hier. Preise nur, wo sie feststehen (Website-Pakete, gleiche Preise wie Jeans Webdesign-Angebot), sonst „Preis auf Anfrage“.

// Formular-Id auf beiden Angebotsseiten. Links wie /beratung#angebot-coding springen zum Formular und wählen vor.
export const ANFRAGE_ID = 'angebot'

export const BERATUNG = [
    {
        key: 'coding',
        emoji: '🤖',
        name: 'KI-Coding-Agenten im Team einführen',
        fuer: 'Für Entwicklerteams und Agenturen',
        wer: 'Ihr wollt Claude Code, Codex oder Gemini CLI nutzen, aber jeder bastelt gerade für sich, und niemand weiß, was es im Monat kostet.',
        ergebnis:
            'Ein Setup, das in eurem echten Repo läuft: AGENTS.md bzw. CLAUDE.md mit euren Regeln, klare Freigaben für den Agenten, ein Kostenrahmen pro Person und eine Einordnung, welche Daten an welchen Anbieter gehen.',
        schritte: [
            ['Erstgespräch', 'Stack, Teamgröße, Ziele und Bedenken. Danach weißt du, ob sich das für euch lohnt.'],
            ['Setup im Repo', 'Agent einrichten, AGENTS.md schreiben, Rechte festlegen und an einer echten Aufgabe aus eurem Backlog zeigen.'],
            ['Übergabe', 'Spickzettel fürs Team, Kostenrahmen und eine Liste offener Punkte für euren Datenschutz.'],
        ],
        links: [
            ['/ratgeber/claude-code-anleitung', 'Claude-Code-Anleitung'],
            ['/ratgeber/claude-code-kosten', 'Was Claude Code kostet'],
            ['/ratgeber/agents-md-claude-md', 'AGENTS.md und CLAUDE.md'],
        ],
    },
    {
        key: 'automation',
        emoji: '⚙️',
        name: 'KI-Workflows und Automationen für Selbstständige',
        fuer: 'Für Selbstständige und kleine Teams',
        wer: 'Du schreibst jede Woche dieselben Angebote, Mails, Protokolle oder Social-Posts und ahnst, dass KI das abkürzen könnte.',
        ergebnis:
            'Zwei bis drei Abläufe, die wirklich laufen: Prompt-Vorlagen für deine Aufgaben, wo es passt eine Automation mit Make, n8n oder Zapier, und eine kurze Anleitung, damit du alles ohne Jean pflegen kannst.',
        schritte: [
            ['Bestandsaufnahme', 'Welche Aufgaben fressen Zeit, welche Tools nutzt du schon, was darf die KI sehen und was nicht.'],
            ['Bauen', 'Vorlagen und Automationen mit deinen Tools, getestet an echten Fällen aus deinem Alltag.'],
            ['Übergabe', 'Anleitung, Zugänge bleiben bei dir, und ein Blick drauf, was es laufend kostet.'],
        ],
        links: [
            ['/rechner/automatisierung', 'Automatisierungs-Rechner'],
            ['/tool-vergleiche/make-vs-zapier-vs-n8n', 'Make vs. Zapier vs. n8n'],
            ['/prompts', 'Prompt-Bibliothek'],
        ],
    },
    {
        key: 'seo',
        emoji: '🔎',
        name: 'SEO und Sichtbarkeit in KI-Antworten (GEO)',
        fuer: 'Für Firmen, Shops und KI-Tools',
        wer: 'Du willst bei Google gefunden und in ChatGPT, Perplexity oder Googles KI-Übersichten genannt werden. Im Moment nennen die eher die Konkurrenz.',
        ergebnis:
            'Ein Bericht mit Prioritäten statt 80 Seiten Tool-Export: technische Baustellen, fehlende Inhalte, strukturierte Daten, llms.txt und die Fragen, bei denen KI-Assistenten heute andere empfehlen als dich.',
        schritte: [
            ['Check', 'Technik und Inhalte deiner Seite, dazu Stichproben mit echten Kundenfragen in mehreren KI-Assistenten.'],
            ['Bericht', 'Was zuerst, was später, was gar nicht. Mit Begründung, damit du es intern vertreten kannst.'],
            ['Umsetzung', 'Machst du selbst, dein Team oder Jean. Entscheidest du nach dem Bericht.'],
        ],
        links: [
            ['/ratgeber/sichtbar-in-ki-antworten-werbung-seo', 'Sichtbar in KI-Antworten'],
            ['/ratgeber/backlinks-ki-verzeichnisse-seo', 'Backlinks aus KI-Verzeichnissen'],
        ],
    },
]

// Auswahl im Anfrageformular auf /beratung (Format wie ANLIEGEN in LeadForm).
export const BERATUNG_OPTIONEN = [
    ['erstgespraech', 'Kostenloses Erstgespräch (30 Minuten)'],
    ...BERATUNG.map((a) => [a.key, a.name]),
    ['website', 'Website erstellen lassen'],
    ['launch', 'Launch-Service für mein KI-Tool'],
    ['sonstiges', 'Etwas anderes'],
]

// Website-Pakete. Preise und Leistungen exakt wie auf Jeans Webdesign-Seite (Entscheidung P5), nur in Du-Form.
export const WEBSITE_PAKETE = [
    {
        key: 'anfrage-seite',
        name: 'Anfrage-Seite',
        preis: 690,
        kurz: 'Deine Website bleibt, dazu kommt ein schneller Weg zur Anfrage vom Handy.',
        liste: [
            'Anfrage in 4 Klicks: Vorhaben, Zeitraum, Ort, Kontakt',
            'Fragen und Auswahl passend zu deinen Leistungen',
            'In deinen Farben, mit Logo und Anruf-Knopf',
            'Anfragen landen direkt in deinem E-Mail-Postfach',
            'Ohne Cookies und ohne Cookie-Banner',
            'Impressum und Datenschutz eingebunden',
            '1 Korrekturrunde',
        ],
    },
    {
        key: 'onepager',
        name: 'Onepager',
        preis: 890,
        kurz: 'Eine klare Seite für alles Wichtige: was, wo, wann, Telefonnummer.',
        liste: [
            'Alles aus der Anfrage-Seite',
            'Leistungen, Öffnungszeiten und Anfahrt auf einer Seite',
            'Bildergalerie mit bis zu 10 Fotos, beschriftet',
            'Die Texte schreibt Jean aus deinen Stichworten',
            'Schnell auf dem Handy, ohne externe Schriften',
            'Check deines Google-Unternehmensprofils mit Hinweisen',
            '1 Korrekturrunde',
        ],
    },
    {
        key: 'komplett',
        name: 'Webseite komplett',
        preis: 1190,
        hinweis: 'Passt meistens',
        kurz: 'Die alte Seite geht in Rente, die neue übernimmt alles.',
        liste: [
            'Alles aus dem Onepager',
            'Bis zu 5 Unterseiten, etwa Leistungen, Referenzen, Über uns, Kontakt',
            'Jean übernimmt deine bisherigen Inhalte und Bilder',
            'Alte Adressen werden weitergeleitet, nichts geht verloren',
            'Grundlagen für Google: Seitentitel, Beschreibungen, Ortsangaben',
            'Umzug auf deine Domain, HTTPS inklusive',
            '2 Korrekturrunden',
        ],
    },
]

export const WEBSITE_OPTIONEN = [
    ...WEBSITE_PAKETE.map((p) => [p.key, `${p.name} (${euro(p.preis)})`]),
    ['unsicher', 'Weiß noch nicht, welches Paket passt'],
    ['betreuung', 'Betreuung für eine bestehende Seite'],
    ['sonstiges', 'Etwas anderes'],
]

export function euro(n) {
    return `${n.toLocaleString('de-DE')} €`
}

// Texte der AngebotBox je Thema. href zeigt auf das passende Angebot, der Hash wählt es im Formular vor.
export const ANGEBOT_THEMEN = {
    coding: {
        titel: 'Lieber machen lassen? 🛠️',
        text: 'Jean richtet Claude Code oder Codex für dein Team ein: AGENTS.md, Freigaben, Kostenrahmen und Datenschutz-Check inklusive.',
        href: `/beratung#${ANFRAGE_ID}-coding`,
        cta: 'Kostenloses Erstgespräch →',
    },
    automation: {
        titel: 'Keine Zeit, das selbst zu bauen? ⚙️',
        text: 'Jean baut mit dir KI-Workflows für die Aufgaben, die jede Woche wiederkommen, mit den Tools, die du schon hast.',
        href: `/beratung#${ANFRAGE_ID}-automation`,
        cta: 'Kostenloses Erstgespräch →',
    },
    seo: {
        titel: 'Wirst du in KI-Antworten genannt? 🔎',
        text: 'Jean prüft, ob Google, ChatGPT und Perplexity deine Seite finden, und sagt dir, was zuerst fehlt.',
        href: `/beratung#${ANFRAGE_ID}-seo`,
        cta: 'Kostenloses Erstgespräch →',
    },
    website: {
        titel: 'Website gesucht? 🌐',
        text: `Jean baut Websites für Selbstständige, kleine Firmen und KI-Tool-Gründer. Festpreis ab ${euro(WEBSITE_PAKETE[0].preis)}, Vorschau vor dem Bezahlen.`,
        href: '/website-erstellen-lassen',
        cta: 'Pakete ansehen →',
    },
}

// Coding-Ratgeber (Slugs aus lib/ratgeber-coding.js) → Thema der AngebotBox. Für das Ratgeber-Template gedacht:
// const thema = RATGEBER_THEMA[artikel.slug]; if (thema) <AngebotBox thema={thema} />
export const RATGEBER_THEMA = {
    'was-wurde-aus-mentat': 'coding',
    'terminal-coding-agenten-vergleich': 'coding',
    'claude-code-anleitung': 'coding',
    'claude-code-installieren': 'coding',
    'claude-code-kosten': 'coding',
    'codex-cli-anleitung': 'coding',
    'claude-code-vs-codex': 'coding',
    'agents-md-claude-md': 'coding',
    'gemini-cli-antigravity-cli': 'coding',
    'aider-ollama-lokal': 'coding',
    'cursor-alternative-kostenlos': 'coding',
    'sichtbar-in-ki-antworten-werbung-seo': 'seo',
}
