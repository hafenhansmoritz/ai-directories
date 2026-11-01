// Browser-taugliche Teile der KI-Tool-Datenbank, ohne die Daten selbst (die bleiben in lib/kb.js auf dem Server).

// Standard-Sortierung der Listen, auf Server und im Browser gleich, damit die erste Seite ohne Sprung lädt.
export const kbSortKonsens = (a, b) => b.k - a.k || a.n.localeCompare(b.n)

// Adresse der vollen Liste (app/ki-tools/daten.json/route.js), ohne Unterpfad der statischen Fassung.
export const KB_DATEN = '/ki-tools/daten.json'
