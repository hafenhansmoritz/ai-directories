# Content-Plan: Prompts, Chat-Verlauf und Anleitungen zu den getesteten Tools

Stand 2026-11-01. Suchvolumen: Semrush, Datenbank DE, monatlich. KD = Keyword Difficulty (0 bis 100). Keine geschätzten Zahlen, nur abgefragte Werte.

## Grundlage

Als "prominent getestet" gelten die Tools aus unseren 17 Vergleichen unter /tool-vergleiche und den Vergleichs-Ratgebern (Chatbots, Bildgeneratoren, Video-Tools, KI-Browser). Alle haben einen Steckbrief unter /tools/[slug].

Bestand: 78 Prompts in lib/prompts.js (Feld `tools` verknüpft sie schon mit den Steckbriefen), 103 übersetzte CC0-Prompts im Archiv, 9 Tutorials, 18 Ratgeber.

Verlinkungsregel für jedes neue Stück:
1. Steckbrief `/tools/[slug]` jedes genannten Tools.
2. Passender Vergleich unter `/tool-vergleiche/[slug]`, falls vorhanden.
3. Mindestens drei passende Prompt-Seiten `/prompts/[slug]` und die Kategorieseite.
4. Passende KI-Test-Kategorie unter `/ki-test/[kategorie]`.
5. Externe Links nur über `toolHref(t)` / `toolRel(t)` bzw. `HOST_AFFILIATES`. Stand heute steht in der zentralen Sammlung `db/affiliate-links.json` noch kein bestätigter Link für AIGeddon. Sobald Jean eins aktiviert, tragen alle Seiten automatisch den Partnerlink mit `*` und `rel="sponsored"`.

Prompt-Technik nach der Recherche vom 2026-11-01 (Bericht im Scratchpad): Kontext, Aufgabe, Platzhalter, Ausgabeformat. Beispiele dort, wo das Format zählt. Kein "denk Schritt für Schritt und schreib deine Gedanken auf", keine Großbuchstaben-Befehle. Jeder Prompt bekommt ein Prüfdatum und wird auf mindestens zwei Modellen getestet.

## Cluster A: Prompts pro Tool (neue Route /prompts/tool/[slug])

Technik: neues Feld `fuer` in `lib/prompts.js` (Liste von Tool-Slugs), das angibt, in welches Tool der Prompt eingegeben wird. Das bestehende Feld `tools` bleibt, was es ist: Werkzeuge, mit denen man das Ergebnis umsetzt (Partnerlinks unter "Damit setzt du das Ergebnis um"). Die Seite `/prompts/tool/[slug]` zeigt nur Prompts mit dem Slug in `fuer`, nie nach `tools` gefiltert. Bestehende Prompts bekommen `fuer` nur, wenn sie wirklich für dieses Tool geschrieben oder darin getestet sind (allgemeine Chat-Prompts z. B. für chatgpt, claude, google-gemini, microsoft-copilot nach Test). Dazu 5 bis 10 neue tool-spezifische Prompts je Seite. Steckbrief und Vergleich verlinken zurück ("Prompts für X").

| Prio | Seite | Keyword | Volumen | KD | Neue Prompts |
|---|---|---|---|---|---|
| 1 | ChatGPT-Prompts | chatgpt prompts / chatgpt prompts deutsch | 2.400 / 210 | 24 / 20 | 10 (Projekte, Agent, Bild, Excel, Übersetzen) |
| 1 | Gemini-Prompts | gemini prompts | 390 | 27 | 8 |
| 1 | Suno-Prompts (Songtexte, Stilangaben) | suno prompts | 390 | 22 | 10 |
| 2 | Copilot-Prompts (Word, Excel, Outlook) | copilot prompts | 210 | 38 | 8 |
| 2 | Midjourney-Prompts | midjourney prompts / midjourney prompt | 210 / 140 | 40 / 34 | 10 (Stil, Licht, Seitenverhältnis) |
| 2 | Claude-Prompts | claude prompts | 170 | 22 | 8 (Projekte, Artefakte, lange Dokumente) |
| 3 | NotebookLM-Prompts | notebooklm prompts | 90 | 34 | 6 |
| 3 | Canva Magic Write | canva magic write | 170 | 34 | 6 |
| 4 | Gamma-Prompts | gamma prompts / gamma prompt | 30 / 20 | 0 / 0 | 5 |
| 4 | HeyGen-Prompts | heygen prompts | 30 | 0 | 5 |
| 4 | Perplexity-Prompts | perplexity prompts | 30 | 0 | 5 |
| 4 | ElevenLabs-Prompts | elevenlabs prompts | 20 | 0 | 5 |
| 4 | Leonardo AI-Prompts | leonardo ai prompts | 20 | 0 | 5 |
| 4 | Ideogram-Prompts | ideogram prompts | 20 | 0 | 5 |
| 4 | Runway-Prompts | runway prompts | 20 | 0 | 5 |
| 4 | Kling-Prompts | kling ai prompts | 20 | 0 | 5 |
| 4 | InVideo-Prompts | invideo ai prompts | 20 | 0 | 5 |

KD 0 bei den Long-Tail-Zeilen ist der von Semrush gemeldete Wert (zu wenig Daten für eine Schwierigkeit), keine Schätzung.

Wichtig: Bei Suno, Midjourney, Kling, Runway und ElevenLabs ist ein "Prompt" etwas anderes als im Chat (Stil-Tags, Parameter, Sprechanweisungen). Die Prompts pro Tool basieren deshalb auf der offiziellen Doku des Anbieters, nicht auf Chat-Mustern.

## Cluster B: Chat-Verlauf, Gedächtnis, Projekte (Ratgeber/Tutorials)

| Prio | Stück | Keywords | Volumen | KD |
|---|---|---|---|---|
| 1 | ChatGPT-Verlauf löschen, archivieren, ausschalten (Schritt für Schritt, Datenschutz) | chatgpt verlauf löschen / chatgpt verlauf / chatgpt chatverlauf | 590 / 210 / 30 | 22 / 23 / 0 |
| 1 | Claude Memory: was Claude sich merkt und wie du es steuerst | claude memory | 480 | 34 |
| 2 | ChatGPT-Projekte vs. Claude-Projekte | chatgpt projekte / claude projekte | 210 / 90 | 22 / 16 |
| 2 | Chats exportieren und zu einem anderen Anbieter umziehen (ChatGPT, Claude, Gemini) | chatgpt chats exportieren | 140 | 17 |
| 3 | ChatGPT Memory erklärt | chatgpt memory / chatgpt gedächtnis | 140 / 20 | 45 / 0 |

Jedes Stück verlinkt den DSGVO-Ratgeber (ki-tools-datenschutz-dsgvo), die Steckbriefe von ChatGPT, Claude und Gemini sowie die Prompts "gpt-anweisungen-zu-skill" und "ki-modell-umstellen-testplan". Alle Menüpfade und Funktionen werden vor Veröffentlichung in der offiziellen Hilfe des Anbieters geprüft, mit Prüfdatum.

## Cluster C: Vergleiche mit hohem Volumen und niedriger KD

| Prio | Seite | Volumen | KD | Bestand |
|---|---|---|---|---|
| 1 | /tool-vergleiche/claude-vs-chatgpt | 3.600 | 13 | nur Ratgeber chatgpt-claude-gemini, kein eigener Vergleich |
| 1 | /tool-vergleiche/gemini-vs-chatgpt | 2.900 | 46 | wie oben |
| 2 | /tool-vergleiche/perplexity-vs-chatgpt | 1.900 | 51 | claude-vs-perplexity existiert |

Jeder Vergleich bekommt einen Prompt-Block "Teste es selbst" mit denselben drei Prompts für beide Tools und einen Link auf den KI-Test.

## Cluster D: Anleitungen zu getesteten Tools (Steckbrief-Ausbau)

Statt neuer Seiten: Abschnitt "So startest du" plus "Prompts für X" in den vorhandenen Steckbriefen, damit das Volumen auf die bestehende URL geht.

| Prio | Tool | Keywords | Volumen | KD | Getestet in |
|---|---|---|---|---|---|
| 1 | Gamma | gamma präsentation / gamma ki | 2.900 / 1.900 | 52 / 46 | gamma-vs-canva |
| 1 | Descript | descript | 6.600 | 30 | descript-vs-pictory, otter-ai-vs-descript |
| 2 | Runway | runway ki | 1.300 | 38 | runway-vs-invideo-ai |
| 2 | Writesonic | writesonic | 1.300 | 59 | rytr-vs-writesonic, surfer-seo-vs-writesonic |
| 2 | Surfer SEO | surfer seo | 1.000 | 33 | semrush-vs-se-ranking-vs-surfer-seo |
| 2 | Wordtune | wordtune | 720 | 20 | wordtune-vs-rytr |
| 2 | Leonardo AI | leonardo ai deutsch | 590 | 46 | midjourney-vs-leonardo-ai |
| 3 | Make | make ki | 480 | 23 | make-vs-zapier-vs-n8n |
| 3 | ElevenLabs | elevenlabs deutsch | 480 | 43 | elevenlabs-vs-murf |
| 3 | n8n | n8n tutorial / n8n ki agent | 390 / 70 | 52 / 43 | make-vs-zapier-vs-n8n |
| 3 | Rytr | rytr | 390 | 17 | rytr-vs-writesonic, wordtune-vs-rytr |
| 3 | HeyGen | heygen deutsch | 140 | 32 | synthesia-vs-heygen-vs-invideo-vs-pictory |
| später | Otter.ai | otter ai | 4.400 | 64 | otter-ai-vs-descript (KD hoch) |

## Cluster E: Anwendungsfall-Hubs auf vorhandene Prompts

| Prio | Seite | Keyword | Volumen | KD | Vorhandene Prompts |
|---|---|---|---|---|---|
| 1 | ChatGPT für die Bewerbung | chatgpt bewerbung / chatgpt lebenslauf | 880 / 320 | 32 / 26 | anschreiben-bewerbung, lebenslauf-optimieren, vorstellungsgespraech-training, gehaltsverhandlung, arbeitszeugnis-entschluesseln |
| 1 | Mit ChatGPT übersetzen | chatgpt übersetzen | 1.000 | 35 | uebersetzen-lokalisieren, Vergleich mit DeepL-Steckbrief |
| 1 | Prompt-Vorlagen (Hub) | prompt vorlagen | 140 | 7 | gesamte Bibliothek |
| 2 | ChatGPT und Excel | chatgpt excel | 320 | 35 | excel-formel, daten-bereinigen, sql-abfrage |
| 2 | ChatGPT Agent erklärt | chatgpt agent | 2.400 | 52 | ki-agent-auftrag, Tutorial ki-agenten-verstehen |
| 2 | SEO-Prompts für ChatGPT | chatgpt seo prompts | 140 | 20 | Kategorie seo (Semrush, SE Ranking, Surfer verlinken) |
| 3 | GPTs erstellen | gpts erstellen / chatgpt custom gpt | 110 / 90 | 20 / 50 | Tutorial eigenen-ki-assistenten-bauen, gpt-anweisungen-zu-skill |
| 3 | Prompt Engineering (Pillar auf vorhandenes Tutorial) | prompt engineering / deutsch | 5.400 / 90 | 49 / 35 | Tutorial prompt-engineering-in-15-minuten, Prompt-Check |

Nicht verfolgen: "prompt generator" (3.600, KD 65, die Suche will ein Tool, das wir mit dem Prompt-Baukasten nur teilweise abdecken; später prüfen), "suno ai" (74.000) und "kling ai" (40.500) und "notebooklm" (110.000) als Hauptkeyword (Navigationssuche nach dem Anbieter).

## Reihenfolge (16 Wochen ab 2026-11-02, höchstens 3 Stücke pro Woche, je Woche ein „fällig ab“-Datum in docs/TASKS.md)

| Woche | Stücke |
|---|---|
| 1 | Route /prompts/tool/[slug] bauen; ChatGPT-Prompts; Claude vs. ChatGPT |
| 2 | ChatGPT-Verlauf löschen; Gemini vs. ChatGPT; Gemini-Prompts |
| 3 | Claude Memory; Suno-Prompts; ChatGPT für die Bewerbung |
| 4 | Gamma-Steckbrief-Ausbau; Mit ChatGPT übersetzen; Prompt-Vorlagen-Hub |
| 5 | Descript-Steckbrief-Ausbau; Copilot-Prompts; ChatGPT- vs. Claude-Projekte |
| 6 | Midjourney-Prompts; Perplexity vs. ChatGPT; Chats exportieren und umziehen |
| 7 | Claude-Prompts; ChatGPT und Excel; Runway-Ausbau |
| 8 | ChatGPT Agent erklärt; Writesonic-Ausbau; Surfer-Ausbau |
| 9 | Wordtune-Ausbau; Leonardo-Ausbau; ChatGPT Memory |
| 10 | NotebookLM-Prompts; Canva Magic Write; SEO-Prompts für ChatGPT |
| 11 | Rytr-Ausbau; Make-Ausbau; GPTs erstellen |
| 12 | n8n-Ausbau; ElevenLabs-Ausbau; HeyGen-Ausbau |
| 13 | Prompt-Engineering-Pillar; Gamma-Prompts |
| 14 | HeyGen-Prompts; Perplexity-Prompts; ElevenLabs-Prompts |
| 15 | Leonardo-AI-Prompts; Ideogram-Prompts; Runway-Prompts |
| 16 | Kling-Prompts; InVideo-Prompts |

Summe: 17 Prompt-Tool-Seiten (8 Haupt-Tools mit 66 neuen Prompts, 9 Long-Tail-Tools mit je 5, zusammen 111 neue Prompts), 5 Chat-Verlauf-Stücke, 3 Vergleiche, 12 Steckbrief-Ausbauten, 8 Anwendungsfall-Hubs.

## Abhängigkeiten und offene Punkte

- Partnerlinks: in `db/affiliate-links.json` ist noch kein bestätigter Link für AIGeddon. Die Verlinkung läuft trotzdem über die Helfer und schaltet automatisch um.
- Vergleiche brauchen eigene Praxistests (gleiche Prompts in beiden Tools, Datum, Ergebnis). Keine erfundenen Testwerte.
- Menüpfade und Funktionsumfang zu Verlauf, Memory, Projekten und Export ändern sich häufig: vor jeder Veröffentlichung in der offiziellen Hilfe prüfen.
- Messung relativ zur Veröffentlichung: Jede Sitzung, die ein Stück veröffentlicht, trägt in `docs/TASKS.md` im automatischen Abschnitt zwei Mess-Aufgaben ein (Veröffentlichung plus 4 Wochen und plus 8 Wochen), jeweils mit „fällig ab“ und „braucht Datei docs/gsc/JJJJ-MM-TT.csv“. Search Console ist nur mit Jeans Login zugänglich (`docs/FUER-JEAN.md`, Abschnitt 2): Jean legt zum Fälligkeitsdatum den Leistungsbericht als CSV unter diesem Pfad ab. Sobald Datum erreicht und Datei vorhanden ist, nimmt die nächste Sitzung die Aufgabe automatisch (Titel, Beschreibung und Inhalt anhand der Daten nachschärfen). Ohne Datei bleibt sie stehen, Zahlen werden nie geschätzt.
