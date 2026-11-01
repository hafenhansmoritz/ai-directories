import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import Faq, { faqSchema } from '../components/Faq'
import Toc from '../components/Toc'
import { Band, Trenner } from '../components/Deko'
import { SITE_NAME } from '../../lib/site'
import { getSiteStats } from '../../lib/data'
import { getTop50 } from '../../lib/top50'
import { pricingLabel } from '../../utils/i18n-de'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

const FAQ = [
    {
        q: 'Was ist ein KI-Verzeichnis?',
        a: 'Ein KI-Verzeichnis (englisch AI Directory) ist eine Website, die KI-Tools sammelt, beschreibt und nach Kategorien ordnet. Nutzer finden dort neue Tools, Anbieter tragen ihr Tool ein, um Sichtbarkeit, Besucher und Backlinks zu bekommen.',
    },
    {
        q: 'Lohnt sich ein Eintrag in KI-Verzeichnisse?',
        a: 'Für neue KI-Tools ja, wenn du gezielt auswählst: Verzeichnisse mit hohem Domain Rating, echtem Traffic und reibungsloser Einreichung bringen Links, erste Nutzer und Nennungen, die auch KI-Assistenten aufgreifen. Hunderte schwache Verzeichnisse bringen dagegen wenig.',
    },
    {
        q: 'Was kostet ein Eintrag?',
        a: 'Viele Verzeichnisse sind kostenlos, manche verlangen eine Gebühr für den Eintrag oder einen hervorgehobenen Platz. In der AIGeddon-Liste siehst du Preis und Domain Rating je Verzeichnis, dazu eigene Rabattcodes, wo wir welche vereinbart haben.',
    },
    {
        q: 'Wie viele KI-Verzeichnisse gibt es?',
        a: 'Hunderte, und es kommen ständig neue dazu. AIGeddon bewertet die relevanten mit Domain Rating, Traffic, Preis und einem Einreichungs-Check.',
    },
]

export const metadata = {
    title: 'KI-Verzeichnis: Was es ist und welche sich lohnen',
    description: 'Was ist ein KI-Verzeichnis, welche Arten gibt es und woran erkennst du ein gutes? Mit Kriterien, Top 10 nach Jean-Score und Liste aller geprüften AI Directories.',
    alternates: { canonical: '/ki-verzeichnis' },
}

function KiVerzeichnis() {
    const stats = getSiteStats()
    const top = getTop50().slice(0, 10)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Verzeichnis', path: '/ki-verzeichnis' },
    ]
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(FAQ)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Ratgeber · {stats.total} Verzeichnisse geprüft</p>
                <h1>KI-Verzeichnis: Was es ist und welche sich wirklich lohnen</h1>
                <p className="lead">
                    Ein KI-Verzeichnis sammelt KI-Tools und macht sie auffindbar. Für Nutzer ist es ein Schaufenster, für Gründer ein Launch-Kanal. Hier steht, woran du gute Verzeichnisse erkennst, und welche vorn liegen.
                </p>
            </section>
            <Toc items={[['was', 'Was ist das?'], ['arten', 'Arten'], ['kriterien', 'Kriterien'], ['top10', 'Top 10'], ['faq', 'FAQ']]} />
            <section aria-labelledby="was">
                <h2 id="was">Was ist ein KI-Verzeichnis?</h2>
                <p>
                    Ein KI-Verzeichnis, englisch AI Directory, ist eine Website, die KI-Tools sammelt, kurz beschreibt und nach Kategorien, Preis oder Anwendungsfall ordnet. Nutzer entdecken dort neue Werkzeuge. Anbieter tragen ihr Tool ein und bekommen dafür Sichtbarkeit, Besucher und meist einen Link auf ihre Website.
                </p>
                <p className="box box-info">
                    Zwei Seiten derselben Medaille: Wer <strong>KI-Tools sucht</strong>, findet sie in der <Link href="/ki-tools">KI-Tool-Datenbank</Link>. Wer ein <strong>KI-Tool eintragen</strong> will, findet die passenden Verzeichnisse in der <Link href="/#alle">Liste aller {stats.total} KI-Verzeichnisse</Link>.
                </p>
            </section>
            <Band farbe="lila" id="arten" titel="Die vier Arten von KI-Verzeichnissen">
                <ul className="steps-row">
                    <li>
                        <strong>Große internationale Verzeichnisse</strong>
                        <span>Viel Traffic und hohes Domain Rating, oft mit Warteliste oder Gebühr.</span>
                    </li>
                    <li>
                        <strong>Launch-Plattformen</strong>
                        <span>Tages-Rankings und Abstimmungen, ideal für einen Launch-Tag.</span>
                    </li>
                    <li>
                        <strong>Nischen-Verzeichnisse</strong>
                        <span>Für bestimmte Branchen oder Aufgaben, wenig Traffic, aber passende Besucher.</span>
                    </li>
                    <li>
                        <strong>Deutschsprachige Verzeichnisse</strong>
                        <span>Wichtig für den DACH-Markt. <Link href="/deutsche-ki-verzeichnisse">Zur Liste →</Link></span>
                    </li>
                </ul>
            </Band>
            <section aria-labelledby="kriterien">
                <h2 id="kriterien">Woran du ein gutes KI-Verzeichnis erkennst</h2>
                <ol className="checklist">
                    <li>
                        <strong>Domain Rating ab etwa 50</strong>: Dann hat ein Link echtes Gewicht.
                    </li>
                    <li>
                        <strong>Echter Traffic</strong>: Besucher sind wichtiger als ein schönes Design.
                    </li>
                    <li>
                        <strong>Reibungslose Einreichung</strong>: funktionierendes Formular, absehbare Freischaltung. <Link href="/freischaltung">Freischaltdauer prüfen →</Link>
                    </li>
                    <li>
                        <strong>Ehrlicher Preis</strong>: kostenlos oder mit fairem Preis; bei Bezahlung nach dofollow fragen.
                    </li>
                    <li>
                        <strong>Passendes Thema</strong>: Ein Verzeichnis für deine Zielgruppe schlägt ein allgemeines.
                    </li>
                </ol>
                <p className="box box-tipp">
                    Wie lange der Launch dauert, rechnet dir der <Link href="/rechner/launch-zeit">Launch-Zeit-Rechner</Link> aus; die Texte erzeugt das <Link href="/launch-kit">Launch-Kit</Link>.
                </p>
            </section>
            <Band farbe="gelb" id="top10" titel="🏆 Top 10 nach Jean-Score">
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Verzeichnis</th>
                                <th>Jean-Score</th>
                                <th>Domain Rating</th>
                                <th>Preis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top.map((d, i) => (
                                <tr key={d.slug}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <Link href={`/verzeichnis/${d.slug}`}>{d.name}</Link>
                                    </td>
                                    <td>{d.score}</td>
                                    <td>{d.domain_rating}</td>
                                    <td>{pricingLabel(d.pricing)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p>
                    <Link href="/top-50">Alle Top 50 →</Link> · <Link href="/#alle">Alle {stats.total} KI-Verzeichnisse →</Link>
                </p>
            </Band>
            <Trenner art="zickzack" farbe="mint" />
            <Band farbe="pink" id="faq" titel="Fragen zum KI-Verzeichnis 🙋">
                <Faq items={FAQ} />
            </Band>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <KiVerzeichnis />
            <Vernetzt pfad={seitenPfad('/ki-verzeichnis')} />
        </>
    )
}
