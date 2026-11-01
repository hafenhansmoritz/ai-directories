import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import DirectoryTable from '../../components/DirectoryTable'
import DealCards from '../../components/DealCards'
import LeadBox from '../../components/LeadBox'
import { LISTS, getList, tabellenZeilen } from '../../../lib/data'
import { dateiStand } from '../../../lib/stand'
import { absoluteUrl } from '../../../lib/site'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return Object.keys(LISTS).map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
    const list = getList(params.slug)
    if (!list) return {}
    return {
        title: list.title.length > 45 || list.items.length === 0 ? list.title : `${list.title}: ${list.items.length} Einträge`,
        description: list.description(list.items.length),
        alternates: { canonical: `/liste/${list.slug}` },
        // Eine leere Liste (z. B. noch keine eigenen Rabattcodes) bleibt erreichbar, aber aus dem Index.
        ...(list.items.length === 0 && { robots: { index: false, follow: true } }),
        openGraph: { url: `/liste/${list.slug}`, images: [{ url: absoluteUrl('/opengraph-image.png'), width: 1200, height: 630 }] },
    }
}

function ListPage({ params }) {
    const list = getList(params.slug)
    if (!list) notFound()

    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'Listen', path: '/liste' },
        { name: list.title, path: `/liste/${list.slug}` },
    ]

    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: list.title,
            numberOfItems: list.items.length,
            itemListElement: list.items.map((d, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: d.name,
                url: absoluteUrl(`/verzeichnis/${d.slug}`),
            })),
        },
    ]

    const others = Object.entries(LISTS).filter(([slug]) => slug !== list.slug)
    const stand = dateiStand('db/directories.json', 'db/checks.json', 'db/fresh-semrush.json')

    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>{list.h1(list.items.length)}</h1>
                <p className="lead">{list.lead}</p>
                <p className="c-stand">
                    Daten zuletzt aktualisiert:{' '}
                    <time dateTime={stand.toISOString().slice(0, 10)}>
                        {new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(stand)}
                    </time>
                    . <Link href="/so-pruefen-wir">So prüfen wir →</Link>
                </p>
            </section>

            {list.slug === 'rabattcodes' && list.items.length === 0 && (
                <>
                    <p>
                        Gerade gibt es hier keinen Code. Sobald AIGeddon mit einem Verzeichnis einen eigenen Rabatt vereinbart hat, steht er hier und auf der Seite des Verzeichnisses. Bis dahin lohnt der Blick auf die{' '}
                        <Link href="/liste/kostenlos">kostenlosen KI-Verzeichnisse</Link>.
                    </p>
                    <LeadBox title="Deal-Alarm 🚨" text="Sobald es eigene Rabattcodes gibt, landen sie zuerst im Newsletter." />
                </>
            )}
            {list.slug === 'rabattcodes' && list.items.length > 0 && (
                <>
                    <DealCards directories={list.items} />
                    <LeadBox
                        title="Deal-Alarm 🚨"
                        text="Neue Rabattcodes und Gratis-Aktionen der Verzeichnisse landen zuerst im Newsletter. Wer zu spät kommt, zahlt Listenpreis."
                    />
                    <h2>Alle Codes als Tabelle</h2>
                </>
            )}
            {list.items.length > 0 && <DirectoryTable directories={tabellenZeilen(list.items)} caption={`${list.title}: ${list.items.length} Einträge`} />}

            <section aria-labelledby="weitere">
                <h2 id="weitere">Weitere Listen, weil du noch nicht genug hast 📚</h2>
                <ul className="quick-links">
                    {others.map(([slug, l]) => (
                        <li key={slug}>
                            <Link href={`/liste/${slug}`}>{l.title} →</Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/#alle">Zurück zum Buffet: alle KI-Verzeichnisse →</Link>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ListPage params={params} />
            <Vernetzt pfad={seitenPfad('/liste/[slug]', params)} />
        </>
    )
}
