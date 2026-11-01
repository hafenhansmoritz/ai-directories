'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Jeans Einordnung für Übersichts-, Listen- und Alternativen-Seiten: pro Seite ein eigener Text.
// Das Layout gibt nur die Liste der Pfade mit Text herein; die Texte selbst (db/texte/hubs.json) liegen in einem
// eigenen Teil, den nur diese Seiten laden. Im statischen HTML stehen sie trotzdem, weil der Teil serverseitig mitrendert.
const SenfText = dynamic(() => import('./JeansSenfText'))

export default function JeansSenf({ pfade = [] }) {
    const roh = usePathname() || '/'
    const pfad = roh.endsWith('/') ? roh : `${roh}/`
    if (!pfade.includes(pfad)) return null
    return <SenfText pfad={pfad} />
}
