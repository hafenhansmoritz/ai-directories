import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../components/Faq'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import { Band } from '../../components/Deko'
import LaunchRechner from '../../components/LaunchRechner'
import { SITE_NAME } from '../../../lib/site'
import { RECHNER } from '../../../lib/rechner'
import { getSiteStats } from '../../../lib/data'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

const R = RECHNER.find((r) => r.slug === 'launch-zeit')

export const metadata = {
    title: 'Launch-Zeit-Rechner für KI-Verzeichnisse',
    description: 'Plane deinen KI-Tool-Launch: Anzahl Verzeichnisse, Minuten pro Eintrag und Einträge pro Tag einstellen, Arbeitszeit und Dauer sehen. Mit echten Zahlen aus der mentat.codes-Liste.',
    alternates: { canonical: '/rechner/launch-zeit' },
}

const FAQ = [
    {
        "q": "Wie viele Verzeichnisse sollte ich eintragen?",
        "a": "Lieber 20 bis 40 passende Verzeichnisse mit echtem Traffic als 200 Linkfriedhöfe. Starte mit den kostenlosen, reibungslosen Einträgen mit hohem Domain Rating."
    },
    {
        "q": "Wie lange dauert ein Eintrag?",
        "a": "Mit vorbereiteten Texten und Bildern meist 5 bis 10 Minuten. Ohne Vorbereitung kommen pro Eintrag schnell 15 Minuten für das Formulieren dazu."
    },
    {
        "q": "Kann ich das abgeben?",
        "a": "Ja, der Launch-Service von mentat.codes übernimmt das Eintragen. Details auf der Seite Werben."
    }
]

function LaunchRechnerMitDaten() {
    const s = getSiteStats()
    return <LaunchRechner gratis={s.free.length} reibungslos={s.freeAndSmooth.length} gesamt={s.total} />
}

function Page() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Rechner', path: '/rechner' },
        { name: R.titel, path: '/rechner/launch-zeit' },
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
                <LaunchRechnerMitDaten />
            </Band>
            <p className="box box-tipp">
                Texte einmal vorbereiten spart am meisten Zeit: <Link href="/launch-kit">Launch-Kit öffnen</Link>, danach mit den <Link href="/liste/kostenlos">kostenlosen Verzeichnissen</Link> anfangen.
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
            <Vernetzt pfad={seitenPfad('/rechner/launch-zeit')} />
        </>
    )
}
