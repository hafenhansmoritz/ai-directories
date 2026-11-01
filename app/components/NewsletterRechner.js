'use client'

import { useMemo, useState } from 'react'
import { RechnerStatus, RechnungTeilen, useHashZustand } from './RechnerHelfer'

const fmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })

// Was bringt ein Newsletter? Abonnenten, Öffnungen, Klicks und Abschlüsse bis zum Umsatz.
export default function NewsletterRechner() {
    const [abos, setAbos] = useState(1000)
    const [oeffnung, setOeffnung] = useState(40)
    const [klick, setKlick] = useState(4)
    const [abschluss, setAbschluss] = useState(3)
    const [wert, setWert] = useState(30)
    const [ausgaben, setAusgaben] = useState(4)

    const r = useMemo(() => {
        const geoeffnet = abos * (oeffnung / 100)
        const klicks = abos * (klick / 100)
        const kaeufe = klicks * (abschluss / 100)
        const proAusgabe = kaeufe * wert
        return { geoeffnet, klicks, kaeufe, proAusgabe, monat: proAusgabe * ausgaben, proAbo: abos ? (proAusgabe * ausgaben * 12) / abos : 0 }
    }, [abos, oeffnung, klick, abschluss, wert, ausgaben])

    const max = Math.max(abos, 1)

    useHashZustand({
        abos: { wert: abos, setzen: setAbos, min: 100, max: 50000 },
        oeff: { wert: oeffnung, setzen: setOeffnung, min: 10, max: 80 },
        klick: { wert: klick, setzen: setKlick, min: 0.5, max: 20 },
        kauf: { wert: abschluss, setzen: setAbschluss, min: 0.5, max: 20 },
        wert: { wert, setzen: setWert, min: 1, max: 500 },
        ausg: { wert: ausgaben, setzen: setAusgaben, min: 1, max: 12 },
    })
    const zusammenfassung = `Ertrag pro Monat ${fmt.format(r.monat)} Euro bei ${fmt.format(abos)} Abonnenten.`

    return (
        <div className="rechner">
            <div className="rechner-input">
                <label>
                    <span>
                        Abonnenten <b>{fmt.format(abos)}</b>
                    </span>
                    <input type="range" min="100" max="50000" step="100" value={abos} onChange={(e) => setAbos(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Öffnungsrate <b>{oeffnung} %</b>
                    </span>
                    <input type="range" min="10" max="80" value={oeffnung} onChange={(e) => setOeffnung(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Klickrate (Anteil aller Empfänger) <b>{klick} %</b>
                    </span>
                    <input type="range" min="0.5" max="20" step="0.5" value={klick} onChange={(e) => setKlick(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Abschlussrate nach dem Klick <b>{abschluss} %</b>
                    </span>
                    <input type="range" min="0.5" max="20" step="0.5" value={abschluss} onChange={(e) => setAbschluss(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Ertrag pro Abschluss (Preis oder Provision) <b>{wert} €</b>
                    </span>
                    <input type="range" min="1" max="500" value={wert} onChange={(e) => setWert(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Ausgaben pro Monat <b>{ausgaben}</b>
                    </span>
                    <input type="range" min="1" max="12" value={ausgaben} onChange={(e) => setAusgaben(Number(e.target.value))} />
                </label>
            </div>
            <div className="rechner-output is-good">
                <RechnerStatus text={zusammenfassung} />
                <p className="rechner-urteil">
                    <span aria-hidden="true">📬</span> Dein Newsletter-Trichter
                </p>
                <ol className="trichter">
                    {[
                        ['Abonnenten', abos],
                        ['öffnen', r.geoeffnet],
                        ['klicken', r.klicks],
                        ['kaufen', r.kaeufe],
                    ].map(([label, n]) => (
                        <li key={label} style={{ '--w': `${Math.max(8, (n / max) * 100)}%` }}>
                            <span>{fmt.format(n)}</span> {label}
                        </li>
                    ))}
                </ol>
                <dl className="rechner-zahlen">
                    <div>
                        <dt>Ertrag pro Ausgabe</dt>
                        <dd>{fmt.format(r.proAusgabe)} €</dd>
                    </div>
                    <div>
                        <dt>Wert je Abonnent und Jahr</dt>
                        <dd>{r.proAbo.toLocaleString('de-DE', { maximumFractionDigits: 2 })} €</dd>
                    </div>
                    <div className="rechner-hero">
                        <dt>Ertrag pro Monat</dt>
                        <dd>{fmt.format(r.monat)} €</dd>
                    </div>
                </dl>
                <p className="rechner-hinweis">Alle Raten sind deine Annahmen. Starte konservativ und ersetze sie nach den ersten Ausgaben durch echte Zahlen aus deinem Newsletter-Tool.</p>
                <RechnungTeilen titel="Was bringt mein Newsletter?" text={`Meine Newsletter-Rechnung auf AIGeddon: ${zusammenfassung}`} />
            </div>
        </div>
    )
}
