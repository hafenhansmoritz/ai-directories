'use client'

import { useEffect, useState } from 'react'
import { lies, setzeRuhe } from '../../lib/herz'

// Kleiner Schalter direkt am Laufband: hält Laufband und alle anderen Animationen an (WCAG 2.2.2).
// Nutzt denselben Ruhe-Modus wie der Schalter im Footer.
export default function RuheKnopf() {
    const [still, setStill] = useState(false)
    useEffect(() => {
        setStill(Boolean(lies('aigeddon-ruhig')))
        const wechsel = (e) => setStill(e.detail.an)
        window.addEventListener('aigeddon-ruhe', wechsel)
        return () => window.removeEventListener('aigeddon-ruhe', wechsel)
    }, [])
    const umschalten = () => {
        setStill(!still)
        setzeRuhe(!still)
    }
    return (
        <button type="button" className="a-ruhe" aria-pressed={still} onClick={umschalten}>
            <span aria-hidden="true">{still ? '▶' : '⏸'}</span> Animationen anhalten
        </button>
    )
}
