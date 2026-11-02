// Gratis-Guides als PDF zur Lead-Generierung. Erstellt mit Gamma aus den geprüften Ratgebern,
// Metadaten der PDFs entfernt. Download nach Eintrag der E-Mail (FormSubmit an LEAD_EMAIL).
// bereit: true erst, wenn die PDF unter public/guides liegt; vorher erscheint der Guide nirgends.
export const GUIDES = [
    {
        id: 'ki-agenten-fahrplan',
        titel: 'KI-Agenten-Fahrplan 2026 für Selbstständige',
        teaser: 'Welche KI-Agenten in Deutschland laufen, welche noch gesperrt sind, wie du sicher delegierst und in vier Wochen zum ersten eigenen Agenten kommst.',
        punkte: ['Verfügbarkeitskarte ChatGPT, Claude, Gemini', 'Make, Zapier und n8n als Eigenbau', 'Freigaben, Datenschutz, Prompt Injection', '4-Wochen-Fahrplan zum Abhaken'],
        datei: '/guides/mentat-codes-ki-agenten-fahrplan-2026.pdf',
        bild: '/guides/ki-agenten-fahrplan.png',
        ratgeber: 'ki-agenten-selbststaendige-deutschland',
        emoji: '🤖',
        bereit: false,
    },
    {
        id: 'sichtbar-in-ki-antworten',
        titel: 'Sichtbar in KI-Antworten: die 30-Tage-Checkliste',
        teaser: 'So taucht dein Angebot in ChatGPT und im Google KI-Modus auf, organisch und bezahlt. Mit Test für deine Marke, Shop-Daten und Plan für 30 Tage.',
        punkte: ['ChatGPT Ads in Deutschland', 'Google KI-Übersichten und KI-Modus', 'Prüfen, ob die KI dich kennt', '30-Tage-Plan zum Abhaken'],
        datei: '/guides/mentat-codes-sichtbar-in-ki-antworten.pdf',
        bild: '/guides/sichtbar-in-ki-antworten.png',
        ratgeber: 'sichtbar-in-ki-antworten-werbung-seo',
        emoji: '🔎',
        bereit: false,
    },
    {
        id: 'ki-skills-starterkit',
        titel: 'KI-Skills-Starterkit: 12 Skills in 10 Minuten',
        teaser: 'Alle 12 deutschen Skills im Überblick, Schritt für Schritt installiert in ChatGPT, Claude, Gemini und Coding-Tools, plus Vorlage für deinen eigenen Skill.',
        punkte: ['12 Skills für SEO, Texte, Launch, Vertrieb', 'Installation je Plattform', 'Eigenen Skill in 30 Minuten schreiben', 'Custom GPTs vor dem 11.12. umziehen'],
        datei: '/guides/mentat-codes-ki-skills-starterkit.pdf',
        bild: '/guides/ki-skills-starterkit.png',
        ratgeber: 'ki-skills-wiederkehrende-aufgaben',
        emoji: '🧩',
        bereit: false,
    },
]

export const getGuides = () => GUIDES.filter((g) => g.bereit)
export const getGuide = (id) => getGuides().find((g) => g.id === id) || null
export const guideFuerRatgeber = (slug) => getGuides().find((g) => g.ratgeber === slug) || null
