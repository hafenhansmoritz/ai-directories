// Skills für alle LLMs: liest skills/*/SKILL.md, prüft das Frontmatter nach der Agent-Skills-Spezifikation,
// schreibt db/skills.json für die Seiten und public/skills-dl/<name>.zip (Ordner als oberste Ebene, wie Claude,
// ChatGPT und Gemini es beim Hochladen erwarten) plus public/skills-dl/<name>/SKILL.md als Rohdatei.
// Aufruf: npm run skills
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const QUELLE = 'skills'
const ZIEL_DB = 'db/skills.json'
const ZIEL_DL = 'public/skills-dl'

// CRC32 für das ZIP-Format.
const CRC = Array.from({ length: 256 }, (_, n) => {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    return c >>> 0
})
const crc32 = (buf) => {
    let c = 0xffffffff
    for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8)
    return (c ^ 0xffffffff) >>> 0
}

// Minimaler ZIP-Schreiber (Deflate), feste Zeitstempel, damit gleiche Inhalte gleiche Dateien ergeben.
const zip = (dateien) => {
    const teile = []
    const verzeichnis = []
    let offset = 0
    const DOS_ZEIT = 0
    const DOS_DATUM = ((2026 - 1980) << 9) | (1 << 5) | 1
    for (const { name, data } of dateien) {
        const n = Buffer.from(name, 'utf8')
        const komprimiert = zlib.deflateRawSync(data, { level: 9 })
        const crc = crc32(data)
        const kopf = Buffer.alloc(30)
        kopf.writeUInt32LE(0x04034b50, 0)
        kopf.writeUInt16LE(20, 4)
        kopf.writeUInt16LE(0x0800, 6)
        kopf.writeUInt16LE(8, 8)
        kopf.writeUInt16LE(DOS_ZEIT, 10)
        kopf.writeUInt16LE(DOS_DATUM, 12)
        kopf.writeUInt32LE(crc, 14)
        kopf.writeUInt32LE(komprimiert.length, 18)
        kopf.writeUInt32LE(data.length, 22)
        kopf.writeUInt16LE(n.length, 26)
        kopf.writeUInt16LE(0, 28)
        teile.push(kopf, n, komprimiert)
        const z = Buffer.alloc(46)
        z.writeUInt32LE(0x02014b50, 0)
        z.writeUInt16LE(20, 4)
        z.writeUInt16LE(20, 6)
        z.writeUInt16LE(0x0800, 8)
        z.writeUInt16LE(8, 10)
        z.writeUInt16LE(DOS_ZEIT, 12)
        z.writeUInt16LE(DOS_DATUM, 14)
        z.writeUInt32LE(crc, 16)
        z.writeUInt32LE(komprimiert.length, 20)
        z.writeUInt32LE(data.length, 24)
        z.writeUInt16LE(n.length, 28)
        z.writeUInt32LE(0, 30)
        z.writeUInt32LE(0, 34)
        z.writeUInt32LE(0, 38)
        z.writeUInt32LE(offset, 42)
        verzeichnis.push(z, n)
        offset += kopf.length + n.length + komprimiert.length
    }
    const vz = Buffer.concat(verzeichnis)
    const ende = Buffer.alloc(22)
    ende.writeUInt32LE(0x06054b50, 0)
    ende.writeUInt16LE(dateien.length, 8)
    ende.writeUInt16LE(dateien.length, 10)
    ende.writeUInt32LE(vz.length, 12)
    ende.writeUInt32LE(offset, 16)
    return Buffer.concat([...teile, vz, ende])
}

// Einfaches Frontmatter: name, description, license und ein Block metadata mit Zeichenketten.
const frontmatter = (text, datei) => {
    const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
    if (!m) throw new Error(`${datei}: Frontmatter fehlt`)
    const meta = { metadata: {} }
    let inMeta = false
    for (const zeile of m[1].split('\n')) {
        if (!zeile.trim()) continue
        const sub = zeile.match(/^\s+([\w-]+):\s*(.*)$/)
        if (inMeta && sub) {
            meta.metadata[sub[1]] = sub[2].replace(/^"(.*)"$/, '$1')
            continue
        }
        const kv = zeile.match(/^([\w-]+):\s*(.*)$/)
        if (!kv) throw new Error(`${datei}: Zeile im Frontmatter nicht lesbar: ${zeile}`)
        inMeta = kv[1] === 'metadata' && !kv[2]
        if (!inMeta) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1')
    }
    return { meta, body: m[2].trim() }
}

const ordner = fs
    .readdirSync(QUELLE, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()

const fehler = []
const skills = []
fs.rmSync(ZIEL_DL, { recursive: true, force: true })
fs.mkdirSync(ZIEL_DL, { recursive: true })
for (const name of ordner) {
    const datei = path.join(QUELLE, name, 'SKILL.md')
    if (!fs.existsSync(datei)) continue
    const text = fs.readFileSync(datei, 'utf8').replace(/\r\n/g, '\n')
    const { meta, body } = frontmatter(text, datei)
    if (meta.name !== name) fehler.push(`${datei}: name „${meta.name}“ passt nicht zum Ordner`)
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.name || '') || meta.name.length > 64) fehler.push(`${datei}: ungültiger name`)
    if (!meta.description || meta.description.length > 1024) fehler.push(`${datei}: description fehlt oder ist länger als 1024 Zeichen`)
    if (/[\u2013\u2014\u200b-\u200f\u2060-\u2064\ufeff\u00ad\u202a-\u202e]/.test(text)) fehler.push(`${datei}: Gedankenstrich oder unsichtbares Zeichen`)
    // Alle Dateien des Skill-Ordners kommen ins ZIP, unter dem Ordnernamen als oberster Ebene.
    const dateien = []
    const lauf = (dir) => {
        for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
            if (e.name.startsWith('.')) continue
            const p = path.join(dir, e.name)
            if (e.isDirectory()) lauf(p)
            else dateien.push({ name: path.relative(QUELLE, p).split(path.sep).join('/'), data: Buffer.from(fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n')) })
        }
    }
    lauf(path.join(QUELLE, name))
    fs.writeFileSync(path.join(ZIEL_DL, `${name}.zip`), zip(dateien))
    fs.mkdirSync(path.join(ZIEL_DL, name), { recursive: true })
    fs.writeFileSync(path.join(ZIEL_DL, name, 'SKILL.md'), text)
    const woerter = body.replace(/[#*_`>|-]/g, ' ').split(/\s+/).filter(Boolean).length
    const titel = (body.match(/^#\s+(.+)$/m) || [])[1] || name
    skills.push({ name, titel, description: meta.description, license: meta.license || '', metadata: meta.metadata, woerter, dateien: dateien.map((d) => d.name), markdown: text })
}
if (fehler.length) {
    console.error(fehler.join('\n'))
    process.exit(1)
}
fs.writeFileSync(ZIEL_DB, JSON.stringify({ skills }, null, 1) + '\n')
console.log(`${skills.length} Skills, ZIPs in ${ZIEL_DL}, Index in ${ZIEL_DB}`)
