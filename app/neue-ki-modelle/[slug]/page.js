import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import JsonLd from '../../components/JsonLd'
import Faq, { faqSchema } from '../../components/Faq'
import { MODELLE, FAMILIEN, MODELLE_STAND, getModell, getFamilie, modelleDerFamilie, modelleNachDatum } from '../../../lib/modelle'
import { getTool } from '../../../lib/tools'
import { absoluteUrl } from '../../../lib/site'
import Kurzantwort from '../../components/Kurzantwort'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import { ogMeta, OG_BILDER, publisherRef } from '../../../lib/og-meta'
import { autorRef } from '../../../lib/autor'
import { dateiStand } from '../../../lib/stand'

export const dynamicParams = false

export function generateStaticParams() {
    return [...MODELLE, ...FAMILIEN].map((m) => ({ slug: m.slug }))
}

const host = (u) => u.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

export function generateMetadata({ params }) {
    const f = getFamilie(params.slug)
    if (f) return { title: f.seoTitle, description: f.description, alternates: { canonical: `/neue-ki-modelle/${f.slug}` }, openGraph: ogMeta({ url: `/neue-ki-modelle/${f.slug}`, type: 'article', bild: OG_BILDER.modelle, alt: f.titel }) }
    const m = getModell(params.slug)
    if (!m) return {}
    const title = `${m.name}: Start, Preis und Fakten`.length <= 60 ? `${m.name}: Start, Preis und Fakten` : `${m.name}: Fakten und Preis`
    return {
        title,
        description: `${m.kurz} Start: ${m.datumText}.${m.preis ? ' Mit API-Preis laut Anbieter.' : ''}`.slice(0, 300),
        alternates: { canonical: `/neue-ki-modelle/${m.slug}` },
        openGraph: ogMeta({ url: `/neue-ki-modelle/${m.slug}`, type: 'article', bild: OG_BILDER.modelle, alt: m.name }),
    }
}

function modellFaq(m) {
    const f = [{ q: `Wann ist ${m.name} erschienen?`, a: `${m.name} von ${m.anbieter} ist am ${m.datumText} erschienen.` }]
    f.push({
        q: `Was kostet ${m.name}?`,
        a: m.preis ? `Laut offizieller Seite des Anbieters: ${m.preis}. Stand ${MODELLE_STAND}.` : `Für ${m.name} haben wir keinen Preis auf einer offiziellen Preis- oder Modellseite gefunden. Deshalb nennen wir hier keine Zahl.`,
    })
    f.push({ q: `Wo kann ich ${m.name} nutzen?`, a: m.nutzen })
    return f
}

function Quellen({ m }) {
    const links = [...m.quellen, ...(m.preisQuelle && !m.quellen.includes(m.preisQuelle) ? [m.preisQuelle] : []), ...(m.news ? [m.news] : [])]
    return (
        <ul className="quellen">
            {links.map((u) => (
                <li key={u}>
                    <a href={u} rel="noopener nofollow" target="_blank">
                        {host(u)}
                    </a>
                    {u === m.news ? ' (Bericht)' : u === m.preisQuelle ? ' (Preis)' : ''}
                </li>
            ))}
        </ul>
    )
}

function ModellBlock({ m, titel }) {
    return (
        <section aria-labelledby={`m-${m.slug}`} className="modell">
            <h2 id={`m-${m.slug}`}>{titel || m.name}</h2>
            <p className="eyebrow">
                {m.anbieter} · {m.art} · {m.datumText}
            </p>
            <ul>
                {m.fakten.map((x) => (
                    <li key={x.slice(0, 40)}>{x}</li>
                ))}
            </ul>
            <p>
                <strong>API-Preis:</strong> {m.preis ? `${m.preis} (laut Anbieter)` : 'auf keiner offiziellen Preisseite prüfbar, deshalb ohne Zahl.'}
            </p>
            <p>
                <strong>Nutzen:</strong> {m.nutzen}
            </p>
            <p>
                <strong>Quellen:</strong>
            </p>
            <Quellen m={m} />
        </section>
    )
}

function ModellPage({ params }) {
    const fam = getFamilie(params.slug)
    const m = fam ? null : getModell(params.slug)
    if (!fam && !m) notFound()
    const item = fam || m
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Neue KI-Modelle', path: '/neue-ki-modelle' },
        { name: fam ? fam.titel : m.name, path: `/neue-ki-modelle/${item.slug}` },
    ]
    const mitglieder = fam ? modelleDerFamilie(fam.slug) : []
    const faq = fam ? mitglieder.flatMap((x) => modellFaq(x).slice(1, 2)) : modellFaq(m)
    const tool = m?.tool ? getTool(m.tool) : null
    const verwandt = fam ? [] : modelleNachDatum().filter((x) => x.slug !== m.slug && (x.anbieter === m.anbieter || (m.familie && x.familie === m.familie))).slice(0, 6)
    const famLink = m?.familie ? getFamilie(m.familie) : null
    return (
        <article>
            <JsonLd
                data={[
                    breadcrumbSchema(crumbs),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: fam ? fam.titel : `${m.name}: Start, Preis und Fakten`,
                        description: fam ? fam.description : m.kurz,
                        inLanguage: 'de-DE',
                        dateModified: dateiStand('lib/modelle.js').toISOString().slice(0, 10),
                        url: absoluteUrl(`/neue-ki-modelle/${item.slug}`),
                        author: autorRef(),
                        publisher: publisherRef(),
                        image: absoluteUrl(OG_BILDER.modelle),
                    },
                    faqSchema(faq),
                ]}
            />
            <Breadcrumbs items={crumbs} />
            <header className="hero">
                <p className="eyebrow">
                    {item.anbieter} · Stand {MODELLE_STAND}
                </p>
                <h1>{fam ? fam.titel : `${m.name}: Start, Preis und was es kann`}</h1>
                <p className="lead">{fam ? fam.description : m.kurz}</p>
                {!fam && (
                    <Kurzantwort frage={`Was ist ${m.name}, und was kostet es?`}>
                        {m.art === 'Produkt-Update' ? `${m.name} ist ein Update von ${m.anbieter}` : `${m.name} ist ein ${m.art} von ${m.anbieter}`}, erschienen am {m.datumText}.{' '}
                        {m.preis ? `API-Preis laut Anbieter: ${m.preis.replace(/\.$/, '')}.` : 'Einen eigenen API-Preis nennt der Anbieter dafür nicht.'} {m.nutzen}
                    </Kurzantwort>
                )}
            </header>
            {fam ? (
                <>
                    <div className="prose">
                        {fam.intro.map((p) => (
                            <p key={p.slice(0, 40)}>{p}</p>
                        ))}
                    </div>
                    <nav aria-label="Inhalt" className="toc">
                        <strong>Die Modelle</strong>
                        <ol>
                            {mitglieder.map((x) => (
                                <li key={x.slug}>
                                    <a href={`#m-${x.slug}`}>{x.name}</a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {mitglieder.map((x) => (
                        <div key={x.slug}>
                            <ModellBlock m={x} />
                            <p>
                                <Link href={`/neue-ki-modelle/${x.slug}`}>Alles zu {x.name} auf einer Seite →</Link>
                            </p>
                        </div>
                    ))}
                </>
            ) : (
                <ModellBlock m={m} titel="Die Fakten" />
            )}
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={faq} />
            </section>
            <section aria-labelledby="weiter">
                <h2 id="weiter">Weiter</h2>
                <ul className="quick-links">
                    {famLink && (
                        <li>
                            <Link href={`/neue-ki-modelle/${famLink.slug}`}>{famLink.titel} →</Link>
                        </li>
                    )}
                    {tool && (
                        <li>
                            <Link href={`/tools/${tool.slug}`}>
                                {tool.name}: Tarife und Preise im Steckbrief →
                            </Link>
                        </li>
                    )}
                    {verwandt.map((x) => (
                        <li key={x.slug}>
                            <Link href={`/neue-ki-modelle/${x.slug}`}>{x.name} →</Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/neue-ki-modelle">Alle neuen KI-Modelle und der Gerüchte-Check →</Link>
                    </li>
                    <li>
                        <Link href="/ki-test">Neue Modelle im KI-Test selbst vergleichen →</Link>
                    </li>
                </ul>
            </section>
        </article>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ModellPage params={params} />
            <Vernetzt pfad={seitenPfad('/neue-ki-modelle/[slug]', params)} />
        </>
    )
}
