import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Jean from '../../components/Jean'
import PromptArchiv from '../../components/PromptArchiv'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import { SITE_NAME } from '../../../lib/site'
import archiv from '../../../db/prompt-archiv.json'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

const KATEGORIEN = {
    business: 'Business',
    schreiben: 'Schreiben',
    karriere: 'Karriere & Coaching',
    lernen: 'Lernen & Denken',
    prompting: 'Prompts bauen',
    kreativ: 'Kreativ',
    alltag: 'Alltag',
    spiel: 'Spiele & Spaß',
}

export const metadata = {
    title: `Prompt-Archiv: ${archiv.anzahl} Rollen-Prompts für ChatGPT & Claude`,
    description: `${archiv.anzahl} bewährte Rollen-Prompts aus prompts.chat, dem größten Prompt-Projekt auf GitHub: Werbetexter, SEO-Spezialist, Karriere-Coach, Koch und mehr. Mit deutscher Antwort und Senden-Button.`,
    alternates: { canonical: '/prompts/archiv' },
}

function ArchivPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: 'Prompt-Archiv', path: '/prompts/archiv' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Prompt-Archiv: Rollen-Prompts',
            numberOfItems: archiv.anzahl,
            itemListElement: archiv.prompts.slice(0, 50).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.titel })),
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Prompt-Archiv · {archiv.anzahl} Rollen</p>
                <h1>Die Klassiker: „I want you to act as …“</h1>
                <p className="lead">
                    {archiv.anzahl} Rollen-Prompts aus <a href={archiv.quelle} rel="noopener">prompts.chat</a>, dem meistgesternten Prompt-Projekt auf GitHub. Aufklappen, auf Wunsch deutsche Antwort anhängen, absenden.
                </p>
            </section>
            <Jean>Die Prompts sind auf Englisch, weil die KI damit oft am präzisesten arbeitet. Der Haken „Antworte auf Deutsch“ ist schon gesetzt. Gern geschehen.</Jean>
            <PromptArchiv prompts={archiv.prompts} kategorien={KATEGORIEN} />
            <LeadMagnetBox id="prompt-paket" />
            <p className="source">
                Prompt-Texte: <a href={archiv.quelle} rel="noopener">f/prompts.chat</a> und Mitwirkende, gemeinfrei (CC0 1.0). Auswahl, deutsche Titel und Kategorien: mentat.codes. Eigene Vorlagen mit Ausfüllfeldern: <Link href="/prompts">Prompt-Bibliothek</Link>.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <ArchivPage />
            <Vernetzt pfad={seitenPfad('/prompts/archiv')} />
        </>
    )
}
