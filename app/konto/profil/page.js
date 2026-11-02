import Breadcrumbs from '../../components/Breadcrumbs'
import ProfilEditor from './ProfilEditor'

export const metadata = {
    title: 'Profil bearbeiten',
    description: 'Gestalte dein mentat.codes-Profil mit eigenem Bild, Banner, Bio und Links.',
    alternates: { canonical: '/konto/profil' },
    robots: { index: false, follow: false },
}

export default function ProfilPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Mein Konto', path: '/konto' }, { name: 'Profil bearbeiten' }]} />
            <h1>Dein Profil 🎨</h1>
            <ProfilEditor />
        </>
    )
}
