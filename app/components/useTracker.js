'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import useLaunch from './useLaunch'
import { LOKAL_KEY, ZAEHLT, setzeLaunch, heute, LOKAL_LAUNCH } from '../../lib/launch'
import { verleihe } from '../../lib/herz'

// Ohne Anmeldung liegen eingetragene Verzeichnisse nur im Browser; ein Event hält mehrere Tabellen auf derselben Seite synchron.
// Mit Konto ist der Launch-Tracker im Konto die Quelle (Status eingereicht oder live zählt als eingetragen).
const KEY = LOKAL_KEY
const EVENT = 'kiv-tracker'

function read() {
    try {
        return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
    } catch {
        return new Set()
    }
}

export default function useTracker() {
    const [lokal, setDone] = useState(() => new Set())
    const launch = useLaunch()
    const wolke = useMemo(() => new Set([...launch.eintraege.values()].filter((e) => ZAEHLT.has(e.status)).map((e) => e.slug)), [launch.eintraege])
    const done = launch.aktiv ? wolke : lokal

    useEffect(() => {
        const sync = () => setDone(read())
        sync()
        window.addEventListener(EVENT, sync)
        window.addEventListener('storage', sync)
        return () => {
            window.removeEventListener(EVENT, sync)
            window.removeEventListener('storage', sync)
        }
    }, [])

    const toggle = useCallback((slug) => {
        if (launch.aktiv) {
            // Erst nach dem Laden aus dem Konto ändern, sonst überschreibt die Serverantwort das Häkchen.
            if (!launch.bereit || launch.fehler) return wolke
            const next = new Set(wolke)
            const an = !next.has(slug)
            an ? next.add(slug) : next.delete(slug)
            setzeLaunch(launch.uid, slug, { status: an ? 'eingereicht' : 'geplant' })
            if (an) {
                if (next.size >= 1) verleihe('Starter-Abzeichen', { auto: false, konfetti: true })
                if (next.size >= 10) verleihe('Macher-Abzeichen', { auto: false, konfetti: true })
            }
            return next
        }
        const next = read()
        const an = !next.has(slug)
        an ? next.add(slug) : next.delete(slug)
        try {
            localStorage.setItem(KEY, JSON.stringify([...next]))
            localStorage.setItem('mentat-eingetragen', JSON.stringify([...next]))
        } catch {
            // Speicher gesperrt (privates Fenster): Häkchen gilt dann nur bis zum Neuladen.
        }
        try {
            const roh = JSON.parse(localStorage.getItem(LOKAL_LAUNCH) || '{}')
            const bisher = roh[slug] || {}
            roh[slug] = {
                ...bisher,
                status: an ? (bisher.status === 'live' ? 'live' : 'eingereicht') : 'geplant',
                datum: an ? (bisher.datum || heute()) : bisher.datum,
                aktualisiert: new Date().toISOString(),
            }
            localStorage.setItem(LOKAL_LAUNCH, JSON.stringify(roh))
        } catch {}
        setDone(next)
        window.dispatchEvent(new Event(EVENT))
        if (an) {
            if (next.size >= 1) verleihe('Starter-Abzeichen', { auto: false, konfetti: true })
            if (next.size >= 10) verleihe('Macher-Abzeichen', { auto: false, konfetti: true })
        }
        return next
    }, [launch.aktiv, launch.bereit, launch.fehler, launch.uid, wolke])

    return { done, toggle, imKonto: launch.aktiv, bereit: !launch.aktiv || launch.bereit }
}

export const RANKS = [
    [0, 'Frischling', 'Noch kein Eintrag. Der erste ist der schwerste, versprochen.'],
    [1, 'Linkfriedhof-Gärtner', 'Du hast angefangen. Jean ist ein bisschen stolz.'],
    [5, 'Backlink-Lehrling', 'Fünf Einträge. Die Formulare kennen deinen Namen.'],
    [15, 'Verzeichnis-Veteran', 'Fünfzehn! Deine Zwischenablage braucht Urlaub.'],
    [30, 'Backlink-Baron', 'Dreißig Einträge. Du bist jetzt offiziell schwer zu ignorieren.'],
    [60, 'Jean-Level', 'Sechzig. Ab jetzt grüßt dich das Maskottchen persönlich.'],
]

export const rankFor = (n) => [...RANKS].reverse().find(([min]) => n >= min)
