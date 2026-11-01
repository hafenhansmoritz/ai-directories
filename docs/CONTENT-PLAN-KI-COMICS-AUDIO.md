# Content-Plan: KI-Comics, Hörspiel, Shorts und Verteilung

Stand: 1.11.2026. Grundlage: Chatverlauf zu KI-Comics (Tools, Konsistenz, Urheberrecht, Verteilung über LinkedIn und Substack), Merge #133, Semrush-Daten Datenbank `de` vom 1.11.2026, `db/partners.json`.

## Kernbefunde

1. **Größter Hebel ist nicht "KI-Comic", sondern das Modell dahinter.** `nano banana pro` hat 27.100 Suchen bei KD 22, `nano banana` 74.000 bei KD 48. Die Comic-Keywords selbst sind klein (`ki comic erstellen` 140, `comic erstellen` 720), aber leicht (KD 10 bis 30). Strategie: Volumen über Modell- und Tool-Keywords holen, Comic als Anwendungsfall und Cluster-Klammer nutzen.
2. **Kein einziger Partnerlink ist aktiv** (98 Programme, 0 mit `status: "aktiv"`). Jeder Artikel unten verlinkt die Tools über `toolHref(t)` auf die Steckbriefe, verdient aber erst, wenn die Programme freigeschaltet sind. Die Anmeldungen in Welle 0 sind deshalb Voraussetzung, nicht Nebensache.
3. **Gegenwind:** Mehrere starke Keywords gehören Tools ohne Partnerprogramm (Midjourney, Gemini, ChatGPT, Suno, Leonardo geschlossen). Diese Artikel bringen Reichweite und interne Links, Umsatz kommt aus den Alternativen im selben Artikel (Krea, Canva, Ideogram später).

## Welle 0: Voraussetzungen (diese Woche)

| Programm | Provision laut Register | Warum zuerst |
|---|---|---|
| Krea | 20 % für 1 Jahr | `krea ai` 9.900 / KD 31, Bild-Cluster |
| ElevenLabs | 22 % für 12 Monate | Hörspiel-Cluster, `elevenlabs deutsch` 480 / KD 43 |
| HeyGen | 35 % für 3 Monate | `heygen` 40.500, `ki avatar` 1.000 / KD 25 |
| OpusClip | 25 % wiederkehrend 1. Jahr | `opusclip` 3.600 / KD 30 |
| beehiiv | bis 60 % für 12 Monate | `beehiiv` 1.600 / KD 23, CPC 2,58 |
| Kit | 50 % für 12 Monate | Newsletter-Cluster, CPC `newsletter erstellen` 7,03 |
| Make | 35 % für 12 Monate | Verteil-Automation |
| n8n | 30 % 1. Jahr | `n8n` 110.000 |
| Canva | 80 % der ersten 2 Monate (Monatsabo) | Comic-Strip-Vorlagen, Lettering |
| Descript | 25 $ einmalig | `descript` 6.600 / KD 30 |
| Runway, Kling AI, Synthesia, Murf | siehe Register | Video- und Audio-Vergleiche |

Ablauf je Freischaltung: `docs/partnerprogramme.xlsx` ausfüllen, `xlsx_import.py`, `npm run partners`, bauen, PR. Die Links erscheinen dann automatisch in allen Artikeln unten.

## Welle 1: Bild und Comic (höchstes Volumen)

| # | Typ | Slug | Fokus-Keyword (Vol / KD) | Getestete Tools, verlinkt | Prio |
|---|---|---|---|---|---|
| 1 | Ratgeber | `nano-banana-pro-gemini-bilder` | nano banana pro 27.100 / 22; nano banana 74.000 / 48; gemini bild erstellen 2.900 / 41 | [Google Gemini](/tools/google-gemini), [ChatGPT](/tools/chatgpt), [Ideogram](/tools/ideogram), [Krea](/tools/krea) | A |
| 2 | Vergleich | `google-gemini-vs-chatgpt-bilder` | chatgpt bild erstellen 6.600 / 37 | [Google Gemini](/tools/google-gemini), [ChatGPT](/tools/chatgpt) | A |
| 3 | Vergleich | `ideogram-vs-krea` | ideogram 9.900 / 29; krea ai 9.900 / 31 | [Ideogram](/tools/ideogram), [Krea](/tools/krea), [Midjourney](/tools/midjourney) | A |
| 4 | Tutorial | `ki-comic-erstellen` | comic erstellen 720 / 30; comic mit ki erstellen 140 / 19; ki comic erstellen 140 / 21; comic erstellen kostenlos 140 / 24; ki comic generator 70 / 10 | [Canva](/tools/canva), [Google Gemini](/tools/google-gemini), [ChatGPT](/tools/chatgpt), [Claude](/tools/claude), [Krea](/tools/krea) | A |
| 5 | Ratgeber | `flux-kontext-figuren-konsistent` | flux kontext 1.600 / 29; flux ki 480 / 32 | [Krea](/tools/krea), [Leonardo AI](/tools/leonardo-ai); Verweis auf [Open-Weight-Ratgeber](/ratgeber/open-weight-modelle-selbst-betreiben) | B |
| 6 | Tutorial | `ki-charakter-erstellen` | ki charakter erstellen 210 / 14 | [Midjourney](/tools/midjourney), [Leonardo AI](/tools/leonardo-ai), [Ideogram](/tools/ideogram), [Google Gemini](/tools/google-gemini) | B |
| 7 | Prompts | Kategorie Comic in `/prompts` | Long Tail aus 4 und 6 | Charakterblatt, Panel-Liste, Panel-Bildprompt (aus dem Prompt-Gott-Beitrag) | B |
| 8 | Skill | `skills/comic-folge/SKILL.md` | Downloads, interne Links | Verlinkt von [Skills-Ratgeber](/ratgeber/ki-skills-wiederkehrende-aufgaben) | B |
| 9 | Ratgeber | `ki-bilder-urheberrecht-kommerziell` | ki urheberrecht 260 / 45; ki bilder urheberrecht 90 / 31; ki bilder kommerziell nutzen 20 / 0 | [Midjourney](/tools/midjourney), [Leonardo AI](/tools/leonardo-ai), [Canva](/tools/canva) | B |

## Welle 2: Von Panel zu Video und Shorts

| # | Typ | Slug | Fokus-Keyword (Vol / KD) | Getestete Tools, verlinkt | Prio |
|---|---|---|---|---|---|
| 10 | Tutorial | `bild-zu-video-ki` | bild zu video ki 2.900 / 38 | [Runway](/tools/runway), [Kling AI](/tools/kling-ai), [Luma Dream Machine](/tools/luma-dream-machine), [Pika](/tools/pika); Vergleich [Runway vs. InVideo AI](/tool-vergleiche/runway-vs-invideo-ai) | A |
| 11 | Vergleich | `opusclip-vs-capcut` | opusclip 3.600 / 30 | [OpusClip](/tools/opusclip), [CapCut](/tools/capcut), [Descript](/tools/descript) | A |
| 12 | Tutorial | `youtube-shorts-aus-comic-panels` | youtube shorts erstellen 170 / 28 | [CapCut](/tools/capcut), [OpusClip](/tools/opusclip), [Runway](/tools/runway), [ElevenLabs](/tools/elevenlabs) | B |
| 13 | Ratgeber | `ki-avatar-erstellen` | ki avatar 1.000 / 25 | [HeyGen](/tools/heygen), [Synthesia](/tools/synthesia); Vergleich [Synthesia vs. HeyGen vs. InVideo vs. Pictory](/tool-vergleiche/synthesia-vs-heygen-vs-invideo-vs-pictory) | B |
| 14 | Vergleich | `kling-ai-vs-runway` | kling ai 40.500 / 61; runway ai 4.400 / 61 | [Kling AI](/tools/kling-ai), [Runway](/tools/runway) | C (KD hoch) |

## Welle 3: Hörspiel und Audio

| # | Typ | Slug | Fokus-Keyword (Vol / KD) | Getestete Tools, verlinkt | Prio |
|---|---|---|---|---|---|
| 15 | Ratgeber | `ki-musik-erstellen` | ki musik erstellen 4.400 / 36 | [Suno](/tools/suno), [ElevenLabs](/tools/elevenlabs) | A |
| 16 | Tutorial | `elevenlabs-deutsch` | elevenlabs deutsch 480 / 43 | [ElevenLabs](/tools/elevenlabs), Vergleich [ElevenLabs vs. Murf](/tool-vergleiche/elevenlabs-vs-murf) | B |
| 17 | Ratgeber | `ki-hoerspiel-produzieren` | ki hörspiel 20; hörspiel erstellen 40 (Nische, null Konkurrenz, Cluster-Klammer zu Comics) | [ElevenLabs](/tools/elevenlabs), [Murf](/tools/murf), [Suno](/tools/suno), [Descript](/tools/descript) | B |
| 18 | Tutorial | `descript-podcast-schneiden` | descript 6.600 / 30 | [Descript](/tools/descript), Vergleich [Otter.ai vs. Descript](/tool-vergleiche/otter-ai-vs-descript) | B |
| 19 | Ratgeber | `ki-stimme-erstellen` | ki stimme 3.600 / 55 | [ElevenLabs](/tools/elevenlabs), [Murf](/tools/murf) | C (KD hoch) |

## Welle 4: Verteilen und automatisieren (Lehre aus dem Chat)

Im Chat ist die automatische Verteilung an zwei Stellen gescheitert: Zapier-Task-Limit beim LinkedIn-Post und keine Posting-API bei Substack. Das ist echter Erfahrungsinhalt, den Wettbewerber nicht haben.

| # | Typ | Slug | Fokus-Keyword (Vol / KD) | Getestete Tools, verlinkt | Prio |
|---|---|---|---|---|---|
| 20 | Ratgeber | `newsletter-erstellen-beehiiv-substack-kit` | newsletter erstellen 1.900 / 30 (CPC 7,03); beehiiv 1.600 / 23; substack 27.100 / 51 | [beehiiv](/tools/beehiiv), [Kit](/tools/kit); Vergleich [beehiiv vs. Kit vs. GetResponse vs. Brevo](/tool-vergleiche/beehiiv-vs-kit-vs-getresponse-vs-brevo); Ratgeber [Newsletter-Anbieter](/ratgeber/newsletter-anbieter-fuer-gruender) | A |
| 21 | Tutorial | `content-automatisch-verteilen` | make automatisierung 70 / 9; n8n 110.000 / 54 | [Make](/tools/make), [n8n](/tools/n8n), [Zapier](/tools/zapier); Vergleich [Make vs. Zapier vs. n8n](/tool-vergleiche/make-vs-zapier-vs-n8n) | B |
| 22 | Ratgeber | `ki-content-pipeline-ein-thema-fuenf-kanaele` | Hub, kein Fokus-Keyword | Verlinkt 1 bis 21, dazu [Gamma](/tools/gamma) und [Notion](/tools/notion) | B |

## Updates bestehender Seiten (schnell, ohne neue URL)

| Seite | Änderung |
|---|---|
| [Steckbrief Google Gemini](/tools/google-gemini) | Abschnitt Nano Banana 2.1 und Pro mit Referenzbild-Grenzen (4 Figuren / 10 Objekte, Pro 5 Figuren + 3 Stile), Link zu #1 |
| [Steckbrief Canva](/tools/canva) | Comic-Strip-Vorlagen, Lettering-Workflow, Link zu #4 |
| [Steckbrief Krea](/tools/krea) | Anwendungsfall Figurenkonsistenz, Link zu #3 und #5 |
| [Steckbrief ElevenLabs](/tools/elevenlabs) | Hörspiel-Workflow, Link zu #16 und #17 |
| [Midjourney vs. Leonardo AI](/tool-vergleiche/midjourney-vs-leonardo-ai) | Abschnitt Comic-Figuren, Hinweis: Leonardo-Partnerprogramm laut Register pausiert/geschlossen |
| [Gamma vs. Canva](/tool-vergleiche/gamma-vs-canva) | Comic als Präsentation oder Storyboard |

## Interne Verlinkung

- Jeder neue Artikel verlinkt mindestens den passenden Steckbrief über `toolHref(t)`, einen Vergleich und einen der fünf Ratgeber aus #133.
- Hub #22 verlinkt alles, alle Artikel verlinken zurück auf den Hub.
- Nach jedem Merge: `node utils/vernetzung/build.mjs out`, damit die Vernetzung die neuen Seiten aufnimmt.

## Verteilung je Artikel

- LinkedIn-Post und Prompt-Gott-Beitrag nach dem Muster in `social/ki-comics-posts.md` (Peppbuch-Projekt).
- Prompt Gott bekommt die prompt-lastigen Stücke (#4, #6, #7, #10, #12), LinkedIn die Daten- und Praxisstücke (#1, #9, #20, #21).
- Voraussetzung für automatisches Posten: Zapier-Tasks aufstocken oder Make/n8n nutzen (#21 dokumentiert genau das).

## Reihenfolge

1. Welle 0 Anmeldungen.
2. #1, #4, #3, #2 (Volumen plus Comic-Klammer), dazu Steckbrief-Updates Gemini, Canva, Krea.
3. #10, #11, #15, #20.
4. Rest nach Priorität B, dann C.

Für jeden Artikel gilt `docs/BRAND-VOICE.md`: Preise und Funktionen nur von offiziellen Seiten, Prüfdatum in `geprueft`, keine Gedankenstriche.
