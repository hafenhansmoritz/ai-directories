import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import ZeitRechner from '../components/ZeitRechner'
import { Band } from '../components/Deko'
import { SITE_NAME } from '../../lib/site'
import { RECHNER } from '../../lib/rechner'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: 'KI-Rechner: Abo, API-Kosten, Automatisierung & mehr',
    description: 'Kostenlose KI-Rechner: Lohnt sich ein KI-Abo? Was kostet GPT, Claude oder Gemini über die API? Lohnt sich die Automatisierung? Was bringt mein Newsletter? Sofort im Browser.',
    alternates: { canonical: '/rechner' },
}

function RechnerHub() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Rechner', path: '/rechner' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Rechner · {RECHNER.length} Werkzeuge</p>
                <h1>KI-Rechner: erst rechnen, dann bezahlen</h1>
                <p className="lead">Schieberegler bewegen, Ergebnis sofort sehen. Preise kommen von den offiziellen Preisseiten der Anbieter, mit Datum.</p>
            </section>
            <ul className="entry-tiles">
                {RECHNER.map((r) => (
                    <li key={r.slug}>
                        <Link href={`/rechner/${r.slug}`} style={{ '--tile': r.farbe }}>
                            <span className="entry-emoji" aria-hidden="true">
                                {r.emoji}
                            </span>
                            <strong>{r.titel}</strong>
                            <span>{r.kurz}</span>
                            <span className="entry-count">Jetzt rechnen</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <LeadMagnetBox id="prompt-spickzettel" anlass="Die Rechnung geht auf, wenn die Prompts sitzen." />
            <Band farbe="mint" id="schnell" titel="Schnellcheck: Lohnt sich ein KI-Abo für dich? ⏱️">
                <ZeitRechner />
            </Band>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <RechnerHub />
            <Vernetzt pfad={seitenPfad('/rechner')} />
        </>
    )
}
