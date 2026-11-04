# Affiliate-Plan mentat.codes

Stand: 4. November 2026. Ziel: Jeder Besuch soll möglichst zu Affiliate-Umsatz führen. Grundlage ist eine Zählung über alle 1.587 HTML-Seiten des Builds (`npm run build:pages`, Ordner `out/`): Auf wie vielen Seiten steht ein Tool im sichtbaren Text? Kandidaten sind die 72 Steckbriefe (`db/tools.json`) und die Tools der KI-Tool-Datenbank (`db/kb-tools.json`). Programmdaten nur aus `db/partners.json`, neue Einträge mit offizieller Quelle.

## Kernbefund

- **Keines der 40 meistgenannten Tools ist monetarisiert.** Es gibt genau 6 bestätigte eigene Links (`db/affiliate-links.json`). Davon erscheint nur Systeme.io auf der Website (19 Seiten). GoHighLevel, Insighto AI, Kaiber AI, Okara AI und Tiiny Host werden auf keiner Seite genannt und haben keinen Steckbrief, ihre Links bringen auf mentat.codes derzeit nichts.
- Die Spitze (ChatGPT, Claude, Gemini, Midjourney, Perplexity, Notion, Cursor, DeepSeek) hat kein Geld-Programm oder es ist pausiert. Dort hilft nur, die Leser auf monetarisierbare Alternativen zu lenken.
- Das größte Potenzial liegt bei Tools mit Programm und vielen Nennungen: Make, n8n, Gamma, Synthesia, HeyGen, Canva, ElevenLabs. Eine Anmeldung reicht, Steckbrief, Auto-Verlinkung (`lib/tool-links.js`) und Datenbank greifen dann automatisch.

## Anmeldeliste (Rang nach Nennungen x Provision)

Punkte = Seiten mit Nennung x Provisionsfaktor. Faktor 3: wiederkehrend 12 Monate oder länger, lebenslang oder 100 USD und mehr je Verkauf. Faktor 2: wiederkehrend unter 12 Monaten, nur erste Zahlung oder 25 bis 99 USD fix. Faktor 1: Kleinbeträge oder keine Sätze veröffentlicht. Provision laut `db/partners.json` (dort mit Quelle). Nach der Freischaltung den eigenen Link in `db/affiliate-links.json` mit derselben id eintragen, dann `npm run partners`.

| # | Programm (id) | Seiten | Faktor | Punkte | Provision | Netzwerk | Anmelden |
|---|---|---|---|---|---|---|---|
| 1 | Make (`make`) | 225 | 3 | 675 | 35 % für 12 Monate | eigenes Programm | https://www.make.com/en/affiliate |
| 2 | n8n (`n8n`) | 220 | 3 | 660 | 30 % im ersten Jahr | eigenes Programm | https://n8n.io/affiliates/ |
| 3 | Gamma (`gamma`) | 220 | 3 | 660 | 25 % im ersten Jahr (laut PartnerStack-Verzeichnis) | PartnerStack | https://gammaapp.partnerstack.com/?group=affiliates |
| 4 | Synthesia (`synthesia`) | 163 | 3 | 489 | 25 % für 12 Monate | Rewardful | https://synthesia.getrewardful.com/signup |
| 5 | HeyGen (`heygen`) | 226 | 2 | 452 | 35 % für 3 Monate | Rewardful | https://heygen.getrewardful.com/ |
| 6 | Canva (`canva`) | 220 | 2 | 440 | Monatsabo 80 % der ersten 2 Monate, Jahresabo 25 % einmalig | Impact | https://www.canva.com/help/canva-affiliate-marketing-program/ |
| 7 | ElevenLabs (`elevenlabs`) | 110 | 3 | 330 | 22 % für 12 Monate | PartnerStack | https://elevenlabs.io/affiliates |
| 8 | Taskade (`taskade`, neu) | 99 | 3 | 297 | 50 % lebenslang, PayPal ab 50 USD | eigenes Programm | https://partners.taskade.com/ |
| 9 | Pictory (`pictory`) | 90 | 3 | 270 | bis 50 % wiederkehrend | eigenes Programm | https://partners.pictory.ai/signup/40690 |
| 10 | Descript (`descript`) | 130 | 2 | 260 | 25 USD einmalig je neuem Abo | PartnerStack | https://www.descript.com/affiliate |
| 11 | AI2sql (`ai2sql`, neu) | 130 | 2 | 260 | 30 % auf die ersten 3 Abozahlungen | eigenes Programm (Formular) | https://ai2sql.io/affiliate-program |
| 12 | Semrush (`semrush`) | 80 | 3 | 240 | 100 bis 300 USD je Verkauf, 10 USD je Testkonto | Impact | https://www.semrush.com/lp/affiliate-program/en/ |
| 13 | Lovable (`lovable`) | 112 | 2 | 224 | bis 100 USD je Erstabo | eigenes Programm | https://lovable.dev/partners/affiliates |
| 14 | beehiiv (`beehiiv`) | 72 | 3 | 216 | bis 60 % für 12 Monate | Dub | https://www.beehiiv.com/partners |
| 15 | Brevo (`brevo`) | 69 | 3 | 207 | 100 USD je zahlendem Konto | PartnerStack | https://www.brevo.com/partners/affiliates/ |
| 16 | GetResponse (`getresponse`) | 67 | 3 | 201 | 40 % für 12 Monate | PartnerStack | https://www.getresponse.com/affiliate-programs |
| 17 | Rytr (`rytr`) | 67 | 3 | 201 | 30 % für 12 Monate | eigenes Programm | https://rytr.me/affiliates |
| 18 | Runway (`runway`) | 180 | 1 | 180 | 15 USD je neuem Abonnenten | eigenes Programm | https://runway.com/affiliate-program |
| 19 | Fliki (`fliki`) | 58 | 3 | 174 | 30 % lebenslang | Rewardful | https://affiliates.fliki.ai/signup |
| 20 | Photoroom (`photoroom`, neu) | 85 | 2 | 170 | 20 % auf die erste Abozahlung | Awin | https://ui.awin.com/merchant-profile/121800 |
| 21 | InVideo AI (`invideo-ai`) | 63 | 2 | 126 | 50 % Monats- bzw. 25 % Jahresabo, erste Abrechnung | Impact | https://invideo.io/make/affiliate-program/ |
| 22 | Luma Dream Machine (`luma-dream-machine`) | 59 | 2 | 118 | lebenslang, Satz nicht veröffentlicht | PartnerStack | https://lumalabs.ai/affiliate |
| 23 | Murf (`murf`) | 38 | 3 | 114 | 20 % für 24 Monate | PartnerStack | https://murf.ai/partner-with-us/affiliate |
| 24 | Otter.ai (`otter-ai`) | 111 | 1 | 111 | keine Sätze veröffentlicht | eigenes Programm | https://otter.ai/partner-program |
| 25 | Manus (`manus`) | 103 | 1 | 103 | keine Sätze veröffentlicht | Tapfiliate | https://manus.im/affiliate |

Weitere mit Programm, aber unter 100 Punkten: Kling AI, Jasper, DeepL, QuillBot, CapCut, Surfer SEO, SE Ranking, Writesonic, Framer, Kit, Fireflies.ai, OpusClip, Krea, tl;dv, Tally, Bolt.new (vollständig mit Konditionen in `docs/PARTNERLINKS.md`).

## Bereits monetarisiert (bestätigte eigene Links)

| Programm | id | Seiten mit Nennung | Wirkung auf mentat.codes |
|---|---|---|---|
| Systeme.io | `systeme-io` | 19 | greift über Steckbrief und Auto-Verlinkung |
| GoHighLevel | `gohighlevel` | 0 | kein Steckbrief, keine Nennung |
| Insighto AI | `insighto-ai` | 0 | kein Programm in `db/partners.json`, keine Nennung |
| Kaiber AI | `kaiber-ai` | 0 | kein Steckbrief, nicht in der KI-Tool-Datenbank |
| Okara AI | `okara-ai` | 0 | nicht in der KI-Tool-Datenbank |
| Tiiny Host | `tiiny-host` | 0 | keine Nennung |

## Ohne Geld-Programm (geprüft, kein Link möglich)

ChatGPT, Codex (OpenAI), Claude, Claude Code (nur Guest Passes), Gemini, NotebookLM, Midjourney, DeepSeek, Obsidian (Team lehnt Affiliate ab), GitHub Copilot (nur Technologie-Partnerprogramm, korrigiert), Windsurf (nur Guthaben), Replit (nur Guthaben). Pausiert oder geschlossen: Notion, Perplexity, Cursor, Leonardo AI, v0. Nur auf Einladung: Zapier, Ideogram, Mistral Le Chat. Unklar ohne offizielle Quelle: Suno, Tabnine, OpenRouter, Copy.ai, Wordtune, Elicit (Programmseite seit 2026-11-04 HTTP 404), Microsoft Copilot, Pika. Ohne gefundenes Programm (Web-Suche 2026-11-04): Grok, Agentset, AgentMail, Devin, Hugging Face, Artbreeder, Civitai (Belohnung nur in Buzz), Cogram, AgentGPT, editGPT. ChatPDF: nur ein Drittverzeichnis nennt 30 %, keine offizielle Seite, nicht eingetragen.

## Abdeckung: meistgenannte Tools

Seiten = Anzahl Seiten in `out/` mit Nennung im sichtbaren Text (Groß/Klein ignoriert, außer bei Wörtern wie Make, Gamma, Runway). Steckbrief = eigene Seite unter /tools/. Eigener Link = bestätigter Eintrag in `db/affiliate-links.json`.

| Seiten | Tool | Steckbrief | Programm-id | Geld-Programm | Eigener Link |
|---|---|---|---|---|---|
| 666 | ChatGPT | ja | chatgpt | nein | nein |
| 639 | Claude | ja | claude | nein | nein |
| 581 | Gemini | nein | google-gemini | nein | nein |
| 413 | Copilot | nein | - | kein Eintrag | nein |
| 384 | Notion | ja | notion | pausiert/geschlossen | nein |
| 345 | Perplexity | ja | perplexity | pausiert/geschlossen | nein |
| 294 | Mistral | nein | mistral-le-chat | nur auf Einladung | nein |
| 281 | Midjourney | ja | midjourney | nein | nein |
| 276 | Obsidian | nein | obsidian | nein | nein |
| 268 | Grok | nein | - | kein Eintrag | nein |
| 255 | Cursor | ja | cursor | pausiert/geschlossen | nein |
| 239 | Codex | nein | chatgpt | nein | nein |
| 231 | Suno | ja | suno | unklar | nein |
| 226 | HeyGen | ja | heygen | ja | nein |
| 225 | Make | ja | make | ja | nein |
| 220 | n8n | ja | n8n | ja | nein |
| 220 | Canva | ja | canva | ja | nein |
| 220 | Gamma | ja | gamma | ja | nein |
| 215 | Zapier | ja | zapier | nur auf Einladung | nein |
| 193 | Claude Code | ja | claude-code | nein | nein |
| 183 | GitHub Copilot | ja | github-copilot | nein | nein |
| 180 | Runway | ja | runway | ja | nein |
| 163 | Synthesia | ja | synthesia | ja | nein |
| 157 | Ideogram | ja | ideogram | nur auf Einladung | nein |
| 154 | Replit | ja | replit | ja | nein |
| 145 | Agent Skills | nein | - | kein Eintrag | nein |
| 139 | Tabnine | ja | tabnine | unklar | nein |
| 138 | DeepSeek | ja | deepseek | nein | nein |
| 135 | Leonardo AI | ja | leonardo-ai | pausiert/geschlossen | nein |
| 135 | OpenAI Codex | nein | chatgpt | nein | nein |
| 131 | Agentset | nein | - | kein Eintrag | nein |
| 131 | NotebookLM | nein | notebooklm | nein | nein |
| 130 | Descript | ja | descript | ja | nein |
| 130 | AI2sql | nein | ai2sql | ja | nein |
| 127 | Amazon Q | nein | - | kein Eintrag | nein |
| 127 | Ghostwriter | nein | replit | ja | nein |
| 117 | v0 | ja | v0 | pausiert/geschlossen | nein |
| 114 | Notion AI | nein | notion | pausiert/geschlossen | nein |
| 112 | Lovable | ja | lovable | ja | nein |
| 111 | Otter.ai | ja | otter-ai | ja | nein |
| 110 | ElevenLabs | ja | elevenlabs | ja | nein |
| 103 | Manus | ja | manus | ja | nein |
| 102 | Ollama | nein | - | kein Eintrag | nein |
| 99 | Taskade | ja | taskade | ja | nein |
| 97 | Devin | nein | - | kein Eintrag | nein |

Hinweis: Einträge wie Agent Skills, AGENTS.md oder Ghostwriter sind Begriffe oder mehrdeutige Namen der Datenbank, keine Kaufprodukte. Ghostwriter zählt hier zu Replit.
