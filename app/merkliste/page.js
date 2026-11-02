import Breadcrumbs from '../components/Breadcrumbs'
import Merkliste from './Merkliste'
import SpeicherOrt from './SpeicherOrt'
import { KONTO_AKTIV } from '../../lib/konto'

export const metadata = {
    title: 'Deine Merkliste',
    description: `Deine gemerkten Seiten, Herzen und Abzeichen bei mentat.codes. ${KONTO_AKTIV ? 'Gespeichert im Browser, auf Wunsch auch im Konto.' : 'Alles bleibt nur in deinem Browser gespeichert.'}`,
    alternates: { canonical: '/merkliste' },
    robots: { index: false, follow: true },
}

export default function MerklistePage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Merkliste' }]} />
            <section className="hero">
                <h1>Deine Merkliste ⭐</h1>
                <p className="lead">
                    Alles, was du dir gemerkt hast, dazu deine Herzen und Abzeichen. <SpeicherOrt />
                </p>
            </section>
            <Merkliste />
        </>
    )
}
