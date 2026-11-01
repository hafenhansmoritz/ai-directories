'use client'

import { useState } from 'react'
import Link from 'next/link'
import konfetti from '../../lib/konfetti'
import { submitRel } from '../../lib/monetization'

const SPRUECHE = [
    (d) => `Ich sag: ${d.name}. Und ich lieg selten daneben, höchstens beim Tippen.`,
    (d) => `${d.name} hat gesprochen. Widerspruch ist zwecklos.`,
    (d) => `Das Orakel sagt: ${d.name}. Das Orakel hat keine Ahnung von SEO, aber Selbstvertrauen.`,
    (d) => `${d.name}! Trag dich ein, bevor du es dir anders überlegst.`,
    (d) => `Der Würfel ist gefallen. Auf ${d.name}. Ob das klug ist, steht in der Tabelle.`,
    (d) => `${d.name} wartet schon. Wie ein Hund an der Tür, nur mit Domain Rating.`,
]

const pick = (list) => list[Math.floor(Math.random() * list.length)]

export default function SchicksalsWuerfel({ options }) {
    const [result, setResult] = useState(null)
    const [rolls, setRolls] = useState(0)

    const roll = () => {
        let next = pick(options)
        if (options.length > 1) {
            while (result && next.slug === result.d.slug) next = pick(options)
        }
        setResult({ d: next, line: pick(SPRUECHE)(next) })
        setRolls((n) => n + 1)
        konfetti(30)
    }

    return (
        <div className="dice-box">
            <button type="button" className="button dice-button" onClick={roll}>
                <span className={`dice ${rolls ? 'dice-rolling' : ''}`} key={rolls} aria-hidden="true">
                    🎲
                </span>{' '}
                {rolls ? 'Nochmal würfeln' : 'Schicksal würfeln'}
            </button>
            <div className="dice-result" aria-live="polite">
                {!result && <p>Keine Lust auf Tabellen? Der Würfel wählt ein kostenloses, reibungsloses Verzeichnis für dich.</p>}
                {result && (
                    <>
                        <p className="dice-line">🧔 {result.line}</p>
                        <p>
                            <Link href={`/verzeichnis/${result.d.slug}`}>
                                <strong>{result.d.name}</strong> im Detail
                            </Link>{' '}
                            ·{' '}
                            <a href={result.d.submission_link} target="_blank" rel={submitRel(result.d)}>
                                direkt eintragen ↗{result.d.affiliate && <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup>}
                            </a>
                        </p>
                        {rolls >= 5 && <p className="dice-note">{rolls}-mal gewürfelt. Du könntest in der Zeit längst eingetragen sein.</p>}
                    </>
                )}
            </div>
        </div>
    )
}
