import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Faq, { faqSchema } from '../components/Faq'
import { SITE_NAME, absoluteUrl } from '../../lib/site'
import { autorRef } from '../../lib/autor'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: 'So prüfen wir: Quellen, Preise und Redaktionsregeln',
    description: 'Wie mentat.codes Fakten prüft: Preise nur von offiziellen Seiten, Herstellerangaben als solche markiert, sichtbares Prüfdatum, offene Korrekturen und ein ehrlicher Umgang mit KI beim Schreiben.',
    alternates: { canonical: '/so-pruefen-wir' },
}

const REGELN = [
    ['🔎', 'Offizielle Quelle zuerst', 'Jede Faktangabe zu Funktionen, Terminen und Regeln stammt von der offiziellen Seite des Anbieters, einer Behörde oder des Projekts. Presseberichte nutzen wir nur ergänzend und nennen sie als solche.'],
    ['💶', 'Preise nur vom Anbieter', 'Preise übernehmen wir ausschließlich von offiziellen Preisseiten oder Hilfe-Centern, mit Stand-Datum. Finden wir keinen offiziellen Preis, bleibt das Feld leer. Geschätzte oder abgeschriebene Preise gibt es bei uns nicht.'],
    ['🏷️', 'Herstellerangaben markiert', 'Was nur der Anbieter behauptet, steht als „laut Anbieter“ da. Kundenzitate und Benchmarks der Hersteller sind keine unabhängigen Tests, und wir schreiben das dazu.'],
    ['📅', 'Sichtbares Prüfdatum', 'Ratgeber, Vergleiche und News tragen ein Prüfdatum. Bis zu diesem Tag wurden alle Angaben mit den genannten Quellen abgeglichen. Die Quellen stehen am Ende jeder Seite.'],
    ['🧮', 'Nachvollziehbare Bewertung', 'Der Jean-Score für Verzeichnisse setzt sich aus festen Teilen zusammen: Domain Rating bis 45 Punkte, Besuche bis 25, Preis bis 20 und Einreichung bis 10. Domain Rating und Besuche sind Schätzwerte von Analyse-Tools.'],
    ['🤝', 'Geld kauft keinen Platz', 'Partnerlinks sind mit Sternchen markiert. Bezahlte Plätze und Anzeigen gibt es nicht. Bewertungen, Reihenfolgen und Prüfdaten ändern sich dadurch nicht. Details stehen auf der Seite Transparenz.'],
]

const FAQ = [
    {
        q: 'Schreibt mentat.codes Texte mit KI?',
        a: 'Ja, Texte entstehen mit Unterstützung von KI-Werkzeugen. Jede Faktangabe wird vor der Veröffentlichung gegen die genannten offiziellen Quellen geprüft, und Jean Maurice Port trägt die redaktionelle Verantwortung.',
    },
    {
        q: 'Was passiert, wenn eine Angabe falsch ist?',
        a: 'Schreib uns über das Formular „Frag Jean direkt“ unten auf jeder Seite. Wir prüfen die Angabe an der offiziellen Quelle, korrigieren sie und setzen das Prüfdatum neu.',
    },
    {
        q: 'Testet mentat.codes die Tools selbst?',
        a: 'Wo wir etwas selbst ausprobiert haben, steht das dabei. Alles andere stammt aus offiziellen Angaben und ist als „laut Anbieter“ gekennzeichnet. Wir behaupten keine Tests, die wir nicht gemacht haben.',
    },
    {
        q: 'Wie aktuell sind die Preise?',
        a: 'Jede Preisangabe trägt einen Stand. Preise können sich jederzeit ändern, maßgeblich ist immer die Preisseite des Anbieters, die wir auf jedem Steckbrief verlinken.',
    },
]

function SoPruefenWir() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'So prüfen wir', path: '/so-pruefen-wir' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'So prüfen wir',
            url: absoluteUrl('/so-pruefen-wir'),
            inLanguage: 'de-DE',
            author: autorRef(),
            about: { '@id': `${absoluteUrl('/')}#organisation` },
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Redaktionsregeln</p>
                <h1>So prüfen wir: Quellen, Preise und Regeln</h1>
                <p className="lead">Sechs Regeln, an die sich jede Seite auf mentat.codes hält. Damit du weißt, was eine Zahl hier wert ist, und wo du selbst nachschauen kannst.</p>
                <Jean>Witze dürfen hier erfunden sein. Zahlen nie. Das ist die eine Regel, für die ich auch nachts aufstehe.</Jean>
            </section>

            <section aria-labelledby="regeln">
                <h2 id="regeln">Die sechs Regeln</h2>
                <ul className="link-cards">
                    {REGELN.map(([emoji, titel, text]) => (
                        <li key={titel}>
                            <strong>
                                <span aria-hidden="true">{emoji}</span> {titel}
                            </strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="verantwortung">
                <h2 id="verantwortung">Wer verantwortet die Inhalte?</h2>
                <p>
                    Jean Maurice Port, SEO-Manager, plant, schreibt und prüft die Inhalte. Wer er ist und was er beruflich macht, steht auf der Seite <Link href="/ueber-jean">Über Jean</Link>. Wie sich die Seite finanziert,
                    erklärt <Link href="/transparenz">Transparenz</Link>.
                </p>
                <p>
                    Für Preise, Sperrungen von Verzeichnissen und neue KI-Modelle sind regelmäßige Prüfläufe eingeplant. Was dabei auffällt, wird an der offiziellen Quelle nachgeprüft, bevor es auf die Seite kommt.
                </p>
            </section>

            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={FAQ} />
            </section>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <SoPruefenWir />
            <Vernetzt pfad={seitenPfad('/so-pruefen-wir')} />
        </>
    )
}
