// Kleine Textwerkzeuge für Meta-Angaben und sichtbare Daten. Browser- und servertauglich.

// Meta-Description sauber kürzen: am letzten Satzende vor der Grenze, sonst am letzten Wortende mit „…“.
// Google zeigt etwa 150 bis 160 Zeichen, darum 155 als Standard.
export function kuerzen(text, max = 155) {
    const t = String(text || '').replace(/\s+/g, ' ').trim()
    if (t.length <= max) return t
    const stueck = t.slice(0, max + 1)
    const satz = Math.max(stueck.lastIndexOf('. '), stueck.lastIndexOf('! '), stueck.lastIndexOf('? '))
    if (satz >= max * 0.6) return t.slice(0, satz + 1)
    const wort = t.slice(0, max).lastIndexOf(' ')
    return `${t.slice(0, wort > 0 ? wort : max).replace(/[\s,;:.(\u2013-]+$/, '')}…`
}

const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

// Sichtbares Datum einheitlich als „23. Oktober 2026“; ISO-Daten (2026-10-23) bleiben dem Schema vorbehalten.
export function datumDe(wert) {
    if (!wert) return ''
    const m = String(wert).match(/^(\d{4})-(\d{2})-(\d{2})/)
    const d = m ? { j: Number(m[1]), mo: Number(m[2]) - 1, t: Number(m[3]) } : null
    if (d) return `${d.t}. ${MONATE[d.mo]} ${d.j}`
    const x = new Date(wert)
    return Number.isNaN(x.getTime()) ? String(wert) : `${x.getDate()}. ${MONATE[x.getMonth()]} ${x.getFullYear()}`
}
