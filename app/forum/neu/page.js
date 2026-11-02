import Breadcrumbs from '../../components/Breadcrumbs'
import NeuesThema from './NeuesThema'

export const metadata = {
    title: 'Neues Thema im KI-Forum',
    description: 'Starte ein neues Thema im mentat.codes-KI-Forum.',
    robots: { index: false, follow: false },
}

export default function NeuPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Forum', path: '/forum' }, { name: 'Neues Thema' }]} />
            <h1>Neues Thema starten</h1>
            <NeuesThema />
        </>
    )
}
