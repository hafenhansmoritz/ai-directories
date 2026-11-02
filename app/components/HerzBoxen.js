'use client'

import { verleihe, toast } from '../../lib/herz'
import { BriefHerz } from './HerzIcons'
import { SITE_URL } from '../../lib/site'

// Zwei kleine Gemeinschafts-Gesten ohne Server: Idee an Jean schicken und mentat.codes weitersagen.
const TEXT = 'Schau mal, mentat.codes: KI-Verzeichnisse, KI-Tools, Prompts und Skills, ehrlich geprüft und kostenlos.'

export function IdeeBox() {
    return (
        <aside className="herz-box">
            <BriefHerz size={60} />
            <div>
                <p className="herz-box-titel">Was braucht hier noch mehr Herz?</p>
                <p>Eine Idee, ein Wunsch, ein Fehler oder einfach ein Hallo: Jean liest jede Nachricht selbst.</p>
                <a className="button button-small" href="#anfrage-sonstiges">
                    Idee an Jean schicken <span aria-hidden="true">✉️</span>
                </a>
            </div>
        </aside>
    )
}

export function Weitersagen() {
    const url = SITE_URL + '/'
    const danke = () => verleihe('Botschafter-Abzeichen', { auto: false })
    const kopieren = async () => {
        try {
            await navigator.clipboard.writeText(`${TEXT} ${url}`)
            if (!verleihe('Botschafter-Abzeichen', { auto: false })) toast('Kopiert. Danke fürs Weitersagen!', '💌')
        } catch {}
    }
    return (
        <aside className="herz-box">
            <span className="herz-box-emoji" aria-hidden="true">
                💌
            </span>
            <div>
                <p className="herz-box-titel">Kennst du jemanden, dem mentat.codes helfen würde?</p>
                <p>Ein Link an die richtige Person ist das schönste Kompliment, das du uns machen kannst.</p>
                <p className="herz-box-knoepfe">
                    <a className="button button-small" href={`mailto:?subject=${encodeURIComponent('Tipp: mentat.codes')}&body=${encodeURIComponent(`${TEXT}\n\n${url}`)}`} onClick={danke}>
                        Per E-Mail
                    </a>
                    <a className="button button-small" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" onClick={danke}>
                        Per LinkedIn
                    </a>
                    <a className="button button-small" href={`https://wa.me/?text=${encodeURIComponent(`${TEXT} ${url}`)}`} target="_blank" rel="noopener" onClick={danke}>
                        Per WhatsApp
                    </a>
                    <button type="button" className="button button-small" onClick={kopieren}>
                        Text kopieren
                    </button>
                </p>
            </div>
        </aside>
    )
}
