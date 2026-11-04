# CTA-Plan: jede Seite lässt die Mail-Liste wachsen

Stand: 2026-11-04. Ziel: Auf jeder Seite von mentat.codes eine sinnvolle Möglichkeit, sich einzutragen, ohne zu nerven.

## Regeln

- **Höchstens 2 Lead-Bausteine pro Seite.** Gezählt werden Bausteine im Seitenfluss, die auf die Mail-Liste zielen: `LeadBox`, `LeadMagnetBox`, `GuideGate`.
- **Baustein 1 (Ende):** `LeadBox` steht global in `app/layout.js` unter jedem Inhalt. Kein Template braucht eine eigene End-Box.
- **Baustein 2 (inline):** eine `LeadMagnetBox` nach dem ersten Drittel bzw. direkt nach dem Ergebnis (Rechner, Quiz, Tool-Finder). Thema über `magnetFuer()` aus `lib/leadmagnets.js`: Coding schlägt Launch/Verzeichnisse schlägt Prompts (Standard). Mit `anlass` steht ein Satz davor, der zur Seite passt.
- **Nicht mitgezählt:** `SlideInLead` (nur auf Prompt- und Tutorial-Seiten, wie bisher, nichts Neues dazu) und das Anfrageformular `LeadForm` aus `SeitenAnhang` (Service-Anfrage, nur auf /werben, /launch-kit, /ueber-jean, /verzeichnis/[slug] ausgeklappt).
- **Bewusst ohne Inline-Box:** Rechtliches, Konto, Forum, Moderation, reine Navigations-Hubs. Dort reicht die globale End-Box.

## Newsletter-Anbindung (Brevo)

- `lib/monetization.js`: `BREVO_FORM_URL` (Default: Formular der Liste „mentat.codes Newsletter“, per `NEXT_PUBLIC_BREVO_FORM_URL` überschreibbar, leerer String schaltet ab), `BREVO_SOURCE_FIELD` (optional), `HAS_NEWSLETTER`.
- `app/components/BrevoForm.js`: POST direkt an Brevo (Simple HTML: `EMAIL`, leerer Honeypot `email_address_check`, `locale=de`, `html_type=simple`). fetch mit `mode: 'no-cors'`, danach „Fast geschafft: Bitte bestätige den Link in der Mail“. Netzwerkfehler oder kein JavaScript: normales Formular in neuem Tab. Kein Skript, kein Cookie von Brevo.
- Brevo ist das primäre System (Entscheidung D57). `EmailCapture`, `LeadBox` und `LeadMagnetBox` zeigen das Brevo-Formular, sobald `BREVO_FORM_URL` gesetzt ist. PromptGott auf Substack (`NEWSLETTER_URL`, `SUBSCRIBE_URL`) ist dann nur Zweitlink in der LeadBox; ohne Brevo ist es der Fallback (Link zur Anmeldeseite), ohne beides YouTube.
- Download-Sperre: `DOWNLOAD_GATE = BREVO_FORM_URL || NEWSLETTER_GATE`. Mit Brevo sind gesperrte Downloads (`gated: true`: Prompt-Paket, Top-50-CSV) immer hinter der Anmeldung, weil Brevo nach der Bestätigung auf `/downloads/` leitet und dort alle Downloads frei stehen (`<LeadMagnetBox frei />`). Ohne Brevo gilt die Regel von main: Sperre nur mit `NEXT_PUBLIC_NEWSLETTER_GATE=1`.
- Quelle: Nur wenn in Brevo ein Kontaktattribut (Text) existiert und im Formular als verstecktes Feld angelegt ist, `NEXT_PUBLIC_BREVO_SOURCE_FIELD` auf dessen Namen setzen. Dann geht `<baustein> <pfad>` mit.
- Datenschutz: Abschnitt „Newsletter“ für Brevo in `app/datenschutz/page.js`, erscheint nur mit gesetzter `BREVO_FORM_URL`.

## Inventur

Seitenzahlen aus `out/` (Build vom 2026-11-04). „Vorher“ = Lead-Bausteine im Template ohne die globale End-Box.

| Seitentyp | Template | Seiten | Vorher | Jetzt eingebaut (inline) | Lead-Magnet |
|---|---|---:|---|---|---|
| KI-Tool-Datenbank, Steckbrief | `app/ki-tools/tool/[slug]/page.js` | 676 | nichts | nach „Jeans Take“, vor Alternativen | `magnetFuer(rubrik)`: coding → Coding-Spickzettel, sonst Prompt-Spickzettel |
| KI-Tools, Rubrik | `app/ki-tools/[rubrik]/page.js` | 15 | LeadMagnetBox | unverändert | prompt-paket |
| KI-Tools für Zielgruppe | `app/ki-tools/fuer/[slug]/page.js` | 12 | LeadMagnetBox | unverändert | prompt-paket |
| KI-Tools, Alternativen-Hub | `app/ki-tools/alternativen/[slug]/page.js` | 12 | nichts | nach der Liste, vor FAQ | `magnetFuer(rubrik)` |
| ChatGPT-Alternativen | `app/ki-tools/chatgpt-alternativen/page.js` | 1 | nichts | vor „Chatbots“ | prompt-spickzettel |
| KI-Tools Start, kostenlos | `app/ki-tools/page.js`, `kostenlos` | 2 | LeadMagnetBox | unverändert | prompt-spickzettel, prompt-paket |
| Tool-Steckbrief | `app/tools/[slug]/page.js` | 72 | nichts | vor „Was kostet …“ | `magnetFuer(category)`: Coding → Coding-Spickzettel |
| Tool-Verzeichnis | `app/tools/page.js` | 1 | nichts | nach dem Explorer | prompt-spickzettel |
| Tool-Vergleich | `app/tool-vergleiche/[slug]/page.js` | 25 | nichts | nach der Faktentabelle | `magnetFuer(Titel, Kategorien)` |
| Verzeichnis-Steckbrief | `app/verzeichnis/[slug]/page.js` | 260 | nichts (LeadForm ausgeklappt) | nach „in Zahlen“, vor „Wofür sich … eignet“ | top-50 |
| Listen | `app/liste/[slug]/page.js` | 6 | rabattcodes: LeadBox | alle außer rabattcodes: nach der Tabelle | top-50 |
| Top 50 | `app/top-50/page.js` | 1 | LeadBox | unverändert | (CSV ist die Seite selbst) |
| Verzeichnis-Vergleich | `app/vergleich/page.js` | 1 | nichts | nach dem Vergleich | top-50 |
| Quiz (Ergebnis) | `app/quiz/page.js` | 1 | nichts | direkt nach dem Quiz | top-50 |
| Tool-Finder (Ergebnis) | `app/tool-finder/page.js` | 1 | nichts | direkt nach dem Finder | prompt-spickzettel |
| Was ist ein KI-Verzeichnis | `app/ki-verzeichnis/page.js` | 1 | nichts | vor „Kriterien“ | top-50 |
| Deutsche KI-Verzeichnisse | `app/deutsche-ki-verzeichnisse/page.js` | 1 | nichts | vor „Tipps“ | top-50 |
| Neu entdeckt | `app/neu-entdeckt/page.js` | 1 | nichts | vor FAQ | top-50 |
| Launch-Kit | `app/launch-kit/page.js` | 1 | nichts (LeadForm ausgeklappt) | nach dem Kit | top-50 |
| Launch-Tracker | `app/launch-tracker/page.js` | 1 | nichts | nach dem Tracker | top-50 |
| Mein KI-Stack | `app/mein-stack/page.js` | 1 | nichts | nach dem Stack | prompt-spickzettel |
| KI-News, Artikel | `app/ki-news/[slug]/page.js` | 24 | nichts | nach „Was du jetzt tun solltest“ | `magnetFuer(Titel, Thema)` |
| KI-News, Übersicht | `app/ki-news/page.js` | 1 | nichts | vor „Nach Thema“ | prompt-spickzettel |
| Neue KI-Modelle, Modell/Familie | `app/neue-ki-modelle/[slug]/page.js` | 22 | nichts | nach den Fakten, vor FAQ | `magnetFuer(Name, Anbieter)` |
| Neue KI-Modelle, Übersicht | `app/neue-ki-modelle/page.js` | 1 | nichts | vor „Gerüchte“ | prompt-spickzettel |
| Glossar-Eintrag | `app/glossar/[slug]/page.js` | 79 | nichts | nach Beispiel/Tipp, vor „Verwandte Begriffe“ | `magnetFuer(Begriff, Zielseite)` |
| Glossar, Übersicht | `app/glossar/page.js` | 1 | nichts | zwischen KI- und SEO-Teil | prompt-spickzettel |
| Ratgeber-Artikel | `app/ratgeber/[slug]/page.js` | 38 | LeadMagnetBox am Ende (nur mit `magnet`), GuideGate (kein Guide bereit) | **verschoben** nach dem ersten Drittel der Abschnitte, jetzt auf allen Artikeln; ist ein PDF-Guide bereit, ersetzt der GuideGate die Box | `a.magnet` oder `magnetFuer(slug, Titel)` |
| Prompt | `app/prompts/[slug]/page.js` | ~200 | LeadMagnetBox + SlideInLead | unverändert | prompt-paket |
| Prompts, Kategorie / Tool / Archiv | `app/prompts/kategorie/[key]`, `tool/[slug]`, `archiv` | 28 | LeadMagnetBox | unverändert | prompt-paket |
| Prompts, Übersicht | `app/prompts/page.js` | 1 | nichts | vor „Techniken“ | prompt-paket (gesperrt: mit Brevo Anmeldung) |
| Prompt-Baukasten, Prompt-Check | `app/prompt-baukasten`, `prompt-check` | 2 | LeadMagnetBox | unverändert | prompt-spickzettel |
| Tutorial | `app/tutorials/[slug]/page.js` | 11 | LeadMagnetBox + SlideInLead | unverändert | je Tutorial |
| Tutorials, Übersicht | `app/tutorials/page.js` | 1 | LeadMagnetBox | unverändert | prompt-spickzettel |
| Rechner (6) | `app/rechner/*/page.js` | 6 | LeadMagnetBox nach dem Ergebnis | unverändert | prompt-spickzettel |
| Rechner, Übersicht | `app/rechner/page.js` | 1 | nichts | vor dem Schnellcheck | prompt-spickzettel |
| KI-Test, Kategorie | `app/ki-test/[kategorie]/page.js` | 6 | nichts | nach den Aufgaben | prompt-spickzettel |
| KI-Test, Start | `app/ki-test/page.js` | 1 | LeadMagnetBox | unverändert | prompt-spickzettel |
| Skill | `app/skills/[slug]/page.js` | 12 | nichts | nach „Schritt für Schritt“ | `magnetFuer(Kategorie, Name)` |
| Skills, Übersicht | `app/skills/page.js` | 1 | nichts | vor „Installieren“ | prompt-spickzettel |
| Beste KI-Tools | `app/beste-ki-tools/page.js` | 1 | LeadMagnetBox (nach Platz 5) | unverändert | prompt-spickzettel |
| Downloads | `app/downloads/page.js` | 1 | alle Magneten | jetzt `frei` (Brevo-Weiterleitung nach DOI) | alle |
| Guides | `app/guides/page.js` | 1 | GuideGate je Guide | unverändert | Guides |
| Hubs: Ratgeber, Verzeichnis A bis Z, Listen, Tool-Vergleiche, Alternativen, Für wen | `app/ratgeber`, `verzeichnis`, `liste`, `tool-vergleiche`, `ki-tools/alternativen`, `ki-tools/fuer` | 6 | nichts | bewusst nur End-Box (reine Navigation) | |
| Startseite, Über Jean | `app/page.js`, `app/ueber-jean/page.js` | 2 | | **nicht angefasst** (anderer Agent) | |
| Rechtliches, Konto, Forum, Werben, So prüfen wir, Transparenz, Merkliste, Quellen | diverse | ~20 | | bewusst nur End-Box | |

## Offene Integrationsschritte

1. **Keine Service-Angebote (Stand 4. November 2026).** mentat.codes bleibt vorerst ein privates, nichtkommerzielles Projekt. `/beratung`, `/website-erstellen-lassen`, die AngebotBox und `lib/angebote.js` wurden entfernt. Neue Service- oder Beratungsangebote nur nach ausdrücklicher Entscheidung des Users.
2. **Willkommensmail in Brevo:** Die Bestätigungs- oder Willkommensmail sollte die Links zu `/downloads/prompt-paket.md` und `/top-50.csv` (oder einfach `/downloads/`) enthalten, falls die Weiterleitung nicht greift.
3. **Quelle als Attribut:** In Brevo ein Kontaktattribut `QUELLE` (Text) anlegen, im Formular als verstecktes Feld ergänzen und `NEXT_PUBLIC_BREVO_SOURCE_FIELD=QUELLE` setzen. Dann sieht man, welcher Baustein auf welcher Seite die Anmeldungen bringt.
4. **Echter Test:** Einmal mit einer eigenen Adresse eintragen und prüfen, ob Brevo die Mail schickt und nach der Bestätigung auf `/downloads/` weiterleitet.
5. **Guides:** Sobald ein PDF-Guide `bereit: true` ist, ersetzt er im passenden Ratgeber die Inline-Box automatisch.
