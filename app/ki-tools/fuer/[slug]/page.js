import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../../components/Faq'
import Quellen from '../../../components/Quellen'
import Toc from '../../../components/Toc'
import LeadMagnetBox from '../../../components/LeadMagnetBox'
import { Band } from '../../../components/Deko'
import { SITE_NAME } from '../../../../lib/site'
import { getKbTool, kbPfad } from '../../../../lib/kb'
import { getPrompt } from '../../../../lib/prompts'
import { getTutorial } from '../../../../lib/tutorials'
import { RECHNER } from '../../../../lib/rechner'
import { ZIELGRUPPEN, getZielgruppe } from '../../../../lib/zielgruppen'
import Vernetzt, { seitenPfad } from '../../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return ZIELGRUPPEN.map((z) => ({ slug: z.slug }))
}

export function generateMetadata({ params }) {
    const z = getZielgruppe(params.slug)
    if (!z) return {}
    return {
        title: `${z.titel} 2026`,
        description: `${z.intro} Mit passenden Tools, fertigen Prompts und Tutorial.`.slice(0, 300),
        alternates: { canonical: `/ki-tools/fuer/${z.slug}` },
    }
}

const FARBEN = ['#fde68a', '#a7f3d0', '#bfdbfe', '#fbcfe8', '#ddd6fe']

function ZielgruppePage({ params }) {
    const z = getZielgruppe(params.slug)
    if (!z) notFound()
    const tutorial = getTutorial(z.tutorial)
    const rechner = z.rechner && RECHNER.find((r) => r.slug === z.rechner)
    const andere = ZIELGRUPPEN.filter((x) => x.slug !== z.slug)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tool-Datenbank', path: '/ki-tools' },
        { name: z.titel, path: `/ki-tools/fuer/${z.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: z.titel,
            itemListElement: z.aufgaben.map(([, aufgabe], i) => ({ '@type': 'ListItem', position: i + 1, name: aufgabe })),
        },
        faqSchema(z.faq),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    Für {z.name} · {z.aufgaben.length} Aufgaben
                </p>
                <h1>{z.titel}</h1>
                <p className="lead">{z.intro}</p>
            </section>
            <Toc
                items={[
                    ['aufgaben', 'Aufgaben & Tools'],
                    ['achtung', 'Wichtig'],
                    ['lernen', 'Lernen'],
                    ['faq', 'FAQ'],
                ]}
            />
            <section aria-labelledby="aufgaben">
                <h2 id="aufgaben">Wofür {z.name} KI einsetzen 🧰</h2>
                <ol className="zg-aufgaben">
                    {z.aufgaben.map(([emoji, aufgabe, text, tools, prompt], i) => {
                        const p = prompt && getPrompt(prompt)
                        return (
                            <li key={aufgabe} style={{ '--tile': FARBEN[i % FARBEN.length] }}>
                                <span className="zg-emoji" aria-hidden="true">
                                    {emoji}
                                </span>
                                <h3>{aufgabe}</h3>
                                <p>{text}</p>
                                <p className="zg-tools">
                                    {tools.map(getKbTool).filter(Boolean).map((t) => (
                                        <Link key={t.slug} href={kbPfad(t)}>
                                            {t.name}
                                        </Link>
                                    ))}
                                </p>
                                {p && (
                                    <Link className="zg-prompt" href={`/prompts/${p.slug}`}>
                                        💬 Prompt: {p.title} →
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </section>
            <Band farbe="pink" id="achtung" titel="Das solltest du beachten ⚠️">
                <p className="box box-achtung">{z.achtung}</p>
            </Band>
            <section aria-labelledby="lernen">
                <h2 id="lernen">Schneller besser werden</h2>
                <ul className="link-cards">
                    {tutorial && (
                        <li>
                            <Link href={`/tutorials/${tutorial.slug}`}>
                                <strong>🎓 {tutorial.title}</strong>
                            </Link>
                            <span>{tutorial.minuten} Minuten, interaktiv mit Quiz</span>
                        </li>
                    )}
                    {rechner && (
                        <li>
                            <Link href={`/rechner/${rechner.slug}`}>
                                <strong>🧮 {rechner.titel}</strong>
                            </Link>
                            <span>{rechner.kurz}</span>
                        </li>
                    )}
                    <li>
                        <Link href="/ki-test">
                            <strong>🧪 KI-Test</strong>
                        </Link>
                        <span>ChatGPT, Claude und Gemini mit denselben Aufgaben selbst vergleichen.</span>
                    </li>
                    <li>
                        <Link href="/ratgeber/ki-tools-datenschutz-dsgvo">
                            <strong>🔒 KI und Datenschutz</strong>
                        </Link>
                        <span>Die DSGVO-Checkliste vor dem Einsatz von KI-Tools.</span>
                    </li>
                    <li>
                        <Link href="/prompts">
                            <strong>💬 Prompt-Bibliothek</strong>
                        </Link>
                        <span>Fertige Vorlagen zum Ausfüllen und Absenden.</span>
                    </li>
                </ul>
            </section>
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={z.faq} />
            </section>
            <Quellen quellen={z.quellen} geprueft={z.geprueft} />
            <LeadMagnetBox id="prompt-paket" />
            <section aria-labelledby="andere">
                <h2 id="andere">KI-Tools für andere Zielgruppen</h2>
                <ul className="kb-hero-chips">
                    {andere.map((x) => (
                        <li key={x.slug}>
                            <Link href={`/ki-tools/fuer/${x.slug}`}>{x.titel.replace('KI-Tools für ', '')}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ZielgruppePage params={params} />
            <Vernetzt pfad={seitenPfad('/ki-tools/fuer/[slug]', params)} />
        </>
    )
}
