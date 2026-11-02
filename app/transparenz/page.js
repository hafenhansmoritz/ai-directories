import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { SITE_NAME } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'Transparenz: So finanziert sich mentat.codes',
    description: 'Partnerlinks, Anzeigen und Sponsoring auf mentat.codes: wie sie gekennzeichnet sind und warum sie Bewertungen nicht beeinflussen.',
    alternates: { canonical: '/transparenz' },
}

function TransparencyPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Transparenz', path: '/transparenz' },
    ]
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>So finanziert sich mentat.codes</h1>
                <p className="lead">Die Liste ist kostenlos. Damit das so bleibt, verdienen wir auf drei Wegen Geld.</p>
            </section>
            <section>
                <h2>Partnerlinks</h2>
                <p>
                    Manche Links zu Verzeichnissen und Werkzeugen sind Partnerlinks. Sie sind mit einem Sternchen (*)
                    markiert. Kaufst oder buchst du darüber etwas, erhalten wir eine Provision. Für dich ändert sich am
                    Preis nichts.
                </p>
                <h2>Anzeigen und Sponsoring</h2>
                <p>
                    Bezahlte Platzierungen stehen als „Anzeige“ gekennzeichnet. Sponsoren im Newsletter oder auf YouTube
                    werden genannt.
                </p>
                <h2>Eigene Leistungen</h2>
                <p>
                    Den Launch-Service und geprüfte Profile bieten wir selbst an. Details unter{' '}
                    <Link href="/werben">Werben</Link>.
                </p>
                <h2>Was nicht käuflich ist</h2>
                <p>
                    Jean-Score, Urteile und Prüfdaten. Sie entstehen aus Domain Rating, Traffic, Preis, Einreichung und
                    den belegten Angaben der Verzeichnisse. Ein Partnerlink ändert daran nichts.
                </p>
            </section>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <TransparencyPage />
            <Vernetzt pfad={seitenPfad('/transparenz')} />
        </>
    )
}
