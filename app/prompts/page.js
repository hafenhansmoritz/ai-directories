import Link from 'next/link'
import { getToolPromptSeiten } from '../../lib/prompt-tools'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JeanIcon from '../components/JeanIcon'
import { SITE_NAME } from '../../lib/site'
import { promptsByKategorie, getPrompts, TECHNIKEN } from '../../lib/prompts'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import PromptCardList from '../components/PromptCardList'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: 'KI-Prompts auf Deutsch: Vorlagen für ChatGPT & Claude',
    description: `${getPrompts().length} Prompt-Vorlagen für SEO, Content, YouTube, Launch und Business. Felder ausfüllen, Vorschau sehen, mit einem Klick an ChatGPT, Claude, Perplexity oder Grok senden.`,
    alternates: { canonical: '/prompts' },
}

function PromptsPage() {
    const kategorien = promptsByKategorie().filter((k) => k.prompts.length)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Prompt-Bibliothek</p>
                <h1>Prompts, die funktionieren. Ausfüllen, klicken, fertig.</h1>
                <p className="lead">
                    {getPrompts().length} Vorlagen auf Deutsch. Jede erklärt, welche Technik drinsteckt, und geht mit einem Klick an <strong>ChatGPT, Claude, Perplexity oder Grok</strong>.
                </p>
                <p className="cta-row">
                    <Link className="button" href="/prompt-baukasten">
                        Eigenen Prompt bauen →
                    </Link>
                    <Link href="/prompts/archiv">103 Rollen-Prompts im Archiv</Link>
                    {getToolPromptSeiten().map((x) => (
                        <Link key={x.slug} href={`/prompts/tool/${x.slug}`}>
                            {x.tool.name}-Prompts
                        </Link>
                    ))}
                    <Link href="/prompt-check">Prompt prüfen</Link>
                    <Link href="/tutorials/prompt-engineering-in-15-minuten">Grundkurs in 15 Minuten</Link>
                </p>
            </section>
            {kategorien.map((k) => (
                <section key={k.key} aria-labelledby={`kat-${k.key}`}>
                    <h2 id={`kat-${k.key}`} className="with-icon">
                        <JeanIcon badge={k.icon} size={34} /> <Link href={`/prompts/kategorie/${k.key}`}>{k.name}</Link>
                    </h2>
                    <PromptCardList prompts={k.prompts} />
                </section>
            ))}
            <LeadMagnetBox id="prompt-paket" anlass="Alle Vorlagen aus der Bibliothek auf einmal, statt jede einzeln zu kopieren." />
            <section aria-labelledby="techniken">
                <h2 id="techniken">Die 8 Techniken hinter guten Prompts</h2>
                <dl className="technik-liste">
                    {Object.entries(TECHNIKEN).map(([key, [name, text]]) => (
                        <div key={key}>
                            <dt>{name}</dt>
                            <dd>{text}</dd>
                        </div>
                    ))}
                </dl>
                <p>
                    Begriffe wie Few-Shot, Token oder Kontextfenster? <Link href="/glossar#ki">Zum KI-Glossar →</Link>
                </p>
            </section>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <PromptsPage />
            <Vernetzt pfad={seitenPfad('/prompts')} />
        </>
    )
}
