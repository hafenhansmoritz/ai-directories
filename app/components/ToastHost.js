'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

// Zeigt kleine, freundliche Meldungen. Bleibt sechs Sekunden, lässt sich schließen.
// Automatische Meldungen (ohne Klick) höchstens eine pro Seitenaufruf, damit es liebevoll bleibt und nicht laut wird.
// Im Ruhe-Modus und bei Bedienung per Tastatur kommen gar keine automatischen Meldungen, und eine Meldung,
// die über dem gerade fokussierten Element liegt, macht sofort Platz (WCAG 2.4.11).
const ueberlappt = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

export default function ToastHost() {
    const pfad = usePathname()
    const [liste, setListe] = useState([])
    const autoZahl = useRef(0)
    const tastatur = useRef(false)
    const host = useRef(null)

    useEffect(() => {
        autoZahl.current = 0
    }, [pfad])

    useEffect(() => {
        let n = 0
        const neu = (e) => {
            if (e.detail.auto) {
                if (autoZahl.current >= 1 || tastatur.current || document.documentElement.dataset.ruhig === 'an') return
                autoZahl.current++
            }
            const id = ++n
            setListe((l) => [...l.slice(-2), { id, ...e.detail }])
            setTimeout(() => setListe((l) => l.filter((t) => t.id !== id)), 6000)
        }
        const taste = (e) => {
            if (e.key === 'Tab') tastatur.current = true
        }
        const fokus = (e) => {
            const ziel = e.target
            if (!host.current || !ziel?.getBoundingClientRect || host.current.contains(ziel)) return
            const r = ziel.getBoundingClientRect()
            const verdeckt = [...host.current.querySelectorAll('.toast')].some((t) => ueberlappt(t.getBoundingClientRect(), r))
            if (verdeckt) setListe([])
        }
        window.addEventListener('mentat-toast', neu)
        window.addEventListener('keydown', taste)
        document.addEventListener('focusin', fokus)
        return () => {
            window.removeEventListener('mentat-toast', neu)
            window.removeEventListener('keydown', taste)
            document.removeEventListener('focusin', fokus)
        }
    }, [])
    return (
        <div className="toast-host" role="status" aria-live="polite" ref={host}>
            {liste.map((t) => (
                <p key={t.id} className="toast">
                    <span className="toast-emoji" aria-hidden="true">{t.emoji}</span>
                    <span className="toast-text">{t.text}</span>
                    <button type="button" className="toast-zu" aria-label="Meldung schließen" onClick={() => setListe((l) => l.filter((x) => x.id !== t.id))}>
                        ×
                    </button>
                </p>
            ))}
        </div>
    )
}
