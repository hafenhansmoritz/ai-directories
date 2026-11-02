import Link from 'next/link'
import TEXTE from '../../../db/texte/tools.json'
import START from '../../../db/texte/tools-start.json'
import Jean from '../../components/Jean'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import { SITE_NAME, absoluteUrl } from '../../../lib/site'
import { getTools, getTool, getAlternatives, toolHref, toolRel, TOOLS_STAND } from '../../../lib/tools'
import { comparisonsForTool } from '../../../lib/comparisons'
import { getPrompts, getPromptsForTool, PROMPT_KATEGORIEN } from '../../../lib/prompts'
import { getKbTools, getKbRubrik } from '../../../lib/kb'
import { RUBRIK_RATGEBER } from '../../../lib/rubrik-ratgeber'
import { ZIELGRUPPEN } from '../../../lib/zielgruppen'
import { ABO_PREISE, breakEvenMonate } from '../../../lib/abo-preise'
import { hatAlternativenHub } from '../../../lib/alternativen'
import Faq, { faqSchema } from '../../components/Faq'
import { Band } from '../../components/Deko'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import { autorRef } from '../../../lib/autor'
import Pruefer from '../../components/Pruefer'
import { dateiStand } from '../../../lib/stand'
import Kurzantwort from '../../components/Kurzantwort'
import PartnerHinweis from '../../components/PartnerHinweis'
import { kuerzen } from '../../../lib/text'

export const dynamicParams = false

export function generateStaticParams() {
    return getTools().map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }) {
    const t = getTool(params.slug)
    if (!t) return {}
    // Steckbrief = Preis-Intent; „Alternativen“ gehört dem Hub /ki-tools/alternativen/… (keine Kannibalisierung).
    // Preis-Info zuerst in der Description, damit sie im Snippet nicht abgeschnitten wird.
    const preis = [t.free_plan === true ? 'gratis nutzbar' : '', t.price_from ? `bezahlt ab ${preisKurz(t.price_from)}` : ''].filter(Boolean).join(', ')
    return {
        title: t.name.length > 18 ? `${t.name}: Preis & Gratis-Tarif` : `${t.name}: Preis, Gratis-Tarif & Kosten`,
        description: kuerzen(`${t.name}${preis ? `: ${preis}` : ''}. ${t.summary_de}`),
        alternates: { canonical: `/tools/${t.slug}` },
    }
}

// Kurzform des Einstiegspreises für Meta-Angaben: nur der erste Betrag samt Einheit, Klammerzusatz weg.
const preisKurz = (p) => p.split(/\s*[(;]|\s+bzw\.\s/)[0].trim()

// Angebot fürs Schema nur aus den offiziellen Feldern (price_from, free_plan). Erster Betrag und Währung werden aus
// dem Text gelesen, nichts geschätzt. Ohne erkennbaren Betrag gibt es kein bezahltes Angebot.
function schemaOffers(t) {
    const offers = []
    const m = t.price_from && t.price_from.match(/(?:US)?\$\s?(\d[\d.,]*)|(\d[\d.,]*)\s?€/)
    let waehrung = null
    if (m) {
        waehrung = m[1] ? 'USD' : 'EUR'
        const roh = m[1] || m[2]
        const betrag = Number(/,\d{1,2}$/.test(roh) ? roh.replace(/\./g, '').replace(',', '.') : roh.replace(/,/g, ''))
        const rest = t.price_from.slice(m.index + m[0].length)
        const einheit = /^\s*\/\s*(Nutzer\/)?Monat/.test(rest) ? 'MONTH' : /^\s*\/\s*Jahr/.test(rest) ? 'YEAR' : null
        if (betrag > 0)
            offers.push({
                '@type': 'Offer',
                price: betrag,
                priceCurrency: waehrung,
                description: `Einstiegspreis laut Anbieter: ${t.price_from}`,
                ...(t.pricing_url ? { url: t.pricing_url } : {}),
                ...(einheit ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: betrag, priceCurrency: waehrung, unitCode: einheit === 'MONTH' ? 'MON' : 'ANN' } } : {}),
            })
    }
    if (t.free_plan === true) offers.unshift({ '@type': 'Offer', price: 0, priceCurrency: waehrung || 'EUR', description: 'Gratis-Tarif laut Anbieter', ...(t.pricing_url ? { url: t.pricing_url } : {}) })
    return offers
}

const yesNo = (v) => (v === true ? 'Ja' : v === false ? 'Nein' : 'keine Angabe')

const formatTestphase = (t) => {
    if (t.free_trial) return t.free_trial
    if (t.free_plan === true) return 'Keine (dauerhafter Gratis-Tarif)'
    if (t.free_plan === false) return 'Keine'
    return 'keine Angabe'
}

// Steckbrief-Kategorie → Rubrik der KI-Tool-Datenbank (für Auswahlkriterien und Datenbank-Link)
const KAT_RUBRIK = {
    'KI-Chat & Recherche': 'chatbots',
    Schreiben: 'schreiben',
    SEO: 'schreiben',
    Produktivität: 'produktivitaet',
    'Meeting & Transkription': 'produktivitaet',
    'Präsentation & Dokumente': 'produktivitaet',
    Automatisierung: 'agenten',
    Design: 'bild',
    'Video & Avatare': 'video',
    'Audio & Voice': 'audio',
    'Funnel & Marketing': 'marketing',
    'E-Mail & Newsletter': 'marketing',
    Formulare: 'marketing',
    'Website & Landingpage': 'marketing',
    Coding: 'coding',
}

// FAQ nur aus den Steckbrief-Daten (laut Anbieter), damit nichts erfunden ist.
function toolFaq(t, alternativen, abo) {
    const f = []
    f.push({
        q: `Ist ${t.name} kostenlos?`,
        a:
            t.free_plan === true
                ? `Ja, ${t.name} hat laut Anbieter einen Gratis-Tarif.${t.price_from ? ` Bezahlte Tarife beginnen bei ${t.price_from}.` : ''}`
                : t.free_plan === false
                  ? `Nein, einen dauerhaften Gratis-Tarif nennt ${t.name} nicht.${t.free_trial && !t.free_trial.toLowerCase().startsWith('kein') ? ` Es gibt aber eine Testphase (${t.free_trial}).` : ''}${t.price_from ? ` Bezahlt ab ${t.price_from}.` : ''}`
                  : `Einen Gratis-Tarif nennt die Preisseite nicht eindeutig.${t.free_trial ? ` Testphase: ${t.free_trial}.` : ''} Prüfe den aktuellen Stand auf der Preisseite des Anbieters.`,
    })
    if (t.price_from) f.push({ q: `Was kostet ${t.name}?`, a: `Laut Anbieter ab ${t.price_from} (Stand ${TOOLS_STAND}). Preise können sich ändern, maßgeblich ist die Preisseite von ${t.name}.` })
    if (abo)
        f.push({
            q: `Lohnt sich bei ${t.name} das Jahresabo?`,
            a: `${abo.plan} kostet monatlich gezahlt $${abo.monatlich.toLocaleString('de-DE')} und bei jährlicher Zahlung $${abo.jaehrlich.toLocaleString('de-DE')} pro Monat. Das Jahresabo lohnt sich, wenn du ${t.name} mindestens ${breakEvenMonate(abo)} Monate im Jahr nutzt.`,
        })
    if (t.german_ui !== null && t.german_ui !== undefined)
        f.push({ q: `Gibt es ${t.name} auf Deutsch?`, a: t.german_ui ? `Ja, die Oberfläche von ${t.name} gibt es laut Anbieter auf Deutsch.` : `Die Oberfläche von ${t.name} ist laut Anbieter nicht auf Deutsch verfügbar.` })
    f.push({ q: `Für wen eignet sich ${t.name}?`, a: `${t.best_for_de}. ${t.summary_de}` })
    if (alternativen.length) f.push({ q: `Welche Alternativen zu ${t.name} gibt es?`, a: `Aus derselben Kategorie (${t.category}): ${alternativen.slice(0, 5).map((a) => a.name).join(', ')}. Alle mit Preisen laut Anbieter weiter unten auf dieser Seite.` })
    return f
}

function ToolPage({ params }) {
    const t = getTool(params.slug)
    if (!t) notFound()
    const alternatives = getAlternatives(t)
    const rubrik = getKbRubrik(KAT_RUBRIK[t.category])
    const rat = rubrik && RUBRIK_RATGEBER[rubrik.key]
    const kb = getKbTools().find((k) => k.profil?.slug === t.slug)
    const abo = ABO_PREISE.find((a) => a.slug === t.slug)
    const einsaetze = kb
        ? ZIELGRUPPEN.flatMap((z) => z.aufgaben.filter(([, , , tools]) => tools.includes(kb.slug)).map(([emoji, aufgabe]) => ({ z, emoji, aufgabe })))
        : []
    const faq = toolFaq(t, alternatives, abo)
    const offers = schemaOffers(t)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Tool-Steckbriefe', path: '/tools' },
        { name: t.name, path: `/tools/${t.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            '@id': `${absoluteUrl(`/tools/${t.slug}`)}#software`,
            name: t.name,
            applicationCategory: t.category,
            operatingSystem: 'Web',
            url: t.url,
            description: t.summary_de,
            ...(offers.length ? { offers: offers.length === 1 ? offers[0] : offers } : {}),
        },
        faqSchema(faq),
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${t.name}: Preis, Gratis-Tarif und Alternativen`,
            url: absoluteUrl(`/tools/${t.slug}`),
            inLanguage: 'de-DE',
            reviewedBy: autorRef(),
            lastReviewed: dateiStand('db/tools.json', 'db/texte/tools.json').toISOString().slice(0, 10),
            about: { '@id': `${absoluteUrl(`/tools/${t.slug}`)}#software` },
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">{t.category}</p>
                <h1>{t.name}: Preis, Gratis-Tarif und Alternativen</h1>
                <p className="lead">{t.summary_de}</p>
                <p>
                    <strong>Am besten für:</strong> {t.best_for_de}
                </p>
                <p className="cta-row">
                    <a className="button" href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                        {t.name} ansehen ↗{t.affiliate && <sup>*</sup>}
                    </a>
                    {t.pricing_url && (
                        <span className="source">
                            Quelle der Preise:{' '}
                            <a href={t.pricing_url} target="_blank" rel="nofollow noopener noreferrer">
                                Preisseite von {t.name} ↗
                            </a>
                        </span>
                    )}
                </p>
                <PartnerHinweis zeigen={Boolean(t.affiliate)} />
                <Kurzantwort frage={`Was kostet ${t.name}, und für wen lohnt es sich?`}>
                    {t.free_plan === true ? `${t.name} lässt sich laut Anbieter kostenlos nutzen.` : t.free_plan === false ? `${t.name} hat laut Anbieter keinen dauerhaften Gratis-Tarif${t.free_trial && !t.free_trial.toLowerCase().startsWith('kein') ? `, aber eine Testphase (${t.free_trial})` : ''}.` : `Ob ${t.name} einen Gratis-Tarif hat, nennt die Preisseite nicht eindeutig.`}{' '}
                    {t.price_from ? `Bezahlt geht es ab ${t.price_from} los (Stand ${TOOLS_STAND}).` : 'Einen festen Einstiegspreis nennt der Anbieter nicht.'} Am besten geeignet für: {t.best_for_de.replace(/\.$/, '')}.
                    {alternatives.length > 0 && ` Bekannte Alternativen: ${alternatives.slice(0, 3).map((a) => a.name).join(', ')}.`}
                </Kurzantwort>
                {TEXTE[t.slug]?.jean && <Jean>{TEXTE[t.slug].jean}</Jean>}
            </section>
            <dl className="facts">
                <div>
                    <dt>Gratis-Tarif</dt>
                    <dd>{yesNo(t.free_plan)}</dd>
                </div>
                <div>
                    <dt>Testphase</dt>
                    <dd>{formatTestphase(t)}</dd>
                </div>
                <div>
                    <dt>Bezahlt ab</dt>
                    <dd>
                        {t.price_from ? (
                            <>
                                {t.price_from}
                                <small>laut Anbieter, {TOOLS_STAND}</small>
                            </>
                        ) : (
                            <>
                                nicht öffentlich
                                <small>Einen festen Preis nennt der Anbieter nicht, Stand {TOOLS_STAND}</small>
                            </>
                        )}
                    </dd>
                </div>
                <div>
                    <dt>Oberfläche auf Deutsch</dt>
                    <dd>{yesNo(t.german_ui)}</dd>
                </div>
            </dl>
            {t.source && (
                <p className="source">
                    Quelle: <a href={t.source} target="_blank" rel="nofollow noopener noreferrer">{new URL(t.source).hostname}</a>
                </p>
            )}
            {START[t.slug] && (
                <section aria-labelledby="start">
                    <h2 id="start">So startest du mit {t.name} 🚀</h2>
                    {START[t.slug].intro && <p>{START[t.slug].intro}</p>}
                    <ol>
                        {START[t.slug].schritte.map(([titel, text]) => (
                            <li key={titel}>
                                <strong>{titel}:</strong> {text}
                            </li>
                        ))}
                    </ol>
                    {START[t.slug].tipps?.length > 0 && (
                        <ul>
                            {START[t.slug].tipps.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    )}
                    {START[t.slug].quellen?.length > 0 && (
                        <p className="source">
                            Geprüft am {START[t.slug].geprueft} auf:{' '}
                            {START[t.slug].quellen.map((q, i) => (
                                <span key={q.url}>
                                    {i > 0 && ' · '}
                                    <a href={q.url} target="_blank" rel="nofollow noopener noreferrer">
                                        {q.titel}
                                    </a>
                                </span>
                            ))}
                        </p>
                    )}
                </section>
            )}
            {TEXTE[t.slug] && (
                <section aria-labelledby="meinung" className="jean-take">
                    <h2 id="meinung">Jeans ehrliche Meinung zu {t.name} 🧔</h2>
                    <p>{TEXTE[t.slug].meinung}</p>
                    <div className="pro-contra">
                        <div>
                            <p>
                                <strong>Passt 👍</strong>
                            </p>
                            <ul>
                                {TEXTE[t.slug].passt_wenn.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p>
                                <strong>Lass es 👎</strong>
                            </p>
                            <ul>
                                {TEXTE[t.slug].lass_es_wenn.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}
            <section aria-labelledby="kosten" className="box box-info">
                <h2 id="kosten">Was kostet {t.name}? 💸</h2>
                <p>
                    {t.free_plan === true
                        ? `Du kannst ${t.name} kostenlos starten.`
                        : t.free_plan === false
                          ? `${t.name} hat keinen dauerhaften Gratis-Tarif${t.free_trial ? `, aber eine Testphase (${t.free_trial})` : ''}.`
                          : `Ob es einen Gratis-Tarif gibt, verrät die Preisseite nicht eindeutig.`}{' '}
                    {t.price_from ? `Bezahlt geht es laut Anbieter ab ${t.price_from} los.` : 'Einen festen Einstiegspreis nennt der Anbieter nicht.'}
                </p>
                <p>
                    <a className="button button-small" href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                        Zum Anbieter {t.name} ↗{t.affiliate && <sup>*</sup>}
                    </a>
                </p>
                {abo && (
                    <p>
                        <strong>Monatlich oder jährlich?</strong> Das Jahresabo für {abo.plan} lohnt sich ab {breakEvenMonate(abo)} Monaten Nutzung.{' '}
                        <Link href="/rechner/abo-monatlich-oder-jaehrlich">Im Abo-Rechner durchrechnen →</Link>
                    </p>
                )}
                <p>
                    Lohnt sich das Abo überhaupt? Der <Link href="/rechner/ki-zeitersparnis">KI-Zeitersparnis-Rechner</Link> stellt gesparte Stunden gegen die
                    Kosten.
                </p>
            </section>
            {rat && (
                <Band farbe="mint" id="pruefen" titel={`So prüfst du ${t.name}, bevor du zahlst 🧭`} sticker={`${rat.kriterien.length} Kriterien`}>
                    <ul className="kriterien-grid">
                        {rat.kriterien.map(([icon, titel, text]) => (
                            <li key={titel}>
                                <span className="kriterien-icon" aria-hidden="true">
                                    {icon}
                                </span>
                                <strong>{titel}</strong>
                            </li>
                        ))}
                    </ul>
                    <p>
                        Was hinter jedem Punkt steckt und worauf du bei {t.category} achten musst, steht ausführlich in der{' '}
                        <Link href={`/ki-tools/${rubrik.key}#auswahl`}>Rubrik {rubrik.name}</Link>.
                    </p>
                </Band>
            )}
            {einsaetze.length > 0 && (
                <section aria-labelledby="einsatz">
                    <h2 id="einsatz">Wofür {t.name} im Alltag taugt 🛠️</h2>
                    <ul className="link-cards">
                        {einsaetze.slice(0, 6).map(({ z, emoji, aufgabe }) => (
                            <li key={z.slug + aufgabe}>
                                <Link href={`/ki-tools/fuer/${z.slug}`}>
                                    <strong>
                                        {emoji} {aufgabe}
                                    </strong>
                                </Link>
                                <span>{z.titel}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {comparisonsForTool(t.slug).map((c) => (
                <p key={c.slug} className="service-hint">
                    <strong>Im direkten Vergleich:</strong> <Link href={`/tool-vergleiche/${c.slug}`}>{c.title} →</Link>
                </p>
            ))}
            {(() => {
                const passend = getPrompts().filter((p) => p.tools.includes(t.slug)).slice(0, 4)
                const toolPrompts = getPromptsForTool(t.slug)
                return passend.length > 0 || toolPrompts.length > 0 ? (
                    <section aria-labelledby="prompts">
                        <h2 id="prompts">Fertige Prompts für {t.name}</h2>
                        <ul className="link-cards">
                            {passend.map((p) => (
                                <li key={p.slug}>
                                    <Link href={`/prompts/${p.slug}`}>
                                        <strong>{p.title}</strong>
                                    </Link>
                                    <span>{p.ziel}</span>
                                    <Link href={`/prompts/kategorie/${p.kategorie}`}>{PROMPT_KATEGORIEN[p.kategorie].name} →</Link>
                                </li>
                            ))}
                        </ul>
                        {toolPrompts.length > 0 && (
                            <p className="service-hint">
                                <strong>Speziell für {t.name}:</strong>{' '}
                                <Link href={`/prompts/tool/${t.slug}`}>
                                    Prompts für {t.name} ({toolPrompts.length} Vorlagen) →
                                </Link>
                            </p>
                        )}
                    </section>
                ) : null
            })()}
            {alternatives.length > 0 && (
                <section aria-labelledby="alternativen">
                    <h2 id="alternativen">Alternativen zu {t.name}</h2>
                    <ul className="link-cards">
                        {alternatives.map((a) => (
                            <li key={a.slug}>
                                <Link href={`/tools/${a.slug}`}>
                                    <strong>{a.name}</strong>
                                </Link>
                                <span>{a.summary_de}</span>
                                <span>
                                    {a.free_plan ? 'Gratis-Tarif · ' : ''}
                                    {a.price_from ? `ab ${a.price_from}` : 'Preis auf Anfrage'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen zu {t.name} 🙋</h2>
                <Faq items={faq} />
            </section>
            <Pruefer datum={dateiStand('db/tools.json', 'db/texte/tools.json')} />
            <p className="cta-row">
                <Link href="/tools">← Alle Tool-Steckbriefe mit Preisen</Link>
                {kb && <Link href={`/ki-tools/tool/${kb.slug}`}>{t.name} in der KI-Tool-Datenbank</Link>}
                {kb && hatAlternativenHub(kb.slug) && <Link href={`/ki-tools/alternativen/${kb.slug}`}>Alle Alternativen zu {t.name}</Link>}
                {rubrik && <Link href={`/ki-tools/${rubrik.key}`}>Rubrik {rubrik.name}</Link>}
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <ToolPage params={params} />
            <Vernetzt pfad={seitenPfad('/tools/[slug]', params)} />
        </>
    )
}
