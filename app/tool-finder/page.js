import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import ToolFinder from '../components/ToolFinder'
import { Band } from '../components/Deko'
import { SITE_NAME } from '../../lib/site'
import { kbStats } from '../../lib/kb'
import { KB_DATEN } from '../../lib/kb-client'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'KI-Tool-Finder: Welches KI-Tool passt zu mir?',
    description: `Drei Fragen, passende KI-Tools: Aufgabe, Budget und Technik wählen und die besten Treffer aus ${kbStats().gesamt} Tools bekommen. Kostenlos, ohne Anmeldung.`,
    alternates: { canonical: '/tool-finder' },
}

function ToolFinderPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Tool-Finder', path: '/tool-finder' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Tool-Finder · 3 Fragen</p>
                <h1>Welches KI-Tool passt zu mir?</h1>
                <p className="lead">Drei Klicks, sechs Treffer. Sortiert nach dem, was die großen Community-Listen empfehlen, mit Jeans Steckbriefen, wo es welche gibt.</p>
            </section>
            <Band farbe="lila" id="finder" titel="Los geht's 🎯">
                <ToolFinder quelle={KB_DATEN} />
            </Band>
            <p className="box box-tipp">
                Treffer gefunden? Teste die Chatbots im <Link href="/ki-test">KI-Test</Link> und rechne mit dem <Link href="/rechner/ki-zeitersparnis">Zeitersparnis-Rechner</Link> nach, ob sich das Abo lohnt.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <ToolFinderPage />
            <Vernetzt pfad={seitenPfad('/tool-finder')} />
        </>
    )
}
