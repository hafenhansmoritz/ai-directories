import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import JsonLd from '../../components/JsonLd'
import Jean from '../../components/Jean'
import GlossarText from '../../components/GlossarText'
import Faq, { faqSchema } from '../../components/Faq'
import Quellen from '../../components/Quellen'
import { NEWS, getNews, getNewsArtikel } from '../../../lib/news'
import { absoluteUrl, withBase } from '../../../lib/site'
import { autorRef } from '../../../lib/autor'
import Pruefer from '../../components/Pruefer'
import '../../styles/e-inhalte.css'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import { ogMeta, OG_BILDER, publisherRef } from '../../../lib/og-meta'

export const dynamicParams = false

export function generateStaticParams() {
    return NEWS.map((n) => ({ slug: n.slug }))
}

export function generateMetadata({ params }) {
    const n = getNewsArtikel(params.slug)
    if (!n) return {}
    return {
        title: n.seoTitle || n.titel,
        description: n.description,
        alternates: { canonical: `/ki-news/${n.slug}`, types: { 'application/rss+xml': '/ki-news/feed.xml' } },
        openGraph: ogMeta({ url: `/ki-news/${n.slug}`, type: 'article', bild: OG_BILDER.news, alt: n.titel }),
    }
}

const slugId = (h) =>
    h
        .toLowerCase()
        .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c])
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

const datumLang = (d) => new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })

function NewsPage({ params }) {
    const n = getNewsArtikel(params.slug)
    if (!n) notFound()
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'KI-News', path: '/ki-news' },
        { name: n.titel, path: `/ki-news/${n.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: n.titel,
            description: n.description,
            inLanguage: 'de-DE',
            url: absoluteUrl(`/ki-news/${n.slug}`),
            datePublished: n.veroeffentlicht,
            dateModified: n.veroeffentlicht,
            author: autorRef(),
            publisher: publisherRef(),
            image: absoluteUrl(OG_BILDER.news),
            citation: n.quellen.map((q) => q.url),
        },
        faqSchema(n.faq),
    ]
    // Seite wird täglich neu gebaut: abgelaufene Fristen bekommen dann automatisch den Hinweis.
    const heute = new Date().toISOString().slice(0, 10)
    const weitere = getNews().filter((x) => x.slug !== n.slug)
    const gesehen = new Set()
    return (
        <article className="news-artikel">
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <header className="hero">
                <p className="eyebrow">
                    <span className="news-thema">
                        <span aria-hidden="true">{n.emoji}</span> {n.thema}
                    </span>{' '}
                    · Meldung vom {datumLang(n.datum)} · <span aria-hidden="true">{'☕'.repeat(Math.max(1, Math.round(n.minutes / 4)))}</span> {n.minutes} Minuten · geprüft am {datumLang(n.veroeffentlicht)}
                </p>
                <h1>{n.titel}</h1>
                <p className="lead">{n.description}</p>
                <Jean>{n.jean}</Jean>
            </header>

            <details className="klapp news-kurz" open>
                <summary>
                    Das Wichtigste in 30 Sekunden <span className="klapp-zahl">{n.kurz.length}</span>
                </summary>
                <ul>
                    {n.kurz.map((k) => (
                        <li key={k.slice(0, 40)}>{k}</li>
                    ))}
                </ul>
            </details>

            {n.fristen?.length > 0 && (
                <aside className="news-fristen news-fristen-klein" aria-label="Fristen">
                    <p>
                        <strong>{n.fristen.some(([datum]) => datum >= heute) ? '⏰ Termine zum Eintragen' : '⏰ Termine aus dieser Meldung'}</strong>
                    </p>
                    <ul className="fristen-liste">
                        {n.fristen.map(([datum, was]) => {
                            const vorbei = datum < heute
                            return (
                                <li key={datum + was} className={vorbei ? 'e-frist-vorbei' : undefined}>
                                    <time dateTime={datum}>{datumLang(datum)}</time>
                                    <span>
                                        {was}
                                        {vorbei && (
                                            <>
                                                . <strong>Diese Frist ist seit dem {datumLang(datum)} abgelaufen.</strong> Stand der Meldung: {datumLang(n.veroeffentlicht)}.
                                            </>
                                        )}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    {n.fristen.some(([datum]) => datum >= heute) && (
                        <p className="e-frist-kalender">
                            <a href={withBase('/ki-news/fristen.ics')} download>
                                📅 Alle KI-Fristen als Kalenderdatei (.ics)
                            </a>
                        </p>
                    )}
                </aside>
            )}

            <nav aria-label="Inhalt" className="toc">
                <strong>Inhalt</strong>
                <ol>
                    {n.sections.map((s) => (
                        <li key={s.h}>
                            <a href={`#${slugId(s.h)}`}>{s.h}</a>
                        </li>
                    ))}
                    <li>
                        <a href="#jetzt-tun">Was du jetzt tun solltest</a>
                    </li>
                    <li>
                        <a href="#auf-mentat">Passend dazu auf mentat.codes</a>
                    </li>
                </ol>
            </nav>

            <div className="prose">
                {n.sections.map((s) => (
                    <section key={s.h} aria-labelledby={slugId(s.h)}>
                        <h2 id={slugId(s.h)}>{s.h}</h2>
                        {s.p.map((p) => (
                            <p key={p.slice(0, 40)}>
                                <GlossarText text={p} gesehen={gesehen} />
                            </p>
                        ))}
                    </section>
                ))}
            </div>

            <section aria-labelledby="jetzt-tun" className="news-tun">
                <h2 id="jetzt-tun">Was du jetzt tun solltest ✅</h2>
                <ol className="checklist">
                    {n.tun.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ol>
            </section>

            <section aria-labelledby="auf-mentat">
                <h2 id="auf-mentat">Passend dazu auf mentat.codes 🔗</h2>
                <ul className="link-cards">
                    {n.bezug.map(([href, titel, warum]) => (
                        <li key={href}>
                            <Link href={href}>
                                <strong>{titel}</strong>
                            </Link>
                            <span>{warum}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <Quellen quellen={n.quellen} geprueft={n.veroeffentlicht} text="Alle Angaben in dieser Meldung wurden mit diesen offiziellen Quellen abgeglichen" />
            <Pruefer datum={n.veroeffentlicht} />

            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={n.faq} />
            </section>

            {weitere.length > 0 && (
                <section aria-labelledby="mehr-news">
                    <h2 id="mehr-news">Mehr KI-News 📰</h2>
                    <ul className="quick-links">
                        {weitere.map((w) => (
                            <li key={w.slug}>
                                <Link href={`/ki-news/${w.slug}`}>
                                    {w.emoji} {w.titel} →
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/ki-news">Alle KI-News →</Link>
                        </li>
                    </ul>
                </section>
            )}
        </article>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <NewsPage params={params} />
            <Vernetzt pfad={seitenPfad('/ki-news/[slug]', params)} />
        </>
    )
}
