import Link from './components/NavLink'
import Jean from './components/Jean'
import { Glueckskeks } from './components/HerzWidgets'
import { WinkeRoboter } from './components/HerzIcons'
import { IdeeBox } from './components/HerzBoxen'
import { withBase } from '../lib/site'

// Fehlerseite: nicht in den Index, eigener Titel.
export const metadata = {
    title: 'Seite nicht gefunden',
    robots: { index: false, follow: true },
}

const TIPPS = [
    ['/#alle', '📇', 'Alle KI-Verzeichnisse', 'Die ganze Liste mit Score, Preis und Freischaltung'],
    ['/ki-tools', '🗂️', 'KI-Tool-Datenbank', 'Tools nach Aufgabe, mit Suche'],
    ['/ki-news', '📰', 'KI-News', 'Was diese Woche wirklich wichtig ist'],
    ['/prompts', '💬', 'Prompt-Bibliothek', 'Fertige Prompts zum Kopieren'],
    ['/ratgeber', '📖', 'Ratgeber', 'Verständlich erklärt, ohne Fachchinesisch'],
    ['/merkliste', '⭐', 'Deine Merkliste', 'Alles, was du dir gemerkt hast'],
    ['/', '🏠', 'Zur Startseite', 'Alles auf einen Blick'],
]

export default function NotFound() {
    return (
        <>
            <section className="hero">
                <WinkeRoboter size={110} className="nf-roboter" />
                <p className="error-code">
                    4<span className="nf-geist" aria-hidden="true">👻</span>4
                </p>
                <h1>Dieses Verzeichnis ist im Linkfriedhof gelandet</h1>
                <p className="lead">Die Seite gibt es nicht (mehr). Such hier nach einem Tool oder nimm einen der Wege unten.</p>
                <form className="a-nf-suche" action={withBase('/ki-tools/')} method="get" role="search">
                    <label htmlFor="nf-q">KI-Tool suchen</label>
                    <input id="nf-q" name="q" type="search" placeholder="z. B. Bildgenerator" />
                    <button type="submit" className="button button-small">
                        Suchen
                    </button>
                </form>
            </section>
            <h2>Hier geht es weiter</h2>
            <ul className="nf-tipps">
                {TIPPS.map(([href, emoji, titel, text]) => (
                    <li key={href}>
                        <Link href={href}>
                            <span aria-hidden="true">{emoji}</span> {titel}
                            <br />
                            <span className="widget-note">{text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Jean>Ich hab hier auch nichts gefunden. Und ich finde sonst alles, sogar Backlinks auf Seite 7. Nimm einen der Wege oben, die sind frisch geteert.</Jean>
            <h2>Trostpflaster</h2>
            <p>Wenn schon die Seite fehlt, dann wenigstens ein Glückskeks:</p>
            <Glueckskeks />
            <IdeeBox />
        </>
    )
}
