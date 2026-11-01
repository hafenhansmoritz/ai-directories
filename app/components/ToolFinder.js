'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { verleihe, toast } from '../../lib/herz'
import { partnerRel } from '../../lib/monetization'
import { withBase } from '../../lib/site'
import KontoEinladung from './KontoEinladung'
import PartnerHinweis, { hatPartnerlink } from './PartnerHinweis'
import '../styles/d-tools.css'

const AUFGABEN = [
    ['schreiben', '✍️', 'Texte schreiben', ['schreiben', 'marketing']],
    ['chatbots', '💬', 'Fragen & Chatten', ['chatbots']],
    ['suche', '🔎', 'Recherche mit Quellen', ['suche', 'recherche']],
    ['bild', '🖼️', 'Bilder & Design', ['bild']],
    ['video', '🎬', 'Videos', ['video']],
    ['audio', '🎙️', 'Stimme & Transkription', ['audio']],
    ['musik', '🎵', 'Musik', ['musik']],
    ['coding', '💻', 'Programmieren', ['coding']],
    ['produktivitaet', '⚡', 'Meetings & Produktivität', ['produktivitaet']],
    ['agenten', '🤖', 'Automatisieren & Agenten', ['agenten']],
]

const BUDGET = [
    ['gratis', '🆓', 'Nur kostenlos'],
    ['egal', '💳', 'Darf etwas kosten'],
]

const TECHNIK = [
    ['einfach', '🖱️', 'Einfach im Browser'],
    ['offen', '🔓', 'Open Source, selbst hosten ist okay'],
]

const LEER = { aufgabe: null, budget: null, technik: null }
const gueltig = (liste, wert) => (liste.some((x) => x[0] === wert) ? wert : null)

// Antworten stehen in der Adresszeile (?aufgabe=…&budget=…&technik=…): Zurück-Taste geht einen Schritt zurück,
// und das Ergebnis lässt sich als Link teilen.
const ausUrl = () => {
    const p = new URLSearchParams(window.location.search)
    const a = { aufgabe: gueltig(AUFGABEN, p.get('aufgabe')), budget: gueltig(BUDGET, p.get('budget')), technik: gueltig(TECHNIK, p.get('technik')) }
    // Nur lückenlose Antworten zählen
    if (!a.aufgabe) return LEER
    if (!a.budget) return { ...LEER, aufgabe: a.aufgabe }
    return a
}
const zuUrl = (a) => {
    const p = new URLSearchParams(window.location.search)
    for (const k of Object.keys(LEER)) (a[k] ? p.set(k, a[k]) : p.delete(k))
    const qs = p.toString()
    return `${window.location.pathname}${qs ? `?${qs}` : ''}`
}

// Drei Fragen, dann die passenden Tools aus der Datenbank, sortiert nach Konsens. Die Tool-Liste (quelle) lädt erst,
// wenn die erste Frage beantwortet ist, damit die Seite selbst klein bleibt.
export default function ToolFinder({ quelle }) {
    const [antw, setAntw] = useState(LEER)
    const [tools, setTools] = useState(null)
    const [ladeFehler, setLadeFehler] = useState(false)
    const laeuft = useRef(false)
    const frageRef = useRef(null)
    const stageRef = useRef(null)
    const ersterLauf = useRef(true)

    const schritt = !antw.aufgabe ? 0 : !antw.budget ? 1 : !antw.technik ? 2 : 3

    const laden = () => {
        if (tools || laeuft.current) return
        laeuft.current = true
        setLadeFehler(false)
        fetch(withBase(quelle))
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then(setTools)
            .catch(() => setLadeFehler(true))
            .finally(() => (laeuft.current = false))
    }

    useEffect(() => {
        const a = ausUrl()
        setAntw(a)
        if (a.aufgabe) laden()
        const zurueck = () => setAntw(ausUrl())
        window.addEventListener('popstate', zurueck)
        return () => window.removeEventListener('popstate', zurueck)
    }, [])

    // Neue Frage sichtbar machen und den Fokus darauf setzen (nicht beim ersten Laden der Seite)
    useEffect(() => {
        if (ersterLauf.current) {
            ersterLauf.current = false
            return
        }
        const ruhig = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        stageRef.current?.scrollIntoView({ block: 'start', behavior: ruhig ? 'auto' : 'smooth' })
        frageRef.current?.focus({ preventScroll: true })
    }, [schritt])

    const setze = (neu) => {
        setAntw(neu)
        window.history.pushState(window.history.state, '', zuUrl(neu))
    }

    const waehle = (feld, wert) => {
        const neu = { ...antw, [feld]: wert }
        setze(neu)
        laden()
        if (neu.aufgabe && neu.budget && neu.technik) verleihe('Detektiv-Abzeichen')
    }

    const zurueck = () => setze(schritt === 3 ? { ...antw, technik: null } : schritt === 2 ? { ...antw, budget: null } : LEER)

    const treffer = useMemo(() => {
        if (schritt < 3 || !tools) return []
        const rubriken = AUFGABEN.find((a) => a[0] === antw.aufgabe)[3]
        return tools
            .filter((t) => rubriken.includes(t.r))
            .filter((t) => antw.budget !== 'gratis' || t.o || t.g || t.f)
            .map((t) => ({
                ...t,
                punkte: t.k * 10 + (antw.technik === 'offen' && t.o ? 15 : 0) + (antw.technik === 'einfach' && !t.o ? 8 : 0) + (t.p ? 5 : 0) + (t.d && !t.e ? 2 : 0),
            }))
            .sort((a, b) => b.punkte - a.punkte)
            .slice(0, 6)
    }, [schritt, antw, tools])

    const teilen = async () => {
        const url = window.location.href
        const aufgabe = AUFGABEN.find((a) => a[0] === antw.aufgabe)?.[2]
        const text = `Meine Top ${treffer.length} KI-Tools für „${aufgabe}“ laut AIGeddon-Tool-Finder`
        try {
            if (navigator.share) await navigator.share({ title: 'KI-Tool-Finder', text, url })
            else {
                await navigator.clipboard.writeText(url)
                toast('Link zum Ergebnis kopiert.', '🔗')
            }
        } catch {
            // Teilen abgebrochen: nichts zu tun
        }
    }

    const frage = (titel, optionen, feld) => (
        <div className="finder-step" key={titel}>
            <h2 className="finder-q" ref={frageRef} tabIndex={-1}>
                {titel}
            </h2>
            <div className="finder-options" role="group" aria-label={titel}>
                {optionen.map(([id, emoji, label]) => (
                    <button key={id} type="button" className={antw[feld] === id ? 'is-active' : ''} aria-pressed={antw[feld] === id} onClick={() => waehle(feld, id)}>
                        <span aria-hidden="true">{emoji}</span> {label}
                    </button>
                ))}
            </div>
        </div>
    )

    return (
        <div className="finder">
            <ol className="finder-progress" aria-label="Fortschritt">
                {['Aufgabe', 'Budget', 'Technik', 'Ergebnis'].map((l, i) => (
                    <li key={l} className={i < schritt ? 'is-done' : i === schritt ? 'is-active' : ''} aria-current={i === schritt ? 'step' : undefined}>
                        {l}
                    </li>
                ))}
            </ol>
            <div className="finder-stage" key={schritt} ref={stageRef} aria-live="polite">
                {schritt === 0 && frage('Wobei soll dir KI helfen?', AUFGABEN, 'aufgabe')}
                {schritt === 1 && frage('Wie viel darf es kosten?', BUDGET, 'budget')}
                {schritt === 2 && frage('Wie technisch darf es sein?', TECHNIK, 'technik')}
                {schritt === 3 && (
                    <div className="finder-step">
                        <h2 className="finder-q" ref={frageRef} tabIndex={-1}>
                            {tools ? `Deine Top ${treffer.length} 🎯` : ladeFehler ? 'Die Tool-Liste konnte nicht geladen werden.' : 'Suche passende Tools …'}
                        </h2>
                        {ladeFehler && (
                            <button type="button" className="button button-small" onClick={laden}>
                                Nochmal versuchen
                            </button>
                        )}
                        {tools && treffer.length === 0 && (
                            <div className="dt-leer">
                                <p>Mit diesen Antworten gibt es keinen Treffer.</p>
                                <p className="dt-leer-links">
                                    {antw.budget === 'gratis' && (
                                        <button type="button" className="button button-small" onClick={() => setze({ ...antw, budget: 'egal' })}>
                                            Budget auf „Darf etwas kosten“
                                        </button>
                                    )}
                                    <button type="button" className="copy-button" onClick={() => setze(LEER)}>
                                        Neu starten
                                    </button>
                                </p>
                            </div>
                        )}
                        {treffer.length > 0 && (
                            <>
                                <ol className="finder-results">
                                    {treffer.map((t, i) => (
                                        <li key={t.s} style={{ '--i': i }}>
                                            <span className="finder-rank">{i + 1}</span>
                                            <div>
                                                <span className="kb-name">
                                                    <Link href={t.p ? `/tools/${t.p}` : `/ki-tools/tool/${t.s}`}>
                                                        <strong>{t.n}</strong>
                                                    </Link>
                                                    <a className="kb-extern" href={t.a || t.u} target="_blank" rel={partnerRel(t.a)} aria-label={`${t.n} beim Anbieter öffnen${t.a ? ' (Partnerlink)' : ''}`}>
                                                        ↗{t.a && <sup>*</sup>}
                                                    </a>
                                                </span>{' '}
                                                {t.k === 3 && <span title="In allen 3 Listen">🏆</span>}
                                                {t.k === 2 && <span title="In 2 von 3 Listen">🥈</span>}
                                                {t.o === 1 && <span title="Open Source">🔓</span>}
                                                {t.d && !t.e && <p>{t.d}</p>}
                                                {t.p && <Link href={`/tools/${t.p}`}>🧔 Steckbrief mit Preisen →</Link>}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                <PartnerHinweis zeigen={hatPartnerlink(treffer)} />
                                <p className="dt-teilen">
                                    <button type="button" className="button button-small" onClick={teilen}>
                                        Mein Ergebnis teilen
                                    </button>
                                    <span className="widget-note">Der Link führt direkt zu diesen Treffern.</span>
                                </p>
                            </>
                        )}
                        <KontoEinladung klein text="Treffer merken und später vergleichen?" />
                    </div>
                )}
            </div>
            {schritt > 0 && (
                <p className="finder-nav">
                    <button type="button" className="copy-button" onClick={zurueck}>
                        ← Zurück
                    </button>
                    <button type="button" className="copy-button" onClick={() => setze(LEER)}>
                        Neu starten
                    </button>
                </p>
            )}
        </div>
    )
}
