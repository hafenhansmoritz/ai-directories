// Tool-spezifische Prompts (Content-Plan Cluster A). Jeder Prompt hat `fuer: [toolSlug]`.
// PROMPTS: Vorlagen im Format von lib/prompts.js. TEXTE: Intro/Tipp/Fehler/Jean je Prompt-Slug.
// SEITEN: Texte der Seiten /prompts/tool/[slug] im Format von TOOL_PROMPT_TEXTE in lib/prompt-tools.js.
// Video-Tools (Runway, Kling, invideo AI, HeyGen) und Design-Tools (Gamma, Canva Magic Write).
// Grundlage: offizielle Doku und Hilfe der Anbieter, geprüft am 2026-11-02 (Quellen in SEITEN[tool].quellen).
// Runway und Kling: Vorlagen auf Englisch, weil alle offiziellen Beispiele der Anbieter englisch sind.

export const PROMPTS = [
    // ---------- Runway ----------
    {
        slug: 'runway-text-zu-video-shot',
        title: 'Runway Text to Video: eine Einstellung beschreiben',
        kategorie: 'video',
        ziel: 'Eine Videoszene für Runway Gen-4.5 so beschreiben, dass Bild und Bewegung klar sind, nach der Struktur aus Runways Text-to-Video-Guide.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'kamera', label: 'Kamera und Einstellung', beispiel: 'Low angle tracking shot' },
            { key: 'motiv', label: 'Motiv (wer oder was ist im Bild?)', beispiel: 'a red vintage moped' },
            { key: 'aktion', label: 'Was passiert?', beispiel: 'rides along a wet cobblestone street' },
            { key: 'umgebung', label: 'Umgebung', beispiel: 'a narrow old town alley at dawn' },
            { key: 'details', label: 'Licht, Stil, Atmosphäre', beispiel: 'Puddles reflect the warm street lamps. Light mist. Cinematic live-action, natural colors.' },
        ],
        vorlage: `{kamera} of {motiv} that {aktion} in {umgebung}. {details}`,
        tools: ['runway'],
        fuer: ['runway'],
    },
    {
        slug: 'runway-bild-zu-video-bewegung',
        title: 'Runway Image to Video: nur die Bewegung beschreiben',
        kategorie: 'video',
        ziel: 'Ein Standbild in Runway animieren, ohne das Bild im Prompt nachzuerzählen: Motiv-, Szenen- und Kamerabewegung, positiv formuliert.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'motiv_bewegung', label: 'Wie bewegt sich das Motiv? (allgemein: the subject, she, he)', beispiel: 'The subject turns her head toward the window and smiles' },
            { key: 'szene_bewegung', label: 'Was bewegt sich in der Umgebung?', beispiel: 'Steam rises slowly from the coffee cup' },
            { key: 'kamera', label: 'Kamerabewegung', beispiel: 'The camera slowly pushes in' },
            { key: 'stil', label: 'Stil oder Tempo (optional)', beispiel: 'Calm, natural motion. Cinematic live-action.' },
        ],
        vorlage: `{motiv_bewegung}. {szene_bewegung}. {kamera}. {stil}`,
        tools: ['runway'],
        fuer: ['runway'],
    },
    {
        slug: 'runway-kamerafahrt-enthuellung',
        title: 'Runway: Kamerafahrt mit Enthüllung',
        kategorie: 'video',
        ziel: 'Eine Kamerafahrt in Runway planen, bei der für jede Phase der Bewegung klar ist, was ins Bild kommt.',
        techniken: ['schritte', 'format'],
        felder: [
            { key: 'start', label: 'Womit beginnt die Einstellung?', beispiel: "Close-up of a mechanic's hands tightening a bolt on an engine" },
            { key: 'fahrt', label: 'Wie bewegt sich die Kamera?', beispiel: 'The camera pulls back and rises in one smooth crane move' },
            { key: 'enthuellung', label: 'Was wird am Ende sichtbar?', beispiel: 'a small workshop full of motorcycles, warm light falling through a skylight' },
            { key: 'stil', label: 'Stil', beispiel: 'Documentary style, shallow depth of field at the start, deep focus at the end.' },
        ],
        vorlage: `{start}. {fahrt}, revealing {enthuellung}. {stil}`,
        tools: ['runway'],
        fuer: ['runway'],
    },
    {
        slug: 'runway-timestamp-ablauf',
        title: 'Runway: Ablauf mit Zeitmarken steuern',
        kategorie: 'video',
        ziel: 'Mehrere Aktionen in einem Runway-Clip in eine Reihenfolge bringen, mit Zeitmarken wie im offiziellen Text-to-Video-Guide.',
        techniken: ['schritte', 'format'],
        felder: [
            { key: 'szene', label: 'Grundszene (Einstellung, Motiv, Ort)', beispiel: 'Medium shot of a baker in a small bakery at night, flour dust in the warm light' },
            { key: 'aktion1', label: 'Aktion 1 (ca. 0 bis 3 s)', beispiel: 'The baker lifts a tray of bread rolls out of the oven' },
            { key: 'aktion2', label: 'Aktion 2 (ca. 3 bis 6 s)', beispiel: 'She places the tray on the counter and steam rises from the rolls' },
            { key: 'aktion3', label: 'Aktion 3 (ca. 6 bis 10 s)', beispiel: 'The camera slowly pushes in on the golden crust' },
        ],
        vorlage: `{szene}.
[00:00] {aktion1}.
[00:03] {aktion2}.
[00:06] {aktion3}.`,
        tools: ['runway'],
        fuer: ['runway'],
    },
    {
        slug: 'runway-zwei-motive-positionen',
        title: 'Runway: zwei Motive getrennt bewegen',
        kategorie: 'video',
        ziel: 'In einem Image-to-Video-Clip zwei Personen oder Objekte unterschiedlich bewegen, mit klaren Positionsangaben statt Beschreibungen.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'links', label: 'Was macht das Motiv links?', beispiel: 'The subject on the left raises a coffee cup and laughs' },
            { key: 'rechts', label: 'Was macht das Motiv rechts?', beispiel: 'The subject on the right nods and leans back in the chair' },
            { key: 'kamera', label: 'Kamera', beispiel: 'Locked camera. The camera remains still.' },
        ],
        vorlage: `{links}. {rechts}. {kamera}`,
        tools: ['runway'],
        fuer: ['runway'],
    },

    // ---------- Kling AI ----------
    {
        slug: 'kling-text-zu-video-formel',
        title: 'Kling Text to Video: die Prompt-Formel',
        kategorie: 'video',
        ziel: 'Einen Kling-Prompt nach der offiziellen Formel bauen: Motiv mit Beschreibung, Bewegung, Szene, dazu Kamera, Licht und Atmosphäre.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'motiv', label: 'Motiv mit Beschreibung (kurze Sätze)', beispiel: 'An elderly man with a grey beard, wearing a blue work jacket and round glasses' },
            { key: 'bewegung', label: 'Bewegung (einfach, passt in 5 bis 10 Sekunden)', beispiel: 'carefully pours coffee from a steel pot into an enamel mug' },
            { key: 'szene', label: 'Szene (Vorder- und Hintergrund)', beispiel: 'in a small garden shed, tools hanging on the wooden wall behind him' },
            { key: 'kamera', label: 'Kamerasprache', beispiel: 'Medium close-up, shallow depth of field' },
            { key: 'licht', label: 'Licht und Atmosphäre', beispiel: 'soft morning light through a dusty window, calm and cozy mood' },
        ],
        vorlage: `{motiv}, {bewegung}, {szene}. {kamera}, {licht}.`,
        tools: ['kling-ai'],
        fuer: ['kling-ai'],
    },
    {
        slug: 'kling-omni-referenzen',
        title: 'Kling Omni Reference: Rollen der Referenzbilder festlegen',
        kategorie: 'video',
        ziel: 'Hochgeladene Bilder in Kling mit @Image1, @Image2 ansprechen und jedem eine klare Rolle geben, damit Figur und Ort erhalten bleiben.',
        techniken: ['format', 'kontext', 'schritte'],
        felder: [
            { key: 'bild1', label: 'Was legt @Image1 fest und was bleibt erhalten?', beispiel: 'the scene. Preserve its spatial layout, furniture and lighting' },
            { key: 'bild2', label: 'Was legt @Image2 fest und was bleibt erhalten?', beispiel: 'the main character. Preserve her hairstyle, face and clothing' },
            { key: 'handlung', label: 'Was passiert im Clip?', beispiel: 'The main character walks to the window, stops and looks back over her shoulder' },
        ],
        vorlage: `@Image1 defines {bild1}.
@Image2 defines {bild2}.
{handlung}.`,
        tools: ['kling-ai'],
        fuer: ['kling-ai'],
    },
    {
        slug: 'kling-ablauf-mit-ton',
        title: 'Kling 4.0: Ablauf in Sekunden plus Ton',
        kategorie: 'video',
        ziel: 'Einen Kling-Clip als kleine Szene planen: Grundeinstellungen, Ablauf nach Sekunden und Tonspur, nach der Struktur aus dem Kling-4.0-Guide.',
        techniken: ['schritte', 'format'],
        felder: [
            { key: 'setting', label: 'Szene, Stil, Kamera-Grundton', beispiel: 'Scene: a small bike repair shop on a rainy evening. Visual style: realistic, warm tones. Camera tone: handheld, close' },
            { key: 'teil1', label: 'Anfang (Bild, Aktion, Gefühl)', beispiel: '0 to 3 s: a mechanic wipes her hands on a cloth and looks up, surprised' },
            { key: 'teil2', label: 'Mitte (Kamera, Details)', beispiel: '3 to 7 s: the camera turns to the door, a customer pushes in a bike with a flat tire' },
            { key: 'teil3', label: 'Schluss (letzte Einstellung)', beispiel: '7 s to end: close-up of the mechanic grinning and reaching for a tire lever' },
            { key: 'ton', label: 'Ton (Dialog, Geräusche, Musik)', beispiel: 'Rain on the window, a door bell, the mechanic says: "Again?" No background music.' },
        ],
        vorlage: `{setting}.

{teil1}.
{teil2}.
{teil3}.

Audio: {ton}`,
        tools: ['kling-ai'],
        fuer: ['kling-ai'],
    },
    {
        slug: 'kling-produktclip-konkret',
        title: 'Kling: Produktclip mit konkreten statt abstrakten Wörtern',
        kategorie: 'video',
        ziel: 'Einen Produktclip in Kling beschreiben, der sichtbare Details statt Worthülsen wie „edel“ oder „premium“ nutzt.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'produkt', label: 'Produkt', beispiel: 'A matte black motorcycle helmet' },
            { key: 'bewegung', label: 'Bewegung', beispiel: 'rotates slowly on a round turntable' },
            { key: 'look', label: 'Wie sieht „hochwertig“ bei dir konkret aus?', beispiel: 'Side backlighting outlines the edges of the helmet, the background is blurred dark grey, fine grain is visible on the matte surface' },
            { key: 'kamera', label: 'Kamera', beispiel: 'Static medium shot, then a slow push-in on the visor' },
        ],
        vorlage: `{produkt} {bewegung}. {look}. {kamera}. No subtitles. No background music.`,
        tools: ['kling-ai'],
        fuer: ['kling-ai'],
    },
    {
        slug: 'kling-video-bearbeiten',
        title: 'Kling: vorhandenes Video per Prompt ändern',
        kategorie: 'video',
        ziel: 'Ein hochgeladenes Video in Kling gezielt ändern und ausdrücklich sagen, was gleich bleiben soll.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'aendern', label: 'Was soll sich ändern?', beispiel: 'Change the season from summer to winter: snow on the ground and on the roofs, breath visible in the cold air' },
            { key: 'behalten', label: 'Was bleibt genau so?', beispiel: 'the camera movement, the timing and the clothing of the cyclist' },
        ],
        vorlage: `Edit @Video1. {aendern}. Preserve {behalten}.`,
        tools: ['kling-ai'],
        fuer: ['kling-ai'],
    },

    // ---------- invideo AI ----------
    {
        slug: 'invideo-erklaervideo-prompt',
        title: 'invideo AI: Erklärvideo aus einer Idee',
        kategorie: 'video',
        ziel: 'invideo AI in einem Satz-Briefing sagen, was das Video erklären soll, für wen, wie lang, auf welcher Plattform und mit welcher Stimme.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Worum geht es?', beispiel: 'wie man einen Fahrradschlauch in fünf Schritten wechselt' },
            { key: 'zielgruppe', label: 'Für wen?', beispiel: 'Pendler ohne Werkstatt-Erfahrung' },
            { key: 'laenge', label: 'Länge', beispiel: '60 Sekunden' },
            { key: 'plattform', label: 'Plattform', beispiel: 'YouTube' },
            { key: 'stimme', label: 'Stimme, Musik, Ton', beispiel: 'ruhige deutsche Männerstimme, leise akustische Hintergrundmusik, freundlich und klar' },
        ],
        vorlage: `Erstelle ein {laenge} langes Erklärvideo auf Deutsch für {plattform}: {thema}.
Zielgruppe: {zielgruppe}. Erkläre so, als hätten sie das noch nie gemacht, jeder Schritt bekommt eine eigene Szene.
Voiceover und Musik: {stimme}.
Füge deutsche Untertitel hinzu und ende mit einer kurzen Zusammenfassung der Schritte.`,
        tools: ['invideo-ai'],
        fuer: ['invideo-ai'],
    },
    {
        slug: 'invideo-marketing-video-produkt',
        title: 'invideo AI: Marketing-Video mit eigener URL und Produktbildern',
        kategorie: 'video',
        ziel: 'Ein Werbevideo für ein Produkt oder eine Dienstleistung briefen, mit Website-Link und benannten Bildern, wie es die invideo-Hilfe empfiehlt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'angebot', label: 'Was bewirbst du?', beispiel: 'unseren Lastenrad-Verleih in der Innenstadt' },
            { key: 'url', label: 'Website oder Produktseite', beispiel: 'https://www.example.com/lastenrad' },
            { key: 'bilder', label: 'Angehängte Bilder mit Kurznamen', beispiel: 'Logo = unser Logo, Rad1 = Lastenrad von der Seite, Laden = Ladenfront' },
            { key: 'ziel', label: 'Was sollen Zuschauer danach tun?', beispiel: 'online ein Rad für das Wochenende reservieren' },
            { key: 'stil', label: 'Musik, Stimme, Wirkung', beispiel: 'fröhliche Gitarrenmusik, junge deutsche Frauenstimme, bodenständig und sympathisch' },
        ],
        vorlage: `Mach ein 30 Sekunden langes Werbevideo auf Deutsch für {angebot}.
Infos zum Angebot findest du hier: {url}
Ich habe Bilder angehängt: {bilder}. Nutze Logo am Anfang und am Ende, die anderen Bilder in den Szenen, in denen das Angebot gezeigt wird.
Ziel: Die Zuschauer sollen {ziel}. Sag das am Ende klar und blende die Website ein.
Musik, Stimme und Wirkung: {stil}.`,
        tools: ['invideo-ai'],
        fuer: ['invideo-ai'],
    },
    {
        slug: 'invideo-blog-zu-video',
        title: 'invideo AI: aus einem Blogartikel ein Video machen',
        kategorie: 'video',
        ziel: 'Einen vorhandenen Blogartikel per Link an invideo AI geben und daraus ein kurzes Video mit klarer Gliederung machen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'link', label: 'Link zum Blogartikel', beispiel: 'https://www.example.com/blog/winterreifen-wechseln' },
            { key: 'laenge', label: 'Länge', beispiel: '90 Sekunden' },
            { key: 'kern', label: 'Was ist die wichtigste Aussage?', beispiel: 'Ab 7 Grad lohnt sich der Wechsel, und Profiltiefe schlägt Alter' },
            { key: 'plattform', label: 'Plattform', beispiel: 'YouTube und Website' },
        ],
        vorlage: `Erstelle aus diesem Blogartikel ein {laenge} langes Video auf Deutsch für {plattform}: {link}
Die wichtigste Aussage ist: {kern}. Sie soll in den ersten 10 Sekunden fallen.
Übernimm nur Fakten aus dem Artikel, keine zusätzlichen Zahlen.
Gliedere das Video in höchstens fünf Kapitel mit je einer Texteinblendung als Überschrift.
Sachliche deutsche Stimme, dezente Musik, deutsche Untertitel.`,
        tools: ['invideo-ai'],
        fuer: ['invideo-ai'],
    },
    {
        slug: 'invideo-magic-box-aenderungen',
        title: 'invideo AI: Änderungen über die Magic Box',
        kategorie: 'video',
        ziel: 'Ein fertig generiertes Video mit klaren Textbefehlen in der Magic Box nachbessern, statt alles neu zu erzeugen.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'szene', label: 'Welche Szene stört dich?', beispiel: 'Szene 2' },
            { key: 'neues_medium', label: 'Was soll dort stattdessen zu sehen sein?', beispiel: 'eine Nahaufnahme von Händen, die einen Fahrradschlauch aufpumpen' },
            { key: 'tempo', label: 'Tempo', beispiel: 'Mach die Schnitte etwas langsamer' },
            { key: 'musik', label: 'Musik', beispiel: 'Ändere die Stimmung der Hintergrundmusik zu ruhig und reduziere ihre Lautstärke' },
        ],
        vorlage: `Ersetze das Medium in {szene} durch {neues_medium}.
{tempo}.
{musik}.`,
        tools: ['invideo-ai'],
        fuer: ['invideo-ai'],
    },
    {
        slug: 'invideo-short-hochformat',
        title: 'invideo AI: Short im Hochformat mit Wort-für-Wort-Untertiteln',
        kategorie: 'video',
        ziel: 'Ein kurzes Hochkant-Video für Reels, TikTok oder Shorts erzeugen, mit Hook am Anfang und auffälligen Untertiteln.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: '3 Fehler beim Kettenölen, die fast jeder macht' },
            { key: 'hook', label: 'Erster Satz (Hook)', beispiel: 'Deine Kette quietscht, obwohl du sie geölt hast? Dann machst du einen dieser drei Fehler.' },
            { key: 'zielgruppe', label: 'Zielgruppe', beispiel: 'Alltagsradler zwischen 20 und 40' },
            { key: 'stimme', label: 'Stimme und Ton', beispiel: 'lockere deutsche Männerstimme, etwas frech, schnelle Schnitte' },
        ],
        vorlage: `Mach ein 30 Sekunden langes Video im Hochformat 9:16 für Reels und TikTok, auf Deutsch.
Thema: {thema}
Zielgruppe: {zielgruppe}
Der erste Satz lautet wörtlich: „{hook}“
Danach jeder Fehler eine Szene, am Ende ein Satz mit der richtigen Lösung.
Stimme und Ton: {stimme}.
Untertitel groß in der Bildmitte, ein Wort nach dem anderen eingeblendet.`,
        tools: ['invideo-ai'],
        fuer: ['invideo-ai'],
    },

    // ---------- HeyGen ----------
    {
        slug: 'heygen-ai-script-writer',
        title: 'HeyGen AI Script Writer: Skript aus einer Kurzbeschreibung',
        kategorie: 'video',
        ziel: 'Dem AI Script Writer in HeyGen alles geben, was er laut HeyGen braucht: Thema, Ton, Kernpunkte und ungefähre Länge.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Worum geht es im Video?', beispiel: 'unser neues Rückgaberecht im Onlineshop' },
            { key: 'punkte', label: 'Diese Punkte müssen rein', beispiel: '30 Tage Rückgabe, kostenloses Rücksendeetikett, Erstattung innerhalb von 5 Werktagen' },
            { key: 'ton', label: 'Ton', beispiel: 'freundlich, Du-Form, ohne Werbesprech' },
            { key: 'laenge', label: 'Ungefähre Länge', beispiel: 'etwa 60 Sekunden gesprochen' },
        ],
        vorlage: `Schreib ein Skript auf Deutsch für ein Avatar-Video über {thema}.
Diese Punkte müssen vorkommen: {punkte}.
Ton: {ton}. Länge: {laenge}.
Kurze Sätze, die sich gut sprechen lassen. Zahlen als Wörter ausschreiben. Keine englischen Begriffe einstreuen.
Ende mit einem Satz, was die Zuschauer jetzt tun sollen.`,
        tools: ['heygen'],
        fuer: ['heygen'],
    },
    {
        slug: 'heygen-skript-szenen-vorlage',
        title: 'HeyGen: sprechbares Skript für drei Szenen',
        kategorie: 'video',
        ziel: 'Ein fertiges Skript in die Szenen von HeyGen AI Studio einfügen, so geschrieben, dass die Stimme an den richtigen Stellen Luft holt.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'begruessung', label: 'Szene 1: Begrüßung und Thema', beispiel: 'Hallo und willkommen. In den nächsten zwei Minuten zeige ich dir, wie du deinen Kundenzugang einrichtest.' },
            { key: 'inhalt', label: 'Szene 2: der Kern in kurzen Sätzen', beispiel: 'Öffne zuerst die Startseite. Klick oben rechts auf Anmelden. Dann wählst du: Neues Konto.' },
            { key: 'abschluss', label: 'Szene 3: Abschluss und nächster Schritt', beispiel: 'Das war es schon. Wenn etwas hakt, schreib uns über das Kontaktformular.' },
        ],
        vorlage: `Szene 1:
{begruessung}

Szene 2:
{inhalt}

Szene 3:
{abschluss}`,
        tools: ['heygen'],
        fuer: ['heygen'],
    },
    {
        slug: 'heygen-schulungsvideo-skript',
        title: 'HeyGen: Schulungsvideo für neue Mitarbeitende',
        kategorie: 'business',
        ziel: 'Mit dem AI Script Writer ein Onboarding- oder Schulungsskript erzeugen, das in Szenen gegliedert ist und eine kleine Wissensfrage enthält.',
        techniken: ['kontext', 'format', 'schritte'],
        felder: [
            { key: 'thema', label: 'Schulungsthema', beispiel: 'Ablauf bei einer Reklamation an der Kasse' },
            { key: 'zielgruppe', label: 'Wer schaut zu?', beispiel: 'neue Aushilfen im Fahrradladen, erste Arbeitswoche' },
            { key: 'schritte', label: 'Die Schritte in Stichpunkten', beispiel: 'Kassenbon zeigen lassen, Schaden ansehen, Formular ausfüllen, Werkstatt informieren' },
            { key: 'laenge', label: 'Ungefähre Länge', beispiel: 'etwa zwei Minuten' },
        ],
        vorlage: `Schreib ein Schulungsskript auf Deutsch zum Thema {thema} für {zielgruppe}.
Länge: {laenge} gesprochen.
Gliedere es in Szenen: 1. Warum das wichtig ist, 2. bis 4. je ein Schritt aus dieser Liste: {schritte}, 5. eine Wissensfrage mit Antwort, 6. Zusammenfassung in drei Sätzen.
Sprich die Zuschauer mit Du an, kurze Sätze, keine Abkürzungen.`,
        tools: ['heygen'],
        fuer: ['heygen'],
    },
    {
        slug: 'heygen-avatar-bewegung',
        title: 'HeyGen: Bewegungs-Prompt für Foto-Avatare',
        kategorie: 'video',
        ziel: 'Einem Foto-Avatar in HeyGen mit einem kurzen Bewegungs-Prompt mehr Leben geben, statt ihn steif sprechen zu lassen.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'haltung', label: 'Grundhaltung beim Sprechen', beispiel: 'talks excitedly' },
            { key: 'gestik', label: 'Gestik', beispiel: 'uses open hand gestures' },
            { key: 'mimik', label: 'Mimik', beispiel: 'smiles warmly at the end of each sentence' },
        ],
        vorlage: `{haltung}, {gestik}, {mimik}`,
        tools: ['heygen'],
        fuer: ['heygen'],
    },
    {
        slug: 'heygen-faq-video-skript',
        title: 'HeyGen: FAQ-Video mit einer Frage pro Szene',
        kategorie: 'shop',
        ziel: 'Häufige Kundenfragen per AI Script Writer in ein Avatar-Video übersetzen, eine Frage pro Szene, jede Szene kurz genug für HeyGen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'firma', label: 'Firma oder Shop', beispiel: 'ein kleiner Onlineshop für Motorradbekleidung' },
            { key: 'fragen', label: 'Die Fragen mit deinen Antworten', beispiel: 'Wie lange dauert der Versand? 2 bis 3 Werktage. Kann ich auf Rechnung zahlen? Ja, ab der zweiten Bestellung.', mehrzeilig: true },
            { key: 'ton', label: 'Ton', beispiel: 'ruhig, hilfsbereit, Du-Form' },
        ],
        vorlage: `Schreib ein Skript auf Deutsch für ein FAQ-Video von {firma}.
Hier sind die Fragen und unsere Antworten:
{fragen}

Regeln: Pro Frage eine Szene. Jede Szene beginnt mit der Frage, dann die Antwort in höchstens drei kurzen Sätzen. Nutze nur unsere Antworten, ergänze keine Fakten. Zahlen als Wörter ausschreiben. Ton: {ton}.`,
        tools: ['heygen'],
        fuer: ['heygen'],
    },

    // ---------- Gamma ----------
    {
        slug: 'gamma-praesentation-generieren',
        title: 'Gamma: Präsentation aus einem Thema generieren',
        kategorie: 'business',
        ziel: 'Im Generate-Modus von Gamma mit einem Prompt starten, der Zielgruppe, Gliederung und Kernaussage schon mitbringt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Thema der Präsentation', beispiel: 'Warum wir im Laden auf E-Bike-Leasing für Firmen setzen' },
            { key: 'publikum', label: 'Wer sitzt im Raum?', beispiel: 'Geschäftsführung und Vertrieb, 6 Personen' },
            { key: 'kernaussage', label: 'Was sollen sie am Ende glauben?', beispiel: 'Firmenleasing bringt planbaren Umsatz und Stammkunden' },
            { key: 'abschnitte', label: 'Diese Abschnitte sollen vorkommen', beispiel: 'Ausgangslage, Marktchance, Ablauf für Firmen, Aufwand für uns, nächste Schritte' },
        ],
        vorlage: `Präsentation auf Deutsch: {thema}
Publikum: {publikum}
Kernaussage, die am Ende hängen bleibt: {kernaussage}
Gliederung: {abschnitte}
Eine Folie pro Abschnitt, dazu Titelfolie und Abschlussfolie mit den nächsten Schritten.
Markiere Stellen, an denen Zahlen fehlen, mit [ZAHL EINTRAGEN], statt Zahlen zu erfinden.`,
        tools: ['gamma'],
        fuer: ['gamma'],
    },
    {
        slug: 'gamma-folie-fuer-folie',
        title: 'Gamma: eigenen Text Folie für Folie einfügen',
        kategorie: 'business',
        ziel: 'Vorhandene Notizen im Paste-Modus mit Trennlinien so einfügen, dass Gamma genau dort neue Folien beginnt, wo du es willst.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'folie1', label: 'Folie 1', beispiel: 'Titel: Unser Werkstatt-Quartal in Zahlen' },
            { key: 'folie2', label: 'Folie 2', beispiel: 'Was gut lief: 40 Prozent mehr Inspektionen, Wartezeit von 9 auf 5 Tage gesenkt' },
            { key: 'folie3', label: 'Folie 3', beispiel: 'Was hakt: Ersatzteile für ältere Modelle, zu wenig Platz im Lager. Bild: volles Teileregal' },
            { key: 'folie4', label: 'Folie 4', beispiel: 'Nächste Schritte: zweiter Lieferant, Regalsystem bis Ende Januar' },
        ],
        vorlage: `{folie1}
---
{folie2}
---
{folie3}
---
{folie4}`,
        tools: ['gamma'],
        fuer: ['gamma'],
    },
    {
        slug: 'gamma-zusaetzliche-anweisungen',
        title: 'Gamma: Regeln für das Feld „Zusätzliche Anweisungen“',
        kategorie: 'business',
        ziel: 'Feste Regeln für die ganze Präsentation formulieren, die Gamma als Pflicht behandelt, etwa Sprache, Bildregeln und Textmenge.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'sprache', label: 'Sprache und Anrede', beispiel: 'Deutsch, Sie-Form' },
            { key: 'bildregel', label: 'Regel für Bilder', beispiel: 'Jede Folie mit einer Zahl bekommt ein einfaches Diagramm statt eines Fotos' },
            { key: 'textregel', label: 'Regel für Text', beispiel: 'Höchstens vier Stichpunkte pro Folie, keine ganzen Absätze' },
            { key: 'verbote', label: 'Was nie vorkommen soll', beispiel: 'keine Stockfotos mit Händeschütteln, keine Superlative' },
        ],
        vorlage: `Sprache: {sprache}.
{bildregel}.
{textregel}.
Verboten: {verbote}.
Erfinde keine Zahlen, Namen oder Zitate. Wo Angaben fehlen, setz [OFFEN].`,
        tools: ['gamma'],
        fuer: ['gamma'],
    },
    {
        slug: 'gamma-agent-folie-aendern',
        title: 'Gamma Agent: eine fertige Präsentation gezielt umbauen',
        kategorie: 'business',
        ziel: 'Dem Gamma Agent im Editor eine klare Änderung geben, die nur die betroffenen Folien anfasst.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'aenderung', label: 'Was soll passieren?', beispiel: 'Füg nach der Folie „Preise“ eine Folie ein, die unsere drei Tarife als Tabelle vergleicht' },
            { key: 'inhalt', label: 'Inhalt dafür', beispiel: 'Basis: 1 Rad, Plus: 3 Räder, Firma: ab 10 Rädern. Spalten: Räder, Laufzeit, Service' },
            { key: 'nicht', label: 'Was darf sich nicht ändern?', beispiel: 'die übrigen Folien und das Farbschema' },
        ],
        vorlage: `{aenderung}.
Inhalt: {inhalt}.
Lass {nicht} unverändert. Sag mir danach, welche Folien du angefasst hast.`,
        tools: ['gamma'],
        fuer: ['gamma'],
    },
    {
        slug: 'gamma-social-karussell',
        title: 'Gamma: LinkedIn-Karussell als Social-Format',
        kategorie: 'launch',
        ziel: 'Mit Gamma ein Karussell für LinkedIn oder Instagram erzeugen, mit Hook auf der ersten Karte und einer Botschaft pro Karte.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: '5 Dinge, die du vor dem E-Bike-Kauf prüfen solltest' },
            { key: 'zielgruppe', label: 'Zielgruppe', beispiel: 'Berufstätige, die zum ersten Mal ein E-Bike kaufen' },
            { key: 'hook', label: 'Text der ersten Karte', beispiel: 'Der teuerste Fehler beim E-Bike-Kauf passiert vor der Probefahrt.' },
            { key: 'cta', label: 'Letzte Karte', beispiel: 'Speicher dir den Beitrag für den Händlerbesuch.' },
        ],
        vorlage: `Karussell auf Deutsch zum Thema: {thema}
Zielgruppe: {zielgruppe}
Karte 1 (Hook): {hook}
Karten 2 bis 6: je ein Punkt, eine Überschrift mit höchstens sechs Wörtern und ein bis zwei kurze Sätze.
Letzte Karte: {cta}
Große Schrift, viel Weißraum, auf jeder Karte nur eine Botschaft.`,
        tools: ['gamma'],
        fuer: ['gamma'],
    },

    // ---------- Canva Magic Write ----------
    {
        slug: 'canva-magic-write-social-post',
        title: 'Canva Magic Write: Text für einen Social-Post im Design',
        kategorie: 'launch',
        ziel: 'Mit Magic Write direkt im Canva-Design einen kurzen Post-Text samt Überschrift erzeugen, passend zur Grafik.',
        techniken: ['kontext', 'format', 'varianten'],
        felder: [
            { key: 'anlass', label: 'Anlass', beispiel: 'Eröffnung unserer zweiten Filiale am Samstag' },
            { key: 'fakten', label: 'Fakten, die stimmen müssen', beispiel: 'Samstag 10 bis 16 Uhr, Hauptstraße 12, Kaffee aufs Haus' },
            { key: 'kanal', label: 'Kanal', beispiel: 'Instagram' },
            { key: 'ton', label: 'Ton', beispiel: 'herzlich, Du-Form, ein Emoji erlaubt' },
        ],
        vorlage: `Schreib einen {kanal}-Post auf Deutsch zum Anlass: {anlass}.
Diese Fakten müssen genau so drin sein: {fakten}.
Ton: {ton}.
Liefere: eine Überschrift mit höchstens sechs Wörtern für die Grafik, einen Post-Text mit höchstens 60 Wörtern und drei passende Hashtags.`,
        tools: ['canva'],
        fuer: ['canva'],
    },
    {
        slug: 'canva-magic-write-folientexte',
        title: 'Canva Magic Write: Folientexte aus Stichpunkten',
        kategorie: 'business',
        ziel: 'Aus groben Stichpunkten knappe Texte für eine Canva-Präsentation machen, eine Folie nach der anderen.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'thema', label: 'Thema der Präsentation', beispiel: 'Jahresrückblick unseres Sportvereins' },
            { key: 'stichpunkte', label: 'Deine Stichpunkte', beispiel: '120 Mitglieder, neue Jugendgruppe, Sommerfest mit Rekordbesuch, Hallenzeiten werden knapp', mehrzeilig: true },
            { key: 'publikum', label: 'Publikum', beispiel: 'Mitgliederversammlung' },
        ],
        vorlage: `Ich baue in Canva eine Präsentation zum Thema {thema} für {publikum}.
Hier sind meine Stichpunkte:
{stichpunkte}

Mach daraus Texte für 5 Folien. Pro Folie: eine Überschrift mit höchstens sechs Wörtern und höchstens drei kurze Stichpunkte. Nutze nur meine Fakten und ergänze keine Zahlen.`,
        tools: ['canva'],
        fuer: ['canva'],
    },
    {
        slug: 'canva-magic-write-eigene-anweisung',
        title: 'Canva Magic Write: markierten Text mit eigener Anweisung umbauen',
        kategorie: 'content',
        ziel: 'Einen Text im Design markieren und mit einer eigenen Anweisung (Custom prompt) gezielt umbauen, statt nur „Umschreiben“ zu klicken.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'ziel', label: 'Was soll aus dem Text werden?', beispiel: 'eine Liste mit vier Punkten' },
            { key: 'leser', label: 'Für wen?', beispiel: 'Kundschaft, die nur kurz auf das Plakat schaut' },
            { key: 'grenze', label: 'Längengrenze', beispiel: 'höchstens 25 Wörter insgesamt' },
        ],
        vorlage: `Mach aus diesem Text {ziel} für {leser}. {grenze}. Behalte alle Zahlen, Daten und Namen genau bei.`,
        tools: ['canva'],
        fuer: ['canva'],
    },
    {
        slug: 'canva-magic-write-flyer-text',
        title: 'Canva Magic Write: Flyer-Text mit klarer Hierarchie',
        kategorie: 'launch',
        ziel: 'Texte für einen Flyer oder ein Plakat in Canva erzeugen, getrennt nach Überschrift, Unterzeile, Infoblock und Aufruf.',
        techniken: ['format', 'varianten'],
        felder: [
            { key: 'veranstaltung', label: 'Was wird beworben?', beispiel: 'Reparatur-Café für Fahrräder' },
            { key: 'infos', label: 'Datum, Ort, Kosten', beispiel: 'jeden ersten Samstag im Monat, 14 bis 17 Uhr, Gemeindehaus, kostenlos' },
            { key: 'zielgruppe', label: 'Zielgruppe', beispiel: 'Familien und Studierende im Viertel' },
        ],
        vorlage: `Schreib Texte für einen Flyer auf Deutsch: {veranstaltung}.
Zielgruppe: {zielgruppe}.
Infos, die genau so stimmen müssen: {infos}.
Liefere getrennt: Überschrift (höchstens fünf Wörter), Unterzeile (ein Satz), Infoblock (Datum, Ort, Kosten als drei Zeilen), Aufruf (höchstens sechs Wörter).
Gib zwei Varianten für Überschrift und Unterzeile.`,
        tools: ['canva'],
        fuer: ['canva'],
    },
    {
        slug: 'canva-magic-write-produktbeschreibung',
        title: 'Canva Magic Write: Produkttext für Shop-Grafik oder Katalog',
        kategorie: 'shop',
        ziel: 'Einen kurzen Produkttext für eine Canva-Grafik, ein Katalogblatt oder ein Produktbild schreiben, mit Nutzen statt Datenblatt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'produkt', label: 'Produkt', beispiel: 'wasserdichte Fahrradtasche, 20 Liter' },
            { key: 'merkmale', label: 'Merkmale', beispiel: 'Rollverschluss, Reflektorstreifen, Schnellbefestigung, abwischbar' },
            { key: 'kunde', label: 'Wer kauft das?', beispiel: 'Pendler, die bei jedem Wetter fahren' },
        ],
        vorlage: `Schreib einen Produkttext auf Deutsch für {produkt}.
Merkmale: {merkmale}.
Käufer: {kunde}.
Liefere: eine Überschrift mit höchstens sechs Wörtern, drei Stichpunkte, die jedes Merkmal in einen Nutzen übersetzen, und einen Abschlusssatz. Insgesamt höchstens 50 Wörter. Keine Superlative, keine Angaben, die nicht in den Merkmalen stehen.`,
        tools: ['canva'],
        fuer: ['canva'],
    },
    {
        slug: 'canva-magic-write-gliederung',
        title: 'Canva Magic Write: Gliederung für ein Canva Doc',
        kategorie: 'content',
        ziel: 'In Canva Docs mit Magic Write eine Gliederung für einen Leitfaden, Bericht oder Blogtext erzeugen, bevor du schreibst.',
        techniken: ['format', 'kontext', 'rueckfragen'],
        felder: [
            { key: 'thema', label: 'Thema', beispiel: 'Leitfaden für neue Mitglieder im Kanuverein' },
            { key: 'leser', label: 'Wer liest das?', beispiel: 'Erwachsene ohne Paddel-Erfahrung' },
            { key: 'muss', label: 'Was muss vorkommen?', beispiel: 'Sicherheitsregeln, Bootsausleihe, Trainingszeiten, Ansprechpartner' },
        ],
        vorlage: `Erstelle eine Gliederung auf Deutsch für: {thema}.
Leser: {leser}.
Diese Themen müssen vorkommen: {muss}.
Format: höchstens sechs Hauptpunkte, zu jedem zwei bis drei Unterpunkte und ein Satz, was in den Abschnitt gehört. Ergänze am Ende eine Liste mit Angaben, die ich selbst nachtragen muss, etwa Zeiten oder Namen.`,
        tools: ['canva'],
        fuer: ['canva'],
    },
]

export const TEXTE = {
    // Runway
    'runway-text-zu-video-shot': {
        intro: 'Bei Text to Video beschreibst du beides: was man sieht und wie es sich bewegt. Runway schlägt dafür im eigenen Guide eine einfache Reihenfolge vor: Kamera, Motiv, Aktion, Umgebung, dann Details.',
        tipp: 'Fang knapp an und füg pro Durchgang nur ein Detail hinzu. Dann weißt du, welches Wort den Clip besser oder schlechter gemacht hat.',
        fehler: 'Den Prompt wie einen Chat schreiben („Kannst du mir bitte ein Video machen, in dem …“). Runway will Bildsprache, keine Höflichkeit.',
        jean: 'Ein Moped auf nassem Kopfsteinpflaster ist mein Testmotiv. Wenn die Pfützen glaubwürdig spiegeln, taugt der Rest meistens auch.',
    },
    'runway-bild-zu-video-bewegung': {
        intro: 'Bei Image to Video ist dein Bild schon der halbe Prompt. Runway rät ausdrücklich, das Bild nicht nachzuerzählen, sondern nur die Bewegung zu beschreiben.',
        tipp: 'Sprich das Motiv allgemein an, also „the subject“ oder „she“. Wer Haarfarbe und Jacke wiederholt, bremst laut Runway eher die Bewegung.',
        fehler: 'Verneinungen wie „no camera movement“. Runway unterstützt keine negativen Prompts, schreib stattdessen „Locked camera. The camera remains still.“',
        jean: 'Ich habe früher die halbe Bildbeschreibung reingekippt und mich über ein Standbild mit Zuckungen gewundert. Weniger Text, mehr Bewegung.',
    },
    'runway-kamerafahrt-enthuellung': {
        intro: 'Eine Kamerafahrt lebt davon, was am Ende ins Bild kommt. Runway empfiehlt bei großen Bewegungen, für jede Phase zu sagen, was sichtbar wird.',
        tipp: 'Nutze Begriffe aus Runways Liste „Camera Terms, Prompts & Examples“ wie dolly, crane oder handheld. Die Fachwörter versteht das Modell zuverlässiger als „die Kamera fliegt cool weg“.',
        fehler: 'Drei Kamerabewegungen in einen kurzen Clip packen. Eine saubere Fahrt schlägt drei halbe.',
        jean: 'Von den Händen am Schraubenschlüssel zur ganzen Werkstatt: Diese Rückfahrt funktioniert, weil am Ende etwas zu entdecken ist.',
    },
    'runway-timestamp-ablauf': {
        intro: 'Mit Zeitmarken legst du fest, wann was passiert. Runway beschreibt das im Text-to-Video-Guide als Timestamp-Prompting: nicht sekundengenau, aber die Reihenfolge sitzt.',
        tipp: 'Gib jeder Aktion realistische Zeit. Durch einen Raum gehen dauert eher drei Sekunden als eine halbe. Wähl bei mehreren Aktionen die längere Clip-Dauer.',
        fehler: 'Fünf Aktionen in fünf Sekunden. Das Ergebnis sieht aus wie ein Video im Schnellvorlauf.',
        jean: 'Drei Aktionen in zehn Sekunden ist mein Maximum. Mehr ist kein Clip mehr, sondern ein Stummfilm mit Zeitdruck.',
    },
    'runway-zwei-motive-positionen': {
        intro: 'Zwei Personen im Bild, zwei verschiedene Bewegungen: Runway empfiehlt dafür Positionsangaben wie „the subject on the left“ oder einfache Kennungen wie „the woman“, „the man“.',
        tipp: 'Gib jedem Motiv einen eigenen Satz. Dann weiß das Modell, welche Bewegung zu wem gehört.',
        fehler: 'Beide Motive in einem Satz verknoten. Dann winkt am Ende der Falsche.',
        jean: 'Links lacht, rechts nickt. Klingt banal, verhindert aber, dass beide synchron nicken wie Wackeldackel.',
    },
    // Kling
    'kling-text-zu-video-formel': {
        intro: 'Kling veröffentlicht eine eigene Formel: Motiv mit Beschreibung, Bewegung, Szene und optional Kamerasprache, Licht und Atmosphäre. Diese Vorlage setzt sie Feld für Feld um.',
        tipp: 'Halte Bewegung und Szene so einfach, dass sie in einen kurzen Clip passen. Kling schreibt selbst, dass komplexe Physik und genaue Stückzahlen schwierig sind.',
        fehler: '„Zehn Hunde am Strand“. Laut Kling reagiert das Modell kaum auf Zahlen, du bekommst irgendeine Menge Hunde.',
        jean: 'Ein Mann, eine Kanne, ein Becher. Je weniger Teile im Bild, desto weniger kann klemmen. Wie beim Vergaser.',
    },
    'kling-omni-referenzen': {
        intro: 'Mit Omni Reference lädst du mehrere Bilder hoch, Kling nummeriert sie als @Image1, @Image2. Der Kling-4.0-Guide rät, jedem Bild ausdrücklich eine Rolle zu geben.',
        tipp: 'Schreib nicht nur, was ein Bild festlegt, sondern auch, was erhalten bleiben soll: Gesicht, Kleidung, Raumaufteilung, Licht.',
        fehler: 'Nur die Kennungen nennen, ohne Rolle. Dann rät Kling, wofür das Bild gedacht ist, und das Ergebnis wird laut Anbieter weniger vorhersehbar.',
        jean: 'Bild 1 ist die Bühne, Bild 2 die Hauptfigur. Klare Rollen, wie beim Fußball: Wer im Tor steht, stürmt nicht.',
    },
    'kling-ablauf-mit-ton': {
        intro: 'Kling 4.0 gliedert einen Prompt laut Guide in Rollen der Referenzen, Grundeinstellungen, Ablauf in Sekunden und Ton. Diese Vorlage nutzt die drei letzten Teile für eine kleine Szene.',
        tipp: 'Wenn du keine Musik willst, schreib es dazu. Kling nennt „no background music“ und „no subtitles“ als die zwei Verneinungen, die wirklich nötig sind.',
        fehler: 'Gefühle beschreiben statt Bilder. „Sie ist gestresst“ ist schwächer als „sie wischt sich hastig die Hände ab und schaut zur Tür“.',
        jean: 'Die Tonspur ist der Teil, den ich früher vergessen habe. Ein Regenklopfen am Fenster macht aus einem netten Clip eine Szene.',
    },
    'kling-produktclip-konkret': {
        intro: 'Kling empfiehlt im 4.0-Guide, abstrakte Wörter durch sichtbare Details zu ersetzen. Statt „Premium-Look“ also Gegenlicht, unscharfer Hintergrund, feine Körnung auf der Oberfläche.',
        tipp: 'Frag dich bei jedem Adjektiv: Kann man das fotografieren? Wenn nein, ersetz es durch etwas, das man sieht.',
        fehler: 'Lange Listen mit Verboten. Laut Kling erhöhen negative Anweisungen die Fehlerquote, außer bei Untertiteln und Hintergrundmusik.',
        jean: '„Edel“ ist kein Bild. Gegenlicht auf mattem Lack ist eins. Den Unterschied sieht man im Ergebnis sofort.',
    },
    'kling-video-bearbeiten': {
        intro: 'Laut Kling-4.0-Doku lassen sich vorhandene Videos per Prompt bearbeiten. Wichtig ist dabei, genau zu sagen, was sich ändert und was bleibt.',
        tipp: 'Benenne beim Behalten die Dinge, die dir am meisten wehtun würden: Kamerafahrt, Timing, Kleidung. Was du nicht nennst, ist Verhandlungsmasse.',
        fehler: 'Nur „mach es winterlich“ schreiben. Dann ändert Kling im Zweifel auch das, was du mochtest.',
        jean: 'Ein Sommerclip im Winter ist schnell gemacht. Dass der Radfahrer danach noch dieselbe Jacke trägt, ist die eigentliche Kunst.',
    },
    // invideo
    'invideo-erklaervideo-prompt': {
        intro: 'invideo AI baut aus einem Prompt ein komplettes Video mit Skript, Stockmaterial, Stimme und Untertiteln. Die invideo-Hilfe rät, die Idee so zu erklären, als würdest du mit einer Kollegin sprechen.',
        tipp: 'Länge, Plattform, Zielgruppe und Stimme gehören in den ersten Prompt. Das spart dir später drei Runden in der Magic Box.',
        fehler: 'Einen Prompt aus einem Chatbot ungeprüft reinkopieren. Die invideo-Hilfe warnt ausdrücklich davor, weil solche Texte oft am eigentlichen Ziel vorbeigehen.',
        jean: 'Ich sag invideo, wer zuschaut. Für Pendler ohne Werkstatt erklärt das Video den Reifenheber, für Schrauber nicht.',
    },
    'invideo-marketing-video-produkt': {
        intro: 'Für Werbevideos empfiehlt invideo, die eigene Website-URL in den Prompt zu schreiben und Produktbilder anzuhängen, jeweils mit einem kurzen Namen wie „Logo“.',
        tipp: 'Gib den Bildern Kurznamen und sag im Prompt, wo sie hin sollen. So landet das Logo am Anfang und nicht zufällig in Szene vier.',
        fehler: 'Jedes Detail in den Prompt quetschen. Die Hilfe rät davon ab, Kernbotschaft und Ziel reichen.',
        jean: 'Die URL ist der Spickzettel für invideo. Ohne sie erfindet das Video im besten Fall ein nettes Fahrrad, im schlechtesten einen Preis.',
    },
    'invideo-blog-zu-video': {
        intro: 'Laut invideo-Hilfe kannst du Links zu Blogartikeln direkt in den Prompt schreiben. Diese Vorlage macht daraus ein gegliedertes Video mit der Kernaussage am Anfang.',
        tipp: 'Schreib die wichtigste Aussage selbst in den Prompt. Dann landet sie vorne, statt irgendwo in Minute eins.',
        fehler: 'Den Artikel einfach verlinken und auf das Beste hoffen. Ohne Vorgabe kürzt das Video eventuell genau den Teil weg, um den es dir ging.',
        jean: 'Ein guter Blogartikel ist schon ein halbes Video. Die andere Hälfte ist der Satz, der in den ersten zehn Sekunden fällt.',
    },
    'invideo-magic-box-aenderungen': {
        intro: 'Die Magic Box unter dem Video nimmt Textbefehle an: Medien in einer Szene tauschen, Schnitttempo ändern, Musik leiser oder anders stimmen. Die Beispiele stammen aus der invideo-Hilfe.',
        tipp: 'Nenn Szenen mit Nummer. „Ersetze das Medium in Szene 2“ trifft, „das Bild mit dem Schlauch“ eher nicht.',
        fehler: 'Alles neu generieren, weil eine Szene nicht passt. Mit Undo und Einzelbefehlen kommst du schneller ans Ziel.',
        jean: 'Ich ändere maximal drei Dinge pro Befehl. Wenn danach etwas schief ist, weiß ich wenigstens, welcher der Übeltäter war.',
    },
    'invideo-short-hochformat': {
        intro: 'Für Reels und TikTok brauchst du 9:16, einen starken ersten Satz und Untertitel, die man ohne Ton liest. invideo kann laut Hilfe auf Hochformat umstellen und Untertitel Wort für Wort einblenden.',
        tipp: 'Schreib den Hook wörtlich in Anführungszeichen. Sonst formuliert invideo ihn um, und dann ist er meist weichgespült.',
        fehler: 'Den Hook erst in Sekunde fünf bringen. Bis dahin ist der Daumen längst weitergezogen.',
        jean: 'Kettenöl ist das langweiligste Thema der Welt, bis jemand sagt, dass du es falsch machst. Dann hören plötzlich alle zu.',
    },
    // HeyGen
    'heygen-ai-script-writer': {
        intro: 'Im Skript-Bereich von HeyGen öffnet ein Schrägstrich das Menü mit dem AI Script Writer. HeyGen rät, Thema, Ton, Kernpunkte und ungefähre Länge mitzugeben.',
        tipp: 'Bitte gleich um ausgeschriebene Zahlen. HeyGen empfiehlt das selbst, weil Sprachausgaben bei Ziffern, Daten und Uhrzeiten stolpern.',
        fehler: 'Englische Fachbegriffe in ein deutsches Skript streuen. HeyGen rät davon ab, Sprachen in einem Skript zu mischen.',
        jean: '„Fünf Werktage“ statt „5 WT“. Die Stimme liest nur, was dasteht, und Abkürzungen klingen gesprochen wie ein Niesen.',
    },
    'heygen-skript-szenen-vorlage': {
        intro: 'In HeyGen hat jede Szene ihr eigenes Skript. Diese Vorlage ist kein Prompt an eine KI, sondern dein Text für drei Szenen, so geschrieben, dass er sich gut sprechen lässt.',
        tipp: 'Kommas machen kurze Pausen, Punkte längere. Für echte Pausen setzt du im Editor die Pause-Funktion, laut HeyGen in Schritten von einer halben Sekunde.',
        fehler: 'Eine Szene mit einem Riesenblock füllen. HeyGen empfiehlt, pro Skriptabschnitt unter 2.000 Zeichen zu bleiben.',
        jean: 'Ich lese jedes Skript einmal laut. Wo ich Luft holen muss, kommt ein Punkt hin. Die Stimme dankt es dir.',
    },
    'heygen-schulungsvideo-skript': {
        intro: 'Schulungsvideos mit Avatar sparen Wiederholungen. Diese Vorlage gibt dem AI Script Writer eine feste Gliederung mit einer Wissensfrage, damit nicht nur Text abgespult wird.',
        tipp: 'Leg jeden Schritt in eine eigene Szene. Dann tauschst du später nur eine Szene, wenn sich der Ablauf ändert.',
        fehler: 'Abkürzungen aus dem Betrieb verwenden. Neue Leute kennen sie nicht, und die Stimme spricht sie oft falsch aus.',
        jean: 'Die Wissensfrage am Ende ist mein Trick. Wer weiß, dass gefragt wird, schaut bis zum Schluss.',
    },
    'heygen-avatar-bewegung': {
        intro: 'HeyGen nennt für Foto-Avatare einen eigenen Bewegungs-Prompt als Mittel gegen steife Avatare, etwa „talks excitedly“. Diese Vorlage baut ihn aus Haltung, Gestik und Mimik.',
        tipp: 'Bei Avatar V rät HeyGen dagegen, den eigenen Bewegungs-Prompt nur bei Bedarf zu nutzen und lieber ausdrucksstarkes Ausgangsmaterial zu liefern. Prüf also, welchen Avatar-Typ du gerade nutzt.',
        fehler: 'Zehn Anweisungen auf einmal. Drei kurze Angaben reichen, sonst zappelt der Avatar.',
        jean: 'Ein Avatar ohne Bewegung wirkt wie ein Passfoto, das spricht. Ein Lächeln am Satzende ändert schon viel.',
    },
    'heygen-faq-video-skript': {
        intro: 'Häufige Fragen eignen sich gut für Avatar-Videos, weil jede Antwort kurz ist. Diese Vorlage legt eine Frage pro Szene an und hält sich strikt an deine Antworten.',
        tipp: 'Wenn Produktnamen falsch ausgesprochen werden, nutz die Aussprache-Funktion per Doppelklick aufs Wort. Für das ganze Projekt gibt es laut HeyGen das Brand Glossary.',
        fehler: 'Die KI Antworten ergänzen lassen. Im FAQ zählt jede Zusage, also nur deine geprüften Antworten verwenden.',
        jean: 'Ein FAQ-Video beantwortet die Frage, bevor sie im Postfach landet. Das ist die einzige Werbung, die auch der Support mag.',
    },
    // Gamma
    'gamma-praesentation-generieren': {
        intro: 'Im Generate-Modus entwirft Gamma eine Präsentation aus einem Thema. Je mehr Kontext du mitgibst, desto weniger musst du hinterher umbauen.',
        tipp: 'Zielgruppe, Ton und Textmenge kannst du auch in den Einstellungen des Generators setzen. Laut Gamma gewinnt aber der Inhalt deines Prompts, wenn beides sich widerspricht.',
        fehler: 'Gamma Zahlen erfinden lassen. Der Platzhalter [ZAHL EINTRAGEN] zeigt dir, wo du selbst liefern musst.',
        jean: 'Die Kernaussage schreibe ich immer zuerst. Wenn ich sie nicht in einem Satz sagen kann, hilft auch kein schönes Theme.',
    },
    'gamma-folie-fuer-folie': {
        intro: 'Laut Gamma-Hilfe beginnt im Modus „Slide-by-slide“ nur dort eine neue Folie, wo eine Zeile mit drei Bindestrichen steht. So bleibt jeder Block, auch eine Bildanweisung darin, auf seiner Folie.',
        tipp: 'Stell die Folienzahl mindestens auf die Zahl deiner Blöcke. Laut Gamma fallen Blöcke über der gewählten Anzahl sonst weg.',
        fehler: 'Im Freeform-Modus „auf Folie 7“ schreiben. Dort entscheidet Gamma selbst über die Aufteilung, und Folie 7 ist dann vielleicht Folie 6.',
        jean: 'Drei Bindestriche sind mein Lieblingswerkzeug in Gamma. Kleinste Mühe, größte Kontrolle.',
    },
    'gamma-zusaetzliche-anweisungen': {
        intro: 'Was im Feld für zusätzliche Anweisungen steht, behandelt Gamma laut Hilfe als Pflichtregel, die andere Vorgaben überstimmt, mit Ausnahme der Folienzahl.',
        tipp: 'Schreib dort nur Regeln, die für alle Folien gelten. Für einzelne Folien gehört die Anweisung in den Text der jeweiligen Folie.',
        fehler: 'Widersprüchliche Regeln, etwa „viel Text“ in den Einstellungen und „höchstens vier Stichpunkte“ in den Anweisungen. Dann gewinnt die Anweisung, und du wunderst dich.',
        jean: 'Keine Händeschüttel-Fotos. Diese eine Regel hat mehr für meine Präsentationen getan als jedes Theme.',
    },
    'gamma-agent-folie-aendern': {
        intro: 'Im Editor hat Gamma einen Agenten, dem du Änderungen in eigenen Worten beschreibst. Laut Gamma sagt er dir danach, welche Folien er angefasst hat, und lässt den Rest stehen.',
        tipp: 'Für eine einzelne Folie nutzt du „Edit with Agent“ direkt an der Folie. Dann bleibt die Änderung garantiert dort.',
        fehler: 'Vage Wünsche wie „mach es besser“. Der Agent braucht eine konkrete Änderung und den Inhalt dafür.',
        jean: 'Ich lasse mir immer sagen, was geändert wurde. Wie beim Werkstattbesuch: Rechnung ohne Positionen zahle ich nicht.',
    },
    'gamma-social-karussell': {
        intro: 'Gamma erstellt neben Präsentationen auch Social-Formate. Laut Entwickler-Doku gibt es dafür Hochformate wie 4:5, passend für LinkedIn-Karussells und Instagram.',
        tipp: 'Gib die Länge der Überschriften vor. Auf dem Handy liest niemand eine Überschrift mit zwölf Wörtern.',
        fehler: 'Eine Präsentation 1:1 als Karussell nehmen. Folien sind für den Beamer gebaut, Karten für den Daumen.',
        jean: 'Eine Botschaft pro Karte. Wer zwei unterbringen will, braucht zwei Karten, nicht kleinere Schrift.',
    },
    // Canva
    'canva-magic-write-social-post': {
        intro: 'Magic Write sitzt direkt in Canva, über die Schnellaktionen oder einen Schrägstrich. So entsteht der Text dort, wo er auch hin soll: im Design.',
        tipp: 'Mit „More like this“ bekommst du ähnliche Varianten, mit „This but …“ eine gezielte Nachbesserung. Beides steht so in der Canva-Hilfe.',
        fehler: 'Fakten weglassen und hoffen, dass Magic Write sie kennt. Canva schreibt selbst, dass Magic Write nur mit den Angaben arbeitet, die du ihm gibst.',
        jean: 'Uhrzeit und Adresse schreibe ich immer selbst rein. Eine schöne Einladung zur falschen Straße bringt niemanden in den Laden.',
    },
    'canva-magic-write-folientexte': {
        intro: 'Aus Stichpunkten werden kurze Folientexte, die in Canva-Präsentationen passen. Die Vorlage begrenzt Überschrift und Stichpunkte, damit nichts aus dem Textfeld läuft.',
        tipp: 'Bleib unter der Eingabegrenze. Laut Canva verarbeitet Magic Write höchstens 1.500 Wörter Eingabe, für Stichpunkte ist das reichlich.',
        fehler: 'Ganze Absätze pro Folie zulassen. Was auf dem Beamer nicht in drei Sekunden lesbar ist, liest keiner.',
        jean: 'Fünf Folien für einen Jahresrückblick. Wer mehr braucht, hat entweder ein sehr gutes Jahr oder zu viele Stichpunkte.',
    },
    'canva-magic-write-eigene-anweisung': {
        intro: 'Markierst du Text im Design, bietet Magic Write fertige Aktionen wie Kürzen oder Umschreiben und eine eigene Anweisung (Custom prompt). Diese Vorlage ist für die eigene Anweisung.',
        tipp: 'Mit den Pfeilen kannst du laut Canva zwischen Ergebnissen hin und her springen, bevor du „Replace“ wählst. Vergleich kurz, statt das erste zu nehmen.',
        fehler: 'Nur „Umschreiben“ klicken und hoffen. Ohne Ziel und Leser schreibt Magic Write einfach anders, nicht besser.',
        jean: 'Ein Plakat liest man im Vorbeigehen. 25 Wörter sind schon großzügig.',
    },
    'canva-magic-write-flyer-text': {
        intro: 'Ein Flyer braucht Hierarchie: groß, mittel, klein, Aufruf. Diese Vorlage liefert die Texte getrennt, damit du sie direkt in die passenden Textfelder ziehst.',
        tipp: 'Fordere zwei Varianten für die Überschrift. Neben der Grafik merkst du schnell, welche wirkt.',
        fehler: 'Datum und Ort von Magic Write formulieren lassen. Laut Canva können Ergebnisse ungenau sein, und beim Datum ist ungenau gleich falsch.',
        jean: 'Ein Reparatur-Café braucht keinen Werbetext, sondern Uhrzeit, Ort und den Satz „kostenlos“. Der Rest ist Deko.',
    },
    'canva-magic-write-produktbeschreibung': {
        intro: 'Für Produktgrafiken, Katalogseiten oder Social-Posts brauchst du keinen langen Shoptext, sondern drei Nutzenpunkte. Diese Vorlage übersetzt Merkmale in Nutzen.',
        tipp: 'Hast du in Canva eine eigene Tonalität gespeichert, kannst du den Text danach über „Change voice“ darauf anpassen.',
        fehler: 'Eigenschaften erfinden lassen. Die Vorlage verbietet Angaben, die nicht in deiner Merkmalsliste stehen.',
        jean: '„Rollverschluss“ ist ein Merkmal. „Laptop bleibt trocken, auch im Platzregen“ ist ein Grund zu kaufen.',
    },
    'canva-magic-write-gliederung': {
        intro: 'In Canva Docs startest du mit einer Gliederung und füllst sie dann Abschnitt für Abschnitt. Magic Write liefert laut Canva auch Listen und Gliederungen.',
        tipp: 'Lass dir am Ende die Lücken auflisten. Canva weist selbst darauf hin, dass Magic Write mit älterem Wissen arbeitet; aktuelle Zeiten und Namen kommen von dir.',
        fehler: 'Die Gliederung für den fertigen Text halten. Sie ist das Gerüst, nicht das Haus.',
        jean: 'Sechs Hauptpunkte reichen für fast jeden Leitfaden. Wer mehr braucht, schreibt eigentlich zwei.',
    },
}

export const SEITEN = {
    runway: {
        titel: 'Runway-Prompts: Vorlagen für Text und Image to Video',
        intro: 'Prompts für die Videomodelle von Runway, gebaut nach Runways eigenen Prompting-Guides: Einstellung beschreiben, Standbilder animieren, Kamerafahrten, Zeitmarken und mehrere Motive. Felder ausfüllen, Vorschau kopieren, in Runway einfügen.',
        vergleiche: ['runway-vs-invideo-ai'],
        kitest: 'kreativ',
        tipps: [
            ['Bewegung statt Bildbeschreibung', 'Bei Image to Video zeigt dein Bild schon, wer und was zu sehen ist. Runway rät, im Text nur die Bewegung zu beschreiben.'],
            ['Positiv formulieren', 'Runway unterstützt keine Verneinungen. Statt „keine Kamerabewegung“ schreibst du „Locked camera. The camera remains still.“'],
            ['Einfach starten, dann ergänzen', 'Erst die wichtigste Bewegung, dann Kamera, Umgebung, Stil. Ein neues Element pro Durchgang, so siehst du, was wirkt.'],
            ['Keine Chat-Sätze', 'Begrüßungen und Bitten verschwenden Platz. Runways Modelle wollen Bildsprache, keine Unterhaltung.'],
        ],
        faq: [
            ['Warum sind die Vorlagen auf Englisch?', 'Alle Beispiele in Runways offiziellen Prompting-Guides sind englisch. Die Feldnamen und Erklärungen hier sind deutsch, der Text, der in Runway landet, englisch.'],
            ['Wie lang darf ein Clip sein?', 'Laut Runway erzeugt Gen-4.5 Clips zwischen 2 und 10 Sekunden, Gen-4 Clips mit 5 oder 10 Sekunden. Gen-4 braucht immer ein Eingabebild, Gen-4.5 kann auch nur aus Text arbeiten.'],
            ['Brauche ich einen Bezahltarif?', 'Gen-4.5 setzt laut Runway mindestens den Standard-Tarif voraus. Was dein Tarif genau enthält, steht auf der Preisseite von Runway.'],
        ],
        quellen: [
            { titel: 'Runway: Text to Video Prompting Guide', url: 'https://help.runwayml.com/hc/en-us/articles/42460036199443-Text-to-Video-Prompting-Guide' },
            { titel: 'Runway: Gen-4 Video Prompting Guide', url: 'https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide' },
            { titel: 'Runway: Creating with Gen-4.5', url: 'https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5' },
            { titel: 'Runway: Camera Terms, Prompts & Examples', url: 'https://help.runwayml.com/hc/en-us/articles/47313504791059-Camera-Terms-Prompts-Examples' },
            { titel: 'Runway: Creating with Gen-4 Video', url: 'https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video' },
        ],
    },
    'kling-ai': {
        titel: 'Kling AI Prompts: Vorlagen nach der offiziellen Formel',
        intro: 'Prompts für Kling, aufgebaut nach den Guides von Kling selbst: die Formel aus Motiv, Bewegung und Szene, Referenzbilder mit @Image1, Abläufe in Sekunden mit Ton, Produktclips und Videobearbeitung.',
        vergleiche: [],
        kitest: 'kreativ',
        tipps: [
            ['Konkret statt abstrakt', 'Kling rät, Wörter wie „edel“ oder „Vintage-Feeling“ durch sichtbare Details zu ersetzen: Licht, Material, Gegenstände im Bild.'],
            ['Verneinungen sparsam', 'Laut Kling-4.0-Guide sind nur zwei Verneinungen wirklich nötig: keine Untertitel und keine Hintergrundmusik. Alles andere beschreibst du positiv.'],
            ['Referenzen mit Rolle', 'Jedes hochgeladene Bild bekommt eine Aufgabe: Szene, Figur oder Bewegungsvorbild. Ohne Rolle rät das Modell.'],
            ['Keine Zahlen erwarten', 'Kling schreibt selbst, dass das Modell kaum auf Stückzahlen reagiert. Zehn Hunde werden selten genau zehn.'],
        ],
        faq: [
            ['Funktionieren deutsche Prompts in Kling?', 'Laut API-Doku nimmt Kling auch Text in anderen Sprachen als Englisch an. Die offiziellen Beispiele sind englisch, deshalb sind es die Vorlagen hier auch.'],
            ['Wie lang werden die Clips?', 'Der ältere Text-to-Video-Guide nennt 5 oder 10 Sekunden. Die API-Doku zu Kling 4.0 nennt 3 bis 30 Sekunden. Welche Längen du in der Web-App wählen kannst, hängt vom Modell und Tarif ab.'],
            ['Was ist Omni Reference?', 'Laut Kling-4.0-Guide der Standard-Einstieg, in dem du Bilder und Videos hochlädst und im Prompt mit @Image1, @Video1 ansprichst.'],
        ],
        quellen: [
            { titel: 'Kling AI: Kling 4.0 User Guide', url: 'https://kling.ai/quickstart/kling-4-model-user-guide' },
            { titel: 'Kling AI: Text-to-Video Prompt Guide', url: 'https://kling.ai/quickstart/text-to-video-prompt-guide' },
            { titel: 'Kling AI: API-Doku Text to Video (4.0)', url: 'https://kling.ai/document-api/api/video/4-0/text-to-video.md' },
            { titel: 'Kling AI: Best Practices (Übersicht)', url: 'https://kling.ai/quickstart' },
        ],
    },
    'invideo-ai': {
        titel: 'invideo AI Prompts: Vorlagen für fertige Videos',
        intro: 'Prompts für invideo AI: Erklärvideos, Werbevideos mit eigener URL, Blogartikel als Video, Shorts im Hochformat und Änderungsbefehle für die Magic Box. Geschrieben nach den Empfehlungen aus der invideo-Hilfe.',
        vergleiche: ['runway-vs-invideo-ai', 'synthesia-vs-heygen-vs-invideo-vs-pictory'],
        kitest: 'kreativ',
        tipps: [
            ['Reden wie mit einer Kollegin', 'Die invideo-Hilfe rät, die Idee in natürlicher Sprache zu erklären, nicht als Stichwortliste.'],
            ['URL und Bilder mitgeben', 'Bei Werbevideos die Website in den Prompt, Produktbilder anhängen und ihnen Kurznamen wie „Logo“ geben.'],
            ['Nachbessern in der Magic Box', 'Szene tauschen, Tempo ändern, Musik leiser: Das geht per Textbefehl unter dem Video, ohne alles neu zu erzeugen.'],
            ['Chat-Prompts prüfen', 'invideo warnt davor, Prompts aus anderen KI-Tools ungeprüft zu übernehmen. Lies sie, bevor du sie einfügst.'],
        ],
        faq: [
            ['Kann invideo AI deutsche Videos?', 'Laut invideo werden über 50 Sprachen unterstützt, Deutsch gehört dazu. Schreib die gewünschte Sprache für Voiceover und Untertitel trotzdem ausdrücklich in den Prompt.'],
            ['Wo finde ich die Magic Box?', 'Laut Hilfe öffnet sich ein Video zuerst im Theatre-Modus. Über „Edit & Download“ erscheint die Magic Box unter dem Video.'],
            ['Kann ich eigene Bilder nutzen?', 'Ja. Du kannst Bilder beim Prompt anhängen oder später in einer Szene über den Medienbereich hochladen und tauschen.'],
        ],
        quellen: [
            { titel: 'invideo Hilfe: How to prompt for marketing videos', url: 'https://help.invideo.io/en/articles/12539490-how-to-prompt-for-marketing-videos' },
            { titel: 'invideo Hilfe: What is Magic Box and how to use it', url: 'https://help.invideo.io/en/articles/9387692-what-is-magic-box-and-how-to-use-it' },
            { titel: 'invideo Hilfe: Medien in einer Szene ersetzen', url: 'https://help.invideo.io/en/articles/9974099-how-can-i-replace-the-media-in-my-video-with-another-media-or-my-own' },
            { titel: 'invideo Hilfe: Voiceover-Stimme ändern', url: 'https://help.invideo.io/en/articles/9387689-how-can-i-add-or-change-the-voice-of-the-voiceover' },
            { titel: 'invideo: AI Video Translator (Sprachen)', url: 'https://invideo.io/make/video-translator/' },
        ],
    },
    heygen: {
        titel: 'HeyGen-Prompts: Skripte und Vorlagen für Avatar-Videos',
        intro: 'Vorlagen für HeyGen: Prompts für den AI Script Writer, sprechbare Skripte für Szenen, Schulungs- und FAQ-Videos und ein Bewegungs-Prompt für Foto-Avatare. Nach den Skript-Tipps aus der HeyGen-Hilfe.',
        vergleiche: ['synthesia-vs-heygen-vs-invideo-vs-pictory'],
        kitest: 'deutsch',
        tipps: [
            ['Zahlen ausschreiben', 'HeyGen empfiehlt, Jahreszahlen, Daten und Uhrzeiten als Wörter zu schreiben. Sprachausgaben stolpern sonst.'],
            ['Satzzeichen steuern das Tempo', 'Komma heißt kurze Pause, Punkt längere. Für echte Pausen gibt es im Editor die Pause-Funktion in Halbsekunden-Schritten.'],
            ['Eine Sprache pro Skript', 'HeyGen rät davon ab, Sprachen in einem Skript zu mischen. Für mehrere Sprachen nimmst du getrennte Szenen oder Projekte.'],
            ['Erst hören, dann rendern', 'Mit der Audio-Vorschau prüfst du Aussprache und Tempo, bevor das Rendern Credits kostet.'],
        ],
        faq: [
            ['Wo finde ich den AI Script Writer?', 'Laut HeyGen im Skript-Bereich von AI Studio: Ein Schrägstrich öffnet das Menü, dort wählst du den AI Script Writer.'],
            ['Wie korrigiere ich falsche Aussprache?', 'Doppelklick auf das Wort, dann „Pronunciation“ und die Lautschrift eintragen. Für das ganze Projekt nutzt du laut HeyGen das Brand Glossary.'],
            ['Wie lang darf ein Szenen-Skript sein?', 'HeyGen empfiehlt, jeden Skriptabschnitt unter 2.000 Zeichen zu halten.'],
        ],
        quellen: [
            { titel: 'HeyGen Hilfe: Script Tips', url: 'https://help.heygen.com/en/articles/9574152-script-tips' },
            { titel: 'HeyGen Hilfe: How to Write Scripts in the AI Studio', url: 'https://help.heygen.com/en/articles/11381771-how-to-write-scripts-in-the-editing-studio' },
            { titel: 'HeyGen Academy: Scripting', url: 'https://www.heygen.com/academy/scripting' },
            { titel: 'HeyGen Hilfe: Create your first video in our Studio', url: 'https://help.heygen.com/en/articles/11049837-create-your-first-video-in-our-studio' },
            { titel: 'HeyGen Hilfe: Avatar & Voice FAQ', url: 'https://help.heygen.com/en/articles/15544929' },
        ],
    },
    gamma: {
        titel: 'Gamma-Prompts: Vorlagen für Präsentationen und Karussells',
        intro: 'Prompts für Gamma: Präsentation aus einem Thema generieren, eigenen Text Folie für Folie einfügen, Regeln für zusätzliche Anweisungen, Änderungen mit dem Gamma Agent und Social-Karussells.',
        vergleiche: ['gamma-vs-canva'],
        kitest: 'deutsch',
        tipps: [
            ['Den richtigen Modus wählen', 'Generate für einen Entwurf aus einem Thema, Paste für vorhandenen Text, Import für Dateien und Webseiten.'],
            ['Drei Bindestriche trennen Folien', 'Im Modus „Slide-by-slide“ beginnt laut Gamma nur dort eine neue Folie, wo eine Zeile mit --- steht.'],
            ['Zusätzliche Anweisungen sind Pflicht', 'Was dort steht, behandelt Gamma als Regel, die andere Vorgaben überstimmt. Nur die Folienzahl bleibt eine harte Grenze.'],
            ['Inhalt schlägt Einstellung', 'Nennt dein Text eine andere Zielgruppe oder Tonalität als die Einstellungen, gewinnt laut Gamma der Text.'],
        ],
        faq: [
            ['Wie viele Folien kann Gamma erzeugen?', 'Das hängt vom Tarif ab. Laut Entwickler-Doku sind es im Gratis-Tarif bis zu 10 Karten pro Generierung, in den Bezahltarifen bis zu 100.'],
            ['Kann ich einzelne Folien nachträglich ändern?', 'Ja, über den Agenten im Editor oder „Edit with Agent“ direkt an einer Folie. Von Hand bearbeitete Folien bleiben laut Gamma unangetastet.'],
            ['Kann ich auf Deutsch generieren?', 'Ja, die Ausgabesprache lässt sich wählen. Schreib die Sprache trotzdem in den Prompt, dann gibt es keine Mischung.'],
        ],
        quellen: [
            { titel: 'Gamma Hilfe: Neue Präsentation, Dokument oder Webseite erstellen', url: 'https://help.gamma.app/en/articles/7838093-how-do-i-create-a-new-presentation-document-or-webpage-in-gamma' },
            { titel: 'Gamma Hilfe: What are slides in Gamma and how do they work', url: 'https://help.gamma.app/en/articles/11016396-what-are-slides-in-gamma-and-how-do-they-work' },
            { titel: 'Gamma Hilfe: Where do I start when adding content', url: 'https://help.gamma.app/en/articles/11016385-where-do-i-start-when-adding-content-in-gamma' },
            { titel: 'Gamma Entwickler-Doku: Generate API parameters explained', url: 'https://developers.gamma.app/guides/generate-api-parameters-explained' },
        ],
    },
    canva: {
        titel: 'Canva Magic Write: Prompts und Vorlagen auf Deutsch',
        intro: 'Prompts für Magic Write, den Textassistenten in Canva: Social-Posts, Folientexte, Flyer, Produkttexte, Gliederungen für Canva Docs und eigene Anweisungen für markierten Text. Mit den Grenzen, die Canva selbst nennt.',
        vergleiche: ['gamma-vs-canva'],
        kitest: 'deutsch',
        tipps: [
            ['Fakten selbst mitgeben', 'Laut Canva arbeitet Magic Write nur mit dem, was du eingibst oder im Dokument steht. Daten, Preise und Adressen gehören in den Prompt.'],
            ['Eingabe unter 1.500 Wörtern', 'Canva nennt eine Grenze von 1.500 Wörtern Eingabe und rund 2.000 Wörtern Ausgabe. Längere Texte werden mitten im Satz abgeschnitten.'],
            ['Nachbessern statt neu starten', '„More like this“ liefert ähnliche Varianten, „This but …“ eine gezielte Änderung.'],
            ['Eigene Tonalität nutzen', 'Über „Change voice“ kannst du markierten Text auf eine gespeicherte Tonalität umstellen.'],
        ],
        faq: [
            ['Wo finde ich Magic Write?', 'Laut Canva über die Schnellaktionen unten links oder per Schrägstrich. Für vorhandenen Text markierst du ihn und klickst in der Werkzeugleiste auf Magic Write.'],
            ['Wie oft kann ich Magic Write nutzen?', 'Canva hat die Nutzungsgrenzen für KI-Funktionen umgestellt. Wie viel dein Tarif enthält, steht in der Canva-Hilfe unter KI-Nutzung.'],
            ['Wie aktuell ist das Wissen von Magic Write?', 'Die Canva-Hilfe nennt Daten bis Mitte 2021 als Grundlage. Aktuelles lieferst du deshalb selbst und prüfst das Ergebnis.'],
        ],
        quellen: [
            { titel: 'Canva Hilfe: Learn about Magic Write', url: 'https://www.canva.com/help/about-magic-write/' },
            { titel: 'Canva Hilfe: Use Magic Write to generate text', url: 'https://www.canva.com/help/magic-write/' },
            { titel: 'Canva Hilfe: Understanding your AI usage', url: 'https://www.canva.com/help/ai-access/' },
        ],
    },
}
