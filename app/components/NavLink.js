import Link from 'next/link'

// Link für Navigation, Seitenleisten, Footer und „Passt dazu“: ohne Vorabladen.
// Im statischen Export lädt jeder sichtbare Link sonst die komplette Daten-Datei der Zielseite vorab,
// bei 60 Footer-Links schnell über 1 MB. Der Seitenwechsel bleibt trotzdem clientseitig.
export default function NavLink(props) {
    return <Link prefetch={false} {...props} />
}
