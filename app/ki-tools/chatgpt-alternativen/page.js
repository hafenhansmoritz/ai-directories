import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../components/Faq'
import ToolCards from '../../components/ToolCards'
import { Band } from '../../components/Deko'
import { SITE_NAME } from '../../../lib/site'
import { getKbRubrik } from '../../../lib/kb'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import Kurzantwort from '../../components/Kurzantwort'
import Pruefer from '../../components/Pruefer'
import { getTools, getTool, TOOLS_STAND } from '../../../lib/tools'
import { getNewsArtikel } from '../../../lib/news'
import { dateiStand } from '../../../lib/stand'
import LeadMagnetBox from '../../components/LeadMagnetBox'

// Auswahlhilfe: je Einsatzzweck das passende Tool aus den Steckbriefen (db/tools.json, best_for_de).
const WAHL = [
    ['📚', 'Du recherchierst und willst Quellen sehen', 'perplexity', 'Antworten mit nachprüfbaren Quellen, ideal zum Gegenchecken.'],
    ['✍️', 'Du schreibst lange Texte, analysierst oder programmierst', 'claude', 'Stark bei anspruchsvollen Texten, Analyse und Code.'],
    ['📧', 'Du lebst in Gmail, Docs und Drive', 'google-gemini', 'Passt ins Google-Ökosystem, Google AI Plus kostet in Deutschland 4,99 € im Monat.'],
    ['📊', 'Du arbeitest mit Word, Excel und Outlook', 'microsoft-copilot', 'KI direkt in den Office-Apps über Microsoft 365.'],
    ['🇪🇺', 'Du willst einen Anbieter aus Europa', 'mistral-le-chat', 'Mistral sitzt in Paris, das Modell Large 4 wurde laut Mistral in eigenen Rechenzentren in Europa trainiert.'],
    ['📑', 'Du willst mit eigenen Dokumenten lernen', 'notebooklm', 'Antworten auf Basis deiner hochgeladenen Unterlagen.'],
    ['🎞️', 'Du brauchst Folien und Dokumente aus einem Guss', 'genspark', 'All-in-one-Workspace für Folien, Dokumente und Recherche.'],
]
const AKTUELL = ['custom-gpts-werden-abgeschaltet', 'chatgpt-werbung-deutschland', 'gemini-gratis-nur-noch-auto', 'claude-docs-slides-design-gratis', 'chatgpt-chats-sperren-pin']

const FAQ = [
    {
        q: 'Was ist die beste ChatGPT-Alternative?',
        a: 'Die meistempfohlenen Alternativen in den großen Community-Listen sind Claude von Anthropic und Gemini von Google; für Recherche mit Quellen Perplexity. Welche für dich besser ist, zeigt ein direkter Vergleich mit denselben Aufgaben im KI-Test.',
    },
    {
        q: 'Gibt es kostenlose ChatGPT-Alternativen?',
        a: 'Ja. Viele Chatbots haben einen Gratis-Tarif, und mit Open-Source-Werkzeugen wie Ollama kannst du Sprachmodelle sogar lokal und ohne laufende Kosten betreiben.',
    },
    {
        q: 'Welche ChatGPT-Alternative ist am datenschutzfreundlichsten?',
        a: 'Am meisten Kontrolle hast du mit lokal betriebenen Modellen, weil die Daten deinen Rechner nicht verlassen. Bei Cloud-Diensten lohnt der Blick in die Einstellungen zum Training mit deinen Daten.',
    },
    {
        q: 'Gibt es eine ChatGPT-Alternative aus Europa?',
        a: 'Ja, Le Chat von Mistral AI aus Paris. Laut Anbieter hat Le Chat einen Gratis-Tarif, Pro kostet 14,99 US-Dollar im Monat zuzüglich Steuern (Stand Oktober 2026).',
    },
    {
        q: 'Welche ChatGPT-Alternative ist auf Deutsch?',
        a: 'Laut den Anbietern gibt es die Oberfläche von Claude, Google Gemini, Microsoft Copilot und Perplexity auf Deutsch. Antworten auf Deutsch liefern praktisch alle großen Chatbots.',
    },
    {
        q: 'Brauche ich wegen der Custom-GPT-Abschaltung eine Alternative?',
        a: 'Nicht zwingend. OpenAI schaltet Custom GPTs am 11. Dezember 2026 ab und ersetzt sie durch Plugins. Deine Anweisungen kannst du aber genauso als Claude-Project oder Gemini-Gem weiternutzen.',
    },
    {
        q: 'Zeigen ChatGPT-Alternativen Werbung?',
        a: 'ChatGPT zeigt laut OpenAI seit August 2026 auch in Deutschland Anzeigen, aber nur in den Tarifen Free und Go. Ob und wo andere Chatbots Werbung zeigen, prüfst du am besten in den Bedingungen des jeweiligen Anbieters.',
    },
]

export const metadata = {
    title: 'ChatGPT-Alternativen 2026: Claude, Gemini, Perplexity & Co.',
    description: 'Die besten ChatGPT-Alternativen 2026 im Vergleich: Claude, Gemini, Perplexity, Copilot, Mistral und mehr, mit Preisen, Gratis-Tarif, Deutsch-Check und Auswahlhilfe nach Einsatzzweck.',
    alternates: { canonical: '/ki-tools/chatgpt-alternativen' },
}

function ChatgptAlternativen() {
    const sortiert = (r) => [...r.tools].filter((t) => t.slug !== 'chatgpt').sort((a, b) => b.konsens - a.konsens || Number(b.deutsch) - Number(a.deutsch))
    const chat = sortiert(getKbRubrik('chatbots'))
    const vergleich = getTools().filter((t) => t.category === 'KI-Chat & Recherche' && t.slug !== 'chatgpt')
    const aktuell = AKTUELL.map(getNewsArtikel).filter(Boolean)
    const suche = sortiert(getKbRubrik('suche'))
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tools', path: '/ki-tools' },
        { name: 'ChatGPT-Alternativen', path: '/ki-tools/chatgpt-alternativen' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'ChatGPT-Alternativen',
            itemListElement: chat.slice(0, 10).map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: t.url })),
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    {chat.length} Chatbots · {suche.length} KI-Suchmaschinen · Preise Stand {TOOLS_STAND}
                </p>
                <h1>ChatGPT-Alternativen 2026: die besten im Vergleich</h1>
                <p className="lead">
                    ChatGPT ist nicht die einzige gute KI. Hier findest du die {vergleich.length} wichtigsten Alternativen mit Preisen von den offiziellen Seiten, eine Auswahlhilfe nach Einsatzzweck und darunter alle {chat.length} Chatbots und{' '}
                    {suche.length} KI-Suchmaschinen aus den großen Community-Listen.
                </p>
                <Kurzantwort frage="Was ist die beste ChatGPT-Alternative?">
                    Kommt auf den Zweck an. Für Recherche mit Quellen Perplexity, für lange Texte, Analyse und Code Claude, im Google-Kosmos Gemini, für Word und Excel Microsoft Copilot und als Anbieter aus Europa Mistral Le Chat. Alle
                    haben laut Anbieter einen Gratis-Tarif, die bezahlten Einstiegstarife liegen zwischen 4,99 € (Google AI Plus) und rund 20 US-Dollar im Monat.
                </Kurzantwort>
            </section>

            <section aria-labelledby="vergleich">
                <h2 id="vergleich">Die wichtigsten ChatGPT-Alternativen im Vergleich</h2>
                <div className="table-scroll">
                    <table>
                        <caption>Preise und Angaben laut Anbieter, Stand {TOOLS_STAND}. Gratis-Tarife haben Nutzungsgrenzen.</caption>
                        <thead>
                            <tr>
                                <th scope="col">Tool</th>
                                <th scope="col">Gratis-Tarif</th>
                                <th scope="col">Bezahlt ab</th>
                                <th scope="col">Deutsche Oberfläche</th>
                                <th scope="col">Am besten für</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vergleich.map((t) => (
                                <tr key={t.slug}>
                                    <th scope="row">
                                        <Link href={`/tools/${t.slug}`}>{t.name}</Link>
                                    </th>
                                    <td>{t.free_plan === true ? 'Ja' : t.free_plan === false ? 'Nein' : 'unklar'}</td>
                                    <td>{t.price_from || 'keine Angabe'}</td>
                                    <td>{t.german_ui === true ? 'Ja' : t.german_ui === false ? 'Nein' : 'keine Angabe'}</td>
                                    <td>{t.best_for_de}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p>
                    Zum Vergleich: <Link href="/tools/chatgpt">ChatGPT</Link> selbst startet kostenlos, Plus kostet laut OpenAI 20 US-Dollar im Monat. Wer zwei Kandidaten direkt gegeneinander sehen will: <Link href="/tool-vergleiche/claude-vs-perplexity">Claude vs. Perplexity</Link>{' '}
                    oder der Ratgeber <Link href="/ratgeber/chatgpt-claude-gemini-welcher-chatbot">ChatGPT, Claude oder Gemini</Link>.
                </p>
            </section>

            <section aria-labelledby="auswahl">
                <h2 id="auswahl">Welche Alternative passt zu dir? 🧭</h2>
                <ul className="link-cards">
                    {WAHL.map(([emoji, fall, slug, warum]) => {
                        const t = getTool(slug)
                        if (!t) return null
                        return (
                            <li key={slug}>
                                <span>
                                    <span aria-hidden="true">{emoji}</span> {fall}
                                </span>
                                <Link href={`/tools/${slug}`}>
                                    <strong>{t.name}</strong>
                                </Link>
                                <span>{warum}</span>
                            </li>
                        )
                    })}
                </ul>
            </section>

            {aktuell.length > 0 && (
                <section aria-labelledby="aktuell">
                    <h2 id="aktuell">Was sich gerade ändert 📰</h2>
                    <p>Neuigkeiten aus den letzten Wochen, die bei der Wahl einer Alternative eine Rolle spielen:</p>
                    <ul className="quick-links">
                        {aktuell.map((n) => (
                            <li key={n.slug}>
                                <Link href={`/ki-news/${n.slug}`}>
                                    {n.emoji} {n.titel} →
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <p className="box box-tipp">
                Nicht raten, testen: Im <Link href="/ki-test">KI-Test</Link> schickst du dieselben Aufgaben an ChatGPT, Claude, Gemini, Perplexity und Grok und bekommst deine eigene Rangliste.
            </p>
            <LeadMagnetBox id="prompt-spickzettel" anlass="Welcher Chatbot es auch wird: Diese Techniken klappen in allen." />
            <section aria-labelledby="chatbots">
                <h2 id="chatbots">🤖 Chatbots als ChatGPT-Alternative</h2>
                <ToolCards tools={chat.slice(0, 18)} />
                <p>
                    <Link href="/ki-tools/chatbots">Alle {chat.length + 1} Chatbots in der Datenbank →</Link>
                </p>
            </section>
            <Band farbe="blau" id="suche" titel="🔎 KI-Suchmaschinen: Antworten mit Quellen">
                <ToolCards tools={suche} />
            </Band>
            <Band farbe="pink" id="faq" titel="Fragen zu ChatGPT-Alternativen 🙋">
                <Faq items={FAQ} />
            </Band>
            <Pruefer datum={dateiStand('db/tools.json', 'app/ki-tools/chatgpt-alternativen/page.js')} />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <ChatgptAlternativen />
            <Vernetzt pfad={seitenPfad('/ki-tools/chatgpt-alternativen')} />
        </>
    )
}
