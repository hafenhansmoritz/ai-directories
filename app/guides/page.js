import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import GuideGate from '../components/GuideGate'
import Faq, { faqSchema } from '../components/Faq'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { absoluteUrl, withBase } from '../../lib/site'
import { getGuides } from '../../lib/guides'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'

export const metadata = {
    title: 'Gratis-Guides als PDF: KI-Agenten, KI-Sichtbarkeit, Skills',
    description: 'Kostenlose PDF-Guides von AIGeddon: KI-Agenten-Fahrplan 2026, 30-Tage-Checkliste für Sichtbarkeit in ChatGPT und Google KI-Modus, KI-Skills-Starterkit. E-Mail eintragen, sofort herunterladen.',
    alternates: { canonical: '/guides' },
    openGraph: ogMeta({ url: '/guides' }),
    ...(getGuides().length ? {} : { robots: { index: false, follow: true } }),
}

const FAQ = [
    ['Kosten die Guides etwas?', 'Nein. Du trägst deine E-Mail-Adresse ein und bekommst den Download sofort. Neuigkeiten per Mail gibt es nur, wenn du das zusätzliche Häkchen setzt.'],
    ['Was passiert mit meiner E-Mail-Adresse?', 'Sie wird über den Formulardienst FormSubmit an Jean geschickt und nur für den Zweck genutzt, dem du zugestimmt hast. Details stehen in der Datenschutzerklärung. Du kannst jederzeit Auskunft oder Löschung verlangen.'],
    ['Wie aktuell sind die Inhalte?', 'Die Guides fassen die Ratgeber von AIGeddon zusammen, Stand Oktober 2026. Jede Angabe stammt aus offiziellen Quellen der Anbieter, die Ratgeber auf der Website werden laufend aktualisiert und nennen alle Quellen.'],
    ['Womit wurden die Guides gestaltet?', 'Mit Gamma, einem KI-Werkzeug für Präsentationen und Dokumente. Die Inhalte stammen aus den geprüften Ratgebern, Gamma hat Layout und Illustrationen übernommen.'],
]

function GuidesSeite() {
    const GUIDES = getGuides()
    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'Guides', path: '/guides' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Gratis-Guides von AIGeddon',
            itemListElement: GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.titel, url: absoluteUrl(`/guides#${g.id}`) })),
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">📥 {GUIDES.length} Gratis-Guides · PDF · sofort zum Download</p>
                <h1>Gratis-Guides: KI im Alltag, ohne Bullshit-Bingo</h1>
                <p className="lead">Kompakte PDFs zum Ausdrucken, Abhaken und Weitergeben. E-Mail eintragen, Guide herunterladen, loslegen.</p>
                <Jean>Ein Guide ist wie ein Werkstatthandbuch: nicht spannend zu lesen, aber unbezahlbar, wenn es klemmt.</Jean>
            </section>
            {!GUIDES.length && <p>Die ersten Guides sind in Arbeit und erscheinen hier in Kürze. Bis dahin: <Link href="/downloads">Gratis-Downloads</Link> und <Link href="/skills">KI-Skills</Link>.</p>}
            {GUIDES.map((g) => (
                <article key={g.id} id={g.id} className="guide-karte">
                    <img className="guide-cover" src={withBase(g.bild)} alt={`Titelseite: ${g.titel}`} width="300" height="424" loading="lazy" />
                    <div>
                        <h2>
                            {g.emoji} {g.titel}
                        </h2>
                        <p>{g.teaser}</p>
                        <ul>
                            {g.punkte.map((p) => (
                                <li key={p}>{p}</li>
                            ))}
                        </ul>
                        <div className="leadform guide-formular">
                            <GuideGate guide={g} />
                        </div>
                        <p>
                            Lieber online lesen? <Link href={`/ratgeber/${g.ratgeber}`}>Zum ausführlichen Ratgeber mit allen Quellen</Link>
                        </p>
                    </div>
                </article>
            ))}
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={FAQ} />
            </section>
            <p>
                Mehr zum Mitnehmen: <Link href="/downloads">Prompt-Spickzettel und Tabellen</Link> · <Link href="/skills">KI-Skills zum Installieren</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <GuidesSeite />
            <Vernetzt pfad={seitenPfad('/guides')} />
        </>
    )
}
