// Änderungsdatum je Eintrag statt je Datei: Für Sammeldateien wie db/directories.json wird die Git-Historie
// durchgegangen und für jeden Eintrag der letzte Commit gesucht, der genau diesen Eintrag geändert hat.
// So stempelt ein neues Verzeichnis nicht alle 256 Seiten in der Sitemap neu. Nur serverseitig beim Bauen nutzen.
// Ohne Git-Historie (flacher Checkout) gilt der älteste erreichbare Commit; ohne Git gibt es null.
import { execFileSync } from 'node:child_process'
import slugify from '../utils/slugify'

const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 512 * 1024 * 1024 })

// Wie aus dem Dateiinhalt Einträge mit Schlüssel (Slug) werden. Sonst: Objekt mit Slug als Schlüssel.
const LESER = {
    'db/directories.json': (j) => (j.data || []).map((d) => [slugify(d.name), d]),
    'db/tools.json': (j) => (Array.isArray(j) ? j : []).map((t) => [t.slug, t]),
    'db/kb-tools.json': (j) => (j.tools || []).map((t) => [t.slug, t]),
}
const lies = (datei, inhalt) => {
    const j = JSON.parse(inhalt)
    const paare = LESER[datei] ? LESER[datei](j) : Object.entries(j)
    return new Map(paare.map(([k, v]) => [k, JSON.stringify(v)]))
}

const cache = new Map()
function staende(datei) {
    if (cache.has(datei)) return cache.get(datei)
    const ergebnis = new Map()
    try {
        const commits = git(['log', '--format=%H %cI', '--', datei])
            .trim()
            .split('\n')
            .filter(Boolean)
            .map((z) => z.split(' '))
        const version = (i) => {
            if (i >= commits.length) return null
            try {
                return lies(datei, git(['show', `${commits[i][0]}:${datei}`]))
            } catch {
                return new Map()
            }
        }
        let jetzt = version(0)
        const offen = new Set(jetzt ? jetzt.keys() : [])
        for (let i = 0; jetzt && offen.size; i++) {
            const davor = version(i + 1)
            for (const k of [...offen]) {
                // Im älteren Stand anders oder nicht vorhanden: Dieser Commit hat den Eintrag zuletzt geändert.
                if (!davor || davor.get(k) !== jetzt.get(k)) {
                    ergebnis.set(k, new Date(commits[i][1]))
                    offen.delete(k)
                }
            }
            jetzt = davor
        }
    } catch {
        // Kein Git: keine Einzeldaten, die Sitemap nimmt dann das Dateidatum.
    }
    cache.set(datei, ergebnis)
    return ergebnis
}

// Spätestes Änderungsdatum eines Eintrags über mehrere Dateien, oder null, wenn keine Datei ihn kennt.
export function eintragStand(schluessel, ...dateien) {
    const daten = dateien.map((d) => staende(d).get(schluessel)).filter(Boolean)
    return daten.length ? new Date(Math.max(...daten.map((d) => d.getTime()))) : null
}
