import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import { ARTIKEL } from '../../lib/ratgeber'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'
import PromptGottFeed from '../components/PromptGottFeed'

export const metadata = {
    title: 'Ratgeber: KI-Tools richtig in Verzeichnisse eintragen',
    description: 'Anleitungen und ehrliche Einordnungen rund um KI-Verzeichnisse, Backlinks, SEO und Product-Hunt-Launches. Auf Deutsch, mit Humor.',
    alternates: { canonical: '/ratgeber' },
    openGraph: ogMeta({ url: '/ratgeber', bild: OG_BILDER.ratgeber, alt: 'Ratgeber auf mentat.codes' }),
}

function RatgeberIndex() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Ratgeber', path: '/ratgeber' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>Ratgeber: KI-Tools eintragen, ohne Zeit zu verbrennen</h1>
                <p className="lead">Was du vor, während und nach den Einträgen wissen solltest. Ehrlich, auf Deutsch und ohne Linkverkäufer-Märchen.</p>
                <Jean>Lesen spart Formulare. Formulare sparen Nerven. Nerven sparen Kaffee.</Jean>
            </section>
            <ul className="link-cards">
                {ARTIKEL.map((a) => (
                    <li key={a.slug}>
                        <Link href={`/ratgeber/${a.slug}`}>
                            <strong>{a.title}</strong>
                        </Link>
                        <span>{a.description}</span>
                        <span>{a.minutes} Minuten Lesezeit</span>
                    </li>
                ))}
                <li>
                    <Link href="/freischaltung">
                        <strong>Wie lange dauert die Freischaltung?</strong>
                    </Link>
                    <span>Freischaltdauer, Link-Typ und Status, belegt mit Zitaten der Verzeichnisse selbst.</span>
                </li>
                <li>
                    <Link href="/glossar">
                        <strong>Glossar: DR, nofollow, UTM und Co.</strong>
                    </Link>
                    <span>Alle Fachbegriffe rund um Verzeichnisse und SEO, kurz erklärt.</span>
                </li>
            </ul>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <RatgeberIndex />
            <PromptGottFeed />
            <Vernetzt pfad={seitenPfad('/ratgeber')} />
        </>
    )
}
