import Vergleich from './Vergleich'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { getDirectories } from '../../lib/data'
import { getScore, scoreLabel } from '../../lib/score'
import { hasStatusIssue } from '../../lib/checks'
import { absoluteUrl } from '../../lib/site'
import ServiceHint from '../components/ServiceHint'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'KI-Verzeichnisse vergleichen: bis zu 3 nebeneinander',
    description:
        'Vergleiche bis zu drei KI-Verzeichnisse nach Jean-Score, Domain Rating, Traffic, Preis und Einreichung. Der Sieger jeder Zeile ist markiert.',
    alternates: { canonical: '/vergleich' },
    openGraph: { url: '/vergleich', images: [{ url: absoluteUrl('/opengraph-image.png'), width: 1200, height: 630 }] },
}

function VergleichPage() {
    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'Vergleich', path: '/vergleich' },
    ]
    const options = [...getDirectories()]
        .sort((a, b) => a.name.localeCompare(b.name, 'de'))
        .map((d) => {
            const score = getScore(d).total
            return {
                name: d.name,
                slug: d.slug,
                domain_rating: d.domain_rating,
                monthly_visits: d.monthly_visits,
                pricing: d.pricing || '',
                submission_experience: d.submission_experience || '',
                dealCode: d.dealCode || '',
                dealText: d.dealText || '',
                // Score und Sperre auf dem Server rechnen, damit checks.json nicht im Browser landet.
                score,
                scoreLabel: scoreLabel(score),
                blocked: hasStatusIssue(d.slug),
                submission_link: d.submission_link,
                affiliate: Boolean(d.affiliate),
            }
        })
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>KI-Verzeichnisse vergleichen</h1>
                <p className="lead">Bis zu drei Verzeichnisse nebeneinander. Die beste Zahl jeder Zeile bekommt die Krone.</p>
                <Jean>Wie beim Moped-Kauf: erst vergleichen, dann eintragen. Oder umgekehrt, wenn du gern bereust.</Jean>
            </section>
            <Vergleich options={options} />
            <ServiceHint text="Keine Lust, alle drei selbst auszufüllen?" />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <VergleichPage />
            <Vernetzt pfad={seitenPfad('/vergleich')} />
        </>
    )
}
