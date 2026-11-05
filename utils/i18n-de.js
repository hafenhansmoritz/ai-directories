// Deutsche Anzeige-Labels für die englischen Datenwerte in /directories.
// Die Rohwerte (Good/Bad, Free/Paid) bleiben unverändert, weil API und Generatoren darauf prüfen.

const EXPERIENCE = {
    Good: 'Reibungslos',
    Bad: 'Hakelig',
    Tested: 'Geprüft',
    Untested: 'Noch nicht getestet',
    '': 'Noch nicht getestet',
}

const PRICING = {
    Free: 'Kostenlos',
    Paid: 'Kostenpflichtig',
    Unclear: 'Unklar',
    '': 'Unklar',
}

const experienceLabel = (value) => EXPERIENCE[value] ?? EXPERIENCE['']
const pricingLabel = (value) => PRICING[value] ?? PRICING['']

// "20% Discount" -> "20 % Rabatt", "Buy 1 take 2" -> "2 Einträge zum Preis von 1"
const dealLabel = (text = '') => {
    const percent = text.match(/(\d+)\s*%\s*discount/i)
    if (percent) return `${percent[1]} % Rabatt`
    if (/buy 1 take 2/i.test(text)) return '2 Einträge zum Preis von 1'
    return text
}

const formatNumber = (value) => new Intl.NumberFormat('de-DE').format(value)

// Kompakt für Fließtext und Tabellen: 3000000 -> "3 Mio.", 84700 -> "84.700"
const formatVisits = (value) => {
    if (!value) return 'k. A.'
    if (value >= 1000000) {
        return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value / 1000000)} Mio.`
    }
    return formatNumber(value)
}

const formatRating = (value) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value)

module.exports = { EXPERIENCE, PRICING, experienceLabel, pricingLabel, dealLabel, formatNumber, formatVisits, formatRating }
