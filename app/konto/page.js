import Breadcrumbs from '../components/Breadcrumbs'
import Konto from './Konto'

export const metadata = {
    title: 'Mein Konto',
    description: 'Dein mentat.codes-Konto: Sammlung, Einwilligungen, Datenexport und Löschung.',
    alternates: { canonical: '/konto' },
    robots: { index: false, follow: false },
}

export default function KontoPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Mein Konto' }]} />
            <h1>Mein Konto</h1>
            <Konto />
        </>
    )
}
