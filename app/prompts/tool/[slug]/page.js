import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs, { breadcrumbSchema } from '../../../../app/components/Breadcrumbs'
import { getPromptsForTool, PROMPT_KATEGORIEN } from '../../../../lib/prompts'
import { getTool, toolHref, toolRel } from '../../../../lib/tools'
import { SITE_NAME } from '../../../../lib/site'

export const dynamicParams = true

export function generateStaticParams() {
    return [{ slug: 'chatgpt' }, { slug: 'claude' }, { slug: 'google-gemini' }, { slug: 'suno' }, { slug: 'midjourney' }, { slug: 'make' }, { slug: 'zapier' }, { slug: 'n8n' }]
}

export function generateMetadata({ params }) {
    const tool = getTool(params.slug)
    const name = tool ? tool.name : params.slug
    return {
        title: `Prompts für ${name} (Kostenlose Vorlagen)`,
        description: `Getestete Prompts und Vorlagen für ${name} auf Deutsch. Direkt anwenden und Ergebnisse optimieren.`,
        alternates: { canonical: `/prompts/tool/${params.slug}` },
    }
}

export default function ToolPromptsPage({ params }) {
    const tool = getTool(params.slug)
    const prompts = getPromptsForTool(params.slug)
    if (!tool && prompts.length === 0) notFound()

    const toolName = tool ? tool.name : params.slug
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: `Prompts für ${toolName}`, path: `/prompts/tool/${params.slug}` },
    ]

    return (
        <>
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Tool-Prompts</p>
                <h1>Prompts für {toolName}</h1>
                <p className="lead">Getestete Vorlagen und Anweisungen speziell für {toolName}. Kopieren, ausfüllen und direkt im Tool nutzen.</p>
                {tool && (
                    <div style={{ marginTop: '1rem' }}>
                        <Link href={`/tools/${tool.slug}`} className="button secondary">
                            Zum Steckbrief {tool.name} ↗
                        </Link>
                        {' '}
                        <a href={toolHref(tool)} target="_blank" rel={toolRel(tool)} className="button primary">
                            {tool.name} öffnen ↗{tool.affiliate && <sup>*</sup>}
                        </a>
                    </div>
                )}
            </section>
            <section aria-labelledby="prompts-liste">
                <h2 id="prompts-liste">Alle Prompts für {toolName} ({prompts.length})</h2>
                {prompts.length === 0 ? (
                    <p>Für dieses Tool sind noch keine spezifischen Prompts hinterlegt. Schau bald wieder vorbei!</p>
                ) : (
                    <div className="grid">
                        {prompts.map((p) => (
                            <div key={p.slug} className="card">
                                <h3>
                                    <Link href={`/prompts/${p.slug}`}>{p.title}</Link>
                                </h3>
                                <p>{p.ziel}</p>
                                <span className="badge">{PROMPT_KATEGORIEN[p.kategorie]?.name || p.kategorie}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}
