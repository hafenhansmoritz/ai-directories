// Ratgeber aus dem Content-Plan Tool-Prompts (Format wie lib/ratgeber.js).
// Cluster E: Anwendungsfall-Hubs, die vorhandene Prompts, Tutorials und Steckbriefe bündeln.
// Angaben zu ChatGPT-Funktionen am 2026-11-02 mit den offiziellen OpenAI-Seiten in "quellen" abgeglichen.
export const HUB_ARTIKEL = [
    {
        slug: 'chatgpt-bewerbung',
        seoTitle: 'ChatGPT für die Bewerbung: Anschreiben, Lebenslauf, Gespräch',
        title: 'ChatGPT für die Bewerbung: vom Lebenslauf bis zur Gehaltsfrage',
        description:
            'So nutzt du ChatGPT für Anschreiben, Lebenslauf, Vorstellungsgespräch, Gehaltsverhandlung und Arbeitszeugnis, ohne nach Massenware zu klingen und ohne deine Daten zu verschenken. Mit fünf fertigen Prompt-Vorlagen.',
        jean: 'ChatGPT schreibt dir in zehn Sekunden ein Anschreiben. Leider dasselbe wie für die 400 anderen Bewerber. Hier zeige ich dir, wie deins nach dir klingt.',
        minutes: 8,
        sections: [
            {
                h: 'Was ChatGPT bei der Bewerbung gut kann und was nicht',
                p: [
                    'ChatGPT ist stark im Umbauen: aus deinen Stichpunkten Sätze machen, eine Stellenanzeige in Anforderungen zerlegen, deinen Lebenslauf auf eine bestimmte Stelle zuschneiden, dich im Probegespräch löchern. Das spart dir pro Bewerbung locker eine Stunde Formulierungsarbeit.',
                    'Schwach ist ChatGPT bei allem, was nur du weißt: welches Projekt wirklich deins war, welche Zahl stimmt, warum du genau zu dieser Firma willst. Gibst du das nicht mit, füllt die KI die Lücke mit freundlichen Allgemeinplätzen. Personaler erkennen die inzwischen am Geruch, wie ein Mechaniker ein falsch eingestelltes Ventil am Klang.',
                    'Die Faustregel für alles, was folgt: Fakten kommen von dir, Formulierung und Struktur von der KI, die Endkontrolle wieder von dir.',
                ],
            },
            {
                h: 'Lebenslauf mit ChatGPT optimieren',
                p: [
                    'Starte mit dem Lebenslauf, nicht mit dem Anschreiben. Er ist die Faktenbasis, aus der später alles andere entsteht. Die Vorlage „Lebenslauf optimieren“ nimmt deinen bisherigen Text und die Stellenanzeige und schlägt konkrete Änderungen vor: stärkere Verben, messbare Ergebnisse, passende Begriffe aus der Anzeige.',
                    'Lass dir die Änderungen als Liste geben und übernimm sie selbst. Wenn ChatGPT plötzlich von „Umsatz um 30 Prozent gesteigert“ schreibt und du nie eine Zahl genannt hast, fliegt der Satz raus. Erfundene Erfolge fallen spätestens im Gespräch auf, und dann ist die Stelle weg.',
                    'Praktisch: Bewahr den bereinigten Lebenslauf als Textdatei auf. Den gibst du für jede neue Bewerbung mit, statt jedes Mal von vorn zu erklären, wer du bist.',
                ],
            },
            {
                h: 'Anschreiben, das nicht nach KI klingt',
                p: [
                    'Die Vorlage „Anschreiben für die Bewerbung“ fragt Stelle, Firma, deine passenden Erfahrungen und deine Motivation ab. Genau diese Felder machen den Unterschied: Ein Anschreiben mit einem echten Grund, warum du zu dieser Firma willst, schlägt jedes Anschreiben mit perfekter Grammatik.',
                    'Danach kommt der wichtigste Schritt: Lies den Text laut. Alles, was du so nie sagen würdest, streichst du oder ersetzt es. Floskeln wie „mit großer Begeisterung“ oder „hiermit bewerbe ich mich“ fliegen sofort. Die Vorlage „Text entkitschen“ hilft beim Aufräumen, das Tutorial zum menschlichen Überarbeiten zeigt dir die typischen KI-Muster.',
                ],
            },
            {
                h: 'Vorstellungsgespräch üben mit ChatGPT als Gegenüber',
                p: [
                    'Hier ist ChatGPT am nützlichsten, weil es kein Text ist, den jemand anderes liest. Die Vorlage „Vorstellungsgespräch trainieren“ lässt ChatGPT die Rolle des Interviewers übernehmen: eine Frage nach der anderen, dann Feedback auf deine Antwort.',
                    'Bitte um die unangenehmen Fragen: Lücken im Lebenslauf, Wechselgründe, Schwächen. Die Antworten darauf willst du nicht zum ersten Mal im echten Gespräch formulieren. Das ist wie Elfmeterschießen im Training: Im Spiel ist es zu spät, um den Anlauf zu üben.',
                ],
            },
            {
                h: 'Gehaltsverhandlung vorbereiten',
                p: [
                    'Die Vorlage „Gehaltsverhandlung vorbereiten“ baut dir Argumente, Einstiegssatz und Antworten auf typische Einwände. Was sie nicht kann: dir eine verlässliche Gehaltszahl nennen. Sprachmodelle liefern hier oft plausibel klingende Spannen ohne Quelle.',
                    'Die Zahl holst du dir deshalb aus belegbaren Quellen wie Tarifverträgen, Gehaltsvergleichen deiner Branche oder Gesprächen mit Leuten im Job. ChatGPT bekommt sie dann als Vorgabe, nicht umgekehrt.',
                ],
            },
            {
                h: 'Arbeitszeugnis entschlüsseln',
                p: [
                    'Deutsche Arbeitszeugnisse sind eine eigene Sprache, in der „stets bemüht“ kein Lob ist. Die Vorlage „Arbeitszeugnis entschlüsseln“ übersetzt Formulierungen in Klartext und markiert Stellen, die du ansprechen solltest.',
                    'Nimm das Ergebnis als Gesprächsgrundlage, nicht als Gutachten. Willst du ein Zeugnis ernsthaft anfechten, gehört das zu einer Fachanwältin oder zum Betriebsrat, nicht in einen Chat.',
                ],
            },
            {
                h: 'Deine Daten: was du ChatGPT gibst und was nicht',
                p: [
                    'Bewerbungsunterlagen sind voller personenbezogener Daten. Bevor du sie hochlädst, entferne Adresse, Telefonnummer, Geburtsdatum und alles über Dritte, etwa Namen früherer Chefs. Für die Formulierung braucht ChatGPT das nicht.',
                    'In den Einstellungen unter „Data Controls“ kannst du laut OpenAI die Option „Improve the model for everyone“ abschalten. Dann werden deine Chats nicht mehr zum Training genutzt, bleiben aber im Verlauf. Temporäre Chats löscht OpenAI nach 30 Tagen und nutzt sie nicht fürs Training. Mehr dazu im DSGVO-Ratgeber.',
                ],
            },
        ],
        faq: [
            ['Merkt ein Personaler, dass ChatGPT mein Anschreiben geschrieben hat?', 'Oft ja, an Floskeln, glatter Struktur und fehlenden konkreten Details. Gib ChatGPT echte Beispiele aus deinem Job mit und überarbeite den Text danach selbst, dann klingt er nach dir.'],
            ['Kann ich meinen Lebenslauf bei ChatGPT hochladen?', 'Technisch ja, ChatGPT verarbeitet Dokumente wie DOCX und PDF. Entferne vorher Adresse, Telefonnummer und Geburtsdatum und schalte bei Bedarf das Modelltraining in den Data Controls ab.'],
            ['Kann ChatGPT mir sagen, wie viel Gehalt ich fordern soll?', 'Nicht verlässlich. Gehaltsspannen aus dem Chat haben meist keine Quelle. Hol dir die Zahl aus Tarifverträgen oder Gehaltsvergleichen und lass ChatGPT nur die Argumente dazu bauen.'],
            ['Welcher Prompt ist für den Anfang der wichtigste?', 'Der für den Lebenslauf. Ein sauberer, ehrlicher Lebenslauf ist die Faktenbasis für Anschreiben, LinkedIn-Profil und Gesprächsvorbereitung.'],
        ],
        links: [
            ['/prompts/lebenslauf-optimieren', 'Prompt: Lebenslauf optimieren'],
            ['/prompts/anschreiben-bewerbung', 'Prompt: Anschreiben für die Bewerbung'],
            ['/prompts/vorstellungsgespraech-training', 'Prompt: Vorstellungsgespräch trainieren'],
            ['/prompts/gehaltsverhandlung', 'Prompt: Gehaltsverhandlung vorbereiten'],
            ['/prompts/arbeitszeugnis-entschluesseln', 'Prompt: Arbeitszeugnis entschlüsseln'],
            ['/prompts/linkedin-profil', 'Prompt: LinkedIn-Profil schärfen'],
            ['/prompts/text-entkitschen', 'Prompt: Text entkitschen'],
            ['/prompts/kategorie/karriere', 'Alle Prompts für Bewerbung und Karriere'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/tutorials/ki-texte-menschlich-ueberarbeiten', 'Tutorial: KI-Texte menschlich überarbeiten'],
            ['/tools/chatgpt', 'ChatGPT im Steckbrief'],
            ['/ratgeber/ki-tools-datenschutz-dsgvo', 'KI-Tools und Datenschutz: DSGVO-Checkliste'],
            ['/ki-test/deutsch', 'KI-Test: Wer schreibt das beste Deutsch?'],
        ],
        quellen: [
            { titel: 'OpenAI Help Center: Data Controls FAQ', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
            { titel: 'OpenAI Help Center: Uploading files and audio to ChatGPT', url: 'https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'mit-chatgpt-uebersetzen',
        seoTitle: 'Mit ChatGPT übersetzen: so klappt es, und wann DeepL besser ist',
        title: 'Mit ChatGPT übersetzen: Glossar, Tonfall, Lokalisierung',
        description:
            'Wie du mit ChatGPT Texte übersetzt, die nach Muttersprache klingen: mit Glossar, Zielgruppe und Gegenprobe. Dazu ChatGPT Translate, der ehrliche Vergleich mit DeepL und zwei fertige Prompt-Vorlagen.',
        jean: 'Wörtlich übersetzt ist wie ein Moped mit Autoreifen: Es passt irgendwie, aber niemand fährt gern damit.',
        minutes: 7,
        sections: [
            {
                h: 'Warum ChatGPT anders übersetzt als ein klassischer Übersetzer',
                p: [
                    'Ein Chatbot übersetzt nicht nur, er schreibt neu. Das ist Stärke und Risiko zugleich: Du kannst ihm sagen, für wen der Text ist, welchen Ton er haben soll und welche Begriffe fest sind. Ohne diese Angaben entscheidet er selbst, und dann wird aus deinem lockeren Produkttext gern ein Behördenbrief.',
                    'Deshalb lohnt sich ChatGPT vor allem dort, wo Tonfall und Zielgruppe zählen: Marketingtexte, Newsletter, Produktseiten, Social Posts. Bei Verträgen, Gebrauchsanweisungen mit Sicherheitshinweisen oder amtlichen Dokumenten brauchst du am Ende trotzdem einen Menschen, der beide Sprachen beherrscht.',
                ],
            },
            {
                h: 'ChatGPT Translate: die schnelle Variante',
                p: [
                    'OpenAI bietet mit ChatGPT Translate eine eigene Übersetzungsseite an. Laut OpenAI übersetzt sie in mehr als 40 Sprachen und soll Bedeutung, Ton und Absicht des Originals beibehalten. Dazu gibt es Knöpfe, um das Ergebnis flüssiger, professioneller oder einfacher zu formulieren.',
                    'Für den kurzen Text zwischendurch reicht das. Sobald Fachbegriffe, Markennamen oder eine feste Anrede stimmen müssen, arbeitest du besser im normalen Chat mit einer Vorlage, in der du das alles vorgibst.',
                ],
            },
            {
                h: 'Übersetzen mit festem Glossar',
                p: [
                    'Die Vorlage „Mit ChatGPT übersetzen, mit festem Glossar“ ist für alles gedacht, was öfter vorkommt: Produktnamen, Fachbegriffe, Begriffe, die nie übersetzt werden dürfen. Du trägst sie einmal ein, und ChatGPT hält sich daran, statt aus „Akku“ mal „battery“ und mal „rechargeable pack“ zu machen.',
                    'Mein Tipp: Bau dir das Glossar als einfache Liste „Deutsch = Zielsprache“ und speicher sie. Arbeitest du regelmäßig mit denselben Begriffen, gehört sie in die Anweisungen eines ChatGPT-Projekts. Dann startet jeder Chat dort mit deinem Wörterbuch.',
                ],
            },
            {
                h: 'Lokalisieren statt nur übersetzen',
                p: [
                    'Ein Text für die Schweiz braucht kein ß, ein Text für die USA andere Maßeinheiten, und ein Witz über Fußball zündet in Kanada eher nicht. Die Vorlage „Text übersetzen und lokalisieren“ fragt Zielmarkt und Zielgruppe ab und passt Beispiele, Einheiten und Anrede an.',
                    'Lass dir die Änderungen am Ende auflisten: was ChatGPT bewusst anders gemacht hat und warum. So siehst du, ob die KI mitgedacht oder nur umformuliert hat.',
                ],
            },
            {
                h: 'Die Gegenprobe: so prüfst du eine Übersetzung',
                p: [
                    'Kannst du die Zielsprache nicht gut, nutze die Rückübersetzung: Lass einen neuen Chat den übersetzten Text zurück ins Deutsche bringen und vergleiche mit dem Original. Weicht der Sinn ab, stimmt etwas nicht.',
                    'Zahlen, Daten, Preise und Namen prüfst du immer selbst, Zeichen für Zeichen. Genau dort schleichen sich die teuren Fehler ein. Die Vorlage „ChatGPT-Antwort gegenprüfen“ hilft, Behauptungen im Text systematisch abzuklopfen.',
                ],
            },
            {
                h: 'ChatGPT oder DeepL?',
                p: [
                    'DeepL ist ein spezialisierter Übersetzer. Laut DeepL-Preisseite übersetzt die kostenlose Version 50.000 Zeichen pro Monat, ein Dokument pro Monat bis 5 MB und bietet ein Glossar mit bis zu fünf Einträgen pro Sprachkombination. Die bezahlten Tarife heben diese Grenzen an und schließen laut Anbieter die Nutzung deiner Daten fürs Modelltraining aus.',
                    'Meine Arbeitsteilung: Ganze Dokumente mit Layout und große Mengen gehen an DeepL. Texte, bei denen Ton und Zielgruppe zählen, gehen an ChatGPT mit Glossar-Vorlage. Wie DeepL im Vergleich zu Grammarly und QuillBot abschneidet, steht im Tool-Vergleich.',
                ],
            },
            {
                h: 'Vertrauliches nur mit Vorsicht übersetzen',
                p: [
                    'Kundendaten, Verträge und interne Zahlen haben in einem privaten Chat-Konto nichts verloren, solange das Modelltraining aktiv ist. Laut OpenAI schaltest du es unter Data Controls mit „Improve the model for everyone“ ab. Für Firmen gelten die Business-Tarife mit eigenen Regeln, die Details stehen im DSGVO-Ratgeber.',
                ],
            },
        ],
        faq: [
            ['Ist ChatGPT besser als DeepL?', 'Kommt auf den Text an. DeepL ist stark bei Dokumenten und großen Mengen, ChatGPT bei Texten, deren Ton du steuern willst. Mit Glossar und Zielgruppe im Prompt liefert ChatGPT oft natürlichere Marketingtexte.'],
            ['Was ist ChatGPT Translate?', 'Eine eigene Übersetzungsseite von OpenAI. Laut OpenAI unterstützt sie über 40 Sprachen und kann das Ergebnis per Knopfdruck flüssiger, professioneller oder einfacher formulieren.'],
            ['Wie sorge ich dafür, dass Fachbegriffe gleich bleiben?', 'Mit einem Glossar im Prompt: eine Liste aus Begriff und fester Übersetzung. Die Vorlage „Mit ChatGPT übersetzen, mit festem Glossar“ hat dafür ein eigenes Feld.'],
            ['Wie prüfe ich eine Übersetzung in einer Sprache, die ich nicht kann?', 'Lass sie in einem neuen Chat zurück ins Deutsche übersetzen und vergleiche den Sinn. Zahlen, Namen und Preise prüfst du immer selbst.'],
        ],
        links: [
            ['/prompts/chatgpt-uebersetzen-mit-glossar', 'Prompt: Mit ChatGPT übersetzen, mit festem Glossar'],
            ['/prompts/uebersetzen-lokalisieren', 'Prompt: Text übersetzen und lokalisieren'],
            ['/prompts/chatgpt-antwort-gegenpruefen', 'Prompt: ChatGPT-Antwort gegenprüfen'],
            ['/prompts/kategorie/content', 'Alle Prompts für Content und Text'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/tool-vergleiche/deepl-vs-grammarly-vs-quillbot', 'DeepL vs. Grammarly vs. QuillBot'],
            ['/tools/deepl', 'DeepL im Steckbrief'],
            ['/tools/chatgpt', 'ChatGPT im Steckbrief'],
            ['/ki-test/deutsch', 'KI-Test: Wer schreibt das beste Deutsch?'],
            ['/ratgeber/ki-tools-datenschutz-dsgvo', 'KI-Tools und Datenschutz: DSGVO-Checkliste'],
        ],
        quellen: [
            { titel: 'OpenAI: ChatGPT Translate', url: 'https://chatgpt.com/de-DE/translate/' },
            { titel: 'DeepL: Tarife und Funktionen im Vergleich', url: 'https://www.deepl.com/de/pro' },
            { titel: 'OpenAI Help Center: Data Controls FAQ', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'prompt-vorlagen',
        seoTitle: 'Prompt-Vorlagen auf Deutsch: die Bibliothek zum Ausfüllen',
        title: 'Prompt-Vorlagen: so findest und nutzt du die passende',
        description:
            'Kostenlose Prompt-Vorlagen auf Deutsch für SEO, Content, Video, Launch, Business, Shop, Karriere, Lernen und Technik. Wie die Vorlagen aufgebaut sind, wie du sie ausfüllst und wann du lieber eine eigene baust.',
        jean: 'Eine gute Vorlage ist wie ein gut sortierter Werkzeugkasten: Du suchst nicht, du greifst zu.',
        minutes: 6,
        sections: [
            {
                h: 'Was eine Prompt-Vorlage von einem Prompt unterscheidet',
                p: [
                    'Ein fertiger Prompt aus dem Netz passt auf die Situation dessen, der ihn geschrieben hat. Eine Vorlage hat Lücken für deine Situation: Thema, Zielgruppe, Zweck, Tonfall. Genau diese Angaben entscheiden, ob die KI etwas Brauchbares liefert oder den Durchschnitt aller Texte, die sie je gesehen hat.',
                    'Jede Vorlage in der mentat.codes-Bibliothek hat deshalb Felder mit Beispielen. Du füllst sie aus, siehst die Vorschau und schickst den fertigen Prompt mit einem Klick an ChatGPT, Claude oder einen anderen Chat.',
                ],
            },
            {
                h: 'Die Kategorien im Überblick',
                p: [
                    'Die Vorlagen sind in neun Kategorien sortiert: SEO, Content und Text, Video und YouTube, Launch und Marketing, Business und Arbeit, Onlineshop, Bewerbung und Karriere, Lernen und Erklären sowie Excel, Code und Technik.',
                    'Wenn du nicht weißt, wo du anfangen sollst: Die meisten nutzen zuerst „Prompt verbessern“, „Text zusammenfassen“ und „E-Mail-Antwort“. Die drei decken einen erstaunlich großen Teil des Büroalltags ab.',
                ],
            },
            {
                h: 'So sind die Vorlagen gebaut',
                p: [
                    'Jede Vorlage folgt demselben Muster: Kontext, Aufgabe, Platzhalter, Ausgabeformat. Wo es hilft, kommen Techniken wie Rollen, Rückfragen, Selbstkritik oder Beispiele dazu. Welche Technik in einer Vorlage steckt, steht auf der jeweiligen Seite, damit du beim Benutzen nebenbei lernst, warum sie funktioniert.',
                    'Bewusst nicht drin: Großbuchstaben-Befehle und Drohungen an die KI. Klare Angaben bringen mehr als Lautstärke, das empfiehlt auch OpenAI in seinen Hinweisen zum Prompt Engineering.',
                ],
            },
            {
                h: 'Vorlagen für ein bestimmtes Tool',
                p: [
                    'Manche Vorlagen sind für ein bestimmtes Werkzeug geschrieben, etwa für Projekte, Bilder oder Tabellen in ChatGPT. Die findest du gesammelt auf der Seite mit den ChatGPT-Prompts. Die meisten anderen Vorlagen sind anbieterneutral und laufen genauso in Claude, Gemini oder Copilot.',
                    'Bei Bild-, Musik- und Video-Tools sieht ein Prompt anders aus als im Chat. Dafür gibt es das Tutorial zu Bild-Prompts.',
                ],
            },
            {
                h: 'Das Prompt-Archiv: Rollen-Prompts zum Stöbern',
                p: [
                    'Zusätzlich zur Bibliothek gibt es das Prompt-Archiv mit übersetzten Rollen-Prompts aus prompts.chat, einem großen offenen Prompt-Projekt auf GitHub. Die sind kürzer und allgemeiner als die Vorlagen, dafür gibt es Rollen vom Werbetexter bis zum Koch.',
                    'Nimm sie als Ideenkiste. Für Ergebnisse, die du wirklich verwendest, ergänzt du Kontext und Format, oder du greifst gleich zur passenden Vorlage.',
                ],
            },
            {
                h: 'Eigene Vorlage bauen',
                p: [
                    'Fehlt dir eine Vorlage, bau sie im Prompt-Baukasten: Rolle, Aufgabe, Kontext, Format und Ton auswählen, der Baukasten setzt den Prompt zusammen und bewertet ihn. Hast du schon einen Prompt, zeigt dir der Prompt-Check, wo er wackelt.',
                    'Was du jede Woche brauchst, speicherst du dauerhaft: in den Anweisungen eines ChatGPT- oder Claude-Projekts oder als Skill. Wie das geht, steht im Ratgeber zu KI-Skills.',
                ],
            },
        ],
        faq: [
            ['Sind die Prompt-Vorlagen kostenlos?', 'Ja. Du füllst die Felder im Browser aus und kopierst den Prompt oder schickst ihn direkt an einen Chat. Eine Anmeldung brauchst du dafür nicht.'],
            ['Funktionieren die Vorlagen nur mit ChatGPT?', 'Nein, die meisten sind anbieterneutral und laufen auch in Claude, Gemini oder Copilot. Vorlagen für ChatGPT-Funktionen wie Projekte findest du gesammelt auf der Seite mit den ChatGPT-Prompts.'],
            ['Warum haben die Vorlagen Felder statt fertiger Texte?', 'Weil Zielgruppe, Zweck und Kontext den Unterschied machen. Ein Prompt mit deinen Angaben schlägt jeden allgemeinen Prompt.'],
            ['Was mache ich, wenn keine Vorlage passt?', 'Bau dir im Prompt-Baukasten eine eigene oder lass einen vorhandenen Prompt mit der Vorlage „Prompt verbessern“ überarbeiten.'],
        ],
        links: [
            ['/prompts', 'Alle Prompt-Vorlagen'],
            ['/prompts/kategorie/seo', 'Prompts für SEO'],
            ['/prompts/kategorie/content', 'Prompts für Content und Text'],
            ['/prompts/kategorie/video', 'Prompts für Video und YouTube'],
            ['/prompts/kategorie/launch', 'Prompts für Launch und Marketing'],
            ['/prompts/kategorie/business', 'Prompts für Business und Arbeit'],
            ['/prompts/kategorie/shop', 'Prompts für Onlineshops'],
            ['/prompts/kategorie/karriere', 'Prompts für Bewerbung und Karriere'],
            ['/prompts/kategorie/lernen', 'Prompts für Lernen und Erklären'],
            ['/prompts/kategorie/technik', 'Prompts für Excel, Code und Technik'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/prompts/archiv', 'Prompt-Archiv: Rollen-Prompts'],
            ['/prompts/prompt-verbessern', 'Prompt: Prompt verbessern'],
            ['/prompt-baukasten', 'Prompt-Baukasten'],
            ['/prompt-check', 'Prompt-Check'],
            ['/tutorials/bild-prompts-schreiben', 'Tutorial: Bild-Prompts schreiben'],
            ['/ratgeber/ki-skills-wiederkehrende-aufgaben', 'Ratgeber: KI-Skills für wiederkehrende Aufgaben'],
        ],
        quellen: [
            { titel: 'OpenAI Help Center: Prompt engineering best practices for ChatGPT', url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt' },
            { titel: 'prompts.chat (GitHub): Quelle des Prompt-Archivs', url: 'https://github.com/f/prompts.chat' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'chatgpt-excel',
        seoTitle: 'ChatGPT und Excel: Formeln, Auswertung, Add-in',
        title: 'ChatGPT und Excel: Formeln bauen, Tabellen auswerten, Daten bereinigen',
        description:
            'Wie du ChatGPT für Excel und Google Sheets nutzt: Formeln erklären lassen, Tabellen hochladen und auswerten, Daten bereinigen, SQL schreiben. Plus das offizielle Add-in ChatGPT für Excel und was du vor dem Hochladen beachten solltest.',
        jean: 'SVERWEIS hat mich früher mehr Nerven gekostet als jede verrostete Schraube. Heute erklärt ihn mir ChatGPT in zwei Sätzen.',
        minutes: 8,
        sections: [
            {
                h: 'Drei Wege, wie ChatGPT und Excel zusammenkommen',
                p: [
                    'Erstens: Du beschreibst im Chat, was du brauchst, und bekommst eine Formel zurück, die du selbst einfügst. Zweitens: Du lädst die Tabelle hoch und lässt ChatGPT sie auswerten. Drittens: Du holst ChatGPT als Add-in direkt in Excel oder Google Sheets.',
                    'Welcher Weg passt, hängt davon ab, ob ChatGPT deine Daten sehen soll. Für eine Formel reicht die Beschreibung der Spalten. Für eine Auswertung braucht die KI die Datei, und dann gelten die Regeln zum Datenschutz weiter unten.',
                ],
            },
            {
                h: 'Formeln bauen und verstehen',
                p: [
                    'Die Vorlage „Excel- oder Google-Sheets-Formel bauen“ fragt ab, was in welchen Spalten steht und was herauskommen soll. Zurück kommt die Formel mit Erklärung und den Fällen, in denen sie scheitert, etwa leere Zellen oder Text statt Zahlen.',
                    'Schreib immer dazu, ob du Excel oder Google Sheets nutzt und in welcher Sprache. Deutsche Excel-Versionen nutzen deutsche Funktionsnamen und Semikolons als Trennzeichen. Fehlt die Angabe, bekommst du gern eine englische Formel, die bei dir nur Fehler wirft.',
                ],
            },
            {
                h: 'Tabelle hochladen und auswerten lassen',
                p: [
                    'Laut OpenAI kann ChatGPT Tabellen im Format XLS, XLSX und CSV analysieren, Tabellen und Diagramme erzeugen und für Berechnungen Python-Code in einer Notebook-Umgebung ausführen. Diese Umgebung kann keine Webseiten oder Schnittstellen abrufen, externe Daten musst du also mitliefern.',
                    'Die Vorlage „Excel-Tabelle mit ChatGPT auswerten“ verlangt nachvollziehbare Rechenwege statt Bauchgefühl. Das ist wichtig: OpenAI empfiehlt selbst, den erzeugten Code, die Ergebnisse und die Annahmen zu prüfen, bevor du dich darauf verlässt.',
                    'Damit die Auswertung klappt, rät OpenAI zu klaren Spaltenüberschriften in der ersten Zeile, einer Zeile pro Datensatz und keinen mehreren Tabellen auf einem Blatt. Werte in eingescannten Tabellen oder Bildern liest ChatGPT laut Hilfe-Center nicht zuverlässig aus.',
                ],
            },
            {
                h: 'Daten bereinigen: Dubletten, Formate, Tippfehler',
                p: [
                    'Unordentliche Listen sind der Klassiker: dieselbe Firma dreimal anders geschrieben, Datumsangaben in vier Formaten, Leerzeichen am Zeilenende. Die Vorlage „Tabelle bereinigen“ liefert dir Schritte und Formeln, mit denen du das selbst in Excel aufräumst.',
                    'Der Vorteil dieses Wegs: Deine Daten bleiben auf deinem Rechner. Du beschreibst nur die Spalten und ein, zwei erfundene Beispielzeilen, ChatGPT liefert das Rezept.',
                ],
            },
            {
                h: 'Wenn die Tabelle zu groß wird: SQL',
                p: [
                    'Liegen deine Daten in einer Datenbank statt in Excel, übersetzt die Vorlage „SQL-Abfrage aus einer Frage“ deine Frage in normaler Sprache in eine erklärte Abfrage. Gib die Tabellennamen und Spalten mit, sonst rät die KI Namen, die es bei dir nicht gibt.',
                    'Lass Abfragen, die etwas ändern oder löschen, nie ungeprüft laufen. Erst an einer Kopie testen, dann im Original.',
                ],
            },
            {
                h: 'ChatGPT für Excel: das Add-in',
                p: [
                    'OpenAI bietet ChatGPT für Excel und Google Sheets als Seitenleiste direkt in der Tabelle an. Laut Hilfe-Center steht es Free, Go, Plus und Pro sowie Business, Enterprise, Edu und K-12 zur Verfügung. In Excel findest du es unter Start, Add-Ins, Suche nach „ChatGPT“, in Google Sheets über den Google Workspace Marketplace.',
                    'Das Add-in kann laut OpenAI Tabellen anlegen, erklären und ändern, auch große Dateien mit mehreren Blättern. OpenAI rät, genau zu sagen, was erhalten bleiben soll, bei großen Änderungen erst einen Plan zu verlangen und wichtige Dateien vorher zu duplizieren. Den letzten Rat würde ich doppelt unterstreichen.',
                ],
            },
            {
                h: 'Was nicht in den Upload gehört',
                p: [
                    'Kundenlisten, Gehälter, Gesundheitsdaten: Alles mit Personenbezug lädst du in ein privates Konto nur, wenn du das darfst und das Modelltraining in den Data Controls abgeschaltet hast. Oft reicht es, Namen durch Nummern zu ersetzen, bevor die Datei den Rechner verlässt.',
                    'Laut OpenAI gilt für Tabellen eine Größengrenze von etwa 50 MB je Datei, abhängig von der Zeilengröße. Scheint eine Auswertung unvollständig, teil die Datei auf oder nenn ChatGPT die Blätter und Spalten, um die es geht.',
                ],
            },
        ],
        faq: [
            ['Kann ChatGPT Excel-Dateien lesen?', 'Ja. Laut OpenAI analysiert ChatGPT XLS-, XLSX- und CSV-Dateien, erstellt Tabellen und Diagramme und rechnet mit Python. Klare Spaltenüberschriften und eine Zeile pro Datensatz helfen.'],
            ['Gibt es ChatGPT direkt in Excel?', 'Ja, als Add-in „ChatGPT für Excel“. Laut OpenAI ist es in allen privaten Tarifen von Free bis Pro und in den Business-, Enterprise-, Edu- und K-12-Tarifen verfügbar.'],
            ['Warum funktioniert die Formel von ChatGPT in meinem Excel nicht?', 'Häufigster Grund: Sprache und Trennzeichen. Deutsche Excel-Versionen nutzen deutsche Funktionsnamen und Semikolons. Schreib im Prompt dazu, welche Version und Sprache du nutzt.'],
            ['Kann ich ChatGPT-Auswertungen blind übernehmen?', 'Nein. OpenAI empfiehlt selbst, Code, Ergebnisse und Annahmen zu prüfen. Lass dir den Rechenweg zeigen und kontrollier Stichproben von Hand.'],
            ['Wie groß darf eine Tabelle sein?', 'Laut OpenAI-Hilfe etwa 50 MB je Tabellendatei, abhängig von der Zeilengröße. Bei sehr großen oder unübersichtlichen Dateien hilft Aufteilen.'],
        ],
        links: [
            ['/prompts/excel-formel', 'Prompt: Excel- oder Google-Sheets-Formel bauen'],
            ['/prompts/chatgpt-excel-tabelle-auswerten', 'Prompt: Excel-Tabelle mit ChatGPT auswerten'],
            ['/prompts/daten-bereinigen', 'Prompt: Tabelle bereinigen'],
            ['/prompts/sql-abfrage', 'Prompt: SQL-Abfrage aus einer Frage'],
            ['/prompts/regex-bauen', 'Prompt: Regex bauen'],
            ['/prompts/kategorie/technik', 'Alle Prompts für Excel, Code und Technik'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/tools/chatgpt', 'ChatGPT im Steckbrief'],
            ['/tools/microsoft-copilot', 'Microsoft Copilot im Steckbrief'],
            ['/ki-test/logik', 'KI-Test: Logik und Rechnen'],
            ['/ratgeber/ki-tools-datenschutz-dsgvo', 'KI-Tools und Datenschutz: DSGVO-Checkliste'],
        ],
        quellen: [
            { titel: 'OpenAI Help Center: Data analysis with ChatGPT', url: 'https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt' },
            { titel: 'OpenAI Help Center: ChatGPT for Excel and Google Sheets', url: 'https://help.openai.com/en/articles/20001063-chatgpt-for-excel' },
            { titel: 'OpenAI Help Center: Uploading files and audio to ChatGPT', url: 'https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt' },
            { titel: 'OpenAI Help Center: Data Controls FAQ', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'chatgpt-agent-erklaert',
        seoTitle: 'ChatGPT Agent erklärt: was aus dem Agentenmodus wurde',
        title: 'ChatGPT Agent erklärt: vom Agentenmodus zu ChatGPT Work',
        description:
            'Den ChatGPT-Agenten gibt es laut OpenAI nicht mehr, seine Aufgaben übernimmt ChatGPT Work mit Cloud-Browser. Was Work kann, in welchen Tarifen es läuft, wie du ihm gute Aufträge gibst und wo die Risiken liegen.',
        jean: 'Ein Agent ist wie ein Azubi mit Werkstattschlüssel: fleißig, schnell, und du willst trotzdem wissen, was er gerade aufschraubt.',
        minutes: 8,
        sections: [
            {
                h: 'Was war der ChatGPT-Agent?',
                p: [
                    'Der ChatGPT-Agent war ein Modus, in dem ChatGPT nicht nur antwortete, sondern in einem eigenen virtuellen Browser Webseiten öffnete, klickte, Formulare ausfüllte und Aufgaben über mehrere Schritte abarbeitete. Gestartet wurde er über das Werkzeug-Menü oder mit /agent im Eingabefeld.',
                    'Wer jetzt danach sucht, findet im OpenAI-Hilfe-Center einen klaren Satz: Der ChatGPT-Agent ist nicht mehr verfügbar. Für längere Aufgaben über mehrere Schritte und fertige Ergebnisse verweist OpenAI auf ChatGPT Work, für Arbeit im Browser auf den Cloud-Browser.',
                ],
            },
            {
                h: 'Der Nachfolger: ChatGPT Work',
                p: [
                    'ChatGPT ist laut OpenAI jetzt in zwei Bereiche geteilt: Chat für schnelle Fragen und Work, einen Agenten für längere Aufgaben mit fertigem Ergebnis. Work recherchiert, analysiert und erstellt Dokumente, Tabellen, Präsentationen, Berichte oder Websites. Es kann verbundene Apps und Plugins nutzen und im Desktop-Programm auch lokale Dateien.',
                    'Laut OpenAI-Produktseite steht Work in der Desktop-App allen Tarifen offen, im Web und auf dem Handy den Tarifen Plus, Pro, Business, Enterprise und Edu. In einem Plan-Modus sammelt Work erst Kontext, stellt Rückfragen und legt dir einen Schritt-für-Schritt-Plan zur Freigabe vor.',
                ],
            },
            {
                h: 'Der Cloud-Browser: der Teil, der früher Agent hieß',
                p: [
                    'Für Webseiten nutzt Work einen eigenen Browser auf einem Rechner in der Cloud. Laut OpenAI kann er Seiten lesen, Knöpfe drücken, Formulare ausfüllen und auch auf Seiten arbeiten, auf denen du angemeldet bist. Verfügbar ist er in Work für bezahlte Tarife in unterstützten Regionen, Free und Go sind ausgenommen.',
                    'Den Cloud-Browser wählst du nicht extra aus, ChatGPT entscheidet selbst, wann er nötig ist. Gibt es für die Aufgabe eine verbundene App oder ein Plugin, nutzt ChatGPT laut OpenAI eher das. Die Aufgabe läuft weiter, auch wenn du den Rechner zuklappst, und pausiert, wenn sie eine Anmeldung oder Bestätigung braucht.',
                ],
            },
            {
                h: 'So formulierst du einen Auftrag, der funktioniert',
                p: [
                    'OpenAI rät, Work das gewünschte Ergebnis, die Quellen, Grenzen, Qualitätsmaßstäbe und den Punkt zu nennen, an dem es für eine Freigabe anhalten soll. Genau so sind die beiden Vorlagen aufgebaut: „Klarer Auftrag für einen KI-Agenten“ für jeden Agenten und „Auftrag für den ChatGPT-Agenten formulieren“ mit Aufgabe, Verboten und Ergebnisform.',
                    'Die zweite Vorlage stammt noch aus der Zeit des Agentenmodus. Den Text kannst du unverändert in Work einfügen, denn Ziel, Grenzen und Ergebnisformat braucht Work genauso. Das Tutorial „KI-Agenten verstehen“ erklärt die Grundlagen dahinter in sieben Schritten.',
                ],
            },
            {
                h: 'Geplante und ausgelöste Aufgaben',
                p: [
                    'Aufgaben lassen sich einmalig, regelmäßig oder als Überwachung einrichten, die sich nur bei Änderungen meldet. Alles landet laut OpenAI auf der Seite „Scheduled“, wo du Aufgaben prüfst, pausierst oder löschst. Free-Nutzer können eine Aufgabe höchstens einmal täglich wiederholen lassen.',
                    'Neu sind Aufgaben, die auf Ereignisse reagieren, etwa eine neue Mail in Gmail, eine Nachricht in Slack oder eine Aktivität auf GitHub. Die gibt es laut OpenAI für berechtigte Nutzer in Plus, Pro, Business, Enterprise und Edu, nicht in Free und Go.',
                ],
            },
            {
                h: 'Sicherheit: Anmeldungen, Freigaben, Prompt-Injection',
                p: [
                    'Muss sich der Cloud-Browser irgendwo anmelden, nutzt du laut OpenAI ein gesichertes Anmeldeformular. Benutzername und Passwort gehen direkt an den entfernten Browser, das Modell sieht sie nicht und ChatGPT speichert sie nicht. Passwörter oder Zahlungsdaten tippst du nie in den Chat.',
                    'Unter Einstellungen, Cloud browser legst du fest, ob ChatGPT vor jeder neuen Website fragt, selbst prüft oder alles darf. „Always allow“ empfiehlt OpenAI ausdrücklich nicht. Bleib bei „Always ask“, bis du Work kennst. OpenAI testet gegen Prompt-Injection und Phishing, schreibt aber selbst, dass diese Schutzmaßnahmen nicht jedes Risiko ausschließen.',
                ],
            },
            {
                h: 'Wofür sich ChatGPT Work lohnt und wofür nicht',
                p: [
                    'Lohnt sich: Recherchen mit Vergleichstabelle, Berichte aus mehreren Dateien, wiederkehrende Wochenübersichten, Formulararbeit, bei der du am Ende selbst auf Absenden drückst. Laut OpenAI ist Work für umfangreiche Aufgaben gedacht, für schnelle Fragen und kurze Umformulierungen bleibst du besser im Chat.',
                    'Lohnt sich nicht: alles, was ohne deine Kontrolle Geld ausgibt, Verträge abschließt oder Nachrichten in deinem Namen verschickt. Welche Agenten es in Deutschland sonst noch gibt und was sie kosten, steht im Ratgeber zu KI-Agenten für Selbstständige.',
                ],
            },
        ],
        faq: [
            ['Gibt es den ChatGPT-Agenten noch?', 'Nein. Laut OpenAI-Hilfe-Center ist der ChatGPT-Agent nicht mehr verfügbar. Längere Aufgaben übernimmt ChatGPT Work, Arbeit auf Webseiten der Cloud-Browser in Work.'],
            ['Welche Tarife können ChatGPT Work nutzen?', 'Laut OpenAI-Produktseite alle Tarife in der Desktop-App, im Web und mobil Plus, Pro, Business, Enterprise und Edu. Den Cloud-Browser gibt es nur in bezahlten Tarifen ohne Free und Go.'],
            ['Sieht ChatGPT meine Passwörter, wenn der Cloud-Browser sich anmeldet?', 'Laut OpenAI nicht. Zugangsdaten gibst du in ein gesichertes Formular ein, sie gehen direkt an den entfernten Browser, sind für das Modell nicht sichtbar und werden nicht gespeichert.'],
            ['Funktionieren meine alten Agenten-Prompts noch?', 'Ja, sinngemäß. Ein guter Auftrag mit Ziel, Grenzen und Ergebnisformat funktioniert in Work genauso. Ersetz nur Hinweise auf den Agentenmodus oder /agent.'],
        ],
        links: [
            ['/prompts/ki-agent-auftrag', 'Prompt: Klarer Auftrag für einen KI-Agenten'],
            ['/prompts/chatgpt-agent-auftrag', 'Prompt: Auftrag für ChatGPT formulieren'],
            ['/prompts/automatisierung-planen', 'Prompt: Automatisierung planen'],
            ['/prompts/chatgpt-deep-research-auftrag', 'Prompt: Deep-Research-Auftrag'],
            ['/tutorials/ki-agenten-verstehen', 'Tutorial: KI-Agenten verstehen und sinnvoll einsetzen'],
            ['/ratgeber/ki-agenten-selbststaendige-deutschland', 'Ratgeber: KI-Agenten für Selbstständige in Deutschland'],
            ['/glossar/ki-agent', 'Was ist ein KI-Agent?'],
            ['/glossar/agentischer-workflow', 'Was ist ein agentischer Workflow?'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/tools/chatgpt', 'ChatGPT im Steckbrief'],
            ['/tool-vergleiche/make-vs-zapier-vs-n8n', 'Make vs. Zapier vs. n8n'],
        ],
        quellen: [
            { titel: 'OpenAI Help Center: ChatGPT agent', url: 'https://help.openai.com/en/articles/11752874-chatgpt-agent' },
            { titel: 'OpenAI Help Center: ChatGPT Work and Codex', url: 'https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex' },
            { titel: 'OpenAI: ChatGPT Work (Produktseite mit Verfügbarkeit)', url: 'https://chatgpt.com/work/' },
            { titel: 'OpenAI Help Center: Using cloud browser in ChatGPT', url: 'https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt' },
            { titel: 'OpenAI Help Center: Scheduled tasks in ChatGPT', url: 'https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt' },
            { titel: 'ChatGPT Learn: Get started with ChatGPT Work', url: 'https://learn.chatgpt.com/docs/get-started-with-work' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'seo-prompts-chatgpt',
        seoTitle: 'SEO-Prompts für ChatGPT: Keywords, Meta, Briefing, Linkaufbau',
        title: 'SEO-Prompts für ChatGPT: was die KI übernimmt und was dein SEO-Tool',
        description:
            'Die besten SEO-Prompts für ChatGPT: Keyword-Cluster, Meta-Title, Content-Briefing, interne Verlinkung, FAQ und Content-Refresh. Plus ehrlich erklärt, wofür du weiter Semrush, SE Ranking oder Surfer brauchst.',
        jean: 'Ich mache SEO beruflich. ChatGPT spart mir jeden Tag Zeit, aber Suchvolumen erfindet es mit derselben Überzeugung wie ein Gebrauchtwagenhändler den Kilometerstand.',
        minutes: 8,
        sections: [
            {
                h: 'Die Arbeitsteilung: ChatGPT schreibt, das SEO-Tool misst',
                p: [
                    'ChatGPT ist gut im Ordnen, Formulieren und Strukturieren. Was es nicht hat, sind echte Messdaten: Suchvolumen, Keyword-Schwierigkeit, Rankings, Backlinks. Fragst du trotzdem danach, bekommst du Zahlen, die plausibel klingen und aus keiner Datenbank stammen.',
                    'Die Arbeitsteilung, die sich bei mir bewährt hat: Daten kommen aus einem SEO-Tool wie Semrush, SE Ranking oder Surfer. Die Daten gehen als Export in den Prompt. ChatGPT macht daraus Cluster, Briefings und Texte. Am Ende prüft ein Mensch, ob es zur Suchabsicht passt.',
                ],
            },
            {
                h: 'Keywords clustern',
                p: [
                    'Die Vorlage „Keyword-Cluster“ nimmt eine Keyword-Liste und sortiert sie nach Suchabsicht in Gruppen, die je eine Seite bekommen. Das spart dir die Stunde mit der Tabelle, in der du jedes Keyword von Hand einer Seite zuordnest.',
                    'Gib die Liste mit Suchvolumen aus deinem Tool mit, dann kann ChatGPT innerhalb jedes Clusters das Hauptkeyword wählen. Ohne Zahlen rät es, welches Keyword wichtiger ist.',
                ],
            },
            {
                h: 'Meta-Title und Description',
                p: [
                    'Die Vorlage „Meta-Title und Description“ liefert mehrere Varianten mit Zeichenzahl. Für Seiten, die schon ranken, lohnt der Blick in die Search Console: Mit welchen Suchanfragen wird die Seite angezeigt, aber selten geklickt? Diese Anfragen gibst du ChatGPT mit, damit der neue Titel sie trifft.',
                ],
            },
            {
                h: 'Content-Briefing und Gliederung',
                p: [
                    'Die Vorlage „Content-Briefing“ erstellt aus Keyword, Zielgruppe und Suchabsicht ein Briefing mit Gliederung, Fragen und Pflichtangaben. Die Vorlage „Blogartikel gliedern“ ist die schlanke Variante, wenn du selbst schreibst.',
                    'Ein Content-Editor wie Surfer misst zusätzlich, welche Begriffe die rankenden Seiten nutzen. Das kann ChatGPT allein nicht wissen, weil es die aktuellen Suchergebnisse nicht systematisch auswertet. Wie die drei Tools sich unterscheiden, steht im Vergleich Semrush vs. SE Ranking vs. Surfer SEO.',
                ],
            },
            {
                h: 'Bestehende Inhalte verbessern',
                p: [
                    'Die schnellsten SEO-Gewinne stecken oft in alten Seiten. Die Vorlage „Content-Refresh“ prüft einen vorhandenen Artikel auf veraltete Angaben, Lücken und fehlende Fragen. „Interne Verlinkung“ schlägt passende Links zwischen deinen Seiten vor, „FAQ aus Suchfragen“ baut aus echten Fragen einen FAQ-Block.',
                    'Für Bilder gibt es „Alt-Texte schreiben“. Das ist Kleinkram, aber Kleinkram, der sonst nie gemacht wird.',
                ],
            },
            {
                h: 'Was Google zu KI-Texten sagt',
                p: [
                    'Google bewertet laut Search Central die Qualität eines Inhalts, nicht wie er entstanden ist. KI einzusetzen, um vor allem Rankings zu manipulieren, ist dagegen ein Verstoß gegen die Spam-Richtlinien. Nützliche Inhalte mit KI-Hilfe sind erlaubt, Massenware ohne Mehrwert nicht.',
                    'Für dich heißt das: ChatGPT liefert den Rohbau, du lieferst Erfahrung, Beispiele und geprüfte Fakten. Dass Inhalte inzwischen auch in KI-Antworten auftauchen sollen, ist ein eigenes Thema, das der Ratgeber zur Sichtbarkeit in KI-Antworten behandelt.',
                ],
            },
            {
                h: 'Vom Einzelprompt zum Ablauf',
                p: [
                    'Machst du dieselben SEO-Schritte jede Woche, lohnt ein fester Ablauf statt einzelner Prompts. In der Rubrik Skills liegen fertige Anleitungen für ein SEO-Audit, strukturierte Daten und KI-Sichtbarkeit, die du in Claude, ChatGPT und andere Agenten laden kannst.',
                ],
            },
        ],
        faq: [
            ['Kann ChatGPT Suchvolumen ermitteln?', 'Nicht verlässlich. Zahlen aus dem Chat stammen aus keiner Keyword-Datenbank. Suchvolumen und Keyword-Schwierigkeit holst du aus Tools wie Semrush oder SE Ranking und gibst sie ChatGPT mit.'],
            ['Bestraft Google Texte, die mit ChatGPT geschrieben wurden?', 'Laut Google zählt die Qualität, nicht die Entstehung. Wer KI vor allem nutzt, um Rankings zu manipulieren, verstößt aber gegen die Spam-Richtlinien.'],
            ['Welche SEO-Prompts lohnen sich zuerst?', 'Meta-Title und Description für Seiten mit vielen Impressionen und wenigen Klicks, dann Content-Refresh für alte Artikel. Beides bringt schnell messbare Ergebnisse.'],
            ['Brauche ich neben ChatGPT noch ein SEO-Tool?', 'Für ernsthaftes SEO ja. ChatGPT hat keine eigenen Ranking-, Keyword- oder Backlink-Daten. Welches Tool zu dir passt, zeigt der Vergleich Semrush vs. SE Ranking vs. Surfer SEO.'],
        ],
        links: [
            ['/prompts/kategorie/seo', 'Alle SEO-Prompts'],
            ['/prompts/keyword-cluster', 'Prompt: Keyword-Cluster'],
            ['/prompts/meta-title-description', 'Prompt: Meta-Title und Description'],
            ['/prompts/content-briefing', 'Prompt: Content-Briefing'],
            ['/prompts/blogartikel-gliederung', 'Prompt: Blogartikel gliedern'],
            ['/prompts/content-refresh', 'Prompt: Content-Refresh'],
            ['/prompts/interne-verlinkung', 'Prompt: Interne Verlinkung'],
            ['/prompts/faq-aus-suchfragen', 'Prompt: FAQ aus Suchfragen'],
            ['/prompts/alt-texte', 'Prompt: Alt-Texte schreiben'],
            ['/tools/semrush', 'Semrush im Steckbrief'],
            ['/tools/se-ranking', 'SE Ranking im Steckbrief'],
            ['/tools/surfer-seo', 'Surfer SEO im Steckbrief'],
            ['/tool-vergleiche/semrush-vs-se-ranking-vs-surfer-seo', 'Semrush vs. SE Ranking vs. Surfer SEO'],
            ['/tool-vergleiche/surfer-seo-vs-writesonic', 'Surfer SEO vs. Writesonic'],
            ['/skills/seo-audit', 'Skill: SEO-Audit'],
            ['/skills/strukturierte-daten', 'Skill: Strukturierte Daten'],
            ['/skills/ki-sichtbarkeit', 'Skill: KI-Sichtbarkeit'],
            ['/ratgeber/sichtbar-in-ki-antworten-werbung-seo', 'Ratgeber: Sichtbar in KI-Antworten'],
            ['/ki-test/fakten', 'KI-Test: Fakten und Halluzinationen'],
        ],
        quellen: [
            { titel: 'Google Search Central: Guidance about AI-generated content', url: 'https://developers.google.com/search/blog/2023/02/google-search-and-ai-content' },
            { titel: 'OpenAI Help Center: Prompt engineering best practices for ChatGPT', url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'gpts-erstellen',
        seoTitle: 'GPTs erstellen 2026: was nach dem Aus der Custom GPTs geht',
        title: 'GPTs erstellen: was nach dem Aus der Custom GPTs noch geht',
        description:
            'Custom GPTs werden laut OpenAI am 11. Dezember 2026 abgeschaltet, neue GPTs kannst du in privaten Konten nicht mehr anlegen. Was stattdessen geht: Plugins und Skills in ChatGPT, Claude Projects, Gemini Gems. Mit Bauplan-Prompt und Umzugshilfe.',
        jean: 'Wer heute noch eine Anleitung zum GPT-Bauen liest, baut ein Haus auf einem Grundstück mit Abrissbescheid. Ich zeige dir das Nachbargrundstück.',
        minutes: 8,
        sections: [
            {
                h: 'Kann ich noch einen Custom GPT erstellen?',
                p: [
                    'In einem privaten Konto nicht mehr. Laut OpenAI-Hilfe-Center können Free, Go, Plus und Pro keine neuen GPTs erstellen oder veröffentlichen. Bestehende GPTs kannst du weiter nutzen und bearbeiten, wenn Tarif und Rechte es erlauben.',
                    'In Business-, Enterprise- und Edu-Workspaces hängt es von Workspace-Einstellungen und Rechten ab. In betroffenen Enterprise-Workspaces endete das Erstellen neuer GPTs laut OpenAI am 26. Oktober 2026, FedRAMP-Workspaces sind davon ausgenommen.',
                ],
            },
            {
                h: 'Der Fahrplan der Abschaltung',
                p: [
                    'Custom GPTs werden laut OpenAI am 11. Dezember 2026 abgeschaltet. Danach sind GPTs und ihre Seiten nicht mehr erreichbar. FedRAMP-Workspaces und Enterprise-Workspaces mit genehmigtem Aufschub haben bis 11. Februar 2027. Maßgeblich ist der Hinweis in deinem eigenen Konto.',
                    'Deine bisherigen Unterhaltungen mit Custom GPTs bleiben laut OpenAI auch nach der Abschaltung erreichbar, dafür musst du nichts tun. Die Details stehen in der News zur Abschaltung.',
                ],
            },
            {
                h: 'Der Nachfolger: Plugins und Skills',
                p: [
                    'An die Stelle der GPTs treten Plugins. Ein Plugin bündelt laut OpenAI Skills mit Anweisungen und Arbeitsabläufen, verbundene Apps zu anderen Diensten und weitere Bausteine. Manche Plugins bestehen nur aus Skills und brauchen gar keine App-Verbindung. Du findest sie in ChatGPT unter „Plugins“ in der Seitenleiste.',
                    'Ein Skill ist ein Ordner mit einer SKILL.md-Datei: Name, Beschreibung, wann er greifen soll, und Anweisungen. Das ist im Kern das, was früher im Anweisungsfeld eines GPTs stand, nur in einem offenen Format, das auch andere Agenten lesen. Laut OpenAI-Hilfe sind Skills in ChatGPT für berechtigte Nutzer in Business, Enterprise, Healthcare und Edu verfügbar, abhängig von Workspace-Einstellungen.',
                ],
            },
            {
                h: 'Deinen GPT umziehen',
                p: [
                    'Ist der Umzug für dein Konto freigeschaltet, wählst du unter „My GPTs“ beim jeweiligen GPT „Migrate to plugin“. Laut OpenAI werden dabei die Anweisungen zu einem Skill, verbundene Apps zu Apps im Plugin und Wissensdateien zu Referenzdateien.',
                    'Nicht übernommen werden das ausgewählte Modell und eigene Actions. Umgezogen wird die zuletzt veröffentlichte Version, Entwürfe bleiben zurück. Danach ist das Original nur noch lesbar. Das neue Plugin startet privat, wer den GPT bisher genutzt hat, bekommt nicht automatisch Zugriff.',
                    'Mein Rat vor dem Umzug: Anweisungen und Wissensdateien lokal sichern und drei typische Prompts aufheben, mit denen du den Ersatz testest. Die Vorlage „Custom-GPT-Anweisungen in einen Skill umwandeln“ macht aus deinen alten Anweisungen eine saubere SKILL.md, die du auch außerhalb von ChatGPT nutzen kannst.',
                ],
            },
            {
                h: 'Einen neuen Assistenten planen',
                p: [
                    'Die Arbeit vor dem Bauen bleibt dieselbe, egal wo der Assistent am Ende wohnt: Wofür ist er da, wer nutzt ihn, welche Dateien braucht er, was soll er tun, wenn er etwas nicht weiß? Die Vorlage „Bauplan für einen eigenen GPT“ liefert genau das: Name, Beschreibung, Anweisungen, Gesprächsstarter, Liste der Wissensdateien und Testfragen.',
                    'Den Bauplan setzt du heute nicht mehr im GPT-Editor um, sondern als Skill oder Plugin, als ChatGPT-Projekt mit festen Anweisungen, als Claude Project oder als Gemini Gem. Das Tutorial „Eigenen KI-Assistenten bauen“ zeigt den Weg in sechs Schritten.',
                ],
            },
            {
                h: 'Alternativen außerhalb von ChatGPT',
                p: [
                    'Die Idee, einen Assistenten mit festen Anweisungen und eigenem Wissen zu bauen, gibt es bei allen großen Anbietern. In Claude heißt das Project, in Gemini Gem. Wer nur feste Anweisungen und ein paar Dateien braucht, kommt dort ohne Plugin-Technik aus.',
                    'Wer Abläufe immer wieder braucht, schreibt sie als Skill. Agent Skills sind ein offenes Format, das mehrere Agenten-Plattformen lesen, darunter ChatGPT, Claude und Coding-Werkzeuge. Fertige Beispiele liegen in der Rubrik Skills.',
                ],
            },
            {
                h: 'Was nicht in einen Assistenten gehört',
                p: [
                    'Zugangsdaten, Kundendaten und interne Zahlen haben in Anweisungen und Referenzdateien nichts zu suchen, wenn der Assistent mit anderen geteilt wird. Ein Assistent, der freundlich jede Frage beantwortet, beantwortet auch die Frage, was in seinen Dateien steht.',
                ],
            },
        ],
        faq: [
            ['Kann ich 2026 noch GPTs erstellen?', 'In privaten Konten (Free, Go, Plus, Pro) nicht mehr. Laut OpenAI ist das Erstellen und Veröffentlichen neuer GPTs dort nicht verfügbar. In Business-Workspaces hängt es von Einstellungen und Rechten ab.'],
            ['Wann werden Custom GPTs abgeschaltet?', 'Laut OpenAI am 11. Dezember 2026. FedRAMP-Workspaces und Enterprise-Workspaces mit genehmigtem Aufschub haben bis 11. Februar 2027.'],
            ['Was ist der Nachfolger der Custom GPTs?', 'Plugins. Beim Umzug werden die Anweisungen zu einem Skill, verbundene Apps zu Apps im Plugin und Wissensdateien zu Referenzdateien. Modell und eigene Actions ziehen nicht mit.'],
            ['Gehen meine Chats mit GPTs verloren?', 'Nein. Laut OpenAI bleiben bestehende Unterhaltungen mit Custom GPTs auch nach der Abschaltung erreichbar.'],
            ['Was nehme ich statt eines GPTs, wenn ich kein Business-Konto habe?', 'Ein ChatGPT-Projekt mit festen Anweisungen, ein Claude Project oder ein Gemini Gem. Deine Anweisungen schreibst du am besten als Skill auf, dann nimmst du sie überallhin mit.'],
        ],
        links: [
            ['/prompts/gpt-anweisungen-zu-skill', 'Prompt: Custom-GPT-Anweisungen in einen Skill umwandeln'],
            ['/prompts/chatgpt-custom-gpt-bauplan', 'Prompt: Bauplan für einen eigenen GPT'],
            ['/prompts/chatgpt-projekt-anweisungen', 'Prompt: Anweisungen für ein ChatGPT-Projekt'],
            ['/prompts/prompt-verbessern', 'Prompt: Prompt verbessern'],
            ['/tutorials/eigenen-ki-assistenten-bauen', 'Tutorial: Eigenen KI-Assistenten bauen'],
            ['/ki-news/custom-gpts-werden-abgeschaltet', 'News: Custom GPTs werden abgeschaltet'],
            ['/glossar/plugin', 'Was ist ein ChatGPT-Plugin?'],
            ['/glossar/custom-gpt', 'Was ist ein Custom GPT?'],
            ['/glossar/agent-skills', 'Was sind Agent Skills?'],
            ['/ratgeber/ki-skills-wiederkehrende-aufgaben', 'Ratgeber: KI-Skills für wiederkehrende Aufgaben'],
            ['/skills', 'Fertige Skills zum Herunterladen'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/tools/chatgpt', 'ChatGPT im Steckbrief'],
            ['/tools/claude', 'Claude im Steckbrief'],
            ['/tools/google-gemini', 'Google Gemini im Steckbrief'],
        ],
        quellen: [
            { titel: 'OpenAI Help Center: Custom GPT retirement and migration FAQ', url: 'https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq' },
            { titel: 'OpenAI Help Center: Creating and editing GPTs', url: 'https://help.openai.com/en/articles/8554397-creating-and-editing-gpts' },
            { titel: 'OpenAI Help Center: Plugins in ChatGPT', url: 'https://help.openai.com/en/articles/20001256-plugins-in-chatgpt' },
            { titel: 'OpenAI Help Center: Skills in ChatGPT', url: 'https://help.openai.com/en/articles/20001066-skills-in-chatgpt' },
            { titel: 'OpenAI Developers: Build skills', url: 'https://developers.openai.com/plugins/build/skills' },
        ],
        geprueft: '2026-11-02',
    },
    {
        slug: 'prompt-engineering',
        seoTitle: 'Prompt Engineering auf Deutsch: Grundlagen, Techniken, Werkzeuge',
        title: 'Prompt Engineering: der Leitfaden auf Deutsch',
        description:
            'Was Prompt Engineering ist, welche Bausteine einen guten Prompt ausmachen und welche Techniken wirklich etwas bringen. Mit Grundkurs, Prompt-Check, Prompt-Baukasten und Vorlagen zum direkten Ausprobieren.',
        jean: 'Prompt Engineering klingt nach Ingenieursstudium. Ist aber eher wie einer neuen Kollegin den Auftrag so zu erklären, dass sie nicht dreimal nachfragen muss.',
        minutes: 9,
        sections: [
            {
                h: 'Was ist Prompt Engineering?',
                p: [
                    'OpenAI beschreibt Prompt Engineering als das Entwerfen und Verbessern von Eingaben, damit ein Sprachmodell zuverlässig liefert, was du brauchst. Weil die Antworten eines Modells nicht jedes Mal gleich ausfallen, ist das laut OpenAI eine Mischung aus Handwerk und Methode.',
                    'Ohne Fachbegriffe gesagt: Du gibst der KI die Angaben, die du auch einem Menschen geben würdest. Fehlt eine Angabe, nimmt das Modell den Durchschnitt aller Texte, die es kennt. Deshalb klingen kurze Prompts nach Durchschnitt.',
                ],
            },
            {
                h: 'Die Bausteine eines guten Prompts',
                p: [
                    'Vier Bausteine tragen fast jeden Prompt: Kontext (wofür und für wen), Aufgabe (was genau), Platzhalter für deine Angaben und das Ausgabeformat (Tabelle, Liste, Länge). Eine Rolle wie „Du bist Fachredakteurin für Fahrräder“ schärft zusätzlich Wortwahl und Tiefe.',
                    'OpenAI nennt in seinen Hinweisen für ChatGPT drei Grundregeln: klar und konkret sein, genug Kontext geben und den Ton ausdrücklich benennen, etwa freundlich, sachlich oder humorvoll. Der Grundkurs „Prompt Engineering in 15 Minuten“ zeigt jeden Baustein mit Vorher-Nachher-Vergleich.',
                ],
            },
            {
                h: 'Techniken, die wirklich etwas bringen',
                p: [
                    'Beispiele zeigen Stil und Länge besser als jede Beschreibung. Rückfragen lassen die KI erst nachfragen, statt Lücken zu erfinden. Selbstkritik lässt sie ihr Ergebnis gegen deine Kriterien prüfen. Varianten liefern mehrere Fassungen auf einmal, aus denen du wählst.',
                    'Bei großen Aufgaben hilft eine Prompt-Kette: mehrere Prompts hintereinander, jeder baut auf dem Ergebnis des vorherigen auf. Das ist zuverlässiger als ein Riesen-Prompt. Das Tutorial zur Prompt-Kette zeigt das am Beispiel vom Thema bis zum fertigen Artikel.',
                ],
            },
            {
                h: 'Was du dir sparen kannst',
                p: [
                    'Großbuchstaben, Drohungen und Trinkgeld-Versprechen an die KI. Klarere Angaben bringen mehr als Lautstärke. Auch lange Listen mit Verboten helfen wenig, OpenAI empfiehlt in der Anleitung für GPT-Anweisungen eher positive, konkrete Anweisungen nach dem Muster „Tu X“ statt „Tu nicht Y“.',
                    'Ebenfalls überholt: der pauschale Satz „Denk Schritt für Schritt“ bei jeder Frage. Laut OpenAI denken Reasoning-Modelle schon intern nach, während schnellere Modelle eher von ausdrücklichen Arbeitsschritten profitieren. Zerleg also die Aufgabe, statt die KI um Gedanken zu bitten.',
                ],
            },
            {
                h: 'Iterieren und testen',
                p: [
                    'OpenAI beschreibt Prompt Engineering als schrittweisen Prozess: Prompt schreiben, Ergebnis prüfen, nachschärfen. Anthropic geht einen Schritt weiter und rät, vor dem Feilen erst festzulegen, woran du ein gutes Ergebnis erkennst, und wie du das testest.',
                    'Für den Alltag heißt das: Leg dir drei Testfragen zurecht, die deinen typischen Fall abdecken, plus eine schwierige. Jede Änderung am Prompt prüfst du gegen alle vier. Der KI-Test auf dieser Seite zeigt, wie unterschiedlich Modelle auf dieselben Prompts reagieren.',
                ],
            },
            {
                h: 'Werkzeuge: Prompt-Check und Prompt-Baukasten',
                p: [
                    'Der Prompt-Check bewertet einen Prompt nach zehn Kriterien wie Rolle, Aufgabe, Kontext, Zielgruppe, Format und vage Wörter, schätzt die Token-Zahl und schickt ihn auf Wunsch zum Verbessern an ChatGPT oder Claude. Er läuft komplett im Browser.',
                    'Der Prompt-Baukasten geht den umgekehrten Weg: Du wählst Rolle, Aufgabe, Kontext, Format und Ton, er setzt daraus einen strukturierten Prompt zusammen und bewertet ihn mit einem Score. Für fertige Aufgaben gibt es die Vorlagen-Bibliothek.',
                ],
            },
            {
                h: 'Vom Prompt zum Kontext und zu Skills',
                p: [
                    'Je mehr KI-Assistenten mit Dateien, Werkzeugen und langen Verläufen arbeiten, desto wichtiger wird, welche Informationen sie überhaupt bekommen. Dafür hat sich der Begriff Kontext-Engineering eingebürgert: nicht nur der Prompt, sondern alles, was das Modell sieht.',
                    'Was du immer wieder brauchst, schreibst du einmal sauber auf: in die Anweisungen eines Projekts oder als Skill, den der Agent bei Bedarf lädt. Wie das geht, steht im Ratgeber zu KI-Skills und in der Rubrik Skills.',
                ],
            },
        ],
        faq: [
            ['Was ist Prompt Engineering einfach erklärt?', 'Das gezielte Formulieren von Eingaben an eine KI, damit sie zuverlässig liefert, was du brauchst: mit Kontext, klarer Aufgabe, Ausgabeformat und bei Bedarf Beispielen oder Rückfragen.'],
            ['Muss ich programmieren können, um Prompt Engineering zu lernen?', 'Nein. Für Chat-Assistenten wie ChatGPT oder Claude reicht klare Sprache. Der Grundkurs „Prompt Engineering in 15 Minuten“ kommt ohne Code aus.'],
            ['Funktionieren dieselben Prompts in ChatGPT, Claude und Gemini?', 'Die Grundregeln gelten überall. Im Detail reagieren Modelle unterschiedlich, deshalb testest du wichtige Prompts in dem Modell, das du wirklich nutzt.'],
            ['Wie prüfe ich, ob mein Prompt gut ist?', 'Mit dem Prompt-Check auf dieser Seite und mit drei, vier festen Testfragen, gegen die du jede Änderung prüfst.'],
        ],
        links: [
            ['/tutorials/prompt-engineering-in-15-minuten', 'Tutorial: Prompt Engineering in 15 Minuten'],
            ['/tutorials/prompt-kette-vom-thema-zum-artikel', 'Tutorial: Prompt-Kette vom Thema zum Artikel'],
            ['/tutorials/chatgpt-richtig-nutzen', 'Tutorial: ChatGPT richtig nutzen'],
            ['/prompt-check', 'Prompt-Check: Wie gut ist dein Prompt?'],
            ['/prompt-baukasten', 'Prompt-Baukasten'],
            ['/prompts', 'Alle Prompt-Vorlagen'],
            ['/prompts/prompt-verbessern', 'Prompt: Prompt verbessern'],
            ['/prompts/tool/chatgpt', 'ChatGPT-Prompts auf Deutsch'],
            ['/glossar/prompt-engineering', 'Glossar: Prompt Engineering'],
            ['/glossar/prompt-kette', 'Glossar: Prompt-Kette'],
            ['/glossar/kontext-engineering', 'Glossar: Kontext-Engineering'],
            ['/ki-test', 'KI-Test: Modelle im Vergleich'],
            ['/ratgeber/ki-skills-wiederkehrende-aufgaben', 'Ratgeber: KI-Skills für wiederkehrende Aufgaben'],
            ['/tool-vergleiche/claude-vs-chatgpt', 'Claude vs. ChatGPT'],
        ],
        quellen: [
            { titel: 'OpenAI Help Center: Prompt engineering best practices for ChatGPT', url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt' },
            { titel: 'OpenAI Platform: Prompt engineering guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
            { titel: 'OpenAI Help Center: Creating and editing GPTs (Hinweise zu Anweisungen)', url: 'https://help.openai.com/en/articles/8554397-creating-and-editing-gpts' },
            { titel: 'Anthropic: Prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
        ],
        geprueft: '2026-11-02',
    },
]
