# AIGeddon: die nächsten 100 Schritte

Stand 2026-10-23. Reihenfolge innerhalb jedes Blocks = Priorität. Jeder Schritt hat ein Kürzel für den Geldhebel:
**A** = Affiliate, **L** = Lead (Newsletter/YouTube), **S** = Service/Sponsoring, **P** = eigenes Produkt, **T** = Traffic/SEO als Grundlage.
`[x]` = erledigt, `[J]` = wartet auf Jean, `[ ]` = baue ich automatisch (Backlog in `docs/TASKS.md`).

Leitidee: **AIGeddon wird die deutsche Zentrale für „KI wirklich benutzen“**: Prompts zum Absenden, Rechner, Tutorials, Tool-Vergleiche, dazu YouTube als Beweis und PromptGott als Newsletter. Jede Seite endet in einem von drei Wegen: Prompt ausprobieren → Newsletter abonnieren → Tool über Partnerlink kaufen.

## Block 1: Domain und Fundament (1–10)

1. `[J]` **aigeddon.de registrieren** (frei am 2026-10-23). Hauptdomain für den deutschen Markt. **T**
2. `[J]` **promptgott.de** registrieren (frei), leitet auf `/prompts` bzw. die Newsletter-Anmeldung. Schützt die Newsletter-Marke. **L**
3. `[J]` Optional aigeddon.ai oder .io als Schutz bzw. für eine spätere englische Fassung; erst kaufen, wenn die englische Fassung beschlossen ist.
4. `[ ]` Custom Domain in GitHub Pages: Datei `public/CNAME`, im Workflow `BASE_PATH` leer und `NEXT_PUBLIC_SITE_URL=https://aigeddon.de`, DNS-Einträge (4× A auf GitHub-IP, `www` als CNAME), HTTPS erzwingen. **T**
5. `[ ]` 301-Weiterleitungen: HF-Space und alte GitHub-Pages-URL zeigen auf aigeddon.de (Meta-Refresh + Canonical). **T**
6. `[J]` Impressum und Datenschutz (Pflicht vor Newsletter und Affiliate in Deutschland). Danach baue ich `/impressum` und `/datenschutz`.
7. `[J]` Geschäfts-Mail auf der Domain (z. B. hallo@aigeddon.de), dann Kontaktformular (`/werben` ist seit 2026-11-04 entfernt). **S**
8. `[ ]` Google Search Console und Bing Webmaster Tools: Verifizierungs-Meta-Tag per Env-Variable vorbereiten. **T**
9. `[ ]` Datensparsame Analyse (Plausible oder Umami, ohne Cookie-Banner) per Env-Variable; Klick-Events auf Senden-Buttons, Partnerlinks, Abo. **L A**
10. `[ ]` Leistungs-Check: Lighthouse ≥ 95 auf Startseite, Prompt-Seite, Tool-Seite; Bilder und Schriften prüfen. **T**

## Block 2: Prompt-Hub (11–30)

11. `[x]` Prompt-Bibliothek `/prompts` mit 12 Vorlagen in 5 Kategorien.
12. `[x]` Senden-Buttons an ChatGPT, Claude, Perplexity, Grok, Google AI Mode; Gemini per Kopieren. Lange Prompts automatisch über die Zwischenablage.
13. `[x]` Ausfüllbare Felder mit Live-Vorschau und „Mit Beispiel füllen“.
14. `[x]` Prompt-Baukasten `/prompt-baukasten` mit Prompt-Score (0–100) und „nächster Hebel“.
15. `[x]` Technik-Erklärung pro Prompt (Rolle, Kontext, Format, Rückfragen …).
16. `[ ]` Auf 50 Prompts ausbauen: E-Commerce/Shop, Recht und Verträge (ohne Rechtsberatung), Bewerbung, Excel/Sheets, Bildgenerierung, Coding, Lernen. **T A**
17. `[ ]` **Bild-Prompts**: Midjourney-, DALL·E-, Flux-Vorlagen mit Stil-Bausteinen (Licht, Kamera, Stil) als Klick-Generator. **T A**
18. `[ ]` **Prompt-Ketten** („Workflows“): 3–5 Prompts hintereinander, z. B. „Von der Idee zum veröffentlichten Artikel“. Jeder Schritt mit eigenem Senden-Button. **T L**
19. `[ ]` **System-Prompt-Generator** für Custom GPTs, Claude Projects und Gems. **T**
20. `[x]` **Prompt-Optimierer ohne KI**: regelbasierte Prüfung eines eingefügten Prompts (fehlende Rolle, kein Format, zu vage Verben) mit Verbesserungsvorschlägen. **T**
21. `[ ]` Merkliste „Meine Prompts“ im Browser (localStorage), Export als Text. **L**
22. `[ ]` Prompt des Tages im rechten Seitenrand (rotiert wie Deal des Tages). **L**
23. `[ ]` Modell-Tipps pro Prompt: welches Modell sich eignet (ChatGPT, Claude, Perplexity für Recherche). Nur Aussagen mit Quelle. **A**
24. `[ ]` Prompt-Seiten mit FAQ-Schema und „Beispiel-Ergebnis“-Abschnitt (echtes, gekennzeichnetes Ergebnis). **T**
25. `[x]` **PromptGott-Paket** als Lead-Magnet: 100 Prompts als PDF/Notion, nur gegen Newsletter-Anmeldung. **L**
26. `[ ]` Premium-Prompt-Pakete (z. B. „SEO-Prompt-Paket für Shops“) über Gumroad, Lemon Squeezy oder Digistore24. **P**
27. `[ ]` Prompt-Glossar: 40 Begriffe (Few-Shot, Chain of Thought, Temperatur, Kontextfenster …) mit Verweisen. **T**
28. `[ ]` Vierteljährlicher Test aller Absprung-Links (stehen in `lib/ai-targets.js`). **T**
29. `[ ]` „Prompt einreichen“: Community-Prompts per Formular (Tally), mit Namensnennung und Backlink. **L T**
30. `[ ]` Englische Fassung des Prompt-Hubs, wenn die deutsche Fassung Traffic zeigt. **T**

## Block 3: Rechner und interaktive Tools (31–45)

31. `[ ]` **KI-Kosten-Rechner**: Tokens → Euro für API-Modelle (Preise mit Quelle und Datum, monatlicher Preis-Check). **T A**
32. `[x]` **Token- und Zeichenzähler** mit Schätzung für deutsche Texte. **T**
33. `[ ]` **Abo-Rechner**: Welche KI-Abos lohnen sich (ChatGPT, Claude, Perplexity, Gemini) nach Nutzung pro Woche. **A**
34. `[ ]` **Zeitersparnis-/ROI-Rechner**: Stunden pro Woche × Stundensatz gegen Tool-Kosten. Perfekt für B2B-Leads. **L A**
35. `[ ]` **Automatisierungs-Kostenrechner**: Make vs. Zapier vs. n8n nach Ausführungen pro Monat. **A**
36. `[ ]` **Newsletter-Kostenrechner**: beehiiv, Kit, Brevo, GetResponse nach Abonnentenzahl. **A**
37. `[ ]` **Video-Kostenrechner**: Synthesia, HeyGen, InVideo nach Videominuten. **A**
38. `[ ]` **Tool-Finder-Quiz**: 5 Fragen → 3 passende Tools mit Partnerlink. **A L**
39. `[ ]` **Snippet-Vorschau**: Title und Description wie in Google mit Pixelbreite. **T**
40. `[ ]` **KI-Text-Check** (Layer A): unsichtbare Unicode-Zeichen finden und entfernen, im Browser. **T**
41. `[ ]` **Launch-Plan-Generator**: Startdatum → Kalender mit Verzeichnissen, Product Hunt, Newsletter, Posts als .ics-Datei. **L S**
42. `[ ]` **Verzeichnis-Tracker** um Export und Erinnerungen erweitern. **L**
43. `[ ]` Alle Rechner mit „Ergebnis per Mail schicken“ = Newsletter-Anmeldung mit Einwilligung. **L**
44. `[ ]` Rechner-Übersicht `/rechner` mit Schema `WebApplication`. **T**
45. `[ ]` Einbettbare Rechner (iframe-Code für andere Blogs) mit Backlink. **T**

## Block 4: Tutorials und Academy (46–58)

46. `[x]` Rubrik `/tutorials`: Schritt-für-Schritt-Anleitungen mit Screenshots, HowTo-Schema, Zeitangabe. **T**
47. `[x]` Tutorial: Prompt Engineering in 15 Minuten (Grundkurs, verlinkt auf alle Techniken). **T L**
48. `[ ]` Tutorial: Eigenen Custom GPT bzw. Claude Project bauen. **T**
49. `[ ]` Tutorial: Newsletter mit KI in einer Stunde (mit Prompt-Kette und beehiiv). **A**
50. `[ ]` Tutorial: Erste Automatisierung mit Make, n8n oder Zapier. **A**
51. `[ ]` Tutorial: KI-Video ohne Kamera (Synthesia/HeyGen + ElevenLabs). **A**
52. `[ ]` Tutorial: SEO-Content mit KI, der nicht nach KI klingt. **A**
53. `[ ]` Tutorial: KI-Tool launchen (verlinkt Launch-Kit, Verzeichnisse, Product-Hunt-Prompt). **S**
54. `[ ]` Lernpfade: Anfänger → Fortgeschritten → Profi, mit Fortschritt im Browser. **L**
55. `[ ]` Abschluss-Quiz pro Lernpfad mit teilbarem Zertifikat-Bild. **L T**
56. `[ ]` Use-Case-Rubrik `/use-cases` (aus dem Backlog), jeweils Prompt + Tool + Tutorial. **A**
57. `[ ]` Branchen-Seiten: KI für Handwerk, E-Commerce, Agenturen, Coaches. **T A**
58. `[ ]` Später: bezahlter Mini-Kurs „Prompt-Profi“ (Video + Prompts), Plattform nach Wahl. **P**

## Block 5: AIGeddon YouTube und Case Studies (59–70)

59. `[J]` Liste der Videos (Titel, URL, Thema), die Seite kann den Kanal nicht automatisch lesen.
60. `[ ]` Video-Register `db/videos.json` (ID, Titel, Datum, Themen, verwendete Tools und Prompts). **T**
61. `[ ]` Rubrik `/case-studies`: eine Seite pro Video mit eingebettetem Video (youtube-nocookie, Klick-zum-Laden), Zusammenfassung, Kapitel, verwendete Prompts mit Senden-Button, Tools mit Partnerlink. **A L T**
62. `[ ]` `VideoObject`-Schema auf jeder Case Study (Rich Results in Google). **T**
63. `[ ]` Video-Hinweise auf Prompt-, Tool- und Tutorial-Seiten („So sieht das im Video aus“). **L**
64. `[ ]` Prompt „Video zu Blogartikel“ intern nutzen: aus jedem Video ein Artikel. **T**
65. `[ ]` Beschreibungs-Vorlage für YouTube: Links auf Case Study, Prompts, Partnerlinks, Newsletter. **A L**
66. `[ ]` Shorts-Galerie mit den besten Prompt-Tricks. **L**
67. `[ ]` „Tool-Test“-Format: einheitliche Bewertungsmatrix für Video und Seite. **A**
68. `[ ]` Kanal-Statistik auf der Seite (Abonnenten, Videos), wenn Jean einen API-Schlüssel hinterlegt. **L**
69. `[x]` ~~Sponsoring-Paket „Video + Case Study + Newsletter“ auf `/werben`.~~ *Verworfen 2026-11-04: /werben entfernt, keine Werbung, kein Sponsoring, keine Featured-Plätze.*
70. `[J]` Einheitlicher Kanal-Auftritt: Banner, Kanal-Link auf aigeddon.de, angepinnter Kommentar mit Prompt-Link.

## Block 6: PromptGott Newsletter und Leads (71–80)

71. `[x]` Newsletter-Baustein auf PromptGott umbenannt; erscheint automatisch, sobald die URL gesetzt ist.
72. `[J]` Newsletter-Adresse von PromptGott nennen (gefunden: dev.to/promptgott verweist auf prmoptgenie.substack.com; nicht abrufbar, bitte bestätigen). Empfehlung: beehiiv wegen Empfehlungsprogramm und Werbenetzwerk; Substack geht auch.
73. `[x]` Eingebettetes Anmeldeformular statt Link (Substack-Embed bzw. beehiiv-Formular). **L**
74. `[x]` Content-Upgrades: jede Prompt-Kategorie bekommt ein passendes Paket gegen E-Mail. **L**
75. `[x]` Exit-Intent bzw. Scroll-Box nur auf Prompt-Seiten, sparsam (einmal pro Besuch). **L**
76. `[ ]` Newsletter-Archiv auf der Seite (`/promptgott`), jede Ausgabe als indexierbare Seite. **T L**
77. `[ ]` Empfehlungsprogramm (beehiiv Referral): Prämien = Prompt-Pakete. **L**
78. `[ ]` Willkommensserie: 5 Mails mit den besten Prompts, Tools und Case Studies. **L A**
79. `[x]` ~~Newsletter-Sponsoring-Plätze auf `/werben` mit Mediadaten.~~ *Verworfen 2026-11-04: /werben entfernt, keine Werbung, kein Sponsoring, keine Featured-Plätze.*
80. `[ ]` Lead-Formular für B2B: „KI-Workshop für dein Team“ (Prompt-Schulung). **S**

## Block 7: Monetarisierung (81–92)

81. `[x]` Zentrales Partner-Register `db/partners.json` (50 Programme).
82. `[J]` Anmeldung bei den Top-10-Programmen (Semrush, beehiiv, Kit, Make, ElevenLabs, Synthesia, HeyGen, Systeme.io, Framer, Surfer).
83. `[~]` KI-Tool-Datenbank mit 705 Tools steht (`/ki-tools`); Tool-Verzeichnis mit Preisen auf 75 Tools mit Partnerprogramm (KI-Chat, Bild, Schreiben, Transkription, Recherche). **A**
84. `[ ]` Prompt-Seiten zeigen die passenden Tools (erledigt für 12 Seiten), für alle neuen Seiten Pflicht. **A**
85. `[ ]` „Bester Deal“-Box pro Tool-Kategorie. **A**
86. `[ ]` Weitere Vergleiche (Backlog): ElevenLabs vs. Murf, Tally vs. Typeform, Descript vs. Pictory, ChatGPT vs. Claude vs. Gemini vs. Perplexity. **A**
87. `[ ]` „ChatGPT-Alternativen“, „Claude vs. ChatGPT für …“: suchstarke Vergleichsseiten. **A T**
88. `[x]` ~~Featured Listings für Tools und Verzeichnisse (Preisliste auf `/werben`).~~ *Verworfen 2026-11-04: /werben entfernt, keine Werbung, kein Sponsoring, keine Featured-Plätze.*
89. `[ ]` Launch-Service als buchbares Paket mit Checkout-Link. **S**
90. `[ ]` Digitale Produkte: Prompt-Pakete, Notion-Vorlagen, Launch-Checkliste Pro. **P**
91. `[ ]` Monatlicher Umsatz-Report aus Partnerprogrammen (manuell eingetragen) in `docs/`. **A**
92. `[ ]` Transparenzseite bei jedem neuen Geldhebel aktualisieren (Vertrauen = Klickrate). **T**

## Block 8: Zentralisierung aller Content-Tätigkeiten (93–100)

93. `[ ]` **Content-Register** `db/content.json`: jedes Stück (Video, Newsletter, Artikel, Prompt, Post) mit Thema, Datum, Kanal, URL, verknüpften Prompts und Tools. **T**
94. `[ ]` **Ein Thema, fünf Formate**: aus jedem Video automatisch Vorschläge für Artikel, Newsletter-Abschnitt, 3 Prompts, 5 Social Posts (Prompt-Ketten aus Block 2). **L**
95. `[ ]` Redaktionskalender als Seite (nur intern, nicht indexiert) bzw. als Datei im Repo. **T**
96. `[ ]` Automatische Sitzungen (geplante Aufgaben) erweitern: wöchentlich 3 neue Prompts, monatlich 1 Rechner, nach jedem neuen Video eine Case Study. **T**
97. `[ ]` RSS-Feed für Prompts, Case Studies und Ratgeber (füttert Newsletter-Tool und Social-Tools). **L**
98. `[ ]` Social-Profile zentral verlinken (YouTube, Substack/beehiiv, LinkedIn, dev.to, GitHub) mit `sameAs`-Schema für die Marke AIGeddon und die Person Jean. **T**
99. `[ ]` llms.txt und KI-Sichtbarkeit: alle Rubriken aufnehmen, damit ChatGPT, Claude und Perplexity AIGeddon zitieren. **T**
100. `[ ]` Quartals-Review: Traffic, Abos, Partnerumsatz pro Rubrik; Rubriken ohne Wirkung zusammenlegen, starke ausbauen.

## Domain-Empfehlung kurz

- **aigeddon.de** als Hauptdomain: deutscher Markt, Vertrauen, passt zum Kanal. Bei einem beliebigen Registrar (z. B. INWX, Hetzner, Strato; GoDaddy geht auch).
- **promptgott.de** als Newsletter-Marke, Weiterleitung auf aigeddon.de/prompts bzw. das Anmeldeformular.
- aigeddon.com ist vergeben; aigeddon.ai/.io/.net und promptgott.com sind frei (Stand 2026-10-23), nur bei Bedarf.
- Hosting bleibt GitHub Pages (kostenlos); Umstellung siehe Schritt 4, dauert nach dem DNS-Eintrag etwa eine Stunde.
