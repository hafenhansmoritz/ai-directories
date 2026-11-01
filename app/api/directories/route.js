import fs from 'node:fs'
import path from 'node:path'

export const dynamic = 'force-static'

// Alte Adresse aus dem Upstream-Projekt, bleibt für bestehende Links. Der statische Export schreibt sie ohne Endung,
// deshalb liefert GitHub Pages sie nicht als JSON aus. Neue Links bitte auf /api/directories.json setzen.
export function GET() {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'db', 'directories.json'), 'utf8'))
    return Response.json({ data })
}
