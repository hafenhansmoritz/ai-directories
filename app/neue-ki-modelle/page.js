import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Faq, { faqSchema } from '../components/Faq'
import { FAMILIEN, GERUECHTE, MODELLE_STAND, ANBIETER, modelleNachDatum } from '../../lib/modelle'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import NeuMarke from '../components/NeuMarke'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: 'Neue KI-Modelle 2026: GPT-6, Gemini 4, Claude 5.5',
    description: `Alle neuen KI-Modelle im Überblick: GPT-6, Gemini 4 Argon, Claude Opus 5.5, Grok 4.7, Mistral Large 4 und mehr. Starttermine, API-Preise von offiziellen Seiten und ein Gerüchte-Check. Stand ${MODELLE_STAND}.`,
    alternates: { canonical: '/neue-ki-modelle' },
    openGraph: ogMeta({ url: '/neue-ki-modelle', bild: OG_BILDER.modelle, alt: 'Neue KI-Modelle auf mentat.codes' }),
}

function NeueModelle() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Neue KI-Modelle', path: '/neue-ki-modelle' },
    ]
    const liste = modelleNachDatum()
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(GERUECHTE)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Stand {MODELLE_STAND}</p>
                <h1>Neue KI-Modelle 2026: was wirklich erschienen ist</h1>
                <p className="lead">
                    {liste.length} Modelle und Updates von {ANBIETER().length} Anbietern aus den letzten Wochen: GPT-6, Gemini 4 Argon, Claude 5.5 und Co. Jede Angabe mit Quelle, Preise nur von offiziellen Preis- oder Modellseiten,
                    Herstellerversprechen als solche markiert.
                </p>
                <Jean>Jede Woche heißt es irgendwo „das beste Modell aller Zeiten“. Hier steht, was wirklich draußen ist und was es kostet. Gerüchte gibt es unten, sauber getrennt.</Jean>
            </section>

            <section aria-labelledby="familien">
                <h2 id="familien">Die großen Modellfamilien</h2>
                <ul className="link-cards">
                    {FAMILIEN.map((f) => (
                        <li key={f.slug}>
                            <Link href={`/neue-ki-modelle/${f.slug}`}>
                                <strong>{f.titel}</strong>
                            </Link>
                            <span>{f.description}</span>
                        </li>
                    ))}
                    <li>
                        <Link href="/neue-ki-modelle/gemini-4-argon">
                            <strong>Gemini 4 Argon: Googles neues Spitzenmodell</strong>
                        </Link>
                        <span>Das bisher einzige Gemini-4-Modell, mit Einführungspreisen bis Ende November 2026.</span>
                    </li>
                </ul>
            </section>

            <section aria-labelledby="zeitleiste">
                <h2 id="zeitleiste">Alle neuen Modelle, neueste zuerst</h2>
                <ul className="link-cards">
                    {liste.map((m) => (
                        <li key={m.slug}>
                            <Link href={`/neue-ki-modelle/${m.slug}`}>
                                <strong>{m.name}</strong>
                            </Link>
                            <span>
                                {m.anbieter} · {m.art} · {m.datumText} <NeuMarke datum={m.datum} />
                            </span>
                            <span>{m.kurz}</span>
                            {m.preis && <span>API-Preis: {m.preis}</span>}
                        </li>
                    ))}
                </ul>
            </section>

            <LeadMagnetBox id="prompt-spickzettel" anlass="Egal, welches Modell gerade vorn liegt: Gute Prompts funktionieren überall." />
            <section aria-labelledby="geruechte">
                <h2 id="geruechte">Gerüchte-Check: was es (noch) nicht gibt 🕵️</h2>
                <p>Viele Suchanfragen drehen sich um Modelle, die nicht erschienen sind. Hier der Stand vom {MODELLE_STAND}.</p>
                <Faq items={GERUECHTE} />
            </section>

            <section aria-labelledby="einordnen">
                <h2 id="einordnen">So ordnest du neue Modelle ein</h2>
                <div className="prose">
                    <p>
                        Benchmark-Werte in Ankündigungen stammen fast immer vom Hersteller selbst. Ob ein neues Modell für deine Aufgaben besser ist, merkst du erst, wenn du es mit deinen eigenen Aufgaben testest. Genau dafür gibt
                        es den KI-Test mit 50 Aufgaben.
                    </p>
                    <p>API-Preise gelten pro 1 Mio. Tokens. Was das für dein Projekt bedeutet, rechnest du mit dem API-Kosten-Rechner aus. Für Abos in ChatGPT, Claude oder Gemini zählen die Tarifpreise in den Tool-Steckbriefen.</p>
                </div>
                <ul className="quick-links">
                    <li>
                        <Link href="/ki-test">KI-Test: neue Modelle selbst vergleichen →</Link>
                    </li>
                    <li>
                        <Link href="/rechner">KI-Rechner, auch für API-Kosten →</Link>
                    </li>
                    <li>
                        <Link href="/tools/claude">Claude: Tarife im Steckbrief →</Link>
                    </li>
                    <li>
                        <Link href="/tools/chatgpt">ChatGPT: Tarife im Steckbrief →</Link>
                    </li>
                    <li>
                        <Link href="/tools/google-gemini">Google Gemini: Preis laut Anbieter →</Link>
                    </li>
                    <li>
                        <Link href="/ratgeber/chatgpt-claude-gemini-welcher-chatbot">ChatGPT, Claude oder Gemini: welcher Chatbot wofür? →</Link>
                    </li>
                    <li>
                        <Link href="/glossar">KI-Glossar: Tokens, Kontext und Co. →</Link>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <NeueModelle />
            <Vernetzt pfad={seitenPfad('/neue-ki-modelle')} />
        </>
    )
}
