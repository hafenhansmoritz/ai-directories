// KI- und Prompt-Glossar: Begriff, Erklärung, optional ein Link auf die passende Seite von AIGeddon.
export const KI_GLOSSAR = [
    ['Prompt', 'Die Eingabe an eine KI: Frage, Aufgabe oder Anweisung, am besten mit Ziel, Kontext und Format.', '/prompts'],
    [
        'Prompt Engineering',
        'Das gezielte Formulieren von Prompts mit Rolle, Kontext, Format und Techniken wie Beispielen oder Rückfragen, um verlässlich gute Ergebnisse zu bekommen.',
        '/tutorials/prompt-engineering-in-15-minuten',
    ],
    ['System-Prompt', 'Feste Anweisungen, die vor jedem Gespräch gelten, etwa Rolle, Ton und Regeln eines Assistenten. Nutzer sehen sie meist nicht.', '/tutorials/eigenen-ki-assistenten-bauen'],
    ['Rollen-Prompt', 'Prompt, der der KI eine Rolle gibt („Du bist erfahrener Steuerberater“). Das steuert Fachwissen, Wortwahl und Tiefe.', '/prompts/archiv'],
    ['Zero-Shot', 'Die KI löst eine Aufgabe ohne Beispiel, nur anhand der Beschreibung.', null],
    ['Few-Shot', 'Der Prompt enthält ein oder mehrere Beispiele, an denen sich die KI für Stil, Länge und Format orientiert.', '/tutorials/prompt-engineering-in-15-minuten'],
    ['Chain of Thought', 'Technik, bei der die KI Schritt für Schritt vorgeht und Zwischenschritte zeigt. Senkt Denkfehler bei mehrstufigen Aufgaben.', null],
    [
        'Prompt-Kette',
        'Mehrere Prompts hintereinander, bei denen jeder Schritt auf dem Ergebnis des vorherigen aufbaut. Zuverlässiger als ein Riesen-Prompt.',
        '/tutorials/prompt-kette-vom-thema-zum-artikel',
    ],
    ['Meta-Prompt', 'Ein Prompt, der die KI bittet, einen anderen Prompt zu verbessern oder zu schreiben.', '/prompts/prompt-verbessern'],
    [
        'Large Language Model (LLM)',
        'Großes Sprachmodell, das auf riesigen Textmengen trainiert wurde und Text fortsetzt, zusammenfasst, übersetzt oder Fragen beantwortet. Beispiele: die Modelle hinter ChatGPT, Claude und Gemini.',
        '/ki-tools/modelle',
    ],
    [
        'Token',
        'Die Einheit, in die Sprachmodelle Text zerlegen: ein Wort, Wortteil oder Satzzeichen. Bei englischem Text entspricht ein Token laut OpenAI grob 4 Zeichen, andere Sprachen wie Deutsch brauchen oft mehr Tokens für dieselbe Textmenge. API-Kosten werden pro Token berechnet.',
        '/rechner/api-kosten',
    ],
    ['Kontextfenster', 'Wie viel Text ein Modell auf einmal berücksichtigen kann, gemessen in Tokens: Prompt, Dateien, bisheriger Chat und die erzeugte Antwort zusammen.', null],
    ['Temperatur', 'Einstellung, die steuert, wie zufällig die Antworten sind. Niedrig: vorhersehbar und sachlich; hoch: kreativer und abwechslungsreicher.', null],
    [
        'Top-p',
        'Weitere Einstellung für die Zufälligkeit (Nucleus Sampling): Das Modell wählt das nächste Token nur aus der kleinsten Gruppe der wahrscheinlichsten Tokens, deren Wahrscheinlichkeiten zusammen mindestens p erreichen.',
        null,
    ],
    ['Halluzination', 'Eine überzeugend formulierte, aber falsche oder erfundene Antwort, etwa eine Studie oder ein Zitat, das es nicht gibt.', '/ki-test/ehrlichkeit'],
    ['Grounding', 'Antworten an überprüfbare Quellen binden, etwa an Suchergebnisse oder eigene Dokumente. Senkt Halluzinationen.', null],
    ['RAG (Retrieval-Augmented Generation)', 'Verfahren, bei dem vor der Antwort passende Textstellen aus eigenen Daten gesucht und dem Modell mitgegeben werden.', null],
    ['Embedding', 'Darstellung eines Textes als Zahlenreihe (Vektor), sodass ähnliche Bedeutungen ähnliche Zahlen haben. Grundlage für semantische Suche.', null],
    ['Vektordatenbank', 'Datenbank, die Embeddings speichert und ähnliche Inhalte schnell findet. Häufig Teil von RAG-Systemen.', null],
    ['Fine-Tuning', 'Nachtrainieren eines fertigen Modells mit eigenen Beispielen, damit es eine Aufgabe oder einen Stil besonders gut beherrscht.', null],
    ['Inferenz', 'Das Ausführen eines trainierten Modells, also das Erzeugen einer Antwort. Kosten und Geschwindigkeit der Inferenz entscheiden über den Preis.', null],
    ['Parameter', 'Die gelernten Zahlenwerte eines Modells. Mehr Parameter bedeuten nicht automatisch bessere Antworten, aber meist mehr Rechenaufwand.', null],
    ['Trainingsdaten', 'Die Texte, Bilder oder anderen Daten, aus denen ein Modell gelernt hat.', null],
    ['Wissensstand (Knowledge Cutoff)', 'Zeitpunkt, bis zu dem die Trainingsdaten eines Modells reichen. Neueres weiß es nur über Websuche oder mitgegebene Informationen.', '/ki-test/ehrlichkeit'],
    ['Multimodal', 'Ein Modell, das mehrere Arten von Eingaben versteht oder erzeugt, etwa Text, Bilder, Audio und Video.', null],
    ['KI-Agent', 'KI, die eine Aufgabe selbstständig in Schritte zerlegt, Werkzeuge nutzt und mehrere Schritte nacheinander abarbeitet.', '/ki-tools/agenten'],
    ['Tool Use (Function Calling)', 'Fähigkeit eines Modells, externe Werkzeuge aufzurufen, etwa eine Suche, einen Rechner oder eine Schnittstelle, und das Ergebnis weiterzuverwenden.', null],
    [
        'MCP (Model Context Protocol)',
        'Offener Standard, über den KI-Assistenten an externe Werkzeuge und Datenquellen angebunden werden. Anthropic hat MCP 2024 veröffentlicht und im Dezember 2025 an die Agentic AI Foundation der Linux Foundation übergeben; ChatGPT, Claude, Gemini und viele Coding-Tools unterstützen es.',
        null,
    ],
    ['API', 'Programmierschnittstelle. Über die API eines Anbieters nutzen Apps ein KI-Modell direkt und zahlen pro Token.', '/rechner/api-kosten'],
    ['Prompt-Injection', 'Angriff, bei dem versteckte Anweisungen in Texten, Webseiten oder Dateien eine KI dazu bringen sollen, ihre eigentlichen Regeln zu ignorieren.', null],
    ['Jailbreak', 'Versuch, die Sicherheitsregeln eines Modells mit geschickten Prompts zu umgehen.', null],
    ['Guardrails', 'Schutzregeln und Filter rund um ein Modell, die unerwünschte oder gefährliche Ausgaben verhindern sollen.', null],
    [
        'Custom GPT',
        'Eigener Assistent in ChatGPT mit festen Anweisungen und eigenem Wissen. OpenAI schaltet Custom GPTs am 11. Dezember 2026 ab, Nachfolger sind Plugins. In Claude kommen Projects dem am nächsten, in Gemini heißen solche Assistenten Gems.',
        '/tutorials/eigenen-ki-assistenten-bauen',
    ],
    ['Diffusionsmodell', 'Bauart vieler Bildgeneratoren: Das Modell erzeugt aus Rauschen Schritt für Schritt ein Bild passend zum Prompt.', '/tutorials/bild-prompts-schreiben'],
    ['Text-to-Speech (TTS)', 'Sprachausgabe: KI liest Text mit einer natürlichen Stimme vor.', '/ki-tools/audio'],
    ['Speech-to-Text', 'Spracherkennung: KI wandelt gesprochene Sprache in Text um, etwa für Transkripte und Untertitel.', '/ki-tools/audio'],
    ['Open-Weight-Modell', 'Modell, dessen Gewichte veröffentlicht sind. Es lässt sich selbst betreiben, oft auch lokal ohne Cloud.', '/ki-tools/kostenlos'],
    ['Benchmark', 'Standardisierter Test, mit dem Modelle verglichen werden. Gute Benchmark-Werte garantieren nicht, dass ein Modell deine Aufgaben am besten löst.', '/ki-test'],
    ['Batch-Verarbeitung', 'Viele Anfragen gesammelt und zeitversetzt verarbeiten. Bei mehreren Anbietern deutlich günstiger als Einzelanfragen.', '/rechner/api-kosten'],
    ['Prompt Caching', 'Wiederkehrende Teile eines Prompts werden zwischengespeichert, sodass sie bei der nächsten Anfrage günstiger und schneller verarbeitet werden.', '/rechner/api-kosten'],
    ['KI-Detektor', 'Werkzeug, das einschätzen soll, ob ein Text von einer KI stammt. Die Ergebnisse sind unzuverlässig und taugen nicht als Beweis.', '/ki-tools/sicherheit'],
    ['Transformer', 'Die Modellarchitektur hinter fast allen modernen Sprachmodellen. Ein Mechanismus namens Attention gewichtet, welche Teile des Textes für das nächste Token wichtig sind.', null],
    ['Reasoning-Modell', 'Sprachmodell, das vor der Antwort länger „nachdenkt“ und Zwischenschritte durchrechnet. Stärker bei Logik, Mathematik und Code, dafür langsamer und oft teurer.', '/ki-test'],
    [
        'Kontext-Engineering',
        'Die Kunst, einer KI genau die Informationen mitzugeben, die sie für eine Aufgabe braucht: Anweisungen, Beispiele, Dokumente, Werkzeuge und Gesprächsverlauf, nicht mehr und nicht weniger.',
        '/tutorials/eigenen-ki-assistenten-bauen',
    ],
    [
        'Vibe Coding',
        'Programmieren, bei dem man der KI in natürlicher Sprache beschreibt, was entstehen soll, und den erzeugten Code vor allem nach dem Ergebnis beurteilt statt Zeile für Zeile.',
        '/ki-tools/coding',
    ],
    ['Inpainting', 'Bildbearbeitung mit KI, bei der ein markierter Bereich neu erzeugt oder ersetzt wird, etwa ein störendes Objekt entfernt oder ein Kleidungsstück verändert.', '/ki-tools/bild'],
    ['Upscaling', 'Vergrößern eines Bildes oder Videos mit KI, wobei fehlende Details berechnet werden, damit es auch in höherer Auflösung scharf wirkt.', '/ki-tools/bild'],
    [
        'Deepfake',
        'Mit KI erzeugtes oder verändertes Bild, Video oder Audio, das eine echte Person täuschend echt etwas sagen oder tun lässt, das sie nie gesagt oder getan hat.',
        '/ki-tools/sicherheit',
    ],
    [
        'C2PA',
        'Offener technischer Standard der Coalition for Content Provenance and Authenticity für Herkunftsangaben bei Bildern, Videos und Audio. Signierte „Content Credentials“ können zeigen, mit welchem Gerät oder Programm ein Bild entstanden ist und ob KI beteiligt war.',
        '/ki-tools/sicherheit',
    ],
    ['LoRA', 'Verfahren, mit dem sich große Modelle mit wenig Rechenaufwand anpassen lassen. Statt das ganze Modell neu zu trainieren, werden nur kleine Zusatzgewichte gelernt.', null],
    [
        'Quantisierung',
        'Verkleinern eines Modells, indem seine Zahlenwerte mit weniger Genauigkeit gespeichert werden. Das spart Speicher und macht lokale Nutzung möglich, kostet aber etwas Qualität.',
        '/ki-tools/modelle',
    ],
    ['VRAM', 'Der Grafikspeicher einer GPU. Er bestimmt, wie große KI-Modelle lokal laufen können, weil die Modellgewichte während der Nutzung dort liegen.', '/ki-tools/modelle'],
    ['Latenz', 'Die Zeit zwischen Anfrage und Antwort eines KI-Modells. Wichtig für Chatbots, Sprachassistenten und alle Anwendungen, bei denen Nutzer warten.', null],
    ['Rate Limit', 'Obergrenze, wie viele Anfragen oder Tokens man in einem Zeitraum an eine KI-API oder einen Chatbot schicken darf.', '/rechner/api-kosten'],
    ['Bias', 'Verzerrung in den Antworten eines Modells, die aus einseitigen Trainingsdaten oder Annahmen entsteht, etwa Klischees bei Berufen, Geschlechtern oder Herkunft.', null],
    ['Alignment', 'Ausrichtung eines KI-Modells an menschlichen Werten und Absichten, damit es hilfreich, ehrlich und sicher antwortet und Schaden vermeidet.', null],
    [
        'Open Source',
        'Software, deren Quellcode offen einsehbar und unter einer freien Lizenz nutzbar ist. Bei KI-Modellen wird oft zwischen offenem Code, offenen Gewichten und offenen Trainingsdaten unterschieden.',
        '/ki-tools/kostenlos',
    ],
    [
        'Text-to-Image',
        'Erzeugen von Bildern aus einer Textbeschreibung. Viele Bildgeneratoren nutzen dafür Diffusionsmodelle, die Bildgenerierung in ChatGPT arbeitet laut OpenAI dagegen autoregressiv.',
        '/ki-tools/bild',
    ],
    ['Text-to-Video', 'Erzeugen kurzer Videoclips aus einer Textbeschreibung oder aus einem Startbild.', '/ki-tools/video'],
    [
        'Agentischer Workflow',
        'Arbeitsablauf, in dem KI nicht nur antwortet, sondern Teilschritte selbst plant, Werkzeuge nutzt und Ergebnisse prüft, oft mit mehreren spezialisierten Agenten.',
        '/tutorials/ki-agenten-verstehen',
    ],
    ['Model Card', 'Steckbrief eines KI-Modells, in dem Anbieter Zweck, Fähigkeiten, Grenzen, Trainingsdaten und bekannte Risiken beschreiben.', null],
    [
        'Agent Skills',
        'Offenes Format, mit dem KI-Agenten Fachwissen und Arbeitsabläufe nachladen: ein Ordner mit einer SKILL.md-Datei aus Name, Beschreibung und Anweisungen, optional mit Skripten und Vorlagen. Der Agent liest zuerst nur Name und Beschreibung und lädt den Rest erst, wenn eine Aufgabe ihn braucht.',
        null,
    ],
    [
        'Tokenizer',
        'Baustein, der Text vor der Verarbeitung in Tokens zerlegt und jedem Token eine Nummer zuordnet. Jede Modellfamilie hat ihren eigenen Tokenizer, deshalb ergibt derselbe Text je nach Modell unterschiedlich viele Tokens und Kosten.',
        null,
    ],
    [
        'SynthID',
        'Wasserzeichen-Technik von Google DeepMind, die unsichtbare Markierungen in KI-generierte Bilder, Videos, Audio und Texte von Google-Modellen einbettet. Ob ein Inhalt ein solches Wasserzeichen trägt, prüfen der SynthID Detector, die Gemini-App und die Google-Suche.',
        null,
    ],
    [
        'Digital Omnibus',
        'Kurzname der Verordnung (EU) 2026/1744, die den EU AI Act geändert hat. Sie verschiebt die Pflichten für Hochrisiko-KI auf den 2. Dezember 2027 (Anhang III) und den 2. August 2028 (Anhang I) und verlangt bei der KI-Kompetenz nach Art. 4 nur noch Fördermaßnahmen ohne festes Niveau.',
        null,
    ],
    [
        'Computer Use',
        'Fähigkeit eines KI-Modells, einen Computer wie ein Mensch zu bedienen: Es wertet Screenshots aus und steuert Maus und Tastatur, um Programme oder Webseiten zu nutzen. Wegen möglicher Fehlklicks und Prompt-Injection gehört das in eine kontrollierte Umgebung.',
        null,
    ],
    [
        'Reasoning Effort',
        'Einstellung, die festlegt, wie viel Denkaufwand und damit Tokens ein Modell in eine Antwort steckt, meist in Stufen wie low, medium und high. Mehr Aufwand hilft bei schwierigen Aufgaben, kostet aber Zeit und Geld.',
        null,
    ],
    [
        'Destillation',
        'Trainingsverfahren, bei dem ein kleineres Schülermodell lernt, die Ausgaben eines größeren Lehrermodells nachzuahmen. So entstehen schnellere und günstigere Modelle, die einen Großteil der Fähigkeiten behalten.',
        null,
    ],
    [
        'Mixture of Experts (MoE)',
        'Modellarchitektur, bei der ein Router jedes Token nur an wenige von vielen spezialisierten Teilnetzen, den Experten, weiterleitet. Das Modell hat dadurch sehr viele Parameter, nutzt pro Token aber nur einen kleinen Teil davon und rechnet entsprechend günstiger.',
        null,
    ],
    [
        'KI-Kompetenz (AI Literacy)',
        'Pflicht aus Art. 4 EU AI Act seit Februar 2025: Wer KI-Systeme anbietet oder einsetzt, muss Maßnahmen treffen, um die KI-Kompetenz der Beschäftigten und anderer Personen zu fördern, die in seinem Auftrag KI nutzen. Seit dem Digital Omnibus ist kein bestimmtes Kompetenzniveau mehr vorgeschrieben.',
        null,
    ],
    [
        'Hochrisiko-KI-System',
        'KI-System, das der EU AI Act wegen möglicher Folgen für Gesundheit, Sicherheit oder Grundrechte strengen Pflichten unterwirft, etwa bei Bewerberauswahl, Bildung oder Kreditwürdigkeit. Für die Bereiche aus Anhang III gelten diese Pflichten ab 2. Dezember 2027.',
        null,
    ],
    [
        'Auto-Modus',
        'Arbeitsweise von KI-Agenten, bei der nicht jede Aktion einzeln freigegeben werden muss. Eine automatische Prüfung lässt sichere Schritte durch und blockt riskante. In Claude Code ist er seit August 2026 Standard, in den Claude-Apps laut Anthropic ab Ende Oktober 2026.',
        '/ki-news/claude-auto-modus-standard',
    ],
    [
        'Abkündigung (Deprecation)',
        'Ankündigung eines Anbieters, ein Modell oder eine Funktion zu einem festen Termin abzuschalten. Bis dahin läuft es weiter, danach liefern Anfragen nur noch Fehler. Automationen mit fest eingetragenem Modellnamen müssen vorher umgestellt werden.',
        '/ki-news/gpt-4o-api-abschaltung',
    ],
    [
        'Plugin (ChatGPT)',
        'Paket in ChatGPT aus wiederverwendbaren Anweisungen (als Skill), verbundenen Apps und Referenzdateien. Laut OpenAI der Nachfolger der Custom GPTs, die am 11. Dezember 2026 abgeschaltet werden.',
        '/ki-news/custom-gpts-werden-abgeschaltet',
    ],
]

export const glossarSlug = (term) =>
    term
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\(.*?\)/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
