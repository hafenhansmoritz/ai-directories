# Leads: E-Mails einsammeln und Downloads verteilen

## Der einfachste Weg zu E-Mails (ohne Server, ohne Cookie-Banner)

1. Newsletter **PromptGott** läuft auf Substack: https://promptgott.substack.com. Diese Adresse ist der Fallback in `lib/monetization.js`, alle Lead-Bausteine verlinken ohne weitere Einstellung auf `/subscribe` (reiner Link, kein iframe).
2. Nur für eine andere Adresse: im GitHub-Repo unter Settings → Secrets and variables → Actions → Variables die Variable `NEWSLETTER_URL` anlegen (der Pages-Workflow reicht sie als `NEXT_PUBLIC_NEWSLETTER_URL` an den Build weiter, siehe `.env.example`):
   - Brevo: die Formular-URL `https://….sibforms.com/serve/…`. Sie wird direkt verlinkt (ohne `/subscribe`), und /datenschutz zeigt automatisch den Brevo-Abschnitt.
   - Substack/beehiiv: Adresse des Newsletters, z. B. `https://promptgott.substack.com`
   - nur bei beehiiv zusätzlich `NEXT_PUBLIC_NEWSLETTER_EMBED`: Embed-URL aus *Grow → Subscribe Forms*
3. Ab dem nächsten Build verlinken alle Lead-Bausteine die Anmeldeseite. Ein eingebettetes Formular gibt es nur mit ausdrücklich gesetztem `NEXT_PUBLIC_NEWSLETTER_EMBED`; dann /datenschutz anpassen. Double-Opt-in, Abmeldelink und Speicherung erledigt der Anbieter.
4. Downloads sind standardmäßig frei, daneben steht „PromptGott abonnieren“. Die Sperre (Tabelle unten, Spalte „gesperrt“) greift nur mit Repository-Variable `NEWSLETTER_GATE` = `1` (Build-Variable `NEXT_PUBLIC_NEWSLETTER_GATE`). Vorher in der **Willkommensmail** die Links zu den gesperrten Downloads eintragen und mit einer Testanmeldung prüfen, sonst gehen Abonnenten leer aus.
5. /datenschutz zeigt den passenden Newsletter-Abschnitt automatisch (Substack, Brevo oder allgemein).

## Downloads und wo sie stehen

| Download | Datei | gesperrt mit NEWSLETTER_GATE=1 | steht auf |
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
