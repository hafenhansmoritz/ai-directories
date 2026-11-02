'use client'

import { useEffect, useState } from 'react'
import { lies } from '../../lib/herz'

// Letzter Besuch vor dieser Sitzung (ISO-Zeitpunkt) oder null beim ersten Besuch. Rechnet nur im Browser.
export function useLetzterBesuch() {
    const [vorher, setVorher] = useState(null)
    useEffect(() => {
        let wert = null
        try {
            wert = sessionStorage.getItem('mentat-vorher')
        } catch {}
        if (wert === null) wert = lies('mentat-zuletzt', '')
        if (wert) setVorher(wert)
    }, [])
    return vorher
}

// Zeigt auf /ki-news, wie viele Meldungen seit deinem letzten Besuch neu sind.
export default function NeuSeit({ daten }) {
    const vorher = useLetzterBesuch()
    if (!vorher) return null
    const tag = vorher.slice(0, 10)
    const neu = daten.filter((d) => d > tag).length
    if (neu === 0) return null
    const am = new Date(vorher).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })
    return (
        <p className="neu-seit">
            <span aria-hidden="true">🆕</span> Willkommen zurück! Seit deinem letzten Besuch am {am} {neu === 1 ? 'ist 1 Meldung' : `sind ${neu} Meldungen`} dazugekommen. Sie
            tragen unten die Marke „Neu“.
        </p>
    )
}
