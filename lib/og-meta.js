// Open-Graph-Angaben für Inhaltsseiten (Ratgeber, News, Modelle, Glossar, Quiz, Launch-Kit).
// Next.js ersetzt openGraph aus dem Layout komplett, sobald eine Seite eigene Angaben setzt.
// Deshalb gibt dieser Helfer Bild, Sprache und Seitenname immer mit, damit geteilte Links eine Vorschau zeigen.
// Die Bilder entstehen über opengraph-image.js der jeweiligen Rubrik (nach utils/export/fix-og.js als .png).
import { SITE_NAME, absoluteUrl } from './site'

export const OG_BILDER = {
    start: '/opengraph-image.png',
    ratgeber: '/ratgeber/opengraph-image.png',
    news: '/ki-news/opengraph-image.png',
    modelle: '/neue-ki-modelle/opengraph-image.png',
    glossar: '/glossar/opengraph-image.png',
    quiz: '/quiz/opengraph-image.png',
    launchKit: '/launch-kit/opengraph-image.png',
}

export function ogMeta({ url, type = 'website', bild = OG_BILDER.start, alt = SITE_NAME, title, description }) {
    return {
        type,
        locale: 'de_DE',
        siteName: SITE_NAME,
        url,
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        images: [{ url: absoluteUrl(bild), width: 1200, height: 630, alt }],
    }
}

// Verweis auf die Organisation aus dem Layout-Schema, für publisher in Article-Schemas.
export const publisherRef = () => ({ '@id': `${absoluteUrl('/')}#organisation` })
