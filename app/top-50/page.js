import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import Jean from '../components/Jean'
import LeadBox from '../components/LeadBox'
import { SITE_NAME, absoluteUrl, withBase } from '../../lib/site'
import { getTop50 } from '../../lib/top50'
import { formatRating, formatVisits, pricingLabel, dealLabel } from '../../utils/i18n-de'
import { submitRel } from '../../lib/monetization'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { dateiStand } from '../../lib/stand'
import '../styles/c-start.css'

export const metadata = {
    title: 'Top 50 KI-Verzeichnisse 2026: die besten AI Directories',
    description:
        'Die 50 besten KI-Verzeichnisse nach Jean-Score, ohne gesperrte Einreichungen und ohne aufgeblasenes Domain Rating. Mit Freischaltdauer und Link-Typ, als CSV zum Abarbeiten.',
    alternates: { canonical: '/top-50' },
}

function Top50Page() {
    const top = getTop50()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Top 50', path: '/top-50' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Top 50 KI-Verzeichnisse',
            numberOfItems: top.length,
            itemListElement: top.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.name, url: absoluteUrl(`/verzeichnis/${d.slug}`) })),
        },
    ]
    const withCheck = top.filter((d) => d.check?.approval).length
    const stand = dateiStand('db/directories.json', 'db/checks.json', 'db/fresh-semrush.json')
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Die Abkürzung für deinen Launch 🏁</p>
                <h1>Top 50 KI-Verzeichnisse</h1>
                <p className="lead">
                    Die 50 Verzeichnisse mit dem höchsten Jean-Score. Rausgeflogen ist, wer gerade keine Einreichungen annimmt
                    oder ein Domain Rating hat, das frisch gemessen nicht stimmen kann. Bei {withCheck} von 50 steht dazu, wie
                    lange die Freischaltung laut Verzeichnis dauert.
                </p>
                <p className="c-stand">
                    Daten zuletzt aktualisiert:{' '}
                    <time dateTime={stand.toISOString().slice(0, 10)}>
                        {new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(stand)}
                    </time>
                    . <Link href="/so-pruefen-wir">So prüfen wir →</Link>
                </p>
                <p className="cta-row">
                    <a className="button" href={withBase('/top-50.csv')} download>
                        Als CSV für Excel/Sheets ⬇️
                    </a>
                </p>
                <Jean>Mit diesen 50 bist du in einem Wochenende durch. Mit den anderen 200 in einem Jahr. Deine Wahl.</Jean>
            </section>

            <ol className="top50">
                {top.map((d, i) => (
                    <li key={d.slug} className={i < 10 ? 'top50-big' : undefined}>
                        <span className="top50-rank">{i + 1}</span>
                        <div>
                            <p className="top50-head">
                                <Link href={`/verzeichnis/${d.slug}`}>
                                    <strong>{d.name}</strong>
                                </Link>{' '}
                                <span className="score-pill" style={{ '--score': d.score }}>
                                    {d.score}
                                </span>
                            </p>
                            <p className="widget-note">
                                DR {formatRating(d.domain_rating)} · {formatVisits(d.monthly_visits)} Besuche/Monat · {pricingLabel(d.pricing)}
                                {d.dealCode ? ` · ${dealLabel(d.dealText)} mit Code ${d.dealCode}` : ''}
                            </p>
                            {i < 10 && d.check?.approval && <p className="widget-note">Freischaltung laut Verzeichnis: {d.check.approval}</p>}
                        </div>
                        <a className="submit-link" href={d.submission_link} target="_blank" rel={submitRel(d)}>
                            Eintragen ↗{d.affiliate && <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup>}
                            <span className="sr-only"> bei {d.name} (öffnet in neuem Tab)</span>
                        </a>
                    </li>
                ))}
            </ol>
            <LeadBox title="Neue Top-Verzeichnisse zuerst ☢️" text="Wenn ein Verzeichnis in die Top 50 aufsteigt oder rausfliegt, erfährst du es zuerst." />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <Top50Page />
            <Vernetzt pfad={seitenPfad('/top-50')} />
        </>
    )
}
