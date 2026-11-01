import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { LISTS, getList, getSiteStats } from '../../lib/data'
import { absoluteUrl } from '../../lib/site'

export const metadata = {
    title: 'Listen: KI-Verzeichnisse nach Preis, Stärke und Aufwand',
    description:
        'Sechs fertige Listen aus der AIGeddon-Datenbank: kostenlose KI-Verzeichnisse, Domain Rating 50+, eigene Rabattcodes, Traffic-Monster, Geheimtipps und die mit hakeliger Einreichung.',
    alternates: { canonical: '/liste' },
    openGraph: { url: '/liste', images: [{ url: absoluteUrl('/opengraph-image.png'), width: 1200, height: 630 }] },
}

// Übersicht der Listen, damit /liste/ nicht ins Leere führt (die Brotkrumen der Listenseiten zeigen hierher).
export default function Listen() {
    const stats = getSiteStats()
    const listen = Object.keys(LISTS).map((slug) => getList(slug))
    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'Listen', path: '/liste' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>Welche Liste passt zu deinem Launch?</h1>
                <p className="lead">
                    Alle {stats.total} KI-Verzeichnisse, vorsortiert nach dem, was dir gerade wichtig ist: Budget, Linkstärke, Besucher
                    oder Geduld. Jede Liste lässt sich filtern, abhaken und als Link teilen.
                </p>
            </section>
            <ul className="link-cards">
                {listen.map((l) => (
                    <li key={l.slug}>
                        <Link href={`/liste/${l.slug}`}>
                            <strong>{l.title}</strong>
                        </Link>
                        <span>{l.description(l.items.length)}</span>
                    </li>
                ))}
                <li>
                    <Link href="/top-50">
                        <strong>Top 50 nach Jean-Score</strong>
                    </Link>
                    <span>Die Abkürzung: 50 Verzeichnisse ohne gesperrte Einreichung, als CSV zum Abarbeiten.</span>
                </li>
                <li>
                    <Link href="/#alle">
                        <strong>Alle {stats.total} Verzeichnisse</strong>
                    </Link>
                    <span>Die komplette Tabelle mit Suche, Filtern und Fortschritt.</span>
                </li>
            </ul>
        </>
    )
}
