// Haupt-FAQ, genutzt von README und Startseite. Eine Quelle, damit beide nie auseinanderlaufen.
const listNames = (names) => names.slice(0, -1).join(', ') + ' und ' + names[names.length - 1]

module.exports = function getFaq(stats) {
    const strongestFree = listNames(stats.topFreeSmooth.slice(0, 5).map((d) => d.name))
    const percents = stats.withDeal.map((d) => parseInt(d.dealText, 10)).filter(Boolean)
    const dealRange = percents.length ? `zwischen ${Math.min(...percents)} und ${Math.max(...percents)} Prozent` : ''

    return [
        {
            q: 'Was ist ein KI-Verzeichnis?',
            a: 'Eine Website, die KI-Tools sammelt, kategorisiert und beschreibt. Nutzer suchen dort gezielt nach Lösungen, Gründer tragen ihr Tool ein, um gefunden zu werden und einen Backlink zu bekommen. Auf Englisch heißt das AI Directory oder AI Tools Directory und klingt gleich viel wichtiger.',
        },
        {
            q: 'Bringen KI-Verzeichnisse wirklich etwas für SEO?',
            a: 'Ja, in Maßen. Die Links sind oft nofollow, stärken aber das Linkprofil, die Markenbekanntheit und die Chance, in KI-Antworten genannt zu werden. Rankings für umkämpfte Keywords holst du damit allein nicht. Sieh Verzeichnisse als Fundament, nicht als Strategie. Auch das beste Fundament gewinnt keinen Schönheitspreis, hält aber das Haus oben.',
        },
        {
            q: 'Wie viele Verzeichnisse sollte ich nutzen?',
            a: 'Für den Launch reichen 20 bis 40 sorgfältig ausgewählte Einträge. Fang mit den kostenlosen, reibungslosen Verzeichnissen mit hoher Domain Rating an und zahle nur dort, wo Traffic und Zielgruppe wirklich passen. Hundert Einträge am Stück machen nicht berühmt, nur müde.',
        },
        {
            q: 'Welche KI-Verzeichnisse sind kostenlos?',
            a: `Aktuell ${stats.free.length} von ${stats.total}. Bei ${stats.freeAndSmooth.length} davon ist die Einreichung außerdem reibungslos. Die stärksten sind ${strongestFree}.`,
        },
        {
            q: 'Wie trage ich mein KI-Tool in ein Verzeichnis ein?',
            a: 'Halte Name, Einzeiler, Beschreibung (100 bis 300 Wörter), Logo, 3 bis 5 Screenshots, Kategorie und Preismodell bereit, dann dauert ein Eintrag 5 bis 10 Minuten (ohne Kaffeepause und ohne Captcha mit Ampeln). Nutz überall denselben Namen und dieselbe Kurzbeschreibung. Das hilft Suchmaschinen und KI-Systemen, dein Tool als eine Marke zu erkennen.',
        },
        {
            q: 'Lohnen sich bezahlte Einträge?',
            a: `Manchmal. Wie bei Currywurst am Bahnhof: Zahl nur, wenn das Verzeichnis echten Traffic aus deiner Zielgruppe hat und der Link dofollow ist. ${stats.withDeal.length ? `Für ${stats.withDeal.length} Verzeichnisse gibt es eigene Rabattcodes ${dealRange}.` : 'Rabattcodes zeigen wir nur, wenn wir sie selbst vereinbart haben.'}`,
        },
        {
            q: 'Wie aktuell sind die Daten?',
            a: 'Domain Rating und Besuche sind Momentaufnahmen und ändern sich. Die Liste ist Open Source auf GitHub: Wenn dir ein toter Link oder ein veralteter Wert auffällt, reicht ein Pull Request. Wir bedanken uns mit einem virtuellen Highfive.',
        },
    ]
}
