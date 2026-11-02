import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../../components/Faq'
import Toc from '../../../components/Toc'
import GlossarText from '../../../components/GlossarText'
import LeadMagnetBox from '../../../components/LeadMagnetBox'
import { Band } from '../../../components/Deko'
import { SITE_NAME, absoluteUrl } from '../../../../lib/site'
import { TECHNIKEN, PROMPT_KATEGORIEN } from '../../../../lib/prompts'
import { getToolPromptSeiten, getToolPromptSeite } from '../../../../lib/prompt-tools'
import { getComparison } from '../../../../lib/comparisons'
import { getTestKategorie } from '../../../../lib/kitests'
import { toolHref, toolRel } from '../../../../lib/tools'
import Vernetzt, { seitenPfad } from '../../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return getToolPromptSeiten().map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }) {
    const s = getToolPromptSeite(params.slug)
    if (!s) return {}
    return {
        title: s.titel,
        description: `${s.prompts.length} Vorlagen für ${s.tool.name}. ${s.intro}`.slice(0, 300),
        alternates: { canonical: `/prompts/tool/${s.slug}` },
    }
}

const FARBEN = ['#fde68a', '#a7f3d0', '#bfdbfe', '#fbcfe8', '#ddd6fe']

function ToolPromptPage({ params }) {
    const s = getToolPromptSeite(params.slug)
    if (!s) notFound()
    const t = s.tool
    const vergleiche = (s.vergleiche || []).map(getComparison).filter(Boolean)
    const kitest = s.kitest && getTestKategorie(s.kitest)
    const kategorien = [...new Set(s.prompts.map((p) => p.kategorie))]
    const gesehen = new Set()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: `${t.name}-Prompts`, path: `/prompts/tool/${s.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: s.titel,
            itemListElement: s.prompts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: absoluteUrl(`/prompts/${p.slug}`) })),
        },
        faqSchema(s.faq),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Prompts für {t.name} · {s.prompts.length} Vorlagen</p>
                <h1>{s.titel}</h1>
                <p className="lead">
                    <GlossarText text={s.intro} gesehen={gesehen} />
                </p>
                <p>
                    <Link href={`/tools/${t.slug}`}>Steckbrief {t.name}</Link> ·{' '}
                    <a href={toolHref(t)} rel={toolRel(t)} target="_blank">
                        {t.name} öffnen{t.affiliate ? '*' : ''}
                    </a>
                </p>
            </section>
            <Toc
                items={[
                    ['vorlagen', 'Vorlagen'],
                    ['tipps', 'Tipps'],
                    ['weiter', 'Weiter'],
                    ['faq', 'FAQ'],
                ]}
            />
            <section aria-labelledby="vorlagen">
                <h2 id="vorlagen">Alle {s.prompts.length} Vorlagen für {t.name} 💬</h2>
                <ul className="link-cards">
                    {s.prompts.map((p) => (
                        <li key={p.slug}>
                            <Link href={`/prompts/${p.slug}`}>
                                <strong>{p.title}</strong>
                            </Link>
                            <span>{p.ziel}</span>
                            <span>{p.techniken.map((x) => TECHNIKEN[x][0]).join(' · ')}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <Band farbe="mint" id="tipps" titel={`So holst du mehr aus ${t.name} raus 🧭`} sticker={`${s.tipps.length} Tipps`}>
                <ul className="kriterien-grid">
                    {s.tipps.map(([titel, text], i) => (
                        <li key={titel} style={{ '--tile': FARBEN[i % FARBEN.length] }}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {i + 1}
                            </span>
                            <strong>{titel}</strong>
                            <span>
                                <GlossarText text={text} gesehen={gesehen} />
                            </span>
                        </li>
                    ))}
                </ul>
            </Band>
            <section aria-labelledby="weiter">
                <h2 id="weiter">Vergleichen, testen, weiterlernen</h2>
                <ul className="link-cards">
                    {vergleiche.map((c) => (
                        <li key={c.slug}>
                            <Link href={`/tool-vergleiche/${c.slug}`}>
                                <strong>⚖️ {c.title}</strong>
                            </Link>
                            <span>{c.intro}</span>
                        </li>
                    ))}
                    {kitest && (
                        <li>
                            <Link href={`/ki-test/${s.kitest}`}>
                                <strong>
                                    {kitest.emoji} KI-Test: {kitest.name}
                                </strong>
                            </Link>
                            <span>Gleiche Aufgaben in mehreren KIs ausführen und selbst bewerten.</span>
                        </li>
                    )}
                    {kategorien.map((k) => (
                        <li key={k}>
                            <Link href={`/prompts/kategorie/${k}`}>
                                <strong>📂 {PROMPT_KATEGORIEN[k].name}</strong>
                            </Link>
                            <span>Alle Vorlagen dieser Kategorie, für jede KI.</span>
                        </li>
                    ))}
                    <li>
                        <Link href="/prompt-check">
                            <strong>✅ Prompt-Check</strong>
                        </Link>
                        <span>Deinen eigenen Prompt prüfen und verbessern lassen.</span>
                    </li>
                </ul>
            </section>
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={s.faq} />
            </section>
            <LeadMagnetBox id="prompt-paket" />
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ToolPromptPage params={params} />
            <Vernetzt pfad={seitenPfad('/prompts/tool/[slug]', params)} />
        </>
    )
}
