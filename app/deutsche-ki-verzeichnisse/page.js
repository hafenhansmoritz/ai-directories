import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Faq, { faqSchema } from '../components/Faq'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { PriceBadge } from '../components/Badges'
import { DACH, DACH_STAND } from '../../lib/dach'
import { formatNumber } from '../../utils/i18n-de'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: `Deutsche KI-Verzeichnisse: ${DACH.length} Portale für den DACH-Raum`,
    description: `${DACH.length} deutschsprachige KI-Tool-Verzeichnisse mit Einreichungslink, Authority Score, organischem Traffic in Deutschland und Prüfkriterien wie DSGVO und AVV. Stand ${DACH_STAND}.`,
    alternates: { canonical: '/deutsche-ki-verzeichnisse' },
    openGraph: { url: '/deutsche-ki-verzeichnisse' },
}

const FAQ = [
    {
        q: 'Lohnen sich deutsche KI-Verzeichnisse überhaupt?',
        a: 'Für Tools, die sich an Nutzer in Deutschland, Österreich und der Schweiz richten, ja. Die Domains sind kleiner als die großen englischen Verzeichnisse, dafür ist das Publikum genau das richtige, und viele prüfen DSGVO und Serverstandort. Das ist für deutsche Unternehmen oft das Kaufargument.',
    },
    {
        q: 'Warum steht hier Authority Score statt Domain Rating?',
        a: 'Die Zahlen für die deutschen Verzeichnisse stammen von Semrush. Semrush misst die Linkstärke mit dem Authority Score, Ahrefs mit dem Domain Rating. Beide Skalen gehen von 0 bis 100, sind aber nicht direkt vergleichbar. Innerhalb dieser Liste lässt sich der Score gut vergleichen.',
    },
    {
        q: 'Was sollte ich für deutsche Verzeichnisse vorbereiten?',
        a: 'Eine deutsche Kurz- und Langbeschreibung, Angaben zum Serverstandort, einen Link zur Datenschutzerklärung und, wenn vorhanden, zum Auftragsverarbeitungsvertrag (AVV). Mehrere Portale fragen genau danach und bewerten Tools besser, die es offen angeben.',
    },
]

function DachPage() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Deutsche KI-Verzeichnisse', path: '/deutsche-ki-verzeichnisse' },
    ]
    const sorted = [...DACH].sort((a, b) => b.authority - a.authority || b.traffic - a.traffic)
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Deutschsprachige KI-Verzeichnisse',
            numberOfItems: sorted.length,
            itemListElement: sorted.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.name, url: d.link })),
        },
        faqSchema(FAQ),
    ]

    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Made in DACH 🇩🇪 🇦🇹 🇨🇭</p>
                <h1>Deutsche KI-Verzeichnisse: {DACH.length} Portale, die deutschsprachige Nutzer erreichen</h1>
                <p className="lead">
                    <strong>Kurz gesagt:</strong> Die großen KI-Verzeichnisse sind englisch. Wer Kunden in Deutschland,
                    Österreich und der Schweiz will, braucht zusätzlich diese {DACH.length} deutschsprachigen Portale. Kleiner,
                    aber mit genau dem Publikum, das „DSGVO-konform“ als Kaufgrund liest.
                </p>
                <Jean>
                    Eine Sammlung deutscher Verzeichnisse zum Eintragen haben wir bei unserer Recherche nirgends gefunden, also
                    gibt es sie jetzt hier. Zahlen von Semrush, Kaffee nehme ich in bar.
                </Jean>
            </section>

            <section aria-labelledby="liste">
                <h2 id="liste">Alle {DACH.length} deutschen KI-Verzeichnisse</h2>
                <p>Sortiert nach Authority Score. Traffic ist der geschätzte organische Google-Traffic in Deutschland pro Monat.</p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Verzeichnis</th>
                                <th scope="col" className="num">
                                    <abbr title="Semrush Authority Score, 0 bis 100">AS</abbr>
                                </th>
                                <th scope="col" className="num">Traffic DE</th>
                                <th scope="col" className="num">
                                    <abbr title="Verweisende Domains laut Semrush">Ref. Domains</abbr>
                                </th>
                                <th scope="col">Preis</th>
                                <th scope="col">Worauf achten</th>
                                <th scope="col">
                                    <span className="sr-only">Eintragen</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((d) => (
                                <tr key={d.name}>
                                    <th scope="row">
                                        <a href={d.link} target="_blank" rel="noopener noreferrer">
                                            {d.name}
                                        </a>
                                    </th>
                                    <td className="num">{d.authority}</td>
                                    <td className="num">{formatNumber(d.traffic)}</td>
                                    <td className="num">{formatNumber(d.refdomains)}</td>
                                    <td>
                                        <PriceBadge value={d.pricing} />
                                    </td>
                                    <td className="wrap">{d.note}</td>
                                    <td>
                                        <a
                                            className="submit-link"
                                            href={d.submission_link}
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            aria-label={`${d.name}: Tool eintragen (externer Link)`}
                                        >
                                            Eintragen ↗ 🚀
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="source">
                    Quelle: Semrush (Datenbank Deutschland), Stand {DACH_STAND}. Angaben zu Preis und Prüfung stammen von den
                    Betreibern. Bedingungen vor dem Einreichen auf der jeweiligen Seite prüfen.
                </p>
            </section>

            <LeadMagnetBox id="top-50" anlass="Die deutschen reichen dir nicht? Die internationalen Top 50 als Tabelle." />
            <section aria-labelledby="tipps">
                <h2 id="tipps">So klappt der Eintrag in deutschen Verzeichnissen</h2>
                <ol className="checklist">
                    <li>
                        <strong>Auf Deutsch schreiben.</strong> Kein übersetztes Marketing-Englisch. „Spart 3 Stunden pro
                        Woche bei der Rechnungsprüfung“ schlägt „AI-powered next-gen workflow solution“.
                    </li>
                    <li>
                        <strong>Datenschutz offen zeigen.</strong> Serverstandort, Datenschutzerklärung und AVV verlinken. Mehrere
                        Portale bewerten genau das.
                    </li>
                    <li>
                        <strong>Testzugang anbieten.</strong> Portale mit eigenem Test vergeben bessere Bewertungen, wenn sie das
                        Tool ohne Kreditkarte ausprobieren können.
                    </li>
                    <li>
                        <strong>Mit dem Launch-Kit vorbereiten.</strong> Im <Link href="/launch-kit">Launch-Kit</Link> erzeugst du
                        alle Texte einmal und kopierst sie dann überall hinein.
                    </li>
                </ol>
            </section>

            <section aria-labelledby="faq">
                <h2 id="faq">Fragen zu deutschen KI-Verzeichnissen</h2>
                <Faq items={FAQ} />
            </section>

            <p>
                <Link href="/">← Zu allen internationalen KI-Verzeichnissen</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <DachPage />
            <Vernetzt pfad={seitenPfad('/deutsche-ki-verzeichnisse')} />
        </>
    )
}
