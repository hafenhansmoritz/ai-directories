import Breadcrumbs from '../components/Breadcrumbs'
import LaunchTracker from './LaunchTracker'
import { getDirectories } from '../../lib/data'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: 'Launch-Tracker: Einreichungen planen und abhaken',
    description: 'Behalte jede Einreichung im Blick: Status je KI-Verzeichnis, Notizen, Erinnerungsdatum und Export als CSV. Mit Konto auf allen Geräten.',
    alternates: { canonical: '/launch-tracker' },
    robots: { index: false, follow: true },
}

export default function LaunchTrackerPage() {
    const verzeichnisse = getDirectories()
        .map(({ slug, name, link, submission_link, affiliate, domain_rating }) => ({ slug, name, link, submission_link, affiliate: Boolean(affiliate), domain_rating }))
        .sort((a, b) => b.domain_rating - a.domain_rating)
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Launch-Tracker' }]} />
            <section className="hero">
                <h1>Dein Launch-Tracker 🚀</h1>
                <p className="lead">
                    Ein Platz für alle {verzeichnisse.length} Verzeichnisse: wo du schon eingereicht hast, was live ist, was abgelehnt wurde und wann du nachhaken willst.
                </p>
            </section>
            <LaunchTracker verzeichnisse={verzeichnisse} />
            <LeadMagnetBox id="top-50" anlass="Noch Lücken im Tracker? Die Top 50 als Tabelle zum Abhaken." />
        </>
    )
}
