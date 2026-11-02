// STATIC_EXPORT=1 erzeugt eine rein statische Fassung in out/ (z. B. für GitHub Pages).
// BASE_PATH setzt den Unterpfad, etwa /ai-directories für jmp-collab.github.io/ai-directories.
const isExport = process.env.STATIC_EXPORT === '1'
const basePath = isExport ? process.env.BASE_PATH || '' : ''

/** @type {import('next').NextConfig} */
module.exports = {
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    staticPageGenerationTimeout: 300,
    ...(isExport && {
        output: 'export',
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
    }),
}
