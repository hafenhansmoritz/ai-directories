// Baut db/kb-tools.json aus den drei größten frei lizenzierten KI-Tool-Listen auf GitHub.
// Aufruf: node utils/kb/import.js <ordner-mit-geklonten-repos>
// Übernommen werden nur Fakten-Atome: Name, URL, Rubrik, Kurzbeschreibung (englisch, Quelle genannt),
// Preisangabe falls vorhanden. Lizenz und Quelle stehen in jedem Eintrag und in db/kb-sources.json.
const fs = require('fs')
const path = require('path')

const SRC = process.argv[2]
if (!SRC) throw new Error('Ordner mit den geklonten Listen angeben')

const SOURCES = [
    { id: 'steven2358', repo: 'steven2358/awesome-generative-ai', dir: 'awesome-generative-ai', license: 'CC0-1.0', stars: 12749, forks: 2460 },
    { id: 'mahseema', repo: 'mahseema/awesome-ai-tools', dir: 'awesome-ai-tools', license: 'MIT', stars: 6457, forks: 2406 },
    { id: 'ikaijua', repo: 'ikaijua/Awesome-AITools', dir: 'Awesome-AITools', license: 'CC-BY-4.0', stars: 6233, forks: 942 },
]

// Rubriken der Quellen -> eigene deutsche Rubriken. Unbekannte Rubriken werden übersprungen
// (Lernmaterial, Listen, Sponsoren, Forschung).
const RUBRIK = [
    [/chatbot|assistants? & proprietary|general llm app|custom interface|ai assistant/i, 'chatbots'],
    [/search engine/i, 'suche'],
    [/writing|other text|translation/i, 'schreiben'],
    [/chatgpt ext|productivity|office|meeting|customer support|phone call/i, 'produktivitaet'],
    [/academ|research|ocr/i, 'recherche'],
    [/coding|code|developer|playground|devtool|gpu prog/i, 'coding'],
    [/agent(?!.*skill)|autonomous/i, 'agenten'],
    [/agent skills/i, 'agenten'],
    [/image|graphic|stable diffusion|ui design/i, 'bild'],
    [/video|avatar|animation/i, 'video'],
    [/speech|tts|text-to-speech|voice|subtitle/i, 'audio'],
    [/music|sound/i, 'musik'],
    [/marketing/i, 'marketing'],
    [/model|llm|leaderboard|inference|deployment|training|infrastructure|local search|local llm/i, 'modelle'],
    [/detection|security/i, 'sicherheit'],
    [/finance|quant/i, 'finanzen'],
]

const SKIP = /recommended reading|milestones|learning|learn ai|more lists|lists on|related awesome|contents|sponsor|editor's choice|news|humanoid|embodied|nvidia|all categories|archive|machine learning|deep learning|prompts/i

// Layer A: unsichtbare Unicode-Zeichen aus fremden Listen entfernen
const clean = (s) =>
    s
        .replace(/[\u200b-\u200f\u2060-\u2064\ufeff\u00ad\u202a-\u202e]/g, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/\*\*|__|`/g, '')
        .replace(/\s+/g, ' ')
        .trim()

const domainOf = (url) => {
    try {
        const u = new URL(url)
        const host = u.hostname.replace(/^w{3,4}\./, '')
        if (host === 'github.com') return `github.com/${u.pathname.split('/').slice(1, 3).join('/').toLowerCase()}`
        if (host === 'huggingface.co') return `huggingface.co/${u.pathname.split('/').slice(1, 4).join('/').toLowerCase()}`
        return host
    } catch {
        return null
    }
}

// Fremde Referral- und Tracking-Parameter der Quelllisten (z. B. ?ref=mahseema-awesome-ai-tools) nicht übernehmen.
// Eigene Partnerlinks stehen nur in db/affiliate-links.json (CLAUDE.md). lib/kb.js filtert zusätzlich beim Lesen.
const TRACKING = /^(ref|via|fpr|aff|aff_id|affiliate|afmc|referral|ref_id|refer|fp_ref|a_aid|irclickid|sscid|ps_partner_key|utm_[a-z]+)$/i
const ohneTracking = (url) => {
    try {
        const u = new URL(url)
        const weg = [...u.searchParams.keys()].filter((k) => TRACKING.test(k))
        if (!weg.length) return url
        for (const k of weg) u.searchParams.delete(k)
        return u.toString()
    } catch {
        return url
    }
}

const slugify = require('../slugify')

function parse(source) {
    const md = fs.readFileSync(path.join(SRC, source.dir, 'README.md'), 'utf8')
    const out = []
    let h2 = '',
        h3 = ''
    for (const line of md.split('\n')) {
        const h = line.match(/^(#{2,3})\s+(.*)/)
        if (h) {
            if (h[1] === '##') (h2 = clean(h[2])), (h3 = '')
            else h3 = clean(h[2])
            continue
        }
        const heading = `${h2} ${h3}`
        if (!h2 || SKIP.test(h3 || h2)) continue
        const rubrik = (RUBRIK.find(([re]) => re.test(h3)) || RUBRIK.find(([re]) => re.test(h2)) || [])[1]
        if (!rubrik) continue
        let name, url, desc, fees
        const li = line.match(/^[-*]\s+(?:\*\*)?\[([^\]]+)\]\((https?:[^)\s]+)\)(?:\*\*)?\s*[-–—:]?\s*(.*)$/)
        if (li) [, name, url, desc] = li
        else if (line.startsWith('|') && !/^\|\s*(name|---)/i.test(line)) {
            const cells = line.split('|').slice(1, -1).map((c) => c.trim())
            if (cells.length < 3) continue
            const link = cells[2].match(/\((https?:[^)\s]+)\)/)
            if (!link) continue
            ;[name, desc, url, fees] = [clean(cells[0]), cells[1], link[1], cells[3] && clean(cells[3])]
        } else continue
        name = clean(name)
        url = ohneTracking(url)
        desc = clean(desc || '').replace(/^[-–—:]\s*/, '')
        if (!name || !url || /awesome|^\s*$/i.test(name) || /#/.test(url.slice(0, 1))) continue
        const domain = domainOf(url)
        if (!domain || /shields\.io|awesome\.re/.test(domain)) continue
        out.push({ name, url, domain, rubrik, heading: heading.trim(), desc: desc.slice(0, 300), fees: fees || null, source: source.id })
    }
    return out
}

// Tote Domains (db/kb-tot.json) nicht übernehmen, sonst kämen sie beim monatlichen Import zurück.
const TOT = new Set(require('../../db/kb-tot.json').eintraege.map((e) => e.domain))
const all = SOURCES.flatMap(parse).filter((e) => !TOT.has(e.domain))
const byDomain = new Map()
for (const e of all) {
    const cur = byDomain.get(e.domain)
    if (!cur) {
        byDomain.set(e.domain, { name: e.name, url: e.url, domain: e.domain, rubrik: e.rubrik, rubriken: [e.rubrik], beschreibung: e.desc, beschreibung_quelle: e.source, preis: e.fees, quellen: [e.source] })
        continue
    }
    if (!cur.quellen.includes(e.source)) cur.quellen.push(e.source)
    if (!cur.rubriken.includes(e.rubrik)) cur.rubriken.push(e.rubrik)
    if (!cur.beschreibung && e.desc) Object.assign(cur, { beschreibung: e.desc, beschreibung_quelle: e.source })
    if (!cur.preis && e.fees) cur.preis = e.fees
}

const slugs = new Set()
const tools = [...byDomain.values()]
    .map((t) => {
        let slug = slugify(t.name) || slugify(t.domain)
        while (slugs.has(slug)) slug = `${slug}-${slugify(t.domain).slice(0, 12)}`
        slugs.add(slug)
        // Hauptrubrik: die häufigste konkrete Rubrik; „modelle“ nur, wenn es keine andere gibt
        const konkret = t.rubriken.filter((r) => r !== 'modelle')
        return {
            slug,
            ...t,
            rubrik: konkret[0] || t.rubrik,
            open_source: /^github\.com\//.test(t.domain) || /open[- ]source/i.test(t.beschreibung),
        }
    })
    .sort((a, b) => b.quellen.length - a.quellen.length || a.name.localeCompare(b.name))

const root = path.join(__dirname, '..', '..')
fs.writeFileSync(path.join(root, 'db/kb-tools.json'), JSON.stringify({ stand: new Date().toISOString().slice(0, 10), anzahl: tools.length, tools }, null, 1) + '\n')
fs.writeFileSync(path.join(root, 'db/kb-sources.json'), JSON.stringify(SOURCES.map(({ dir, ...s }) => ({ ...s, url: `https://github.com/${s.repo}` })), null, 2) + '\n')

const count = (k) => tools.reduce((m, t) => ((m[t[k]] = (m[t[k]] || 0) + 1), m), {})
console.log('Einträge roh', all.length, '→ eindeutig', tools.length)
console.log('pro Rubrik', count('rubrik'))
console.log('in 2+ Quellen', tools.filter((t) => t.quellen.length > 1).length, '· in 3', tools.filter((t) => t.quellen.length === 3).length)
