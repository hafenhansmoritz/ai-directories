import { getTools, toolHref } from '../../../lib/tools'
import { SITE_URL, absoluteUrl } from '../../../lib/site'

export const dynamic = 'force-static'

// Tool-Steckbriefe als JSON, z. B. für die GitBook-Integration „KI-Tool-Karte“ (integrations/gitbook-ki-tool-karte).
// href ist der Anbieter-Link über toolHref: Partnerlink aus db/affiliate-links.json, sonst die Website. partner kennzeichnet ihn.
export function GET() {
    const data = getTools().map((t) => ({
        slug: t.slug,
        name: t.name,
        kategorie: t.category,
        kurz: t.summary_de,
        fuer: t.best_for_de,
        preis_ab: t.price_from,
        gratis: t.free_plan === true,
        deutsch: t.german_ui === true,
        href: toolHref(t),
        partner: Boolean(t.affiliate),
        steckbrief: absoluteUrl(`/tools/${t.slug}`),
    }))
    return Response.json({ quelle: SITE_URL, stand: new Date().toISOString().slice(0, 10), count: data.length, data })
}
