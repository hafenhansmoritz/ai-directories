// Kompletter Build der statischen Fassung, lokal genauso wie in der CI (npm run build:pages).
// 1. Vorschaubild-Route unter [slug] kurz beiseitelegen (Next.js 14 kann sie nicht statisch exportieren)
// 2. next build, interne Verlinkung aus out/ neu berechnen, bei geaendertem Netz noch einmal bauen
// 3. fix-og (PNG-Vorschaubilder, doppelter basePath) und .nojekyll
// Die Vorschaubild-Datei kommt immer zurueck, auch wenn der Build scheitert oder abgebrochen wird.
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
    let fixed = src.replace(
        /await _fs\.promises\.rm\(exportOptions\.outdir, \{\s*recursive: true,\s*force: true\s*\}\);/g,
        'await _fs.promises.rm(exportOptions.outdir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }).catch(() => {});'
    )
    fixed = fixed.replace(
        /async function readManifest\(filePath\) \{\s*return JSON\.parse\(await readFileUtf8\(filePath\)\);\s*\}/g,
        'async function readManifest(filePath) { for (let i = 0; i < 30; i++) { try { return JSON.parse(await readFileUtf8(filePath)); } catch (err) { if (err.code === "ENOENT" && i < 29) { await new Promise((r) => setTimeout(r, 200)); continue; } throw err; } } }'
    )
    if (fixed !== src) fs.writeFileSync(nextBuildIdx, fixed)
}

const loadManifestPath = path.join(WURZEL, 'node_modules/next/dist/server/load-manifest.js')
if (fs.existsSync(loadManifestPath)) {
    const src = fs.readFileSync(loadManifestPath, 'utf8')
    const target = 'let manifest = JSON.parse((0, _fs.readFileSync)(path, "utf8"));'
    const replacement = 'let manifest; for (let i = 0; i < 30; i++) { try { manifest = JSON.parse((0, _fs.readFileSync)(path, "utf8")); break; } catch (err) { if (err.code === "ENOENT" && i < 29) { const s = Date.now(); while (Date.now() - s < 200) {} continue; } throw err; } }'
    if (src.includes(target)) fs.writeFileSync(loadManifestPath, src.replace(target, replacement))
}

const requirePath = path.join(WURZEL, "node_modules/next/dist/server/require.js");
if (fs.existsSync(requirePath)) {
    const src = fs.readFileSync(requirePath, "utf8");
    const target = "let curPath = manifest[page];";
    const replacement = "let curPath = manifest[page] || (isAppPath ? (manifest[page + \"/route\"] || manifest[page + \"/page\"]) : undefined);";
    if (src.includes(target)) fs.writeFileSync(requirePath, src.replace(target, replacement));
}

const exportIndexPath = path.join(WURZEL, "node_modules/next/dist/export/index.js");
if (fs.existsSync(exportIndexPath)) {
    let src = fs.readFileSync(exportIndexPath, "utf8");
    const tFont = "nextFontManifest: require((0, _path.join)(distDir, \"server\", `" + "${_constants1.NEXT_FONT_MANIFEST}.json`)),";
    const rFont = "nextFontManifest: (() => { const p = (0, _path.join)(distDir, \"server\", `" + "${_constants1.NEXT_FONT_MANIFEST}.json`); for (let i = 0; i < 20; i++) { try { return require(p); } catch (err) { if (err.code === \"MODULE_NOT_FOUND\" && i < 19) { const st = Date.now(); while (Date.now() - st < 100) {} continue; } } } return { pages: {}, app: {}, appUsingSizeAdjust: false, pagesUsingSizeAdjust: false }; })(),";
    if (src.includes(tFont)) src = src.replace(tFont, rFont);
    const tPrerender = "prerenderManifest = require((0, _path.join)(distDir, _constants1.PRERENDER_MANIFEST));";
    const rPrerender = "for (let i = 0; i < 40; i++) { try { prerenderManifest = JSON.parse((0, _fs.readFileSync)((0, _path.join)(distDir, _constants1.PRERENDER_MANIFEST), \"utf8\")); break; } catch (e) { if ([\"ENOENT\", \"EBUSY\", \"EPERM\"].includes(e.code) && i < 39) { const st = Date.now(); while (Date.now() - st < 250) {} continue; } } }";
    if (src.includes(tPrerender)) src = src.replace(tPrerender, rPrerender);
    const tAppRoute = "appRoutePathManifest = require((0, _path.join)(distDir, _constants1.APP_PATH_ROUTES_MANIFEST));";
    const rAppRoute = "for (let i = 0; i < 40; i++) { try { appRoutePathManifest = JSON.parse((0, _fs.readFileSync)((0, _path.join)(distDir, _constants1.APP_PATH_ROUTES_MANIFEST), \"utf8\")); break; } catch (e) { if ([\"ENOENT\", \"EBUSY\", \"EPERM\"].includes(e.code) && i < 39) { const st = Date.now(); while (Date.now() - st < 250) {} continue; } } }";
    if (src.includes(tAppRoute)) src = src.replace(tAppRoute, rAppRoute);
    const tCopy = "await _fs.promises.copyFile(htmlSrc, htmlDest);\n            await _fs.promises.copyFile(jsonSrc, jsonDest);";
    const rCopy = "const _safeCopy = async (src, dest) => { for (let i = 0; i < 40; i++) { try { await _fs.promises.mkdir((0, _path.dirname)(dest), { recursive: true }); await _fs.promises.copyFile(src, dest); return; } catch (e) { if ([\"ENOENT\", \"EPERM\", \"EBUSY\"].includes(e.code) && i < 39) { await new Promise((r) => setTimeout(r, 150)); continue; } throw e; } } }; await _safeCopy(htmlSrc, htmlDest); await _safeCopy(jsonSrc, jsonDest);";
    if (src.includes(tCopy)) src = src.replace(tCopy, rCopy);
    fs.writeFileSync(exportIndexPath, src);
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
        console.log('\nVernetzung hat sich geaendert, zweiter Build, damit "Passt dazu" aktuell ist.')
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
