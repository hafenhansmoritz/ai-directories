// Gleicht Merkliste, Herzen, Verlauf, gelesene Artikel und Abzeichen zwischen Browser und Konto ab.
// Beim Login: Vereinigung aus beiden Seiten. Danach gilt der Browser als Quelle und schreibt Änderungen nach.
import { lies, ABZEICHEN_KATALOG } from './herz'

// Diese Abzeichen vergibt nur der Server (Community); der Browser lädt sie nie hoch.
const NUR_SERVER = ['Erster-Kommentar-Abzeichen', 'Forums-Starter-Abzeichen', 'Problemlöser-Abzeichen', 'Hilfsbereit-Abzeichen']
const hochladbar = (n) => ABZEICHEN_KATALOG.some(([k]) => k === n) && !NUR_SERVER.includes(n)

const ARTEN = {
    'aigeddon-merkliste': 'merk',
    'aigeddon-herzen': 'herz',
    'aigeddon-verlauf': 'verlauf',
    'aigeddon-gelesen': 'gelesen',
}

// Lokale Formate: Merkliste und Verlauf sind Objekte {pfad, titel, zeit}, Herzen und Gelesen nur Pfade.
// Kaputte Einträge (kein Pfad, ungültige Zeit) werden übersprungen statt den ganzen Abgleich abzubrechen.
const gueltigerPfad = (p) => typeof p === 'string' && p.startsWith('/')
const zeitIso = (z) => {
    const d = new Date(z || Date.now())
    return Number.isFinite(d.getTime()) ? d.toISOString() : new Date().toISOString()
}
const ms = (z) => {
    const t = new Date(z).getTime()
    return Number.isFinite(t) ? t : 0
}
const alsZeilen = (key, uid) => {
    const roh = lies(key, [])
    return (Array.isArray(roh) ? roh : []).flatMap((e) => {
        if (typeof e === 'string') return gueltigerPfad(e) ? [{ user_id: uid, art: ARTEN[key], pfad: e.slice(0, 300), titel: '' }] : []
        if (!e || !gueltigerPfad(e.pfad)) return []
        return [{ user_id: uid, art: ARTEN[key], pfad: e.pfad.slice(0, 300), titel: String(e.titel || '').slice(0, 200), zeit: zeitIso(e.zeit) }]
    })
}

// Sortiert nach echter Zeit (lokal steht „…Z“, Postgres liefert „…+00:00“) und auf einer Kopie.
const ausZeilen = (key, zeilen) =>
    key === 'aigeddon-herzen' || key === 'aigeddon-gelesen'
        ? zeilen.map((z) => z.pfad)
        : [...zeilen].sort((a, b) => ms(b.zeit) - ms(a.zeit)).map((z) => ({ pfad: z.pfad, titel: z.titel, zeit: ms(z.zeit) || Date.now() }))

// Schreibt still in den Browser-Speicher (ohne Sync-Ereignis, sonst lädt der Abgleich sich selbst wieder hoch).
// Voller Speicher oder gesperrter Zugriff bricht den Abgleich nicht ab.
const ablegen = (key, wert) => {
    try {
        localStorage.setItem(key, JSON.stringify(wert))
        return true
    } catch {
        return false
    }
}

// Wem gehört die Sammlung im Browser? Meldet sich jemand anderes an, wird sie vorher geleert,
// damit nichts zwischen Konten wandert. Gast-Daten ohne Besitzer werden dem ersten Konto zugeordnet.
const BESITZER = 'aigeddon-konto-uid'
// Was beim letzten Abgleich auf dem Server lag. So erkennt ein Gerät, dass ein Eintrag woanders gelöscht wurde,
// statt ihn aus seiner alten Kopie wieder hochzuladen.
const STAND = 'aigeddon-sync-stand'
const MIT_LOESCHEN = ['merk', 'herz']
const merkeStand = (art, pfade) => {
    const stand = lies(STAND, {}) || {}
    stand[art] = pfade
    ablegen(STAND, stand)
}

export function lokalLeeren() {
    try {
        ;[...Object.keys(ARTEN), 'aigeddon-abzeichen', BESITZER, STAND].forEach((k) => localStorage.removeItem(k))
        sessionStorage.removeItem('aigeddon-sync')
    } catch {}
}

// Alle Zeilen holen, auch über die Seitengrenze der API (1000 Zeilen) hinaus. Bei einem Fehler: { error }.
const SEITE = 1000
export async function alleZeilen(abfrage) {
    const zeilen = []
    for (let von = 0; ; von += SEITE) {
        const { data, error } = await abfrage().range(von, von + SEITE - 1)
        if (error || !data) return { data: null, error: error || new Error('leer') }
        zeilen.push(...data)
        if (data.length < SEITE) return { data: zeilen, error: null }
    }
}

async function kuerzeVerlauf(sb, uid, behalten) {
    const { data, error } = await sb.from('saved_items').select('pfad').eq('user_id', uid).eq('art', 'verlauf')
    if (error || !data) return
    const weg = (data || []).map((z) => z.pfad).filter((p) => !behalten.includes(p))
    if (weg.length) await sb.from('saved_items').delete().eq('user_id', uid).eq('art', 'verlauf').in('pfad', weg)
}

// gilt(): false, sobald das Konto gewechselt hat. Dann ändert ein noch laufender Abgleich nichts mehr am Browser.
export async function erstAbgleich(sb, uid, gilt = () => true) {
    let besitzer = null
    try {
        besitzer = localStorage.getItem(BESITZER)
    } catch {}
    if (besitzer && besitzer !== uid) lokalLeeren()
    const { data: server, error: serverFehler } = await alleZeilen(() => sb.from('saved_items').select('art, pfad, titel, zeit').eq('user_id', uid).order('art').order('pfad'))
    // Ohne gültige Serverantwort nichts ändern, sonst sähe alles wie gelöscht aus.
    if (serverFehler || !server || !gilt()) return false
    const stand = lies(STAND, {}) || {}
    for (const [key, art] of Object.entries(ARTEN)) {
        const vomServer = (server || []).filter((z) => z.art === art)
        const aufServer = new Set(vomServer.map((z) => z.pfad))
        const zuletzt = MIT_LOESCHEN.includes(art) && Array.isArray(stand[art]) ? new Set(stand[art]) : null
        // Lokale Einträge, die beim letzten Abgleich auf dem Server lagen und jetzt fehlen, wurden auf einem anderen Gerät gelöscht.
        const lokal = alsZeilen(key, uid).filter((z) => aufServer.has(z.pfad) || !zuletzt || !zuletzt.has(z.pfad))
        const vorhanden = new Set(lokal.map((z) => z.pfad))
        const neu = [...lokal, ...vomServer.filter((z) => !vorhanden.has(z.pfad))]
        const begrenzt = key === 'aigeddon-verlauf' ? ausZeilen(key, neu).slice(0, 8) : ausZeilen(key, neu)
        if (!gilt()) return false
        ablegen(key, begrenzt)
        const hoch = lokal.filter((z) => !aufServer.has(z.pfad))
        let hochOk = true
        if (hoch.length) hochOk = !(await sb.from('saved_items').upsert(hoch, { onConflict: 'user_id,art,pfad', ignoreDuplicates: true })).error
        if (!gilt()) return false
        // Als „auf dem Server“ gilt nur, was dort wirklich angekommen ist. Sonst würde ein Fehlschlag später als Löschung gelesen.
        if (MIT_LOESCHEN.includes(art)) merkeStand(art, hochOk ? neu.map((z) => z.pfad) : vomServer.map((z) => z.pfad))
        // Der Verlauf ist auf 8 Einträge begrenzt, auch auf dem Server.
        if (art === 'verlauf') await kuerzeVerlauf(sb, uid, begrenzt.map((z) => z.pfad))
    }
    const lokaleAbzeichen = lies('aigeddon-abzeichen', []) || []
    const { data: abz, error: abzFehler } = await sb.from('badges').select('name').eq('user_id', uid)
    if (abzFehler || !gilt()) return false
    const alle = [...new Set([...lokaleAbzeichen, ...(abz || []).map((a) => a.name)])]
    ablegen('aigeddon-abzeichen', alle)
    const fehlen = lokaleAbzeichen.filter((n) => hochladbar(n) && !(abz || []).some((a) => a.name === n))
    if (fehlen.length) await sb.from('badges').upsert(fehlen.map((name) => ({ user_id: uid, name })), { onConflict: 'user_id,name', ignoreDuplicates: true })
    if (!gilt()) return false
    try {
        localStorage.setItem(BESITZER, uid)
    } catch {}
    // Offene Ansichten (Merkliste, Knöpfe) sollen den neuen Stand sofort zeigen.
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('aigeddon-sync'))
    return true
}

// Nach einer lokalen Änderung: Zeilen der Art hochladen, auf dem Server fehlende lokale Löschungen nachziehen.
export async function schreibeNach(sb, uid, key, gilt = () => true) {
    if (key === 'aigeddon-abzeichen') {
        const namen = (lies(key, []) || []).filter(hochladbar)
        if (namen.length) await sb.from('badges').upsert(namen.map((name) => ({ user_id: uid, name })), { onConflict: 'user_id,name', ignoreDuplicates: true })
        return
    }
    const art = ARTEN[key]
    if (!art) return
    const lokal = alsZeilen(key, uid)
    if (lokal.length) {
        const { error } = await sb.from('saved_items').upsert(lokal, { onConflict: 'user_id,art,pfad' })
        // Ohne erfolgreichen Upload bleibt der bisherige Stand, damit nichts fälschlich als gelöscht gilt.
        if (error) return
    }
    if (art === 'verlauf') return kuerzeVerlauf(sb, uid, lokal.map((z) => z.pfad))
    if (art === 'merk' || art === 'herz') {
        const { data, error: lesefehler } = await alleZeilen(() => sb.from('saved_items').select('pfad, titel, zeit').eq('user_id', uid).eq('art', art).order('pfad'))
        if (lesefehler || !data || !gilt()) return
        const gesehen = new Set((lies(STAND, {}) || {})[art] || [])
        const lokalSet = new Set(lokal.map((z) => z.pfad))
        // Gelöscht wird nur, was dieses Gerät schon kannte und jetzt lokal entfernt hat.
        const weg = (data || []).map((z) => z.pfad).filter((p) => !lokalSet.has(p) && gesehen.has(p))
        // Scheitert das Löschen, bleibt der alte Stand, damit die Einträge beim nächsten Mal nicht als neu gelten.
        if (weg.length && (await sb.from('saved_items').delete().eq('user_id', uid).eq('art', art).in('pfad', weg)).error) return
        if (!gilt()) return
        // Was ein anderes Gerät inzwischen ergänzt hat, kommt lokal dazu statt gelöscht zu werden.
        const neuVonWoanders = (data || []).filter((z) => !lokalSet.has(z.pfad) && !gesehen.has(z.pfad))
        if (neuVonWoanders.length) {
            const zusammen = ausZeilen(key, [...lokal, ...neuVonWoanders])
            ablegen(key, zusammen)
            window.dispatchEvent(new CustomEvent('aigeddon-sync'))
        }
        merkeStand(art, [...lokalSet, ...neuVonWoanders.map((z) => z.pfad)])
    }
}

export const SYNC_KEYS = [...Object.keys(ARTEN), 'aigeddon-abzeichen']
