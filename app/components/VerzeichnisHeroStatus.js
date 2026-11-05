'use client'

import { useEffect, useState } from 'react'
import useTracker from './useTracker'
import { lies, schreib, toast, ruhig } from '../../lib/herz'
import { lokalLaunch, setzeLokal, heute } from '../../lib/launch'

// Groesserer Status-Toggle, Merkliste und persoenliches Einreichungs-Logbuch (Task 13 & 14)
// direkt in der Hero-Box jeder Verzeichnis-Detailseite.
// Voll synchron mit Launch-Tracker, Haupttabelle und Merkliste im Browser.
export default function VerzeichnisHeroStatus({ slug, name }) {
    const { done, toggle } = useTracker()
    const eingetragen = done.has(slug)
    const [gemerkt, setGemerkt] = useState(false)
    const [logOffen, setLogOffen] = useState(false)
    const [logData, setLogData] = useState({ datum: '', listingUrl: '', notiz: '' })
    const pfad = `/verzeichnis/${slug}`

    useEffect(() => {
        const pruefen = () => {
            const liste = lies('mentat-merkliste', []) || []
            setGemerkt(liste.some((m) => m.pfad === pfad || m.slug === slug))
            const eintrag = lokalLaunch().get(slug)
            if (eintrag) {
                setLogData({
                    datum: eintrag.datum || '',
                    listingUrl: eintrag.listingUrl || '',
                    notiz: eintrag.notiz || '',
                })
                if (eintrag.datum || eintrag.listingUrl || eintrag.notiz) {
                    setLogOffen(true)
                }
            }
        }
        pruefen()
        window.addEventListener('mentat-sync', pruefen)
        window.addEventListener('mentat-speicher', pruefen)
        window.addEventListener('kiv-tracker', pruefen)
        window.addEventListener('storage', pruefen)
        return () => {
            window.removeEventListener('mentat-sync', pruefen)
            window.removeEventListener('mentat-speicher', pruefen)
            window.removeEventListener('kiv-tracker', pruefen)
            window.removeEventListener('storage', pruefen)
        }
    }, [pfad, slug])

    const statusWechsel = () => {
        const wirdEingetragen = !eingetragen
        toggle(slug)

        const aktuellesDatum = logData.datum || heute()
        setzeLokal(slug, {
            status: wirdEingetragen ? 'eingereicht' : 'geplant',
            datum: wirdEingetragen ? aktuellesDatum : logData.datum,
        })
        if (wirdEingetragen) {
            setLogData((prev) => ({ ...prev, datum: aktuellesDatum }))
            setLogOffen(true)
        }

        if (wirdEingetragen) {
            if (!ruhig()) {
                import('../../lib/konfetti').then((m) => m.default(50)).catch(() => {})
            }
            toast(`${name} als eingetragen abgehakt! Starker Schritt.`, '✅')
        } else {
            toast(`${name} wieder auf offen gesetzt.`, '↩️')
        }
    }

    const merkWechsel = () => {
        const wirdGemerkt = !gemerkt
        const alteListe = lies('mentat-merkliste', []) || []
        const gefiltert = alteListe.filter((m) => m.pfad !== pfad && m.slug !== slug)

        if (wirdGemerkt) {
            const eintrag = {
                slug,
                pfad,
                titel: `${name} im KI-Verzeichnis-Check`,
                zeit: Date.now(),
            }
            schreib('mentat-merkliste', [eintrag, ...gefiltert])
            setGemerkt(true)
            toast(`${name} auf die Merkliste gesetzt!`, '⭐')
        } else {
            schreib('mentat-merkliste', gefiltert)
            setGemerkt(false)
            toast(`${name} von der Merkliste entfernt.`, '🗑️')
        }
    }

    const feldAendern = (feld, wert) => {
        const neu = { ...logData, [feld]: wert }
        setLogData(neu)
        setzeLokal(slug, neu)
    }

    return (
        <div className="verzeichnis-hero-status" aria-label="Persoenlicher Launch-Status">
            <button
                type="button"
                className={`status-toggle-btn ${eingetragen ? 'is-eingetragen' : 'is-offen'}`}
                onClick={statusWechsel}
                aria-pressed={eingetragen}
                title={eingetragen ? 'Als noch offen markieren' : 'Als eingetragen markieren'}
            >
                <span aria-hidden="true">{eingetragen ? '✓' : '○'}</span>
                <span>{eingetragen ? 'Eingetragen ✓' : 'Noch offen: hier als erledigt abhaken'}</span>
            </button>
            <button
                type="button"
                className={`hero-merk-btn ${gemerkt ? 'is-gemerkt' : ''}`}
                onClick={merkWechsel}
                aria-pressed={gemerkt}
                title={gemerkt ? 'Aus deiner Merkliste entfernen' : 'Fuer spaeter merken'}
            >
                <span aria-hidden="true">{gemerkt ? '★' : '☆'}</span>
                <span>{gemerkt ? 'Gemerkt' : 'Merken'}</span>
            </button>
            <button
                type="button"
                className="hero-merk-btn"
                onClick={() => setLogOffen((v) => !v)}
                aria-expanded={logOffen}
                title="Persoenliches Einreichungs-Logbuch oeffnen"
            >
                <span aria-hidden="true">📝</span>
                <span>{logOffen ? 'Logbuch schliessen' : 'Logbuch & Notiz'}</span>
            </button>
            <span className="status-toggle-hint">Synchron mit deinem Launch-Tracker</span>

            {logOffen && (
                <div className="hero-log-box">
                    <div className="hero-log-header">
                        <strong>📋 Dein Einreichungs-Logbuch fuer {name}</strong>
                        <span className="hero-log-sub">Nur lokal in deinem Browser gespeichert</span>
                    </div>
                    <div className="hero-log-grid">
                        <label className="hero-log-field">
                            <span>Einreichdatum</span>
                            <input
                                type="date"
                                value={logData.datum}
                                onChange={(e) => feldAendern('datum', e.target.value)}
                            />
                        </label>
                        <label className="hero-log-field">
                            <span>Deine Listing-URL</span>
                            <div className="hero-log-url-wrap">
                                <input
                                    type="url"
                                    placeholder="https://.../mein-eintrag"
                                    value={logData.listingUrl}
                                    onChange={(e) => feldAendern('listingUrl', e.target.value)}
                                />
                                {logData.listingUrl && (
                                    <a
                                        href={logData.listingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button button-small hero-log-link-btn"
                                    >
                                        Listing ↗
                                    </a>
                                )}
                            </div>
                        </label>
                        <label className="hero-log-field hero-log-field-wide">
                            <span>Notiz</span>
                            <input
                                type="text"
                                placeholder="z. B. Bestaetigungsmail da, Warteschlange ca. 5 Tage"
                                value={logData.notiz}
                                onChange={(e) => feldAendern('notiz', e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}
