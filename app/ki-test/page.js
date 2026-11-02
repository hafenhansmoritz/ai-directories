import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import Faq, { faqSchema } from '../components/Faq'
import KiTestSuite from '../components/KiTestSuite'
import LeadMagnetBox from '../components/LeadMagnetBox'
import { Band, Trenner } from '../components/Deko'
import { SITE_NAME } from '../../lib/site'
import { TESTS, TEST_KATEGORIEN, getTestKategorien } from '../../lib/kitests'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

export const metadata = {
    title: { absolute: 'KI-Test 2026: ChatGPT, Claude & Gemini selbst testen | mentat.codes' },
    description: `Der interaktive KI-Test: ${TESTS.length} standardisierte Aufgaben zu Logik, Fakten, Halluzinationen, Deutsch, Kreativität und Code. Mit einem Klick an jede KI senden, Antworten bewerten, eigene Rangliste erhalten. Kostenlos, im Browser.`,
    alternates: { canonical: '/ki-test' },
}

const FAQ = [
    {
        q: 'Welche KI ist die beste?',
        a: 'Das hängt von der Aufgabe ab. Ein Modell kann bei Code vorn liegen und bei deutscher Grammatik schwächeln. Deshalb testet der KI-Test sechs Bereiche getrennt; dein Ergebnis zeigt, welche KI für deine Aufgaben am besten ist.',
    },
    {
        q: 'Warum veröffentlicht mentat.codes keine eigenen Testergebnisse?',
        a: 'Weil sich KI-Modelle laufend ändern und Ergebnisse von Tarif, Modellversion und Einstellungen abhängen. Ein Test von gestern kann heute falsch sein. Mit dem Selbsttest bekommst du ein Ergebnis für genau deine Version und deinen Tarif.',
    },
    {
        q: 'Was ist eine Halluzination bei KI?',
        a: 'Eine Halluzination ist eine überzeugend formulierte, aber falsche oder erfundene Antwort, etwa ein Buch, eine Studie oder ein Zitat, das es nicht gibt. Die Kategorie „Halluzinationen & Ehrlichkeit“ prüft genau das.',
    },
    {
        q: 'Werden meine Antworten gespeichert?',
        a: 'Nein. Deine Bewertungen bleiben in deinem Browser (lokaler Speicher). Die Prompts gehen erst an eine KI, wenn du auf einen Senden-Button klickst, und zwar direkt an deren Seite.',
    },
    {
        q: 'Wie bewerte ich eine Antwort richtig?',
        a: 'Klappe bei jeder Aufgabe „Woran du eine gute Antwort erkennst“ auf. Dort stehen die Kriterien und, wo es eine eindeutige Lösung gibt, auch die Lösung. Alle Kriterien erfüllt: richtig; einige: teilweise; keines: falsch.',
    },
]

function KiTestPage() {
    const kategorien = getTestKategorien()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Test', path: '/ki-test' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'mentat.codes KI-Test',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description: `Interaktiver Vergleichstest für KI-Chatbots mit ${TESTS.length} Aufgaben in ${kategorien.length} Kategorien.`,
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">KI-Test · {TESTS.length} Aufgaben · 6 Kategorien</p>
                <h1>KI-Test: Welche KI ist wirklich die beste für dich?</h1>
                <p className="lead">
                    ChatGPT, Claude, Gemini, Perplexity, Grok und Copilot im direkten Vergleich, <strong>getestet von dir</strong>. Aufgabe mit einem Klick an jede KI senden, Antwort bewerten, am Ende steht deine persönliche Rangliste.
                </p>
            </section>

            <Band farbe="blau" id="so-gehts" titel="So funktioniert der Test 🧪" sticker="3 Minuten pro Aufgabe">
                <ol className="steps-row">
                    <li>
                        <strong>KIs wählen</strong>
                        <span>Bis zu sechs Chatbots gleichzeitig.</span>
                    </li>
                    <li>
                        <strong>Aufgabe senden</strong>
                        <span>Ein Klick öffnet die KI mit dem Prompt.</span>
                    </li>
                    <li>
                        <strong>Antwort bewerten</strong>
                        <span>Mit Kriterien und Lösung zum Abgleich.</span>
                    </li>
                    <li>
                        <strong>Rangliste sehen</strong>
                        <span>Live-Zwischenstand, am Ende Konfetti.</span>
                    </li>
                </ol>
            </Band>

            <ul className="entry-tiles">
                {kategorien.map((k, i) => (
                    <li key={k.key}>
                        <Link href={`/ki-test/${k.key}`} style={{ '--tile': ['#bfdbfe', '#fde68a', '#fbcfe8', '#a7f3d0', '#ddd6fe', '#e5e7eb'][i % 6] }}>
                            <span className="entry-emoji" aria-hidden="true">
                                {k.emoji}
                            </span>
                            <strong>{k.name}</strong>
                            <span>{k.intro.split(/[.?!]/)[0].trim()}.</span>
                            <span className="entry-count">{k.tests.length} Aufgaben</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <Trenner art="strahlung" farbe="lila" />

            <section aria-labelledby="test">
                <h2 id="test">Der komplette KI-Test</h2>
                <KiTestSuite tests={TESTS} kategorien={TEST_KATEGORIEN} />
            </section>

            <Band farbe="dunkel" id="methodik" titel="Methodik: warum dieser Test fair ist ⚖️">
                <ul>
                    <li>Alle KIs bekommen exakt denselben Prompt, ohne Vorgeschichte im Chat. Öffne für jede Aufgabe einen neuen Chat.</li>
                    <li>Aufgaben mit eindeutiger Lösung (Logik, Fakten, Code) prüfen Korrektheit, die anderen prüfen Vorgaben wie Wortlimit, Reimschema oder Sie-Form.</li>
                    <li>Die Kategorie „Halluzinationen“ belohnt Ehrlichkeit: Wer nicht erfindet, gewinnt.</li>
                    <li>Bewertung: richtig 2 Punkte, teilweise 1, falsch 0. Die Rangliste zeigt den Anteil der möglichen Punkte.</li>
                    <li>mentat.codes veröffentlicht bewusst keine eigenen Testwerte: Modelle ändern sich wöchentlich, dein Ergebnis gilt für deine Version und deinen Tarif.</li>
                </ul>
            </Band>

            <section aria-labelledby="weiter">
                <h2 id="weiter">Nach dem Test</h2>
                <ul className="link-cards">
                    <li>
                        <Link href="/ki-tools/chatbots">
                            <strong>Alle KI-Chatbots im Überblick</strong>
                        </Link>
                        <span>Die Konsens-Favoriten aus den drei größten Community-Listen.</span>
                    </li>
                    <li>
                        <Link href="/rechner/ki-zeitersparnis">
                            <strong>Lohnt sich das Abo?</strong>
                        </Link>
                        <span>Der Zeitersparnis-Rechner zeigt den Break-even in Minuten pro Woche.</span>
                    </li>
                    <li>
                        <Link href="/prompt-check">
                            <strong>Prompt-Check</strong>
                        </Link>
                        <span>Oft liegt es nicht an der KI, sondern am Prompt.</span>
                    </li>
                    <li>
                        <Link href="/tutorials/prompt-engineering-in-15-minuten">
                            <strong>Prompt Engineering in 15 Minuten</strong>
                        </Link>
                        <span>Mit den richtigen Techniken wird jede KI besser.</span>
                    </li>
                </ul>
            </section>

            <Band farbe="pink" id="faq" titel="Häufige Fragen zum KI-Test 🙋">
                <Faq items={FAQ} />
            </Band>
            <LeadMagnetBox id="prompt-spickzettel" />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <KiTestPage />
            <Vernetzt pfad={seitenPfad('/ki-test')} />
        </>
    )
}
