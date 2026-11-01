import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { getDirectories } from '../../lib/data'
import { absoluteUrl } from '../../lib/site'

export const metadata = {
    title: 'Alle KI-Verzeichnisse von A bis Z',
    description: 'Jedes KI-Verzeichnis aus der AIGeddon-Liste alphabetisch, mit Link zur Detailseite: Domain Rating, Preis, Einreichung und Alternativen.',
    alternates: { canonical: '/verzeichnis' },
    openGraph: { url: '/verzeichnis', images: [{ url: absoluteUrl('/opengraph-image.png'), width: 1200, height: 630 }] },
}

const anfang = (name) => {
    const c = name.normalize('NFD')[0].toUpperCase()
    return /[A-Z]/.test(c) ? c : '0-9'
}

// Register aller Verzeichnisse: reines HTML ohne Client-Code, Ziel der Brotkrumen auf den Detailseiten.
export default function Register() {
    const alle = [...getDirectories()].sort((a, b) => a.name.localeCompare(b.name, 'de'))
    const gruppen = new Map()
    alle.forEach((d) => {
        const k = anfang(d.name)
        if (!gruppen.has(k)) gruppen.set(k, [])
        gruppen.get(k).push(d)
    })
    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'KI-Verzeichnisse', path: '/verzeichnis' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>Alle {alle.length} KI-Verzeichnisse von A bis Z</h1>
                <p className="lead">
                    Du kennst den Namen schon? Dann hier entlang. Filtern, sortieren und abhaken geht in der{' '}
                    <Link href="/#alle">großen Tabelle auf der Startseite</Link>, fertige Auswahlen findest du unter{' '}
                    <Link href="/liste">Listen</Link>.
                </p>
                <ul className="quick-links" aria-label="Sprung zum Anfangsbuchstaben">
                    {[...gruppen.keys()].map((k) => (
                        <li key={k}>
                            <a href={`#buchstabe-${k}`}>{k}</a>
                        </li>
                    ))}
                </ul>
            </section>
            {[...gruppen.entries()].map(([k, liste]) => (
                <section key={k} aria-labelledby={`buchstabe-${k}`}>
                    <h2 id={`buchstabe-${k}`}>{k}</h2>
                    <ul className="quick-links">
                        {liste.map((d) => (
                            <li key={d.slug}>
                                {/* Kein Prefetch: 256 Links würden sonst beim Scrollen alle Detailseiten vorladen. */}
                                <Link href={`/verzeichnis/${d.slug}`} prefetch={false}>
                                    {d.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </>
    )
}
