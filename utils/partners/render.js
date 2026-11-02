// Prüft db/partners.json (Programme) und die zentrale Sammlung db/affiliate-links.json (eigene Links und Codes)
// und schreibt docs/PARTNERLINKS.md als Übersicht für Jean.
// Aufruf: npm run partners
const fs = require('fs')
const path = require('path')
const slugify = require('../slugify')

const root = path.join(__dirname, '..', '..')
const register = require(path.join(root, 'db/partners.json'))
const sammlung = require(path.join(root, 'db/affiliate-links.json'))
const linkVon = new Map(sammlung.links.filter((l) => l.link && l.bestaetigt !== false && (!l.projekte?.length || l.projekte.includes('aigeddon'))).map((l) => [l.id, l.link]))
const codeVon = new Map(sammlung.links.filter((l) => l.code && l.bestaetigt !== false && (!l.projekte?.length || l.projekte.includes('aigeddon'))).map((l) => [l.id, { code: l.code, text: l.rabatt || 'discount' }]))
for (const p of register.programme) {
    p.partner_link = linkVon.get(p.id) || ''
    p.coupon = codeVon.get(p.id) || null
}
const tools = new Set(require(path.join(root, 'db/tools.json')).map((t) => t.slug))
const dirsDb = require(path.join(root, 'db/directories.json'))
const dirs = new Set((dirsDb.data || dirsDb).map((d) => slugify(d.name)))

const errors = []
// Auto-Verlinkung von Tool-Namen (lib/tool-links.js): jeder Slug braucht einen Steckbrief in db/tools.json.
const toolLinks = fs.readFileSync(path.join(root, 'lib/tool-links.js'), 'utf8')
for (const [, slug] of toolLinks.matchAll(/\[\s*'[^']+',\s*'([a-z0-9-]+)'\s*\]/g)) if (!tools.has(slug)) errors.push(`lib/tool-links.js: ${slug} fehlt in db/tools.json`)
const ids = new Set()
for (const p of register.programme) {
    if (ids.has(p.id)) errors.push(`${p.id}: doppelte id`)
    ids.add(p.id)
    if (p.tool_slug && !tools.has(p.tool_slug)) errors.push(`${p.id}: tool_slug ${p.tool_slug} fehlt in db/tools.json`)
    if (p.directory_slug && !dirs.has(p.directory_slug)) errors.push(`${p.id}: directory_slug ${p.directory_slug} fehlt in db/directories.json`)
    if (!register.status_werte.includes(p.status)) errors.push(`${p.id}: unbekannter Status ${p.status}`)
    if (p.anmeldung && !(register.anmeldung_werte || []).includes(p.anmeldung)) errors.push(`${p.id}: unbekannte Anmeldung ${p.anmeldung}`)
}
const sids = new Set()
for (const l of sammlung.links) {
    if (!l.id) errors.push('affiliate-links: Eintrag ohne id')
    if (sids.has(l.id)) errors.push(`affiliate-links: ${l.id} doppelt`)
    sids.add(l.id)
    if (!l.link && !l.code) errors.push(`affiliate-links: ${l.id} braucht link oder code`)
    if (l.link && !/^https:\/\//.test(l.link)) errors.push(`affiliate-links: ${l.id}: link muss mit https:// beginnen`)
    // Ausdrücklich für AIGeddon gedacht, aber ohne Programm im Register: Fehler. Für alle Projekte ohne Programm: nur Hinweis.
    if (l.projekte?.includes('aigeddon') && !ids.has(l.id)) errors.push(`affiliate-links: ${l.id} fehlt in db/partners.json`)
    else if (!l.projekte?.length && !ids.has(l.id)) console.log(`Hinweis: ${l.id} gilt für alle Projekte, auf AIGeddon fehlt noch das Programm in db/partners.json`)
}
if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

const cell = (v) => (v == null || v === '' ? '–' : String(v).replace(/\|/g, '/'))
const live = register.programme.filter((p) => p.partner_link || p.coupon)
const count = (s) => register.programme.filter((p) => p.status === s).length

// Ranking der Programme mit Selbstanmeldung: Provision x Laufzeit, Freigabe, Auszahlung, Passung zu AIGeddon.
const PASST = { verzeichnis: 1.3, seo: 1.25, marketing: 1.2, schreiben: 1.2, video: 1.15, chat: 1.15, bild: 1.1, audio: 1.1, automatisierung: 1.1, coding: 1, produktivitaet: 1, sonstiges: 0.85 }
const laufzeit = (p) => {
    const t = `${p.dauer || ''} ${p.commission || ''}`.toLowerCase()
    if (/lebenslang|lifetime|unbegrenzt|solange/.test(t)) return 3
    const m = t.match(/(\d+)\s*monat/)
    if (m) return Math.min(2.5, Math.max(0.8, Number(m[1]) / 8))
    if (/einmalig|erste/.test(t)) return 0.7
    if (/wiederkehrend/.test(t)) return 2
    return 1
}
const prozent = (p) => Number(String(p.commission || '').match(/(\d+(?:[.,]\d+)?)\s*%/)?.[1]?.replace(',', '.') || 0)
const wallet = (p) => (p.auszahlung || []).some((a) => /paypal|wise/i.test(a))
const punkte = (p) =>
    Math.round(prozent(p) * laufzeit(p) * (p.anmeldung === 'sofort' ? 1.25 : 1) * (p.krypto ? 1.15 : 1) * (wallet(p) ? 1.05 : 1) * (PASST[p.kategorie] || 1))
const auszahlungText = (p) => [...(p.auszahlung || []), ...(p.krypto && !(p.auszahlung || []).some((a) => /usdc|krypto|crypto|bitcoin/i.test(a)) ? ['Krypto'] : [])].join(', ')

const table = (rows, cols) =>
    [`| ${cols.map((c) => c[0]).join(' | ')} |`, `|${cols.map(() => '---').join('|')}|`, ...rows.map((p) => `| ${cols.map((c) => cell(c[1](p))).join(' | ')} |`)].join('\n')

const md = `# Partnerlinks AIGeddon

Automatisch erzeugt aus \`db/partners.json\` (Programme, Stand ${register.stand}) und der zentralen Sammlung \`db/affiliate-links.json\` (eigene Links und Codes, Stand ${sammlung.stand}) mit \`npm run partners\`. Nicht von Hand bearbeiten.\n\n**Alle eigenen Affiliate-Links aller Projekte:** ${sammlung.links.length} Einträge in \`db/affiliate-links.json\`.

**Stand:** ${register.programme.length} Programme · aktiv ${count('aktiv')} · beantragt ${count('beantragt')} · nicht registriert ${count('nicht registriert')} · Code anfragen ${count('Code anfragen')} · Code angefragt ${count('Code angefragt')} · abgelehnt ${count('abgelehnt')}

## Live auf der Website

${live.length ? table(live, [['Programm', (p) => p.name], ['Partnerlink', (p) => p.partner_link], ['Code', (p) => p.coupon && `${p.coupon.code} (${p.coupon.text})`]]) : 'Noch keine. Sobald in `db/affiliate-links.json` ein Link oder Code mit passender id steht, nutzt die Seite ihn beim nächsten Build.'}

## Ranking: Programme mit Selbstanmeldung

Punkte = Provision in % x Laufzeit (lebenslang 3, sonst Monate/8, einmalig 0,7) x 1,25 bei sofortiger Freigabe x 1,15 bei Krypto x 1,05 bei PayPal/Wise x Passung zur Zielgruppe. Nur Angaben der offiziellen Anbieterseite; leere Felder sind dort nicht angegeben. Rewardful und Lemon Squeezy zahlen nicht in Krypto, Dub Partners je nach Land per Bank oder USDC.

${table(
    register.programme
        .filter((p) => ['sofort', 'schnell', 'unbekannt'].includes(p.anmeldung) && !p.partner_link)
        .map((p) => ({ ...p, punkte: punkte(p) }))
        .sort((a, b) => b.punkte - a.punkte)
        .map((p, i) => ({ ...p, rang: i + 1 })),
    [['#', (p) => p.rang], ['Programm', (p) => p.name], ['Punkte', (p) => p.punkte], ['Provision', (p) => p.commission], ['Laufzeit', (p) => p.dauer], ['Cookie', (p) => p.cookie], ['Freigabe', (p) => p.anmeldung], ['Auszahlung', (p) => auszahlungText(p)], ['Mindestbetrag', (p) => p.mindestauszahlung], ['Netzwerk', (p) => p.network], ['Anmelden', (p) => p.signup_url]]
)}

## Manuelle Prüfung nötig

${table(register.programme.filter((p) => p.anmeldung === 'manuell'), [['Programm', (p) => p.name], ['Konditionen', (p) => p.commission], ['Grund', (p) => p.notes], ['Quelle', (p) => p.quelle]])}

## Schnell anmelden (sofort oder in wenigen Tagen freigeschaltet)

Programme ohne Mindest-Traffic und ohne Einladung, laut offizieller Seite geprüft. „sofort“: Link direkt nach der Anmeldung, „schnell“: Selbstanmeldung mit kurzer Prüfung.

${table(
    register.programme.filter((p) => ['sofort', 'schnell'].includes(p.anmeldung) && !p.partner_link).sort((a, b) => (a.anmeldung === b.anmeldung ? a.name.localeCompare(b.name) : a.anmeldung === 'sofort' ? -1 : 1)),
    [['Programm', (p) => p.name], ['Anmeldung', (p) => p.anmeldung], ['Provision', (p) => p.commission], ['Cookie', (p) => p.cookie], ['Netzwerk', (p) => p.network], ['Anmelden', (p) => p.signup_url], ['Geprüft', (p) => p.geprueft]]
)}

## Zentrale Sammlung (alle Projekte)

${sammlung.links.length ? table(sammlung.links, [['id', (l) => l.id], ['Programm', (l) => l.programm], ['Link', (l) => l.link], ['Code', (l) => l.code && `${l.code} (${l.rabatt || 'discount'})`], ['Projekte', (l) => (l.projekte || []).join(', ') || 'alle'], ['Bestätigt', (l) => (l.bestaetigt === false ? 'nein, bitte prüfen' : 'ja')], ['Notiz', (l) => l.notiz]]) : 'Noch leer.'}

## Werkzeug-Partnerprogramme

${table(register.programme.filter((p) => p.kind === 'tool'), [['Programm', (p) => p.name], ['Status', (p) => p.status], ['Netzwerk', (p) => p.network], ['Provision', (p) => p.commission], ['Cookie', (p) => p.cookie], ['Anmeldung', (p) => p.signup_url], ['Dein Link', (p) => p.partner_link]])}

## Verzeichnisse: Partnerprogramme und eigene Codes

${table(register.programme.filter((p) => p.kind === 'directory'), [['Verzeichnis', (p) => p.name], ['Status', (p) => p.status], ['Art', (p) => p.network], ['Provision', (p) => p.commission], ['Anmeldung / Kontakt', (p) => p.signup_url], ['Dein Link', (p) => p.partner_link], ['Dein Code', (p) => p.coupon && `${p.coupon.code} (${p.coupon.text})`]])}

## So trägst du etwas ein

Direkt in \`db/affiliate-links.json\` unter \`links\`:

\`\`\`json
{ "id": "semrush", "programm": "Semrush", "link": "https://www.semrush.com/...?ref=...", "projekte": ["aigeddon"], "netzwerk": "Impact", "seit": "2026-11-01" }
{ "id": "uneed", "programm": "Uneed", "code": "AIGEDDON20", "rabatt": "20% discount", "projekte": ["aigeddon"] }
\`\`\`

Für andere Projekte eine beliebige id und den Projektnamen in \`projekte\` setzen. Fremde Referral-Links und fremde Rabattcodes werden nirgends übernommen.

oder als Zeile an Claude: \`PARTNERLINK <id> <link>\` bzw. \`CODE <id> <CODE> <Rabatt>\`.
`

fs.writeFileSync(path.join(root, 'docs/PARTNERLINKS.md'), md)
console.log(`docs/PARTNERLINKS.md geschrieben, ${register.programme.length} Programme, ${live.length} live`)
