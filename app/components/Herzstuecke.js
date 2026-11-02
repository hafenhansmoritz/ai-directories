'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import konfetti from '../../lib/konfetti'
import { lies, schreib, sitzung, toast, verleihe, feiertag, nachts, ruhig, kuerzelAus, setzeKuerzel } from '../../lib/herz'

// Kleine Aufmerksamkeiten für Besucher. Alles läuft lokal im Browser, nichts wird gezählt oder gesendet.
const KUERZEL = [
    ['h', '/', 'Startseite'],
    ['n', '/ki-news', 'KI-News'],
    ['p', '/prompts', 'Prompts'],
    ['s', '/skills', 'Skills'],
    ['r', '/ratgeber', 'Ratgeber'],
    ['m', '/merkliste', 'Deine Merkliste'],
]
const ABZEICHEN = [
    [3, 'Neugier-Abzeichen'],
    [6, 'Entdecker-Abzeichen'],
    [10, 'Weltreise-Abzeichen'],
]
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const heute = () => new Date().toISOString().slice(0, 10)

// Kleiner Herzregen an einer Stelle des Bildschirms.
export function herzRegen(x, y, anzahl = 9) {
    if (ruhig()) return
    for (let i = 0; i < anzahl; i++) {
        const h = document.createElement('span')
        h.className = 'herz-flug'
        h.setAttribute('aria-hidden', 'true')
        h.textContent = ['❤️', '💖', '💛', '💜'][i % 4]
        h.style.left = `${x}px`
        h.style.top = `${y}px`
        h.style.setProperty('--dx', `${(Math.random() - 0.5) * 160}px`)
        h.style.animationDelay = `${i * 40}ms`
        document.body.appendChild(h)
        setTimeout(() => h.remove(), 1500)
    }
}
const LESESEITEN = /^\/(ratgeber|ki-news|tutorials)\/[^/]+\/?$/

// Saison nach Datum: Monat (1-12), Tag. Rückgabe [Name, Emoji].
const saison = (d) => {
    const m = d.getMonth() + 1
    const t = d.getDate()
    if ((m === 10 && t >= 24) || (m === 11 && t <= 1)) return ['halloween', '🎃']
    if (m === 12 && t <= 24) return ['advent', '❄️']
    if ((m === 12 && t >= 31) || (m === 1 && t <= 1)) return ['silvester', '🎆']
    if ((m === 3 && t >= 20) || m === 4) return ['fruehling', '🌸']
    if ((m === 6 && t >= 21) || m === 7 || m === 8) return ['sommer', '☀️']
    return null
}

export default function Herzstuecke() {
    const pfad = usePathname() || '/'
    const router = useRouter()
    const [hilfe, setHilfe] = useState(false)
    const [deko, setDeko] = useState(null)

    // Einmal pro Seitenaufruf: Einstellungen anwenden, Saison, Besuche, Konsole, Pausen, Kopieren, Tab-Titel.
    useEffect(() => {
        const html = document.documentElement
        const theme = lies('mentat-theme')
        if (theme === 'dark' || theme === 'light') html.dataset.theme = theme
        const akzent = lies('mentat-akzent')
        if (akzent) html.dataset.akzent = akzent
        if (lies('mentat-ruhig')) html.dataset.ruhig = 'an'
        const s = saison(new Date())
        if (s) {
            html.dataset.saison = s[0]
            setDeko(s)
        }

        const jetzt = new Date()
        if (nachts(jetzt)) html.dataset.nacht = 'an'

        // Feiertagsgruß: einmal pro Tag, hat Vorrang vor allen anderen automatischen Meldungen.
        const fest = feiertag(jetzt)
        if (fest && lies('mentat-feiertag') !== heute()) {
            schreib('mentat-feiertag', heute())
            setTimeout(() => toast(fest[2], fest[1], true), 800)
        }

        if (!sitzung('mentat-besuch')) {
            const anzahl = (lies('mentat-besuche', 0) || 0) + 1
            schreib('mentat-besuche', anzahl)
            // Für „Neu seit deinem letzten Besuch“: den vorigen Besuch für diese Sitzung festhalten.
            try {
                sessionStorage.setItem('mentat-vorher', lies('mentat-zuletzt', '') || '')
            } catch {}
            schreib('mentat-zuletzt', jetzt.toISOString())
            if (nachts(jetzt)) {
                setTimeout(() => {
                    toast('Nachteule! Schön, dass du da bist. Denk dran: Schlaf ist auch ein Produktivitäts-Tool.', '🌙', true)
                    // Abzeichen still ins Sammelalbum, die Meldung oben reicht.
                    verleihe('Nachteulen-Abzeichen')
                }, 1200)
            }
            if (anzahl === 2) setTimeout(() => toast('Schön, dass du wieder da bist!', '👋', true), 1500)
            // Kein Konfetti beim Laden einer Seite: Es würde den Inhalt verdecken, den du gerade suchst.
            else if ([5, 10, 25, 50, 100].includes(anzahl)) setTimeout(() => toast(`Das ist dein ${anzahl}. Besuch. Danke für deine Treue!`, '🎉', true), 1500)
            // Für Entwickler, die neugierig in die Konsole schauen.
            console.log(
                '%c>_ mentat.codes%c\nHallo du neugierige Seele! Der Code ist Open Source: https://github.com/jmp-collab/ai-directories\nPull Requests werden mit Konfetti empfangen.',
                'font:bold 20px monospace;color:#0369a1',
                'font:13px sans-serif'
            )
            const pause = setTimeout(() => toast('Du bist seit 25 Minuten hier. Zeit für einen Schluck Wasser und einmal Strecken.', '💧', true), 25 * 60 * 1000)
            return () => clearTimeout(pause)
        }
    }, [])

    useEffect(() => {
        const kopiert = () => {
            const text = String(window.getSelection() || '')
            if (text.length > 40 && !sitzung('mentat-kopiert')) toast('Gut kopiert! Wenn du es teilst, freut sich ein Link zurück.', '📋', true)
        }
        let timer
        const titel = { alt: '' }
        const sicht = () => {
            if (document.hidden) {
                titel.alt = document.title
                timer = setTimeout(() => (document.title = '👋 Bis gleich! | mentat.codes'), 30000)
            } else {
                clearTimeout(timer)
                if (titel.alt) document.title = titel.alt
            }
        }
        document.addEventListener('copy', kopiert)
        document.addEventListener('visibilitychange', sicht)
        return () => {
            document.removeEventListener('copy', kopiert)
            document.removeEventListener('visibilitychange', sicht)
            clearTimeout(timer)
        }
    }, [])

    // Pro Seite: Bereiche für Abzeichen merken, Lese-Medaille bei ganz gelesenen Artikeln.
    useEffect(() => {
        const bereich = pfad.split('/').filter(Boolean)[0] || 'start'
        const besucht = new Set(lies('mentat-bereiche', []) || [])
        if (!besucht.has(bereich)) {
            besucht.add(bereich)
            schreib('mentat-bereiche', [...besucht])
            const neu = ABZEICHEN.find(([n]) => n === besucht.size)
            if (neu) setTimeout(() => verleihe(neu[1]), 1200)
        }
        if (pfad.startsWith('/rechner')) setTimeout(() => verleihe('Prüfmeister-Abzeichen'), 1200)
        if (pfad.startsWith('/ki-test')) setTimeout(() => verleihe('Benchmark-Abzeichen'), 1200)
        if (pfad.startsWith('/launch-kit')) setTimeout(() => verleihe('Launch-Pionier-Abzeichen'), 1200)
        // Verlauf für die Merkliste: die letzten 8 Seiten. Titel erst nach dem Seitenwechsel lesen.
        const verlaufTimer = setTimeout(() => {
            if (pfad.startsWith('/merkliste')) return
            const titel = document.title.replace(/\s*\|\s*(?:mentat\.codes|mentat.codes)\s*$/i, '')
            const alt = (lies('mentat-verlauf', []) || []).filter((v) => v.pfad !== pfad)
            schreib('mentat-verlauf', [{ pfad, titel, zeit: Date.now() }, ...alt].slice(0, 8))
        }, 600)
        if (!LESESEITEN.test(pfad)) return () => clearTimeout(verlaufTimer)
        const gelesen = new Set(lies('mentat-gelesen', []) || [])
        if (gelesen.has(pfad)) return () => clearTimeout(verlaufTimer)
        const start = Date.now()
        let wartet = false
        const scroll = () => {
            if (wartet) return
            wartet = true
            requestAnimationFrame(() => (wartet = false))
            const ende = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight * 0.92
            if (ende && Date.now() - start > 30000) {
                gelesen.add(pfad)
                schreib('mentat-gelesen', [...gelesen])
                if (!verleihe('Leseratten-Abzeichen')) toast(`Respekt, ganz durchgelesen! Das war Artikel Nr. ${gelesen.size} für dich. Kaffee verdient.`, '🏅', true)
                window.removeEventListener('scroll', scroll)
            }
        }
        window.addEventListener('scroll', scroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', scroll)
            clearTimeout(verlaufTimer)
        }
    }, [pfad])

    // Klick-Geheimnisse: Logo fünfmal, Moped hupen lassen, Skill-Download feiern.
    const logoKlicks = useRef([])
    useEffect(() => {
        let hupen = 0
        const klick = (e) => {
            const ziel = e.target.closest ? e.target : e.target.parentElement
            if (!ziel) return
            if (ziel.closest('.brand')) {
                const jetzt = Date.now()
                logoKlicks.current = [...logoKlicks.current.filter((t) => jetzt - t < 4000), jetzt]
                if (logoKlicks.current.length >= 5) {
                    logoKlicks.current = []
                    const icon = document.querySelector('.brand-icon')
                    if (icon && !ruhig()) {
                        icon.classList.add('logo-wirbel')
                        setTimeout(() => icon.classList.remove('logo-wirbel'), 1300)
                    }
                    if (!verleihe('Atomkern-Abzeichen', { auto: false, konfetti: true })) toast('Wusch! Das Terminal dreht sich für dich.', '⚡')
                }
            }
            if (ziel.closest('.moped-strecke')) {
                hupen++
                const strecke = document.querySelector('.moped-strecke')
                if (strecke && !ruhig()) {
                    strecke.classList.remove('moped-hupt')
                    void strecke.offsetWidth
                    strecke.classList.add('moped-hupt')
                }
                toast(['Möp möp!', 'Möööp!', 'Platz da, hier kommt die Liebe!'][(hupen - 1) % 3], '🛵')
                if (hupen >= 3) verleihe('Hupkonzert-Abzeichen', { auto: false, konfetti: true })
            }
            const link = ziel.closest('a[href$=".zip"]')
            if (link && link.getAttribute('href').includes('/skills-dl/')) {
                if (!verleihe('Skill-Sammler-Abzeichen', { auto: false })) toast('Viel Spaß mit deinem neuen Skill!', '🧩')
            }
        }
        document.addEventListener('click', klick)
        return () => document.removeEventListener('click', klick)
    }, [])

    // Tastenkürzel: ? zeigt die Hilfe, Buchstaben springen in Bereiche, t nach oben.
    // Ein-Buchstaben-Kürzel lassen sich in der Hilfe und im Footer abschalten (WCAG 2.1.4).
    const [kuerzelAn, setKuerzelAn] = useState(true)
    const hilfeKnopf = useRef(null)
    const vorherFokus = useRef(null)
    useEffect(() => {
        setKuerzelAn(!kuerzelAus())
        const wechsel = (e) => setKuerzelAn(e.detail.an)
        const zeigen = () => setHilfe(true)
        window.addEventListener('mentat-kuerzel', wechsel)
        window.addEventListener('mentat-kuerzel-hilfe', zeigen)
        return () => {
            window.removeEventListener('mentat-kuerzel', wechsel)
            window.removeEventListener('mentat-kuerzel-hilfe', zeigen)
        }
    }, [])

    // Fokus in die Hilfe setzen und beim Schließen dorthin zurückgeben, wo er vorher war.
    useEffect(() => {
        if (hilfe) {
            vorherFokus.current = document.activeElement
            hilfeKnopf.current?.focus()
        } else if (vorherFokus.current) {
            vorherFokus.current.focus?.()
            vorherFokus.current = null
        }
    }, [hilfe])

    useEffect(() => {
        let folge = []
        let wort = ''
        const taste = (e) => {
            if (e.key === 'Escape') return setHilfe(false)
            if (e.ctrlKey || e.metaKey || e.altKey) return
            if (kuerzelAus()) return
            const ziel = e.target
            if (ziel.closest && ziel.closest('input, textarea, select, [contenteditable="true"]')) return
            folge = [...folge, e.key].slice(-KONAMI.length)
            if (folge.join() === KONAMI.join()) {
                folge = []
                if (!ruhig()) konfetti(120)
                if (!verleihe('Geheimagenten-Abzeichen', { auto: false })) toast('Code erkannt. Du hast es immer noch drauf!', '🎮')
            }
            wort = (wort + (e.key.length === 1 ? e.key.toLowerCase() : ' ')).slice(-5)
            if (wort === 'liebe') {
                wort = ''
                herzRegen(window.innerWidth / 2, window.innerHeight / 2, 16)
                if (!verleihe('Liebesbrief-Abzeichen', { auto: false })) toast('Liebe zurück! Mit Zinsen.', '💘')
            }
            if (e.key === '?') {
                e.preventDefault()
                setHilfe((h) => !h)
                return
            }
            if (e.key === 't') return window.scrollTo({ top: 0, behavior: 'smooth' })
            const k = KUERZEL.find(([key]) => key === e.key)
            if (k) {
                setHilfe(false)
                router.push(k[1])
            }
        }
        window.addEventListener('keydown', taste)
        return () => window.removeEventListener('keydown', taste)
    }, [router])

    return (
        <>
            {deko && (
                <span className={`saison-deko saison-${deko[0]}`} aria-hidden="true">
                    {deko[1]}
                </span>
            )}
            {hilfe && (
                <div className="kuerzel-overlay" role="dialog" aria-modal="false" aria-labelledby="kuerzel-titel" aria-describedby="kuerzel-schalter-text">
                    <div className="kuerzel-karte">
                        <p className="kuerzel-titel" id="kuerzel-titel">
                            <span aria-hidden="true">⌨️</span> Tastenkürzel für Schnelle
                        </p>
                        <p className="a-kuerzel-schalter" id="kuerzel-schalter-text">
                            {kuerzelAn ? 'Die Kürzel sind an.' : 'Die Kürzel sind aus. Tippen löst nichts mehr aus.'}{' '}
                            <button type="button" className="ruhe-knopf" aria-pressed={!kuerzelAn} onClick={() => setzeKuerzel(!kuerzelAn)}>
                                {kuerzelAn ? 'Tastenkürzel ausschalten' : 'Tastenkürzel einschalten'}
                            </button>
                        </p>
                        <ul>
                            {KUERZEL.map(([k, , label]) => (
                                <li key={k}>
                                    <kbd>{k}</kbd> {label}
                                </li>
                            ))}
                            <li>
                                <kbd>t</kbd> Nach oben
                            </li>
                            <li>
                                <kbd>?</kbd> Diese Hilfe ein- und ausblenden
                            </li>
                        </ul>
                        <p className="kuerzel-geheim">
                            <span aria-hidden="true">🤫</span> Psst: Hier sind ein paar Geheimnisse versteckt. Hinweise stehen im Sammelalbum deiner Merkliste.
                        </p>
                        <button type="button" className="button button-small" ref={hilfeKnopf} onClick={() => setHilfe(false)}>
                            Alles klar <span aria-hidden="true">👍</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
