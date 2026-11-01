'use client'

import { useEffect, useRef } from 'react'

// Dünner Balken oben: wie weit du schon gelesen hast. Rein dekorativ, ohne Animation.
// Schreibt den Wert direkt an das Element (höchstens einmal pro Bild), statt bei jedem Scroll-Ereignis neu zu rendern.
export default function LeseFortschritt() {
    const balken = useRef(null)
    useEffect(() => {
        let wartet = false
        const zeichnen = () => {
            wartet = false
            const max = document.documentElement.scrollHeight - window.innerHeight
            const anteil = max > 0 ? Math.min(1, window.scrollY / max) : 0
            if (balken.current) balken.current.style.transform = `scaleX(${anteil})`
        }
        const update = () => {
            if (wartet) return
            wartet = true
            requestAnimationFrame(zeichnen)
        }
        zeichnen()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])
    return <div ref={balken} className="lese-fortschritt" aria-hidden="true" style={{ transform: 'scaleX(0)' }} />
}
