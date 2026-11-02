import { getDirectories } from '../../lib/data'
import { hasStatusIssue, getCheck } from '../../lib/checks'
import { getTools, toolHref, toolRel } from '../../lib/tools'
import { getPrompts } from '../../lib/prompts'
import { submitRel } from '../../lib/monetization'
import { dealLabel, formatVisits } from '../../utils/i18n-de'
import register from '../../db/partners.json'

// Deal, Prompt und Tool des Tages als kleine JSON-Datei. Die Seitenleiste und die Karte "Heute" lesen sie im Browser,
// damit im HTML jeder Seite nur feste Links stehen und nicht jeden Tag drei andere Seiten von allen Seiten verlinkt sind.
export const dynamic = 'force-static'

// Tageswechsel ohne Server: Die Seite wird täglich neu gebaut, der Tag des Jahres wählt Deal, Prompt und Tool.
const dayIndex = () => {
    const now = new Date()
    return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
}
const waehle = (liste, day) => (liste.length ? liste[day % liste.length] : null)

export function GET() {
    const day = dayIndex()

    const allDirs = getDirectories()

    // Eigene Rabattcodes und Partnerlinks zuerst, erst ohne solche auf alle Codes zurückfallen.
    const deals = allDirs.filter((d) => d.dealCode && !hasStatusIssue(d.slug))
    const eigene = deals.filter((d) => d.ownDeal || d.affiliate)
    const deal = waehle(eigene.length ? eigene : deals, day)

    // Gratis-Perle des Tages: tagesaktuell rotierende beste kostenlose Verzeichnisse,
    // bevorzugt dofollow-Portale mit hoher Reichweite und sauberer Einreichung.
    const dofollowFree = allDirs
        .filter((d) => (d.pricing === 'Free' || d.pricing === 'Freemium') && !hasStatusIssue(d.slug) && getCheck(d.slug)?.link_type === 'dofollow' && getCheck(d.slug)?.free_dofollow !== false)
        .sort((a, b) => b.domain_rating - a.domain_rating || b.monthly_visits - a.monthly_visits)
    const freePool = dofollowFree.length >= 5 ? dofollowFree : allDirs.filter((d) => d.pricing === 'Free' && !hasStatusIssue(d.slug)).sort((a, b) => b.domain_rating - a.domain_rating || b.monthly_visits - a.monthly_visits).slice(0, 30)
    const perle = waehle(freePool, day)

    // Tool des Tages: zuerst mit aktivem Partnerlink, dann Tools mit offenem Partnerprogramm laut Register, sonst alle.
    const tools = getTools()
    const mitProgramm = new Set(register.programme.filter((p) => p.tool_slug && p.programm === 'ja').map((p) => p.tool_slug))
    const partner = tools.filter((t) => t.affiliate)
    const offen = tools.filter((t) => mitProgramm.has(t.slug))
    const tool = waehle(partner.length ? partner : offen.length ? offen : tools, day)

    const pt = waehle(getPrompts(), day)

    const daten = {
        deal: deal && {
            slug: deal.slug,
            name: deal.name,
            text: dealLabel(deal.dealText),
            code: deal.dealCode,
            link: deal.submission_link,
            rel: submitRel(deal),
            partner: Boolean(deal.affiliate),
        },
        perle: perle && {
            slug: perle.slug,
            name: perle.name,
            dr: perle.domain_rating,
            traffic: formatVisits(perle.monthly_visits),
            link: perle.submission_link || perle.link,
            rel: submitRel(perle),
            partner: Boolean(perle.affiliate),
            dofollow: getCheck(perle.slug)?.link_type === 'dofollow',
        },
        prompt: pt && { slug: pt.slug, titel: pt.title, ziel: pt.ziel },
        tool: tool && {
            slug: tool.slug,
            name: tool.name,
            kategorie: tool.category,
            gratis: tool.free_plan === true,
            ab: tool.price_from || '',
            link: toolHref(tool),
            rel: toolRel(tool),
            partner: Boolean(tool.affiliate),
        },
    }
    return new Response(JSON.stringify(daten), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}
