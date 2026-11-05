'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PriceBadge, ExperienceBadge } from './Badges'
import { formatRating, formatVisits } from '../../utils/i18n-de'
import { submitRel } from '../../lib/monetization'
import { toast } from '../../lib/herz'
import { baueUtmLink, haengeUtmAn } from '../../lib/launch'

export default function LaunchSpeedrun({ directories, done, onToggle, launchKit, utmAktiv = false }) {
    const [open, setOpen] = useState(false)
    const [skipped, setSkipped] = useState(() => new Set())

    // Alle kostenlosen, unblockierten Verzeichnisse sortiert nach Jean-Score & DR
    const { offene, totalKostenlos, erledigtKostenlos } = useMemo(() => {
        const kostenlose = directories.filter((d) => !d.blocked && d.pricing === 'Free')
        const total = kostenlose.length
        const erledigt = kostenlose.filter((d) => done.has(d.slug)).length

        const kandidaten = kostenlose
            .filter((d) => !done.has(d.slug) && !skipped.has(d.slug))
            .sort((a, b) => (b.score || 0) - (a.score || 0) || (b.domain_rating || 0) - (a.domain_rating || 0) || (b.monthly_visits || 0) - (a.monthly_visits || 0))

        return {
            offene: kandidaten,
            totalKostenlos: total,
            erledigtKostenlos: erledigt,
        }
    }, [directories, done, skipped])

    const naechstes = offene[0]
    const prozent = totalKostenlos > 0 ? Math.round((erledigtKostenlos / totalKostenlos) * 100) : 0
    const alleErledigt = totalKostenlos > 0 && erledigtKostenlos >= totalKostenlos

    const handleErledigt = () => {
        if (!naechstes) return
        const name = naechstes.name
        onToggle(naechstes.slug)
        toast(`${name} als eingetragen markiert! Nächstes Verzeichnis geladen.`, '🚀')
    }

    const handleSkip = () => {
        if (!naechstes) return
        const name = naechstes.name
        setSkipped((prev) => new Set([...prev, naechstes.slug]))
        toast(`${name} übersprungen.`, '↷')
    }

    const handleResetSkipped = () => {
        setSkipped(new Set())
        toast('Übersprungene Verzeichnisse wieder aktiviert.', '🔄')
    }

    if (!open) {
        return (
            <div className="speedrun-launcher">
                <button
                    type="button"
                    className="speedrun-trigger-btn"
                    onClick={() => setOpen(true)}
                    aria-expanded={false}
                    title="Launch-Speedrun starten: Das nächste beste kostenlose Verzeichnis sofort einreichen"
                >
                    <span className="speedrun-trigger-main">
                        <span className="speedrun-badge">🚀 Launch-Speedrun</span>
                        <span className="speedrun-label">
                            Nächstes offenes Top-Verzeichnis:
                            {naechstes ? (
                                <strong className="speedrun-target-preview">
                                    {' '}{naechstes.name} (Score {naechstes.score}, DR {formatRating(naechstes.domain_rating)})
                                </strong>
                            ) : alleErledigt ? (
                                <strong> Alle {totalKostenlos} kostenlosen eingetragen!</strong>
                            ) : (
                                <strong> {totalKostenlos - erledigtKostenlos} noch offen</strong>
                            )}
                        </span>
                    </span>
                    <span className="speedrun-arrow">Speedrun starten →</span>
                </button>
            </div>
        )
    }

    return (
        <section className="speedrun-card" aria-label="Launch-Speedrun Modus">
            <div className="speedrun-header">
                <div className="speedrun-title-group">
                    <span className="speedrun-badge">🚀 Launch-Speedrun Modus</span>
                    <strong className="speedrun-title">Nächstes offenes Top-Verzeichnis</strong>
                    <span className="speedrun-progress-text">
                        {erledigtKostenlos} von {totalKostenlos} kostenlos eingetragen ({prozent} %)
                    </span>
                </div>
                <button
                    type="button"
                    className="speedrun-close-btn"
                    onClick={() => setOpen(false)}
                    aria-label="Speedrun pausieren"
                    title="Speedrun schließen"
                >
                    ✕ Pause
                </button>
            </div>

            <div className="speedrun-bar" role="progressbar" aria-label="Speedrun-Fortschritt" aria-valuemin={0} aria-valuemax={totalKostenlos} aria-valuenow={erledigtKostenlos}>
                <span style={{ width: `${Math.max(prozent, erledigtKostenlos ? 3 : 0)}%` }} />
            </div>

            {naechstes ? (
                <div className="speedrun-body">
                    <div className="speedrun-target-header">
                        <div>
                            <span className="speedrun-rank-pill">Top-Empfehlung #{erledigtKostenlos + 1}</span>
                            <h3 className="speedrun-target-name">
                                <Link href={`/verzeichnis/${naechstes.slug}`} target="_blank" title="Steckbrief in neuem Tab öffnen">
                                    {naechstes.name} ↗
                                </Link>
                            </h3>
                        </div>
                        <div className="speedrun-pills">
                            <span className="score-pill" style={{ '--score': naechstes.score }} title="Jean-Score">
                                Score {naechstes.score}
                            </span>
                            <span className="speedrun-pill dr-pill" title="Domain Rating">
                                DR {formatRating(naechstes.domain_rating)}
                            </span>
                            <span className="speedrun-pill visits-pill" title="Besuche im Monat">
                                {formatVisits(naechstes.monthly_visits)}/Mo
                            </span>
                            <PriceBadge value={naechstes.pricing} />
                            <ExperienceBadge value={naechstes.submission_experience} blocked={naechstes.blocked} />
                            {naechstes.dofollow && (
                                <span className="speedrun-pill dofollow-pill" title="Liefert einen Dofollow-Backlink">
                                    Dofollow ✓
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="speedrun-take">
                        <strong>Jean sagt:</strong>{' '}
                        {naechstes.domain_rating >= 70
                            ? 'Echtes Schwergewicht: Starke Domain, hoher Traffic und die Basiseinreichung kostet keinen Cent. Formular öffnen, dein Projekt eintragen und direkt weiter!'
                            : naechstes.dofollow
                            ? 'Kostenlos und liefert einen wertvollen Dofollow-Backlink für dein Google-Ranking. Reiche dein Tool kurz ein und klicke dann auf „Erledigt, nächstes!“. '
                            : 'Schnell eingereicht, kostenlos und bringt die ersten echten Erwähnungen. Kurz ausfüllen und den nächsten Backlink sichern!'}
                    </p>

                    {launchKit?.url && (
                        <div className="speedrun-utm-row">
                            <span className="speedrun-utm-label">Dein persönlicher UTM-Link für {naechstes.name}:</span>
                            <div className="speedrun-utm-input-wrap">
                                <input
                                    type="text"
                                    readOnly
                                    value={baueUtmLink(launchKit.url, naechstes.slug)}
                                    className="speedrun-utm-input"
                                    title="Diesen Link im Verzeichnisformular als Website deines Tools eintragen"
                                />
                                <button
                                    type="button"
                                    className="speedrun-utm-btn"
                                    onClick={() => {
                                        const l = baueUtmLink(launchKit.url, naechstes.slug)
                                        try {
                                            navigator.clipboard.writeText(l)
                                            toast(`UTM-Link für ${naechstes.name} kopiert!`, '📋')
                                        } catch {
                                            toast('Kopieren fehlgeschlagen.', '⚠️')
                                        }
                                    }}
                                    title="UTM-Link in die Zwischenablage kopieren"
                                >
                                    📋 Kopieren
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="speedrun-actions">
                        <a
                            href={utmAktiv ? haengeUtmAn(naechstes.submission_link, naechstes.slug) : naechstes.submission_link}
                            target="_blank"
                            rel={submitRel(naechstes)}
                            className="button speedrun-btn-submit"
                            aria-label={`Einreichformular für ${naechstes.name} in neuem Tab öffnen`}
                        >
                            1. Formular öffnen: {naechstes.name} ↗{naechstes.affiliate && <sup>*</sup>}
                        </a>
                        <button
                            type="button"
                            className="button speedrun-btn-done"
                            onClick={handleErledigt}
                            title="Als eingetragen markieren und sofort das nächste Verzeichnis laden"
                        >
                            2. ✓ Erledigt, nächstes!
                        </button>
                        <button
                            type="button"
                            className="speedrun-btn-skip"
                            onClick={handleSkip}
                            title="Dieses Verzeichnis vorerst überspringen"
                        >
                            Überspringen ↷
                        </button>
                    </div>
                </div>
            ) : alleErledigt ? (
                <div className="speedrun-complete">
                    <p className="speedrun-complete-title">🎉 Wahnsinn! Alle {totalKostenlos} kostenlosen Top-Verzeichnisse eingetragen!</p>
                    <p className="speedrun-complete-text">
                        <strong>Jean sagt:</strong> Du bist eine echte Maschine. Dein Tool hat jetzt das solide Backlink-Fundament, von dem andere nur träumen. Gönn dir einen Kaffee oder sieh dir die kuratierten Bezahl-Verzeichnisse an.
                    </p>
                </div>
            ) : (
                <div className="speedrun-skipped-empty">
                    <p>Du hast alle verbleibenden {skipped.size} offenen Verzeichnisse übersprungen.</p>
                    <button type="button" className="button button-small" onClick={handleResetSkipped}>
                        Übersprungene wieder aufnehmen 🔄
                    </button>
                </div>
            )}
        </section>
    )
}
