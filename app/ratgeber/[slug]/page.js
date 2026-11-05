import Link from 'next/link'
import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import JsonLd from '../../components/JsonLd'
import Jean from '../../components/Jean'
import GlossarText from '../../components/GlossarText'
import Faq, { faqSchema } from '../../components/Faq'
import { ARTIKEL, getArtikel } from '../../../lib/ratgeber'
import { absoluteUrl } from '../../../lib/site'
import { autorRef } from '../../../lib/autor'
import Pruefer from '../../components/Pruefer'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import GuideGate from '../../components/GuideGate'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import { guideFuerRatgeber } from '../../../lib/guides'
import { magnetFuer } from '../../../lib/leadmagnets'
import { ogMeta, OG_BILDER, publisherRef } from '../../../lib/og-meta'

export const dynamicParams = false

export function generateStaticParams() {
    return ARTIKEL.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
    const a = getArtikel(params.slug)
    if (!a) return {}
    return {
        title: a.seoTitle || a.title,
        description: a.description,
        alternates: { canonical: `/ratgeber/${a.slug}` },
        openGraph: ogMeta({ url: `/ratgeber/${a.slug}`, type: 'article', bild: OG_BILDER.ratgeber, alt: a.title }),
    }
}

const slugId = (h) =>
    h
        .toLowerCase()
        .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c])
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

function ArtikelPage({ params }) {
    const a = getArtikel(params.slug)
    if (!a) notFound()
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Ratgeber', path: '/ratgeber' },
        { name: a.title, path: `/ratgeber/${a.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: a.title,
            description: a.description,
            inLanguage: 'de-DE',
            url: absoluteUrl(`/ratgeber/${a.slug}`),
            author: autorRef(),
            publisher: publisherRef(),
            image: absoluteUrl(OG_BILDER.ratgeber),
            ...(a.geprueft ? { dateModified: a.geprueft } : {}),
            ...(a.quellen ? { citation: a.quellen.map((q) => q.url) } : {}),
        },
    ]
    if (a.faq) schema.push(faqSchema(a.faq))
    const others = ARTIKEL.filter((x) => x.slug !== a.slug)
    const gesehen = new Set()
    const guide = guideFuerRatgeber(a.slug)
    // Nach diesem Abschnitt steht der Lead-Baustein (erstes Drittel, bei kurzen Artikeln nach dem ersten Abschnitt).
    const drittel = Math.max(0, Math.ceil(a.sections.length / 3) - 1)
    return (
        <article>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <header className="hero">
                <p className="eyebrow">
                    <span aria-hidden="true">{'☕'.repeat(Math.max(1, Math.round(a.minutes / 4)))}</span> {a.minutes} Minuten Lesezeit{a.geprueft ? ` · geprüft am ${new Date(a.geprueft).toLocaleDateString('de-DE')}` : ''}
                </p>
                <h1>{a.title}</h1>
                <p className="lead">{a.description}</p>
                <Jean>{a.jean}</Jean>
            </header>
            <nav aria-label="Inhalt" className="toc">
                <strong>Inhalt</strong>
                <ol>
                    {a.sections.map((s) => (
                        <li key={s.h}>
                            <a href={`#${slugId(s.h)}`}>{s.h}</a>
                        </li>
                    ))}
                </ol>
            </nav>
            <div className="prose">
                {a.sections.map((s, i) => (
                    <Fragment key={s.h}>
                        <section aria-labelledby={slugId(s.h)}>
                            <h2 id={slugId(s.h)}>{s.h}</h2>
                            {s.p.map((p) => (
                                <p key={p.slice(0, 40)}>
                                    <GlossarText text={p} gesehen={gesehen} />
                                </p>
                            ))}
                        </section>
                        {/* Ein Lead-Baustein nach dem ersten Drittel: der PDF-Guide, wenn es einen gibt, sonst der passende Download. */}
                        {i === drittel && !guide && <LeadMagnetBox id={a.magnet || magnetFuer(a.slug, a.title)} anlass="Kurze Pause vom Lesen, das hier spart dir später Zeit:" />}
                    </Fragment>
                ))}
            </div>
            {a.quellen && (
                <section aria-labelledby="quellen" className="quellen-block">
                    <h2 id="quellen">Quellen und Stand 🔎</h2>
                    <p>
                        {a.geprueft ? `Alle Angaben zu Regeln, Preisen und Funktionen wurden am ${new Date(a.geprueft).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })} mit diesen Quellen abgeglichen. ` : ''}
                        Zahlen zur Verzeichnisliste stammen aus der eigenen mentat.codes-Datenbank.
                    </p>
                    <ul className="quellen">
                        {a.quellen.map((q) => (
                            <li key={q.url}>
                                <a href={q.url} rel="noopener nofollow" target="_blank">
                                    {q.titel}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <Pruefer datum={a.geprueft} />
            {guide && (
                <aside className="leadform guide-formular" aria-label="Gratis-Guide als PDF">
                    <p className="leadform-titel">📥 Diesen Ratgeber als PDF-Guide mitnehmen</p>
                    <p>
                        <strong>{guide.titel}</strong>: kompakt zum Ausdrucken und Abhaken. E-Mail eintragen, sofort herunterladen. <Link href="/guides">Alle Guides</Link>
                    </p>
                    <GuideGate guide={guide} kompakt />
                </aside>
            )}
            {a.faq && (
                <section aria-labelledby="faq">
                    <h2 id="faq">Häufige Fragen 🙋</h2>
                    <Faq items={a.faq} />
                </section>
            )}
            <section aria-labelledby="weiter">
                <h2 id="weiter">Weiterlesen und loslegen</h2>
                <ul className="quick-links">
                    {(a.links || []).map(([href, label]) => (
                        <li key={href}>
                            <Link href={href}>{label} →</Link>
                        </li>
                    ))}
                    {others.map((o) => (
                        <li key={o.slug}>
                            <Link href={`/ratgeber/${o.slug}`}>{o.title} →</Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/launch-kit">Launch-Kit öffnen →</Link>
                    </li>
                    <li>
                        <Link href="/">Zu allen KI-Verzeichnissen →</Link>
                    </li>
                </ul>
            </section>
        </article>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ArtikelPage params={params} />
            <Vernetzt pfad={seitenPfad('/ratgeber/[slug]', params)} />
        </>
    )
}
