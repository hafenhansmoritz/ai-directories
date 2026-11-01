'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import JeanIcon from './JeanIcon'
import CopyButton from './CopyButton'
import { withBase } from '../../lib/site'

// Deal, Prompt und Tool des Tages aus /heute.json (app/heute.json/route.js), geladen erst, wenn der Bereich ins Bild kommt.
// Im statischen HTML stehen nur feste Links auf die Übersichten. So wechseln nicht täglich drei Seiten in allen Seiten.
let anfrage = null
const holen = () => {
    if (!anfrage)
        anfrage = fetch(withBase('/heute.json'))
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
    return anfrage
}

function useHeute() {
    const ort = useRef(null)
    const [daten, setDaten] = useState(null)
    useEffect(() => {
        const el = ort.current
        if (!el) return
        let aktiv = true
        const laden = () => holen().then((d) => aktiv && d && setDaten(d))
        if (typeof IntersectionObserver === 'undefined') {
            laden()
            return () => (aktiv = false)
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return
                io.disconnect()
                laden()
            },
            { rootMargin: '200px' }
        )
        io.observe(el)
        return () => {
            aktiv = false
            io.disconnect()
        }
    }, [])
    return [ort, daten]
}

function Widget({ icon, cool, title, children }) {
    return (
        <section className="widget">
            <p className="widget-title">
                <JeanIcon badge={icon} cool={cool} size={34} />
                <span>{title}</span>
            </p>
            {children}
        </section>
    )
}

function DealInhalt({ deal }) {
    if (!deal)
        return (
            <p>
                Eigene Rabattcodes für KI-Verzeichnisse folgen. Bis dahin: <Link href="/liste/kostenlos" prefetch={false}>kostenlose Verzeichnisse</Link>
            </p>
        )
    return (
        <>
            <p>
                <strong>{deal.text}</strong> bei{' '}
                <Link href={`/verzeichnis/${deal.slug}`} prefetch={false}>
                    {deal.name}
                </Link>
            </p>
            <p className="widget-code">
                <code>{deal.code}</code> <CopyButton value={deal.code} label="Kopieren" />
            </p>
            <p className="widget-note">
                <a href={deal.link} target="_blank" rel={deal.rel}>
                    Einlösen <span aria-hidden="true">↗</span>
                    {deal.partner && <sup>*</sup>}
                </a>{' '}
                · <Link href="/liste/rabattcodes" prefetch={false}>alle Deals</Link>
            </p>
        </>
    )
}

function PromptInhalt({ prompt }) {
    if (!prompt)
        return (
            <p>
                Jeden Tag eine andere Vorlage zum Kopieren. <Link href="/prompts" prefetch={false}>Zur Prompt-Bibliothek</Link>
            </p>
        )
    return (
        <>
            <p>
                <Link href={`/prompts/${prompt.slug}`} prefetch={false}>
                    <strong>{prompt.titel}</strong>
                </Link>
            </p>
            <p className="widget-note">{prompt.ziel}</p>
        </>
    )
}

function ToolInhalt({ tool }) {
    if (!tool)
        return (
            <p>
                Jeden Tag ein anderes KI-Tool mit Preisen laut Anbieter. <Link href="/tools" prefetch={false}>Alle Steckbriefe</Link>
            </p>
        )
    return (
        <>
            <p>
                <Link href={`/tools/${tool.slug}`} prefetch={false}>
                    <strong>{tool.name}</strong>
                </Link>{' '}
                <span className="widget-note">{tool.kategorie}</span>
            </p>
            <p className="widget-note">
                {tool.gratis ? 'Mit Gratis-Tarif. ' : ''}
                {tool.ab ? `Bezahlt ab ${tool.ab}.` : ''}
            </p>
            {tool.link && (
                <p className="widget-note">
                    <a href={tool.link} target="_blank" rel={tool.rel}>
                        Zum Anbieter <span aria-hidden="true">↗</span>
                        {tool.partner && <sup>*</sup>}
                    </a>
                </p>
            )}
        </>
    )
}

// Für die rechte Seitenleiste (Desktop).
export function HeuteSeitenleiste() {
    const [ort, daten] = useHeute()
    return (
        <div ref={ort} className="a-heute-leiste">
            <Widget icon="deal" title="Deal des Tages">
                <DealInhalt deal={daten?.deal} />
            </Widget>
            <Widget icon="prompt" cool title="Prompt des Tages">
                <PromptInhalt prompt={daten?.prompt} />
            </Widget>
            <Widget icon="werkzeug" title="Tool des Tages">
                <ToolInhalt tool={daten?.tool} />
            </Widget>
        </div>
    )
}

// Kompakte Karte für Handy und Tablet, wo die Seitenleisten fehlen.
export function HeuteKarte() {
    const [ort, daten] = useHeute()
    return (
        <section ref={ort} className="a-heute" aria-labelledby="a-heute-titel">
            <h2 id="a-heute-titel" className="a-heute-titel">
                Heute bei AIGeddon <span aria-hidden="true">📅</span>
            </h2>
            <div className="a-heute-raster">
                <div>
                    <p className="a-heute-art">Deal des Tages</p>
                    <DealInhalt deal={daten?.deal} />
                </div>
                <div>
                    <p className="a-heute-art">Prompt des Tages</p>
                    <PromptInhalt prompt={daten?.prompt} />
                </div>
                <div>
                    <p className="a-heute-art">Tool des Tages</p>
                    <ToolInhalt tool={daten?.tool} />
                </div>
            </div>
        </section>
    )
}
