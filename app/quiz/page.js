import Quiz from './Quiz'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { getDirectories } from '../../lib/data'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'

export const metadata = {
    title: 'Quiz: Welche KI-Verzeichnisse passen zu deinem Launch?',
    description:
        'Drei Fragen zu Budget, Ziel und Geduld, danach fünf KI-Verzeichnisse, die zu deinem Tool-Launch passen. Mit Jean-Score und ehrlicher Einschätzung.',
    alternates: { canonical: '/quiz' },
    openGraph: ogMeta({ url: '/quiz', bild: OG_BILDER.quiz, alt: 'Quiz auf AIGeddon' }),
}

function QuizPage() {
    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'Quiz', path: '/quiz' },
    ]
    const options = getDirectories().map(({ name, slug, link, submission_link, domain_rating, monthly_visits, pricing, submission_experience }) => ({
        name,
        slug,
        link,
        submission_link,
        domain_rating,
        monthly_visits,
        pricing,
        submission_experience,
    }))
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>Quiz: Welche KI-Verzeichnisse passen zu deinem Launch?</h1>
                <p className="lead">Drei Fragen, zwanzig Sekunden, fünf Empfehlungen. Schneller als jedes Einreichungsformular.</p>
                <Jean>Ich stelle die Fragen, du antwortest ehrlich. Ich merke es, wenn du beim Budget schummelst.</Jean>
            </section>
            <Quiz options={options} />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <QuizPage />
            <Vernetzt pfad={seitenPfad('/quiz')} />
        </>
    )
}
