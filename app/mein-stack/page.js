import Link from 'next/link'
import Breadcrumbs from '../components/Breadcrumbs'
import MeinStack from './MeinStack'
import { getTools, toolHref, TOOLS_STAND } from '../../lib/tools'
import { getComparisons } from '../../lib/comparisons'
import { ABO_PREISE } from '../../lib/abo-preise'

export const metadata = {
    title: 'Mein KI-Stack: alle KI-Abos und ihre Kosten im Blick',
    description:
        'Trag deine KI-Tools mit Tarif und Preis ein und sieh, was dein Stack im Monat und im Jahr kostet. Mit Spar-Hinweisen aus offiziellen Preisangaben der Anbieter.',
    alternates: { canonical: '/mein-stack' },
}

export default function MeinStackPage() {
    const tools = getTools().map(({ slug, name, category, free_plan, price_from, pricing_url, source, affiliate, url }) => ({
        slug,
        // Anbieter-Link über den Helfer: Partnerlink aus db/partners.json, sonst die Website (partner steuert * und rel)
        href: toolHref({ affiliate, url }),
        partner: Boolean(affiliate),
        name,
        category,
        free_plan: free_plan === true,
        price_from: price_from || null,
        quelle: pricing_url || source || null,
    }))
    const vergleiche = getComparisons().map((c) => ({ slug: c.slug, title: c.title, tools: c.tools }))
    return (
        <>
            <Breadcrumbs items={[{ name: 'Startseite', path: '/' }, { name: 'Mein KI-Stack' }]} />
            <section className="hero">
                <h1>Mein KI-Stack 🧰</h1>
                <p className="lead">
                    Welche KI-Tools bezahlst du gerade, und was kostet das zusammen? Trag deine Abos ein, wir rechnen Monat und Jahr zusammen und zeigen dir, wo du laut den
                    Preisangaben der Anbieter sparen kannst.
                </p>
            </section>
            <MeinStack tools={tools} abo={ABO_PREISE} stand={TOOLS_STAND} vergleiche={vergleiche} />
            <p className="widget-note">
                Preisangaben aus unseren <Link href="/tools">Tool-Steckbriefen</Link> (laut Anbieter, Stand {TOOLS_STAND}). Wir rechnen nicht zwischen Euro und Dollar um. Ob sich
                ein Jahresabo lohnt, zeigt auch der Rechner <Link href="/rechner/abo-monatlich-oder-jaehrlich">Monatlich oder jährlich?</Link>
            </p>
        </>
    )
}
