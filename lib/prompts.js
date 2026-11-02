// Prompt-Bibliothek. Jeder Prompt ist eine Vorlage mit Feldern in geschweiften Klammern ({thema}).
// Die Seite füllt die Felder aus, zeigt die Vorschau und schickt das Ergebnis an ChatGPT, Claude und Co.
// tools: passende Werkzeuge aus db/tools.json (gleiche slugs), damit jede Prompt-Seite Partnerlinks tragen kann.

export const PROMPT_KATEGORIEN = {
    seo: { name: 'SEO', icon: 'lupe' },
    content: { name: 'Content & Text', icon: 'post' },
    video: { name: 'Video & YouTube', icon: 'play' },
    launch: { name: 'Launch & Marketing', icon: 'rakete' },
    business: { name: 'Business & Arbeit', icon: 'werkzeug' },
    shop: { name: 'Onlineshop & E-Commerce', icon: 'deal' },
    karriere: { name: 'Bewerbung & Karriere', icon: 'pokal' },
    lernen: { name: 'Lernen & Erklären', icon: 'lupe' },
    technik: { name: 'Excel, Code & Technik', icon: 'werkzeug' },
}

// Techniken, die in den Prompts stecken. Die Seite erklärt sie kurz, damit man beim Benutzen lernt.
export const TECHNIKEN = {
    rolle: ['Rolle', 'Die KI bekommt eine Fachrolle. Antworten werden genauer und im passenden Fachjargon.'],
    kontext: ['Kontext', 'Zielgruppe, Ziel und Rahmen stehen im Prompt. Ohne Kontext rät die KI, mit Kontext trifft sie.'],
    format: ['Ausgabeformat', 'Tabelle, Liste oder feste Abschnitte: Die KI liefert direkt in der Form, die du weiterverarbeitest.'],
    rueckfragen: ['Rückfragen', 'Die KI fragt erst nach, statt Lücken zu erfinden. Kostet eine Runde, spart drei Korrekturen.'],
    schritte: ['Schritt für Schritt', 'Die Aufgabe ist in Arbeitsschritte zerlegt. Das senkt Denkfehler bei mehrstufigen Aufgaben.'],
    kritik: ['Selbstkritik', 'Die KI prüft ihr eigenes Ergebnis gegen Kriterien und bessert nach, bevor du es siehst.'],
    beispiele: ['Beispiele', 'Ein oder zwei Muster zeigen Stil und Länge besser als jede Beschreibung.'],
    varianten: ['Varianten', 'Mehrere Versionen auf einmal. Du wählst aus, statt neu zu fragen.'],
}

const PROMPTS = [
    {
        slug: 'gpt-anweisungen-zu-skill',
        title: 'Custom-GPT-Anweisungen in einen Skill umwandeln',
        kategorie: 'technik',
        ziel: 'Die Anweisungen eines Custom GPTs vor der Abschaltung in eine saubere, anbieterunabhängige Skill-Datei (SKILL.md) übertragen.',
        techniken: ['rolle', 'format', 'schritte', 'kritik'],
        felder: [
            { key: 'anweisungen', label: 'Die bisherigen GPT-Anweisungen (einfügen)', beispiel: 'Du bist mein Produkttexter. Schreib locker, Du-Form, keine Superlative. Nutze die Produktliste aus den Dateien.', mehrzeilig: true },
            { key: 'zweck', label: 'Wofür nutzt du den GPT?', beispiel: 'Produktbeschreibungen für unseren Onlineshop mit E-Bike-Zubehör' },
            { key: 'dateien', label: 'Welche Wissensdateien hängen dran?', beispiel: 'produktliste.csv, styleguide.pdf' },
        ],
        vorlage: `Du bist Experte für Agent Skills, das offene Format für Anweisungen an KI-Agenten.

Hier sind die Anweisungen meines bisherigen Custom GPTs:
---
{anweisungen}
---

Zweck des Assistenten: {zweck}
Bisherige Wissensdateien: {dateien}

Aufgabe:
1. Fass zusammen, was der Assistent tun soll, in höchstens drei Sätzen.
2. Schreib daraus eine SKILL.md mit YAML-Kopf (name in Kleinbuchstaben mit Bindestrichen, description mit höchstens zwei Sätzen, die sagt, wann der Skill geladen werden soll) und darunter klaren Anweisungen in Abschnitten: Ziel, Vorgehen, Regeln, Ausgabeformat, Verhalten bei fehlenden Infos.
3. Liste die Wissensdateien auf, die als Referenzdateien in denselben Ordner gehören, und sag in den Anweisungen, wann welche Datei gelesen wird.
4. Prüf am Ende: Gibt es Anweisungen, die nur in ChatGPT funktionieren (etwa Actions oder ein bestimmtes Modell)? Markiere sie und schlag eine anbieterneutrale Formulierung vor.

Gib zuerst die fertige SKILL.md in einem Codeblock aus, dann die Liste der Referenzdateien, dann deine Hinweise aus Schritt 4.`,
        tools: ['chatgpt', 'claude'],
    },
    {
        slug: 'ki-modell-umstellen-testplan',
        title: 'Testplan für den Umstieg auf ein neues KI-Modell',
        kategorie: 'technik',
        ziel: 'Eine Automation oder App sicher von einem abgekündigten Modell auf ein neues umstellen, ohne dass Format oder Qualität kippen.',
        techniken: ['kontext', 'schritte', 'format', 'kritik'],
        felder: [
            { key: 'einsatz', label: 'Wofür wird das Modell genutzt?', beispiel: 'Make-Szenario, das Kundenanfragen in Kategorien sortiert und als JSON in Google Sheets schreibt' },
            { key: 'alt', label: 'Bisheriges Modell', beispiel: 'gpt-4o-mini' },
            { key: 'neu', label: 'Neues Modell', beispiel: 'gpt-6-luna' },
        ],
        vorlage: `Ich muss ein KI-Modell in einer bestehenden Anwendung austauschen.

Einsatz: {einsatz}
Bisheriges Modell: {alt}
Neues Modell: {neu}

Erstell mir einen Testplan:
1. Welche 8 bis 10 Testfälle brauche ich? Mische typische Fälle, Grenzfälle und zwei absichtlich schwierige Eingaben. Gib sie als Tabelle aus: Nr. | Eingabe | Was das Ergebnis enthalten muss.
2. Woran erkenne ich, dass das Ausgabeformat noch passt (etwa gültiges JSON, Feldnamen, Länge)? Formuliere prüfbare Kriterien.
3. Welche Unterschiede zwischen den Modellen sind typisch (Länge, Tonfall, Umgang mit fehlenden Infos), und wie fange ich sie im Prompt ab?
4. Schreib eine Checkliste für die Umstellung: Reihenfolge, Testlauf, Rückfallplan, wer informiert werden muss.

Erfinde keine Preise oder Fristen. Wo du Angaben des Anbieters brauchst, sag mir, auf welcher offiziellen Seite ich sie prüfen soll.`,
        tools: ['make', 'zapier', 'n8n'],
    },
    {
        slug: 'chatgpt-anzeige-texten',
        title: 'Anzeigentexte für Werbung in ChatGPT',
        kategorie: 'launch',
        ziel: 'Anzeigen für ChatGPT Ads schreiben, die zu den Fragen passen, die Menschen im Chat stellen, ehrlich und ohne Übertreibung.',
        techniken: ['rolle', 'kontext', 'varianten', 'kritik'],
        felder: [
            { key: 'angebot', label: 'Was bewirbst du?', beispiel: 'Online-Kurs „Buchhaltung für Selbstständige“, 4 Wochen, 149 Euro' },
            { key: 'zielgruppe', label: 'Für wen?', beispiel: 'Solo-Selbstständige im ersten Jahr, die Angst vor der Steuer haben' },
            { key: 'fragen', label: 'Welche Fragen stellen diese Menschen in ChatGPT?', beispiel: 'Wie mache ich meine Buchhaltung selbst? Brauche ich als Freelancer einen Steuerberater?', mehrzeilig: true },
        ],
        vorlage: `Du bist Performance-Texter und kennst Anzeigen, die in KI-Chats neben Antworten erscheinen.

Angebot: {angebot}
Zielgruppe: {zielgruppe}
Typische Fragen der Zielgruppe im Chat:
{fragen}

Aufgabe:
1. Ordne jede Frage einer Phase zu: Problem verstehen, Lösungen vergleichen oder Kaufentscheidung.
2. Schreib pro Phase drei Anzeigen-Varianten mit Überschrift (höchstens 40 Zeichen), Text (höchstens 120 Zeichen) und Handlungsaufforderung.
3. Die Anzeige muss die Frage ernst nehmen und einen konkreten Nutzen nennen. Keine Superlative, keine erfundenen Rabatte oder Zahlen.
4. Schlag zu jeder Phase vor, was auf der Zielseite als Erstes stehen muss, damit die Anzeige ihr Versprechen hält.
5. Prüf zum Schluss jede Variante: Ist sie als Werbung klar erkennbar und frei von Behauptungen, die ich nicht belegen kann? Streich, was nicht passt.

Ausgabe als Tabelle pro Phase.`,
        tools: ['chatgpt'],
    },
    {
        slug: 'keyword-cluster',
        title: 'Keyword-Cluster für eine Themenseite',
        kategorie: 'seo',
        ziel: 'Aus einem Hauptkeyword eine Clusterstruktur mit Suchintention, Seitentyp und interner Verlinkung bauen.',
        techniken: ['rolle', 'kontext', 'format', 'schritte'],
        felder: [
            { key: 'keyword', label: 'Hauptkeyword', beispiel: 'E-Bike Akku' },
            { key: 'website', label: 'Website / Branche', beispiel: 'Onlineshop für E-Bike-Ersatzteile' },
            { key: 'land', label: 'Markt', beispiel: 'Deutschland' },
        ],
        vorlage: `Du bist ein erfahrener SEO-Stratege für den Markt {land}.

Aufgabe: Erstelle für das Hauptkeyword „{keyword}“ ein Keyword-Cluster für {website}.

Geh so vor:
1. Sammle 25 bis 40 verwandte Suchbegriffe (Long-Tail, Fragen, Vergleiche, transaktionale Begriffe).
2. Ordne jedem Begriff die Suchintention zu: informational, kommerziell, transaktional oder navigational.
3. Gruppiere die Begriffe in 4 bis 8 Cluster, die jeweils eine eigene Seite verdienen.
4. Schlage pro Cluster Seitentyp, H1 und URL-Slug vor.
5. Zeige, welche Seiten aufeinander verlinken sollen (Pillar-Seite zuerst).

Ausgabe als Tabelle: Cluster | Begriffe | Intention | Seitentyp | H1 | Slug.
Darunter die Verlinkungsstruktur als Liste. Erfinde keine Suchvolumen; markiere Begriffe, deren Nachfrage ich mit einem Tool prüfen sollte.`,
        tools: ['semrush', 'se-ranking', 'surfer-seo'],
    },
    {
        slug: 'meta-title-description',
        title: '10 Title-Tags und Meta-Descriptions mit Klick-Anreiz',
        kategorie: 'seo',
        ziel: 'Snippets schreiben, die in Google und KI-Suche auffallen, ohne Zeichenlimits zu reißen.',
        techniken: ['rolle', 'format', 'varianten', 'kritik'],
        felder: [
            { key: 'seite', label: 'Worum geht es auf der Seite?', beispiel: 'Ratgeber: Welcher Newsletter-Anbieter passt zu Gründern' },
            { key: 'keyword', label: 'Hauptkeyword', beispiel: 'Newsletter Anbieter Vergleich' },
            { key: 'usp', label: 'Was macht die Seite besonders?', beispiel: 'ehrlicher Vergleich mit Gratis-Tarifen und Preisen' },
        ],
        vorlage: `Du bist SEO-Texter mit Fokus auf Klickrate.

Seite: {seite}
Hauptkeyword: {keyword}
Besonderheit: {usp}

Schreibe 10 Varianten aus Title-Tag (höchstens 60 Zeichen) und Meta-Description (höchstens 155 Zeichen).
Regeln: Keyword möglichst weit vorn, ein konkreter Nutzen, keine Clickbait-Versprechen, keine Großbuchstaben-Wörter.
Nutze unterschiedliche Ansätze: Zahl, Frage, Nutzen, Vergleich, Jahreszahl, Neugier.

Ausgabe als Tabelle mit Zeichenzahl pro Feld. Prüfe danach jede Zeile gegen die Limits und kürze, was zu lang ist. Empfiehl zum Schluss deine Top 2 mit Begründung.`,
        tools: ['semrush', 'surfer-seo'],
    },
    {
        slug: 'blogartikel-gliederung',
        title: 'Blogartikel-Gliederung, die Fragen wirklich beantwortet',
        kategorie: 'content',
        ziel: 'Eine Gliederung, die Suchintention, Expertise und KI-Zitierfähigkeit gleichzeitig abdeckt.',
        techniken: ['rolle', 'kontext', 'rueckfragen', 'format'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: 'KI-Tool in Verzeichnisse eintragen' },
            { key: 'zielgruppe', label: 'Zielgruppe', beispiel: 'Gründer kleiner SaaS-Tools ohne Marketingteam' },
            { key: 'erfahrung', label: 'Deine eigene Erfahrung dazu', beispiel: 'über 80 Verzeichnisse selbst getestet' },
        ],
        vorlage: `Du bist Fachredakteur und planst einen Artikel zum Thema „{thema}“ für {zielgruppe}.

Meine eigene Erfahrung, die in den Artikel soll: {erfahrung}

Stell mir zuerst bis zu 3 Rückfragen, falls dir für eine gute Gliederung etwas fehlt. Warte auf meine Antwort.

Danach liefere:
1. Die Suchintention in einem Satz.
2. Eine Gliederung mit H2 und H3, jeweils mit 1 Satz, was dort beantwortet wird.
3. Pro Abschnitt: wo meine eigene Erfahrung, ein Beispiel oder eine Zahl hingehört.
4. 5 Fragen für einen FAQ-Block, so formuliert, wie Menschen sie in Google oder ChatGPT eintippen.
5. Eine Einleitung mit höchstens 80 Wörtern, die sofort die Antwort liefert.`,
        tools: ['surfer-seo', 'writesonic'],
    },
    {
        slug: 'text-entkitschen',
        title: 'KI-Text entkitschen: klingt danach wie ein Mensch',
        kategorie: 'content',
        ziel: 'Typische KI-Floskeln, leere Superlative und Füllsätze aus einem Text holen.',
        techniken: ['rolle', 'kritik', 'format'],
        felder: [
            { key: 'text', label: 'Dein Text', beispiel: 'In der heutigen schnelllebigen digitalen Welt ist es wichtiger denn je, ...', mehrzeilig: true },
            { key: 'ton', label: 'Gewünschter Ton', beispiel: 'locker, direkt, Du-Ansprache' },
        ],
        vorlage: `Du bist ein strenger Lektor. Überarbeite den folgenden Text so, dass er klingt, als hätte ihn ein erfahrener Mensch geschrieben. Ton: {ton}.

Streiche: Floskeln („in der heutigen Zeit“, „es ist wichtig zu beachten“), leere Superlative, Wiederholungen, Aufzählungen ohne Inhalt, künstliche Spannungsbögen.
Behalte: alle Fakten, Zahlen, Namen und Aussagen. Erfinde nichts dazu.

Liefere:
1. Den überarbeiteten Text.
2. Eine kurze Liste der wichtigsten Änderungen.

Text:
"""
{text}
"""`,
        tools: [],
    },
    {
        slug: 'youtube-skript',
        title: 'YouTube-Skript mit Hook in den ersten 15 Sekunden',
        kategorie: 'video',
        ziel: 'Ein sprechbares Skript mit starkem Einstieg, Kapiteln und Call-to-Action.',
        techniken: ['rolle', 'kontext', 'schritte', 'format'],
        felder: [
            { key: 'thema', label: 'Video-Thema', beispiel: 'Ich teste 5 KI-Videotools mit demselben Skript' },
            { key: 'laenge', label: 'Ziellänge', beispiel: '8 Minuten' },
            { key: 'kanal', label: 'Kanal und Stil', beispiel: 'AIGeddon: KI-Tools mit Humor, ehrlich, ohne Hype' },
        ],
        vorlage: `Du bist YouTube-Autor für den Kanal {kanal}.

Schreibe ein Skript für ein Video über: {thema}. Ziellänge: {laenge}.

Aufbau:
1. Hook (höchstens 15 Sekunden): ein Versprechen oder eine überraschende Aussage, die zum Titel passt.
2. Kurze Einordnung, warum das Thema jetzt wichtig ist.
3. Hauptteil in 3 bis 5 Kapiteln mit Zeitmarken, jeweils mit einem konkreten Beispiel oder Test.
4. Pattern-Interrupts: markiere alle 60 bis 90 Sekunden eine Stelle für B-Roll, Grafik oder Gag in [eckigen Klammern].
5. Fazit mit klarer Empfehlung.
6. Call-to-Action: Abo und ein Hinweis auf weiterführende Links in der Beschreibung.

Schreib gesprochene Sprache, kurze Sätze. Danach: 5 Titelvorschläge (höchstens 60 Zeichen) und 3 Thumbnail-Texte (höchstens 4 Wörter).`,
        tools: ['descript', 'elevenlabs', 'invideo-ai'],
    },
    {
        slug: 'video-zu-blogartikel',
        title: 'Aus Video-Transkript einen Blogartikel machen',
        kategorie: 'video',
        ziel: 'Ein Video zweimal verwerten: als suchmaschinentauglichen Artikel mit Zitaten.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'keyword', label: 'Hauptkeyword für den Artikel', beispiel: 'KI-Videotools Test' },
            { key: 'transkript', label: 'Transkript (gekürzt reicht)', beispiel: 'Hallo und willkommen bei AIGeddon, heute teste ich ...', mehrzeilig: true },
        ],
        vorlage: `Du bist Redakteur und machst aus einem Video-Transkript einen eigenständigen Blogartikel.

Hauptkeyword: {keyword}

Regeln:
- Kein Abschreiben des gesprochenen Textes, sondern ein lesbarer Artikel mit H2-Zwischenüberschriften.
- Alle Aussagen, Zahlen und Testergebnisse aus dem Transkript bleiben erhalten; erfinde nichts dazu.
- Starke Aussagen aus dem Video als Zitat übernehmen.
- Am Ende: Fazit, 3 FAQ und ein Satz, der auf das Video verweist.

Prüfe zum Schluss, ob jede Behauptung im Artikel durch das Transkript gedeckt ist, und nenne Stellen, die ich nachprüfen sollte.

Transkript:
"""
{transkript}
"""`,
        tools: ['descript', 'pictory'],
    },
    {
        slug: 'product-hunt-launch',
        title: 'Product-Hunt-Launch: Tagline, Beschreibung, erster Kommentar',
        kategorie: 'launch',
        ziel: 'Alle Launch-Texte in einem Rutsch, in den Zeichenlimits der Plattform.',
        techniken: ['rolle', 'kontext', 'varianten', 'format'],
        felder: [
            { key: 'produkt', label: 'Produktname', beispiel: 'RechnungsRadar' },
            { key: 'was', label: 'Was macht es?', beispiel: 'liest Eingangsrechnungen per KI aus und bucht sie in DATEV' },
            { key: 'zielgruppe', label: 'Für wen?', beispiel: 'Selbstständige und kleine Agenturen' },
            { key: 'besonders', label: 'Was ist anders als bei der Konkurrenz?', beispiel: 'DSGVO-konform, Server in Deutschland, ab 9 € im Monat' },
        ],
        vorlage: `Du bist Launch-Berater und hast Dutzende Produkte auf Product Hunt begleitet.

Produkt: {produkt}
Funktion: {was}
Zielgruppe: {zielgruppe}
Unterschied: {besonders}

Liefere auf Englisch:
1. 5 Taglines (höchstens 60 Zeichen), jeweils mit einem anderen Ansatz.
2. Eine Beschreibung (höchstens 260 Zeichen).
3. Den ersten Kommentar des Makers (150 bis 250 Wörter): Warum gebaut, für wen, was es kann, eine ehrliche Einschränkung, eine Frage an die Community.
4. 3 Antworten auf typische kritische Kommentare (Preis, Datenschutz, „gibt es schon“).

Kein Hype-Vokabular wie „revolutionary“ oder „game-changer“.`,
        tools: ['framer', 'beehiiv'],
    },
    {
        slug: 'verzeichnis-beschreibungen',
        title: 'Beschreibungen für KI-Verzeichnisse in 3 Längen',
        kategorie: 'launch',
        ziel: 'Einmal schreiben, überall eintragen: Einzeiler, Kurz- und Langbeschreibung auf Deutsch und Englisch.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'produkt', label: 'Produktname', beispiel: 'RechnungsRadar' },
            { key: 'was', label: 'Was macht es, für wen?', beispiel: 'KI liest Rechnungen aus und bucht sie in DATEV, für Selbstständige' },
            { key: 'preis', label: 'Preismodell', beispiel: 'Gratis-Tarif, Pro ab 9 € im Monat' },
        ],
        vorlage: `Du schreibst Einträge für KI-Tool-Verzeichnisse.

Produkt: {produkt}
Funktion und Zielgruppe: {was}
Preis: {preis}

Liefere jeweils auf Deutsch und Englisch:
1. Einzeiler (höchstens 60 Zeichen)
2. Kurzbeschreibung (höchstens 160 Zeichen)
3. Langbeschreibung (150 bis 250 Wörter) mit 3 konkreten Anwendungsfällen
4. 5 passende Kategorien oder Tags

Regeln: Produktname immer gleich geschrieben, keine Superlative, Preis korrekt übernehmen. Zähle zum Schluss die Zeichen von 1 und 2 und kürze, wenn nötig.`,
        tools: [],
    },
    {
        slug: 'newsletter-ausgabe',
        title: 'Newsletter-Ausgabe aus 3 Links',
        kategorie: 'content',
        ziel: 'Aus Notizen und Links eine fertige Ausgabe mit Betreffzeilen und Vorschautext.',
        techniken: ['rolle', 'format', 'varianten'],
        felder: [
            { key: 'newsletter', label: 'Name und Thema des Newsletters', beispiel: 'PromptGott: die besten Prompts der Woche' },
            { key: 'inhalte', label: 'Links oder Notizen', beispiel: '1) Neues Claude-Feature ... 2) Prompt-Trick für Tabellen ... 3) Tool-Deal ...', mehrzeilig: true },
        ],
        vorlage: `Du schreibst die neue Ausgabe von {newsletter}.

Inhalte dieser Woche:
"""
{inhalte}
"""

Pro Thema drei Teile: Was ist passiert (2 Sätze), warum es wichtig ist (1 bis 2 Sätze), meine Einschätzung (1 Satz, mit Haltung).
Danach ein kurzer Abschnitt „Prompt der Woche“ mit einem sofort nutzbaren Prompt zum Hauptthema.

Liefere außerdem 5 Betreffzeilen (höchstens 45 Zeichen) und 3 Vorschautexte (höchstens 90 Zeichen).
Erfinde keine Fakten, Zahlen oder Zitate, die nicht in den Inhalten stehen.`,
        tools: ['beehiiv', 'kit', 'brevo'],
    },
    {
        slug: 'automatisierung-planen',
        title: 'Wiederkehrende Aufgabe in eine Automatisierung zerlegen',
        kategorie: 'business',
        ziel: 'Einen Ablauf so beschreiben, dass er in Make, Zapier oder n8n baubar ist.',
        techniken: ['rolle', 'schritte', 'rueckfragen', 'format'],
        felder: [
            { key: 'aufgabe', label: 'Was machst du heute von Hand?', beispiel: 'Leads aus dem Kontaktformular in eine Tabelle kopieren und eine Willkommensmail schicken' },
            { key: 'apps', label: 'Welche Apps nutzt du?', beispiel: 'Tally, Google Sheets, Gmail' },
        ],
        vorlage: `Du bist Automatisierungs-Berater für kleine Unternehmen.

Heutiger Ablauf: {aufgabe}
Genutzte Apps: {apps}

Stell zuerst bis zu 3 Rückfragen, die für den Aufbau entscheidend sind. Warte auf meine Antwort.

Danach:
1. Zerlege den Ablauf in Auslöser, Schritte und Bedingungen.
2. Zeichne den Ablauf als nummerierte Liste, so wie er in Make, Zapier oder n8n aussehen würde.
3. Nenne Fehlerfälle (doppelte Einträge, fehlende Felder) und wie der Ablauf damit umgeht.
4. Schätze grob die Zahl der Ausführungen pro Monat und welches Tool dafür am günstigsten ist; markiere die Schätzung als Annahme.`,
        tools: ['make', 'zapier', 'n8n', 'tally'],
    },
    {
        slug: 'meeting-zusammenfassung',
        title: 'Meeting-Notizen in Entscheidungen und Aufgaben verwandeln',
        kategorie: 'business',
        ziel: 'Aus chaotischen Notizen eine Mail mit Entscheidungen, Aufgaben, Verantwortlichen und Fristen.',
        techniken: ['format', 'kritik'],
        felder: [{ key: 'notizen', label: 'Notizen oder Transkript', beispiel: 'Jens: Import Fatbike-Daten bis Freitag. Preise noch offen ...', mehrzeilig: true }],
        vorlage: `Fasse die folgenden Meeting-Notizen zusammen.

Struktur:
1. Entscheidungen (eine Zeile pro Entscheidung)
2. Aufgaben als Tabelle: Aufgabe | verantwortlich | Frist
3. Offene Fragen
4. Eine kurze Mail an alle Teilnehmenden mit diesen Punkten

Nimm nur auf, was in den Notizen steht. Fehlt bei einer Aufgabe der Name oder die Frist, schreib „offen“ statt etwas zu raten.

Notizen:
"""
{notizen}
"""`,
        tools: [],
    },
    {
        slug: 'prompt-verbessern',
        title: 'Meta-Prompt: Lass die KI deinen Prompt verbessern',
        kategorie: 'business',
        ziel: 'Einen schwachen Prompt in einen präzisen verwandeln, mit Rückfragen statt Raten.',
        techniken: ['rolle', 'rueckfragen', 'kritik', 'format'],
        felder: [{ key: 'prompt', label: 'Dein bisheriger Prompt', beispiel: 'Schreib mir einen Text über E-Bikes', mehrzeilig: true }],
        vorlage: `Du bist Experte für Prompt Engineering. Verbessere meinen Prompt.

Mein Prompt:
"""
{prompt}
"""

1. Bewerte ihn kurz: Was fehlt (Rolle, Ziel, Zielgruppe, Kontext, Format, Länge, Ton, Beispiele, Qualitätskriterien)?
2. Stell mir bis zu 5 Rückfragen, um die Lücken zu schließen. Warte auf meine Antworten.
3. Schreib danach den verbesserten Prompt in einem Codeblock, sofort nutzbar.
4. Erkläre in 3 Stichpunkten, warum die neue Fassung bessere Ergebnisse liefert.`,
        tools: [],
    },
    {
        slug: 'produktbeschreibung-shop',
        title: 'Produktbeschreibung für den Onlineshop',
        kategorie: 'shop',
        ziel: 'Eine Produktbeschreibung, die Fragen beantwortet, Vertrauen schafft und Retouren senkt.',
        techniken: ['rolle', 'kontext', 'format', 'kritik'],
        felder: [
            { key: 'produkt', label: 'Produkt', beispiel: 'Ersatzakku 36 V, 14 Ah für E-Bikes mit Rahmenakku' },
            { key: 'fakten', label: 'Technische Daten und Fakten', beispiel: '504 Wh, 2,9 kg, passend für Bosch PowerPack 500, 2 Jahre Garantie', mehrzeilig: true },
            { key: 'zielgruppe', label: 'Zielgruppe', beispiel: 'Pendler, deren alter Akku nachlässt' },
        ],
        vorlage: `Du bist E-Commerce-Texter. Schreibe eine Produktbeschreibung für: {produkt}.

Fakten (nur diese verwenden, nichts dazuerfinden):
"""
{fakten}
"""
Zielgruppe: {zielgruppe}

Aufbau:
1. Eine Überschrift mit dem wichtigsten Nutzen (höchstens 70 Zeichen).
2. Ein Absatz (3 Sätze): Für wen, welches Problem gelöst wird.
3. 5 Stichpunkte: Nutzen zuerst, dann das technische Detail dazu.
4. „Passt das zu mir?“: 3 typische Kundenfragen mit kurzer Antwort aus den Fakten.

Prüfe am Ende, ob jede Angabe durch die Fakten gedeckt ist, und markiere fehlende Infos, die ich ergänzen sollte.`,
        tools: ['systeme-io'],
    },
    {
        slug: 'kundenbewertung-antworten',
        title: 'Auf Kundenbewertungen antworten, auch auf schlechte',
        kategorie: 'shop',
        ziel: 'Professionelle, persönliche Antworten auf Bewertungen, die andere Interessenten überzeugen.',
        techniken: ['rolle', 'kontext', 'varianten'],
        felder: [
            { key: 'bewertung', label: 'Die Bewertung', beispiel: '2 Sterne. Lieferung hat 9 Tage gedauert, Ware ok, aber keine Info zum Versand.', mehrzeilig: true },
            { key: 'firma', label: 'Dein Unternehmen', beispiel: 'Onlineshop für Fahrradteile, kleines Team' },
        ],
        vorlage: `Du betreust die Kundenkommunikation für: {firma}.

Bewertung:
"""
{bewertung}
"""

Schreibe 3 Antwort-Varianten (sachlich, herzlich, kurz), je höchstens 80 Wörter.
Regeln: Kunden mit Namen ansprechen, falls vorhanden; konkret auf den Kritikpunkt eingehen; keine Ausreden; eine konkrete Verbesserung oder einen nächsten Schritt nennen; nichts versprechen, was ich nicht angegeben habe.`,
        tools: [],
    },
    {
        slug: 'produkt-faq',
        title: 'FAQ für die Produktseite',
        kategorie: 'shop',
        ziel: 'Häufige Kaufbedenken vorab beantworten, für Kunden, Google und KI-Antworten.',
        techniken: ['rolle', 'format', 'rueckfragen'],
        felder: [
            { key: 'produkt', label: 'Produkt', beispiel: 'Faltbares E-Bike mit 20-Zoll-Rädern' },
            { key: 'infos', label: 'Was du weißt (Daten, Versand, Garantie)', beispiel: '19 kg, Reichweite bis 60 km laut Hersteller, Versand in 2 bis 3 Tagen, 30 Tage Rückgabe', mehrzeilig: true },
        ],
        vorlage: `Erstelle einen FAQ-Block für die Produktseite von: {produkt}.

Bekannte Infos:
"""
{infos}
"""

1. Sammle die 8 Fragen, die sich Käufer vor dem Kauf am häufigsten stellen (Passform, Nutzung, Versand, Rückgabe, Pflege).
2. Beantworte jede Frage in höchstens 2 Sätzen, nur mit den bekannten Infos.
3. Wo Infos fehlen, schreib „[ERGÄNZEN: …]“ statt zu raten.
Formuliere die Fragen so, wie Kunden sie bei Google oder ChatGPT eintippen würden.`,
        tools: [],
    },
    {
        slug: 'werbe-email-aktion',
        title: 'Werbe-Mail für eine Aktion',
        kategorie: 'shop',
        ziel: 'Eine Aktions-Mail mit Betreffzeilen, die klickt, ohne marktschreierisch zu sein.',
        techniken: ['rolle', 'format', 'varianten'],
        felder: [
            { key: 'aktion', label: 'Aktion', beispiel: '15 % auf alle Winterreifen bis Sonntag' },
            { key: 'zielgruppe', label: 'Empfänger', beispiel: 'Bestandskunden, die im letzten Jahr Reifen gekauft haben' },
        ],
        vorlage: `Du bist E-Mail-Marketer. Schreibe eine Werbe-Mail für folgende Aktion: {aktion}.
Empfänger: {zielgruppe}

Liefere:
1. 5 Betreffzeilen (höchstens 45 Zeichen) und 2 Vorschautexte (höchstens 90 Zeichen).
2. Die Mail: persönlicher Einstieg, Nutzen der Aktion, klare Frist, ein Button-Text, kurzer Abschluss. Höchstens 120 Wörter.
Regeln: keine Großbuchstaben-Wörter, höchstens ein Ausrufezeichen, keine erfundenen Zusatzrabatte.`,
        tools: ['brevo', 'kit'],
    },
    {
        slug: 'anschreiben-bewerbung',
        title: 'Anschreiben für die Bewerbung',
        kategorie: 'karriere',
        ziel: 'Ein Anschreiben, das zur Stelle passt und nicht nach Vorlage klingt.',
        techniken: ['rolle', 'kontext', 'rueckfragen', 'kritik'],
        felder: [
            { key: 'stelle', label: 'Stellenanzeige (wichtigste Punkte)', beispiel: 'Online-Marketing-Manager (m/w/d), SEO, Google Ads, Teamarbeit, Hamburg', mehrzeilig: true },
            { key: 'erfahrung', label: 'Deine passende Erfahrung', beispiel: '4 Jahre SEO im Onlineshop, organischen Umsatz um 40 % gesteigert, Google-Ads-Zertifikat', mehrzeilig: true },
        ],
        vorlage: `Du bist erfahrener Karriereberater. Schreibe ein Anschreiben für diese Stelle:
"""
{stelle}
"""

Meine Erfahrung:
"""
{erfahrung}
"""

Stell mir zuerst bis zu 3 Rückfragen, falls etwas Wichtiges fehlt. Danach:
- Einstieg ohne „hiermit bewerbe ich mich“, sondern mit einem konkreten Bezug zur Firma oder Aufgabe.
- 2 Absätze, die je eine Anforderung mit einem Ergebnis aus meiner Erfahrung belegen.
- Schluss mit Gesprächswunsch. Höchstens 250 Wörter, Sie-Form.
Erfinde keine Erfolge oder Zahlen. Prüfe zum Schluss auf Floskeln und streiche sie.`,
        tools: [],
    },
    {
        slug: 'lebenslauf-optimieren',
        title: 'Lebenslauf auf eine Stelle zuschneiden',
        kategorie: 'karriere',
        ziel: 'Stichpunkte im Lebenslauf so umformulieren, dass sie zur Stellenanzeige passen und Ergebnisse zeigen.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'lebenslauf', label: 'Stichpunkte aus deinem Lebenslauf', beispiel: '- Betreuung Social Media\n- Erstellung von Newslettern\n- Zusammenarbeit mit Agenturen', mehrzeilig: true },
            { key: 'stelle', label: 'Zielstelle', beispiel: 'Content Marketing Manager in einem SaaS-Unternehmen' },
        ],
        vorlage: `Du bist Recruiter für die Stelle: {stelle}.

Hier sind Stichpunkte aus meinem Lebenslauf:
"""
{lebenslauf}
"""

Formuliere jeden Stichpunkt neu: starkes Verb am Anfang, was ich gemacht habe, mit welchem Ergebnis. Wo ein Ergebnis fehlt, setze „[ZAHL/ERGEBNIS ERGÄNZEN]“ statt etwas zu erfinden.
Ausgabe als Tabelle: Original | Neu | Warum besser.
Nenne danach 3 Schlüsselbegriffe aus der Zielstelle, die im Lebenslauf noch fehlen.`,
        tools: [],
    },
    {
        slug: 'vorstellungsgespraech-training',
        title: 'Vorstellungsgespräch üben',
        kategorie: 'karriere',
        ziel: 'Ein realistisches Probe-Interview mit Feedback nach jeder Antwort.',
        techniken: ['rolle', 'schritte', 'rueckfragen'],
        felder: [
            { key: 'stelle', label: 'Stelle', beispiel: 'Projektmanager in einer Digitalagentur' },
            { key: 'level', label: 'Schwierigkeit', beispiel: 'anspruchsvoll, mit kritischen Nachfragen' },
        ],
        vorlage: `Du führst mit mir ein Vorstellungsgespräch für die Stelle {stelle}. Schwierigkeit: {level}.

Ablauf:
1. Stell immer nur eine Frage und warte auf meine Antwort.
2. Gib nach jeder Antwort kurzes Feedback: was gut war, was fehlt, wie eine stärkere Antwort klingen würde (höchstens 4 Sätze).
3. Mische Fragen zu Motivation, Erfahrung, Fallbeispielen und eine Stressfrage.
4. Nach 6 Fragen: Gesamtauswertung mit 3 Stärken und 3 konkreten Verbesserungen.

Beginne mit der ersten Frage.`,
        tools: [],
    },
    {
        slug: 'linkedin-profil',
        title: 'LinkedIn-Überschrift und Info-Text',
        kategorie: 'karriere',
        ziel: 'Ein Profil, das in Sekunden klar macht, wofür du stehst, und gefunden wird.',
        techniken: ['rolle', 'varianten', 'format'],
        felder: [
            { key: 'rolle', label: 'Deine Rolle', beispiel: 'SEO-Manager im E-Commerce' },
            { key: 'staerken', label: 'Stärken und Ergebnisse', beispiel: 'technisches SEO, Content-Strategie, KI-Workflows; organische Umsätze verdoppelt', mehrzeilig: true },
        ],
        vorlage: `Du bist Personal-Branding-Berater. Meine Rolle: {rolle}.
Stärken und Ergebnisse:
"""
{staerken}
"""

Liefere:
1. 5 Varianten für die LinkedIn-Überschrift (höchstens 220 Zeichen), mit Suchbegriffen, die Recruiter eintippen.
2. Einen Info-Text (höchstens 200 Wörter): Einstieg mit Haltung, was ich mache, für wen, 2 belegte Ergebnisse, Abschluss mit Kontaktanlass.
Ich-Form, keine Buzzwords wie „passioniert“ oder „Game-Changer“, nichts erfinden.`,
        tools: [],
    },
    {
        slug: 'lernplan',
        title: 'Lernplan für ein neues Thema',
        kategorie: 'lernen',
        ziel: 'Ein realistischer Plan mit Etappen, Übungen und Selbsttests statt endlosem Lesen.',
        techniken: ['rolle', 'kontext', 'schritte', 'format'],
        felder: [
            { key: 'thema', label: 'Was willst du lernen?', beispiel: 'Python für Datenanalyse' },
            { key: 'zeit', label: 'Wie viel Zeit hast du?', beispiel: '30 Minuten pro Tag, 6 Wochen' },
            { key: 'stand', label: 'Dein Vorwissen', beispiel: 'Excel gut, Programmieren gar nicht' },
        ],
        vorlage: `Du bist erfahrener Lerncoach. Erstelle einen Lernplan für: {thema}.
Zeit: {zeit}. Vorwissen: {stand}.

Format als Tabelle: Woche | Lernziel | Übungen (konkret) | Selbsttest am Ende der Woche.
Regeln: kleine Etappen, jede Woche ein praktisches Mini-Projekt, Wiederholung eingeplant.
Nenne zum Schluss die 3 häufigsten Anfängerfehler bei diesem Thema und wie ich sie vermeide.`,
        tools: [],
    },
    {
        slug: 'einfach-erklaeren',
        title: 'Erklär es mir, als wäre ich 12',
        kategorie: 'lernen',
        ziel: 'Komplizierte Themen in klarer Sprache verstehen, mit Beispiel und Verständnisfrage.',
        techniken: ['rolle', 'beispiele', 'rueckfragen'],
        felder: [{ key: 'thema', label: 'Was willst du verstehen?', beispiel: 'Wie funktioniert ein Sprachmodell wie ChatGPT?' }],
        vorlage: `Erkläre mir: {thema}

So, dass es eine 12-Jährige versteht:
1. Eine Erklärung in höchstens 5 kurzen Sätzen, ohne Fachwörter.
2. Ein Vergleich aus dem Alltag.
3. Die 3 wichtigsten Fachbegriffe, jeweils in einem Satz erklärt.
4. Eine Frage an mich, mit der ich prüfen kann, ob ich es verstanden habe. Warte auf meine Antwort und gib mir Feedback.`,
        tools: [],
    },
    {
        slug: 'karteikarten',
        title: 'Karteikarten aus deinen Unterlagen',
        kategorie: 'lernen',
        ziel: 'Aus Notizen oder einem Text Karteikarten für Anki, Quizlet oder Papier machen.',
        techniken: ['format', 'kritik'],
        felder: [{ key: 'text', label: 'Dein Lernstoff', beispiel: 'Kapitel 3: Die Photosynthese wandelt Lichtenergie in chemische Energie um …', mehrzeilig: true }],
        vorlage: `Erstelle Karteikarten aus diesem Lernstoff:
"""
{text}
"""

Regeln:
- Eine Frage pro Karte, eine kurze Antwort (höchstens 2 Sätze).
- Mischung aus Begriffs-, Verständnis- und Anwendungsfragen.
- Nur Inhalte aus dem Text, nichts ergänzen.
Ausgabe als Tabelle mit den Spalten Frage | Antwort, darunter dieselben Karten als CSV (Semikolon), damit ich sie importieren kann.`,
        tools: [],
    },
    {
        slug: 'quiz-erstellen',
        title: 'Quiz zum Thema erstellen',
        kategorie: 'lernen',
        ziel: 'Ein Multiple-Choice-Quiz zum Lernen, für Schulungen oder für Social Media.',
        techniken: ['format', 'varianten', 'kritik'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: 'Datenschutz-Grundlagen für neue Mitarbeitende' },
            { key: 'niveau', label: 'Niveau', beispiel: 'Einsteiger' },
        ],
        vorlage: `Erstelle ein Quiz mit 10 Fragen zum Thema {thema} für das Niveau {niveau}.

Jede Frage mit 4 Antwortmöglichkeiten, genau eine richtig, plausible falsche Antworten.
Nach jeder Frage: die richtige Antwort und eine Erklärung in einem Satz.
Prüfe zum Schluss, ob alle Fakten stimmen, und markiere Fragen, bei denen du dir nicht sicher bist.`,
        tools: ['typeform', 'tally'],
    },
    {
        slug: 'excel-formel',
        title: 'Excel- oder Google-Sheets-Formel bauen',
        kategorie: 'technik',
        ziel: 'Die passende Formel für deine Tabelle, mit Erklärung und Fehlerfällen.',
        techniken: ['rolle', 'kontext', 'schritte'],
        felder: [
            { key: 'aufbau', label: 'Wie ist deine Tabelle aufgebaut?', beispiel: 'Spalte A Datum, B Produkt, C Menge, D Preis; 500 Zeilen' },
            { key: 'ziel', label: 'Was soll die Formel ausrechnen?', beispiel: 'Umsatz pro Produkt im aktuellen Monat' },
            { key: 'programm', label: 'Programm', beispiel: 'Google Sheets, deutsche Spracheinstellung' },
        ],
        vorlage: `Du bist Tabellen-Experte. Programm: {programm}.
Tabellenaufbau: {aufbau}
Ziel: {ziel}

1. Gib mir die Formel (achte auf Funktionsnamen und Trennzeichen für die angegebene Sprache).
2. Erkläre Schritt für Schritt, was jeder Teil macht.
3. Nenne 2 Fehlerfälle (z. B. leere Zellen) und wie die Formel damit umgeht oder wie ich sie absichere.`,
        tools: [],
    },
    {
        slug: 'code-erklaeren',
        title: 'Code erklären lassen',
        kategorie: 'technik',
        ziel: 'Fremden Code verstehen: Zweck, Ablauf, Risiken und Verbesserungen.',
        techniken: ['rolle', 'schritte', 'format'],
        felder: [
            { key: 'code', label: 'Der Code', beispiel: 'const total = items.reduce((s, i) => s + i.price * i.qty, 0)', mehrzeilig: true },
            { key: 'niveau', label: 'Dein Niveau', beispiel: 'Anfänger' },
        ],
        vorlage: `Du bist geduldiger Senior-Entwickler. Erkläre mir diesen Code für das Niveau {niveau}:
"""
{code}
"""

1. Zweck in einem Satz.
2. Ablauf Schritt für Schritt.
3. Mögliche Fehler oder Risiken (z. B. leere Eingaben, Sicherheit).
4. Eine verbesserte Fassung mit Kommentaren, falls sinnvoll.`,
        tools: [],
    },
    {
        slug: 'regex-bauen',
        title: 'Regulären Ausdruck (Regex) bauen',
        kategorie: 'technik',
        ziel: 'Ein Regex für Textsuche oder Validierung, mit Testfällen statt Rätselraten.',
        techniken: ['rolle', 'beispiele', 'kritik'],
        felder: [
            { key: 'muster', label: 'Was soll gefunden oder geprüft werden?', beispiel: 'deutsche Postleitzahlen (5 Ziffern)' },
            { key: 'umgebung', label: 'Wo nutzt du ihn?', beispiel: 'JavaScript' },
        ],
        vorlage: `Baue einen regulären Ausdruck für: {muster}. Umgebung: {umgebung}.

1. Der Ausdruck.
2. Erklärung jedes Teils.
3. 5 Beispiele, die passen sollen, und 5, die nicht passen sollen, jeweils mit Ergebnis.
4. Prüfe die Beispiele gegen den Ausdruck und korrigiere ihn, falls ein Beispiel falsch erkannt würde.`,
        tools: [],
    },
    {
        slug: 'angebot-schreiben',
        title: 'Angebot an einen Kunden schreiben',
        kategorie: 'business',
        ziel: 'Ein klares Angebot mit Leistung, Preis und nächstem Schritt.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'kunde', label: 'Kunde und Anliegen', beispiel: 'Zahnarztpraxis möchte neue Website mit Online-Terminbuchung' },
            { key: 'leistung', label: 'Deine Leistung und Preis', beispiel: 'Website mit 6 Seiten, Terminbuchung, SEO-Grundlagen; 4.800 € netto, Umsetzung in 6 Wochen', mehrzeilig: true },
        ],
        vorlage: `Du bist erfahrener Berater. Schreibe ein Angebot.
Kunde und Anliegen: {kunde}
Leistung und Preis:
"""
{leistung}
"""

Aufbau: Ausgangslage in 2 Sätzen (in den Worten des Kunden), Ziel, Leistungsumfang als Liste, was nicht enthalten ist, Preis und Zahlungsbedingungen, Zeitplan, nächster Schritt.
Sie-Form, sachlich und freundlich. Nur angegebene Preise und Leistungen verwenden.`,
        tools: [],
    },
    {
        slug: 'heikle-email',
        title: 'Heikle E-Mail diplomatisch formulieren',
        kategorie: 'business',
        ziel: 'Kritik, Absagen oder Mahnungen klar und freundlich schreiben, ohne die Beziehung zu beschädigen.',
        techniken: ['rolle', 'varianten', 'kritik'],
        felder: [
            { key: 'situation', label: 'Worum geht es?', beispiel: 'Kunde hat zum dritten Mal eine Rechnung nicht bezahlt, ist aber ein wichtiger Kunde' },
            { key: 'entwurf', label: 'Dein Entwurf (optional)', beispiel: 'Hallo, so geht das nicht weiter …', mehrzeilig: true },
        ],
        vorlage: `Hilf mir bei einer heiklen E-Mail. Situation: {situation}

Mein Entwurf (falls vorhanden):
"""
{entwurf}
"""

Schreibe 2 Varianten (sehr diplomatisch, freundlich-bestimmt), je höchstens 120 Wörter: klares Anliegen im ersten Absatz, Verständnis zeigen, konkreter nächster Schritt mit Frist.
Prüfe danach jede Variante: Gibt es Sätze, die vorwurfsvoll oder missverständlich wirken? Verbessere sie.`,
        tools: [],
    },
    {
        slug: 'bild-prompt-generator',
        title: 'Bild-Prompt für Midjourney, DALL·E & Co.',
        kategorie: 'content',
        ziel: 'Aus einer Bildidee einen präzisen Prompt mit Motiv, Stil, Licht, Kamera und Format machen.',
        techniken: ['rolle', 'format', 'varianten'],
        felder: [
            { key: 'idee', label: 'Deine Bildidee', beispiel: 'Ein Motorrad auf einer Landstraße für ein Blog-Titelbild' },
            { key: 'verwendung', label: 'Wofür wird das Bild genutzt?', beispiel: 'Blog-Header mit Platz für Text, 16:9' },
        ],
        vorlage: `Du bist Experte für Bild-Prompts. Meine Idee: {idee}. Verwendung: {verwendung}.

Schreibe 3 Prompt-Varianten (Fotografie, Illustration, 3D-Render), jede mit: Motiv (konkret), Stil, Licht, Kameraperspektive, Komposition (inklusive Platz für Text, falls nötig) und Seitenverhältnis. Höchstens 50 Wörter pro Prompt, auf Englisch, weil viele Bildgeneratoren damit präziser arbeiten.
Erkläre danach in einem Satz je Variante, wann sie am besten passt.`,
        tools: ['canva'],
    },
    {
        slug: 'social-media-redaktionsplan',
        title: 'Social-Media-Redaktionsplan für 4 Wochen',
        kategorie: 'launch',
        ziel: 'Einen Monat Posts mit Themen, Formaten, Hooks und Handlungsaufforderungen planen.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'marke', label: 'Marke oder Angebot', beispiel: 'Fahrradladen mit Werkstatt in Leipzig' },
            { key: 'kanaele', label: 'Kanäle', beispiel: 'Instagram und LinkedIn' },
            { key: 'ziel', label: 'Ziel des Monats', beispiel: 'Mehr Werkstatttermine vor der Saison' },
            { key: 'frequenz', label: 'Posts pro Woche', beispiel: '3' },
        ],
        vorlage: `Du bist Social-Media-Manager für {marke}. Plane die nächsten 4 Wochen für {kanaele}, {frequenz} Posts pro Woche. Ziel: {ziel}.

Liefere eine Tabelle mit den Spalten: Woche, Tag, Kanal, Format (Karussell, Reel, Foto, Text), Thema, Hook (erster Satz), Kernaussage, Handlungsaufforderung.
Mische die Inhalte: etwa ein Drittel Mehrwert und Tipps, ein Drittel Einblicke hinter die Kulissen, ein Drittel Angebot.
Schreibe danach 3 der Posts komplett aus. Keine erfundenen Preise, Rabatte oder Kundenzitate.`,
        tools: ['canva'],
    },
    {
        slug: 'linkedin-post',
        title: 'LinkedIn-Post aus einer Erfahrung',
        kategorie: 'content',
        ziel: 'Aus einem Erlebnis oder einer Erkenntnis einen LinkedIn-Post mit starkem Einstieg machen.',
        techniken: ['rolle', 'format', 'varianten', 'kritik'],
        felder: [
            { key: 'erlebnis', label: 'Was ist passiert, was hast du gelernt?', beispiel: 'Unser erster Produktlaunch ist gefloppt, weil wir nie mit Kunden gesprochen haben.', mehrzeilig: true },
            { key: 'zielgruppe', label: 'Wer soll es lesen?', beispiel: 'Gründer in der Frühphase' },
        ],
        vorlage: `Du bist Ghostwriter für LinkedIn. Schreibe aus dieser Erfahrung einen Post für {zielgruppe}:
"""
{erlebnis}
"""

Aufbau: Hook in einer Zeile, die Geschichte in kurzen Absätzen, eine klare Erkenntnis, eine Frage an die Leser zum Schluss.
Höchstens 1.200 Zeichen, keine Hashtag-Wand (höchstens 3), keine Emojis am Zeilenanfang, keine Floskeln wie „Ich freue mich, euch mitzuteilen“.
Liefere 3 verschiedene Hooks zur Auswahl und prüfe am Ende selbst: Klingt der Text nach einem Menschen? Wenn nicht, überarbeite ihn.`,
        tools: ['claude'],
    },
    {
        slug: 'instagram-caption',
        title: 'Instagram-Caption mit Hashtags',
        kategorie: 'content',
        ziel: 'Zu einem Bild oder Reel eine passende Caption in mehreren Tonlagen schreiben.',
        techniken: ['kontext', 'varianten', 'format'],
        felder: [
            { key: 'motiv', label: 'Was ist auf dem Bild oder im Reel?', beispiel: 'Vorher-Nachher eines restaurierten Mopeds' },
            { key: 'marke', label: 'Account / Marke', beispiel: 'Kleine Schrauberwerkstatt' },
            { key: 'ziel', label: 'Ziel des Posts', beispiel: 'Kommentare und Anfragen für Restaurierungen' },
        ],
        vorlage: `Schreibe für den Instagram-Account {marke} eine Caption zu diesem Motiv: {motiv}. Ziel: {ziel}.

Liefere 3 Varianten: locker und witzig, sachlich und informativ, persönlich und erzählend.
Jede Variante: erste Zeile als Hook (wird im Feed abgeschnitten), 2 bis 4 kurze Absätze, eine Handlungsaufforderung, dann 5 bis 10 passende Hashtags, gemischt aus großen und kleinen Nischen-Hashtags.`,
        tools: ['canva'],
    },
    {
        slug: 'text-zusammenfassen',
        title: 'Langen Text zusammenfassen',
        kategorie: 'business',
        ziel: 'Aus Berichten, Artikeln oder Protokollen eine Zusammenfassung in drei Detailstufen machen.',
        techniken: ['format', 'schritte', 'kritik'],
        felder: [
            { key: 'text', label: 'Text', beispiel: '(hier den Bericht, Artikel oder das Protokoll einfügen)', mehrzeilig: true },
            { key: 'leser', label: 'Für wen ist die Zusammenfassung?', beispiel: 'Geschäftsführung, wenig Zeit' },
        ],
        vorlage: `Fasse den folgenden Text für {leser} zusammen:
"""
{text}
"""

Liefere drei Stufen:
1. Ein Satz: die wichtigste Aussage.
2. Fünf Stichpunkte: die zentralen Inhalte, Zahlen und Entscheidungen.
3. Ein Absatz mit Kontext und offenen Fragen.
Nutze nur Informationen aus dem Text. Markiere Stellen, die unklar oder widersprüchlich sind, statt sie zu glätten.`,
        tools: ['claude', 'notion'],
    },
    {
        slug: 'uebersetzen-lokalisieren',
        title: 'Text übersetzen und lokalisieren',
        kategorie: 'content',
        ziel: 'Texte nicht nur übersetzen, sondern an Sprache, Kultur und Zielgruppe anpassen.',
        techniken: ['rolle', 'kontext', 'kritik'],
        felder: [
            { key: 'text', label: 'Text', beispiel: 'Unsere Werkstatt repariert Ihr E-Bike schnell und zuverlässig.', mehrzeilig: true },
            { key: 'sprache', label: 'Zielsprache und Land', beispiel: 'Englisch für Großbritannien' },
            { key: 'ton', label: 'Tonfall', beispiel: 'freundlich, nicht zu förmlich' },
        ],
        vorlage: `Du bist professioneller Übersetzer und Lokalisierer. Übersetze den Text nach {sprache}, Tonfall: {ton}.
"""
{text}
"""

Passe Redewendungen, Maßeinheiten, Datums- und Währungsformate an das Zielland an. Übersetze nicht Wort für Wort, sondern so, wie ein Muttersprachler es schreiben würde.
Liste danach Stellen auf, bei denen du bewusst von der wörtlichen Übersetzung abgewichen bist, und Begriffe, die ich prüfen sollte (Markennamen, Fachbegriffe, rechtliche Formulierungen).`,
        tools: ['claude'],
    },
    {
        slug: 'email-antwort',
        title: 'E-Mail beantworten in deinem Ton',
        kategorie: 'business',
        ziel: 'Auf eine E-Mail schnell eine passende, klare Antwort formulieren.',
        techniken: ['kontext', 'varianten', 'format'],
        felder: [
            { key: 'mail', label: 'Erhaltene E-Mail', beispiel: 'Hallo, können wir den Termin am Donnerstag auf nächste Woche verschieben? Viele Grüße, Anna', mehrzeilig: true },
            { key: 'antwort', label: 'Was willst du antworten (Stichpunkte)?', beispiel: 'ja, Dienstag oder Mittwoch ab 14 Uhr möglich' },
            { key: 'ton', label: 'Ton', beispiel: 'freundlich, per Du, kurz' },
        ],
        vorlage: `Schreibe eine Antwort auf diese E-Mail:
"""
{mail}
"""

Inhalt meiner Antwort: {antwort}. Ton: {ton}.
Liefere 2 Varianten: eine sehr kurze (höchstens 3 Sätze) und eine etwas ausführlichere. Mit Betreffzeile, Anrede und Gruß. Keine Floskeln wie „Ich hoffe, diese E-Mail findet Sie gut“.`,
        tools: ['claude'],
    },
    {
        slug: 'pressemitteilung',
        title: 'Pressemitteilung zu einer Neuigkeit',
        kategorie: 'launch',
        ziel: 'Eine Pressemitteilung im klassischen Aufbau schreiben, die Redaktionen schnell erfassen.',
        techniken: ['rolle', 'format', 'rueckfragen'],
        felder: [
            { key: 'neuigkeit', label: 'Was ist die Neuigkeit?', beispiel: 'Start einer kostenlosen KI-Tool-Datenbank auf Deutsch mit über 700 Tools' },
            { key: 'unternehmen', label: 'Unternehmen, Ort, Ansprechpartner', beispiel: 'Musterfirma GmbH, Würzburg, Anna Beispiel' },
            { key: 'fakten', label: 'Fakten und Zahlen', beispiel: '705 Tools, 15 Rubriken, Quellen: drei offene GitHub-Listen', mehrzeilig: true },
        ],
        vorlage: `Du bist PR-Profi. Schreibe eine Pressemitteilung zu dieser Neuigkeit: {neuigkeit}.
Absender: {unternehmen}. Fakten:
"""
{fakten}
"""

Aufbau: Überschrift, Unterzeile, Ort und Datum, Lead-Absatz mit den W-Fragen (wer, was, wann, wo, warum), zwei bis drei Absätze mit Details, ein Zitat als Platzhalter, das ich selbst formuliere, Boilerplate über das Unternehmen, Pressekontakt.
Nutze nur die genannten Fakten. Wenn wichtige Informationen fehlen, frag zuerst nach.`,
        tools: ['claude'],
    },
    {
        slug: 'landingpage-texte',
        title: 'Texte für eine Landingpage',
        kategorie: 'launch',
        ziel: 'Alle Abschnitte einer Landingpage von Überschrift bis FAQ in einem Durchgang texten.',
        techniken: ['rolle', 'kontext', 'format', 'varianten'],
        felder: [
            { key: 'angebot', label: 'Angebot', beispiel: 'Online-Kurs: Prompt Engineering für Selbstständige' },
            { key: 'zielgruppe', label: 'Zielgruppe und ihr Problem', beispiel: 'Selbstständige, die mit ChatGPT nur mittelmäßige Ergebnisse bekommen' },
            { key: 'nutzen', label: 'Die drei wichtigsten Vorteile', beispiel: 'bessere Texte, Zeit sparen, eigene Prompt-Bibliothek' },
        ],
        vorlage: `Du bist Conversion-Texter. Schreibe die Texte für eine Landingpage. Angebot: {angebot}. Zielgruppe: {zielgruppe}. Vorteile: {nutzen}.

Abschnitte:
1. Hero: 3 Überschriften-Varianten (höchstens 10 Wörter), Unterzeile, Button-Text.
2. Problem: 3 Sätze, die das Problem der Zielgruppe in ihren Worten beschreiben.
3. Lösung und Vorteile: 3 Blöcke mit Überschrift und 2 Sätzen.
4. So funktioniert es: 3 Schritte.
5. Einwände: 4 FAQ mit kurzen Antworten.
6. Abschluss mit Handlungsaufforderung.
Keine erfundenen Kundenstimmen, Zahlen oder Garantien.`,
        tools: ['framer', 'webflow'],
    },
    {
        slug: 'wettbewerbsanalyse',
        title: 'Wettbewerbsanalyse vorbereiten',
        kategorie: 'business',
        ziel: 'Eine strukturierte Analyse der Konkurrenz mit Stärken, Schwächen und Lücken anlegen.',
        techniken: ['rolle', 'format', 'schritte'],
        felder: [
            { key: 'angebot', label: 'Dein Angebot', beispiel: 'Deutsche KI-Tool-Datenbank' },
            { key: 'wettbewerber', label: 'Wettbewerber (Namen oder Websites)', beispiel: 'Futurepedia, There’s An AI For That, Toolify', mehrzeilig: true },
        ],
        vorlage: `Du bist Strategieberater. Bereite eine Wettbewerbsanalyse für {angebot} vor. Wettbewerber:
"""
{wettbewerber}
"""

Schritt 1: Lege eine Tabelle an mit Zielgruppe, Kernversprechen, Preismodell, Stärken, Schwächen je Wettbewerber. Wenn du etwas nicht sicher weißt, schreib „prüfen“ statt zu raten.
Schritt 2: Leite 3 Lücken ab, die keiner gut besetzt.
Schritt 3: Schlage für jede Lücke eine konkrete Positionierung und einen ersten Test vor.
Liste am Ende auf, welche Angaben ich auf den Websites der Wettbewerber selbst nachprüfen sollte.`,
        tools: ['perplexity', 'semrush'],
    },
    {
        slug: 'sql-abfrage',
        title: 'SQL-Abfrage aus einer Frage',
        kategorie: 'technik',
        ziel: 'Eine Frage in normaler Sprache in eine erklärte SQL-Abfrage übersetzen.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'frage', label: 'Was willst du wissen?', beispiel: 'Welche 10 Kunden haben im letzten Jahr den meisten Umsatz gemacht?' },
            { key: 'tabellen', label: 'Tabellen und Spalten', beispiel: 'kunden(id, name), bestellungen(id, kunden_id, betrag, datum)', mehrzeilig: true },
            { key: 'datenbank', label: 'Datenbank', beispiel: 'PostgreSQL' },
        ],
        vorlage: `Schreibe eine SQL-Abfrage für {datenbank}. Frage: {frage}
Tabellen:
"""
{tabellen}
"""

Liefere die Abfrage, erkläre sie Zeile für Zeile in einfachen Worten und nenne Sonderfälle (fehlende Werte, Duplikate, Zeitzonen).
Wenn die Tabellenstruktur nicht reicht, frag nach, statt Spalten zu erfinden. Nur lesende Abfragen, keine Änderungen an Daten.`,
        tools: [],
    },
    {
        slug: 'fehlermeldung-debuggen',
        title: 'Fehlermeldung verstehen und beheben',
        kategorie: 'technik',
        ziel: 'Eine Fehlermeldung erklären lassen und Schritt für Schritt zur Ursache kommen.',
        techniken: ['schritte', 'rueckfragen', 'format'],
        felder: [
            { key: 'fehler', label: 'Fehlermeldung', beispiel: 'TypeError: Cannot read properties of undefined (reading map)', mehrzeilig: true },
            { key: 'umgebung', label: 'Umgebung', beispiel: 'React 18, Next.js 14, im Browser' },
            { key: 'code', label: 'Relevanter Code (optional)', beispiel: '(Ausschnitt einfügen)', mehrzeilig: true },
        ],
        vorlage: `Hilf mir, diesen Fehler zu beheben. Umgebung: {umgebung}.
Fehlermeldung:
"""
{fehler}
"""
Code:
"""
{code}
"""

1. Erkläre in einfachen Worten, was die Meldung bedeutet.
2. Nenne die 3 wahrscheinlichsten Ursachen, sortiert nach Wahrscheinlichkeit.
3. Gib für jede Ursache einen Prüfschritt und die Lösung.
Wenn Informationen fehlen, sag genau, welche ich dir noch geben soll.`,
        tools: [],
    },
    {
        slug: 'hausarbeit-gliederung',
        title: 'Gliederung für Hausarbeit oder Referat',
        kategorie: 'lernen',
        ziel: 'Eine logische Gliederung mit Forschungsfrage und Leitfragen je Kapitel entwickeln.',
        techniken: ['rolle', 'format', 'schritte'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: 'Einfluss von KI auf den Arbeitsmarkt in Deutschland' },
            { key: 'umfang', label: 'Art und Umfang', beispiel: 'Hausarbeit, 15 Seiten, Bachelor' },
            { key: 'fach', label: 'Fach', beispiel: 'Soziologie' },
        ],
        vorlage: `Du bist erfahrener Dozent für {fach}. Hilf mir, eine Gliederung für eine Arbeit zum Thema „{thema}“ zu entwickeln ({umfang}).

1. Schlage 3 mögliche Forschungsfragen vor, eng genug für den Umfang.
2. Erstelle zur besten Frage eine Gliederung mit Kapiteln, Unterkapiteln und geschätztem Seitenanteil.
3. Formuliere je Kapitel 2 Leitfragen, die das Kapitel beantworten soll.
4. Nenne Arten von Quellen, nach denen ich suchen sollte. Erfinde keine konkreten Titel oder Autoren.`,
        tools: ['perplexity'],
    },
    {
        slug: 'arbeitszeugnis-entschluesseln',
        title: 'Arbeitszeugnis verstehen',
        kategorie: 'karriere',
        ziel: 'Die typischen Formulierungen eines Arbeitszeugnisses einordnen lassen.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'zeugnis', label: 'Zeugnistext', beispiel: '(Zeugnis einfügen, Namen und Firma vorher entfernen)', mehrzeilig: true },
        ],
        vorlage: `Du kennst die üblichen Formulierungen in deutschen Arbeitszeugnissen. Ordne dieses Zeugnis ein:
"""
{zeugnis}
"""

Liefere eine Tabelle: Formulierung, übliche Bedeutung, Einschätzung (sehr gut, gut, befriedigend, kritisch).
Achte auch auf Auffälligkeiten: fehlende Standardsätze, Reihenfolge, Schlussformel.
Gib am Ende eine Gesamteinschätzung und weise darauf hin, dass dies keine Rechtsberatung ist und Formulierungen unterschiedlich gemeint sein können.`,
        tools: [],
    },
    {
        slug: 'gehaltsverhandlung',
        title: 'Gehaltsverhandlung vorbereiten',
        kategorie: 'karriere',
        ziel: 'Argumente, Zielbetrag und Antworten auf Einwände für das Gehaltsgespräch vorbereiten.',
        techniken: ['rolle', 'schritte', 'format'],
        felder: [
            { key: 'position', label: 'Position und Erfahrung', beispiel: 'Online-Marketing-Managerin, 5 Jahre Erfahrung' },
            { key: 'erfolge', label: 'Deine Erfolge im letzten Jahr', beispiel: 'Newsletter-Umsatz verdoppelt, neues Team-Mitglied eingearbeitet', mehrzeilig: true },
            { key: 'wunsch', label: 'Aktuelles Gehalt und Wunsch', beispiel: '52.000 Euro, Wunsch 58.000 Euro' },
        ],
        vorlage: `Du bist Verhandlungscoach. Bereite mich auf mein Gehaltsgespräch vor. Position: {position}. Erfolge:
"""
{erfolge}
"""
Gehalt: {wunsch}.

1. Formuliere aus meinen Erfolgen 3 überzeugende Argumente mit Nutzen für das Unternehmen.
2. Schlage einen Gesprächseinstieg in 3 Sätzen vor.
3. Liste 5 typische Einwände des Arbeitgebers mit je einer souveränen Antwort.
4. Nenne Alternativen, falls das Budget nicht reicht (z. B. Weiterbildung, Zusatzleistungen).
Nenne keine erfundenen Marktgehälter. Sag mir, wo ich verlässliche Gehaltsdaten für meine Position finde.`,
        tools: [],
    },
    {
        slug: 'content-briefing',
        title: 'Content-Briefing für einen SEO-Artikel',
        kategorie: 'seo',
        ziel: 'Ein Briefing mit Suchintention, Gliederung, Fragen und internen Links für Autoren erstellen.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'keyword', label: 'Hauptkeyword', beispiel: 'KI-Tools kostenlos' },
            { key: 'website', label: 'Website und Zielgruppe', beispiel: 'Deutsches KI-Portal für Selbstständige und kleine Firmen' },
            { key: 'seiten', label: 'Bestehende Seiten zum Verlinken (optional)', beispiel: '/ki-tools, /prompts, /ki-test', mehrzeilig: true },
        ],
        vorlage: `Du bist SEO-Content-Stratege. Erstelle ein Briefing für einen Artikel zum Keyword „{keyword}“ für {website}.

Inhalt des Briefings:
1. Suchintention in einem Satz und was der Leser nach dem Lesen tun können soll.
2. Titel-Vorschläge (3) und Meta-Description (höchstens 155 Zeichen).
3. Gliederung mit H2 und H3.
4. 8 Fragen, die der Artikel beantworten muss.
5. Verwandte Begriffe, die vorkommen sollten.
6. Vorschläge für interne Links aus dieser Liste: {seiten}
7. Was den Artikel besser macht als typische Konkurrenzartikel (eigene Beispiele, Daten, Werkzeuge).
Keine erfundenen Suchvolumen-Zahlen.`,
        tools: ['semrush', 'surfer-seo'],
    },
    {
        slug: 'stellenanzeige',
        title: 'Stellenanzeige schreiben',
        kategorie: 'karriere',
        ziel: 'Eine klare, einladende Stellenanzeige ohne Floskeln aus Stichpunkten erstellen.',
        techniken: ['rolle', 'kontext', 'format', 'kritik'],
        felder: [
            { key: 'stelle', label: 'Stelle', beispiel: 'Kfz-Mechatroniker (m/w/d) in Vollzeit' },
            { key: 'betrieb', label: 'Betrieb und Ort', beispiel: 'Familiengeführte Werkstatt mit 12 Leuten in Würzburg' },
            { key: 'details', label: 'Aufgaben, Anforderungen, Angebot', beispiel: 'Wartung und Diagnose, Führerschein B, 4-Tage-Woche möglich, Weiterbildungen', mehrzeilig: true },
        ],
        vorlage: `Du bist Recruiting-Texter. Schreibe eine Stellenanzeige für: {stelle}. Betrieb: {betrieb}.
Stichpunkte:
"""
{details}
"""

Aufbau: Überschrift, 2 Sätze über den Betrieb, Aufgaben (5 Punkte), Anforderungen (höchstens 5 Punkte, nur echte Muss-Kriterien), Angebot, so bewirbst du dich.
Sprache: direkt, per Du oder Sie (frag mich, falls unklar), geschlechtergerecht, ohne Floskeln wie „dynamisches Team“.
Nutze nur Angaben aus den Stichpunkten und prüfe am Ende, ob eine Anforderung Menschen unnötig ausschließt.`,
        tools: [],
    },
    {
        slug: 'elternbrief',
        title: 'Elternbrief oder Elterninfo',
        kategorie: 'lernen',
        ziel: 'Eine verständliche, freundliche Information an Eltern formulieren, auch in einfacher Sprache.',
        techniken: ['kontext', 'format', 'varianten'],
        felder: [
            { key: 'anlass', label: 'Anlass', beispiel: 'Wandertag der Klasse 6b am 14. Mai' },
            { key: 'infos', label: 'Wichtige Infos', beispiel: 'Treffpunkt 8 Uhr Schule, Rückkehr 15 Uhr, festes Schuhwerk, 5 Euro für Eintritt', mehrzeilig: true },
        ],
        vorlage: `Schreibe einen Elternbrief zum Anlass: {anlass}.
Informationen:
"""
{infos}
"""

Freundlich, kurz, alle Termine und Mitbringsel als Liste. Liefere zwei Fassungen: eine normale und eine in einfacher Sprache (kurze Sätze, keine Fremdwörter).
Erfinde keine zusätzlichen Angaben. Lass Platzhalter für Namen und Unterschrift.`,
        tools: [],
    },
    {
        slug: 'produktfoto-briefing',
        title: 'Briefing für Produktfotos',
        kategorie: 'shop',
        ziel: 'Ein Briefing für Produktfotos oder KI-Szenenbilder mit Motiven, Hintergründen und Formaten erstellen.',
        techniken: ['rolle', 'format', 'varianten'],
        felder: [
            { key: 'produkt', label: 'Produkt', beispiel: 'Edelstahl-Trinkflasche 750 ml in Mattschwarz' },
            { key: 'zielgruppe', label: 'Zielgruppe und Stil', beispiel: 'Sportliche Pendler, modern, natürlich' },
            { key: 'kanaele', label: 'Kanäle', beispiel: 'Shop, Instagram, Marktplatz' },
        ],
        vorlage: `Du bist Art Director für E-Commerce. Erstelle ein Bildbriefing für: {produkt}. Zielgruppe und Stil: {zielgruppe}. Kanäle: {kanaele}.

Liefere eine Tabelle mit 8 Motiven: Motiv, Hintergrund, Licht, Perspektive, Format (Seitenverhältnis je Kanal), Zweck (Hauptbild, Detail, Anwendung, Größenvergleich).
Ergänze für 3 Anwendungsszenen je einen englischen Bild-Prompt für KI-Bildgeneratoren.
Hinweis: Farbe, Größe und Lieferumfang müssen dem echten Produkt entsprechen.`,
        tools: ['canva'],
    },
    {
        slug: 'shorts-ideen',
        title: '20 Ideen für Shorts und Reels',
        kategorie: 'video',
        ziel: 'Ideen für kurze Videos mit Hook, Ablauf und Handlungsaufforderung sammeln.',
        techniken: ['kontext', 'format', 'varianten'],
        felder: [
            { key: 'thema', label: 'Kanal und Thema', beispiel: 'Schrauber-Kanal über Moped-Restaurierung' },
            { key: 'ziel', label: 'Ziel', beispiel: 'Mehr Abonnenten für die langen Videos' },
        ],
        vorlage: `Sammle 20 Ideen für Shorts und Reels (unter 60 Sekunden) für: {thema}. Ziel: {ziel}.

Tabelle mit: Idee, Hook (erste 2 Sekunden, gesprochen oder als Text), Ablauf in 3 Schritten, Handlungsaufforderung.
Mische Formate: Tipp, Fehler, Vorher-Nachher, Mythos, Frage an die Community.
Markiere die 5 Ideen, die am wenigsten Aufwand beim Dreh brauchen.`,
        tools: [],
    },
    {
        slug: 'video-titel',
        title: 'Video-Titel und Beschreibung',
        kategorie: 'video',
        ziel: 'Titel, Beschreibung und Kapitelmarken für ein YouTube-Video entwickeln.',
        techniken: ['format', 'varianten', 'kritik'],
        felder: [
            { key: 'inhalt', label: 'Worum geht es im Video?', beispiel: 'Vergaser reinigen in 10 Schritten, häufigste Fehler, benötigtes Werkzeug', mehrzeilig: true },
            { key: 'keyword', label: 'Hauptsuchbegriff', beispiel: 'Vergaser reinigen' },
        ],
        vorlage: `Hier ist der Inhalt meines Videos:
"""
{inhalt}
"""
Hauptsuchbegriff: {keyword}.

1. 10 Titel-Varianten (höchstens 60 Zeichen), mit dem Suchbegriff möglichst vorn, ohne Clickbait-Versprechen, die das Video nicht hält.
2. Eine Beschreibung: 2 Sätze Zusammenfassung oben, danach Details und eine Handlungsaufforderung.
3. Vorschlag für Kapitelmarken anhand des Inhalts (ich setze die Zeitstempel selbst).
Bewerte am Ende deine 3 besten Titel kurz nach Klickanreiz und Ehrlichkeit.`,
        tools: [],
    },
    {
        slug: 'kundenanfrage-handwerk',
        title: 'Antwort auf eine Kundenanfrage',
        kategorie: 'business',
        ziel: 'Auf eine Anfrage professionell antworten und fehlende Angaben gezielt erfragen.',
        techniken: ['kontext', 'rueckfragen', 'format'],
        felder: [
            { key: 'anfrage', label: 'Kundenanfrage', beispiel: 'Hallo, unser Bad soll renoviert werden. Was kostet das ungefähr?', mehrzeilig: true },
            { key: 'betrieb', label: 'Dein Betrieb', beispiel: 'Sanitärbetrieb, Einzugsgebiet 30 km um Erfurt' },
        ],
        vorlage: `Ich führe diesen Betrieb: {betrieb}. Ein Kunde schreibt:
"""
{anfrage}
"""

Schreibe eine freundliche Antwort, die sich bedankt, keine Preise rät und die 5 wichtigsten Angaben erfragt, die ich für ein Angebot brauche (als Liste). Schlage einen Besichtigungstermin vor. Höchstens 120 Wörter, mit Betreff.`,
        tools: [],
    },
    {
        slug: 'vokabeltrainer',
        title: 'Vokabeltrainer im Chat',
        kategorie: 'lernen',
        ziel: 'Die KI als geduldigen Vokabeltrainer nutzen, der abfragt und Fehler erklärt.',
        techniken: ['rolle', 'schritte', 'kontext'],
        felder: [
            { key: 'sprache', label: 'Sprache und Niveau', beispiel: 'Englisch, 7. Klasse' },
            { key: 'vokabeln', label: 'Vokabeln oder Thema', beispiel: 'Unit 3: travel, journey, luggage, to book, departure', mehrzeilig: true },
        ],
        vorlage: `Du bist ein geduldiger Vokabeltrainer für {sprache}. Vokabeln:
"""
{vokabeln}
"""

Frag mich die Vokabeln einzeln ab, abwechselnd Deutsch nach {sprache} und umgekehrt. Warte nach jeder Frage auf meine Antwort.
Bei Fehlern: kurz erklären, einen Merksatz oder Beispielsatz geben und die Vokabel später noch einmal abfragen.
Am Ende: Zusammenfassung, welche Wörter ich noch üben sollte.`,
        tools: [],
    },
    {
        slug: 'referat-folien',
        title: 'Folien für ein Referat',
        kategorie: 'lernen',
        ziel: 'Aus einem Thema eine Foliengliederung mit Kernaussagen und Sprechnotizen machen.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: 'Wie funktionieren Solarzellen?' },
            { key: 'rahmen', label: 'Dauer und Publikum', beispiel: '10 Minuten, Klasse 9' },
        ],
        vorlage: `Erstelle eine Foliengliederung für ein Referat zum Thema „{thema}“ ({rahmen}).

Für jede Folie: Titel, höchstens 3 Stichpunkte, Bildidee, Sprechnotiz in 2 bis 3 Sätzen.
Höchstens 8 Folien, mit Einstieg (Frage oder überraschende Tatsache) und Zusammenfassung am Ende.
Nenne zum Schluss, welche Fakten ich in einer Quelle wie dem Schulbuch nachprüfen sollte.`,
        tools: ['gamma'],
    },
    {
        slug: 'onboarding-plan',
        title: 'Onboarding-Plan für neue Mitarbeitende',
        kategorie: 'business',
        ziel: 'Einen strukturierten Plan für die ersten Wochen im Job erstellen.',
        techniken: ['rolle', 'format', 'schritte'],
        felder: [
            { key: 'stelle', label: 'Stelle', beispiel: 'Kundenservice im Onlineshop' },
            { key: 'rahmen', label: 'Team und Werkzeuge', beispiel: '5er-Team, Ticketsystem, Shop-Backend, Telefon' },
        ],
        vorlage: `Du bist HR-Referentin. Erstelle einen Onboarding-Plan für die ersten 4 Wochen. Stelle: {stelle}. Rahmen: {rahmen}.

Pro Woche: Ziele, Aufgaben, Ansprechpersonen (als Rollen), Termine für Feedback.
Ergänze eine Checkliste für den ersten Tag und 5 Fragen für das Feedbackgespräch nach 4 Wochen.
Keine personenbezogenen Daten verwenden, nur Rollen.`,
        tools: ['notion'],
    },
    {
        slug: 'rueckruf-notiz',
        title: 'Telefonnotiz zu Aufgabe',
        kategorie: 'business',
        ziel: 'Aus einer hastigen Telefonnotiz eine saubere Aufgabe mit nächsten Schritten machen.',
        techniken: ['format', 'rueckfragen'],
        felder: [
            { key: 'notiz', label: 'Deine Notiz', beispiel: 'Hr. M. ruft wg. Lieferung an, Teil fehlt, will bis Fr. Rückmeldung, Bestellnr. ?', mehrzeilig: true },
        ],
        vorlage: `Mach aus dieser Telefonnotiz eine klare Aufgabe:
"""
{notiz}
"""

Format: Betreff, Anliegen in einem Satz, Frist, nächste Schritte als Liste, offene Fragen (was fehlt in der Notiz?).
Ergänze einen kurzen Rückruf- oder Mail-Text an den Kunden. Erfinde keine fehlenden Angaben, setze Platzhalter.`,
        tools: [],
    },
    {
        slug: 'content-refresh',
        title: 'Alten Artikel aktualisieren (Content-Refresh)',
        kategorie: 'seo',
        ziel: 'Einen bestehenden Artikel prüfen: was veraltet ist, was fehlt und welche Abschnitte neu geschrieben werden sollten.',
        techniken: ['rolle', 'kontext', 'schritte', 'format'],
        felder: [
            { key: 'keyword', label: 'Hauptkeyword des Artikels', beispiel: 'Newsletter-Tool Vergleich' },
            { key: 'artikel', label: 'Artikeltext', beispiel: '(hier den bisherigen Artikel einfügen)', mehrzeilig: true },
        ],
        vorlage: `Du bist SEO-Redakteur und überarbeitest einen bestehenden Artikel zum Keyword „{keyword}“.

Artikel:
"""
{artikel}
"""

Geh so vor:
1. Liste Aussagen, die veraltet sein könnten (Jahreszahlen, Preise, Produktnamen). Bewerte sie nicht, markiere sie zum Prüfen.
2. Nenne Fragen zum Keyword, die der Artikel nicht beantwortet.
3. Schlage eine neue Gliederung vor und kennzeichne: behalten, kürzen, neu schreiben.
4. Formuliere einen neuen Titel und eine neue Meta-Description.

Ausgabe in vier Abschnitten mit Überschriften. Erfinde keine Fakten oder Zahlen; wo du etwas nicht weißt, schreib [PRÜFEN].`,
        tools: ['surfer-seo', 'semrush'],
    },
    {
        slug: 'interne-verlinkung',
        title: 'Interne Verlinkung planen',
        kategorie: 'seo',
        ziel: 'Aus einer Liste von Seiten einen Verlinkungsplan mit passenden Ankertexten machen.',
        techniken: ['rolle', 'format', 'schritte'],
        felder: [
            { key: 'seiten', label: 'Seiten (URL und Thema, eine pro Zeile)', beispiel: '/e-bike-akku: Ratgeber Akku\n/akku-laden: Akku richtig laden\n/akku-kaufen: Kategorie Akkus', mehrzeilig: true },
            { key: 'ziel', label: 'Wichtigste Seite', beispiel: '/akku-kaufen' },
        ],
        vorlage: `Du bist SEO-Spezialist für Informationsarchitektur.

Hier sind die Seiten einer Website:
"""
{seiten}
"""

Die wichtigste Seite ist {ziel}.

1. Ordne die Seiten in Pillar-Seite und unterstützende Seiten.
2. Schlage für jede Seite 2 bis 4 interne Links vor (von → nach).
3. Gib für jeden Link einen natürlichen, beschreibenden Ankertext an, keine exakt gleichen Ankertexte doppelt.
4. Nenne Seiten, die noch fehlen, um das Thema vollständig abzudecken.

Ausgabe als Tabelle: Von | Nach | Ankertext | Begründung.`,
        tools: ['semrush', 'se-ranking'],
    },
    {
        slug: 'avatar-video-skript',
        title: 'Skript für ein Avatar-Erklärvideo',
        kategorie: 'video',
        ziel: 'Ein kurzes Sprecherskript für KI-Avatare schreiben, das gesprochen natürlich klingt.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: 'So beantragst du Urlaub im neuen HR-Tool' },
            { key: 'zielgruppe', label: 'Zielgruppe', beispiel: 'Mitarbeitende ohne Technik-Vorwissen' },
            { key: 'laenge', label: 'Länge in Minuten', beispiel: '2' },
        ],
        vorlage: `Du schreibst Sprechertexte für Erklärvideos mit KI-Avatar.

Thema: {thema}
Zielgruppe: {zielgruppe}
Länge: etwa {laenge} Minuten

Regeln:
- kurze Sätze, gesprochene Sprache, keine Schachtelsätze
- schwierige Wörter vermeiden oder erklären
- Zahlen und Abkürzungen so schreiben, wie sie gesprochen werden

Ausgabe als Tabelle mit Spalten: Szene | Sprechertext | Bild oder Einblendung.
Danach eine Liste mit Wörtern, deren Aussprache ich im Tool prüfen sollte.`,
        tools: ['synthesia', 'heygen'],
    },
    {
        slug: 'kapitelmarken',
        title: 'Kapitelmarken und Zusammenfassung aus einem Transkript',
        kategorie: 'video',
        ziel: 'Aus dem Transkript eines Videos oder Podcasts Kapitelmarken, eine Zusammenfassung und Clip-Ideen machen.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'transkript', label: 'Transkript mit Zeitstempeln', beispiel: '00:00 Hallo und willkommen …\n02:15 Kommen wir zum ersten Punkt …', mehrzeilig: true },
        ],
        vorlage: `Hier ist ein Transkript mit Zeitstempeln:
"""
{transkript}
"""

1. Erstelle 5 bis 10 Kapitelmarken im Format 00:00 Titel. Verwende nur Zeitstempel, die im Transkript vorkommen.
2. Schreibe eine Zusammenfassung in 3 Sätzen.
3. Schlage 3 Stellen für kurze Clips vor (Start- und Endzeit, warum die Stelle funktioniert).

Erfinde keine Inhalte, die nicht im Transkript stehen.`,
        tools: ['descript', 'otter-ai'],
    },
    {
        slug: 'kategorietext-shop',
        title: 'Kategorietext für den Onlineshop',
        kategorie: 'shop',
        ziel: 'Einen hilfreichen Kategorietext mit Kaufberatung schreiben, ohne Keyword-Stopferei.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'kategorie', label: 'Kategorie', beispiel: 'Fahrradschlösser' },
            { key: 'kriterien', label: 'Wichtige Auswahlkriterien', beispiel: 'Sicherheitsstufe, Gewicht, Bügel oder Kette' },
            { key: 'shop', label: 'Shop und Zielgruppe', beispiel: 'Fahrradshop für Pendler in Städten' },
        ],
        vorlage: `Du bist Texter für E-Commerce und schreibst für {shop}.

Schreibe einen Kategorietext für „{kategorie}“:
- kurzer Einstieg (2 Sätze) oberhalb der Produkte
- Kaufberatung unterhalb der Produkte mit Zwischenüberschriften zu: {kriterien}
- 3 kurze FAQ am Ende

Keine Superlative ohne Beleg, keine erfundenen Testergebnisse, keine Preise. Das Keyword nur dort verwenden, wo es natürlich passt.`,
        tools: ['writesonic'],
    },
    {
        slug: 'daten-bereinigen',
        title: 'Tabelle bereinigen: Dubletten, Formate, Fehler',
        kategorie: 'technik',
        ziel: 'Schritte und Formeln finden, um eine unordentliche Tabelle zu bereinigen.',
        techniken: ['format', 'schritte', 'rueckfragen'],
        felder: [
            { key: 'programm', label: 'Programm', beispiel: 'Excel (deutsch)' },
            { key: 'beispiel', label: 'Beispielzeilen (anonymisiert)', beispiel: 'Name;PLZ;Telefon\nmüller, anna;7743;0176 123\nMüller Anna;07743;+49 176 123', mehrzeilig: true },
        ],
        vorlage: `Ich arbeite in {programm}. Hier sind Beispielzeilen meiner Tabelle:
"""
{beispiel}
"""

1. Nenne die Probleme, die du in den Daten siehst (Dubletten, Schreibweisen, Formate).
2. Gib für jedes Problem eine Lösung mit Formel oder Menüweg in {programm}.
3. Schlage eine Reihenfolge vor, damit nichts doppelt bearbeitet wird.

Wenn dir Informationen fehlen, frag zuerst nach. Formeln mit deutschen Funktionsnamen und Semikolon, falls das Programm deutsch ist.`,
        tools: [],
    },
    {
        slug: 'recherche-mit-quellen',
        title: 'Recherche mit nachprüfbaren Quellen',
        kategorie: 'lernen',
        ziel: 'Eine Frage recherchieren lassen und jede Aussage mit einer Quelle belegen, die du selbst öffnen kannst.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'frage', label: 'Deine Frage', beispiel: 'Welche Förderprogramme gibt es 2026 für Wärmepumpen in Deutschland?' },
            { key: 'zweck', label: 'Wofür brauchst du die Antwort?', beispiel: 'Entscheidung für eine Heizungsmodernisierung' },
        ],
        vorlage: `Du bist ein sorgfältiger Rechercheur. Frage: {frage}
Zweck: {zweck}

Regeln:
- Nenne zu jeder Aussage eine Quelle mit Link und Datum der Quelle.
- Bevorzuge offizielle Stellen (Behörden, Hersteller, Gesetze) vor Blogs.
- Wenn du etwas nicht sicher weißt oder keine Quelle findest, schreib das ausdrücklich.
- Markiere Angaben, die sich häufig ändern (Preise, Fristen, Förderhöhen), mit [AKTUELL PRÜFEN].

Format: kurze Antwort in 3 Sätzen, danach eine Tabelle Aussage | Quelle | Datum, danach offene Fragen.`,
        tools: ['perplexity', 'claude'],
    },
    {
        slug: 'faktencheck',
        title: 'Text auf prüfbedürftige Behauptungen checken',
        kategorie: 'lernen',
        ziel: 'Alle Zahlen, Namen und Behauptungen in einem Text finden, die du vor dem Veröffentlichen prüfen solltest.',
        techniken: ['rolle', 'format', 'schritte'],
        felder: [{ key: 'text', label: 'Dein Text', beispiel: '(hier den Text einfügen)', mehrzeilig: true }],
        vorlage: `Du bist Faktenprüfer in einer Redaktion. Prüfe diesen Text:
"""
{text}
"""

1. Liste jede überprüfbare Aussage auf (Zahlen, Daten, Namen, Zitate, Vergleiche).
2. Bewerte für jede: plausibel, fraglich oder vermutlich falsch, mit kurzer Begründung.
3. Schlage für jede Aussage vor, wo man sie prüfen kann (Art der Quelle).

Erfinde keine Quellen. Ausgabe als Tabelle: Aussage | Einschätzung | Begründung | Wo prüfen.`,
        tools: ['perplexity', 'claude'],
    },
    {
        slug: 'ki-agent-auftrag',
        title: 'Klarer Auftrag für einen KI-Agenten',
        kategorie: 'technik',
        ziel: 'Einem KI-Agenten eine Aufgabe mit Ziel, Grenzen und Abnahmekriterien geben, damit er nicht ins Blaue arbeitet.',
        techniken: ['kontext', 'schritte', 'format', 'rueckfragen'],
        felder: [
            { key: 'aufgabe', label: 'Was soll der Agent erledigen?', beispiel: 'Die 20 wichtigsten Wettbewerber unseres Online-Shops finden und vergleichen' },
            { key: 'grenzen', label: 'Was darf er nicht?', beispiel: 'Nichts kaufen, keine Formulare absenden, keine Logins verwenden' },
            { key: 'ergebnis', label: 'Wie soll das Ergebnis aussehen?', beispiel: 'Tabelle mit Name, URL, Preisspanne, Besonderheit' },
        ],
        vorlage: `Aufgabe: {aufgabe}

Grenzen (strikt einhalten): {grenzen}

Vorgehen:
1. Stell mir zuerst alle Rückfragen, die du für die Aufgabe brauchst.
2. Schreib dann einen kurzen Plan mit den Schritten, die du gehen willst, und warte auf mein OK.
3. Arbeite den Plan ab und notiere zu jedem Schritt, was du getan hast und welche Quelle du genutzt hast.

Abnahme: Das Ergebnis ist fertig, wenn es so aussieht: {ergebnis}
Wenn ein Schritt nicht klappt, brich ab und sag mir, woran es hing, statt zu raten.`,
        tools: ['claude', 'make', 'zapier'],
    },
    {
        slug: 'alt-texte',
        title: 'Alt-Texte für Bilder schreiben',
        kategorie: 'seo',
        ziel: 'Kurze, beschreibende Alt-Texte für Bilder erstellen, die Barrierefreiheit und Bildersuche verbessern.',
        techniken: ['rolle', 'format', 'beispiele'],
        felder: [
            { key: 'bilder', label: 'Bilder kurz beschrieben (eins pro Zeile)', beispiel: 'Produktfoto: rotes Fahrradschloss auf Holztisch\nTeamfoto: fünf Leute vor Werkstatt', mehrzeilig: true },
            { key: 'seite', label: 'Thema der Seite', beispiel: 'Onlineshop für Fahrradzubehör' },
        ],
        vorlage: `Du schreibst Alt-Texte für die Seite: {seite}

Bilder:
"""
{bilder}
"""

Regeln:
- höchstens 125 Zeichen pro Alt-Text
- beschreiben, was zu sehen ist, nicht „Bild von“
- das Thema der Seite nur einbauen, wo es natürlich passt, kein Keyword-Stopfen
- rein dekorative Bilder mit „(dekorativ, Alt-Text leer lassen)“ markieren

Beispiel: „Rotes Bügelschloss mit zwei Schlüsseln auf einem Holztisch“.
Ausgabe als Tabelle: Bild | Alt-Text | Zeichen.`,
        tools: ['surfer-seo'],
    },
    {
        slug: 'faq-aus-suchfragen',
        title: 'FAQ-Abschnitt aus echten Suchfragen',
        kategorie: 'seo',
        ziel: 'Aus Fragen, die Leute wirklich suchen, einen FAQ-Abschnitt mit kurzen, direkten Antworten bauen.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Thema der Seite', beispiel: 'E-Bike-Akku lagern im Winter' },
            { key: 'fragen', label: 'Gefundene Fragen (z. B. aus „Weitere Fragen“ bei Google)', beispiel: 'Wie lagere ich den Akku im Winter?\nDarf der Akku in der Garage bleiben?\nWie voll soll der Akku sein?', mehrzeilig: true },
        ],
        vorlage: `Du bist SEO-Redakteur. Thema: {thema}

Diese Fragen stellen Nutzer:
"""
{fragen}
"""

1. Fasse doppelte Fragen zusammen und ordne sie logisch.
2. Beantworte jede Frage in 2 bis 3 Sätzen, der erste Satz beantwortet die Frage direkt.
3. Markiere Aussagen, die ich fachlich prüfen sollte, mit [PRÜFEN].

Keine Werbesprache, keine erfundenen Zahlen. Ausgabe als Liste: Frage, darunter Antwort.`,
        tools: ['semrush', 'surfer-seo'],
    },
    {
        slug: 'podcast-folge-planen',
        title: 'Podcast-Folge planen',
        kategorie: 'video',
        ziel: 'Aus einem Thema einen Ablauf mit Einstieg, Fragen, Übergängen und Kapiteln für eine Podcast-Folge machen.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Thema der Folge', beispiel: 'Wie kleine Shops KI im Kundenservice nutzen' },
            { key: 'gast', label: 'Gast und Hintergrund (optional)', beispiel: 'Inhaberin eines Onlineshops für Tee' },
            { key: 'dauer', label: 'Länge in Minuten', beispiel: '30' },
        ],
        vorlage: `Du bist Podcast-Producer. Plane eine Folge.
Thema: {thema}
Gast: {gast}
Länge: etwa {dauer} Minuten

Liefere:
1. 3 Varianten für den Einstieg (je 2 Sätze, mit Neugier-Effekt)
2. Ablauf mit Kapiteln und Minutenangaben
3. 10 Fragen an den Gast, sortiert von leicht zu tief
4. Ein Schluss mit klarer Handlungsaufforderung
5. 5 Titelideen für die Folge

Keine erfundenen Fakten über den Gast; wo du etwas wissen musst, setz [FRAGEN].`,
        tools: ['descript', 'elevenlabs'],
    },
    {
        slug: 'newsletter-betreffzeilen',
        title: '15 Betreffzeilen für den Newsletter',
        kategorie: 'content',
        ziel: 'Betreffzeilen in verschiedenen Stilen erzeugen und die besten für einen A/B-Test auswählen.',
        techniken: ['varianten', 'kontext', 'kritik'],
        felder: [
            { key: 'inhalt', label: 'Worum geht es in der Ausgabe?', beispiel: 'Drei neue KI-Tools für Selbstständige und ein Prompt zum Angebote schreiben' },
            { key: 'leser', label: 'Wer liest den Newsletter?', beispiel: 'Selbstständige ohne Technik-Hintergrund' },
        ],
        vorlage: `Inhalt der Newsletter-Ausgabe: {inhalt}
Leser: {leser}

Schreib 15 Betreffzeilen, je 3 in diesen Stilen: Nutzen, Neugier, Zahl, Frage, persönlich.
Regeln: höchstens 50 Zeichen, keine Großbuchstaben-Wörter, keine Ausrufezeichen-Ketten, nichts versprechen, was die Ausgabe nicht hält.

Wähle danach die 2 besten für einen A/B-Test aus und begründe in je einem Satz. Schreib zu beiden einen passenden Vorschautext (höchstens 90 Zeichen).`,
        tools: ['beehiiv', 'kit', 'brevo'],
    },
    {
        slug: 'zielgruppen-persona',
        title: 'Zielgruppen-Persona aus echten Infos',
        kategorie: 'launch',
        ziel: 'Aus Kundenstimmen und Notizen eine Persona bauen, die bei Texten und Produktentscheidungen hilft.',
        techniken: ['rolle', 'kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'produkt', label: 'Dein Produkt', beispiel: 'KI-Tool, das Rechnungen automatisch vorkontiert' },
            { key: 'infos', label: 'Was du über Kunden weißt (Zitate, Notizen)', beispiel: '„Ich sitze jeden Sonntag an der Buchhaltung“, „Steuerberater ist teuer“, meist Solo-Selbstständige', mehrzeilig: true },
        ],
        vorlage: `Du bist Produktmarketing-Experte. Produkt: {produkt}

Das weiß ich über unsere Kunden:
"""
{infos}
"""

Erstelle eine Persona mit: Name und Rolle, Alltag, Ziele, größte Probleme, Einwände gegen unser Produkt, Wörter, die sie selbst benutzt, und wo sie sich informiert.
Trenne klar: was aus meinen Infos stammt und was du annimmst (Annahmen mit [ANNAHME] markieren).
Stell am Ende 5 Fragen, die ich in Kundengesprächen klären sollte.`,
        tools: ['claude', 'typeform'],
    },
    {
        slug: 'preisseite-texte',
        title: 'Texte für die Preisseite',
        kategorie: 'launch',
        ziel: 'Tarifnamen, Beschreibungen und FAQ für eine Preisseite schreiben, die Einwände vorwegnimmt.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'produkt', label: 'Produkt', beispiel: 'Terminbuchungs-Tool für Friseure' },
            { key: 'tarife', label: 'Tarife mit Preis und Leistungen', beispiel: 'Basic 9 €: 1 Kalender. Pro 29 €: 5 Kalender, SMS-Erinnerung. Team 79 €: unbegrenzt, Statistik', mehrzeilig: true },
        ],
        vorlage: `Du schreibst die Preisseite für: {produkt}

Tarife (Preise und Leistungen nicht verändern):
"""
{tarife}
"""

Liefere:
1. Für jeden Tarif: Untertitel „Für wen“ in einem Satz und 3 Nutzen-Bulletpoints
2. Eine Empfehlung, welcher Tarif hervorgehoben werden sollte, mit Begründung
3. 6 FAQ, die typische Einwände beantworten (Kündigung, Wechsel, Datenschutz, Testphase)

Keine Superlative ohne Beleg, keine erfundenen Garantien.`,
        tools: ['framer', 'webflow'],
    },
    {
        slug: 'retoure-antwort',
        title: 'Antwort auf eine Retoure oder Reklamation',
        kategorie: 'shop',
        ziel: 'Freundlich und klar auf Reklamationen antworten, mit Lösung und ohne Rechtsfehler.',
        techniken: ['rolle', 'kontext', 'varianten'],
        felder: [
            { key: 'nachricht', label: 'Nachricht des Kunden', beispiel: 'Die Lampe kam kaputt an, ich will mein Geld zurück!', mehrzeilig: true },
            { key: 'regeln', label: 'Deine Regeln (Rückgabe, Ersatz, Fristen)', beispiel: '30 Tage Rückgabe, kostenloser Ersatzversand bei Transportschaden, Foto erbeten' },
        ],
        vorlage: `Du bist Kundenservice in einem Onlineshop. Kundennachricht:
"""
{nachricht}
"""

Unsere Regeln: {regeln}

Schreib zwei Antwort-Varianten (sachlich und herzlich), je höchstens 120 Wörter:
- Verständnis zeigen, ohne Schuld abzuschieben
- konkrete Lösung nach unseren Regeln und nächster Schritt für den Kunden
- keine Versprechen, die über unsere Regeln hinausgehen

Hinweis an mich: Wenn die Nachricht rechtliche Fragen berührt (Gewährleistung, Widerruf), markiere das mit [RECHTLICH PRÜFEN].`,
        tools: [],
    },
    {
        slug: 'kuendigung-schreiben',
        title: 'Kündigung schreiben (Job, Vertrag, Abo)',
        kategorie: 'karriere',
        ziel: 'Eine klare, höfliche Kündigung mit allen nötigen Angaben formulieren.',
        techniken: ['format', 'rueckfragen'],
        felder: [
            { key: 'was', label: 'Was kündigst du?', beispiel: 'Arbeitsvertrag als Projektmanagerin' },
            { key: 'angaben', label: 'Angaben (Datum, Frist, Vertragsnummer, Wunschtermin)', beispiel: 'Kündigungsfrist 3 Monate zum Monatsende, letzter Arbeitstag gewünscht 31.01.' },
        ],
        vorlage: `Schreib eine Kündigung für: {was}
Angaben: {angaben}

Anforderungen:
- sachlich und höflich, ohne Begründung, wenn keine nötig ist
- Betreff, Datum, Kündigungstermin, Bitte um schriftliche Bestätigung
- bei Arbeitsverträgen: Bitte um ein qualifiziertes Arbeitszeugnis
- Platzhalter für fehlende Angaben in [ECKIGEN KLAMMERN]

Frag zuerst nach, wenn wichtige Angaben fehlen. Hinweis: Prüfe Fristen und Form (z. B. Schriftform mit Unterschrift) selbst im Vertrag.`,
        tools: [],
    },
    {
        slug: 'feedback-formulieren',
        title: 'Konstruktives Feedback formulieren',
        kategorie: 'business',
        ziel: 'Kritik so formulieren, dass sie ankommt: konkret, fair und mit klarem nächsten Schritt.',
        techniken: ['rolle', 'format', 'varianten'],
        felder: [
            { key: 'situation', label: 'Was ist passiert?', beispiel: 'Kollege liefert Berichte regelmäßig zwei Tage zu spät, Team wartet' },
            { key: 'ziel', label: 'Was soll sich ändern?', beispiel: 'Berichte pünktlich oder früh Bescheid geben, wenn es knapp wird' },
        ],
        vorlage: `Du bist erfahrene Führungskraft und Coach. Situation: {situation}
Ziel: {ziel}

Formuliere Feedback nach dem Muster Beobachtung, Wirkung, Wunsch, Frage:
1. eine Version für ein persönliches Gespräch (gesprochene Sprache)
2. eine kurze schriftliche Version für eine Nachricht

Vermeide Verallgemeinerungen wie „immer“ und „nie“, keine Unterstellungen. Schlag am Ende 2 Fragen vor, mit denen ich die Sicht der anderen Person erfahre.`,
        tools: [],
    },
    {
        slug: 'wochenplan-priorisieren',
        title: 'Wochenplan mit klaren Prioritäten',
        kategorie: 'business',
        ziel: 'Eine chaotische Aufgabenliste in einen realistischen Wochenplan mit Prioritäten verwandeln.',
        techniken: ['schritte', 'format', 'rueckfragen'],
        felder: [
            { key: 'aufgaben', label: 'Deine Aufgaben (ungeordnet)', beispiel: 'Angebot für Müller, Steuer-Unterlagen, Website-Texte, 3 Kundentermine, Rechnungen schreiben', mehrzeilig: true },
            { key: 'zeit', label: 'Verfügbare Zeit', beispiel: 'Mo bis Fr je 6 Stunden, Mittwoch nur vormittags' },
        ],
        vorlage: `Hier sind meine Aufgaben für diese Woche:
"""
{aufgaben}
"""
Verfügbare Zeit: {zeit}

1. Frag nach Fristen und Dauer, wo sie fehlen.
2. Sortiere nach dringend/wichtig und schätze den Zeitbedarf.
3. Erstelle einen Wochenplan als Tabelle Tag | Block | Aufgabe | Dauer, mit 20 % Puffer.
4. Nenne Aufgaben, die ich verschieben, abgeben oder streichen sollte, mit Begründung.`,
        tools: ['notion'],
    },
    {
        slug: 'tool-vergleich-entscheidung',
        title: 'Entscheidung zwischen zwei Tools treffen',
        kategorie: 'technik',
        ziel: 'Zwei Software-Tools strukturiert vergleichen und eine begründete Entscheidung vorbereiten.',
        techniken: ['rolle', 'format', 'kritik', 'rueckfragen'],
        felder: [
            { key: 'tools', label: 'Welche Tools?', beispiel: 'Make und Zapier' },
            { key: 'bedarf', label: 'Wofür und mit welchen Anforderungen?', beispiel: 'Leads aus Typeform ins CRM übertragen, kleines Budget, kein Entwickler im Team' },
        ],
        vorlage: `Du berätst bei Software-Entscheidungen. Kandidaten: {tools}
Bedarf: {bedarf}

1. Stell bis zu 5 Rückfragen, die für die Entscheidung wichtig sind.
2. Erstelle danach eine Vergleichstabelle mit Kriterien, die zu meinem Bedarf passen.
3. Kennzeichne Preise und Funktionen, die du nicht sicher weißt, mit [AUF ANBIETERSEITE PRÜFEN].
4. Gib eine Empfehlung mit den 2 wichtigsten Gründen und dem größten Risiko.`,
        tools: ['make', 'zapier', 'n8n'],
    },
    // ChatGPT-Prompts (Content-Plan Woche 1). fuer: in welches Tool der Prompt eingegeben wird.
    {
        slug: 'chatgpt-projekt-anweisungen',
        title: 'Anweisungen für ein ChatGPT-Projekt schreiben',
        kategorie: 'business',
        ziel: 'Feste Projekt-Anweisungen formulieren, damit ChatGPT in jedem Chat des Projekts gleich arbeitet und du nichts wiederholen musst.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'projekt', label: 'Worum geht es im Projekt?', beispiel: 'Newsletter für unseren Fahrradladen, erscheint alle zwei Wochen' },
            { key: 'stil', label: 'Wie soll geschrieben werden?', beispiel: 'Du-Form, locker, kurze Sätze, keine Superlative' },
            { key: 'dateien', label: 'Welche Dateien legst du ins Projekt?', beispiel: 'Produktliste.csv, alte Newsletter als PDF' },
        ],
        vorlage: `Ich lege in ChatGPT ein Projekt an und brauche dafür die Anweisungen, die in jedem Chat des Projekts gelten.

Projekt: {projekt}
Gewünschter Stil: {stil}
Dateien im Projekt: {dateien}

1. Stell mir zuerst bis zu 4 Rückfragen zu Zielgruppe, Zweck und No-Gos.
2. Schreib danach die Anweisungen in höchstens 200 Wörtern, gegliedert in: Rolle, Ziel, Stil, Umgang mit den Dateien, was du nie tun sollst, was du tust, wenn Infos fehlen.
3. Gib die Anweisungen in einem Codeblock aus, damit ich sie direkt ins Feld für Projekt-Anweisungen kopieren kann.`,
        tools: ['chatgpt'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-agent-auftrag',
        title: 'Auftrag für den ChatGPT-Agenten formulieren',
        kategorie: 'business',
        ziel: 'Einen Auftrag so beschreiben, dass der Agent im Browser die richtige Aufgabe erledigt und vor heiklen Schritten nachfragt.',
        techniken: ['kontext', 'schritte', 'format', 'rueckfragen'],
        felder: [
            { key: 'aufgabe', label: 'Was soll der Agent erledigen?', beispiel: 'Drei Angebote für einen Lastenrad-Verleih in Leipzig vergleichen' },
            { key: 'grenzen', label: 'Was darf er nicht?', beispiel: 'Nichts buchen, nichts bezahlen, keine Konten anlegen' },
            { key: 'ergebnis', label: 'Wie soll das Ergebnis aussehen?', beispiel: 'Tabelle mit Preis pro Tag, Kaution, Abholort, Link' },
        ],
        vorlage: `Aufgabe für dich als Agent: {aufgabe}

Grenzen: {grenzen}. Bevor du etwas absendest, bestätigst, kaufst oder dich irgendwo anmeldest, hältst du an und fragst mich.

Vorgehen:
1. Sag mir kurz, wie du vorgehen willst und welche Seiten du besuchen wirst.
2. Arbeite die Aufgabe ab und notiere zu jeder Angabe die Seite, von der sie stammt.
3. Wenn eine Angabe auf der Seite fehlt, schreib „nicht angegeben“ statt zu schätzen.

Ergebnis: {ergebnis}. Darunter 3 Sätze, was dir aufgefallen ist und was ich selbst prüfen sollte.`,
        tools: ['chatgpt'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-bild-erstellen',
        title: 'Bild mit ChatGPT erstellen: Bildbeschreibung',
        kategorie: 'content',
        ziel: 'Eine präzise Bildbeschreibung schreiben, mit der ChatGPT beim ersten Versuch ein brauchbares Bild erzeugt.',
        techniken: ['kontext', 'format', 'varianten'],
        felder: [
            { key: 'motiv', label: 'Was soll zu sehen sein?', beispiel: 'Eine Werkbank mit Laptop und Moped-Motor, morgens' },
            { key: 'zweck', label: 'Wofür ist das Bild?', beispiel: 'Titelbild für einen Blogartikel, quer' },
            { key: 'stil', label: 'Stil', beispiel: 'Fotorealistisch, warmes Licht, ruhige Farben' },
            { key: 'text', label: 'Text im Bild (oder „keiner“)', beispiel: 'keiner' },
        ],
        vorlage: `Erstelle ein Bild.

Motiv: {motiv}
Verwendung: {zweck}
Stil: {stil}
Text im Bild: {text}

Achte auf: klares Hauptmotiv in der Bildmitte, ruhiger Hintergrund, kein Wasserzeichen, keine Logos echter Marken, keine erkennbaren echten Personen.
Wenn eine Angabe fehlt oder sich widerspricht, frag nach, bevor du das Bild erzeugst. Schlag mir nach dem ersten Bild 3 konkrete Änderungen vor, die es für den Zweck besser machen.`,
        tools: ['chatgpt'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-excel-tabelle-auswerten',
        title: 'Excel-Tabelle mit ChatGPT auswerten',
        kategorie: 'technik',
        ziel: 'Eine hochgeladene Tabelle auswerten lassen, mit nachvollziehbaren Rechenwegen statt Bauchgefühl.',
        techniken: ['kontext', 'schritte', 'format', 'kritik'],
        felder: [
            { key: 'datei', label: 'Was steht in der Datei?', beispiel: 'Umsätze 2026 pro Monat und Produktgruppe, eine Zeile pro Verkauf' },
            { key: 'frage', label: 'Was willst du wissen?', beispiel: 'Welche Produktgruppe wächst am stärksten, und gibt es Ausreißer?' },
        ],
        vorlage: `Ich lade dir eine Tabelle hoch. Inhalt: {datei}
Meine Frage: {frage}

1. Beschreib zuerst die Struktur: Spalten, Datentypen, Zeilenzahl, leere oder auffällige Werte. Frag nach, wenn eine Spalte unklar ist.
2. Rechne die Auswertung und nenne den Rechenweg in einem Satz pro Kennzahl.
3. Gib das Ergebnis als Tabelle aus und erstelle ein passendes Diagramm.
4. Prüf am Ende selbst: Stimmen die Summen mit der Ausgangstabelle überein? Nenne Grenzen der Auswertung.
5. Schreib mir zum Schluss die Excel-Formeln auf, mit denen ich die wichtigste Kennzahl selbst nachrechnen kann.`,
        tools: ['chatgpt', 'microsoft-copilot'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-uebersetzen-mit-glossar',
        title: 'Mit ChatGPT übersetzen, mit festem Glossar',
        kategorie: 'content',
        ziel: 'Texte übersetzen lassen, bei denen Fachbegriffe, Tonfall und Länge zuverlässig stimmen.',
        techniken: ['kontext', 'beispiele', 'format', 'kritik'],
        felder: [
            { key: 'text', label: 'Text zum Übersetzen', beispiel: 'Unser Werkstatt-Service: Wir tauschen Ihren Vergaser innerhalb von 48 Stunden.', mehrzeilig: true },
            { key: 'sprache', label: 'Zielsprache und Markt', beispiel: 'Niederländisch für Kundschaft in den Niederlanden' },
            { key: 'glossar', label: 'Feste Begriffe (Quelle = Ziel)', beispiel: 'Vergaser = carburateur, Werkstatt = werkplaats' },
        ],
        vorlage: `Übersetze den folgenden Text in: {sprache}

Text:
"""
{text}
"""

Glossar, diese Begriffe immer genau so übersetzen: {glossar}

Regeln: Tonfall und Anrede an den Markt anpassen, Zahlen, Einheiten und Markennamen unverändert lassen, nichts hinzufügen oder weglassen.
Ausgabe:
1. die Übersetzung
2. eine Tabelle mit Stellen, an denen du frei übersetzt hast, und warum
3. Begriffe, bei denen du unsicher bist und die ich von einer Muttersprachlerin prüfen lassen sollte`,
        tools: ['chatgpt', 'deepl'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-deep-research-auftrag',
        title: 'Rechercheauftrag für ChatGPT Deep Research',
        kategorie: 'lernen',
        ziel: 'Eine Recherchefrage so eingrenzen, dass der Bericht belegte Quellen liefert und nicht ausufert.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'frage', label: 'Deine Recherchefrage', beispiel: 'Welche Förderprogramme gibt es 2026 für E-Lastenräder für Selbstständige in Sachsen?' },
            { key: 'quellen', label: 'Welche Quellen zählen?', beispiel: 'Nur offizielle Seiten von Bund, Land und Förderbanken' },
            { key: 'umfang', label: 'Wie lang soll der Bericht sein?', beispiel: 'höchstens 2 Seiten' },
        ],
        vorlage: `Recherchiere diese Frage: {frage}

Zulässige Quellen: {quellen}. Andere Quellen nur als Hinweis, nie als Beleg.
Umfang: {umfang}

Aufbau des Berichts:
1. Antwort in 3 Sätzen
2. Tabelle: Programm | Wer ist berechtigt | Höhe | Frist | Quelle mit Link und Datum
3. Was unklar oder widersprüchlich ist
Wenn du zu einem Punkt keine zulässige Quelle findest, schreib das so hin. Stell vor dem Start höchstens 3 Rückfragen, wenn die Frage zu breit ist.`,
        tools: ['chatgpt', 'perplexity'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-memory-steckbrief',
        title: 'Steckbrief für die ChatGPT-Personalisierung',
        kategorie: 'business',
        ziel: 'Einmal festlegen, was ChatGPT über dich und deine Arbeitsweise wissen soll, ohne sensible Daten preiszugeben.',
        techniken: ['rueckfragen', 'format', 'kritik'],
        felder: [
            { key: 'arbeit', label: 'Woran arbeitest du meistens?', beispiel: 'Marketing für einen kleinen Onlineshop, viele Texte und Tabellen' },
            { key: 'vorlieben', label: 'Wie magst du Antworten?', beispiel: 'kurz, mit Beispielen, keine Einleitungsfloskeln' },
        ],
        vorlage: `Hilf mir, die Personalisierung von ChatGPT einzurichten.

Meine Arbeit: {arbeit}
Meine Vorlieben bei Antworten: {vorlieben}

1. Stell mir bis zu 5 Rückfragen, die für bessere Antworten wichtig sind.
2. Schreib daraus zwei kurze Texte: „Was ChatGPT über mich wissen soll“ und „Wie ChatGPT antworten soll“, je höchstens 80 Wörter.
3. Prüf beide Texte: Steht darin etwas, das ich besser nicht dauerhaft speichere (Gesundheit, Finanzen, Namen von Kundschaft, Passwörter)? Streich es und sag mir, warum.`,
        tools: ['chatgpt'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-canvas-text-ueberarbeiten',
        title: 'Langen Text mit ChatGPT Abschnitt für Abschnitt überarbeiten',
        kategorie: 'content',
        ziel: 'Einen langen Text gezielt verbessern lassen, ohne dass ChatGPT alles umschreibt und deine Stimme verloren geht.',
        techniken: ['kontext', 'schritte', 'kritik'],
        felder: [
            { key: 'text', label: 'Dein Text', beispiel: 'Entwurf des Ratgebers „Moped winterfest machen“, ca. 1.200 Wörter', mehrzeilig: true },
            { key: 'ziel', label: 'Was soll besser werden?', beispiel: 'verständlicher für Einsteiger, kürzere Sätze, klare Zwischenüberschriften' },
        ],
        vorlage: `Hier ist mein Text:
"""
{text}
"""

Ziel der Überarbeitung: {ziel}

Arbeite in dieser Reihenfolge:
1. Nenne die 5 wichtigsten Schwächen mit Fundstelle, noch ohne zu ändern.
2. Warte auf mein Okay, welche Punkte du angehen sollst.
3. Überarbeite dann Abschnitt für Abschnitt und zeig jeweils Alt und Neu untereinander.
Behalte meine Wortwahl, wo sie nicht stört. Keine neuen Fakten, keine Füllsätze, keine Gedankenstriche.`,
        tools: ['chatgpt', 'wordtune'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-custom-gpt-bauplan',
        title: 'Bauplan für einen eigenen GPT',
        kategorie: 'technik',
        ziel: 'Einen eigenen GPT planen: Anweisungen, Gesprächsstarter und Wissensdateien, bevor du im Editor loslegst.',
        techniken: ['rolle', 'format', 'rueckfragen', 'kritik'],
        felder: [
            { key: 'zweck', label: 'Was soll dein GPT können?', beispiel: 'Kundenfragen zu Ersatzteilen beantworten, anhand unserer Teileliste' },
            { key: 'nutzer', label: 'Wer nutzt ihn?', beispiel: 'unser Support-Team, 4 Personen' },
        ],
        vorlage: `Du hilfst mir, einen eigenen GPT in ChatGPT zu planen.

Zweck: {zweck}
Nutzer: {nutzer}

1. Stell bis zu 4 Rückfragen.
2. Liefere danach: Name, Beschreibung in einem Satz, Anweisungen (höchstens 250 Wörter, mit Abschnitt „Wenn du etwas nicht weißt“), 4 Gesprächsstarter, Liste der Wissensdateien mit Inhalt und Format.
3. Nenne 3 Testfragen, mit denen ich prüfe, ob der GPT erfindet statt nachzuschlagen.
4. Weise auf Daten hin, die nicht in einen GPT gehören.`,
        tools: ['chatgpt'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'chatgpt-antwort-gegenpruefen',
        title: 'ChatGPT-Antwort gegenprüfen lassen',
        kategorie: 'lernen',
        ziel: 'Eine Antwort von ChatGPT auf Fehler, Lücken und unbelegte Behauptungen abklopfen, bevor du sie verwendest.',
        techniken: ['rolle', 'kritik', 'format'],
        felder: [
            { key: 'antwort', label: 'Die Antwort, die du prüfen willst', beispiel: 'Ein Absatz über Garantiefristen bei gebrauchten Mopeds', mehrzeilig: true },
            { key: 'zweck', label: 'Wofür willst du sie verwenden?', beispiel: 'als FAQ-Text auf unserer Shopseite' },
        ],
        vorlage: `Du bist ein kritischer Faktenprüfer. Prüf diese Antwort:
"""
{antwort}
"""
Verwendung: {zweck}

1. Zerleg die Antwort in einzelne Behauptungen und nummeriere sie.
2. Bewerte jede: belegbar und wahrscheinlich richtig | unsicher | wahrscheinlich falsch. Sag, welche Art Quelle sie belegen würde (Gesetzestext, Herstellerseite, Statistik).
3. Nenne, was fehlt, damit der Text für die Verwendung taugt.
4. Schreib eine vorsichtige Fassung, die nur die belegbaren Punkte enthält und Unsicheres als „bitte prüfen“ markiert.`,
        tools: ['chatgpt', 'perplexity'],
        fuer: ['chatgpt'],
    },
    {
        slug: 'code-review-ki',
        title: 'Code von der KI prüfen lassen, bevor er live geht',
        kategorie: 'technik',
        ziel: 'KI-generierten oder eigenen Code auf Sicherheitslücken, Fehler und unklare Stellen prüfen lassen, mit konkreten Fundstellen.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'code', label: 'Der Code (einfügen)', beispiel: 'Eine Funktion, die Formulardaten speichert und eine Bestätigungsmail schickt', mehrzeilig: true },
            { key: 'kontext', label: 'Wofür ist der Code?', beispiel: 'Kontaktformular einer Vereinsseite, gebaut mit Lovable' },
        ],
        vorlage: `Du bist erfahrener Entwickler mit Schwerpunkt Sicherheit. Prüfe diesen Code:
\"\"\"
{code}
\"\"\"
Einsatz: {kontext}

Gib das Ergebnis als Tabelle aus: Nr. | Fundstelle | Problem | Schwere (hoch, mittel, niedrig) | Vorschlag.
Achte besonders auf: Geheimnisse im Code, fehlende Eingabeprüfung, Zugriff auf fremde Daten, Fehlermeldungen mit internen Details.
Schreib danach in drei Sätzen, was ich zuerst beheben sollte. Erfinde keine Probleme: Wenn eine Stelle in Ordnung ist, sag das.`,
        tools: ['cursor', 'github-copilot', 'claude'],
    },
    {
        slug: 'app-idee-zu-bauplan',
        title: 'App-Idee in einen Bauplan für Lovable, Bolt oder v0 verwandeln',
        kategorie: 'technik',
        ziel: 'Aus einer vagen App-Idee einen Bauplan mit kleinen Schritten machen, den du nacheinander in ein Vibe-Coding-Tool gibst.',
        techniken: ['rueckfragen', 'schritte', 'format'],
        felder: [
            { key: 'idee', label: 'Deine App-Idee', beispiel: 'Eine Seite, auf der Vereinsmitglieder Schichten für das Sommerfest eintragen' },
            { key: 'nutzer', label: 'Wer nutzt sie?', beispiel: 'etwa 40 Mitglieder, teils wenig technikaffin, meist am Handy' },
        ],
        vorlage: `Ich will diese App mit einem Vibe-Coding-Tool bauen: {idee}
Nutzer: {nutzer}

1. Stell bis zu 5 Rückfragen zu Funktionen, Daten und Datenschutz.
2. Schreib danach einen Bauplan aus 6 bis 10 kleinen Schritten. Jeder Schritt ist ein fertiger Prompt für das Tool, beschreibt genau eine Funktion und endet mit „Zeig mir danach, was du geändert hast“.
3. Markiere die Schritte, bei denen personenbezogene Daten gespeichert werden, und schreib dazu, was ich vorher klären muss.
4. Nenne am Ende, was die erste Version bewusst noch nicht können soll.`,
        tools: ['lovable', 'bolt-new', 'v0'],
    },
    {
        slug: 'bildserie-einheitlicher-stil',
        title: 'Bildserie im einheitlichen Stil planen',
        kategorie: 'content',
        ziel: 'Mehrere Bilder für Website oder Social Media so beschreiben, dass sie zusammenpassen: gleiche Farben, gleiches Licht, gleicher Stil.',
        techniken: ['kontext', 'format', 'beispiele'],
        felder: [
            { key: 'thema', label: 'Thema der Serie', beispiel: 'Werkstatt-Alltag für den Instagram-Kanal eines Rollerladens' },
            { key: 'anzahl', label: 'Wie viele Bilder?', beispiel: '6' },
            { key: 'stil', label: 'Stil und Stimmung', beispiel: 'warm, fotorealistisch, leicht entsättigt, Morgenlicht' },
        ],
        vorlage: `Plane eine Bildserie mit {anzahl} Bildern zum Thema: {thema}
Stil: {stil}

1. Schreib zuerst einen Stil-Block (höchstens 40 Wörter), den ich an jede Bildbeschreibung anhänge: Farben, Licht, Perspektive, Bildformat, was nie vorkommen darf.
2. Schreib dann für jedes Bild eine Beschreibung mit Motiv, Bildausschnitt und Detail, das die Serie verbindet.
3. Keine echten Personen, keine Markenlogos, kein Text im Bild.
Gib alles als nummerierte Liste aus, jede Beschreibung schon mit angehängtem Stil-Block.`,
        tools: ['midjourney', 'chatgpt', 'ideogram'],
    },
    {
        slug: 'vertrag-verstehen',
        title: 'Vertrag oder AGB in verständlicher Sprache zusammenfassen',
        kategorie: 'business',
        ziel: 'Einen Vertrag oder AGB-Text schnell verstehen: wichtigste Pflichten, Fristen, Kosten und Stolperstellen, ohne Rechtsberatung zu ersetzen.',
        techniken: ['rolle', 'format', 'kritik'],
        felder: [
            { key: 'text', label: 'Vertragstext (einfügen, ohne Namen und Kontodaten)', beispiel: 'AGB eines Software-Abos mit automatischer Verlängerung', mehrzeilig: true },
            { key: 'rolle', label: 'Deine Rolle im Vertrag', beispiel: 'Kunde, kleiner Betrieb mit 5 Mitarbeitenden' },
        ],
        vorlage: `Fasse diesen Vertragstext für mich verständlich zusammen. Meine Rolle: {rolle}
\"\"\"
{text}
\"\"\"

Gliederung:
1. Worum es geht, in 3 Sätzen
2. Tabelle: Pflicht | Wer | Frist oder Betrag | Fundstelle im Text
3. Kündigung, Verlängerung und Kosten, die leicht übersehen werden
4. Klauseln, die für mich ungewöhnlich oder nachteilig wirken, mit Fundstelle
5. Fragen, die ich vor der Unterschrift stellen sollte
Zitiere nur, was im Text steht. Weise am Ende darauf hin, dass dies keine Rechtsberatung ist und welche Punkte ich anwaltlich prüfen lassen sollte.`,
        tools: ['claude', 'chatgpt'],
    },
    {
        slug: 'verein-mitgliederbrief',
        title: 'Mitgliederbrief oder Einladung für den Verein',
        kategorie: 'business',
        ziel: 'Einen freundlichen, klaren Brief an Vereinsmitglieder schreiben: Einladung zur Versammlung, Helferaufruf oder Neuigkeiten.',
        techniken: ['kontext', 'format', 'varianten'],
        felder: [
            { key: 'anlass', label: 'Anlass', beispiel: 'Einladung zur Jahreshauptversammlung am 14. März, 19 Uhr, Vereinsheim' },
            { key: 'punkte', label: 'Was muss rein?', beispiel: 'Tagesordnung mit Kassenbericht und Vorstandswahl, Anträge bis 1. März, Bitte um Rückmeldung', mehrzeilig: true },
            { key: 'ton', label: 'Ton', beispiel: 'herzlich, Du-Form, nicht zu lang' },
        ],
        vorlage: `Schreib einen Brief an die Mitglieder unseres Vereins.
Anlass: {anlass}
Inhalte: {punkte}
Ton: {ton}

Anforderungen: Betreff, kurze Begrüßung, alle Fakten aus den Inhalten vollständig und ohne Ergänzungen, klare Bitte am Ende, höchstens 200 Wörter.
Liefere zwei Varianten: eine für E-Mail und eine kürzere für die WhatsApp-Gruppe.
Wenn für eine formale Einladung (etwa Fristen laut Satzung) Angaben fehlen, frag nach, statt sie zu erfinden.`,
        tools: [],
    },
    {
        slug: 'agentur-kundenbriefing',
        title: 'Kundenbriefing für Agenturen strukturieren',
        kategorie: 'launch',
        ziel: 'Aus Gesprächsnotizen mit einem Kunden ein klares Briefing machen: Ziele, Zielgruppe, Umfang, Budget, offene Punkte.',
        techniken: ['rolle', 'format', 'rueckfragen'],
        felder: [
            { key: 'notizen', label: 'Deine Notizen aus dem Kundengespräch', beispiel: 'Bäckerei mit 3 Filialen, will mehr junge Kundschaft, Instagram läuft schlecht, Budget ca. 1.500 Euro im Monat', mehrzeilig: true },
            { key: 'leistung', label: 'Was bietet ihr an?', beispiel: 'Social Media, Fotografie, Kampagnen' },
        ],
        vorlage: `Du bist Projektleitung in einer Marketing-Agentur. Hier sind meine Notizen aus dem Erstgespräch:
\"\"\"
{notizen}
\"\"\"
Unsere Leistungen: {leistung}

Erstelle ein Briefing mit den Abschnitten: Ausgangslage, Ziel (messbar formuliert), Zielgruppe, Umfang, Budget und Zeitrahmen, Erfolgsmessung, Abgrenzung (was nicht dazugehört).
Markiere alles, was in den Notizen fehlt, mit [OFFEN] und formuliere dazu eine Rückfrage an den Kunden.
Schlag am Ende eine kurze Mail vor, mit der ich das Briefing zur Freigabe schicke.`,
        tools: ['notion', 'chatgpt'],
    },
]

const fill = (template, values) => template.replace(/\{(\w+)\}/g, (m, key) => (values[key] ? values[key] : `[${key.toUpperCase()}]`))

// Beispiel-Fassung: alle Felder mit den Beispielwerten gefüllt. Dient als Vorschau und für llms.txt.
export const examplePrompt = (p) => fill(p.vorlage, Object.fromEntries(p.felder.map((f) => [f.key, f.beispiel])))
export const fillPrompt = fill

export const getPrompts = () => PROMPTS
export const getPrompt = (slug) => PROMPTS.find((p) => p.slug === slug) || null
export const promptsByKategorie = () =>
    Object.entries(PROMPT_KATEGORIEN).map(([key, k]) => ({ key, ...k, prompts: PROMPTS.filter((p) => p.kategorie === key) }))
