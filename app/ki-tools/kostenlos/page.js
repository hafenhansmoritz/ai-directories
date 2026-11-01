import Link from 'next/link'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../components/Faq'
import Toc from '../../components/Toc'
import ToolCards from '../../components/ToolCards'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import { Band } from '../../components/Deko'
import { SITE_NAME } from '../../../lib/site'
import { getKbTools, KB_RUBRIKEN, KB_STAND } from '../../../lib/kb'
import { getTools, toolHref, toolRel, TOOLS_STAND } from '../../../lib/tools'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import PartnerHinweis, { hatPartnerlink } from '../../components/PartnerHinweis'
import { datumDe } from '../../../lib/text'

const FAQ = [
    {
        q: 'Gibt es wirklich kostenlose KI-Tools?',
        a: 'Ja, auf zwei Arten: Viele kommerzielle Tools haben einen Gratis-Tarif mit Limits, und es gibt Open-Source-Tools, die du kostenlos nutzen und oft sogar auf dem eigenen Rechner betreiben kannst.',
    },
    {
        q: 'Was ist der Haken an Gratis-Tarifen?',
        a: 'Meist Nutzungsgrenzen, Wasserzeichen oder fehlende Profi-Funktionen. Prüfe außerdem, ob deine Eingaben zum Training verwendet werden, besonders bei Kundendaten.',
    },
    {
        q: 'Was bedeutet Open Source bei KI-Tools?',
        a: 'Der Quellcode ist öffentlich und darf meist frei genutzt werden. Du kannst das Tool selbst hosten; dafür brauchst du etwas Technik und manchmal eine starke Grafikkarte.',
    },
]

export const metadata = {
    title: 'KI-Tools kostenlos: Gratis-Tarife & Open Source 2026',
    description: 'KI-Tools kostenlos nutzen: Tools mit Gratis-Tarif laut Anbieter und Open-Source-Tools nach Aufgabe, von Chatbots über Bildgeneratoren bis Spracherkennung. Mit Grenzen der Gratis-Versionen.',
    alternates: { canonical: '/ki-tools/kostenlos' },
}

function KostenlosPage() {
    const gratisTarif = getTools().filter((t) => t.free_plan === true)
    const os = getKbTools().filter((t) => t.open_source)
    const rubriken = Object.entries(KB_RUBRIKEN)
        .map(([key, r]) => ({ key, ...r, tools: os.filter((t) => t.rubrik === key).sort((a, b) => b.konsens - a.konsens).slice(0, 6) }))
        .filter((r) => r.tools.length)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'KI-Tools', path: '/ki-tools' },
        { name: 'Kostenlos', path: '/ki-tools/kostenlos' },
    ]
    return (
        <>
            <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(FAQ)]} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Gratis · {gratisTarif.length + os.length} Tools</p>
                <h1>Kostenlose KI-Tools: {gratisTarif.length} Gratis-Tarife und {os.length} Open-Source-Tools</h1>
                <p className="lead">Zwei Wege zu KI ohne Rechnung: Gratis-Tarife bekannter Anbieter (Angaben laut Anbieter) und Open-Source-Tools, die du frei nutzen oder selbst betreiben kannst.</p>
            </section>
            <Toc items={[['gratis-tarif', 'Mit Gratis-Tarif'], ...rubriken.map((r) => [`os-${r.key}`, r.name.replace(/^KI[- ](für |fürs )?/, '')]), ['faq', 'FAQ']]} />
            <Band farbe="mint" id="gratis-tarif" titel={`🎁 ${gratisTarif.length} Tools mit Gratis-Tarif`}>
                <ul className="link-cards">
                    {gratisTarif.map((t) => (
                        <li key={t.slug}>
                            <Link href={`/tools/${t.slug}`}>
                                <strong>{t.name}</strong>
                            </Link>
                            <span>{t.summary_de}</span>
                            <span>
                                {t.category} · bezahlt ab {t.price_from || 'keine Angabe'} ·{' '}
                                <a href={toolHref(t)} target="_blank" rel={toolRel(t)}>
                                    ansehen ↗{t.affiliate && <sup>*</sup>}
                                </a>
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="source">Laut Anbieter, Stand {TOOLS_STAND}.</p>
                <PartnerHinweis zeigen={hatPartnerlink(gratisTarif)} />
            </Band>
            <h2>🔓 Open-Source-KI-Tools nach Aufgabe</h2>
            {rubriken.map((r) => (
                <section key={r.key} aria-labelledby={`os-${r.key}`}>
                    <h3 id={`os-${r.key}`}>{r.name}</h3>
                    <ToolCards tools={r.tools} />
                </section>
            ))}
            <LeadMagnetBox id="prompt-paket" />
            <Band farbe="pink" id="faq" titel="Fragen zu kostenlosen KI-Tools 🙋">
                <Faq items={FAQ} />
            </Band>
            <p className="source">
                Open-Source-Einträge aus der <Link href="/ki-tools">KI-Tool-Datenbank</Link>, Stand {datumDe(KB_STAND)}.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <KostenlosPage />
            <Vernetzt pfad={seitenPfad('/ki-tools/kostenlos')} />
        </>
    )
}
