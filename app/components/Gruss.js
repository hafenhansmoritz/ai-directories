'use client'

import { useEffect, useState } from 'react'
import { feiertag } from '../../lib/herz'
import useUeberScroll from './useUeberScroll'

// Kleiner Tagesgruß im Header, je nach Uhrzeit beim Besucher. Erst nach dem Laden, damit nichts flackert.
const GRUESSE = [
    [5, 'Moin, Frühaufsteher', '☕'],
    [11, 'Mahlzeit', '🍝'],
    [14, 'Na, produktiv?', '🛠️'],
    [18, 'Feierabend-Modus', '🛋️'],
    [23, 'Nachteule entdeckt', '🦉'],
]

export default function Gruss() {
    const [text, setText] = useState(null)
    const weg = useUeberScroll(80)
    useEffect(() => {
        const h = new Date().getHours()
        const treffer = [...GRUESSE].reverse().find(([ab]) => h >= ab) || GRUESSE[GRUESSE.length - 1]
        const fest = feiertag(new Date())
        setText(fest ? [fest[0], fest[1]] : [treffer[1], treffer[2]])
    }, [])
    if (!text) return null
    return (
        <span className={`gruss${weg ? ' gruss-weg' : ''}`}>
            {text[0]} <span aria-hidden="true">{text[1]}</span>
        </span>
    )
}
