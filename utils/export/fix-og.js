// Nachbearbeitung des statischen Exports für Vorschaubilder.
// Next.js 14 setzt bei metadataBase mit Pfad den basePath doppelt in og:image/twitter:image,
// und GitHub Pages liefert Dateien ohne Endung nicht als image/png aus.
// Daher: jede opengraph-image-Datei als .png kopieren und die URLs in HTML und RSC-Daten korrigieren.
const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, '../../out')
const BASE = process.env.BASE_PATH || ''

const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name)
        return e.isDirectory() ? walk(p) : [p]
    })

const files = walk(OUT)
let bilder = 0
for (const f of files) {
    if (path.basename(f) === 'opengraph-image') {
        fs.copyFileSync(f, `${f}.png`)
        bilder++
    }
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const doppelt = BASE ? `(?:${esc(BASE)})?` : ''
const muster = new RegExp(`${doppelt}${esc(BASE)}/((?:[\\w-]+/)*)opengraph-image\\?[0-9a-f]+`, 'g')

// Ab Next.js 14.2.x setzt das icons-Feld der Metadaten (app/layout.js) den Pfad ohne basePath ein.
// Das Favicon liegt aber unter BASE, deshalb hier wie beim Vorschaubild nachziehen (HTML und RSC-Daten).
const favicon = (s) =>
    BASE
        ? s
              .replace(/(<link rel="icon" href=")\/favicon\.ico"/g, `$1${BASE}/favicon.ico"`)
              .replace(/(\\?"rel\\?":\\?"icon\\?",\\?"href\\?":\\?")\/favicon\.ico/g, `$1${BASE}/favicon.ico`)
        : s

let geaendert = 0
for (const f of files) {
    if (!/\.(html|txt)$/.test(f)) continue
    const alt = fs.readFileSync(f, 'utf8')
    const neu = favicon(alt.replace(muster, `${BASE}/$1opengraph-image.png`))
    if (neu !== alt) {
        fs.writeFileSync(f, neu)
        geaendert++
    }
}
console.log(`fix-og: ${bilder} Vorschaubilder als PNG, ${geaendert} Dateien korrigiert`)
