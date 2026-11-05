// Ratgeber aus dem Content-Plan Tool-Prompts (Format wie lib/ratgeber.js).
// Cluster B: Chat-Verlauf, Gedächtnis, Projekte. Alle Menüpfade, Funktionen und Tarifangaben
// wurden am Datum in "geprueft" in der offiziellen Hilfe von OpenAI, Anthropic und Google geprüft.
// Menünamen stehen auf Englisch in Anführungszeichen, weil wir sie nur in der englischen Hilfe gesehen haben.

const PFLICHT_LINKS = [
    ['/ratgeber/ki-tools-datenschutz-dsgvo', 'DSGVO-Checkliste für KI-Tools'],
    ['/tools/chatgpt', 'ChatGPT im Steckbrief'],
    ['/tools/claude', 'Claude im Steckbrief'],
    ['/tools/google-gemini', 'Google Gemini im Steckbrief'],
    ['/prompts/gpt-anweisungen-zu-skill', 'Prompt: GPT-Anweisungen zu Skill umbauen'],
    ['/prompts/ki-modell-umstellen-testplan', 'Prompt: Testplan für den Modellwechsel'],
]

const Q = {
    oaLoeschen: { titel: 'OpenAI Help: How to Delete and Archive Chats in ChatGPT', url: 'https://help.openai.com/en/articles/8809935-how-to-delete-and-archive-chats-in-chatgpt' },
    oaTemp: { titel: 'OpenAI Help: Temporary Chat FAQ', url: 'https://help.openai.com/en/articles/8914046-temporary-chat-faq' },
    oaData: { titel: 'OpenAI Help: Data Controls FAQ', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
    oaExport: { titel: 'OpenAI Help: Exporting your ChatGPT history and data', url: 'https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data' },
    oaMemory: { titel: 'OpenAI Help: Memory in ChatGPT / Memory FAQ', url: 'https://help.openai.com/en/articles/8590148-memory-faq' },
    oaProjekte: { titel: 'OpenAI Help: Projects in ChatGPT', url: 'https://help.openai.com/en/articles/10169521-projects-in-chatgpt' },
    clMemory: { titel: 'Claude Help: Use Claude’s chat search and memory to build on previous context', url: 'https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context' },
    clIncognito: { titel: 'Claude Help: Use incognito chats', url: 'https://support.claude.com/en/articles/12260368-use-incognito-chats' },
    clMemImport: { titel: 'Claude Help: Import and export your memory from Claude', url: 'https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude' },
    clExport: { titel: 'Claude Help: Export your Claude data', url: 'https://support.claude.com/en/articles/9450526-export-your-claude-data' },
    clLoeschen: { titel: 'Claude Help: Delete or rename a conversation', url: 'https://support.claude.com/en/articles/8230524-delete-or-rename-a-conversation' },
    clProjekte: { titel: 'Claude Help: How can I create and manage projects?', url: 'https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects' },
    clTraining: { titel: 'Anthropic Privacy Center: Model improvement privacy settings', url: 'https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings' },
    clSpeicher: { titel: 'Anthropic Privacy Center: How long do you store my data?', url: 'https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data' },
    geAktivitaet: { titel: 'Gemini Apps Help: Manage & delete your activity in Gemini Apps', url: 'https://support.google.com/gemini/answer/13278892' },
    geExport: { titel: 'Gemini Apps Help: Download your Gemini Apps data', url: 'https://support.google.com/gemini/answer/16920332' },
    geImport: { titel: 'Gemini Apps Help: Import from other AI platforms to Gemini Apps', url: 'https://support.google.com/gemini/answer/16868299' },
    gePrivacy: { titel: 'Gemini Apps Privacy Hub', url: 'https://support.google.com/gemini/answer/13594961' },
    geMemory: { titel: 'Gemini Apps Help: Personalization with memory of your past Gemini chats', url: 'https://support.google.com/gemini?p=past_chats' },
}

export const CHAT_ARTIKEL = [
    {
        slug: 'chatgpt-verlauf-loeschen',
        seoTitle: 'ChatGPT-Verlauf löschen, archivieren, ausschalten',
        title: 'ChatGPT-Verlauf löschen, archivieren oder ausschalten: Schritt für Schritt',
        description: 'So löschst du einzelne Chats oder deinen ganzen ChatGPT-Verlauf, archivierst Gespräche, nutzt den temporären Chat und schaltest das Training ab. Mit Menüpfaden, Fristen und Datenschutz-Check.',
        jean: 'Löschen, archivieren und ausschalten sind drei verschiedene Schalter. Wer sie verwechselt, räumt den Keller auf und lässt die Garage offen.',
        minutes: 7,
        sections: [
            {
                h: 'Erst klären: Was willst du eigentlich loswerden?',
                p: [
                    'Beim ChatGPT-Verlauf geht es um drei Dinge, die gern in einen Topf geworfen werden. Löschen entfernt einen Chat endgültig. Archivieren räumt ihn nur aus der Seitenleiste, er bleibt aber in deinem Konto. Und „ausschalten“ kann zweierlei heißen: Gespräche gar nicht erst speichern (temporärer Chat) oder sie zwar speichern, aber nicht fürs Training nutzen lassen.',
                    'Dazu kommt das Gedächtnis. Laut OpenAI löscht das Löschen eines Chats eine bereits gespeicherte Erinnerung nicht automatisch mit. Wer wirklich aufräumen will, muss also an zwei Stellen ran. Was das Gedächtnis kann, steht im Ratgeber zu ChatGPT Memory.',
                    'Alle Menüpfade in diesem Artikel habe ich in der englischen OpenAI-Hilfe geprüft, Stand November 2026. Deshalb stehen die Menünamen auf Englisch in Anführungszeichen. In der deutschen Oberfläche können sie anders beschriftet sein, die Reihenfolge bleibt dieselbe.',
                ],
            },
            {
                h: 'So löschst du einen einzelnen Chat',
                p: [
                    'Im Browser geht das laut OpenAI so: Seitenleiste mit dem Chatverlauf öffnen, mit der Maus über das Gespräch fahren, auf die drei Punkte neben dem Titel klicken, „Delete“ wählen und die Rückfrage bestätigen.',
                    'Der Chat verschwindet sofort aus deinem Verlauf. Aus den Systemen von OpenAI wird er laut Hilfe innerhalb von 30 Tagen endgültig gelöscht, außer er wurde bereits anonymisiert und von deinem Konto getrennt oder OpenAI muss ihn aus Sicherheits- oder Rechtsgründen aufbewahren. Ein gelöschter Chat lässt sich nicht wiederherstellen, weder in der Oberfläche noch über den Support. Also erst nachdenken, dann klicken.',
                    'Hattest du Apps wie Google Drive oder Gmail verbunden, entfernt das Löschen laut OpenAI auch die App-Daten, die in diesem Gespräch gespeichert wurden. Eine App nur zu trennen, löscht alte Gespräche dagegen nicht.',
                ],
            },
            {
                h: 'Den ganzen ChatGPT-Verlauf auf einmal löschen',
                p: [
                    'Für den Großputz gehst du über dein Profilbild in „Settings“ und dann in „Data controls“. Dort bietet OpenAI Optionen, alle Chats auf einmal zu archivieren oder zu löschen. Wichtig: Laut Hilfe gilt das für alle Gespräche, auch für die in Projekten.',
                    'Bevor du den Knopf drückst, zieh dir einen Export. Gelöschte Chats kommen laut OpenAI auch über einen Export nicht zurück. Wie das geht, steht im Ratgeber zum Exportieren und Umziehen von Chats.',
                ],
            },
            {
                h: 'Archivieren statt löschen: aufgeräumt, aber nicht weg',
                p: [
                    'Archivieren funktioniert wie Löschen, nur ohne Rückfrage: drei Punkte neben dem Chat, dann „Archive“. Das Gespräch verschwindet aus der Seitenleiste, bleibt aber in deinem Konto gespeichert, bis du es löschst.',
                    'Deine archivierten Chats findest du unter „Settings“, „Data controls“ und dort mit dem Knopf „Manage“ neben „Archived Chats“. Von da aus kannst du sie zurückholen oder endgültig löschen. Suchst du einen verschwundenen Chat, schau laut OpenAI zuerst dort nach. Oft ist er nur im Archiv gelandet.',
                    'Für den Datenschutz bringt Archivieren nichts. Das ist ein Umzugskarton im Keller, kein Wertstoffhof.',
                ],
            },
            {
                h: 'Verlauf ausschalten: der temporäre Chat',
                p: [
                    'Einen Schalter, der den Verlauf dauerhaft abstellt, beschreibt OpenAI in der aktuellen Hilfe nicht. Der Weg ist der temporäre Chat: neuen Chat öffnen und oben rechts auf den Knopf „Temporary“ klicken.',
                    'Ein temporärer Chat taucht laut OpenAI nicht in deinem Verlauf auf, erzeugt keine Erinnerungen und wird nicht fürs Training genutzt. Aus Sicherheitsgründen kann OpenAI eine Kopie bis zu 30 Tage aufbewahren. Standardmäßig startet er ohne Personalisierung, also ohne Gedächtnis und ohne deine eigenen Anweisungen. Das kannst du vor dem ersten Satz ändern, danach nicht mehr.',
                    'Wird das Gespräch doch wichtig, kannst du es speichern. Dann wird daraus ein normaler Chat, der ab da deinen Kontoeinstellungen folgt.',
                ],
            },
            {
                h: 'Training abschalten: der Schalter, den fast alle suchen',
                p: [
                    'Willst du Chats behalten, aber nicht fürs Modelltraining hergeben: Profilbild, „Settings“, „Data controls“ und dort „Improve the model for everyone“ ausschalten. In der App geht es laut OpenAI über Seitenleiste, Profilbild und „Data controls“.',
                    'Die Einstellung gilt fürs ganze Konto, egal auf welchem Gerät du sie änderst. Deine Gespräche bleiben danach im Verlauf, werden aber nicht mehr zum Training genutzt. Das betrifft neue Chats. Was schon in einem laufenden Training steckt, holt kein Schalter zurück.',
                ],
            },
            {
                h: 'Datenschutz: was du damit wirklich erreichst',
                p: [
                    'Löschen, Archiv leeren, Training aus, Gedächtnis aufräumen: Das ist deine private Hygiene. Für die Arbeit reicht das nicht. Personenbezogene Daten von Kunden oder Kollegen gehören nicht in ein privates Konto, auch nicht mit allen Schaltern auf „aus“. Für Firmen braucht es einen Business-Tarif und einen Auftragsverarbeitungsvertrag.',
                    'Was du vor dem Einsatz im Team klären musst, steht in der DSGVO-Checkliste für KI-Tools. Und wenn du ohnehin über einen Wechsel nachdenkst: Der Vergleich Claude vs. ChatGPT zeigt, wie die beiden sich im Alltag schlagen.',
                ],
            },
        ],
        faq: [
            ['Kann ich einen gelöschten ChatGPT-Chat wiederherstellen?', 'Nein. Laut OpenAI sind gelöschte Chats weder über die Oberfläche noch über die API oder den Support wiederherstellbar. Wenn du unsicher bist, archiviere lieber.'],
            ['Wie lange speichert OpenAI einen gelöschten Chat noch?', 'Er verschwindet sofort aus deinem Verlauf und wird laut OpenAI innerhalb von 30 Tagen aus den Systemen gelöscht, außer er wurde anonymisiert oder muss aus Sicherheits- oder Rechtsgründen aufbewahrt werden.'],
            ['Löscht „Delete all chats“ auch Chats in Projekten?', 'Ja. Laut OpenAI gelten das Archivieren und Löschen aller Chats unter „Data controls“ für alle Gespräche, auch die in Projekten.'],
            ['Vergisst ChatGPT etwas, wenn ich den Chat lösche?', 'Nicht unbedingt. Ein bereits gespeicherter Eintrag im Gedächtnis bleibt bestehen. Den löschst du separat in den Memory-Einstellungen unter „Settings“ und „Personalization“.'],
            ['Werden temporäre Chats fürs Training genutzt?', 'Nein, solange sie temporär bleiben. Laut OpenAI kann aber aus Sicherheitsgründen eine Kopie bis zu 30 Tage aufbewahrt werden.'],
        ],
        links: [
            ...PFLICHT_LINKS,
            ['/ratgeber/chatgpt-memory', 'ChatGPT Memory erklärt'],
            ['/ratgeber/chats-exportieren-umziehen', 'Chats exportieren und umziehen'],
            ['/tool-vergleiche/claude-vs-chatgpt', 'Vergleich: Claude vs. ChatGPT'],
            ['/prompts/tool/chatgpt', 'Prompts für ChatGPT'],
            ['/glossar/gedaechtnis', 'Glossar: Gedächtnis (Memory)'],
        ],
        quellen: [Q.oaLoeschen, Q.oaTemp, Q.oaData, Q.oaMemory, Q.oaExport],
        geprueft: '2026-11-02',
    },
    {
        slug: 'claude-memory',
        seoTitle: 'Claude Memory: was Claude sich merkt',
        title: 'Claude Memory: was Claude sich merkt und wie du es steuerst',
        description: 'Wie das Gedächtnis von Claude funktioniert, wo du es ansiehst, bearbeitest, pausierst oder zurücksetzt, was Projekt-Memory und Inkognito-Chats ändern und was beim Datenschutz zu beachten ist.',
        jean: 'Ein gutes Gedächtnis ist super, solange du weißt, was drinsteht. Bei Claude kannst du nachlesen. Mach das auch.',
        minutes: 7,
        sections: [
            {
                h: 'Was Claude Memory ist',
                p: [
                    'Claude kann sich laut Anthropic Zusammenhänge aus deinen Chats merken und in neue Gespräche mitnehmen. Gespeichert wird als Sammlung einzelner Themen, und zwar während du schreibst, nicht erst nach dem Gespräch. Erwähnst du, dass sich eine Deadline verschoben hat, weiß der nächste Chat das schon.',
                    'Daneben gibt es eine zweite Funktion: die Suche in alten Chats. Auf Bezahltarifen (Pro, Max, Ultra, Team, Enterprise) kannst du Claude bitten, in früheren Gesprächen nachzuschauen, etwa mit „Worüber haben wir zu Thema X gesprochen?“. Die Suche taucht im Chat als Werkzeugaufruf auf, mit Links zu den Originalchats.',
                    'Alle Angaben hier habe ich in der englischen Claude-Hilfe geprüft, Stand November 2026. Anthropic baut die Einstellungen gerade um, deshalb nenne ich jeweils den neuen und den älteren Menüpfad.',
                ],
            },
            {
                h: 'Für wen Memory gilt und ab wann es läuft',
                p: [
                    'Laut Anthropic ist Memory bei Free, Pro, Max und Ultra im Web, in Claude Desktop und in der Mobil-App standardmäßig eingeschaltet. Bei Team und Enterprise entscheiden die Owner, ob Memory verfügbar ist, und für jedes Mitglied ist es zunächst aus, bis es selbst einschaltet.',
                    'Heißt für dich als Privatnutzer: Hast du nie etwas umgestellt, merkt Claude sich vermutlich schon etwas. Kein Grund zur Panik, aber ein guter Grund, einmal reinzuschauen.',
                ],
            },
            {
                h: 'So siehst und änderst du, was Claude weiß',
                p: [
                    'Im neuen Layout: „Settings“, dann „Your Claude“ und „Manage“ neben „Your memory“. Im älteren Layout heißt der Bereich „Settings“ und „Memory“. Alles Gemerkte steht dort unter „Topics“. Du öffnest ein Thema, änderst es über das Stift-Symbol oder entfernst es mit „Delete“. Die Korrektur gilt ab dann in allen Gesprächen.',
                    'Schneller geht es oft direkt im Chat: Sag Claude, was es sich merken, ändern oder vergessen soll. Auch ein schlichtes „Merk dir das“ funktioniert laut Anthropic. Das ist wie ein Zettel am Kühlschrank, nur dass Claude ihn auch wirklich liest.',
                ],
            },
            {
                h: 'Pausieren, zurücksetzen oder nur für einen Chat abschalten',
                p: [
                    'Den Schalter findest du unter „Settings“, „Your Claude“ bei „Memory from chats“ (älteres Layout: „Settings“, „Memory“, „Generate memory from chats“). Beim Ausschalten bietet Claude zwei Wege an. „Pause memory“ behält alles, nutzt es aber nicht und legt nichts Neues an. „Reset memory“ löscht laut Anthropic alle Erinnerungen endgültig, auch die aus Projekten.',
                    'Für ein einzelnes Gespräch ohne Gedächtnis öffnest du einen neuen Chat, klickst auf das Plus-Menü und schaltest dort „Memory“ aus, und zwar vor der ersten Nachricht. Der Chat bleibt im Verlauf, nutzt aber kein Gedächtnis und füllt es auch nicht.',
                    'Die Suche in alten Chats ist ein eigener Schalter: „Search and reference chats“ unter „Settings“ und „Your Claude“ (älter: „Settings“, „Memory“).',
                ],
            },
            {
                h: 'Projekt-Memory: jedes Projekt hat sein eigenes Gedächtnis',
                p: [
                    'In einem Projekt nutzt Claude das Gedächtnis des Projekts plus dein allgemeines Gedächtnis aus Chats außerhalb von Projekten, aber nicht das anderer Projekte. Neues wird im Projekt gespeichert und kann bei eingeschaltetem Memory auch außerhalb auftauchen.',
                    'Soll ein Projekt komplett abgeschottet sein, etwa für einen Kunden: Schalte auf der Projektseite unter „Memory“ die Option „Use account memory“ aus. Laut Anthropic wird Projekt-Memory gelöscht, wenn du das Projekt löschst. Wie Projekte bei Claude und ChatGPT im Vergleich funktionieren, steht im Ratgeber ChatGPT-Projekte vs. Claude-Projekte.',
                ],
            },
            {
                h: 'Inkognito-Chat: wenn gar nichts hängen bleiben soll',
                p: [
                    'Inkognito-Chats gibt es laut Anthropic für alle Tarife. Du startest sie außerhalb eines Projekts über das Geist-Symbol oben rechts. Sie landen nicht im Verlauf, nutzen kein Gedächtnis, kommen nicht ins Gedächtnis und werden nicht fürs Training genutzt.',
                    'Ganz weg sind sie trotzdem nicht sofort: Anthropic bewahrt sie standardmäßig 30 Tage auf, bei Enterprise auch länger, wenn die Organisation das so eingestellt hat. Bei Team und Enterprise sind Inkognito-Chats zudem im normalen Datenexport enthalten.',
                ],
            },
            {
                h: 'Memory umziehen: von ChatGPT zu Claude und zurück',
                p: [
                    'Claude hat einen eingebauten Import. Unter „Settings“ und „Your Claude“ wählst du „Start import“. Claude zeigt dir einen fertigen Prompt, den du bei deinem bisherigen Anbieter eingibst. Die Antwort fügst du ein und klickst „Add to memory“. Anthropic nennt die Funktion selbst experimentell, und weil das Gedächtnis auf Arbeitsthemen ausgerichtet ist, bleiben private Details nicht immer hängen.',
                    'Zum Exportieren fragst du Claude einfach: „Write out your memories of me verbatim, exactly as they appear in your memory.“ Den Text speicherst du als Datei. Den ganzen Umzug inklusive Chats beschreibt der Ratgeber Chats exportieren und umziehen.',
                ],
            },
            {
                h: 'Datenschutz: drei Dinge, die viele übersehen',
                p: [
                    'Erstens: Löschst du einen Chat, bleiben die daraus entstandenen Erinnerungen laut Anthropic erhalten. Die musst du einzeln löschen. Zweitens: Sensible Themen speichert Claude standardmäßig nicht im Gedächtnis, außer du schaltest „Include sensitive topics in memory“ ein. Lass das lieber aus, wenn du nicht genau weißt, warum du es brauchst. Drittens: Alle Memory-Daten sind im Datenexport enthalten.',
                    'Ob deine Chats fürs Training genutzt werden, regelst du getrennt davon unter „Settings“, „Privacy“ mit dem Schalter „Help improve our AI models“. Für berufliche Daten gilt wie immer: erst die DSGVO-Checkliste, dann der Chat.',
                ],
            },
        ],
        faq: [
            ['Ist Claude Memory standardmäßig an?', 'Bei Free, Pro, Max und Ultra laut Anthropic ja. Bei Team und Enterprise entscheiden die Owner, und für Mitglieder ist es aus, bis sie es selbst einschalten.'],
            ['Wo sehe ich, was Claude über mich gespeichert hat?', 'Unter „Settings“, „Your Claude“ und „Manage“ neben „Your memory“, im älteren Layout unter „Settings“ und „Memory“. Dort stehen alle Einträge als „Topics“.'],
            ['Was ist der Unterschied zwischen „Pause memory“ und „Reset memory“?', 'Pausieren behält alles, nutzt es aber nicht und speichert nichts Neues. Zurücksetzen löscht alle Erinnerungen endgültig, auch die aus Projekten.'],
            ['Löscht Claude Erinnerungen, wenn ich den Chat lösche?', 'Nein. Laut Anthropic bleiben daraus entstandene Erinnerungen erhalten. Du löschst sie einzeln in der Memory-Verwaltung oder bittest Claude im Chat darum.'],
            ['Kann Claude in alten Chats suchen?', 'Auf Bezahltarifen ja, wenn „Search and reference chats“ eingeschaltet ist. Die Suche bleibt dabei getrennt: außerhalb von Projekten nur in Chats außerhalb, in einem Projekt nur in diesem Projekt.'],
        ],
        links: [
            ...PFLICHT_LINKS,
            ['/ratgeber/chatgpt-memory', 'Zum Vergleich: ChatGPT Memory'],
            ['/ratgeber/chatgpt-projekte-vs-claude-projekte', 'ChatGPT-Projekte vs. Claude-Projekte'],
            ['/ratgeber/chats-exportieren-umziehen', 'Chats exportieren und umziehen'],
            ['/tool-vergleiche/claude-vs-chatgpt', 'Vergleich: Claude vs. ChatGPT'],
            ['/glossar/gedaechtnis', 'Glossar: Gedächtnis (Memory)'],
        ],
        quellen: [Q.clMemory, Q.clIncognito, Q.clMemImport, Q.clProjekte, Q.clTraining],
        geprueft: '2026-11-02',
    },
    {
        slug: 'chatgpt-projekte-vs-claude-projekte',
        seoTitle: 'ChatGPT-Projekte vs. Claude-Projekte',
        title: 'ChatGPT-Projekte vs. Claude-Projekte: wo deine Arbeit besser aufgehoben ist',
        description: 'Projekte in ChatGPT und Claude im Vergleich: Anlegen, Dateien, Anweisungen, Gedächtnis, Teilen und Grenzen. Mit Menüpfaden aus der offiziellen Hilfe und einer klaren Empfehlung.',
        jean: 'Ein Projekt ist eine Werkzeugkiste mit Etikett. Welche Kiste besser ist, hängt davon ab, ob du allein schraubst oder mit der ganzen Werkstatt.',
        minutes: 7,
        sections: [
            {
                h: 'Was ein Projekt überhaupt ist',
                p: [
                    'In beiden Tools ist ein Projekt ein Ordner, in dem Chats, Dateien und feste Anweisungen zusammenliegen. Jeder neue Chat im Projekt startet mit diesem Material, du musst Kontext also nicht jedes Mal neu erklären. Das spart bei wiederkehrenden Aufgaben richtig Zeit, vom Wochenbericht bis zur Produktbeschreibung.',
                    'Projekte gibt es bei beiden auch im Gratistarif. Bei Claude sind es für Free-Nutzer laut Anthropic höchstens fünf Projekte. Alle Angaben in diesem Vergleich stammen aus der englischen Hilfe von OpenAI und Anthropic, Stand November 2026.',
                ],
            },
            {
                h: 'Anlegen und befüllen: so geht es bei ChatGPT',
                p: [
                    'In ChatGPT klickst du in der Seitenleiste auf „New project“, vergibst einen Namen und wählst Symbol und Farbe. Dateien lädst du als PDF, Tabelle, Dokument, Bild oder als eingefügten Text hoch. Wie viele Dateien gehen, hängt laut OpenAI vom Tarif ab.',
                    'Anweisungen setzt du über die drei Punkte und „Project settings“. Sie gelten nur in diesem Projekt und haben Vorrang vor deinen allgemeinen eigenen Anweisungen. Praktisch: Eine gute Antwort kannst du über das Nachrichtenmenü mit „Add to project sources“ als Quelle ins Projekt speichern. Außerdem lassen sich Links aus Google Drive und Slack als Quelle einbinden.',
                    'Bestehende Chats ziehst du per Drag and Drop ins Projekt oder wählst im Chatmenü „Move to project“. Chats, die mit einem GPT entstanden sind, lassen sich laut OpenAI nicht verschieben.',
                ],
            },
            {
                h: 'Anlegen und befüllen: so geht es bei Claude',
                p: [
                    'Bei Claude gehst du über „Projects“ in der Seitenleiste oder direkt auf claude.ai/projects und klickst „+ New Project“. Name und Beschreibung sieht Claude laut Anthropic nicht, die sind nur für dich.',
                    'Das Herzstück ist die Projektwissensbasis rechts auf der Projektseite. Über das Plus lädst du Dokumente, Texte oder Code hoch. Anweisungen setzt du mit „Set project instructions“. Wird das Wissen auf einem Bezahltarif zu groß fürs Kontextfenster, schaltet Claude laut Anthropic automatisch in einen RAG-Modus, der nur die passenden Teile heranzieht.',
                    'Wichtiger Unterschied: Laut Anthropic teilen sich Chats im selben Projekt keinen Kontext, außer die Info steht in der Wissensbasis. Was alle Chats wissen sollen, gehört also dort hinein. Einen einzelnen Chat verschiebst du über den Pfeil neben dem Chatnamen und „Add to project“.',
                ],
            },
            {
                h: 'Gedächtnis im Projekt: der eigentliche Unterschied',
                p: [
                    'ChatGPT kennt zwei Modi pro Projekt: „Default memory“ und „Project-only memory“. Mit Project-only greift das Projekt nur auf eigene Chats zu, nicht auf deine gespeicherten Erinnerungen und nicht auf Chats außerhalb, und umgekehrt sieht der Rest von ChatGPT nichts aus dem Projekt. Umstellen kannst du das über die drei Punkte, „Project settings“ und „Memory“. Laut OpenAI kann es ein paar Stunden dauern, bis die Änderung greift. Geteilte Projekte laufen immer mit Project-only.',
                    'Bei Claude hat jedes Projekt ein eigenes Gedächtnis und nutzt zusätzlich dein allgemeines Gedächtnis, aber nie das anderer Projekte. Zum vollständigen Abschotten schaltest du auf der Projektseite unter „Memory“ die Option „Use account memory“ aus. Mehr dazu in den Ratgebern zu Claude Memory und ChatGPT Memory.',
                ],
            },
            {
                h: 'Teilen und zusammenarbeiten',
                p: [
                    'Hier ist ChatGPT großzügiger. Projekte lassen sich laut OpenAI in allen Tarifen teilen, auch im Gratistarif, mit Chat- oder Bearbeitungsrechten. Die Grenzen: Free bis 5 Dateien und 5 Mitwirkende, Plus und Go bis 25 Dateien und 10 Mitwirkende, Pro bis 40 Dateien und 100 Mitwirkende. Teammitglieder können Chats anderer verzweigen und weiterführen.',
                    'Bei Claude beschreibt die Hilfe die Freigabe für Team und Enterprise: Dort wählst du beim Anlegen, ob das Projekt privat bleibt und nur eingeladene Mitglieder es sehen, oder ob es für die ganze Organisation sichtbar ist, sofern die Admins das erlauben. Für Free, Pro und Max nennt der Artikel zum Anlegen von Projekten keine Freigabe.',
                ],
            },
            {
                h: 'Löschen und Datenschutz',
                p: [
                    'Ein ChatGPT-Projekt löschst du über die drei Punkte und „Delete project“. Laut OpenAI verschwinden dabei Chats, Anweisungen und Dateien, die nur im Projekt lagen, endgültig. Achtung bei „Delete all chats“ in den Datenkontrollen: Das räumt laut OpenAI auch Chats in Projekten ab. Bei geteilten Projekten in privaten Konten werden die Daten nur dann fürs Training genutzt, wenn der Owner und alle Mitwirkenden „Improve the model for everyone“ eingeschaltet haben.',
                    'Projekte sind bequem, aber kein Tresor. Kundenverträge, Personalakten oder Gesundheitsdaten gehören nicht in ein privates Konto. Was im Team gilt, steht in der DSGVO-Checkliste für KI-Tools.',
                ],
            },
            {
                h: 'Mein Fazit: welches Projekt für wen',
                p: [
                    'Arbeitest du mit anderen zusammen und hast kein Team-Abo, ist ChatGPT im Vorteil, weil Teilen laut OpenAI schon im Gratistarif geht. Arbeitest du allein mit vielen Dokumenten, etwa Handbüchern oder Code, spielt Claude mit der Wissensbasis und dem automatischen RAG-Modus seine Stärke aus.',
                    'Ziehst du von einem Tool ins andere, nimm deine Projektanweisungen mit. Der Prompt GPT-Anweisungen zu Skill baut daraus eine Datei, die in beiden Welten funktioniert. Und bevor du umstellst, lass den Testplan für den Modellwechsel laufen. Den großen Überblick gibt der Vergleich Claude vs. ChatGPT.',
                ],
            },
        ],
        faq: [
            ['Sind Projekte bei ChatGPT und Claude kostenlos?', 'Ja, beide bieten Projekte auch im Gratistarif an. Bei Claude sind es laut Anthropic für Free-Nutzer höchstens fünf Projekte, bei ChatGPT hängt die Dateizahl vom Tarif ab.'],
            ['Wissen Chats im selben Claude-Projekt voneinander?', 'Nicht automatisch. Laut Anthropic wird Kontext zwischen Chats nur geteilt, wenn die Info in der Projektwissensbasis steht. Dazu kommt das Projekt-Gedächtnis, wenn Memory an ist.'],
            ['Kann ich ein ChatGPT-Projekt mit Freunden teilen?', 'Ja, laut OpenAI auch im Gratistarif, dort mit bis zu 5 Mitwirkenden und 5 Dateien. Bei Plus und Go sind es 10 Mitwirkende, bei Pro 100.'],
            ['Was ist „Project-only memory“ bei ChatGPT?', 'Ein Modus, in dem das Projekt nur auf eigene Chats zugreift und der Rest von ChatGPT nichts aus dem Projekt sieht. Geteilte Projekte laufen immer so.'],
            ['Kann ich ein Projekt von ChatGPT zu Claude umziehen?', 'Einen Import-Knopf für Projekte nennen beide Hilfen nicht. Du überträgst Anweisungen und Dateien von Hand. Wie du Chats und Gedächtnis mitnimmst, steht im Ratgeber zum Umziehen.'],
        ],
        links: [
            ...PFLICHT_LINKS,
            ['/tool-vergleiche/claude-vs-chatgpt', 'Vergleich: Claude vs. ChatGPT'],
            ['/glossar/projekte', 'Glossar: Projekte (KI-Chat)'],
            ['/prompts/chatgpt-projekt-anweisungen', 'Prompt: Anweisungen für ein ChatGPT-Projekt'],
            ['/prompts/tool/chatgpt', 'Prompts für ChatGPT'],
            ['/ratgeber/claude-memory', 'Claude Memory erklärt'],
            ['/ratgeber/chatgpt-memory', 'ChatGPT Memory erklärt'],
        ],
        quellen: [Q.oaProjekte, Q.clProjekte, Q.clMemory, Q.oaLoeschen],
        geprueft: '2026-11-02',
    },
    {
        slug: 'chats-exportieren-umziehen',
        seoTitle: 'ChatGPT-Chats exportieren und umziehen',
        title: 'Chats exportieren und umziehen: ChatGPT, Claude und Gemini im Überblick',
        description: 'So exportierst du deine Chats aus ChatGPT, Claude und Gemini, nimmst dein Gedächtnis mit und ziehst zu einem anderen Anbieter um. Mit Menüpfaden, Fristen und den Haken bei der EU-Verfügbarkeit.',
        jean: 'Ein Umzug ohne Kartons beschriften endet mit der Kaffeemaschine im Keller. Bei Chats ist es genauso: erst exportieren, dann prüfen, dann umziehen.',
        minutes: 8,
        sections: [
            {
                h: 'Was beim Umzug mitkommt und was nicht',
                p: [
                    'Ein Anbieterwechsel hat drei Teile: deine Chats, dein Gedächtnis und deine Arbeitsanweisungen. Chats bekommst du bei allen drei Anbietern als Datenexport. Das Gedächtnis ziehst du am einfachsten per Prompt um. Und Anweisungen aus Projekten oder eigenen GPTs überträgst du am besten als Datei, dafür gibt es den Prompt GPT-Anweisungen zu Skill.',
                    'Die Menüpfade stammen aus der englischen Hilfe von OpenAI, Anthropic und Google, Stand November 2026. Die Menünamen stehen deshalb auf Englisch in Anführungszeichen.',
                ],
            },
            {
                h: 'ChatGPT-Chats exportieren',
                p: [
                    'Profilmenü öffnen, „Settings“, dann „Data controls“. Bei „Export data“ klickst du „Export“ und bestätigst mit „Confirm export“. Laut OpenAI geht das bei Free, Go, Plus und Pro sowie in berechtigten Edu-Arbeitsbereichen. In Business, Enterprise und ChatGPT for Healthcare gibt es keinen Selbstexport, da fragst du den Workspace-Owner.',
                    'Die Mail mit dem Link „Download data export“ kann laut OpenAI bis zu sieben Tage dauern. Der Link ist dann nur 24 Stunden gültig, und du musst im selben Konto angemeldet sein. Du bekommst eine ZIP-Datei mit deinem Verlauf und weiteren Kontodaten. Kommst du nicht mehr ins Konto, geht der Antrag über das Privacy Portal von OpenAI.',
                    'Mach die ZIP-Datei auf und prüf, ob die wichtigen Gespräche drin sind. Bereits gelöschte Chats holt auch ein Export nicht zurück.',
                ],
            },
            {
                h: 'Claude-Chats exportieren',
                p: [
                    'Bei Claude gehst du im Web oder in Claude Desktop auf „Settings“, „Privacy“ und klickst „Export data“. In der iOS- oder Android-App geht das laut Anthropic nicht. Der Download-Link kommt per Mail und läuft nach 24 Stunden ab. Ist er abgelaufen, forderst du einfach einen neuen an.',
                    'Selbstexport gibt es bei Free, Pro, Max und Ultra. Bei Team und Enterprise muss ein Owner „Allow members to export their own data“ einschalten, dann enthält der Export deine eigenen Chats, aber nicht die Inhalte hochgeladener Dateien. Einen Import in ein anderes privates Claude-Konto gibt es laut Anthropic nicht.',
                ],
            },
            {
                h: 'Gemini-Chats exportieren über Google Takeout',
                p: [
                    'Bei Gemini läuft der Export über takeout.google.com. Dort klickst du „Deselect all“, setzt den Haken bei „Gemini“ für deine Gems und für die Chats bei „My Activity“. Über „All activity data included“ wählst du erst alles ab und dann nur „Gemini Apps“. Danach „Next step“, Zustellweg und Format wählen und „Create export“.',
                    'Den Link bekommst du per Mail, er gilt laut Google sieben Tage. Je nach Datenmenge dauert die Erstellung ein paar Stunden bis ein paar Tage, meist kommt er am selben Tag. Wichtig: Herunterladen löscht nichts auf den Google-Servern.',
                ],
            },
            {
                h: 'Gedächtnis mitnehmen: der Prompt-Weg',
                p: [
                    'Claude hat einen eingebauten Import: „Settings“, „Your Claude“, „Start import“. Claude zeigt dir einen Prompt, den du bei ChatGPT oder Gemini eingibst. Die Antwort fügst du ein und klickst „Add to memory“. Laut Anthropic gibt es den Import in allen Tarifen im Web und in Claude Desktop, er ist aber noch experimentell.',
                    'Gemini bietet unter „Settings & help“ den Punkt „Import memory to Gemini“, sogar mit Upload ganzer ChatGPT- oder Claude-Exporte als ZIP bis 5 GB. Der Haken für dich: Laut Google ist die Funktion im EWR, in der Schweiz und im Vereinigten Königreich derzeit nicht verfügbar. Aus Deutschland klappt das also Stand November 2026 nicht.',
                    'Für ChatGPT als Ziel nennt die OpenAI-Hilfe keinen Import-Assistenten. Dort trägst du Wichtiges in die eigenen Anweisungen ein oder sagst im Chat „Merk dir, dass …“.',
                ],
            },
            {
                h: 'Umzug in fünf Schritten',
                p: [
                    'Erstens: Export beim alten Anbieter anfordern und die ZIP-Datei sichern. Zweitens: Gedächtnis per Prompt auslesen und als Textdatei speichern, vorher sensible Angaben rausstreichen. Drittens: Projektanweisungen und eigene GPTs mit dem Prompt GPT-Anweisungen zu Skill in eine Datei gießen.',
                    'Viertens: Beim neuen Anbieter Gedächtnis importieren und Projekte neu anlegen. Fünftens: Deine fünf wichtigsten Aufgaben durchtesten, bevor du kündigst. Dafür gibt es den Prompt Testplan für den Modellwechsel. Erst wenn alles läuft, alte Chats löschen. Wie das bei ChatGPT geht, steht im Ratgeber ChatGPT-Verlauf löschen.',
                ],
            },
            {
                h: 'Datenschutz beim Umziehen',
                p: [
                    'Ein Export enthält laut OpenAI auch sensible Kontodaten. Speicher die ZIP-Datei nicht im Download-Ordner eines geteilten Rechners und schick sie nicht unverschlüsselt herum.',
                    'Beim Import in Gemini landen importierte Chats laut Google in deiner Aktivität und werden wie normale Gemini-Chats behandelt, auch zum Verbessern der Dienste inklusive Training generativer Modelle. Wenn du das nicht willst, prüf vorher die Einstellung „Keep Activity“. Für berufliche Daten gilt wie immer die DSGVO-Checkliste für KI-Tools.',
                ],
            },
        ],
        faq: [
            ['Wie lange dauert ein ChatGPT-Export?', 'Laut OpenAI bis zu sieben Tage. Der Download-Link ist ab Erhalt 24 Stunden gültig.'],
            ['Kann ich meine ChatGPT-Chats in Claude importieren?', 'Ganze Chats nicht. Claude importiert laut Anthropic das Gedächtnis per Prompt, nicht den Verlauf. Den ChatGPT-Export behältst du als Archiv.'],
            ['Geht der Chat-Import in Gemini in Deutschland?', 'Stand November 2026 nein. Laut Google ist der Import aus anderen KI-Plattformen im EWR, in der Schweiz und im Vereinigten Königreich nicht verfügbar.'],
            ['Kann ich Claude-Chats in der App exportieren?', 'Nein, laut Anthropic nur im Web oder in Claude Desktop unter „Settings“ und „Privacy“.'],
            ['Löscht ein Export meine Daten beim Anbieter?', 'Nein. Ein Export ist nur eine Kopie. Löschen musst du separat, bei Gemini etwa in der Gemini-Apps-Aktivität.'],
        ],
        links: [
            ...PFLICHT_LINKS,
            ['/ratgeber/chatgpt-verlauf-loeschen', 'ChatGPT-Verlauf löschen'],
            ['/ratgeber/claude-memory', 'Claude Memory erklärt'],
            ['/ratgeber/chatgpt-memory', 'ChatGPT Memory erklärt'],
            ['/tool-vergleiche/claude-vs-chatgpt', 'Vergleich: Claude vs. ChatGPT'],
            ['/glossar/gedaechtnis', 'Glossar: Gedächtnis (Memory)'],
        ],
        quellen: [Q.oaExport, Q.clExport, Q.clMemImport, Q.geExport, Q.geImport, Q.gePrivacy, Q.geAktivitaet],
        geprueft: '2026-11-02',
    },
    {
        slug: 'chatgpt-memory',
        seoTitle: 'ChatGPT Memory erklärt: das Gedächtnis',
        title: 'ChatGPT Memory erklärt: was das Gedächtnis speichert und wie du es steuerst',
        description: 'So funktioniert das Gedächtnis von ChatGPT: Memory-Zusammenfassung, gespeicherte Erinnerungen, Chatverlauf, Quellen, temporärer Chat und Projekte. Mit Menüpfaden und Datenschutz-Tipps.',
        jean: 'ChatGPT merkt sich mehr, als in der Zusammenfassung steht. Das sagt OpenAI selbst. Also lieber einmal aufräumen als später wundern.',
        minutes: 7,
        sections: [
            {
                h: 'Was ChatGPT Memory ist',
                p: [
                    'Ist das Gedächtnis eingeschaltet, merkt sich ChatGPT laut OpenAI nützliche Zusammenhänge aus deinen Chats, Dateien und verbundenen Apps, damit du dich nicht ständig wiederholen musst. Je nach Tarif und Region können als Quellen frühere Chats, gespeicherte Erinnerungen, eigene Anweisungen, Dateien und verbundene Apps wie Gmail dazukommen.',
                    'OpenAI sagt ausdrücklich, dass die Funktionen je nach Tarif, Region, Plattform und Arbeitsbereich unterschiedlich sind. Siehst du eine der unten genannten Einstellungen nicht, ist sie für dein Konto vielleicht noch nicht verfügbar. Geprüft habe ich alles in der englischen OpenAI-Hilfe, Stand November 2026.',
                ],
            },
            {
                h: 'Wo du das Gedächtnis findest',
                p: [
                    'Der Weg: „Settings“, dann „Personalization“ und „Memory“. Je nach Version siehst du dort Schalter wie „Memory“, „Reference saved memories“ und „Reference chat history“ oder eine „Memory summary“ mit „Manage“.',
                    'Die Memory-Zusammenfassung ist der neue Überblick. Korrekturen tippst du unten ins Textfeld oder markierst eine Stelle und schreibst die Berichtigung dazu. Über das Drei-Punkte-Menü gibt es „Delete and turn off memory“: Das löscht die angezeigten Erinnerungen und schaltet das Gedächtnis ab, deine Chats bleiben aber.',
                    'Wer lieber das alte System mit einzelnen Einträgen will, findet laut OpenAI unter der Zusammenfassung den Link „saved memories“. Zurück geht es mit „Try improved memory“.',
                ],
            },
            {
                h: 'Gespeicherte Erinnerungen und Chatverlauf: zwei Schubladen',
                p: [
                    'Gespeicherte Erinnerungen sind Dinge, die du ChatGPT ausdrücklich sagst, etwa „Merk dir, dass ich Vegetarier bin“, oder die ChatGPT selbst für nützlich hält. Sie liegen getrennt vom Chatverlauf. Löschst du den Chat, aus dem eine Erinnerung stammt, bleibt sie trotzdem bestehen.',
                    'Mit „Reference chat history“ nutzt ChatGPT zusätzlich passende Infos aus alten Gesprächen. Schaltest du das ab, werden die daraus gemerkten Infos laut OpenAI innerhalb von 30 Tagen aus den Systemen gelöscht, die Chats selbst bleiben im Verlauf. Schaltest du „Reference saved memories“ ab, geht der Chatverlauf-Bezug gleich mit aus.',
                ],
            },
            {
                h: 'Nachschauen, woher eine Antwort ihr Wissen hat',
                p: [
                    'Unter einer personalisierten Antwort können Quellen erscheinen, bei OpenAI hinter einem Buch-Symbol. Dort siehst du, ob ein alter Chat, eine Erinnerung, eine eigene Anweisung oder eine Datei mitgewirkt hat, und kannst über die drei Punkte korrigieren.',
                    'OpenAI schreibt selbst, dass die Quellen nicht jeden Einfluss zeigen. Und die Zusammenfassung enthält laut Hilfe nicht alles, was ChatGPT weiß. Der einfachste Test: Frag direkt „Was weißt du über mich?“. Das Ergebnis ist manchmal aufschlussreicher als jeder Einstellungsdialog.',
                ],
            },
            {
                h: 'Ganz ohne Gedächtnis: temporärer Chat',
                p: [
                    'Für ein Gespräch ohne Gedächtnis öffnest du einen neuen Chat und klickst oben rechts auf „Temporary“. Standardmäßig nutzt er laut OpenAI weder Erinnerungen noch eigene Anweisungen, erzeugt keine neuen Erinnerungen und taucht nicht im Verlauf auf.',
                    'Du kannst einen temporären Chat beim Start auch personalisieren. Dann nutzt er dein vorhandenes Gedächtnis, legt aber trotzdem nichts Neues an. Die Wahl triffst du vor der ersten Nachricht, danach ist sie fest. Mehr zu Verlauf und Löschen steht im Ratgeber ChatGPT-Verlauf löschen.',
                ],
            },
            {
                h: 'Gedächtnis in Projekten',
                p: [
                    'Projekte laufen entweder mit „Default memory“ oder „Project-only memory“. Bei Project-only nutzt das Projekt nur eigene Chats, nicht deine gespeicherten Erinnerungen, und Chats außerhalb sehen nichts aus dem Projekt. Umstellen geht über die drei Punkte im Projekt, „Project settings“ und „Memory“. Geteilte Projekte laufen immer mit Project-only.',
                    'Für Kundenprojekte ist das der saubere Weg: Was im Projekt besprochen wird, bleibt im Projekt. Den Vergleich mit Claude findest du im Ratgeber ChatGPT-Projekte vs. Claude-Projekte.',
                ],
            },
            {
                h: 'Datenschutz: so löschst du wirklich alles',
                p: [
                    'OpenAI ist hier deutlich: Willst du etwas restlos entfernen, musst du jede Quelle löschen, in der es vorkommt. Also alte Chats, archivierte Chats, Dateien, die Memory-Zusammenfassung, und verbundene Apps mit dieser Info trennst du. Ein einzelner Klick reicht nicht.',
                    'Sensible Daten können im Gedächtnis landen, wenn du sie erzählst. Gesundheit, Finanzen oder Daten von Kunden besprichst du deshalb lieber im temporären Chat oder gar nicht. Ob deine Chats fürs Training genutzt werden, regelst du getrennt unter „Data controls“ mit „Improve the model for everyone“. Was im Job gilt, steht in der DSGVO-Checkliste für KI-Tools. Und wie Claude es macht, zeigt der Ratgeber Claude Memory.',
                ],
            },
        ],
        faq: [
            ['Wo schalte ich das ChatGPT-Gedächtnis aus?', 'Unter „Settings“, „Personalization“ und „Memory“. Je nach Version per Schalter oder über das Drei-Punkte-Menü der Zusammenfassung mit „Delete and turn off memory“.'],
            ['Vergisst ChatGPT etwas, wenn ich den Chat lösche?', 'Nicht zwingend. Gespeicherte Erinnerungen liegen laut OpenAI getrennt und bleiben bestehen. Die löschst du in den Memory-Einstellungen oder bittest ChatGPT, sie zu vergessen.'],
            ['Zeigt die Memory-Zusammenfassung alles, was ChatGPT weiß?', 'Nein. Laut OpenAI enthält sie nicht unbedingt jedes Detail. Frag im Zweifel direkt im Chat nach.'],
            ['Nutzt der temporäre Chat mein Gedächtnis?', 'Standardmäßig nicht. Wählst du beim Start die personalisierte Variante, liest er vorhandene Erinnerungen, legt aber keine neuen an.'],
            ['Ist ChatGPT Memory in Deutschland verfügbar?', 'Die Funktionen unterscheiden sich laut OpenAI nach Tarif, Region und Plattform. Was dein Konto kann, siehst du unter „Settings“, „Personalization“ und „Memory“.'],
        ],
        links: [
            ...PFLICHT_LINKS,
            ['/ratgeber/claude-memory', 'Zum Vergleich: Claude Memory'],
            ['/ratgeber/chatgpt-verlauf-loeschen', 'ChatGPT-Verlauf löschen'],
            ['/ratgeber/chatgpt-projekte-vs-claude-projekte', 'ChatGPT-Projekte vs. Claude-Projekte'],
            ['/prompts/chatgpt-memory-steckbrief', 'Prompt: Steckbrief fürs ChatGPT-Gedächtnis'],
            ['/prompts/tool/chatgpt', 'Prompts für ChatGPT'],
            ['/glossar/gedaechtnis', 'Glossar: Gedächtnis (Memory)'],
            ['/tool-vergleiche/claude-vs-chatgpt', 'Vergleich: Claude vs. ChatGPT'],
        ],
        quellen: [Q.oaMemory, Q.oaTemp, Q.oaProjekte, Q.oaData, Q.oaLoeschen],
        geprueft: '2026-11-02',
    },
]
