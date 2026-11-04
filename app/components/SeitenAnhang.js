'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LeadForm, { ANLIEGEN } from './LeadForm'

// Das Anfrageformular steht nur dort ausgeklappt, wo es zur Aufgabe passt. Überall sonst reicht eine Zeile,
// die das Formular auf Klick öffnet. Links wie #anfrage-fehler öffnen es ebenfalls und wählen das Anliegen vor.
const VOLL = /^\/(launch-kit|ueber-jean|verzeichnis\/[^/]+)\/?$/

export default function SeitenAnhang() {
    const pfad = usePathname() || '/'
    const voll = VOLL.test(pfad)
    const [offen, setOffen] = useState(false)
    const [perKlick, setPerKlick] = useState(false)

    useEffect(() => {
        setOffen(false)
        setPerKlick(false)
        const pruefen = () => {
            if (/^#anfrage(-[a-z-]+)?$/.test(window.location.hash)) setOffen(true)
        }
        pruefen()
        window.addEventListener('hashchange', pruefen)
        return () => window.removeEventListener('hashchange', pruefen)
    }, [pfad])

    // Nach dem Aufklappen per Knopf direkt ins erste Pflichtfeld.
    useEffect(() => {
        if (perKlick && offen) document.getElementById('anfrage-email')?.focus()
    }, [perKlick, offen])

    if (voll || offen) return <LeadForm />
    return (
        <p className="a-frag-jean" id="anfrage">
            {/* Sprungziele wie #anfrage-fehler auch im eingeklappten Zustand, damit Links ohne JavaScript ankommen. */}
            {ANLIEGEN.map(([k]) => (
                <span key={k} id={`anfrage-${k}`} />
            ))}
            Fragen, Tool-Vorschlag oder einen Fehler gefunden?{' '}
            <button type="button" className="a-frag-jean-knopf" aria-expanded="false" onClick={() => (setPerKlick(true), setOffen(true))}>
                Frag Jean direkt →
            </button>
        </p>
    )
}
