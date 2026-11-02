import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import Faq, { faqSchema } from '../components/Faq'
import NEU from '../../db/neu-entdeckt.json'
import { getDirectories } from '../../lib/data'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

const TYPEN = [
    ['dach', 'Deutsch und DACH 🇩🇪', 'Verzeichnisse auf Deutsch oder mit deutscher Version. Für deutschsprachige Tools die erste Adresse.'],
    ['allgemein', 'Allgemeine KI-Tool-Verzeichnisse', 'Klassische Kataloge für KI-Tools aller Art.'],
    ['launch', 'Launch-Plattformen', 'Wöchentliche oder tägliche Launch-Boards, oft mit Ranking und Dofollow-Link für die Spitzenplätze.'],
    ['agenten', 'KI-Agenten, MCP-Server und Claude-Skills', 'Nischenverzeichnisse für Agenten, MCP-Server und Erweiterungen für Claude und Co.'],
]
const PREIS = { Free: 'Kostenlos', Paid: 'Bezahlt' }
const host = (u) => u.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

export const metadata = {
    title: `${NEU.length} neu entdeckte KI-Verzeichnisse (Oktober 2026)`,
    description: `${NEU.length} neue KI-Verzeichnisse und Launch-Plattformen, geprüft im Oktober 2026: ${NEU.filter((d) => d.pricing === 'Free').length} mit kostenlosem Eintrag, ${NEU.filter((d) => d.typ === 'dach').length} auf Deutsch, dazu Verzeichnisse für KI-Agenten und MCP-Server.`,
    alternates: { canonical: '/neu-entdeckt' },
    openGraph: { url: '/neu-entdeckt' },
}

function NeuEntdeckt() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Neu entdeckte KI-Verzeichnisse', path: '/neu-entdeckt' },
    ]
    const frei = NEU.filter((d) => d.pricing === 'Free')
    const badge = NEU.filter((d) => d.badge)
    const faq = [
        ['Warum stehen hier keine Domain-Rating- und Besucherzahlen?', 'Für diese Verzeichnisse liegen uns noch keine gemessenen Werte vor. Statt Zahlen zu schätzen, zeigen wir nur, was die Verzeichnisse selbst auf ihren Einreichungsseiten sagen. Sobald Messwerte da sind, wandern sie in die Hauptliste.'],
        ['Was bedeutet „Badge nötig“?', `Bei ${badge.length} Verzeichnissen gibt es den kostenlosen Eintrag oder den Dofollow-Link nur, wenn du ein Badge oder einen Link auf deiner Website einbaust. Überleg dir vorher, ob du das willst.`],
        ['Sind die Einträge wirklich kostenlos?', `${frei.length} der ${NEU.length} Verzeichnisse nennen auf ihrer eigenen Seite einen kostenlosen Eintrag, viele verkaufen zusätzlich schnellere oder hervorgehobene Plätze. Bei Verzeichnissen mit „Preis unklar“ war der Preis hinter einem Login oder gar nicht genannt.`],
        ['Wie aktuell sind die Angaben?', 'Alle Angaben wurden am 25. Oktober 2026 auf den Seiten der Verzeichnisse geprüft. Bedingungen ändern sich schnell, schau vor dem Einreichen kurz selbst nach.'],
    ]
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faq)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Geprüft am 25. Oktober 2026</p>
                <h1>{NEU.length} neu entdeckte KI-Verzeichnisse</h1>
                <p className="lead">
                    Frisch gefunden und noch nicht in der Hauptliste mit {getDirectories().length} Verzeichnissen: {frei.length} mit kostenlosem Eintrag, {NEU.filter((d) => d.typ === 'dach').length} auf Deutsch,{' '}
                    {NEU.filter((d) => d.typ === 'agenten').length} für KI-Agenten und MCP-Server. Jeder Hinweis stammt von der Seite des Verzeichnisses selbst.
                </p>
                <Jean>Neu heißt nicht gut, aber oft: leer, hungrig und schnell beim Freischalten. Genau die richtige Mischung für die erste Launch-Woche.</Jean>
            </section>
            <nav aria-label="Inhalt" className="toc">
                <strong>Nach Art</strong>
                <ol>
                    {TYPEN.map(([k, t]) => (
                        <li key={k}>
                            <a href={`#typ-${k}`}>
                                {t} ({NEU.filter((d) => d.typ === k).length})
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>
            {TYPEN.map(([k, titel, text]) => {
                const liste = NEU.filter((d) => d.typ === k).sort((a, b) => (a.pricing === 'Free' ? 0 : 1) - (b.pricing === 'Free' ? 0 : 1) || a.name.localeCompare(b.name, 'de'))
                return (
                    <section key={k} aria-labelledby={`typ-${k}`}>
                        <h2 id={`typ-${k}`}>{titel}</h2>
                        <p>{text}</p>
                        <ul className="link-cards neu-liste">
                            {liste.map((d) => (
                                <li key={d.link}>
                                    <a href={d.link} rel="noopener nofollow" target="_blank">
                                        <strong>{d.name}</strong>
                                    </a>
                                    <span className="neu-tags">
                                        <span className={`neu-tag neu-${d.pricing || 'unklar'}`}>{PREIS[d.pricing] || 'Preis unklar'}</span>
                                        {d.badge && <span className="neu-tag neu-badge">Badge nötig</span>}
                                        <span className="neu-host">{host(d.link)}</span>
                                    </span>
                                    <span>{d.hinweis}</span>
                                    {d.submission_link && (
                                        <a href={d.submission_link} rel="noopener nofollow" target="_blank">
                                            Zur Einreichung →
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            })}
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={faq} />
            </section>
            <ul className="quick-links">
                <li>
                    <Link href="/#alle">Alle geprüften KI-Verzeichnisse mit DR und Besuchen →</Link>
                </li>
                <li>
                    <Link href="/deutsche-ki-verzeichnisse">Deutsche KI-Verzeichnisse →</Link>
                </li>
                <li>
                    <Link href="/launch-kit">Launch-Kit: Texte für alle Einträge →</Link>
                </li>
                <li>
                    <Link href="/ratgeber/ki-tool-launchen-30-tage">KI-Tool launchen in 30 Tagen →</Link>
                </li>
                <li>
                    <a href="#anfrage-tool-vorschlag">Ein Verzeichnis fehlt? Schlag es vor →</a>
                </li>
            </ul>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <NeuEntdeckt />
            <Vernetzt pfad={seitenPfad('/neu-entdeckt')} />
        </>
    )
}
