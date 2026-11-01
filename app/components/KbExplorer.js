'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { partnerRel } from '../../lib/monetization'
import { kbSortKonsens } from '../../lib/kb-client'
import { withBase } from '../../lib/site'
import PartnerHinweis, { hatPartnerlink } from './PartnerHinweis'
import '../styles/d-tools.css'

const STEP = 48

// Deutsche Suchbegriffe finden auch englische Beschreibungen (die meisten Quellen sind englisch).
const SYNONYME = [
    ['transkri', 'transcri', 'speech-to-text', 'speech to text', 'whisper'],
    ['spracherkennung', 'speech recognition', 'speech-to-text', 'transcri'],
    ['stimme', 'voice', 'speech', 'tts'],
    ['vorlesen', 'text-to-speech', 'tts', 'voice'],
    ['bild', 'image', 'picture', 'photo', 'art'],
    ['foto', 'photo', 'image'],
    ['video', 'video', 'film'],
    ['musik', 'music', 'song', 'audio'],
    ['übersetz', 'translat'],
    ['schreib', 'writ', 'copy', 'text'],
    ['text', 'text', 'writ', 'copy'],
    ['zusammenfass', 'summar'],
    ['präsentation', 'presentation', 'slides', 'deck'],
    ['programmier', 'code', 'coding', 'developer'],
    ['suche', 'search'],
    ['recherche', 'research', 'search', 'paper'],
    ['besprechung', 'meeting'],
    ['agent', 'agent', 'autonomous'],
    ['logo', 'logo', 'brand'],
    ['lokal', 'local', 'self-host', 'offline'],
    ['kostenlos', 'free'],
    ['gratis', 'free'],
]

const varianten = (s) => {
    const extra = SYNONYME.filter(([de]) => s.includes(de) || de.includes(s)).flatMap(([, ...en]) => en)
    return [s, ...extra]
}

// Filter <-> Adresszeile: so überlebt die Auswahl Zurück-Klicks und lässt sich als Link teilen.
const FLAGS = [
    ['konsens', 'nurKonsens'],
    ['open', 'nurOpen'],
    ['gratis', 'nurGratis'],
    ['steckbrief', 'nurProfil'],
]
const START = { q: '', rubrik: '', nurKonsens: false, nurOpen: false, nurGratis: false, nurProfil: false, sort: 'konsens' }

// Durchsuchbare Tool-Liste. Daten kommen schlank vom Server (kbForClient), gefiltert wird im Browser.
// Mit quelle zeigt die Seite zuerst nur die ersten Einträge und lädt die volle Liste erst, wenn jemand sucht,
// filtert oder weiterblättert (spart auf /ki-tools rund 140 KB HTML).
export default function KbExplorer({ tools, rubriken, rubrik: fest, quelle, gesamt }) {
    const [daten, setDaten] = useState(tools)
    const [geladen, setGeladen] = useState(!quelle)
    const [ladeFehler, setLadeFehler] = useState(false)
    const [laedt, setLaedt] = useState(false)
    const [f, setF] = useState({ ...START, rubrik: fest || '' })
    const [limit, setLimit] = useState(STEP)
    const laeuft = useRef(false)
    const urlGelesen = useRef(false)

    const laden = () => {
        if (geladen || laeuft.current || !quelle) return
        laeuft.current = true
        setLaedt(true)
        setLadeFehler(false)
        fetch(withBase(quelle))
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((liste) => {
                setDaten(liste)
                setGeladen(true)
            })
            .catch(() => setLadeFehler(true))
            .finally(() => {
                laeuft.current = false
                setLaedt(false)
            })
    }

    // Suche und Filter aus der Adresszeile übernehmen (?q=…&rubrik=…&gratis=1), z. B. aus geteilten Links
    useEffect(() => {
        const p = new URLSearchParams(window.location.search)
        const neu = { ...START, rubrik: fest || '' }
        if (p.get('q')) neu.q = p.get('q')
        if (!fest && p.get('rubrik') && rubriken?.some((r) => r.key === p.get('rubrik'))) neu.rubrik = p.get('rubrik')
        for (const [key, feld] of FLAGS) if (p.get(key) === '1') neu[feld] = true
        if (p.get('sort') === 'az') neu.sort = 'az'
        setF(neu)
        urlGelesen.current = true
        if (Object.keys(neu).some((k) => neu[k] !== START[k] && !(k === 'rubrik' && fest))) laden()
    }, [])

    // Auswahl in die Adresszeile schreiben, ohne neuen Verlaufseintrag
    useEffect(() => {
        if (!urlGelesen.current) return
        const p = new URLSearchParams(window.location.search)
        const setze = (key, wert) => (wert ? p.set(key, wert) : p.delete(key))
        setze('q', f.q.trim())
        if (!fest) setze('rubrik', f.rubrik)
        for (const [key, feld] of FLAGS) setze(key, f[feld] ? '1' : '')
        setze('sort', f.sort === 'az' ? 'az' : '')
        const qs = p.toString()
        const ziel = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
        if (ziel !== `${window.location.pathname}${window.location.search}${window.location.hash}`) window.history.replaceState(window.history.state, '', ziel)
    }, [f, fest])

    const liste = useMemo(() => {
        const s = f.q.trim().toLowerCase()
        const vs = s.length > 2 ? varianten(s) : [s]
        return daten
            .filter((t) => (!f.rubrik || t.r === f.rubrik) && (!f.nurKonsens || t.k > 1) && (!f.nurOpen || t.o) && (!f.nurGratis || t.g) && (!f.nurProfil || t.p))
            .filter((t) => {
                if (!s) return true
                const hay = `${t.n} ${t.d || ''}`.toLowerCase()
                return vs.some((v) => hay.includes(v))
            })
            .sort((a, b) => (f.sort === 'az' ? a.n.localeCompare(b.n) : kbSortKonsens(a, b)))
    }, [daten, f])

    const setze = (feld) => (wert) => {
        setF((alt) => ({ ...alt, [feld]: wert }))
        setLimit(STEP)
        laden()
    }
    const zuruecksetzen = () => {
        setF({ ...START, rubrik: fest || '' })
        setLimit(STEP)
    }

    const sichtbar = liste.slice(0, limit)
    // Ohne volle Liste und ohne Filter zählt die Gesamtzahl vom Server, nicht die ersten 48.
    const anzahl = !geladen && gesamt && liste.length === daten.length ? gesamt : liste.length
    const rest = anzahl - sichtbar.length

    return (
        <section className="kb-explorer" aria-label="KI-Tools durchsuchen">
            <div className="kb-filter">
                <input
                    type="search"
                    value={f.q}
                    onFocus={laden}
                    onChange={(e) => setze('q')(e.target.value)}
                    placeholder="Tool oder Aufgabe suchen, z. B. „Transkription“ oder „Logo“"
                    aria-label="Suche"
                />
                {!fest && (
                    <div className="kb-chips" role="group" aria-label="Rubrik">
                        <button type="button" className={!f.rubrik ? 'is-active' : ''} aria-pressed={!f.rubrik} onClick={() => setze('rubrik')('')}>
                            Alle
                        </button>
                        {rubriken.map((r) => (
                            <button key={r.key} type="button" className={f.rubrik === r.key ? 'is-active' : ''} aria-pressed={f.rubrik === r.key} onClick={() => setze('rubrik')(r.key)}>
                                {r.name.replace(/^KI[- ](für |fürs )?/, '')} <small>{r.count}</small>
                            </button>
                        ))}
                    </div>
                )}
                <div className="kb-toggles">
                    <label>
                        <input type="checkbox" checked={f.nurKonsens} onChange={(e) => setze('nurKonsens')(e.target.checked)} /> 🏆 nur Konsens (2+ Listen)
                    </label>
                    <label>
                        <input type="checkbox" checked={f.nurOpen} onChange={(e) => setze('nurOpen')(e.target.checked)} /> 🔓 Open Source
                    </label>
                    <label>
                        <input type="checkbox" checked={f.nurGratis} onChange={(e) => setze('nurGratis')(e.target.checked)} /> 🆓 gratis laut Liste
                    </label>
                    <label>
                        <input type="checkbox" checked={f.nurProfil} onChange={(e) => setze('nurProfil')(e.target.checked)} /> 🧔 mit Jeans Steckbrief
                    </label>
                    <label>
                        Sortierung{' '}
                        <select value={f.sort} onChange={(e) => setze('sort')(e.target.value)}>
                            <option value="konsens">Konsens zuerst</option>
                            <option value="az">A bis Z</option>
                        </select>
                    </label>
                </div>
                <p className="kb-count" aria-live="polite">
                    {anzahl} Tools
                    {laedt && <span className="kb-laden"> · lade alle Einträge …</span>}
                    {ladeFehler && <span className="kb-laden"> · Die volle Liste konnte nicht geladen werden. Lade die Seite neu.</span>}
                </p>
            </div>
            {liste.length === 0 ? (
                geladen ? (
                    <div className="dt-leer">
                        <p>Mit diesen Filtern findet sich kein Tool. Vielleicht ist ein Haken zu viel gesetzt.</p>
                        <button type="button" className="button button-small" onClick={zuruecksetzen}>
                            Alle Filter zurücksetzen
                        </button>
                        <p className="dt-leer-links">
                            <Link href="/tool-finder">Tool-Finder: 3 Fragen, 6 Treffer →</Link>
                            {fest ? <Link href="/ki-tools">Alle Rubriken durchsuchen →</Link> : <Link href="/beste-ki-tools">Die besten KI-Tools nach Aufgabe →</Link>}
                        </p>
                    </div>
                ) : (
                    <p className="kb-laden">{ladeFehler ? 'Die volle Liste konnte nicht geladen werden.' : 'Lade alle Einträge …'}</p>
                )
            ) : (
                <ul className="kb-list">
                    {sichtbar.map((t) => (
                        <li key={t.s} id={t.s} className={t.k === 3 ? 'is-gold' : t.k === 2 ? 'is-silver' : ''}>
                            <div className="kb-head">
                                <span className="kb-name">
                                    <Link href={t.p ? `/tools/${t.p}` : `/ki-tools/tool/${t.s}`}>
                                        <strong>{t.n}</strong>
                                    </Link>
                                    <a className="kb-extern" href={t.a || t.u} target="_blank" rel={partnerRel(t.a)} aria-label={`${t.n} beim Anbieter öffnen${t.a ? ' (Partnerlink)' : ''}`}>
                                        ↗{t.a && <sup>*</sup>}
                                    </a>
                                </span>
                                <span className="kb-badges">
                                    {t.k === 3 && <span title="In allen 3 Listen">🏆 3/3</span>}
                                    {t.k === 2 && <span title="In 2 von 3 Listen">🥈 2/3</span>}
                                    {t.o === 1 && <span title="Open Source">🔓</span>}
                                    {t.g === 1 && <span title="Gratis laut Quelle">🆓</span>}
                                </span>
                            </div>
                            {t.d && <p lang={t.e ? 'en' : 'de'}>{t.d}</p>}
                            {t.p && (
                                <Link className="kb-profil" href={`/tools/${t.p}`}>
                                    🧔 Jeans Steckbrief: Preise, Gratis-Tarif, Alternativen →
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <PartnerHinweis zeigen={hatPartnerlink(sichtbar)} />
            {rest > 0 && (
                <p className="kb-more">
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            laden()
                            setLimit(limit + STEP)
                        }}
                    >
                        {Math.min(STEP, rest)} weitere laden ({rest} übrig)
                    </button>
                </p>
            )}
        </section>
    )
}
