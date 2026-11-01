import db from '../db/directories.json'
import slugify from '../utils/slugify'
import getStats, { byRating } from '../utils/stats'
import { hasStatusIssue } from './checks'
import { ONLY_OWN_DEALS } from './monetization'
import { AFFILIATES, OWN_DEALS } from './partners'
import { isDrSuspect } from './fresh'
import { getScore } from './score'

// Ist ein Partnerprogramm hinterlegt, ersetzt dessen Link überall den normalen Einreichungslink.
const directories = db.data.map((d) => {
    const slug = slugify(d.name)
    const affiliate = AFFILIATES[slug]
    const own = OWN_DEALS[slug]
    const { dealCode, dealText, ...rest } = d
    const deal = own ? { dealCode: own.code, dealText: own.text, ownDeal: true } : ONLY_OWN_DEALS ? {} : { dealCode, dealText }
    return { ...rest, ...deal, slug, ...(affiliate && { submission_link: affiliate, affiliate: true }) }
})
const bySlug = new Map(directories.map((d) => [d.slug, d]))
const ranked = [...directories].sort(byRating)

export const getDirectories = () => directories
export const getDirectory = (slug) => bySlug.get(slug)
export const getSiteStats = () => getStats(directories)

// Schlanke Zeilen für die Tabellen im Browser: nur die angezeigten Felder, Score und Sperre schon auf dem Server berechnet.
// So landen weder checks.json noch die Score-Logik im Client-Bundle, und die Props bleiben klein.
export const tabellenZeilen = (liste) =>
    liste.map((d) => {
        const z = {
            name: d.name,
            slug: d.slug,
            link: d.link,
            submission_link: d.submission_link,
            domain_rating: d.domain_rating,
            monthly_visits: d.monthly_visits,
            pricing: d.pricing || '',
            submission_experience: d.submission_experience || '',
            score: getScore(d).total,
        }
        if (hasStatusIssue(d.slug)) z.blocked = true
        if (d.dealCode) z.deal = true
        if (d.affiliate) z.affiliate = true
        return z
    })

// Platz nach Domain Rating (1 = stärkste Domain)
export const getRank = (slug) => ranked.findIndex((d) => d.slug === slug) + 1

// Anteil der Liste mit weniger Traffic, z. B. 0.82 -> "mehr Besuche als 82 %"
export const getVisitsPercentile = (directory) => {
    const lower = directories.filter((d) => d.monthly_visits < directory.monthly_visits).length
    return Math.round((lower / directories.length) * 100)
}

// Ähnliche Verzeichnisse: gleiches Preismodell, möglichst nahe Domain Rating.
// Ohne gesperrte Einträge und ohne Domains, deren DR laut Semrush nicht stimmen kann.
export const getAlternatives = (directory, limit = 6) =>
    directories
        .filter((d) => d.slug !== directory.slug && d.pricing === directory.pricing && !hasStatusIssue(d.slug) && !isDrSuspect(d))
        .sort(
            (a, b) =>
                Math.abs(a.domain_rating - directory.domain_rating) - Math.abs(b.domain_rating - directory.domain_rating) ||
                b.monthly_visits - a.monthly_visits
        )
        .slice(0, limit)

export const LISTS = {
    kostenlos: {
        title: 'Kostenlose KI-Verzeichnisse',
        h1: (n) => `${n} kostenlose KI-Verzeichnisse für deinen Tool-Launch`,
        description: (n) =>
            `${n} KI-Verzeichnisse, in die du dein Tool gratis eintragen kannst. Mit Domain Rating, Traffic und Einschätzung, wie reibungslos die Einreichung läuft.`,
        lead: 'Null Budget, trotzdem Sichtbarkeit: Diese Verzeichnisse nehmen dein KI-Tool kostenlos auf. Sortiert nach Domain Rating, damit du mit den stärksten Domains anfängst. Schwäbische Hausfrauen und Startup-Gründer im Bootstrapping-Modus applaudieren.',
        filter: (d) => d.pricing === 'Free',
    },
    'domain-rating-50-plus': {
        title: 'KI-Verzeichnisse mit Domain Rating 50+',
        h1: (n) => `${n} starke KI-Verzeichnisse mit Domain Rating ab 50`,
        description: (n) =>
            `${n} Verzeichnisse und Startup-Plattformen mit Domain Rating 50 oder höher. Die Einträge, die für Backlinks und Markenbekanntheit am meisten bringen.`,
        lead: 'Wenn du nur Zeit für eine Handvoll Einträge hast, nimm diese. Hohe Domain Rating heißt: Der Link zählt mehr, und die Seite wird öfter von Google und KI-Suchen gecrawlt. Die Fitnessstudio-Fraktion unter den Domains, mit Bizeps und Backlinks.',
        filter: (d) => d.domain_rating >= 50,
    },
    rabattcodes: {
        title: 'Rabattcodes für KI-Verzeichnisse',
        h1: (n) => `${n} Rabattcodes für bezahlte Einträge in KI-Verzeichnissen`,
        description: (n) =>
            `${n} Rabattcodes für kostenpflichtige KI-Verzeichnisse, von 10 bis 70 % Nachlass. Mit Domain Rating und Traffic, damit du siehst, ob sich der Eintrag lohnt.`,
        lead: 'Bezahlte Einträge lohnen sich nur, wenn Preis und Reichweite zusammenpassen. Diese Codes drücken den Preis. Ob ein Code noch gilt, entscheidet der Anbieter, also vor dem Bezahlen testen. Black Friday ist hier an 365 Tagen, zumindest theoretisch.',
        filter: (d) => Boolean(d.dealCode),
    },
    'traffic-monster': {
        title: 'Traffic-Monster unter den KI-Verzeichnissen',
        h1: (n) => `${n} KI-Verzeichnisse mit mindestens 500.000 Besuchen im Monat`,
        description: (n) =>
            `${n} KI-Verzeichnisse und Startup-Plattformen mit mindestens 500.000 Besuchen pro Monat. Für Einträge, die nicht nur Backlinks, sondern echte Klicks bringen sollen.`,
        lead: 'Hier ist was los. Diese Verzeichnisse haben mindestens eine halbe Million Besuche im Monat. Das heißt nicht, dass alle auf deinen Eintrag klicken, aber die Chance ist größer als auf einem Linkfriedhof mit drei Besuchern und einem Bot.',
        filter: (d) => d.monthly_visits >= 500000,
    },
    geheimtipps: {
        title: 'Geheimtipps: starke Domains, wenig Konkurrenz',
        h1: (n) => `${n} Geheimtipps: kostenlose KI-Verzeichnisse mit starker Domain und wenig Trubel`,
        description: (n) =>
            `${n} kostenlose KI-Verzeichnisse mit Domain Rating ab 40, aber unter 50.000 Besuchen im Monat. Starke Links, die viele Gründer übersehen.`,
        lead: 'Domain Rating ab 40, kostenlos, aber kaum jemand redet drüber. Das sind die Verzeichnisse, die Jean zuerst abklappert, bevor alle anderen sie entdecken. Psst.',
        filter: (d) => d.pricing === 'Free' && d.domain_rating >= 40 && d.monthly_visits < 50000,
    },
    'finger-weg': {
        title: 'Finger weg: KI-Verzeichnisse mit hakeliger Einreichung',
        h1: (n) => `${n} KI-Verzeichnisse, bei denen die Einreichung hakt`,
        description: (n) =>
            `${n} KI-Verzeichnisse mit kaputten Formularen, Mail-Pflicht, langen Wartezeiten oder Pflicht-Backlinks. Damit du deine Zeit woanders investierst.`,
        lead: 'Kaputte Formulare, Einreichung nur per Mail, Wochen ohne Antwort oder Backlink-Pflicht: Hier wird es zäh. Nicht verboten, aber plan Geduld ein. Oder nimm erst die Geheimtipps.',
        filter: (d) => d.submission_experience === 'Bad',
    },
}

export const getList = (slug) => {
    const list = LISTS[slug]
    if (!list) return null
    const items = directories.filter(list.filter).sort(byRating)
    return { slug, ...list, items }
}
