const getDirectoriesList = require('../get-directories-list')
const getStats = require('../stats')
const { createTable, createDealTable } = require('./create-tables')
const writeToFile = require('../write-to-file')
const getFaq = require('../faq-de')

const directoriesList = getDirectoriesList()
const stats = getStats(directoriesList)

const faq = getFaq(stats)
    .map((item) => `### ${item.q}\n${item.a}`)
    .join('\n\n')

const month = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' }).format(new Date())

const header = `<p align="center"><img src="./assets/icon.svg" width="48" height="48" alt="KI-Verzeichnisse Logo"></p>

# KI-Verzeichnisse: ${stats.total} AI Directories, in die du dein KI-Tool eintragen kannst

**Kurz gesagt:** Das ist eine gepflegte Liste mit ${stats.total} KI-Verzeichnissen, Startup-Plattformen und Launch-Seiten. Zu jedem Eintrag stehen Domain Rating, geschätzte Besuche pro Monat, ob der Eintrag kostenlos ist und wie reibungslos die Einreichung läuft. ${stats.free.length} davon kosten nichts, bei ${stats.freeAndSmooth.length} ist der Eintrag kostenlos **und** unkompliziert.

Stand: ${month} · Daten als JSON: [\`db/directories.json\`](db/directories.json)

---
> ❗️ Diese \`README.md\` und der Ordner \`/db\` werden automatisch erzeugt. Bitte nicht direkt bearbeiten. Änderungen an Verzeichnissen gehören in den Ordner \`/directories\`, siehe [Mitmachen](CONTRIBUTING.md).
---

## Inhalt

- [Warum KI-Verzeichnisse?](#warum-ki-verzeichnisse)
- [Top 10 nach Domain Rating](#top-10-nach-domain-rating)
- [Top 10: kostenlos und reibungslos](#top-10-kostenlos-und-reibungslos)
- [Rabattcodes für bezahlte Einträge](#rabattcodes-für-bezahlte-einträge)
- [Alle ${stats.total} KI-Verzeichnisse](#alle-ki-verzeichnisse)
- [So liest du die Tabelle](#so-liest-du-die-tabelle)
- [Häufige Fragen](#häufige-fragen)

## Warum KI-Verzeichnisse?

Wer ein KI-Tool launcht, hat am Anfang drei Probleme: keine Backlinks, keine Sichtbarkeit, keine ersten Nutzer. Verzeichnisse lösen keins davon komplett, aber sie bringen dir in ein paar Stunden Arbeit eine Handvoll themenrelevanter Links, erste Referral-Klicks und Nennungen, die auch KI-Suchen wie ChatGPT, Perplexity oder Google AI Overviews aufgreifen. Aus SEO-Sicht gilt trotzdem: lieber 20 passende Verzeichnisse mit echtem Traffic als 200 Linkfriedhöfe.

`

const sections = `## Top 10 nach Domain Rating

Die stärksten Domains der Liste. Hier lohnt sich ein sauber ausgefülltes Profil mit guten Screenshots am meisten.

${createTable(stats.topByRating)}

## Top 10: kostenlos und reibungslos

Mein Startpunkt, wenn das Budget bei null liegt: kostenlos, Einreichung ohne Stolpersteine, sortiert nach Domain Rating.

${createTable(stats.topFreeSmooth)}

${
    stats.withDeal.length
        ? `## Eigene Rabattcodes für bezahlte Einträge

${stats.withDeal.length} Verzeichnisse geben mit unserem eigenen Code einen Rabatt. Code beim Checkout eintragen, ob er noch gilt, entscheidet der Anbieter.

${createDealTable(stats.withDeal)}
`
        : ''
}
## Alle KI-Verzeichnisse

Alphabetisch sortiert, ${stats.total} Einträge.

${createTable(directoriesList)}
`

const footer = `
## So liest du die Tabelle

- **Domain Rating (DR):** Ahrefs-Wert von 0 bis 100 für die Linkstärke einer Domain. Ab etwa 50 wird es für ein junges Tool richtig interessant.
- **Besuche/Monat:** geschätzter Traffic der Verzeichnis-Domain. Ein Richtwert, keine Garantie für Klicks auf deinen Eintrag.
- **Einreichung:** 🟢 Reibungslos heißt, das Formular funktioniert und der Eintrag geht ohne Umwege live. 🔴 Hakelig heißt: Formular kaputt, nur per E-Mail, lange Wartezeit oder Pflicht-Backlink.
- **Preis:** 🟢 Kostenlos oder 🔴 Kostenpflichtig. Viele kostenlose Verzeichnisse bieten zusätzlich bezahlte Featured-Plätze an.

## Häufige Fragen

${faq}

## Mitmachen

Neues Verzeichnis gefunden oder einen Wert korrigiert? Lies den [Leitfaden fürs Mitmachen](CONTRIBUTING.md).
`

async function updateReadme() {
    try {
        await writeToFile({
            data: header + sections + footer,
            filePath: './README.md',
        })
    } catch (error) {
        throw new Error(error)
    }
}

updateReadme()
