'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { toast, verleihe } from '../../lib/herz'
import { ladeVollstaendigesLaunchKit, baueLaunchTexte, baueUtmLink, baueLaunchZusammenfassung } from '../../lib/launch'

export default function VerzeichnisLaunchKitBox({ slug, directoryName }) {
    const [kit, setKit] = useState(null)
    const [offen, setOffen] = useState(true)
    const [langOffen, setLangOffen] = useState(false)
    const [kopiertFeld, setKopiertFeld] = useState(null)

    useEffect(() => {
        const laden = () => {
            setKit(ladeVollstaendigesLaunchKit())
        }
        laden()
        window.addEventListener('storage', laden)
        window.addEventListener('mentat-sync', laden)
        return () => {
            window.removeEventListener('storage', laden)
            window.removeEventListener('mentat-sync', laden)
        }
    }, [])

    const texte = useMemo(() => (kit ? baueLaunchTexte(kit) : null), [kit])
    const utmLink = useMemo(() => (kit?.url ? baueUtmLink(kit.url, slug) : ''), [kit?.url, slug])
    const zusammenfassung = useMemo(() => (kit ? baueLaunchZusammenfassung(kit, slug, directoryName) : ''), [kit, slug, directoryName])

    const kopieren = (text, label, feldKey) => {
        if (!text) return
        try {
            navigator.clipboard.writeText(text)
            setKopiertFeld(feldKey)
            verleihe('Kopier-Abzeichen')
            toast(`${label} kopiert!`, '📋')
            setTimeout(() => {
                setKopiertFeld((alt) => (alt === feldKey ? null : alt))
            }, 1800)
        } catch {
            toast('Kopieren fehlgeschlagen.', '⚠️')
        }
    }

    if (!kit || !texte) {
        return (
            <div className="launchkit-box launchkit-box-empty" aria-label="Launch-Kit Hinweis">
                <span className="launchkit-box-icon" aria-hidden="true">💡</span>
                <div className="launchkit-box-empty-text">
                    <strong>Launch-Kit: Texte mit 1 Klick ins Formular kopieren</strong>
                    <p>
                        Hinterlege Name, Beschreibung und Website deines Tools einmalig im{' '}
                        <Link href="/launch-kit">Launch-Kit</Link>. Dann erscheinen deine fertigen Vorlagen und dein
                        persönlicher UTM-Link direkt hier auf jeder Detailseite zum schnellen Ausfüllen.
                    </p>
                </div>
                <Link href="/launch-kit" className="button button-small launchkit-box-btn">
                    Launch-Kit öffnen →
                </Link>
            </div>
        )
    }

    const felder = [
        {
            key: 'name',
            label: 'Tool-Name',
            wert: kit.name || '',
            sub: null,
        },
        ...(utmLink
            ? [
                  {
                      key: 'url',
                      label: `Website mit UTM-Tracking für ${directoryName}`,
                      wert: utmLink,
                      sub: `utm_source=${slug}&utm_medium=directory&utm_campaign=launch`,
                  },
              ]
            : []),
        {
            key: 'einzeilerDe',
            label: 'Einzeiler (Deutsch)',
            wert: texte.einzeilerDe,
            sub: `${texte.einzeilerDe.length} Zeichen`,
        },
        {
            key: 'einzeilerEn',
            label: 'Tagline (English)',
            wert: texte.einzeilerEn,
            sub: `${texte.einzeilerEn.length} Zeichen`,
        },
        {
            key: 'kurzDe',
            label: 'Kurzbeschreibung (Deutsch)',
            wert: texte.kurzDe,
            sub: `${texte.kurzDe.length} Zeichen`,
        },
        {
            key: 'kurzEn',
            label: 'Short description (English)',
            wert: texte.kurzEn,
            sub: `${texte.kurzEn.length} Zeichen`,
        },
        {
            key: 'tags',
            label: 'Tags / Schlagwörter',
            wert: texte.tags,
            sub: null,
        },
    ]

    return (
        <section className="launchkit-box" aria-label={`Launch-Kit Vorlagen für ${directoryName}`}>
            <div className="launchkit-box-header">
                <div className="launchkit-box-title-wrap">
                    <span className="launchkit-box-icon" aria-hidden="true">📋</span>
                    <div>
                        <h3 className="launchkit-box-title">
                            Deine Launch-Kit-Texte für {directoryName}
                        </h3>
                        <p className="launchkit-box-subtitle">
                            Aus deinem Browser-Launch-Kit für {kit.name || 'dein Tool'}: 1 Klick kopiert den Wert für dein
                            Eintragsformular.
                        </p>
                    </div>
                </div>
                <div className="launchkit-box-header-actions">
                    <button
                        type="button"
                        className={`button button-small launchkit-copy-btn ${kopiertFeld === 'alles' ? 'is-copied' : ''}`}
                        onClick={() => kopieren(zusammenfassung, `Alle Vorlagen für ${directoryName}`, 'alles')}
                        title="Alle Texte für dieses Verzeichnis auf einmal in die Zwischenablage kopieren"
                    >
                        {kopiertFeld === 'alles' ? 'Alles kopiert ✓' : '⚡ Alles kopieren'}
                    </button>
                    <Link href="/launch-kit" className="launchkit-edit-link" title="Texte im Launch-Kit bearbeiten">
                        Launch-Kit anpassen ↗
                    </Link>
                    <button
                        type="button"
                        className="launchkit-toggle-btn"
                        onClick={() => setOffen((v) => !v)}
                        aria-expanded={offen}
                    >
                        {offen ? 'Einklappen ▲' : 'Ausklappen ▼'}
                    </button>
                </div>
            </div>

            {offen && (
                <div className="launchkit-box-body">
                    <div className="launchkit-grid">
                        {felder.map((f) => {
                            const istKopiert = kopiertFeld === f.key
                            return (
                                <div key={f.key} className="launchkit-item">
                                    <div className="launchkit-item-meta">
                                        <span className="launchkit-item-label">{f.label}</span>
                                        {f.sub && <span className="launchkit-item-sub">{f.sub}</span>}
                                    </div>
                                    <div className="launchkit-item-control">
                                        <div className="launchkit-item-preview" title={f.wert}>
                                            {f.wert}
                                        </div>
                                        <button
                                            type="button"
                                            className={`button button-small launchkit-copy-btn ${istKopiert ? 'is-copied' : ''}`}
                                            onClick={() => kopieren(f.wert, f.label, f.key)}
                                            aria-label={`${f.label} in Zwischenablage kopieren`}
                                        >
                                            {istKopiert ? 'Kopiert ✓' : 'Kopieren 📋'}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="launchkit-expand-section">
                        <button
                            type="button"
                            className="launchkit-expand-toggle"
                            onClick={() => setLangOffen((v) => !v)}
                            aria-expanded={langOffen}
                        >
                            {langOffen ? 'Langbeschreibungen ausblenden ▲' : 'Langbeschreibungen (DE & EN) anzeigen ▼'}
                        </button>
                        {langOffen && (
                            <div className="launchkit-lang-grid">
                                <div className="launchkit-lang-item">
                                    <div className="launchkit-item-meta">
                                        <span className="launchkit-item-label">Langbeschreibung (Deutsch)</span>
                                        <button
                                            type="button"
                                            className={`button button-small launchkit-copy-btn ${kopiertFeld === 'langDe' ? 'is-copied' : ''}`}
                                            onClick={() => kopieren(texte.langDe, 'Langbeschreibung (DE)', 'langDe')}
                                        >
                                            {kopiertFeld === 'langDe' ? 'Kopiert ✓' : 'Kopieren 📋'}
                                        </button>
                                    </div>
                                    <pre className="launchkit-lang-pre">{texte.langDe}</pre>
                                </div>
                                <div className="launchkit-lang-item">
                                    <div className="launchkit-item-meta">
                                        <span className="launchkit-item-label">Long description (English)</span>
                                        <button
                                            type="button"
                                            className={`button button-small launchkit-copy-btn ${kopiertFeld === 'langEn' ? 'is-copied' : ''}`}
                                            onClick={() => kopieren(texte.langEn, 'Long description (EN)', 'langEn')}
                                        >
                                            {kopiertFeld === 'langEn' ? 'Kopiert ✓' : 'Kopieren 📋'}
                                        </button>
                                    </div>
                                    <pre className="launchkit-lang-pre">{texte.langEn}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
