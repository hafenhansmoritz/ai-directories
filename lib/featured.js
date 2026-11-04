// Featured-Plätze („Anzeige“) für die Verzeichnis-Tabellen. Daten in db/featured.json, standardmäßig leer.
// Gefiltert wird beim Build (statischer Export), damit Server und Browser dieselbe Liste rendern.
import data from '../db/featured.json'

const heute = () => new Date().toISOString().slice(0, 10)

// Aktive Einträge für einen Ort (z. B. 'start', 'liste'); ohne orte gilt ein Eintrag überall.
export function featuredFuer(ort, stichtag = heute()) {
    return (data.eintraege || [])
        .filter((e) => e && e.name && /^https:\/\//.test(e.url || ''))
        .filter((e) => (!e.von || e.von <= stichtag) && (!e.bis || e.bis >= stichtag))
        .filter((e) => !e.orte?.length || e.orte.includes(ort))
        .map(({ name, url, text }) => ({ name, url, text: text || '' }))
}
