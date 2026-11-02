'use client'

import { useMemo, useState } from 'react'
import { RechnerStatus, RechnungTeilen, useHashZustand } from './RechnerHelfer'

const fmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 })

// Wie lange dauert der Verzeichnis-Launch? Rechnet mit den echten Zahlen der Liste.
export default function LaunchRechner({ gratis, reibungslos, gesamt }) {
    const [anzahl, setAnzahl] = useState(Math.min(30, reibungslos))
    const [minuten, setMinuten] = useState(8)
    const [proTag, setProTag] = useState(5)
    const [paket, setPaket] = useState(false)

    const r = useMemo(() => {
        const vorbereitung = paket ? 20 : 0
        const proEintrag = paket ? minuten : minuten + 15
        const total = vorbereitung + anzahl * proEintrag
        const tage = Math.ceil(anzahl / Math.max(1, proTag))
        return { total, tage, stunden: total / 60, ersparnis: paket ? anzahl * 15 - 20 : 0 }
    }, [anzahl, minuten, proTag, paket])

    useHashZustand({
        n: { wert: anzahl, setzen: setAnzahl, min: 5, max: gesamt },
        min: { wert: minuten, setzen: setMinuten, min: 3, max: 30 },
        tag: { wert: proTag, setzen: setProTag, min: 1, max: 30 },
        kit: { wert: paket, setzen: setPaket, janein: true },
    })
    const zusammenfassung = `${anzahl} Verzeichnisse: ${fmt.format(r.stunden)} Stunden Arbeit in ${r.tage} Tagen.`

    return (
        <div className="rechner">
            <div className="rechner-input">
                <label>
                    <span>
                        Wie viele Verzeichnisse? <b>{anzahl}</b>
                    </span>
                    <input type="range" min="5" max={gesamt} value={anzahl} onChange={(e) => setAnzahl(Number(e.target.value))} />
                    <small>
                        {gratis} kostenlos, davon {reibungslos} mit reibungsloser Einreichung.
                    </small>
                </label>
                <label>
                    <span>
                        Minuten pro Eintrag (Formular ausfüllen) <b>{minuten} min</b>
                    </span>
                    <input type="range" min="3" max="30" value={minuten} onChange={(e) => setMinuten(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Einträge pro Tag <b>{proTag}</b>
                    </span>
                    <input type="range" min="1" max="30" value={proTag} onChange={(e) => setProTag(Number(e.target.value))} />
                </label>
                <label className="rechner-check">
                    <input type="checkbox" checked={paket} onChange={(e) => setPaket(e.target.checked)} /> Texte vorher einmal mit dem Launch-Kit vorbereitet
                </label>
            </div>
            <div className="rechner-output is-good">
                <RechnerStatus text={zusammenfassung} />
                <p className="rechner-urteil">
                    <span aria-hidden="true">🗓️</span> Dein Launch-Plan
                </p>
                <dl className="rechner-zahlen">
                    <div>
                        <dt>Arbeitszeit gesamt</dt>
                        <dd>{fmt.format(r.stunden)} h</dd>
                    </div>
                    <div>
                        <dt>Dauer</dt>
                        <dd>{r.tage} Tage</dd>
                    </div>
                    <div className="rechner-hero">
                        <dt>{paket ? 'Gespart durch Vorbereitung' : 'Mit Vorbereitung sparst du'}</dt>
                        <dd>{fmt.format((paket ? r.ersparnis : anzahl * 15 - 20) / 60)} h</dd>
                    </div>
                </dl>
                <p className="rechner-hinweis">Annahme: Ohne vorbereitete Texte kostet jeder Eintrag rund 15 Minuten extra fürs Formulieren; die Vorbereitung dauert einmalig etwa 20 Minuten.</p>
                <RechnungTeilen titel="Mein Launch-Plan" text={`Mein Launch-Plan laut mentat.codes: ${zusammenfassung}`} />
            </div>
        </div>
    )
}
