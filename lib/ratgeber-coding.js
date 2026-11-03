// Ratgeber zu Terminal-Coding-Agenten (Format wie lib/ratgeber.js).
// Herkunft der Domain: mentat.codes war 2023 die Homepage des Open-Source-CLI-Assistenten Mentat.
// Angaben am Datum in "geprueft" mit den offiziellen Quellen in "quellen" abgeglichen.
export const CODING_ARTIKEL = [
    {
        "slug": "was-wurde-aus-mentat",
        "seoTitle": "Was wurde aus Mentat? Geschichte, Befehle, Nachfolger",
        "title": "Was wurde aus Mentat? Die Geschichte hinter dieser Domain",
        "description": "Mentat war 2023 ein Open-Source-Coding-Tool fürs Terminal, mentat.codes seine Homepage. Seit Januar 2025 ist er archiviert. Was er konnte, wie seine Befehle heute heißen und was du stattdessen nimmst.",
        "jean": "Ich wohne quasi im ehemaligen Haus von Mentat. Das Mindeste, was ich tun kann, ist dir ehrlich zu erzählen, wer hier vorher gewohnt hat und wo du heute hinziehst.",
        "minutes": 7,
        "sections": [
            {
                "h": "Was wurde aus Mentat?",
                "p": [
                    "Mentat, ein früher Open-Source-Assistent zum Programmieren mit KI im Terminal, ist seit dem 7. Januar 2025 archiviert und wird nicht mehr gepflegt. Wenn du etwas Vergleichbares suchst, nimm Aider; willst du einen Agenten, der selbst plant und Befehle ausführt, nimm Claude Code oder Codex CLI.",
                    "Gebaut hat Mentat die Firma Abante AI. Die nutzt den Namen heute für ein anderes Produkt unter mentat.ai, laut ihrem eigenen Archiv-Hinweis einen GitHub-Bot, der Code schreibt und prüft. Das alte Kommandozeilen-Tool liegt nur noch als schreibgeschütztes Repository auf GitHub.",
                    "Warum ich das alles so genau aufschreibe? Weil du gerade auf mentat.codes liest. Dazu gleich mehr, erst die Geschichte."
                ]
            },
            {
                "h": "Was Mentat 2023 konnte",
                "p": [
                    "Mentat erschien im Juli 2023. Damals kopierten die meisten noch Code zwischen Editor und ChatGPT hin und her, wie Schrauben, die man einzeln aus der Kiste fischt. Die Startseite unter mentat.codes versprach laut Wayback-Snapshot vom 27. Juli 2023 einen KI-Coding-Assistenten, der mit GPT-4 Code direkt in neue oder bestehende Dateien schreibt, gesteuert von der Kommandozeile.",
                    "Das Prinzip: Du startest Mentat in deinem Git-Repository, gibst die relevanten Ordner mit, etwa mentat src/ tests/, beschreibst die Änderung, und das Tool schreibt sie direkt in die Dateien, auch über mehrere Dateien hinweg. Installiert wurde es mit pip install mentat, es brauchte Python ab 3.10, nutzte standardmäßig GPT-4 von OpenAI und stand unter der Apache-2.0-Lizenz.",
                    "Spätere Versionen brachten Slash-Befehle wie /include, /undo und /run, eine automatische Kontextsuche über Embeddings, Screenshots für Vision-Modelle, Spracheingabe über Whisper und eine Erweiterung für VS Code. Für 2023 war das ziemlich viel Werkzeug in einem Koffer."
                ]
            },
            {
                "h": "Die Chronik: vom Projekt zum Archiv",
                "p": [
                    "Das GitHub-Repository entstand am 25. Juli 2023, mentat.codes war die Projektseite. Von September 2023 bis April 2024 folgten laufend Releases auf PyPI, von 0.1.x bis 1.0.18 am 23. April 2024. Neben OpenAI ließen sich in dieser Zeit auch Modelle von Anthropic und Azure einstellen.",
                    "Im März 2024 leitete mentat.codes laut Wayback Machine auf mentat.ai um. Am 7. Januar 2025 ersetzte Abante AI die README durch einen Archiv-Hinweis, veröffentlichte Version 1.0.19, die beim Start nur noch eine Einstellungsmeldung ausgibt, und archivierte das Repository unter dem neuen Namen AbanteAI/archive-old-cli-mentat.",
                    "Danach lief die Domain mentat.codes aus. 2026 startete sie neu, und hier kommt der ehrliche Teil."
                ]
            },
            {
                "h": "Ehrlich gesagt: Wer steckt heute hinter mentat.codes?",
                "p": [
                    "Heute ist mentat.codes ein unabhängiges deutsches KI-Verzeichnis mit Steckbriefen, Prompts und Ratgebern. Ich bin Jean, Senior SEO/SGE Manager, und schreibe die Seite. Mit Abante AI, mit mentat.ai oder mit dem alten Mentat-Team gibt es keine Verbindung, keinen Vertrag und keinen Draht.",
                    "Das heißt auch: Zum heutigen Produkt unter mentat.ai kann ich dir nichts sagen, was über den Archiv-Hinweis hinausgeht. Wenn du dort Support suchst, bist du hier an der falschen Theke.",
                    "Der Name stammt übrigens aus Frank Herberts Dune und ist entsprechend beliebt. Es gibt unter anderem eine App für psychische Gesundheit namens Mentat AI, die im Oktober 2023 auf Product Hunt stand. Mit dem Coding-Tool hat sie nichts zu tun, mit dieser Seite auch nicht."
                ]
            },
            {
                "h": "Kannst du Mentat heute noch benutzen?",
                "p": [
                    "Technisch ja, praktisch würde ich es lassen. pip install mentat lädt heute Version 1.0.19, und die meldet beim Start nur noch, dass das Projekt eingestellt ist. Die letzte Version mit echten Funktionen war 1.0.18 vom April 2024. Sicherheitsupdates gibt es keine.",
                    "Dazu kommt: Das voreingestellte Modell gpt-4-0125-preview hat OpenAI laut eigener Deprecation-Liste am 26. März 2026 abgeschaltet. Du müsstest also erst ein anderes Modell einstellen, und dann fährst du ein Auto ohne Ersatzteile weiter.",
                    "Willst du den Code nur lesen, etwa aus Neugier oder für ein eigenes Projekt, holst du dir den Stand vor der Archivierung. In PowerShell genauso wie unter macOS oder Linux: Tipp git clone https://github.com/AbanteAI/archive-old-cli-mentat ein, wechsle mit cd archive-old-cli-mentat in den Ordner und geh mit git checkout 129c616 auf den letzten Commit vor dem Archiv-Hinweis."
                ]
            },
            {
                "h": "Mentat-Befehle übersetzt: so heißen sie in Aider und Claude Code",
                "p": [
                    "Installieren: Statt pip install mentat tippst du für Aider in PowerShell python -m pip install aider-install und danach aider-install. Claude Code holst du dir unter Windows mit winget install Anthropic.ClaudeCode oder irm https://claude.ai/install.ps1 | iex, unter macOS und Linux mit curl -fsSL https://claude.ai/install.sh | bash.",
                    "Dateien in den Kontext: Aus mentat src/ wird aider mit den Dateinamen dahinter, aus /include wird in Aider /add oder /read-only. In Claude Code startest du einfach claude und erwähnst Dateien mit @pfad im Prompt, meistens findet es sie aber auch selbst. Mentats /exclude entspricht in Aider /drop oder einer .aiderignore, in Claude Code schützt du Dateien mit Deny-Regeln wie Read(./.env) in der .claude/settings.json. Die alte Embedding-Suche ersetzt Aider durch seine Repository-Map, Claude Code durch eigene Suche im Projekt.",
                    "Rückgängig und Git: /undo heißt in Aider auch /undo und macht dessen letzten Commit rückgängig, weil Aider jede Änderung automatisch committet. In Claude Code nimmst du /rewind oder drückst zweimal Esc und springst zu einem Checkpoint, das ersetzt auch Mentats /undo-all und /amend. Mentats /commit übernimmt in Aider die automatische Commit-Funktion oder /commit, in Claude Code bittest du einfach ums Committen oder tippst !git commit.",
                    "Der Rest in Kurzform: /run wird in Aider zu /run oder !, in Claude Code zu ! am Anfang der Eingabe. --model wird zu --model oder /model, --diff zu /diff, /talk zu /voice, /save und /load bleiben in Aider gleich und heißen in Claude Code /resume, /clear bleibt /clear. Die .mentat_config.json wandert nach .aider.conf.yml oder .claude/settings.json. Mentats /agent brauchst du in Claude Code nicht mehr, selbstständiges Arbeiten ist dort der Normalfall, gesteuert über Berechtigungsmodi."
                ]
            },
            {
                "h": "Was du heute statt Mentat nimmst",
                "p": [
                    "Aider kommt dem alten Arbeitsablauf am nächsten: Open Source unter Apache 2.0, freie Modellwahl, auch lokal mit Ollama, jede Änderung ein Git-Commit. Der Haken: Das letzte Release 0.86.2 stammt vom 12. Februar 2026, seit Mai 2026 tut sich im Repository kaum etwas. Es läuft, aber neue Funktionen solltest du nicht erwarten.",
                    "Claude Code von Anthropic ist ein Agent, der selbst sucht, plant und Befehle ausführt. Er setzt mindestens Claude Pro voraus, das kostet 20 $ im Monat, also ca. 21 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026); im kostenlosen Plan ist Claude Code nicht enthalten. Codex CLI von OpenAI steht unter Apache 2.0 und ist ab ChatGPT Plus im Abo dabei.",
                    "OpenCode (MIT, vom Team Anomaly hinter SST) und Goose (Apache 2.0, ursprünglich von Block, heute bei der Agentic AI Foundation der Linux Foundation) sind kostenlose Agenten, die mit vielen Modellanbietern laufen. Du zahlst nur das Modell. Den ausführlichen Vergleich mit Preisen und Installationsbefehlen findest du im Ratgeber Welche KI programmiert im Terminal am besten?",
                    "Darf dein Code den Rechner nicht verlassen, schau in die Ratgeber zu lokaler KI auf dem Laptop und zu Open-Weight-Modellen zum Selbstbetreiben. Dort steht, welche Modelle auf welcher Hardware laufen, hier wiederhole ich das nicht."
                ]
            }
        ],
        "faq": [
            [
                "Wird Mentat noch weiterentwickelt?",
                "Nein. Das Repository ist seit dem 7. Januar 2025 archiviert. Die letzte Version mit neuen Funktionen war 1.0.18 vom April 2024, Version 1.0.19 gibt nur noch eine Einstellungsmeldung aus."
            ],
            [
                "Ist mentat.codes die offizielle Mentat-Seite?",
                "Nein. Die Domain war 2023 die Projektseite des Kommandozeilen-Tools. Heute ist sie ein unabhängiges deutsches KI-Verzeichnis ohne Verbindung zu Abante AI oder mentat.ai."
            ],
            [
                "Was ist der beste Ersatz für Mentat?",
                "Aider. Es ist Open Source unter Apache 2.0, läuft mit eigenem API-Schlüssel oder lokalem Modell und arbeitet nach demselben Prinzip: Dateien in den Chat holen, Änderung beschreiben, Ergebnis landet als Commit im Git-Repository."
            ],
            [
                "Läuft der Nachfolger auch ohne WSL unter Windows?",
                "Ja. Aider installierst du direkt in PowerShell, Claude Code läuft laut Dokumentation nativ unter Windows 10 ab Version 1809. WSL ist bei Claude Code optional und vor allem für Sandboxing gedacht."
            ],
            [
                "Hat Mentat etwas mit der Mental-Health-App gleichen Namens zu tun?",
                "Nein. Mehrere Produkte heißen Mentat, darunter eine App für psychische Gesundheit. Mit dem hier beschriebenen Coding-Tool haben sie nichts zu tun."
            ]
        ],
        "quellen": [
            {
                "titel": "GitHub: AbanteAI/archive-old-cli-mentat (Archiv-Hinweis)",
                "url": "https://github.com/AbanteAI/archive-old-cli-mentat"
            },
            {
                "titel": "Mentat-Befehlsdoku vor der Archivierung (commands.rst, Commit 129c616)",
                "url": "https://github.com/AbanteAI/archive-old-cli-mentat/blob/129c616a6769507cf60d3b1a2dceac491cc85c3d/docs/source/user/commands.rst"
            },
            {
                "titel": "PyPI: mentat, Versionsverlauf",
                "url": "https://pypi.org/project/mentat/#history"
            },
            {
                "titel": "Wayback Machine: mentat.codes am 27. Juli 2023",
                "url": "https://web.archive.org/web/20230727215412/https://www.mentat.codes/"
            },
            {
                "titel": "OpenAI: Deprecations (gpt-4-0125-preview)",
                "url": "https://developers.openai.com/api/docs/deprecations"
            },
            {
                "titel": "Aider: In-chat commands",
                "url": "https://aider.chat/docs/usage/commands.html"
            },
            {
                "titel": "Claude Code: Commands",
                "url": "https://code.claude.com/docs/en/commands"
            },
            {
                "titel": "Claude Code: Setup",
                "url": "https://code.claude.com/docs/en/setup"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "terminal-coding-agenten-vergleich",
        "seoTitle": "KI im Terminal: Coding-Agenten im Vergleich 2026",
        "title": "Welche KI programmiert im Terminal am besten? Neun Coding-Agenten im Vergleich",
        "description": "Claude Code, Codex CLI, Copilot CLI, Antigravity CLI, Gemini CLI, Aider, OpenCode, Goose und DeepSeek Harness: Preise, Lizenzen, Windows-Installation und für wen sich welcher Terminal-Agent lohnt.",
        "jean": "Der beste Terminal-Agent ist meistens der, für den du schon zahlst. Erst wenn der dich im Stich lässt, lohnt sich das zweite Abo.",
        "minutes": 9,
        "sections": [
            {
                "h": "Welche KI programmiert im Terminal am besten?",
                "p": [
                    "Für die meisten Entwickler ist 2026 Claude Code oder Codex CLI die stärkste Wahl im Terminal, Copilot CLI der günstigste Einstieg und Aider, OpenCode oder Goose die freie Variante ohne Abo. Welcher Agent zu dir passt, entscheiden vor allem drei Dinge: welches Abo du schon hast, wie viel du ausgeben willst und ob dein Code den Rechner verlassen darf.",
                    "Ein Terminal-Agent bekommt eine Aufgabe in normaler Sprache, sucht die passenden Dateien, ändert sie über mehrere Module hinweg und lässt Build und Tests laufen. Du bestätigst Befehle und prüfst am Ende den Diff. Das ist der Unterschied zum Chat im Browser, wo du Code hin und her kopierst wie Werkzeug zwischen zwei Werkstätten.",
                    "Ehrlich vorweg: Ich habe Tarife, Lizenzen und Installationswege am 3. November 2026 bei den Herstellern geprüft. Einen eigenen Benchmark habe ich nicht gefahren, deshalb gibt es hier keine Punkte und keine erfundenen Testergebnisse. Die Preise nennen die Anbieter in US-Dollar ohne Steuer."
                ]
            },
            {
                "h": "Claude Code: der Agent für lange Aufgaben",
                "p": [
                    "Claude Code von Anthropic ist proprietär und läuft nur mit einem bezahlten Claude-Abo oder über die API, der kostenlose Plan enthält es nicht. Pro kostet 20 $ im Monat, also ca. 21 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026), bei Jahreszahlung 17 $ im Monat. Max kostet 100 $ mit fünfmal so viel Nutzung wie Pro, Ultra 200 $ ohne 5-Stunden-Limit für verifizierte Konten. Pro und Max haben ein Limit pro 5 Stunden und eines pro Woche, feste Nachrichtenzahlen nennt Anthropic nicht.",
                    "Unter Windows läuft Claude Code nativ, WSL brauchst du nicht. Tipp in PowerShell winget install Anthropic.ClaudeCode oder irm https://claude.ai/install.ps1 | iex ein, unter macOS und Linux curl -fsSL https://claude.ai/install.sh | bash. Danach startest du im Projektordner mit claude.",
                    "Projektregeln stehen in einer CLAUDE.md. Seit Version 2.1.277 liest Claude Code auch eine AGENTS.md, wenn das Projekt keine CLAUDE.md hat; gibt es beide, gewinnt standardmäßig die CLAUDE.md. Stark ist Claude Code bei langen, mehrstufigen Aufgaben in großen Repositories. Lohnt sich nicht für dich, wenn du nur ab und zu eine Funktion brauchst und kein Abo willst."
                ]
            },
            {
                "h": "Codex CLI und Copilot CLI: wenn du schon ein Abo hast",
                "p": [
                    "Codex CLI von OpenAI steht unter Apache 2.0 und ist ab ChatGPT Plus für 20 $ im Monat enthalten, außerdem in Pro (ab 100 $), Business, Edu und Enterprise. ChatGPT Free und Go bekommen nur die Codex-Desktop-App, je nach Rollout. Mit API-Key zahlst du stattdessen nach Verbrauch. Codex teilt sein Kontingent mit ChatGPT Work, dem Agentenmodus in ChatGPT; ist es aufgebraucht, können Plus- und Pro-Nutzer Credits nachkaufen.",
                    "Installieren kannst du Codex unter Windows mit irm https://chatgpt.com/codex/install.ps1 | iex oder npm install -g @openai/codex, unter macOS und Linux mit curl -fsSL https://chatgpt.com/codex/install.sh | sh. Codex führt Befehle in einer Sandbox aus und liest Projektregeln aus einer AGENTS.md. Zahlst du schon ChatGPT Plus, probier Codex zuerst, bevor du ein zweites Abo abschließt.",
                    "GitHub Copilot CLI ist in allen Copilot-Tarifen enthalten, schon ab Copilot Free. Pro kostet 10 $ im Monat, also ca. 10,64 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026), Pro+ 39 $. Unter Windows brauchst du PowerShell 6 oder neuer, dann reicht winget install GitHub.Copilot. Naheliegend für alle, die ohnehin auf GitHub und in VS Code arbeiten."
                ]
            },
            {
                "h": "Antigravity CLI und Gemini CLI: Was bei Google gilt",
                "p": [
                    "Seit dem 18. Juni 2026 bedient Gemini CLI keine Anfragen mehr von privaten Google-Konten, also weder kostenlos noch mit Google AI Pro oder Ultra. Eingestellt ist es nicht: Mit API-Key oder einer Gemini-Code-Assist-Lizenz in Standard oder Enterprise läuft Gemini CLI weiter, das Repository ist aktiv und steht unter Apache 2.0. Für Firmen mit dieser Lizenz bleibt es also im Werkzeugkasten.",
                    "Privatnutzern empfiehlt Google die Antigravity CLI mit dem Befehl agy. Unter Windows installierst du sie mit irm https://antigravity.google/cli/install.ps1 | iex, unter macOS und Linux mit curl -fsSL https://antigravity.google/cli/install.sh | bash. Laut Google übernimmt der Installer vorhandene Gemini-CLI-Einstellungen.",
                    "Der Tarif Individuals kostet 0 $ im Monat und hat laut Google grundlegende wöchentliche Limits, konkrete Zahlen nennt Google nicht. Mehr Kontingent gibt es über Google AI Pro und Ultra, Business-Pläne über Google Cloud ab 30 $ pro Nutzer und Monat. Wichtig für Open-Source-Fans: Das GitHub-Repo der Antigravity CLI ist öffentlich, steht aber unter keiner Open-Source-Lizenz."
                ]
            },
            {
                "h": "Aider, OpenCode und Goose: Open Source ohne Abo",
                "p": [
                    "Die drei Werkzeuge kosten nichts, du zahlst nur den Modellanbieter oder nutzt ein lokales Modell. Das ist wie eine eigene Werkstatt: Die Hebebühne gehört dir, den Sprit kaufst du, wo du willst.",
                    "Aider (Apache 2.0, Paul Gauthier und Community) macht aus jeder Änderung einen Git-Commit und läuft mit fast jedem Anbieter, auch lokal über Ollama. In PowerShell installierst du es mit python -m pip install aider-install und danach aider-install, unter macOS und Linux mit curl -LsSf https://aider.chat/install.sh | sh. Der Haken: Das letzte Release 0.86.2 stammt vom 12. Februar 2026, seitdem passiert im Repository wenig.",
                    "OpenCode (MIT, vom Team Anomaly hinter SST) bringt eine eigene Terminal-Oberfläche mit und wechselt frei zwischen Anbietern. Du installierst es mit npm install -g opencode-ai oder scoop install opencode; unter Windows empfiehlt die Doku WSL. Goose (Apache 2.0, ursprünglich von Block, heute bei der Agentic AI Foundation der Linux Foundation) arbeitet mit mehr als 15 Anbietern und lässt sich per MCP um eigene Werkzeuge erweitern. Unter Windows lädst du dafür das Skript download_cli.ps1 aus dem Goose-Repository, alternativ geht es über Git Bash oder WSL.",
                    "Falls du dich fragst, warum diese Seite mentat.codes heißt: Unter der Domain lief 2023 einer der Vorläufer dieser Tools. Die Geschichte steht im Ratgeber Was wurde aus Mentat?"
                ]
            },
            {
                "h": "DeepSeek Harness: spannend, aber noch Baustelle",
                "p": [
                    "DeepSeek Harness, Befehl dsh, ist ein Agenten-Harness von DeepSeek unter MIT-Lizenz. Fast alles darin ist ein austauschbares Plugin, gebaut auf dem Framework Cordis. Status laut Repository: Developer Preview, DeepSeek kündigt brechende Änderungen an.",
                    "Der Standard-Einstieg ist kein Terminal-Fenster, sondern eine lokale Web-Oberfläche. Unter Windows installierst du zuerst Node mit winget install OpenJS.NodeJS.LTS und startest dann npx @deepseek-ai/dsh web, die Oberfläche läuft auf 127.0.0.1:3080. Für Aufgaben ohne Browser gibt es ein Headless-Profil, eine Terminal-Oberfläche taucht in der Doku nur als optionales Profil auf. Neben DeepSeek lassen sich unter anderem Anthropic, OpenAI, Kimi und GLM anbinden.",
                    "Die Sicherheitshinweise des Projekts sagen klar: kein Sicherheitsaudit, nicht produktionsreif, am besten in einer Wegwerf-VM oder einem Container laufen lassen. Achte außerdem auf Nachahmer, das offizielle Projekt liegt unter der GitHub-Organisation deepseek-ai und im npm-Scope @deepseek-ai. Willst du nur DeepSeek-Modelle in einem fertigen Werkzeug, beschreibt DeepSeek selbst, wie du Claude Code gegen die DeepSeek-API laufen lässt; dann zahlst du nach DeepSeek-Preisen statt im Claude-Abo."
                ]
            },
            {
                "h": "So findest du deinen Agenten in fünf Fragen",
                "p": [
                    "Erste Frage: Darf dein Code das Haus verlassen? Wenn nicht, bleiben Aider oder OpenCode mit lokalem Modell. Welche Modelle auf deiner Hardware laufen, steht in den Ratgebern zu lokaler KI auf dem Laptop und zu Open-Weight-Modellen zum Selbstbetreiben. Stehen Kundendaten im Repository, brauchst du einen Business-Tarif mit Auftragsverarbeitungsvertrag, mehr dazu im DSGVO-Ratgeber für KI-Tools. Das ist keine Rechtsberatung.",
                    "Zweite Frage: Welches Abo hast du schon? ChatGPT Plus oder höher heißt Codex CLI, ein Copilot-Tarif heißt Copilot CLI, ein Google-Konto ohne Abo heißt Antigravity CLI. Dritte Frage: fester Monatsbetrag oder Abrechnung nach Verbrauch? Abos sind planbar, haben aber Limits; über die API zahlst du jede Anfrage einzeln.",
                    "Vierte Frage: Terminal oder Editor? Lebst du in VS Code, ist Copilot der kürzeste Weg. Fünfte Frage: Kannst du das Ergebnis prüfen? Jeder Agent macht Fehler. Nimm ein Tool, das saubere Diffs oder Commits hinterlässt, und merge nichts, was du nicht gelesen hast. Ein Agent ist ein schneller Azubi, aber die Abnahme machst du.",
                    "Suchst du eher etwas, das dir ohne Terminal eine ganze App baut, ist der Ratgeber zu Vibe Coding mit Lovable, Bolt und v0 der bessere Startpunkt."
                ]
            }
        ],
        "faq": [
            [
                "Welcher Terminal-Agent ist kostenlos?",
                "Copilot CLI ist schon in Copilot Free enthalten, Antigravity CLI im Tarif Individuals für 0 $ mit wöchentlichem Limit. Aider, OpenCode, Goose und DeepSeek Harness sind Open Source, du zahlst nur das Modell oder nutzt ein lokales. Codex CLI gibt es erst ab ChatGPT Plus, Claude Code erst ab Claude Pro."
            ],
            [
                "Gibt es Gemini CLI noch?",
                "Ja, aber nicht mehr für private Google-Konten. Seit dem 18. Juni 2026 läuft Gemini CLI nur noch mit API-Key oder einer Gemini-Code-Assist-Lizenz in Standard oder Enterprise. Privatnutzern empfiehlt Google die Antigravity CLI."
            ],
            [
                "Claude Code oder Codex CLI: welcher ist besser?",
                "Einen Sieger für alle gibt es nicht. Beide kosten im Einstieg 20 $ im Monat. Hast du schon ChatGPT Plus, probier zuerst Codex CLI; hast du Claude Pro, nimm Claude Code. Erst wenn das nicht reicht, lohnt sich das zweite Abo."
            ],
            [
                "Welche Terminal-Agenten sind Open Source?",
                "Codex CLI, Gemini CLI, Aider und Goose stehen unter Apache 2.0, OpenCode und DeepSeek Harness unter MIT. Claude Code und Copilot CLI sind proprietär, die Antigravity CLI hat ein öffentliches Repository, aber keine Open-Source-Lizenz."
            ],
            [
                "Laufen die Agenten unter Windows ohne WSL?",
                "Claude Code, Codex CLI, Copilot CLI (ab PowerShell 6), Antigravity CLI und Aider haben eigene Windows-Installer. Bei OpenCode empfiehlt die Doku WSL, Goose läuft per PowerShell-Skript, Git Bash oder WSL."
            ]
        ],
        "quellen": [
            {
                "titel": "Anthropic: Claude-Tarife",
                "url": "https://claude.com/pricing"
            },
            {
                "titel": "Claude Code: Setup und Voraussetzungen",
                "url": "https://code.claude.com/docs/en/setup"
            },
            {
                "titel": "OpenAI: Codex in den ChatGPT-Tarifen",
                "url": "https://learn.chatgpt.com/docs/pricing"
            },
            {
                "titel": "GitHub: Copilot-Tarife",
                "url": "https://github.com/features/copilot/plans"
            },
            {
                "titel": "Google Antigravity: Pricing",
                "url": "https://antigravity.google/pricing"
            },
            {
                "titel": "Gemini CLI: Ankündigung zu privaten Konten",
                "url": "https://github.com/google-gemini/gemini-cli/discussions/28017"
            },
            {
                "titel": "GitHub: deepseek-ai/deepseek-harness",
                "url": "https://github.com/deepseek-ai/deepseek-harness"
            },
            {
                "titel": "GitHub: Aider-AI/aider",
                "url": "https://github.com/Aider-AI/aider"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "claude-code-anleitung",
        "seoTitle": "Claude Code Anleitung auf Deutsch: Start und Befehle",
        "title": "Claude Code auf Deutsch: die Anleitung für deinen ersten Arbeitstag mit dem Agenten",
        "description": "Was Claude Code ist, wie du in zehn Minuten zum ersten Commit kommst, welche Befehle du wirklich brauchst, wie CLAUDE.md, MCP und Hooks funktionieren und wo die Grenzen liegen.",
        "jean": "Claude Code ist ein fleißiger Azubi mit Generalschlüssel: Mit einer guten CLAUDE.md und einem Blick auf jeden Diff spart er dir echte Stunden, ohne beides baut er dir Überraschungen ein.",
        "minutes": 8,
        "sections": [
            {
                "h": "Was ist Claude Code und was brauchst du dafür?",
                "p": [
                    "Claude Code ist der Coding-Agent von Anthropic: Du sagst im Terminal, was passieren soll, und er liest dein Projekt, ändert Dateien und startet Befehle. Du brauchst dafür einen bezahlten Claude-Plan (Pro, Max, Ultra, Team oder Enterprise) oder ein API-Konto in der Claude Console, und unter Windows läuft er inzwischen ohne WSL.",
                    "Der Unterschied zum Chatfenster: Du kopierst keinen Code mehr hin und her. Claude Code sucht sich die passenden Dateien selbst, plant Änderungen über mehrere Dateien, lässt Tests laufen und kann mit Git umgehen, also Commits schreiben, Branches anlegen und Pull Requests vorbereiten. Ein Chatbot erklärt dir am Telefon, welche Schraube locker ist, Claude Code steht mit dem Schlüssel neben dir an der Hebebühne.",
                    "Laut Anthropic läuft er auf Windows 10 ab Version 1809, Windows 11 und Windows Server 2019, auf macOS ab Version 13 sowie auf Ubuntu 20.04, Debian 10 und Alpine 3.19 oder neuer. Dazu kommen mindestens 4 GB RAM, ein x64- oder ARM64-Prozessor und eine Internetverbindung aus einem unterstützten Land. Der kostenlose Claude-Plan reicht nicht.",
                    "Dieselbe Engine steckt auch in der Erweiterung für VS Code, im JetBrains-Plugin, in der Desktop-App und in der Webversion unter claude.ai/code, deine CLAUDE.md, Einstellungen und MCP-Server gelten überall. Ich bleibe hier beim Terminal, weil dort alle Funktionen verfügbar sind. Willst du eigentlich nur chatten und nicht programmieren, ist der Ratgeber „ChatGPT, Claude oder Gemini: welcher Chatbot passt zu welcher Aufgabe?“ der bessere Startpunkt."
                ]
            },
            {
                "h": "So kommst du in zehn Minuten zum ersten Commit",
                "p": [
                    "Tipp in PowerShell irm https://claude.ai/install.ps1 | iex ein, Adminrechte brauchst du nicht. Alternativ geht winget install Anthropic.ClaudeCode, dann aktualisiert sich Claude Code aber nicht von selbst. Unter macOS und Linux nimmst du im Terminal curl -fsSL https://claude.ai/install.sh | bash. Alle Wege und die typischen Stolperfallen stehen im Ratgeber Claude Code installieren.",
                    "Öffne danach ein neues Terminalfenster und tipp claude --version. Kommt eine Versionsnummer, passt alles. Meldet die Shell, dass claude nicht gefunden wird, fehlt der Ordner noch im PATH. Dann wechselst du in deinen Projektordner, startest mit claude und meldest dich beim ersten Start im Browser an.",
                    "Jetzt nicht gleich losschrauben lassen. Frag zuerst: „Erklär mir den Aufbau dieses Projekts.“ An der Antwort siehst du, ob Claude deinen Code verstanden hat. Danach legt /init eine erste CLAUDE.md mit Build-Befehlen und Konventionen an. Lies sie durch und streich, was nicht stimmt.",
                    "Die erste echte Aufgabe sollte klein sein und ein klares Ergebnis haben, etwa „Schreib Tests für die Funktion X und führ sie aus“. Jede Dateiänderung zeigt dir Claude Code als Diff und fragt um Erlaubnis. Zum Schluss sagst du „Committe die Änderungen mit einer passenden Nachricht“, schaust aber vorher mit git diff nach, was wirklich drinsteckt."
                ]
            },
            {
                "h": "Welche Befehle brauchst du wirklich?",
                "p": [
                    "Befehle mit Schrägstrich tippst du in der laufenden Sitzung. Ein einzelnes / zeigt dir die komplette Liste, die je nach Plan und Plattform etwas abweicht. Für den Alltag reichen diese: /clear startet ein frisches Gespräch, /compact fasst das bisherige zusammen und schafft Platz, /context zeigt, wie voll das Kontextfenster ist, und /usage (Alias /cost) zeigt die Kosten der Sitzung und den Stand deiner Limits.",
                    "Mit /model wechselst du das Modell, mit /plan lässt du Claude erst einen Plan vorschlagen, ohne dass sich etwas ändert. /permissions legt fest, was Claude ohne Nachfrage darf, was er fragen muss und was verboten ist. /memory öffnet deine CLAUDE.md-Dateien, /mcp und /hooks zeigen angebundene Server und Hooks, /review prüft den aktuellen Diff, einen Pull Request oder einen Branch, und /doctor checkt Installation und Einstellungen.",
                    "Dein Rückwärtsgang heißt /rewind oder zweimal Esc bei leerer Eingabe: Damit setzt du Code, Gespräch oder beides auf einen früheren Stand zurück. Einmal Esc unterbricht Claude mitten in der Arbeit, ohne das Erledigte wegzuwerfen. Shift und Tab schaltet die Berechtigungsmodi durch, etwa von Manual zu acceptEdits, wo Dateiänderungen ohne Nachfrage durchgehen. Ein ! am Zeilenanfang führt einen Shell-Befehl direkt aus, mit @ erwähnst du eine Datei per Autovervollständigung.",
                    "Auch direkt aus der Shell lässt sich Claude Code aufrufen, praktisch für Skripte: claude -p „finde Tippfehler in README.md“ antwortet einmal und beendet sich, claude -c setzt die letzte Sitzung im Ordner fort, claude -r mit einem Namen holt eine benannte Sitzung zurück, und claude update aktualisiert sofort. In PowerShell kannst du sogar Logs hineinreichen: Get-Content fehler.log | claude -p „was ist die Ursache?“."
                ]
            },
            {
                "h": "CLAUDE.md: So erklärst du dein Projekt einmal statt jeden Morgen",
                "p": [
                    "Jede Sitzung startet mit leerem Kontext. Damit Claude nicht jedes Mal neu herausfinden muss, wie dein Projekt gebaut und getestet wird, liest er beim Start die CLAUDE.md. Rein gehören Build- und Testbefehle, Code-Konventionen und Entscheidungen, die man dem Code nicht ansieht, zum Beispiel „Ordner legacy nicht anfassen“ oder „antworte auf Deutsch, Code-Kommentare auf Englisch“.",
                    "Es gibt drei Ebenen. ~/.claude/CLAUDE.md gilt für alle deine Projekte und bleibt auf deinem Rechner. ./CLAUDE.md oder ./.claude/CLAUDE.md gilt fürs Projekt und gehört ins Git, damit das ganze Team dieselben Regeln hat. ./CLAUDE.local.md ist nur für dich und kommt in die .gitignore.",
                    "Halte die Datei kurz, Anthropic empfiehlt unter 200 Zeilen. Lange Dateien kosten Kontext und werden schlechter befolgt, wie ein Werkstatthandbuch mit 900 Seiten, das keiner aufschlägt. Andere Dateien bindest du mit @pfad ein, etwa @README.md, verschachtelt bis zu vier Ebenen tief. Wichtig: Die CLAUDE.md ist Kontext, kein Gesetz. Claude hält sich meistens daran, garantiert ist das nicht.",
                    "Arbeitest du auch mit Codex oder anderen Agenten? Seit Version 2.1.277 liest Claude Code eine AGENTS.md, wenn im Projekt keine CLAUDE.md liegt. Gibt es beide, hat die CLAUDE.md standardmäßig Vorrang. Ändern lässt sich das unter „Project instructions“ in /config."
                ]
            },
            {
                "h": "MCP und Hooks: Werkzeuge anbinden und Regeln festschrauben",
                "p": [
                    "Über das Model Context Protocol (MCP) bekommt Claude Code Zugriff auf weitere Werkzeuge und Daten, etwa Ticketsysteme, Datenbanken oder Dokumentation. Einen entfernten Server trägst du mit claude mcp add --transport http mein-server https://example.com/mcp ein, einen lokalen mit claude mcp add --transport stdio mein-tool -- npx -y paketname. Alles nach den zwei Bindestrichen ist der Startbefehl des Servers.",
                    "Ohne --scope gilt ein Server nur für dich und nur in diesem Projekt. Mit --scope project landet er in der .mcp.json im Projekt und damit beim ganzen Team, wobei jeder ihn einmal bestätigen muss. Installier nur Server aus Quellen, denen du traust: Ein MCP-Server bekommt Zugriff auf alles, was du ihm freigibst.",
                    "Hooks sind das Gegenstück zur CLAUDE.md: Befehle, die Claude Code an festen Punkten selbst ausführt, zum Beispiel vor einem Werkzeugaufruf (PreToolUse) oder danach (PostToolUse). Sie sind verbindlich. Endet ein PreToolUse-Hook mit Exit-Code 2, wird die Aktion blockiert. Was nie passieren darf, sicherst du also mit einem Hook ab und nicht mit einer höflichen Bitte in der CLAUDE.md.",
                    "Hooks stehen in .claude/settings.json im Projekt oder in ~/.claude/settings.json für alle Projekte. Ein typischer Einstieg ist ein PostToolUse-Hook mit dem Matcher Edit|Write, der nach jeder Dateiänderung npm run format startet. Welche Hooks gerade aktiv sind, zeigt dir /hooks."
                ]
            },
            {
                "h": "Wo stößt Claude Code an seine Grenzen?",
                "p": [
                    "Gratis gibt es nichts, und auch die bezahlten Pläne haben Nutzungslimits, die du bei intensiver Arbeit spürst. Was die Pläne kosten und was du tust, wenn das Kontingent leer ist, steht im Ratgeber Claude Code Kosten.",
                    "Unter nativem Windows gibt es keine Sandbox, Befehle laufen direkt auf deinem System. Willst du sie isoliert ausführen lassen, nimm WSL 2. Außerdem ist der Kontext begrenzt: In langen Sitzungen fasst Claude Code ältere Teile zusammen, dabei gehen Details verloren. Lieber pro Aufgabe ein /clear als eine Endlossitzung, die sich füllt wie ein Werkzeugwagen, den nie jemand aufräumt.",
                    "Der Agent kann Code schreiben, der plausibel aussieht und trotzdem falsch ist, oder Tests so umbiegen, dass sie grün werden. Diffs lesen und Tests prüfen bleibt dein Job. Für den Notfall gibt es /rewind, die sicherere Absicherung bleibt aber Git.",
                    "Claude Code arbeitet nur online. Die Modelle laufen bei Anthropic oder bei einem Cloud-Anbieter wie Amazon Bedrock, Google Cloud oder Microsoft Foundry, dein Code wird also übertragen. Firmen sollten vorab klären, welcher Plan und welche Vertragsbedingungen für sie gelten. Darf dein Code gar nicht aus dem Haus, schau in die Ratgeber „Lokale KI 2026“ und „Open-Weight-Modelle 2026“."
                ]
            }
        ],
        "faq": [
            [
                "Kann ich Claude Code auf Deutsch benutzen?",
                "Ja. Du kannst deine Aufgaben auf Deutsch schreiben, und Claude antwortet in der Regel auch auf Deutsch. Befehle, Menüs und die offizielle Doku sind englisch. Willst du verlässlich deutsche Antworten, schreib das in deine CLAUDE.md."
            ],
            [
                "Ist Claude Code kostenlos?",
                "Nein. Laut Anthropic brauchst du ein Pro-, Max-, Ultra-, Team-, Enterprise- oder Console-Konto. Im kostenlosen Claude-Plan ist Claude Code nicht enthalten."
            ],
            [
                "Brauche ich unter Windows WSL?",
                "Nein. Claude Code läuft nativ unter Windows 10 ab Version 1809 in PowerShell oder CMD. WSL 2 lohnt sich nur, wenn du Linux-Werkzeuge oder die Sandbox brauchst, denn die gibt es unter nativem Windows nicht."
            ],
            [
                "Liest Claude Code die Datei AGENTS.md?",
                "Ja, seit Version 2.1.277. Standardmäßig aber nur, wenn im Arbeitsverzeichnis und darüber keine CLAUDE.md und keine CLAUDE.local.md liegt."
            ],
            [
                "Wie mache ich eine Änderung von Claude Code rückgängig?",
                "Mit /rewind oder zweimal Esc bei leerer Eingabe. Dann wählst du einen früheren Punkt und stellst Code, Gespräch oder beides wieder her. Git bleibt trotzdem die sicherere Absicherung."
            ]
        ],
        "quellen": [
            {
                "titel": "Claude Code Docs: Overview",
                "url": "https://code.claude.com/docs/en/overview"
            },
            {
                "titel": "Claude Code Docs: Advanced setup (Systemvoraussetzungen und Konten)",
                "url": "https://code.claude.com/docs/en/setup"
            },
            {
                "titel": "Claude Code Docs: Commands",
                "url": "https://code.claude.com/docs/en/commands"
            },
            {
                "titel": "Claude Code Docs: Interactive mode (Tastenkürzel)",
                "url": "https://code.claude.com/docs/en/interactive-mode"
            },
            {
                "titel": "Claude Code Docs: Memory (CLAUDE.md und AGENTS.md)",
                "url": "https://code.claude.com/docs/en/memory"
            },
            {
                "titel": "Claude Code Docs: MCP",
                "url": "https://code.claude.com/docs/en/mcp"
            },
            {
                "titel": "Claude Code Docs: Hooks",
                "url": "https://code.claude.com/docs/en/hooks"
            },
            {
                "titel": "Claude Code Changelog auf GitHub",
                "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "claude-code-installieren",
        "seoTitle": "Claude Code installieren: Windows ohne WSL, Mac, Linux",
        "title": "Claude Code installieren: Windows ohne WSL, macOS, Linux und die 6 häufigsten Fehler",
        "description": "Claude Code installierst du unter Windows mit einer Zeile in PowerShell, ganz ohne WSL. Hier alle Wege für Windows, macOS und Linux plus Lösungen für die sechs häufigsten Fehler.",
        "jean": "Die Installation dauert eine Minute, die Fehlersuche danach manchmal eine Stunde. Fast immer liegt es am PATH, an der falschen Shell oder am Firmen-Proxy, und genau dafür ist diese Seite da.",
        "minutes": 9,
        "sections": [
            {
                "h": "So installierst du Claude Code unter Windows ohne WSL",
                "p": [
                    "Unter Windows installierst du Claude Code mit einer Zeile: Tipp in PowerShell irm https://claude.ai/install.ps1 | iex ein. WSL, Node.js und Adminrechte brauchst du dafür nicht, danach öffnest du ein neues Terminal, startest claude und meldest dich im Browser an.",
                    "Öffne PowerShell ganz normal über das Startmenü, also nicht mit „Als Administrator ausführen“. Du erkennst PowerShell am PS vor dem Pfad. Der Befehl zeigt beim Download keinen Fortschritt an, das ist normal und kein Hänger. Die Programmdatei landet unter %USERPROFILE%\\.local\\bin\\claude.exe und aktualisiert sich später selbst im Hintergrund.",
                    "Arbeitest du lieber in der klassischen Eingabeaufforderung CMD, nimm curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd. Oder du installierst mit winget install Anthropic.ClaudeCode, praktisch, wenn du deine Software ohnehin über winget verwaltest. Der Haken: Updates kommen dann nur, wenn du winget upgrade Anthropic.ClaudeCode selbst anstößt.",
                    "Zum Prüfen öffnest du ein neues PowerShell-Fenster, sonst kennt die Shell den neuen Pfad noch nicht, und tippst claude --version. Kommt eine Versionsnummer, hat es geklappt. claude doctor prüft zusätzlich Installation, Einstellungen und Update-Status, ohne eine Sitzung zu starten."
                ]
            },
            {
                "h": "Was brauchst du vor der Installation?",
                "p": [
                    "Laut Anthropic läuft Claude Code auf Windows 10 ab Version 1809, Windows 11 und Windows Server 2019 oder neuer, jeweils nur als 64 Bit (x64 oder ARM64). Auf dem Mac brauchst du macOS 13 Ventura oder neuer, Intel und Apple Silicon gehen beide. Unter Linux sind es Ubuntu 20.04, Debian 10 oder Alpine 3.19 und neuer, Fedora und RHEL laufen über ein eigenes dnf-Repository. Dazu mindestens 4 GB RAM.",
                    "Ohne passendes Konto startet nichts: Du brauchst Pro, Max, Ultra, Team, Enterprise oder ein Console-Konto für die API. Der Gratis-Plan reicht nicht, was die Pläne kosten, steht im Ratgeber Claude Code Kosten. Außerdem musst du Claude Code aus einem unterstützten Land nutzen, Deutschland, Österreich und die Schweiz gehören laut Anthropic dazu (Stand 3. November 2026).",
                    "Node.js brauchst du nur, wenn du über npm installierst, dann ab Version 22. Git für Windows ist optional: Ohne Git führt Claude Code Befehle über PowerShell aus, mit Git zusätzlich über Git Bash. Das hilft bei Projekten mit Bash-Skripten, und für die Git-Arbeit brauchst du Git sowieso. Per winget geht das mit winget install --id Git.Git -e --source winget. Laut git-scm.com pflegt das Git-für-Windows-Projekt dieses Paket nicht selbst, es kann der neuesten Version etwas hinterherhinken."
                ]
            },
            {
                "h": "Brauchst du WSL noch? Nur in zwei Fällen",
                "p": [
                    "Nein, laut offizieller Doku läuft Claude Code nativ unter Windows, und die Installation aus PowerShell oder CMD kommt ohne WSL aus. Ältere Anleitungen, die WSL voraussetzen, sind überholt. Liegen deine Projekte und Werkzeuge ohnehin unter Windows, etwa .NET, PowerShell-Skripte oder Office-Automatisierung, bleib nativ.",
                    "WSL 2 lohnt sich in zwei Fällen: wenn du mit Linux-Toolchains arbeitest oder wenn du Befehle in einer Sandbox laufen lassen willst. Sandboxing gibt es nur unter WSL 2, nicht unter nativem Windows und nicht unter WSL 1. WSL 1 ist deshalb nur die Notlösung, wenn WSL 2 auf deinem Rechner nicht verfügbar ist.",
                    "In WSL installierst und startest du Claude Code im Linux-Terminal der Distribution, mit dem Linux-Befehl aus dem nächsten Abschnitt. Den Windows-Befehl aus PowerShell heraus zu nehmen, landet beim falschen System."
                ]
            },
            {
                "h": "So installierst du Claude Code auf macOS und Linux",
                "p": [
                    "Auf dem Mac öffnest du das Terminal (Programme, Dienstprogramme, Terminal) und tippst curl -fsSL https://claude.ai/install.sh | bash. Der native Installer legt claude unter ~/.local/bin/claude ab und hält sich selbst aktuell.",
                    "Magst du Homebrew, geht es mit brew install --cask claude-code. Das ist der stabile Kanal, der etwa eine Woche hinter der neuesten Version läuft, und Homebrew aktualisiert nicht automatisch, du stößt das mit brew upgrade claude-code an. Willst du immer das Neueste, nimm das Cask claude-code@latest.",
                    "Unter Linux nimmst du denselben Befehl, curl -fsSL https://claude.ai/install.sh | bash. Für Debian und Ubuntu, Fedora und RHEL sowie Alpine bietet Anthropic zusätzlich signierte apt-, dnf- und apk-Repositories an. Das lohnt sich auf Servern, die du sowieso über den Paketmanager pflegst, die genauen Schritte samt Schlüssel-Fingerprint stehen in der Setup-Doku. Auf Alpine brauchst du vorher apk add bash curl libgcc libstdc++ ripgrep.",
                    "Hast du Node.js 22 oder neuer schon installiert, geht auch npm install -g @anthropic-ai/claude-code, das Paket lädt dieselbe native Programmdatei. Installier aber nie mit sudo: Anthropic rät ausdrücklich davon ab, weil sich Claude Code danach nicht mehr selbst aktualisieren kann. Für neue Installationen ist der native Installer die bessere Wahl."
                ]
            },
            {
                "h": "Erster Start: So meldest du dich an",
                "p": [
                    "Wechsel in deinen Projektordner und tipp claude. Beim ersten Start öffnet sich der Browser, dort meldest du dich mit deinem Claude-Konto an, und die Sitzung läuft über deinen Plan.",
                    "Ist die Umgebungsvariable ANTHROPIC_API_KEY gesetzt und bestätigst du den Schlüssel, entfällt der Login. Dann rechnet Anthropic aber über die API pro Token ab und nicht über dein Abo. Das ist wie Tanken mit der Firmenkarte, obwohl du eigentlich eine Flatrate hast: Prüf also, ob die Variable noch von einem alten Projekt herumliegt.",
                    "Wie es nach der Installation weitergeht, mit den ersten zehn Minuten, den wichtigsten Befehlen und der CLAUDE.md, steht im Ratgeber Claude Code auf Deutsch."
                ]
            },
            {
                "h": "Fehler 1 bis 3: PATH, falsche Shell und gesperrte Skripte",
                "p": [
                    "Fehler 1, „claude“ wird nicht erkannt: PowerShell meldet The term 'claude' is not recognized, CMD meldet 'claude' is not recognized as an internal or external command. Öffne zuerst ein neues Terminal. Hilft das nicht, prüf mit Test-Path \"$env:USERPROFILE\\.local\\bin\\claude.exe\", ob die Datei da ist. Dann holst du dir mit $currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User') deinen Benutzer-PATH und hängst den Ordner mit [Environment]::SetEnvironmentVariable('PATH', \"$currentPath;$env:USERPROFILE\\.local\\bin\", 'User') dauerhaft an. PowerShell danach schließen und neu öffnen. Unter macOS und Linux heißt der Fehler command not found: claude, dann gehört ~/.local/bin in den PATH deiner .zshrc oder .bashrc.",
                    "Fehler 2, falscher Befehl für die Shell: 'irm' is not recognized heißt, du bist in CMD und nicht in PowerShell. The token '&&' is not a valid statement separator bedeutet das Gegenteil. Siehst du 'bash' is not recognized oder A parameter cannot be found that matches parameter name 'fsSL', hast du den macOS- oder Linux-Befehl in PowerShell eingefügt. Das ist wie ein Zollschlüssel an einer metrischen Schraube: passt fast, dreht trotzdem nicht. Nimm die passende Zeile aus dem Windows-Abschnitt.",
                    "Fehler 3, „running scripts is disabled on this system“: Das passiert nur bei der Installation über npm, weil die Ausführungsrichtlinie von PowerShell die .ps1-Starter von npm blockiert. Für deinen eigenen Benutzer löst du das mit Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser. Alternativ rufst du npm.cmd oder claude.cmd auf oder nimmst gleich den nativen Installer, den die Richtlinie nicht betrifft. Auf Firmenrechnern ist die Richtlinie oft per Gruppenrichtlinie gesperrt, dann muss die IT ran."
                ]
            },
            {
                "h": "Fehler 4 bis 6: Proxy, TLS und Git Bash",
                "p": [
                    "Fehler 4, 403, „App unavailable in region“ oder HTML statt Skript: Meldungen wie curl: (22) mit error: 403, syntax error near unexpected token '<' oder in PowerShell The term 'System.Xml.XmlDocument' is not recognized heißen, dass statt des Installationsskripts eine Webseite oder Fehlermeldung zurückkam. Ursache ist entweder ein nicht unterstütztes Land oder ein Firmen-Proxy beziehungsweise Webfilter. Hinter einem Proxy setzt du vorher $env:HTTP_PROXY = 'http://proxy.example.com:8080' und $env:HTTPS_PROXY = 'http://proxy.example.com:8080' und startest den Installer neu. Die echte Proxy-Adresse kennt deine IT, und der Host downloads.claude.ai muss erreichbar sein.",
                    "Fehler 5, TLS- oder SSL-Fehler: Could not create SSL/TLS secure channel taucht vor allem in Windows PowerShell 5.1 auf älteren Systemen auf. Schalte für die Sitzung TLS 1.2 ein mit [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 und starte den Installer erneut. Steht da unable to get local issuer certificate, prüft meist ein Firmen-Proxy den TLS-Verkehr. Dann muss dessen CA-Zertifikat in den Windows-Zertifikatsspeicher, auch das erledigt die IT.",
                    "Fehler 6, Git Bash wird nicht gefunden: Die Meldung Claude Code on Windows requires either Git for Windows (for bash) or PowerShell heißt, dass Claude Code keine der beiden Shells findet. Liegt Git an einem ungewöhnlichen Ort, ermittelst du den Pfad mit where.exe git und trägst die bash.exe in %USERPROFILE%\\.claude\\settings.json unter env als CLAUDE_CODE_GIT_BASH_PATH ein, zum Beispiel C:\\Program Files\\Git\\bin\\bash.exe. Nicht git-bash.exe eintragen, die ignoriert Claude Code. Fehlt PowerShell im PATH: Sie liegt standardmäßig unter C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\.",
                    "Weitere Fehlerbilder, etwa The process cannot access the file, wenn ein Virenscanner den Download sperrt, listet die offizielle Troubleshooting-Seite von Anthropic."
                ]
            },
            {
                "h": "So aktualisierst und deinstallierst du Claude Code sauber",
                "p": [
                    "Die native Installation aktualisiert sich selbst, sofort geht es mit claude update. Bei winget und Homebrew stößt du Updates selbst an. Willst du weniger Risiko, stell in /config den Kanal „stable“ ein, der etwa eine Woche hinter der neuesten Version läuft.",
                    "Zum Entfernen unter Windows löschst du nach der nativen Installation zwei Dinge: Remove-Item \"$env:USERPROFILE\\.local\\bin\\claude.exe\" -Force und Remove-Item \"$env:USERPROFILE\\.local\\share\\claude\" -Recurse -Force. Hast du mit winget installiert, reicht winget uninstall Anthropic.ClaudeCode.",
                    "Unter macOS und Linux entfernst du die native Installation mit rm -f ~/.local/bin/claude und rm -rf ~/.local/share/claude. Bei Homebrew ist es brew uninstall --cask claude-code, bei npm npm uninstall -g @anthropic-ai/claude-code.",
                    "Einstellungen, MCP-Konfiguration und Sitzungsverlauf liegen in ~/.claude und ~/.claude.json, unter Windows im Ordner %USERPROFILE%. Die löschst du nur, wenn wirklich alles weg soll, denn da stecken auch deine globale CLAUDE.md und deine Hooks drin."
                ]
            }
        ],
        "faq": [
            [
                "Brauche ich WSL, um Claude Code unter Windows zu nutzen?",
                "Nein. Claude Code läuft nativ unter Windows 10 ab Version 1809 und Windows 11. WSL 2 lohnt sich nur für Linux-Toolchains oder wenn du Sandboxing brauchst, das es unter nativem Windows nicht gibt."
            ],
            [
                "Brauche ich Node.js für Claude Code?",
                "Nur wenn du über npm installierst, dann ab Version 22. Der native Installer, winget und Homebrew kommen ohne Node aus."
            ],
            [
                "Ist Git für Windows Pflicht?",
                "Nein. Ohne Git führt Claude Code Befehle über PowerShell aus, mit Git zusätzlich über Git Bash. Für die Arbeit mit Git-Repositories brauchst du es aber ohnehin."
            ],
            [
                "Reicht der kostenlose Claude-Plan für Claude Code?",
                "Nein. Laut Anthropic gehört Claude Code nicht zum Gratis-Plan, du brauchst mindestens Pro oder ein API-Konto. Die Preise stehen im Ratgeber Claude Code Kosten."
            ],
            [
                "Wie halte ich Claude Code aktuell?",
                "Die native Installation aktualisiert sich selbst, sofort geht es mit claude update. Bei winget und Homebrew stößt du Updates selbst an. Weniger Risiko bringt der Kanal „stable“ in /config."
            ]
        ],
        "quellen": [
            {
                "titel": "Claude Code Docs: Advanced setup (Installation, Updates, Deinstallation)",
                "url": "https://code.claude.com/docs/en/setup"
            },
            {
                "titel": "Claude Code Docs: Troubleshoot installation and login",
                "url": "https://code.claude.com/docs/en/troubleshoot-install"
            },
            {
                "titel": "Anthropic: Supported countries and regions",
                "url": "https://www.anthropic.com/supported-countries"
            },
            {
                "titel": "Git für Windows: Installation",
                "url": "https://git-scm.com/install/windows"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "claude-code-kosten",
        "seoTitle": "Claude Code Kosten: Pro, Max, Ultra und API in Euro",
        "title": "Was kostet Claude Code? Pro, Max, Ultra und API im Vergleich, mit Rechenbeispiel",
        "description": "Claude Code gibt es ab Claude Pro für 20 $ im Monat. Hier siehst du Pro, Max, Ultra und API im Vergleich, ein Rechenbeispiel für Freelancer und was du tust, wenn das Limit erreicht ist.",
        "jean": "Pay as you go klingt fair, bis du nach einem Monat Dauernutzung die API-Rechnung neben das Max-Abo legst. Für tägliche Arbeit ist die Flatrate fast immer der günstigere Tank.",
        "minutes": 9,
        "sections": [
            {
                "h": "Was kostet Claude Code im Monat?",
                "p": [
                    "Claude Code gibt es ab Claude Pro für 20 $ im Monat, das sind ca. 21,29 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Wer jeden Tag damit arbeitet, landet realistisch bei Max für 100 $ im Monat oder zahlt über die API pro Token, und das wird bei Dauernutzung schnell teurer als jedes Abo.",
                    "Im kostenlosen Claude-Plan ist Claude Code nicht enthalten. Anthropic nennt alle Preise in US-Dollar und ohne Steuer, eine offizielle Euro-Preisliste gibt es nicht. In Deutschland kommt die Mehrwertsteuer dazu, den genauen Euro-Betrag zeigt dir erst der Checkout. Meine Umrechnungen hier sind Orientierung, keine Rechnung.",
                    "Die Kurzfassung: Pro reicht zum Ausprobieren und für einzelne Stunden am Tag. Für volle Arbeitstage mit Claude Code ist Max die realistische Untergrenze. Die API lohnt sich nur, wenn du wenig oder sehr unregelmäßig damit arbeitest oder Kosten sauber pro Kundenprojekt abrechnen musst."
                ]
            },
            {
                "h": "Pro, Max und Ultra: Was steckt in welchem Plan?",
                "p": [
                    "Pro kostet 20 $ im Monat bei monatlicher Zahlung, ca. 21,29 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Zahlst du jährlich, sind es 200 $ im Voraus, also 17 $ im Monat, ca. 212,90 € im Jahr inkl. 19 % MwSt. Du bekommst das Basis-Kontingent mit einem Limit pro 5 Stunden und einem pro Woche.",
                    "Max kostet 100 $ im Monat, ca. 106,45 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Dafür gibt es fünfmal so viel Nutzung wie bei Pro, pro 5-Stunden-Fenster und pro Woche, und zusätzlich 100 $ API-Guthaben im Monat.",
                    "Ultra kostet 200 $ im Monat, ca. 212,90 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Du bekommst zehnmal so viel Wochennutzung wie bei Pro, für verifizierte Konten fällt das 5-Stunden-Limit ganz weg, und es gibt 200 $ API-Guthaben im Monat. Max und Ultra werden nur monatlich abgerechnet, Preise im mobilen App-Store können abweichen.",
                    "Für Teams gibt es den Team-Plan für 2 bis 150 Plätze: Ein Standard-Platz kostet 20 $ pro Monat bei Jahreszahlung (25 $ monatlich), ein Premium-Platz 100 $ (125 $ monatlich) mit fünfmal so viel Nutzung wie Standard."
                ]
            },
            {
                "h": "Netto oder brutto: Was zählt für Selbstständige?",
                "p": [
                    "Bist du regelbesteuert, holst du dir die Mehrwertsteuer als Vorsteuer zurück, für dich zählt also der Nettopreis: Pro ca. 17,89 €, Max ca. 89,45 €, Ultra ca. 178,91 € im Monat (EZB-Kurs 1,1179 vom 3.11.2026). Als Kleinunternehmer nach § 19 UStG zahlst du brutto.",
                    "Geschäftskunden mit USt-IdNr. bekommen innerhalb der EU üblicherweise eine Rechnung im Reverse-Charge-Verfahren. Ob das bei deinem Konto so läuft, siehst du sicher erst auf der ersten Rechnung. Im Zweifel klärt das deine Steuerberatung, nicht der Chatbot."
                ]
            },
            {
                "h": "API: Was kostet Claude Code pro Token?",
                "p": [
                    "Statt eines Abos kannst du Claude Code mit einem Konto in der Claude Console nutzen und zahlst dann jedes Token einzeln. Die Preise gelten pro einer Million Tokens, in US-Dollar und ohne Steuer. Sonnet 5.5 kostet 2 $ für Input und 10 $ für Output, Cache-Treffer 0,10 $. Opus 5.5 liegt bei 4 $ und 20 $, Cache-Treffer 0,20 $, im Fast Mode bei 8 $ und 40 $.",
                    "Haiku 5.5 kostet 0,10 $ für Input und 0,50 $ für Output bei Prompts bis 100.000 Tokens, Cache-Treffer 0,01 $. Bei längeren Prompts wird es fünfmal so teuer. Fable 5.1 liegt bei 10 $ und 50 $, Cache-Treffer 0,25 $. Batch-Anfragen kosten die Hälfte, für interaktive Sitzungen in Claude Code kannst du sie aber nicht nutzen.",
                    "Die Zahl, die in der Praxis zählt: Claude Code schickt bei jeder Anfrage den ganzen bisherigen Gesprächsverlauf mit. Ein Großteil der Tokens sind deshalb Cache-Treffer, und der eigentliche Kostentreiber ist eine lange Sitzung, die nie geleert wird. Das ist wie ein Kofferraum voller Altmetall, den du jeden Tag mit spazieren fährst."
                ]
            },
            {
                "h": "Rechenbeispiel: Abo oder API für Freelancer mit 20 Arbeitstagen?",
                "p": [
                    "Wie viel du über die API verbrauchst, hängt stark vom Projekt ab. Anthropic nennt in der Claude-Code-Doku einen Richtwert aus Firmeneinsätzen: im Schnitt rund 13 $ pro aktivem Tag, und bei 90 % der Nutzer unter 30 $ pro Tag. Das sind Durchschnittswerte von Anthropic, keine eigene Messung.",
                    "Für 20 Arbeitstage heißt das: Bei durchschnittlicher Nutzung kommst du auf 260 $, ca. 276,76 € inkl. 19 % MwSt. (netto ca. 232,58 €). Bei intensiver Nutzung sind es 600 $, ca. 638,70 € inkl. 19 % MwSt. (netto ca. 536,72 €), jeweils zum EZB-Kurs 1,1179 vom 3.11.2026. Zum Vergleich: Pro kostet ca. 21,29 €, Max ca. 106,45 € und Ultra ca. 212,90 € im Monat, jeweils brutto.",
                    "Schon bei durchschnittlicher Nutzung ist die API also teurer als Ultra. Der Haken bei den Abos sind die Limits. Anthropic veröffentlicht keine festen Kontingente pro Plan, nur die Multiplikatoren. Meine Einschätzung daraus, nicht offiziell bestätigt: Mit Pro kommst du kaum durch 20 volle Arbeitstage, und auch Max kann an intensiven Tagen knapp werden.",
                    "Die API lohnt sich, wenn du Claude Code nur an wenigen Tagen im Monat brauchst oder die Kosten pro Kundenprojekt sauber abrechnen willst. Für alles andere ist ein Abo der bessere Deal."
                ]
            },
            {
                "h": "Limit erreicht: Was kannst du jetzt tun?",
                "p": [
                    "Die Abos haben zwei Grenzen: ein Fenster über fünf Stunden und ein Wochenkontingent, bei Ultra nur das Wochenlimit. Chat und Claude Code ziehen aus demselben Kontingent. Bei You've hit your session limit oder You've hit your weekly limit ist für alle Modelle Schluss. Bei You've hit your Opus limit oder You've hit your Sonnet limit betrifft es nur das eine Modell. Die Meldung nennt jeweils die Uhrzeit, ab der es weitergeht.",
                    "Die günstigste Lösung ist Warten. Ab Claude Code v2.1.234 kann die Aufgabe nach dem Reset automatisch weiterlaufen, die Auswahl dafür findest du unter /rate-limit-options. Ein Modellwechsel mit /model hilft nur beim Opus- oder Sonnet-Limit, nicht beim Session- oder Wochenlimit.",
                    "Musst du sofort weiterarbeiten, öffnet /usage-credits die Seite Settings, Usage auf claude.ai. Dort aktivierst du Nutzungsguthaben, setzt ein Monatslimit und lädst einen Betrag auf, abgerechnet zu API-Preisen plus MwSt. Alternativ meldest du dich mit /login bei einem Claude-Console-Konto an und zahlst pro Token, oder du wechselst auf claude.ai in den Einstellungen in einen größeren Plan.",
                    "Gut zu wissen: Laut Anthropic liegen die Wochenlimits für Claude Code bei Pro, Max, Ultra und Team seit dem 14. September 2026 um 25 % über dem Stand vor der Sommeraktion, bei der sie vom 13. Mai bis 13. September 2026 vorübergehend um 50 % erhöht waren."
                ]
            },
            {
                "h": "So stößt du seltener ans Limit",
                "p": [
                    "Ruf /usage auf: Bei Pro, Max und Ultra zeigt es dir, welche Skills, Subagenten oder MCP-Server dein Kontingent fressen, und schlägt Änderungen vor. Ab v2.1.305 setzt die Taste f einen Teil davon direkt um. Und tipp /clear zwischen Aufgaben, die nichts miteinander zu tun haben, sonst schleppt jede Nachricht den ganzen alten Verlauf mit.",
                    "Nimm Sonnet als Standard und Opus nur für die schwierigen Architekturfragen, und senk mit /effort den Denkaufwand bei einfachen Aufgaben. Halte die CLAUDE.md kurz, Anthropic empfiehlt unter 200 Zeilen, und lagere Spezialanweisungen in Skills aus. Ungenutzte MCP-Server schaltest du mit /mcp ab, lange Testausgaben filterst du per Hook.",
                    "Wie du die CLAUDE.md, Hooks und MCP-Server einrichtest, steht im Ratgeber Claude Code auf Deutsch. Willst du gar nicht im Terminal arbeiten, sondern nur schnell einen Prototyp bauen, kann der Ratgeber „Vibe Coding: Apps bauen mit Lovable, Bolt und v0“ der günstigere Weg sein."
                ]
            }
        ],
        "faq": [
            [
                "Ist Claude Code kostenlos?",
                "Nein. Der Free-Plan enthält Claude Code nicht. Der günstigste Einstieg ist Pro für 20 $ im Monat, ca. 21,29 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026)."
            ],
            [
                "Teilen sich Claude-Chat und Claude Code dasselbe Limit?",
                "Ja. Bei Pro, Max und Ultra ziehen beide aus demselben Kontingent. Arbeitest du nebenbei viel im Chat, bleibt weniger für Claude Code übrig."
            ],
            [
                "Hilft es, beim Limit auf ein anderes Modell zu wechseln?",
                "Nur bei You've hit your Opus limit oder You've hit your Sonnet limit. Session- und Wochenlimits gelten für alle Modelle."
            ],
            [
                "Lohnt sich Max statt Pro?",
                "Wenn du Pro mehrmals pro Woche ausschöpfst, ja: fünffacher Preis, fünffache Nutzung und dazu 100 $ API-Guthaben im Monat. Stößt du nur selten an die Grenze, ist Pro plus ein gedeckeltes Nutzungsguthaben oft günstiger."
            ],
            [
                "Kann ich als Firma ohne Mehrwertsteuer kaufen?",
                "Mit gültiger USt-IdNr. wird innerhalb der EU üblicherweise im Reverse-Charge-Verfahren abgerechnet. Sicher weißt du es erst mit der ersten Rechnung."
            ]
        ],
        "quellen": [
            {
                "titel": "Claude: Pläne und Preise",
                "url": "https://claude.com/pricing"
            },
            {
                "titel": "Claude Platform Docs: API-Preise",
                "url": "https://platform.claude.com/docs/en/about-claude/pricing"
            },
            {
                "titel": "Claude Code Docs: Kosten verwalten",
                "url": "https://code.claude.com/docs/en/costs"
            },
            {
                "titel": "Claude Help Center: Ultra-Plan",
                "url": "https://support.claude.com/en/articles/17728952"
            },
            {
                "titel": "Claude Help Center: Extra usage for paid Claude plans",
                "url": "https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans"
            },
            {
                "titel": "Claude Help Center: Wochenlimits Mai bis September 2026",
                "url": "https://support.claude.com/en/articles/15910845"
            },
            {
                "titel": "EZB: Euro-Referenzkurs US-Dollar",
                "url": "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "codex-cli-anleitung",
        "seoTitle": "Codex CLI Anleitung: Installation, Login, Sandbox",
        "title": "Codex CLI auf Deutsch: installieren, anmelden und sicher loslegen",
        "description": "Codex CLI unter Windows installieren, mit ChatGPT-Konto oder API-Key anmelden, Sandbox richtig einstellen und eine AGENTS.md anlegen. Mit den Befehlen, die du im Alltag wirklich brauchst.",
        "jean": "Codex darf in deinem Projekt schrauben. Aber erst, nachdem du ihm gezeigt hast, welche Schubladen in der Werkstatt tabu sind.",
        "minutes": 8,
        "sections": [
            {
                "h": "Was ist Codex CLI und was brauchst du dafür?",
                "p": [
                    "Codex CLI ist der Coding-Agent von OpenAI fürs Terminal: Er liest dein Projekt, ändert Dateien und führt Befehle aus. Unter Windows installierst du ihn in PowerShell mit irm https://chatgpt.com/codex/install.ps1 | iex und meldest dich beim ersten Start mit deinem ChatGPT-Konto an, und zwar mit mindestens ChatGPT Plus.",
                    "Das Programm selbst ist Open Source unter der Lizenz Apache 2.0, der Quellcode liegt bei OpenAI auf GitHub. Bezahlen musst du trotzdem, denn die eigentliche Arbeit machen OpenAIs Modelle in der Cloud. Diese Anleitung bezieht sich auf Version 0.166.0 vom 29. Oktober 2026.",
                    "Als Basis empfiehlt OpenAI Windows 11. Windows 10 ab Version 1809 läuft laut Doku nur nach dem Prinzip „best effort“, also ohne Garantie. Git ist keine Pflicht, aber ich würde nie ohne anfangen: Ohne Git-Repository fehlt dir der Rückwärtsgang, falls der Agent mal falsch abbiegt."
                ]
            },
            {
                "h": "So installierst du Codex unter Windows, macOS und Linux",
                "p": [
                    "Der offizielle Weg für Windows ist das Installationsskript aus dem GitHub-Repository. Falls deine PowerShell Skripte blockiert, startest du es so: powershell -ExecutionPolicy ByPass -c \"irm https://chatgpt.com/codex/install.ps1 | iex\". Hast du Node.js ohnehin auf dem Rechner, geht auch npm install -g @openai/codex, laut npm brauchst du dafür Node 16 oder neuer.",
                    "Im Windows-Paketmanager gibt es außerdem das Paket OpenAI.Codex mit dem Herausgeber OpenAI, Inc., installierbar mit winget install --id OpenAI.Codex --exact. In der OpenAI-Doku selbst taucht dieser Weg aber nicht als Installationsmethode auf, er ist also nicht offiziell bestätigt. Egal welchen Weg du nimmst: Öffne danach ein neues PowerShell-Fenster und tipp codex --version. Kommt eine Versionsnummer, ist alles drin.",
                    "Auf macOS und Linux nimmst du curl -fsSL https://chatgpt.com/codex/install.sh | sh, dasselbe Skript bringt Codex später auch auf den neuesten Stand. Auf dem Mac geht alternativ brew install --cask codex.",
                    "WSL brauchst du unter Windows nicht mehr. Codex läuft nativ in PowerShell mit einer eigenen Windows-Sandbox. WSL 2 lohnt sich nur, wenn dein Projekt sowieso in Linux lebt, dann nutzt Codex dort die Linux-Sandbox. Falls du im Repository noch die ältere Datei docs/install.md findest, die „Windows 11 via WSL2“ verlangt: Die ist überholt, maßgeblich ist die aktuelle Windows-Seite der offiziellen Doku."
                ]
            },
            {
                "h": "ChatGPT-Konto oder API-Key: wer zahlt die Rechnung?",
                "p": [
                    "Beim ersten Start fragt Codex, wie du dich anmelden willst, und das ist eigentlich die Frage, wer bezahlt. Mit codex login öffnet sich der Browser und du meldest dich mit deinem ChatGPT-Konto an. Dann läuft alles über dein Abo und dessen Limits, und nur so kommst du auch an Codex Cloud.",
                    "Auf einem Rechner ohne Browser hilft codex login --device-auth. Das ist laut OpenAI noch Beta und muss vorher in den Sicherheitseinstellungen deines ChatGPT-Kontos erlaubt werden.",
                    "Die dritte Variante ist der API-Key. Den reichst du per Pipe an codex login --with-api-key weiter, statt ihn einzutippen. OpenAI zeigt dafür nur die Unix-Schreibweise printenv OPENAI_API_KEY | codex login --with-api-key, eine offizielle PowerShell-Variante gibt es nicht. Abgerechnet wird dann nach Verbrauch über dein OpenAI-Platform-Konto, dein ChatGPT-Abo zählt nicht, Codex Cloud und einige Plugins fehlen. Ob gerade Abo oder Key aktiv ist, verrät dir codex login status.",
                    "Deine Zugangsdaten speichert Codex standardmäßig in der Datei auth.json im Ordner .codex in deinem Benutzerverzeichnis. Willst du sie lieber in der Windows-Anmeldeinformationsverwaltung haben, trägst du in der config.toml die Zeile cli_auth_credentials_store = \"keyring\" ein, alternativ den Wert \"auto\"."
                ]
            },
            {
                "h": "Was kostet Codex CLI und wie weit kommst du damit?",
                "p": [
                    "Laut OpenAI ist Codex CLI ab ChatGPT Plus enthalten, außerdem in Pro, Business, Edu und Enterprise. ChatGPT Free und Go bekommen je nach Rollout nur die Codex-Desktop-App, die CLI nicht. Die offiziellen Listenpreise stehen in US-Dollar: Plus kostet 20 $ im Monat, das sind ca. 21,29 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Pro gibt es ab 100 $ in den Stufen 100, 200 und 500 $, Business kostet 25 $ pro Nutzer und Monat oder 20 $ bei Jahreszahlung. Verbindlich ist der Euro-Betrag, den dir der Checkout zeigt.",
                    "Die Limits zählen pro Fünf-Stunden-Fenster. OpenAI nennt dafür je Modell nur Spannen statt fester Werte, dazu können Wochenlimits kommen. Pro hat derzeit kein Fünf-Stunden-Limit. Ist das Kontingent leer, können Plus- und Pro-Nutzer Credits nachkaufen.",
                    "Wichtig: Codex teilt sein Kontingent mit ChatGPT Work, dem Agentenmodus in ChatGPT. Lokale Nachrichten und Cloud-Aufgaben ziehen aus demselben Tank. Dass deine normalen ChatGPT-Chats das Codex-Limit leer fahren, steht in der Quelle dagegen nicht. Wie sich das gegen Claude Code rechnet, steht im Ratgeber Claude Code oder Codex."
                ]
            },
            {
                "h": "Sandbox und Freigaben: wie viel darf Codex allein?",
                "p": [
                    "Zwei Regler bestimmen, wie selbstständig Codex arbeitet. Der Sandbox-Modus legt fest, was technisch überhaupt geht, die Freigaberegel, wann Codex dich vorher fragt. Beim Start setzt du sie mit --sandbox (kurz -s) und --ask-for-approval (kurz -a), im laufenden Programm mit /permissions.",
                    "Es gibt drei Sandbox-Modi. Mit read-only liest Codex nur und fragt vor jeder Änderung und jedem Befehl, ideal für fremden Code oder ein erstes Beschnuppern. Mit workspace-write darf er im Projektordner schreiben und übliche lokale Befehle ausführen, laut OpenAI der Standard für die normale Arbeit. Mit danger-full-access fallen alle Grenzen bei Dateisystem und Netzwerk, das gehört nur in eine Wegwerf-Umgebung wie eine VM oder einen Container.",
                    "Bei der Freigaberegel bleiben zwei Werte: on-request, dann fragt Codex, sobald er die Sandbox verlassen will, und never, dann fragt er nie. Die alte Stufe untrusted hat OpenAI gestrichen. Als risikoarme Voreinstellung empfiehlt die Doku codex -s workspace-write -a on-request.",
                    "Unter Windows kommt noch die Art der Sandbox dazu. mxc ist auf kompatiblen Geräten die Empfehlung und braucht keine Admin-Einrichtung. elevated richtest du einmal mit /setup-default-sandbox und Administratorbestätigung ein, die Befehle laufen danach trotzdem ohne Adminrechte. Scheitert das, hast du meist die UAC-Abfrage weggeklickt. unelevated ist die Notlösung mit schwächerer Netzwerk-Isolierung. Und den Schalter --yolo, lang --dangerously-bypass-approvals-and-sandbox, lässt du auf dem Arbeitsrechner mit SSH-Keys und Kundenprojekten bitte im Werkzeugkasten. Der führt jeden Befehl ohne Rückfrage und ohne Sandbox aus."
                ]
            },
            {
                "h": "AGENTS.md: die Hausordnung für dein Projekt",
                "p": [
                    "In die AGENTS.md schreibst du, was Codex über dein Projekt wissen muss: wie gebaut und getestet wird, welcher Stil gilt, was tabu ist. Mit /init legt Codex ein Gerüst an, das du danach von Hand nachschärfst. Ein gutes Beispiel für ein deutsches Projekt hat vier kurze Blöcke: Antworten und Commit-Nachrichten auf Deutsch, die Befehle für Abhängigkeiten und Tests, keine neuen Abhängigkeiten ohne Rückfrage, und ein paar Stilregeln wie strenges TypeScript.",
                    "Codex sucht die Dateien an zwei Stellen. Global im Codex-Ordner in deinem Benutzerverzeichnis, den du über CODEX_HOME verlegen kannst: Dort liest er zuerst AGENTS.override.md, sonst AGENTS.md. Das ist der Platz für persönliche Vorlieben wie „Antworte auf Deutsch“. Im Projekt geht er vom Projekt-Root, meist dem Git-Root, abwärts bis zum aktuellen Ordner und nimmt pro Ordner höchstens eine Datei, wieder die Override-Datei zuerst.",
                    "Alle gefundenen Dateien hängt Codex von oben nach unten aneinander. Was näher am aktuellen Ordner liegt, steht weiter hinten und gewinnt. Insgesamt liest Codex standardmäßig höchstens 32 KiB, einstellbar über project_doc_max_bytes. Ein dickes Regelwerk verteilst du deshalb besser auf Unterordner, statt alles in die Wurzel zu stopfen.",
                    "Nutzt du deine Regeln bisher unter einem anderen Dateinamen, trägst du den in project_doc_fallback_filenames in der config.toml ein. Arbeitest du parallel mit Claude Code, lies den Ratgeber AGENTS.md und CLAUDE.md, dort steht, wie beide Dateien friedlich nebeneinander leben."
                ]
            },
            {
                "h": "Die Befehle, die du im Alltag wirklich brauchst",
                "p": [
                    "Mit codex startest du eine Sitzung im aktuellen Ordner, mit codex -s read-only eine, in der Codex erst mal nur schaut. codex exec \"Behebe die fehlschlagenden Tests\" läuft ohne Oberfläche, praktisch für Skripte und CI, die Kurzform ist codex e. Eine gespeicherte Sitzung holst du mit codex resume zurück, und codex review lässt Codex die aktuellen Änderungen begutachten.",
                    "Ein bestimmtes Modell wählst du mit codex -m und dem Modellnamen, im Programm mit /model. Mit codex -C und einem Pfad arbeitest du in einem anderen Ordner, ohne die Werkbank zu wechseln. codex mcp list zeigt eingerichtete MCP-Server, add und remove verwalten sie. codex update holt die neueste Version, bei einer winget-Installation geht auch winget upgrade OpenAI.Codex.",
                    "Im laufenden Programm helfen dir diese Slash-Befehle am meisten: /diff zeigt den Git-Diff inklusive neuer Dateien, /review prüft den Arbeitsstand, /compact fasst den Kontext zusammen, wenn er voll wird, /status zeigt Konfiguration und Token-Verbrauch, /usage dein Kontingent. Und /import übernimmt Einstellungen und Projekte aus Claude Code oder Cursor, falls du umsteigst.",
                    "Codex arbeitet standardmäßig mit OpenAI-Modellen, laut Konfigurationsdoku lassen sich aber auch eigene Provider wie Ollama, LM Studio oder Amazon Bedrock eintragen. Ob sich ein lokales Modell für dich lohnt, klärt der Ratgeber Lokale KI 2026."
                ]
            },
            {
                "h": "Dein erster Durchlauf in vier Schritten",
                "p": [
                    "Erstens: Öffne deinen Projektordner in PowerShell und prüfe mit git status, dass alles committet ist. Dann hast du einen sauberen Ausgangspunkt, zu dem du jederzeit zurückkommst.",
                    "Zweitens: Starte codex, melde dich an und lass mit /init die AGENTS.md anlegen. Lies sie aufmerksam, denn darin steht, was Codex über dein Projekt verstanden hat. Liegt er falsch, korrigierst du das jetzt und nicht nach zwanzig Änderungen.",
                    "Drittens: Gib ihm eine kleine Aufgabe, etwa „Füge für die Funktion X einen Test hinzu“. Viertens: Schau dir mit /diff an, was passiert ist. Passt es, committest du selbst. Passt es nicht, setzt git restore . alles zurück, und keiner muss davon erfahren."
                ]
            }
        ],
        "faq": [
            [
                "Ist Codex CLI kostenlos?",
                "Das Programm ja, es steht unter Apache 2.0. Die Modellnutzung nicht: Die läuft laut OpenAI über ein ChatGPT-Abo ab Plus oder nach Verbrauch über einen API-Key. Free und Go bekommen je nach Rollout nur die Codex-Desktop-App."
            ],
            [
                "Brauche ich unter Windows WSL für Codex?",
                "Nein. Laut offizieller Doku läuft Codex nativ in PowerShell mit eigener Windows-Sandbox. WSL 2 lohnt sich nur, wenn deine Werkzeuge ohnehin unter Linux laufen."
            ],
            [
                "Versteht Codex CLI Deutsch?",
                "Ja, du kannst Aufgaben auf Deutsch stellen. Oberfläche und Doku sind englisch. Damit Antworten und Commit-Texte zuverlässig deutsch sind, schreib eine Zeile dazu in deine AGENTS.md."
            ],
            [
                "Was ist der Unterschied zwischen ChatGPT-Login und API-Key?",
                "Mit ChatGPT-Login zahlst du über dein Abo und dessen Limits. Mit API-Key rechnet OpenAI nach Verbrauch ab, dein Abo zählt dann nicht, und Codex Cloud sowie einige Plugins fehlen."
            ],
            [
                "Wie verhindere ich, dass Codex ungefragt Dateien ändert?",
                "Starte ihn mit codex --sandbox read-only. Dann liest Codex nur und fragt vor jeder Änderung und jedem Befehl nach."
            ]
        ],
        "quellen": [
            {
                "titel": "OpenAI: Codex CLI, Installation und Anmeldung",
                "url": "https://learn.chatgpt.com/docs/codex/cli"
            },
            {
                "titel": "OpenAI: Anmeldung, Abrechnung und Zugangsdaten",
                "url": "https://learn.chatgpt.com/docs/auth"
            },
            {
                "titel": "OpenAI: Sandbox-Modi und Freigaben",
                "url": "https://learn.chatgpt.com/docs/sandboxing"
            },
            {
                "titel": "OpenAI: Windows-Sandbox und Systemvoraussetzungen",
                "url": "https://learn.chatgpt.com/docs/windows/windows-sandbox"
            },
            {
                "titel": "OpenAI: AGENTS.md in Codex",
                "url": "https://learn.chatgpt.com/docs/agent-configuration/agents-md"
            },
            {
                "titel": "OpenAI: Befehls- und Slash-Referenz",
                "url": "https://learn.chatgpt.com/docs/developer-commands?surface=cli"
            },
            {
                "titel": "OpenAI: Codex-Pläne und Limits",
                "url": "https://learn.chatgpt.com/docs/pricing"
            },
            {
                "titel": "GitHub: openai/codex (Quellcode und Releases)",
                "url": "https://github.com/openai/codex"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "claude-code-vs-codex",
        "seoTitle": "Claude Code vs. Codex: Preise, Limits und Windows",
        "title": "Claude Code oder Codex: welcher Coding-Agent passt zu dir?",
        "description": "Claude Code und Codex CLI im direkten Vergleich: Befehle, Freigaben, Sandbox unter Windows, Preise und Limits mit Stand November 2026. Plus eine Entscheidungshilfe für deine Lage.",
        "jean": "Claude Code und Codex sind wie zwei gute Drehmomentschlüssel: Beide ziehen die Schraube fest, entscheidend ist, welcher besser in deine Hand und deinen Werkzeugwagen passt.",
        "minutes": 8,
        "sections": [
            {
                "h": "Claude Code oder Codex: die kurze Antwort",
                "p": [
                    "Arbeitest du unter Windows ohne WSL und willst, dass Befehle abgeschottet laufen, ist Codex CLI die bessere Wahl. Brauchst du dagegen genaue Freigaben pro Befehl, Hooks und Regeln fürs ganze Team, nimm Claude Code, im Einstiegsabo kosten beide 20 $ im Monat.",
                    "Im Kern machen beide dasselbe: Sie sitzen im Terminal, lesen deinen Code, führen Befehle aus und ändern Dateien. Die Unterschiede stecken im Detail, nämlich bei Konfiguration, Sandbox unter Windows, beim Laden der Projektanweisungen und bei den Abos.",
                    "Alles hier stammt aus den offiziellen Dokumentationen von Anthropic und OpenAI mit Stand 3. November 2026. Eigene Benchmarks habe ich nicht gefahren, wer dir sagt, welcher Agent „besser programmiert“, misst meist nur seinen Lieblingsfall."
                ]
            },
            {
                "h": "Unter Windows: wer schützt dich besser?",
                "p": [
                    "Beide installierst du nativ in PowerShell, ohne Adminrechte. Claude Code holst du mit irm https://claude.ai/install.ps1 | iex, dann aktualisiert es sich selbst. Alternativ gibt es winget install Anthropic.ClaudeCode, dieses Paket aktualisiert sich aber nicht automatisch. Codex installierst du mit irm https://chatgpt.com/codex/install.ps1 | iex oder, falls Node.js da ist, mit npm install -g @openai/codex.",
                    "Der wichtigste Unterschied unter Windows ist die Sandbox. Codex bringt eine eigene Windows-Sandbox mit, die Befehle in PowerShell abschottet. Claude Code hat nativ unter Windows keine Sandbox, die gibt es nur unter WSL2, macOS und Linux. Unter nativem Windows schützen dich bei Claude Code also nur die Freigaberegeln, sozusagen Bremse ohne Leitplanke.",
                    "Claude Code läuft nativ ab Windows 10 Version 1809. Für Bash-Befehle empfiehlt Anthropic zusätzlich Git für Windows, fehlt es, nutzt Claude Code PowerShell. Die Einrichtung im Detail findest du im Ratgeber Codex CLI auf Deutsch, für Claude Code im Ratgeber Claude Code installieren."
                ]
            },
            {
                "h": "Welcher Befehl in Claude Code entspricht welchem in Codex?",
                "p": [
                    "Anmelden: Bei Claude Code startest du einfach claude und loggst dich im Browser ein. Bei Codex tippst du codex login, ohne Browser geht es mit codex login --device-auth.",
                    "Konfiguration: Claude Code speichert deine Nutzereinstellungen als JSON in der Datei settings.json im Ordner .claude in deinem Benutzerverzeichnis. Codex nimmt TOML, die Datei heißt config.toml und liegt im Ordner .codex. Pro Projekt hat Claude Code .claude/settings.json für das Team und .claude/settings.local.json für dich privat. Codex liest eine Projektdatei .codex/config.toml, allerdings nur in Projekten, die du als vertrauenswürdig markiert hast.",
                    "Projektanweisungen: Claude Code liest CLAUDE.md und seit Version 2.1.277 auch AGENTS.md, solange keine CLAUDE.md da ist. Codex liest AGENTS.md, und liegt im selben Ordner eine AGENTS.override.md, hat die Vorrang. Globale Anweisungen liegen bei Claude Code in der CLAUDE.md im Ordner .claude, bei Codex in der AGENTS.md im Ordner .codex. In beiden Tools legt /init die passende Datei für dich an.",
                    "Ohne Dialog in Skripten oder CI rufst du claude -p mit deinem Auftrag in Anführungszeichen auf, bei Codex codex exec. Die letzte Sitzung holst du mit claude --continue bzw. codex resume --last zurück. Eine Einstellung nur für einen Lauf übergibst du bei Claude Code mit --settings, bei Codex mit -c schluessel=wert oder einem Profil über --profile."
                ]
            },
            {
                "h": "Freigaben, Sandbox, Modelle und MCP im Vergleich",
                "p": [
                    "Bei den Freigaben ist Claude Code feiner einstellbar. Der Freigabemodus kennt default, acceptEdits, plan, auto, dontAsk und bypassPermissions, gesetzt über --permission-mode. Dazu kommen Regeln pro Befehl in permissions.allow, ask und deny, zum Beispiel eine Erlaubnis für Bash(npm run test *). Codex kennt als Freigaberegel nur on-request und never, gesetzt mit -a oder approval_policy, in der Sitzung mit /permissions. Eine Erlaubnisliste pro Befehl in dieser Form hat Codex nicht.",
                    "Bei der Sandbox ist es umgekehrt. Codex hat drei Modi, read-only, workspace-write und danger-full-access, gesetzt mit -s oder sandbox_mode. Claude Code schaltest du die Sandbox mit /sandbox oder in den Einstellungen zu, aber eben nur unter WSL2, macOS und Linux. Den Notausschalter für alle Prüfungen haben beide: --dangerously-skip-permissions bei Claude Code, --yolo bei Codex. Beide gehören nicht auf einen Rechner mit echten Zugangsdaten.",
                    "Erst planen, dann bauen: In Claude Code drückst du Shift+Tab, bis der Plan-Modus erscheint, in Codex tippst du /plan. Das Modell wechselst du in beiden mit /model, beim Start mit --model bzw. -m. Bei Codex stellst du die Denktiefe zusätzlich über model_reasoning_effort ein.",
                    "MCP-Server fügst du mit claude mcp add hinzu, fürs Projekt gibt es die Datei .mcp.json. Bei Codex heißt es codex mcp add mit Name und Startbefehl, in der config.toml landet das unter einem Abschnitt mcp_servers. Deinen Verbrauch siehst du in Claude Code mit /usage, in Codex zeigt /usage das Kontingent und /status Konfiguration und Token-Verbrauch."
                ]
            },
            {
                "h": "Was kosten Claude Code und Codex? Stand 3. November 2026",
                "p": [
                    "Beide Anbieter veröffentlichen Listenpreise nur in US-Dollar. Für Kunden in Deutschland rechnet der Checkout in Euro ab, Privatkunden zahlen 19 % MwSt. dazu, eine offizielle Euro-Preisliste gibt es bei keinem. Die Euro-Werte hier sind Umrechnungen mit dem EZB-Kurs 1,1179 vom 3.11.2026, verbindlich ist immer der Betrag im Checkout.",
                    "Kostenlos geht bei Claude Code nichts, erst Claude Pro schließt es ein. Pro kostet 20 $ im Monat, ca. 21,29 € inkl. 19 % MwSt., bei Jahreszahlung 17 $ im Monat. Max kostet 100 $, ca. 106,45 € inkl. 19 % MwSt., mit fünfmal so viel Nutzung wie Pro. Ultra kostet 200 $, ca. 212,90 € inkl. 19 % MwSt., mit zehnmal so viel Wochennutzung wie Pro und ohne Fünf-Stunden-Limit für verifizierte Konten. Im Team-Plan kostet der Standard-Platz 25 $ monatlich oder 20 $ bei Jahreszahlung, der Premium-Platz 125 $ bzw. 100 $.",
                    "Bei OpenAI gibt es in Free und Go, das 8 $ kostet, also ca. 8,52 € inkl. 19 % MwSt., je nach Rollout nur die Codex-Desktop-App, keine CLI. Die CLI beginnt bei Plus für 20 $, ca. 21,29 € inkl. 19 % MwSt. Pro gibt es ab 100 $ in den Stufen 100, 200 und 500 $, Business kostet 25 $ pro Nutzer monatlich oder 20 $ bei Jahreszahlung. Bei beiden kannst du statt Abo auch einen API-Schlüssel nutzen und nach Verbrauch zahlen.",
                    "Bei den Limits misst Claude in einem rollierenden Fünf-Stunden-Fenster plus einem Wochenfenster, Ultra hat nur das Wochenlimit. In Team und Enterprise teilen sich Claude Code, Chat und Cowork ein Kontingent pro Platz. OpenAI nennt für Plus je Modell nur eine Spanne an Nachrichten pro fünf Stunden, dazu mögliche Wochenlimits, Pro hat derzeit kein Fünf-Stunden-Limit. Codex teilt sein Kontingent mit ChatGPT Work, dem Agentenmodus in ChatGPT. Normale Chats nennt OpenAI dabei nicht."
                ]
            },
            {
                "h": "So nutzt du beide Agenten im selben Repo",
                "p": [
                    "Arbeitest du mit beiden Agenten, schreib die gemeinsamen Regeln genau einmal in eine AGENTS.md. Codex liest sie direkt, Claude Code ab Version 2.1.277 auch, aber nur, solange es weder eine CLAUDE.md noch eine CLAUDE.local.md gibt.",
                    "Brauchst du Regeln nur für Claude, leg eine CLAUDE.md an, deren erste Zeile @AGENTS.md lautet. Darunter kommen die Claude-Sonderregeln, etwa dass vor dem Abschluss npm test laufen muss. So pflegst du nichts doppelt, und beide Agenten arbeiten nach derselben Hausordnung.",
                    "Zwei Fallen solltest du kennen. Claude Code ignoriert AGENTS.override.md komplett. Und Codex hört nach insgesamt 32 KiB Anweisungen auf, weitere Dateien zu laden. Das ganze Setup Schritt für Schritt steht im Ratgeber AGENTS.md und CLAUDE.md."
                ]
            },
            {
                "h": "Welcher Agent passt zu deiner Lage?",
                "p": [
                    "Du arbeitest unter Windows ohne WSL und willst, dass Befehle abgeschottet laufen: Nimm Codex, wegen der nativen Windows-Sandbox. Du hast schon ChatGPT Plus oder höher: Auch dann liegt Codex nahe, es steckt bereits in deinem Abo, nur das Kontingent teilst du mit ChatGPT Work.",
                    "Du führst ein Team, in dem genau feststehen soll, welche Befehle erlaubt sind: Nimm Claude Code. Die Regeln mit allow, ask und deny pro Befehl und Pfad lassen sich zentral verwalten. Du hast schon ein Claude-Abo: Dann ist Claude Code ohnehin dabei, und du musst nichts zusätzlich bezahlen.",
                    "Du willst erst testen, ohne Geld auszugeben: Das geht nur eingeschränkt, nämlich mit der Codex-Desktop-App im ChatGPT-Free-Plan, je nach Rollout. Für die CLI brauchst du bei beiden ein Abo ab 20 $. Und wenn du dich nicht entscheiden kannst: Beide parallel im selben Repo mit einer gemeinsamen AGENTS.md ist kein Widerspruch, sondern ziemlich praktisch. Willst du gar nicht im Terminal sitzen, sondern Apps per Chat zusammenbauen, schau in den Ratgeber Vibe Coding: Apps bauen mit Lovable, Bolt und v0."
                ]
            }
        ],
        "faq": [
            [
                "Kann ich Codex kostenlos nutzen?",
                "Nur eingeschränkt. Im ChatGPT-Free-Plan gibt es laut OpenAI je nach Rollout die Codex-Desktop-App, die Codex CLI aber erst ab ChatGPT Plus für 20 $ im Monat. Claude Code gibt es erst ab Claude Pro, ebenfalls 20 $."
            ],
            [
                "Läuft Claude Code unter Windows ohne WSL?",
                "Ja, nativ ab Windows 10 Version 1809. Die Befehls-Sandbox fehlt dort aber, die gibt es nur unter WSL2, macOS und Linux. Codex bringt dagegen eine eigene Windows-Sandbox mit."
            ],
            [
                "Liest Claude Code die AGENTS.md von Codex?",
                "Ja, ab Version 2.1.277, standardmäßig aber nur, wenn keine CLAUDE.md oder CLAUDE.local.md im Arbeitsordner oder darüber liegt. Über eine Einstellung lädt Claude Code auf Wunsch beide."
            ],
            [
                "Teilen sich ChatGPT und Codex das Limit?",
                "Teilweise. Laut OpenAI teilt Codex sein Kontingent mit ChatGPT Work, dem Agentenmodus in ChatGPT. Dass normale ChatGPT-Chats das Codex-Limit verbrauchen, steht dort nicht."
            ],
            [
                "Was kosten Claude Code und Codex in Euro?",
                "Beide nennen offiziell nur US-Dollar. Das Einstiegsabo kostet jeweils 20 $, umgerechnet ca. 21,29 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Den verbindlichen Betrag zeigt der Checkout."
            ]
        ],
        "quellen": [
            {
                "titel": "Claude Code Doku: Einstellungen",
                "url": "https://code.claude.com/docs/en/settings"
            },
            {
                "titel": "Claude Code Doku: Freigabemodi",
                "url": "https://code.claude.com/docs/en/permission-modes"
            },
            {
                "titel": "Claude Code Doku: Installation und Windows",
                "url": "https://code.claude.com/docs/en/setup"
            },
            {
                "titel": "Anthropic: Claude-Pläne und Preise",
                "url": "https://claude.com/pricing"
            },
            {
                "titel": "OpenAI: Codex-Pläne und Limits",
                "url": "https://learn.chatgpt.com/docs/pricing"
            },
            {
                "titel": "OpenAI: Codex-Konfigurationsreferenz",
                "url": "https://learn.chatgpt.com/docs/config-file/config-reference"
            },
            {
                "titel": "OpenAI: Codex Windows-Sandbox",
                "url": "https://learn.chatgpt.com/docs/windows/windows-sandbox"
            },
            {
                "titel": "EZB: Referenzkurs US-Dollar",
                "url": "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "agents-md-claude-md",
        "seoTitle": "AGENTS.md und CLAUDE.md: welches Tool liest was?",
        "title": "AGENTS.md und CLAUDE.md: so richtest du beide richtig ein",
        "description": "Welcher Coding-Agent liest AGENTS.md, welcher CLAUDE.md? So baust du ein Setup, das Claude Code ab Version 2.1.277, Codex, Cursor und Co. gleichzeitig versorgt, ohne Regeln doppelt zu pflegen.",
        "jean": "Zwei Hausordnungen mit denselben Regeln sind wie zwei Ersatzschlüssel an verschiedenen Bunden: Spätestens beim dritten Ändern passt einer nicht mehr.",
        "minutes": 7,
        "sections": [
            {
                "h": "AGENTS.md oder CLAUDE.md: was gehört wohin?",
                "p": [
                    "AGENTS.md ist die gemeinsame Anleitungsdatei, die Codex, Cursor, GitHub Copilot und die meisten anderen Coding-Agenten lesen, CLAUDE.md ist die Hausdatei von Claude Code. Seit Version 2.1.277 liest Claude Code auch AGENTS.md, aber nur, wenn keine CLAUDE.md da ist, deshalb fährst du am besten mit einer AGENTS.md für alle und höchstens einer kurzen CLAUDE.md, die sie importiert.",
                    "Die Regel, die alles andere einfacher macht: Gemeinsame Regeln stehen nur in der AGENTS.md. Brauchst du etwas nur für Claude, kommt eine CLAUDE.md dazu, deren erste Zeile @AGENTS.md lautet. Dieselbe Regel in zwei Dateien zu pflegen, geht garantiert irgendwann schief.",
                    "Alle Angaben hier habe ich am 3. November 2026 mit den Dokus der Hersteller abgeglichen. Wo nur Fremdquellen etwas behaupten, sage ich dir das dazu."
                ]
            },
            {
                "h": "Was steht in einer AGENTS.md überhaupt?",
                "p": [
                    "Eine AGENTS.md ist eine ganz normale Markdown-Datei im Projektordner, so etwas wie eine README für den Agenten. Drin steht, wie gebaut und getestet wird, welche Ordner tabu sind und welcher Stil gilt. Es gibt kein Pflichtschema, keine Pflichtüberschriften und keine Versionsnummer.",
                    "Das Format ist als Gemeinschaftsprojekt mehrerer KI-Firmen entstanden und liegt heute bei der Agentic AI Foundation unter dem Dach der Linux Foundation. Laut der offiziellen Seite agents.md nutzen es über 60.000 Open-Source-Projekte.",
                    "CLAUDE.md hat denselben Zweck, ist aber an Claude Code gebunden und kann mehr. Sie bindet andere Dateien per @ und Pfad ein, liegt auf Ebene von Nutzer, Projekt und Organisation und lässt sich über den Ordner .claude/rules nach Dateitypen aufteilen."
                ]
            },
            {
                "h": "Welches Tool liest welche Datei?",
                "p": [
                    "Claude Code hat CLAUDE.md, .claude/CLAUDE.md, die private CLAUDE.local.md und deine globale CLAUDE.md im Ordner .claude in deinem Benutzerverzeichnis. AGENTS.md liest es ab Version 2.1.277, standardmäßig nur ohne Projekt-CLAUDE.md, umstellbar unter Project instructions in /config. Codex CLI hat keine eigene Datei, sondern lebt von AGENTS.md, dazu kommen AGENTS.override.md und die globale AGENTS.md im Ordner .codex. Insgesamt liest Codex höchstens 32 KiB.",
                    "Gemini CLI nutzt GEMINI.md und liest AGENTS.md nur, wenn du sie in der Einstellung context.fileName einträgst. Beachte, dass Gemini CLI seit dem 18. Juni 2026 keine privaten Google-Konten mehr bedient, sondern nur noch mit API-Key oder einer Code-Assist-Lizenz läuft. Google empfiehlt Privatnutzern die Antigravity CLI. Ob die AGENTS.md liest, behaupten bisher nur Fremdquellen, offiziell bestätigt ist das nicht.",
                    "Cursor hat eigene Regeln unter .cursor/rules, liest aber auch AGENTS.md im Projektstamm und in Unterordnern und führt verschachtelte Dateien zusammen. Der Copilot Coding Agent von GitHub hat .github/copilot-instructions.md und liest laut GitHub-Changelog vom 28. August 2025 AGENTS.md, außerdem CLAUDE.md und GEMINI.md.",
                    "Aider ist der Sonderfall. Dort heißt die Datei nach Konvention CONVENTIONS.md, und AGENTS.md liest Aider nicht von selbst. Du bindest sie über den Eintrag read in der Datei .aider.conf.yml ein."
                ]
            },
            {
                "h": "Wann Claude Code deine AGENTS.md liest und wann nicht",
                "p": [
                    "Claude Code schaut beim Start in den Arbeitsordner und in jeden Ordner darüber. Entscheidend sind drei Dateien: CLAUDE.md, .claude/CLAUDE.md und CLAUDE.local.md. Findet Claude mindestens eine davon, liest es die CLAUDE-Dateien, und die AGENTS.md bleibt liegen. Findet es keine, lädt es jede AGENTS.md und .claude/AGENTS.md auf dem Weg nach oben. Die AGENTS.md eines Unterordners kommt dazu, sobald Claude dort eine Datei öffnet. Nie gelesen werden AGENTS.local.md, AGENTS.override.md und alles unter .agents.",
                    "Jetzt die Stolperfalle, über die fast jeder einmal fällt: Deine globale CLAUDE.md im Benutzerordner zählt nicht, eine private CLAUDE.local.md im Projekt aber schon. Legst du dir eine an, ignoriert Claude ab sofort die AGENTS.md des Teams, und zwar ohne jede Warnung.",
                    "Die Abhilfe: Stell in /config den Punkt Project instructions auf claude-md-and-agents-md. Dauerhaft geht das in deinen Nutzereinstellungen, also der settings.json im Ordner .claude in deinem Benutzerverzeichnis. Dort setzt du unter pluginConfigs beim Eintrag cc-plugin-agents-md@builtin die Option instructionFiles auf claude-md-and-agents-md. Bis Version 2.1.285 hieß das Plugin noch agents-md@builtin. In der .claude/settings.json des Projekts wird der Eintrag ignoriert.",
                    "Was wirklich geladen ist, zeigt dir /context unter Memory files. Seit Version 2.1.281 klappt das AGENTS.md-Lesen auch über Amazon Bedrock, Google Vertex AI, Microsoft Foundry und LLM-Gateways. In manchen Sitzungen funktioniert es trotzdem nicht, zum Beispiel in der ersten nach einem Update von 2.1.276 oder älter. Der Import mit @AGENTS.md in einer CLAUDE.md funktioniert dagegen in jeder Version."
                ]
            },
            {
                "h": "So richtest du das Setup in fünf Minuten ein, Windows zuerst",
                "p": [
                    "Du brauchst zwei Dateien im Projektordner: eine AGENTS.md mit deinen Regeln und eine CLAUDE.md, deren einziger Inhalt die Zeile @AGENTS.md ist. Unter Windows lohnt sich dabei ein kleiner Umweg: Set-Content -Encoding utf8 setzt in Windows PowerShell 5.1 eine BOM an den Dateianfang, und damit kommt nicht jedes Tool klar, vor allem bei JSON.",
                    "Sauberes UTF-8 ohne BOM bekommst du so: Leg in PowerShell mit $utf8 = New-Object System.Text.UTF8Encoding $false einen Encoder an und schreib dann die Datei mit [IO.File]::WriteAllText(\"$PWD\\CLAUDE.md\", \"@AGENTS.md`n\", $utf8). Für die AGENTS.md machst du dasselbe mit einer Überschrift als Inhalt. Das funktioniert in PowerShell 5.1 und 7.",
                    "Nutzt du auch Gemini CLI, legst du einen Ordner .gemini an und darin eine settings.json, in der context.fileName auf die Liste AGENTS.md und GEMINI.md zeigt. Dann liest Gemini CLI deine gemeinsamen Regeln mit. Auf macOS und Linux reichen touch AGENTS.md und printf '@AGENTS.md\\n' > CLAUDE.md.",
                    "Warum Import statt Symlink? Ein ln -s AGENTS.md CLAUDE.md klappt auf Mac und Linux. Unter Windows braucht ein Symlink aber Adminrechte oder den Entwicklermodus, und Git checkt einen eingecheckten Symlink ohne core.symlinks als einzeilige Textdatei aus. Anthropic rät deshalb in gemischten Teams zum Import, und ich auch."
                ]
            },
            {
                "h": "So sehen gute Vorlagen für CLAUDE.md und AGENTS.md aus",
                "p": [
                    "Eine CLAUDE.md neben einer AGENTS.md braucht selten mehr als ein paar Zeilen. Oben steht @AGENTS.md, darunter ein Abschnitt nur für Claude Code. Typische Einträge: Änderungen an einem heiklen Ordner wie der Abrechnung erst im Plan-Modus vorschlagen, vor „fertig“ immer den Testbefehl aus der AGENTS.md ausführen, Antworten und Commit-Texte auf Deutsch.",
                    "Für die AGENTS.md haben sich fünf Blöcke bewährt. Projekt sagt in einem Satz, was das ist, etwa ein TypeScript-Dienst auf Node.js mit pnpm. Befehle listet Installieren, Testen, auch für eine einzelne Datei, Lint und Typprüfung. Regeln hält den Stil fest, Verboten die roten Linien wie Lockfiles von Hand ändern oder .env-Dateien anfassen. Fertig heißt definiert, wann eine Aufgabe erledigt ist, zum Beispiel wenn Lint, Typen und Tests grün sind.",
                    "Bei einem Python-Projekt mit uv stehen unter Befehle eben uv sync, uv run pytest, ruff und mypy, und unter Verboten pip install direkt. Im Monorepo beschreibt die Wurzel-Datei den Aufbau der Apps und Pakete, jede App bekommt ihre eigene AGENTS.md mit den Besonderheiten, die nächstgelegene Datei gilt. Bei einem WordPress-Plugin gehören Präfixe für Funktionen, Escaping, Nonce-Prüfungen und $wpdb->prepare() in die Regeln.",
                    "Schreib die Vorlagen ruhig auf Deutsch, die Agenten verstehen das problemlos. Und halt die Datei kurz: Anthropic empfiehlt unter 200 Zeilen pro CLAUDE.md, Codex liest sowieso nur 32 KiB. Hält sich der Agent nicht an eine Regel, ist die Datei meist zu lang und nicht zu kurz."
                ]
            },
            {
                "h": "Was in keine der beiden Dateien gehört",
                "p": [
                    "Doku hat dort nichts verloren. Verlink sie, statt sie einzukopieren. Claude Code bindet Dateien per @ und Pfad bis zu vier Ebenen tief ein, aber eingebundene Dateien fressen genauso Kontext wie direkt geschriebener Text.",
                    "Regeln, die hart gelten müssen, gehören nicht in diese Dateien. Beide sind Kontext, keine Konfiguration, der Agent kann sie überlesen. Was sicher blockiert sein soll, regelst du über Berechtigungen oder einen Hook. Mehr zu Freigaben und Sandbox steht im Ratgeber Claude Code oder Codex.",
                    "Zugangsdaten, Tokens und interne Adressen schreibst du auch nicht hinein, genauso wenig wie in eine README. Und persönliche Vorlieben wandern in deine globale Datei, also die CLAUDE.md im Ordner .claude oder die AGENTS.md im Ordner .codex deines Benutzerverzeichnisses, nicht ins Repo, wo sie dem ganzen Team aufgedrückt werden."
                ]
            }
        ],
        "faq": [
            [
                "Liest Claude Code die AGENTS.md?",
                "Ja, ab Version 2.1.277 laut offiziellem Changelog, standardmäßig aber nur, wenn keine CLAUDE.md im Arbeitsordner oder darüber liegt. Ein Datum nennt das Changelog nicht. Der Import @AGENTS.md in einer CLAUDE.md funktioniert in jeder Version."
            ],
            [
                "Soll ich meine CLAUDE.md löschen?",
                "Steht darin nur in Worten, Claude solle die AGENTS.md lesen: ja, dann liest Claude sie direkt. Stehen @AGENTS.md und eigene Claude-Regeln drin: behalten. Der Import lädt die AGENTS.md nie doppelt."
            ],
            [
                "Liest Codex die CLAUDE.md?",
                "Nicht von selbst. Über project_doc_fallback_filenames in der Codex-Konfiguration ginge es, einfacher ist es, die gemeinsamen Regeln in die AGENTS.md zu ziehen."
            ],
            [
                "Wie lang darf eine AGENTS.md oder CLAUDE.md sein?",
                "So kurz wie möglich. Anthropic empfiehlt unter 200 Zeilen pro CLAUDE.md, Codex liest insgesamt höchstens 32 KiB. Ignoriert der Agent Regeln, ist die Datei oft zu lang."
            ],
            [
                "Gibt es eine offizielle AGENTS.md-Vorlage?",
                "Nein, das Format schreibt keine Gliederung vor. Bewährt haben sich die Blöcke Projekt, Befehle, Regeln, Verboten und Fertig heißt. In Claude Code und Codex erzeugt /init einen ersten Entwurf aus deinem Code."
            ]
        ],
        "quellen": [
            {
                "titel": "Claude Code Doku: How Claude remembers your project",
                "url": "https://code.claude.com/docs/en/memory"
            },
            {
                "titel": "Claude Code Changelog (Versionen 2.1.277 und 2.1.281)",
                "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            },
            {
                "titel": "OpenAI: AGENTS.md in Codex",
                "url": "https://learn.chatgpt.com/docs/agent-configuration/agents-md"
            },
            {
                "titel": "Gemini CLI: GEMINI.md und context.fileName",
                "url": "https://geminicli.com/docs/cli/gemini-md"
            },
            {
                "titel": "Cursor Doku: Rules",
                "url": "https://cursor.com/docs/rules"
            },
            {
                "titel": "GitHub Changelog: Copilot Coding Agent unterstützt AGENTS.md",
                "url": "https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions"
            },
            {
                "titel": "Aider: Konventionsdateien",
                "url": "https://aider.chat/docs/usage/conventions.html"
            },
            {
                "titel": "Das AGENTS.md-Format",
                "url": "https://agents.md/"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "gemini-cli-antigravity-cli",
        "seoTitle": "Gemini CLI eingestellt? Umstieg auf Antigravity CLI",
        "title": "Gemini CLI eingestellt? So steigst du auf die Antigravity CLI um",
        "description": "Seit dem 18. Juni 2026 nimmt die Gemini CLI keine privaten Google-Konten mehr an. So installierst du die Antigravity CLI (agy) unter Windows, ziehst Einstellungen um und weißt, was kostenlos bleibt.",
        "jean": "Google hat die Gemini CLI nicht verschrottet, nur den Schlüssel für Privatkunden eingezogen. Das Auto steht noch in der Garage, du kommst bloß nicht mehr rein.",
        "minutes": 7,
        "sections": [
            {
                "h": "Ist die Gemini CLI wirklich eingestellt?",
                "p": [
                    "Nein, aber für private Konten ist Schluss: Seit dem 18. Juni 2026 bedient die Gemini CLI keine Anfragen mehr von privaten Google-Konten, egal ob kostenloser Zugang, Google AI Pro oder Google AI Ultra. Wer so angemeldet war, steigt auf die Antigravity CLI um, die Google als Nachfolger empfiehlt und die im Terminal mit dem Befehl agy startet.",
                    "Das Projekt selbst lebt weiter. Das Repository der Gemini CLI ist öffentlich, nicht archiviert und steht weiter unter der Apache-2.0-Lizenz. Nutzbar ist es aber nur noch mit API-Schlüssel oder mit einer Lizenz für Gemini Code Assist Standard oder Enterprise. Die Anmeldung per Google-Konto, also der bequeme Weg für Privatleute, funktioniert dort nicht mehr.",
                    "Angekündigt hat Google den Wechsel am 19. Mai 2026 im Developers Blog, am selben Tag wurde die Antigravity CLI für alle freigegeben. Vier Wochen Übergangsfrist sind nicht viel. Wenn deine Gemini CLI seit Sommer nur noch Anmeldefehler ausspuckt, liegt es also nicht an deiner Installation, sondern am Kalender."
                ]
            },
            {
                "h": "Betrifft dich der Wechsel?",
                "p": [
                    "Betroffen bist du, wenn du dich mit einem privaten Google-Konto angemeldet hast. Das gilt für den kostenlosen Zugang (bei Google „Code Assist für Einzelpersonen“) genauso wie für die Abos Google AI Pro und Google AI Ultra. Auch die Code-Assist-Erweiterungen für VS Code und JetBrains nehmen private Konten seit dem Stichtag nicht mehr an. Für dich heißt das: agy installieren oder zu einem anderen Agenten wechseln.",
                    "Nicht betroffen bist du mit einem Gemini-API-Schlüssel oder mit einer Firmenlizenz für Gemini Code Assist Standard oder Enterprise. Dann läuft deine Gemini CLI weiter wie bisher, und die Antigravity CLI ist nur eine Option.",
                    "Eine Grauzone bleibt: der kostenlose API-Schlüssel aus Google AI Studio. Googles Blogbeitrag spricht ausdrücklich von bezahlten Schlüsseln, ob die Gratis-Variante weiter funktioniert, ist nicht offiziell bestätigt. Probier es aus, aber plan den Umzug trotzdem ein. Auf eine Brücke, deren Statik niemand unterschreibt, stellst du ja auch keinen Umzugswagen."
                ]
            },
            {
                "h": "So installierst du die Antigravity CLI unter Windows, macOS und Linux",
                "p": [
                    "Unter Windows brauchst du weder Administratorrechte noch WSL. Öffne die PowerShell und tipp irm https://antigravity.google/cli/install.ps1 | iex ein. Danach ein neues Terminalfenster öffnen, sonst kennt die Shell den neuen Pfad noch nicht, und mit agy --version prüfen, ob alles sitzt. Das Programm landet in deinem Benutzerordner unter AppData\\Local\\agy\\bin.",
                    "Arbeitest du lieber in der klassischen Eingabeaufforderung, nimm curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd. Ein offizielles winget-Paket für agy gibt es bisher nicht. Meldet die Shell, dass irm unbekannt ist, sitzt du übrigens in CMD und nicht in der PowerShell.",
                    "Unter macOS und Linux reicht curl -fsSL https://antigravity.google/cli/install.sh | bash. Das Programm liegt dann unter ~/.local/bin/agy. Findet die Shell es nicht, fehlt dieser Ordner im PATH, dann trägst du export PATH=\"$HOME/.local/bin:$PATH\" in deine .zshrc oder .bashrc ein.",
                    "Zum Anmelden startest du agy im Projektordner. Der Browser öffnet sich, du meldest dich mit deinem Google-Konto an, für Firmenkonten wählst du „Business account“. Unter Windows merkt sich die CLI die Sitzung in der Anmeldeinformationsverwaltung, beim nächsten Start geht es ohne Browser. Anders als die Gemini CLI braucht agy kein Node.js, Google hat es in Go geschrieben und liefert es als einzelnes Programm aus."
                ]
            },
            {
                "h": "So nimmst du deine Gemini-Einstellungen mit",
                "p": [
                    "Beim ersten Start erkennt agy einen vorhandenen Ordner .gemini und bietet an, die alte Konfiguration zu übernehmen. Du kannst den Import auch jederzeit selbst anstoßen, mit agy plugin import gemini. Dabei werden aus Gemini-Erweiterungen Antigravity-Plugins, inklusive Skills, eigener Befehle und MCP-Server.",
                    "Deine Projektregeln musst du nicht anfassen. Antigravity liest GEMINI.md und AGENTS.md weiter, im Projekt und global unter ~/.gemini. Von Hand umziehen musst du nur die Skills im Projekt: Die wandern von .gemini/skills nach .agents/skills. In der PowerShell geht das mit New-Item -ItemType Directory -Force .agents und danach Move-Item .gemini\\skills .agents\\skills.",
                    "MCP-Server stehen künftig in eigenen Dateien: global in ~/.gemini/config/mcp_config.json, im Projekt in .agents/mcp_config.json. Bei entfernten Servern heißt der Schlüssel für die Adresse jetzt serverUrl statt url oder httpUrl. Wer das übersieht, wundert sich, warum der Server nicht antwortet. Das ist wie ein Steckschlüssel, der fast passt: Er rutscht genau dann ab, wenn du ihn brauchst.",
                    "Laut Google war zum Start nicht jede Funktion der Gemini CLI eins zu eins vorhanden, eigene Farbschemata und experimentelle Anzeige-Extras etwa werden teils nicht unterstützt. Skills, Hooks, Subagenten und Erweiterungen gibt es aber weiterhin."
                ]
            },
            {
                "h": "Was kostet die Antigravity CLI?",
                "p": [
                    "Der Plan für Einzelpersonen kostet 0 $ im Monat. Er hat laut Google grundlegende wöchentliche Limits, Tab-Vervollständigung und Befehlsanfragen sind unbegrenzt. Wie viele Agenten-Anfragen in der Woche drinstecken, nennt Google nicht. Deinen aktuellen Stand zeigt dir der Befehl /usage direkt in agy.",
                    "Der Haken: Das Kontingent setzt sich nur einmal pro Woche zurück, und Google kann die Grenzen nach verfügbarer Kapazität anpassen. Wer am Montag kräftig loslegt, steht am Mittwoch womöglich mit leerem Tank da. Zum Ausprobieren reicht der Gratis-Plan locker, für planbare Arbeit im Team eher nicht.",
                    "Mehr Kontingent gibt es mit Google AI Pro und Google AI Ultra. Den verbindlichen Euro-Preis dafür zeigt Google auf der Google-One-Seite und im Checkout, auf der Antigravity-Preisseite stehen keine Euro-Preise. Für Firmen gibt es Business-Pläne über Google Cloud ab 30 $ pro Nutzer und Monat, das sind ca. 31,93 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026), alternativ nutzungsabhängig ohne Grundgebühr."
                ]
            },
            {
                "h": "Open Source und Datenschutz: zwei Punkte, die du kennen solltest",
                "p": [
                    "Wer die Gemini CLI wegen des offenen Quellcodes gewählt hat, verliert beim Umstieg genau das. Die Antigravity CLI ist nicht Open Source. Das öffentliche GitHub-Repository google-antigravity/antigravity-cli enthält Dokumentation, Beispiele und den Issue-Tracker, aber keinen Quellcode und keine Open-Source-Lizenz.",
                    "Außerdem erfasst Google laut README des Repositorys standardmäßig Interaktionsdaten. Abschalten lässt sich das in den Einstellungen. Arbeitest du mit Kundencode, schau dir diesen Schalter an, bevor du agy das erste Mal auf ein echtes Projekt loslässt. Was du bei KI-Tools im Unternehmen generell prüfen solltest, steht im Ratgeber KI-Tools und Datenschutz: die DSGVO-Checkliste für den Einsatz im Unternehmen.",
                    "Für Skripte und CI-Pipelines ohne Browser nutzt agy einen Gemini-API-Schlüssel. Dazu trägst du \"modelProvider\": \"gemini\" in die Datei ~/.gemini/antigravity-cli/settings.json ein und setzt in der PowerShell die Variable GEMINI_API_KEY. Im Google-Cloud-Umfeld geht es auch über gcloud auth application-default login zusammen mit der Variable AGY_ADC_AUTH=true."
                ]
            },
            {
                "h": "Lieber weg von Google? Das sind deine Alternativen",
                "p": [
                    "Bezahlst du ohnehin schon für Google AI Pro, ist agy der naheliegende Weg, weil dein Abo dort höhere Limits mitbringt. Willst du nach dem erzwungenen Umzug lieber gleich ganz woanders hin, gibt es im Terminal drei ernsthafte Kandidaten.",
                    "Claude Code arbeitet ähnlich wie die Gemini CLI, setzt aber mindestens Claude Pro für 20 $ im Monat voraus, bei Jahreszahlung 17 $ im Monat. Die Codex CLI von OpenAI ist Open Source und ab ChatGPT Plus enthalten. Und Aider mit einem lokalen Modell kostet gar nichts außer Hardware und Strom, mehr dazu im Ratgeber Aider mit Ollama: lokal programmieren, ohne dass Code das Haus verlässt.",
                    "Deine GEMINI.md musst du bei keinem Wechsel wegwerfen. Viele Agenten lesen AGENTS.md, Claude Code zum Beispiel seit Version 2.1.277, wenn im Projekt keine CLAUDE.md liegt. Benenn die Datei um oder leg eine AGENTS.md daneben, und deine Projektregeln ziehen mit um."
                ]
            }
        ],
        "faq": [
            [
                "Wird die Gemini CLI eingestellt?",
                "Nicht komplett. Seit dem 18. Juni 2026 nimmt sie keine privaten Google-Konten mehr an, also weder den kostenlosen Zugang noch Google AI Pro oder Ultra. Mit API-Schlüssel oder einer Lizenz für Gemini Code Assist Standard oder Enterprise läuft sie weiter."
            ],
            [
                "Ist die Antigravity CLI kostenlos?",
                "Ja, mit Grenzen. Der Plan für Einzelpersonen kostet 0 $ und hat wöchentliche Limits, deren genaue Höhe Google nicht nennt. Tab-Vervollständigung und Befehlsanfragen sind unbegrenzt."
            ],
            [
                "Wie installiere ich die Antigravity CLI unter Windows?",
                "PowerShell öffnen, irm https://antigravity.google/cli/install.ps1 | iex ausführen, ein neues Fenster öffnen und mit agy --version prüfen. Administratorrechte und WSL brauchst du nicht."
            ],
            [
                "Funktioniert meine GEMINI.md in der Antigravity CLI weiter?",
                "Ja, ohne Änderung. Antigravity liest GEMINI.md und AGENTS.md im Projekt und global. Nur Projekt-Skills müssen von .gemini/skills nach .agents/skills umziehen."
            ],
            [
                "Ist die Antigravity CLI Open Source?",
                "Nein. Es gibt ein öffentliches GitHub-Repository für Doku und Issues, aber keinen Quellcode und keine Open-Source-Lizenz. Die Gemini CLI dagegen steht unter Apache 2.0."
            ]
        ],
        "quellen": [
            {
                "titel": "Google Developers Blog: Transitioning Gemini CLI to Antigravity CLI",
                "url": "https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/"
            },
            {
                "titel": "Ankündigung im Gemini-CLI-Repository (Discussion 28017)",
                "url": "https://github.com/google-gemini/gemini-cli/discussions/28017"
            },
            {
                "titel": "Gemini Code Assist: Hinweis zu Konten für Einzelpersonen",
                "url": "https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals"
            },
            {
                "titel": "Antigravity: Umzug von Gemini CLI",
                "url": "https://antigravity.google/docs/cli/gcli-migration"
            },
            {
                "titel": "Antigravity: Installation und erster Start",
                "url": "https://antigravity.google/docs/getting-started"
            },
            {
                "titel": "Antigravity: Pläne und Preise",
                "url": "https://antigravity.google/pricing"
            },
            {
                "titel": "Google One: Google-AI-Pläne",
                "url": "https://one.google.com/intl/de/about/google-ai-plans/"
            },
            {
                "titel": "GitHub: google-antigravity/antigravity-cli",
                "url": "https://github.com/google-antigravity/antigravity-cli"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "aider-ollama-lokal",
        "seoTitle": "Aider mit Ollama: lokal programmieren ohne Cloud",
        "title": "Aider mit Ollama: lokal programmieren, ohne dass Code das Haus verlässt",
        "description": "So richtest du Aider mit Ollama unter Windows ein, wählst das passende Coding-Modell für 8, 12, 16 oder 24 GB Grafikspeicher und weißt, wo lokale Modelle gegen Claude Code und Codex verlieren.",
        "jean": "Lokal programmieren ist wie Schrauben in der eigenen Garage: langsamer als in der Fachwerkstatt, aber niemand außer dir sieht, was unter der Haube steckt.",
        "minutes": 8,
        "sections": [
            {
                "h": "Geht KI-Coding komplett lokal?",
                "p": [
                    "Ja: Du installierst Ollama und Aider, lädst ein Coding-Modell, das in deinen Grafikspeicher passt, und startest Aider mit aider --model ollama_chat/ und dem Modellnamen. Das kostet keine Abo- oder Token-Gebühren und dein Quellcode bleibt auf deinem Rechner, an Claude Code oder die Codex CLI kommt eine einzelne Consumer-Grafikkarte aber nicht heran.",
                    "Für wen lohnt sich das? Vor allem für alle, die Code nicht an US-Anbieter schicken dürfen, etwa wegen Kundenverträgen, NDAs oder einer skeptischen Rechtsabteilung. Dazu kommt, wer ohnehin eine Grafikkarte mit 12 GB oder mehr im Rechner hat und überschaubare Aufgaben erledigen will: Funktionen ergänzen, Tests schreiben, Code erklären lassen, Refactorings über wenige Dateien.",
                    "Dieser Ratgeber ist der Coding-Teil des Themas. Was lokale KI im Browser und auf dem Laptop allgemein kann, steht im Ratgeber Lokale KI 2026: Was auf deinem Laptop und im Browser schon geht. Wie sich große offene Modelle auf eigener Server-Hardware rechnen, erklärt der Ratgeber Open-Weight-Modelle 2026: Wann sich eigene KI für kleine Firmen lohnt."
                ]
            },
            {
                "h": "So richtest du Aider und Ollama unter Windows ein",
                "p": [
                    "Ollama setzt Windows 10 22H2 oder neuer voraus, bei NVIDIA-Karten den Treiber 551.61 oder neuer, Administratorrechte brauchst du nicht. Installier es in der PowerShell mit winget install --id Ollama.Ollama -e oder mit dem Installer von ollama.com und prüf mit ollama --version, ob es läuft. Dann lädst du ein Modell, zum Beispiel mit ollama pull qwen2.5-coder:14b.",
                    "Aider holst du dir mit dem offiziellen Installationsskript: powershell -ExecutionPolicy ByPass -c \"irm https://aider.chat/install.ps1 | iex\". Danach wechselst du in deinen Projektordner, der ein Git-Repository sein sollte, und startest mit aider --model ollama_chat/qwen2.5-coder:14b. Ein sauberer Git-Stand vorher ist Pflicht, dann kannst du jede Änderung des Modells in Ruhe prüfen oder verwerfen.",
                    "Unter macOS und Linux installierst du Ollama über ollama.com und Aider mit python -m pip install aider-install und danach aider-install. Aider selbst verlangt Python 3.10 bis 3.12, der Installer besorgt sich aber eine passende Version, ein neueres System-Python stört also nicht.",
                    "Läuft Ollama auf einem anderen Port oder Rechner, zeigst du Aider den Weg mit setx OLLAMA_API_BASE http://127.0.0.1:11434 und der passenden Adresse, danach ein neues Terminal öffnen."
                ]
            },
            {
                "h": "Die drei Stolpersteine, über die fast jeder fällt",
                "p": [
                    "Erstens das Präfix: Aider empfiehlt ollama_chat/ vor dem Modellnamen, nicht ollama/. Klingt nach Kleinkram, macht aber einen Unterschied in der Zusammenarbeit der beiden Programme.",
                    "Zweitens das Kontextfenster. Ollama verwirft stillschweigend alles, was nicht hineinpasst, und bei Karten unter 24 GB liegt der Standard laut Ollama bei 4.000 Tokens. Aider passt das Fenster zwar pro Anfrage an, wenn das Modell trotzdem Dateien „vergisst“, setzt du OLLAMA_CONTEXT_LENGTH als Benutzer-Umgebungsvariable, beendest Ollama im Infobereich und startest es neu. Ob es geklappt hat, zeigt die Spalte CONTEXT im Befehl ollama ps.",
                    "Drittens Modelle, die halb auf der CPU laufen. Zeigt ollama ps in der Spalte PROCESSOR einen CPU-Anteil, ist das Modell zu groß für deine Karte, und Aider wird zäh wie ein Moped mit angezogener Handbremse. Dann nimm eine Nummer kleiner."
                ]
            },
            {
                "h": "Welches Modell passt zu deiner Grafikkarte?",
                "p": [
                    "Die Faustregel: Die Modelldatei muss komplett in den Grafikspeicher passen, und für den Kontext sollten ein paar Gigabyte frei bleiben. Die Größen unten sind die 4-Bit-Standarddownloads aus der Ollama-Bibliothek. Die Zuordnung zu den VRAM-Klassen ist gerechnet, nicht gemessen, eigene Geschwindigkeitstests je Karte stehen noch aus.",
                    "Mit 8 GB nimmst du qwen2.5-coder:7b (4,7 GB) oder qwen3:8b (5,2 GB). Das reicht für Erklärungen und Einzeiler, für echte Änderungen kaum. Ehrlich gesagt lohnt sich der Aufwand unter 8 GB nicht. Mit 12 GB ist qwen2.5-coder:14b (9,0 GB) der beste Einstieg, alternativ qwen3:14b (9,3 GB). Scheitern die Änderungen oft, starte Aider mit --edit-format whole, dann schreibt das Modell ganze Dateien statt Such- und Ersetzblöcke.",
                    "Mit 16 GB passt gpt-oss:20b, das laut Ollama ab 16 GB Speicher läuft, oder devstral:24b, beide rund 14 GB groß. Für den Kontext bleibt da wenig Luft. Mit 24 GB spielst du in der obersten Consumer-Liga: qwen3:32b (20 GB) schafft im Aider-Polyglot-Benchmark 40,0 Prozent, qwen3-coder:30b (19 GB) aktiviert pro Token nur 3,3 Milliarden Parameter und bleibt dadurch flott, und devstral:24b läuft laut Ollama auf einer einzelnen RTX 4090.",
                    "Auf Macs mit Apple-Chip zählt der gemeinsame Arbeitsspeicher statt eines separaten Grafikspeichers. Für Devstral nennt Ollama einen Mac mit 32 GB RAM als ausreichend."
                ]
            },
            {
                "h": "Wo lokale Modelle gegen die Cloud verlieren",
                "p": [
                    "Aider testet Modelle mit einem eigenen Benchmark aus 225 Programmieraufgaben in sechs Sprachen, das Leaderboard wurde zuletzt am 20. November 2025 aktualisiert. Die Lücke ist deutlich: gpt-5 (high) aus der Cloud löst 88,0 Prozent, DeepSeek R1 (0528) mit offenen Gewichten auf Server-Hardware 71,4 Prozent, Qwen3 235B A22B 59,6 Prozent. Auf einer einzelnen 24-GB-Karte schafft Qwen3 32B 40,0 Prozent, Qwen2.5-Coder 32B Instruct nur 16,4 Prozent.",
                    "Im Alltag merkst du das an drei Stellen. Kleine Modelle liefern öfter kaputte Änderungsblöcke, Aider versucht es dann erneut, das kostet Zeit. Mit kleinem Kontext sieht das Modell nur die Dateien, die du gezielt mit /add hinzufügst, große Codebasen überfordern es. Und Aider ist ein Pair-Programmer, kein autonomer Agent: Du gibst die Richtung vor, er plant nicht selbst über zwanzig Dateien hinweg.",
                    "Auch die Rechnung ist nicht automatisch günstiger. Wer keine starke Grafikkarte hat, zahlt für eine 24-GB-Karte mehr als für viele Monate Cloud-Abo. Lokal ist die richtige Wahl, wenn Code das Haus nicht verlassen darf, nicht wenn maximale Qualität zählt."
                ]
            },
            {
                "h": "Das Datenschutz-Argument für deutsche Firmen",
                "p": [
                    "Hier liegt der eigentliche Vorteil. Sobald Quellcode an einen Cloud-Anbieter geht, stellen sich Fragen, die bei einem lokalen Modell schlicht wegfallen. Enthält der Code personenbezogene Daten, etwa in Testdaten, Logs oder Konfigurationen, braucht es mit dem Anbieter einen Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Bei US-Anbietern kommt die Prüfung des Drittlandtransfers nach Art. 44 ff. DSGVO dazu. Läuft das Modell auf deinem Rechner, gibt es für das Modell keinen externen Verarbeiter.",
                    "Dazu kommen Geschäftsgeheimnisse. Nach § 2 Nr. 1 b GeschGehG ist eine Information nur geschützt, wenn sie durch angemessene Geheimhaltungsmaßnahmen gesichert ist, und die Weitergabe an Dritte muss dazu passen. Viele Kundenverträge und NDAs verbieten die Weitergabe an Dritte ausdrücklich, KI-Dienste eingeschlossen. Mit Aider und Ollama verlässt der Code das Unternehmen nicht.",
                    "Bevor du gegenüber deiner Datenschutzbeauftragten „komplett lokal“ sagst, prüf zwei Schalter. Aider-Analytics sind Opt-in und enthalten laut Aider nie Code oder Chats, dauerhaft abschalten kannst du sie mit aider --analytics-disable. Und Ollama-Modelle mit dem Tag cloud laufen auf Servern von Ollama, die Ollama-FAQ beschreibt einen Nur-lokal-Modus, der diese Cloud-Funktionen abschaltet. Ollama selbst lauscht standardmäßig nur auf 127.0.0.1:11434 und ist aus dem Netzwerk nicht erreichbar, solange du OLLAMA_HOST nicht änderst.",
                    "Das ist keine Rechtsberatung. Ob und welche Pflichten in deinem Fall greifen, klärst du mit deiner Datenschutzbeauftragten oder Rechtsabteilung. Die allgemeine Prüfliste für KI im Unternehmen steht im Ratgeber KI-Tools und Datenschutz: die DSGVO-Checkliste für den Einsatz im Unternehmen."
                ]
            },
            {
                "h": "Wie aktuell ist Aider noch?",
                "p": [
                    "Ehrliche Antwort: Aider funktioniert, wird aber derzeit kaum weiterentwickelt. Das letzte Release auf PyPI ist Version 0.86.2 vom 12. Februar 2026, der letzte Push im GitHub-Repository war im Mai 2026. Für dein Setup heißt das: Was heute läuft, läuft auch morgen, auf neue Funktionen solltest du aber nicht warten. Wie ein alter Drehmomentschlüssel, der zuverlässig zieht, für den es aber keine neuen Aufsätze mehr gibt.",
                    "Aider steht unter der Apache-2.0-Lizenz und stammt von Paul Gauthier und der Community. Wenn dir die Ruhe im Repository Sorgen macht, schau dir die anderen offenen Terminal-Agenten an: OpenCode (MIT-Lizenz) arbeitet mit vielen Anbietern, Goose (Apache 2.0) unterstützt laut eigener Doku mehr als 15 Provider, darunter Ollama. Mehr dazu im Ratgeber Cursor-Alternative kostenlos: Editoren, Open Source und Terminal-Agenten."
                ]
            }
        ],
        "faq": [
            [
                "Ist Aider mit Ollama DSGVO-konform?",
                "Für das KI-Modell selbst fallen Auftragsverarbeitung und Drittlandtransfer weg, weil der Code deinen Rechner nicht verlässt. Die übrigen Pflichten deines Unternehmens bleiben bestehen. Schalte die Aider-Analytics ab und verzichte auf Cloud-Modelle von Ollama. Das ist keine Rechtsberatung."
            ],
            [
                "Welche Grafikkarte brauche ich für Aider mit Ollama?",
                "Sinnvoll wird es ab 12 GB Grafikspeicher, dort ist qwen2.5-coder:14b der beste Einstieg. Mit 24 GB laufen Modelle wie qwen3:32b, das im Aider-Benchmark 40,0 Prozent erreicht."
            ],
            [
                "Kostet Aider mit Ollama etwas?",
                "Aider und Ollama sind kostenlos und quelloffen. Es fallen nur Hardware- und Stromkosten an, keine Abo- oder Token-Gebühren."
            ],
            [
                "Ist ein lokales Modell so gut wie Claude Code?",
                "Nein. Im Aider-Benchmark kommt gpt-5 (high) auf 88,0 Prozent, mehr als doppelt so viel wie das beste lokale 32B-Modell mit 40,0 Prozent."
            ],
            [
                "Kann mein Team einen gemeinsamen Ollama-Server nutzen?",
                "Ja. Du gibst Ollama auf einem Rechner mit starker Grafikkarte über OLLAMA_HOST im Firmennetz frei und lässt OLLAMA_API_BASE bei den Entwicklern darauf zeigen. Mach den Server nur intern erreichbar und verlass dich nicht auf eine eingebaute Anmeldung."
            ]
        ],
        "quellen": [
            {
                "titel": "Aider: Ollama einrichten",
                "url": "https://aider.chat/docs/llms/ollama.html"
            },
            {
                "titel": "Aider: Installation",
                "url": "https://aider.chat/docs/install.html"
            },
            {
                "titel": "Aider: LLM-Leaderboard",
                "url": "https://aider.chat/docs/leaderboards/"
            },
            {
                "titel": "PyPI: aider-chat (Releases)",
                "url": "https://pypi.org/project/aider-chat/"
            },
            {
                "titel": "Ollama: Installation unter Windows",
                "url": "https://docs.ollama.com/windows"
            },
            {
                "titel": "Ollama: Kontextlänge",
                "url": "https://docs.ollama.com/context-length"
            },
            {
                "titel": "Ollama: FAQ (Netzwerk, Nur-lokal-Modus)",
                "url": "https://docs.ollama.com/faq"
            },
            {
                "titel": "Geschäftsgeheimnisgesetz § 2",
                "url": "https://www.gesetze-im-internet.de/geschgehg/__2.html"
            }
        ],
        "geprueft": "2026-11-03"
    },
    {
        "slug": "cursor-alternative-kostenlos",
        "seoTitle": "Cursor-Alternative kostenlos: Editoren und Open Source",
        "title": "Cursor-Alternative kostenlos: Editoren, Open Source und Terminal-Agenten",
        "description": "Cursor hat 2026 seine Tarife umgebaut, Plus enthält nur noch Grok-Modelle. Welche kostenlosen und Open-Source-Alternativen es gibt und wann ein Terminal-Agent die bessere Wahl ist.",
        "jean": "Cursor hat die Preisliste neu lackiert. Bevor du für Claude im Editor jetzt das Premium-Paket kaufst, schau, was in der Werkzeugkiste nebenan gratis rumliegt.",
        "minutes": 8,
        "sections": [
            {
                "h": "Welche Cursor-Alternative ist kostenlos?",
                "p": [
                    "Für die meisten ist VS Code mit GitHub Copilot Free die beste kostenlose Cursor-Alternative, weil du im gewohnten Editor bleibst und Vervollständigung, Chat und Agent-Modus bekommst. Willst du Open Source, nimmst du Zed oder VS Code mit Cline oder Kilo Code und einem eigenen oder lokalen Modell.",
                    "Warum die Frage gerade so oft gestellt wird: Cursor hat seine Tarife 2026 umgebaut. Neue Kunden wählen nur noch zwischen Free, Plus, Premium, Super und Ultra, und der günstigste Bezahlplan Plus enthält nur noch Grok-Modelle. Wer Cursor wegen Claude oder GPT nutzt, landet damit mindestens bei Premium.",
                    "Gleichzeitig sind einige der bekanntesten Open-Source-Klone von der Bildfläche verschwunden. Wer vor einem Jahr eine Liste mit Alternativen gespeichert hat, sollte sie besser nicht mehr blind abarbeiten."
                ]
            },
            {
                "h": "Was kostet Cursor seit dem Umbau?",
                "p": [
                    "Free kostet 0 $ und bietet Agent und Chat mit begrenzter Nutzung, aber keine Fremdmodelle. Plus kostet 8 $ im Monat oder 80 $ im Jahr, ca. 8,52 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026). Dafür gibt es ein Grundkontingent, nur Grok-Modelle und keine Cloud Agents.",
                    "Premium kostet 30 $ im Monat oder 300 $ im Jahr, ca. 31,93 € inkl. 19 % MwSt. Drin sind das vierfache Plus-Kontingent, Cloud Agents, Bugbot und Fremdmodelle zum API-Listenpreis. Super liegt bei 100 $ (ca. 106,45 €) mit dem 15-fachen Plus-Kontingent, Ultra bei 200 $ (ca. 212,90 €) mit dem 50-fachen. Cursor nennt alle Preise ausdrücklich ohne Steuern.",
                    "Die alten Pläne Hobby, Pro und Pro+ laufen laut Cursor-Dokumentation für bestehende Kunden als Altverträge weiter. Wer also noch Pro hat, muss nicht sofort handeln. Neukunden kommen an die alten Pläne aber nicht mehr ran, wie bei einer Stammkneipe, die nach dem Umbau nur noch alten Gästen den Deckel anschreibt."
                ]
            },
            {
                "h": "Die drei kostenlosen Wege, die wirklich funktionieren",
                "p": [
                    "VS Code mit GitHub Copilot Free ist am nächsten an Cursor, ohne Umgewöhnung. Installier VS Code unter Windows in der PowerShell mit winget install -e --id Microsoft.VisualStudioCode und such dann in der Erweiterungsansicht nach GitHub Copilot. Copilot Free bietet 2.000 Vervollständigungen im Monat, begrenzte Chat- und Agenten-Nutzung und Einstiegsmodelle wie Haiku 4.5 und GPT-5 mini. Die Copilot CLI ist ebenfalls enthalten. Wer täglich größere Umbauten vom Agenten machen lässt, ist allerdings schnell am Limit.",
                    "VS Code mit Cline oder Kilo Code ist der Weg für alle, die selbst bestimmen wollen, welches Modell arbeitet. Beide Erweiterungen sind Open Source und kosten nichts, du zahlst nur den Modellanbieter pro Token oder gar nichts, wenn das Modell lokal läuft. Kilo Code verspricht Anbieterpreise ohne Aufschlag, beim Kauf von Guthaben fällt für Privatnutzer aber eine Bearbeitungsgebühr von 5 Prozent an. Cline läuft neben VS Code auch in JetBrains-IDEs, in Cursor selbst und in Antigravity.",
                    "Zed ist ein eigener, sehr schneller Editor unter GPL-3.0 und läuft inzwischen auch unter Windows. Der Personal-Plan kostet nichts, solange du eigene API-Schlüssel oder externe Agenten anbindest. Unbegrenzte Edit-Vorhersagen gibt es erst mit Pro für 10 $ im Monat, ca. 10,64 € inkl. 19 % MwSt."
                ]
            },
            {
                "h": "Open Source statt Cursor: was 2026 noch übrig ist",
                "p": [
                    "Die schlechte Nachricht zuerst: Die naheliegenden Cursor-Klone sind 2026 verschwunden. Der VS-Code-Fork Void ist seit dem 2. Juni 2026 archiviert, das Repository von Roo Code seit Mai 2026. Continue wird nicht mehr gepflegt und ist nur noch lesbar. Der Code bleibt zwar verfügbar, Updates gibt es aber keine mehr, und ein Editor ohne Sicherheitsupdates ist wie ein Auto ohne TÜV-Plakette: fährt, aber du willst nicht derjenige sein, der es erklärt.",
                    "Was bleibt, ist solide: Zed unter GPL-3.0 (teils Apache 2.0), Cline unter Apache 2.0 und Kilo Code unter MIT, dazu VS Code selbst, dessen Kern Code-OSS unter MIT steht. GitHub Copilot ist dagegen proprietär, genau wie Cursor, Windsurf, Google Antigravity und Claude Code.",
                    "Ein Punkt wird oft übersehen: Offen ist meist nur das Werkzeug, nicht das Modell. Schickt Cline deinen Code an einen Cloud-Anbieter, landet er trotzdem dort. Wirklich unabhängig bist du erst mit einem lokalen Modell, wie das praktisch aussieht, steht im Ratgeber Aider mit Ollama: lokal programmieren, ohne dass Code das Haus verlässt."
                ]
            },
            {
                "h": "Terminal-Agenten: die Alternative, die gar kein Editor ist",
                "p": [
                    "Nicht jeder braucht einen KI-Editor. Terminal-Agenten laufen neben jedem Editor, du gibst eine Aufgabe ein, der Agent liest das Projekt, ändert Dateien und führt Befehle aus. Du schreibst weiter in VS Code, Zed oder sogar Notepad++, der Agent arbeitet im Fenster daneben.",
                    "Kostenlos und Open Source sind Aider (Apache 2.0), OpenCode (MIT) und Goose (Apache 2.0, heute bei der Agentic AI Foundation der Linux Foundation). Alle drei arbeiten mit vielen Modellanbietern, Aider und Goose auch mit lokalen Modellen über Ollama. Du zahlst dann nur das Modell, das du anbindest.",
                    "Bei den großen Anbietern gibt es keinen komplett kostenlosen Terminal-Agenten ohne Haken. Die Antigravity CLI von Google hat einen Gratis-Plan mit wöchentlichen Limits, ist aber nicht Open Source. Die Gemini CLI nimmt seit dem 18. Juni 2026 keine privaten Google-Konten mehr an, nur noch API-Schlüssel und Firmenlizenzen, mehr dazu im Ratgeber Gemini CLI eingestellt? So steigst du auf die Antigravity CLI um. Die Codex CLI von OpenAI ist Open Source unter Apache 2.0, aber erst ab ChatGPT Plus enthalten.",
                    "Claude Code ist ebenfalls kein Editor, sondern ein Agent für Terminal und IDE, und kostenlos ist es nicht: Es setzt mindestens Claude Pro voraus, 20 $ im Monat (ca. 21,29 € inkl. 19 % MwSt.), bei Jahreszahlung 17 $ im Monat."
                ]
            },
            {
                "h": "Welche Alternative passt zu dir?",
                "p": [
                    "Du willst einfach weiterarbeiten wie in Cursor, ohne Geld auszugeben: VS Code mit Copilot Free. Du willst Open Source und Datenschutz: VS Code mit Cline oder Kilo Code und einem lokalen Modell. Du willst einen schnellen Editor und hast eigene API-Schlüssel: Zed.",
                    "Du arbeitest lieber per Anweisung als per Tab-Taste: ein Terminal-Agent. Gratis und offen ist Aider oder OpenCode, mit Budget sind Claude Code oder die Codex CLI die stärkeren Werkzeuge. Für viel Agenten-Arbeit im Editor mit Budget bleibt Copilot Pro für 10 $ im Monat eine günstige Option.",
                    "Bei Windsurf bin ich vorsichtig: Die Preisseite leitet inzwischen auf devin.ai weiter, welche Windsurf-Tarife aktuell gelten, ist nicht offiziell bestätigt. Bevor du dort ein Abo abschließt, prüf den Checkout genau.",
                    "Deine Cursor-Regeln kannst du übrigens teilweise mitnehmen. Viele Agenten lesen eine AGENTS.md im Projekt, Claude Code tut das seit Version 2.1.277, wenn keine CLAUDE.md da ist. Ein Umzug kostet dich also eher einen Nachmittag als eine Woche."
                ]
            }
        ],
        "faq": [
            [
                "Gibt es eine kostenlose Alternative zu Cursor?",
                "Ja. VS Code mit GitHub Copilot Free kostet nichts und enthält 2.000 Vervollständigungen im Monat sowie begrenzte Chat- und Agenten-Nutzung. Zed ist mit eigenem API-Schlüssel kostenlos, Cline und Kilo Code sind Open Source."
            ],
            [
                "Welche Cursor-Alternative ist Open Source?",
                "Zed, Cline und Kilo Code, dazu VS Code als Basis. Im Terminal kommen Aider, OpenCode und Goose dazu. Void und Roo Code waren ebenfalls offen, sind aber seit 2026 archiviert."
            ],
            [
                "Was kostet Cursor in Euro?",
                "Cursor rechnet in US-Dollar ohne Steuern ab. Plus kostet 8 $, Premium 30 $ im Monat. Das sind ca. 8,52 € und 31,93 € inkl. 19 % MwSt. (EZB-Kurs 1,1179 vom 3.11.2026)."
            ],
            [
                "Gibt es Cursor Pro noch?",
                "Nur als Altvertrag. Laut Cursor-Dokumentation laufen Hobby, Pro und Pro+ für bestehende Kunden weiter. Neue Kunden wählen zwischen Free, Plus, Premium, Super und Ultra."
            ],
            [
                "Ist ein Terminal-Agent eine echte Cursor-Alternative?",
                "Ja, wenn du lieber Aufgaben beschreibst als Code vervollständigen lässt. Agenten wie Aider, OpenCode oder Claude Code laufen neben jedem Editor. Die Tab-Vervollständigung von Cursor ersetzen sie aber nicht."
            ]
        ],
        "quellen": [
            {
                "titel": "Cursor: Pricing in der Dokumentation",
                "url": "https://cursor.com/docs/account/pricing"
            },
            {
                "titel": "Cursor: Pricing",
                "url": "https://cursor.com/pricing"
            },
            {
                "titel": "GitHub Copilot: Pläne",
                "url": "https://github.com/features/copilot/plans"
            },
            {
                "titel": "Zed: Pricing",
                "url": "https://zed.dev/pricing"
            },
            {
                "titel": "Cline auf GitHub",
                "url": "https://github.com/cline/cline"
            },
            {
                "titel": "Kilo Code: Pricing",
                "url": "https://kilo.ai/pricing"
            },
            {
                "titel": "Claude: Pricing",
                "url": "https://claude.com/pricing"
            },
            {
                "titel": "Void auf GitHub (archiviert)",
                "url": "https://github.com/voideditor/void"
            }
        ],
        "geprueft": "2026-11-03"
    }
]
