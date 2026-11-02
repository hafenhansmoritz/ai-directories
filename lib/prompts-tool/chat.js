// Tool-spezifische Prompts (Content-Plan Cluster A). Jeder Prompt hat `fuer: [toolSlug]`.
// PROMPTS: Vorlagen im Format von lib/prompts.js. TEXTE: Intro/Tipp/Fehler/Jean je Prompt-Slug.
// SEITEN: Texte der Seiten /prompts/tool/[slug] im Format von TOOL_PROMPT_TEXTE in lib/prompt-tools.js.
// Funktionen geprüft am 2026-11-02 in der offiziellen Hilfe der Anbieter (Links in SEITEN[tool].quellen).

export const PROMPTS = [
    // Google Gemini
    {
        slug: 'gemini-gem-anweisungen',
        title: 'Anweisungen für ein eigenes Gem in Gemini schreiben',
        kategorie: 'business',
        ziel: 'Die Anweisungen für ein Gem formulieren, damit Gemini eine wiederkehrende Aufgabe immer gleich erledigt.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'aufgabe', label: 'Wofür soll das Gem da sein?', beispiel: 'Produkttexte für unseren Shop mit Fahrradzubehör' },
            { key: 'stil', label: 'Wie soll es schreiben oder antworten?', beispiel: 'Du-Form, kurze Sätze, keine Superlative, höchstens 120 Wörter' },
            { key: 'wissen', label: 'Welche Dateien legst du unter „Wissen“ ab?', beispiel: 'Produktliste aus Google Drive, Styleguide als PDF' },
        ],
        vorlage: `Ich lege in Gemini ein Gem an und brauche dafür die Anweisungen.

Zweck des Gems: {aufgabe}
Gewünschter Stil: {stil}
Dateien unter „Wissen“: {wissen}

1. Stell mir zuerst bis zu 3 Rückfragen zu Zielgruppe, Ausgabeformat und No-Gos.
2. Schreib danach die Anweisungen in höchstens 200 Wörtern, gegliedert in: Rolle, Aufgabe, Stil, Umgang mit den Dateien, was das Gem nie tun soll, Verhalten bei fehlenden Infos.
3. Gib die Anweisungen in einem Codeblock aus, damit ich sie direkt ins Feld für die Gem-Anweisungen kopieren kann.
4. Nenn mir zum Schluss drei kurze Test-Eingaben, mit denen ich das Gem nach dem Speichern prüfe.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-gmail-postfach-zusammenfassen',
        title: 'E-Mails in Gmail mit Gemini zusammenfassen und sortieren',
        kategorie: 'business',
        ziel: 'Mit der verbundenen Google-Workspace-App einen Überblick über wichtige Mails bekommen, mit offenen Aufgaben und Fristen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'zeitraum', label: 'Welcher Zeitraum?', beispiel: 'die letzten 7 Tage' },
            { key: 'thema', label: 'Um welches Thema oder welche Absender geht es?', beispiel: 'alles zum Umbau der Werkstatt, Absender Firma Holzbau Krämer und unser Architekt' },
            { key: 'ziel', label: 'Wofür brauchst du den Überblick?', beispiel: 'Ich will morgen im Jour fixe wissen, was offen ist' },
        ],
        vorlage: `@Gmail Schau in meine E-Mails aus folgendem Zeitraum: {zeitraum}.
Thema und Absender: {thema}
Wofür ich den Überblick brauche: {ziel}

Gib mir:
1. Eine Zusammenfassung in höchstens 5 Stichpunkten.
2. Eine Tabelle der offenen Punkte: Was ist zu tun | Wer ist dran | Frist laut Mail | Datum der Mail.
3. Widersprüche zwischen älteren und neueren Mails, falls es welche gibt, mit dem Datum beider Mails.

Wenn du zu einem Punkt keine passende Mail findest, schreib „nicht gefunden“, statt etwas zu ergänzen.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-drive-dokumente-auswerten',
        title: 'Dokumente aus Google Drive mit Gemini vergleichen',
        kategorie: 'business',
        ziel: 'Mehrere Dateien aus Drive gegeneinanderlegen, ohne sie einzeln zu öffnen, mit klarer Angabe, welche Info aus welcher Datei stammt.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'dateien', label: 'Welche Dateien (Name oder Stichwörter)?', beispiel: 'die drei Angebote für die neue Website, alle mit „Angebot Website“ im Titel' },
            { key: 'kriterien', label: 'Wonach soll verglichen werden?', beispiel: 'Preis, Leistungsumfang, Zeitplan, Wartung nach dem Start' },
            { key: 'entscheidung', label: 'Welche Entscheidung steht an?', beispiel: 'Welche Agentur laden wir zum zweiten Gespräch ein?' },
        ],
        vorlage: `@Google Drive Such diese Dateien: {dateien}

Vergleiche sie nach diesen Kriterien: {kriterien}
Die Entscheidung, die ich treffen muss: {entscheidung}

1. Erstell eine Tabelle: Kriterium | Datei 1 | Datei 2 | Datei 3. Schreib in jede Zelle den Wert aus der Datei, ohne ihn umzurechnen.
2. Markiere Kriterien, zu denen eine Datei nichts sagt, mit „fehlt“.
3. Nenn danach die drei Fragen, die ich vor der Entscheidung klären sollte.
4. Prüf am Ende: Hast du jede Zahl in der Tabelle in der jeweiligen Datei gefunden? Nenn mir jede Zahl, bei der du unsicher bist.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-mail-zu-termin-und-aufgabe',
        title: 'Aus einer Mail Termine und Aufgaben anlegen lassen',
        kategorie: 'business',
        ziel: 'Termine aus einer Mail in Google Kalender eintragen und To-dos in Google Tasks anlegen, ohne Abtippen.',
        techniken: ['kontext', 'rueckfragen'],
        felder: [
            { key: 'mail', label: 'Welche Mail (Absender und Stichwort)?', beispiel: 'die Mail von Nina zum Vereinsfest im Juni' },
            { key: 'kalender', label: 'Was soll in den Kalender?', beispiel: 'das Fest selbst und das Vorbereitungstreffen' },
            { key: 'aufgaben', label: 'Welche Aufgaben ergeben sich für dich?', beispiel: 'Grill organisieren, Helferliste verschicken' },
        ],
        vorlage: `Schau in meine Mails und finde: {mail}

1. Trag diese Termine in meinen Google Kalender ein: {kalender}. Übernimm Datum, Uhrzeit und Ort genau so, wie sie in der Mail stehen.
2. Leg in Google Tasks diese Aufgaben an, jeweils mit einer sinnvollen Frist vor dem Termin: {aufgaben}
3. Fehlt in der Mail eine Uhrzeit oder ein Ort, leg nichts an und frag mich vorher.

Zeig mir zum Schluss eine kurze Liste von allem, was du angelegt hast.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-deep-research-auftrag',
        title: 'Recherche-Auftrag für Deep Research in Gemini',
        kategorie: 'lernen',
        ziel: 'Eine Frage so formulieren, dass Deep Research einen brauchbaren Bericht liefert und der Rechercheplan vorher prüfbar ist.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'frage', label: 'Deine Recherchefrage', beispiel: 'Welche Förderprogramme gibt es 2026 für Lastenräder in Unternehmen in Deutschland?' },
            { key: 'zweck', label: 'Wofür brauchst du den Bericht?', beispiel: 'Entscheidungsvorlage für die Geschäftsführung, 2 Seiten' },
            { key: 'quellen', label: 'Welche Quellen sind dir wichtig?', beispiel: 'offizielle Seiten von Bund, Ländern und Förderbanken, keine Händlerblogs' },
        ],
        vorlage: `Recherchiere zu dieser Frage: {frage}

Zweck des Berichts: {zweck}
Bevorzugte Quellen: {quellen}

Aufbau des Berichts:
1. Kurzantwort in höchstens 5 Sätzen.
2. Tabelle der wichtigsten Ergebnisse mit Quelle und Stand der Information.
3. Was unklar oder widersprüchlich ist, mit beiden Quellen.
4. Offene Punkte, die ich selbst bei der zuständigen Stelle prüfen sollte.

Nenn bei jeder Zahl, jeder Frist und jedem Betrag die Quelle. Wenn eine Info älter als 12 Monate ist, kennzeichne sie.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-canvas-praesentation',
        title: 'Präsentation in Gemini Canvas entwerfen',
        kategorie: 'business',
        ziel: 'In Canvas einen Folienentwurf erstellen lassen, der eine klare Botschaft pro Folie hat und sich danach gezielt bearbeiten lässt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Thema der Präsentation', beispiel: 'Ergebnisse unserer Kundenumfrage 2026' },
            { key: 'publikum', label: 'Wer sieht sie?', beispiel: 'Team aus Vertrieb und Service, 20 Leute, 15 Minuten Slot' },
            { key: 'material', label: 'Welches Material hast du (Datei hochladen oder einfügen)?', beispiel: 'Auswertung der Umfrage als PDF', mehrzeilig: true },
        ],
        vorlage: `Erstell in Canvas eine Präsentation.

Thema: {thema}
Publikum und Rahmen: {publikum}
Material: {material}

Vorgaben:
- 8 bis 10 Folien, pro Folie eine Kernaussage als Überschrift (ein ganzer Satz, keine Stichwort-Überschrift).
- Höchstens 4 Stichpunkte pro Folie.
- Eine Folie mit den drei wichtigsten Zahlen aus dem Material, eine Schlussfolie mit nächsten Schritten.
- Nutze nur Zahlen, die im Material stehen. Wo dir eine Zahl fehlt, setz [Zahl ergänzen] ein.`,
        tools: ['google-gemini', 'gamma', 'canva'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-canvas-lernquiz',
        title: 'Lernquiz aus eigenen Unterlagen mit Gemini Canvas',
        kategorie: 'lernen',
        ziel: 'Aus Skript oder Notizen ein Quiz bauen lassen, das wirklich abfragt, was in deinen Unterlagen steht.',
        techniken: ['kontext', 'format', 'beispiele'],
        felder: [
            { key: 'unterlagen', label: 'Welche Unterlagen (hochladen oder einfügen)?', beispiel: 'Mitschrift Kapitel 3 und 4, Bilanzierung', mehrzeilig: true },
            { key: 'niveau', label: 'Für wen und welches Niveau?', beispiel: 'BWL, 2. Semester, Klausur in drei Wochen' },
            { key: 'anzahl', label: 'Wie viele Fragen?', beispiel: '15' },
        ],
        vorlage: `Erstell in Canvas ein interaktives Quiz aus diesen Unterlagen:
{unterlagen}

Zielgruppe und Niveau: {niveau}
Anzahl der Fragen: {anzahl}

Vorgaben:
- Mische Multiple Choice mit vier Antworten und kurze Rechenaufgaben.
- Nach jeder Antwort eine Erklärung in zwei Sätzen, warum sie richtig oder falsch ist.
- Frag nur ab, was in den Unterlagen steht. Beispiel für eine gute Frage: „Auf welcher Seite der Bilanz steht das Eigenkapital?“
- Zeig am Ende die Punktzahl und welche Themen ich wiederholen sollte.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },
    {
        slug: 'gemini-foto-analysieren',
        title: 'Foto oder Screenshot mit Gemini auswerten',
        kategorie: 'lernen',
        ziel: 'Ein hochgeladenes Bild gezielt auswerten lassen, mit klarer Trennung zwischen dem, was zu sehen ist, und dem, was Gemini vermutet.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'bild', label: 'Was zeigt dein Bild?', beispiel: 'Foto vom Typenschild unserer alten Heizung im Keller' },
            { key: 'frage', label: 'Was willst du wissen?', beispiel: 'Welches Baujahr und welche Leistung hat die Anlage?' },
            { key: 'zweck', label: 'Wofür brauchst du die Antwort?', beispiel: 'Ich will dem Heizungsbauer vorab die Daten schicken' },
        ],
        vorlage: `Ich lade ein Bild hoch. Es zeigt: {bild}

Meine Frage: {frage}
Wofür ich die Antwort brauche: {zweck}

Antworte in drei Teilen:
1. Was auf dem Bild klar lesbar ist, wörtlich abgeschrieben.
2. Was du daraus ableitest, mit Begründung.
3. Was du nicht sicher erkennen kannst und wie ich es selbst prüfe.

Wenn das Bild unscharf ist oder etwas abgeschnitten ist, sag mir, welches Foto ich zusätzlich machen soll.`,
        tools: ['google-gemini'],
        fuer: ['google-gemini'],
    },

    // Claude
    {
        slug: 'claude-projekt-anweisungen',
        title: 'Projektanweisungen für ein Claude-Projekt schreiben',
        kategorie: 'business',
        ziel: 'Die Anweisungen für ein Claude-Projekt so formulieren, dass jeder neue Chat im Projekt gleich arbeitet.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'projekt', label: 'Worum geht es im Projekt?', beispiel: 'Kundenservice-Antworten für unseren Onlineshop mit Motorradbekleidung' },
            { key: 'stil', label: 'Wie soll Claude schreiben?', beispiel: 'Du-Form, freundlich, sachlich, höchstens 150 Wörter pro Antwort' },
            { key: 'wissen', label: 'Was liegt im Projektwissen?', beispiel: 'Rückgabebedingungen, Größentabellen, FAQ als PDF' },
        ],
        vorlage: `Ich richte in Claude ein Projekt ein und brauche den Text für „Set project instructions“.

Projekt: {projekt}
Gewünschter Stil: {stil}
Dateien im Projektwissen: {wissen}

1. Stell mir zuerst bis zu 4 Rückfragen zu Zielgruppe, Zweck und No-Gos.
2. Schreib danach die Anweisungen in höchstens 250 Wörtern, gegliedert in: Rolle, Ziel, Stil, wann welche Datei aus dem Projektwissen genutzt wird, was nie passieren darf, Verhalten bei fehlenden Infos.
3. Gib die Anweisungen in einem Codeblock aus.
4. Schreib darunter, welche Infos ins Projektwissen gehören statt in die Anweisungen, weil Chats im Projekt sich sonst nicht gegenseitig kennen.`,
        tools: ['claude'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-projektwissen-aufbauen',
        title: 'Projektwissen für Claude sortieren und vorbereiten',
        kategorie: 'business',
        ziel: 'Herausfinden, welche Dateien wirklich ins Projektwissen gehören und wie du sie aufbereitest, damit Claude sie zuverlässig nutzt.',
        techniken: ['kontext', 'schritte', 'format'],
        felder: [
            { key: 'projekt', label: 'Wofür ist das Projekt?', beispiel: 'Angebote und Kalkulationen für unsere Tischlerei' },
            { key: 'dateien', label: 'Welche Dateien hast du (Liste)?', beispiel: 'Preisliste 2026.xlsx, 40 alte Angebote als PDF, AGB, Materialkatalog 300 Seiten', mehrzeilig: true },
            { key: 'fragen', label: 'Welche Fragen soll Claude im Projekt beantworten?', beispiel: 'Was kostet ein Einbauschrank in Eiche mit 2,40 m Breite?' },
        ],
        vorlage: `Ich will ein Claude-Projekt mit Projektwissen füllen und vorher aufräumen.

Zweck des Projekts: {projekt}
Vorhandene Dateien:
{dateien}

Typische Fragen im Projekt: {fragen}

1. Sortiere die Dateien in drei Gruppen: gehört ins Projektwissen, nur bei Bedarf in einen einzelnen Chat, weglassen. Begründe jede Einordnung in einem Satz.
2. Sag mir, welche Dateien ich vorher kürzen oder aufteilen sollte, und wie (zum Beispiel nur die relevanten Kapitel, eine Datei pro Thema).
3. Schlag für jede Datei einen klaren Dateinamen vor, der den Inhalt verrät.
4. Gib zum Schluss drei Testfragen aus, mit denen ich prüfe, ob Claude die richtige Datei findet.`,
        tools: ['claude'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-artefakt-rechner',
        title: 'Kleinen Rechner als Artefakt in Claude bauen',
        kategorie: 'technik',
        ziel: 'Einen interaktiven Rechner als Artefakt erstellen lassen, den du sofort benutzen und mit anderen teilen kannst.',
        techniken: ['kontext', 'format', 'beispiele'],
        felder: [
            { key: 'zweck', label: 'Was soll der Rechner ausrechnen?', beispiel: 'Kosten pro Kilometer für unser Firmenauto aus Verbrauch, Spritpreis, Versicherung und Wartung' },
            { key: 'eingaben', label: 'Welche Eingabefelder braucht er?', beispiel: 'Kilometer pro Jahr, Verbrauch l/100 km, Spritpreis, Versicherung pro Jahr, Wartung pro Jahr' },
            { key: 'beispiel', label: 'Ein Rechenbeispiel mit Ergebnis', beispiel: '15.000 km, 6 l, 1,80 EUR, 600 EUR, 400 EUR ergibt etwa 0,17 EUR pro km' },
        ],
        vorlage: `Bau mir als Artefakt einen interaktiven Rechner.

Zweck: {zweck}
Eingabefelder: {eingaben}
Rechenbeispiel zum Prüfen: {beispiel}

Vorgaben:
- Eine Seite, deutsche Beschriftung, Komma als Dezimaltrennzeichen.
- Ergebnis aktualisiert sich sofort bei jeder Eingabe.
- Unter dem Ergebnis eine Zeile, die den Rechenweg in Worten zeigt.
- Prüf mit dem Rechenbeispiel, ob dein Ergebnis stimmt, und nenn mir das Ergebnis deiner Prüfung unter dem Artefakt.`,
        tools: ['claude'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-artefakt-ablaufdiagramm',
        title: 'Ablaufdiagramm als Artefakt in Claude erstellen',
        kategorie: 'business',
        ziel: 'Einen Prozess aus deiner Beschreibung als Diagramm darstellen lassen, das du im Artefakt-Fenster weiter anpasst.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'prozess', label: 'Welchen Ablauf willst du zeigen?', beispiel: 'Wie eine Reklamation bei uns läuft, vom Eingang bis zur Gutschrift', mehrzeilig: true },
            { key: 'rollen', label: 'Wer ist beteiligt?', beispiel: 'Kunde, Service, Lager, Buchhaltung' },
            { key: 'zweck', label: 'Wofür brauchst du das Diagramm?', beispiel: 'Einarbeitung neuer Kolleginnen im Service' },
        ],
        vorlage: `Erstell als Artefakt ein Ablaufdiagramm.

Ablauf: {prozess}
Beteiligte: {rollen}
Zweck: {zweck}

1. Wenn in meiner Beschreibung eine Entscheidung oder ein Schritt unklar ist, frag erst nach, höchstens 3 Fragen.
2. Zeichne danach das Diagramm mit einer Spalte pro Beteiligtem, Entscheidungen als Rauten mit Ja/Nein.
3. Halte Beschriftungen kurz, höchstens 6 Wörter pro Kasten.
4. Schreib unter das Artefakt, welche Schritte du ergänzt hast, die nicht in meiner Beschreibung standen.`,
        tools: ['claude'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-langes-pdf-befragen',
        title: 'Langes PDF mit Claude gezielt auswerten',
        kategorie: 'lernen',
        ziel: 'Ein langes Dokument hochladen und nur die Stellen herausholen, die du brauchst, jeweils mit Seitenangabe zum Nachprüfen.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'dokument', label: 'Was für ein Dokument lädst du hoch?', beispiel: 'Ausschreibung der Stadt für die Reinigung der Schulen, 120 Seiten' },
            { key: 'fragen', label: 'Welche Fragen soll Claude beantworten?', beispiel: 'Abgabefrist, Eignungsnachweise, Bewertungskriterien, Vertragsstrafen', mehrzeilig: true },
            { key: 'rolle', label: 'Aus wessen Sicht liest du?', beispiel: 'kleiner Reinigungsbetrieb, 25 Mitarbeitende, erste öffentliche Ausschreibung' },
        ],
        vorlage: `Ich lade ein PDF hoch: {dokument}
Ich lese es aus dieser Sicht: {rolle}

Beantworte diese Fragen nur auf Grundlage des Dokuments:
{fragen}

Format:
- Pro Frage: Antwort in höchstens 3 Sätzen, darunter ein wörtliches Zitat und die Seitenzahl laut PDF-Viewer.
- Steht etwas nicht im Dokument, schreib „steht nicht im Dokument“.
- Zum Schluss: drei Stellen, die für mich als {rolle} riskant oder leicht zu übersehen sind, ebenfalls mit Seitenzahl.`,
        tools: ['claude'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-dokumente-abgleichen',
        title: 'Zwei Fassungen eines Dokuments mit Claude abgleichen',
        kategorie: 'business',
        ziel: 'Alte und neue Fassung eines Vertrags, Konzepts oder Angebots vergleichen und nur die inhaltlichen Änderungen sehen.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'art', label: 'Was für Dokumente sind es?', beispiel: 'Mietvertrag für unsere Werkstatt, alte Fassung von 2021 und neuer Entwurf des Vermieters' },
            { key: 'fokus', label: 'Worauf soll Claude besonders achten?', beispiel: 'Miete, Nebenkosten, Kündigungsfristen, Pflichten bei Umbauten' },
        ],
        vorlage: `Ich lade zwei Dateien hoch: {art}
Datei 1 ist die alte Fassung, Datei 2 die neue.

Vergleiche beide und zeig mir nur inhaltliche Änderungen, keine reinen Umformulierungen.

1. Tabelle: Abschnitt | Alte Fassung (Zitat) | Neue Fassung (Zitat) | Was das für mich bedeutet.
2. Achte besonders auf: {fokus}
3. Liste danach Abschnitte, die neu dazugekommen oder ganz weggefallen sind.
4. Prüf am Ende, ob du jeden Abschnitt beider Dateien berücksichtigt hast, und nenn mir Stellen, die du nicht sicher zuordnen konntest.

Das ist keine Rechtsberatung. Markiere Punkte, die ich mit einer Fachperson besprechen sollte.`,
        tools: ['claude'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-excel-tabelle-analysieren',
        title: 'Excel-Datei in Claude hochladen und auswerten',
        kategorie: 'technik',
        ziel: 'Eine XLSX-Datei auswerten lassen, mit nachvollziehbaren Rechnungen statt geschätzter Zahlen.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'datei', label: 'Was steht in der Datei?', beispiel: 'Umsätze 2025 pro Monat und Filiale, 3 Filialen, Spalten Monat, Filiale, Umsatz, Kunden' },
            { key: 'fragen', label: 'Was willst du wissen?', beispiel: 'Welche Filiale wächst am stärksten, und in welchen Monaten bricht der Umsatz ein?', mehrzeilig: true },
            { key: 'ausgabe', label: 'Was brauchst du am Ende?', beispiel: 'Diagramm plus 5 Sätze für die Monatsrunde' },
        ],
        vorlage: `Ich lade eine Excel-Datei hoch. Inhalt: {datei}

Meine Fragen:
{fragen}

1. Prüf zuerst die Daten: fehlende Werte, doppelte Zeilen, auffällige Ausreißer. Sag mir, was du gefunden hast, bevor du rechnest.
2. Rechne die Auswertung mit der Datei, nicht im Kopf, und zeig mir die Formeln oder den Rechenweg.
3. Liefere am Ende: {ausgabe}
4. Trenn klar zwischen dem, was die Zahlen zeigen, und deiner Vermutung über die Gründe.`,
        tools: ['claude', 'microsoft-copilot'],
        fuer: ['claude'],
    },
    {
        slug: 'claude-schreibstil-aus-beispielen',
        title: 'Claude den eigenen Schreibstil beibringen',
        kategorie: 'content',
        ziel: 'Aus eigenen Texten eine Stilbeschreibung ableiten lassen, die du als Projektanweisung oder Projektwissen weiterverwendest.',
        techniken: ['beispiele', 'format', 'kritik'],
        felder: [
            { key: 'texte', label: 'Zwei bis drei eigene Texte (einfügen)', beispiel: 'Zwei Newsletter-Ausgaben und ein LinkedIn-Post von dir', mehrzeilig: true },
            { key: 'einsatz', label: 'Wofür soll Claude später so schreiben?', beispiel: 'Newsletter für Werkstattkunden' },
        ],
        vorlage: `Hier sind Texte, die ich selbst geschrieben habe:
---
{texte}
---

Später soll Claude in diesem Stil schreiben für: {einsatz}

1. Beschreib meinen Stil in höchstens 10 Regeln: Satzlänge, Anrede, Wortwahl, Humor, Aufbau, typische Einstiege und Schlüsse. Jede Regel mit einem kurzen Beleg aus meinen Texten.
2. Nenn 5 Dinge, die ich nie mache, die KI-Texte aber oft tun.
3. Schreib zum Test einen Absatz von 80 Wörtern zu einem Thema aus {einsatz} in meinem Stil.
4. Prüf deinen Testabsatz gegen deine Regeln und markiere, wo er abweicht.

Gib die Regeln aus Schritt 1 und 2 zusätzlich in einem Codeblock aus, damit ich sie als Projektanweisung speichern kann.`,
        tools: ['claude'],
        fuer: ['claude'],
    },

    // Microsoft Copilot
    {
        slug: 'copilot-word-entwurf-aus-notizen',
        title: 'Mit Copilot in Word einen Entwurf aus Notizen schreiben',
        kategorie: 'business',
        ziel: 'Aus Stichpunkten oder einer vorhandenen Datei in Word einen ersten Entwurf mit fester Gliederung erstellen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'dokument', label: 'Was für ein Dokument entsteht?', beispiel: 'Konzept für die Einführung einer Vier-Tage-Woche im Kundenservice' },
            { key: 'notizen', label: 'Deine Notizen oder die Datei, auf die Copilot zugreifen soll', beispiel: 'Notizen aus dem Workshop, Datei „Workshop Arbeitszeit.docx“', mehrzeilig: true },
            { key: 'leser', label: 'Wer liest es?', beispiel: 'Geschäftsführung und Betriebsrat' },
        ],
        vorlage: `Erstell einen Entwurf für folgendes Dokument: {dokument}

Grundlage: {notizen}
Leser: {leser}

Gliederung:
1. Ausgangslage (höchstens 5 Sätze)
2. Vorschlag
3. Vorteile und Risiken als Tabelle
4. Offene Fragen
5. Nächste Schritte mit Zuständigkeit

Schreib sachlich und in kurzen Absätzen. Übernimm nur Fakten aus der Grundlage. Wo dir eine Angabe fehlt, setz [ergänzen] ein.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-word-dokument-verstehen',
        title: 'Langes Word-Dokument mit Copilot verstehen',
        kategorie: 'business',
        ziel: 'Ein umfangreiches Dokument zusammenfassen und gezielt befragen, bevor du es in einer Besprechung vertreten musst.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'rolle', label: 'In welcher Rolle liest du?', beispiel: 'Teamleitung Lager, ich muss das Konzept morgen dem Team erklären' },
            { key: 'fragen', label: 'Welche Fragen hast du an das Dokument?', beispiel: 'Was ändert sich für die Schichtplanung? Ab wann gilt das? Wer entscheidet?', mehrzeilig: true },
        ],
        vorlage: `Fass dieses Dokument für mich zusammen. Ich lese es als: {rolle}

1. Die Kernaussage in 2 Sätzen.
2. Die 5 wichtigsten Punkte als Liste, jeweils mit Verweis auf den Abschnitt.
3. Beantworte diese Fragen nur mit Inhalten aus dem Dokument:
{fragen}
4. Nenn mir die drei Stellen, bei denen mein Team am ehesten nachfragen oder widersprechen wird, und warum.

Wenn das Dokument eine Frage nicht beantwortet, schreib das ausdrücklich.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-word-text-umschreiben',
        title: 'Markierten Text in Word mit Copilot umschreiben',
        kategorie: 'content',
        ziel: 'Einen markierten Absatz für eine andere Zielgruppe umformulieren, ohne dass Inhalt oder Zahlen verloren gehen.',
        techniken: ['kontext', 'varianten', 'kritik'],
        felder: [
            { key: 'zielgruppe', label: 'Für wen soll der Text passen?', beispiel: 'Kundinnen und Kunden ohne Fachwissen' },
            { key: 'ton', label: 'Welcher Ton?', beispiel: 'freundlich, klar, ohne Behördendeutsch' },
            { key: 'laenge', label: 'Welche Länge?', beispiel: 'höchstens so lang wie das Original' },
        ],
        vorlage: `Schreib den markierten Text um.

Zielgruppe: {zielgruppe}
Ton: {ton}
Länge: {laenge}

Vorgaben:
- Alle Zahlen, Daten und Namen bleiben exakt erhalten.
- Fachbegriffe ersetzen oder in einem Halbsatz erklären.
- Gib mir zwei Varianten: eine nah am Original, eine freier formuliert.
- Nenn unter den Varianten jede inhaltliche Aussage, die du weggelassen hast.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-excel-formelspalte',
        title: 'Neue Formelspalte mit Copilot in Excel anlegen',
        kategorie: 'technik',
        ziel: 'Eine Berechnung in Worten beschreiben und Copilot die passende Formelspalte samt Erklärung vorschlagen lassen.',
        techniken: ['kontext', 'beispiele', 'format'],
        felder: [
            { key: 'tabelle', label: 'Welche Spalten hat deine Tabelle?', beispiel: 'Artikel, Einkaufspreis, Verkaufspreis, Menge, Lieferant' },
            { key: 'berechnung', label: 'Was soll die neue Spalte berechnen?', beispiel: 'Marge in Prozent, und „prüfen“, wenn sie unter 20 % liegt' },
            { key: 'beispiel', label: 'Eine Beispielzeile mit erwartetem Ergebnis', beispiel: 'Einkauf 40, Verkauf 55 ergibt 27,3 %' },
        ],
        vorlage: `Meine Tabelle hat diese Spalten: {tabelle}

Füg eine neue Spalte hinzu, die Folgendes berechnet: {berechnung}
Beispiel zum Prüfen: {beispiel}

Erklär mir danach die Formel Teil für Teil in einfachen Worten und sag mir, was bei leeren Zellen oder einem Einkaufspreis von 0 passiert.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-excel-erkenntnisse',
        title: 'Erkenntnisse aus Excel-Daten mit Copilot gewinnen',
        kategorie: 'technik',
        ziel: 'Trends, Ausreißer und Zusammenhänge in einer Tabelle finden lassen, als Diagramm oder PivotTable zum Weiterarbeiten.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'daten', label: 'Was steht in der Tabelle?', beispiel: 'Supportanfragen 2026: Datum, Kanal, Kategorie, Bearbeitungszeit in Minuten' },
            { key: 'frage', label: 'Was willst du herausfinden?', beispiel: 'Welche Kategorie kostet am meisten Zeit, und gibt es Wochentage mit Spitzen?' },
            { key: 'ziel', label: 'Wofür brauchst du das Ergebnis?', beispiel: 'Personalplanung für das nächste Quartal' },
        ],
        vorlage: `Analysiere die Daten in dieser Tabelle: {daten}

Meine Frage: {frage}
Wofür: {ziel}

1. Erstell eine PivotTable oder ein Diagramm, das die Frage am besten beantwortet, und sag mir, warum du diese Form gewählt hast.
2. Nenn die drei auffälligsten Ergebnisse mit den konkreten Werten aus der Tabelle.
3. Nenn Ausreißer, die das Ergebnis verzerren könnten.
4. Sag mir, welche Spalte oder Angabe fehlt, um die Frage sicherer zu beantworten.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-excel-daten-markieren',
        title: 'Daten in Excel mit Copilot hervorheben und filtern',
        kategorie: 'technik',
        ziel: 'Bestimmte Zeilen per Beschreibung markieren oder filtern, statt bedingte Formatierung von Hand zu bauen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'tabelle', label: 'Welche Spalten hat deine Tabelle?', beispiel: 'Rechnungsnummer, Kunde, Betrag, Fälligkeitsdatum, Status' },
            { key: 'regel', label: 'Was soll hervorgehoben werden?', beispiel: 'alle offenen Rechnungen, die seit mehr als 14 Tagen fällig sind' },
            { key: 'filter', label: 'Wonach soll danach gefiltert oder sortiert werden?', beispiel: 'nur diese Zeilen zeigen, sortiert nach Betrag absteigend' },
        ],
        vorlage: `Meine Tabelle hat diese Spalten: {tabelle}

1. Hebe farbig hervor: {regel}
2. Danach: {filter}
3. Sag mir, wie viele Zeilen betroffen sind und wie hoch die Summe der Spalte Betrag in diesen Zeilen ist.
4. Erklär mir kurz, welche Regel du für die Hervorhebung angelegt hast, damit ich sie später selbst anpassen kann.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-outlook-mail-entwurf',
        title: 'E-Mail mit Copilot in Outlook entwerfen',
        kategorie: 'business',
        ziel: 'Mit „Entwurf mit Copilot“ eine Mail schreiben, die Anlass, Bitte und Frist sofort klar macht.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'empfaenger', label: 'An wen geht die Mail?', beispiel: 'unseren Lieferanten für Bremsbeläge, langjähriger Kontakt' },
            { key: 'anlass', label: 'Worum geht es?', beispiel: 'Die letzte Lieferung kam zehn Tage zu spät, wir brauchen für Mai einen verbindlichen Termin' },
            { key: 'ton', label: 'Welcher Ton?', beispiel: 'freundlich, aber bestimmt' },
        ],
        vorlage: `Schreib eine E-Mail an: {empfaenger}
Anlass: {anlass}
Ton: {ton}

Aufbau:
- Betreff mit höchstens 8 Wörtern, der das Anliegen nennt.
- Erster Satz: worum es geht.
- Danach die konkrete Bitte mit Frist.
- Höchstens 120 Wörter, kein „Ich hoffe, diese Mail erreicht Sie gut“.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },
    {
        slug: 'copilot-outlook-thread-antwort',
        title: 'Langen Mail-Verlauf in Outlook zusammenfassen und beantworten',
        kategorie: 'business',
        ziel: 'Einen langen E-Mail-Thread verstehen und eine Antwort entwerfen, die genau auf die offenen Punkte eingeht.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'rolle', label: 'Deine Rolle im Thread', beispiel: 'Projektleitung, ich wurde erst gestern in CC genommen' },
            { key: 'ziel', label: 'Was soll deine Antwort erreichen?', beispiel: 'Termin für die Abnahme festzurren und Zuständigkeiten klären' },
        ],
        vorlage: `Fass diesen E-Mail-Verlauf für mich zusammen. Meine Rolle: {rolle}

1. Worum geht es, in 3 Sätzen.
2. Welche Entscheidungen sind schon gefallen, wer hat sie getroffen?
3. Welche Fragen sind noch offen, und an wen richten sie sich?
4. Entwirf dann eine Antwort, die dieses Ziel hat: {ziel}. Höchstens 150 Wörter, offene Fragen als nummerierte Liste.

Prüf zum Schluss, ob deine Antwort einer Aussage aus dem Verlauf widerspricht.`,
        tools: ['microsoft-copilot'],
        fuer: ['microsoft-copilot'],
    },

    // NotebookLM
    {
        slug: 'notebooklm-audio-zusammenfassung-fokus',
        title: 'Audio-Zusammenfassung in NotebookLM steuern',
        kategorie: 'lernen',
        ziel: 'Die Audio-Zusammenfassung mit einem eigenen Prompt auf die Themen und das Niveau lenken, die du brauchst.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'hoerer', label: 'Wer hört zu?', beispiel: 'neue Kolleginnen im Vertrieb ohne Technikwissen' },
            { key: 'fokus', label: 'Worauf sollen sich die Moderatoren konzentrieren?', beispiel: 'die drei wichtigsten Unterschiede unserer Produktlinien und typische Kundenfragen' },
            { key: 'weglassen', label: 'Was soll weggelassen werden?', beispiel: 'technische Datenblätter und Preise' },
        ],
        vorlage: `Zielgruppe: {hoerer}
Konzentriert euch auf: {fokus}
Lasst weg: {weglassen}

Erklärt Fachbegriffe beim ersten Vorkommen in einem Satz. Bleibt bei dem, was in den Quellen steht, und sagt es deutlich, wenn die Quellen eine Frage offenlassen. Endet mit einer Zusammenfassung der drei wichtigsten Punkte.`,
        tools: ['notebooklm'],
        fuer: ['notebooklm'],
    },
    {
        slug: 'notebooklm-chat-rolle-festlegen',
        title: 'Benutzerdefinierten Chat-Stil in NotebookLM festlegen',
        kategorie: 'lernen',
        ziel: 'Unter „Chat konfigurieren“ eine Rolle und ein Antwortformat hinterlegen, das für jede Frage im Notebook gilt.',
        techniken: ['rolle', 'kontext', 'format'],
        felder: [
            { key: 'rolle', label: 'Welche Rolle soll NotebookLM einnehmen?', beispiel: 'erfahrene Prüferin für die Meisterprüfung im Kfz-Handwerk' },
            { key: 'nutzer', label: 'Wer stellt die Fragen?', beispiel: 'ich, Meisterschüler, Prüfung in zwei Monaten' },
            { key: 'format', label: 'Wie sollen Antworten aussehen?', beispiel: 'erst kurze Antwort, dann Erklärung, dann eine Kontrollfrage an mich' },
        ],
        vorlage: `Antworte als {rolle}.
Die Fragen stellt: {nutzer}

Antwortformat: {format}

Halte dich an die Quellen im Notebook. Wenn eine Frage über die Quellen hinausgeht, sag das, statt zu ergänzen. Verweise bei jeder Aussage auf die passende Stelle.`,
        tools: ['notebooklm'],
        fuer: ['notebooklm'],
    },
    {
        slug: 'notebooklm-quellen-gegenueberstellen',
        title: 'Quellen in NotebookLM gegenüberstellen',
        kategorie: 'lernen',
        ziel: 'Herausfinden, wo sich deine Quellen einig sind und wo sie sich widersprechen, mit Zitaten zum Nachprüfen.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'thema', label: 'Zu welcher Frage vergleichst du?', beispiel: 'Wie wirkt sich die Vier-Tage-Woche auf die Produktivität aus?' },
            { key: 'quellen', label: 'Welche Quellen liegen im Notebook?', beispiel: 'zwei Studien, ein Zeitungsartikel, ein Interview als YouTube-Video' },
        ],
        vorlage: `Frage: {thema}
Quellen im Notebook: {quellen}

1. Tabelle: Aussage | Welche Quellen stützen sie | Welche widersprechen.
2. Für jeden Widerspruch: Woran könnte er liegen (unterschiedliche Stichprobe, Zeitraum, Definition)? Nur, was aus den Quellen hervorgeht.
3. Welche Quelle ist am belastbarsten für die Frage, und warum? Begründe mit Angaben aus den Quellen selbst.
4. Was beantwortet keine der Quellen?`,
        tools: ['notebooklm'],
        fuer: ['notebooklm'],
    },
    {
        slug: 'notebooklm-lernkarten-prompt',
        title: 'Lernkarten und Quiz in NotebookLM gezielt erstellen',
        kategorie: 'lernen',
        ziel: 'Im Studio Lernkarten oder Quizfragen mit eigenem Prompt erstellen, die auf deine Prüfung zugeschnitten sind.',
        techniken: ['kontext', 'beispiele', 'format'],
        felder: [
            { key: 'pruefung', label: 'Wofür lernst du?', beispiel: 'IHK-Abschlussprüfung Kaufmann im Einzelhandel, Teil Warenwirtschaft' },
            { key: 'schwerpunkt', label: 'Welche Themen sind dir wichtig?', beispiel: 'Bestellzeitpunkt, Lagerkennzahlen, Inventurverfahren' },
            { key: 'beispiel', label: 'Eine Beispielfrage im gewünschten Stil', beispiel: 'Berechne den Meldebestand bei Tagesverbrauch 20 Stück, Lieferzeit 5 Tage, Mindestbestand 50.' },
        ],
        vorlage: `Erstell Lernkarten für: {pruefung}
Schwerpunkte: {schwerpunkt}

So soll eine gute Karte aussehen: {beispiel}

Mische Begriffsfragen und kleine Rechenaufgaben. Die Rückseite enthält die Lösung und einen Satz, warum. Nimm nur Inhalte aus den Quellen, keine allgemeinen Fragen, die dort nicht vorkommen.`,
        tools: ['notebooklm'],
        fuer: ['notebooklm'],
    },
    {
        slug: 'notebooklm-bericht-eigenes-format',
        title: 'Eigenen Berichtstyp in NotebookLM anlegen',
        kategorie: 'business',
        ziel: 'Aus den Quellen einen Bericht in genau dem Format erstellen, das du weitergibst, zum Beispiel als Entscheidungsvorlage.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'art', label: 'Was für ein Bericht?', beispiel: 'Entscheidungsvorlage zur Auswahl eines Kassensystems' },
            { key: 'leser', label: 'Wer liest ihn?', beispiel: 'Inhaberin, hat 5 Minuten Zeit' },
            { key: 'abschnitte', label: 'Welche Abschnitte brauchst du?', beispiel: 'Empfehlung, Vergleich der Anbieter, Kosten laut Angebot, Risiken, nächste Schritte' },
        ],
        vorlage: `Erstell einen Bericht: {art}
Leser: {leser}

Abschnitte:
{abschnitte}

Vorgaben: Beginne mit der Empfehlung in 2 Sätzen. Höchstens eine Seite. Zahlen nur aus den Quellen, mit Verweis. Wenn die Quellen für einen Abschnitt nicht reichen, schreib das in den Abschnitt, statt ihn zu füllen.`,
        tools: ['notebooklm'],
        fuer: ['notebooklm'],
    },
    {
        slug: 'notebooklm-datentabelle',
        title: 'Datentabelle aus Quellen in NotebookLM erstellen',
        kategorie: 'technik',
        ziel: 'Verstreute Angaben aus vielen Quellen in eine Tabelle sammeln, die du nach Google Sheets exportierst.',
        techniken: ['kontext', 'format', 'beispiele'],
        felder: [
            { key: 'thema', label: 'Was willst du sammeln?', beispiel: 'Angaben aus 12 Produktdatenblättern von E-Bike-Akkus' },
            { key: 'spalten', label: 'Welche Spalten?', beispiel: 'Hersteller, Modell, Kapazität in Wh, Gewicht in kg, Ladezeit, Garantie' },
            { key: 'beispielzeile', label: 'Eine Beispielzeile', beispiel: 'Hersteller X | Akku 500 | 500 | 2,8 | 4,5 h | 2 Jahre' },
        ],
        vorlage: `Erstell eine Datentabelle zu: {thema}

Spalten: {spalten}
Eine Zeile pro Quelle. Beispielzeile für das Format: {beispielzeile}

Übernimm Werte so, wie sie in der Quelle stehen, mit Einheit. Wenn ein Wert in einer Quelle fehlt, trag „fehlt“ ein. Rechne keine Werte um und schätze nichts.`,
        tools: ['notebooklm'],
        fuer: ['notebooklm'],
    },

    // Perplexity
    {
        slug: 'perplexity-marktrecherche-tabelle',
        title: 'Marktüberblick mit Quellen in Perplexity',
        kategorie: 'business',
        ziel: 'Anbieter oder Produkte recherchieren und als Tabelle mit Quelle pro Angabe bekommen.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'markt', label: 'Was willst du vergleichen?', beispiel: 'Kassensysteme für kleine Cafés in Deutschland' },
            { key: 'kriterien', label: 'Nach welchen Kriterien?', beispiel: 'Monatspreis laut Anbieter, TSE enthalten, Hardware nötig, Kündigungsfrist' },
            { key: 'situation', label: 'Deine Situation', beispiel: 'Café mit 30 Plätzen, ein Tresen, zwei Aushilfen' },
        ],
        vorlage: `Ich suche einen Überblick über: {markt}
Meine Situation: {situation}

Erstell eine Tabelle mit 5 bis 8 Anbietern und diesen Spalten: Anbieter | {kriterien} | Quelle.
Nimm Preise und Vertragsdaten nur von den offiziellen Seiten der Anbieter und schreib das Abrufdatum dazu. Wenn eine Angabe dort nicht steht, trag „nicht angegeben“ ein.

Unter der Tabelle: welche zwei Anbieter für meine Situation am besten passen und warum, in höchstens 5 Sätzen.`,
        tools: ['perplexity'],
        fuer: ['perplexity'],
    },
    {
        slug: 'perplexity-research-auftrag',
        title: 'Auftrag für den Research-Modus in Perplexity',
        kategorie: 'lernen',
        ziel: 'Eine Frage so stellen, dass der Research-Modus einen fokussierten Bericht liefert, den du mit Folgefragen vertiefst.',
        techniken: ['kontext', 'format', 'schritte'],
        felder: [
            { key: 'frage', label: 'Deine Frage', beispiel: 'Wie hat sich der Gebrauchtmarkt für Elektroautos in Deutschland seit 2024 entwickelt?' },
            { key: 'zweck', label: 'Wofür brauchst du die Antwort?', beispiel: 'Entscheidung, ob unser Autohaus gebrauchte E-Autos ins Sortiment nimmt' },
            { key: 'folgefrage', label: 'Worauf willst du danach tiefer eingehen?', beispiel: 'Restwerte und Akkuzustand als Kaufkriterium' },
        ],
        vorlage: `Frage: {frage}
Zweck: {zweck}

Aufbau des Berichts:
1. Kurzantwort in 3 Sätzen.
2. Entwicklung mit Zahlen, jeweils mit Quelle und Zeitraum.
3. Was dafür und was dagegen spricht, aus Sicht meines Zwecks.
4. Wo die Quellenlage dünn ist.

Bevorzuge Statistikämter, Verbände und Fachpresse. Kennzeichne Zahlen, die nur eine einzige Quelle nennt.

Danach stelle ich die Folgefrage: {folgefrage}`,
        tools: ['perplexity'],
        fuer: ['perplexity'],
    },
    {
        slug: 'perplexity-projekt-anweisungen',
        title: 'Anweisungen für ein Perplexity-Projekt schreiben',
        kategorie: 'business',
        ziel: 'Feste Anweisungen für ein Projekt in Perplexity formulieren, damit jede Suche darin gleich aufgebaut ist.',
        techniken: ['kontext', 'format', 'rueckfragen'],
        felder: [
            { key: 'projekt', label: 'Wofür ist das Projekt?', beispiel: 'Wöchentliche Branchenbeobachtung Fahrradhandel' },
            { key: 'quellen', label: 'Welche Quellen oder Domains sind wichtig?', beispiel: 'Branchenverbände, Fachpresse, Pressemitteilungen der Hersteller' },
            { key: 'format', label: 'Wie sollen Antworten aussehen?', beispiel: 'Stichpunkte, jede Meldung mit Datum und Quelle, maximal 10 Punkte' },
        ],
        vorlage: `Ich lege in Perplexity ein Projekt an und brauche die Anweisungen dafür.

Zweck: {projekt}
Wichtige Quellen: {quellen}
Antwortformat: {format}

1. Stell mir zuerst bis zu 3 Rückfragen.
2. Schreib danach die Anweisungen, höchstens 200 Wörter, gegliedert in: Ziel, Quellen, Antwortformat, Umgang mit unsicheren Angaben.
3. Gib sie in einem Codeblock aus.
4. Schlag mir dazu Links oder Domains vor, die ich im Projekt als bevorzugte Quellen eintragen kann, nur offizielle Seiten.`,
        tools: ['perplexity'],
        fuer: ['perplexity'],
    },
    {
        slug: 'perplexity-datei-mit-web-abgleichen',
        title: 'Eigene Datei mit aktuellen Webquellen abgleichen',
        kategorie: 'business',
        ziel: 'Eine hochgeladene Datei gegen den aktuellen Stand im Web prüfen, etwa ein älteres Konzept oder eine Präsentation.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'datei', label: 'Was für eine Datei lädst du hoch?', beispiel: 'Unser Marketingkonzept von 2025 als PDF' },
            { key: 'pruefen', label: 'Was soll gegen das Web geprüft werden?', beispiel: 'Marktzahlen, Wettbewerber, rechtliche Vorgaben zu Werbung mit Rabatten' },
        ],
        vorlage: `Ich lade eine Datei hoch: {datei}

Gleiche diese Punkte mit aktuellen Webquellen ab: {pruefen}

Tabelle: Aussage in der Datei (Zitat) | Aktueller Stand laut Web | Quelle mit Datum | Status (stimmt noch, veraltet, unklar).

Danach: die drei Änderungen, die ich zuerst einarbeiten sollte. Erfinde keine Zahlen; wenn du keine aktuelle Quelle findest, schreib „keine aktuelle Quelle gefunden“.`,
        tools: ['perplexity'],
        fuer: ['perplexity'],
    },
    {
        slug: 'perplexity-studien-finden',
        title: 'Wissenschaftliche Studien mit Perplexity finden',
        kategorie: 'lernen',
        ziel: 'Mit dem Fokus auf akademische Quellen Studien zu einer Frage finden und ehrlich einordnen lassen.',
        techniken: ['kontext', 'format', 'kritik'],
        felder: [
            { key: 'frage', label: 'Deine Forschungsfrage', beispiel: 'Verbessert Sport am Morgen die Konzentration bei Schulkindern?' },
            { key: 'zweck', label: 'Wofür brauchst du die Studien?', beispiel: 'Hausarbeit im Lehramtsstudium, 15 Seiten' },
            { key: 'zeitraum', label: 'Welcher Zeitraum?', beispiel: 'Studien ab 2015' },
        ],
        vorlage: `Forschungsfrage: {frage}
Zweck: {zweck}
Zeitraum: {zeitraum}

1. Nenn 5 bis 8 Studien als Tabelle: Autoren | Jahr | Titel | Stichprobe | Kernergebnis | Link.
2. Kennzeichne Übersichtsarbeiten und Meta-Analysen.
3. Fass zusammen, was die Studienlage insgesamt sagt, und wo sie sich widerspricht.
4. Nenn Grenzen der Studien (kleine Stichprobe, andere Altersgruppe, keine Kontrollgruppe).

Nenn nur Studien, die du mit Link belegen kannst. Ich prüfe jede Quelle selbst, bevor ich sie zitiere.`,
        tools: ['perplexity', 'elicit'],
        fuer: ['perplexity'],
    },
]

export const TEXTE = {
    'gemini-gem-anweisungen': {
        intro: 'Ein Gem ist in Gemini ein gespeicherter Assistent mit eigenen Anweisungen und, wenn du willst, Dateien unter „Wissen“. Dieser Prompt schreibt dir die Anweisungen so, dass das Gem beim zehnten Einsatz noch genauso arbeitet wie beim ersten.',
        tipp: 'Leg Dateien aus Google Drive unter „Wissen“ ab statt sie hochzuladen. Laut Google nutzt das Gem dann immer die neueste Fassung der Datei.',
        fehler: 'Das Gem mit einem einzigen Satz anlegen und hoffen, dass Gemini den Rest errät.',
        jean: 'Ein Gem ist wie ein Schraubenschlüssel mit eingestellter Größe: Einmal justiert, passt er jedes Mal.',
    },
    'gemini-gmail-postfach-zusammenfassen': {
        intro: 'Wenn die Google-Workspace-App mit Gemini verbunden ist, kann Gemini deine Mails lesen und zusammenfassen. Dieser Prompt macht daraus eine Liste mit offenen Punkten und Fristen, statt eines netten Absatzes, mit dem du nichts anfangen kannst.',
        tipp: 'Tipp @ und wähl Gmail aus, dann sucht Gemini gezielt dort. Google rät, keine Mail-URLs einzufügen, sondern Begriffe aus der Mail zu nennen.',
        fehler: 'Gemini nach „meinen Mails“ fragen, ohne Zeitraum oder Absender. Dann landet die Newsletter-Flut im Überblick.',
        jean: 'Laut Google kann Gemini auch mal eine ältere Mail erwischen, wenn längst eine neuere da ist. Deshalb fragt der Prompt nach Widersprüchen mit Datum.',
    },
    'gemini-drive-dokumente-auswerten': {
        intro: 'Drei Angebote, drei PDFs, drei Fenster offen. Mit verbundener Workspace-App holt Gemini die Dateien aus Drive und legt sie in eine Tabelle nebeneinander. Der Prompt sorgt dafür, dass jede Zahl wörtlich aus der Datei kommt.',
        tipp: 'Nenn Stichwörter aus dem Dateinamen oder Inhalt. Je eindeutiger, desto weniger fischt Gemini die falsche Fassung aus dem Ordner.',
        fehler: 'Die Tabelle ungeprüft in die Entscheidungsvorlage kopieren. Schau bei den Preisen einmal selbst in die Angebote.',
        jean: 'Ein Vergleich, bei dem eine Spalte „fehlt“ sagt, ist ehrlicher als einer, bei dem alles schön voll ist.',
    },
    'gemini-mail-zu-termin-und-aufgabe': {
        intro: 'Termin steht in der Mail, du tippst ihn in den Kalender, vertippst dich bei der Uhrzeit. Gemini kann mit verbundener Workspace-App Termine in Google Kalender anlegen und Aufgaben in Google Tasks. Dieser Prompt sagt genau, was rein soll, und lässt bei Lücken nachfragen.',
        tipp: 'Kontrollier die angelegten Termine einmal im Kalender, vor allem bei Mails mit mehreren Datumsangaben wie „verschoben vom 3. auf den 10.“.',
        fehler: 'Gemini Termine eintragen lassen, ohne zu sagen, welches Datum aus der Mail gemeint ist.',
        jean: 'Die Frage nach fehlenden Uhrzeiten hat mir schon einen Termin um 0:00 Uhr erspart.',
    },
    'gemini-deep-research-auftrag': {
        intro: 'Deep Research in Gemini sucht laut Google viele Quellen ab und schreibt einen Bericht, meist in 5 bis 10 Minuten. Vorher zeigt Gemini einen Rechercheplan, den du bearbeiten kannst. Dieser Prompt gibt dem Bericht eine feste Form und verlangt Quellen bei jeder Zahl.',
        tipp: 'Lies den Rechercheplan, bevor du auf „Recherche starten“ klickst. Dort korrigierst du die Richtung in zehn Sekunden, später kostet es einen ganzen Bericht.',
        fehler: 'Eine Ein-Wort-Frage abschicken und sich über einen Bericht wundern, der alles und nichts abdeckt.',
        jean: 'Deep Research ist der Azubi, der fleißig sammelt. Ob die Quelle taugt, entscheidest trotzdem du.',
    },
    'gemini-canvas-praesentation': {
        intro: 'In Canvas erstellt und bearbeitet Gemini Dokumente, Präsentationen und Code in einem eigenen Bereich neben dem Chat. Dieser Prompt holt dir einen Folienentwurf mit einer Botschaft pro Folie, statt zehn Folien mit je zwölf Stichpunkten.',
        tipp: 'Google empfiehlt, das gewünschte Format im Prompt zu nennen. Schreib also ausdrücklich „Präsentation“, sonst bekommst du ein Dokument.',
        fehler: 'Gemini Zahlen ergänzen lassen, die nicht im Material stehen. Dafür steht im Prompt der Platzhalter [Zahl ergänzen].',
        jean: 'Eine Folie, eine Aussage. Wer mehr will, soll fragen, dafür ist die Pause da.',
    },
    'gemini-canvas-lernquiz': {
        intro: 'Laut Google kann Canvas aus deinen Inhalten auch Quizze erstellen. Dieser Prompt baut aus deinem Skript ein Quiz mit Erklärung nach jeder Antwort und sagt dir am Ende, welche Themen du wiederholen solltest.',
        tipp: 'Lade lieber ein Kapitel nach dem anderen hoch als das ganze Semester. Kleine Quizze machst du auch wirklich.',
        fehler: 'Ein Quiz mit allgemeinen Wissensfragen akzeptieren, die gar nicht in deinen Unterlagen stehen.',
        jean: 'Lesen fühlt sich nach Lernen an. Abgefragt werden ist Lernen.',
    },
    'gemini-foto-analysieren': {
        intro: 'Typenschild, Fehlermeldung, Etikett: Du kannst in Gemini Bilder zum Prompt hinzufügen. Dieser Prompt trennt sauber, was auf dem Bild wirklich steht, was Gemini daraus ableitet und was es nicht erkennen kann.',
        tipp: 'Fotografier gerade von vorn, ohne Blitz und mit genug Licht. Ein zweites Foto in Nahaufnahme hilft mehr als jede Bitte im Prompt.',
        fehler: 'Bei unscharfen Fotos die abgeleiteten Werte für gelesene Werte halten.',
        jean: 'Bei Typenschildern gilt dasselbe wie in der Werkstatt: abschreiben, nicht raten.',
    },
    'claude-projekt-anweisungen': {
        intro: 'In einem Claude-Projekt legst du über „Set project instructions“ fest, wie Claude in allen Chats des Projekts arbeitet. Dieser Prompt schreibt dir die Anweisungen und sagt dir, was eher ins Projektwissen gehört.',
        tipp: 'Laut Anthropic teilen Chats in einem Projekt keinen Kontext miteinander, außer er steht im Projektwissen. Was Claude immer wissen soll, gehört also dorthin.',
        fehler: 'Die Anweisungen mit Fakten vollstopfen, die sich jeden Monat ändern. Fakten in Dateien, Regeln in die Anweisungen.',
        jean: 'Anweisungen sind die Hausordnung, das Projektwissen ist das Ersatzteillager. Beides braucht seinen Platz.',
    },
    'claude-projektwissen-aufbauen': {
        intro: 'Alles ins Projekt kippen und hoffen, dass Claude das Richtige findet, klappt selten. Dieser Prompt sortiert deine Dateien, bevor sie im Projektwissen landen, und schlägt Namen vor, die den Inhalt verraten.',
        tipp: 'Laut Anthropic gilt für Projektdateien ein Limit von 30 MB pro Datei, und der gesamte Inhalt muss ins Kontextfenster passen. In Bezahltarifen schaltet Claude bei viel Wissen automatisch auf einen RAG-Modus um.',
        fehler: '300 Seiten Katalog hochladen, obwohl nur drei Kapitel gebraucht werden.',
        jean: 'Ein aufgeräumtes Regal spart mehr Zeit als ein großes.',
    },
    'claude-artefakt-rechner': {
        intro: 'Artefakte sind eigenständige Inhalte, die Claude in einem eigenen Fenster neben dem Chat zeigt, etwa Dokumente, Code oder interaktive Anwendungen. Dieser Prompt baut dir einen kleinen Rechner, den du sofort benutzt und mit einem Rechenbeispiel prüfst.',
        tipp: 'Laut Anthropic brauchen Artefakte die Einstellung „Code execution and file creation“ unter Settings und Capabilities. Ist sie aus, schalte sie dort ein.',
        fehler: 'Dem Rechner vertrauen, ohne ihn einmal mit einem bekannten Ergebnis zu testen.',
        jean: 'Ein Rechner ohne Testrechnung ist wie eine Waage, die nie geeicht wurde.',
    },
    'claude-artefakt-ablaufdiagramm': {
        intro: 'Diagramme und Flussdiagramme gehören laut Anthropic zu den typischen Artefakten. Dieser Prompt macht aus deiner Beschreibung eines Ablaufs ein Diagramm mit einer Spalte pro Beteiligtem und sagt dir, was Claude dazugedichtet hat.',
        tipp: 'Beschreib den Ablauf so, wie er wirklich läuft, nicht wie er im Handbuch steht. Sonst bekommst du ein schönes Diagramm für einen Prozess, den es nicht gibt.',
        fehler: 'Ergänzte Schritte übersehen. Lies die Liste unter dem Artefakt.',
        jean: 'Ein Ablaufdiagramm zeigt dir sofort, wo die Akte drei Tage rumliegt.',
    },
    'claude-langes-pdf-befragen': {
        intro: 'Claude liest laut Anthropic PDFs bis 1.000 Seiten, bei bis zu 100 Seiten auch Bilder und Grafiken darin. Dieser Prompt holt nur die Stellen heraus, die du brauchst, jeweils mit Zitat und Seitenzahl.',
        tipp: 'Anthropic rät, Seitenzahlen so anzugeben, wie dein PDF-Viewer sie zeigt, nicht wie sie im Dokument gedruckt sind. Deshalb fragt der Prompt genau danach.',
        fehler: 'Die Antworten übernehmen, ohne die zitierten Stellen einmal selbst aufzuschlagen.',
        jean: 'Das Zitat mit Seitenzahl ist der Kassenbon der Antwort. Ohne kannst du nichts zurückgeben.',
    },
    'claude-dokumente-abgleichen': {
        intro: 'Der Vermieter schickt einen „leicht angepassten“ Vertrag. Dieser Prompt vergleicht alte und neue Fassung und zeigt nur die inhaltlichen Änderungen, mit Zitat aus beiden Fassungen.',
        tipp: 'Lade beide Fassungen im gleichen Format hoch, am besten beide als PDF oder beide als DOCX. Das macht die Zuordnung der Abschnitte leichter.',
        fehler: 'Den Abgleich als rechtliche Prüfung verstehen. Bei Verträgen schaut am Ende eine Fachperson drauf.',
        jean: 'Die gefährlichste Änderung steht meistens in dem Absatz, den du für unverändert hältst.',
    },
    'claude-excel-tabelle-analysieren': {
        intro: 'Claude kann laut Anthropic XLSX-Dateien verarbeiten, wenn Code-Ausführung und Dateierstellung eingeschaltet sind. Dieser Prompt lässt erst die Daten prüfen und dann mit der Datei rechnen, statt Zahlen zu schätzen.',
        tipp: 'Gib Spaltennamen, die sich selbst erklären. „Umsatz netto EUR“ verhindert mehr Fehler als jede Zeile im Prompt.',
        fehler: 'Die Datenprüfung überspringen und sich später über doppelte Monate wundern.',
        jean: 'Erst Daten putzen, dann rechnen. Wie beim Lackieren: Vorarbeit ist die halbe Miete.',
    },
    'claude-schreibstil-aus-beispielen': {
        intro: 'Claude schreibt gut, aber nicht wie du. Dieser Prompt leitet aus deinen eigenen Texten Stilregeln ab, testet sie an einem Absatz und gibt sie dir zum Speichern als Projektanweisung.',
        tipp: 'Nimm Texte, die du ohne KI geschrieben hast und mit denen du zufrieden bist. Sonst lernt Claude den Stil einer anderen KI.',
        fehler: 'Nur einen einzigen Text als Beispiel geben. Aus einem Text werden Zufälle zu Regeln.',
        jean: 'Ein Stil ist das, was du nie tun würdest. Deshalb fragt der Prompt genau danach.',
    },
    'copilot-word-entwurf-aus-notizen': {
        intro: 'Copilot in Word erstellt laut Microsoft Entwürfe aus einem Prompt, einer Gliederung, Notizen oder einer referenzierten Datei. Dieser Prompt gibt dem Entwurf eine feste Gliederung und lässt Lücken sichtbar statt erfunden.',
        tipp: 'Verweise auf die Datei mit den Notizen, statt alles abzutippen. Copilot kann laut Microsoft je nach Lizenz auch auf Dateien, Mails und Besprechungen zugreifen.',
        fehler: 'Den Entwurf verschicken, ohne die [ergänzen]-Stellen zu füllen.',
        jean: 'Ein Entwurf ist ein Rohbau. Einziehen tut da noch keiner.',
    },
    'copilot-word-dokument-verstehen': {
        intro: 'Copilot in Word fasst laut Microsoft lange Dokumente zusammen und beantwortet Fragen dazu. Dieser Prompt richtet die Zusammenfassung auf deine Rolle aus und zeigt dir vorab, wo dein Team nachhaken wird.',
        tipp: 'Lass dir die Abschnitte nennen und lies genau die drei kritischen Stellen selbst. Das dauert fünf Minuten und rettet die Besprechung.',
        fehler: 'Nur die Zusammenfassung lesen und dann Fragen zum Dokument beantworten müssen.',
        jean: 'Wer die Einwände vorher kennt, muss in der Besprechung nicht improvisieren.',
    },
    'copilot-word-text-umschreiben': {
        intro: 'Markierten Text umformulieren, Ton anpassen, kürzer machen: Das gehört laut Microsoft zu den Kernaufgaben von Copilot in Word. Dieser Prompt sorgt dafür, dass Zahlen und Namen dabei nicht verloren gehen.',
        tipp: 'Markier immer nur einen Absatz oder Abschnitt. Je kleiner die Auswahl, desto genauer arbeitet Copilot.',
        fehler: 'Die freie Variante nehmen, ohne die Liste der weggelassenen Aussagen zu lesen.',
        jean: 'Einfach schreiben heißt nicht weglassen. Es heißt besser sortieren.',
    },
    'copilot-excel-formelspalte': {
        intro: 'Copilot in Excel legt laut Microsoft neue Spalten mit Berechnungen an und erklärt Formeln. Dieser Prompt beschreibt die Berechnung mit einem Beispiel, damit du das Ergebnis sofort prüfen kannst.',
        tipp: 'Formatier die Daten vorher als Tabelle. Microsoft schreibt, dass Copilot Daten in Tabellen oder unterstützten Bereichen lesen kann.',
        fehler: 'Die Formel übernehmen, ohne die Beispielzeile nachzurechnen.',
        jean: 'Eine Formel, die du nicht erklären kannst, fliegt dir beim ersten Sonderfall um die Ohren.',
    },
    'copilot-excel-erkenntnisse': {
        intro: 'Copilot zeigt laut Microsoft Erkenntnisse als Diagramme, PivotTables, Zusammenfassungen, Trends oder Ausreißer. Dieser Prompt stellt eine klare Frage und will die konkreten Werte sehen, nicht nur ein hübsches Diagramm.',
        tipp: 'Stell eine Frage pro Durchgang. „Welche Kategorie kostet am meisten Zeit?“ liefert mehr als „Analysiere alles“.',
        fehler: 'Ausreißer im Ergebnis lassen, die eigentlich Tippfehler sind.',
        jean: 'Ein Diagramm ohne Frage ist Tapete.',
    },
    'copilot-excel-daten-markieren': {
        intro: 'Hervorheben, sortieren und filtern per Beschreibung: Das kann Copilot in Excel laut Microsoft. Dieser Prompt markiert genau die Zeilen, die dich interessieren, und erklärt die Regel, damit du sie später selbst anpasst.',
        tipp: 'Achte darauf, dass Datumsspalten wirklich als Datum formatiert sind. Sonst rechnet „seit mehr als 14 Tagen fällig“ mit Text.',
        fehler: 'Die Summe ungeprüft übernehmen, wenn in der Spalte Betrag Text oder leere Zellen stehen.',
        jean: 'Rot markierte Rechnungen sind schön. Bezahlte Rechnungen sind schöner.',
    },
    'copilot-outlook-mail-entwurf': {
        intro: 'In Outlook startest du über das Copilot-Symbol und „Entwurf“ eine neue Mail. Dieser Prompt sorgt dafür, dass Anlass, Bitte und Frist oben stehen und die Mail kurz bleibt.',
        tipp: 'Laut Microsoft funktioniert „Entwurf mit Copilot“ im neuen Outlook nicht bei Nur-Text-Mails. Stell das Verfassen in den Einstellungen auf HTML um, wenn der Knopf fehlt.',
        fehler: 'Den ersten Entwurf mit „Beibehalten“ übernehmen und den Betreff nicht lesen.',
        jean: 'Die beste Mail ist die, auf die man ohne Rückfrage antworten kann.',
    },
    'copilot-outlook-thread-antwort': {
        intro: 'Copilot fasst laut Microsoft E-Mail-Threads in Outlook zusammen, mit nummerierten Verweisen auf die einzelnen Mails. Dieser Prompt geht einen Schritt weiter: offene Fragen sortieren und eine Antwort entwerfen, die genau darauf eingeht.',
        tipp: 'Klick die nummerierten Verweise in der Zusammenfassung an, bevor du antwortest. So siehst du, wer was wirklich geschrieben hat.',
        fehler: 'Auf eine Entscheidung antworten, die im Thread längst wieder gekippt wurde.',
        jean: 'Wer erst gestern in CC kam, liest den Thread nicht. Aber er sollte wissen, was drinsteht.',
    },
    'notebooklm-audio-zusammenfassung-fokus': {
        intro: 'NotebookLM macht aus deinen Quellen eine Audio-Zusammenfassung, bei der KI-Moderatoren die Inhalte besprechen. Laut Google kannst du dabei Format, Sprache und einen eigenen Prompt festlegen. Dieser Prompt lenkt das Gespräch auf das, was deine Zuhörer wirklich brauchen.',
        tipp: 'Wähl das Format passend zum Zweck: „Zusammenfassung“ für einen kurzen Überblick, „Bewertung“ für Feedback zu einem Entwurf, „Detaillierte Analyse“ zum Einarbeiten.',
        fehler: 'Zwanzig Quellen ins Notebook legen und sich wundern, dass die Folge über alles ein bisschen redet.',
        jean: 'Ein Podcast über deine eigenen Unterlagen ist großartig für den Weg zur Arbeit. Prüfen musst du trotzdem am Schreibtisch.',
    },
    'notebooklm-chat-rolle-festlegen': {
        intro: 'Unter „Chat konfigurieren“ wählst du in NotebookLM einen Gesprächsstil und die Antwortlänge. Bei „Benutzerdefiniert“ gibst du eine eigene Rolle vor. Dieser Prompt füllt genau dieses Feld.',
        tipp: 'Bleib bei einer Rolle pro Notebook. Für einen anderen Zweck legst du lieber ein zweites Notebook mit denselben Quellen an.',
        fehler: 'Eine Rolle verlangen, die über die Quellen hinausgeht. NotebookLM antwortet laut Google nur auf Grundlage deiner Quellen.',
        jean: 'Eine Prüferin, die nachfragt, bringt dich weiter als ein Kumpel, der alles abnickt.',
    },
    'notebooklm-quellen-gegenueberstellen': {
        intro: 'NotebookLM belegt Antworten mit Zitaten aus deinen Quellen. Genau das macht es stark für Vergleiche: Dieser Prompt zeigt dir, wo sich Studien, Artikel und Videos einig sind und wo nicht.',
        tipp: 'Fahr mit der Maus über ein Zitat, dann zeigt NotebookLM laut Google den vollständigen Text. Wähl ein Zitat aus, um die Stelle im Zusammenhang zu sehen.',
        fehler: 'Die Einschätzung zur belastbarsten Quelle übernehmen, ohne selbst Stichprobe und Methode anzuschauen.',
        jean: 'Ein Widerspruch zwischen zwei Quellen ist keine Störung, sondern die interessanteste Stelle der Recherche.',
    },
    'notebooklm-lernkarten-prompt': {
        intro: 'Im Studio erstellt NotebookLM Lernkarten und Quizfragen aus deinen Quellen, mit Schwierigkeitsgrad und eigenem Prompt. Dieser Prompt richtet die Karten auf deine Prüfung aus und gibt mit einem Beispiel den Stil vor.',
        tipp: 'Nutz „Nur falsch beantwortete Karten“ für die zweite Runde. Laut Google merkt sich NotebookLM deinen Fortschritt.',
        fehler: 'Hundert Karten erstellen und nie wieder öffnen. Lieber zwanzig, dafür jeden Tag.',
        jean: 'Lernkarten wirken nur, wenn du sie umdrehst, bevor du die Antwort weißt.',
    },
    'notebooklm-bericht-eigenes-format': {
        intro: 'Unter „Berichte“ kannst du in NotebookLM eigene Berichtsformate anlegen, und laut Google lassen sie sich nach Google Docs exportieren. Dieser Prompt baut eine Entscheidungsvorlage, die mit der Empfehlung beginnt.',
        tipp: 'Entfern vorher Quellen, die nichts mit der Entscheidung zu tun haben, oder wähl sie im Quellenbereich ab.',
        fehler: 'Leere Abschnitte mit Allgemeinplätzen füllen lassen, statt die Lücke stehen zu lassen.',
        jean: 'Wer nur fünf Minuten hat, liest den ersten Absatz. Da muss die Empfehlung stehen.',
    },
    'notebooklm-datentabelle': {
        intro: 'NotebookLM erstellt laut Google Datentabellen aus deinen Quellen, die du per Prompt anpasst und nach Google Sheets exportierst, mit den Quellenangaben auf einem zweiten Tab. Dieser Prompt gibt Spalten und Format vor.',
        tipp: 'Eine Beispielzeile mit Einheiten spart dir das spätere Aufräumen in Sheets.',
        fehler: 'Werte umrechnen lassen. Dann weißt du später nicht mehr, was im Datenblatt stand.',
        jean: 'Zwölf Datenblätter in einer Tabelle: Das ist der Moment, in dem sich KI wie Feierabend anfühlt.',
    },
    'perplexity-marktrecherche-tabelle': {
        intro: 'Perplexity sucht laut Anbieter im Live-Web und zeigt zu jeder Antwort die Quellen. Dieser Prompt macht daraus eine Vergleichstabelle, bei der Preise nur von offiziellen Seiten kommen und ein Abrufdatum tragen.',
        tipp: 'Perplexity rät selbst, das gewünschte Format zu nennen, etwa Tabelle oder Stichpunkte. Der Prompt erledigt das schon.',
        fehler: 'Preise aus Vergleichsportalen übernehmen, die seit einem Jahr niemand aktualisiert hat.',
        jean: 'Ein Preis ohne Datum ist ein Gerücht.',
    },
    'perplexity-research-auftrag': {
        intro: 'Der Research-Modus von Perplexity durchsucht laut Anbieter mehrere Quellen und baut daraus eine ausführliche Analyse. Dieser Prompt gibt dem Bericht eine Struktur und plant die Folgefrage gleich mit, denn Perplexity empfiehlt, breit zu starten und dann nachzubohren.',
        tipp: 'Stell die Folgefrage im selben Verlauf. So bleibt der Kontext der ersten Recherche erhalten.',
        fehler: 'Mehrere unabhängige Fragen in einen Auftrag packen. Perplexity rät ausdrücklich: eine Sache pro Prompt.',
        jean: 'Breit anfangen, dann bohren. Wie bei der Fehlersuche am Moped.',
    },
    'perplexity-projekt-anweisungen': {
        intro: 'In Perplexity heißen die früheren Spaces heute Projekte. Dort hinterlegst du laut Anbieter Anweisungen, Dateien sowie bevorzugte Links und Domains für jede Suche im Projekt. Dieser Prompt schreibt die Anweisungen.',
        tipp: 'Trag die vorgeschlagenen Domains unter den bevorzugten Quellen des Projekts ein. So muss die Anweisung sie nicht jedes Mal aufzählen.',
        fehler: 'Ein Projekt für alles anlegen. Ein Projekt pro Thema hält die Antworten sauber.',
        jean: 'Eine Recherche, die jede Woche gleich aufgebaut ist, liest du in der halben Zeit.',
    },
    'perplexity-datei-mit-web-abgleichen': {
        intro: 'Perplexity kann laut Anbieter hochgeladene Dateien zusammen mit Webquellen auswerten. Dieser Prompt prüft ein älteres Konzept Zeile für Zeile gegen den aktuellen Stand und sortiert nach „stimmt noch“, „veraltet“ und „unklar“.',
        tipp: 'Lade nur die Abschnitte hoch, die du prüfen willst. Ein 60-seitiges Konzept verwässert den Abgleich.',
        fehler: 'Die Spalte „unklar“ ignorieren. Genau dort liegen die Fehler, die später peinlich werden.',
        jean: 'Ein Konzept von letztem Jahr ist wie ein Reifen von letztem Jahr: meistens noch gut, aber du schaust nach.',
    },
    'perplexity-studien-finden': {
        intro: 'Pro Search sucht laut Perplexity je nach gewähltem Fokus etwa im Web, in akademischen Quellen oder in Dateien. Dieser Prompt findet Studien zu deiner Frage und ordnet sie ehrlich ein, inklusive Grenzen.',
        tipp: 'Öffne jede Studie über den Link und prüf Autoren, Jahr und Titel. Erst dann kommt sie in deine Arbeit.',
        fehler: 'Eine Studie zitieren, die du nur aus der Zusammenfassung kennst.',
        jean: 'Fürs Literaturverzeichnis zählt, was du gelesen hast, nicht was die KI gelesen hat.',
    },
}

export const SEITEN = {
    'google-gemini': {
        titel: 'Gemini-Prompts auf Deutsch: Vorlagen für Gems, Gmail und Deep Research',
        intro: 'Vorlagen, die für Google Gemini geschrieben sind: Gems, Gmail und Drive über die verbundene Workspace-App, Kalender und Tasks, Deep Research, Canvas und Bilder. Felder ausfüllen, Vorschau prüfen, an Gemini schicken.',
        vergleiche: ['chatgpt-vs-claude-vs-gemini'],
        kitest: 'fakten',
        tipps: [
            ['Workspace-App verbinden', 'Gmail, Drive, Kalender und Tasks funktionieren nur, wenn die Google-Workspace-App mit Gemini verbunden ist und „Aktivitäten speichern“ an ist. Bei Arbeitskonten muss das laut Google erst der Admin freigeben.'],
            ['Mit @ den Dienst wählen', 'Tipp @ und wähl Gmail oder Drive aus. Google rät, statt Links lieber Begriffe aus der Mail oder Datei zu nennen.'],
            ['Gems für Wiederkehrendes', 'Was du jede Woche gleich erklärst, gehört in ein Gem. Dateien aus Drive unter „Wissen“ bleiben dabei laut Google automatisch aktuell.'],
            ['Quellen prüfen', 'Google schreibt selbst, dass Gemini veraltete Infos liefern kann, etwa aus einer älteren Mail. Schau dir die Quellen unter der Antwort an.'],
        ],
        faq: [
            ['Brauche ich ein Abo für diese Prompts?', 'Die meisten Prompts laufen mit einem kostenlosen Google-Konto. Bei Deep Research gibt es laut Google tägliche Limits, die mit Google AI Pro oder Ultra höher sind. Was dein Tarif enthält, zeigt die Seite von Google.'],
            ['Funktioniert das auch mit einem Arbeitskonto?', 'Teilweise. Bei Arbeits- und Schulkonten können laut Google andere Bedingungen gelten, und das Verknüpfen von Apps muss der Workspace-Admin freigeben.'],
            ['Kann ich die Prompts auch in ChatGPT oder Claude nutzen?', 'Die Prompts für Deep Research, Canvas und Bilder lassen sich mit kleinen Änderungen übertragen. Die Gmail-, Drive- und Kalender-Prompts setzen die Google-Workspace-Anbindung voraus.'],
        ],
        quellen: [
            { titel: 'Gemini-Hilfe: Gems verwenden', url: 'https://support.google.com/gemini/answer/15146780?hl=de' },
            { titel: 'Gemini-Hilfe: Google Workspace-App verbinden', url: 'https://support.google.com/gemini/answer/15229592?hl=de' },
            { titel: 'Gemini-Hilfe: Deep Research verwenden', url: 'https://support.google.com/gemini/answer/15719111?hl=de' },
            { titel: 'Gemini-Hilfe: Mit Canvas Dokumente, Apps und mehr erstellen', url: 'https://support.google.com/gemini/answer/16047321?hl=de' },
        ],
    },
    claude: {
        titel: 'Claude-Prompts auf Deutsch: Projekte, Artefakte und lange Dokumente',
        intro: 'Vorlagen, die für Claude geschrieben sind: Projektanweisungen und Projektwissen, Artefakte wie Rechner und Diagramme, lange PDFs, Vertragsfassungen und Excel-Dateien. Felder ausfüllen, Vorschau prüfen, an Claude schicken.',
        vergleiche: ['claude-vs-chatgpt', 'claude-vs-perplexity', 'chatgpt-vs-claude-vs-gemini'],
        kitest: 'deutsch',
        tipps: [
            ['Anweisungen und Wissen trennen', 'Regeln stehen in den Projektanweisungen, Fakten als Dateien im Projektwissen. Laut Anthropic teilen Chats im Projekt sonst keinen Kontext.'],
            ['Artefakte einschalten', 'Artefakte brauchen laut Anthropic die Einstellung „Code execution and file creation“ unter Settings und Capabilities. Dasselbe gilt für das Hochladen von XLSX-Dateien.'],
            ['Seitenzahlen wie im Viewer', 'Bei PDFs die Seitenzahl nennen, die dein PDF-Viewer anzeigt, nicht die gedruckte. Das empfiehlt Anthropic selbst.'],
            ['Zitate verlangen', 'Bei langen Dokumenten immer wörtliches Zitat plus Seitenzahl anfordern. So prüfst du jede Antwort in Sekunden.'],
        ],
        faq: [
            ['Kann ich Projekte im Gratis-Tarif nutzen?', 'Ja. Laut Anthropic stehen Projekte allen Nutzern offen, im kostenlosen Tarif sind es höchstens fünf Projekte.'],
            ['Wie lang darf ein Dokument sein?', 'Laut Anthropic bis 1.000 Seiten pro PDF und 500 MB pro Datei im Chat. Bilder und Grafiken wertet Claude bei PDFs bis 100 Seiten mit aus, darüber nur den Text. Im Projektwissen gelten 30 MB pro Datei.'],
            ['Funktionieren die Prompts auch in ChatGPT?', 'Die meisten ja. Projektanweisungen und Artefakte heißen dort anders (Projekte und Canvas), die Prompts lassen sich aber mit kleinen Anpassungen übertragen.'],
        ],
        quellen: [
            { titel: 'Claude Help Center: What are projects?', url: 'https://support.claude.com/en/articles/9517075-what-are-projects' },
            { titel: 'Claude Help Center: How can I create and manage projects?', url: 'https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects' },
            { titel: 'Claude Help Center: What are artifacts and how do I use them?', url: 'https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' },
            { titel: 'Claude Help Center: Upload files to Claude', url: 'https://support.claude.com/en/articles/8241126-what-kinds-of-documents-can-i-upload-to-claude-ai' },
        ],
    },
    'microsoft-copilot': {
        titel: 'Copilot-Prompts auf Deutsch: Vorlagen für Word, Excel und Outlook',
        intro: 'Vorlagen für Microsoft Copilot in den Office-Apps: Entwürfe und Zusammenfassungen in Word, Formeln und Auswertungen in Excel, Mails und lange Verläufe in Outlook. Felder ausfüllen, Vorschau prüfen, in Copilot einfügen.',
        vergleiche: [],
        kitest: 'deutsch',
        tipps: [
            ['Erst die Lizenz klären', 'Ob Copilot in Word, Excel und Outlook erscheint, hängt laut Microsoft vom Abo oder der Lizenz und den Einstellungen deiner Organisation ab. Fehlt der Knopf, frag deine IT.'],
            ['Excel-Daten als Tabelle', 'Formatier deine Daten als Tabelle. Microsoft schreibt, dass Copilot Daten in Tabellen oder unterstützten Bereichen liest.'],
            ['HTML statt Nur-Text', 'Im neuen Outlook funktioniert „Entwurf mit Copilot“ laut Microsoft nicht bei Nur-Text-Mails. Stell das Verfassen auf HTML um.'],
            ['Verweise nutzen', 'Die Zusammenfassung eines Mail-Verlaufs enthält nummerierte Verweise auf die einzelnen Mails. Klick sie an, bevor du antwortest.'],
        ],
        faq: [
            ['Ist das Microsoft Copilot oder GitHub Copilot?', 'Microsoft Copilot in Word, Excel und Outlook. GitHub Copilot ist ein Programmier-Assistent und hat einen eigenen Steckbrief.'],
            ['Funktionieren die Prompts auch in Copilot Chat?', 'Die Prompts für Entwürfe und Zusammenfassungen ja, wenn du den Text oder die Datei mitgibst. Die Excel-Prompts zum Hervorheben und Filtern setzen Copilot direkt in Excel voraus.'],
            ['Was kostet Copilot in Office?', 'Das hängt vom Microsoft-365-Abo und der Lizenz ab und ändert sich regelmäßig. Den aktuellen Stand findest du auf der Preisseite von Microsoft, wir nennen hier keine Preise ohne offizielle Quelle.'],
        ],
        quellen: [
            { titel: 'Microsoft-Support: Willkommen bei Copilot in Word', url: 'https://support.microsoft.com/de-de/office/willkommen-bei-copilot-in-word-2135e85f-a467-463b-b2f0-c51a46d625d1' },
            { titel: 'Microsoft-Support: Erste Schritte mit Copilot in Excel', url: 'https://support.microsoft.com/de-de/office/erste-schritte-mit-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a' },
            { titel: 'Microsoft-Support: Entwerfen einer E-Mail-Nachricht mit Copilot in Outlook', url: 'https://support.microsoft.com/de-de/office/entwerfen-einer-e-mail-nachricht-mit-copilot-in-outlook-3eb1d053-89b8-491c-8a6e-746015238d9b' },
            { titel: 'Microsoft-Support: Zusammenfassen eines E-Mail-Threads mit Copilot in Outlook', url: 'https://support.microsoft.com/de-de/office/zusammenfassen-eines-e-mail-threads-mit-copilot-in-outlook-a79873f2-396b-46dc-b852-7fe5947ab640' },
        ],
    },
    notebooklm: {
        titel: 'NotebookLM-Prompts auf Deutsch: Audio, Lernkarten, Berichte',
        intro: 'Vorlagen für NotebookLM, das Google in seiner Hilfe inzwischen Gemini Notebook nennt: Audio-Zusammenfassungen steuern, Chat-Rolle festlegen, Quellen vergleichen, Lernkarten, eigene Berichte und Datentabellen. Felder ausfüllen und ins passende Feld im Notebook einfügen.',
        vergleiche: [],
        kitest: 'ehrlichkeit',
        tipps: [
            ['Nur deine Quellen zählen', 'NotebookLM antwortet laut Google nur auf Grundlage der Quellen im Notebook. Was nicht drinsteht, kommt auch nicht raus, und genau das ist der Vorteil.'],
            ['Quellen gezielt abwählen', 'Im Quellenbereich wählst du einzelne Quellen ab. So beantwortet NotebookLM eine Frage nur mit den Dokumenten, die dazu passen.'],
            ['Prompts im Studio', 'Audio-Zusammenfassungen, Lernkarten, Quiz und Datentabellen nehmen laut Google einen eigenen Prompt an, den du vor dem Erstellen im Studio eingibst.'],
            ['Zitate anklicken', 'Jede Chat-Antwort hat Zitate. Über das Zitat siehst du den Originaltext im Zusammenhang.'],
        ],
        faq: [
            ['Ist NotebookLM dasselbe wie Gemini Notebook?', 'Ja. In der Google-Hilfe heißt das Tool inzwischen Gemini Notebook, die Hilfe läuft weiter unter NotebookLM. Die Prompts funktionieren unabhängig vom Namen.'],
            ['Welche Quellen kann ich hochladen?', 'Laut Google unter anderem PDF, DOCX, TXT, Markdown, CSV, PPTX, Google Docs, Präsentationen und Tabellen, Bilder, Audiodateien, Websites und öffentliche YouTube-Videos. Ohne Abo bis zu 50 Quellen pro Notebook.'],
            ['Warum antwortet NotebookLM manchmal gar nicht?', 'Meist steht die Info nicht in den Quellen oder die Frage ist zu allgemein. Google rät, die Frage genauer zu formulieren.'],
        ],
        quellen: [
            { titel: 'NotebookLM-Hilfe: Gemini Notebook', url: 'https://support.google.com/notebooklm/answer/16164461?hl=de' },
            { titel: 'NotebookLM-Hilfe: Neue Quellen hinzufügen oder entdecken', url: 'https://support.google.com/notebooklm/answer/16215270?hl=de' },
            { titel: 'NotebookLM-Hilfe: Audio-Zusammenfassung erstellen', url: 'https://support.google.com/notebooklm/answer/16212820?hl=de' },
            { titel: 'NotebookLM-Hilfe: Chat in Gemini Notebook verwenden', url: 'https://support.google.com/gemininotebook/answer/16179559?hl=de' },
            { titel: 'NotebookLM-Hilfe: Lernkarten oder Quiz erstellen', url: 'https://support.google.com/gemininotebook/answer/16958963?hl=de' },
            { titel: 'NotebookLM-Hilfe: Notebook erstellen (Studio, Berichte, Datentabellen)', url: 'https://support.google.com/gemininotebook/answer/16206563?hl=de' },
        ],
    },
    perplexity: {
        titel: 'Perplexity-Prompts auf Deutsch: Recherche mit Quellen',
        intro: 'Vorlagen für Perplexity: Marktüberblick als Tabelle, Aufträge für den Research-Modus, Anweisungen für Projekte, Dateien gegen das Web prüfen und Studien finden. Felder ausfüllen, Vorschau prüfen, an Perplexity schicken.',
        vergleiche: ['claude-vs-perplexity'],
        kitest: 'fakten',
        tipps: [
            ['Konkret fragen', 'Perplexity rät selbst: klare Frage, Kontext dazu, Format nennen. „Kassensysteme“ liefert wenig, „Kassensysteme für ein Café mit 30 Plätzen“ liefert eine Auswahl.'],
            ['Eine Sache pro Prompt', 'Mehrere unabhängige Fragen in einem Prompt verwässern die Antwort. Lieber nacheinander im selben Verlauf.'],
            ['Projekte statt Spaces', 'Die früheren Spaces heißen heute Projekte. Dort hinterlegst du Anweisungen, Dateien und bevorzugte Links für jede Suche.'],
            ['Quellen öffnen', 'Jede Antwort hat Quellenlinks. Bei Zahlen und Preisen klickst du die Quelle an, bevor du sie weiterverwendest.'],
        ],
        faq: [
            ['Brauche ich Perplexity Pro für diese Prompts?', 'Die einfachen Recherche-Prompts laufen auch ohne Abo. Pro Search mit Modellauswahl beschreibt Perplexity als Funktion für Pro-Nutzer. Den aktuellen Umfang zeigt die Seite von Perplexity.'],
            ['Was ist der Unterschied zu ChatGPT?', 'Perplexity sucht bei jeder Frage im Live-Web und zeigt die Quellen direkt an. Für Recherche mit Belegen ist das bequemer, für lange eigene Texte eher nicht das erste Werkzeug.'],
            ['Kann ich Perplexity für wissenschaftliche Arbeiten nutzen?', 'Zum Finden ja, zum Zitieren nur nach eigener Prüfung. Öffne jede Studie und kontrolliere Autoren, Jahr und Aussage selbst.'],
        ],
        quellen: [
            { titel: 'Perplexity Help Center: Tips for Getting Better Answers from Perplexity', url: 'https://www.perplexity.ai/help-center/en/articles/13645819-tips-for-getting-better-answers-from-perplexity' },
            { titel: 'Perplexity Help Center: What are Projects?', url: 'https://www.perplexity.ai/help-center/en/articles/10352961-what-are-projects' },
            { titel: 'Perplexity Help Center: What is Pro Search?', url: 'https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search' },
            { titel: 'Perplexity Help Center: Getting started with Perplexity', url: 'https://www.perplexity.ai/help-center/en/articles/10354975-getting-started-with-perplexity' },
        ],
    },
}
