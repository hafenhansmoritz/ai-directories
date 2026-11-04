import Link from 'next/link'
import { ANGEBOT_THEMEN } from '../../lib/angebote'

// Kompakter Hinweis auf Jeans Angebote, passend zum Thema der Seite (coding, website, seo, automation).
// Unbekanntes Thema: nichts anzeigen statt eines falschen Angebots.
export default function AngebotBox({ thema = 'coding', titel, text }) {
    const t = ANGEBOT_THEMEN[thema]
    if (!t) return null
    return (
        <aside className="leadbox angebotbox" aria-label="Angebot von Jean">
            <p className="leadbox-title">{titel || t.titel}</p>
            <p>{text || t.text}</p>
            <Link className="button" href={t.href}>
                {t.cta}
            </Link>
        </aside>
    )
}
