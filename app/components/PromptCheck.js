'use client'

import { useMemo, useState } from 'react'
import SendToAI from './SendToAI'
import { RechnerStatus } from './RechnerHelfer'

// \b kennt keine Umlaute, deshalb Wortgrenzen über Unicode-Buchstaben.
const w = (src) => new RegExp(`(?<![\\p{L}])(?:${src})(?![\\p{L}])`, 'iu')

// Regelbasierte Prüfung, läuft komplett im Browser. Jede Regel: Muster, Gewicht, Lob, Tipp.
const REGELN = [
    { key: 'aufgabe', name: 'Klare Aufgabe', w: 20, re: w('schreib|schreibe|erstelle|erstell|vergleiche|fasse|liste|erkläre|erklär|analysiere|übersetze|bewerte|plane|entwickle|formuliere|nenne|finde|prüfe|optimiere|generiere|gliedere|sammle|überarbeite|kürze|write|create|compare|summarize|explain|list'), tipp: 'Beginne mit einem klaren Verb: „Schreibe“, „Vergleiche“, „Erstelle“.' },
    { key: 'rolle', name: 'Rolle', w: 10, re: w('du bist|sie sind|agiere als|handle als|als erfahrene[rn]?|stell dir vor,? du|act as|you are'), tipp: 'Gib der KI eine Rolle: „Du bist erfahrener …“.' },
    { key: 'kontext', name: 'Kontext / Ziel', w: 15, re: w('kontext|hintergrund|ziel|damit|weil|soll(en)? helfen|für (mein|meine|meinen|unser|unsere|einen|eine)'), tipp: 'Sag, wofür das Ergebnis ist und was die Ausgangslage ist.' },
    { key: 'zielgruppe', name: 'Zielgruppe', w: 10, re: w('zielgruppe|leser(innen)?|kund(en|innen)|nutzer(innen)?|für (anfänger|einsteiger|profis|kinder|laien|studierende|entwickler)|audience'), tipp: 'Nenne die Zielgruppe: Anfänger und Profis brauchen andere Antworten.' },
    { key: 'format', name: 'Ausgabeformat', w: 15, re: w('tabelle|listen?|stichpunkt\\w*|aufzählung|json|markdown|absätze?|e-mail|überschrift\\w*|spalten|format|codeblock'), tipp: 'Leg das Format fest: Tabelle, Liste, E-Mail, JSON …' },
    { key: 'laenge', name: 'Länge', w: 10, re: /(\d+\s*(wörter|worte|zeichen|sätze|sätzen|absätze|punkte|zeilen|varianten|words|characters))|höchstens|maximal|max\./i, tipp: 'Gib eine Länge vor, z. B. „höchstens 150 Wörter“.' },
    { key: 'ton', name: 'Ton / Stil', w: 5, re: w('ton|tonalität|stil|locker|sachlich|formell|förmlich|freundlich|humorvoll|du-ansprache|sie-ansprache|tone'), tipp: 'Beschreibe den Ton: locker, sachlich, humorvoll …' },
    { key: 'beispiel', name: 'Beispiel', w: 5, re: /"""|\bbeispiel\b|z\.\s?b\.|\bexample\b/i, tipp: 'Zeig ein Beispiel in """ dreifachen Anführungszeichen.' },
    { key: 'grenzen', name: 'Grenzen', w: 5, re: w('keine|kein|nicht|ohne|vermeide|erfinde'), tipp: 'Sag, was nicht passieren soll: „Erfinde keine Zahlen.“' },
    { key: 'rueckfragen', name: 'Rückfragen / Prüfung', w: 5, re: /rückfrage|frag(e)? mich|stell mir .{0,20}fragen|prüfe|überprüfe|schritt für schritt/i, tipp: 'Erlaube Rückfragen oder lass das Ergebnis prüfen.' },
]

const VAGE = ['gut', 'schön', 'interessant', 'irgendwie', 'etwas', 'bisschen', 'paar', 'einfach mal', 'cool', 'nice']

const META = (p) => `Du bist Experte für Prompt Engineering. Verbessere meinen Prompt.

Mein Prompt:
"""
${p}
"""

1. Bewerte ihn kurz: Was fehlt (Rolle, Ziel, Zielgruppe, Kontext, Format, Länge, Ton, Beispiele, Qualitätskriterien)?
2. Stell mir bis zu 5 Rückfragen, um die Lücken zu schließen. Warte auf meine Antworten.
3. Schreib danach den verbesserten Prompt in einem Codeblock, sofort nutzbar.`

export default function PromptCheck() {
    const [text, setText] = useState('')
    const r = useMemo(() => {
        const t = text.trim()
        const woerter = t ? t.split(/\s+/).length : 0
        const treffer = REGELN.map((g) => ({ ...g, ok: g.re.test(t) }))
        let score = treffer.reduce((s, g) => s + (g.ok ? g.w : 0), 0)
        const vage = VAGE.filter((v) => w(v).test(t))
        const platzhalter = t.match(/\[[A-ZÄÖÜ_ ]{2,}\]/g) || []
        if (woerter < 8) score = Math.min(score, 25)
        score = Math.max(0, score - vage.length * 3 - platzhalter.length * 5)
        return { woerter, zeichen: t.length, treffer, score, vage, platzhalter, tokMin: Math.round(t.length / 4), tokMax: Math.round(t.length / 3) }
    }, [text])

    const stufe = r.score >= 85 ? 'Promptgott-Niveau ☢️' : r.score >= 60 ? 'Stark 💪' : r.score >= 35 ? 'Ausbaufähig 🛠️' : 'Noch zu dünn 🥲'

    return (
        <div className="prompt-runner">
            <div className="prompt-fields">
                <label>
                    <span>Dein Prompt</span>
                    <textarea rows={12} value={text} onChange={(e) => setText(e.target.value)} placeholder="Füge hier deinen Prompt ein, z. B. „Schreib mir einen Text über E-Bikes“" />
                </label>
                <p className="prompt-fields-actions">
                    <span>
                        {r.zeichen} Zeichen · {r.woerter} Wörter · ca. {r.tokMin} bis {r.tokMax} Tokens (Schätzung)
                    </span>
                    <button type="button" className="copy-button" onClick={() => setText('Schreib mir einen Text über E-Bikes, der gut ist.')}>
                        Beispiel laden
                    </button>
                </p>
            </div>
            <div className="prompt-preview">
                <RechnerStatus text={`Prompt-Score ${r.score} von 100, ${stufe.replace(/\s*\S+$/u, '')}.`} />
                <div className="prompt-score" style={{ '--score': r.score }}>
                    <p>
                        <strong>Prompt-Score: {r.score}/100</strong> · {stufe}
                    </p>
                    <div className="prompt-score-bar" aria-hidden="true">
                        <span />
                    </div>
                </div>
                <ul className="check-list">
                    {r.treffer.map((g) => (
                        <li key={g.key} className={g.ok ? 'is-ok' : 'is-missing'}>
                            <strong>
                                {g.ok ? '✅' : '➕'} {g.name}
                            </strong>
                            {!g.ok && <span>{g.tipp}</span>}
                        </li>
                    ))}
                    {r.vage.length > 0 && (
                        <li className="is-warn">
                            <strong>⚠️ Vage Wörter: {r.vage.join(', ')}</strong>
                            <span>Ersetze sie durch Kriterien: Was genau heißt „gut“?</span>
                        </li>
                    )}
                    {r.platzhalter.length > 0 && (
                        <li className="is-warn">
                            <strong>⚠️ Offene Platzhalter: {r.platzhalter.join(' ')}</strong>
                            <span>Ersetze sie vor dem Absenden.</span>
                        </li>
                    )}
                </ul>
                {text.trim() && (
                    <>
                        <p className="send-to-ai-label">Von der KI verbessern lassen</p>
                        <SendToAI prompt={META(text.trim())} />
                    </>
                )}
            </div>
        </div>
    )
}
