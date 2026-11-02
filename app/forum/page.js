import Breadcrumbs from '../components/Breadcrumbs'
import ForumStart from './ForumStart'
import { KONTO_AKTIV } from '../../lib/konto'

export const metadata = {
    title: 'KI-Forum: Fragen, Tools und Prompts',
    description: 'Das deutschsprachige KI-Forum von mentat.codes: Erfahrungen mit KI-Tools, Prompts und Skills teilen, Launch-Tipps, KI im Job. Kostenlos mitreden.',
    alternates: { canonical: '/forum' },
    robots: KONTO_AKTIV ? { index: true, follow: true } : { index: false, follow: true },
}

export default function ForumPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Forum' }]} />
            <section className="hero">
                <h1>Das KI-Forum 💬</h1>
                <p className="lead">
                    Fragen stellen, Tools empfehlen, Prompts verbessern. Hier hilft die Community, und Jean liest mit. Lösungen bringen Punkte, Punkte
                    bringen Ränge.
                </p>
            </section>
            <ForumStart />
        </>
    )
}
