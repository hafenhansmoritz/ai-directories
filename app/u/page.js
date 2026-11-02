import { Suspense } from 'react'
import Profil from './Profil'

export const metadata = {
    title: 'Profil',
    description: 'Mitgliederprofil in der mentat.codes-Community.',
    robots: { index: false, follow: true },
}

export default function ProfilSeite() {
    return (
        <Suspense fallback={<p className="widget-note">Lade Profil …</p>}>
            <Profil />
        </Suspense>
    )
}
