// Tool-spezifische Prompts (Content-Plan Cluster A). Jeder Prompt hat `fuer: [toolSlug]`.
// PROMPTS: Vorlagen im Format von lib/prompts.js. TEXTE: Intro/Tipp/Fehler/Jean je Prompt-Slug.
// SEITEN: Texte der Seiten /prompts/tool/[slug] im Format von TOOL_PROMPT_TEXTE in lib/prompt-tools.js.
// Gruppe Audio und Bild: Suno, Midjourney, ElevenLabs, Leonardo AI, Ideogram.
// Syntax geprüft am 2026-11-02 in der offiziellen Doku der Anbieter (Links in SEITEN[tool].quellen).
// Keine echten Künstlernamen in Stilangaben: Stile werden immer allgemein beschrieben.

export const PROMPTS = [
    // ---------------------------------------------------------------- Suno
    {
        slug: 'suno-song-mit-eigenem-text',
        title: 'Suno: Song mit eigenem Text und Songstruktur',
        kategorie: 'content',
        ziel: 'Einen eigenen Songtext so für Suno aufbereiten, dass Strophe, Refrain und Bridge an der richtigen Stelle landen.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'stil', label: 'Stil für das Feld Styles (Genre, Tempo, Stimme, Instrumente, Stimmung)', beispiel: 'Upbeat German pop rock, 120 BPM, warm male vocals, electric guitar, punchy drums, hopeful mood' },
            { key: 'strophe1', label: 'Text Strophe 1', beispiel: 'Montag früh, der Kaffee kalt\nder Bus fährt mir vor der Nase weg', mehrzeilig: true },
            { key: 'refrain', label: 'Text Refrain', beispiel: 'Und ich lauf, ich lauf\nbis die Stadt erwacht', mehrzeilig: true },
            { key: 'strophe2', label: 'Text Strophe 2', beispiel: 'Mittags Stau im Kopf und auf der Straße\ndoch die Sonne bleibt', mehrzeilig: true },
            { key: 'bridge', label: 'Text Bridge', beispiel: 'Vielleicht ist heute nicht perfekt\naber es ist meins', mehrzeilig: true },
        ],
        vorlage: `STYLES (ins Feld Styles kopieren):
{stil}

LYRICS (ins Feld Lyrics kopieren):
[Intro]

[Verse 1]
{strophe1}

[Chorus]
{refrain}

[Verse 2]
{strophe2}

[Chorus]
{refrain}

[Bridge]
{bridge}

[Chorus]
{refrain}

[Outro]`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-stilangabe-bauen',
        title: 'Suno: Stilangabe für das Feld Styles bauen',
        kategorie: 'content',
        ziel: 'Eine klare Stilbeschreibung schreiben, die Genre, Tempo, Tonart, Stimme, Instrumente und Stimmung festlegt, statt nur „Pop“ einzutippen.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'genre', label: 'Genre und Untergenre', beispiel: 'Melodic deep house with organic textures' },
            { key: 'tempo', label: 'Tempo und Tonart (optional)', beispiel: '122 BPM, A minor' },
            { key: 'stimme', label: 'Stimme', beispiel: 'soft female vocals, breathy, close to the microphone' },
            { key: 'instrumente', label: 'Zwei bis drei Instrumente', beispiel: 'warm analog bass, hand percussion, airy synth pads' },
            { key: 'stimmung', label: 'Stimmung und Verlauf', beispiel: 'calm start with ambient layers, slowly building to a hypnotic groove' },
        ],
        vorlage: `{genre}, {tempo}. {stimme}. Instruments: {instrumente}. Mood and arc: {stimmung}.`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-instrumental-hintergrundmusik',
        title: 'Suno: Instrumentale Hintergrundmusik für Video oder Podcast',
        kategorie: 'video',
        ziel: 'Ruhige Musik ohne Gesang erzeugen, die unter Sprache liegt und nicht ablenkt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'einsatz', label: 'Wofür ist die Musik?', beispiel: 'Hintergrund für ein Erklärvideo über Fahrradreparatur' },
            { key: 'genre', label: 'Genre', beispiel: 'Lo-fi hip hop' },
            { key: 'tempo', label: 'Tempo', beispiel: 'slow, around 80 BPM' },
            { key: 'instrumente', label: 'Instrumente', beispiel: 'mellow electric piano, soft drums, warm bass' },
            { key: 'weglassen', label: 'Was soll nicht vorkommen? (für das Feld Exclude)', beispiel: 'vocals, heavy distortion, loud cymbals' },
        ],
        vorlage: `EINSTELLUNG: Schalter Instrumental an.

STYLES:
{genre}, {tempo}, {instrumente}. Calm and steady background music for {einsatz}, no sudden loud parts, consistent volume, unobtrusive.

EXCLUDE (unter Advanced Options):
{weglassen}`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-geburtstagslied',
        title: 'Suno: Persönliches Geburtstagslied',
        kategorie: 'content',
        ziel: 'Ein Geburtstagslied mit Namen und Insider-Details, das nicht wie ein Standard-Ständchen klingt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'name', label: 'Name des Geburtstagskinds', beispiel: 'Sabine' },
            { key: 'details', label: 'Drei Details, die nur zu dieser Person passen', beispiel: 'trinkt Kaffee nur schwarz, fährt jeden Sonntag Rad, singt im Auto falsch mit', mehrzeilig: true },
            { key: 'strophe', label: 'Deine Strophe (eigene Zeilen)', beispiel: 'Sonntag früh, das Rad steht schon bereit\nSabine fährt, egal wie weit', mehrzeilig: true },
            { key: 'refrain', label: 'Dein Refrain (eigene Zeilen)', beispiel: 'Hoch soll sie leben, mit Kaffee schwarz\nheute ist dein Tag', mehrzeilig: true },
            { key: 'stil', label: 'Stil', beispiel: 'Cheerful acoustic pop, 110 BPM, group vocals in the chorus, ukulele and hand claps' },
        ],
        vorlage: `STYLES:
{stil}

LYRICS:
[Intro]

[Verse 1]
{strophe}

[Chorus]
{refrain}

[Verse 2]
(Zwei bis vier neue Zeilen mit diesen Details: {details})

[Chorus]
{refrain}

[Outro]
Alles Gute, {name}!`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-jingle-podcast-intro',
        title: 'Suno: Kurzer Jingle für Podcast oder Kanal',
        kategorie: 'video',
        ziel: 'Einen kurzen Erkennungs-Jingle mit Name und Slogan erzeugen, den du am Anfang jeder Folge nutzt.',
        techniken: ['kontext', 'varianten'],
        felder: [
            { key: 'name', label: 'Name des Podcasts oder Kanals', beispiel: 'Werkstattfunk' },
            { key: 'slogan', label: 'Slogan (kurz, höchstens acht Wörter)', beispiel: 'Technik, ehrlich erklärt' },
            { key: 'stil', label: 'Stil', beispiel: 'Short energetic indie rock jingle, driving drums, bright electric guitar riff, confident male vocals' },
        ],
        vorlage: `STYLES:
{stil}, short and catchy, strong hook, clean ending.

LYRICS:
[Intro]

[Chorus]
{name}
{slogan}
{name}

[Outro]`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-lernlied-merkhilfe',
        title: 'Suno: Lernlied als Merkhilfe',
        kategorie: 'lernen',
        ziel: 'Lernstoff wie Vokabeln, Formeln oder Reihenfolgen in einen Refrain packen, der im Kopf bleibt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'thema', label: 'Was soll gelernt werden?', beispiel: 'Die Planeten in der richtigen Reihenfolge' },
            { key: 'refrain', label: 'Refrain mit dem Lernstoff (eigene Zeilen)', beispiel: 'Merkur, Venus, Erde, Mars\nJupiter, Saturn, so geht das', mehrzeilig: true },
            { key: 'strophe', label: 'Strophe mit einer Erklärung (eigene Zeilen)', beispiel: 'Ganz nah an der Sonne, da ist es heiß\nMerkur dreht schnell seinen Kreis', mehrzeilig: true },
            { key: 'stil', label: 'Stil', beispiel: 'Playful children\'s pop, 100 BPM, clear friendly female vocals, xylophone and acoustic guitar' },
        ],
        vorlage: `STYLES:
{stil}, very clear pronunciation, simple melody, easy to sing along.

LYRICS:
[Intro]

[Chorus]
{refrain}

[Verse 1]
{strophe}

[Chorus]
{refrain}

[Chorus]
{refrain}

[Outro]
({thema})`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-cover-neuer-stil',
        title: 'Suno: Eigenen Song mit Cover in neuem Stil',
        kategorie: 'content',
        ziel: 'Einen eigenen Suno-Song mit der Funktion Cover in ein anderes Genre bringen, ohne den Text zu verlieren.',
        techniken: ['kontext', 'varianten'],
        felder: [
            { key: 'alt', label: 'Bisheriger Stil des Songs', beispiel: 'Acoustic folk ballad' },
            { key: 'neu', label: 'Neuer Stil', beispiel: 'Upbeat 80s synth pop, 118 BPM, bright synth leads, gated drums' },
            { key: 'stimme', label: 'Stimme im neuen Stil', beispiel: 'energetic female vocals with layered harmonies in the chorus' },
            { key: 'weglassen', label: 'Was aus dem alten Stil soll verschwinden? (Exclude)', beispiel: 'acoustic guitar, fingerpicking' },
        ],
        vorlage: `VORGEHEN: Deinen Song öffnen, Cover wählen, Text unverändert lassen.

STYLES:
{neu}. {stimme}. Same lyrics and song structure, completely new arrangement instead of {alt}.

EXCLUDE (unter Advanced Options):
{weglassen}`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-vereinslied-mitsingrefrain',
        title: 'Suno: Vereinslied mit Mitsing-Refrain',
        kategorie: 'business',
        ziel: 'Ein Lied für Verein, Team oder Firmenfeier mit einem Refrain, den alle nach einmal Hören mitsingen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'verein', label: 'Name von Verein oder Team', beispiel: 'TSV Grünwiese' },
            { key: 'strophe', label: 'Strophe (eigene Zeilen über eure Geschichte)', beispiel: 'Seit dreißig Jahren auf dem Platz\nbei Regen, Schnee und Hatz', mehrzeilig: true },
            { key: 'ruf', label: 'Ruf für den Refrain (zwei bis vier Wörter)', beispiel: 'Grünwiese, hey!' },
            { key: 'refrain', label: 'Refrain (eigene Zeilen)', beispiel: 'Wir stehen zusammen, Woche für Woche\nGrünwiese, hey!', mehrzeilig: true },
            { key: 'stil', label: 'Stil', beispiel: 'Stadium rock anthem, 128 BPM, big gang vocals, stomping drums, hand claps' },
        ],
        vorlage: `STYLES:
{stil}, crowd singalong chorus, simple and loud.

LYRICS:
[Intro]
({ruf})

[Verse 1]
{strophe}

[Pre-Chorus]
({ruf})

[Chorus]
{refrain}

[Bridge]
({ruf})
({ruf})

[Chorus]
{refrain}

[Outro]
{verein}!`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-ergebnis-gezielt-nachschaerfen',
        title: 'Suno: Song gezielt nachschärfen statt neu würfeln',
        kategorie: 'content',
        ziel: 'Aus einem fast passenden Ergebnis eine bessere Version machen: Stil präzisieren, Unerwünschtes ausschließen, Regler bewusst setzen.',
        techniken: ['kritik', 'schritte'],
        felder: [
            { key: 'gut', label: 'Was passt schon?', beispiel: 'Tempo und Refrain-Melodie' },
            { key: 'stoert', label: 'Was stört?', beispiel: 'Zu viel Hall auf der Stimme, Gitarre zu verzerrt' },
            { key: 'stil', label: 'Bisheriger Text im Feld Styles', beispiel: 'Indie rock, 115 BPM, male vocals, electric guitar' },
            { key: 'ersatz', label: 'Was soll stattdessen klingen?', beispiel: 'dry, close vocals and clean jangly guitar' },
        ],
        vorlage: `CHECKLISTE VOR DEM NÄCHSTEN VERSUCH:
1. Behalten: {gut}. Nur eine Sache auf einmal ändern.
2. STYLES neu: {stil}, {ersatz}.
3. EXCLUDE (unter Advanced Options): Begriffe aus „{stoert}“ als kurze Stichwörter eintragen, durch Kommas getrennt.
4. Regler: Style Influence Richtung Strong, damit Suno sich enger an die Stilangabe hält. Weirdness bei 50 % lassen, das ist laut Suno das erwartbare Ergebnis.
5. Beide neuen Versionen gegen die alte hören und nur die Änderung bewerten.`,
        tools: ['suno'],
        fuer: ['suno'],
    },
    {
        slug: 'suno-duett-zwei-stimmen',
        title: 'Suno: Duett mit zwei Stimmen',
        kategorie: 'content',
        ziel: 'Einen Song schreiben, in dem sich zwei Stimmen abwechseln und im Refrain zusammen singen.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'stil', label: 'Stil', beispiel: 'Country pop duet, 96 BPM, acoustic guitar, pedal steel, warm production' },
            { key: 'teil1', label: 'Strophe für Stimme 1 (eigene Zeilen)', beispiel: 'Ich hab den Zug verpasst, schon wieder\nund steh allein am Gleis', mehrzeilig: true },
            { key: 'teil2', label: 'Strophe für Stimme 2 (eigene Zeilen)', beispiel: 'Ich hab gewartet, Stunde um Stunde\nund hab’s doch längst gewusst', mehrzeilig: true },
            { key: 'refrain', label: 'Gemeinsamer Refrain (eigene Zeilen)', beispiel: 'Wir zwei, wir kommen immer zu spät\naber wir kommen an', mehrzeilig: true },
        ],
        vorlage: `STYLES:
{stil}, male and female duet, call and response, harmonies in the chorus.

LYRICS:
[Intro]

[Verse 1]
[male vocals]
{teil1}

[Verse 2]
[female vocals]
{teil2}

[Chorus]
{refrain}

[Bridge]
[male vocals]
(eine Zeile)
[female vocals]
(eine Antwortzeile)

[Chorus]
{refrain}

[Outro]`,
        tools: ['suno'],
        fuer: ['suno'],
    },

    // ---------------------------------------------------------------- Midjourney
    {
        slug: 'midjourney-portrait-lichtsetzung',
        title: 'Midjourney: Porträt mit gezielter Lichtsetzung',
        kategorie: 'content',
        ziel: 'Ein Porträt einer erfundenen Person, bei dem du das Licht steuerst statt es dem Zufall zu überlassen.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'person', label: 'Person (erfunden, auf Englisch)', beispiel: 'an elderly mechanic with grey stubble and oil-stained hands' },
            { key: 'ort', label: 'Ort', beispiel: 'in a small motorcycle workshop' },
            { key: 'licht', label: 'Licht (Richtung, Farbe, Härte)', beispiel: 'soft window light from the left, warm late afternoon tones, deep shadows on the right' },
            { key: 'kamera', label: 'Bildausschnitt', beispiel: 'head and shoulders, shallow depth of field' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '4:5' },
        ],
        vorlage: `portrait photo of {person} {ort}, {licht}, {kamera} --ar {format} --raw`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-produktfoto',
        title: 'Midjourney: Produktfoto-Look für Shop und Social Media',
        kategorie: 'shop',
        ziel: 'Ein sauberes Produktbild im Studio-Look als Vorlage oder Moodbild für den Shop.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'produkt', label: 'Produkt (ohne echte Marke, auf Englisch)', beispiel: 'a matte black stainless steel water bottle' },
            { key: 'untergrund', label: 'Untergrund und Hintergrund', beispiel: 'on a light oak table, plain warm grey background' },
            { key: 'licht', label: 'Licht', beispiel: 'soft studio lighting, gentle reflections, subtle shadow' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '4:5' },
            { key: 'weglassen', label: 'Was soll nicht ins Bild?', beispiel: 'text, logo, hands' },
        ],
        vorlage: `product photo of {produkt} {untergrund}, {licht}, centered, sharp focus on the product --ar {format} --raw --no {weglassen}`,
        tools: ['midjourney', 'canva'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-blog-titelbild',
        title: 'Midjourney: Titelbild im Querformat mit Platz für die Überschrift',
        kategorie: 'content',
        ziel: 'Ein Titelbild für Blog oder YouTube, bei dem eine Bildhälfte ruhig bleibt, damit die Überschrift darauf passt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'motiv', label: 'Motiv (auf Englisch)', beispiel: 'a laptop next to a disassembled scooter engine on a workbench' },
            { key: 'stil', label: 'Stil', beispiel: 'editorial photography, muted colors' },
            { key: 'seite', label: 'Wo soll der Platz für Text sein?', beispiel: 'right' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '16:9' },
        ],
        vorlage: `{motiv}, {stil}, subject placed on the left third, large calm empty area on the {seite} side, minimal background --ar {format}`,
        tools: ['midjourney', 'canva'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-stil-referenz-sref',
        title: 'Midjourney: Einheitlicher Look mit Style Reference',
        kategorie: 'content',
        ziel: 'Mehrere Bilder im gleichen Stil erzeugen, indem du ein eigenes Referenzbild als Style Reference nutzt.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'motiv', label: 'Motiv (nur Inhalt, keine Stilwörter, auf Englisch)', beispiel: 'a fox reading a newspaper on a park bench' },
            { key: 'url', label: 'Bild-URL deiner Stilvorlage (eigenes Bild)', beispiel: 'https://example.com/mein-stil.png' },
            { key: 'gewicht', label: 'Stärke des Stils (0 bis 1000, Standard 100)', beispiel: '200' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '3:2' },
        ],
        vorlage: `{motiv} --sref {url} --sw {gewicht} --ar {format}`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-poster-mit-text',
        title: 'Midjourney: Poster mit lesbarem Text',
        kategorie: 'launch',
        ziel: 'Ein Plakatmotiv, auf dem ein kurzes Wort oder ein Slogan sauber erscheint.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'text', label: 'Text im Bild (kurz, ohne Umlaute am sichersten)', beispiel: 'OPEN GARAGE' },
            { key: 'motiv', label: 'Motiv (auf Englisch)', beispiel: 'a retro poster of a vintage moped in front of a garage door' },
            { key: 'stil', label: 'Stil', beispiel: 'flat screen print style, two colors, orange and navy' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '2:3' },
        ],
        vorlage: `{motiv}, with the words "{text}" in big bold letters at the top, {stil} --ar {format} --raw`,
        tools: ['midjourney', 'canva'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-stylize-testreihe',
        title: 'Midjourney: Stylize-Testreihe mit festem Seed',
        kategorie: 'content',
        ziel: 'Herausfinden, welcher Stylize-Wert zu deinem Motiv passt, indem nur dieser eine Wert wechselt.',
        techniken: ['schritte', 'varianten'],
        felder: [
            { key: 'motiv', label: 'Motiv mit Stil (auf Englisch)', beispiel: 'a cozy reading corner with a green armchair, watercolor illustration' },
            { key: 'seed', label: 'Seed (beliebige ganze Zahl)', beispiel: '4242' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '1:1' },
        ],
        vorlage: `Prompt 1: {motiv} --ar {format} --seed {seed} --s 0
Prompt 2: {motiv} --ar {format} --seed {seed} --s 100
Prompt 3: {motiv} --ar {format} --seed {seed} --s 400
Prompt 4: {motiv} --ar {format} --seed {seed} --s 1000

Jede Zeile einzeln abschicken. Danach die vier Raster vergleichen: niedrig hält sich eng an den Text, hoch gibt Midjourney mehr künstlerische Freiheit.`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-variety-ideenfindung',
        title: 'Midjourney: Ideenfindung mit Chaos (Variety)',
        kategorie: 'launch',
        ziel: 'In einem Durchgang vier deutlich verschiedene Bildideen bekommen, statt vier fast gleiche.',
        techniken: ['varianten', 'kontext'],
        felder: [
            { key: 'idee', label: 'Grobe Idee (auf Englisch)', beispiel: 'mascot for a bicycle repair cafe' },
            { key: 'chaos', label: 'Chaos-Wert (0 bis 100)', beispiel: '60' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '1:1' },
        ],
        vorlage: `{idee}, simple shapes, clear silhouette --c {chaos} --ar {format}`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-no-parameter',
        title: 'Midjourney: Störende Elemente mit --no ausschließen',
        kategorie: 'content',
        ziel: 'Ungewollte Dinge aus dem Bild halten, ohne „ohne“ in den Prompt zu schreiben.',
        techniken: ['format', 'kritik'],
        felder: [
            { key: 'motiv', label: 'Motiv (auf Englisch)', beispiel: 'still life gouache painting of a breakfast table' },
            { key: 'weglassen', label: 'Was soll fehlen? (einzelne Wörter, mit Komma)', beispiel: 'fruit, apple, pear' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '4:3' },
        ],
        vorlage: `{motiv} --no {weglassen} --ar {format}`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-illustrationsserie',
        title: 'Midjourney: Illustrationsserie im gleichen Stil',
        kategorie: 'content',
        ziel: 'Mehrere Illustrationen für ein Projekt, etwa Kinderbuch oder Präsentation, mit gleicher Stilbeschreibung und gleichem Format.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'stil', label: 'Stilbeschreibung (allgemein, keine Künstlernamen)', beispiel: 'soft colored pencil illustration, pastel palette, white paper texture, gentle outlines' },
            { key: 'szene1', label: 'Szene 1 (auf Englisch)', beispiel: 'a small hedgehog packing a suitcase' },
            { key: 'szene2', label: 'Szene 2', beispiel: 'the hedgehog waiting at a train station' },
            { key: 'szene3', label: 'Szene 3', beispiel: 'the hedgehog arriving at the seaside' },
            { key: 'format', label: 'Seitenverhältnis', beispiel: '3:2' },
        ],
        vorlage: `{szene1}, {stil} --ar {format}
{szene2}, {stil} --ar {format}
{szene3}, {stil} --ar {format}

Jede Zeile einzeln abschicken. Stiltext und Format bleiben identisch, nur die Szene wechselt.`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },
    {
        slug: 'midjourney-lichtstimmung-hochformat',
        title: 'Midjourney: Lichtstimmung im Hochformat für Story und Reel',
        kategorie: 'video',
        ziel: 'Ein stimmungsvolles Bild im Format 9:16, bei dem Tageszeit und Licht die Hauptrolle spielen.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'ort', label: 'Ort (auf Englisch)', beispiel: 'a narrow cobblestone street in an old town' },
            { key: 'tageszeit', label: 'Tageszeit und Wetter', beispiel: 'blue hour after rain' },
            { key: 'licht', label: 'Lichtquellen', beispiel: 'warm glowing shop windows, reflections on wet stones, cool blue sky' },
            { key: 'stil', label: 'Stil', beispiel: 'cinematic photography, 35mm' },
        ],
        vorlage: `{ort} at {tageszeit}, {licht}, {stil}, vertical composition --ar 9:16`,
        tools: ['midjourney'],
        fuer: ['midjourney'],
    },

    // ---------------------------------------------------------------- ElevenLabs
    {
        slug: 'elevenlabs-voice-design-stimme',
        title: 'ElevenLabs: Eigene Stimme mit Voice Design beschreiben',
        kategorie: 'video',
        ziel: 'Eine neue Stimme per Beschreibung erzeugen, im Aufbau, den ElevenLabs für Voice Design empfiehlt.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'sprache', label: 'Sprache und Variante', beispiel: 'Native German, Hochdeutsch without regional dialect' },
            { key: 'person', label: 'Geschlecht und Alter', beispiel: 'Male, 40 to 45' },
            { key: 'qualitaet', label: 'Qualität', beispiel: 'Studio quality' },
            { key: 'persona', label: 'Persona (zwei bis fünf Wörter)', beispiel: 'friendly workshop explainer' },
            { key: 'emotion', label: 'Emotion (zwei bis drei Adjektive)', beispiel: 'calm, confident, warm' },
            { key: 'vortrag', label: 'Klangfarbe, Tempo, Vortrag (ein bis zwei Sätze)', beispiel: 'Slightly deep, relaxed timbre. Speaks at a steady, unhurried pace with clear emphasis on key steps.' },
        ],
        vorlage: `{sprache}. {person}. {qualitaet}.
Persona: {persona}. Emotion: {emotion}.
{vortrag}`,
        tools: ['elevenlabs'],
        fuer: ['elevenlabs'],
    },
    {
        slug: 'elevenlabs-audio-tags-sprechtext',
        title: 'ElevenLabs: Sprechtext mit Audio-Tags für Betonung und Gefühl',
        kategorie: 'video',
        ziel: 'Einen Sprechtext so auszeichnen, dass Eleven v3 oder v4 flüstert, lacht oder seufzt, wo du es willst.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'einstieg', label: 'Einstiegssatz (ruhig)', beispiel: 'Heute zeige ich dir, wie du einen Platten in fünf Minuten flickst.' },
            { key: 'geheimnis', label: 'Satz, der geflüstert werden soll', beispiel: 'Der Trick steckt im Ventil.' },
            { key: 'pointe', label: 'Satz mit Lacher', beispiel: 'Beim ersten Mal hab ich den Schlauch natürlich verkehrt herum eingebaut.' },
            { key: 'schluss', label: 'Schlusssatz (begeistert)', beispiel: 'Und jetzt bist du dran!' },
        ],
        vorlage: `{einstieg}

[whispers] {geheimnis}

[laughs] {pointe}

[sighs] Aber gut... man lernt dazu.

[excited] {schluss}`,
        tools: ['elevenlabs'],
        fuer: ['elevenlabs'],
    },
    {
        slug: 'elevenlabs-soundeffekt',
        title: 'ElevenLabs: Soundeffekt aus einer Beschreibung',
        kategorie: 'video',
        ziel: 'Einen passenden Soundeffekt für Video, Podcast oder Spiel beschreiben, mit Handlung, Ort und Klangcharakter.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'handlung', label: 'Was passiert? (auf Englisch)', beispiel: 'Footsteps on gravel approaching slowly, then a metal garage door opens' },
            { key: 'ort', label: 'Ort und Raum', beispiel: 'outdoors at night, quiet surroundings' },
            { key: 'charakter', label: 'Klangcharakter', beispiel: 'high-quality, professionally recorded foley, close perspective' },
            { key: 'dauer', label: 'Gewünschte Länge (höchstens 30 Sekunden)', beispiel: '8 seconds' },
        ],
        vorlage: `PROMPT (ins Textfeld von Sound Effects):
{handlung}, {ort}, {charakter}.

EINSTELLUNGEN:
Duration: {dauer} (oder Auto)
Looping: nur für Atmo, die sich wiederholen soll
Prompt influence: höher für wörtliche Umsetzung, niedriger für mehr Varianten`,
        tools: ['elevenlabs'],
        fuer: ['elevenlabs'],
    },
    {
        slug: 'elevenlabs-dialog-hoerspiel',
        title: 'ElevenLabs: Dialog für Hörspiel oder Erklärvideo',
        kategorie: 'video',
        ziel: 'Einen kurzen Dialog mit zwei Figuren schreiben, bei dem Gefühl und Pausen aus dem Text selbst kommen.',
        techniken: ['format', 'beispiele'],
        felder: [
            { key: 'figur1', label: 'Figur 1', beispiel: 'Mia, Kundin' },
            { key: 'figur2', label: 'Figur 2', beispiel: 'Tom, Mechaniker' },
            { key: 'situation', label: 'Situation', beispiel: 'Mia holt ihr Rad ab, die Reparatur war teurer als gedacht' },
            { key: 'zeile1', label: 'Erste Zeile von Figur 1', beispiel: 'Achtzig Euro? Für einen Schlauch?' },
            { key: 'zeile2', label: 'Antwort von Figur 2', beispiel: 'Na ja... es war nicht nur der Schlauch.' },
        ],
        vorlage: `SITUATION: {situation}
Jede Figur bekommt eine eigene Stimme aus der Voice Library.

{figur1}: [surprised] {zeile1}

{figur2}: [sighs] {zeile2}

{figur1}: [curious] Was denn noch?

{figur2}: [mischievously] Setz dich lieber hin.`,
        tools: ['elevenlabs'],
        fuer: ['elevenlabs'],
    },
    {
        slug: 'elevenlabs-aussprache-fachbegriffe',
        title: 'ElevenLabs: Aussprache von Namen und Fachbegriffen festlegen',
        kategorie: 'technik',
        ziel: 'Markennamen, Abkürzungen und Fachwörter so vorbereiten, dass die Stimme sie richtig ausspricht.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'satz', label: 'Satz mit dem schwierigen Wort', beispiel: 'Unser Partner Claughton liefert die Ersatzteile.' },
            { key: 'wort', label: 'Schwieriges Wort', beispiel: 'Claughton' },
            { key: 'ipa', label: 'Aussprache in IPA (für Eleven v4)', beispiel: 'ˈklɒftən' },
            { key: 'alias', label: 'Ersatzschreibung (für andere Modelle)', beispiel: 'Cloffton' },
        ],
        vorlage: `VARIANTE A, Eleven v4 (IPA zwischen Schrägstrichen):
{satz}
wird zu: Wort {wort} ersetzen durch "/{ipa}/"

VARIANTE B, Aussprache-Wörterbuch (Studio, Dubbing):
<lexeme>
  <grapheme>{wort}</grapheme>
  <alias>{alias}</alias>
</lexeme>

TEST: Satz mit der gewählten Stimme zweimal erzeugen und anhören, bevor du ihn im ganzen Projekt nutzt.`,
        tools: ['elevenlabs'],
        fuer: ['elevenlabs'],
    },

    // ---------------------------------------------------------------- Leonardo AI
    {
        slug: 'leonardo-motiv-kontext-stil',
        title: 'Leonardo AI: Bildprompt nach Motiv, Kontext und Stil',
        kategorie: 'content',
        ziel: 'Einen Bildprompt in der Reihenfolge schreiben, die Leonardo empfiehlt: Hauptmotiv zuerst, dann Details, dann Stil.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'motiv', label: 'Hauptmotiv (auf Englisch)', beispiel: 'a white cat' },
            { key: 'handlung', label: 'Handlung und Ort', beispiel: 'sleeping inside a cardboard box on a sunny windowsill' },
            { key: 'stil', label: 'Stil (allgemein beschrieben)', beispiel: 'soft natural light, warm colors, photorealistic' },
            { key: 'negativ', label: 'Negativer Prompt (nur Stichwörter, kein „no“)', beispiel: 'blurry, watermark, extra limbs' },
        ],
        vorlage: `PROMPT:
{motiv} {handlung}, {stil}

NEGATIVE PROMPT (falls dein Modell das Feld anbietet):
{negativ}`,
        tools: ['leonardo-ai'],
        fuer: ['leonardo-ai'],
    },
    {
        slug: 'leonardo-charakter-konsistent',
        title: 'Leonardo AI: Gleiche Figur in neuen Szenen',
        kategorie: 'content',
        ziel: 'Eine Figur aus einem Referenzbild in eine neue Szene setzen, ohne dass sie jedes Mal anders aussieht.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'aussehen', label: 'Aussehen der Figur (so genau wie möglich, auf Englisch)', beispiel: 'young woman with short red hair, round glasses, green rain jacket' },
            { key: 'szene', label: 'Neue Szene', beispiel: 'standing at a busy farmers market, holding a basket of apples' },
            { key: 'stil', label: 'Stil', beispiel: 'bright editorial photo, natural daylight' },
        ],
        vorlage: `VORBEREITUNG: Referenzbild der Figur hochladen (als Bildreferenz bzw. Character Reference).

PROMPT:
The character from the reference image, {aussehen}, {szene}, {stil}. Keep face, hair and clothing identical to the reference.`,
        tools: ['leonardo-ai'],
        fuer: ['leonardo-ai'],
    },
    {
        slug: 'leonardo-produkt-in-szene',
        title: 'Leonardo AI: Produkt und Figur aus mehreren Referenzen kombinieren',
        kategorie: 'shop',
        ziel: 'Mehrere Referenzbilder in einem Bild zusammenbringen, etwa Figur, Produkt und Farbschema.',
        techniken: ['kontext', 'schritte'],
        felder: [
            { key: 'bild1', label: 'Referenz 1 (was ist darauf?)', beispiel: 'unsere Maskottchen-Figur' },
            { key: 'bild2', label: 'Referenz 2', beispiel: 'unsere Trinkflasche' },
            { key: 'bild3', label: 'Referenz 3 (Farbschema)', beispiel: 'Moodbild in Petrol und Orange' },
            { key: 'szene', label: 'Szene (auf Englisch)', beispiel: 'on a mountain trail at sunrise' },
        ],
        vorlage: `VORBEREITUNG: Die drei Bilder als Referenzen hochladen ({bild1}, {bild2}, {bild3}).

PROMPT:
Have the character from the first image hold the product from the second image, {szene}, in the color scheme of the third image. Product shape and label stay unchanged.`,
        tools: ['leonardo-ai'],
        fuer: ['leonardo-ai'],
    },
    {
        slug: 'leonardo-negativ-prompt-artefakte',
        title: 'Leonardo AI: Bildfehler mit negativem Prompt reduzieren',
        kategorie: 'content',
        ziel: 'Kleine Fehler wie Falten, Unschärfe oder Wasserzeichen gezielt seltener machen, mit präzisen Stichwörtern statt „schlechte Qualität“.',
        techniken: ['kritik', 'format'],
        felder: [
            { key: 'prompt', label: 'Dein bisheriger Prompt', beispiel: 'A professional product shot of a minimalist black baseball cap, studio lighting on a plain gray background' },
            { key: 'fehler', label: 'Welcher Fehler stört?', beispiel: 'Falten im Stoff' },
            { key: 'begriffe', label: 'Präzise Begriffe für den Fehler, mit Synonymen', beispiel: 'wrinkles, creases, folds, fabric imperfections, uneven texture' },
        ],
        vorlage: `SCHRITT 1: Seed fixieren, damit nur der negative Prompt das Bild ändert.

PROMPT (unverändert):
{prompt}

NEGATIVE PROMPT (unter Advanced Settings einschalten):
{begriffe}

SCHRITT 2: Wenn {fehler} bleibt, erst den positiven Prompt umformulieren (beschreiben, was zu sehen sein soll), dann Modell oder Seitenverhältnis wechseln.`,
        tools: ['leonardo-ai'],
        fuer: ['leonardo-ai'],
    },
    {
        slug: 'leonardo-stil-referenz-serie',
        title: 'Leonardo AI: Bildserie mit Style Reference',
        kategorie: 'content',
        ziel: 'Mehrere Motive im Look eines eigenen Referenzbilds erzeugen und die Stärke bewusst einstellen.',
        techniken: ['format', 'varianten'],
        felder: [
            { key: 'motive', label: 'Drei Motive (auf Englisch, eins pro Zeile)', beispiel: 'a lighthouse on a cliff\na fishing boat in the harbor\na seagull on a wooden post', mehrzeilig: true },
            { key: 'staerke', label: 'Stärke der Style Reference', beispiel: 'Mid' },
        ],
        vorlage: `VORBEREITUNG: Eigenes Stilbild als Style Reference hochladen, Stärke: {staerke}.

PROMPTS (einzeln abschicken, nur Inhalt, keine Stilwörter, die dem Referenzbild widersprechen):
{motive}

PRÜFEN: Übernimmt das Bild ungewollte Details aus der Referenz, etwa Gesichtszüge, dann Stärke senken.`,
        tools: ['leonardo-ai'],
        fuer: ['leonardo-ai'],
    },

    // ---------------------------------------------------------------- Ideogram
    {
        slug: 'ideogram-poster-mit-text',
        title: 'Ideogram: Poster mit sauberem Text',
        kategorie: 'launch',
        ziel: 'Ein Plakat, auf dem Überschrift und Unterzeile richtig geschrieben und an der richtigen Stelle stehen.',
        techniken: ['format', 'kontext'],
        felder: [
            { key: 'art', label: 'Art des Bildes (auf Englisch)', beispiel: 'A risograph poster pasted on a sunlit brick wall' },
            { key: 'titel', label: 'Überschrift (kurz)', beispiel: 'REPAIR CAFE' },
            { key: 'unterzeile', label: 'Unterzeile (kurz)', beispiel: 'Every first Saturday' },
            { key: 'schrift', label: 'Schrift beschreiben (kein Fontname)', beispiel: 'bold condensed sans-serif capitals in orange' },
            { key: 'bild', label: 'Bildelement', beispiel: 'a large wrench and a bicycle wheel in the center' },
        ],
        vorlage: `{art}. At the top, the headline "{titel}" in {schrift}. {bild}. At the bottom, "{unterzeile}" in small white sans-serif letters.`,
        tools: ['ideogram', 'canva'],
        fuer: ['ideogram'],
    },
    {
        slug: 'ideogram-logo-entwurf',
        title: 'Ideogram: Logo-Entwürfe mit Schriftzug',
        kategorie: 'launch',
        ziel: 'Erste Logo-Ideen mit Namen als Schriftzug, als Startpunkt für die Gestaltung.',
        techniken: ['varianten', 'kontext'],
        felder: [
            { key: 'name', label: 'Name im Logo', beispiel: 'Kettenblatt' },
            { key: 'branche', label: 'Wofür steht die Marke?', beispiel: 'a small bicycle repair shop' },
            { key: 'symbol', label: 'Symbol', beispiel: 'a simple chainring shape' },
            { key: 'schrift', label: 'Schriftcharakter', beispiel: 'thick rounded geometric sans-serif' },
            { key: 'farben', label: 'Farben', beispiel: 'dark navy on a cream background' },
        ],
        vorlage: `A flat vector logo for {branche} with the word "{name}" written in {schrift}, next to {symbol}, {farben}, clean lines, centered, plain background.`,
        tools: ['ideogram'],
        fuer: ['ideogram'],
    },
    {
        slug: 'ideogram-social-grafik-textbloecke',
        title: 'Ideogram: Social-Media-Grafik mit mehreren Textblöcken',
        kategorie: 'content',
        ziel: 'Eine Grafik mit Titel, Info und Hinweis, beschrieben in Lesereihenfolge von oben nach unten.',
        techniken: ['format', 'schritte'],
        felder: [
            { key: 'stil', label: 'Art und Stil der Grafik', beispiel: 'A clean modern social media graphic with a soft gradient background' },
            { key: 'oben', label: 'Text oben (Titel)', beispiel: 'SPRING SALE' },
            { key: 'mitte', label: 'Text Mitte', beispiel: '20 percent off all helmets' },
            { key: 'unten', label: 'Text unten', beispiel: 'Only this weekend' },
            { key: 'motiv', label: 'Bildmotiv', beispiel: 'a bicycle helmet floating in the center' },
        ],
        vorlage: `{stil}. At the top, the headline "{oben}" in large bold letters. In the middle, {motiv}, with the line "{mitte}" below it in medium letters. At the bottom, "{unten}" in small letters.`,
        tools: ['ideogram', 'canva'],
        fuer: ['ideogram'],
    },
    {
        slug: 'ideogram-tshirt-motiv',
        title: 'Ideogram: T-Shirt-Motiv mit Spruch',
        kategorie: 'shop',
        ziel: 'Ein freistehendes Motiv mit kurzem Spruch, das sich auf Textilien drucken lässt.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'spruch', label: 'Spruch (kurz, auf Englisch am zuverlässigsten)', beispiel: 'Ride Free' },
            { key: 'motiv', label: 'Motiv', beispiel: 'a vintage moped seen from the side' },
            { key: 'stil', label: 'Stil', beispiel: 'retro badge illustration, limited palette of three colors' },
            { key: 'schrift', label: 'Schrift', beispiel: 'curved retro script lettering' },
        ],
        vorlage: `A t-shirt design: {motiv} in {stil}, with the words "{spruch}" in {schrift} curving along the bottom, isolated on a plain white background, no shirt or mockup.`,
        tools: ['ideogram'],
        fuer: ['ideogram'],
    },
    {
        slug: 'ideogram-einladungskarte',
        title: 'Ideogram: Einladungskarte mit Anlass und Datum',
        kategorie: 'content',
        ziel: 'Eine Einladung zu Feier oder Event mit kurzem Titel, Datum und passender Gestaltung.',
        techniken: ['kontext', 'format'],
        felder: [
            { key: 'anlass', label: 'Anlass (Titel auf der Karte)', beispiel: 'Summer Party' },
            { key: 'datum', label: 'Datum (kurz)', beispiel: 'July 12' },
            { key: 'stil', label: 'Stil', beispiel: 'hand-painted watercolor, lemons and leaves around the edge' },
            { key: 'schrift', label: 'Schrift', beispiel: 'elegant formal script typeface in dark green' },
        ],
        vorlage: `An invitation card with the title "{anlass}" in {schrift} in the center, and "{datum}" below it in small serif letters, {stil}, generous empty space around the text.`,
        tools: ['ideogram', 'canva'],
        fuer: ['ideogram'],
    },
]

export const TEXTE = {
    // Suno
    'suno-song-mit-eigenem-text': {
        intro: 'Suno trennt zwei Dinge: das Feld Styles für den Klang und das Feld Lyrics für deinen Text. Die Vorlage füllt beide, mit den Abschnittsmarken [Verse], [Chorus] und [Bridge], die Suno selbst für die Songstruktur empfiehlt.',
        tipp: 'Jede Abschnittsmarke steht allein in einer Zeile. Und den Refrain wirklich jedes Mal ausschreiben, dann erkennt Suno ihn als Refrain.',
        fehler: 'Genre und Instrumente ins Lyrics-Feld schreiben. Dann singt Suno im schlimmsten Fall „Indie Rock, 120 BPM“ mit.',
        jean: 'Eckige Klammern sind für Suno, was Kreidestriche auf dem Werkstattboden sind: Jeder weiß sofort, wo was hingehört.',
    },
    'suno-stilangabe-bauen': {
        intro: '„Pop“ ins Styles-Feld und fertig? Klappt, klingt aber nach Hintergrundmusik im Baumarkt. Seit Version 4.5 versteht Suno laut eigener Hilfe auch ausführliche, fast gesprächige Stilangaben. Die Vorlage baut eine aus fünf Bausteinen.',
        tipp: 'Das Wichtigste nach vorn: Genre und Tempo zuerst, Feinheiten danach. Zeigt das Feld eine Zeichengrenze an, gilt die.',
        fehler: 'Echte Bands oder Sänger als Stil nennen. Beschreib lieber, was du an ihnen magst: Stimme, Instrumente, Tempo, Epoche.',
        jean: 'Eine gute Stilangabe ist wie eine Bestellung an der Fleischtheke: „Was Leckeres“ bringt dich nicht weit.',
    },
    'suno-instrumental-hintergrundmusik': {
        intro: 'Für Musik unter Sprache brauchst du drei Dinge in Suno: den Schalter Instrumental, eine ruhige Stilangabe und das Feld Exclude unter Advanced Options für alles, was stören würde.',
        tipp: 'Gleichmäßige Lautstärke und „keine plötzlichen lauten Stellen“ in die Stilangabe schreiben. Sonst knallt mitten im Erklärvideo ein Becken rein.',
        fehler: 'Hintergrundmusik aus dem Gratis-Tarif in einem monetarisierten Video nutzen. Laut Suno-Hilfe sind Songs aus dem Free Plan nur für nicht kommerzielle Zwecke freigegeben.',
        jean: 'Gute Hintergrundmusik ist wie ein guter Schiedsrichter: Wenn sie dir auffällt, stimmt was nicht.',
    },
    'suno-geburtstagslied': {
        intro: 'Ein Geburtstagslied wird persönlich durch Details, die nur auf diesen einen Menschen passen. Die Vorlage holt drei davon ab und baut sie in Strophe und Refrain ein, mit Namen im Outro.',
        tipp: 'Schreib die Zeilen selbst und gib Suno nur die Struktur und den Stil. Den Text, den du selbst schreibst, besitzt du laut Suno-Hilfe in jedem Tarif.',
        fehler: 'Fünf Strophen für ein Ständchen. Zwei Strophen und ein Refrain reichen, sonst schaut die Runde nach der zweiten Minute auf die Torte statt aufs Handy.',
        jean: 'Ein Lied mit dem Detail „singt im Auto falsch mit“ schlägt jede Karte aus dem Supermarkt.',
    },
    'suno-jingle-podcast-intro': {
        intro: 'Ein Jingle muss in wenigen Sekunden sitzen: Name, Slogan, Name. Die Vorlage hält den Text bewusst knapp und schiebt alles andere in die Stilangabe.',
        tipp: 'Lass mehrere Versionen erzeugen und schneid den besten Moment raus. Die Stelle mit dem stärksten Hook ist oft nicht der Anfang.',
        fehler: 'Den Jingle im Gratis-Tarif bauen und später in einem Podcast mit Werbung nutzen. Kommerzielle Nutzung gibt es laut Suno nur für Songs, die während eines Pro- oder Premier-Abos entstanden sind, und ein späteres Abo gilt nicht rückwirkend.',
        jean: 'Ein Jingle ist der Handschlag deines Podcasts. Kurz, fest, wiedererkennbar.',
    },
    'suno-lernlied-merkhilfe': {
        intro: 'Was gesungen wird, bleibt besser hängen als jede Liste. Die Vorlage packt den Lernstoff in den Refrain und wiederholt ihn, die Strophe erklärt nur ein Detail.',
        tipp: '„Very clear pronunciation“ und eine einfache Melodie in die Stilangabe. Sonst nuschelt die Stimme genau das Wort weg, um das es geht.',
        fehler: 'Den Lernstoff in die Strophe packen. Strophen wechseln, Refrains kommen wieder, also gehört das Merkwissen in den Refrain.',
        jean: 'Ich kann die Reihenfolge der Planeten bis heute nur, weil irgendwer mal ein Lied draus gemacht hat.',
    },
    'suno-cover-neuer-stil': {
        intro: 'Mit Cover bringt Suno einen bestehenden Song in einen neuen Stil und behält den Kern. Die Vorlage liefert die neue Stilangabe und sagt per Exclude, was aus dem alten Arrangement verschwinden soll.',
        tipp: 'Nimm für Cover nur eigene Songs oder Songs, an denen du die Rechte hast. Fremde Lieder hochladen ist keine Abkürzung, sondern ein Rechteproblem.',
        fehler: 'Den alten Stil zusätzlich in die neue Stilangabe schreiben. Dann bekommst du ein Folk-Synthpop-Mischwesen, das keiner bestellt hat.',
        jean: 'Ein Cover ist wie ein Moped umlackieren: gleicher Rahmen, ganz anderer Auftritt.',
    },
    'suno-vereinslied-mitsingrefrain': {
        intro: 'Ein Vereinslied lebt vom Ruf, den alle mitbrüllen. Die Vorlage setzt den Ruf in Klammern an mehrere Stellen, die Stilangabe sorgt für Stadion-Gefühl mit Gang-Vocals.',
        tipp: 'Halte den Ruf bei zwei bis vier Wörtern. Was länger ist, singt Suno als normale Textzeile.',
        fehler: 'Das Lied auf der Vereinsseite mit Werbebannern einbinden, obwohl es im Gratis-Tarif entstanden ist. Das gilt bei Suno als kommerzielle Nutzung und ist im Free Plan nicht erlaubt.',
        jean: 'Ein guter Vereinsrefrain funktioniert auch nach dem dritten Bier noch. Das ist der eigentliche Test.',
    },
    'suno-ergebnis-gezielt-nachschaerfen': {
        intro: 'Fast gut ist bei Suno der häufigste Zustand. Statt zehnmal neu zu würfeln, änderst du gezielt eine Sache: Stilangabe präzisieren, Störendes in Exclude, Style Influence höher.',
        tipp: 'Laut Suno ist Weirdness bei 50 % das „normale“ erwartbare Ergebnis, Style Influence regelt, wie eng Suno an deiner Stilangabe bleibt. Nur einen Regler pro Durchgang bewegen.',
        fehler: '„No reverb“ in die Stilangabe schreiben. Verneinungen dort sind unzuverlässig, dafür gibt es das Feld Exclude.',
        jean: 'Fehlersuche wie beim Vergaser: eine Schraube drehen, probefahren, dann die nächste.',
    },
    'suno-duett-zwei-stimmen': {
        intro: 'Ein Duett braucht Abwechslung und einen gemeinsamen Refrain. Die Vorlage markiert, wer welche Strophe singt. Suno zeigt in den eigenen Release Notes Stimmangaben wie [female vocals] im Lyrics-Feld.',
        tipp: 'Wenn eine Stimme trotzdem überall singt: die jeweils andere Stimme für einen Testlauf per Exclude ausschließen, um zu prüfen, ob die Angabe greift.',
        fehler: 'Zu viele Stimmwechsel pro Strophe. Ein Wechsel pro Abschnitt klappt deutlich zuverlässiger als Zeile für Zeile.',
        jean: 'Ein Duett ohne klare Rollen klingt wie zwei Leute, die gleichzeitig einparken wollen.',
    },

    // Midjourney
    'midjourney-portrait-lichtsetzung': {
        intro: 'Licht macht beim Porträt den Unterschied zwischen Passbild und Charakterkopf. Die Vorlage legt Richtung, Farbe und Härte fest und hängt --raw an, damit Midjourney weniger eigenen Stil drüberlegt.',
        tipp: 'Beschreib Licht wie ein Fotograf: von wo es kommt, wie warm es ist und wo die Schatten fallen. „Schönes Licht“ ist keine Angabe.',
        fehler: 'Echte, bekannte Personen porträtieren. Bleib bei erfundenen Figuren, das spart Ärger mit Persönlichkeitsrechten.',
        jean: 'Fensterlicht von links hat schon mehr Porträts gerettet als jedes teure Objektiv.',
    },
    'midjourney-produktfoto': {
        intro: 'Ein Produktbild braucht ruhigen Hintergrund, weiches Licht und ein Format, das in den Shop passt. Die Vorlage nutzt --ar für das Seitenverhältnis, --raw für einen nüchternen Look und --no für alles, was nicht ins Bild gehört.',
        tipp: 'Nutz das Ergebnis als Moodbild oder Hintergrund. Für die Produktseite brauchst du trotzdem ein echtes Foto deines echten Produkts, sonst stimmen Details nicht.',
        fehler: 'Fremde Markenlogos ins Bild wünschen. Beschreib Form, Material und Farbe statt eines Markennamens.',
        jean: 'Midjourney baut dir die Bühne. Das Produkt sollte trotzdem dein eigenes sein.',
    },
    'midjourney-blog-titelbild': {
        intro: 'Ein Titelbild ist nur gut, wenn die Überschrift noch draufpasst. Die Vorlage setzt das Motiv auf ein Drittel und lässt die andere Seite bewusst leer, im Querformat 16:9.',
        tipp: 'Den Text setzt du danach in einem Grafiktool. Midjourney kann Text, aber für eine Überschrift mit Umlauten bist du in Canva schneller.',
        fehler: 'Das Seitenverhältnis mit Dezimalzahl angeben. Midjourney nimmt nur ganze Zahlen, also 139:100 statt 1.39:1.',
        jean: 'Weißraum ist kein verschwendeter Platz. Das ist der Parkplatz für deine Überschrift.',
    },
    'midjourney-stil-referenz-sref': {
        intro: 'Mit --sref übernimmt Midjourney den Look eines Bildes: Farben, Technik, Licht. Keine Motive, keine Personen. Mit --sw stellst du ein, wie stark, von 0 bis 1000, Standard ist 100.',
        tipp: 'Im Textteil nur den Inhalt beschreiben. Stilwörter, die dem Referenzbild widersprechen, verwässern das Ergebnis.',
        fehler: '„Im Stil dieses Bildes“ in den Prompt schreiben. Midjourney rät selbst davon ab: Beschreib, was zu sehen sein soll, nicht was das Modell tun soll.',
        jean: 'Ein Referenzbild ist wie eine Farbprobe aus dem Baumarkt: zeigen ist schneller als erklären.',
    },
    'midjourney-poster-mit-text': {
        intro: 'Text im Bild klappt bei Midjourney mit doppelten Anführungszeichen. Einfache Anführungszeichen funktionieren laut Doku nicht. Kurze Wörter in lateinischer Schrift kommen am saubersten raus.',
        tipp: 'Wenn der Text wackelt: --raw nutzen oder den Stylize-Wert senken, das empfiehlt Midjourney selbst. Kleine Fehler behebst du danach im Editor.',
        fehler: 'Einen ganzen Absatz aufs Poster schreiben wollen. Ein bis drei Wörter funktionieren, alles Weitere kommt später im Grafiktool dazu.',
        jean: 'Je kürzer der Spruch, desto weniger Buchstaben können verrutschen. Gilt übrigens auch für Tattoos.',
    },
    'midjourney-stylize-testreihe': {
        intro: 'Stylize (--s) regelt, wie frei Midjourney deinen Prompt interpretiert: Standard 100, möglich 0 bis 1000. Mit festem --seed siehst du, was nur dieser Wert verändert.',
        tipp: 'Notier dir den Wert, der zu deinem Projekt passt, und stell ihn in den Einstellungen als Standard ein. Dann musst du ihn nicht jedes Mal anhängen.',
        fehler: 'Mehrere Parameter gleichzeitig ändern und dann raten, welcher es war.',
        jean: 'Eine Testreihe kostet vier Bilder und spart dir vierzig Zufallsversuche.',
    },
    'midjourney-variety-ideenfindung': {
        intro: 'Chaos (--c), auf der Website Variety genannt, macht die vier Bilder eines Rasters unterschiedlicher. Standard ist 0, möglich sind Werte bis 100.',
        tipp: 'Hoch für die Ideensuche, niedrig sobald du weißt, was du willst. Für die Feinarbeit zurück auf 0.',
        fehler: 'Mit hohem Chaos-Wert ein exaktes Ergebnis erwarten. Höhere Werte halten sich laut Midjourney weniger eng an deinen Prompt.',
        jean: 'Chaos ist das Brainstorming unter den Parametern: viel Mist, aber manchmal genau die Idee, auf die du nie gekommen wärst.',
    },
    'midjourney-no-parameter': {
        intro: '„Ohne Obst“ im Prompt führt oft zu Obst, weil das Wort drinsteht. Midjourney empfiehlt dafür --no, gefolgt von den Dingen, die fehlen sollen, durch Kommas getrennt.',
        tipp: 'Jedes Wort hinter --no wird einzeln gelesen. „--no modern clothing“ heißt für die Moderation „kein modern“ und „keine Kleidung“. Beschreib lieber, welche Kleidung du willst.',
        fehler: 'Bitten und Verneinungen in den Text schreiben, etwa „please don’t add fruit“. Das ist laut Doku ein Beispiel für einen schlechten Prompt.',
        jean: 'Sag der KI, was sie weglassen soll, nicht was sie bloß nicht malen darf. Sonst denkt sie nur noch an den rosa Elefanten.',
    },
    'midjourney-illustrationsserie': {
        intro: 'Eine Serie wirkt einheitlich, wenn Stiltext und Format exakt gleich bleiben und nur die Szene wechselt. Die Vorlage erzeugt drei Zeilen nach diesem Muster.',
        tipp: 'Wenn der Look trotzdem schwankt: nimm das beste Bild der Serie als --sref für die übrigen.',
        fehler: 'Den Stil über den Namen eines echten Illustrators beschreiben. Das ist rechtlich heikel und unnötig: Material, Farbpalette und Strich beschreiben reicht.',
        jean: 'Ein Kinderbuch mit drei verschiedenen Igeln ist kein Kinderbuch, sondern ein Suchbild.',
    },
    'midjourney-lichtstimmung-hochformat': {
        intro: 'Für Story und Reel brauchst du 9:16, und das Licht trägt die Stimmung. Die Vorlage kombiniert Ort, Tageszeit, Lichtquellen und Stil zu einem Hochformat-Prompt.',
        tipp: 'Nenn konkrete Lichtquellen wie Schaufenster, Straßenlaterne, Abendhimmel. Die geben Midjourney mehr als „stimmungsvoll“.',
        fehler: 'Ein Querformat erzeugen und dann auf 9:16 zuschneiden. Dabei fliegt meist genau das Motiv raus.',
        jean: 'Blaue Stunde nach dem Regen ist der Cheat-Code für Stimmung. Kostet nichts, wirkt immer.',
    },

    // ElevenLabs
    'elevenlabs-voice-design-stimme': {
        intro: 'ElevenLabs empfiehlt für Voice Design ein festes Muster: Sprache, Geschlecht und Alter, Qualität, Persona, Emotion und ein bis zwei Sätze zu Klang und Tempo. Die Vorlage folgt genau diesem Aufbau.',
        tipp: 'Sprache und regionale Variante immer in den ersten Satz. Sonst driftet die Stimme laut ElevenLabs in einen anderen Dialekt.',
        fehler: 'Effektwörter wie Hall, Echo oder Telefon in die Beschreibung packen. Die verschlechtern laut Doku die Qualität der erzeugten Stimme.',
        jean: 'Eine Stimme beschreiben ist wie einen Handwerker am Telefon beschreiben: Alter, Ton, Tempo. Dann weißt du, wer vor der Tür steht.',
    },
    'elevenlabs-audio-tags-sprechtext': {
        intro: 'Eleven v3 und v4 verstehen Audio-Tags in eckigen Klammern, etwa [whispers], [laughs], [sighs] oder [excited]. Die Vorlage setzt sie an die Stellen, an denen sich der Ton ändern soll.',
        tipp: 'Pausen machst du bei v3 und v4 mit Auslassungspunkten und Satzbau, nicht mit Break-Tags. Großbuchstaben erhöhen laut Doku die Betonung.',
        fehler: 'Hinter jeden Satz einen Tag setzen. Tags wirken am besten, wenn die gewählte Stimme den Ausdruck ohnehin kann, also sparsam und gezielt.',
        jean: 'Ein [sighs] an der richtigen Stelle sagt mehr als drei Sätze Erklärung.',
    },
    'elevenlabs-soundeffekt': {
        intro: 'Sound Effects bei ElevenLabs versteht Alltagssprache und Tonbegriffe. Beschreib Handlung, Ort und Klang, die Länge stellst du separat ein, höchstens 30 Sekunden pro Durchgang.',
        tipp: 'Für Abläufe mit mehreren Geräuschen empfiehlt ElevenLabs, die Einzelgeräusche getrennt zu erzeugen und im Schnittprogramm zusammenzusetzen.',
        fehler: 'Exakte Wiederholungen verlangen, etwa „viermal klopfen“. Laut Doku wird das nicht immer eingehalten.',
        jean: 'Kies unter Schuhen klingt nach Spannung, Laminat nach Wohnungsbesichtigung. Der Untergrund ist die halbe Miete.',
    },
    'elevenlabs-dialog-hoerspiel': {
        intro: 'Für Dialoge empfiehlt ElevenLabs, jeder Figur eine eigene Stimme aus der Voice Library zu geben. Gefühl kommt über Audio-Tags und den Text selbst, Pausen über Auslassungspunkte.',
        tipp: 'Schreib, wie Menschen reden: kurze Sätze, Unterbrechungen, „na ja“. Glatte Schriftsprache klingt vorgelesen.',
        fehler: 'Regieanweisungen als normalen Text ins Skript schreiben, etwa „sagt sie traurig“. Das wird mitgesprochen, laut Doku musst du es sonst hinterher rausschneiden.',
        jean: 'Ein guter Dialog hat mehr Pausen als Wörter. Zumindest gefühlt.',
    },
    'elevenlabs-aussprache-fachbegriffe': {
        intro: 'Eleven v4 versteht IPA-Lautschrift zwischen Schrägstrichen direkt im Text. Für Projekte in Studio oder Dubbing gibt es Aussprache-Wörterbücher mit Alias-Einträgen. Die Vorlage zeigt beide Wege.',
        tipp: 'Nur die schwierigen Wörter auszeichnen, nicht den ganzen Satz, und Betonungszeichen setzen. Dann vor dem Einsatz mit der gewählten Stimme testen.',
        fehler: 'Im Wörterbuch auf Groß- und Kleinschreibung pfeifen. Die Suche unterscheidet laut ElevenLabs zwischen beiden.',
        jean: 'Nichts verrät eine KI-Stimme schneller als ein falsch ausgesprochener Kundenname.',
    },

    // Leonardo AI
    'leonardo-motiv-kontext-stil': {
        intro: 'Leonardo empfiehlt: Hauptmotiv zuerst, dann Details wie Ort und Handlung, dann den Stil. Wörter am Anfang zählen mehr als am Ende. Die Vorlage hält genau diese Reihenfolge ein.',
        tipp: 'Klein anfangen und ausbauen. Laut Leonardo sinkt die Treffsicherheit, je länger der Prompt wird.',
        fehler: 'Stile über bekannte Künstler oder Studios beschreiben. Beschreib Technik, Farben und Licht, dann bist du auf der sicheren Seite.',
        jean: 'Erst das Was, dann das Wo, dann das Wie. Wie beim Packen: Erst der Schlafsack, dann die Socken.',
    },
    'leonardo-charakter-konsistent': {
        intro: 'Damit eine Figur in jeder Szene gleich aussieht, gibst du Leonardo ein Referenzbild und beschreibst die Figur zusätzlich im Prompt. Leonardo schreibt selbst, dass die Beschreibung des Aussehens die Ergebnisse verbessert.',
        tipp: 'Mit generierten Figuren klappt das laut Leonardo besser als mit Fotos von außerhalb. Bei eigenen Fotos sehr genau beschreiben.',
        fehler: 'Fotos echter Personen ohne deren Einverständnis hochladen. Character Reference ist laut Leonardo ohnehin kein Gesichtstausch.',
        jean: 'Konsistente Figuren sind der Unterschied zwischen Bildergeschichte und Wimmelbild.',
    },
    'leonardo-produkt-in-szene': {
        intro: 'Die neueren Modelle bei Leonardo verstehen mehrere Referenzbilder und deine Anweisung, wie sie zusammenkommen. Leonardo nennt selbst das Muster „diese Figur hält dieses Produkt, im Farbschema dieses Bildes“.',
        tipp: 'Die Reihenfolge der Bilder im Prompt benennen: erstes, zweites, drittes Bild. Dann weiß das Modell, was wohin gehört.',
        fehler: 'Fremde Produkte oder Logos als Referenz verwenden. Nimm nur Bilder, an denen du die Rechte hast.',
        jean: 'Drei Referenzbilder, ein Satz Anweisung: Das ist Fotoshooting ohne Fotograf, aber mit Verantwortung für die Rechte.',
    },
    'leonardo-negativ-prompt-artefakte': {
        intro: 'Negative Prompts sind laut Leonardo weiche Grenzen, keine Befehle. Sie helfen bei kleinen Fehlern, wenn du präzise Begriffe nutzt und den Seed festhältst, damit du die Wirkung siehst.',
        tipp: 'Synonyme verstärken die Wirkung: „wrinkles, creases, folds“ statt nur „wrinkles“. Und kein „no“ davor schreiben.',
        fehler: 'Begriffe in den negativen Prompt schreiben, die dem positiven widersprechen. Wer eine dunkle Szene will, schreibt nicht „dark shadows“ ins Negativ-Feld.',
        jean: 'Erst beschreiben, was du willst. Der negative Prompt ist die Feinsäge, nicht die Axt.',
    },
    'leonardo-stil-referenz-serie': {
        intro: 'Style Reference übernimmt die Ästhetik eines Referenzbildes. Die Stärke stellst du in Stufen ein. Leonardo warnt, dass dabei auch ungewollte Merkmale wie Gesichtszüge mitkommen können.',
        tipp: 'Für stark stilisierte Bilder empfiehlt Leonardo höhere Stärken. Für Fotos lieber niedrig anfangen und hochdrehen.',
        fehler: 'Im Prompt einen anderen Stil verlangen als das Referenzbild zeigt. Dann ziehen zwei Pferde in verschiedene Richtungen.',
        jean: 'Eine Serie lebt von der Wiederholung. Gleiche Referenz, gleiche Stärke, nur das Motiv wechselt.',
    },

    // Ideogram
    'ideogram-poster-mit-text': {
        intro: 'Ideogram ist auf Text im Bild spezialisiert. Die Doku sagt: Wörter in Anführungszeichen, früh im Prompt nennen, Position beschreiben, kurz halten. Die Vorlage beschreibt mehrere Textblöcke von oben nach unten.',
        tipp: 'Schrift beschreiben statt Fontnamen nennen: fett, schmal, rund, Schreibschrift. Ideogram nutzt keine echten Schriftdateien.',
        fehler: 'Umlaute und lange deutsche Wörter erwarten, die sofort sitzen. Laut Ideogram ist Text auf Englisch am genauesten, Akzente und Sonderzeichen können danebengehen.',
        jean: 'Plakate leben von wenigen Wörtern. Wer mehr sagen will, druckt einen Flyer.',
    },
    'ideogram-logo-entwurf': {
        intro: 'Für Logos ist bei Ideogram 3.0 der Stil Design gedacht: klare, vektorähnliche Bilder. Die Vorlage liefert Name, Symbol, Schriftcharakter und Farben in einem Satz.',
        tipp: 'Nimm die Entwürfe als Ideensammlung und lass das finale Logo als Vektordatei sauber nachbauen. Ein generiertes Pixelbild ist noch kein Markenzeichen.',
        fehler: 'Den Namen nicht vorher auf bestehende Marken prüfen. Ein schönes Logo nützt nichts, wenn der Name schon eingetragen ist.',
        jean: 'Ein gutes Logo funktioniert auch als Stempel auf der Rechnung. Wenn es nur in Farbe wirkt, ist es zu kompliziert.',
    },
    'ideogram-social-grafik-textbloecke': {
        intro: 'Mehrere Textblöcke beschreibst du laut Ideogram in Lesereihenfolge von oben nach unten, jeweils mit Wortlaut, Aussehen und Position. Die Vorlage hat drei Blöcke und ein Motiv.',
        tipp: 'Das Seitenverhältnis stellst du in den Einstellungen ein, nicht im Prompt. Ideogram liest Angaben wie --ar laut Doku nur als normale Wörter.',
        fehler: 'Preise und Prozentzahlen ungeprüft posten. Zahlen im Bild immer gegenlesen, ein verdrehtes Zeichen macht aus 20 schnell 70.',
        jean: 'Drei Textblöcke, drei Größen: groß für den Blick, mittel für die Info, klein für das Kleingedruckte.',
    },
    'ideogram-tshirt-motiv': {
        intro: 'Ein Druckmotiv braucht einen freien Hintergrund und einen kurzen Spruch. Die Vorlage beschreibt Motiv, Stil und Schrift und sagt ausdrücklich, dass kein Shirt drumherum erscheinen soll.',
        tipp: 'Kurze englische Sprüche gelingen laut Ideogram am zuverlässigsten. Bei deutschen Sprüchen mit Umlauten mehrere Durchgänge einplanen oder den Text später setzen.',
        fehler: 'Im Gratis-Tarif ein Motiv für den eigenen Shop entwerfen und denken, es sieht keiner. Laut Ideogram ist im Free Plan alles, was du erzeugst, öffentlich.',
        jean: 'Ein Shirt-Spruch muss auf drei Meter Entfernung lesbar sein. Alles andere ist Kleingedrucktes auf Baumwolle.',
    },
    'ideogram-einladungskarte': {
        intro: 'Einladungen brauchen einen Titel, ein Datum und eine Gestaltung, die zum Anlass passt. Die Vorlage nennt beides in Anführungszeichen und lässt viel Platz um den Text.',
        tipp: 'Uhrzeit, Adresse und Anmeldung setzt du besser hinterher als Textebene. Ideogram schafft Titel und kurze Blöcke, lange Texte gehören laut Doku ins Grafiktool.',
        fehler: 'Die generierte Karte ohne Gegenlesen verschicken. Ein falscher Buchstabe im Datum, und die Hälfte steht am falschen Tag vor der Tür.',
        jean: 'Die Karte darf hübsch sein. Das Datum muss stimmen.',
    },
}

export const SEITEN = {
    suno: {
        titel: 'Suno-Prompts auf Deutsch: Songtexte und Stilangaben',
        intro: 'Bei Suno ist ein Prompt kein Chat, sondern zwei Felder: Styles für den Klang, Lyrics für deinen Text mit Abschnittsmarken wie [Verse] und [Chorus]. Die Vorlagen füllen beide, Schreibweisen geprüft in der offiziellen Suno-Hilfe.',
        vergleiche: [],
        kitest: 'kreativ',
        tipps: [
            ['Klang und Text trennen', 'Genre, Tempo, Stimme und Instrumente gehören ins Feld Styles. Ins Feld Lyrics kommen nur dein Text und die Abschnittsmarken in eckigen Klammern, jede in einer eigenen Zeile.'],
            ['Ausschließen statt verneinen', '„No drums“ in der Stilangabe ist unzuverlässig. Unter Advanced Options gibt es das Feld Exclude für alles, was nicht vorkommen soll.'],
            ['Regler bewusst setzen', 'Weirdness bei 50 % ist laut Suno das erwartbare Ergebnis. Style Influence bestimmt, wie eng Suno an deiner Stilangabe bleibt. Pro Versuch nur einen Regler bewegen.'],
            ['Rechte vor dem Hochladen klären', 'Songs aus dem Gratis-Tarif sind laut Suno nur für nicht kommerzielle Zwecke freigegeben, und ein späteres Abo gilt nicht rückwirkend. Wer Musik für einen Kanal mit Werbung, Kunden oder Streaming plant, erzeugt sie gleich im passenden Tarif.'],
        ],
        faq: [
            ['Darf ich Suno-Songs auf YouTube oder Spotify veröffentlichen?', 'Laut Suno-Hilfe nur Songs, die während eines Pro- oder Premier-Abos entstanden sind. Songs aus dem Gratis-Tarif sind für persönliche, nicht kommerzielle Nutzung gedacht und dürfen nicht monetarisiert werden. Die aktuellen Bedingungen stehen unter help.suno.com.'],
            ['Gehört mir der Text, den ich in Suno eingebe?', 'Ja, laut Suno gehören selbst geschriebene Texte dir, egal in welchem Tarif. Das betrifft den Text, nicht automatisch die erzeugte Musik.'],
            ['Kann ich einen Stil wie von einer bekannten Band verlangen?', 'Lass Namen echter Künstler weg und beschreib den Klang: Genre, Epoche, Stimme, Instrumente, Tempo. Das ist rechtlich sauberer und liefert meist ohnehin präzisere Ergebnisse.'],
        ],
        quellen: [
            { titel: 'Suno: How to Make a Song (Strukturmarken wie [Verse], [Chorus], [Bridge])', url: 'https://suno.com/hub/how-to-make-a-song' },
            { titel: 'Suno-Hilfe: Create in V4.5, Detailed Style Instructions', url: 'https://help.suno.com/en/articles/5782849' },
            { titel: 'Suno-Hilfe: How do I exclude elements of a song?', url: 'https://help.suno.com/en/articles/3161921' },
            { titel: 'Suno-Hilfe: How to Use Creative Sliders', url: 'https://help.suno.com/en/articles/6141377' },
            { titel: 'Suno Release Notes: Exclude Styles', url: 'https://suno.com/release-notes/exclude-styles' },
            { titel: 'Suno-Hilfe: What rights do I have with the free plan?', url: 'https://help.suno.com/en/articles/9601601' },
            { titel: 'Suno-Hilfe: Can I distribute my songs to Spotify, etc?', url: 'https://help.suno.com/en/articles/2410177' },
            { titel: 'Suno-Hilfe: What if I have a free plan but wrote my own lyrics?', url: 'https://help.suno.com/en/articles/2478401' },
        ],
    },
    midjourney: {
        titel: 'Midjourney-Prompts: Stil, Licht, Seitenverhältnis und Parameter',
        intro: 'Midjourney-Prompts sind kurze Bildbeschreibungen plus Parameter am Ende: --ar für das Format, --s für Stylize, --c für Abwechslung, --no zum Ausschließen, --sref für einen Stil. Alle Schreibweisen geprüft in der offiziellen Midjourney-Doku, Stand Version 8.2.',
        vergleiche: ['midjourney-vs-leonardo-ai'],
        kitest: 'kreativ',
        tipps: [
            ['Parameter immer ans Ende', 'Erst die Beschreibung, dann ein Leerzeichen, dann die Parameter. Keine Kommas oder Punkte zwischen den Parametern, sonst erkennt Midjourney sie nicht.'],
            ['Kurz und konkret', 'Midjourney empfiehlt kurze, klare Prompts statt langer Anweisungslisten. Zahlen statt Plural: „drei Katzen“ statt „Katzen“.'],
            ['Licht beschreiben wie ein Fotograf', 'Richtung, Farbe und Härte des Lichts sagen mehr als jedes „wunderschön“. Mit --raw legt Midjourney weniger eigenen Stil drüber.'],
            ['Format von Anfang an festlegen', 'Mit --ar und ganzen Zahlen, etwa 16:9 für Titelbilder oder 9:16 für Stories. Nachträglich zuschneiden kostet oft das Motiv.'],
        ],
        faq: [
            ['Kann ich Midjourney-Bilder kommerziell nutzen?', 'Laut Midjourney gehören dir die Bilder, die du erzeugst, auch nach einer Kündigung. Ausnahme: Unternehmen mit mehr als 1 Million US-Dollar Jahresumsatz brauchen den Pro- oder Mega-Tarif. Fragen zum Urheberrecht beantwortet Midjourney nicht, dafür ist eine Rechtsberatung zuständig.'],
            ['Versteht Midjourney deutsche Prompts?', 'Die offiziellen Beispiele in der Doku sind alle auf Englisch, und Text im Bild klappt laut Midjourney am besten mit lateinischen Buchstaben und kurzen Wörtern. Die Vorlagen nutzen deshalb englische Beispielwerte.'],
            ['Welche Version nutzt Midjourney gerade?', 'Laut Doku ist V8.2 seit dem 24. Juli 2026 Standard. Mit --v wählst du eine andere Version, etwa --v 7. Nicht jeder Parameter funktioniert in jeder Version, die Tabelle auf der Versionsseite zeigt die Unterschiede.'],
        ],
        quellen: [
            { titel: 'Midjourney: Parameter List', url: 'https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List' },
            { titel: 'Midjourney: Version', url: 'https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version' },
            { titel: 'Midjourney: Aspect Ratio', url: 'https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio' },
            { titel: 'Midjourney: Stylize', url: 'https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize' },
            { titel: 'Midjourney: Chaos / Variety', url: 'https://docs.midjourney.com/hc/en-us/articles/32099348346765-Chaos-Variety' },
            { titel: 'Midjourney: No', url: 'https://docs.midjourney.com/hc/en-us/articles/32173351982093-No' },
            { titel: 'Midjourney: Raw', url: 'https://docs.midjourney.com/hc/en-us/articles/32634113811853-Raw' },
            { titel: 'Midjourney: Style Reference', url: 'https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference' },
            { titel: 'Midjourney: Text Generation', url: 'https://docs.midjourney.com/hc/en-us/articles/32502277092109-Text-Generation' },
            { titel: 'Midjourney: Prompt Basics', url: 'https://docs.midjourney.com/hc/en-us/articles/32023408776205-Prompt-Basics' },
            { titel: 'Midjourney: Using Images & Videos Commercially', url: 'https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially' },
        ],
    },
    elevenlabs: {
        titel: 'ElevenLabs-Prompts: Stimmen, Audio-Tags und Soundeffekte',
        intro: 'Bei ElevenLabs steuerst du drei Dinge per Text: die Stimme selbst (Voice Design), den Vortrag mit Audio-Tags wie [whispers] und Soundeffekte aus einer Beschreibung. Die Vorlagen folgen der offiziellen ElevenLabs-Doku.',
        vergleiche: ['elevenlabs-vs-murf'],
        kitest: 'kreativ',
        tipps: [
            ['Sprache zuerst', 'Beim Voice Design gehören Sprache und regionale Variante in den ersten Satz. Sonst driftet die Stimme laut ElevenLabs in einen anderen Dialekt.'],
            ['Tags sparsam setzen', 'Audio-Tags wie [laughs] oder [sighs] wirken am besten, wenn die Stimme den Ausdruck schon kann. Pausen machst du bei v3 und v4 mit Auslassungspunkten und Satzbau.'],
            ['Geräusche einzeln bauen', 'Für Abläufe mit mehreren Geräuschen empfiehlt ElevenLabs, jedes Geräusch einzeln zu erzeugen und im Schnitt zusammenzusetzen. Ein Durchgang dauert höchstens 30 Sekunden.'],
            ['Aussprache testen', 'Namen und Fachbegriffe vorab mit IPA (Eleven v4) oder einem Aussprache-Wörterbuch festlegen und mit der gewählten Stimme probehören.'],
        ],
        faq: [
            ['Darf ich Audio aus dem Gratis-Tarif veröffentlichen?', 'Laut ElevenLabs enthält der Gratis-Tarif keine kommerzielle Lizenz. Wer nicht kommerziell veröffentlicht, muss ElevenLabs nennen, etwa mit „elevenlabs.io“ im Titel. Bezahltarife enthalten eine kommerzielle Lizenz, außer für Beta-Funktionen.'],
            ['Welche Audio-Tags gibt es?', 'Die Doku nennt unter anderem [whispers], [laughs], [sighs], [excited], [curious], [sarcastic] und Geräusche wie [applause]. Manche Tags sind experimentell und wirken je nach Stimme unterschiedlich, also vor dem Einsatz testen.'],
            ['Funktionieren Break-Tags noch?', 'Nicht bei Eleven v3 und v4. Dort steuerst du Pausen mit Auslassungspunkten, Audio-Tags und Satzbau. Ältere Modelle unterstützen laut Doku Break-Tags für Pausen bis 3 Sekunden.'],
        ],
        quellen: [
            { titel: 'ElevenLabs: Text to Speech Best Practices (Audio-Tags, Pausen, Aussprache)', url: 'https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices' },
            { titel: 'ElevenLabs: Voice Design', url: 'https://elevenlabs.io/docs/eleven-creative/voices/voice-design' },
            { titel: 'ElevenLabs: Sound Effects', url: 'https://elevenlabs.io/docs/overview/capabilities/sound-effects' },
            { titel: 'ElevenLabs-Hilfe: Can I publish the content I generate on the platform?', url: 'https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform' },
        ],
    },
    'leonardo-ai': {
        titel: 'Leonardo AI Prompts: Motiv, Referenzbilder und negative Prompts',
        intro: 'Leonardo liest Prompts von vorn nach hinten, das Hauptmotiv zählt am meisten. Dazu kommen Referenzbilder für Stil, Figur und Inhalt und ein negativer Prompt für kleine Fehler. Die Vorlagen folgen der offiziellen Leonardo-Hilfe.',
        vergleiche: ['midjourney-vs-leonardo-ai'],
        kitest: 'kreativ',
        tipps: [
            ['Hauptmotiv zuerst', 'Wörter am Anfang des Prompts wiegen laut Leonardo schwerer. Erst das Motiv, dann Ort und Handlung, dann der Stil.'],
            ['Klein anfangen', 'Ein kurzer Satz, dann ausbauen. Je länger der Prompt, desto eher übersieht das Modell etwas.'],
            ['Beschreiben, was zu sehen ist', '„Ein leerer Raum“ funktioniert besser als „ein Raum ohne Möbel“. Den negativen Prompt nur für Feinheiten nutzen, mit präzisen Begriffen.'],
            ['Referenzen statt Erklärungen', 'Neuere Modelle verstehen mehrere Referenzbilder und eine Anweisung, wie sie zusammenkommen. Zeigen ist schneller als beschreiben.'],
        ],
        faq: [
            ['Darf ich Leonardo-Bilder aus dem Gratis-Tarif kommerziell nutzen?', 'Laut Leonardo ja. Im Gratis-Tarif sind die Bilder aber öffentlich, und im Verhältnis zwischen dir und Leonardo gehören sie Leonardo, andere Nutzer können sie also ebenfalls verwenden. Bezahltarife bieten privates Erzeugen und volles Eigentum an privat erzeugten Bildern.'],
            ['Kann ich den Stil eines bekannten Künstlers verlangen?', 'Technisch oft ja, wir lassen es trotzdem: Stile beschreiben wir über Technik, Farben und Licht. Das ist rechtlich sauberer und führt zu eigenständigeren Bildern.'],
            ['Hat jedes Modell einen negativen Prompt?', 'Nein. Ob das Feld angeboten wird, hängt vom Modell ab, meist findest du es unter Advanced Settings.'],
        ],
        quellen: [
            { titel: 'Leonardo-Hilfe: Prompting Tips & Tricks', url: 'https://intercom.help/leonardo-ai/en/articles/8067671-prompting-tips-tricks' },
            { titel: 'Leonardo: How to Write Effective AI Image Prompts (negative Prompts)', url: 'https://leonardo.ai/news/ai-image-prompts' },
            { titel: 'Leonardo-Hilfe: Image Guidance (Style, Character, Content Reference)', url: 'https://intercom.help/leonardo-ai/en/articles/8497988-image-guidance' },
            { titel: 'Leonardo-Hilfe: Frequently Asked Questions (Rechte, Private Mode)', url: 'https://intercom.help/leonardo-ai/en/articles/7051613-frequently-asked-questions' },
            { titel: 'Leonardo: Can You Use AI-Generated Images Commercially?', url: 'https://leonardo.ai/news/can-you-use-ai-generated-images-commercially' },
        ],
    },
    ideogram: {
        titel: 'Ideogram-Prompts: Bilder mit lesbarem Text',
        intro: 'Ideogram ist der Spezialist für Text im Bild: Poster, Logos, Shirts, Einladungen. Wörter in Anführungszeichen, früh im Prompt und mit Position. Format, Stil und Magic Prompt stellst du in den Einstellungen ein. Geprüft in der offiziellen Ideogram-Doku.',
        vergleiche: [],
        kitest: 'kreativ',
        tipps: [
            ['Text in Anführungszeichen', 'Alles in Anführungszeichen setzt Ideogram als Schrift ins Bild. Text früh im Prompt nennen und sagen, wo er stehen soll.'],
            ['In ganzen Sätzen schreiben', 'Ideogram empfiehlt Sätze statt Stichwortlisten, weil Sätze zeigen, was wo steht und wer was hält.'],
            ['Einstellungen statt Kürzel', 'Kürzel wie --ar oder Gewichtungen liest Ideogram als normale Wörter. Seitenverhältnis, Seed und Qualität stellst du in der Bild-App ein.'],
            ['Magic Prompt bewusst nutzen', 'Magic Prompt erweitert deinen Prompt und ist standardmäßig an. Schalte es aus, wenn du prüfen willst, was deine eigenen Worte bewirken.'],
        ],
        faq: [
            ['Gehören mir die Bilder aus Ideogram?', 'Laut Ideogram beansprucht der Anbieter kein Eigentum an deinen Bildern, du darfst sie auch kommerziell nutzen. Du bist aber dafür verantwortlich, keine Rechte Dritter wie Marken oder Personen zu verletzen.'],
            ['Sieht jeder meine Bilder?', 'Im Gratis-Tarif ja: Laut Ideogram ist dort alles öffentlich, was du erzeugst. Ab dem Tarif Plus bleiben neue Bilder privat, bis du sie veröffentlichst.'],
            ['Klappt deutscher Text mit Umlauten?', 'Nicht immer. Laut Ideogram ist Text auf Englisch am genauesten, Akzente und Sonderzeichen können falsch oder gar nicht erscheinen. Kurze Wörter und mehrere Durchgänge helfen, längere Texte setzt du besser im Grafiktool.'],
        ],
        quellen: [
            { titel: 'Ideogram: Prompting Basics', url: 'https://docs.ideogram.ai/prompting/prompting' },
            { titel: 'Ideogram: Text in Images', url: 'https://docs.ideogram.ai/prompting/text-in-images' },
            { titel: 'Ideogram: Image Settings (Seitenverhältnis, Magic Prompt, Style, Negative Prompt)', url: 'https://docs.ideogram.ai/create/image-settings' },
            { titel: 'Ideogram: Fix Common Problems', url: 'https://docs.ideogram.ai/prompting/fix-common-problems' },
            { titel: 'Ideogram: Plans and Credits (Sichtbarkeit im Free Plan)', url: 'https://docs.ideogram.ai/plans-and-billing/available-plans' },
            { titel: 'Ideogram: Frequently Asked Questions (Nutzungsrechte)', url: 'https://docs.ideogram.ai/frequently-asked-questions' },
        ],
    },
}
