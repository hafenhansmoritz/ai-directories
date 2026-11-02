'use client'

import Link from 'next/link'
import useTracker, { RANKS, rankFor } from './useTracker'
import { KONTO_AKTIV } from '../../lib/konto'

// Fortschritt, Rang und CSV-Export der eigenen Einträge.
export default function TrackerPanel({ directories }) {
    const { done, imKonto } = useTracker()
    const total = directories.length
    const count = directories.filter((d) => done.has(d.slug)).length
    const [, rank, text] = rankFor(count)
    const next = RANKS.find(([min]) => min > count)
    const percent = Math.round((count / total) * 100)

    const exportCsv = () => {
        const rows = [['Verzeichnis', 'Website', 'Einreichung', 'Status']]
        directories.forEach((d) =>
            rows.push([d.name, d.link, d.submission_link, done.has(d.slug) ? 'eingetragen' : 'offen'])
        )
        const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n')
        const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }))
        const a = document.createElement('a')
        a.href = url
        a.download = 'mentat-codes-tracker.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="tracker">
            <div className="tracker-head">
                <p className="tracker-rank">
                    Dein Rang: <strong>{rank}</strong>
                </p>
                <p className="tracker-count">
                    {count} von {total} eingetragen
                </p>
            </div>
            <div className="tracker-bar" role="progressbar" aria-label="Fortschritt deiner Einträge" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count}>
                <span style={{ width: `${Math.max(percent, count ? 2 : 0)}%` }} />
            </div>
            <p className="tracker-text">
                {text}
                {next ? ` Noch ${next[0] - count} bis „${next[1]}“.` : ''}
            </p>
            <p className="tracker-actions">
                <button type="button" className="button button-small" onClick={exportCsv}>
                    Meine Liste als CSV
                </button>
                <span className="tracker-hint">
                    {imKonto ? (
                        <>
                            Häkchen setzt du in der Tabelle, gespeichert wird in deinem Konto. Status, Notizen und Erinnerungen: <Link href="/launch-tracker">Launch-Tracker</Link>.
                        </>
                    ) : KONTO_AKTIV ? (
                        <>
                            Häkchen setzt du in der Tabelle, gespeichert wird nur in deinem Browser. Mit Konto bekommst du Status, Notizen und Erinnerungen im{' '}
                            <Link href="/launch-tracker">Launch-Tracker</Link>.
                        </>
                    ) : (
                        'Häkchen setzt du in der Tabelle. Gespeichert wird nur in deinem Browser.'
                    )}
                </span>
            </p>
        </div>
    )
}
