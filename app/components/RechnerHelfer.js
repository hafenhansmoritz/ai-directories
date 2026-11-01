'use client'

import { useEffect, useRef, useState } from 'react'
import TeilenKnopf from './TeilenKnopf'
import '../styles/e-inhalte.css'

// Gemeinsame Helfer für die Rechner unter /rechner: Eingaben im Link (Hash), Zahlenfelder mit Prüfung,
// kurze Ansage für Screenreader und ein Knopf zum Teilen der Rechnung. Alles läuft nur im Browser.

const zahl = (v) => (typeof v === 'number' ? v : Number(String(v).replace(',', '.')))
export const begrenze = (v, min, max) => Math.min(max, Math.max(min, v))

// Hash aus dem aktuellen Stand, sofort verfügbar (der Hash in der Adresszeile wird erst verzögert geschrieben).
const hashAus = (felder) => {
    const p = new URLSearchParams()
    Object.entries(felder).forEach(([name, f]) => {
        p.set(name, f.liste ? f.wert.join(',') : f.janein ? (f.wert ? '1' : '0') : String(f.wert))
    })
    return p.toString().replace(/%2C/g, ',')
}
let letzterHash = ''

// Liest beim Laden #k=v&k2=v2 und spiegelt spätere Änderungen in den Hash (ohne neuen Verlaufseintrag).
// felder: { name: { wert, setzen, min, max } } für Zahlen oder { wert, setzen, liste: true, erlaubt: [], mindestens? } für Listen.
export function useHashZustand(felder) {
    const ersterLauf = useRef(true)
    const geladen = useRef(false)
    useEffect(() => {
        const p = new URLSearchParams(window.location.hash.slice(1))
        Object.entries(felder).forEach(([name, f]) => {
            if (!p.has(name)) return
            const roh = p.get(name)
            if (f.liste) {
                const werte = roh.split(',').filter((x) => !f.erlaubt || f.erlaubt.includes(x))
                // Eine ausdrücklich leere Liste (z. B. tools=) gilt auch, sofern das Feld keine Mindestanzahl hat.
                if (werte.length ? werte.length >= (f.mindestens || 0) : roh === '' && !f.mindestens) f.setzen(werte)
            } else if (f.janein) {
                f.setzen(roh === '1')
            } else if (f.text) {
                if (!f.erlaubt || f.erlaubt.includes(roh)) f.setzen(roh)
            } else {
                const n = zahl(roh)
                if (Number.isFinite(n)) f.setzen(begrenze(n, f.min, f.max))
            }
        })
        geladen.current = true
        // Nur beim ersten Laden aus dem Hash lesen.
    }, [])
    const schluessel = JSON.stringify(Object.fromEntries(Object.entries(felder).map(([k, f]) => [k, f.wert])))
    letzterHash = hashAus(felder)
    useEffect(() => {
        if (ersterLauf.current) {
            ersterLauf.current = false
            return
        }
        if (!geladen.current) return
        const t = setTimeout(() => {
            try {
                window.history.replaceState(null, '', `#${hashAus(felder)}`)
            } catch {}
        }, 400)
        return () => clearTimeout(t)
    }, [schluessel])
}

// Zahlenfeld mit Prüfung: ungültige oder leere Eingaben werden nicht still ersetzt, sondern angezeigt.
export function ZahlFeld({ id, wert, setzen, min, max, step = 1, einheit = '', label, ...rest }) {
    const [text, setText] = useState(String(wert))
    const [fehler, setFehler] = useState('')
    useEffect(() => {
        if (zahl(text) !== wert) setText(String(wert))
        // Nur reagieren, wenn der Wert von außen (z. B. Regler) kommt.
    }, [wert])
    const fmt = (v) => new Intl.NumberFormat('de-DE').format(v)
    const aendern = (e) => {
        const roh = e.target.value
        setText(roh)
        const n = zahl(roh)
        if (roh.trim() === '' || !Number.isFinite(n)) {
            setFehler('Bitte eine Zahl eingeben.')
            return
        }
        if (n < min || n > max) {
            setFehler(`Bitte einen Wert von ${fmt(min)} bis ${fmt(max)}${einheit ? ` ${einheit}` : ''} eingeben.`)
            return
        }
        setFehler('')
        setzen(n)
    }
    const verlassen = () => {
        if (fehler) {
            setText(String(wert))
            setFehler('')
        }
    }
    return (
        <>
            <input
                id={id}
                type="number"
                inputMode="decimal"
                min={min}
                max={max}
                step={step}
                value={text}
                onChange={aendern}
                onBlur={verlassen}
                aria-invalid={fehler ? 'true' : undefined}
                aria-describedby={fehler ? `${id}-fehler` : undefined}
                aria-label={label}
                {...rest}
            />
            {fehler && (
                <span id={`${id}-fehler`} className="e-feld-fehler">
                    {fehler} Gerechnet wird weiter mit {fmt(wert)}
                    {einheit ? ` ${einheit}` : ''}.
                </span>
            )}
        </>
    )
}

// Kurze, entprellte Ansage des Ergebnisses statt der ganzen Ergebnisliste (WCAG 4.1.3).
export function RechnerStatus({ text }) {
    const [ansage, setAnsage] = useState('')
    const erster = useRef(true)
    useEffect(() => {
        if (erster.current) {
            erster.current = false
            return
        }
        const t = setTimeout(() => setAnsage(text), 600)
        return () => clearTimeout(t)
    }, [text])
    return (
        <p className="sr-only" role="status">
            {ansage}
        </p>
    )
}

// Knopf „Rechnung teilen“: teilt die aktuelle Adresse samt Eingaben im Hash.
export function RechnungTeilen({ titel, text }) {
    // Link aus dem aktuellen Stand bauen, nicht aus der Adresszeile, die noch den vorherigen Stand zeigen kann.
    const link = () => (letzterHash ? `${window.location.origin}${window.location.pathname}${window.location.search}#${letzterHash}` : window.location.href)
    return <TeilenKnopf titel={titel} text={text} link={link} label="Rechnung teilen" />
}
