'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ABO_PREISE, breakEvenMonate } from '../../lib/abo-preise'
import { RechnerStatus, RechnungTeilen, useHashZustand } from './RechnerHelfer'

const usd = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

// Monatlich oder jährlich zahlen? Nutzungsdauer einstellen, Tools wählen, Ersparnis und Break-even sehen.
export default function AboRechner() {
    const [monate, setMonate] = useState(8)
    const [aktiv, setAktiv] = useState(['claude', 'midjourney'])

    const zeilen = useMemo(
        () =>
            ABO_PREISE.map((a) => {
                const mtl = a.monatlich * monate
                const jhr = a.jaehrlich * 12
                return { ...a, mtl, jhr, besser: jhr < mtl ? 'jährlich' : 'monatlich', diff: Math.abs(mtl - jhr), be: breakEvenMonate(a) }
            }),
        [monate]
    )
    const gewaehlt = zeilen.filter((z) => aktiv.includes(z.slug))
    const summeOptimal = gewaehlt.reduce((s, z) => s + Math.min(z.mtl, z.jhr), 0)
    const summeMonatlich = gewaehlt.reduce((s, z) => s + z.mtl, 0)
    const summeJaehrlich = gewaehlt.reduce((s, z) => s + z.jhr, 0)
    useHashZustand({
        n: { wert: monate, setzen: setMonate, min: 1, max: 12 },
        tools: { wert: aktiv, setzen: setAktiv, liste: true, erlaubt: ABO_PREISE.map((a) => a.slug) },
    })
    const urteilText = gewaehlt.length ? `Bestmöglich: ${usd.format(summeOptimal)} im Jahr` : 'Wähle mindestens ein Tool'
    const toggle = (slug) => setAktiv((x) => (x.includes(slug) ? x.filter((s) => s !== slug) : [...x, slug]))

    return (
        <div className="rechner">
            <div className="rechner-input">
                <label>
                    <span>
                        Wie viele Monate nutzt du die Tools im nächsten Jahr? <b>{monate}</b>
                    </span>
                    <input type="range" min="1" max="12" value={monate} onChange={(e) => setMonate(Number(e.target.value))} />
                </label>
                <fieldset className="abo-tools">
                    <legend>Deine Tools</legend>
                    {ABO_PREISE.map((a) => (
                        <label key={a.slug} className="abo-tool">
                            <input type="checkbox" checked={aktiv.includes(a.slug)} onChange={() => toggle(a.slug)} />
                            <span>
                                {a.name} {a.plan}
                            </span>
                        </label>
                    ))}
                </fieldset>
            </div>
            <div className={`rechner-output ${summeMonatlich - summeOptimal > 0.005 || summeJaehrlich - summeOptimal > 0.005 ? 'is-top' : 'is-good'}`}>
                <RechnerStatus text={urteilText} />
                <p className="rechner-urteil">
                    <span aria-hidden="true">🧾</span> {urteilText}
                </p>
                {gewaehlt.length > 0 && (
                    <dl className="rechner-zahlen">
                        <div>
                            <dt>Alles monatlich ({monate} Monate)</dt>
                            <dd>{usd.format(summeMonatlich)}</dd>
                        </div>
                        <div>
                            <dt>Alles jährlich (12 Monate bezahlt)</dt>
                            <dd>{usd.format(summeJaehrlich)}</dd>
                        </div>
                    </dl>
                )}
                <ul className="abo-liste">
                    {gewaehlt.map((z) => (
                        <li key={z.slug}>
                            <strong>
                                <Link href={`/tools/${z.slug}`}>{z.name}</Link>: {z.besser} zahlen
                            </strong>
                            <span>
                                {z.diff < 0.005 ? 'gleich teuer' : `spart ${usd.format(z.diff)}`} · Jahresabo lohnt sich ab {z.be} Monaten Nutzung
                            </span>
                        </li>
                    ))}
                </ul>
                {gewaehlt.length > 0 && <RechnungTeilen titel="Monatlich oder jährlich?" text={`Meine Abo-Rechnung auf AIGeddon: ${urteilText} bei ${monate} Monaten Nutzung.`} />}
            </div>
        </div>
    )
}
