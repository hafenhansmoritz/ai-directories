# ROADMAP: mentat.codes — Das genialste & liebenswerteste AI Directory auf Deutsch

Basierend auf der Live-Browser-Inspektion von `https://mentat.codes/` (Desktop, Mobile & Dark Mode).
Jeder automatische Lauf (alle 30 Minuten) wählt die **erste offene Aufgabe (`- [ ]`)**, setzt sie unter Einhaltung aller Qualitätsregeln (`CLAUDE.md`, `docs/BRAND-VOICE.md`, `layer-a` ohne Gedankenstriche/unsichtbare Zeichen) um, prüft Build & Links (`npm run lint`, `npm run build:pages`, `npm run check:links`, `node utils/check/layer-a.mjs --out out`), hakt die Aufgabe ab (`- [x]`), committet und pusht nach `origin main`.

---

## Block 1: Quick Wins, Daten-Glaubwürdigkeit & Bugfixes (Tasks 1–6)

- [x] **Task 1: Modell-Generationen in `claude-vs-chatgpt` auf Stand 2026 aktualisieren**
  Auf `/tool-vergleiche/claude-vs-chatgpt/` (`lib/comparisons.js` und `app/tool-vergleiche/[slug]/page.js`) werden im Fließtext noch `Claude 3.5 Sonnet`, `GPT-4o` und `GPT-4o-mini` genannt, während die Startseite bereits `Claude 5.5` und `GPT-6` (Stand Herbst 2026) führt. Aktualisiere die Modellnamen und Beschreibungen im Vergleich konsistent auf den 2026er Stand.
- [ ] **Task 2: Fehlende Fakten (`keine Angabe`) in den Tool-Vergleichstabellen vervollständigen**
  Auf `/tool-vergleiche/claude-vs-chatgpt/` und weiteren Vergleichen steht in der Tabelle „Die Fakten nebeneinander“ bei `Testphase` und `Oberfläche auf Deutsch` für ChatGPT/Claude teilweise `keine Angabe`. Pflege die fehlenden Attribute (`aufDeutsch`, `testphase` bzw. `gratis`) in `db/tools.json` nach, damit keine unnötigen „keine Angabe"-Zeilen bei Top-Tools erscheinen.
- [ ] **Task 3: Satzzeichen-Bug auf `/ki-test/` und Text-Glättung beheben**
  Auf `/ki-test/` steht in der Kategorie-Karte „🇩🇪 Deutsch & Stil" am Ende ein doppeltes Satzzeichen (`Wie gut schreibt die KI wirklich Deutsch?.`). Prüfe `lib/kitests.js` und `app/ki-test/page.js` auf doppelte Satzzeichen (`?.` oder `!.`) und bereinige sie.
- [ ] **Task 4: Die 6 unerreichbaren Konto-Abzeichen auf `/merkliste/` durch echte Browser-Abzeichen ersetzen**
  Unter `/merkliste/` steht „Kein Konto, kein Server, keine Zählung", aber im Sammelalbum (`lib/herz.js` / `app/merkliste/`) gibt es 6 Account-/Foren-Abzeichen (Mitglied, Gesicht zeigen, Erster Kommentar, Forums-Starter, Problemlöser, Hilfsbereit), die ohne Konto nie freigeschaltet werden können. Ersetze oder ergänze sie für den statischen Modus durch 6 echte, im Browser erreichbare Entdecker-Abzeichen (z. B. Rechner benutzt, KI-Test bewertet, Launch-Kit ausgefüllt, 10 Verzeichnisse abgehakt, Prompt kopiert, Dark-Mode/Farbe gewechselt).
- [ ] **Task 5: „Deal des Tages"-Platzhalter durch echten Mehrwert / Gratis-Perle ersetzen**
  In der rechten Sidebar und auf der Startseite steht unter „Deal des Tages" aktuell nur ein leerer Platzhalter („Eigene Rabattcodes für KI-Verzeichnisse folgen"). Zeige stattdessen automatisch das tagesaktuell bestbewertete kostenlose Dofollow-Verzeichnis („Gratis-Perle des Tages" mit DR, Traffic und Direktlink) an, solange kein bezahlter Rabattcode hinterlegt ist.
- [ ] **Task 6: Zahlen-Diskrepanz zwischen `/ki-tools/` und `/tools/` synchronisieren**
  Auf `/ki-tools/` steht „47 mit Steckbrief", während `/tools/` 67 Tool-Steckbriefe listet. Berechne die Anzahl der vorhandenen Tool-Steckbriefe auf `/ki-tools/` dynamisch aus `db/tools.json`, damit die Zahlen überall exakt übereinstimmen.

---

## Block 2: Layout-Polish, Dark Mode & Mobile UX (Tasks 7–12)

- [ ] **Task 7: Manuellen Dark-/Light-Mode-Umschalter im Header und Footer einbauen**
  Das Dark-Theme existiert bisher nur über `@media (prefers-color-scheme: dark)`. Baue einen charmanten Schalter (☀️ / 🌙 mit lokalem Speicher `mentat-theme` und kurzer Jean-Reaktion) in Header und FooterExtras ein und unterstütze `data-theme="dark"` / `data-theme="light"` in `app/globals.css`.
- [ ] **Task 8: Dark-Mode-Kontrast der oberen Header-Leiste optimieren**
  Im Dark Mode wirkt das grelle Hellblau der oberen `.site-header`-Leiste zu hart und mindert den Kontrast zum weißen Subtitel. Gib `.site-header` im Dark Mode einen edlen dunklen Slate-Ton mit leuchtendem Cyan-Rahmen und optimalem Textkontrast.
- [ ] **Task 9: Überlappung im Top-Ticker auf Desktop beheben**
  Auf Desktop (`1440px`) liegt der Button „⏸ Animationen anhalten" links direkt über dem laufenden Ticker-Text, und rechts ragt „Na, produktiv? 🛠️" in den Ticker hinein. Gib dem Ticker einen sauberen linken/rechten Schutzbereich (Flex-Layout statt Überlagerung), sodass kein Text abgeschnitten wird.
- [ ] **Task 10: „Na, produktiv? 🛠️"-Badge interaktiv und liebenswert machen**
  Das Badge rechts am Header wirkt wie ein klickbares Element, tut aber nichts. Mach es klickbar: Beim Klick wechselt Jean durch 8 trockene, motivierende Kurz-Sprüche für Indie-Hacker (und vergibt beim 3. Klick ein kleines Easter-Egg-Abzeichen oder Toast).
- [ ] **Task 11: Doppelte Scrollbalken der linken und rechten Sidebar auf Desktop entschärfen**
  Beide Sidebars (`.sidebar-left` und `.sidebar-right`) zeigen auf Desktop eigene, breite Scrollbalken direkt neben dem Hauptinhalt. Style die Sidebar-Scrollbars dezent (`scrollbar-width: thin`, dezente Thumb-Farbe) und sorge für einen sanften Fade-Hinweis am unteren Rand.
- [ ] **Task 12: Kollision des „Nach oben"-Raketen-Buttons auf Mobile beheben**
  Auf Mobile (`390px`) verdeckt der schwebende „Nach oben"-Button unten rechts oft den „Eintragen ↗"-Button der Verzeichnis-Karten. Positioniere ihn auf Mobile höher über dem Bottom-Dock, leicht kompakter, und blende ihn erst ab 600px Scrolltiefe ein.

---

## Block 3: Verzeichnis-Workflow & Mini-CRM im Browser (Tasks 13–18)

- [ ] **Task 13: Direktes Abhaken („Eingetragen ✓") und Merkliste oben auf `/verzeichnis/[slug]/`**
  Auf den 260 Verzeichnis-Detailseiten muss man bisher zurück zur Tabelle, um ein Verzeichnis als „Eingetragen" abzuhaken. Baue direkt in die Hero-Box jeder Verzeichnis-Detailseite einen großen Status-Toggle („Noch offen" / „Eingetragen ✓") inklusive Konfetti/Toast und同步 mit `mentat-eingetragen`.
- [ ] **Task 14: Persönliches Einreichungs-Logbuch (Notiz, Datum & Listing-URL) pro Verzeichnis**
  Die Startseiten-Checkliste rät: „Buch führen: Datum, Verzeichnis, Status, Link zur Listing-Seite." Erweitere den Abhak-Status auf `/verzeichnis/[slug]/` und in der Tabelle um ein optionales Mini-Feld für das eigene Einreichdatum (wird beim Abhaken automatisch auf heute gesetzt) und die eigene Listing-URL / Notiz in `localStorage`.
- [ ] **Task 15: Filter „Preis: Unklar / Freemium" und „Nur getestete" in der Haupttabelle ergänzen**
  Einige Verzeichnisse haben den Preis `Unklar` oder den Status `Noch nicht getestet`. Erweitere die Filter in `DirectoryTable.js`, damit man gezielt nach „Geprüfte Einreichung" filtern kann und `Unklar`-Einträge sauber eingeordnet werden.
- [ ] **Task 16: „Nächstes offenes Top-Verzeichnis starten" (Speed-Run-Modus für Gründer)**
  Baue über der Verzeichnis-Tabelle einen „🚀 Launch-Speedrun: Nächstes offenes Top-Verzeichnis"-Button ein: Er zeigt sofort das bestbewertete kostenlose Verzeichnis, in dem der Nutzer noch *nicht* eingetragen ist, mit Direktlink zum Submit-Formular und „Erledigt, nächstes!"-Knopf.
- [ ] **Task 17: Persönliche UTM-Links direkt in der Verzeichnis-Tabelle & im CSV-Export**
  Wenn ein Nutzer im `/launch-kit/` seine Projekt-URL hinterlegt hat, hänge auf Wunsch an alle „Eintragen ↗"-Links und in den CSV-Export automatisch die passenden UTM-Parameter (`utm_source=<slug>&utm_medium=directory&utm_campaign=launch`) an.
- [ ] **Task 18: Kopierbare Kurz-Vorlage aus dem Launch-Kit direkt auf jeder Verzeichnis-Detailseite**
  Zeige auf `/verzeichnis/[slug]/` eine kleine Box „Deine hinterlegten Launch-Kit-Texte zum Direkt-Kopieren" an (sobald im Launch-Kit Daten im Browser gespeichert sind), damit man beim Eintragen nicht zwischen Tabs wechseln muss.

---

## Block 4: Supercharging für `/tools/`, `/prompts/`, `/launch-kit/` & `/ki-test/` (Tasks 19–24)

- [ ] **Task 19: Echtzeit-Suche, Preis-Filter & „DSGVO/EU"-Filter auf `/tools/` (67 Tool-Steckbriefe)**
  Die Seite `/tools/` hat aktuell nur 15 Sprungmarken ohne Suche. Baue eine schnelle Client-Suchleiste sowie Schnellfilter („Gratis-Tarif verfügbar", „Deutsche Oberfläche", „EU/Server") über die 67 Steckbriefe ein.
- [ ] **Task 20: Inline-Prompt-Vorschau (Aufklappen & 1-Klick-Kopieren) auf `/prompts/tool/*` und Rubrikseiten**
  Auf `/prompts/tool/chatgpt/` sieht man bisher nur Links zu den Unterseiten. Ergänze an jeder Prompt-Karte einen „Vorschau & Kopieren"-Toggle, der den Prompt-Text direkt inline ausklappt und mit einem Klick in die Zwischenablage kopiert.
- [ ] **Task 21: Neue Tool-Prompt-Sammlungen für Claude (`/prompts/tool/claude/`) und Cursor/Coding**
  Aktuell hat nur ChatGPT eigene `fuer`-Prompts in `lib/prompts.js` (und `db/texte/prompts.json`). Erstelle 8 maßgeschneiderte, hochwertige deutsche Prompts speziell für `claude` (inkl. `db/texte/prompts.json`-Einträgen), sodass `/prompts/tool/claude/` als vollwertige Seite live geht.
- [ ] **Task 22: `/launch-kit/` Upgrade: Komplett-Download als Markdown & bessere Englisch-Vorlage**
  Ergänze im `/launch-kit/` einen Button „📦 Komplettes Launch-Paket als `.md` herunterladen" (mit allen Texten, Tags und einer Top-25-Checkliste) und verbessere den englischen Text-Generator, damit bei fehlenden englischen Eingaben kein unfreiwilliges Denglisch entsteht.
- [ ] **Task 23: `/ki-test/` Fokus-Modus (Aufgabe für Aufgabe) & teilbare Ergebnis-Scorecard**
  Auf `/ki-test/` wirken 50 Aufgaben untereinander sehr lang. Ergänze einen Umschalter „🎯 Fokus-Modus (1 Aufgabe nach der anderen)" sowie am Ende eine schicke, kopierbare Text-/Markdown-Scorecard der eigenen Testergebnisse.
- [ ] **Task 24: Rechner-Übersicht (`/rechner/`) mit Live-Mini-Indizes & Direkt-Teilen aufwerten**
  Zeige auf `/rechner/` zu jedem der 8 Rechner ein konkretes Rechenbeispiel aus dem Alltag („Ab wann lohnt sich ChatGPT Plus statt API?") als Sofort-Teaser an.

---

## Block 5: „Liebenswerteste Details", Datensicherung & Community-Magie (Tasks 25–30)

- [ ] **Task 25: Komplettes Fortschritts-Backup (JSON Export & Import) auf `/merkliste/`**
  Da alle Daten (`mentat-*`: abgehakte Verzeichnisse, Notizen, Merkliste, Abzeichen, Launch-Kit, KI-Test) lokal im Browser liegen, baue auf `/merkliste/` eine Funktion „💾 Spielstand sichern (JSON herunterladen / wiederherstellen)" ein, damit Nutzer ihren Fortschritt nie verlieren oder aufs Handy übertragen können.
- [ ] **Task 26: Persönliche „Launch-Urkunde" bei 10, 25, 50 und 100 eingetragenen Verzeichnissen**
  Wenn ein Nutzer Meilensteine beim Eintragen erreicht, zeige auf der Startseite und `/merkliste/` eine charmante, druck- und teilbare „Offizielle mentat.codes Launch-Urkunde" mit Rang, Datum, Projektname und Jean-Stempel.
- [ ] **Task 27: Interaktive „Mutmacher & Ausreden-Bingo"-Karte für Launch-Prokrastinierer**
  Baue eine kleine, humorvolle Komponente (z. B. auf `/launch-kit/` oder in der Sidebar) ein, die typische Gründer-Ausreden („Ich muss erst noch das Logo ändern", „Noch ein Feature vor dem Launch") mit trockenen Jean-Kontern entschärft.
- [ ] **Task 28: „Vergleichs-Finder" auf `/tool-vergleiche/` (Schnellwahl zwischen allen 18 Duellen)**
  Ergänze oben auf `/tool-vergleiche/` zwei Dropdowns („Tool A wählen" vs. „Tool B wählen"), die sofort zum passenden Vergleich springen oder die wichtigsten Eckdaten beider Tools nebeneinander zeigen.
- [ ] **Task 29: Barrierefreiheit & Keyboard-Navigation (Power-User Command Palette `Strg+K` / `⌘K`)**
  Erweitere das bestehende Tastenkürzel-System (`?`) um eine blitzschnelle kleine Schnellsuche (`Strg+K` / `⌘K`), mit der man von jeder Unterseite sofort zu jedem Verzeichnis, Tool, Rechner oder Prompt springen kann.
- [ ] **Task 30: Abschließender Qualitäts-, SEO-, Link- & Performance-Feinschliff**
  Prüfe alle neuen Komponenten auf Lighthouse-/CWV-Verträglichkeit, vollständige `aria-label`-Auszeichnung, saubere JSON-LD-Schemas, `npm run check:links`, `layer-a` und aktualisiere die Dokumentation in `README.md`.
