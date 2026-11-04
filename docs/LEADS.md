# Leads: E-Mails einsammeln und Downloads verteilen

## Der einfachste Weg zu E-Mails (ohne Server, ohne Cookie-Banner)

1. Newsletter **PromptGott** anlegen. Gewählt ist Brevo (Formular mit Double-Opt-in unter Kontakte → Formulare); beehiiv oder Substack funktionieren ebenfalls.
2. Im GitHub-Repo unter Settings → Secrets and variables → Actions → Variables die Variable `NEWSLETTER_URL` anlegen (der Pages-Workflow reicht sie als `NEXT_PUBLIC_NEWSLETTER_URL` an den Build weiter, siehe `.env.example`):
   - Brevo: die Formular-URL `https://….sibforms.com/serve/…`. Sie wird direkt verlinkt (ohne `/subscribe`), und /datenschutz zeigt automatisch den Brevo-Abschnitt.
   - Substack/beehiiv: Adresse des Newsletters, z. B. `https://promptgott.substack.com`
   - nur bei beehiiv zusätzlich `NEXT_PUBLIC_NEWSLETTER_EMBED`: Embed-URL aus *Grow → Subscribe Forms*
3. Ab dem nächsten Build zeigen alle Lead-Bausteine das eingebettete Formular (Substack: automatisch `/embed`). Double-Opt-in, Abmeldelink und Speicherung erledigt der Anbieter, also auch der DSGVO-Nachweis.
4. In der **Willkommensmail** die Links zu den gesperrten Downloads eintragen (Tabelle unten, Spalte „gesperrt“).
5. Datenschutzerklärung um den Newsletter-Anbieter ergänzen (gehört zur Aufgabe Impressum/Datenschutz).

## Downloads und wo sie stehen

| Download | Datei | gesperrt nach Newsletter-Start | steht auf |
|---|---|---|---|
| Prompt-Spickzettel | `/downloads/prompt-spickzettel` (Drucken → PDF) | nein, bewusst frei: wird geteilt und verlinkt | Tutorials-Übersicht, Prompt-Baukasten, Prompt-Check, Downloads |
| Prompt-Paket | `/downloads/prompt-paket.md` (wächst mit der Bibliothek) | ja | jede Prompt-Seite, Tutorial „Prompt-Kette“, Downloads |
| Top 50 KI-Verzeichnisse | `/top-50.csv` | ja | /top-50, Downloads |

Steuerung zentral in `lib/leadmagnets.js` (`gated: true/false`).

## Lead-Bausteine auf der Seite

- `LeadBox`: unter jeder Seite (Layout).
- `LeadMagnetBox`: Content-Upgrade passend zur Seite.
- `SlideInLead`: gleitet nach 55 % Lesestrecke herein, einmal pro Sitzung, schließbar (Tutorials, Prompt-Seiten).
- `EmailCapture`: das eigentliche Formular, ohne Newsletter Fallback auf YouTube-Abo.

## Nächste Lead-Magnete (Roadmap)

- 100-Prompts-Paket als gestaltetes PDF (sobald 50+ Prompts online sind)
- Launch-Checkliste Pro (für Gründer, passt zu Verzeichnissen und Launch-Kit)
- Notion-Vorlage „Prompt-Bibliothek“ zum Duplizieren
- Rechner-Ergebnis per Mail (ROI-Rechner)
