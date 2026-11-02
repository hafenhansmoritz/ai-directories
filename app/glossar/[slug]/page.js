import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../components/Faq'
import GlossarText from '../../components/GlossarText'
import { SITE_NAME, absoluteUrl } from '../../../lib/site'
import { KI_GLOSSAR, glossarSlug } from '../../../lib/ki-glossar'
import { GLOSSAR_DETAILS } from '../../../lib/ki-glossar-details'
import TEXTE from '../../../db/texte/glossar.json'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const dynamicParams = false

const BEGRIFFE = KI_GLOSSAR.map(([term, text, href]) => ({ term, text, href, slug: glossarSlug(term), ...(GLOSSAR_DETAILS[term] || {}) }))
const getBegriff = (slug) => BEGRIFFE.find((b) => b.slug === slug)

// „Large Language Model (LLM)“ -> „Large Language Model“ für Überschriften wie „Was ist …?“
const kurz = (term) => term.replace(/\s*\(.*?\)/, '')

// Frage mit richtigem Artikel: „Was ist ein Token?“, „Was sind Trainingsdaten?“
const ARTIKEL = {
    'Transformer': 'ein', 'Reasoning-Modell': 'ein', 'Deepfake': 'ein', 'Quantisierung': 'die', 'Latenz': 'die', 'Rate Limit': 'ein', 'Bias': 'der', 'Agentischer Workflow': 'ein', 'Model Card': 'eine',
    Prompt: 'ein', 'System-Prompt': 'ein', 'Rollen-Prompt': 'ein', 'Prompt-Kette': 'eine', 'Meta-Prompt': 'ein',
    'Large Language Model (LLM)': 'ein', Token: 'ein', Kontextfenster: 'das', Temperatur: 'die', Halluzination: 'eine',
    Embedding: 'ein', Vektordatenbank: 'eine', 'Wissensstand (Knowledge Cutoff)': 'der', 'KI-Agent': 'ein', API: 'eine',
    'Prompt-Injection': 'eine', Jailbreak: 'ein', 'Custom GPT': 'ein', Diffusionsmodell: 'ein', 'Open-Weight-Modell': 'ein',
    Benchmark: 'ein', 'KI-Detektor': 'ein',
    'Auto-Modus': 'der', 'Abkündigung (Deprecation)': 'eine', 'Plugin (ChatGPT)': 'ein',
}
const MEHRZAHL = new Set(['Parameter', 'Trainingsdaten', 'Guardrails'])
const frage = (term) => {
    if (term === 'Multimodal') return 'Was bedeutet multimodal?'
    if (term === 'Agentischer Workflow') return 'Was ist ein agentischer Workflow?'
    if (MEHRZAHL.has(term)) return `Was sind ${term}?`
    return `Was ist ${ARTIKEL[term] ? `${ARTIKEL[term]} ` : ''}${kurz(term)}?`
}

export function generateStaticParams() {
    return BEGRIFFE.map((b) => ({ slug: b.slug }))
}

export function generateMetadata({ params }) {
    const b = getBegriff(params.slug)
    if (!b) return {}
    return {
        title: frage(b.term).length > 28 ? `${frage(b.term)} Einfach erklärt` : `${frage(b.term)} Einfach erklärt mit Beispiel`,
        description: `${b.text} Mit Beispiel, Praxis-Tipp und verwandten Begriffen.`.slice(0, 300),
        alternates: { canonical: `/glossar/${b.slug}` },
    }
}

function BegriffPage({ params }) {
    const b = getBegriff(params.slug)
    if (!b) notFound()
    const i = BEGRIFFE.indexOf(b)
    const vor = BEGRIFFE[i - 1]
    const nach = BEGRIFFE[i + 1]
    const gesehen = new Set()
    const verwandt = (b.verwandt || []).map((t) => BEGRIFFE.find((x) => x.term === t)).filter(Boolean)
    const faq = [
        { q: frage(b.term), a: b.text },
        b.beispiel && { q: `Was ist ein Beispiel für ${kurz(b.term)}?`, a: b.beispiel },
        b.praxis && { q: `Worauf sollte ich bei ${kurz(b.term)} achten?`, a: b.praxis },
    ].filter(Boolean)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Glossar', path: '/glossar' },
        { name: b.term, path: `/glossar/${b.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: b.term,
            description: b.text,
            url: absoluteUrl(`/glossar/${b.slug}`),
            inDefinedTermSet: absoluteUrl('/glossar'),
        },
        faqSchema(faq),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">KI-Glossar · KI-Begriff {i + 1} von {BEGRIFFE.length}</p>
                <h1>{frage(b.term)}</h1>
                <p className="lead">{b.text}</p>
            </section>
            {TEXTE[b.slug]?.bild && (
                <section aria-labelledby="schrauber" className="jean-take">
                    <h2 id="schrauber">Jean erklärt's mit Schrauberhänden 🔧</h2>
                    <p>{TEXTE[b.slug].bild}</p>
                    <p>
                        <strong>Merksatz:</strong> {TEXTE[b.slug].merksatz}
                    </p>
                </section>
            )}
            {!b.beispiel && TEXTE[b.slug]?.beispiel && (
                <section aria-labelledby="beispiel">
                    <h2 id="beispiel">Beispiel aus der Praxis</h2>
                    <p className="box box-info">{TEXTE[b.slug].beispiel}</p>
                </section>
            )}
            {b.beispiel && (
                <section aria-labelledby="beispiel">
                    <h2 id="beispiel">Beispiel aus der Praxis</h2>
                    <p className="box box-info">
                        <GlossarText text={b.beispiel} gesehen={gesehen} ausser={b.slug} />
                    </p>
                </section>
            )}
            {b.praxis && (
                <section aria-labelledby="tipp">
                    <h2 id="tipp">Darauf kommt es an</h2>
                    <p className="box box-tipp">
                        <GlossarText text={b.praxis} gesehen={gesehen} ausser={b.slug} />
                    </p>
                </section>
            )}
            {b.href && (
                <p className="service-hint">
                    <strong>Weiter lernen:</strong> <Link href={b.href}>Passende Seite auf mentat.codes →</Link>
                </p>
            )}
            {verwandt.length > 0 && (
                <section aria-labelledby="verwandt">
                    <h2 id="verwandt">Verwandte Begriffe</h2>
                    <ul className="link-cards">
                        {verwandt.map((v) => (
                            <li key={v.slug}>
                                <Link href={`/glossar/${v.slug}`}>
                                    <strong>{v.term}</strong>
                                </Link>
                                <span>{v.text}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <section aria-labelledby="faq">
                <h2 id="faq">Kurz gefragt</h2>
                <Faq items={faq} />
            </section>
            <nav className="glossar-nav" aria-label="Weitere Begriffe">
                {vor ? <Link href={`/glossar/${vor.slug}`}>← {vor.term}</Link> : <span />}
                <Link href="/glossar">Alle Begriffe</Link>
                {nach ? <Link href={`/glossar/${nach.slug}`}>{nach.term} →</Link> : <span />}
            </nav>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <BegriffPage params={params} />
            <Vernetzt pfad={seitenPfad('/glossar/[slug]', params)} />
        </>
    )
}
