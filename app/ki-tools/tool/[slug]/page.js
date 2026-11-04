import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../../components/Breadcrumbs'
import { SITE_NAME, absoluteUrl } from '../../../../lib/site'
import { toolHref, toolRel } from '../../../../lib/tools'
import { kuerzen, datumDe } from '../../../../lib/text'
import PartnerHinweis from '../../../components/PartnerHinweis'
import { getKbTools, getKbTool, kbAlternativen, kbIndexierbar, kbPfad, kbPreis, kbPrimary, KB_RUBRIKEN, KB_SOURCES, KB_STAND } from '../../../../lib/kb'
import TEXTE from '../../../../db/texte/kb.json'
import { getPrompt } from '../../../../lib/prompts'
import { getTutorial } from '../../../../lib/tutorials'
import { hatAlternativenHub } from '../../../../lib/alternativen'
import Vernetzt, { seitenPfad } from '../../../components/Vernetzt'
import LeadMagnetBox from '../../../components/LeadMagnetBox'
import { magnetFuer } from '../../../../lib/leadmagnets'

export const dynamicParams = false

export function generateStaticParams() {
    return getKbTools().map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }) {
    const t = getKbTool(params.slug)
    if (!t) return {}
    const r = KB_RUBRIKEN[t.rubrik]
    const alt = kbAlternativen(t, 3).map((a) => a.name)
    // Doppelte Einträge (gleicher Name, schwächerer Slug) verweisen nur per Canonical auf die Hauptseite, wenn die
    // indexierbar ist. Sonst noindex, follow mit eigenem Canonical, nie beides gemischt (widersprüchliches Signal).
    const primary = kbPrimary(t)
    const aufPrimary = primary.slug !== t.slug && kbIndexierbar(primary)
    return {
        title: t.name.length > 18 ? `${t.name}: Was ist das?` : `${t.name}: Was ist das? Alternativen & Einordnung`,
        description: kuerzen(`${t.beschreibung} Rubrik: ${r.name}.${alt.length ? ` Alternativen: ${alt.join(', ')}.` : ''}`),
        alternates: { canonical: `/ki-tools/tool/${aufPrimary ? primary.slug : t.slug}` },
        // robots nur bei noindex setzen, sonst gilt das Layout (max-snippet, max-image-preview)
        ...(kbIndexierbar(t) || aufPrimary ? {} : { robots: { index: false, follow: true } }),
    }
}

const QUELLEN = Object.fromEntries(KB_SOURCES.map((q) => [q.id, q]))

function KbToolPage({ params }) {
    const t = getKbTool(params.slug)
    if (!t) notFound()
    const r = KB_RUBRIKEN[t.rubrik]
    const alternativen = kbAlternativen(t)
    const weitere = (t.rubriken || []).filter((k) => k !== t.rubrik && KB_RUBRIKEN[k])
    const prompts = (r.prompts || []).map(getPrompt).filter(Boolean).slice(0, 2)
    const tutorial = r.tutorial && getTutorial(r.tutorial)
    const preis = kbPreis(t.preis)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tool-Datenbank', path: '/ki-tools' },
        { name: r.name, path: `/ki-tools/${t.rubrik}` },
        { name: t.name, path: `/ki-tools/tool/${t.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        // Kein SoftwareApplication-Knoten: ohne offizielle Preise und Bewertungen wäre er für Google ungültig.
        // Die Seite beschreibt das Tool, darum WebPage mit about.
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t.name,
            url: absoluteUrl(`/ki-tools/tool/${t.slug}`),
            description: t.beschreibung,
            inLanguage: 'de-DE',
            about: { '@type': 'Thing', name: t.name, url: t.url, description: t.beschreibung },
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    {r.name} · {t.konsens === 3 ? '🏆 in allen 3 Listen' : t.konsens === 2 ? '🥈 in 2 von 3 Listen' : 'in 1 von 3 Listen'}
                </p>
                <h1>{t.name}</h1>
                <p className="lead">{t.beschreibung}</p>
                <p className="cta-row">
                    <a className="button" href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                        {t.name} öffnen ↗{t.affiliate && <sup>*</sup>}
                    </a>
                    {t.profil && <Link href={`/tools/${t.profil.slug}`}>🧔 Steckbrief mit Preisen →</Link>}
                </p>
                <PartnerHinweis zeigen={Boolean(t.affiliate)} />
            </section>
            {t.profil && (
                <p className="service-hint dt-steckbrief-hinweis">
                    <strong>Mehr Details?</strong> Zu {t.name} gibt es einen Tool-Steckbrief mit Preisen, Gratis-Tarif und FAQ:{' '}
                    <Link href={`/tools/${t.profil.slug}`}>{t.profil.name}: Preis und Gratis-Tarif →</Link>
                </p>
            )}
            <dl className="facts facts-klein">
                <div>
                    <dt>Rubrik</dt>
                    <dd>
                        <Link href={`/ki-tools/${t.rubrik}`}>{r.name}</Link>
                        {weitere.length > 0 && <small>auch: {weitere.map((k) => KB_RUBRIKEN[k].name).join(', ')}</small>}
                    </dd>
                </div>
                <div>
                    <dt>Preis</dt>
                    <dd>
                        {preis || 'keine Angabe'}
                        <small>{t.profil ? 'genaue Preise im Steckbrief' : 'laut Liste, beim Anbieter prüfen'}</small>
                    </dd>
                </div>
                <div>
                    <dt>Open Source</dt>
                    <dd>{t.open_source ? 'Ja 🔓' : 'Nein bzw. keine Angabe'}</dd>
                </div>
                <div>
                    <dt>Empfohlen von</dt>
                    <dd>
                        {t.konsens} von 3 Listen
                        <small>{t.quellen.map((q) => QUELLEN[q]?.repo || q).join(', ')}</small>
                    </dd>
                </div>
            </dl>
            {TEXTE[t.slug] && (
                <section aria-labelledby="take" className="jean-take">
                    <h2 id="take">Jeans Take zu {t.name} 🧔</h2>
                    <p>{TEXTE[t.slug].take}</p>
                    <p>
                        <em>{TEXTE[t.slug].jean}</em>
                    </p>
                </section>
            )}
            {!TEXTE[t.slug] && (<p className="box box-info">
                {t.konsens > 1
                    ? `${t.name} steht unabhängig voneinander in ${t.konsens === 3 ? 'allen drei' : 'zwei der drei'} größten offenen KI-Tool-Listen auf GitHub. Das ist ein gutes Zeichen, ersetzt aber keinen eigenen Test.`
                    : `${t.name} steht in einer der drei großen offenen KI-Tool-Listen. Mehr als diese eine Empfehlung haben wir noch nicht.`}
            </p>)}
            <LeadMagnetBox id={magnetFuer(t.rubrik)} anlass={`Für deinen ersten Test mit ${t.name}:`} />
            {alternativen.length > 0 && (
                <section aria-labelledby="alternativen">
                    <h2 id="alternativen">Alternativen zu {t.name}</h2>
                    <ul className="link-cards">
                        {alternativen.map((a) => (
                            <li key={a.slug}>
                                <Link href={kbPfad(a)}>
                                    <strong>{a.name}</strong>
                                </Link>
                                <span>{a.beschreibung}</span>
                                <span>
                                    {a.konsens === 3 ? '🏆 3/3' : a.konsens === 2 ? '🥈 2/3' : '1/3'}
                                    {a.open_source ? ' · 🔓 Open Source' : ''}
                                    {a.profil ? ' · 🧔 Steckbrief' : ''}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p>
                        {hatAlternativenHub(t.slug) && (
                            <>
                                <Link href={`/ki-tools/alternativen/${t.slug}`}>Alle {t.name}-Alternativen im Überblick →</Link>
                                {' · '}
                            </>
                        )}
                        {t.slug === 'chatgpt' && (
                            <>
                                <Link href="/ki-tools/chatgpt-alternativen">Alle ChatGPT-Alternativen →</Link>
                                {' · '}
                            </>
                        )}
                        <Link href={`/ki-tools/${t.rubrik}`}>Alle Tools in {r.name} →</Link>
                    </p>
                </section>
            )}
            {(prompts.length > 0 || tutorial) && (
                <section aria-labelledby="lernen">
                    <h2 id="lernen">Mehr aus {t.name} herausholen</h2>
                    <ul className="link-cards">
                        {tutorial && (
                            <li>
                                <Link href={`/tutorials/${tutorial.slug}`}>
                                    <strong>🎓 {tutorial.title}</strong>
                                </Link>
                                <span>{tutorial.minuten} Minuten, interaktiv mit Quiz</span>
                            </li>
                        )}
                        {prompts.map((p) => (
                            <li key={p.slug}>
                                <Link href={`/prompts/${p.slug}`}>
                                    <strong>💬 {p.title}</strong>
                                </Link>
                                <span>{p.ziel}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <p className="source">
                Stand {datumDe(KB_STAND)} · <Link href="/ki-tools/quellen">Quellen und Lizenzen</Link> ·{' '}
                <Link href="/tool-finder">Tool-Finder</Link> · <Link href="/ki-tools">← KI-Tool-Datenbank</Link>
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <KbToolPage params={params} />
            <Vernetzt pfad={seitenPfad('/ki-tools/tool/[slug]', params)} />
        </>
    )
}
