'use client'

import { useLetzterBesuch } from './NeuSeit'
import '../styles/e-inhalte.css'

// Kleine Marke „Neu“ an Karten, deren Datum nach deinem letzten Besuch liegt. Beim ersten Besuch erscheint nichts.
export default function NeuMarke({ datum }) {
    const vorher = useLetzterBesuch()
    if (!vorher || !datum || datum.slice(0, 10) <= vorher.slice(0, 10)) return null
    return (
        <span className="e-neu-marke" title="Neu seit deinem letzten Besuch">
            <span aria-hidden="true">🆕 </span>Neu
        </span>
    )
}
