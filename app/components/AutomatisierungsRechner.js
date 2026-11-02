'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { RechnerStatus, RechnungTeilen, useHashZustand } from './RechnerHelfer'

const fmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 })

// Lohnt sich die Automatisierung? Handarbeit pro Jahr gegen den Einstiegspreis der Tools.
export default function AutomatisierungsRechner({ tools }) {
    const [minuten, setMinuten] = useState(10)
    const [proWoche, setProWoche] = useState(20)
    const [satz, setSatz] = useState(40)
    const [bau, setBau] = useState(3)

    const r = useMemo(() => {
        const stundenJahr = (minuten * proWoche * 52) / 60
        const wertJahr = stundenJahr * satz
        const bauKosten = bau * satz
        return { stundenJahr, wertJahr, bauKosten, wochenBisPlus: wertJahr > 0 ? Math.ceil(bauKosten / (wertJahr / 52)) : 0 }
    }, [minuten, proWoche, satz, bau])

    useHashZustand({
        min: { wert: minuten, setzen: setMinuten, min: 1, max: 60 },
        w: { wert: proWoche, setzen: setProWoche, min: 1, max: 200 },
        s: { wert: satz, setzen: setSatz, min: 15, max: 150 },
        bau: { wert: bau, setzen: setBau, min: 1, max: 40 },
    })
    const urteil = r.wochenBisPlus <= 8 ? 'Sofort automatisieren' : r.wochenBisPlus <= 26 ? 'Lohnt sich' : 'Erst später angehen'

    return (
        <div className="rechner">
            <div className="rechner-input">
                <label>
                    <span>
                        Minuten pro Durchlauf von Hand <b>{minuten} min</b>
                    </span>
                    <input type="range" min="1" max="60" value={minuten} onChange={(e) => setMinuten(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Durchläufe pro Woche <b>{proWoche}</b>
                    </span>
                    <input type="range" min="1" max="200" value={proWoche} onChange={(e) => setProWoche(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Stundensatz <b>{satz} €</b>
                    </span>
                    <input type="range" min="15" max="150" step="5" value={satz} onChange={(e) => setSatz(Number(e.target.value))} />
                </label>
                <label>
                    <span>
                        Stunden, um die Automatisierung zu bauen <b>{bau} h</b>
                    </span>
                    <input type="range" min="1" max="40" value={bau} onChange={(e) => setBau(Number(e.target.value))} />
                </label>
            </div>
            <div className={`rechner-output ${r.wertJahr > r.bauKosten * 3 ? 'is-top' : 'is-good'}`}>
                <RechnerStatus text={`${urteil}. Bezahlt nach rund ${r.wochenBisPlus} Wochen.`} />
                <p className="rechner-urteil">
                    <span aria-hidden="true">⚙️</span> {urteil}
                </p>
                <dl className="rechner-zahlen">
                    <div>
                        <dt>Handarbeit pro Jahr</dt>
                        <dd>{fmt.format(r.stundenJahr)} h</dd>
                    </div>
                    <div>
                        <dt>Aufbau einmalig</dt>
                        <dd>{fmt.format(r.bauKosten)} €</dd>
                    </div>
                    <div className="rechner-hero">
                        <dt>Wert der gesparten Zeit pro Jahr</dt>
                        <dd>{fmt.format(r.wertJahr)} €</dd>
                    </div>
                </dl>
                <p className="rechner-hinweis">
                    Der Aufbau hat sich nach rund <strong>{r.wochenBisPlus} Wochen</strong> bezahlt gemacht, die laufenden Tool-Kosten noch nicht eingerechnet.
                </p>
                <RechnungTeilen titel="Lohnt sich die Automatisierung?" text={`Meine Rechnung auf mentat.codes: ${urteil}, ${fmt.format(r.stundenJahr)} Stunden Handarbeit pro Jahr, bezahlt nach rund ${r.wochenBisPlus} Wochen.`} />
                <p className="send-to-ai-label">Einstiegspreise laut Anbieter</p>
                <ul className="rechner-tools">
                    {tools.map((t) => (
                        <li key={t.slug}>
                            <Link href={`/tools/${t.slug}`}>{t.name}</Link>: {t.free_plan ? 'Gratis-Tarif, ' : ''}bezahlt ab {t.price_from}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
