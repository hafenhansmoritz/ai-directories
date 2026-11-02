// Mein KI-Stack: eigene Tools mit Tarif und Kosten. Ohne Anmeldung im Browser, mit Konto in der Tabelle stack_eintraege
// (Migration 0005). Beträge trägt jede Person selbst ein; Hinweise stützen sich nur auf db/tools.json und lib/abo-preise.js.
import { supabase, istAktuell } from './konto'
import { alleZeilen } from './sync'

export const STACK_KEY = 'mentat-stack'
export const WAEHRUNGEN = ['EUR', 'USD']
export const FELDER = ['tool_slug', 'name', 'tarif', 'betrag', 'waehrung', 'intervall', 'notiz']

// Eingaben auf das Format der Datenbank bringen (gleiche Grenzen wie die Prüfungen in 0005_stack.sql).
export function bereinige(e) {
    const betrag = Math.round(Math.min(100000, Math.max(0, Number(String(e.betrag ?? 0).replace(',', '.')) || 0)) * 100) / 100
    const slug = typeof e.tool_slug === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.tool_slug) && e.tool_slug.length <= 80 ? e.tool_slug : null
    return {
        tool_slug: slug,
        name: String(e.name || '').trim().slice(0, 80),
        tarif: String(e.tarif || '').slice(0, 60),
        betrag,
        waehrung: WAEHRUNGEN.includes(e.waehrung) ? e.waehrung : 'EUR',
        intervall: e.intervall === 'jahr' ? 'jahr' : 'monat',
        notiz: String(e.notiz || '').slice(0, 300),
    }
}

export const proMonat = (e) => (e.intervall === 'jahr' ? Number(e.betrag) / 12 : Number(e.betrag))

// Summen je Währung, ohne Umrechnung: { EUR: { monat, jahr, anzahl }, USD: {...} }
export function summen(eintraege) {
    const s = {}
    for (const e of eintraege) {
        const w = e.waehrung
        s[w] = s[w] || { monat: 0, jahr: 0, anzahl: 0 }
        s[w].monat += proMonat(e)
        s[w].jahr += proMonat(e) * 12
        s[w].anzahl++
    }
    return s
}

// Spar-Hinweise aus vorhandenen Daten:
// 1. doppelt: mehrere bezahlte Tools derselben Steckbrief-Kategorie
// 2. jaehrlich: monatlich bezahlt, laut Anbieter gibt es einen günstigeren Monatspreis bei jährlicher Zahlung (lib/abo-preise)
// 3. gratis: bezahltes Tool hat laut Steckbrief einen Gratis-Tarif
export function stackTipps(eintraege, tools, abo) {
    const tipps = []
    const toolBySlug = new Map(tools.map((t) => [t.slug, t]))
    const bezahlt = eintraege.filter((e) => Number(e.betrag) > 0)
    const nachKategorie = new Map()
    for (const e of bezahlt) {
        const t = e.tool_slug && toolBySlug.get(e.tool_slug)
        if (!t) continue
        if (!nachKategorie.has(t.category)) nachKategorie.set(t.category, [])
        nachKategorie.get(t.category).push(e)
    }
    for (const [kategorie, liste] of nachKategorie) {
        const namen = [...new Set(liste.map((e) => e.name))]
        if (namen.length >= 2) tipps.push({ art: 'doppelt', kategorie, namen })
    }
    const aboBySlug = new Map(abo.map((a) => [a.slug, a]))
    for (const e of bezahlt) {
        const a = e.tool_slug && aboBySlug.get(e.tool_slug)
        if (!a || e.intervall !== 'monat') continue
        // Nur vergleichen, wenn der eingetragene Tarif zum Tarif aus der Preistabelle passt (leer zählt als passend).
        const tarif = String(e.tarif || '').trim().toLowerCase()
        if (tarif && !tarif.includes(a.plan.toLowerCase())) continue
        // In Dollar vergleichen wir mit dem tatsächlich eingetragenen Betrag; ist der schon günstiger, gibt es keinen Hinweis.
        // In Euro nennen wir nur die Dollar-Preise des Anbieters, ohne Ersparnis auszurechnen.
        if (e.waehrung === 'USD' && Number(e.betrag) <= a.jaehrlich) continue
        const ersparnis = e.waehrung === 'USD' ? Math.round((Number(e.betrag) - a.jaehrlich) * 12 * 100) / 100 : null
        tipps.push({ art: 'jaehrlich', slug: a.slug, name: e.name, plan: a.plan, monatlich: a.monatlich, jaehrlich: a.jaehrlich, betrag: Number(e.betrag), ersparnis })
    }
    for (const e of bezahlt) {
        const t = e.tool_slug && toolBySlug.get(e.tool_slug)
        if (t && t.free_plan === true) tipps.push({ art: 'gratis', slug: t.slug, name: e.name })
    }
    return tipps
}

// ---------- Speicher: Browser (Gast) ----------

export function lokalLesen() {
    try {
        const roh = JSON.parse(localStorage.getItem(STACK_KEY) || '[]')
        return Array.isArray(roh) ? roh.filter((e) => e && typeof e.id === 'string').map((e) => ({ ...bereinige(e), id: e.id })).filter((e) => e.name) : []
    } catch {
        return []
    }
}
export function lokalSchreiben(liste) {
    try {
        localStorage.setItem(STACK_KEY, JSON.stringify(liste.slice(0, 100)))
    } catch {}
}

// ---------- Speicher: Konto ----------

let stand = { uid: null, bereit: false, fehler: false, eintraege: [] }
const hoerer = new Set()
const melde = (neu) => {
    stand = { ...stand, ...neu }
    hoerer.forEach((f) => f(stand))
}
export function beobachteStack(f) {
    hoerer.add(f)
    f(stand)
    return () => hoerer.delete(f)
}

// Laufende Speichervorgänge je Eintrag (Promise-Kette).
const ketten = new Map()
let laeuft = null
// frisch: bei jedem Öffnen der Seite neu laden, damit Änderungen von anderen Geräten sichtbar werden.
// still: im Hintergrund neu laden (nach einem Speicherfehler), die Liste bleibt dabei sichtbar.
export function ladeStack(uid, frisch = false, still = false) {
    if (!uid) return null
    if (stand.uid === uid && (laeuft || (stand.bereit && !frisch))) return laeuft
    if (!(still && stand.uid === uid && stand.bereit)) melde({ uid, bereit: false, fehler: false, eintraege: [] })
    laeuft = (async () => {
        // Erst offene Speichervorgänge abwarten, sonst liest das Neuladen einen veralteten Stand.
        await Promise.allSettled([...ketten.values()])
        try {
            const sb = await supabase()
            const { data, error } = await alleZeilen(() => sb.from('stack_eintraege').select(`id, ${FELDER.join(', ')}`).order('id'))
            if (!istAktuell(uid) || stand.uid !== uid) return
            if (error) return melde({ bereit: true, fehler: true })
            melde({ bereit: true, eintraege: data.map((z) => ({ ...z, betrag: Number(z.betrag) })) })
        } catch {
            // Netz- oder Ladefehler: Fehlermeldung statt endlosem Ladezustand.
            if (stand.uid === uid) melde({ bereit: true, fehler: true })
        }
    })().finally(() => {
        laeuft = null
    })
    return laeuft
}

export async function stackHinzu(uid, eintrag) {
    if (stand.uid !== uid) return false
    const sb = await supabase()
    const { data, error } = await sb.from('stack_eintraege').insert(bereinige(eintrag)).select(`id, ${FELDER.join(', ')}`).single()
    if (error || stand.uid !== uid) return false
    melde({ eintraege: [...stand.eintraege, { ...data, betrag: Number(data.betrag) }] })
    return true
}

// Änderungen je Eintrag nacheinander speichern und nur die geänderten Felder senden,
// damit sich zwei schnelle Änderungen nicht gegenseitig überschreiben.
export function stackAendern(uid, id, felder) {
    if (stand.uid !== uid) return Promise.resolve(false)
    const alt = stand.eintraege.find((e) => e.id === id)
    if (!alt) return Promise.resolve(false)
    const sauber = bereinige({ ...alt, ...felder })
    const patch = Object.fromEntries(Object.keys(felder).filter((k) => FELDER.includes(k)).map((k) => [k, sauber[k]]))
    melde({ eintraege: stand.eintraege.map((e) => (e.id === id ? { ...e, ...patch } : e)) })
    const lauf = (ketten.get(id) || Promise.resolve()).then(async () => {
        const sb = await supabase()
        const { error } = await sb.from('stack_eintraege').update(patch).eq('id', id)
        // Bei einem Fehler den bestätigten Stand vom Server holen, sobald alle Änderungen durch sind.
        if (error && stand.uid === uid) setTimeout(() => ladeStack(uid, true, true), 0)
        return !error
    })
    ketten.set(id, lauf.catch(() => false))
    return lauf
}

export async function stackEntfernen(uid, id) {
    if (stand.uid !== uid) return false
    const sb = await supabase()
    const { error } = await sb.from('stack_eintraege').delete().eq('id', id)
    if (error || stand.uid !== uid) return false
    melde({ eintraege: stand.eintraege.filter((e) => e.id !== id) })
    return true
}

// Browser-Stack ins Konto übernehmen. Nach Erfolg wird der Browser-Stack geleert, damit nichts doppelt landet.
let uebernahme = null
export function stackUebernehmen(uid) {
    // Läuft schon eine Übernahme, wird sie nicht ein zweites Mal gestartet.
    if (!uebernahme) uebernahme = uebernehmen(uid).finally(() => (uebernahme = null))
    return uebernahme
}
async function uebernehmen(uid) {
    if (stand.uid !== uid) return -1
    const lokal = lokalLesen()
    if (!lokal.length) return 0
    const frei = Math.max(0, 100 - stand.eintraege.length)
    const zeilen = lokal.slice(0, frei).map(bereinige)
    if (!zeilen.length) return -2
    const sb = await supabase()
    const { data, error } = await sb.from('stack_eintraege').insert(zeilen).select(`id, ${FELDER.join(', ')}`)
    if (error || stand.uid !== uid) return -1
    lokalSchreiben(lokal.slice(zeilen.length))
    melde({ eintraege: [...stand.eintraege, ...data.map((z) => ({ ...z, betrag: Number(z.betrag) }))] })
    return zeilen.length
}
