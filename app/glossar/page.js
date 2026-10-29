import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import { GLOSSAR } from '../../lib/ratgeber'
import { KI_GLOSSAR, glossarSlug } from '../../lib/ki-glossar'
import Toc from '../components/Toc'
import { Band } from '../components/Deko'
import { absoluteUrl } from '../../lib/site'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { ogMeta, OG_BILDER } from '../../lib/og-meta'

export const metadata = {
    title: 'KI-Glossar: KI- und SEO-Begriffe einfach erklärt',
    description: `${KI_GLOSSAR.length + GLOSSAR.length} Begriffe kurz erklärt: Prompt, Token, Kontextfenster, Halluzination, RAG, KI-Agent, MCP und mehr, dazu SEO-Begriffe wie Domain Rating, nofollow und GEO.`,
    alternates: { canonical: '/glossar' },
    openGraph: ogMeta({ url: '/glossar', bild: OG_BILDER.glossar, alt: 'KI-Glossar auf AIGeddon' }),
}

function GlossarPage() {
    const crumbs = [
        { name: 'AIGeddon', path: '/' },
        { name: 'Glossar', path: '/glossar' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Glossar KI und Prompt Engineering',
            url: absoluteUrl('/glossar'),
            inLanguage: 'de-DE',
            hasDefinedTerm: KI_GLOSSAR.map(([name, description]) => ({ '@type': 'DefinedTerm', name, description, url: absoluteUrl(`/glossar/${glossarSlug(name)}`) })),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Glossar KI-Verzeichnisse und SEO',
            url: absoluteUrl('/glossar'),
            inLanguage: 'de-DE',
            hasDefinedTerm: GLOSSAR.map(([name, description]) => ({ '@type': 'DefinedTerm', name, description })),
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>KI-Glossar: {KI_GLOSSAR.length + GLOSSAR.length} Begriffe, kurz erklärt</h1>
                <p className="lead">Prompt Engineering, KI-Modelle und SEO ohne Fachchinesisch. Zum Nachschlagen, wenn ein Tutorial von „Few-Shot“ spricht oder ein Formular nach „rel=sponsored“ fragt.</p>
                <Jean>SEO-Sprech ist wie Simson-Schrauber-Sprech: klingt kompliziert, ist es aber selten.</Jean>
            </section>
            <Toc items={[['ki', 'KI & Prompt Engineering'], ['seo', 'KI-Verzeichnisse & SEO']]} />
            <Band farbe="lila" id="ki" titel={`🤖 KI & Prompt Engineering (${KI_GLOSSAR.length})`}>
                <dl className="legend glossar">
                    {KI_GLOSSAR.map(([term, text, href]) => (
                        <div key={term} id={glossarSlug(term)}>
                            <dt>
                                <Link href={`/glossar/${glossarSlug(term)}`}>{term}</Link>
                            </dt>
                            <dd>
                                {text}{' '}
                                <Link href={`/glossar/${glossarSlug(term)}`}>Beispiel und Praxis-Tipp →</Link>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Band>
            <h2 id="seo">🔗 KI-Verzeichnisse & SEO ({GLOSSAR.length})</h2>
            <dl className="legend glossar">
                {GLOSSAR.map(([term, text]) => (
                    <div key={term}>
                        <dt>{term}</dt>
                        <dd>{text}</dd>
                    </div>
                ))}
            </dl>
            <p>
                <Link href="/ratgeber">← Zu den Ratgebern</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <GlossarPage />
            <Vernetzt pfad={seitenPfad('/glossar')} />
        </>
    )
}
