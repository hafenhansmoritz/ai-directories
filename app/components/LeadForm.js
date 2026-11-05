'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LEAD_ENDPOINT, CONTACT_EMAIL } from '../../lib/monetization'
import konfetti from '../../lib/konfetti'

// Lead-Formular für jede Seite. Ohne eigenen Server: FormSubmit leitet die Anfrage per Mail weiter (LEAD_EMAIL).
// Das Honeypot-Feld _honey fängt einfache Bots ab; die Seite, von der die Anfrage kommt, steht im Betreff.
export const ANLIEGEN = [
    ['tool-vorschlag', 'Tool oder Verzeichnis vorschlagen'],
    ['fehler', 'Fehler auf der Seite melden'],
    ['sonstiges', 'Etwas anderes'],
]

// Optionale Props (rückwärtskompatibel): eigene Auswahlliste `optionen` im Format von ANLIEGEN, `auswahlLabel`,
// `mitWebsite` (Feld „Website oder Tool“ zeigen) und `newsletter` (zusätzliches, nicht vorausgewähltes Häkchen).
export default function LeadForm({ titel, text, optionen = ANLIEGEN, vorauswahl = optionen[0][0], id = 'anfrage', auswahlLabel = 'Worum geht es?', mitWebsite = true, newsletter = false }) {
    const pfad = usePathname() || '/'
    const [status, setStatus] = useState('bereit')
    const [fehler, setFehler] = useState('')
    const [anliegen, setAnliegen] = useState(vorauswahl)

    // Links wie #anfrage-fehler springen zum Formular und wählen das Anliegen vor.
    useEffect(() => {
        const aus = () => {
            const m = window.location.hash.match(new RegExp(`^#${id}-([a-z-]+)$`))
            if (m && optionen.some(([k]) => k === m[1])) {
                setAnliegen(m[1])
                setStatus('bereit')
                document.getElementById(id)?.scrollIntoView({ block: 'start' })
                document.getElementById(`${id}-email`)?.focus({ preventScroll: true })
            }
        }
        aus()
        window.addEventListener('hashchange', aus)
        return () => window.removeEventListener('hashchange', aus)
        // optionen ist pro Seite fest; ein neues Array bei jedem Rendern soll den Listener nicht neu setzen.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    async function senden(e) {
        e.preventDefault()
        const form = e.currentTarget
        const daten = Object.fromEntries(new FormData(form).entries())
        if (daten._honey) return
        const anliegen = optionen.find(([k]) => k === daten.anliegen)?.[1] || daten.anliegen
        setStatus('sendet')
        setFehler('')
        try {
            const r = await fetch(LEAD_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: daten.name || '(ohne Namen)',
                    email: daten.email,
                    anliegen,
                    website: daten.website || '',
                    nachricht: daten.nachricht || '',
                    ...(newsletter ? { newsletter: daten.newsletter ? 'ja, bitte Newsletter-Anmeldung mit Bestätigungsmail schicken' : 'nein' } : {}),
                    seite: window.location.href,
                    _subject: `mentat.codes-Anfrage: ${anliegen} (${pfad})`,
                    _replyto: daten.email,
                    _template: 'table',
                    _captcha: 'false',
                }),
            })
            const antwort = await r.json().catch(() => ({}))
            if (!r.ok || antwort.success === false || antwort.success === 'false') throw new Error(antwort.message || `Status ${r.status}`)
            setStatus('gesendet')
            konfetti(70)
            form.reset()
            setAnliegen(vorauswahl)
        } catch (err) {
            setStatus('fehler')
            setFehler(err.message)
        }
    }

    if (status === 'gesendet')
        return (
            <section className="leadform leadform-danke" id={id} aria-live="polite">
                <p className="leadform-titel">Danke, ist angekommen! 🎉</p>
                <p>Jean meldet sich in der Regel innerhalb von zwei Werktagen per Mail bei dir. Bis dahin: Kaffee trinken, Tool weiterbauen.</p>
                <button type="button" className="button button-small" onClick={() => setStatus('bereit')}>
                    Noch eine Anfrage schicken
                </button>
            </section>
        )

    return (
        <section className="leadform" id={id} aria-labelledby={`${id}-titel`}>
            {/* Sprungziele für Links wie #anfrage-fehler, damit sie auch vor dem Laden von JavaScript ankommen. */}
            {optionen.map(([k]) => (
                <span key={k} id={`${id}-${k}`} />
            ))}
            <div className="leadform-kopf">
                <p className="leadform-titel" id={`${id}-titel`}>
                    {titel || 'Frag Jean direkt ✉️'}
                </p>
                <p>{text || 'Tool vorschlagen, Fehler melden oder einfach eine Frage: Schreib kurz, worum es geht. Antwort kommt persönlich, nicht vom Bot.'}</p>
            </div>
            <form className="leadform-form" onSubmit={senden}>
                <label>
                    <span>{auswahlLabel}</span>
                    <select name="anliegen" value={anliegen} onChange={(e) => setAnliegen(e.target.value)} id={`${id}-anliegen`}>
                        {optionen.map(([k, label]) => (
                            <option key={k} value={k}>
                                {label}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="leadform-zeile">
                    <label>
                        <span>Dein Name</span>
                        <input name="name" type="text" autoComplete="name" id={`${id}-name`} placeholder="Ada Lovelace" />
                    </label>
                    <label>
                        <span>
                            E-Mail <b aria-hidden="true">*</b>
                        </span>
                        <input name="email" type="email" required autoComplete="email" id={`${id}-email`} placeholder="du@firma.de" />
                    </label>
                </div>
                {mitWebsite && (
                    <label>
                        <span>Website oder Tool (optional)</span>
                        <input name="website" type="text" inputMode="url" id={`${id}-website`} placeholder="https://dein-tool.de" />
                    </label>
                )}
                <label>
                    <span>Nachricht</span>
                    <textarea name="nachricht" rows="3" id={`${id}-nachricht`} placeholder="Kurz und knackig reicht völlig." />
                </label>
                <label className="leadform-honig" aria-hidden="true">
                    Bitte leer lassen
                    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" id={`${id}-honig`} />
                </label>
                <label className="leadform-check">
                    <input type="checkbox" name="einwilligung" required id={`${id}-einwilligung`} />
                    <span>
                        Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage per Mail an Jean übermittelt werden (Details in der{' '}
                        <Link href="/datenschutz">Datenschutzerklärung</Link>).
                    </span>
                </label>
                {newsletter && (
                    <label className="leadform-check">
                        <input type="checkbox" name="newsletter" id={`${id}-newsletter`} />
                        <span>Optional: Schick mir auch Jeans Newsletter. Eingetragen wirst du erst, wenn du die Bestätigungsmail anklickst. Abmelden geht jederzeit.</span>
                    </label>
                )}
                <button type="submit" className="button" disabled={status === 'sendet'}>
                    {status === 'sendet' ? 'Wird gesendet …' : 'Anfrage abschicken →'}
                </button>
                {status === 'fehler' && (
                    <p className="leadform-fehler" role="alert">
                        Das hat nicht geklappt ({fehler}). Bitte versuch es gleich noch einmal oder schreib direkt an <span className="leadform-adresse">{CONTACT_EMAIL}</span>.
                    </p>
                )}
            </form>
        </section>
    )
}
