'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { lies, schreib, toast, ruhig, verleihe } from '../../lib/herz'
import { StrahlenHerz } from './HerzIcons'
import KontoEinladung from './KontoEinladung'
import useKonto from './useKonto'

// Herz, Merken und Teilen unter jeder Seite. Gespeichert wird nur im eigenen Browser, gezählt wird nichts.
const sauber = (t) => (t || '').replace(/\s*\|\s*(?:mentat\.codes|mentat.codes)\s*$/i, '').trim()

function herzRegen(knopf) {
    if (ruhig() || !knopf) return
    const r = knopf.getBoundingClientRect()
    for (let i = 0; i < 9; i++) {
        const h = document.createElement('span')
        h.className = 'herz-flug'
        h.setAttribute('aria-hidden', 'true')
        h.textContent = ['❤️', '💖', '💛', '💜'][i % 4]
        h.style.left = `${r.left + r.width / 2}px`
        h.style.top = `${r.top}px`
        h.style.setProperty('--dx', `${(Math.random() - 0.5) * 140}px`)
        h.style.animationDelay = `${i * 40}ms`
        document.body.appendChild(h)
        setTimeout(() => h.remove(), 1400)
    }
}

export default function SeitenAktionen() {
    const pfad = usePathname() || '/'
    const [herz, setHerz] = useState(false)
    const [gemerkt, setGemerkt] = useState(false)
    const [bereit, setBereit] = useState(false)
    const [einladen, setEinladen] = useState(false)
    const [teilenOffen, setTeilenOffen] = useState(false)
    const [ziel, setZiel] = useState({ url: '', titel: '' })
    const { user } = useKonto()

    useEffect(() => {
        const lesen = () => {
            setHerz((lies('mentat-herzen', []) || []).includes(pfad))
            setGemerkt((lies('mentat-merkliste', []) || []).some((m) => m.pfad === pfad))
        }
        lesen()
        setBereit(true)
        setTeilenOffen(false)
        window.addEventListener('mentat-sync', lesen)
        return () => window.removeEventListener('mentat-sync', lesen)
    }, [pfad])

    if (pfad === '/merkliste' || pfad === '/merkliste/') return null

    const herzKlick = (e) => {
        const alle = new Set(lies('mentat-herzen', []) || [])
        if (alle.has(pfad)) {
            alle.delete(pfad)
            setHerz(false)
        } else {
            alle.add(pfad)
            setHerz(true)
            herzRegen(e.currentTarget)
            if (alle.size === 5) verleihe('Herzensmensch-Abzeichen', { auto: false })
            else toast(alle.size === 1 ? 'Dein erstes Herz! Danke, das freut uns wirklich.' : 'Danke für dein Herz!', '❤️')
        }
        schreib('mentat-herzen', [...alle])
    }

    const merkKlick = () => {
        const liste = (lies('mentat-merkliste', []) || []).filter((m) => m.pfad !== pfad)
        if (gemerkt) {
            schreib('mentat-merkliste', liste)
            setGemerkt(false)
            toast('Von der Merkliste genommen.', '🗑️')
        } else {
            schreib('mentat-merkliste', [{ pfad, titel: sauber(document.title), zeit: Date.now() }, ...liste].slice(0, 100))
            setGemerkt(true)
            if (liste.length + 1 >= 3) setEinladen(true)
            toast('Gemerkt! Du findest die Seite oben unter dem Stern und in deiner Merkliste.', '⭐')
        }
    }

    // Mit Web-Share (meist auf dem Handy) das Teilen-Menü des Geräts, sonst ein kleines Menü mit
    // LinkedIn, WhatsApp, E-Mail und Kopieren. Alles normale Links, kein Tracking-Skript.
    const teilen = async () => {
        const url = window.location.href.split('#')[0]
        const titel = sauber(document.title)
        if (navigator.share) {
            try {
                await navigator.share({ title: titel, url })
                verleihe('Botschafter-Abzeichen', { auto: false })
            } catch {}
            return
        }
        setZiel({ url, titel })
        setTeilenOffen((o) => !o)
    }
    const kopieren = async () => {
        try {
            await navigator.clipboard.writeText(ziel.url)
            if (!verleihe('Botschafter-Abzeichen', { auto: false })) toast('Link kopiert. Danke fürs Weitersagen!', '🔗')
        } catch {}
        setTeilenOffen(false)
    }
    const geteilt = () => verleihe('Botschafter-Abzeichen', { auto: false })
    const u = encodeURIComponent(ziel.url)

    return (
        <div className="seiten-aktionen" aria-label="Seite bewerten, merken oder teilen" role="group">
            <StrahlenHerz size={36} className="seiten-aktionen-icon" />
            <span className="seiten-aktionen-frage">Hat dir die Seite geholfen?</span>
            <button type="button" className={`aktion-knopf${herz ? ' an' : ''}`} aria-pressed={bereit ? herz : undefined} onClick={herzKlick}>
                <span aria-hidden="true">{herz ? '❤️' : '🤍'}</span> {herz ? 'Danke!' : 'Gefällt mir'}
            </button>
            <button type="button" className={`aktion-knopf${gemerkt ? ' an' : ''}`} aria-pressed={bereit ? gemerkt : undefined} onClick={merkKlick}>
                <span aria-hidden="true">{gemerkt ? '⭐' : '☆'}</span> {gemerkt ? 'Gemerkt' : 'Merken'}
            </button>
            <button type="button" className="aktion-knopf" onClick={teilen} aria-expanded={teilenOffen} aria-controls="a-teilen-menue">
                <span aria-hidden="true">💌</span> Teilen
            </button>
            {teilenOffen && (
                <span className="a-teilen" id="a-teilen-menue" role="group" aria-label="Seite teilen">
                    <a className="aktion-knopf" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" onClick={geteilt}>
                        LinkedIn
                    </a>
                    <a className="aktion-knopf" href={`https://wa.me/?text=${encodeURIComponent(`${ziel.titel} ${ziel.url}`)}`} target="_blank" rel="noopener noreferrer" onClick={geteilt}>
                        WhatsApp
                    </a>
                    <a className="aktion-knopf" href={`mailto:?subject=${encodeURIComponent(ziel.titel)}&body=${u}`} onClick={geteilt}>
                        E-Mail
                    </a>
                    <button type="button" className="aktion-knopf" onClick={kopieren}>
                        Link kopieren
                    </button>
                </span>
            )}
            <span className="seiten-aktionen-hinweis">
                {user ? 'Wird in deinem Konto gespeichert, damit du es auf allen Geräten hast.' : 'Bleibt nur in deinem Browser, wir zählen nichts.'}
            </span>
            {einladen && <KontoEinladung klein text="Schon 3 Seiten gemerkt! Willst du sie auf allen Geräten haben?" />}
        </div>
    )
}
