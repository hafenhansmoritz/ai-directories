import Link from './NavLink'
import JeanIcon from './JeanIcon'
import TrackerMini from './TrackerMini'
import { getDirectories } from '../../lib/data'
import { getScore } from '../../lib/score'
import { hasStatusIssue } from '../../lib/checks'
import { isDrSuspect } from '../../lib/fresh'
import { getGuides } from '../../lib/guides'
import ToolRoulette from './ToolRoulette'
import { Mutmacher, Glueckskeks } from './HerzWidgets'
import { HeuteSeitenleiste } from './HeuteWidgets'

const KOMPASS = [
    ['/#alle', 'Alle Verzeichnisse', 'lupe', false],
    ['/prompts', 'Prompt-Bibliothek', 'prompt', true],
    ['/prompts/archiv', 'Prompt-Archiv (103 Rollen)', 'prompt', false],
    ['/prompt-baukasten', 'Prompt-Baukasten', 'prompt', false],
    ['/prompt-check', 'Prompt-Check', 'lupe', true],
    ['/skills', 'KI-Skills für alle LLMs', 'werkzeug', true],
    ['/tutorials', 'Tutorials', 'pokal', true],
    ...(getGuides().length ? [['/guides', 'Gratis-Guides (PDF)', 'herz', true]] : []),
    ['/downloads', 'Gratis-Downloads', 'herz', true],
    ['/ki-tools', 'KI-Tool-Datenbank', 'lupe', false],
    ['/ki-tools/fuer', 'KI-Tools nach Zielgruppe', 'werkzeug', true],
    ['/ki-tools/alternativen', 'Tool-Alternativen', 'lupe', true],
    ['/tool-finder', 'Tool-Finder (3 Fragen)', 'rakete', true],
    ['/ki-test', 'KI-Test: Chatbots vergleichen', 'pokal', true],
    ['/rechner', 'KI-Rechner', 'deal', false],
    ['/tools', 'KI-Tools mit Preisen', 'werkzeug', false],
    ['/tool-vergleiche', 'Tool-Vergleiche', 'pokal', true],
    ['/top-50', 'Top 50 Verzeichnisse', 'herz', false],
    ['/liste/rabattcodes', 'Deals', 'deal', false],
    ['/launch-kit', 'Launch-Kit', 'rakete', false],
    ['/freischaltung', 'Freischaltung & Sperren', 'strahlung', false],
    ['/quiz', 'Quiz', 'pokal', false],
    ['/ratgeber', 'Ratgeber', 'post', false],
    ['/glossar', 'KI-Glossar', 'post', true],
    ['/merkliste', 'Deine Merkliste', 'herz', true],
    ['/ueber-jean', 'Über Jean', 'tattoo', true],
]

function Widget({ icon, cool, title, children }) {
    return (
        <section className="widget">
            <p className="widget-title">
                <JeanIcon badge={icon} cool={cool} size={34} />
                <span>{title}</span>
            </p>
            {children}
        </section>
    )
}

export function SidebarLeft() {
    const directories = getDirectories()
    const top = directories
        .filter((d) => d.pricing === 'Free' && d.submission_experience === 'Good' && !hasStatusIssue(d.slug) && !isDrSuspect(d))
        .map((d) => ({ ...d, score: getScore(d).total }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    return (
        <>
            <Widget icon="lupe" title="Jeans Kompass">
                <ul className="kompass">
                    {KOMPASS.map(([href, label, icon, cool]) => (
                        <li key={href}>
                            <Link href={href}>
                                <JeanIcon badge={icon} cool={cool} size={26} />
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Widget>
            <Widget icon="pokal" title="Dein Fortschritt">
                <TrackerMini total={directories.length} />
            </Widget>
            <Widget icon="herz" title="Jeans Gratis-Top-3">
                <ol className="widget-list">
                    {top.map((d) => (
                        <li key={d.slug}>
                            <Link href={`/verzeichnis/${d.slug}`}>{d.name}</Link> <span className="score-pill" style={{ '--score': d.score }}>{d.score}</span>
                        </li>
                    ))}
                </ol>
            </Widget>
        </>
    )
}

// Rechte Seitenleiste. Deal, Prompt und Tool des Tages kommen aus /heute.json (siehe HeuteWidgets), damit das HTML stabil bleibt.
// Kein eigener YouTube-Kasten: Die Abo-Box steht schon unter jedem Inhalt (LeadBox), eine pro Seite reicht.
export function SidebarRight() {
    return (
        <>
            <HeuteSeitenleiste />
            <Widget icon="herz" cool title="Mutmacher des Tages">
                <Mutmacher />
            </Widget>
            <Widget icon="strahlung" title="KI-Tool-Roulette">
                <ToolRoulette />
            </Widget>
            <Widget icon="pokal" title="Dein Glückskeks">
                <Glueckskeks />
            </Widget>
            <Widget icon="rakete" title="Launch-Service">
                <p>Keine Zeit für 50 Formulare? Wir tragen dein Tool ein.</p>
                <Link className="button button-small" href="/werben">
                    Eintrags-Service und Preise ansehen →
                </Link>
            </Widget>
        </>
    )
}

// Schnellzugriff unten auf Handy und Tablet. Die Merkliste statt des Abo-Links: Gespeichertes muss mit einem Tipp erreichbar sein.
export function MobileDock() {
    return (
        <nav className="mobile-dock a-dock" aria-label="Schnellzugriff">
            <Link href="/#alle">
                <JeanIcon badge="lupe" size={28} />
                <span>Liste</span>
            </Link>
            <Link href="/ki-tools">
                <JeanIcon badge="werkzeug" size={28} />
                <span>KI-Tools</span>
            </Link>
            <Link href="/prompts">
                <JeanIcon badge="prompt" size={28} />
                <span>Prompts</span>
            </Link>
            <Link href="/launch-kit">
                <JeanIcon badge="rakete" size={28} />
                <span>Launch</span>
            </Link>
            <Link href="/merkliste">
                <JeanIcon cool badge="herz" size={28} />
                <span>Merkliste</span>
            </Link>
        </nav>
    )
}
