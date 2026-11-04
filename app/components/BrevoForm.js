'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useId, useState } from 'react'
import { BREVO_FORM_URL, BREVO_SOURCE_FIELD } from '../../lib/monetization'

// Anmeldung direkt an das Brevo-Formular (Simple HTML, Double-Opt-in macht Brevo), ohne Skript von Brevo.
// Brevo antwortet mit einer HTML-Seite statt JSON, darum fetch mit mode 'no-cors' (Antwort bleibt unlesbar)
// und danach der Hinweis auf die Bestätigungsmail. Bei Netzwerkfehler schickt das echte Formular die Daten
// in einem neuen Tab ab; ohne JavaScript ebenso. Das Feld email_address_check ist Brevos Honeypot.
export default function BrevoForm({ quelle = 'newsletter', knopf = 'Kostenlos eintragen', kompakt = false }) {
    const pfad = usePathname() || '/'
    const id = useId().replace(/:/g, '')
    const [status, setStatus] = useState('bereit')

    async function senden(e) {
        const form = e.currentTarget
        const daten = new FormData(form)
        e.preventDefault()
        if (daten.get('email_address_check')) return
        setStatus('sendet')
        try {
            await fetch(BREVO_FORM_URL, { method: 'POST', mode: 'no-cors', body: daten })
        } catch {
            // Netzwerk blockiert: normales Absenden als Rückfall, Brevo zeigt dann seine eigene Seite.
            form.submit()
        }
        setStatus('ok')
    }

    if (status === 'ok')
        return (
            <p className="brevo-ok" role="status">
                Fast geschafft: Bitte bestätige den Link in der Mail. Erst nach dem Klick darauf bist du eingetragen. Nichts da? Schau im Spam-Ordner nach.
            </p>
        )

    return (
        <form className={`brevo-form${kompakt ? ' is-kompakt' : ''}`} action={BREVO_FORM_URL} method="post" target="_blank" onSubmit={senden}>
            <div className="brevo-zeile">
                <label htmlFor={`brevo-${id}`} className="sr-only">
                    E-Mail-Adresse
                </label>
                <input id={`brevo-${id}`} name="EMAIL" type="email" required autoComplete="email" placeholder="du@beispiel.de" />
                <button type="submit" className="button" disabled={status === 'sendet'}>
                    {status === 'sendet' ? 'Einen Moment …' : knopf}
                </button>
            </div>
            <input type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" aria-hidden="true" className="brevo-honig" />
            <input type="hidden" name="locale" value="de" />
            <input type="hidden" name="html_type" value="simple" />
            {BREVO_SOURCE_FIELD && <input type="hidden" name={BREVO_SOURCE_FIELD} value={`${quelle} ${pfad}`} />}
            <p className="brevo-hinweis">
                Du bekommst eine Mail mit Bestätigungslink. Abmelden geht mit einem Klick, Details in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
        </form>
    )
}
