import fs from 'node:fs'
import path from 'node:path'

export const dynamic = 'force-static'

// JSON-API der Verzeichnisse als echte .json-Datei: GitHub Pages liefert sie mit application/json aus.
// Antwort flach als { count, data }. Die alte Adresse /api/directories bleibt für bestehende Links erhalten.
export function GET() {
    const { data } = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'db', 'directories.json'), 'utf8'))
    return Response.json({ count: data.length, data })
}
