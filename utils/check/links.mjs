// Linkcheck über den statischen Export: jedes interne href/src muss auf eine Datei zeigen, den basePath tragen
// und Anker müssen als id im Ziel stehen. Bricht mit Code 1 ab, wenn etwas fehlt.
// Aufruf nach dem Build: node utils/check/links.mjs [out] (basePath aus BASE_PATH, Standard leer)
import fs from 'node:fs'
import path from 'node:path'

const OUT = process.argv[2] || 'out'
const BASE = process.env.BASE_PATH ?? ''
const ZEIGEN = 30

if (!fs.existsSync(OUT)) {
    console.error(`links: ${OUT}/ fehlt, erst bauen (npm run build:pages).`)
    process.exit(1)
}

const dateien = []
const lauf = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name)
        if (e.isDirectory()) {
            if (e.name !== '_next') lauf(p)
        } else if (e.name.endsWith('.html')) dateien.push(p)
    }
}
lauf(OUT)

const idCache = new Map()
const ids = (f) => {
    if (!idCache.has(f)) {
        const s = new Set()
        try {
            for (const m of fs.readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)) s.add(m[1])
        } catch {}
        idCache.set(f, s)
    }
    return idCache.get(f)
}
const ziel = (u) => {
    let p = u.slice(BASE.length) || '/'
    try {
        p = decodeURIComponent(p)
    } catch {}
    for (const x of [path.join(OUT, p), path.join(OUT, p, 'index.html'), path.join(OUT, `${p}.html`)]) {
        try { const st = fs.statSync(x, { throwIfNoEntry: false }); if (st && st.isFile()) return x; } catch {}
    }
    return null
}
const merke = (map, k, v) => map.set(k, [...(map.get(k) || []), v])
const anker = (h) => {
    try {
        return decodeURIComponent(h)
    } catch {
        return h
    }
}

const fehlend = new Map()
const ankerFehlt = new Map()
const ohneBasis = new Map()
let ohneBild = 0
let anzahl = 0
for (const f of dateien) {
    let html;
    try { html = fs.readFileSync(f, 'utf8'); } catch (e) { if (e.code === 'ENOENT') continue; throw e; }
    const von = path.relative(OUT, f)
    if (!html.includes('noindex') && !/property="og:image"/.test(html)) ohneBild++
    // Nur echte Attribute, die RSC-Daten in <script> zählen nicht.
    const body = html.replace(/<script[\s\S]*?<\/script>/g, '')
    for (const m of body.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
        const u = m[1].replace(/&amp;/g, '&')
        if (/^(https?:|mailto:|tel:|data:|javascript:|blob:|\/\/)/.test(u)) continue
        if (u.startsWith('#')) {
            const id = anker(u.slice(1))
            if (id && !ids(f).has(id)) merke(ankerFehlt, `${von} ${u}`, von)
            continue
        }
        if (!u.startsWith('/')) continue
        if (BASE && !u.startsWith(`${BASE}/`) && u !== BASE) {
            merke(ohneBasis, u, von)
            continue
        }
        anzahl++
        const [pfad, hash] = u.split('#')
        const t = ziel(pfad.split('?')[0])
        if (!t) {
            merke(fehlend, pfad, von)
            continue
        }
        if (hash && t.endsWith('.html') && !ids(t).has(anker(hash))) merke(ankerFehlt, `${pfad}#${hash}`, von)
    }
}

const zeige = (titel, map) => {
    console.log(`${titel}: ${map.size}`)
    for (const [k, v] of [...map].sort((a, b) => b[1].length - a[1].length).slice(0, ZEIGEN)) console.log(`  ${v.length}x ${k}  <- ${[...new Set(v)].slice(0, 3).join(', ')}`)
}
console.log(`links: ${dateien.length} HTML-Dateien, ${anzahl} interne Links`)
zeige('Fehlende Ziele', fehlend)
zeige('Fehlende Anker', ankerFehlt)
zeige('Ohne basePath', ohneBasis)
// Nur zur Info, bis alle Seiten ein Vorschaubild haben (TECH-01).
console.log(`Info: ${ohneBild} indexierbare Seiten ohne og:image`)
if (fehlend.size || ankerFehlt.size || ohneBasis.size) {
    console.error('links: Fehler gefunden.')
    process.exit(1)
}
console.log('links: alles in Ordnung.')
