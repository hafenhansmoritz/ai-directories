'use client'

import { useMemo, useState } from 'react'
import SendToAI from './SendToAI'
import { RechnerStatus } from './RechnerHelfer'

const FORMATE = ['Fließtext', 'Stichpunkte', 'Tabelle', 'Schritt-für-Schritt-Anleitung', 'E-Mail', 'Social-Media-Post', 'Code mit Erklärung', 'JSON']
const TOENE = ['sachlich', 'locker und direkt', 'freundlich', 'überzeugend', 'humorvoll', 'wie ein Lehrer', 'kritisch']

// Gewicht je Baustein für den Prompt-Score (Summe 100). Aufgabe zählt am meisten, ohne sie geht nichts.
const GEWICHTE = { aufgabe: 30, rolle: 10, kontext: 15, zielgruppe: 10, format: 10, ton: 5, laenge: 5, beispiel: 5, extras: 10 }

const TIPPS = {
    aufgabe: 'Beschreibe die Aufgabe mit einem Verb am Anfang: „Schreibe“, „Vergleiche“, „Erstelle“.',
    rolle: 'Gib der KI eine Fachrolle, z. B. „erfahrener SEO-Stratege“.',
    kontext: 'Nenne Hintergrund und Ziel: Wofür brauchst du das Ergebnis?',
    zielgruppe: 'Für wen ist das Ergebnis? Anfänger und Profis brauchen andere Antworten.',
    format: 'Leg das Ausgabeformat fest, dann musst du nicht umformatieren.',
    ton: 'Ein Ton verhindert den typischen Einheits-Klang.',
    laenge: 'Ohne Längenangabe wird es meist zu lang.',
    beispiel: 'Ein Beispiel zeigt Stil und Niveau besser als jede Beschreibung.',
    extras: 'Rückfragen, Schritt für Schritt oder Selbstkritik heben die Qualität spürbar.',
}

export default function PromptBaukasten() {
    const [v, setV] = useState({ rolle: '', aufgabe: '', kontext: '', zielgruppe: '', format: '', ton: '', laenge: '', beispiel: '' })
    const [x, setX] = useState({ rueckfragen: true, schritte: false, kritik: false, quellen: false })
    const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
    const toggle = (k) => () => setX({ ...x, [k]: !x[k] })

    const prompt = useMemo(() => {
        const t = (s) => s.trim()
        const teile = []
        if (t(v.rolle)) teile.push(`Du bist ${t(v.rolle)}.`)
        teile.push(`Aufgabe: ${t(v.aufgabe) || '[BESCHREIBE DEINE AUFGABE]'}`)
        if (t(v.kontext)) teile.push(`Kontext: ${t(v.kontext)}`)
        if (t(v.zielgruppe)) teile.push(`Zielgruppe: ${t(v.zielgruppe)}`)
        const form = [v.format && `Format: ${v.format}`, v.ton && `Ton: ${v.ton}`, t(v.laenge) && `Länge: ${t(v.laenge)}`].filter(Boolean)
        if (form.length) teile.push(form.join('\n'))
        if (t(v.beispiel)) teile.push(`Orientiere dich an diesem Beispiel für Stil und Niveau:\n"""\n${t(v.beispiel)}\n"""`)
        const regeln = []
        if (x.schritte) regeln.push('Geh Schritt für Schritt vor und zeige die Zwischenschritte kurz.')
        if (x.quellen) regeln.push('Erfinde keine Fakten, Zahlen oder Quellen. Markiere Unsicheres ausdrücklich.')
        if (x.kritik) regeln.push('Prüfe dein Ergebnis zum Schluss gegen die Aufgabe und verbessere es, bevor du antwortest.')
        if (x.rueckfragen) regeln.push('Wenn dir wichtige Informationen fehlen, stell mir zuerst bis zu 3 Rückfragen und warte auf meine Antwort.')
        if (regeln.length) teile.push(regeln.join('\n'))
        return teile.join('\n\n')
    }, [v, x])

    const erfuellt = {
        aufgabe: v.aufgabe.trim().length >= 15,
        rolle: Boolean(v.rolle.trim()),
        kontext: v.kontext.trim().length >= 15,
        zielgruppe: Boolean(v.zielgruppe.trim()),
        format: Boolean(v.format),
        ton: Boolean(v.ton),
        laenge: Boolean(v.laenge.trim()),
        beispiel: Boolean(v.beispiel.trim()),
        extras: Object.values(x).filter(Boolean).length >= 2,
    }
    const score = Object.entries(GEWICHTE).reduce((s, [k, w]) => s + (erfuellt[k] ? w : 0), 0)
    const naechster = Object.keys(GEWICHTE).find((k) => !erfuellt[k])
    const stufe = score >= 85 ? 'Promptgott-Niveau ☢️' : score >= 60 ? 'Stark' : score >= 35 ? 'Ausbaufähig' : 'Noch zu dünn'

    return (
        <div className="prompt-runner">
            <div className="prompt-fields">
                <p className="e-pflicht-hinweis">Felder mit * sind Pflicht, alle anderen machen den Prompt besser.</p>
                <label>
                    <span>
                        Aufgabe <span aria-hidden="true">*</span>
                    </span>
                    <textarea rows={3} aria-required="true" required value={v.aufgabe} onChange={set('aufgabe')} placeholder="z. B. Schreibe eine Produktbeschreibung für unseren neuen E-Bike-Akku" />
                </label>
                <label>
                    <span>Rolle der KI</span>
                    <input value={v.rolle} onChange={set('rolle')} placeholder="z. B. erfahrener E-Commerce-Texter" />
                </label>
                <label>
                    <span>Kontext und Ziel</span>
                    <textarea rows={3} value={v.kontext} onChange={set('kontext')} placeholder="z. B. Shopseite, soll Vertrauen schaffen und Retouren senken" />
                </label>
                <label>
                    <span>Zielgruppe</span>
                    <input value={v.zielgruppe} onChange={set('zielgruppe')} placeholder="z. B. Pendler ab 40, technisch wenig versiert" />
                </label>
                <div className="prompt-fields-row">
                    <label>
                        <span>Format</span>
                        <select value={v.format} onChange={set('format')}>
                            <option value="">egal</option>
                            {FORMATE.map((f) => (
                                <option key={f}>{f}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Ton</span>
                        <select value={v.ton} onChange={set('ton')}>
                            <option value="">egal</option>
                            {TOENE.map((f) => (
                                <option key={f}>{f}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Länge</span>
                        <input value={v.laenge} onChange={set('laenge')} placeholder="z. B. 150 Wörter" />
                    </label>
                </div>
                <label>
                    <span>Beispiel (optional)</span>
                    <textarea rows={3} value={v.beispiel} onChange={set('beispiel')} placeholder="Ein Text, dessen Stil die KI treffen soll" />
                </label>
                <fieldset className="prompt-extras">
                    <legend>Profi-Schalter</legend>
                    <label>
                        <input type="checkbox" checked={x.rueckfragen} onChange={toggle('rueckfragen')} /> Rückfragen erlauben
                    </label>
                    <label>
                        <input type="checkbox" checked={x.schritte} onChange={toggle('schritte')} /> Schritt für Schritt
                    </label>
                    <label>
                        <input type="checkbox" checked={x.kritik} onChange={toggle('kritik')} /> Selbstkritik
                    </label>
                    <label>
                        <input type="checkbox" checked={x.quellen} onChange={toggle('quellen')} /> Nichts erfinden
                    </label>
                </fieldset>
            </div>
            <div className="prompt-preview">
                <RechnerStatus text={`Prompt-Score ${score} von 100, ${stufe.replace(' ☢️', '')}.`} />
                <div className="prompt-score" style={{ '--score': score }}>
                    <p>
                        <strong>Prompt-Score: {score}/100</strong> · {stufe}
                    </p>
                    <div className="prompt-score-bar" aria-hidden="true">
                        <span />
                    </div>
                    {naechster && <p className="prompt-score-tipp">Nächster Hebel: {TIPPS[naechster]}</p>}
                </div>
                <p className="send-to-ai-label">Dein Prompt</p>
                <pre tabIndex={0} role="region" aria-label="Prompt-Text">{prompt}</pre>
                <SendToAI prompt={prompt} />
            </div>
        </div>
    )
}
