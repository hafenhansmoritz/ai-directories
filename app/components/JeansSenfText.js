'use client'

import TEXTE from '../../db/texte/hubs.json'

// Text zu JeansSenf, als eigener Teil nachgeladen (siehe JeansSenf.js).
export default function JeansSenfText({ pfad }) {
    const t = TEXTE[pfad]
    if (!t) return null
    return (
        <section className="jean-take jeans-senf" aria-labelledby="jeans-senf">
            <h2 id="jeans-senf">
                Jeans Senf zu dieser Seite <span aria-hidden="true">🌭</span>
            </h2>
            <p>{t.intro}</p>
            <p>
                <em>{t.jean}</em>
            </p>
        </section>
    )
}
