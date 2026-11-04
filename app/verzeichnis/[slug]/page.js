import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Faq, { faqSchema } from '../../components/Faq'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import { PriceBadge, ExperienceBadge } from '../../components/Badges'
import DirectoryTable from '../../components/DirectoryTable'
import { getDirectories, getDirectory, getRank, getVisitsPercentile, getAlternatives, tabellenZeilen, LISTS } from '../../../lib/data'
import { Band } from '../../components/Deko'
import { getVerdict } from '../../../lib/verdict'
import { jeanLine } from '../../../lib/score'
import Jean from '../../components/Jean'
import ScoreBar from '../../components/ScoreBar'
import CopyButton from '../../components/CopyButton'
import VerzeichnisHeroStatus from '../../components/VerzeichnisHeroStatus'
import VerzeichnisLaunchKitBox from '../../components/VerzeichnisLaunchKitBox'
import ServiceHint from '../../components/ServiceHint'
import FreshBox from '../../components/FreshBox'
import CheckBox from '../../components/CheckBox'
import { getCheck, hasStatusIssue } from '../../../lib/checks'
import { absoluteUrl } from '../../../lib/site'
import { autorRef } from '../../../lib/autor'
import { dateiStand } from '../../../lib/stand'
import { submitRel } from '../../../lib/monetization'
import { dealLabel, formatRating, formatVisits, pricingLabel } from '../../../utils/i18n-de'
import TEXTE from '../../../db/texte/verzeichnisse.json'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return getDirectories().map((d) => ({ slug: d.slug }))
}

export function generateMetadata({ params }) {
    const d = getDirectory(params.slug)
    if (!d) return {}
    const price = d.pricing ? pricingLabel(d.pricing).toLowerCase() : 'Preis unklar'
    return {
        title: `${d.name} eintragen: Kosten & Domain Rating`,
        description: `${d.name} im Check: ${price}, Domain Rating ${formatRating(d.domain_rating)}, ca. ${formatVisits(d.monthly_visits)} Besuche im Monat. So trägst du dein KI-Tool ein, plus Alternativen.`,
        alternates: { canonical: `/verzeichnis/${d.slug}` },
        // Bild ausdrücklich mitgeben: ein eigenes openGraph-Objekt ersetzt sonst das geerbte Vorschaubild.
        openGraph: { url: `/verzeichnis/${d.slug}`, images: [{ url: absoluteUrl('/opengraph-image.png'), width: 1200, height: 630 }] },
    }
}

function buildFaq(d, rank, total) {
    const price =
        d.pricing === 'Free'
            ? `Ja, der Eintrag bei ${d.name} ist kostenlos.`
            : d.pricing === 'Paid'
              ? `Nein, ${d.name} verlangt für den Eintrag Geld.${d.dealCode ? ` Mit dem Code ${d.dealCode} gibt es ${dealLabel(d.dealText)}.` : ''}`
              : `Dazu liegen keine gesicherten Daten vor. Prüf den Preis direkt auf der Einreichungsseite.`
    return [
        { q: `Ist ${d.name} kostenlos?`, a: price },
        {
            q: `Welches Domain Rating hat ${d.name}?`,
            a: `${d.name} hat ein Domain Rating von ${formatRating(d.domain_rating)} (Ahrefs, Skala 0 bis 100). Damit liegt es auf Platz ${rank} von ${total} Verzeichnissen dieser Liste.`,
        },
        {
            q: `Wie trage ich mein KI-Tool bei ${d.name} ein?`,
            a: getCheck(d.slug)?.status
                ? `Im Moment gar nicht. ${getCheck(d.slug).status} Stand: Oktober 2026. Nimm solange eine der Alternativen auf dieser Seite.`
                : `Über die Einreichungsseite ${d.submission_link}. ${
                d.submission_experience === 'Good'
                    ? `Bei ${d.name} lief das Formular in unseren Tests ohne Zicken.`
                    : d.submission_experience === 'Bad'
                      ? 'Die Einreichung gilt als hakelig, plan also etwas mehr Zeit ein.'
                      : 'Zur Einreichung gibt es noch keine Erfahrungswerte.'
            }`,
        },
        {
            q: `Lohnt sich ${d.name} für SEO?`,
            a: `${d.domain_rating >= 50 ? `Mit Domain Rating ${formatRating(d.domain_rating)} gehört ${d.name} zu den starken Domains dieser Liste.` : d.domain_rating >= 20 ? `Mit Domain Rating ${formatRating(d.domain_rating)} ist ${d.name} eine solide, aber keine Top-Domain.` : `Mit Domain Rating ${formatRating(d.domain_rating)} ist der SEO-Effekt eher klein.`} ${
                getCheck(d.slug)?.link_type ? `Link-Typ laut Verzeichnis: ${getCheck(d.slug).link_type}.` : `Den Link-Typ nennt ${d.name} nicht.`
            }`,
        },
        ...(getCheck(d.slug)?.approval
            ? [{ q: `Wie lange dauert die Freischaltung bei ${d.name}?`, a: `Laut ${d.name}: ${getCheck(d.slug).approval}. Mehr Werte im Vergleich auf der Seite Freischaltdauer.` }]
            : []),
        ...(d.dealCode ? [{ q: `Gibt es einen Rabattcode für ${d.name}?`, a: `Ja: ${d.dealCode} für ${dealLabel(d.dealText)}. Ob er noch gilt, entscheidet der Anbieter.` }] : []),
    ]
}

// Einordnung aus den Daten: wofür sich der Eintrag eignet. Keine Meinung ohne Zahl dahinter.
function staerken(d) {
    const s = []
    if (d.domain_rating >= 50) s.push(['🔗', 'Starker Backlink', `Domain Rating ${formatRating(d.domain_rating)}: Ein Eintrag hier zählt für Google mehr als die meisten anderen.`])
    else if (d.domain_rating >= 30) s.push(['🔗', 'Solider Backlink', `Domain Rating ${formatRating(d.domain_rating)}: guter Durchschnitt für eine Launch-Runde.`])
    if (d.monthly_visits >= 500000) s.push(['👀', 'Echte Besucher', `Rund ${formatVisits(d.monthly_visits)} Besuche im Monat: Hier kann der Eintrag Klicks bringen, nicht nur einen Link.`])
    else if (d.monthly_visits >= 50000) s.push(['👀', 'Etwas Laufkundschaft', `Rund ${formatVisits(d.monthly_visits)} Besuche im Monat: kein Ansturm, aber ein paar neugierige Gründer.`])
    if (d.pricing === 'Free' && d.submission_experience === 'Good') s.push(['⚡', 'Schneller Gratis-Eintrag', 'Kostenlos und laut bisherigen Tests reibungslos: ideal für die erste Stunde deines Launches.'])
    if (d.pricing === 'Paid') s.push(['💸', 'Bezahlter Platz', d.dealCode ? `Kostet Geld, mit dem Code ${d.dealCode} etwas weniger. Lohnt sich nur, wenn deine Zielgruppe hier unterwegs ist.` : 'Kostet Geld. Lohnt sich nur, wenn deine Zielgruppe hier unterwegs ist.'])
    if (d.submission_experience === 'Bad') s.push(['🐢', 'Geduld einplanen', 'Die Einreichung gilt als hakelig. Nimm dir Zeit oder erst die leichteren Verzeichnisse.'])
    if (!s.length) s.push(['🧩', 'Ergänzung für die Liste', 'Kleinere Domain mit wenig Traffic: Nimm sie mit, wenn du ohnehin einträgst, aber erwarte keine Wunder.'])
    return s
}

// Überschrift aus den Daten, damit jede Seite ihr Unterscheidungsmerkmal in der H1 trägt.
function ueberschrift(d) {
    if (hasStatusIssue(d.slug)) return `${d.name} eintragen: gerade zu, was jetzt?`
    const merkmale = []
    if (d.pricing === 'Free') merkmale.push('kostenlos')
    else if (d.pricing === 'Paid') merkmale.push(d.dealCode ? 'kostenpflichtig, mit Rabattcode' : 'kostenpflichtig')
    if (d.domain_rating) merkmale.push(`DR ${formatRating(d.domain_rating)}`)
    if (d.submission_experience === 'Good') merkmale.push('reibungslos')
    else if (d.submission_experience === 'Bad') merkmale.push('hakelig')
    return merkmale.length ? `${d.name} eintragen (${merkmale.join(', ')}): lohnt sich das?` : `${d.name} eintragen: lohnt sich das?`
}

// Stand der Zahlen: letzte Änderung der Datendateien, aus denen die Seite entsteht.
const STAND = dateiStand('db/directories.json', 'db/checks.json', 'db/fresh-semrush.json')
const STAND_TEXT = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(STAND)

function DirectoryPage({ params }) {
    const d = getDirectory(params.slug)
    if (!d) notFound()

    const total = getDirectories().length
    const rank = getRank(d.slug)
    const percentile = getVisitsPercentile(d)
    const verdict = getVerdict(d)
    const alternatives = getAlternatives(d)
    const faq = buildFaq(d, rank, total)
    const check = getCheck(d.slug)
    const listen = Object.entries(LISTS).filter(([, l]) => l.filter(d))
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'KI-Verzeichnisse', path: '/verzeichnis' },
        { name: d.name, path: `/verzeichnis/${d.slug}` },
    ]

    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${d.name} eintragen`,
            url: absoluteUrl(`/verzeichnis/${d.slug}`),
            inLanguage: 'de-DE',
            about: { '@type': 'WebSite', name: d.name, url: d.link },
            dateModified: STAND.toISOString().slice(0, 10),
            // Geprüft heißt hier: Angaben beim Verzeichnis selbst nachgeschlagen (db/checks.json).
            ...(check && { reviewedBy: autorRef() }),
        },
        faqSchema(faq),
    ]

    return (
        <article>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />

            <header className="detail-header">
                <div>
                    <h1>{ueberschrift(d)}</h1>
                    <p className="badges">
                        <PriceBadge value={d.pricing} /> <ExperienceBadge value={d.submission_experience} blocked={hasStatusIssue(d.slug)} />
                    </p>
                </div>
            </header>

            <VerzeichnisHeroStatus slug={d.slug} name={d.name} />

            <p className="cta-row">
                <a className="button" href={hasStatusIssue(d.slug) ? d.link : d.submission_link} target="_blank" rel={hasStatusIssue(d.slug) ? 'nofollow noopener noreferrer' : submitRel(d)}>
                    {hasStatusIssue(d.slug) ? `Website von ${d.name} ansehen ↗` : `Jetzt bei ${d.name} eintragen 🚀`}
                    {d.affiliate && !hasStatusIssue(d.slug) && <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup>}
                    <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
                <a href={d.link} target="_blank" rel="nofollow noopener noreferrer">
                    Erst mal die Website bestaunen ↗<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
                <CopyButton label="Link zu dieser Seite kopieren 🔗" done="Link kopiert ✓" />
            </p>

            <VerzeichnisLaunchKitBox slug={d.slug} directoryName={d.name} />

            {/* Launch-Service im Inhalt, damit er auch mobil sichtbar ist (die Seitenleiste fehlt dort). */}
            <ServiceHint text={`Keine Zeit für ${d.name} und 50 weitere Formulare?`} href="/werben#anfrage-tool-eintragen" />

            <div className={`verdict verdict-${verdict.tone}`}>
                <p className="verdict-label">Jeans Urteil: {verdict.short}</p>
                <p>
                    <strong>{d.name}</strong> ist ein {d.pricing ? `${pricingLabel(d.pricing).toLowerCase()}es ` : ''}Verzeichnis mit Domain Rating {formatRating(d.domain_rating)} und
                    {d.monthly_visits ? ` rund ${formatVisits(d.monthly_visits)} Besuchen im Monat.` : ' ohne belastbare Traffic-Daten.'}{' '}
                    {!TEXTE[d.slug]?.take && verdict.text}
                </p>
            </div>

            <Jean>{TEXTE[d.slug]?.jean || jeanLine(d)}</Jean>

            {TEXTE[d.slug]?.take && (
                <section aria-labelledby="take" className="jean-take">
                    <h2 id="take">Jeans Take zu {d.name} 🧔</h2>
                    <p>{TEXTE[d.slug].take}</p>
                </section>
            )}

            <section aria-labelledby="zahlen">
                <h2 id="zahlen">{d.name} in Zahlen 🔢</h2>
                <ScoreBar directory={d} />
                <dl className="facts">
                    <div>
                        <dt>Domain Rating</dt>
                        <dd>
                            {formatRating(d.domain_rating)} <small>Platz {rank} von {total}</small>
                        </dd>
                    </div>
                    <div>
                        <dt>Besuche/Monat</dt>
                        <dd>
                            {formatVisits(d.monthly_visits)}
                            {d.monthly_visits > 0 && <small>mehr als {percentile} % der Liste, Angeber</small>}
                        </dd>
                    </div>
                    <div>
                        <dt>Preis</dt>
                        <dd>{pricingLabel(d.pricing)}</dd>
                    </div>
                    <div>
                        <dt>Einreichung</dt>
                        <dd>
                            <ExperienceBadge value={d.submission_experience} blocked={hasStatusIssue(d.slug)} />
                        </dd>
                    </div>
                </dl>
                <p className="c-stand">
                    Stand der Zahlen: <time dateTime={STAND.toISOString().slice(0, 10)}>{STAND_TEXT}</time>. Domain Rating laut Ahrefs, Besuche
                    geschätzt.{' '}
                    {check
                        ? 'Freischaltdauer und Link-Typ hat Jean beim Verzeichnis selbst nachgeschlagen, siehe unten.'
                        : `Freischaltdauer und Link-Typ hat Jean bei ${d.name} noch nicht nachgeschlagen.`}{' '}
                    <Link href="/so-pruefen-wir">So prüfen wir →</Link>
                </p>
                <FreshBox directory={d} />
                <CheckBox slug={d.slug} />
            </section>

            <section aria-labelledby="staerken">
                <h2 id="staerken">Wofür sich {d.name} eignet 🎯</h2>
                <ul className="kriterien-grid">
                    {staerken(d).map(([icon, titel, text]) => (
                        <li key={titel}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {icon}
                            </span>
                            <strong>{titel}</strong>
                            {!TEXTE[d.slug]?.take && <span>{text}</span>}
                        </li>
                    ))}
                </ul>
                {listen.length > 0 && (
                    <p>
                        Steht auch in:{' '}
                        {listen.map(([slug, l], i) => (
                            <span key={slug}>
                                {i > 0 && ' · '}
                                <Link href={`/liste/${slug}`}>{l.title}</Link>
                            </span>
                        ))}
                    </p>
                )}
            </section>

            {!hasStatusIssue(d.slug) && (
                <Band farbe="blau" id="anleitung" titel={`So kommst du bei ${d.name} rein 🛠️`} sticker="3 Schritte">
                    <ol className="anleitung">
                        <li>
                            <strong>Formular öffnen:</strong>{' '}
                            <a href={d.submission_link} target="_blank" rel={submitRel(d)}>
                                {new URL(d.submission_link).hostname.replace(/^www\./, '')}
                            </a>
                            .{' '}
                            {d.submission_experience === 'Good'
                                ? `Bei ${d.name} lief das in unseren Tests ohne Zicken.`
                                : d.submission_experience === 'Bad'
                                  ? `${d.name} gilt als hakelig, plan einen zweiten Kaffee ein.`
                                  : 'Erfahrungswerte zur Einreichung gibt es noch nicht.'}
                        </li>
                        <li>
                            <strong>Kosten:</strong>{' '}
                            {d.pricing === 'Free'
                                ? 'kostenlos.'
                                : d.pricing === 'Paid'
                                  ? `kostenpflichtig${d.dealCode ? `, mit ${d.dealCode} gibt es ${dealLabel(d.dealText)}` : ''}. Frag vorher, ob der Link dofollow ist.`
                                  : 'nicht gesichert, schau ins Formular.'}
                        </li>
                        <li>
                            <strong>Nachhalten:</strong> {check?.approval ? `Freischaltung laut ${d.name}: ${check.approval}.` : `Eine Freischaltdauer nennt ${d.name} nicht.`}
                            {check?.link_type ? ` Link-Typ laut ${d.name}: ${check.link_type}.` : ''}
                        </li>
                    </ol>
                    <p>
                        <Link href="/ratgeber/ki-tool-eintragen-anleitung">Eintrags-Ratgeber →</Link> · <Link href="/launch-kit">Launch-Kit →</Link>
                    </p>
                </Band>
            )}

            {d.dealCode && (
                <section aria-labelledby="rabatt" className="deal-box">
                    <h2 id="rabatt">Rabattcode für {d.name} 🤑</h2>
                    <p>
                        Code <code>{d.dealCode}</code> <CopyButton value={d.dealCode} label="Code kopieren" /> beim Checkout eingeben: {dealLabel(d.dealText)}. Ob der Code noch gilt,
                        entscheidet der Anbieter. Wir haften nicht für gebrochene Sparherzen.
                    </p>
                </section>
            )}

            <section aria-labelledby="alternativen">
                <h2 id="alternativen">Alternativen zu {d.name} (falls ihr nicht zusammenfindet) 💔</h2>
                <p>
                    {d.pricing === 'Free' ? 'Ebenfalls kostenlos' : d.pricing === 'Paid' ? 'Ebenfalls kostenpflichtig' : 'Ähnlich eingestuft'} und
                    mit ähnlichem Domain Rating wie {d.name}.
                </p>
                <DirectoryTable directories={tabellenZeilen(alternatives)} interactive={false} caption={`Alternativen zu ${d.name}`} />
            </section>

            <section aria-labelledby="faq">
                <h2 id="faq">Fragen zu {d.name} 🙋</h2>
                <Faq items={faq} />
            </section>

            <p>
                <Link href="/#alle">← Zurück zu allen {total} KI-Verzeichnissen, das Karussell wartet</Link>
            </p>
        </article>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <DirectoryPage params={params} />
            <Vernetzt pfad={seitenPfad('/verzeichnis/[slug]', params)} />
        </>
    )
}
