import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import PromptCheck from '../components/PromptCheck'
import LeadMagnetBox from '../components/LeadMagnetBox'
import { SITE_NAME } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'Prompt-Check: Wie gut ist dein Prompt? Score & Tipps',
    description: 'Prompt einfügen, Score sehen: Prüft Rolle, Aufgabe, Kontext, Zielgruppe, Format, Länge und vage Wörter. Mit Token-Schätzung und einem Klick zum Verbessern in ChatGPT oder Claude. Läuft im Browser.',
    alternates: { canonical: '/prompt-check' },
}

function PromptCheckPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: 'Prompt-Check', path: '/prompt-check' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'mentat.codes Prompt-Check',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description: 'Bewertet einen Prompt nach 10 Kriterien und schätzt die Token-Zahl.',
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Prompt-Check</p>
                <h1>Wie gut ist dein Prompt?</h1>
                <p className="lead">
                    Einfügen, Score sehen, nachbessern. Geprüft werden 10 Bausteine guter Prompts, dazu vage Wörter und vergessene Platzhalter. <strong>Nichts verlässt deinen Browser.</strong>
                </p>
            </section>
            <PromptCheck />
            <p>
                Lieber von Grund auf? <Link href="/prompt-baukasten">Prompt-Baukasten →</Link> · Erst die Grundlagen? <Link href="/tutorials/prompt-engineering-in-15-minuten">Tutorial in 15 Minuten →</Link>
            </p>
            <LeadMagnetBox id="prompt-spickzettel" />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <PromptCheckPage />
            <Vernetzt pfad={seitenPfad('/prompt-check')} />
        </>
    )
}
