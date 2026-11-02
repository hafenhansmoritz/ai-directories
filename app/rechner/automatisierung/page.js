import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../components/Faq'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import { Band } from '../../components/Deko'
import AutomatisierungsRechner from '../../components/AutomatisierungsRechner'
import { SITE_NAME } from '../../../lib/site'
import { RECHNER } from '../../../lib/rechner'
import { getTool, TOOLS_STAND } from '../../../lib/tools'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

const R = RECHNER.find((r) => r.slug === 'automatisierung')

export const metadata = {
    title: 'Automatisierungs-Rechner: Lohnt sich Make, Zapier oder n8n?',
    description: 'Rechne aus, wie viel Handarbeit eine Automatisierung pro Jahr spart und ab wann sich der Aufbau lohnt. Mit Einstiegspreisen von Make, Zapier und n8n laut Anbieter.',
    alternates: { canonical: '/rechner/automatisierung' },
}

const FAQ = [
    {
        "q": "Welche Aufgaben lohnen sich zu automatisieren?",
        "a": "Wiederkehrende Abläufe mit klaren Regeln: Leads aus Formularen übernehmen, Rechnungen ablegen, Benachrichtigungen verschicken, Daten zwischen Tools abgleichen. Je häufiger und je länger von Hand, desto größer der Hebel."
    },
    {
        "q": "Make, Zapier oder n8n?",
        "a": "Zapier ist besonders einfach, Make stark bei verzweigten Abläufen und günstig im Einstieg, n8n lässt sich selbst hosten. Der Vergleich auf mentat.codes gibt je Anwendungsfall eine Empfehlung."
    },
    {
        "q": "Wie lange dauert der Aufbau?",
        "a": "Einfache Abläufe mit zwei Apps oft unter einer Stunde, verzweigte Abläufe mit Fehlerbehandlung mehrere Stunden. Plane Zeit für Tests ein."
    }
]

const AUTO_TOOLS = ['make', 'zapier', 'n8n'].map(getTool).filter(Boolean)

function Page() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Rechner', path: '/rechner' },
        { name: R.titel, path: '/rechner/automatisierung' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: R.titel,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description: R.kurz,
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    Rechner · {R.emoji}
                </p>
                <h1>{R.titel}</h1>
                <p className="lead">{R.kurz}</p>
            </section>
            <Band farbe="gelb" id="rechnen" titel="Jetzt rechnen">
                <AutomatisierungsRechner tools={AUTO_TOOLS} />
            </Band>
            <p className="box box-tipp">
                Welches Tool passt? <Link href="/tool-vergleiche/make-vs-zapier-vs-n8n">Make vs. Zapier vs. n8n im Vergleich</Link>. Den Ablauf planst du mit dem Prompt <Link href="/prompts/automatisierung-planen">Automatisierung planen</Link>. Preise laut Anbieter, Stand {TOOLS_STAND}.
            </p>
            <Band farbe="pink" id="faq" titel="Fragen und Antworten 🙋">
                <Faq items={FAQ} />
            </Band>
            <section aria-labelledby="mehr">
                <h2 id="mehr">Weitere Rechner</h2>
                <ul className="link-cards">
                    {RECHNER.filter((r) => r.slug !== R.slug).map((r) => (
                        <li key={r.slug}>
                            <Link href={`/rechner/${r.slug}`}>
                                <strong>
                                    {r.emoji} {r.titel}
                                </strong>
                            </Link>
                            <span>{r.kurz}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <LeadMagnetBox id="prompt-spickzettel" />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <Page />
            <Vernetzt pfad={seitenPfad('/rechner/automatisierung')} />
        </>
    )
}
