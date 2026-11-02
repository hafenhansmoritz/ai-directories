import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Jean from '../../components/Jean'
import JeanIcon from '../../components/JeanIcon'
import Faq from '../../components/Faq'
import { SITE_NAME, absoluteUrl } from '../../../lib/site'
import { getComparisons, getComparison } from '../../../lib/comparisons'
import { getPromptsForTool } from '../../../lib/prompts'
import { getTool, toolHref, toolRel, TOOLS_STAND } from '../../../lib/tools'
import Kurzantwort from '../../components/Kurzantwort'
import { autorRef } from '../../../lib/autor'
import Pruefer from '../../components/Pruefer'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import PartnerHinweis from '../../components/PartnerHinweis'
import { kuerzen, datumDe } from '../../../lib/text'

export const dynamicParams = false

export function generateStaticParams() {
    return getComparisons().map((c) => ({ slug: c.slug }))
}

// „Jean sagt“ je Vergleich, nur aus den Angaben auf der jeweiligen Seite (BRAND-VOICE: pro Seite einzigartig).
const JEAN_SAGT = {
    'claude-vs-chatgpt': 'Monatlich gleicher Preis, im Jahresabo spart Claude drei Dollar: Für Code mit Claude 5.5, Artefakte und lange Dokumente nimmst du Claude, für GPT-6, Bilder, Sprachmodus und den Alltags-Einsatz ChatGPT.',
    'make-vs-zapier-vs-n8n': 'Zwei Apps verheiraten: Zapier. Einen Kabelbaum verlegen: Make. Daten in der eigenen Garage lassen: n8n.',
    'semrush-vs-se-ranking-vs-surfer-seo': 'Kauf nicht den ganzen Werkzeugwagen, wenn du nur Artikel schreibst. Dafür reicht Surfer, für alles andere vergleich Semrush mit SE Ranking.',
    'beehiiv-vs-kit-vs-getresponse-vs-brevo': 'Alle vier lassen dich gratis rein. Entscheide nach deinem Geschäftsmodell, nicht nach der hübscheren Oberfläche.',
    'framer-vs-webflow-vs-hostinger': 'Lies bei Hostinger das Kleingedruckte zur Laufzeit, bevor dich der Einstiegspreis verführt.',
    'synthesia-vs-heygen-vs-invideo-vs-pictory': 'Schulung, Übersetzung, Social Clip oder Blog-Recycling: Das sind vier Werkstätten, also kläre erst den Auftrag.',
    'claude-vs-perplexity': 'Gleicher Preis im Jahresabo, andere Aufgabe: Zum Schreiben nimmst du Claude, zum Nachschlagen mit Beleg Perplexity.',
    'elevenlabs-vs-murf': 'Zum Ausprobieren ist ElevenLabs mit Gratis-Tarif der leichtere Einstieg. Murf lohnt den Blick, wenn deine Folien eine Stimme brauchen.',
    'tally-vs-typeform': 'Für die meisten Formulare reicht Tally gratis. Typeform holst du, wenn sich das Formular wie ein Gespräch anfühlen soll.',
    'descript-vs-pictory': 'Hast du schon Aufnahmen, nimm Descript. Hast du nur Text, nimm Pictory.',
    'gamma-vs-canva': 'Nur Folien? Gamma. Folien plus Flyer, Posts und Videos? Canva.',
    'rytr-vs-writesonic': 'Für kurze Texte zahlst du bei Rytr wenig. Writesonic lohnt sich erst, wenn du wissen willst, ob die KI über dich spricht.',
    'midjourney-vs-leonardo-ai': 'Kläre vor dem ersten Bild, wer deine Ergebnisse sehen darf. Im Gratis-Tarif von Leonardo ist das jeder.',
    'wordtune-vs-rytr': 'Englisch glätten: Wordtune. Deutsch neu schreiben: Rytr. Das ist die ganze Weiche.',
    'runway-vs-invideo-ai': 'Für das eine scharfe Video nimm Runway, für den wöchentlichen Upload-Rhythmus InVideo AI.',
    'otter-ai-vs-descript': 'Willst du ein Protokoll oder einen fertigen Schnitt? Die Antwort entscheidet, nicht der Preis.',
    'systeme-io-vs-kit': 'Willst du den ganzen Laden aus einer Hand, nimm Systeme.io. Lebt dein Geschäft vom Newsletter, nimm Kit.',
    'surfer-seo-vs-writesonic': 'Wer nur Artikel poliert, ist bei Surfer richtig. Wer Audits und KI-Artikel dazu will, testet Writesonic erst 7 Tage.',
}

export function generateMetadata({ params }) {
    const c = getComparison(params.slug)
    if (!c) return {}
    return {
        title: c.title.length > 46 ? c.title : c.title.length > 30 ? `${c.title} im Vergleich` : `${c.title}: Vergleich & Empfehlung`,
        description: kuerzen(`${c.intro} Preise, Gratis-Tarife und welches Tool für welchen Zweck passt (Stand ${TOOLS_STAND}).`, 160),
        alternates: { canonical: `/tool-vergleiche/${c.slug}` },
    }
}

const yesNo = (v) => (v === true ? 'Ja' : v === false ? 'Nein' : 'keine Angabe')

const ROWS = [
    ['Am besten für', (t) => t.best_for_de],
    ['Gratis-Tarif', (t) => yesNo(t.free_plan)],
    ['Testphase', (t) => t.free_trial || 'keine Angabe'],
    ['Bezahlt ab', (t) => t.price_from || 'keine Angabe'],
    ['Oberfläche auf Deutsch', (t) => yesNo(t.german_ui)],
]

function ComparisonPage({ params }) {
    const c = getComparison(params.slug)
    if (!c) notFound()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Tool-Vergleiche', path: '/tool-vergleiche' },
        { name: c.title, path: `/tool-vergleiche/${c.slug}` },
    ]
    // FAQ-Markup nur für die sichtbaren Fragen (Abschnitt „Häufige Fragen“), nicht für die Empfehlungen je Fall.
    const faq = c.faq?.length
        ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
        : null
    const anyAffiliate = c.items.some((t) => t.affiliate)
    return (
        <>
            <JsonLd
                data={[
                    breadcrumbSchema(crumbs),
                    ...(faq ? [faq] : []),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: c.title,
                        description: c.intro,
                        inLanguage: 'de-DE',
                        url: absoluteUrl(`/tool-vergleiche/${c.slug}`),
                        author: autorRef(),
                        publisher: { '@id': `${absoluteUrl('/')}#organisation` },
                        ...(c.geprueft ? { dateModified: c.geprueft } : {}),
                        ...(c.quellen?.length ? { citation: c.quellen.map((q) => q.url) } : {}),
                    },
                ]}
            />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">{c.topic} im Vergleich ⚖️</p>
                <h1>{c.title}</h1>
                <p className="lead">{c.intro}</p>
                <Jean>{JEAN_SAGT[c.slug] || 'Kurzfassung: Es gibt kein bestes Tool, nur das beste für deinen Zweck. Deshalb unten pro Fall eine klare Ansage.'}</Jean>
                <Kurzantwort frage={`${c.items.map((t) => t.name).join(c.items.length > 2 ? ', ' : ' oder ').replace(/, ([^,]*)$/, ' oder $1')}: was ist besser?`}>
                    {`Kommt auf deinen Einsatz an. ${c.picks.map(([frage, slug]) => `${frage.replace(/[.!?]$/, '')}: ${getTool(slug)?.name}`).join('. ')}.`}
                </Kurzantwort>
            </section>

            <section aria-labelledby="empfehlung">
                <h2 id="empfehlung">Jeans Empfehlung je Anwendungsfall</h2>
                <ul className="link-cards">
                    {c.picks.map(([question, slug, why]) => {
                        const t = getTool(slug)
                        return (
                            <li key={question}>
                                <span>{question}</span>
                                <a href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                                    <strong>
                                        <JeanIcon badge="pokal" size={24} /> {t.name}
                                    </strong>{' '}
                                    ↗{t.affiliate && <sup>*</sup>}
                                </a>
                                <span>{why}</span>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section aria-labelledby="tabelle">
                <h2 id="tabelle">Die Fakten nebeneinander</h2>
                <div className="table-scroll">
                    <table>
                        <caption className="sr-only">{c.title}: Preise und Eigenschaften laut Anbieter</caption>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <span className="sr-only">Merkmal</span>
                                </th>
                                {c.items.map((t) => (
                                    <th scope="col" key={t.slug}>
                                        <Link href={`/tools/${t.slug}`}>{t.name}</Link>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ROWS.map(([label, get]) => (
                                <tr key={label}>
                                    <th scope="row">{label}</th>
                                    {c.items.map((t) => (
                                        <td key={t.slug}>{get(t)}</td>
                                    ))}
                                </tr>
                            ))}
                            <tr className="dt-anbieter-zeile">
                                <th scope="row">Zum Anbieter</th>
                                {c.items.map((t) => (
                                    <td key={t.slug}>
                                        <a className="button button-small" href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                                            {t.name} ↗{t.affiliate && <sup>*</sup>}
                                        </a>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="source">
                    Angaben laut Anbieter, Stand {TOOLS_STAND}. Maßgeblich ist die jeweilige Preisseite.
                </p>
                <PartnerHinweis zeigen={anyAffiliate} />
            </section>
            {c.unterschiede?.length > 0 && (
                <section aria-labelledby="unterschiede">
                    <h2 id="unterschiede">Die wichtigsten Unterschiede 🔍</h2>
                    <dl className="unterschiede">
                        {c.unterschiede.map(([titel, text]) => (
                            <div key={titel}>
                                <dt>{titel}</dt>
                                <dd>{text}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}
            {c.faq?.length > 0 && (
                <section aria-labelledby="faq">
                    <h2 id="faq">Häufige Fragen 🙋</h2>
                    <Faq items={c.faq} />
                </section>
            )}
            {c.quellen?.length > 0 && (
                <section aria-labelledby="quellen" className="quellen-block">
                    <h2 id="quellen">Quellen und Stand 🔎</h2>
                    <p>Unterschiede und Antworten wurden {c.geprueft ? `am ${datumDe(c.geprueft)} ` : ''}auf den Seiten der Anbieter geprüft.</p>
                    <ul className="quellen">
                        {c.quellen.map((q) => (
                            <li key={q.url}>
                                <a href={q.url} rel="noopener nofollow" target="_blank">
                                    {q.titel}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {c.items
                .filter((t) => getPromptsForTool(t.slug).length > 0)
                .map((t) => (
                    <p key={t.slug} className="service-hint">
                        <strong>Passende Vorlagen:</strong>{' '}
                        <Link href={`/prompts/tool/${t.slug}`}>
                            Prompts für {t.name} ({getPromptsForTool(t.slug).length} Vorlagen) →
                        </Link>
                    </p>
                ))}
            <Pruefer datum={c.geprueft} />
            <p>
                <Link href="/tool-vergleiche">← Alle Tool-Vergleiche</Link> · <Link href="/tools">KI-Tool-Verzeichnis</Link>
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ComparisonPage params={params} />
            <Vernetzt pfad={seitenPfad('/tool-vergleiche/[slug]', params)} />
        </>
    )
}
