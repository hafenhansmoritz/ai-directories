import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../../components/Breadcrumbs'
import Vernetzt, { seitenPfad } from '../../../components/Vernetzt'
import { getPrompts, getPromptsForTool, PROMPT_KATEGORIEN, TECHNIKEN } from '../../../../lib/prompts'
import { getTool, toolHref, toolRel } from '../../../../lib/tools'
import { comparisonsForTool } from '../../../../lib/comparisons'
import { SITE_NAME, absoluteUrl } from '../../../../lib/site'

export const dynamicParams = false

export function generateStaticParams() {
    const slugs = [...new Set(getPrompts().flatMap((p) => p.fuer || []))]
    return slugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
    const tool = getTool(params.slug)
    const prompts = getPromptsForTool(params.slug)
    const name = tool ? tool.name : params.slug
    return {
        title: `Prompts für ${name}: ${prompts.length} kostenlose Vorlagen auf Deutsch`,
        description: `${prompts.length} getestete Prompts und Vorlagen speziell für ${name} auf Deutsch. Felder ausfüllen, kopieren und direkt in ${name} nutzen.`,
        alternates: { canonical: `/prompts/tool/${params.slug}` },
    }
}

function ToolPromptsPage({ params }) {
    const tool = getTool(params.slug)
    const prompts = getPromptsForTool(params.slug)
    if (!tool || prompts.length === 0) notFound()

    const vergleiche = comparisonsForTool(tool.slug)
    const kategorien = [...new Set(prompts.map((p) => p.kategorie))]
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: `Prompts für ${tool.name}`, path: `/prompts/tool/${params.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Prompts für ${tool.name}`,
            itemListElement: prompts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: p.title,
                url: absoluteUrl(`/prompts/${p.slug}`),
            })),
        },
    ]

    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Tool-Prompts · {prompts.length} Vorlagen</p>
                <h1>Prompts für {tool.name}</h1>
                <p className="lead">
                    {prompts.length} getestete Vorlagen und Arbeitsabläufe speziell für {tool.name} auf Deutsch. Felder ausfüllen, kopieren und direkt im Tool starten.
                </p>
                <p className="cta-row">
                    <a href={toolHref(tool)} target="_blank" rel={toolRel(tool)} className="button">
                        {tool.name} öffnen ↗{tool.affiliate && <sup>*</sup>}
                    </a>
                    <Link href={`/tools/${tool.slug}`}>Zum Steckbrief {tool.name} →</Link>
                    {vergleiche.map((c) => (
                        <Link key={c.slug} href={`/tool-vergleiche/${c.slug}`}>
                            {c.title} →
                        </Link>
                    ))}
                </p>
            </section>
            <section aria-labelledby="prompts-liste">
                <h2 id="prompts-liste">Alle {prompts.length} Prompts für {tool.name}</h2>
                <ul className="link-cards">
                    {prompts.map((p) => (
                        <li key={p.slug}>
                            <Link href={`/prompts/${p.slug}`}>
                                <strong>{p.title}</strong>
                            </Link>
                            <span>{p.ziel}</span>
                            <span>
                                {p.techniken.map((t) => TECHNIKEN[t]?.[0]).filter(Boolean).join(' · ')} ·{' '}
                                <Link href={`/prompts/kategorie/${p.kategorie}`}>{PROMPT_KATEGORIEN[p.kategorie]?.name || p.kategorie} →</Link>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
            <section aria-labelledby="weiter">
                <h2 id="weiter">Passende Kategorien, Vergleiche und Selbsttests</h2>
                <ul className="link-cards">
                    {kategorien.map((katKey) => {
                        const kat = PROMPT_KATEGORIEN[katKey]
                        if (!kat) return null
                        return (
                            <li key={katKey}>
                                <Link href={`/prompts/kategorie/${katKey}`}>
                                    <strong>Prompt-Kategorie: {kat.name}</strong>
                                </Link>
                                <span>Weitere Vorlagen für {kat.name} im Überblick.</span>
                            </li>
                        )
                    })}
                    {vergleiche.map((c) => (
                        <li key={c.slug}>
                            <Link href={`/tool-vergleiche/${c.slug}`}>
                                <strong>Vergleich: {c.title}</strong>
                            </Link>
                            <span>{c.intro}</span>
                        </li>
                    ))}
                    <li>
                        <Link href="/ki-test/deutsch">
                            <strong>KI-Test: Deutsch & Stil</strong>
                        </Link>
                        <span>Prüfe selbst mit Kopier-Aufgaben, wie sauber {tool.name} auf Deutsch formuliert.</span>
                    </li>
                    <li>
                        <Link href="/ki-test/code">
                            <strong>KI-Test: Programmieren</strong>
                        </Link>
                        <span>Standardisierte Coding-Aufgaben zum direkten Gegenprüfen im Browser.</span>
                    </li>
                </ul>
                <p>
                    <Link href="/prompts">← Alle Prompts</Link> · <Link href={`/tools/${tool.slug}`}>Steckbrief {tool.name}</Link> · <Link href="/prompt-baukasten">Eigenen Prompt bauen</Link>
                </p>
            </section>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ToolPromptsPage params={params} />
            <Vernetzt pfad={seitenPfad('/prompts/tool/[slug]', params)} />
        </>
    )
}
