'use client'

import { useState } from 'react'
import Link from 'next/link'
import { withBase } from '../../lib/site'
import { partnerRel } from '../../lib/monetization'

// Dreht durch die Konsens-Tools und bleibt bei einem Zufallsfund stehen.
export default function ToolRoulette() {
    const [aktuell, setAktuell] = useState(null)
    const [dreht, setDreht] = useState(false)
    const [tools, setTools] = useState(null)

    const drehen = async () => {
        if (dreht) return
        setDreht(true)
        let liste = tools
        if (!liste) {
            try {
                liste = await (await fetch(withBase('/api/roulette'))).json()
                setTools(liste)
            } catch {
                setDreht(false)
                return
            }
        }
        if (!liste.length) return setDreht(false)
        let n = 0
        const schritte = 14 + Math.floor(Math.random() * 8)
        const tick = () => {
            setAktuell(liste[Math.floor(Math.random() * liste.length)])
            n += 1
            if (n < schritte) setTimeout(tick, 40 + n * 12)
            else setDreht(false)
        }
        tick()
    }

    return (
        <div className={`roulette${dreht ? ' is-spinning' : ''}`}>
            <p className="roulette-window" aria-live="polite">
                {aktuell ? <strong>{aktuell.n}</strong> : <span>Welches KI-Tool kennst du noch nicht?</span>}
            </p>
            {aktuell && !dreht && (
                <>
                    <p className="widget-note">
                        <a href={aktuell.u} target="_blank" rel={partnerRel(aktuell.a)}>
                            Ansehen ↗{aktuell.a ? <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup> : null}
                        </a>
                        {aktuell.p && (
                            <>
                                {' '}
                                · <Link href={`/tools/${aktuell.p}`}>Steckbrief</Link>
                            </>
                        )}
                    </p>
                </>
            )}
            <button type="button" className="button button-small" onClick={drehen} disabled={dreht}>
                {dreht ? 'Dreht …' : aktuell ? 'Nochmal drehen 🎰' : 'Drehen 🎰'}
            </button>
        </div>
    )
}
