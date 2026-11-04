import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import Faq, { faqSchema } from '../components/Faq'
import { Band } from '../components/Deko'
import LeadForm from '../components/LeadForm'
import { SITE_NAME, SITE_URL, absoluteUrl } from '../../lib/site'
import { AUTOR_ID } from '../../lib/autor'
import { ANFRAGE_ID, BERATUNG, BERATUNG_OPTIONEN, WEBSITE_PAKETE, euro } from '../../lib/angebote'

export const metadata = {
    title: 'KI-Beratung: Coding-Agenten, Automationen und GEO',
    description:
        'Jean hilft dir, KI-Coding-Agenten wie Claude Code im Team einzuführen, KI-Workflows für deinen Alltag zu bauen und in KI-Antworten sichtbar zu werden. Start mit einem kostenlosen Erstgespräch (30 Minuten).',
    alternates: { canonical: '/beratung' },
    openGraph: { url: '/beratung' },
}

const ERSTGESPRAECH = [
    ['⏱️', '30 Minuten, kostenlos', 'Kein Verkaufsgespräch mit Countdown. Du erzählst, wo es hakt, Jean sagt ehrlich, ob und wie er helfen kann.'],
    ['🎯', 'Mit Ergebnis', 'Du gehst mit zwei, drei konkreten nächsten Schritten raus, auch wenn du danach nichts buchst.'],
    ['📅', 'Termin per Mail', 'Schick das Formular ab, Jean meldet sich in der Regel innerhalb von zwei Werktagen mit Terminvorschlägen.'],
]

const FAQ = [
    {
        q: 'Was kostet die Beratung?',
        a: 'Das Erstgespräch (30 Minuten) ist kostenlos. Alles danach hängt vom Umfang ab: Teamgröße, Anzahl der Workflows, Größe der Website. Du bekommst nach dem Gespräch ein konkretes Angebot und entscheidest dann.',
    },
    {
        q: 'Brauche ich schon Claude Code oder Codex?',
        a: 'Nein. Welcher Agent zu eurem Stack, Budget und euren Datenschutz-Vorgaben passt, ist meist die erste Frage im Gespräch. Einen Überblick gibt der Ratgeber zum Vergleich der Terminal-Coding-Agenten.',
    },
    {
        q: 'Gibt es eine Garantie für Rankings oder Nennungen in ChatGPT?',
        a: 'Nein. Wer dir Platz 1 bei Google oder eine feste Nennung in KI-Antworten garantiert, verkauft dir etwas anderes als SEO. Was es gibt: einen ehrlichen Befund und eine Reihenfolge, die Sinn ergibt.',
    },
    {
        q: 'Wie schnell meldet sich Jean?',
        a: 'In der Regel innerhalb von zwei Werktagen per Mail an die Adresse aus dem Formular.',
    },
]

export default function BeratungSeite() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Beratung', path: '/beratung' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        faqSchema(FAQ),
        {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': `${absoluteUrl('/beratung')}#service`,
            name: `${SITE_NAME} Beratung`,
            url: absoluteUrl('/beratung'),
            provider: { '@id': `${SITE_URL}/#organisation` },
            founder: { '@id': AUTOR_ID },
            areaServed: 'DE',
            inLanguage: 'de-DE',
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Beratung',
                itemListElement: BERATUNG.map((a) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: a.name, description: a.ergebnis } })),
            },
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Für Teams, Selbstständige und KI-Tool-Gründer 🔧</p>
                <h1>Lieber machen lassen? Jean hilft bei KI im Alltag</h1>
                <p className="lead">
                    Auf mentat.codes erkläre ich, wie KI-Tools funktionieren. Hier kannst du mich buchen, wenn du es nicht selbst einrichten willst: Coding-Agenten fürs
                    Team, Automationen für deinen Alltag oder Sichtbarkeit in Google und KI-Antworten.
                </p>
                <Jean>Erst reden, dann schrauben. Wer ohne Diagnose Teile tauscht, zahlt doppelt.</Jean>
                <p>
                    <a className="button" href={`#${ANFRAGE_ID}-erstgespraech`}>
                        Kostenloses Erstgespräch anfragen →
                    </a>
                </p>
            </section>

            <section aria-labelledby="angebote">
                <h2 id="angebote">Was du buchen kannst 🧰</h2>
                <ul className="angebote">
                    {BERATUNG.map((a) => (
                        <li key={a.key} id={`beratung-${a.key}`}>
                            <span className="angebot-fuer">{a.fuer}</span>
                            <h3>
                                <span aria-hidden="true">{a.emoji}</span> {a.name}
                            </h3>
                            <p>
                                <strong>Für wen:</strong> {a.wer}
                            </p>
                            <p>
                                <strong>Ergebnis:</strong> {a.ergebnis}
                            </p>
                            <p>
                                <strong>Ablauf:</strong>
                            </p>
                            <ol>
                                {a.schritte.map(([titel, text]) => (
                                    <li key={titel}>
                                        <strong>{titel}:</strong> {text}
                                    </li>
                                ))}
                            </ol>
                            <p>
                                <strong>Preis:</strong> auf Anfrage, nach dem kostenlosen Erstgespräch.
                            </p>
                            <p className="angebot-fuer">
                                Zum Einlesen:{' '}
                                {a.links.map(([href, label], i) => (
                                    <span key={href}>
                                        {i > 0 && ' · '}
                                        <Link href={href}>{label}</Link>
                                    </span>
                                ))}
                            </p>
                            <a className="button" href={`#${ANFRAGE_ID}-${a.key}`}>
                                Anfragen →
                            </a>
                        </li>
                    ))}
                    <li id="beratung-launch">
                        <span className="angebot-fuer">Für KI-Tool-Gründer</span>
                        <h3>
                            <span aria-hidden="true">🚀</span> Launch-Service für dein KI-Tool
                        </h3>
                        <p>
                            Jean trägt dein Tool in die passenden KI-Verzeichnisse ein, mit Texten, Screenshots, Tracking-Links und Protokoll. Alle Details, Ablauf und Mediadaten stehen auf
                            der Seite Werben.
                        </p>
                        <Link className="button" href="/werben">
                            Launch-Service ansehen →
                        </Link>
                    </li>
                    <li id="beratung-website">
                        <span className="angebot-fuer">Für Selbstständige und KMU</span>
                        <h3>
                            <span aria-hidden="true">🌐</span> Website erstellen lassen
                        </h3>
                        <p>
                            Drei Pakete zum Festpreis von {euro(WEBSITE_PAKETE[0].preis)} bis {euro(WEBSITE_PAKETE[WEBSITE_PAKETE.length - 1].preis)}, mit kostenloser Vorschau, bevor du
                            zahlst.
                        </p>
                        <Link className="button" href="/website-erstellen-lassen">
                            Pakete ansehen →
                        </Link>
                    </li>
                </ul>
            </section>

            <Band farbe="mint" id="erstgespraech" titel="Der Einstieg: kostenloses Erstgespräch ☕" sticker="30 Minuten">
                <ul className="kriterien-grid">
                    {ERSTGESPRAECH.map(([icon, titel, text]) => (
                        <li key={titel}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {icon}
                            </span>
                            <strong>{titel}</strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </Band>

            <LeadForm
                id={ANFRAGE_ID}
                optionen={BERATUNG_OPTIONEN}
                auswahlLabel="Welches Angebot interessiert dich?"
                mitWebsite={false}
                newsletter
                titel="Erstgespräch oder Angebot anfragen ✉️"
                text="Schreib in zwei, drei Sätzen, worum es geht. Jean antwortet persönlich, meist innerhalb von zwei Werktagen."
            />

            <section aria-labelledby="faq">
                <h2 id="faq">Fragen vor der Anfrage 🙋</h2>
                <Faq items={FAQ} />
            </section>
            <p>
                Wer hinter mentat.codes steht, steht unter <Link href="/ueber-jean">Über Jean</Link>. Wie sich die Seite finanziert, erklärt <Link href="/transparenz">Transparenz</Link>.
            </p>
        </>
    )
}
