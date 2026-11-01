import Link from 'next/link'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JeanIcon from '../components/JeanIcon'
import KbExplorer from '../components/KbExplorer'
import LeadMagnetBox from '../components/LeadMagnetBox'
import { SITE_NAME } from '../../lib/site'
import { getKbTools, getKbRubriken, kbStats, kbForClient, kbSortKonsens, KB_SOURCES, KB_STAND } from '../../lib/kb'
import { KB_DATEN } from '../../lib/kb-client'
import { datumDe } from '../../lib/text'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'

const stats = kbStats()

export const metadata = {
    title: { absolute: `KI-Tools 2026: ${stats.gesamt} Tools im Überblick | AIGeddon` },
    description: `${stats.gesamt} KI-Tools aus den drei größten offenen KI-Tool-Listen auf GitHub, durchsuchbar nach Rubrik, Open Source und Gratis. ${stats.konsens} Tools stehen in mindestens zwei Listen.`,
    alternates: { canonical: '/ki-tools' },
}

function KiToolsPage() {
    const rubriken = getKbRubriken()
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tool-Datenbank', path: '/ki-tools' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'AIGeddon KI-Tool-Datenbank',
            description: `${stats.gesamt} KI-Tools mit Rubrik, Link und Konsens-Signal aus drei offenen GitHub-Listen.`,
            dateModified: KB_STAND,
            isBasedOn: KB_SOURCES.map((s) => s.url),
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">KI-Tool-Datenbank</p>
                <h1>KI-Tools: {stats.gesamt} Tools, gefiltert nach dem, was die Community wirklich empfiehlt</h1>
                <p className="lead">
                    Zusammengeführt aus den drei größten offenen KI-Tool-Listen auf GitHub ({KB_SOURCES.reduce((s, x) => s + x.stars, 0).toLocaleString('de-DE')} Sterne zusammen). Steht ein Tool in mehreren Listen, ist das ein starkes Signal: <strong>🏆 Konsens</strong>.
                </p>
                <ul className="quick-links">
                    <li>
                        <Link href="/tool-finder">Tool-Finder: 3 Fragen, 6 Treffer →</Link>
                    </li>
                    <li>
                        <Link href="/beste-ki-tools">Die besten KI-Tools nach Aufgabe →</Link>
                    </li>
                    <li>
                        <Link href="/ki-tools/kostenlos">Kostenlose KI-Tools →</Link>
                    </li>
                    <li>
                        <Link href="/ki-tools/chatgpt-alternativen">ChatGPT-Alternativen →</Link>
                    </li>
                    <li>
                        <Link href="/ki-tools/alternativen">Alternativen zu Midjourney, Perplexity & Co. →</Link>
                    </li>
                    <li>
                        <Link href="/ki-tools/fuer">KI-Tools für Lehrer, Schüler, Shops, Creator, HR & Co. →</Link>
                    </li>
                    <li>
                        <Link href="/ki-test">KI-Test: selbst vergleichen →</Link>
                    </li>
                </ul>
            </section>
            <dl className="facts">
                <div>
                    <dt>Tools gesamt</dt>
                    <dd data-count={stats.gesamt}>{stats.gesamt}</dd>
                </div>
                <div>
                    <dt>🏆 in 2+ Listen</dt>
                    <dd data-count={stats.konsens}>{stats.konsens}</dd>
                </div>
                <div>
                    <dt>🔓 Open Source</dt>
                    <dd data-count={stats.openSource}>{stats.openSource}</dd>
                </div>
                <div>
                    <dt>🧔 mit Steckbrief</dt>
                    <dd>
                        {stats.profile}
                        <small>
                            <Link href="/tools">Tool-Steckbriefe mit Preisen</Link>
                        </small>
                    </dd>
                </div>
            </dl>
            <ul className="rubrik-tiles">
                {rubriken.map((r, n) => (
                    <li key={r.key} style={{ '--tilt': `${n % 3 === 0 ? -1.2 : n % 3 === 1 ? 0.8 : -0.4}deg` }}>
                        <Link href={`/ki-tools/${r.key}`}>
                            <JeanIcon badge={r.icon} size={46} />
                            <strong>{r.name}</strong>
                            <span>{r.tools.length} Tools</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Erste 48 Einträge im HTML, die volle Liste lädt KbExplorer erst beim Suchen, Filtern oder Weiterblättern. */}
            <KbExplorer
                tools={kbForClient(getKbTools()).sort(kbSortKonsens).slice(0, 48)}
                quelle={KB_DATEN}
                gesamt={stats.gesamt}
                rubriken={rubriken.map((r) => ({ key: r.key, name: r.name, count: r.tools.length }))}
            />
            <LeadMagnetBox id="prompt-spickzettel" />
            <p className="source">
                Quellen: {KB_SOURCES.map((s, i) => (
                    <span key={s.id}>
                        {i > 0 && ' · '}
                        <a href={s.url} rel="noopener">{s.repo}</a> ({s.license})
                    </span>
                ))}{' '}
                · Stand {datumDe(KB_STAND)} · <Link href="/ki-tools/quellen">Lizenzen und Methode</Link>. Beschreibungen in Englisch aus der jeweiligen Liste; Konsens und Rubriken von AIGeddon.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <KiToolsPage />
            <Vernetzt pfad={seitenPfad('/ki-tools')} />
        </>
    )
}
