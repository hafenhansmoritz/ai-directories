'use client'

import { useEffect, useState } from 'react'
import { lies, schreib, toast, setzeRuhe, kuerzelAus, setzeKuerzel } from '../../lib/herz'

// Farbwahl, Ruhe-Modus, Tastenkürzel-Schalter und ein Gruß zum Wochentag im Footer.
const FARBEN = [
    ['', 'Cyan', '#0369a1'],
    ['blau', 'Kobalt', '#1d4ed8'],
    ['gruen', 'Terminal-Grün', '#0f7a4a'],
    ['lila', 'Violett', '#6d28d9'],
]
const WOCHE = [
    'Schönen Sonntag! Heute darf die KI auch mal Pause machen.',
    'Guten Start in die Woche! Montag ist nur ein Wort.',
    'Dienstag: der Tag, an dem Pläne Wirklichkeit werden.',
    'Bergfest! Die Hälfte der Woche hast du geschafft.',
    'Donnerstag: fast Wochenende, also fast perfekt.',
    'Freitag! Zeit, etwas zu veröffentlichen und stolz zu sein.',
    'Samstag: der beste Tag für Herzensprojekte.',
]

export default function FooterExtras() {
    const [akzent, setAkzent] = useState('')
    const [still, setStill] = useState(false)
    const [gruss, setGruss] = useState('')
    const [kuerzel, setKuerzel] = useState(true)

    useEffect(() => {
        setAkzent(lies('mentat-akzent', '') || '')
        setStill(Boolean(lies('mentat-ruhig')))
        setKuerzel(!kuerzelAus())
        setGruss(WOCHE[new Date().getDay()])
        // Andere Schalter (Kopfzeile, Tastenkürzel-Hilfe) melden ihre Änderungen.
        const ruheWechsel = (e) => setStill(e.detail.an)
        const kuerzelWechsel = (e) => setKuerzel(e.detail.an)
        window.addEventListener('mentat-ruhe', ruheWechsel)
        window.addEventListener('mentat-kuerzel', kuerzelWechsel)
        return () => {
            window.removeEventListener('mentat-ruhe', ruheWechsel)
            window.removeEventListener('mentat-kuerzel', kuerzelWechsel)
        }
    }, [])

    const farbe = (wert, name) => {
        setAkzent(wert)
        schreib('mentat-akzent', wert)
        if (wert) document.documentElement.dataset.akzent = wert
        else delete document.documentElement.dataset.akzent
        toast(`Neue Lieblingsfarbe: ${name}. Steht dir!`, '🎨')
    }
    const ruhe = () => {
        const neu = !still
        setStill(neu)
        setzeRuhe(neu)
        toast(neu ? 'Ruhe-Modus an: keine Animationen, kein Konfetti.' : 'Ruhe-Modus aus. Es darf wieder wackeln.', neu ? '🌙' : '✨')
    }

    return (
        <div className="footer-extras">
            {gruss && (
                <p className="footer-woche">
                    <span aria-hidden="true">🗓️</span> {gruss}
                </p>
            )}
            <div className="footer-regler">
                <span id="farbwahl-label">Deine Farbe:</span>
                <div className="farbwahl" role="group" aria-labelledby="farbwahl-label">
                    {FARBEN.map(([wert, name, hex]) => (
                        <button
                            key={name}
                            type="button"
                            className={`farb-punkt${akzent === wert ? ' an' : ''}`}
                            style={{ background: hex }}
                            aria-pressed={akzent === wert}
                            aria-label={`Akzentfarbe ${name}`}
                            title={name}
                            onClick={() => farbe(wert, name)}
                        />
                    ))}
                </div>
                <button type="button" className="ruhe-knopf" aria-pressed={still} onClick={ruhe}>
                    <span aria-hidden="true">{still ? '🌙' : '✨'}</span> {still ? 'Ruhe-Modus an' : 'Ruhe-Modus'}
                </button>
                <button type="button" className="ruhe-knopf" onClick={() => window.dispatchEvent(new CustomEvent('mentat-kuerzel-hilfe'))}>
                    <span aria-hidden="true">⌨️</span> Tastenkürzel{kuerzel ? ' (?)' : ''}
                </button>
                <button type="button" className="ruhe-knopf" onClick={() => setzeKuerzel(!kuerzel)}>
                    {kuerzel ? 'Tastenkürzel ausschalten' : 'Tastenkürzel einschalten'}
                </button>
            </div>
        </div>
    )
}
