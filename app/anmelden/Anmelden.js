'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useKonto from '../components/useKonto'
import { KONTO_AKTIV, supabase, anmeldeZiel } from '../../lib/konto'
import { lies, schreib } from '../../lib/herz'

// Anmelden und Registrieren in einem: Wer noch kein Konto hat, bekommt mit dem ersten Link eins.
// Nur Pfade auf dieser Seite: kein Protokoll, keine fremde Domain, keine Backslashes (Browser lesen einen Backslash wie /).
const sichererPfad = (p) => {
    if (!p || !/^\/[a-zA-Z0-9/_.?=&%#-]*$/.test(p) || p.startsWith('//') || /%5c|%2f%2f/i.test(p)) return '/konto'
    try {
        return new URL(p, window.location.origin).origin === window.location.origin ? p : '/konto'
    } catch {
        return '/konto'
    }
}

export default function Anmelden() {
    const router = useRouter()
    const { bereit, user } = useKonto()
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('bereit')
    const [fehler, setFehler] = useState('')
    const [zurueck, setZurueck] = useState('/konto')

    useEffect(() => {
        const q = new URLSearchParams(window.location.search)
        setZurueck(sichererPfad(q.get('zurueck')))
        const f = q.get('error_description')
        if (f) setFehler('Der Anmeldelink war ungültig oder abgelaufen. Fordere einfach einen neuen an.')
    }, [])

    // Nach dem Klick auf den Link: angemeldet, gewünschte Einwilligungen übernehmen, weiter.
    useEffect(() => {
        if (!user) return
        // Gewünschte Einwilligungen gelten nur für genau die Adresse, an die der Link ging, und nur 1 Stunde.
        const wunsch = lies('mentat-einwilligung-wunsch')
        if (wunsch) {
            const passt = wunsch.email && user.email && wunsch.email === user.email.toLowerCase() && Date.now() - (wunsch.zeit || 0) < 3600000
            schreib('mentat-einwilligung-wunsch', null)
            if (passt) {
                supabase().then(async (sb) => {
                    if (wunsch.regeln) await sb.rpc('regeln_akzeptieren')
                    if (wunsch.newsletter || wunsch.angebote)
                        await sb.from('konten').update({ newsletter: Boolean(wunsch.newsletter), angebote: Boolean(wunsch.angebote) }).eq('id', user.id)
                })
            }
        }
        const t = setTimeout(() => router.replace(zurueck), 900)
        return () => clearTimeout(t)
    }, [user, zurueck, router])

    if (!KONTO_AKTIV) return <p className="lead">Konten sind gerade noch in Vorbereitung. Schau bald wieder vorbei!</p>
    if (!bereit) return <p className="widget-note">Einen Moment …</p>
    if (user)
        return (
            <p className="konto-ok">
                ✅ Du bist angemeldet. Weiter geht es zu <Link href={zurueck}>deiner Seite</Link>.
            </p>
        )

    const senden = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        setFehler('')
        setStatus('sendet')
        schreib('mentat-einwilligung-wunsch', {
            email: email.trim().toLowerCase(),
            zeit: Date.now(),
            regeln: form.get('regeln') === 'on',
            newsletter: form.get('newsletter') === 'on',
            angebote: form.get('angebote') === 'on',
        })
        const sb = await supabase()
        const { error } = await sb.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: anmeldeZiel(zurueck), shouldCreateUser: true } })
        if (error) {
            schreib('mentat-einwilligung-wunsch', null)
            setStatus('bereit')
            setFehler(
                error.status === 429
                    ? 'Gerade wurden zu viele Links verschickt. Bitte warte ein paar Minuten und versuch es dann noch einmal.'
                    : 'Das hat nicht geklappt. Prüf bitte deine E-Mail-Adresse und versuch es erneut.'
            )
            return
        }
        setStatus('gesendet')
    }

    if (status === 'gesendet')
        return (
            <div className="konto-karte konto-ok" aria-live="polite">
                <p className="konto-gross">📬 Schau in dein Postfach!</p>
                <p>
                    Wir haben dir einen Anmeldelink an <strong>{email}</strong> geschickt. Klick ihn im selben Browser an, dann bist du drin. Kein
                    Passwort, nichts zu merken.
                </p>
                <p className="widget-note">Nichts angekommen? Schau im Spam-Ordner nach oder fordere in einer Minute einen neuen Link an.</p>
                <button type="button" className="button button-small" onClick={() => setStatus('bereit')}>
                    Andere Adresse verwenden
                </button>
            </div>
        )

    return (
        <form className="konto-karte konto-formular" onSubmit={senden}>
            <label htmlFor="anmelden-email">Deine E-Mail-Adresse</label>
            <input
                id="anmelden-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
            />
            <label className="konto-check">
                <input type="checkbox" name="regeln" required /> Ich akzeptiere die <Link href="/community-regeln">Community-Regeln</Link> und habe
                die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen.
            </label>
            <label className="konto-check">
                <input type="checkbox" name="newsletter" /> Schick mir gern den Newsletter mit neuen KI-Tools und Deals (jederzeit abbestellbar).
            </label>
            <label className="konto-check">
                <input type="checkbox" name="angebote" /> Ich möchte persönliche Empfehlungen passend zu meinen gespeicherten Tools bekommen.
            </label>
            {fehler && (
                <p className="konto-fehler" role="alert">
                    {fehler}
                </p>
            )}
            <button type="submit" className="button" disabled={status === 'sendet'}>
                {status === 'sendet' ? 'Link wird verschickt …' : 'Anmeldelink schicken ✉️'}
            </button>
            <p className="widget-note">Neu hier? Mit dem ersten Link legst du automatisch ein kostenloses Konto an.</p>
        </form>
    )
}
