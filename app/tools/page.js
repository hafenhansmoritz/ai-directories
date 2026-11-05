import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { SITE_NAME, absoluteUrl } from '../../lib/site'
import { getTools, getCategories, TOOLS_STAND } from '../../lib/tools'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import ToolsExplorer from './ToolsExplorer'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: 'KI-Tools mit Preisen und Gratis-Tarif im Vergleich',
    description:
        'KI- und Launch-Werkzeuge nach Anwendungsfall: SEO, Newsletter, Website, Automatisierung, Video, Audio und mehr. Mit Einstiegspreis und Gratis-Tarif laut Anbieter.',
    alternates: { canonical: '/tools' },
}

function ToolsPage() {
    const tools = getTools()
    const categories = getCategories()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Tool-Steckbriefe', path: '/tools' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'KI-Tools für Gründer und Marketer',
            numberOfItems: tools.length,
            itemListElement: tools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: absoluteUrl(`/tools/${t.slug}`) })),
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Tool-Steckbriefe 🧰</p>
                <h1>{tools.length} Tool-Steckbriefe: KI-Tools für Launch, Marketing und Alltag mit Preisen</h1>
                <p className="lead">
                    Sortiert nach Anwendungsfall, mit Einstiegspreis und Gratis-Tarif laut Anbieter (Stand {TOOLS_STAND}).
                    Kein Tool steht hier, weil es bezahlt hat.
                </p>
                <Jean>Ich habe nur reingeschrieben, was die Hersteller selbst sagen. Den Rest sagt dir dein Geldbeutel.</Jean>
            </section>
            <p className="service-hint">
                <strong>Unentschlossen?</strong> <Link href="/tool-vergleiche">Tool-Vergleiche mit klarer Empfehlung je Anwendungsfall →</Link>
            </p>
            <p className="service-hint">
                <strong>Was kosten deine Abos?</strong> <Link href="/mein-stack">Mein KI-Stack: Kosten zusammenrechnen und Spar-Hinweise bekommen →</Link>
            </p>
            <p className="service-hint">
                <strong>Mehr Auswahl oder Suche?</strong> <Link href="/ki-tools">KI-Tool-Datenbank mit über 700 Tools, Suche und Filtern →</Link>
            </p>

            <ToolsExplorer tools={tools} categories={categories} />
            <LeadMagnetBox id="prompt-spickzettel" anlass="Tool gefunden? Mit diesen Prompt-Techniken holst du mehr raus." />

            <p className="source">
                Preise ändern sich oft. Maßgeblich ist immer die Preisseite des Anbieters. Partnerlinks in den Steckbriefen sind mit * markiert,{' '}
                <Link href="/transparenz">mehr dazu</Link>.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <ToolsPage />
            <Vernetzt pfad={seitenPfad('/tools')} />
        </>
    )
}
