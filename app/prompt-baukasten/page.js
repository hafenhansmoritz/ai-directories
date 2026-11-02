import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import PromptBaukasten from '../components/PromptBaukasten'
import LeadMagnetBox from '../components/LeadMagnetBox'
import { SITE_NAME } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'Prompt-Generator: besseren KI-Prompt bauen mit Score',
    description:
        'Prompt-Generator auf Deutsch: Rolle, Aufgabe, Kontext, Format und Ton eintragen, Prompt-Score sehen und mit einem Klick an ChatGPT, Claude, Perplexity oder Grok senden. Kostenlos, ohne Anmeldung.',
    alternates: { canonical: '/prompt-baukasten' },
}

function PromptBaukastenPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: 'Prompt-Baukasten', path: '/prompt-baukasten' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'mentat.codes Prompt-Baukasten',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description: 'Baut aus Rolle, Aufgabe, Kontext, Format und Ton einen strukturierten Prompt und bewertet ihn mit einem Score.',
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Prompt-Baukasten</p>
                <h1>Bau dir einen Prompt, der nicht nach Zufall klingt</h1>
                <p className="lead">
                    Trag ein, was du weißt. Der Baukasten setzt den Prompt zusammen, zeigt dir den <strong>Prompt-Score</strong> und den nächsten Hebel. Alles läuft in deinem Browser, nichts wird gespeichert.
                </p>
            </section>
            <PromptBaukasten />
            <LeadMagnetBox id="prompt-spickzettel" />
            <p>
                Lieber mit Vorlage starten? <Link href="/prompts">Zur Prompt-Bibliothek →</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <PromptBaukastenPage />
            <Vernetzt pfad={seitenPfad('/prompt-baukasten')} />
        </>
    )
}
