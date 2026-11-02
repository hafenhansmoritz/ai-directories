// Gestaltungsbausteine: farbige Bänder und Trennlinien. Reines Markup, keine Logik.

// Trennlinie: welle, zickzack, punkte oder strahlung/terminal. Form per CSS-Maske, Farbe frei wählbar.
export function Trenner({ art = 'welle', farbe = 'accent' }) {
    if (art === 'strahlung' || art === 'terminal')
        return (
            <div className={`trenner-strahlung farbe-${farbe}`} aria-hidden="true">
                <span>&gt;_</span>
                <span>{'//'}</span>
                <span>&gt;_</span>
            </div>
        )
    return <div className={`trenner trenner-${art} farbe-${farbe}`} aria-hidden="true" />
}

// Farbiges Band mit optionalem Titel-Sticker. farbe: gelb, mint, pink, blau, lila, dunkel
export function Band({ farbe = 'gelb', id, titel, sticker, children, className = '' }) {
    return (
        <section className={`band band-${farbe} ${className}`} aria-labelledby={titel && id ? id : undefined}>
            {sticker && <span className="band-sticker">{sticker}</span>}
            {titel && <h2 id={id}>{titel}</h2>}
            {children}
        </section>
    )
}
