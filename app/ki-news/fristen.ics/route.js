import { getFristen } from '../../../lib/news'
import { SITE_NAME, SITE_URL, absoluteUrl } from '../../../lib/site'

// KI-Fristen als Kalenderdatei (iCalendar, RFC 5545). Wird beim Bauen statisch erzeugt, wie der RSS-Feed.
// Abonnierte Kalender holen die Datei regelmäßig neu, neue Fristen landen so automatisch beim Leser.
export const dynamic = 'force-static'

// Kurzer, stabiler Hash (FNV-1a), damit die UID nicht von der Reihenfolge der Fristen abhängt.
const kurzHash = (s) => {
    let h = 0x811c9dc5
    for (const c of String(s)) h = Math.imul(h ^ c.codePointAt(0), 0x01000193) >>> 0
    return h.toString(36)
}
const kompakt = (iso) => iso.replace(/-/g, '')
const naechsterTag = (iso) => {
    const d = new Date(`${iso}T00:00:00Z`)
    d.setUTCDate(d.getUTCDate() + 1)
    return d.toISOString().slice(0, 10).replace(/-/g, '')
}
// Text nach RFC 5545 maskieren: Backslash, Semikolon, Komma und Zeilenumbruch.
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

// Zeilen länger als 75 Byte falten (Fortsetzung beginnt mit einem Leerzeichen), ohne UTF-8-Zeichen zu zerteilen.
function falten(zeile) {
    const teile = []
    let aktuell = ''
    let bytes = 0
    for (const zeichen of zeile) {
        const laenge = Buffer.byteLength(zeichen)
        const grenze = teile.length === 0 ? 75 : 74
        if (bytes + laenge > grenze) {
            teile.push(aktuell)
            aktuell = ''
            bytes = 0
        }
        aktuell += zeichen
        bytes += laenge
    }
    teile.push(aktuell)
    return teile.join('\r\n ')
}

export function GET() {
    const stempel = `${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`
    const domain = SITE_URL.replace(/^https?:\/\//, '').split('/')[0]
    const events = getFristen().flatMap((f) => {
        const url = absoluteUrl(`/ki-news/${f.slug}`)
        return [
            'BEGIN:VEVENT',
            `UID:${kompakt(f.datum)}-${f.slug}-${kurzHash(f.was)}@${domain}`,
            `DTSTAMP:${stempel}`,
            `DTSTART;VALUE=DATE:${kompakt(f.datum)}`,
            `DTEND;VALUE=DATE:${naechsterTag(f.datum)}`,
            `SUMMARY:${esc(`KI-Frist: ${f.was}`)}`,
            `DESCRIPTION:${esc(`${f.was}. Aus der Meldung „${f.titel}“: ${url}`)}`,
            `URL:${url}`,
            'TRANSP:TRANSPARENT',
            'END:VEVENT',
        ]
    })
    const zeilen = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:-//${SITE_NAME}//KI-Fristen//DE`,
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        `X-WR-CALNAME:${esc(`${SITE_NAME}: KI-Fristen`)}`,
        `X-WR-CALDESC:${esc('Abschaltungen, Preisänderungen und Stichtage aus den KI-News, mit Link zur Meldung.')}`,
        'X-WR-TIMEZONE:Europe/Berlin',
        'REFRESH-INTERVAL;VALUE=DURATION:P1D',
        'X-PUBLISHED-TTL:P1D',
        ...events,
        'END:VCALENDAR',
    ]
    const ics = `${zeilen.map(falten).join('\r\n')}\r\n`
    return new Response(ics, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } })
}
