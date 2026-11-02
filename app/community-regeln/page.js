import Breadcrumbs from '../components/Breadcrumbs'
import Link from 'next/link'

export const metadata = {
    title: 'Community-Regeln und Meldeweg',
    description: 'Wie wir bei mentat.codes miteinander umgehen: Regeln für Kommentare, Forum und Profile, plus so meldest du Inhalte.',
    alternates: { canonical: '/community-regeln' },
}

const REGELN = [
    ['🤝', 'Freundlich bleiben', 'Kritik an Ideen ja, Angriffe auf Menschen nein. Keine Beleidigungen, keine Diskriminierung, keine Drohungen.'],
    ['🎯', 'Beim Thema bleiben', 'KI-Tools, Verzeichnisse, Prompts, Launches. Off-Topic gern in der passenden Forum-Kategorie.'],
    ['🚫', 'Keine Werbung ohne Kennzeichnung', 'Eigene Tools vorstellen ist willkommen, wenn du es offen sagst. Spam und versteckte Affiliate-Links werden entfernt.'],
    ['🔒', 'Privates bleibt privat', 'Keine Adressen, Telefonnummern oder andere persönliche Daten von dir oder anderen posten.'],
    ['©️', 'Nur eigene oder freie Inhalte', 'Lade nur Bilder und Texte hoch, die du selbst gemacht hast oder nutzen darfst.'],
    ['✅', 'Ehrlich sein', 'Keine erfundenen Erfahrungsberichte, keine gekauften Bewertungen, keine Fake-Konten.'],
    ['⚖️', 'Legal bleiben', 'Nichts Rechtswidriges, keine Anleitungen zu Straftaten, keine Schadsoftware.'],
]

export default function CommunityRegeln() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Community-Regeln' }]} />
            <section className="hero">
                <h1>Community-Regeln 💬</h1>
                <p className="lead">
                    Kommentare, Forum und Profile sollen ein Ort sein, an dem alle gern mitreden. Diese sieben Regeln gelten für alle, auch für uns.
                </p>
            </section>
            <ul className="nf-tipps">
                {REGELN.map(([icon, titel, text]) => (
                    <li key={titel} className="regel-karte">
                        <strong>
                            <span aria-hidden="true">{icon}</span> {titel}
                        </strong>
                        <br />
                        <span>{text}</span>
                    </li>
                ))}
            </ul>
            <h2>So meldest du einen Inhalt</h2>
            <p>
                Unter jedem Kommentar und Beitrag findest du den Knopf <strong>Melden</strong>. Wähle den Grund und schreib kurz, was nicht stimmt.
                Wir prüfen jede Meldung, in der Regel innerhalb von 48 Stunden, und sagen dir Bescheid, was wir entschieden haben. Rechtswidrige Inhalte
                entfernen wir unverzüglich.
            </p>
            <p>
                Ohne Konto erreichst du uns über das <Link href="#anfrage-fehler">Kontaktformular</Link> (Anliegen „Fehler auf der Seite melden“).
            </p>
            <h2>Was bei Verstößen passiert</h2>
            <ol>
                <li>Der Inhalt wird ausgeblendet und du bekommst einen Hinweis mit Begründung.</li>
                <li>Bei wiederholten Verstößen sperren wir das Schreiben für 7 Tage.</li>
                <li>Bei schweren oder dauerhaften Verstößen wird das Konto gesperrt.</li>
            </ol>
            <p>Du kannst jeder Entscheidung über das Kontaktformular widersprechen. Ein Mensch schaut sich das dann noch einmal an.</p>
        </>
    )
}
