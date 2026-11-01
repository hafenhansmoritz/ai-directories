'use client'

import { useState } from 'react'
import '../styles/e-inhalte.css'

// Teilt ein Ergebnis samt Link mit Hash (z. B. #a=links,zero,none). Erst das Teilen-Menü des Geräts,
// sonst Text und Link in die Zwischenablage. Nichts verlässt den Browser, außer du teilst es selbst.
export default function TeilenKnopf({ titel, text, link, label = 'Mein Ergebnis teilen' }) {
    const [status, setStatus] = useState('')
    const klick = async () => {
        const url = typeof link === 'function' ? link() : link
        try {
            if (navigator.share) {
                await navigator.share({ title: titel, text, url })
                return
            }
        } catch {
            return
        }
        try {
            await navigator.clipboard.writeText(`${text}\n${url}`)
            setStatus('Text und Link kopiert.')
        } catch {
            setStatus(`Link: ${url}`)
        }
        setTimeout(() => setStatus(''), 4000)
    }
    return (
        <span className="e-teilen">
            <button type="button" className="button button-small" onClick={klick}>
                📤 {label}
            </button>
            <span className="e-teilen-status" role="status">
                {status}
            </span>
        </span>
    )
}
