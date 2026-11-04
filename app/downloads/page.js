import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import LeadMagnetBox from '../components/LeadMagnetBox'
import { SITE_NAME } from '../../lib/site'
import { LEADMAGNETS } from '../../lib/leadmagnets'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import Link from 'next/link'
import { getGuides } from '../../lib/guides'

export const metadata = {
    title: 'Gratis-Downloads: Prompt-Spickzettel & Prompt-Paket',
    description: 'Gratis-Downloads von mentat.codes: Prompt-Spickzettel zum Ausdrucken, alle Prompt-Vorlagen als Datei und die Top 50 KI-Verzeichnisse als Tabelle.',
    alternates: { canonical: '/downloads' },
}

function DownloadsPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Downloads', path: '/downloads' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Downloads</p>
                <h1>Gratis zum Mitnehmen</h1>
                <p className="lead">Spickzettel, Prompt-Paket und Tabellen. Einmal holen, immer griffbereit.</p>
            </section>
            {getGuides().length > 0 && (
            <section aria-labelledby="guides">
                <h2 id="guides">Neu: Gratis-Guides als PDF 📥</h2>
                <ul className="link-cards">
                    {getGuides().map((g) => (
                        <li key={g.id}>
                            <Link href={`/guides#${g.id}`}>
                                <strong>
                                    {g.emoji} {g.titel}
                                </strong>
                            </Link>
                            <span>{g.teaser}</span>
                        </li>
                    ))}
                </ul>
            </section>
            )}
            {LEADMAGNETS.map((m) => (
                <LeadMagnetBox key={m.id} id={m.id} frei />
            ))}
        </>
    )
}

export default function Seite() {
    return (
        <>
            <DownloadsPage />
            <Vernetzt pfad={seitenPfad('/downloads')} />
        </>
    )
}
