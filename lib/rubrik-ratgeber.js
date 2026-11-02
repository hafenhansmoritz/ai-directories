// Ratgeber-Teil für die großen Rubrikseiten: Auswahlkriterien, Tipp- und Warnbox, FAQ.
// Nur allgemeine, überprüfbare Aussagen; Preise stehen in den Steckbriefen unter /tools.
export const RUBRIK_RATGEBER = {
    schreiben: {
        frage: 'Welches KI-Schreibtool passt zu dir?',
        kriterien: [
            ['🗣️', 'Sprache', 'Schreibt das Tool gutes Deutsch, oder ist es vor allem für Englisch gebaut? Viele Umformulierer arbeiten nur auf Englisch.'],
            ['🎨', 'Markenstimme', 'Kannst du Beispiele, Tonalität und verbotene Wörter hinterlegen, damit nicht jeder Text gleich klingt?'],
            ['🧩', 'Arbeitsort', 'Browser-Erweiterung, Word- und Google-Docs-Plugin oder eigener Editor: Das Tool sollte dort sein, wo du schreibst.'],
            ['🔒', 'Datenschutz', 'Werden Texte zum Training genutzt? Gibt es einen Auftragsverarbeitungsvertrag und Server in der EU?'],
            ['💶', 'Preismodell', 'Wortkontingent, Credits oder Flatrate: Rechne mit deinem echten Monatsvolumen, nicht mit dem Einstiegspreis.'],
        ],
        tipp: 'Für Entwürfe, Gliederungen und Umformulierungen reicht oft ein Chatbot mit gutem Prompt, du musst nicht gleich das Spezialwerkzeug kaufen. Spezialisierte Schreibtools lohnen sich, wenn ein Team viele Texte im gleichen Stil braucht.',
        achtung: 'KI-Texte klingen schnell austauschbar, wie Möbel aus dem Katalog, und können Fakten erfinden. Zahlen, Zitate und Quellen prüfst du immer selbst, bevor etwas veröffentlicht wird.',
        faq: [
            {
                q: 'Was ist das beste KI-Tool zum Schreiben?',
                a: 'Das hängt vom Einsatz ab. Für freie Entwürfe und Überarbeitungen sind Chatbots wie ChatGPT oder Claude stark, für einheitliche Markentexte im Team spezialisierte Schreibtools mit Stilvorgaben, für Korrektur und Umformulierung Assistenten wie DeepL Write oder QuillBot. Die Konsens-Favoriten oben werden von mindestens zwei unabhängigen Listen empfohlen.',
            },
            {
                q: 'Gibt es kostenlose KI-Schreibtools?',
                a: 'Ja. Viele Anbieter haben einen Gratis-Tarif mit begrenzter Nutzung, und die Chatbots selbst lassen sich kostenlos zum Schreiben nutzen. Die Filter der Datenbank zeigen dir kostenlose und Open-Source-Tools, damit du nicht jede Preisseite einzeln abklappern musst.',
            },
            {
                q: 'Erkennt Google KI-Texte?',
                a: 'Google bewertet nach eigener Aussage die Qualität und den Nutzen eines Inhalts, nicht ob er mit KI entstanden ist. Viele Seiten mit KI zu erzeugen, ohne Nutzern einen Mehrwert zu bieten, kann aber gegen die Spam-Richtlinie zu „Scaled Content Abuse“ verstoßen. Das Problem ist also Masse ohne Mehrwert, nicht die KI. Google rät außerdem, KI-Texte vor der Veröffentlichung auf Fakten zu prüfen.',
            },
            {
                q: 'Wie schreibe ich bessere Prompts für Texte?',
                a: 'Gib Rolle, Zielgruppe, Ziel, Länge und Format vor und füge ein Beispiel für den gewünschten Stil an. Ein gutes Beispiel sagt der KI mehr als jede lange Erklärung. Der Prompt-Check und der Prompt-Baukasten auf mentat.codes helfen dabei.',
            },
            {
                q: 'Muss ich KI-Texte kennzeichnen?',
                a: 'Seit 2. August 2026 gilt Art. 50 Abs. 4 der EU-KI-Verordnung: Wer mit KI erzeugte oder veränderte Texte veröffentlicht, um die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse zu informieren, muss das offenlegen. Die Pflicht entfällt, wenn ein Mensch den Text geprüft hat und jemand die redaktionelle Verantwortung trägt. Die EU-Kommission hat dazu am 10. Juni 2026 einen freiwilligen Verhaltenskodex mit einem optionalen EU-Symbol zur Kennzeichnung veröffentlicht (Stand Oktober 2026).',
            },
            {
                q: 'Welche Sprachen kann DeepL Write?',
                a: 'Laut DeepL-Hilfecenter verbessert DeepL Write Texte auf Chinesisch, Deutsch, Englisch (UK und US), Französisch, Italienisch, Japanisch, Koreanisch, Portugiesisch (PT und BR) und Spanisch. Es korrigiert Grammatik, Rechtschreibung und Zeichensetzung und schlägt dir alternative Wörter und Formulierungen vor (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'Google Search Central: Leitfaden zu KI-generierten Inhalten',
                url: 'https://developers.google.com/search/docs/fundamentals/using-gen-ai-content',
            },
            {
                titel: 'Google Search Central: Spam-Richtlinien (Scaled Content Abuse)',
                url: 'https://developers.google.com/search/docs/essentials/spam-policies',
            },
            {
                titel: 'EU-Kommission: Code of Practice on Transparency of AI-generated Content',
                url: 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content',
            },
            {
                titel: 'Verordnung (EU) 2024/1689 (KI-Verordnung), Art. 50',
                url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
            },
            {
                titel: 'DeepL Hilfecenter: About DeepL Write',
                url: 'https://support.deepl.com/hc/en-us/articles/6318834492700-About-DeepL-Write',
            },
        ],
        geprueft: '2026-10-26',
    },
    bild: {
        artikel: 'ki-bildgeneratoren-vergleich',
        frage: 'Welcher KI-Bildgenerator passt zu dir?',
        kriterien: [
            ['🖼️', 'Bildstil', 'Fotorealismus, Illustration, Logo oder Produktbild: Jeder Generator hat Stärken. Teste denselben Prompt in zwei, drei Tools.'],
            ['🔤', 'Text im Bild', 'Schriftzüge auf Schildern, Plakaten oder Verpackungen gelingen nicht jedem Modell gleich gut.'],
            ['✂️', 'Bearbeitung', 'Bereiche ersetzen, Bild erweitern, Varianten erzeugen, Hintergrund entfernen: wichtig für echte Projekte.'],
            [
                '⚖️',
                'Nutzungsrechte',
                'Darfst du die Bilder kommerziell nutzen? Bei Midjourney etwa brauchen Firmen mit mehr als 1 Mio. US-Dollar Jahresumsatz und deren Mitarbeitende einen Pro- oder Mega-Tarif, um die Rechte an ihren Bildern zu erhalten.',
            ],
            ['🔐', 'Privatsphäre', 'In manchen Gratis-Tarifen sind deine Bilder öffentlich sichtbar. Private Ergebnisse kosten oft extra.'],
        ],
        tipp: 'Beschreibe Motiv, Stil, Licht, Perspektive und Format in dieser Reihenfolge, so wie ein Fotograf erst wissen will, was überhaupt aufs Bild soll. Das Tutorial zu Bild-Prompts zeigt die Formel mit Beispielen.',
        achtung:
            'Keine echten Personen, Marken oder geschützten Figuren nachbauen, auch nicht „nur zum Spaß“, und KI-Bilder bei Bedarf kennzeichnen. Prüfe vor kommerzieller Nutzung die aktuellen Lizenzbedingungen des Anbieters.',
        faq: [
            {
                q: 'Welcher KI-Bildgenerator ist der beste?',
                a: 'Einen klaren Sieger gibt es nicht. Midjourney gilt als stark bei Stil und Ästhetik, Flux und Stable Diffusion gibt es mit offenen Gewichten zum Selbstbetreiben, teils aber nur mit nicht-kommerzieller Lizenz, Design-Tools wie Canva verbinden KI-Bilder mit Vorlagen. Teste mit demselben Prompt, dann siehst du die Unterschiede schwarz auf weiß.',
            },
            {
                q: 'Gibt es kostenlose KI-Bildgeneratoren?',
                a: 'Ja. Leonardo AI hat einen Gratis-Tarif mit 150 Tokens pro Tag (Ergebnisse dort öffentlich, also nichts für geheime Entwürfe), und offene Modelle wie Flux oder Stable Diffusion laufen auch lokal. Midjourney hat dagegen keinen Gratis-Tarif.',
            },
            {
                q: 'Darf ich KI-Bilder kommerziell nutzen?',
                a: 'Das regelt jeder Anbieter in seinen Nutzungsbedingungen, oft abhängig vom Tarif. Lies die Bedingungen vor dem Einsatz in Werbung oder Produkten, das Kleingedruckte ist hier ausnahmsweise die Hauptsache.',
            },
            {
                q: 'Wie schreibe ich gute Bild-Prompts?',
                a: 'Motiv, Stil, Licht, Perspektive, Farben und Format nennen und unerwünschte Elemente ausschließen, sonst gibt es den sechsten Finger gratis dazu. Das Tutorial „Bild-Prompts schreiben“ führt dich Schritt für Schritt durch.',
            },
            {
                q: 'Welche Bildmodelle sind gerade aktuell?',
                a: 'Bei Midjourney ist seit 24. Juli 2026 V8.2 das Standardmodell. Es bringt ein neues Edit-Modell, das Omni Reference, Character Reference und Retexture ersetzt. Google hat im Oktober 2026 Nano Banana 2.1 veröffentlicht. In der Gemini-App nutzen es laut Google Abonnenten von Google AI Plus, Pro und Ultra, Gratis-Nutzer erzeugen Bilder mit dem Basismodell (Stand Oktober 2026).',
            },
            {
                q: 'Darf ich Flux kommerziell nutzen?',
                a: 'Kommt drauf an, auf welchem Weg dein Bild entsteht. Bilder aus der API von Black Forest Labs sind laut Anbieter immer kommerziell nutzbar. Lokal ist nur FLUX.2 [klein] 4B unter Apache 2.0 frei für Geschäftszwecke. Wer FLUX.2 [klein] 9B, FLUX.2 [dev] oder FLUX.1 [dev] selbst im Geschäftsbetrieb einsetzt, braucht eine kostenpflichtige Lizenz, weil diese Gewichte unter der FLUX Non-Commercial License stehen (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'Midjourney Terms of Service',
                url: 'https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service',
            },
            {
                titel: 'Midjourney Docs: Version (V8.2 Standard)',
                url: 'https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version',
            },
            {
                titel: 'Google DeepMind: Nano Banana 2.1 Model Card',
                url: 'https://deepmind.google/models/model-cards/nano-banana-2-1/',
            },
            {
                titel: 'Black Forest Labs: How does FLUX licensing work?',
                url: 'https://help.bfl.ai/articles/9272590838-self-serve-dev-license-overview-pricing',
            },
            {
                titel: 'Leonardo.Ai Pricing',
                url: 'https://leonardo.ai/pricing',
            },
        ],
        geprueft: '2026-10-26',
    },
    video: {
        artikel: 'ki-video-tools-vergleich',
        frage: 'Welches KI-Videotool passt zu dir?',
        kriterien: [
            ['🎬', 'Videoart', 'Text-zu-Video, Avatar-Sprecher, automatischer Schnitt oder Untertitel: Das sind verschiedene Tool-Gruppen.'],
            ['🗣️', 'Deutsche Stimmen', 'Klingen Sprecher und Avatare auf Deutsch natürlich? Unbedingt mit einem eigenen Skript testen.'],
            ['⏱️', 'Länge und Auflösung', 'Gratis-Tarife begrenzen oft Minuten, Auflösung und setzen ein Wasserzeichen.'],
            ['🔁', 'Arbeitsablauf', 'Import von Skript, Blogartikel oder Präsentation spart Zeit. Export in Hochformat für Shorts und Reels ebenfalls.'],
            ['💶', 'Credits', 'Viele Anbieter rechnen in Credits pro Minute. KI-Clips und Avatare verbrauchen meist mehr als Stockmaterial.'],
        ],
        tipp: 'Starte mit dem Skript, nicht mit dem Tool. Ein klares Skript mit Szenen und Sprechertext spart in jedem Videotool die meisten Credits, und deine Nerven gleich mit.',
        achtung:
            'Stimmen und Gesichter echter Personen klonst du nur mit deren Einwilligung. Bei Avataren und synthetischen Stimmen gelten die Regeln der Anbieter und je nach Einsatz Kennzeichnungspflichten.',
        faq: [
            {
                q: 'Was ist das beste KI-Videotool?',
                a: 'Kommt drauf an, was du drehen willst. Für Avatar-Videos sind Synthesia und HeyGen verbreitet, für Video aus Text oder Artikeln InVideo AI, Pictory und Fliki, für kreative KI-Clips Runway, für Schnitt per Transkript Descript. Die Steckbriefe zeigen Preise laut Anbieter.',
            },
            {
                q: 'Gibt es kostenlose KI-Videotools?',
                a: 'Ja, meist mit Gratis-Tarif: begrenzte Minuten, geringere Auflösung und Wasserzeichen. Für Tests reicht das, für veröffentlichte Videos meist nicht, es sei denn, du willst kostenlos Werbung für den Anbieter machen.',
            },
            {
                q: 'Kann ich YouTube-Videos komplett mit KI erstellen?',
                a: 'Technisch ja, von Skript über Stimme bis Schnitt. Erfolgreiche Kanäle verbinden KI-Werkzeuge aber mit eigener Expertise, eigenen Beispielen und einer erkennbaren Person. Die Maschine übernimmt den Schnitt, den Unterschied machst du.',
            },
            {
                q: 'Wie schreibe ich ein Videoskript mit KI?',
                a: 'Gib Thema, Zielgruppe, Länge und Aufbau mit Hook, Hauptteil und Handlungsaufforderung vor. Der Prompt „YouTube-Skript“ auf mentat.codes liefert die Vorlage, du setzt nur noch dein Thema ein.',
            },
            {
                q: 'Was ist aus Sora geworden?',
                a: 'OpenAI hat Sora eingestellt, der Vorhang ist gefallen: Web und App am 26. April 2026, die API mit den Modellen sora-2 und sora-2-pro am 24. September 2026. Laut OpenAI-Hilfe lassen sich eigene Inhalte über sora.chatgpt.com/sunset exportieren, danach werden die Daten gelöscht. Für generative Clips bieten sich etwa Runway oder Googles Gemini Omni Flash an (Stand Oktober 2026).',
            },
            {
                q: 'Welches Google-Videomodell ist aktuell?',
                a: 'Gemini Omni Flash, vorgestellt am 19. Mai 2026. Es erzeugt Videos aus Text, Bildern, Video und Audio und bearbeitet sie per Chat. Abonnenten von Google AI Plus, Pro und Ultra nutzen es in der Gemini-App und in Google Flow, kostenlos gibt es es in YouTube Shorts. Seit 27. August 2026 kann Omni 1.1 Flash Szenen auf bis zu 40 Sekunden verlängern und auf 4K hochskalieren. Die Veo-3.1-Vorschaumodelle in der Gemini API hat Google am 22. Oktober 2026 abgeschaltet und empfiehlt den Wechsel zu Omni 1.1 Flash. Alle Omni-Videos tragen ein unsichtbares SynthID-Wasserzeichen (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'OpenAI Help: What to know about the Sora discontinuation',
                url: 'https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation',
            },
            {
                titel: 'OpenAI API Deprecations (Sora 2, Videos API)',
                url: 'https://developers.openai.com/api/docs/deprecations',
            },
            {
                titel: 'Google Blog: Introducing Gemini Omni',
                url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/',
            },
            {
                titel: 'Google Blog: Build with Gemini Omni 1.1 Flash',
                url: 'https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/',
            },
            {
                titel: 'Gemini API Docs: Veo 3.1',
                url: 'https://ai.google.dev/gemini-api/docs/veo',
            },
        ],
        geprueft: '2026-10-26',
    },
    marketing: {
        frage: 'Welche KI fürs Marketing brauchst du wirklich?',
        kriterien: [
            ['🎯', 'Aufgabe', 'Anzeigen, Social Posts, E-Mails, SEO oder Landingpages: Kläre zuerst, welche Aufgabe am meisten Zeit frisst.'],
            ['🎨', 'Markenstimme', 'Gute Tools speichern Tonalität, Zielgruppen und Produktinfos, damit Texte konsistent bleiben.'],
            ['🔗', 'Anbindung', 'Verbindung zu Newsletter-Tool, CRM, Shop oder Werbekonto spart Kopierarbeit.'],
            ['📈', 'Messbarkeit', 'Kannst du Varianten testen und Ergebnisse auswerten, statt nur Texte zu erzeugen?'],
            ['💶', 'Kosten pro Nutzer', 'Viele Marketing-Tools rechnen pro Platz. Für kleine Teams ist ein Chatbot plus gute Prompts oft günstiger.'],
        ],
        tipp: 'Baue dir eine Prompt-Bibliothek für wiederkehrende Aufgaben wie Anzeigen, Meta-Daten und Newsletter, so wie andere ihre Gewürzgläser beschriften. Die Prompts auf mentat.codes lassen sich mit einem Klick an ChatGPT, Claude und andere senden.',
        achtung:
            'Werbeaussagen, Preise und Heilversprechen übernimmst du nie ungeprüft aus der KI. Für Werbung gelten Wettbewerbsrecht und Plattformregeln, egal ob du den Text geschrieben hast oder die KI.',
        faq: [
            {
                q: 'Welche KI-Tools nutzen Marketer am häufigsten?',
                a: 'Chatbots wie ChatGPT und Claude für Texte und Ideen, Design-Tools wie Canva für Grafiken, SEO-Tools wie Semrush (seit April 2026 Teil von Adobe) oder Surfer und Newsletter-Tools mit KI-Funktionen wie beehiiv oder Brevo.',
            },
            {
                q: 'Lohnt sich ein spezielles Marketing-KI-Tool?',
                a: 'Für Teams mit vielen Kanälen und strenger Markenstimme oft ja. Einzelne Gründer kommen mit einem Chatbot, guten Prompts und einem Newsletter-Tool meist weiter und günstiger. Erst den Werkzeuggürtel füllen, dann die Werkstatt kaufen.',
            },
            {
                q: 'Wie viel Zeit spart KI im Marketing?',
                a: 'Das hängt von deinen Aufgaben ab, nicht vom Werbeversprechen eines Anbieters. Der KI-Zeitersparnis-Rechner auf mentat.codes schätzt es anhand deiner eigenen Stunden pro Woche.',
            },
            {
                q: 'Kann KI meine Produkt-Launches planen?',
                a: 'KI hilft bei Texten, Zeitplan und Checklisten, den Launch-Knopf drückst du trotzdem selbst. Der Launch-Zeit-Rechner und der Prompt für Product-Hunt-Launches geben dir einen Startpunkt.',
            },
            {
                q: 'Was ändert sich bei Semrush durch Adobe?',
                a: 'Adobe hat die Übernahme von Semrush am 28. April 2026 abgeschlossen, Semrush ist seitdem eine hundertprozentige Tochter. Laut Adobe soll Semrush mit Adobe Experience Manager, Adobe LLM Optimizer und weiteren Produkten verbunden werden, um die Sichtbarkeit von Marken in der Suche und in KI-Antworten (SEO und GEO) zu verbessern. Schau bei der nächsten Verlängerung genau auf Tarif und Vertragsbedingungen (Stand Oktober 2026).',
            },
            {
                q: 'Darf ich KI-Produktbilder und -texte im Google Merchant Center nutzen?',
                a: 'Ja, mit Kennzeichnung. Laut Google müssen KI-generierte Bilder im Merchant Center die IPTC-Metadaten DigitalSourceType mit dem Wert TrainedAlgorithmicMedia enthalten. KI-generierte Titel und Beschreibungen musst du separat angeben und als KI-generiert markieren (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'Adobe: Adobe Completes Semrush Acquisition',
                url: 'https://news.adobe.com/news/2026/04/adobe-completes-semrush-acquisition',
            },
            {
                titel: 'Semrush Holdings Form 8-K (SEC) zum Abschluss der Fusion',
                url: 'https://www.sec.gov/Archives/edgar/data/1831840/000114036126017299/ef20071354_8k.htm',
            },
            {
                titel: 'Google Search Central: Leitfaden zu KI-generierten Inhalten (Merchant Center)',
                url: 'https://developers.google.com/search/docs/fundamentals/using-gen-ai-content',
            },
        ],
        geprueft: '2026-10-26',
    },
    chatbots: {
        frage: 'Welcher KI-Chatbot passt zu dir?',
        kriterien: [
            ['🧪', 'Deine Aufgaben', 'Schreiben, Programmieren, Rechnen, Recherche: Chatbots haben unterschiedliche Stärken. Teste sie mit deinen echten Aufgaben.'],
            ['🌐', 'Websuche und Quellen', 'Kann der Chatbot aktuelle Informationen suchen und Quellen verlinken, oder antwortet er nur aus Trainingswissen?'],
            ['📎', 'Dateien und Bilder', 'Liest er PDFs, Tabellen und Fotos? Wie lange Dokumente passen ins Kontextfenster?'],
            ['🔒', 'Datenschutz', 'Werden Chats zum Training genutzt, und lässt sich das abschalten? Gibt es Team-Tarife mit Auftragsverarbeitungsvertrag?'],
            ['💶', 'Abo oder Gratis', 'Gratis-Tarife haben Grenzen bei Modellen und Nachrichten. Rechne, ob sich ein Abo für dich lohnt.'],
        ],
        tipp: 'Schick dieselbe Aufgabe an zwei oder drei Chatbots und lass sie gegeneinander antreten wie beim Elfmeterschießen. Der KI-Test auf mentat.codes hat dafür fertige Aufgaben, Bewertungsbogen und Rangliste.',
        achtung:
            'Chatbots können überzeugend falsche Antworten geben, mit der Selbstsicherheit eines Stammtischs. Bei Fakten, Gesundheit, Recht und Geld prüfst du immer die Quellen und gibst keine sensiblen Daten ein.',
        faq: [
            {
                q: 'Welcher KI-Chatbot ist der beste?',
                a: 'ChatGPT, Claude und Gemini stehen in allen drei großen Community-Listen. Welcher für dich am besten ist, hängt von deinen Aufgaben ab. Am zuverlässigsten findest du das mit einem eigenen Vergleich heraus: Probefahrt statt Prospekt.',
            },
            {
                q: 'Gibt es kostenlose KI-Chatbots?',
                a: 'Ja, die großen Anbieter haben Gratis-Tarife mit Einschränkungen. Mit Open-Source-Werkzeugen wie Ollama laufen Sprachmodelle auch lokal auf dem eigenen Rechner, dann bleibt alles bei dir im Haus.',
            },
            {
                q: 'Welcher Chatbot ist am besten für Deutsch?',
                a: 'Die großen Chatbots schreiben gutes Deutsch, unterscheiden sich aber im Stil. Teste mit einem Text aus deinem Alltag, etwa einer E-Mail oder einem Produkttext, und hör hin, welcher nach dir klingt und welcher nach Amtsstube.',
            },
            {
                q: 'Welches Modell steckt aktuell in ChatGPT?',
                a: 'Seit 7. Oktober 2026 läuft der Chat in ChatGPT mit GPT-6. Plus, Pro, Business und Enterprise nutzen GPT-6 Sol, Free und Go laut OpenAI ab dem Folgetag GPT-6 Luna. Neu ist Intelligent UI: ChatGPT ergänzt Antworten bei Bedarf um Diagramme, Vergleiche oder kleine interaktive Werkzeuge wie Rechner. GPT-6 Pro mit dem Modell GPT-6 Astra gibt es in den Pro-Tarifen sowie für Business und Enterprise (Stand Oktober 2026).',
            },
            {
                q: 'Was ist neu bei Claude und Gemini?',
                a: 'Anthropic hat die Claude-5.5-Familie veröffentlicht: Opus 5.5 am 22. September, Sonnet 5.5 am 28. September und Haiku 5.5 am 7. Oktober 2026. Für besonders anspruchsvolle Aufgaben gibt es Claude Fable 5.1. Alle aktuellen Claude-Modelle haben laut Anbieter ein Kontextfenster von 1 Mio. Tokens. Google stellt seit 13. Oktober 2026 Gemini 4 Argon in der Gemini-App und im KI-Modus der Suche für Abonnenten von Google AI Pro und Ultra bereit (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'OpenAI: GPT-6 and Intelligent UI for everyone',
                url: 'https://openai.com/index/gpt-6-for-everyone/',
            },
            {
                titel: 'OpenAI Help: ChatGPT release notes',
                url: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
            },
            {
                titel: 'Anthropic: Models overview',
                url: 'https://platform.claude.com/docs/en/models/overview',
            },
            {
                titel: 'Anthropic News: Models',
                url: 'https://www.anthropic.com/news/models',
            },
            {
                titel: 'Google Blog: Gemini 4 Argon is now available for everyone',
                url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/',
            },
        ],
        geprueft: '2026-10-26',
    },
    produktivitaet: {
        frage: 'Welche KI macht dich im Arbeitsalltag schneller?',
        kriterien: [
            ['⏱️', 'Zeitfresser zuerst', 'Meetings, E-Mails, Notizen oder Recherche: Starte bei der Aufgabe, die dich jede Woche am meisten Zeit kostet.'],
            ['🔗', 'Integration', 'Arbeitet das Tool in deinem Kalender, Mailprogramm, Browser oder Notiz-App, oder musst du ständig kopieren?'],
            ['🎙️', 'Aufnahmen und Einwilligung', 'Meeting-Assistenten zeichnen Gespräche auf. Alle Beteiligten müssen das wissen und zustimmen.'],
            ['🔒', 'Firmendaten', 'Gibt es einen Tarif für Teams mit Auftragsverarbeitungsvertrag und klaren Regeln zur Datennutzung?'],
            ['💶', 'Kosten pro Kopf', 'Viele Produktivitäts-Tools rechnen pro Nutzer. Rechne mit dem ganzen Team, nicht nur mit dir.'],
        ],
        tipp: 'Der KI-Zeitersparnis-Rechner zeigt dir, ob sich ein Abo lohnt: gesparte Stunden gegen Kosten, mit Break-even. Rechnen statt hoffen.',
        achtung:
            'Meeting-Aufnahmen und Transkripte enthalten personenbezogene Daten. Kläre Einwilligung und Speicherort, bevor du ein Tool im Team einführst, und nicht erst, wenn das Protokoll schon rumgeschickt wurde.',
        faq: [
            {
                q: 'Welche KI-Tools steigern die Produktivität am meisten?',
                a: 'Meist sind es Meeting-Assistenten, die mitschreiben und zusammenfassen, KI in der Notiz- oder Dokumenten-App und ein Chatbot für E-Mails und Texte. Also die Helfer für genau den Kleinkram, der sonst den Tag auffrisst.',
            },
            {
                q: 'Lohnt sich ein bezahlter KI-Assistent?',
                a: 'Wenn er dir mehr Zeit spart, als er kostet. Rechne mit deinen eigenen Stunden pro Woche, zum Beispiel im KI-Zeitersparnis-Rechner, und nicht mit den Versprechen auf der Startseite des Anbieters.',
            },
            {
                q: 'Darf ich Meetings mit KI aufzeichnen?',
                a: 'Nur mit Wissen und Zustimmung aller Teilnehmenden, der stille Mitschreiber braucht also eine offizielle Einladung. Kläre außerdem, wo die Aufnahmen gespeichert werden und wer Zugriff hat.',
            },
            {
                q: 'Was droht bei heimlichen Gesprächsaufnahmen?',
                a: 'Nach § 201 StGB ist es strafbar, das nichtöffentlich gesprochene Wort eines anderen unbefugt aufzunehmen oder eine solche Aufnahme zu gebrauchen oder Dritten zugänglich zu machen. Es drohen bis zu drei Jahre Freiheitsstrafe oder Geldstrafe. Ein Meeting-Assistent, der ohne Zustimmung aller mitschneidet, kann also ein echtes rechtliches Problem werden.',
            },
            {
                q: 'Muss mein Team geschult werden, bevor es KI nutzt?',
                a: 'Art. 4 der EU-KI-Verordnung verpflichtet Anbieter und Betreiber von KI-Systemen zu Maßnahmen für die KI-Kompetenz ihres Personals. Seit der Änderung durch die Digital-Omnibus-Verordnung (EU) 2026/1744, in Kraft seit 27. Juli 2026, müssen Unternehmen kein bestimmtes Kompetenzniveau mehr für jede einzelne Person sicherstellen, sondern die KI-Kompetenz mit geeigneten Maßnahmen fördern. Kurze Schulungen und klare interne Regeln sind ein guter Start, eine Doktorarbeit muss niemand schreiben (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: '§ 201 StGB (gesetze-im-internet.de)',
                url: 'https://www.gesetze-im-internet.de/stgb/__201.html',
            },
            {
                titel: 'Verordnung (EU) 2026/1744 (Digital Omnibus on AI)',
                url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
            },
            {
                titel: 'Europäisches Parlament, Legislative Observatory: Zusammenfassung 2025/0359(COD)',
                url: 'https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1910754',
            },
        ],
        geprueft: '2026-10-26',
    },
    coding: {
        frage: 'Welche KI hilft dir beim Programmieren?',
        kriterien: [
            ['⌨️', 'Editor oder Terminal', 'Vervollständigung im Editor, eigener KI-Editor oder Agent im Terminal: Wähle, was zu deinem Arbeitsablauf passt.'],
            ['🧠', 'Modellwahl', 'Kannst du das Modell wählen, eigene API-Schlüssel nutzen oder lokale Modelle anbinden?'],
            ['📁', 'Kontext', 'Versteht das Tool dein ganzes Projekt oder nur die offene Datei?'],
            ['🔐', 'Code-Schutz', 'Was passiert mit deinem Code? Gibt es Einstellungen gegen das Training mit deinen Daten?'],
            ['💶', 'Kosten', 'Abo pro Nutzer oder Abrechnung nach Tokens: Der API-Kosten-Rechner hilft bei der Schätzung.'],
        ],
        tipp: 'Lass die KI Tests schreiben, bevor sie Code ändert. So merkst du sofort, wenn eine Änderung etwas kaputt macht, und nicht erst dein Kunde am Montagmorgen.',
        achtung:
            'KI-generierter Code kann Fehler, veraltete Bibliotheken und Sicherheitslücken enthalten. Review und Tests bleiben Pflicht, und Zugangsdaten gehören nie in Prompts, auch nicht „nur kurz zum Testen“.',
        faq: [
            {
                q: 'Welcher KI-Code-Assistent ist der beste?',
                a: 'GitHub Copilot und OpenAI Codex stehen in allen drei großen Listen, Cursor und Tabnine in zwei. Tabnine gehört seit 30. Juli 2026 zu Tricentis. Daneben gibt es Coding-Agenten wie Claude Code und Open-Source-Werkzeuge wie Cline oder aider.',
            },
            {
                q: 'Gibt es kostenlose KI für Programmierer?',
                a: 'Ja, mehrere Assistenten haben Gratis-Tarife, und Open-Source-Werkzeuge lassen sich mit eigenen Schlüsseln oder lokalen Modellen betreiben. Kostenlos heißt dann vor allem: Du schraubst selbst.',
            },
            {
                q: 'Kann KI ganze Apps bauen?',
                a: 'Für Prototypen oft ja. Für produktive Software brauchst du weiterhin Architektur, Review, Tests und Betrieb. Ein Rohbau steht schnell, bewohnbar wird er trotzdem nicht von allein.',
            },
            {
                q: 'Was kostet GitHub Copilot?',
                a: 'Laut GitHub-Doku gibt es Copilot Free mit 2.000 Code-Vervollständigungen pro Monat und automatischer Modellwahl, Copilot Pro für 10 US-Dollar, Pro+ für 39 US-Dollar und Max für 100 US-Dollar im Monat. Jeder Tarif enthält ein monatliches Kontingent an GitHub AI Credits, ungenutzte Credits verfallen am Monatsende, also lieber nicht horten (Stand Oktober 2026).',
            },
            {
                q: 'Was ist aus Continue und Tabnine geworden?',
                a: 'Continue wurde von Cursor übernommen. Das Open-Source-Projekt hat im Juni 2026 eine letzte Version 2.0.0 veröffentlicht und wird nicht mehr aktiv gepflegt. Tabnine hat Tricentis am 30. Juli 2026 gekauft, um die Kontext-Engine in seine Testplattform zu integrieren. Wer ein offenes Werkzeug mit eigenen API-Schlüsseln sucht, findet etwa in Cline (Apache 2.0) eine Alternative (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'GitHub Docs: Plans for GitHub Copilot',
                url: 'https://docs.github.com/en/copilot/get-started/plans',
            },
            {
                titel: 'GitHub Docs: Usage-based billing for individuals',
                url: 'https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing',
            },
            {
                titel: 'Continue: Continue has joined Cursor',
                url: 'https://continue.dev/',
            },
            {
                titel: 'Tricentis: Tricentis Acquires Tabnine',
                url: 'https://www.tricentis.com/news/tricentis-acquires-tabnine',
            },
            {
                titel: 'Cline auf GitHub',
                url: 'https://github.com/cline/cline',
            },
        ],
        geprueft: '2026-10-26',
    },
    agenten: {
        frage: 'Welcher KI-Agent passt zu deiner Aufgabe?',
        kriterien: [
            ['🎯', 'Klare Aufgabe', 'Recherche, Browser-Automatisierung, Programmierung oder Workflows: Agenten sind meist auf ein Feld spezialisiert.'],
            ['🛠️', 'Werkzeuge', 'Welche Werkzeuge darf der Agent nutzen, und lassen sie sich einzeln freigeben?'],
            ['👀', 'Kontrolle', 'Zeigt der Agent seinen Plan und fragt vor wichtigen Aktionen nach?'],
            ['🏠', 'Selbst hosten', 'Viele Agenten sind Open Source und laufen auf eigener Hardware, brauchen dafür aber Technikwissen.'],
            ['💶', 'Laufende Kosten', 'Agenten verbrauchen viele Tokens, weil sie mehrere Schritte gehen. Behalte die API-Kosten im Blick.'],
        ],
        tipp: 'Das Tutorial „KI-Agenten verstehen und sinnvoll einsetzen“ zeigt, wie du Ziel, Werkzeuge und Grenzen so formulierst, dass der Agent zuverlässig arbeitet. Ein guter Auftrag ist wie ein guter Werkstattzettel: klar, kurz und mit Grenze.',
        achtung:
            'Gib Agenten nur die Rechte, die sie brauchen, also nicht gleich den Generalschlüssel, und lass Käufe, Versand und Löschungen nie ohne Bestätigung laufen. Versteckte Anweisungen auf Webseiten können Agenten manipulieren (Prompt-Injection).',
        faq: [
            {
                q: 'Was ist ein KI-Agent?',
                a: 'Eine KI, die ein Ziel selbstständig in Schritte zerlegt, Werkzeuge nutzt und mehrere Schritte nacheinander abarbeitet, statt nur eine Antwort zu geben. Der Unterschied ist ungefähr der zwischen Rezept vorlesen und tatsächlich kochen.',
            },
            {
                q: 'Sind KI-Agenten sicher?',
                a: 'So sicher wie ihre Rechte. Mit wenigen Freigaben, Bestätigung vor wichtigen Aktionen und Prüfung der Ergebnisse lassen sich die Risiken begrenzen. Deinen Autoschlüssel gibst du ja auch nicht jedem, der freundlich fragt.',
            },
            {
                q: 'Agent oder Automatisierung?',
                a: 'Für feste, wiederkehrende Abläufe sind Automatisierungs-Tools oft zuverlässiger und günstiger, die spulen ihr Programm einfach ab. Agenten lohnen sich bei Aufgaben, deren Schritte nicht vorher feststehen.',
            },
            {
                q: 'Was ist das Model Context Protocol (MCP)?',
                a: 'MCP ist ein offener Standard, über den KI-Anwendungen Werkzeuge, Daten und Dienste anbinden, eine Art gemeinsamer Stecker für alle. Anthropic hat MCP am 9. Dezember 2025 an die neue Agentic AI Foundation unter dem Dach der Linux Foundation übergeben, zusammen mit goose von Block und AGENTS.md von OpenAI. Laut Linux Foundation unterstützen unter anderem ChatGPT, Claude, Cursor, Gemini, Microsoft Copilot und VS Code das Protokoll.',
            },
            {
                q: 'Welche Sicherheitsrisiken haben KI-Agenten?',
                a: 'Das OWASP GenAI Security Project hat im Dezember 2025 die Top 10 für agentische Anwendungen (Version 2026) veröffentlicht. Platz 1 ist Agent Goal Hijack: Versteckte Anweisungen in Webseiten, Dokumenten, E-Mails oder Kalendereinladungen lenken den Agenten auf ein fremdes Ziel um. Weitere Punkte sind etwa Werkzeugmissbrauch, Missbrauch von Identitäten und Rechten sowie vergiftete Erinnerungen. OWASP empfiehlt minimale Rechte und menschliche Freigabe für folgenreiche Aktionen.',
            },
        ],
        quellen: [
            {
                titel: 'Anthropic: Donating the Model Context Protocol and establishing the Agentic AI Foundation',
                url: 'https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation',
            },
            {
                titel: 'Linux Foundation: Formation of the Agentic AI Foundation',
                url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation',
            },
            {
                titel: 'OWASP: Top 10 for Agentic Applications for 2026',
                url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
            },
        ],
        geprueft: '2026-10-26',
    },
    audio: {
        frage: 'Welches KI-Audio-Tool brauchst du?',
        kriterien: [
            ['🗣️', 'Text zu Sprache', 'Für Voiceover, Hörfassungen und Videos: Klingen die deutschen Stimmen natürlich?'],
            ['📝', 'Sprache zu Text', 'Für Transkripte und Untertitel: Wie gut erkennt das Tool Dialekte, Fachbegriffe und mehrere Sprecher?'],
            ['🧬', 'Stimmen klonen', 'Nur mit Einwilligung der Person und nach den Regeln des Anbieters.'],
            ['🔓', 'Lokal oder Cloud', 'Open-Source-Modelle laufen auch lokal, gut für vertrauliche Aufnahmen.'],
            ['💶', 'Abrechnung', 'Nach Zeichen, Minuten oder Credits: Rechne mit deinem echten Monatsvolumen.'],
        ],
        tipp: 'Teste Stimmen mit einem Text voller Zahlen, Abkürzungen und Fachbegriffe. Daran scheitern die meisten zuerst, ganz ähnlich wie Menschen beim Vorlesen einer IBAN.',
        achtung: 'Fremde Stimmen klonst du nie ohne Einwilligung. Für Aufnahmen von Gesprächen brauchst du die Zustimmung aller Beteiligten.',
        faq: [
            {
                q: 'Welche KI-Stimme klingt am natürlichsten?',
                a: 'ElevenLabs steht in allen drei großen Community-Listen. Daneben gibt es viele Alternativen, auch Open Source. Teste mit deinem eigenen Text auf Deutsch, denn die Demo auf der Startseite zeigt naturgemäß die Schokoladenseite.',
            },
            {
                q: 'Gibt es kostenlose Transkriptions-Tools?',
                a: 'Ja, etwa Open-Source-Spracherkennung, die lokal läuft, und Gratis-Tarife vieler Meeting-Assistenten.',
            },
            {
                q: 'Darf ich meine eigene Stimme klonen?',
                a: 'Ja, die meisten Anbieter erlauben das mit Nachweis, damit nicht einfach jemand anderes deine Stimme bestellt. Bei fremden Stimmen brauchst du eine ausdrückliche Einwilligung.',
            },
            {
                q: 'Darf ich ElevenLabs im Gratis-Tarif kommerziell nutzen?',
                a: 'Nein. Laut ElevenLabs ist der Gratis-Tarif mit 10.000 Credits pro Monat, etwa 10 Minuten Audio, nur für private, nicht-kommerzielle Nutzung gedacht und verlangt eine Nennung von ElevenLabs. Kommerzielle Rechte gibt es ab dem Starter-Tarif für 6 US-Dollar im Monat. Das Modell Eleven v3 unterstützt 74 Sprachen, darunter Deutsch (Stand Oktober 2026).',
            },
            {
                q: 'Muss ich KI-Stimmen kennzeichnen?',
                a: 'Bei Deepfakes ja. Seit 2. August 2026 müssen Betreiber nach Art. 50 Abs. 4 der EU-KI-Verordnung offenlegen, wenn Bild-, Audio- oder Videoinhalte künstlich erzeugt oder verändert wurden und echten Personen, Orten oder Ereignissen täuschend ähneln. Bei erkennbar künstlerischen, satirischen oder fiktionalen Werken reicht ein Hinweis, der den Genuss des Werks nicht stört. Anbieter, deren Systeme schon vor dem 2. August 2026 auf dem Markt waren, haben für die technische Markierung bis 2. Dezember 2026 Zeit.',
            },
        ],
        quellen: [
            {
                titel: 'ElevenLabs: Text to Speech (FAQ zu Gratis-Tarif und kommerzieller Nutzung)',
                url: 'https://elevenlabs.io/text-to-speech',
            },
            {
                titel: 'ElevenLabs Preise',
                url: 'https://elevenlabs.io/de/pricing',
            },
            {
                titel: 'ElevenLabs Hilfe: What languages do you support?',
                url: 'https://help.elevenlabs.io/hc/en-us/articles/13313366263441-What-languages-do-you-support',
            },
            {
                titel: 'Verordnung (EU) 2024/1689 (KI-Verordnung), Art. 50',
                url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
            },
            {
                titel: 'Europäisches Parlament, Legislative Observatory: Digital Omnibus on AI',
                url: 'https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1910754',
            },
        ],
        geprueft: '2026-10-26',
    },
    musik: {
        frage: 'Welches KI-Musik-Tool passt zu deinem Projekt?',
        kriterien: [
            ['🎵', 'Was du brauchst', 'Ganzer Song mit Gesang, Hintergrundmusik, Jingle oder Soundeffekt: Die Tools sind unterschiedlich stark.'],
            ['⚖️', 'Nutzungsrechte', 'Darfst du die Musik kommerziell nutzen, etwa in Werbung, Videos oder Podcasts? Das hängt oft vom Tarif ab.'],
            ['✂️', 'Bearbeitung', 'Kannst du Teile verlängern, Spuren trennen oder Tempo und Stil anpassen?'],
            ['🎚️', 'Qualität und Format', 'Exportformat, Länge und Klangqualität für deine Plattform prüfen.'],
            ['💶', 'Credits', 'Viele Tools rechnen in Songs oder Credits pro Monat.'],
        ],
        tipp: 'Beschreibe Genre, Stimmung, Tempo, Instrumente und Einsatzzweck. Je konkreter der Prompt, desto weniger Versuche brauchst du, und desto seltener landest du bei Fahrstuhlmusik.',
        achtung: 'Prüfe vor jeder kommerziellen Nutzung die aktuellen Lizenzbedingungen. Und bewirb keine Songs im Stil bestimmter Künstler mit deren Namen.',
        faq: [
            {
                q: 'Kann ich KI-Musik kommerziell nutzen?',
                a: 'Das regelt jeder Anbieter in seinen Bedingungen, oft nur in bezahlten Tarifen. Lies die Lizenz, bevor du Musik in Werbung oder monetarisierten Videos nutzt, sonst wird der Ohrwurm zum Bumerang.',
            },
            {
                q: 'Welche KI macht Songs mit Gesang?',
                a: 'In den Community-Listen finden sich mehrere Song-Generatoren mit Gesang, etwa Suno. Udio hat nach seinen Lizenzdeals mit Universal und Warner Downloads abgeschaltet, Songs bleiben dort auf der Plattform. Teste mit demselben Prompt, welcher Stil dir besser gefällt, am Ende entscheiden deine Ohren.',
            },
            {
                q: 'Gibt es KI-Musik ohne Urheberrechtsprobleme?',
                a: 'Garantieren kann das niemand pauschal, und wer es tut, lehnt sich weit aus dem Fenster. Achte auf klare Nutzungsrechte des Anbieters und dokumentiere, mit welchem Tool und Tarif du die Musik erzeugt hast.',
            },
            {
                q: 'Wie viele Songs darf ich bei Suno herunterladen?',
                a: 'Seit 3. September 2026 begrenzt Suno die Downloads: Im Gratis-Tarif gibt es insgesamt bis zu 7 Test-Downloads nur für private Zwecke, Pro erlaubt 20 und Premier 60 Downloads pro Monat, jeweils mit kommerziellen Nutzungsrechten. Kommerziell verwerten darfst du laut Suno-Bedingungen nur Songs, die du als zahlender Abonnent offiziell heruntergeladen hast. Zusätzliche Downloads lassen sich kaufen (Stand Oktober 2026).',
            },
            {
                q: 'Was hat das Landgericht München zu Suno entschieden?',
                a: 'Am 31. Juli 2026 hat das Landgericht München I der Klage der GEMA gegen Suno überwiegend stattgegeben (Az. 42 O 763/25). Es ging um sechs Werke wie „Atemlos durch die Nacht“ und „Daddy Cool“, die laut Gericht beim Training vervielfältigt, im Modell gespeichert und in Outputs wiedergegeben wurden. Das Urteil ist nicht rechtskräftig. Schon im November 2025 hatte die GEMA vor demselben Gericht gegen OpenAI gewonnen.',
            },
        ],
        quellen: [
            {
                titel: 'Udio Help Center: Changes associated with the UMG partnership',
                url: 'https://help.udio.com/en/articles/12683565-changes-associated-with-the-universal-music-group-umg-partnership',
            },
            {
                titel: 'Suno Help: Upcoming Changes FAQ (Downloads, Models, Terms)',
                url: 'https://help.suno.com/en/articles/13614785',
            },
            {
                titel: 'Suno Terms of Service',
                url: 'https://suno.com/terms',
            },
            {
                titel: 'LG München I, Pressemitteilung 16/2026: Urteil GEMA gegen SUNO',
                url: 'https://www.justiz.bayern.de/gerichte-und-behoerden/landgericht/muenchen-1/presse/2026/16.php',
            },
            {
                titel: 'GEMA: Entscheidung gegen SUNO',
                url: 'https://www.gema.de/de/w/suno-entscheidung-2026',
            },
        ],
        geprueft: '2026-10-26',
    },
    suche: {
        frage: 'Welche KI-Suchmaschine passt zu dir?',
        kriterien: [
            ['🔗', 'Quellen', 'Zeigt die Suche zu jeder Aussage, woher sie stammt, und kannst du die Quelle direkt öffnen?'],
            ['🕒', 'Aktualität', 'Wie aktuell sind die Ergebnisse? Für Nachrichten und Preise zählt jede Woche.'],
            ['🎚️', 'Tiefe', 'Schnelle Antwort oder ausführliche Recherche über viele Quellen: Viele Tools bieten beides.'],
            ['🔒', 'Privatsphäre', 'Werden Suchanfragen gespeichert oder zum Training genutzt? Gibt es Open-Source-Alternativen zum Selbsthosten?'],
            ['🌍', 'Deutsch', 'Findet die Suche auch deutschsprachige Quellen und antwortet sauber auf Deutsch?'],
        ],
        tipp: 'Frag nach Quellen und öffne mindestens zwei davon. Eine gute KI-Suche spart dir das Klicken nicht ganz, aber sie zeigt dir, wo sich das Klicken lohnt.',
        achtung: 'Auch KI-Suchmaschinen können Quellen falsch zusammenfassen, Stille Post mit Fußnoten sozusagen. Zahlen, Zitate und Daten prüfst du immer in der Originalquelle.',
        faq: [
            {
                q: 'Was ist eine KI-Suchmaschine?',
                a: 'Eine Suche, die statt einer Linkliste eine zusammengefasste Antwort liefert und die verwendeten Quellen verlinkt. Erst die Zusammenfassung, auf Wunsch dann der Beipackzettel.',
            },
            {
                q: 'Welche KI-Suchmaschine ist die beste?',
                a: 'Perplexity AI steht in allen drei großen Community-Listen. Daneben gibt es spezialisierte Suchen etwa für Entwickler oder Wissenschaft. Teste mit einer Frage, deren Antwort du schon kennst, das ist der ehrlichste Prüfstand, den du hast.',
            },
            {
                q: 'Ersetzt KI-Suche Google?',
                a: 'Für Erklärungen und Überblicke oft ja, für Navigation, lokale Suche und Shopping nutzen viele weiterhin klassische Suchmaschinen. Den Döner um die Ecke findest du also vermutlich weiter auf dem alten Weg.',
            },
            {
                q: 'Gibt es Googles KI-Modus auf Deutsch?',
                a: 'Ja. Google hat den KI-Modus am 8. Oktober 2025 in Deutschland, Österreich und der Schweiz eingeführt. Du erreichst ihn über google.com/ai, den Tab auf der Ergebnisseite oder die Google-App. Seit 13. Oktober 2026 können Abonnenten von Google AI Pro und Ultra dort auch Gemini 4 Argon nutzen (Stand Oktober 2026).',
            },
            {
                q: 'Was ist Perplexity Comet?',
                a: 'Comet ist der KI-Browser von Perplexity. Seit 2. Oktober 2025 kann ihn jeder kostenlos über perplexity.ai/comet herunterladen. Ein Assistent in der Seitenleiste beantwortet Fragen zur geöffneten Seite, fasst Inhalte zusammen und erledigt Aufgaben im Browser. Bei solchen Agenten-Browsern solltest du auf Prompt-Injection über manipulierte Webseiten achten.',
            },
        ],
        quellen: [
            {
                titel: 'Google Blog: Der KI-Modus startet in Deutschland, Österreich und der Schweiz',
                url: 'https://blog.google/intl/de-de/produkte/suchen-entdecken/ki-modus-startet-in-dach/',
            },
            {
                titel: 'Google Suche-Hilfe: KI-Modus',
                url: 'https://support.google.com/websearch/answer/16011537?hl=de',
            },
            {
                titel: 'Google Blog: Gemini 4 Argon is now available for everyone',
                url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/',
            },
            {
                titel: 'Perplexity: The Internet is Better on Comet',
                url: 'https://www.perplexity.ai/hub/blog/comet-is-now-available-to-everyone-worldwide',
            },
        ],
        geprueft: '2026-10-26',
    },
    recherche: {
        frage: 'Welche KI hilft dir bei Recherche und Wissenschaft?',
        kriterien: [
            ['📚', 'Quellenbasis', 'Durchsucht das Tool wissenschaftliche Datenbanken, das offene Web oder nur deine eigenen Dokumente?'],
            ['🔍', 'Nachprüfbarkeit', 'Zeigt es Zitate mit Fundstelle, damit du die Aussage im Paper findest?'],
            ['📄', 'PDFs', 'Kann es eigene PDFs lesen, zusammenfassen und Fragen dazu beantworten?'],
            ['🧾', 'Zitierweise', 'Exportiert es Literaturangaben für deine Literaturverwaltung?'],
            ['🔒', 'Unveröffentlichtes', 'Was passiert mit hochgeladenen Manuskripten und Daten?'],
        ],
        tipp: 'Nutze KI-Recherche für den Überblick und zum Finden von Quellen. Die wichtigsten Paper liest du trotzdem selbst, mindestens Abstract, Methodik und Ergebnisse. Die KI ist dein Bibliothekar, nicht dein Gutachter.',
        achtung: 'KI kann Studien falsch wiedergeben oder Quellen erfinden. Zitiere nur, was du selbst geöffnet und gelesen hast, und beachte die Regeln deiner Hochschule.',
        faq: [
            {
                q: 'Welche KI eignet sich für wissenschaftliche Recherche?',
                a: 'In den Community-Listen stehen dafür unter anderem Consensus, Elicit und SciSpace. Sie durchsuchen wissenschaftliche Literatur und zeigen dir die Quellen, statt nur nett zu plaudern.',
            },
            {
                q: 'Darf ich KI für meine Abschlussarbeit nutzen?',
                a: 'Das regelt deine Hochschule, also lies vorher nach. Häufig ist Recherchehilfe erlaubt, KI-geschriebene Textteile aber kennzeichnungspflichtig oder verboten.',
            },
            {
                q: 'Kann KI PDFs zusammenfassen?',
                a: 'Ja, viele Tools lesen PDFs, auch die dicken mit langem Anhang. Prüfe wichtige Aussagen an der angegebenen Textstelle.',
            },
            {
                q: 'Wie viele Paper durchsucht Elicit?',
                a: 'Laut Elicit rund 138 Mio. wissenschaftliche Arbeiten aus Semantic Scholar, PubMed und OpenAlex, wöchentlich aktualisiert. Der Gratis-Tarif erlaubt unbegrenzte Suche und Zusammenfassungen, Research Agent und Berichte sind dort begrenzt. Den Volltext liest Elicit nur bei Open-Access-Papern oder mit Browser-Erweiterung und eigenem Zeitschriftenzugang (Stand Oktober 2026).',
            },
            {
                q: 'Was ist Gemini Notebook?',
                a: 'So heißt NotebookLM seit 16. Juli 2026. Das Werkzeug beantwortet Fragen auf Basis deiner eigenen Quellen und erstellt daraus etwa Audio- und Videozusammenfassungen. Neu ist laut Google ein sicherer Cloud-Rechner pro Notizbuch, mit dem Gemini Notebook Code ausführt und Daten aus deinen Quellen analysiert, zuerst für Google AI Ultra, danach für Pro im Web. Bestehende Links werden automatisch weitergeleitet, deine Lesezeichen kannst du also behalten.',
            },
        ],
        quellen: [
            {
                titel: "Elicit Support: Elicit's source for papers",
                url: 'https://support.elicit.com/en/articles/14758040-elicit-s-source-for-papers',
            },
            {
                titel: 'Elicit Pricing',
                url: 'https://elicit.com/pricing',
            },
            {
                titel: 'Google Blog: NotebookLM is now Gemini Notebook',
                url: 'https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/',
            },
            {
                titel: 'Google Workspace Updates: NotebookLM is now Gemini Notebook',
                url: 'https://workspaceupdates.googleblog.com/2026/07/notebooklm-now-gemini-notebook.html',
            },
        ],
        geprueft: '2026-10-26',
    },
    modelle: {
        frage: 'Welches KI-Modell oder welche Plattform passt zu deinem Projekt?',
        kriterien: [
            ['☁️', 'API oder lokal', 'Willst du ein Modell per API nutzen oder offene Gewichte selbst betreiben?'],
            ['📏', 'Größe und Hardware', 'Lokale Modelle brauchen je nach Parameterzahl viel Grafikspeicher. Prüfe, was auf deine Hardware passt.'],
            ['⚖️', 'Lizenz', 'Offene Modelle haben sehr unterschiedliche Lizenzen. Darfst du sie kommerziell nutzen?'],
            ['🧪', 'Eignung', 'Benchmarks geben eine Richtung. Entscheidend ist der Test mit deinen eigenen Aufgaben.'],
            ['💶', 'Kosten', 'API-Preise pro Token oder eigene Hardware und Strom: Der API-Kosten-Rechner hilft beim Vergleich.'],
        ],
        tipp: 'Starte mit einer Plattform wie Ollama oder LM Studio, um offene Modelle lokal auszuprobieren, bevor du in Hardware oder Fine-Tuning investierst. Erst Probefahrt, dann Garage umbauen.',
        achtung:
            'Lies die Lizenz jedes offenen Modells vor dem kommerziellen Einsatz, denn „offen“ heißt nicht automatisch „frei für alles“. Benchmark-Ranglisten sagen wenig darüber, wie gut ein Modell deine konkrete Aufgabe löst.',
        faq: [
            {
                q: 'Was ist ein Open-Weight-Modell?',
                a: 'Ein Modell, dessen Gewichte veröffentlicht sind. Du kannst es selbst betreiben, oft auch lokal ohne Cloud, sozusagen KI zum Mitnehmen.',
            },
            {
                q: 'Welches KI-Modell kann ich lokal nutzen?',
                a: 'Es gibt viele offene Modellfamilien, etwa Gemma, Mistral, Qwen, Metas neue Muse-Modelle oder die älteren Llama-Modelle, in verschiedenen Größen. Seiten wie llmrun oder runthisllm in der Datenbank zeigen dir, was auf deine Hardware passt.',
            },
            {
                q: 'Wie vergleiche ich KI-Modelle?',
                a: 'Mit denselben Aufgaben aus deinem Alltag, nicht mit Rekordtabellen. Der KI-Test auf mentat.codes liefert dafür Aufgaben und einen Bewertungsbogen.',
            },
            {
                q: 'Darf ich Gemma 4 kommerziell nutzen?',
                a: 'Ja. Google hat Gemma 4 am 2. April 2026 veröffentlicht, erstmals unter der Open-Source-Lizenz Apache 2.0. Es gibt vier Größen: E2B und E4B für Smartphones und Edge-Geräte, ein 26B-Mixture-of-Experts-Modell und ein 31B-Dense-Modell. Die Gewichte stehen unter anderem bei Hugging Face, Kaggle, Ollama und LM Studio bereit (Stand Oktober 2026).',
            },
            {
                q: 'Was ist Muse Spark Open?',
                a: 'Ein offenes Modell von Meta, dessen Gewichte am 15. Oktober 2026 erschienen sind. Laut Meta hat es 816 Mrd. Parameter, davon 42 Mrd. aktiv, und ein Kontextfenster von 1 Mio. Tokens. Für normale Rechner ist es eine Nummer zu groß: Meta nennt zwei Mac Studios mit M5 Ultra als Desktop-Variante. Die Muse Model License erlaubt kommerzielle Nutzung nur eingeschränkt, lies sie vor dem Einsatz.',
            },
        ],
        quellen: [
            {
                titel: 'Google Blog: Gemma 4',
                url: 'https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/',
            },
            {
                titel: 'Google Open Source Blog: Gemma 4 with Apache 2.0',
                url: 'https://opensource.googleblog.com/2026/03/gemma-4-expanding-the-gemmaverse-with-apache-20.html',
            },
            {
                titel: 'Google DeepMind: Gemma 4',
                url: 'https://deepmind.google/models/gemma/gemma-4/',
            },
            {
                titel: 'Meta AI Research: Introducing Muse Spark Open',
                url: 'https://research.meta.ai/blog/muse-spark-open',
            },
        ],
        geprueft: '2026-10-26',
    },
    sicherheit: {
        frage: 'Welche Werkzeuge für KI-Erkennung und Sicherheit brauchst du?',
        kriterien: [
            ['🕵️', 'Erkennung', 'KI-Detektoren für Text sind unzuverlässig. Für Bilder und Videos sind Herkunftsnachweise wie C2PA oder Wasserzeichen aussagekräftiger.'],
            ['🛡️', 'Schutz eigener KI-Anwendungen', 'Prüfen die Tools auf Prompt-Injection, Jailbreaks und Datenabfluss?'],
            ['🔍', 'Code-Sicherheit', 'Finden und beheben Sicherheitswerkzeuge Lücken auch in KI-generiertem Code?'],
            ['📋', 'Nachvollziehbarkeit', 'Gibt es Protokolle und Berichte, die du für Prüfungen oder Audits brauchst?'],
            ['⚖️', 'Rechtlicher Rahmen', 'Für Sicherheitstests brauchst du immer eine Erlaubnis des Systembetreibers.'],
        ],
        tipp: 'Nutze für die Herkunft von Bildern Prüfwerkzeuge für Content Credentials. Fehlt eine Herkunftsangabe, beweist das allerdings nicht, dass ein Bild echt oder gefälscht ist. Kein Etikett heißt nur: kein Etikett.',
        achtung: 'Kein KI-Detektor ist zuverlässig genug für harte Entscheidungen wie Noten oder Kündigungen. Penetrationstests führst du nur mit ausdrücklicher Erlaubnis durch.',
        faq: [
            {
                q: 'Kann man KI-Texte zuverlässig erkennen?',
                a: 'Nein. KI-Detektoren liefern oft falsche Treffer, auch bei menschlichen Texten. Sie taugen höchstens als Hinweis, nie als Beweis.',
            },
            {
                q: 'Wie erkenne ich KI-Bilder?',
                a: 'Am verlässlichsten über Herkunftsangaben wie C2PA-Content-Credentials oder Wasserzeichen der Anbieter. Sichtbare Fehler im Bild werden mit besseren Modellen seltener, auf den sechsten Finger würde ich also nicht mehr wetten.',
            },
            {
                q: 'Was ist Prompt-Injection?',
                a: 'Ein Angriff mit versteckten Anweisungen in Texten oder Webseiten, die eine KI dazu bringen sollen, ihre Regeln zu ignorieren. Stell dir einen Zettel im Werkstattauftrag vor, auf dem klein steht: Bremsen bitte weglassen.',
            },
            {
                q: 'Wie prüfe ich, ob ein Inhalt mit Google-KI erstellt wurde?',
                a: 'Seit 7. Oktober 2026 ist Googles SynthID Detector weltweit für alle verfügbar, vorerst auf Englisch. Er prüft Bilder, Videos und Audio auf das unsichtbare SynthID-Wasserzeichen von Google und Partnern wie OpenAI und NVIDIA. In der Gemini-App kannst du außerdem fragen, ob ein Bild mit KI erstellt wurde, dort prüft Google auch C2PA-Content-Credentials. Ein fehlendes Wasserzeichen beweist aber nicht, dass ein Inhalt echt ist.',
            },
            {
                q: 'Müssen KI-Inhalte in der EU markiert werden?',
                a: 'Ja. Seit 2. August 2026 verlangt Art. 50 Abs. 2 der EU-KI-Verordnung, dass Anbieter generativer KI ihre Bild-, Audio-, Video- und Textausgaben maschinenlesbar als KI-erzeugt markieren. Systeme, die schon vorher auf dem Markt waren, haben bis 2. Dezember 2026 Zeit. Zur Umsetzung hat die EU-Kommission am 10. Juni 2026 einen freiwilligen Verhaltenskodex veröffentlicht, den bis Ende Juli 2026 rund 190 Organisationen unterzeichnet hatten (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'Google Blog: Google expands SynthID Detector for AI content',
                url: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/',
            },
            {
                titel: 'Google Blog: Tools to understand how content was created and edited',
                url: 'https://blog.google/innovation-and-ai/products/identifying-ai-generated-media-online/',
            },
            {
                titel: 'EU-Kommission: Code of Practice on Transparency of AI-generated Content',
                url: 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content',
            },
            {
                titel: 'Verordnung (EU) 2024/1689 (KI-Verordnung), Art. 50',
                url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
            },
            {
                titel: 'Europäisches Parlament, Legislative Observatory: Digital Omnibus on AI',
                url: 'https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1910754',
            },
        ],
        geprueft: '2026-10-26',
    },
    finanzen: {
        frage: 'Welche KI-Werkzeuge helfen bei Finanzanalyse?',
        kriterien: [
            ['📊', 'Datenquellen', 'Woher kommen Kurse und Kennzahlen, und wie aktuell sind sie?'],
            ['🧮', 'Nachvollziehbarkeit', 'Zeigt das Tool Rechenwege und Quellen, oder nur ein Ergebnis?'],
            ['🔓', 'Open Source', 'Viele Werkzeuge sind offen und programmierbar, brauchen dafür aber Technikwissen.'],
            ['🧪', 'Backtesting', 'Strategien vorher auf historischen Daten testen, bevor echtes Geld im Spiel ist.'],
            ['🔒', 'Kontodaten', 'Gib Zugangsdaten zu Konten und Depots nur an vertrauenswürdige, regulierte Anbieter.'],
        ],
        tipp: 'Nutze KI für Recherche, Zusammenfassungen und das Strukturieren deiner Überlegungen, nicht als Orakel für Kauf- und Verkaufsentscheidungen. Eine Glaskugel mit Internetanschluss bleibt eine Glaskugel.',
        achtung: 'Keine Anlageberatung: KI-Ergebnisse können falsch oder veraltet sein. Vergangene Wertentwicklung ist kein Hinweis auf künftige Erträge, auch wenn die Kurve noch so hübsch aussieht.',
        faq: [
            {
                q: 'Kann KI Aktienkurse vorhersagen?',
                a: 'Nicht verlässlich. KI kann Daten auswerten und Szenarien durchspielen, aber Märkte hängen von vielen unvorhersehbaren Faktoren ab.',
            },
            {
                q: 'Welche KI-Tools gibt es für Finanzen?',
                a: 'In der Datenbank stehen unter anderem Recherche-Plattformen, Datenbibliotheken und Frameworks für quantitative Analysen, viele davon Open Source.',
            },
            {
                q: 'Darf ich KI für meine Steuererklärung nutzen?',
                a: 'Als Hilfe beim Verstehen und Sortieren ja, etwa um den Belegestapel zu bändigen. Für verbindliche Auskünfte bleiben Steuerberatung und offizielle Quellen maßgeblich.',
            },
            {
                q: 'Was sagt die EU-Finanzaufsicht zu KI-Anlagetipps?',
                a: 'Die Europäische Wertpapier- und Marktaufsichtsbehörde ESMA warnt Privatanleger: Öffentlich verfügbare KI-Tools sind weder zugelassen noch beaufsichtigt, müssen nicht in deinem besten Interesse handeln und können auf veralteten, falschen oder unvollständigen Informationen beruhen. Die ESMA rät, Anlageentscheidungen nicht allein auf solche Tools zu stützen und dort keine persönlichen Finanzdaten einzugeben.',
            },
            {
                q: 'Gilt die EU-KI-Verordnung auch für Kredit-Scoring?',
                a: 'Ja. KI-Systeme, die die Kreditwürdigkeit natürlicher Personen bewerten oder ihren Kredit-Score festlegen, sind nach Anhang III der EU-KI-Verordnung Hochrisiko-Systeme, ausgenommen ist KI zur Aufdeckung von Finanzbetrug. Durch die Digital-Omnibus-Verordnung (EU) 2026/1744 gelten die Hochrisiko-Pflichten für solche Systeme erst ab 2. Dezember 2027 (Stand Oktober 2026).',
            },
        ],
        quellen: [
            {
                titel: 'ESMA: Warning on the use of AI for investing',
                url: 'https://www.esma.europa.eu/document/warning-use-ai-investing',
            },
            {
                titel: 'ESMA: Public Statement on AI and investment services',
                url: 'https://www.esma.europa.eu/document/public-statement-ai-and-investment-services',
            },
            {
                titel: 'Verordnung (EU) 2024/1689 (KI-Verordnung), Anhang III',
                url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
            },
            {
                titel: 'Verordnung (EU) 2026/1744 (Digital Omnibus on AI)',
                url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
            },
        ],
        geprueft: '2026-10-26',
    },
}
