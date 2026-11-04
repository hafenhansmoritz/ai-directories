import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { SITE_NAME, absoluteUrl } from '../../lib/site'
import { AUTOR_ID } from '../../lib/autor'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import AngebotBox from '../components/AngebotBox'

export const metadata = {
    title: 'Über Jean Maurice Port: Autor von mentat.codes',
    description: 'Jean Maurice Port schreibt und prüft die Inhalte auf mentat.codes. Senior SEO/SGE Manager bei der MotoMobilityGroup, Master of Arts in Wirtschaftswissenschaften der Universität Trier.',
    alternates: { canonical: '/ueber-jean' },
    openGraph: { url: '/ueber-jean' },
}

const FACTS = [
    ['Beruf', 'Senior SEO/SGE Manager', 'MotoMobilityGroup'],
    ['Studium', 'Master of Arts', 'Wirtschaftswissenschaften, Universität Trier'],
]

function AboutPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Über Jean', path: '/ueber-jean' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': AUTOR_ID,
            name: 'Jean Maurice Port',
            jobTitle: 'Senior SEO/SGE Manager',
            worksFor: { '@type': 'Organization', name: 'MotoMobilityGroup' },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universität Trier' },
            url: absoluteUrl('/ueber-jean'),
        },
    ]

    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Der Autor hinter der Liste</p>
                <h1>Jean Maurice Port</h1>
                <p className="lead">Senior SEO/SGE Manager bei der MotoMobilityGroup. Auf mentat.codes schreibe und prüfe ich die Inhalte: KI-Verzeichnisse, Tools, Prompts und News.</p>
                <Jean>Mehr gibt es über mich hier nicht zu lesen. Dafür umso mehr über KI-Tools.</Jean>
            </section>

            <dl className="facts">
                {FACTS.map(([label, value, note]) => (
                    <div key={label}>
                        <dt>{label}</dt>
                        <dd>
                            {value}
                            <small>{note}</small>
                        </dd>
                    </div>
                ))}
            </dl>

            <section aria-labelledby="arbeitsweise">
                <h2 id="arbeitsweise">Wie hier gearbeitet wird</h2>
                <p>
                    Nach welchen Regeln Fakten, Preise und Quellen geprüft werden, steht unter <Link href="/so-pruefen-wir">So prüfen wir</Link>. Wie sich die Seite finanziert, erklärt{' '}
                    <Link href="/transparenz">Transparenz</Link>.
                </p>
            </section>
            <section aria-labelledby="zusammenarbeit">
                <h2 id="zusammenarbeit">Mit Jean arbeiten</h2>
                <p>
                    Neben der Seite kannst du mich buchen: für Coding-Agenten im Team, KI-Workflows und Sichtbarkeit in Google und KI-Antworten unter{' '}
                    <Link href="/beratung">Beratung</Link>, für eine neue Seite unter <Link href="/website-erstellen-lassen">Website erstellen lassen</Link>.
                </p>
                <AngebotBox thema="seo" />
            </section>
            <p>
                <Link href="/">← Zurück zu den KI-Verzeichnissen</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <AboutPage />
            <Vernetzt pfad={seitenPfad('/ueber-jean')} />
        </>
    )
}
