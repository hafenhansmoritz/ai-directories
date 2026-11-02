import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import NeuSeit from '../components/NeuSeit'
import NeuMarke from '../components/NeuMarke'
import '../styles/e-inhalte.css'
import { getNews, getFristen, NEWS_STAND } from '../../lib/news'
import { absoluteUrl, withBase } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'

export const metadata = {
    title: 'KI-News: aktuelle KI-Nachrichten verständlich erklärt',
    description: `Aktuelle KI-News auf Deutsch: neue Funktionen, Abschaltungen, Sicherheitslücken und Preise von OpenAI, Anthropic, Google und Co. Jede Meldung geprüft, mit Quellen und dem, was du jetzt tun solltest. Stand ${NEWS_STAND}.`,
    alternates: { canonical: '/ki-news', types: { 'application/rss+xml': '/ki-news/feed.xml' } },
    openGraph: ogMeta({ url: '/ki-news', bild: OG_BILDER.news, alt: 'KI-News auf mentat.codes' }),
}

const datumKurz = (d) => new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })
const datumLang = (d) => new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
const themaId = (t) =>
    `thema-${t
        .toLowerCase()
        .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c])
        .replace(/[^a-z0-9]+/g, '-')}`

function KiNews() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'KI-News', path: '/ki-news' },
    ]
    const liste = getNews()
    const themen = [...new Set(liste.map((n) => n.thema))]
    const heute = new Date().toISOString().slice(0, 10)
    const fristen = getFristen().filter((f) => f.datum >= heute)
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: liste.map((n, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/ki-news/${n.slug}`), name: n.titel })),
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Stand {NEWS_STAND}</p>
                <h1>KI-News: was diese Woche wirklich wichtig ist</h1>
                <p className="lead">
                    {liste.length} Meldungen, Themen: {themen.join(', ')}. Jede mit offizieller Quelle, einem „Was du jetzt tun solltest“ und Links zu den passenden Tools, Prompts und Erklärungen hier auf der Seite.
                </p>
                <Jean>Ich lese die Pressemitteilungen, damit du es nicht musst. Übrig bleibt, was dich betrifft, und ein Witz pro Absatz als Schmerzensgeld.</Jean>
                <p className="news-feed">
                    <a href="feed.xml">📡 KI-News als RSS-Feed abonnieren</a>
                </p>
                <NeuSeit daten={liste.map((n) => n.veroeffentlicht || n.datum)} />
            </section>

            {fristen.length > 0 && (
                <section aria-labelledby="fristen" className="news-fristen">
                    <h2 id="fristen">KI-Fristen-Kalender ⏰</h2>
                    <p>Abschaltungen, Lebensenden und Umzugstermine aus den Meldungen. Trag dir ein, was dich betrifft, bevor es dein Fehlerprotokoll für dich tut.</p>
                    <p className="e-frist-kalender">
                        <a href={absoluteUrl('/ki-news/fristen.ics').replace(/^https?:/, 'webcal:')}>📅 Alle Fristen im Kalender abonnieren</a>
                        <span aria-hidden="true"> · </span>
                        <a href={withBase('/ki-news/fristen.ics')} download>
                            als .ics-Datei herunterladen
                        </a>
                        <span className="e-hinweis"> Das Abo aktualisiert sich selbst, neue Fristen kommen automatisch dazu.</span>
                    </p>
                    <ol className="fristen-liste">
                        {fristen.map((f) => (
                            <li key={`${f.datum}-${f.was}`}>
                                <time dateTime={f.datum}>{datumLang(f.datum)}</time>
                                <span>
                                    {f.was}. <Link href={`/ki-news/${f.slug}`}>Zur Meldung</Link>
                                </span>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            <nav aria-label="Themen" className="news-themen">
                <strong>Nach Thema:</strong>
                <ul>
                    {themen.map((t) => (
                        <li key={t}>
                            <a href={`#${themaId(t)}`}>
                                {t} <span className="klapp-zahl">{liste.filter((n) => n.thema === t).length}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <section aria-labelledby="meldungen">
                <h2 id="meldungen">Alle Meldungen, neueste zuerst</h2>
                <ul className="news-liste">
                    {liste.map((n) => (
                        <li key={n.slug} className="news-karte">
                            <p className="news-meta">
                                <span className="news-thema">
                                    <span aria-hidden="true">{n.emoji}</span> {n.thema}
                                </span>
                                <time dateTime={n.datum}>{datumKurz(n.datum)}</time>
                                <NeuMarke datum={n.veroeffentlicht || n.datum} />
                            </p>
                            <h3>
                                <Link href={`/ki-news/${n.slug}`}>{n.titel}</Link>
                            </h3>
                            <p>{n.kurz[0]}</p>
                            <details className="klapp">
                                <summary>Was du jetzt tun solltest</summary>
                                <ul>
                                    {n.tun.slice(0, 3).map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="nach-thema">
                <h2 id="nach-thema">Alle Meldungen nach Thema</h2>
                {themen.map((t) => (
                    <details key={t} id={themaId(t)} className="klapp news-thema-block">
                        <summary>
                            {t} <span className="klapp-zahl">{liste.filter((n) => n.thema === t).length}</span>
                        </summary>
                        <ul>
                            {liste
                                .filter((n) => n.thema === t)
                                .map((n) => (
                                    <li key={n.slug}>
                                        <Link href={`/ki-news/${n.slug}`}>
                                            {n.emoji} {n.titel}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </details>
                ))}
            </section>

            <section aria-labelledby="mehr">
                <h2 id="mehr">Hintergrund statt Schlagzeile</h2>
                <ul className="link-cards">
                    <li>
                        <Link href="/neue-ki-modelle">
                            <strong>Neue KI-Modelle 2026</strong>
                        </Link>
                        <span>GPT-6, Gemini 4 Argon, Claude 5.5 und Co. mit Daten und Preisen.</span>
                    </li>
                    <li>
                        <Link href="/glossar">
                            <strong>KI-Glossar</strong>
                        </Link>
                        <span>Wenn in einer Meldung ein Begriff klemmt.</span>
                    </li>
                    <li>
                        <Link href="/tools">
                            <strong>KI-Tools mit Preisen</strong>
                        </Link>
                        <span>Steckbriefe zu den Tools aus den News.</span>
                    </li>
                    <li>
                        <Link href="/prompts">
                            <strong>Prompt-Bibliothek</strong>
                        </Link>
                        <span>Fertige Vorlagen, um Neues direkt auszuprobieren.</span>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <KiNews />
            <Vernetzt pfad={seitenPfad('/ki-news')} />
        </>
    )
}
