// Kompletter Build der statischen Fassung, lokal genauso wie in der CI (npm run build:pages).
// 1. Vorschaubild-Route unter [slug] kurz beiseitelegen (Next.js 14 kann sie nicht statisch exportieren)
// 2. next build, interne Verlinkung aus out/ neu berechnen, bei geändertem Netz noch einmal bauen
// 3. fix-og (PNG-Vorschaubilder, doppelter basePath) und .nojekyll
// Die Vorschaubild-Datei kommt immer zurück, auch wenn der Build scheitert oder abgebrochen wird.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const OG = path.join(WURZEL, 'app/verzeichnis/[slug]/opengraph-image.js')
const OG_PARK = path.join(os.tmpdir(), `mentat-og-${process.pid}.js`)
const NETZ = path.join(WURZEL, 'db/vernetzung.json')

const env = {
    ...process.env,
    STATIC_EXPORT: '1',
    BASE_PATH: process.env.BASE_PATH ?? '',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mentat.codes',
}

const lauf = (befehl, args) => {
    console.log(`\n> ${befehl} ${args.join(' ')}`)
    const r = spawnSync(befehl, args, { cwd: WURZEL, env, stdio: 'inherit' })
    if (r.status !== 0) throw new Error(`${befehl} ${args.join(' ')} ist mit Code ${r.status ?? r.signal} abgebrochen`)
}

let geparkt = false
const zuruecklegen = () => {
    if (!geparkt) return
    if (fs.existsSync(OG_PARK)) {
        fs.copyFileSync(OG_PARK, OG)
        fs.rmSync(OG_PARK, { force: true })
    }
    geparkt = false
}
for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
        zuruecklegen()
        process.exit(130)
    })
}

const ogNode = path.join(WURZEL, 'node_modules/next/dist/compiled/@vercel/og/index.node.js')
if (fs.existsSync(ogNode)) {
    const src = fs.readFileSync(ogNode, 'utf8')
    const fixed = src.replace(/join\(import\.meta\.url, "\.\.\/([^"]+)"\)/g, 'new URL("./$1", import.meta.url)')
    if (fixed !== src) fs.writeFileSync(ogNode, fixed)
}

const nextBuildIdx = path.join(WURZEL, 'node_modules/next/dist/build/index.js')
if (fs.existsSync(nextBuildIdx)) {
    const src = fs.readFileSync(nextBuildIdx, 'utf8')
    const fixed = src.replace(
        /await _fs\.promises\.rm\(exportOptions\.outdir, \{\s*recursive: true,\s*force: true\s*\}\);/g,
        'await _fs.promises.rm(exportOptions.outdir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }).catch(() => {});'
    )
    if (fixed !== src) fs.writeFileSync(nextBuildIdx, fixed)
}

const next = path.join(WURZEL, 'node_modules/next/dist/bin/next')
try {
    if (!fs.existsSync(OG)) {
        const orphan = fs.readdirSync(os.tmpdir()).find((f) => f.startsWith('mentat-og-'))
        if (orphan) fs.copyFileSync(path.join(os.tmpdir(), orphan), OG)
    }
    if (fs.existsSync(OG)) {
        fs.copyFileSync(OG, OG_PARK)
        fs.rmSync(OG)
        geparkt = true
    }
    lauf(process.execPath, [next, 'build'])
    const alt = fs.existsSync(NETZ) ? fs.readFileSync(NETZ, 'utf8') : ''
    lauf(process.execPath, ['utils/vernetzung/build.mjs', 'out'])
    if (fs.readFileSync(NETZ, 'utf8') !== alt) {
        console.log('\nVernetzung hat sich geändert, zweiter Build, damit „Passt dazu“ aktuell ist.')
        lauf(process.execPath, [next, 'build'])
    }
    lauf(process.execPath, ['utils/export/fix-og.js'])
    fs.writeFileSync(path.join(WURZEL, 'out/.nojekyll'), '')
    console.log('\nbuild:pages fertig: out/ ist bereit.')
} catch (e) {
    console.error(`\nbuild:pages: ${e.message}`)
    process.exitCode = 1
} finally {
    zuruecklegen()
}
