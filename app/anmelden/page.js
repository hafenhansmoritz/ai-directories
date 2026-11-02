import Breadcrumbs from '../components/Breadcrumbs'
import Anmelden from './Anmelden'
import { StrahlenHerz } from '../components/HerzIcons'

export const metadata = {
    title: 'Anmelden oder kostenlos registrieren',
    description: 'Melde dich ohne Passwort per E-Mail-Link an. Dein kostenloses mentat.codes-Konto sichert Merkliste, Abzeichen und mehr auf allen Geräten.',
    alternates: { canonical: '/anmelden' },
    robots: { index: false, follow: true },
}

const VORTEILE = [
    ['⭐', 'Merkliste und Sammelalbum auf allen Geräten'],
    ['💬', 'Mitreden: Kommentare und Community-Forum'],
    ['🎨', 'Eigenes Profil mit Bild, Banner und Abzeichen-Vitrine'],
    ['🔔', 'Hinweise bei Antworten und neuen Inhalten zu deinen Themen'],
]

export default function AnmeldenPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Anmelden' }]} />
            <section className="hero">
                <StrahlenHerz size={56} />
                <h1>Willkommen bei mentat.codes</h1>
                <p className="lead">Ein Konto, kein Passwort, null Kosten. Gib deine E-Mail-Adresse ein und klick auf den Link, den wir dir schicken.</p>
            </section>
            <div className="konto-zwei">
                <Anmelden />
                <ul className="konto-vorteile">
                    {VORTEILE.map(([icon, text]) => (
                        <li key={text}>
                            <span aria-hidden="true">{icon}</span> {text}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
