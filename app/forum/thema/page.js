import Breadcrumbs from '../../components/Breadcrumbs'
import { Suspense } from 'react'
import Thema from './Thema'

export const metadata = {
    title: 'Forum-Thema',
    description: 'Ein Thema im mentat.codes-KI-Forum.',
    robots: { index: false, follow: true },
}

export default function ThemaPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Forum', path: '/forum' }, { name: 'Thema' }]} />
            <Suspense fallback={<p className="widget-note">Lade Thema …</p>}>
                <Thema />
            </Suspense>
        </>
    )
}
