import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../../components/Faq'
import ToolCards from '../../../components/ToolCards'
import { Band } from '../../../components/Deko'
import { SITE_NAME } from '../../../../lib/site'
import { KB_RUBRIKEN, KB_STAND } from '../../../../lib/kb'
import { datumDe } from '../../../../lib/text'
import { ALTERNATIVEN, getAlternativenHub, getAlternativenHubs, alternativenFaq } from '../../../../lib/alternativen'
import Vernetzt, { seitenPfad } from '../../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return ALTERNATIVEN.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
    const h = getAlternativenHub(params.slug)
    if (!h) return {}
    const top = h.liste.slice(0, 4).map((t) => t.name)
    return {
        title: `${h.tool.name}-Alternativen 2026: ${h.liste.length} Tools im Überblick`,
        description: `Die besten ${h.tool.name}-Alternativen: ${top.join(', ')} und mehr, mit Einordnung aus den größten Community-Listen. Mit Open-Source- und Gratis-Optionen.`.slice(0, 300),
        alternates: { canonical: `/ki-tools/alternativen/${h.slug}` },
    }
}

function AlternativenPage({ params }) {
    const h = getAlternativenHub(params.slug)
    if (!h) notFound()
    const n = h.tool.name
    const faq = alternativenFaq(h)
    const r = KB_RUBRIKEN[h.tool.rubrik]
    const andere = getAlternativenHubs().filter((x) => x.slug !== h.slug)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tool-Datenbank', path: '/ki-tools' },
        { name: 'Alternativen', path: '/ki-tools/alternativen' },
        { name: `${n}-Alternativen`, path: `/ki-tools/alternativen/${h.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${n}-Alternativen`,
            numberOfItems: h.liste.length,
            itemListElement: h.liste.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: t.url })),
        },
        faqSchema(faq),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    {r.name} · {h.liste.length} Alternativen
                </p>
                <h1>{n}-Alternativen: {h.liste.length} Tools im Überblick</h1>
                <p className="lead">{h.grund}</p>
                <p className="cta-row">
                    <Link className="button" href={`/ki-tools/tool/${h.tool.slug}`}>
                        Was ist {n}? →
                    </Link>
                    {h.tool.profil && <Link href={`/tools/${h.tool.profil.slug}`}>🧔 {n}: Preise im Steckbrief →</Link>}
                </p>
            </section>
            <Band farbe="gelb" id="achte" titel={`Darauf achtest du beim Wechsel 🧭`} sticker={`${h.achte.length} Punkte`}>
                <ul className="kriterien-grid">
                    {h.achte.map((a, i) => (
                        <li key={a}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'][i]}
                            </span>
                            <strong>{a}</strong>
                        </li>
                    ))}
                </ul>
                <p className="box box-tipp">
                    Teste zwei oder drei Kandidaten mit derselben echten Aufgabe aus deinem Alltag. Das sagt mehr als jede Rangliste.
                    {h.tool.rubrik === 'chatbots' && (
                        <>
                            {' '}
                            Im <Link href="/ki-test">KI-Test</Link> geht das mit fertigen Aufgaben und Bewertungsbogen.
                        </>
                    )}
                </p>
            </Band>
            <section aria-labelledby="liste">
                <h2 id="liste">
                    Die {h.liste.length} {n}-Alternativen
                </h2>
                <p>Die bekanntesten Alternativen zuerst, danach weitere aus derselben Rubrik. 🏆 steht in allen drei großen Community-Listen, 🥈 in zwei, 🔓 heißt Open Source.</p>
                <ToolCards tools={h.liste} />
                <p>
                    <Link href={`/ki-tools/${h.tool.rubrik}`}>
                        Alle {r.name} in der Datenbank →
                    </Link>
                </p>
            </section>
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen zu {n}-Alternativen 🙋</h2>
                <Faq items={faq} />
            </section>
            <section aria-labelledby="mehr">
                <h2 id="mehr">Weitere Alternativen</h2>
                <ul className="kb-hero-chips">
                    {andere.map((x) => (
                        <li key={x.slug}>
                            <Link href={`/ki-tools/alternativen/${x.slug}`}>{x.tool.name}-Alternativen</Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/ki-tools/chatgpt-alternativen">ChatGPT-Alternativen</Link>
                    </li>
                </ul>
            </section>
            <p className="source">
                Stand {datumDe(KB_STAND)}. Auswahl aus der KI-Tool-Datenbank, Empfehlungen aus drei offenen GitHub-Listen. <Link href="/ki-tools/quellen">Quellen und Lizenzen</Link>
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <AlternativenPage params={params} />
            <Vernetzt pfad={seitenPfad('/ki-tools/alternativen/[slug]', params)} />
        </>
    )
}
