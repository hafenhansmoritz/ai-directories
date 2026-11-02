'use client'

import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { PriceBadge, ExperienceBadge } from './Badges'
import TrackerPanel from './TrackerPanel'
import { formatRating, formatVisits } from '../../utils/i18n-de'
import useTracker, { RANKS } from './useTracker'
import konfetti from '../../lib/konfetti'
import { submitRel } from '../../lib/monetization'
import '../styles/c-start.css'
import { kuerzelAus } from '../../lib/herz'

// Erwartet schlanke Zeilen aus tabellenZeilen() (lib/data.js): Score und Sperre kommen fertig vom Server.
const SORTS = {
    score: { label: 'Jean-Score', fn: (a, b) => b.score - a.score || b.domain_rating - a.domain_rating },
    rating: { label: 'Domain Rating', fn: (a, b) => b.domain_rating - a.domain_rating || b.monthly_visits - a.monthly_visits },
    visits: { label: 'Besuche', fn: (a, b) => b.monthly_visits - a.monthly_visits },
    name: { label: 'Name', fn: (a, b) => a.name.localeCompare(b.name, 'de') },
}

const MILESTONES = new Set(RANKS.map(([min]) => min).filter(Boolean))

// Filter in der Adresszeile: lesbare Werte, damit geteilte Links und der Zurück-Knopf den Stand behalten.
const URL_FELDER = {
    preis: ['pricing', { kostenlos: 'Free', kostenpflichtig: 'Paid' }],
    einreichung: ['experience', { reibungslos: 'Good', hakelig: 'Bad', zu: 'Closed' }],
    dr: ['minDr', { '30': '30', '50': '50', '70': '70' }],
    link: ['linkType', { dofollow: 'dofollow' }],
    status: ['status', { offen: 'open', eingetragen: 'done' }],
    sortierung: ['sort', { score: 'score', dr: 'rating', besuche: 'visits', name: 'name' }],
}

const norm = (s = '') =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-z0-9]/g, '')

// Levenshtein mit Abbruch: reicht für 260 Namen locker, auch auf langsamen Handys.
function abstand(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
    for (let i = 1; i <= a.length; i++) {
        const cur = [i]
        let min = i
        for (let j = 1; j <= b.length; j++) {
            cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
            if (cur[j] < min) min = cur[j]
        }
        if (min > max) return max + 1
        prev = cur
    }
    return prev[b.length]
}

const Zeile = memo(function Zeile({ d, erledigt, onToggle }) {
    return (
        <tr className={erledigt ? 'is-done' : undefined}>
            <td>
                <input type="checkbox" className="track" checked={erledigt} onChange={() => onToggle(d.slug)} aria-label={`${d.name} als eingetragen markieren`} />
            </td>
            <th scope="row">
                {/* Kein Prefetch: sonst lädt jede sichtbare Zeile beim Scrollen die Daten ihrer Detailseite vor. */}
                <Link href={`/verzeichnis/${d.slug}`} prefetch={false}>
                    {d.name}
                </Link>
                {d.deal && <span className="deal-flag">Rabatt</span>}
            </th>
            <td>
                {d.blocked ? (
                    <span className="submit-closed">gerade zu</span>
                ) : (
                    <a
                        className="submit-link"
                        href={d.submission_link}
                        target="_blank"
                        rel={submitRel(d)}
                        aria-label={`${d.name}: Tool eintragen (externer Link, öffnet in neuem Tab)${d.affiliate ? ', Partnerlink' : ''}`}
                    >
                        Eintragen ↗{d.affiliate && <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup>}
                    </a>
                )}
            </td>
            <td className="num">
                <span className="score-pill" style={{ '--score': d.score }}>
                    {d.score}
                </span>
            </td>
            <td className="num">{formatRating(d.domain_rating)}</td>
            <td className="num">{formatVisits(d.monthly_visits)}</td>
            <td>
                <PriceBadge value={d.pricing} />
            </td>
            <td>
                <ExperienceBadge value={d.submission_experience} blocked={d.blocked} />
            </td>
        </tr>
    )
})

export default function DirectoryTable({ directories, interactive = true, defaultSort = 'rating', caption, tracker = false }) {
    const START = useMemo(() => ({ query: '', pricing: 'all', experience: 'all', minDr: 'all', linkType: 'all', status: 'all', sort: defaultSort }), [defaultSort])
    const [filter, setFilter] = useState(START)
    const setze = (feld, wert) => setFilter((f) => ({ ...f, [feld]: wert }))
    // Die Eingabe bleibt sofort bedienbar, die Tabelle rechnet im Hintergrund nach (wichtig für INP auf Handys).
    const spaet = useDeferredValue(filter)
    const { done, toggle } = useTracker()
    const searchRef = useRef(null)
    const urlGelesen = useRef(false)

    useEffect(() => {
        if (!interactive) return
        const onKey = (e) => {
            const tag = document.activeElement?.tagName
            if (e.key !== '/' || kuerzelAus() || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return
            // Nur die erste Suche auf der Seite reagiert.
            if (document.querySelector('.filters input[type=search]') !== searchRef.current) return
            e.preventDefault()
            searchRef.current?.focus()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [interactive])

    // Filter still in die Adresse schreiben (ohne neuen Verlaufseintrag).
    useEffect(() => {
        if (!interactive || !urlGelesen.current) return
        try {
            const url = new URL(window.location.href)
            const q = spaet.query.trim()
            q ? url.searchParams.set('q', q) : url.searchParams.delete('q')
            for (const [param, [feld, werte]] of Object.entries(URL_FELDER)) {
                const name = Object.keys(werte).find((k) => werte[k] === spaet[feld])
                spaet[feld] !== START[feld] && name ? url.searchParams.set(param, name) : url.searchParams.delete(param)
            }
            if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url.href)
        } catch {
            // Adresse nicht änderbar: Filter funktionieren trotzdem.
        }
    }, [spaet, interactive, START])

    // Filter einmal aus der Adresse lesen. Steht absichtlich hinter dem Schreiben, damit der erste Lauf nichts löscht.
    useEffect(() => {
        if (!interactive) return
        try {
            const p = new URLSearchParams(window.location.search)
            const neu = {}
            if (p.get('q')) neu.query = p.get('q').slice(0, 80)
            for (const [param, [feld, werte]] of Object.entries(URL_FELDER)) {
                const w = werte[p.get(param)]
                if (w) neu[feld] = w
            }
            if (Object.keys(neu).length) setFilter((f) => ({ ...f, ...neu }))
        } catch {
            // Ohne lesbare Adresse bleibt es beim Standard.
        }
        urlGelesen.current = true
    }, [interactive])

    const index = useMemo(() => directories.map((d) => ({ d, name: norm(d.name), link: norm(d.link) })), [directories])

    // Erst Preis, Einreichung, Mindest-DR, Link-Art und Sortierung, dann der Suchbegriff. Ohne exakten Treffer greift eine Tippfehler-Suche.
    const { treffer, aehnlich } = useMemo(() => {
        const { query, pricing, experience, minDr, linkType, sort } = spaet
        const basis = index
            .filter(({ d }) => pricing === 'all' || d.pricing === pricing)
            .filter(({ d }) => experience === 'all' || (experience === 'Closed' ? d.blocked : !d.blocked && d.submission_experience === experience))
            .filter(({ d }) => minDr === 'all' || (d.domain_rating ?? 0) >= Number(minDr))
            .filter(({ d }) => linkType === 'all' || Boolean(d.dofollow))
        const q = norm(query)
        let liste = q ? basis.filter((x) => x.name.includes(q) || x.link.includes(q)) : basis
        let fuzzy = false
        if (q.length >= 4 && liste.length === 0) {
            const max = q.length >= 8 ? 2 : 1
            liste = basis.filter((x) => abstand(q, x.name, max) <= max || abstand(q, x.name.slice(0, q.length), max) <= max)
            fuzzy = liste.length > 0
        }
        return { treffer: liste.map((x) => x.d).sort(SORTS[sort].fn), aehnlich: fuzzy }
    }, [index, spaet])

    const status = spaet.status
    const rows = useMemo(
        () => (status === 'all' ? treffer : treffer.filter((d) => (status === 'open' ? !done.has(d.slug) : done.has(d.slug)))),
        [treffer, status, done]
    )

    // Stabile Funktion, damit memo-Zeilen beim Tippen nicht neu rendern.
    const toggleRef = useRef(toggle)
    toggleRef.current = toggle
    const onToggle = useCallback((slug) => {
        const next = toggleRef.current(slug)
        if (next.has(slug) && MILESTONES.has(next.size)) konfetti()
    }, [])

    const aktiv = filter.pricing !== 'all' || filter.experience !== 'all' || filter.minDr !== 'all' || filter.linkType !== 'all' || filter.status !== 'all'
    const zuruecksetzen = () => setFilter(START)
    const laedt = filter !== spaet

    return (
        <div className={`table-block c-tabelle${interactive ? '' : ' c-tabelle-leicht'}`}>
            {tracker && <TrackerPanel directories={directories} />}
            {interactive && (
                <form className="filters" role="search" aria-label="Verzeichnisse filtern" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        <span>
                            Suche <kbd>/</kbd>
                        </span>
                        <input
                            ref={searchRef}
                            type="search"
                            value={filter.query}
                            onChange={(e) => setze('query', e.target.value)}
                            placeholder="z. B. Futurepedia, launch, tools"
                            title="Kleine Tippfehler verzeiht die Suche"
                        />
                    </label>
                    <label>
                        <span>Preis</span>
                        <select value={filter.pricing} onChange={(e) => setze('pricing', e.target.value)}>
                            <option value="all">Alle</option>
                            <option value="Free">Kostenlos</option>
                            <option value="Paid">Kostenpflichtig</option>
                        </select>
                    </label>
                    <label>
                        <span>Einreichung</span>
                        <select value={filter.experience} onChange={(e) => setze('experience', e.target.value)}>
                            <option value="all">Alle</option>
                            <option value="Good">Reibungslos</option>
                            <option value="Bad">Hakelig</option>
                            <option value="Closed">Gerade zu</option>
                        </select>
                    </label>
                    <label>
                        <span>Mindest-DR</span>
                        <select value={filter.minDr} onChange={(e) => setze('minDr', e.target.value)}>
                            <option value="all">Alle</option>
                            <option value="30">DR 30+</option>
                            <option value="50">DR 50+</option>
                            <option value="70">DR 70+</option>
                        </select>
                    </label>
                    <label>
                        <span>Link-Art</span>
                        <select value={filter.linkType} onChange={(e) => setze('linkType', e.target.value)}>
                            <option value="all">Alle</option>
                            <option value="dofollow">Nur Dofollow</option>
                        </select>
                    </label>
                    <label>
                        <span>Mein Status</span>
                        <select value={filter.status} onChange={(e) => setze('status', e.target.value)}>
                            <option value="all">Alle</option>
                            <option value="open">Noch offen</option>
                            <option value="done">Eingetragen</option>
                        </select>
                    </label>
                    <label>
                        <span>Sortieren nach</span>
                        <select value={filter.sort} onChange={(e) => setze('sort', e.target.value)}>
                            {Object.entries(SORTS).map(([key, s]) => (
                                <option key={key} value={key}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <p className="filters-count" aria-live="polite">
                        {rows.length} von {directories.length} Verzeichnissen
                        {aehnlich ? `, ähnlich geschrieben wie „${spaet.query.trim()}“` : ''}
                    </p>
                </form>
            )}
            {rows.length > 0 && (
                <div className="table-scroll" aria-busy={laedt || undefined}>
                    <table>
                        {caption && <caption>{caption}</caption>}
                        <thead>
                            <tr>
                                <th scope="col">
                                    <span className="sr-only">Eingetragen</span>✓
                                </th>
                                <th scope="col">Verzeichnis</th>
                                <th scope="col">
                                    <span className="sr-only">Eintragen</span>
                                </th>
                                <th scope="col" className="num">
                                    <abbr title="Jean-Score: 0 bis 100 aus Domain Rating, Traffic, Preis und Einreichung">Score</abbr>
                                </th>
                                <th scope="col" className="num">
                                    <abbr title="Domain Rating (Ahrefs, 0 bis 100). Je höher, desto stolzer die Domain.">DR</abbr>
                                </th>
                                <th scope="col" className="num">Besuche/Monat</th>
                                <th scope="col">Preis</th>
                                <th scope="col">Einreichung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((d) => (
                                <Zeile key={d.slug} d={d} erledigt={done.has(d.slug)} onToggle={onToggle} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {rows.length === 0 && (
                <div className="empty c-leer">
                    <p>
                        Nichts gefunden. Entweder gibt es das Verzeichnis nicht, oder dein Filter ist strenger als dein Steuerberater.
                    </p>
                    {interactive && (
                        <p className="c-leer-knoepfe">
                            <button type="button" className="button button-small" onClick={zuruecksetzen}>
                                Alle Filter zurücksetzen
                            </button>
                            {aktiv && filter.query.trim() && (
                                <button type="button" className="copy-button" onClick={() => setFilter({ ...START, query: filter.query })}>
                                    Nur den Suchbegriff behalten
                                </button>
                            )}
                            {aktiv && !filter.query.trim() && filter.status !== 'all' && (
                                <button type="button" className="copy-button" onClick={() => setze('status', 'all')}>
                                    Status auf „Alle“
                                </button>
                            )}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
