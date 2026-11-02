'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LEAD_ENDPOINT } from '../../lib/monetization'
import { withBase } from '../../lib/site'
import konfetti from '../../lib/konfetti'

// Download gegen E-Mail: Die Adresse geht per FormSubmit an Jean, danach erscheint der Download.
// Wer sich einmal eingetragen hat, bekommt weitere Guides auf diesem Gerät ohne erneutes Formular.
const SPEICHER = 'mentat-guides'

export default function GuideGate({ guide, kompakt = false }) {
    const [status, setStatus] = useState('bereit')
    const [fehler, setFehler] = useState('')
    const formId = `guide-${guide.id}${kompakt ? '-k' : ''}`

    useEffect(() => {
        try {
            if (localStorage.getItem(SPEICHER)) setStatus('frei')
        } catch {}
    }, [])

    async function senden(e) {
        e.preventDefault()
        const daten = Object.fromEntries(new FormData(e.currentTarget).entries())
        if (daten._honey) return
        setStatus('sendet')
        setFehler('')
        try {
            const r = await fetch(LEAD_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    email: daten.email,
                    name: daten.name || '(ohne Namen)',
                    guide: guide.titel,
                    news: daten.news ? 'ja, möchte Neuigkeiten per Mail' : 'nein',
                    seite: window.location.href,
                    _subject: `mentat.codes-Guide: ${guide.titel}`,
                    _replyto: daten.email,
                    _template: 'table',
                    _captcha: 'false',
                }),
            })
            const antwort = await r.json().catch(() => ({}))
            if (!r.ok || antwort.success === false || antwort.success === 'false') throw new Error(antwort.message || `Status ${r.status}`)
            try {
                localStorage.setItem(SPEICHER, '1')
            } catch {}
            setStatus('frei')
            konfetti(60)
        } catch (err) {
            setStatus('fehler')
            setFehler(err.message)
        }
    }

    if (status === 'frei')
        return (
            <div className="guide-frei" aria-live="polite">
                <a className="button" href={withBase(guide.datei)} download>
                    PDF herunterladen ⬇
                </a>
                <span> Viel Spaß beim Lesen! 🎉</span>
            </div>
        )

    return (
        <form className="leadform-form guide-form" onSubmit={senden} aria-label={`Guide anfordern: ${guide.titel}`}>
            <div className="leadform-zeile">
                <label>
                    <span>
                        E-Mail <b aria-hidden="true">*</b>
                    </span>
                    <input name="email" type="email" required autoComplete="email" id={`${formId}-email`} placeholder="du@firma.de" />
                </label>
                {!kompakt && (
                    <label>
                        <span>Vorname (optional)</span>
                        <input name="name" type="text" autoComplete="given-name" id={`${formId}-name`} placeholder="Ada" />
                    </label>
                )}
            </div>
            <label className="leadform-honig" aria-hidden="true">
                Bitte leer lassen
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" id={`${formId}-honig`} />
            </label>
            <label className="leadform-check">
                <input type="checkbox" name="einwilligung" required id={`${formId}-einwilligung`} />
                <span>
                    Ich bin einverstanden, dass meine E-Mail-Adresse für den Download an Jean übermittelt wird (Details in der <Link href="/datenschutz">Datenschutzerklärung</Link>).
                </span>
            </label>
            <label className="leadform-check">
                <input type="checkbox" name="news" id={`${formId}-news`} />
                <span>Optional: Schick mir gelegentlich neue Guides und KI-News per Mail. Abmelden geht jederzeit.</span>
            </label>
            <button type="submit" className="button" disabled={status === 'sendet'}>
                {status === 'sendet' ? 'Einen Moment …' : 'Guide gratis holen'}
            </button>
            {status === 'fehler' && (
                <p className="leadform-fehler" role="alert">
                    Das hat nicht geklappt ({fehler}). Versuch es bitte noch einmal.
                </p>
            )}
        </form>
    )
}
