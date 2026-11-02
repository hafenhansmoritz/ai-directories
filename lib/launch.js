// Launch-Tracker im Konto: Status, Notiz und Erinnerung je Verzeichnis (Tabelle launch_eintraege, Migration 0004).
// Ein gemeinsamer Speicher für alle Komponenten einer Seite. Ohne Anmeldung bleibt der Tracker im Browser (useTracker).
import { supabase, istAktuell } from './konto'
import { alleZeilen } from './sync'

export const STATUS = [
    ['geplant', 'Geplant', '📝'],
    ['eingereicht', 'Eingereicht', '📨'],
    ['live', 'Live', '✅'],
    ['abgelehnt', 'Abgelehnt', '🚫'],
]
// Als „eingetragen“ zählt für Fortschritt und Rang, was eingereicht oder live ist.
export const ZAEHLT = new Set(['eingereicht', 'live'])
export const LOKAL_KEY = 'kiv-eingetragen'

let stand = { uid: null, bereit: false, fehler: false, eintraege: new Map() }
const hoerer = new Set()
const melde = (neu) => {
    stand = { ...stand, ...neu }
    hoerer.forEach((f) => f(stand))
}

export function beobachteLaunch(f) {
    hoerer.add(f)
    f(stand)
    return () => hoerer.delete(f)
}

// Lädt die Einträge des Kontos einmal pro Seite. Späte Antworten eines anderen Kontos werden verworfen.
// Laufende Speichervorgänge je Eintrag (Promise-Kette).
const ketten = new Map()
let laeuft = null
// frisch: beim Öffnen der Tracker-Seite neu laden, damit Änderungen von anderen Geräten sichtbar werden.
// still: im Hintergrund neu laden (nach einem Speicherfehler), die Anzeige bleibt dabei stehen.
export function ladeLaunch(uid, frisch = false, still = false) {
    if (!uid) return null
    if (stand.uid === uid && (laeuft || (stand.bereit && !frisch))) return laeuft
    if (!(still && stand.uid === uid && stand.bereit)) melde({ uid, bereit: false, fehler: false, eintraege: new Map() })
    laeuft = (async () => {
        // Erst offene Speichervorgänge abwarten, sonst liest das Neuladen einen veralteten Stand.
        await Promise.allSettled([...ketten.values()])
        try {
            const sb = await supabase()
            const { data, error } = await alleZeilen(() => sb.from('launch_eintraege').select('slug, status, notiz, erinnerung, aktualisiert').order('slug'))
            if (!istAktuell(uid) || stand.uid !== uid) return
            if (error) return melde({ bereit: true, fehler: true })
            melde({ bereit: true, eintraege: new Map(data.map((z) => [z.slug, z])) })
        } catch {
            // Netz- oder Ladefehler: Fehlermeldung statt endlosem „Lade …“.
            if (stand.uid === uid) melde({ bereit: true, fehler: true })
        }
    })().finally(() => {
        laeuft = null
    })
    return laeuft
}

// Ändert einen Eintrag sofort in der Anzeige und speichert ihn. Scheitert das Speichern, gilt wieder der alte Stand.
// Speichern je Verzeichnis nacheinander, damit eine ältere Änderung keine neuere überschreibt.
export function setzeLaunch(uid, slug, felder) {
    if (!uid || stand.uid !== uid) return Promise.resolve(false)
    // Sofort anzeigen, gespeichert wird in der Reihenfolge der Änderungen.
    const alt = stand.eintraege.get(slug)
    const neu = { slug, status: 'geplant', notiz: '', erinnerung: null, ...alt, ...felder }
    const map = new Map(stand.eintraege)
    map.set(slug, neu)
    melde({ eintraege: map })
    const lauf = (ketten.get(slug) || Promise.resolve()).then(async () => {
        const sb = await supabase()
        const { error } = await sb
            .from('launch_eintraege')
            .upsert({ slug, status: neu.status, notiz: neu.notiz, erinnerung: neu.erinnerung || null }, { onConflict: 'user_id,slug' })
        // Bei einem Fehler den bestätigten Stand vom Server holen, sobald alle Änderungen durch sind.
        if (error && stand.uid === uid) setTimeout(() => ladeLaunch(uid, true, true), 0)
        return !error
    })
    ketten.set(slug, lauf.catch(() => false))
    return lauf
}

// Tracker aus dem Browser ins Konto übernehmen: fehlende Verzeichnisse kommen mit Status, Notiz und Erinnerung
// aus dem lokalen Tracker (Häkchen der Tabelle als „eingereicht“), vorhandene Einträge im Konto bleiben unverändert.
export async function uebernehmeLokal(uid, erlaubt) {
    if (!uid || stand.uid !== uid) return 0
    const fehlen = [...lokalLaunch().values()].filter((e) => erlaubt.has(e.slug) && !stand.eintraege.has(e.slug))
    if (!fehlen.length) return 0
    const sb = await supabase()
    const zeilen = fehlen.map(({ slug, status, notiz, erinnerung }) => ({ slug, status, notiz, erinnerung }))
    const { error } = await sb.from('launch_eintraege').upsert(zeilen, { onConflict: 'user_id,slug', ignoreDuplicates: true })
    if (error || stand.uid !== uid) return -1
    const map = new Map(stand.eintraege)
    zeilen.forEach((z) => map.has(z.slug) || map.set(z.slug, z))
    melde({ eintraege: map })
    return fehlen.length
}

export const lokaleHaekchen = () => {
    try {
        const roh = JSON.parse(localStorage.getItem(LOKAL_KEY) || '[]')
        return Array.isArray(roh) ? roh.filter((s) => typeof s === 'string') : []
    } catch {
        return []
    }
}

// ---------- Ohne Konto: Tracker im Browser ----------
// Status, Notiz und Erinnerung je Verzeichnis liegen unter LOKAL_LAUNCH, nichts geht an einen Server.
// Die Häkchen der Tabelle (LOKAL_KEY) bleiben die Quelle dafür, ob ein Verzeichnis als eingetragen zählt.
export const LOKAL_LAUNCH = 'mentat-launch'
export const LOKAL_EVENT = 'kiv-tracker'
const STATUS_KEYS = new Set(STATUS.map(([k]) => k))
const DATUM = /^\d{4}-\d{2}-\d{2}$/

const lokalRoh = () => {
    try {
        const roh = JSON.parse(localStorage.getItem(LOKAL_LAUNCH) || '{}')
        return roh && typeof roh === 'object' && !Array.isArray(roh) ? roh : {}
    } catch {
        return {}
    }
}

export function lokalLaunch() {
    const haekchen = new Set(lokaleHaekchen())
    const map = new Map()
    for (const [slug, e] of Object.entries(lokalRoh())) {
        if (!e || typeof e !== 'object') continue
        let status = STATUS_KEYS.has(e.status) ? e.status : 'geplant'
        // In der Tabelle abgehakt oder wieder entfernt: das Häkchen gewinnt.
        if (haekchen.has(slug) && !ZAEHLT.has(status)) status = 'eingereicht'
        if (!haekchen.has(slug) && ZAEHLT.has(status)) status = 'geplant'
        map.set(slug, {
            slug,
            status,
            notiz: String(e.notiz || '').slice(0, 500),
            datum: DATUM.test(e.datum || '') ? e.datum : null,
            listingUrl: String(e.listingUrl || '').slice(0, 500),
            erinnerung: DATUM.test(e.erinnerung || '') ? e.erinnerung : null,
            aktualisiert: typeof e.aktualisiert === 'string' ? e.aktualisiert : null,
        })
    }
    haekchen.forEach((slug) => map.has(slug) || map.set(slug, { slug, status: 'eingereicht', notiz: '', datum: null, listingUrl: '', erinnerung: null, aktualisiert: null }))
    return map
}

// Ändert einen Eintrag im Browser und zieht das Häkchen der Tabelle mit. false, wenn der Speicher gesperrt ist.
export function setzeLokal(slug, felder) {
    const alt = lokalLaunch().get(slug)
    const { slug: _s, ...neu } = {
        status: 'geplant',
        notiz: '',
        datum: null,
        listingUrl: '',
        erinnerung: null,
        ...alt,
        ...felder,
        aktualisiert: new Date().toISOString(),
    }
    if (ZAEHLT.has(neu.status) && !neu.datum) {
        neu.datum = heute()
    }
    const roh = lokalRoh()
    roh[slug] = neu
    const haekchen = new Set(lokaleHaekchen())
    ZAEHLT.has(neu.status) ? haekchen.add(slug) : haekchen.delete(slug)
    try {
        localStorage.setItem(LOKAL_LAUNCH, JSON.stringify(roh))
        localStorage.setItem(LOKAL_KEY, JSON.stringify([...haekchen]))
        localStorage.setItem('mentat-eingetragen', JSON.stringify([...haekchen]))
    } catch {
        return false
    }
    // Hält Tabelle und Tracker auf derselben Seite synchron (useTracker hört auf dasselbe Ereignis).
    window.dispatchEvent(new Event(LOKAL_EVENT))
    return true
}

// Heutiges Datum als YYYY-MM-DD in Ortszeit, für fällige Erinnerungen.
export const heute = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// YYYY-MM-DD als deutsches Datum, ohne Umweg über UTC (sonst zeigt es westlich von UTC den Vortag).
export const datumDe = (iso) => {
    const [j, m, t] = String(iso || '').split('-')
    return j && m && t ? `${t}.${m}.${j}` : ''
}

export const LAUNCH_KIT_KEY = 'kiv-launch-kit'

export function ladeLaunchKitDaten() {
    if (typeof window === 'undefined') return { url: '', name: '' }
    try {
        const raw = JSON.parse(localStorage.getItem(LAUNCH_KIT_KEY) || '{}')
        return {
            url: typeof raw?.url === 'string' ? raw.url.trim() : '',
            name: typeof raw?.name === 'string' ? raw.name.trim() : '',
        }
    } catch {
        return { url: '', name: '' }
    }
}

export function baueUtmLink(baseUrl, slug) {
    if (!baseUrl || !slug) return ''
    try {
        const u = new URL(baseUrl.startsWith('http://') || baseUrl.startsWith('https://') ? baseUrl : 'https://' + baseUrl)
        u.searchParams.set('utm_source', slug)
        u.searchParams.set('utm_medium', 'directory')
        u.searchParams.set('utm_campaign', 'launch')
        return u.toString()
    } catch {
        return ''
    }
}

export function haengeUtmAn(url, slug) {
    if (!url) return ''
    try {
        const u = new URL(url)
        u.searchParams.set('utm_source', slug)
        u.searchParams.set('utm_medium', 'directory')
        u.searchParams.set('utm_campaign', 'launch')
        return u.toString()
    } catch {
        const sep = url.includes('?') ? '&' : '?'
        return url + sep + 'utm_source=' + encodeURIComponent(slug) + '&utm_medium=directory&utm_campaign=launch'
    }
}
