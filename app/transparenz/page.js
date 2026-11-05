import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { SITE_NAME } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'Transparenz: Partnerlinks auf mentat.codes',
    description: 'Partnerlinks auf mentat.codes: wie sie gekennzeichnet sind, warum es keine bezahlten Plätze gibt und warum Bewertungen nicht käuflich sind.',
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
                <h1>Transparenz: Partnerlinks und was nicht käuflich ist</h1>
                <p className="lead">Die Liste ist kostenlos und ein privates, nichtkommerzielles Projekt. Hier steht, welche Links Geld bringen können und welche nicht.</p>
            </section>
            <section>
                <h2>Partnerlinks</h2>
                <p>
                    Manche Links zu Verzeichnissen und Werkzeugen sind Partnerlinks. Sie sind mit einem Sternchen (*)
                    markiert. Kaufst oder buchst du darüber etwas, erhalten wir eine Provision. Für dich ändert sich am
                    Preis nichts.
                </p>
                <h2>Keine Anzeigen, kein Sponsoring</h2>
                <p>
                    Plätze in Listen, Tabellen, Foren oder im Newsletter lassen sich nicht kaufen. Es gibt keine
                    bezahlten Platzierungen, keine Anzeigen und keine Sponsoren.
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
