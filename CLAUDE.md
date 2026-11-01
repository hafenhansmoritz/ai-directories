# Hinweise für Claude in diesem Repository (AIGeddon)

## Partnerlinks: immer automatisch nutzen

- Zentrale Sammlung aller eigenen Affiliate-Links und Rabattcodes von Jean (alle Projekte) ist `db/affiliate-links.json`. Programmdaten und Status stehen in `db/partners.json`, verknüpft über die id. Jean pflegt beides über `docs/partnerprogramme.xlsx` (Firma mit USt-IdNr. angemeldet). Einträge mit `bestaetigt: false` nutzt keine Seite.
- Fremde Referral-Links (z. B. `?ref=`, `?via=`, `?aff=`, `fp_ref`, fremde `utm_*`) und fremde Rabattcodes gehören in kein Repo von Jean. Beim Import von Daten entfernen (`ohneTracking` in `lib/kb.js` und `utils/kb/import.js`); fremde Codes der Verzeichnisliste werden nicht übernommen (`ONLY_OWN_DEALS = true`).
- Liefert Jean eine ausgefüllte Excel-Datei (Upload oder `docs/partnerprogramme.xlsx` im Repo), immer:
  1. `python3 utils/partners/xlsx_import.py [pfad.xlsx]` (Status und Notizen nach `db/partners.json`, Partner-Link und Rabattcode nach `db/affiliate-links.json`)
  2. `npm run partners` (prüft das Register, schreibt `docs/PARTNERLINKS.md`)
  3. `python3 utils/partners/xlsx_build.py` nach einem Build (erzeugt die Tabelle neu, eingetragene Werte bleiben erhalten)
  4. bauen, prüfen, PR, mergen.
- Links nie hart in Seiten schreiben. Im Code immer über die Helfer gehen:
  - Tools mit Steckbrief: `toolHref(t)` / `toolRel(t)` aus `lib/tools.js` (nutzt `TOOL_AFFILIATES`).
  - Verzeichnisse: `lib/data.js` (nutzt `AFFILIATES`, eigene Rabattcodes über `OWN_DEALS`).
  - Alle anderen Anbieter, z. B. die 705 Tools der KI-Tool-Datenbank: `HOST_AFFILIATES[domain]` bzw. `t.affiliate` aus `lib/kb.js`.
- Ein Link wird genutzt, sobald er in `db/affiliate-links.json` mit passender id steht (Projekt leer oder `aigeddon`, nicht `bestaetigt: false`). Partnerlinks bekommen sichtbar ein `*` und `rel="sponsored"` (siehe /transparenz).
- Neue Seiten oder neue Tool-Erwähnungen (News, Ratgeber, Vergleiche, Prompts): vorhandene aktive Partnerlinks einbauen, wo das Tool genannt und verlinkt wird. Für andere Webprojekte von Jean gilt dieselbe Sammlung als Quelle: https://github.com/jmp-collab/ai-directories/blob/main/db/affiliate-links.json
- Bei Programmen ohne Anmeldung (`programm: "nein"`, `"pausiert/geschlossen"`) keinen Link erfinden. Neue Programme nur mit offizieller Quelle eintragen.

## Skills

- Rubrik /skills: Inhalte liegen als `skills/<name>/SKILL.md` (Agent-Skills-Standard, Ordnername = name, keine Skripte). Nach jeder Änderung `npm run skills` (prüft Frontmatter, schreibt `db/skills.json` und `public/skills-dl/*.zip`), dann bauen. Anzeige-Daten und Verknüpfungen in `lib/skills.js` (SKILL_META). Grundlage marketingskills (MIT), Herkunft im metadata.source jedes Skills angeben.

## Allgemein

- Datenschutz Jean: Auf der Website und im Repo stehen über Jean nur Name, Master of Arts Wirtschaftswissenschaften (Universität Trier) und die Stelle als Senior SEO/SGE Manager bei der MotoMobilityGroup. Keine Fotos, kein Wohnort, keine Familie, kein Aussehen, keine Hobbys, keine früheren Stationen, auch nicht in Witzen oder Beispielen.

- Ton: `docs/BRAND-VOICE.md`. Keine erfundenen Fakten oder Preise, Preise nur von offiziellen Seiten. Keine Gedankenstriche (– —), keine unsichtbaren Unicode-Zeichen.
- Build lokal: `app/verzeichnis/[slug]/opengraph-image.js` vorübergehend verschieben, dann `STATIC_EXPORT=1 BASE_PATH=/ai-directories NEXT_PUBLIC_SITE_URL=https://jmp-collab.github.io/ai-directories npx next build`, danach `node utils/vernetzung/build.mjs out` und erneut bauen.
- Aufgaben-Backlog: `docs/TASKS.md`. Offene Punkte für Jean: `docs/FUER-JEAN.md`.
