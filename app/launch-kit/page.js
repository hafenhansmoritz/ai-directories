import LaunchKit from './LaunchKit'
import EintragsserviceWarteliste from '../components/EintragsserviceWarteliste'
import ToolPartners from '../components/ToolPartners'
import Jean from '../components/Jean'
import JsonLd from '../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import { getDirectories } from '../../lib/data'
import { absoluteUrl } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'
import LeadMagnetBox from '../components/LeadMagnetBox'

export const metadata = {
    title: 'Launch-Kit: Texte für KI-Verzeichnisse erstellen',
    description:
        'Kostenloses Launch-Kit: Einmal Name, Nutzen und Funktionen deines KI-Tools eingeben, dann Einzeiler, Kurz- und Langbeschreibung auf Deutsch und Englisch sowie UTM-Links für jedes Verzeichnis kopieren.',
    alternates: { canonical: '/launch-kit' },
    openGraph: ogMeta({ url: '/launch-kit', bild: OG_BILDER.launchKit, alt: 'Launch-Kit auf mentat.codes' }),
}

function LaunchKitPage() {
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Launch-Kit', path: '/launch-kit' },
    ]
    const directories = [...getDirectories()]
        .sort((a, b) => a.name.localeCompare(b.name, 'de'))
        .map(({ name, slug, submission_link }) => ({ name, slug, submission_link }))
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Launch-Kit für KI-Verzeichnisse',
            url: absoluteUrl('/launch-kit'),
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Browser',
            inLanguage: 'de-DE',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Werkzeug 🧰</p>
                <h1>Launch-Kit: alle Einreichungstexte in 2 Minuten</h1>
                <p className="lead">
                    Einmal ausfüllen, überall einfügen. Du bekommst Einzeiler, Kurz- und Langbeschreibung auf Deutsch und
                    Englisch mit Zeichenzählern sowie UTM-Links für jedes Verzeichnis. Alles bleibt in deinem Browser.
                </p>
                <Jean>
                    Ich habe 200 Formulare ausgefüllt, damit du es nur einmal tun musst. Den Rest erledigt die Zwischenablage.
                </Jean>
            </section>
            <LaunchKit directories={directories} />
            <EintragsserviceWarteliste />
            <LeadMagnetBox id="top-50" anlass="Texte fertig? Dann brauchst du noch die Liste, wo sie hinkommen." />
            <ToolPartners />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <LaunchKitPage />
            <Vernetzt pfad={seitenPfad('/launch-kit')} />
        </>
    )
}
