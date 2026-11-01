// KI- und Launch-Werkzeuge: Fakten nur von den offiziellen Seiten der Anbieter (Quelle je Eintrag in db/tools.json).
import data from '../db/tools.json'
import { TOOL_AFFILIATES } from './partners'
import { partnerRel } from './monetization'

export const TOOLS_STAND = 'Oktober 2026'

const tools = data
    .map((t) => ({ ...t, affiliate: TOOL_AFFILIATES[t.slug] || null }))
    .sort((a, b) => a.name.localeCompare(b.name, 'de'))

export const getTools = () => tools
export const getTool = (slug) => tools.find((t) => t.slug === slug)
export const getCategories = () => [...new Set(tools.map((t) => t.category))].sort((a, b) => a.localeCompare(b, 'de'))
export const getAlternatives = (tool) => tools.filter((t) => t.category === tool.category && t.slug !== tool.slug)
// Anbieter-Link eines Tools: Partnerlink aus db/affiliate-links.json, sonst die normale Website. Gilt auch für Einträge
// der KI-Tool-Datenbank (lib/kb.js), die affiliate und url genauso führen.
export const toolHref = (t) => t.affiliate || t.url
export const toolRel = (t) => partnerRel(t.affiliate)
export { partnerRel }
