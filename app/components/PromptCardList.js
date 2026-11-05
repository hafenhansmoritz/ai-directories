'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast, verleihe } from '../../lib/herz'
import { TECHNIKEN } from '../../lib/prompts'
import SendToAI from './SendToAI'

export default function PromptCardList({ prompts }) {
    const [offenSet, setOffenSet] = useState(() => new Set())
    const [kopiertSlug, setKopiertSlug] = useState(null)
    const [mitBeispielenSet, setMitBeispielenSet] = useState(() => new Set())

    const toggle = (slug) => {
        setOffenSet((prev) => {
            const neu = new Set(prev)
            if (neu.has(slug)) {
                neu.delete(slug)
            } else {
                neu.add(slug)
            }
            return neu
        })
    }

    const toggleBeispiel = (slug) => {
        setMitBeispielenSet((prev) => {
            const neu = new Set(prev)
            if (neu.has(slug)) {
                neu.delete(slug)
            } else {
                neu.add(slug)
            }
            return neu
        })
    }

    const getPromptText = (p, mitBeispiel) => {
        if (!mitBeispiel || !p.felder || p.felder.length === 0) return p.vorlage
        let text = p.vorlage
        for (const f of p.felder) {
            const ersatz = f.beispiel || `[${f.label}]`
            text = text.replaceAll(`{${f.key}}`, ersatz)
        }
        return text
    }

    const kopieren = async (text, slug) => {
        if (!text) return
        try {
            await navigator.clipboard.writeText(text)
            setKopiertSlug(slug)
            verleihe('Kopier-Abzeichen')
            toast('Prompt in die Zwischenablage kopiert!', '📋')
            setTimeout(() => {
                setKopiertSlug((alt) => (alt === slug ? null : alt))
            }, 1800)
        } catch {
            toast('Kopieren nicht möglich.', '⚠️')
        }
    }

    return (
        <ul className="link-cards prompt-card-list">
            {prompts.map((p) => {
                const isOffen = offenSet.has(p.slug)
                const isKopiert = kopiertSlug === p.slug
                const mitBeispiel = mitBeispielenSet.has(p.slug)
                const aktuellerText = getPromptText(p, mitBeispiel)
                const technikenText = (p.techniken || [])
                    .map((t) => (TECHNIKEN[t] ? TECHNIKEN[t][0] : t))
                    .join(' · ')
                const hatFelder = Boolean(p.felder && p.felder.length > 0)

                return (
                    <li key={p.slug} className={`prompt-card-item ${isOffen ? 'is-open' : ''}`}>
                        <div className="prompt-card-head">
                            <Link href={`/prompts/${p.slug}`}>
                                <strong>{p.title}</strong>
                            </Link>
                            {p.ziel && <span className="prompt-card-ziel">{p.ziel}</span>}
                            {technikenText && <span className="prompt-card-tech">{technikenText}</span>}
                        </div>

                        <div className="prompt-card-actions">
                            <button
                                type="button"
                                className="prompt-preview-toggle"
                                onClick={() => toggle(p.slug)}
                                aria-expanded={isOffen}
                                aria-label={`Prompt-Vorschau für ${p.title} ${isOffen ? 'schließen' : 'öffnen'}`}
                            >
                                {isOffen ? 'Vorschau schließen ▲' : 'Vorschau & Kopieren 👁️'}
                            </button>
                            <button
                                type="button"
                                className={`prompt-card-quick-copy ${isKopiert ? 'is-copied' : ''}`}
                                onClick={() => kopieren(aktuellerText, p.slug)}
                                title="Prompt sofort kopieren"
                                aria-label={`Prompt für ${p.title} kopieren`}
                            >
                                {isKopiert ? 'Kopiert ✓' : 'Kopieren 📋'}
                            </button>
                            <Link href={`/prompts/${p.slug}`} className="prompt-card-direct-link" title="Vorlage im interaktiven Editor anpassen">
                                Anpassen →
                            </Link>
                        </div>

                        {isOffen && (
                            <div className="prompt-inline-box" aria-label={`Inline-Vorschau: ${p.title}`}>
                                <div className="prompt-inline-controls">
                                    <button
                                        type="button"
                                        className={`button button-small prompt-inline-copy-btn ${isKopiert ? 'is-copied' : ''}`}
                                        onClick={() => kopieren(aktuellerText, p.slug)}
                                        title="Prompt-Text sofort in die Zwischenablage kopieren"
                                    >
                                        {isKopiert ? 'Kopiert ✓' : '⚡ Prompt kopieren 📋'}
                                    </button>
                                    {hatFelder && (
                                        <button
                                            type="button"
                                            className="prompt-inline-beispiel-btn"
                                            onClick={() => toggleBeispiel(p.slug)}
                                            title="Zwischen Platzhaltern und Beispieldaten umschalten"
                                        >
                                            {mitBeispiel ? 'Platzhalter {…} zeigen' : 'Mit Beispiel füllen ✨'}
                                        </button>
                                    )}
                                    {hatFelder && (
                                        <span className="prompt-inline-fields-hint">
                                            {p.felder.length} {p.felder.length === 1 ? 'Feld' : 'Felder'}
                                        </span>
                                    )}
                                    <Link href={`/prompts/${p.slug}`} className="prompt-inline-edit-link">
                                        Im Editor öffnen ↗
                                    </Link>
                                </div>
                                <pre className="prompt-inline-pre" tabIndex={0} role="region" aria-label="Prompt-Vorschautext">{aktuellerText}</pre>
                                <SendToAI prompt={aktuellerText} />
                            </div>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
