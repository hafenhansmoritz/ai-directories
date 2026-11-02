import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import Faq, { faqSchema } from '../components/Faq'
import Toc from '../components/Toc'
import ToolCards from '../components/ToolCards'
import LeadMagnetBox from '../components/LeadMagnetBox'
import { Band, Trenner } from '../components/Deko'
import { SITE_NAME } from '../../lib/site'
import { getKbRubriken, kbStats, KB_STAND } from '../../lib/kb'
import { datumDe } from '../../lib/text'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

const FAQ = [
    {
        q: 'Was sind die besten KI-Tools 2026?',
        a: 'Die Tools, die von mehreren unabhängigen Community-Listen empfohlen werden: Bei Chatbots sind das zum Beispiel ChatGPT, Claude und Gemini, bei Bildern Midjourney und ClipDrop, bei Video Runway, bei Stimmen ElevenLabs. Welches für dich das beste ist, hängt von deiner Aufgabe ab.',
    },
    {
        q: 'Wie wird die Auswahl getroffen?',
        a: 'mentat.codes führt die drei größten frei lizenzierten KI-Tool-Listen auf GitHub zusammen. Pro Aufgabe stehen hier die Tools, die in den meisten dieser Listen vorkommen (Konsens). Das ist ein Qualitätssignal der Community, kein bezahltes Ranking.',
    },
    {
        q: 'Welches KI-Tool ist für Anfänger am besten?',
        a: 'Ein allgemeiner Chatbot wie ChatGPT, Claude oder Gemini deckt die meisten Aufgaben ab und hat einen Gratis-Tarif. Mit dem KI-Test auf mentat.codes findest du heraus, welcher davon deine Aufgaben am besten löst.',
    },
]

export const metadata = {
    title: 'Die besten KI-Tools 2026 nach Aufgabe',
    description: `Die besten KI-Tools für Texte, Bilder, Video, Stimmen, Recherche, Programmieren und mehr: pro Aufgabe die Favoriten aus ${kbStats().gesamt} Tools, nach Konsens der größten Community-Listen.`,
    alternates: { canonical: '/beste-ki-tools' },
}

function BesteKiTools() {
    const rubriken = getKbRubriken().map((r) => ({ ...r, top: [...r.tools].sort((a, b) => b.konsens - a.konsens || Number(b.deutsch) - Number(a.deutsch)).slice(0, 4) }))
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Beste KI-Tools', path: '/beste-ki-tools' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Die besten KI-Tools nach Aufgabe',
            itemListElement: rubriken.flatMap((r) => r.top.slice(0, 1)).map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: t.url })),
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Stand {datumDe(KB_STAND)} · {rubriken.length} Aufgaben</p>
                <h1>Die besten KI-Tools 2026, sortiert nach Aufgabe</h1>
                <p className="lead">
                    Kein bezahltes Ranking: Pro Aufgabe stehen hier die Tools, die <strong>mehrere unabhängige Community-Listen</strong> empfehlen. Darunter findest du jeweils alle Alternativen.
                </p>
            </section>
            <Toc items={rubriken.map((r) => [r.key, r.name.replace(/^KI[- ](für |fürs )?/, '')])} />
            <p className="box box-jean">
                Mein Tipp: Erst die Aufgabe klären, dann das Tool. Und bevor du ein Abo abschließt, mach den <Link href="/ki-test">KI-Test</Link> und rechne mit dem{' '}
                <Link href="/rechner/ki-zeitersparnis">Zeitersparnis-Rechner</Link> nach.
            </p>
            {rubriken.map((r, i) => (
                <section key={r.key} aria-labelledby={r.key}>
                    <h2 id={r.key}>{r.name}</h2>
                    <p>{r.intro}</p>
                    <ToolCards tools={r.top} />
                    <p>
                        <Link href={`/ki-tools/${r.key}`}>Alle {r.tools.length} Tools für {r.name.replace(/^KI[- ](für |fürs )?/, '')} →</Link>
                    </p>
                    {i === 4 && <LeadMagnetBox id="prompt-spickzettel" />}
                </section>
            ))}
            <Trenner art="strahlung" farbe="accent" />
            <Band farbe="pink" id="faq" titel="Fragen zu den besten KI-Tools 🙋">
                <Faq items={FAQ} />
            </Band>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <BesteKiTools />
            <Vernetzt pfad={seitenPfad('/beste-ki-tools')} />
        </>
    )
}
