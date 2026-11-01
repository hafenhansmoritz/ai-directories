'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Lässt Inhalte beim Scrollen hereingleiten und Kennzahlen hochzählen ([data-count]).
// Ohne JavaScript oder bei reduzierter Bewegung ist alles sofort sichtbar.
const SELECTOR = [
    '.page-main > section',
    '.page-main > .band',
    '.link-cards > li',
    '.kb-list > li',
    '.tutorial-cards > li',
    '.rubrik-tiles > li',
    '.entry-tiles > li',
    '.podium > li',
    '.magnet-box',
    '.facts > div',
    '.stats > div',
    '.technik-liste > div',
    '.archiv-list > li',
].join(',')

const fmt = new Intl.NumberFormat('de-DE')

function countUp(el) {
    const target = Number(el.dataset.count)
    if (!Number.isFinite(target) || el.dataset.counted) return
    el.dataset.counted = '1'
    const start = performance.now()
    const dur = 1100
    const step = (now) => {
        const p = Math.min(1, (now - start) / dur)
        el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

// Nur Karten in Rastern kommen nacheinander, ganze Abschnitte erscheinen ohne Verzögerung.
const STAFFEL = /^\.(link-cards|kb-list|tutorial-cards|rubrik-tiles|entry-tiles|podium|archiv-list)/

export default function Reveal() {
    const path = usePathname()
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
        const root = document.documentElement
        const staffelSel = SELECTOR.split(',').filter((s) => STAFFEL.test(s)).join(',')
        // Nach einem Seitenwechsel erst alles zeigen, bis der Observer den neuen Stand kennt.
        root.classList.remove('reveal-ready')
        let erster = true
        // Kein getBoundingClientRect: der Observer meldet den Startzustand selbst, ohne erzwungenes Layout.
        // Die Klasse reveal-ready kommt erst nach seiner ersten Meldung, sichtbare Inhalte blinken also nicht weg.
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue
                    e.target.classList.add('is-in')
                    e.target.querySelectorAll?.('[data-count]').forEach(countUp)
                    if (e.target.dataset?.count) countUp(e.target)
                    io.unobserve(e.target)
                }
                if (erster) {
                    erster = false
                    root.classList.add('reveal-ready')
                }
            },
            { rootMargin: '0px 0px -6% 0px', threshold: 0 }
        )
        // Über einen Anker angesprungene Abschnitte (z. B. /#alle) sofort zeigen.
        let ziel = null
        try {
            ziel = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null
        } catch {
            ziel = null
        }
        const zielAbschnitt = ziel?.closest('.page-main > section, .page-main > .band')
        if (zielAbschnitt) zielAbschnitt.classList.add('is-in')
        // Verzögerung je Elternliste hochzählen statt indexOf (bei langen Listen sonst quadratisch).
        const zaehler = new Map()
        if (staffelSel) {
            document.querySelectorAll(staffelSel).forEach((el) => {
                const i = zaehler.get(el.parentElement) || 0
                zaehler.set(el.parentElement, i + 1)
                if (i) el.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 60}ms`)
            })
        }
        document.querySelectorAll(SELECTOR).forEach((el) => {
            if (!el.classList.contains('is-in')) io.observe(el)
        })
        document.querySelectorAll('[data-count]').forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [path])
    return null
}
