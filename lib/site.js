// Zentrale Site-Konfiguration. Produktiv-Domain über NEXT_PUBLIC_SITE_URL setzen, sonst stimmen Canonicals und Sitemap nicht.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/$/, '')

export const SITE_NAME = 'AIGeddon'
export const SITE_TAGLINE = 'KI-Verzeichnisse, Tools & Prompts'
export const REPO_URL = 'https://github.com/jmp-collab/ai-directories'

// Die statische Fassung läuft mit trailingSlash (next.config.js). Seitenpfade bekommen dort den Schrägstrich am Ende,
// damit Sitemap, JSON-LD und llms.txt genau die Canonical-URL nennen statt einer 301-Weiterleitung.
// Ausgenommen: Dateien (feed.xml, opengraph-image.png, top-50.csv), /api/ und Pfade mit Query.
const MIT_SCHRAEGSTRICH = process.env.STATIC_EXPORT === '1'
export const seitenPfad = (path = '/') => {
    if (!MIT_SCHRAEGSTRICH) return path
    const [vorn, anker] = path.split('#')
    if (vorn.endsWith('/') || vorn.includes('?') || vorn.startsWith('/api/') || /\.(xml|txt|json|csv|md|png|jpe?g|webp|svg|ico|pdf|zip)$/i.test(vorn)) return path
    return `${vorn}/${anker !== undefined ? `#${anker}` : ''}`
}

export const absoluteUrl = (path = '/') => `${SITE_URL}${seitenPfad(path)}`

// Pfad zu Dateien aus public/ und Routen außerhalb von <Link>, mit Unterpfad der statischen Fassung.
export const withBase = (path) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
