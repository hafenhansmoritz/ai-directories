'use client'

import { useEffect, useState } from 'react'
import { feiertag, toast } from '../../lib/herz'
import useUeberScroll from './useUeberScroll'

// Kleiner Tagesgruß im Header, je nach Uhrzeit beim Besucher.
// Klickbar: Jean wechselt durch trockene, motivierende Sprüche für Indie-Hacker.
const GRUESSE = [
    [5, 'Moin, Frühaufsteher', '☕'],
    [11, 'Mahlzeit', '🍝'],
    [14, 'Na, produktiv?', '🛠️'],
    [18, 'Feierabend-Modus', '🛋️'],
    [23, 'Nachteule entdeckt', '🦉'],
]

const SPRUECHE = [
    ['Nicht grübeln, lauschen.', '🎧'],
    ['Perfekt ist der Feind von gelauncht.', '🚀'],
    ['Erst eintragen, dann Kaffee.', '☕'],
    ['Dein Tool baut sich nicht von allein.', '🔨'],
    ['Ein Backlink am Tag schützt vor Konkurrenz.', '🛡️'],
    ['Kein Pitch deck nötig: zeig einfach, was es kann.', '💡'],
    ['Schlaf wird überbewertet, sagt der Server.', '🤖'],
    ['Jean glaubt an dich. Ehrenwort.', '💛'],
]

export default function Gruss() {
    const [spruch, setSpruch] = useState(null)
    const [klicks, setKlicks] = useState(0)
    const weg = useUeberScroll(80)

    useEffect(() => {
        const h = new Date().getHours()
        const treffer = [...GRUESSE].reverse().find(([ab]) => h >= ab) || GRUESSE[GRUESSE.length - 1]
        const fest = feiertag(new Date())
        setSpruch(fest ? [fest[0], fest[1]] : [treffer[1], treffer[2]])
    }, [])

    if (!spruch) return null

    const klick = () => {
        const naechster = (klicks + 1) % SPRUECHE.length
        setKlicks(klicks + 1)
        setSpruch(SPRUECHE[naechster])
        if (klicks === 2) {
            toast('3 Klicks auf Jean: Du meinst es wirklich ernst mit dem Produktivsein! Weiter so.', '🛠️')
        }
    }

    return (
        <button
            type="button"
            className={`gruss gruss-btn${weg ? ' gruss-weg' : ''}`}
            onClick={klick}
            title="Klick für einen Rat von Jean"
            aria-label={`${spruch[0]} - Klick für einen Rat von Jean`}
        >
            {spruch[0]} <span aria-hidden="true">{spruch[1]}</span>
        </button>
    )
}
