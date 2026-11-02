import Breadcrumbs from '../../components/Breadcrumbs'
import { Suspense } from 'react'
import Kategorie from './Kategorie'

export const metadata = {
    title: 'Forum-Kategorie',
    description: 'Themen in einer Kategorie des mentat.codes-KI-Forums.',
    robots: { index: false, follow: true },
}

export default function KategoriePage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Forum', path: '/forum' }, { name: 'Kategorie' }]} />
            <Suspense fallback={<p className="widget-note">Lade Kategorie …</p>}>
                <Kategorie />
            </Suspense>
        </>
    )
}
