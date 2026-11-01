'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { lies } from '../../lib/herz'

// Stern mit Zähler im Kopf: Merkliste und Sammelalbum mit einem Tipp erreichbar, auch auf dem Handy.
// Nur ohne Konten; mit Konto übernimmt der Konto-Knopf.
export default function MerkZaehler() {
    const [zahl, setZahl] = useState(0)
    useEffect(() => {
        const lesen = () => setZahl((lies('aigeddon-merkliste', []) || []).length)
        const geaendert = (e) => {
            if (!e.detail || e.detail.key === 'aigeddon-merkliste') lesen()
        }
        lesen()
        window.addEventListener('aigeddon-speicher', geaendert)
        window.addEventListener('storage', lesen)
        return () => {
            window.removeEventListener('aigeddon-speicher', geaendert)
            window.removeEventListener('storage', lesen)
        }
    }, [])
    return (
        <Link href="/merkliste" prefetch={false} className="a-merk" aria-label={zahl ? `Merkliste, ${zahl} gemerkt` : 'Merkliste'}>
            <span aria-hidden="true">⭐</span>
            <span className="a-merk-text" aria-hidden="true">
                {zahl ? zahl : 'Merkliste'}
            </span>
        </Link>
    )
}
