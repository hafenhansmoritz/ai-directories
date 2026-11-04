import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import Faq, { faqSchema } from '../components/Faq'
import { Band } from '../components/Deko'
import LeadForm from '../components/LeadForm'
import { SITE_NAME, SITE_URL, absoluteUrl } from '../../lib/site'
import { ANFRAGE_ID, WEBSITE_OPTIONEN, WEBSITE_PAKETE, euro } from '../../lib/angebote'

const AB = euro(WEBSITE_PAKETE[0].preis)

export const metadata = {
    title: `Website erstellen lassen: Festpreis ab ${AB}`,
    description: `Websites für Selbstständige, kleine Firmen und KI-Tool-Gründer: Anfrage-Seite, Onepager oder komplette Website zum Festpreis ab ${AB}. Erst die kostenlose Vorschau, dann zahlen.`,
    alternates: { canonical: '/website-erstellen-lassen' },
    openGraph: { url: '/website-erstellen-lassen' },
}

const FUER = [
    ['🧾', 'Selbstständige', 'Du brauchst eine Seite, über die Kunden dich finden und anfragen. Ohne Baukasten-Abo und ohne dass du selbst HTML lernen musst.'],
    ['🏢', 'Kleine Firmen', 'Die alte Seite ist langsam, auf dem Handy kaum lesbar oder seit Jahren nicht angefasst. Die neue übernimmt Inhalte und Adressen.'],
    ['🚀', 'KI-Tool-Gründer', 'Du brauchst eine schnelle, saubere Seite für dein Tool. Für ein Produkt mit Login, Bezahlung und Dashboard sind die Pakete nicht gedacht, das klären wir dann im Gespräch.'],
]

const ABLAUF = [
    ['✉️', 'Anfrage', 'Du schreibst über das Formular, was du brauchst. Jean meldet sich und klärt Inhalte, Paket und Zeitplan.'],
    ['👀', 'Kostenlose Vorschau', 'Bevor du zahlst, siehst du eine Vorschau deiner Seite. Gefällt sie dir nicht, ist nichts verloren.'],
    ['✅', 'Freischaltung', 'Nach den Korrekturrunden geht die Seite live. 50 % zahlst du bei Auftrag, 50 % bei Freischaltung, per Überweisung.'],
]

const FAQ = [
    {
        q: 'Was kostet eine Website bei Jean?',
        a: `${WEBSITE_PAKETE.map((p) => euro(p.preis)).join(', ')} als einmaliger Festpreis, je nach Paket. Domain und Hosting laufen auf deinen Namen, die Kosten dafür nennt Jean dir vorher.`,
    },
    {
        q: 'Ich habe keine Zeit, Texte zu schreiben. Geht es trotzdem?',
        a: 'Ja. Ab dem Onepager schreibt Jean die Texte aus deinen Stichworten. Du liest sie einmal und sagst, was nicht stimmt.',
    },
    {
        q: 'Gehört die Seite danach mir?',
        a: 'Ja. Domain und Inhalte gehören dir. Wenn du irgendwann woanders hinwillst, nimmst du alles mit.',
    },
    {
        q: 'Gibt es eine Garantie für Platz 1 bei Google?',
        a: 'Nein. Das kann niemand seriös versprechen. Die Seite ist technisch sauber, schnell und so aufgebaut, dass Google versteht, was du machst. Wer zusätzlich in KI-Antworten auftauchen will, findet das unter Beratung.',
    },
    {
        q: 'Was ist nach dem Launch?',
        a: 'Auf Wunsch gibt es Betreuung ab 29 € im Monat: Server, Updates und Sicherungen, dazu bis 30 Minuten Änderungen pro Monat. Pflicht ist das nicht.',
    },
]

export default function WebsiteSeite() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Beratung', path: '/beratung' },
        { name: 'Website erstellen lassen', path: '/website-erstellen-lassen' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        faqSchema(FAQ),
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${absoluteUrl('/website-erstellen-lassen')}#service`,
            name: 'Website erstellen lassen',
            serviceType: 'Webdesign',
            url: absoluteUrl('/website-erstellen-lassen'),
            provider: { '@id': `${SITE_URL}/#organisation` },
            areaServed: 'DE',
            offers: WEBSITE_PAKETE.map((p) => ({ '@type': 'Offer', name: p.name, price: p.preis, priceCurrency: 'EUR', description: p.kurz })),
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Für Selbstständige, KMU und KI-Tool-Gründer 🌐</p>
                <h1>Website erstellen lassen: fester Preis, erst die Vorschau</h1>
                <p className="lead">
                    Drei Pakete von {AB} bis {euro(WEBSITE_PAKETE[WEBSITE_PAKETE.length - 1].preis)}, einmalig. Schnell auf dem Handy, sauber für Google, und bevor du zahlst, siehst du
                    eine kostenlose Vorschau.
                </p>
                <Jean>Ein fester Preis ist wie ein Kostenvoranschlag in der Werkstatt: Du weißt vorher, was es kostet, nicht erst beim Abholen.</Jean>
                <p>
                    <a className="button" href={`#${ANFRAGE_ID}-unsicher`}>
                        Website anfragen →
                    </a>
                </p>
            </section>

            <section aria-labelledby="fuer-wen">
                <h2 id="fuer-wen">Für wen das passt 🎯</h2>
                <ul className="kriterien-grid">
                    {FUER.map(([icon, titel, text]) => (
                        <li key={titel}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {icon}
                            </span>
                            <strong>{titel}</strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="pakete">
                <h2 id="pakete">Die drei Pakete 📦</h2>
                <ul className="angebote">
                    {WEBSITE_PAKETE.map((p) => (
                        <li key={p.key}>
                            <span className="angebot-fuer">{p.hinweis || 'Festpreis, einmalig'}</span>
                            <h3>{p.name}</h3>
                            <p>
                                <strong>{euro(p.preis)}</strong> einmalig
                            </p>
                            <p>{p.kurz}</p>
                            <ul>
                                {p.liste.map((l) => (
                                    <li key={l}>{l}</li>
                                ))}
                            </ul>
                            <a className="button" href={`#${ANFRAGE_ID}-${p.key}`}>
                                {p.name} anfragen →
                            </a>
                        </li>
                    ))}
                </ul>
                <p>
                    Dazubuchbar: Betreuung ab 29 € im Monat mit Server, Updates, Sicherungen und bis 30 Minuten Änderungen pro Monat. Sichtbarkeit in ChatGPT und Co. gibt es als{' '}
                    <Link href="/beratung#beratung-seo">GEO-Beratung</Link>.
                </p>
            </section>

            <Band farbe="mint" id="ablauf" titel="So läuft es ab 🤝" sticker="3 Schritte">
                <ol className="kriterien-grid">
                    {ABLAUF.map(([icon, titel, text]) => (
                        <li key={titel}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {icon}
                            </span>
                            <strong>{titel}</strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ol>
            </Band>

            <LeadForm
                id={ANFRAGE_ID}
                optionen={WEBSITE_OPTIONEN}
                vorauswahl="unsicher"
                auswahlLabel="Welches Paket interessiert dich?"
                newsletter
                titel="Website anfragen ✉️"
                text="Schreib kurz, was du machst und ob es schon eine Seite gibt. Jean meldet sich in der Regel innerhalb von zwei Werktagen."
            />

            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={FAQ} />
            </section>
            <p>
                Mehr als eine Website? Coding-Agenten, KI-Workflows und GEO stehen unter <Link href="/beratung">Beratung</Link>.
            </p>
        </>
    )
}
