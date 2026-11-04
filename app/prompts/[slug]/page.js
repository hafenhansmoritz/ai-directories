import Link from 'next/link'
import BASIS_TEXTE from '../../../db/texte/prompts.json'
import { TOOL_PROMPT_TEXTE_EXTRA } from '../../../lib/prompts-tool/index.js'

const TEXTE = { ...BASIS_TEXTE, ...TOOL_PROMPT_TEXTE_EXTRA }
import Jean from '../../components/Jean'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import PromptRunner from '../../components/PromptRunner'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import SlideInLead from '../../components/SlideInLead'
import EmailCapture from '../../components/EmailCapture'
import { HAS_NEWSLETTER, NEWSLETTER_NAME } from '../../../lib/monetization'
import { SITE_NAME } from '../../../lib/site'
import { getPrompts, getPrompt, PROMPT_KATEGORIEN, TECHNIKEN } from '../../../lib/prompts'
import { getTool, toolHref, toolRel } from '../../../lib/tools'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import { getToolPromptSeite } from '../../../lib/prompt-tools'

export const dynamicParams = false

export function generateStaticParams() {
    return getPrompts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
    const p = getPrompt(params.slug)
    if (!p) return {}
    return {
        title: p.title.length > 50 ? (p.title.length > 59 ? p.title.split(':')[0] + ': Prompt-Vorlage' : p.title) : `Prompt: ${p.title}`,
        description: `${p.ziel} Vorlage auf Deutsch zum Ausfüllen, mit einem Klick an ChatGPT, Claude, Perplexity oder Grok.`.slice(0, 300),
        alternates: { canonical: `/prompts/${p.slug}` },
    }
}

function PromptPage({ params }) {
    const p = getPrompt(params.slug)
    if (!p) notFound()
    const kat = PROMPT_KATEGORIEN[p.kategorie]
    const tools = p.tools.map(getTool).filter(Boolean)
    const verwandt = getPrompts().filter((x) => x.kategorie === p.kategorie && x.slug !== p.slug)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: kat.name, path: `/prompts/kategorie/${p.kategorie}` },
        { name: p.title, path: `/prompts/${p.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: p.title,
            description: p.ziel,
            step: [
                ...p.felder.map((f) => ({ '@type': 'HowToStep', name: `${f.label} eintragen`, text: `Beispiel: ${f.beispiel}` })),
                { '@type': 'HowToStep', name: 'An die KI senden', text: 'Prompt mit einem Klick an ChatGPT, Claude, Perplexity oder Grok schicken.' },
            ],
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    Prompt · <Link href={`/prompts/kategorie/${p.kategorie}`}>{kat.name}</Link>
                    {(p.fuer || [])
                        .map(getToolPromptSeite)
                        .filter(Boolean)
                        .map((x) => (
                            <span key={x.slug}>
                                {' · '}
                                <Link href={`/prompts/tool/${x.slug}`}>{x.tool.name}-Prompts</Link>
                            </span>
                        ))}
                </p>
                <h1>{p.title}</h1>
                <p className="lead">{p.ziel}</p>
                {TEXTE[p.slug]?.intro && <p>{TEXTE[p.slug].intro}</p>}
                {TEXTE[p.slug]?.jean && <Jean>{TEXTE[p.slug].jean}</Jean>}
            </section>
            <PromptRunner vorlage={p.vorlage} felder={p.felder} />
            {TEXTE[p.slug]?.tipp && (
                <section aria-labelledby="jeans-tipp" className="jean-take">
                    <h2 id="jeans-tipp">Jeans Tipp für bessere Ergebnisse 💡</h2>
                    <p>{TEXTE[p.slug].tipp}</p>
                    <p>
                        <strong>Typischer Fehler:</strong> {TEXTE[p.slug].fehler}
                    </p>
                </section>
            )}
            <section aria-labelledby="warum">
                <h2 id="warum">Warum dieser Prompt funktioniert</h2>
                <p>
                    Diese Vorlage nutzt {p.techniken.length} Techniken: {p.techniken.map((t) => TECHNIKEN[t][0]).join(', ')}. Was jede davon bewirkt, zeigt das{' '}
                    <Link href="/tutorials/prompt-engineering-in-15-minuten">Prompt-Tutorial in 15 Minuten</Link>.
                </p>
            </section>
            <LeadMagnetBox id="prompt-paket" />
            {tools.length > 0 && (
                <section aria-labelledby="tools">
                    <h2 id="tools">Damit setzt du das Ergebnis um</h2>
                    <ul className="link-cards">
                        {tools.map((t) => (
                            <li key={t.slug}>
                                <Link href={`/tools/${t.slug}`}>
                                    <strong>{t.name}</strong>
                                </Link>
                                <span>{t.summary_de}</span>
                                <a href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                                    {t.name} ansehen ↗{t.affiliate && <sup>*</sup>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {verwandt.length > 0 && (
                <section aria-labelledby="verwandt">
                    <h2 id="verwandt">Mehr Prompts für {kat.name}</h2>
                    <ul>
                        {verwandt.map((x) => (
                            <li key={x.slug}>
                                <Link href={`/prompts/${x.slug}`}>{x.title}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <SlideInLead id="prompt" title={HAS_NEWSLETTER ? `Jeden Freitag 5 neue Prompts von ${NEWSLETTER_NAME} 📬` : 'Prompt-Tricks als Video 🎬'}>
                <p>{HAS_NEWSLETTER ? 'Getestet, auf Deutsch, sofort nutzbar. Kostenlos, jederzeit kündbar.' : 'Neue Prompts, Tool-Tests und Case Studies auf dem mentat.codes-Kanal.'}</p>
                <EmailCapture />
            </SlideInLead>
            <p>
                <Link href="/prompts">← Alle Prompts</Link> · <Link href="/prompt-baukasten">Eigenen Prompt bauen</Link>
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <PromptPage params={params} />
            <Vernetzt pfad={seitenPfad('/prompts/[slug]', params)} />
        </>
    )
}
