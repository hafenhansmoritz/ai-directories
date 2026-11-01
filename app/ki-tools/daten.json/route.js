import { getKbTools, kbForClient } from '../../../lib/kb'

export const dynamic = 'force-static'

// Volle, schlanke Tool-Liste für KbExplorer (/ki-tools) und den Tool-Finder. Wird erst bei Bedarf geladen,
// damit nicht jede Seite rund 140 KB Daten im HTML mitschleppt. Partnerlinks stecken als Feld a drin (lib/kb.js).
export function GET() {
    return Response.json(kbForClient(getKbTools()))
}
