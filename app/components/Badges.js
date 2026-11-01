import { experienceLabel, pricingLabel } from '../../utils/i18n-de'

// Farbe und Text reichen: keine Emojis in den Plaketten, die Tabelle hat 256 Zeilen davon.
export function PriceBadge({ value }) {
    if (!value) return <span className="badge badge-neutral">{pricingLabel(value)}</span>
    return <span className={`badge ${value === 'Free' ? 'badge-good' : 'badge-bad'}`}>{pricingLabel(value)}</span>
}

export function ExperienceBadge({ value, blocked = false }) {
    if (blocked) return <span className="badge badge-bad">Gerade zu</span>
    if (!value) return <span className="badge badge-neutral">{experienceLabel(value)}</span>
    return <span className={`badge ${value === 'Good' ? 'badge-good' : 'badge-bad'}`}>{experienceLabel(value)}</span>
}
