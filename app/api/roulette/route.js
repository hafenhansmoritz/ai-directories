import { getKbTools } from '../../../lib/kb'

export const dynamic = 'force-static'

// Konsens-Tools für das KI-Tool-Roulette. Wird erst beim ersten Drehen geladen, damit nicht jede Seite die Liste mitschleppt.
export function GET() {
    const tools = getKbTools()
        .filter((t) => t.konsens > 1)
        // a: Partnerlink aus db/affiliate-links.json, falls aktiv (wie in der Datenbank-Suche).
        .map((t) => ({ n: t.name, u: t.affiliate || t.url, a: t.affiliate ? 1 : 0, p: t.profil?.slug || '' }))
    return Response.json(tools)
}
