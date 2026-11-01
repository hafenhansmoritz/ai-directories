# Aufgaben-Backlog AIGeddon

Diese Datei steuert die automatischen Arbeitssitzungen. Jede Sitzung liest sie, nimmt **die erste offene Aufgabe von oben**, die nicht auf Jean wartet, erledigt sie vollständig und hakt sie ab.

- [ ] **Content-Plan KI-Comics, Hörspiel, Shorts, Verteilung** abarbeiten: `docs/CONTENT-PLAN-KI-COMICS-AUDIO.md` (Welle 0: Partnerprogramme anmelden, dann #1 Nano Banana Pro)

## Regeln für jede automatische Sitzung

1. Branch frisch von `main`: `git fetch origin main && git checkout -B <Sitzungs-Branch> origin/main`.
2. **Genau eine** Aufgabe aus „Offen“ nehmen, oben beginnen. Aufgaben mit „wartet auf Jean“ überspringen.
3. Fakten nur von offiziellen Seiten der Anbieter, mit Quelle. Nichts erfinden; unbekannt bleibt `null` bzw. „keine Angabe“.
4. Sperren (Status „nicht eintragbar“) und `free_dofollow: false` nur setzen, wenn die Quelle selbst geprüft wurde.
5. Vor dem Commit: `npx next build` ohne Fehler, keine unsichtbaren Unicode-Zeichen (U+200B–U+200F, U+2060–U+2064, U+FEFF, U+00AD, U+202A–U+202E) in geänderten Dateien.
6. Partnerlinks immer mit `rel="sponsored"` und *-Kennzeichnung (passiert automatisch über `db/partners.json` → `lib/partners.js`). Nach jeder Änderung am Register `npm run partners` laufen lassen und `docs/PARTNERLINKS.md` mit committen.
7. PR mit Vorlage aus `PULL_REQUEST_TEMPLATE`, mergen, GitHub-Pages-Lauf abwarten, Live-Seite prüfen.
8. Hier die Aufgabe nach „Erledigt“ verschieben (Datum, PR-Nummer, ein Satz Ergebnis) und neu entdeckte Aufgaben unten in „Offen“ ergänzen.
9. Keine Registrierungen, Käufe, E-Mails oder Posts im Namen von Jean.

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
Stand 26.10.2026. Je Sitzung genau eine Aufgabe (bei „je Runde“ nur die angegebene Menge). Ton immer nach `docs/BRAND-VOICE.md`, Fakten nur mit offizieller Quelle, Unikat-Texte in `db/texte/*.json`.
- [ ] **Vergleich Lovable vs. Bolt.new vs. v0** in `lib/comparisons.js` mit Picks, 5 Unterschieden, 3 FAQ, Quellen (Daten aus `db/tools.json`, Preise vorher auf den Preisseiten prüfen).
- [ ] **Vergleich GitHub Copilot vs. Cursor vs. Replit** (wie oben).
- [ ] **Vergleich Fireflies.ai vs. tl;dv vs. Otter.ai** (wie oben).
- [ ] **Vergleich DeepL vs. Grammarly vs. QuillBot** (wie oben).
- [ ] **Vergleich ChatGPT vs. Claude vs. Google Gemini** als Tool-Vergleich (Tarife aus `db/tools.json`, Modelle aus `lib/modelle.js`).
- [ ] **Ratgeber „Vibe Coding: Apps bauen mit Lovable, Bolt und v0“** (8 bis 10 Abschnitte, FAQ, Quellen, `geprueft`).
- [ ] **Ratgeber „KI-Musik und Rechte: was das GEMA-Urteil gegen Suno bedeutet“** (LG München I, 42 O 763/25, nur belegte Fakten, Hinweis keine Rechtsberatung).
- [ ] **Tutorial „Meeting-Notizen mit KI, DSGVO-sauber“** im Format von `lib/tutorials.js` (6 Schritte, 3 Quizfragen).
- [ ] **Tutorial „Mit KI programmieren, ohne dass es knallt“** (Vibe Coding sicher: Tests, Secrets, Code lesen).
- [ ] **Zielgruppe Agenturen** und **Zielgruppe Vereine und Ehrenamt** in `lib/zielgruppen.js` (je 5 Aufgaben-Karten, Warnbox, FAQ mit Quellen).
- [ ] **Steckbriefe** je Runde 5 weitere Tools aus den Konsens-Tools (3/3 und 2/3) der KI-Tool-Datenbank in `db/tools.json`, dazu Jeans Meinung in `db/texte/tools.json`.
- [ ] **Prompts** je Runde 6 neue in `lib/prompts.js` (Coding, Bild, Recht und Verträge, Vereinsarbeit, Agenturen), dazu Intro/Tipp/Fehler in `db/texte/prompts.json`.
- [ ] **Glossar** je Runde 5 neue Begriffe in `lib/ki-glossar.js` plus Schrauber-Erklärung in `db/texte/glossar.json`.
- [ ] **Neu entdeckte Verzeichnisse prüfen** je Runde 15 aus `db/neu-entdeckt.json`: Einreichung noch offen? Preis und Badge-Pflicht laut eigener Seite aktualisieren, tote Einträge entfernen.
- [ ] **Prüfdaten erweitern** je Runde 15 Verzeichnisse ohne Eintrag in `db/checks.json` (Freischaltdauer, Link-Typ, Status mit Zitat und Quelle).
- [ ] **Ratgeber-Faktencheck** je Runde 2 Artikel aus `lib/ratgeber.js`, deren `geprueft` älter als 30 Tage ist: Quellen erneut öffnen, Abweichungen korrigieren, `geprueft` aktualisieren.
- [ ] **Aufklapp-Infos** je Runde 20 Seiten eines Typs (zuerst Steckbriefe `/tools/…`, dann Ratgeber, Vergleiche, Verzeichnisse mit dem höchsten Jean-Score): in `db/texte/klapp.json` unter dem Pfad mit Schrägstrich am Ende 1 bis 2 Einträge `[frage, antwort]` oder `[frage, antwort, [link, linktext]]`. Nur Fakten aus den Daten im Repository oder mit offizieller Quelle, keine Wiederholung dessen, was schon auf der Seite steht. Ton nach BRAND-VOICE.
- [ ] **Verlinkung prüfen** je Runde: `node utils/vernetzung/build.mjs out` nach einem Build ausführen und Seiten mit weniger als 5 eingehenden Links (`reinGesamt` in `db/vernetzung.json`) im Fließtext von 2 thematisch passenden Seiten verlinken.
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

- **Monatlich:** KI-Tool-Datenbank neu einlesen: die drei Listen klonen (`git clone --depth 1`), `npm run kb:import -- <ordner>`, Sterne/Forks in `utils/kb/import.js` aktualisieren, Diff prüfen (neue/entfernte Tools), PR.

- **Wöchentlich, Montag:** Sperr-Check. Alle Verzeichnisse mit Status in `db/checks.json` erneut prüfen, ob die Einreichung wieder offen ist, und die 30 Verzeichnisse mit dem höchsten Jean-Score prüfen, ob sie inzwischen gesperrt oder tot sind. Änderungen mit Quelle eintragen.
- **Monatlich, am 1.:** Preis-Check aller Tools in `db/tools.json` und aller Rechner-Preise in `lib/preise.js` (API-Modelle, Abos) gegen die offiziellen Preisseiten, `TOOLS_STAND` und `PREISE_STAND` aktualisieren. Achtung: Gemini 4 Argon verdoppelt am 1.12.2026 den Preis.
- **Wöchentlich, Donnerstag:** KI-News: Trendthemen recherchieren, 3 bis 6 neue Artikel in `lib/news.js` (/ki-news) mit offiziellen Quellen und 5 bis 8 Links zu bestehenden Unterseiten, dazu `lib/modelle.js` und Gerüchte-Check aktualisieren (eigene geplante Sitzung).
- **Bei jeder Sitzung:** Liegt eine neue `docs/partnerprogramme.xlsx` von Jean vor, mit `python3 utils/partners/xlsx_import.py` und `npm run partners` übernehmen, danach die Tabelle mit `utils/partners/xlsx_build.py` neu erzeugen. Regeln in `CLAUDE.md`.
- **Täglich (GitHub Actions, 04:17 UTC):** Neubau der Seite, damit Deal und Tool des Tages wechseln. Danach berechnet `utils/vernetzung/build.mjs` die interne Verlinkung neu; hat sie sich geändert, baut der Workflow ein zweites Mal.

## Erledigt

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
