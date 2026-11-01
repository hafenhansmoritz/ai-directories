'use client'

import { useEffect, useState } from 'react'

// true, sobald die Seite weiter als `px` gescrollt ist. Statt bei jedem Scroll-Ereignis zu rechnen,
// beobachtet ein unsichtbarer Messpunkt am Seitenanfang, ob er noch im Bild ist.
export default function useUeberScroll(px) {
    const [ueber, setUeber] = useState(false)
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return
        const punkt = document.createElement('div')
        punkt.setAttribute('aria-hidden', 'true')
        punkt.style.cssText = `position:absolute;left:0;top:${px}px;width:1px;height:1px;pointer-events:none;visibility:hidden`
        document.body.appendChild(punkt)
        // Liegt der Messpunkt oberhalb des Bildschirms, ist die Seite weiter gescrollt.
        const io = new IntersectionObserver(([e]) => setUeber(!e.isIntersecting && e.boundingClientRect.top < 0))
        io.observe(punkt)
        return () => {
            io.disconnect()
            punkt.remove()
        }
    }, [px])
    return ueber
}
