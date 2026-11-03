// Tool-spezifische Prompts für Coding-Tools (Content-Plan Entwickler & Tech). Jeder Prompt hat `fuer: [toolSlug]`.
// PROMPTS: Vorlagen im Format von lib/prompts.js. TEXTE: Intro/Tipp/Fehler/Jean je Prompt-Slug.
// SEITEN: Texte der Seiten /prompts/tool/[slug] im Format von TOOL_PROMPT_TEXTE in lib/prompt-tools.js.
// Funktionen geprüft am 2026-11-03 in der offiziellen Hilfe von Cursor (docs.cursor.com).

export const PROMPTS = [
    // Cursor
    {
        slug: 'cursor-rules-erstellen',
        title: 'Projekt-Regeln für .cursorrules schreiben',
        kategorie: 'technik',
        ziel: 'Eine .cursorrules-Datei für dein Projekt erstellen, damit Cursor Code-Stil, Framework-Regeln und Tabus kennt.',
        techniken: ['rolle', 'kontext', 'format', 'kritik'],
        felder: [
            { key: 'techstack', label: 'Welcher Tech-Stack und welches Framework?', beispiel: 'Next.js 14 App Router, Tailwind CSS, TypeScript, Supabase' },
            { key: 'stil', label: 'Welche Code-Konventionen gelten bei euch?', beispiel: 'Funktionale Komponenten, Server Actions statt API-Routen, keine any-Types, sprechende deutsche Variablen' },
            { key: 'tabus', label: 'Was darf Cursor niemals tun?', beispiel: 'Keine neuen NPM-Pakete ohne Rückfrage installieren, keine Änderungen an bestehenden DB-Migrationen' },
        ],
        vorlage: `Ich richte Cursor in einem neuen Projekt ein und brauche den Inhalt für die Datei .cursorrules.

Tech-Stack: {techstack}
Gewünschter Code-Stil und Konventionen: {stil}
Tabus und Grenzen: {tabus}

Aufgabe:
1. Erstell eine prägnante .cursorrules-Datei mit klaren Abschnitten: Rolle, Tech-Stack, Code-Konventionen, Verzeichnisstruktur, Best Practices und absolute No-Gos.
2. Formuliere jede Regel als konkrete, prüfbare Anweisung statt als schwammigen Wunsch (zum Beispiel „Verwende immer Zod für Schemas“ statt „Achte auf Validierung“).
3. Gib den fertigen Inhalt in einem einzigen Codeblock aus, den ich direkt als .cursorrules im Projekt-Root speichern kann.
4. Nenn darunter drei kurze Test-Eingaben für den Cursor Composer, mit denen ich prüfe, ob die Regeln greifen.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-bug-recherche-agent',
        title: 'Fehlersuche mit dem Cursor Agent im Composer',
        kategorie: 'technik',
        ziel: 'Einen Bug oder Stacktrace so an den Cursor Agent übergeben, dass er die Ursache im Projekt findet, statt wild Code zu tauschen.',
        techniken: ['kontext', 'schritte', 'format', 'rueckfragen'],
        felder: [
            { key: 'fehler', label: 'Fehlermeldung oder Stacktrace (einfügen)', beispiel: 'TypeError: Cannot read properties of undefined (reading "map") at ProductList (ProductList.tsx:42)', mehrzeilig: true },
            { key: 'verhalten', label: 'Was sollte passieren und was passiert stattdessen?', beispiel: 'Die Liste soll 10 Artikel anzeigen. Stattdessen stürzt die Seite beim ersten Laden ab, wenn die API ein leeres Array schickt.' },
            { key: 'dateien', label: 'Relevante Dateien (@Dateiname im Composer)', beispiel: 'components/ProductList.tsx, lib/api/products.ts' },
        ],
        vorlage: `Ich habe einen Bug im Projekt und brauche eine gezielte Ursachenanalyse mit minimaler Änderung.

Fehlermeldung:
---
{fehler}
---

Erwartetes vs. tatsächliches Verhalten: {verhalten}
Beteiligte Dateien: {dateien}

Geh so vor:
1. Analysiere den Stacktrace und erkläre die genaue Ursache in zwei Sätzen, ohne Code zu raten.
2. Wenn dir Kontext fehlt (etwa der Rückgabetyp der API), stell mir zuerst bis zu 2 gezielte Rückfragen.
3. Zeig den minimalen Fix als Git-Diff mit vorher/nachher. Verändere keine unbeteiligten Zeilen oder Formatierungen.
4. Erkläre, wie ein passender Guard oder Fallback aussieht, damit der Fehler bei unerwarteten API-Daten nie wieder auftritt.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-refactoring-plan',
        title: 'Legacy-Datei schrittweise mit Cursor refaktorisieren',
        kategorie: 'technik',
        ziel: 'Eine unübersichtliche Riesen-Datei ohne Breaking Changes in kleine, verständliche Module aufteilen.',
        techniken: ['kontext', 'schritte', 'kritik'],
        felder: [
            { key: 'datei', label: 'Um welche Datei oder Funktion geht es?', beispiel: 'checkout.js (850 Zeilen, mischt Formular, Stripe-Zahlung und Bestätigungsmail)' },
            { key: 'ziel', label: 'Was ist das Ziel des Refactorings?', beispiel: 'In drei Module aufteilen: validateCheckout, createPaymentIntent und sendReceipt' },
            { key: 'tests', label: 'Gibt es bestehende Tests oder Typen?', beispiel: 'Unit-Tests mit Vitest in __tests__/checkout.test.js' },
        ],
        vorlage: `Ich möchte folgende Datei schrittweise refaktorisieren, ohne bestehende Schnittstellen zu brechen.

Ausgangslage: {datei}
Ziel des Refactorings: {ziel}
Vorhandene Tests / Typen: {tests}

Aufgabe:
1. Erstell einen 4-stufigen Refactoring-Plan. Jeder Schritt muss einzeln committet und getestet werden können.
2. Schlag die neue Ordner- und Dateistruktur vor, inklusive sprechender Namen für exportierte Funktionen.
3. Zeig für Schritt 1 den exakten Code vor und nach dem Umbau.
4. Prüf am Ende: Welche Nebeneffekte oder geteilten Zustände könnten übersehen werden? Gib mir eine Checkliste für die manuelle Prüfung.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-unit-tests-schreiben',
        title: 'Passgenaue Unit-Tests mit Edge-Cases für Cursor',
        kategorie: 'technik',
        ziel: 'Für eine vorhandene Funktion Unit-Tests mit Grenzfällen, Null-Werten und Fehlerpfaden generieren lassen.',
        techniken: ['rolle', 'kontext', 'varianten', 'kritik'],
        felder: [
            { key: 'funktion', label: 'Die Funktion oder Komponente (Code einfügen)', beispiel: 'export function berechneRabatt(preis, code, istNeukunde) { ... }', mehrzeilig: true },
            { key: 'framework', label: 'Test-Framework und Test-Runner', beispiel: 'Vitest mit TypeScript' },
            { key: 'edgecases', label: 'Welche Sonderfälle sind dir wichtig?', beispiel: 'Preise unter 0, ungültige Gutscheincodes, Rabatte größer als der Warenwert, Rundungsdifferenzen' },
        ],
        vorlage: `Schreib Unit-Tests für diesen Code:
---
{funktion}
---

Test-Framework: {framework}
Besondere Grenzfälle: {edgecases}

Vorgaben:
1. Schreib 6 bis 10 Tests, gegliedert in: Standard-Fälle, ungültige Eingaben, Grenzwerte und Fehlerfälle.
2. Jeder Test hat einen sprechenden deutschen Namen im Format „it('gibt 0 zurück, wenn der Gutschein abgelaufen ist')“.
3. Verwende keine Mocks für reine Rechenlogik, mocke nur echte externe Abhängigkeiten.
4. Prüf deinen Test-Code selbst: Sind alle Assertions eindeutig und scheitert der Test bei absichtlich falscher Logik?`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-api-integration',
        title: 'REST- oder Web-API sauber in Cursor anbinden',
        kategorie: 'technik',
        ziel: 'Aus einer API-Dokumentation oder einem JSON-Payload einen typsicheren Client mit Error-Handling bauen.',
        techniken: ['kontext', 'format', 'schritte'],
        felder: [
            { key: 'api', label: 'Welche API und welcher Endpunkt?', beispiel: 'Resend API /emails zum Senden von Transaktionsmails' },
            { key: 'payload', label: 'Beispiel-Response oder Dokumentation (einfügen)', beispiel: '{"id": "49a39f3b-0bf6-4bff-9f53-27c13886b87d", "from": "hi@example.com"}', mehrzeilig: true },
            { key: 'anforderung', label: 'Welche Anforderungen hast du?', beispiel: 'TypeScript, fetch mit Timeout, Zod-Validierung der Response, kein externes SDK' },
        ],
        vorlage: `Erstell eine typsichere Client-Funktion für folgende API:

API & Endpunkt: {api}
Dokumentation / Beispiel-Daten:
---
{payload}
---

Anforderungen: {anforderung}

Aufgabe:
1. Definiere die Typen oder Zod-Schemas für Request und Response.
2. Schreib die Funktion mit sauberem Error-Handling: Timeout nach 8 Sekunden, lesbare Fehlermeldungen bei HTTP 4xx/5xx und Typ-Rückgabe.
3. Gib ein kurzes Verwendungsbeispiel mit async/await und try/catch an.
4. Sag mir, welche Umgebungsvariable (etwa RESEND_API_KEY) in .env.local hinterlegt werden muss.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-codebase-dokumentation',
        title: 'Architektur-Überblick und Onboarding-Doku aus Codebase',
        kategorie: 'technik',
        ziel: 'Den Aufbau eines Projekts analysieren lassen und eine verständliche ARCHITECTURE.md für neue Entwickler schreiben.',
        techniken: ['rolle', 'format', 'schritte'],
        felder: [
            { key: 'projekt', label: 'Was macht die Anwendung?', beispiel: 'B2B-SaaS für Handwerksbetriebe zur Zeiterfassung und Rechnungsstellung' },
            { key: 'ordner', label: 'Wichtige Ordner und Einstiegspunkte', beispiel: 'app/ (Next.js Routen), lib/db/ (Prisma Client), lib/auth/ (NextAuth)' },
            { key: 'leser', label: 'Wer liest die Doku?', beispiel: 'Neuer Freelancer, der ab nächster Woche Features baut' },
        ],
        vorlage: `Erstell eine ARCHITECTURE.md für unser Repository.

Zweck des Projekts: {projekt}
Ordnerstruktur und Kernbereiche: {ordner}
Zielgruppe der Dokumentation: {leser}

Gliederung:
1. Projekt in 3 Sätzen (Was löst es, wer nutzt es).
2. Tech-Stack Tabelle (Technologie, Version, Zweck).
3. Datenfluss: Vom Browser-Request über die API zur Datenbank und zurück als kurzes Text-Diagramm.
4. Ordnerstruktur: Wichtige Verzeichnisse und was dort hineingehört (und was nicht).
5. Lokales Setup in 4 Schritten (Installieren, Env-Vars, Migration, Dev-Server).
6. Drei goldene Regeln für Pull Requests in diesem Projekt.

Halte die Dokumentation kurz und konkret, ohne Füllwörter.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-sql-query-optimierung',
        title: 'SQL-Query und Tabellen-Schema in Cursor optimieren',
        kategorie: 'technik',
        ziel: 'Eine langsame Datenbankabfrage analysieren, passende Indizes vorschlagen und eine sichere Migration erstellen.',
        techniken: ['rolle', 'kontext', 'format', 'kritik'],
        felder: [
            { key: 'query', label: 'Die langsame Abfrage oder das Schema (einfügen)', beispiel: 'SELECT * FROM directory_clicks WHERE directory_id = $1 AND clicked_at >= $2 ORDER BY clicked_at DESC;', mehrzeilig: true },
            { key: 'datenbank', label: 'Datenbank-System und Version', beispiel: 'PostgreSQL 16 auf Supabase' },
            { key: 'tabellengroesse', label: 'Ungefähre Zeilenzahl und Schreiblast', beispiel: 'ca. 1,8 Millionen Zeilen, ca. 500 Inserts pro Stunde' },
        ],
        vorlage: `Analysiere diese SQL-Abfrage und optimiere sie für unsere Datenbank.

Datenbank: {datenbank}
Größe und Last: {tabellengroesse}
Abfrage / Schema:
---
{query}
---

Aufgabe:
1. Erklär in drei Sätzen, warum die Abfrage bei wachsender Tabelle langsam wird (Full Table Scan, Sortierung im Speicher).
2. Schlag den optimalen Index vor (Single-Column oder Composite Index mit Spaltenreihenfolge) und begründe die Spaltenfolge.
3. Schreib das CREATE INDEX Statement als sofort ausführbaren SQL-Code (mit CONCURRENTLY, falls in PostgreSQL empfohlen).
4. Zeig eine umgeschriebene Version der Query, falls SELECT * durch gezielte Spalten ersetzt werden kann.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
    {
        slug: 'cursor-pull-request-review',
        title: 'Pull-Request-Diff vor dem Merge von Cursor prüfen lassen',
        kategorie: 'technik',
        ziel: 'Einen Git-Diff vor dem Push auf Sicherheitslücken, Performance-Fallen und unsaubere Typen abklopfen.',
        techniken: ['rolle', 'kontext', 'format', 'kritik'],
        felder: [
            { key: 'diff', label: 'Git-Diff oder geänderte Dateien (einfügen)', beispiel: 'Diff der Änderungen an auth.ts und checkout/route.ts', mehrzeilig: true },
            { key: 'fokus', label: 'Worauf kommt es dir besonders an?', beispiel: 'Sicherheit (SQL Injection, XSS, Secret Leaks), Edge-Cases, keine unabsichtlichen Breaking Changes' },
            { key: 'projektstil', label: 'Besonderheiten im Projekt', beispiel: 'Produktions-App im E-Commerce, Zero-Downtime-Deployment' },
        ],
        vorlage: `Führe ein strenges Code-Review für diesen Git-Diff durch:
---
{diff}
---

Besonderer Fokus: {fokus}
Projekt-Rahmen: {projektstil}

Gliedere dein Review in vier Abschnitte:
1. Kritische Fehler (Sicherheit, Datenverlust, Crashes): Wenn nichts vorliegt, schreib ausdrücklich „Keine kritischen Fehler gefunden“.
2. Performance & Skalierbarkeit: N+1-Queries, unnötige Re-Renders oder blockierende Operationen.
3. Code-Qualität & Lesbarkeit: Unnötige Komplexität, fehlende Typen, unklare Benennungen.
4. Zusammenfassendes Urteil: „Merge-bereit mit kleinen Anpassungen“ oder „Überarbeitung erforderlich“, mit konkreten nächsten Schritten.`,
        tools: ['cursor'],
        fuer: ['cursor'],
    },
]

export const TEXTE = {
    'cursor-rules-erstellen': {
        intro: 'In der Datei .cursorrules legst du fest, wie Cursor in deinem Repository denkt und arbeitet. Dieser Prompt schreibt dir glasklare Regeln für Framework, Ordnerstruktur und Tabus, damit der Editor dir nicht bei jedem Refactoring den halben Stack umbaut.',
        tipp: 'Halt die Regeln kurz und konkret. Zehn scharfe Verbote wie „kein any in TypeScript“ bewirken mehr als 50 Seiten Architektur-Prosa.',
        fehler: 'Schwammige Wünsche formulieren wie „sauberer Code“. Cursor braucht handfeste Kriterien.',
        jean: 'Eine gute .cursorrules ist wie eine Werkstattordnung: Wer das Werkzeug nicht aufräumt, fliegt raus.',
    },
    'cursor-bug-recherche-agent': {
        intro: 'Mit @Dateiname und dem Composer findet Cursor Fehler über mehrere Dateien hinweg. Dieser Prompt zwingt den Agenten dazu, erst die Ursache zu belegen, bevor er wild Codezeilen austauscht.',
        tipp: 'Gib dem Composer die Fehlermeldung im Originaltext samt Zeilennummer mit. Je präziser der Stacktrace, desto kleiner der Eingriff.',
        fehler: 'Den generierten Code sofort ungesehen annehmen. Schau dir jeden Diff im Editor vorher an.',
        jean: 'Wer ohne Diagnose am Motor schraubt, tauscht am Ende die Lichtmaschine, obwohl nur die Zündkerze locker war.',
    },
    'cursor-refactoring-plan': {
        intro: 'Jeder kennt die 900-Zeilen-Datei, an die sich seit zwei Jahren niemand mehr rantraut. Dieser Prompt zerlegt den Umbau in vier risikoarme Etappen, die du einzeln testen und committen kannst.',
        tipp: 'Schreib vor dem Refactoring einen einfachen Integrationstest für den bestehenden Zustand. Wenn der grün bleibt, kannst du ruhig schlafen.',
        fehler: 'Alles auf einmal umschreiben wollen. Nach zwei Stunden kompiliert nichts mehr und du machst git reset.',
        jean: 'Große Umbauten machst du wie beim Hausbau: Raum für Raum, nicht alles gleichzeitig einreißen.',
    },
    'cursor-unit-tests-schreiben': {
        intro: 'Gute Tests schreiben kostet Zeit, rettet dir aber beim nächsten Release den Feierabend. Dieser Prompt generiert echte Grenzfälle, ungültige Werte und Rechenfehler statt nur den offensichtlichen Schönwetter-Pfad.',
        tipp: 'Prüf die Tests einmal, indem du die Funktion absichtlich kaputt machst. Wenn kein Test rot wird, taugt die Testsuite nichts.',
        fehler: 'Reine Berechnungen mocken. Mocke die Datenbank oder das Netzwerk, aber lass deine Geschäftslogik echt durchlaufen.',
        jean: 'Ein Test, der nie scheitern kann, ist kein Sicherheitsnetz, sondern Dekoration.',
    },
    'cursor-api-integration': {
        intro: 'Eine externe API anbinden bedeutet oft: JSON parsen, Typen tippen, Fehler fangen. Dieser Prompt baut dir eine saubere Client-Funktion mit Zod-Validierung, Timeout und verständlichen Fehlermeldungen.',
        tipp: 'Nimm ein echtes JSON-Beispiel aus den Netzwerk-Logs deiner API als Vorlage. Dokumentationen im Web sind leider nicht immer aktuell.',
        fehler: 'Auf den HTTP-Status 200 vertrauen und annehmen, dass der Payload immer das erwartete Feld enthält.',
        jean: 'Wenn die API abraucht, soll der Nutzer einen klaren Hinweis sehen und nicht ein weißes Browserfenster.',
    },
    'cursor-codebase-dokumentation': {
        intro: 'Neue Entwickler brauchen oft Tage, um zu verstehen, wo was liegt. Dieser Prompt analysiert deine Ordnerstruktur und fasst Architektur, Datenfluss und Setup in einer kompakten ARCHITECTURE.md zusammen.',
        tipp: 'Aktualisiere die ARCHITECTURE.md immer dann, wenn ein neues Hauptmodul oder ein neuer externer Dienst dazukommt.',
        fehler: 'Eine 40-seitige Dokumentation schreiben, die schon beim nächsten Sprint veraltet ist.',
        jean: 'Drei Sätze zum Datenfluss sparen dem neuen Kollegen drei Stunden Suchen im Code.',
    },
    'cursor-sql-query-optimierung': {
        intro: 'Mit 100 Testzeilen ist jede SQL-Query schnell. Wenn die Tabelle auf zwei Millionen Zeilen anwächst, geht die Seite in die Knie. Dieser Prompt findet den Flaschenhals, schlägt passende Indizes vor und schreibt die Migration.',
        tipp: 'Führ vor dem Index ein EXPLAIN ANALYZE in deiner Staging-Datenbank aus, um zu sehen, wo die Zeit wirklich verloren geht.',
        fehler: 'Einen Index auf jede Spalte klatschen. Das macht Lesezugriffe schneller, bremst aber jeden Insert und Update aus.',
        jean: 'Ein fehlender Index auf einem Fremdschlüssel ist der Klassiker unter den Server-Schmelzern.',
    },
    'cursor-pull-request-review': {
        intro: 'Vier Augen sehen mehr als zwei, und Cursor findet Tippfehler und Sicherheitslücken oft schneller als müde Augen um 23 Uhr. Dieser Prompt prüft deinen Git-Diff gezielt auf Leaks, Edge-Cases und Performance-Fallen.',
        tipp: 'Nutze den Review-Prompt vor dem Erstellen des Pull Requests. So sparst du deinen Kollegen unnötige Review-Runden.',
        fehler: 'Einem positiven KI-Review blind vertrauen. Die fachliche Verantwortung für den Code bleibt bei dir.',
        jean: 'Lieber meckert die KI im stillen Kämmerlein als der Kunde am Montagmorgen.',
    },
}

export const SEITEN = {
    cursor: {
        titel: 'Cursor-Prompts auf Deutsch: Vorlagen für Code, Agent & Refactoring',
        intro: 'Vorlagen für den KI-Code-Editor Cursor: .cursorrules schreiben, Composer und Agent gezielt steuern, Bugs beheben, Unit-Tests mit Grenzfällen generieren und Datenbank-Queries optimieren. Felder ausfüllen, Vorschau prüfen, direkt in Cursor einfügen.',
        vergleiche: ['github-copilot-vs-cursor-vs-replit'],
        kitest: 'code',
        tipps: [
            ['Mit @ gezielt Kontext geben', 'Tipp im Chat oder Composer @Dateiname, @Ordner oder @Docs, um Cursor genau die relevanten Dateien zu zeigen. Zu viel unpassender Kontext verwirrt das Modell.'],
            ['.cursorrules im Projekt-Root', 'Hinterleg Framework-Regeln, Code-Konventionen und Tabus in einer Datei namens .cursorrules im Wurzelverzeichnis. Cursor berücksichtigt sie automatisch bei jeder Anfrage.'],
            ['Composer für Multi-Datei-Änderungen', 'Nutze Strg+I (Composer), wenn Änderungen über mehrere Dateien hinweg nötig sind. Für schnelle Anpassungen in einer Datei reicht Strg+K direkt im Code.'],
            ['Diffs immer vor dem Akzeptieren prüfen', 'Akzeptiere Vorschläge nicht ungesehen mit Tab. Prüfe die Änderungen im Split-Diff Zeile für Zeile, besonders bei gelöschten Zeilen.'],
        ],
        faq: [
            ['Funktionieren die Prompts auch im kostenlosen Tarif?', 'Ja. Cursor bietet laut Anbieter einen kostenlosen Tarif mit monatlichen Guthaben für schnelle und langsame Anfragen. Die Prompts sind unabhängig vom gewählten KI-Modell.'],
            ['Kann ich die Prompts auch in VS Code oder Windsurf nutzen?', 'Die meisten Prompts für Refactoring, Tests und API-Anbindung funktionieren in jedem Editor mit KI-Assistent. Die .cursorrules-Syntax und Composer-Befehle sind spezifisch für Cursor.'],
            ['Welches Modell sollte ich in Cursor wählen?', 'Für komplexe Aufgaben und Multi-Datei-Refactorings empfiehlt Cursor Claude 3.5 Sonnet oder Claude 3.7 Sonnet. Für einfache Code-Vervollständigungen reichen schnellere Modelle.'],
        ],
        quellen: [
            { titel: 'Cursor Documentation: Rules for AI (.cursorrules)', url: 'https://docs.cursor.com/context/rules-for-ai' },
            { titel: 'Cursor Documentation: Composer & Multi-file editing', url: 'https://docs.cursor.com/composer' },
            { titel: 'Cursor Documentation: @ Symbols & Context', url: 'https://docs.cursor.com/context/@-symbols' },
            { titel: 'Cursor Pricing & Subscriptions', url: 'https://cursor.com/pricing' },
        ],
    },
}
