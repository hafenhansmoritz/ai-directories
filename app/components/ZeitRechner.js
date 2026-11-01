'use client'

import { useMemo, useState } from 'react'
import { ABOS } from '../../lib/preise'
import { RechnerStatus, RechnungTeilen, ZahlFeld, useHashZustand } from './RechnerHelfer'

const eur = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })

// Lohnt sich ein KI-Abo? Zeitersparnis gegen Abo-Kosten, sofort gerechnet.
export default function ZeitRechner() {
    const [stunden, setStunden] = useState(10)
    const [prozent, setProzent] = useState(25)
    const [satz, setSatz] = useState(50)
    const [personen, setPersonen] = useState(1)
    const [abo, setAbo] = useState(ABOS[0].id)
    const [eigen, setEigen] = useState(20)
    const [kurs, setKurs] = useState(0.9)

    const r = useMemo(() => {
        const preisUsd = abo === 'eigen' ? eigen : ABOS.find((a) => a.id === abo).preis
        const kostenMonat = preisUsd * kurs * personen
        const gespartStdMonat = stunden * (prozent / 100) * 4.33 * personen
        const wertMonat = gespartStdMonat * satz
        const netto = wertMonat - kostenMonat
        // Ohne Kosten zählt jede gesparte Minute als Gewinn, das Urteil folgt dann dem Gewinn.
        const faktor = kostenMonat > 0 ? wertMonat / kostenMonat : wertMonat > 0 ? Infinity : 0
        const breakEvenMin = satz > 0 ? (kostenMonat / personen / satz / 4.33) * 60 : 0
        return { kostenMonat, gespartStdMonat, wertMonat, netto, faktor, breakEvenMin, jahr: netto * 12 }
    }, [stunden, prozent, satz, personen, abo, eigen, kurs])

    useHashZustand({
        h: { wert: stunden, setzen: setStunden, min: 1, max: 40 },
        p: { wert: prozent, setzen: setProzent, min: 5, max: 60 },
        s: { wert: satz, setzen: setSatz, min: 15, max: 200 },
        t: { wert: personen, setzen: setPersonen, min: 1, max: 25 },
        abo: { wert: abo, setzen: setAbo, text: true, erlaubt: [...ABOS.map((a) => a.id), 'eigen'] },
        e: { wert: eigen, setzen: setEigen, min: 0, max: 10000 },
        k: { wert: kurs, setzen: setKurs, min: 0.5, max: 1.5 },
    })

    const urteil =
        r.faktor >= 5 ? ['🚀', 'Absolut lohnenswert', 'is-top'] : r.faktor >= 1.5 ? ['✅', 'Lohnt sich', 'is-good'] : r.faktor >= 1 ? ['🤏', 'Knapp im Plus', 'is-mid'] : ['🧊', 'Lohnt sich (noch) nicht', 'is-low']

    return (
        <div className="rechner">
            <div className="rechner-input">
                <label>
                    <span>
                        Stunden pro Woche für Texte, Recherche, E-Mails & Co. <b>{stunden} h</b>
                    </span>
                    <input type="range" min="1" max="40" value={stunden} onChange={(e) => setStunden(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Davon spart KI realistisch <b>{prozent} %</b>
                    </span>
                    <input type="range" min="5" max="60" step="5" value={prozent} onChange={(e) => setProzent(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Dein Stundensatz <b>{satz} €</b>
                    </span>
                    <input type="range" min="15" max="200" step="5" value={satz} onChange={(e) => setSatz(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Personen im Team <b>{personen}</b>
                    </span>
                    <input type="range" min="1" max="25" value={personen} onChange={(e) => setPersonen(Number(e.target.value))} />
                </label>
                <div className="rechner-row">
                    <label>
                        <span>KI-Abo</span>
                        <select value={abo} onChange={(e) => setAbo(e.target.value)}>
                            {ABOS.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}: {a.preis} $
                                </option>
                            ))}
                            <option value="eigen">Eigener Preis …</option>
                        </select>
                    </label>
                    {abo === 'eigen' && (
                        <label>
                            <span>Preis in $ pro Monat</span>
                            <ZahlFeld id="zeit-eigen" wert={eigen} setzen={setEigen} min={0} max={10000} step={1} einheit="$" />
                        </label>
                    )}
                    <label>
                        <span>1 $ in €</span>
                        <ZahlFeld id="zeit-kurs" wert={kurs} setzen={setKurs} min={0.5} max={1.5} step={0.01} einheit="€" />
                    </label>
                </div>
            </div>
            <div className={`rechner-output ${urteil[2]}`}>
                <RechnerStatus text={`${urteil[1]}. Gewinn pro Jahr ${eur.format(r.jahr)} Euro.`} />
                <p className="rechner-urteil">
                    <span aria-hidden="true">{urteil[0]}</span> {urteil[1]}
                </p>
                <dl className="rechner-zahlen">
                    <div>
                        <dt>Gesparte Zeit / Monat</dt>
                        <dd>{eur.format(r.gespartStdMonat)} h</dd>
                    </div>
                    <div>
                        <dt>Wert der Zeit / Monat</dt>
                        <dd>{eur.format(r.wertMonat)} €</dd>
                    </div>
                    <div>
                        <dt>Abo-Kosten / Monat</dt>
                        <dd>{eur.format(r.kostenMonat)} €</dd>
                    </div>
                    <div className="rechner-hero">
                        <dt>Gewinn pro Jahr</dt>
                        <dd>{eur.format(r.jahr)} €</dd>
                    </div>
                </dl>
                <div className="rechner-vergleich" aria-hidden="true">
                    <span className="bar-kosten" style={{ width: `${Math.min(100, (r.kostenMonat / Math.max(r.wertMonat, r.kostenMonat, 1)) * 100)}%` }}>
                        Kosten
                    </span>
                    <span className="bar-wert" style={{ width: `${Math.min(100, (r.wertMonat / Math.max(r.wertMonat, r.kostenMonat, 1)) * 100)}%` }}>
                        Nutzen
                    </span>
                </div>
                <p className="rechner-hinweis">
                    Break-even: Schon <strong>{Math.max(1, Math.round(r.breakEvenMin))} Minuten</strong> gesparte Zeit pro Woche und Person bezahlen das Abo.
                    {Number.isFinite(r.faktor) && (
                        <>
                            {' '}
                            Faktor Nutzen/Kosten: <strong>{r.faktor.toFixed(1)}×</strong>.
                        </>
                    )}
                </p>
                <RechnungTeilen titel="Lohnt sich mein KI-Abo?" text={`Meine Rechnung auf AIGeddon: ${urteil[1]}, ${eur.format(r.jahr)} € Gewinn pro Jahr.`} />
            </div>
        </div>
    )
}
