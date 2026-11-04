import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import KbExplorer from '../../components/KbExplorer'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import Faq, { faqSchema } from '../../components/Faq'
import Toc from '../../components/Toc'
import { Band } from '../../components/Deko'
import { RUBRIK_RATGEBER } from '../../../lib/rubrik-ratgeber'
import Quellen from '../../components/Quellen'
import { getArtikel } from '../../../lib/ratgeber'
import { SITE_NAME } from '../../../lib/site'
import { getKbRubrik, getKbRubriken, kbForClient, kbPfad, KB_STAND } from '../../../lib/kb'
import { kuerzen, datumDe } from '../../../lib/text'
import PartnerHinweis, { hatPartnerlink } from '../../components/PartnerHinweis'
import { getPrompt } from '../../../lib/prompts'
import { getTutorial } from '../../../lib/tutorials'
import { getTools, toolHref, toolRel } from '../../../lib/tools'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return getKbRubriken().map((r) => ({ rubrik: r.key }))
}

export function generateMetadata({ params }) {
    const r = getKbRubrik(params.rubrik)
    if (!r) return {}
    const top = r.tools.filter((t) => t.konsens > 1).slice(0, 4).map((t) => t.name)
    return {
        title: `${r.name}: ${r.tools.length} Tools im Überblick`,
        description: kuerzen(`${r.intro} ${top.length ? `Konsens-Favoriten: ${top.join(', ')}.` : ''}`),
        alternates: { canonical: `/ki-tools/${r.key}` },
    }
}

function RubrikPage({ params }) {
    const r = getKbRubrik(params.rubrik)
    if (!r) notFound()
    const favoriten = r.tools.filter((t) => t.konsens > 1).slice(0, 6)
    const prompts = (r.prompts || []).map(getPrompt).filter(Boolean)
    const tutorial = r.tutorial && getTutorial(r.tutorial)
    const partner = getTools().filter((t) => (KB_TOOLCAT[r.key] || []).includes(t.category))
    const rat = RUBRIK_RATGEBER[r.key]
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tool-Datenbank', path: '/ki-tools' },
        { name: r.name, path: `/ki-tools/${r.key}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: r.name,
            numberOfItems: r.tools.length,
            itemListElement: r.tools.slice(0, 30).map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: t.url })),
        },
    ]
    if (rat) schema.push(faqSchema(rat.faq))
    const toc = rat
        ? [
              favoriten.length > 0 && ['favoriten', 'Favoriten'],
              ['auswahl', 'So wählst du'],
              partner.length > 0 && ['gepruft', 'Mit Preisen'],
              ['alle', `Alle ${r.tools.length}`],
              ['faq', 'FAQ'],
          ].filter(Boolean)
        : null
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">KI-Tool-Datenbank · {r.tools.length} Tools</p>
                <h1>{r.name}</h1>
                <p className="lead">{r.intro}</p>
            </section>
            {toc && <Toc items={toc} />}
            {favoriten.length > 0 && (
                <section aria-labelledby="favoriten">
                    <h2 id="favoriten">🏆 Konsens-Favoriten</h2>
                    <p>Diese Tools empfehlen mindestens zwei der drei großen Listen unabhängig voneinander.</p>
                    <ol className="podium">
                        {favoriten.map((t) => (
                            <li key={t.slug}>
                                <Link href={kbPfad(t)}>
                                    <strong>{t.name}</strong>
                                </Link>
                                <span>{t.konsens === 3 ? '🏆 in allen 3 Listen' : '🥈 in 2 von 3 Listen'}</span>
                                {t.deutsch && <span className="podium-text">{t.beschreibung}</span>}
                                {t.profil && <Link href={`/tools/${t.profil.slug}`}>🧔 Steckbrief mit Preisen →</Link>}
                            </li>
                        ))}
                    </ol>
                </section>
            )}
            {rat && (
                <Band farbe="mint" id="auswahl" titel={`${rat.frage} 🧭`} sticker={`${rat.kriterien.length} Kriterien`}>
                    <ul className="kriterien-grid">
                        {rat.kriterien.map(([icon, titel, text]) => (
                            <li key={titel}>
                                <span className="kriterien-icon" aria-hidden="true">
                                    {icon}
                                </span>
                                <strong>{titel}</strong>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="box box-tipp">{rat.tipp}</p>
                    {rat.artikel && getArtikel(rat.artikel) && (
                        <p className="service-hint">
                            <strong>Ausführlicher Ratgeber:</strong> <Link href={`/ratgeber/${rat.artikel}`}>{getArtikel(rat.artikel).title} →</Link>
                        </p>
                    )}
                    <p className="box box-achtung">
                        {rat.achtung} <Link href="/ratgeber/ki-tools-datenschutz-dsgvo">DSGVO-Checkliste für KI-Tools →</Link>
                    </p>
                </Band>
            )}
            {partner.length > 0 && (
                <section aria-labelledby="gepruft">
                    <h2 id="gepruft">🧔 Von Jean mit Preisen geprüft</h2>
                    <ul className="link-cards">
                        {partner.map((t) => (
                            <li key={t.slug}>
                                <Link href={`/tools/${t.slug}`}>
                                    <strong>{t.name}</strong>
                                </Link>
                                <span>{t.summary_de}</span>
                                <a href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                                    {t.name} ansehen ↗{t.affiliate && <sup>*</sup>}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <PartnerHinweis zeigen={hatPartnerlink(partner)} />
                </section>
            )}
            <h2 id="alle">Alle {r.tools.length} Tools</h2>
            <KbExplorer tools={kbForClient(r.tools)} rubrik={r.key} />
            {(prompts.length > 0 || tutorial) && (
                <section aria-labelledby="lernen">
                    <h2 id="lernen">Damit holst du mehr raus</h2>
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
            {rat && (
                <section aria-labelledby="faq">
                    <h2 id="faq">Häufige Fragen: {r.name} 🙋</h2>
                    <Faq items={rat.faq} />
                </section>
            )}
            {rat && <Quellen quellen={rat.quellen} geprueft={rat.geprueft} text="Auswahlkriterien und Antworten wurden mit diesen Quellen abgeglichen" />}
            <LeadMagnetBox id="prompt-paket" />
            <p className="source">
                Stand {datumDe(KB_STAND)}. Einträge aus drei offenen GitHub-Listen, deutsche Kurzbeschreibungen auf Basis der Quellenangaben. <Link href="/ki-tools/quellen">Quellen und Lizenzen</Link> ·{' '}
                <Link href="/ki-tools">← alle Rubriken</Link>
            </p>
        </>
    )
}

// Rubrik der Datenbank -> Kategorie im geprüften Tool-Verzeichnis (db/tools.json)
const KB_TOOLCAT = {
    chatbots: ['KI-Chat & Recherche', 'Chatbots & Voice-Agenten'],
    suche: ['KI-Chat & Recherche'],
    recherche: ['KI-Chat & Recherche'],
    schreiben: ['Schreiben', 'SEO'],
    produktivitaet: ['Produktivität', 'Meeting & Transkription', 'Präsentation & Dokumente', 'Automatisierung'],
    agenten: ['Automatisierung'],
    bild: ['Design', 'Präsentation & Dokumente'],
    video: ['Video & Avatare'],
    audio: ['Audio & Voice', 'Meeting & Transkription'],
    marketing: ['Funnel & Marketing', 'E-Mail & Newsletter'],
}

export default function Seite({ params }) {
    return (
        <>
            <RubrikPage params={params} />
            <Vernetzt pfad={seitenPfad('/ki-tools/[rubrik]', params)} />
        </>
    )
}
