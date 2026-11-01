'use client'

import { useMemo, useState } from 'react'
import { API_MODELLE } from '../../lib/preise'
import { RechnerStatus, RechnungTeilen, ZahlFeld, useHashZustand } from './RechnerHelfer'

// Regler für Anfragen pro Tag logarithmisch (10 bis 100.000), damit kleine Werte genauso gut treffbar sind wie große.
const LOG_MIN = 1
const LOG_MAX = 5
const ausRegler = (pos) => {
    const roh = 10 ** (LOG_MIN + ((LOG_MAX - LOG_MIN) * pos) / 1000)
    const stufe = roh < 100 ? 1 : roh < 1000 ? 10 : roh < 10000 ? 100 : 1000
    return Math.round(roh / stufe) * stufe
}
const zuRegler = (wert) => Math.round(((Math.log10(Math.max(10, wert)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 1000)

const usd = (v) => `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: v < 0.01 ? 4 : v < 1 ? 3 : 2 }).format(v)} $`

// Was kostet meine KI-Anwendung über die API? Alle Modelle auf einen Blick, sortiert nach Preis.
export default function ApiRechner() {
    const [anfragen, setAnfragen] = useState(1000)
    const [input, setInput] = useState(1500)
    const [output, setOutput] = useState(500)
    const [text, setText] = useState('')
    const [auswahl, setAuswahl] = useState(API_MODELLE.map((m) => m.id))

    const geschaetzt = text.trim() ? Math.round(text.trim().length / 3.5) : null

    const liste = useMemo(() => {
        const inp = geschaetzt ?? input
        return API_MODELLE.filter((m) => auswahl.includes(m.id))
            .map((m) => {
                const proAnfrage = (inp * m.input + output * m.output) / 1e6
                return { ...m, proAnfrage, tag: proAnfrage * anfragen, monat: proAnfrage * anfragen * 30 }
            })
            .sort((a, b) => a.monat - b.monat)
    }, [anfragen, input, output, auswahl, geschaetzt])

    const max = Math.max(...liste.map((m) => m.monat), 0.0001)
    const toggle = (id) => setAuswahl((a) => (a.includes(id) ? (a.length > 1 ? a.filter((x) => x !== id) : a) : [...a, id]))

    useHashZustand({
        n: { wert: anfragen, setzen: setAnfragen, min: 10, max: 100000 },
        in: { wert: input, setzen: setInput, min: 50, max: 50000 },
        out: { wert: output, setzen: setOutput, min: 50, max: 8000 },
        m: { wert: auswahl, setzen: setAuswahl, liste: true, erlaubt: API_MODELLE.map((m) => m.id) },
    })

    const guenstigstes = liste[0]
    const zahlDe = (v) => new Intl.NumberFormat('de-DE').format(v)
    const ansage = guenstigstes ? `Günstigstes Modell: ${guenstigstes.name}, ${usd(guenstigstes.monat)} pro Monat.` : ''
    const teilText = guenstigstes
        ? `Meine API-Kosten laut AIGeddon-Rechner: ${zahlDe(anfragen)} Anfragen pro Tag, am günstigsten ${guenstigstes.name} mit ${usd(guenstigstes.monat)} pro Monat.`
        : 'Mein API-Kostenvergleich auf AIGeddon'

    return (
        <div className="rechner">
            <div className="rechner-input">
                <div className="e-rechner-feld">
                    <label htmlFor="api-anfragen-regler">
                        <span>
                            Anfragen pro Tag <b>{zahlDe(anfragen)}</b>
                        </span>
                    </label>
                    <div className="e-regler-zeile">
                        <input
                            id="api-anfragen-regler"
                            type="range"
                            min="0"
                            max="1000"
                            value={zuRegler(anfragen)}
                            aria-valuetext={`${zahlDe(anfragen)} Anfragen pro Tag`}
                            onChange={(e) => setAnfragen(ausRegler(Number(e.target.value)))}
                        />
                        <ZahlFeld id="api-anfragen" wert={anfragen} setzen={setAnfragen} min={10} max={100000} label="Anfragen pro Tag als Zahl" />
                    </div>
                </div>
                <div className="e-rechner-feld">
                    <label htmlFor="api-input-regler">
                        <span>
                            Input-Tokens pro Anfrage <b>{geschaetzt ? `${zahlDe(geschaetzt)} (aus Text geschätzt)` : zahlDe(input)}</b>
                        </span>
                    </label>
                    <div className="e-regler-zeile">
                        <input id="api-input-regler" type="range" min="50" max="50000" step="50" value={input} disabled={Boolean(geschaetzt)} onChange={(e) => setInput(Number(e.target.value))} />
                        <ZahlFeld id="api-input" wert={input} setzen={setInput} min={50} max={50000} disabled={Boolean(geschaetzt)} label="Input-Tokens pro Anfrage als Zahl" />
                    </div>
                </div>
                <div className="e-rechner-feld">
                    <label htmlFor="api-output-regler">
                        <span>
                            Output-Tokens pro Anfrage <b>{zahlDe(output)}</b>
                        </span>
                    </label>
                    <div className="e-regler-zeile">
                        <input id="api-output-regler" type="range" min="50" max="8000" step="50" value={output} onChange={(e) => setOutput(Number(e.target.value))} />
                        <ZahlFeld id="api-output" wert={output} setzen={setOutput} min={50} max={8000} label="Output-Tokens pro Anfrage als Zahl" />
                    </div>
                </div>
                <label>
                    <span>Oder Beispiel-Prompt einfügen (Tokens werden geschätzt)</span>
                    <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Dein typischer Prompt samt Kontext …" />
                </label>
                <div className="kb-chips" role="group" aria-label="Modelle">
                    {API_MODELLE.map((m) => (
                        <button key={m.id} type="button" className={auswahl.includes(m.id) ? 'is-active' : ''} onClick={() => toggle(m.id)} aria-pressed={auswahl.includes(m.id)}>
                            {m.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="rechner-output">
                <RechnerStatus text={ansage} />
                <p className="rechner-urteil">
                    <span aria-hidden="true">💸</span> Kosten pro Monat (30 Tage)
                </p>
                <ol className="api-liste">
                    {liste.map((m, i) => (
                        <li key={m.id}>
                            <span className="api-name">
                                {i === 0 ? '🥇 ' : ''}
                                {m.name}
                                <small>{m.anbieter}</small>
                            </span>
                            <span className="api-bar">
                                <span style={{ width: `${Math.max(2, (m.monat / max) * 100)}%` }} />
                            </span>
                            <span className="api-preis">
                                {usd(m.monat)}
                                <small>{usd(m.proAnfrage)} / Anfrage</small>
                            </span>
                        </li>
                    ))}
                </ol>
                <p className="rechner-hinweis">Standardpreise ohne Caching und Batch (Batch spart bei vielen Anbietern 50 %). Tokens aus Text: grobe Schätzung, 1 Token ≈ 3,5 Zeichen auf Deutsch.</p>
                <RechnungTeilen titel="Meine API-Kosten" text={teilText} />
            </div>
        </div>
    )
}
