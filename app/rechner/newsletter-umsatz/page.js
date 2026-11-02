import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../components/Faq'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import { Band } from '../../components/Deko'
import NewsletterRechner from '../../components/NewsletterRechner'
import { SITE_NAME } from '../../../lib/site'
import { RECHNER } from '../../../lib/rechner'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

const R = RECHNER.find((r) => r.slug === 'newsletter-umsatz')

export const metadata = {
    title: 'Newsletter-Umsatz-Rechner: Was bringt mein Newsletter?',
    description: 'Vom Abonnenten zum Umsatz: Öffnungsrate, Klickrate, Abschlussrate und Ertrag pro Verkauf einstellen und Ertrag pro Ausgabe, Monat und Abonnent sehen.',
    alternates: { canonical: '/rechner/newsletter-umsatz' },
}

const FAQ = [
    {
        "q": "Was ist eine gute Öffnungsrate?",
        "a": "Das hängt stark von Branche, Liste und Messmethode ab; manche Mailprogramme laden Bilder automatisch und verfälschen die Öffnungsrate. Vergleiche lieber deine eigenen Ausgaben miteinander als mit fremden Durchschnittswerten."
    },
    {
        "q": "Wie verdient ein Newsletter Geld?",
        "a": "Mit eigenen Produkten, Partnerlinks, Sponsoring-Plätzen oder bezahlten Abos. Der Rechner zeigt den Ertrag aus Klicks und Abschlüssen; Sponsoring kommt bei großen Listen dazu."
    },
    {
        "q": "Welches Newsletter-Tool soll ich nehmen?",
        "a": "Der Vergleich beehiiv vs. Kit vs. GetResponse vs. Brevo auf mentat.codes zeigt, welches Tool zu welchem Ziel passt."
    }
]

function Page() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Rechner', path: '/rechner' },
        { name: R.titel, path: '/rechner/newsletter-umsatz' },
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
                <NewsletterRechner />
            </Band>
            <p className="box box-tipp">
                Tool gesucht? <Link href="/tool-vergleiche/beehiiv-vs-kit-vs-getresponse-vs-brevo">beehiiv vs. Kit vs. GetResponse vs. Brevo</Link>. Schneller schreiben: <Link href="/tutorials/newsletter-mit-ki-in-einer-stunde">Newsletter mit KI in einer Stunde</Link>.
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
            <Vernetzt pfad={seitenPfad('/rechner/newsletter-umsatz')} />
        </>
    )
}
