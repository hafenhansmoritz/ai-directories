import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Faq, { faqSchema } from '../components/Faq'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { getDirectory } from '../../lib/data'
import { allChecks, CHECK_STAND } from '../../lib/checks'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export function generateMetadata() {
    const n = allChecks().length
    return {
        title: 'Wie lange dauert die Freischaltung in KI-Verzeichnissen?',
        description: `Freischaltdauer, Link-Typ und Status von ${n} KI-Verzeichnissen, belegt mit Zitat und Quelle der Verzeichnisse selbst. Von „sofort“ bis „80 Tage“. Stand ${CHECK_STAND}.`,
        alternates: { canonical: '/freischaltung' },
        openGraph: { url: '/freischaltung' },
    }
}

const FAQ = [
    {
        q: 'Wie lange dauert es, bis ein KI-Tool in einem Verzeichnis erscheint?',
        a: 'Das reicht laut den Verzeichnissen selbst von sofort (automatische Prüfung) über wenige Tage bis zu mehreren Monaten in kostenlosen Warteschlangen. Viele bieten gegen Geld eine schnellere Prüfung an, oft innerhalb von 24 bis 48 Stunden.',
    },
    {
        q: 'Lohnt sich die bezahlte schnellere Freischaltung?',
        a: 'Nur wenn der Termin wichtig ist, etwa für einen Launch-Tag. Der Eintrag selbst wird dadurch nicht wertvoller. Wenn du früh genug einreichst, sparst du dir das Geld.',
    },
    {
        q: 'Warum stehen hier nicht alle Verzeichnisse?',
        a: 'Hier steht nur, was ein Verzeichnis selbst auf seiner Seite angibt, mit wörtlichem Zitat und Quelle. Viele Verzeichnisse machen dazu keine Angabe. Schätzungen aus Drittquellen übernehmen wir bewusst nicht.',
    },
]

function FreischaltungPage() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Freischaltdauer', path: '/freischaltung' },
    ]
    const rows = allChecks()
        .map(([slug, c]) => ({ slug, c, d: getDirectory(slug) }))
        .filter((r) => r.d)
        .sort((a, b) => Number(Boolean(a.c.status)) - Number(Boolean(b.c.status)) || a.d.name.localeCompare(b.d.name, 'de'))
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(FAQ)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Geprüft im {CHECK_STAND} ⏱️</p>
                <h1>Wie lange dauert die Freischaltung in KI-Verzeichnissen?</h1>
                <p className="lead">
                    <strong>Kurz gesagt:</strong> Von sofort bis zu mehreren Monaten. Hier steht für {rows.length} Verzeichnisse,
                    was sie selbst zu Freischaltung, Link-Typ und Status sagen. Jede Angabe mit wörtlichem Zitat und Quelle.
                </p>
                <Jean>
                    Ich habe die Kleingedruckten gelesen, damit du nicht drei Monate auf einen Eintrag wartest, der nie kommt.
                </Jean>
            </section>

            <section aria-labelledby="tabelle">
                <h2 id="tabelle">Freischaltdauer, Link-Typ und Status</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Verzeichnis</th>
                                <th scope="col">Freischaltung</th>
                                <th scope="col">Link-Typ</th>
                                <th scope="col">Beleg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(({ slug, c, d }) => (
                                <tr key={slug}>
                                    <th scope="row">
                                        <Link href={`/verzeichnis/${slug}`}>{d.name}</Link>
                                    </th>
                                    <td className="wrap">{c.status ? <strong className="kit-warn">⛔ {c.status}</strong> : c.approval || '–'}</td>
                                    <td>{c.link_type || '–'}</td>
                                    <td className="wrap">
                                        {c.quote && <q lang="en">{c.quote}</q>}{' '}
                                        {c.source && (
                                            <a href={c.source} target="_blank" rel="nofollow noopener noreferrer">
                                                Quelle ↗
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="source">
                    Stand {CHECK_STAND}. Nur Angaben der Verzeichnisse selbst. Bedingungen ändern sich, also vor dem Einreichen kurz
                    gegenprüfen.
                </p>
            </section>

            <section aria-labelledby="faq">
                <h2 id="faq">Fragen zur Freischaltung</h2>
                <Faq items={FAQ} />
            </section>

            <p>
                <Link href="/">← Zu allen KI-Verzeichnissen</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <FreischaltungPage />
            <Vernetzt pfad={seitenPfad('/freischaltung')} />
        </>
    )
}
