'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useId, useState } from 'react'
import { BREVO_FORM_URL, BREVO_SOURCE_FIELD } from '../../lib/monetization'

// Anmeldung direkt an das Brevo-Formular (Simple HTML, Double-Opt-in macht Brevo), ohne Skript von Brevo.
// Das Formular wird ganz normal in einem neuen Tab abgeschickt: Brevos Antwortseite zeigt dort, ob die
// Anmeldung angenommen oder abgelehnt wurde. Ein fetch mit mode 'no-cors' könnte Ablehnungen nicht erkennen
// und würde Erfolg vortäuschen. Das Formular bleibt sichtbar, damit man es erneut versuchen kann.
// Die Prüfung von Pflichtfeld und E-Mail-Format übernimmt der Browser. email_address_check ist Brevos Honeypot.
export default function BrevoForm({ quelle = 'newsletter', knopf = 'Kostenlos eintragen', kompakt = false }) {
    const pfad = usePathname() || '/'
    const id = useId().replace(/:/g, '')
    const [gesendet, setGesendet] = useState(false)

    function senden(e) {
        if (new FormData(e.currentTarget).get('email_address_check')) {
            e.preventDefault()
            return
        }
        setGesendet(true)
    }

    return (
        <form className={`brevo-form${kompakt ? ' is-kompakt' : ''}`} action={BREVO_FORM_URL} method="post" target="_blank" onSubmit={senden}>
            <div className="brevo-zeile">
                <label htmlFor={`brevo-${id}`} className="sr-only">
                    E-Mail-Adresse
                </label>
                <input id={`brevo-${id}`} name="EMAIL" type="email" required autoComplete="email" placeholder="du@beispiel.de" />
                <button type="submit" className="button">
                    {knopf}
                </button>
            </div>
            <input type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" aria-hidden="true" className="brevo-honig" />
            <input type="hidden" name="locale" value="de" />
            <input type="hidden" name="html_type" value="simple" />
            {BREVO_SOURCE_FIELD && <input type="hidden" name={BREVO_SOURCE_FIELD} value={`${quelle} ${pfad}`} />}
            {gesendet && (
                <p className="brevo-ok" role="status">
                    Fast geschafft: Im neuen Tab siehst du, ob Brevo deine Anmeldung angenommen hat. Dann kommt eine Mail mit Bestätigungslink, erst nach dem Klick darauf bist du eingetragen. Nichts da? Schau im Spam-Ordner nach oder versuch es hier nochmal.
                </p>
            )}
            <p className="brevo-hinweis">
                Du bekommst eine Mail mit Bestätigungslink. Abmelden geht mit einem Klick, Details in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
        </form>
    )
}
