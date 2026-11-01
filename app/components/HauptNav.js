'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Hauptnavigation: wenige Aufgaben statt aller Rubriken. Der Rest steht im Footer und in Jeans Kompass.
// Der aktive Bereich bekommt aria-current, damit Screenreader und Auge wissen, wo sie sind.
const ohneSchraegstrich = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p)

// 'page' für genau diese Seite, 'true' für eine Unterseite des Bereichs, sonst undefined.
const aktivWert = (pfad, href, bereich) => {
    const p = ohneSchraegstrich(pfad)
    const ziel = ohneSchraegstrich(href.split('#')[0] || '/')
    if (p === ziel) return 'page'
    const passt = (b) => (b === '/' ? p === '/' : p === b || p.startsWith(`${b}/`))
    return (bereich || [ziel]).some(passt) ? 'true' : undefined
}

export default function HauptNav({ punkte }) {
    const pfad = usePathname() || '/'
    return (
        <nav aria-label="Hauptnavigation" className="a-hauptnav">
            <ul>
                {punkte.map(({ href, label, emoji, bereich }) => {
                    const aktiv = aktivWert(pfad, href, bereich)
                    return (
                        <li key={href}>
                            <Link href={href} prefetch={false} aria-current={aktiv} className={aktiv ? 'is-aktiv' : undefined}>
                                {label}
                                {emoji && (
                                    <>
                                        {' '}
                                        <span aria-hidden="true">{emoji}</span>
                                    </>
                                )}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
