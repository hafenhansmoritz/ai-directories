'use client'

import { useEffect, useState } from 'react'
import { lies, schreib, toast, verleihe } from '../../lib/herz'

export default function ThemeSchalter({ className = '', kompakt = false }) {
    const [istDunkel, setIstDunkel] = useState(false)

    useEffect(() => {
        const gespeichertes = lies('mentat-theme', 'system')

        const berechneIstDunkel = (t) => {
            if (t === 'dark') return true
            if (t === 'light') return false
            return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        }

        setIstDunkel(berechneIstDunkel(gespeichertes))

        const wechsle = (e) => {
            const t = e.detail?.theme || 'system'
            setIstDunkel(berechneIstDunkel(t))
        }

        window.addEventListener('mentat-theme', wechsle)
        return () => window.removeEventListener('mentat-theme', wechsle)
    }, [])

    const toggle = () => {
        const ziel = istDunkel ? 'light' : 'dark'
        setIstDunkel(!istDunkel)
        schreib('mentat-theme', ziel)
        document.documentElement.dataset.theme = ziel
        window.dispatchEvent(new CustomEvent('mentat-theme', { detail: { theme: ziel } }))
        toast(
            ziel === 'dark'
                ? 'Dunkelmodus an: Augen entspannt, Akku geschont. Sehr vernünftig.'
                : 'Hellmodus an: Jean setzt die Sonnenbrille auf. Es werde Licht!',
            ziel === 'dark' ? '🌙' : '☀️'
        )
        verleihe('Farbenfroh-Abzeichen', { auto: false })
    }

    const label = istDunkel ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'

    return (
        <button
            type="button"
            className={`theme-schalter ${className}`.trim()}
            onClick={toggle}
            aria-label={label}
            title={label}
        >
            <span aria-hidden="true">{istDunkel ? '☀️' : '🌙'}</span>
            {!kompakt && <span>{istDunkel ? 'Hell' : 'Dunkel'}</span>}
        </button>
    )
}
