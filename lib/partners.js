// Partnerlinks und eigene Rabattcodes für die Website. Quelle ist die zentrale Sammlung db/affiliate-links.json,
// verknüpft über die id mit den Programmen in db/partners.json (Slugs, Domain). Ein eingetragener Link gilt als aktiv;
// ein eingetragener Code ersetzt den Rabattcode des Verzeichnisses. Fremde Links und Codes nutzt die Seite nie.
// Bewusst getrennt von lib/monetization.js, damit das Register nicht im Browser-Bundle landet.
import register from '../db/partners.json'
import sammlung from '../db/affiliate-links.json'

// Einträge, die für mentat.codes gelten: projekte leer oder mit 'mentat.codes' / 'aigeddon'.
const fuerUns = sammlung.links.filter((l) => l.bestaetigt !== false && (!l.projekte?.length || l.projekte.includes('mentat.codes') || l.projekte.includes('aigeddon')))
const linkById = new Map(fuerUns.filter((l) => l.link).map((l) => [l.id, l.link]))
const codeById = new Map(fuerUns.filter((l) => l.code).map((l) => [l.id, { code: l.code, text: l.rabatt || 'discount' }]))

const mitLink = register.programme.filter((p) => linkById.has(p.id))
const bySlug = (key) => Object.fromEntries(mitLink.filter((p) => p[key]).map((p) => [p[key], linkById.get(p.id)]))

// Verzeichnisse: slug -> Affiliate-URL
export const AFFILIATES = bySlug('directory_slug')

// Werkzeuge im Tool-Verzeichnis: slug (wie in db/tools.json) -> Affiliate-URL
export const TOOL_AFFILIATES = bySlug('tool_slug')

// Alle übrigen Anbieter nach Domain (ohne www): host -> Affiliate-URL. Greift z. B. für die 705 Tools der
// KI-Tool-Datenbank, sobald für die Domain ein Programm in db/partners.json und ein Link in der Sammlung steht.
export const HOST_AFFILIATES = bySlug('host')

// Eigene Rabattcodes: slug -> { code, text }, text im Format der Rohdaten, z. B. '30% discount'
export const OWN_DEALS = Object.fromEntries(
    register.programme.filter((p) => p.directory_slug && codeById.has(p.id)).map((p) => [p.directory_slug, codeById.get(p.id)])
)
