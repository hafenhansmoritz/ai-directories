import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { SITE_NAME } from '../../lib/site'
import { CONTACT_EMAIL, mailto } from '../../lib/monetization'
import { getSiteStats } from '../../lib/data'
import { kbStats } from '../../lib/kb'
import { getTools } from '../../lib/tools'
import Faq, { faqSchema } from '../components/Faq'
import { Band } from '../components/Deko'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'Werben auf mentat.codes: Featured-Platz & Launch-Service',
    description:
        'Für Betreiber von KI-Verzeichnissen und KI-Tools: Featured-Platz, geprüftes Profil, Newsletter- und YouTube-Sponsoring oder der Launch-Service, bei dem wir dein Tool in die passenden Verzeichnisse eintragen.',
    alternates: { canonical: '/werben' },
}

const OFFERS = [
    {
        name: 'Launch-Service',
        for: 'Für Gründer',
        text: 'Wir tragen dein KI-Tool in die passenden Verzeichnisse ein: Auswahl nach Jean-Score, Texte auf Deutsch und Englisch, Screenshots, Tracking-Links und ein Protokoll, wo du gelistet bist.',
        anliegen: 'tool-eintragen',
        liste: ['Auswahl der passenden Verzeichnisse nach Jean-Score', 'Texte auf Deutsch und Englisch', 'Screenshots und Logo im richtigen Format', 'Tracking-Links mit UTM-Parametern', 'Protokoll: wo eingereicht, wo freigeschaltet'],
    },
    {
        name: 'Featured-Platz',
        for: 'Für Verzeichnisse',
        text: 'Dein Verzeichnis oben in den passenden Listen und auf thematisch nahen Detailseiten, klar als Anzeige gekennzeichnet.',
        anliegen: 'werbung',
        liste: ['Platz oben in thematisch passenden Listen', 'Hinweis auf nahen Detailseiten', 'immer als Anzeige gekennzeichnet'],
    },
    {
        name: 'Geprüftes Profil',
        for: 'Für Verzeichnisse',
        text: 'Wir prüfen Freischaltdauer, Link-Typ und Ablauf mit Beleg und zeigen das Ergebnis auf deiner Detailseite. Das Urteil kaufst du nicht, nur die Prüfung.',
        anliegen: 'werbung',
        liste: ['Freischaltdauer mit Beleg', 'Link-Typ (dofollow oder nofollow)', 'Ablauf der Einreichung', 'Ergebnis auf deiner Detailseite'],
    },
    {
        name: 'Newsletter- und YouTube-Sponsoring',
        for: 'Für KI-Tools',
        text: 'Erwähnung im mentat.codes Briefing oder ein Use-Case-Video auf dem YouTube-Kanal, für Tools, die wir selbst sinnvoll finden.',
        anliegen: 'werbung',
        liste: ['nur für Tools, die wir selbst sinnvoll finden', 'als Sponsoring gekennzeichnet'],
    },
]

const ABLAUF = [
    ['✉️', 'Anfrage', 'Du schreibst über das Formular, worum es geht. Ein Satz reicht für den Anfang.'],
    ['☎️', 'Abstimmung', 'Jean meldet sich per Mail, klärt Ziel, Umfang und Zeitplan und schickt ein konkretes Angebot.'],
    ['🛠️', 'Umsetzung', 'Einträge, Prüfung oder Platzierung werden umgesetzt. Bei Einträgen dokumentiert, Schritt für Schritt.'],
    ['📋', 'Bericht', 'Du bekommst ein Protokoll: was eingereicht, was freigeschaltet, wo dein Tool jetzt steht.'],
]

const NICHT = [
    ['🚫', 'Keine gekauften Urteile', 'Jean-Score, Bewertungen und „Finger weg“-Liste sind nicht verkäuflich. Auch nicht für viel Geld. Auch nicht für Pizza.'],
    ['🏷️', 'Keine versteckte Werbung', 'Bezahlte Plätze und Partnerlinks sind gekennzeichnet. Wie das funktioniert, steht unter Transparenz.'],
    ['📉', 'Keine Ranking-Versprechen', 'Niemand kann Platz 1 bei Google garantieren. Wer das tut, verkauft dir etwas anderes als SEO.'],
]

const FAQ = [
    { q: 'Was kostet der Launch-Service?', a: 'Das hängt davon ab, wie viele Verzeichnisse und Sprachen du brauchst und ob bezahlte Einträge dabei sind. Nach deiner Anfrage bekommst du ein konkretes Angebot, ohne Verpflichtung.' },
    { q: 'In welche Verzeichnisse wird mein Tool eingetragen?', a: 'In die, die zu deinem Tool und Budget passen. Grundlage sind Jean-Score, Domain Rating, Besuche und Erfahrung mit der Einreichung aus der Liste auf dieser Seite. Kostenlose Einträge mit guter Erfahrung kommen zuerst.' },
    { q: 'Kann ich eine bessere Bewertung kaufen?', a: 'Nein. Bezahlt wird für Sichtbarkeit oder Arbeit, nie für ein Urteil. Ein Featured-Platz ist als Anzeige gekennzeichnet und ändert nichts an Score oder Einschätzung.' },
    { q: 'Wie schnell meldet sich Jean?', a: 'In der Regel innerhalb von zwei Werktagen per Mail an die Adresse aus dem Formular.' },
    { q: 'Gibt es eine Garantie für Backlinks oder Rankings?', a: 'Nein. Ob ein Verzeichnis einen Eintrag freischaltet und ob der Link dofollow ist, entscheidet der Betreiber. Wir dokumentieren den Stand und sagen ehrlich, was realistisch ist.' },
]

function AdvertisePage() {
    const stats = getSiteStats()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Werben', path: '/werben' },
    ]
    const kb = kbStats()
    const profile = getTools().length
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(FAQ)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Für Gründer, Verzeichnisse und KI-Tools 💼</p>
                <h1>Mit mentat.codes arbeiten</h1>
                <p className="lead">
                    Hier landen Gründer, die gerade ein KI-Tool launchen und {stats.total} Verzeichnisse vergleichen. Genau
                    dann suchen sie Reichweite, Werkzeuge und jemanden, der ihnen die Einreichungen abnimmt.
                </p>
                <Jean>Bezahlt wird für Sichtbarkeit, nie für ein besseres Urteil. Sonst wäre ich ja Influencer.</Jean>
            </section>
            <dl className="facts">
                <div>
                    <dt>KI-Verzeichnisse in der Liste</dt>
                    <dd>{stats.total}</dd>
                </div>
                <div>
                    <dt>davon kostenlos</dt>
                    <dd>{stats.free.length}</dd>
                </div>
                <div>
                    <dt>KI-Tools in der Datenbank</dt>
                    <dd>{kb.gesamt}</dd>
                </div>
                <div>
                    <dt>Steckbriefe mit Preisen</dt>
                    <dd>{profile}</dd>
                </div>
            </dl>
            <section aria-labelledby="angebote">
                <h2 id="angebote">Was du buchen kannst 🧰</h2>
                <ul className="angebote">
                    {OFFERS.map((o) => (
                        <li key={o.name}>
                            <span className="angebot-fuer">{o.for}</span>
                            <h3>{o.name}</h3>
                            <p>{o.text}</p>
                            <ul>
                                {o.liste.map((l) => (
                                    <li key={l}>{l}</li>
                                ))}
                            </ul>
                            <a className="button" href={`#anfrage-${o.anliegen}`}>
                                Anfragen →
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
            <p className="box box-info" id="kontakt">
                Lieber direkt per Mail? Schreib an <a href={mailto('Anfrage über mentat.codes/werben')}>{CONTACT_EMAIL}</a>, ein Satz zu deinem Tool oder Verzeichnis reicht.
            </p>
            <Band farbe="mint" id="ablauf" titel="So läuft die Zusammenarbeit 🤝" sticker="4 Schritte">
                <ol className="kriterien-grid">
                    {ABLAUF.map(([icon, titel, text]) => (
                        <li key={titel}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {icon}
                            </span>
                            <strong>{titel}</strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ol>
            </Band>
            <section aria-labelledby="nicht">
                <h2 id="nicht">Was es hier nicht zu kaufen gibt 🙅</h2>
                <ul className="kriterien-grid">
                    {NICHT.map(([icon, titel, text]) => (
                        <li key={titel}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {icon}
                            </span>
                            <strong>{titel}</strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <section aria-labelledby="faq">
                <h2 id="faq">Fragen vor der Anfrage 🙋</h2>
                <Faq items={FAQ} />
            </section>
            <p>
                Wie wir Geld verdienen und was das für Bewertungen bedeutet, steht unter{' '}
                <Link href="/transparenz">Transparenz</Link>.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <AdvertisePage />
            <Vernetzt pfad={seitenPfad('/werben')} />
        </>
    )
}
