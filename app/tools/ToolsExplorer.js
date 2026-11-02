'use client'

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { kuerzelAus } from '../../lib/herz'

const norm = (s = '') =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-z0-9]/g, '')

const anchor = (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function ToolsExplorer({ tools, categories }) {
    const [query, setQuery] = useState('')
    const [kategorie, setKategorie] = useState('all')
    const [nurGratis, setNurGratis] = useState(false)
    const [nurDeutsch, setNurDeutsch] = useState(false)
    const [nurEu, setNurEu] = useState(false)

    const searchRef = useRef(null)
    const deferredQuery = useDeferredValue(query)

    useEffect(() => {
        const onKey = (e) => {
            const tag = document.activeElement?.tagName
            if (e.key !== '/' || kuerzelAus() || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return
            e.preventDefault()
            searchRef.current?.focus()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const filterAktiv = Boolean(query.trim() || kategorie !== 'all' || nurGratis || nurDeutsch || nurEu)

    const filtered = useMemo(() => {
        const q = norm(deferredQuery)
        return tools.filter((t) => {
            if (kategorie !== 'all' && t.category !== kategorie) return false
            if (nurGratis && !t.free_plan) return false
            if (nurDeutsch && !t.german_ui) return false
            if (nurEu && !t.eu) return false
            if (!q) return true
            const name = norm(t.name)
            const cat = norm(t.category)
            const desc = norm(t.summary_de)
            const best = norm(t.best_for_de)
            return name.includes(q) || cat.includes(q) || desc.includes(q) || best.includes(q)
        })
    }, [tools, deferredQuery, kategorie, nurGratis, nurDeutsch, nurEu])

    const zuruecksetzen = () => {
        setQuery('')
        setKategorie('all')
        setNurGratis(false)
        setNurDeutsch(false)
        setNurEu(false)
    }

    return (
        <div className="tools-explorer">
            <div className="tools-explorer-filters" role="search" aria-label="Tool-Steckbriefe filtern">
                <div className="tools-search-row">
                    <label className="tools-search-label">
                        <span>
                            Suche <kbd>/</kbd>
                        </span>
                        <input
                            ref={searchRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="z. B. DeepL, SEO, Paris, Video, Coding, n8n..."
                            title="Tastaturkürzel: / drücken zum Suchen"
                        />
                    </label>

                    <label className="tools-category-label">
                        <span>Kategorie</span>
                        <select value={kategorie} onChange={(e) => setKategorie(e.target.value)}>
                            <option value="all">Alle Kategorien ({categories.length})</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="tools-pills-row" aria-label="Schnellfilter">
                    <span className="tools-pills-label">Schnellfilter:</span>
                    <button
                        type="button"
                        className={`tools-pill-btn ${nurGratis ? 'is-active' : ''}`}
                        onClick={() => setNurGratis((v) => !v)}
                        aria-pressed={nurGratis}
                    >
                        🎁 Gratis-Tarif verfügbar
                    </button>
                    <button
                        type="button"
                        className={`tools-pill-btn ${nurDeutsch ? 'is-active' : ''}`}
                        onClick={() => setNurDeutsch((v) => !v)}
                        aria-pressed={nurDeutsch}
                    >
                        🇩🇪 Deutsche Oberfläche
                    </button>
                    <button
                        type="button"
                        className={`tools-pill-btn ${nurEu ? 'is-active' : ''}`}
                        onClick={() => setNurEu((v) => !v)}
                        aria-pressed={nurEu}
                    >
                        🇪🇺 EU / Server &amp; DSGVO
                    </button>
                    {filterAktiv && (
                        <button type="button" className="tools-reset-btn" onClick={zuruecksetzen}>
                            ✕ Filter zurücksetzen
                        </button>
                    )}
                </div>

                <div className="tools-status-bar" aria-live="polite">
                    <span>
                        <strong>{filtered.length}</strong> von {tools.length} Tool-Steckbriefen
                        {filterAktiv && ' entsprechen deiner Auswahl'}
                    </span>
                    {filterAktiv && (
                        <span className="tools-active-hints">
                            {nurGratis && <span className="tools-mini-tag">Gratis-Tarif</span>}
                            {nurDeutsch && <span className="tools-mini-tag">Deutsch</span>}
                            {nurEu && <span className="tools-mini-tag">EU / Server</span>}
                            {kategorie !== 'all' && <span className="tools-mini-tag">{kategorie}</span>}
                            {query.trim() && <span className="tools-mini-tag">„{query.trim()}“</span>}
                        </span>
                    )}
                </div>
            </div>

            {/* Bei aktiver Filterung: gefilterte Liste als Karten anzeigen */}
            {filterAktiv ? (
                filtered.length > 0 ? (
                    <section aria-label="Suchergebnisse">
                        <ul className="link-cards tools-filtered-cards">
                            {filtered.map((t) => (
                                <li key={t.slug} className="tool-card-item">
                                    <div className="tool-card-top">
                                        <Link href={`/tools/${t.slug}`}>
                                            <strong>{t.name}</strong>
                                        </Link>
                                        <span className="tool-card-cat">{t.category}</span>
                                    </div>
                                    <span className="tool-card-desc">{t.summary_de}</span>
                                    <div className="tool-card-badges">
                                        {t.free_plan && <span className="tool-badge-pill tool-badge-free">Gratis-Tarif ✓</span>}
                                        {t.german_ui && (
                                            <span className="tool-badge-pill tool-badge-de" title="Deutsche Oberfläche vorhanden">
                                                🇩🇪 Deutsch
                                            </span>
                                        )}
                                        {t.eu && (
                                            <span className="tool-badge-pill tool-badge-eu" title="Sitz in der EU oder Server in Europa">
                                                🇪🇺 EU
                                            </span>
                                        )}
                                    </div>
                                    <span className="tool-card-price">
                                        {t.free_plan ? 'Gratis nutzbar · ' : ''}
                                        {t.price_from ? `ab ${t.price_from}` : 'Preis auf Anfrage'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : (
                    <div className="tools-empty-state">
                        <p>
                            <strong>Nichts gefunden.</strong> Weder für deine Suche noch mit den gewählten Filtern gibt es einen Steckbrief.
                        </p>
                        <p className="widget-note">
                            Jean sagt: Vielleicht gibt es das Tool aber in unserer großen KI-Tool-Datenbank mit über 700 Einträgen.
                        </p>
                        <div className="tools-empty-actions">
                            <button type="button" className="button button-small" onClick={zuruecksetzen}>
                                Filter zurücksetzen
                            </button>
                            <Link href="/ki-tools" className="button button-small">
                                Zur großen 700+ Datenbank ↗
                            </Link>
                        </div>
                    </div>
                )
            ) : (
                <>
                    {/* Keine Filter aktiv: die bewährte Kategoriestruktur mit Sprungmarken bleibt 1:1 erhalten */}
                    <ul className="quick-links">
                        {categories.map((c) => (
                            <li key={c}>
                                <a href={`#${anchor(c)}`}>{c}</a>
                            </li>
                        ))}
                    </ul>
                    {categories.map((c) => (
                        <section key={c} aria-labelledby={anchor(c)}>
                            <h2 id={anchor(c)}>{c}</h2>
                            <ul className="link-cards">
                                {tools
                                    .filter((t) => t.category === c)
                                    .map((t) => (
                                        <li key={t.slug}>
                                            <div className="tool-card-top">
                                                <Link href={`/tools/${t.slug}`}>
                                                    <strong>{t.name}</strong>
                                                </Link>
                                                <div className="tool-card-mini-badges">
                                                    {t.free_plan && <span className="mini-badge-free" title="Gratis-Tarif verfügbar">🎁</span>}
                                                    {t.german_ui && <span className="mini-badge-de" title="Deutsche Oberfläche">🇩🇪</span>}
                                                    {t.eu && <span className="mini-badge-eu" title="EU-Anbieter / Server">🇪🇺</span>}
                                                </div>
                                            </div>
                                            <span>{t.summary_de}</span>
                                            <span>
                                                {t.free_plan ? 'Gratis-Tarif · ' : ''}
                                                {t.price_from ? `ab ${t.price_from}` : 'Preis auf Anfrage'}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    ))}
                </>
            )}
        </div>
    )
}
