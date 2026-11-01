// Layer-A-Prüfung: keine Gedankenstriche (U+2013, U+2014) und keine unsichtbaren Unicode-Zeichen.
// Drei Arten:
//   node utils/check/layer-a.mjs --diff <git-ref>  nur Zeilen, die seit <git-ref> neu sind (für Pull Requests und Pushes);
//                                                  bricht bei jedem Treffer ab, Altlasten stören so nicht
//   node utils/check/layer-a.mjs --out [out]       gebaute HTML-Seiten: unsichtbare Zeichen brechen ab, Gedankenstriche nur gezählt
//   node utils/check/layer-a.mjs                   ganze Quellordner: unsichtbare Zeichen brechen ab, Gedankenstriche nur gezählt
// Die Zeichen stehen hier bewusst als Escape, damit die Datei selbst sauber bleibt.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const ORDNER = ['app', 'lib', 'db', 'skills', 'supabase', 'utils']
const ENDUNGEN = /\.(js|mjs|cjs|json|md|sql|txt|xml|html|css|py|sh|yml)$/
const UNSICHTBAR = /[\u200B-\u200F\u2060-\u2064\uFEFF\u00AD\u202A-\u202E]/g
const STRICH = /[\u2013\u2014]/g
const name = (c) => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`

const [art, wert] = process.argv.slice(2)

if (art === '--diff') {
    if (!wert || /^0+$/.test(wert)) {
        console.log('layer-a: kein Vergleichsstand, nichts zu prüfen.')
        process.exit(0)
    }
    try {
        execFileSync('git', ['cat-file', '-e', `${wert}^{commit}`], { stdio: 'ignore' })
    } catch {
        console.log(`layer-a: Vergleichsstand ${wert.slice(0, 12)} ist nicht im Checkout (etwa nach einem Force-Push), nichts zu prüfen.`)
        process.exit(0)
    }
    const diff = execFileSync('git', ['diff', '-U0', '--no-color', '--no-ext-diff', `${wert}...HEAD`, '--', ...ORDNER], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
    const funde = []
    let datei = null
    let zeile = 0
    for (const z of diff.split('\n')) {
        if (z.startsWith('+++ ')) {
            datei = z.startsWith('+++ b/') ? z.slice(6) : null
            continue
        }
        const kopf = z.match(/^@@ -\d+(?:,\d+)? \+(\d+)/)
        if (kopf) {
            zeile = Number(kopf[1])
            continue
        }
        if (!datei || !ENDUNGEN.test(datei)) continue
        if (z.startsWith('+')) {
            const text = z.slice(1)
            const treffer = [...(text.match(UNSICHTBAR) || []), ...(text.match(STRICH) || [])]
            if (treffer.length) funde.push(`${datei}:${zeile}: ${[...new Set(treffer.map(name))].join(', ')}: ${text.trim().slice(0, 120)}`)
            zeile++
        }
    }
    if (funde.length) {
        console.error(`layer-a: ${funde.length} neue Zeilen mit Gedankenstrich oder unsichtbarem Zeichen:`)
        funde.slice(0, 100).forEach((f) => console.error(`  ${f}`))
        console.error('Statt Gedankenstrich: Komma, Doppelpunkt, Punkt oder „bis“. Im Code als Escape schreiben (\\u2013).')
        process.exit(1)
    }
    console.log(`layer-a: neue Zeilen seit ${wert.slice(0, 12)} sind sauber.`)
    process.exit(0)
}

const dateien = []
const lauf = (dir, nur) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name)
        if (e.isDirectory()) {
            if (!['node_modules', '.next', '.git', '_next', 'skills-dl'].includes(e.name)) lauf(p, nur)
        } else if (nur.test(e.name)) dateien.push(p)
    }
}
if (art === '--out') lauf(wert || 'out', /\.html$/)
else ORDNER.forEach((o) => lauf(o, ENDUNGEN))

let unsichtbar = 0
let striche = 0
const schlimm = []
const meiste = []
for (const f of dateien) {
    const s = fs.readFileSync(f, 'utf8')
    const u = s.match(UNSICHTBAR) || []
    const d = (s.match(STRICH) || []).length
    unsichtbar += u.length
    striche += d
    if (u.length) schlimm.push(`${f}: ${u.length}x ${[...new Set(u.map(name))].join(', ')}`)
    if (d) meiste.push([f, d])
}
console.log(`layer-a: ${dateien.length} Dateien, ${unsichtbar} unsichtbare Zeichen, ${striche} Gedankenstriche in ${meiste.length} Dateien (nur Info)`)
meiste
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([f, d]) => console.log(`  ${d}x ${f}`))
if (schlimm.length) {
    console.error('layer-a: unsichtbare Zeichen gefunden:')
    schlimm.slice(0, 50).forEach((f) => console.error(`  ${f}`))
    process.exit(1)
}
