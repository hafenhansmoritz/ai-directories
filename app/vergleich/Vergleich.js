'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitRel } from '../../lib/monetization'
import '../styles/c-start.css'
import { dealLabel, experienceLabel, formatRating, formatVisits, pricingLabel } from '../../utils/i18n-de'

const DEFAULTS = ['product-hunt', 'futurepedia', 'theres-an-ai-for-that']
const PRICE_RANK = { Free: 2, '': 1, Paid: 0 }
const EXP_RANK = { Good: 2, '': 1, Bad: 0 }

const ROWS = [
    // score und scoreLabel kommen fertig vom Server (app/vergleich/page.js).
    ['Jean-Score', (d) => `${d.score} (${d.scoreLabel})`, (d) => d.score],
    ['Domain Rating', (d) => formatRating(d.domain_rating), (d) => d.domain_rating],
    ['Besuche/Monat', (d) => formatVisits(d.monthly_visits), (d) => d.monthly_visits],
    ['Preis', (d) => pricingLabel(d.pricing), (d) => PRICE_RANK[d.pricing] ?? 1],
    ['Einreichung', (d) => experienceLabel(d.submission_experience), (d) => EXP_RANK[d.submission_experience] ?? 1],
    ['Rabatt', (d) => (d.dealCode ? dealLabel(d.dealText) : 'keiner'), (d) => (d.dealCode ? 1 : 0)],
]

export default function Vergleich({ options }) {
    const bySlug = Object.fromEntries(options.map((d) => [d.slug, d]))
    const [picked, setPicked] = useState(DEFAULTS.filter((s) => bySlug[s]))
    const chosen = picked.map((s) => bySlug[s]).filter(Boolean)

    const setAt = (i, slug) => {
        const next = [...picked]
        if (slug) next[i] = slug
        else next.splice(i, 1)
        setPicked(next.filter(Boolean))
    }

    return (
        <div className="vergleich">
            <div className="vergleich-picks">
                {[0, 1, 2].map((i) => (
                    <label key={i}>
                        <span>Verzeichnis {i + 1}</span>
                        <select id={`vergleich-${i}`} value={picked[i] || ''} onChange={(e) => setAt(i, e.target.value)}>
                            <option value="">(leer)</option>
                            {options.map((d) => (
                                <option key={d.slug} value={d.slug}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}
            </div>
            {chosen.length > 0 && (
                <div className="table-scroll">
                    <table>
                        <caption className="sr-only">Vergleich der gewählten KI-Verzeichnisse</caption>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <span className="sr-only">Kriterium</span>
                                </th>
                                {chosen.map((d) => (
                                    <th scope="col" key={d.slug}>
                                        <Link href={`/verzeichnis/${d.slug}`}>{d.name}</Link>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ROWS.map(([label, show, value]) => {
                                const best = Math.max(...chosen.map(value))
                                const tie = chosen.filter((d) => value(d) === best).length === chosen.length
                                return (
                                    <tr key={label}>
                                        <th scope="row">{label}</th>
                                        {chosen.map((d) => (
                                            <td key={d.slug} className={!tie && value(d) === best ? 'winner' : undefined}>
                                                {show(d)}
                                                {!tie && value(d) === best && chosen.length > 1 ? ' 👑' : ''}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                            <tr className="c-vergleich-eintragen">
                                <th scope="row">Eintragen</th>
                                {chosen.map((d) => (
                                    <td key={d.slug}>
                                        {d.blocked ? (
                                            <span className="submit-closed">gerade zu</span>
                                        ) : (
                                            <a className="button" href={d.submission_link} target="_blank" rel={submitRel(d)}>
                                                Eintragen ↗{d.affiliate && <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup>}
                                                <span className="sr-only"> bei {d.name} (öffnet in neuem Tab)</span>
                                            </a>
                                        )}
                                        {d.dealCode && !d.blocked && (
                                            <span className="c-vergleich-code">
                                                Code <code>{d.dealCode}</code>
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
