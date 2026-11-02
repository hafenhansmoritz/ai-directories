// Interne Verlinkung berechnen: liest den statischen Export (out/), vergleicht die Inhalte aller Seiten
// und schreibt db/vernetzung.json. Daraus rendert <Vernetzt /> auf jeder Seite „Passt dazu“ (ausgehend),
// „Hier wird auf diese Seite verwiesen“ (eingehend) und „Begriffe kurz erklärt“.
// Aufruf nach einem Build: node utils/vernetzung/build.mjs [out-Verzeichnis]
import fs from 'node:fs'
import path from 'node:path'
import { KI_GLOSSAR, glossarSlug } from '../../lib/ki-glossar.js'

const OUT = process.argv[2] || 'out'
const BASE = process.env.BASE_PATH ?? ''
const ZIEL = 'db/vernetzung.json'
const AUSGEHEND = 6
const EINGEHEND = 6
const MIN_EINGEHEND = 3

const seiten = []
const lauf = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name)
        if (e.isDirectory()) {
            if (!['_next', 'api', '404', 'opengraph-image'].includes(e.name)) lauf(p)
        } else if (e.name === 'index.html') seiten.push(p)
    }
}
lauf(OUT)

const entities = (s) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
const pfadVon = (datei) => {
    const rel = path.relative(OUT, path.dirname(datei)).split(path.sep).join('/')
    return rel ? `/${rel}/` : '/'
}
const normHref = (h) => {
    if (h.startsWith('//') || (!h.startsWith(`${BASE}/`) && h !== BASE)) return null
    let p = h.slice(BASE.length).split('#')[0].split('?')[0] || '/'
    if (!p.endsWith('/')) p += '/'
    return p
}
// Typ einer Seite für die Mischung der Vorschläge: erste Pfadebene, bei Unterseiten mit Zusatz.
const typVon = (p) => {
    const t = p.split('/').filter(Boolean)
    if (!t.length) return 'start'
    if (t[0] === 'ki-tools' && t.length > 1 && ['tool', 'alternativen', 'fuer'].includes(t[1])) return `ki-tools/${t[1]}`
    if (t[0] === 'prompts' && t[1] === 'kategorie') return 'prompts/kategorie'
    return t[0]
}

const daten = []
for (const datei of seiten) {
    const html = fs.readFileSync(datei, 'utf8')
    if (/<meta name="robots" content="noindex/.test(html)) continue
    const p = pfadVon(datei)
    const titel = entities((html.match(/<title>(.*?)<\/title>/s) || [])[1] || p)
        .replace(/\s*\|\s*(?:mentat\.codes|AIGeddon)\s*$/i, '')
        .trim()
    const h1 = entities(((html.match(/<h1[^>]*>(.*?)<\/h1>/s) || [])[1] || '').replace(/<[^>]+>/g, '')).trim()
    let main = (html.match(/<main id="inhalt"[^>]*>(.*)<\/main>/s) || [])[1] || ''
    // Eigene Bausteine und seitenübergreifende Kästen nicht mitzählen, sonst schaukelt sich das Netz auf.
    main = main
        .replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<section class="vernetzt[\s\S]*?<\/section>/g, ' ')
        .replace(/<section class="jean-take jeans-senf[\s\S]*?<\/section>/g, ' ')
        .replace(/<section class="leadform[\s\S]*$/g, ' ')
    const links = new Set()
    for (const m of main.matchAll(/href="([^"]+)"/g)) {
        const z = normHref(entities(m[1]))
        if (z && z !== p) links.add(z)
    }
    const text = entities(main.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')
    daten.push({ p, titel, h1, typ: typVon(p), links, text })
}
const index = new Map(daten.map((d, i) => [d.p, i]))

// TF-IDF über Wörter ab 4 Buchstaben; Titelwörter zählen dreifach.
const woerter = (s) => (s.toLowerCase().match(/[a-zäöüß0-9][a-zäöüß0-9.+-]{2,}[a-zäöüß0-9]/g) || []).filter((w) => !/^\d+$/.test(w))
const df = new Map()
const tfs = daten.map((d) => {
    const tf = new Map()
    for (const w of woerter(`${d.titel} ${d.h1} `.repeat(3) + d.text)) tf.set(w, (tf.get(w) || 0) + 1)
    for (const w of tf.keys()) df.set(w, (df.get(w) || 0) + 1)
    return tf
})
const N = daten.length
const vektoren = tfs.map((tf) => {
    const v = new Map()
    let norm = 0
    for (const [w, n] of tf) {
        const d = df.get(w)
        if (d < 2 || d > N * 0.25) continue
        const x = (1 + Math.log(n)) * Math.log(N / d)
        v.set(w, x)
        norm += x * x
    }
    norm = Math.sqrt(norm) || 1
    for (const [w, x] of v) v.set(w, x / norm)
    return v
})
// Invertierter Index für schnelle Ähnlichkeiten.
const posting = new Map()
vektoren.forEach((v, i) => {
    for (const [w, x] of v) {
        if (!posting.has(w)) posting.set(w, [])
        posting.get(w).push([i, x])
    }
})
const aehnlich = vektoren.map((v, i) => {
    const s = new Map()
    for (const [w, x] of v) for (const [j, y] of posting.get(w)) if (j !== i) s.set(j, (s.get(j) || 0) + x * y)
    return [...s.entries()].sort((a, b) => b[1] - a[1]).slice(0, 60)
})
const sim = (i, j) => (aehnlich[i].find(([k]) => k === j) || [0, 0])[1]

// Ausgehend: ähnlichste Seiten, die noch nicht verlinkt sind, höchstens zwei pro Seitentyp.
const raus = daten.map((d, i) => {
    const pro = new Map()
    const wahl = []
    for (const [j] of aehnlich[i]) {
        const z = daten[j]
        if (d.links.has(z.p) || z.p === '/') continue
        if ((pro.get(z.typ) || 0) >= 2) continue
        pro.set(z.typ, (pro.get(z.typ) || 0) + 1)
        wahl.push(j)
        if (wahl.length === AUSGEHEND) break
    }
    return wahl
})

// Eingehend zählen (Inhaltslinks plus neue Vorschläge), schwach verlinkte Seiten nachziehen.
const rein = () => {
    const r = daten.map(() => new Set())
    daten.forEach((d, i) => {
        for (const z of d.links) if (index.has(z)) r[index.get(z)].add(i)
        for (const j of raus[i]) r[j].add(i)
    })
    return r
}
let eingehend = rein()
let nachgezogen = 0
daten.forEach((d, j) => {
    if (eingehend[j].size >= MIN_EINGEHEND) return
    for (const [i] of aehnlich[j]) {
        if (eingehend[j].size >= MIN_EINGEHEND) break
        if (eingehend[j].has(i) || daten[i].links.has(d.p) || raus[i].length >= AUSGEHEND + 2) continue
        raus[i].push(j)
        eingehend[j].add(i)
        nachgezogen++
    }
})
eingehend = rein()

// Glossarbegriffe im Text erkennen (Begriff oder Kürzel in Klammern, ganzes Wort).
const begriffe = KI_GLOSSAR.map(([term]) => {
    const kurz = (term.match(/\(([^)]+)\)/) || [])[1]
    const lang = term.replace(/\s*\(.*?\)/, '')
    const varianten = [lang, kurz].filter((x) => x && x.length > 2).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    return { slug: glossarSlug(term), re: new RegExp(`(?<![\\wäöüÄÖÜß-])(?:${varianten.join('|')})(?![\\wäöüÄÖÜß])`) }
})

// Seltene Begriffe zuerst: „Prompt“ steht fast überall, „Grounding“ erklärt mehr.
const treffer = daten.map((d) => (d.typ === 'glossar' ? [] : begriffe.filter((b) => b.re.test(d.text)).map((b) => b.slug)))
const haeufig = new Map()
for (const t of treffer) for (const g of t) haeufig.set(g, (haeufig.get(g) || 0) + 1)

const ergebnis = {}
let ohneEingang = 0
daten.forEach((d, i) => {
    const ein = [...eingehend[i]]
        .filter((j) => daten[j].p !== '/')
        .sort((a, b) => sim(i, b) - sim(i, a))
        .slice(0, EINGEHEND)
    if (!eingehend[i].size) ohneEingang++
    const glossar = (treffer[i] || []).sort((a, b) => haeufig.get(a) - haeufig.get(b)).slice(0, 4)
    ergebnis[d.p] = {
        raus: raus[i].map((j) => daten[j].p),
        rein: ein.map((j) => daten[j].p),
        reinGesamt: eingehend[i].size,
        ...(glossar.length ? { glossar } : {}),
    }
})
const titel = Object.fromEntries(daten.map((d) => [d.p, d.titel]))
fs.writeFileSync(ZIEL, JSON.stringify({ titel, seiten: ergebnis }))
console.log(`${N} Seiten, ${nachgezogen} Links nachgezogen, ${ohneEingang} ohne eingehende Links, ${(fs.statSync(ZIEL).size / 1024).toFixed(0)} KB`)
