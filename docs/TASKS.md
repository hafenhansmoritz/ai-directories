# Aufgaben-Backlog AIGeddon

Diese Datei steuert die automatischen Arbeitssitzungen. Jede Sitzung liest sie, nimmt **die erste offene Aufgabe von oben**, die nicht auf Jean wartet, erledigt sie vollständig und hakt sie ab.

- [ ] **Content-Plan KI-Comics, Hörspiel, Shorts, Verteilung** abarbeiten: `docs/CONTENT-PLAN-KI-COMICS-AUDIO.md` (Welle 0: Partnerprogramme anmelden, dann #1 Nano Banana Pro)

## Regeln für jede automatische Sitzung

1. Branch frisch von `main`: `git fetch origin main && git checkout -B <Sitzungs-Branch> origin/main`.
2. **Genau eine** Aufgabe aus „Offen“ nehmen, oben beginnen. Aufgaben mit „wartet auf Jean“ überspringen.
3. Fakten nur von offiziellen Seiten der Anbieter, mit Quelle. Nichts erfinden; unbekannt bleibt `null` bzw. „keine Angabe“.
4. Sperren (Status „nicht eintragbar“) und `free_dofollow: false` nur setzen, wenn die Quelle selbst geprüft wurde.
5. Vor dem Commit: `npx next build` ohne Fehler, keine unsichtbaren Unicode-Zeichen (U+200B–U+200F, U+2060–U+2064, U+FEFF, U+00AD, U+202A–U+202E) in geänderten Dateien.
6. Partnerlinks immer mit `rel="sponsored"` und *-Kennzeichnung (passiert automatisch über `db/affiliate-links.json` und `db/partners.json` → `lib/partners.js`). Nach jeder Änderung am Register `npm run partners` laufen lassen und `docs/PARTNERLINKS.md` mit committen.
7. PR mit Vorlage aus `PULL_REQUEST_TEMPLATE`, mergen, GitHub-Pages-Lauf abwarten, Live-Seite prüfen.
8. Hier die Aufgabe nach „Erledigt“ verschieben (Datum, PR-Nummer, ein Satz Ergebnis) und neu entdeckte Aufgaben unten in „Offen“ ergänzen.
9. Keine Registrierungen, Käufe, E-Mails oder Posts im Namen von Jean.
10. Aufgaben mit „fällig ab JJJJ-MM-TT“ überspringen, solange das Datum in der Zukunft liegt. Aufgaben mit „braucht Datei PFAD“ überspringen, solange die Datei im Repo fehlt. Solche Aufgaben stehen nach Fälligkeit sortiert.

## Offen

### Wartet auf Jean
- [ ] **Impressum und Datenschutz**: Name, ladungsfähige Anschrift, E-Mail fehlen. Danach Seiten `/impressum` und `/datenschutz` bauen und im Footer verlinken. *wartet auf Jean*
- [ ] **Geschäfts-E-Mail** setzen (`NEXT_PUBLIC_CONTACT_EMAIL` im Pages-Workflow), dann erscheinen die Anfrage-Buttons auf `/werben`. *wartet auf Jean*
- [ ] **PromptGott-Newsletter-URL** setzen (`NEXT_PUBLIC_NEWSLETTER_URL`); gefunden nur prmoptgenie.substack.com über dev.to/promptgott, nicht abrufbar. Empfehlung beehiiv. *wartet auf Jean*
- [ ] **Videoliste AIGeddon** (Titel, URL, Thema) für `db/videos.json` und `/case-studies`. *wartet auf Jean*
- [ ] **Domains** aigeddon.de und promptgott.de registrieren (Plan: `docs/ROADMAP-100.md`, Block 1). *wartet auf Jean*
- [ ] **Partnerlinks und eigene Rabattcodes** eintragen in `db/partners.json` (Übersicht `docs/PARTNERLINKS.md`, Format in `docs/REGISTRIERUNG.md`, Abschnitt 4). *wartet auf Jean*
- [ ] **Domain aigeddon.de** als Custom Domain für GitHub Pages einrichten (CNAME, `NEXT_PUBLIC_SITE_URL`, `BASE_PATH` leer). *wartet auf Jean*
- [ ] **Netlify-Projekt löschen** (alte Kopie). *wartet auf Jean*

### Automatisch abzuarbeiten (Reihenfolge = Priorität)
- Content-Plan Tool-Prompts (`docs/CONTENT-PLAN-TOOL-PROMPTS.md`): eine Woche pro Sitzung, von oben. Verlinkungsregel aus dem Plan beachten. Höchstens eine Woche pro Kalenderwoche, gesteuert über „fällig ab“. Nach jeder Veröffentlichung zwei Mess-Aufgaben direkt unter dieser Liste eintragen, nach Fälligkeit sortiert, Format: `- [ ] **Messung <Stück>** (fällig ab JJJJ-MM-TT, braucht Datei docs/gsc/JJJJ-MM-TT.csv): Ziel-Keyword, URL`.
  - [ ] **Messung Prompt-Seiten je Tool** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): „<tool> prompts“ laut Content-Plan; /prompts/tool/google-gemini, /prompts/tool/claude, /prompts/tool/microsoft-copilot, /prompts/tool/notebooklm, /prompts/tool/perplexity, /prompts/tool/suno, /prompts/tool/midjourney, /prompts/tool/elevenlabs, /prompts/tool/leonardo-ai, /prompts/tool/ideogram, /prompts/tool/runway, /prompts/tool/kling-ai, /prompts/tool/invideo-ai, /prompts/tool/heygen, /prompts/tool/gamma, /prompts/tool/canva
  - [ ] **Messung Chat-Verlauf-Ratgeber** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): chatgpt verlauf löschen, claude memory, chatgpt projekte, chatgpt chats exportieren, chatgpt memory; /ratgeber/chatgpt-verlauf-loeschen, /ratgeber/claude-memory, /ratgeber/chatgpt-projekte-vs-claude-projekte, /ratgeber/chats-exportieren-umziehen, /ratgeber/chatgpt-memory
  - [ ] **Messung Vergleiche Gemini/Perplexity vs. ChatGPT** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): gemini vs chatgpt, perplexity vs chatgpt; /tool-vergleiche/gemini-vs-chatgpt, /tool-vergleiche/perplexity-vs-chatgpt
  - [ ] **Messung Steckbrief-Ausbau „So startest du“** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): Keywords Cluster D laut Content-Plan; /tools/gamma, /tools/descript, /tools/runway, /tools/writesonic, /tools/surfer-seo, /tools/wordtune, /tools/leonardo-ai, /tools/make, /tools/elevenlabs, /tools/n8n, /tools/rytr, /tools/heygen
  - [ ] **Messung Anwendungsfall-Hubs** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): Keywords Cluster E laut Content-Plan; /ratgeber/chatgpt-bewerbung, /ratgeber/mit-chatgpt-uebersetzen, /ratgeber/prompt-vorlagen, /ratgeber/chatgpt-excel, /ratgeber/chatgpt-agent-erklaert, /ratgeber/seo-prompts-chatgpt, /ratgeber/gpts-erstellen, /ratgeber/prompt-engineering
  - [ ] **Messung Prompt-Seiten je Tool** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): „<tool> prompts“ laut Content-Plan; /prompts/tool/google-gemini, /prompts/tool/claude, /prompts/tool/microsoft-copilot, /prompts/tool/notebooklm, /prompts/tool/perplexity, /prompts/tool/suno, /prompts/tool/midjourney, /prompts/tool/elevenlabs, /prompts/tool/leonardo-ai, /prompts/tool/ideogram, /prompts/tool/runway, /prompts/tool/kling-ai, /prompts/tool/invideo-ai, /prompts/tool/heygen, /prompts/tool/gamma, /prompts/tool/canva
  - [ ] **Messung Chat-Verlauf-Ratgeber** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): chatgpt verlauf löschen, claude memory, chatgpt projekte, chatgpt chats exportieren, chatgpt memory; /ratgeber/chatgpt-verlauf-loeschen, /ratgeber/claude-memory, /ratgeber/chatgpt-projekte-vs-claude-projekte, /ratgeber/chats-exportieren-umziehen, /ratgeber/chatgpt-memory
  - [ ] **Messung Vergleiche Gemini/Perplexity vs. ChatGPT** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): gemini vs chatgpt, perplexity vs chatgpt; /tool-vergleiche/gemini-vs-chatgpt, /tool-vergleiche/perplexity-vs-chatgpt
  - [ ] **Messung Steckbrief-Ausbau „So startest du“** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): Keywords Cluster D laut Content-Plan; /tools/gamma, /tools/descript, /tools/runway, /tools/writesonic, /tools/surfer-seo, /tools/wordtune, /tools/leonardo-ai, /tools/make, /tools/elevenlabs, /tools/n8n, /tools/rytr, /tools/heygen
  - [ ] **Messung Anwendungsfall-Hubs** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): Keywords Cluster E laut Content-Plan; /ratgeber/chatgpt-bewerbung, /ratgeber/mit-chatgpt-uebersetzen, /ratgeber/prompt-vorlagen, /ratgeber/chatgpt-excel, /ratgeber/chatgpt-agent-erklaert, /ratgeber/seo-prompts-chatgpt, /ratgeber/gpts-erstellen, /ratgeber/prompt-engineering
  - [ ] **Messung ChatGPT-Prompts** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): chatgpt prompts, /prompts/tool/chatgpt
  - [ ] **Messung Claude vs. ChatGPT** (fällig ab 2026-11-30, braucht Datei docs/gsc/2026-11-30.csv): claude vs chatgpt, /tool-vergleiche/claude-vs-chatgpt
  - [ ] **Messung ChatGPT-Prompts** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): chatgpt prompts, /prompts/tool/chatgpt
  - [ ] **Messung Claude vs. ChatGPT** (fällig ab 2026-12-28, braucht Datei docs/gsc/2026-12-28.csv): claude vs chatgpt, /tool-vergleiche/claude-vs-chatgpt
Stand 26.10.2026. Je Sitzung genau eine Aufgabe (bei „je Runde“ nur die angegebene Menge). Ton immer nach `docs/BRAND-VOICE.md`, Fakten nur mit offizieller Quelle, Unikat-Texte in `db/texte/*.json`.
- [ ] **Steckbriefe** je Runde 5 weitere Tools aus den Konsens-Tools (3/3 und 2/3) der KI-Tool-Datenbank in `db/tools.json`, dazu Jeans Meinung in `db/texte/tools.json`.
- [ ] **Prompts** je Runde 6 neue in `lib/prompts.js` (Coding, Bild, Recht und Verträge, Vereinsarbeit, Agenturen), dazu Intro/Tipp/Fehler in `db/texte/prompts.json`.
- [ ] **Glossar** je Runde 5 neue Begriffe in `lib/ki-glossar.js` plus Schrauber-Erklärung in `db/texte/glossar.json`.
- [ ] **Neu entdeckte Verzeichnisse prüfen** je Runde 15 aus `db/neu-entdeckt.json`: Einreichung noch offen? Preis und Badge-Pflicht laut eigener Seite aktualisieren, tote Einträge entfernen.
- [ ] **Prüfdaten erweitern** je Runde 15 Verzeichnisse ohne Eintrag in `db/checks.json` (Freischaltdauer, Link-Typ, Status mit Zitat und Quelle).
- [ ] **Ratgeber-Faktencheck** je Runde 2 Artikel aus `lib/ratgeber.js`, deren `geprueft` älter als 30 Tage ist: Quellen erneut öffnen, Abweichungen korrigieren, `geprueft` aktualisieren.
- [ ] **Aufklapp-Infos** je Runde 20 Seiten eines Typs (zuerst Steckbriefe `/tools/…`, dann Ratgeber, Vergleiche, Verzeichnisse mit dem höchsten Jean-Score): in `db/texte/klapp.json` unter dem Pfad mit Schrägstrich am Ende 1 bis 2 Einträge `[frage, antwort]` oder `[frage, antwort, [link, linktext]]`. Nur Fakten aus den Daten im Repository oder mit offizieller Quelle, keine Wiederholung dessen, was schon auf der Seite steht. Ton nach BRAND-VOICE.
- [ ] **Verlinkung prüfen** je Runde: `node utils/vernetzung/build.mjs out` nach einem Build ausführen und Seiten mit weniger als 5 eingehenden Links (`reinGesamt` in `db/vernetzung.json`) im Fließtext von 2 thematisch passenden Seiten verlinken.
- [ ] **ChatGPT-Prompts live testen**: die 10 Vorlagen mit `fuer: ['chatgpt']` in ChatGPT und einem zweiten Modell ausführen, Prüfdatum je Prompt ergänzen (Regel aus `docs/CONTENT-PLAN-TOOL-PROMPTS.md`). *braucht Login, wartet auf Jean*
- [ ] **Cursor-Steckbrief und Vergleich nachprüfen**: Preisseite zeigt seit Herbst 2026 ein Paket mit Grok und X (Plus 8 USD, nur Grok-Modelle). Beim nächsten Preis-Check im Browser bestätigen.
- [ ] **Otter-Preis in `db/tools.json`**: 8,49 USD ist laut Preisseite ein Aktionspreis für Neukunden, regulär 16,99 USD monatlich. Beim Preis-Check korrigieren.
- [ ] **StartupBase** (fällig ab 2027-02-01): „Sign ups are closed until January 31st“ prüfen, ob Anmeldung wieder offen ist.
- [ ] **Top 50 als echter Lead-Magnet**: Sobald der Newsletter läuft, CSV-Download an das Abo koppeln. *wartet auf Newsletter*

## Herzstücke-Backlog (verworfene Ideen aus Runde 2, bei Bedarf umsetzen)

- [ ] Persönliche Startseite: zuletzt angesehene Rubrik oben anzeigen
- [ ] Glossar-Begriffe beim Überfahren mit kleinem Wackeln hervorheben
- [ ] „Frag Jean“-Formular: freundlichere Fehlermeldungen mit Beispiel statt Browser-Standard
- [ ] Prompt-Bibliothek: Lieblingsprompts mit Stern direkt an der Karte merken
- [ ] Wochenrückblick in der Merkliste: was du diese Woche gelesen hast
- [ ] Mini-Spiel „Fang das Backlink-Herz“ auf der 404-Seite
- [ ] Seitenalter im Footer („AIGeddon ist seit X Tagen online“), sobald das Startdatum fest steht
- [ ] Danke-Wand für Open-Source-Beitragende aus öffentlichen GitHub-Daten zur Build-Zeit
- [ ] Eigene Cursor-Spur aus kleinen Sternen im Ruhe-Modus-aus
- [ ] Geräusch beim Hupen (nur nach Klick, standardmäßig stumm)
- [ ] Abzeichen „Stammgast“ für 7 Besuchstage am Stück
- [ ] Abzeichen für 10 gemerkte Seiten
- [ ] Teilbare Abzeichen-Karte als Bild (Canvas, lokal erzeugt)
- [ ] Jahreszeiten-Variante des Jean-Icons (Mütze im Winter, Sonnenbrille im Sommer)
- [ ] Geburtstagsgruß der Seite am Jahrestag des ersten Deploys
- [ ] Lesemodus mit größerer Schrift und ruhigem Hintergrund
- [ ] „Heute gelernt“-Kärtchen am Ende jedes Ratgebers zum Abhaken
- [ ] Animierter Daumen nach abgeschicktem Formular
- [ ] Tastenkürzel g für Glossar und k für KI-Test
- [ ] Merkliste als Datei exportieren und auf anderem Gerät importieren

## Wiederkehrend (eigene geplante Sitzungen, nicht hier abhaken)

- **Monatlich:** KI-Tool-Datenbank neu einlesen (tote Domains aus `db/kb-tot.json` filtert der Import automatisch heraus; vorher erneut prüfen, ob dort gelistete Seiten wieder leben): die drei Listen klonen (`git clone --depth 1`), `npm run kb:import -- <ordner>`, Sterne/Forks in `utils/kb/import.js` aktualisieren, Diff prüfen (neue/entfernte Tools), PR.

- **Wöchentlich, Montag:** Sperr-Check. Alle Verzeichnisse mit Status in `db/checks.json` erneut prüfen, ob die Einreichung wieder offen ist, und die 30 Verzeichnisse mit dem höchsten Jean-Score prüfen, ob sie inzwischen gesperrt oder tot sind. Änderungen mit Quelle eintragen.
- **Monatlich, am 1.:** Preis-Check aller Tools in `db/tools.json` und aller Rechner-Preise in `lib/preise.js` (API-Modelle, Abos) gegen die offiziellen Preisseiten, `TOOLS_STAND` und `PREISE_STAND` aktualisieren. Achtung: Gemini 4 Argon verdoppelt am 1.12.2026 den Preis.
- **Wöchentlich, Donnerstag:** KI-News: Trendthemen recherchieren, 3 bis 6 neue Artikel in `lib/news.js` (/ki-news) mit offiziellen Quellen und 5 bis 8 Links zu bestehenden Unterseiten, dazu `lib/modelle.js` und Gerüchte-Check aktualisieren (eigene geplante Sitzung).
- **Bei jeder Sitzung:** Liegt eine neue `docs/partnerprogramme.xlsx` von Jean vor, mit `python3 utils/partners/xlsx_import.py` und `npm run partners` übernehmen, danach die Tabelle mit `utils/partners/xlsx_build.py` neu erzeugen. Regeln in `CLAUDE.md`.
- **Täglich (GitHub Actions, 04:17 UTC):** Neubau der Seite, damit Deal und Tool des Tages wechseln. Danach berechnet `utils/vernetzung/build.mjs` die interne Verlinkung neu; hat sie sich geändert, baut der Workflow ein zweites Mal.

## Erledigt

- 2026-11-02 · Ratgeber `ki-agenten-selbststaendige-deutschland`: Verfügbarkeit von ChatGPT Work laut chatgpt.com/work korrigiert (Desktop alle Tarife, Web und mobil ab Plus), Hinweis auf eingestellten ChatGPT-Agenten, zwei Quellen ergänzt.

- 2026-11-02 · Content-Plan Wochen 2 bis 16 auf Wunsch von Jean vorgezogen: 16 Prompt-Seiten je Tool mit 101 tool-spezifischen Prompts (Gemini, Claude, Copilot, NotebookLM, Perplexity, Suno, Midjourney, ElevenLabs, Leonardo, Ideogram, Runway, Kling, invideo, HeyGen, Gamma, Canva Magic Write), Vergleiche Gemini vs. ChatGPT und Perplexity vs. ChatGPT, 5 Chat-Verlauf-Ratgeber, 8 Anwendungsfall-Hubs, „So startest du“ für 12 Steckbriefe. Mess-Aufgaben gebündelt je Cluster. ChatGPT-Agent laut OpenAI eingestellt: Prompts auf ChatGPT Work umgestellt, GPT-Bauplan auf Projekt/Plugin.

- 2026-11-02 · Product-Hunt-Fakten in `product-hunt-launch-deutsch` und `ki-tool-launchen-30-tage` aktualisiert (500 Zeichen, Logo bis 2 MB, Galerie ab 1 Bild, Start ab Mitternacht PT, neue Hilfe-URL). Tekpon auf „Paid“ (249 $ einmalig) in `directories/t.ts`, `db/directories.json`, README und `db/checks.json`.

- 2026-11-02 · Backlog-Runde: Vergleich ChatGPT vs. Claude vs. Gemini, Ratgeber KI-Musik und GEMA-Urteil gegen Suno (LG München I, 42 O 763/25), Zielgruppen Agenturen sowie Vereine und Ehrenamt, 5 Steckbriefe (Photoroom, Taskade, Copy.ai, Elicit, Tabnine), Aufklapp-Infos für 20 weitere Steckbriefe, 15 neu entdeckte Verzeichnisse geprüft, 15 neue Prüfdaten, Faktencheck von 2 Ratgebern.

- 2026-11-02 · Ratgeber „Vibe Coding: Apps bauen mit Lovable, Bolt und v0“, Tutorial „Mit KI programmieren, ohne dass es knallt“ (6 Schritte, 3 Quizfragen), Prompt-Runde mit 6 neuen Vorlagen (Code-Review, App-Bauplan, Bildserie, Vertrag verstehen, Vereinsbrief, Agentur-Briefing).

- 2026-11-02 · Tote Tools aus der KI-Tool-Datenbank entfernt: 29 Domains (gelöscht, nicht auflösbar, Vercel abgeschaltet, Fremdinhaber) in `db/kb-tot.json` mit Grund und Datum, Import filtert sie, Datenbank von 705 auf 676 Tools.

- 2026-11-02 · Zehn-Schritte-Sitzung: Content-Plan Woche 1 (Route /prompts/tool/[slug] mit Feld `fuer`, 10 ChatGPT-Prompts, Vergleich Claude vs. ChatGPT mit „Teste es selbst“), Vergleiche Lovable/Bolt/v0, Copilot/Cursor/Replit, Fireflies/tl;dv/Otter, DeepL/Grammarly/QuillBot, Tutorial Meeting-Notizen DSGVO, 5 Glossar-Begriffe, Aufklapp-Infos für 14 Steckbriefe.

- 2026-10-28 · Herzstücke Runde 2: 20 weitere liebevolle Elemente (Sammelalbum mit 14 Abzeichen, Easter Eggs, Weiterlesen, Restlesezeit, Neu seit letztem Besuch, Verlauf, eigene SVG-Illustrationen, Feiertags- und Nachtgruß, Weitersagen, Idee an Jean).
- 2026-10-28 · PR #126: Herzstücke Runde 1 (21 Elemente, Merkliste, Farbwahl, Ruhe-Modus).

- 2026-10-23 · PR #39: Prompt-Archiv `/prompts/archiv` mit 103 Rollen-Prompts aus f/prompts.chat (CC0), deutsche Titel, 8 Kategorien, „Antworte auf Deutsch“; deutsche Kurzbeschreibungen für alle 137 Konsens-Tools (`db/kb-de.json`) samt Rubrik-Korrekturen.

- 2026-10-23 · PR #38: KI-Tool-Datenbank `/ki-tools` mit 705 Tools aus steven2358/awesome-generative-ai (CC0), mahseema/awesome-ai-tools (MIT), ikaijua/Awesome-AITools (CC BY 4.0); 15 Rubrikseiten, Suche, Konsens-Signal, Quellen- und Lizenzseite.

- 2026-10-23 · PR #37: Tutorials mit Schritt-Slider, Vorher/Nachher-Regler, Quiz und Konfetti (2 Tutorials), Prompt-Check mit Token-Schätzung, Download-Center mit Spickzettel und Prompt-Paket, eingebettete Mail-Erfassung, Slide-in-Lead-Box, `docs/LEADS.md`.

- 2026-10-23 · PR #36: Prompt-Bibliothek `/prompts` (12 Vorlagen), Prompt-Baukasten mit Score, Senden-Buttons an ChatGPT/Claude/Perplexity/Grok/Google AI Mode, Newsletter-Baustein als PromptGott, Plan `docs/ROADMAP-100.md`.

- 2026-10-23 · PR #35: zentrales Partner-Register `db/partners.json` (50 Programme), Prüf- und Übersichtsskript `npm run partners` → `docs/PARTNERLINKS.md`, Prüfung im Pages-Workflow.

- 2026-10-23 · PR #29 bis #32: Rebranding AIGeddon, Monetarisierungs-Grundlage, Deals, Launch-Service-Hinweise, Tool-Verzeichnis (25 Tools), Jean-Icons, Seitenleisten, Mobile-Dock.
- 2026-10-23 · PR #33: eigene Rabattcodes (`OWN_DEALS`, `ONLY_OWN_DEALS`), Registrierungs-Checkliste, dieses Backlog, geplante Sitzungen.
- 2026-10-23 · dieser PR: 5 Tool-Vergleiche unter `/tool-vergleiche` (Make/Zapier/n8n, Semrush/SE Ranking/Surfer, beehiiv/Kit/GetResponse/Brevo, Framer/Webflow/Hostinger, Synthesia/HeyGen/InVideo/Pictory) und Lead-Magnet `/top-50` mit CSV.
