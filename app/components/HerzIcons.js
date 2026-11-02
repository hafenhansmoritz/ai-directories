// Eigene Illustrationen im mentat.codes-Stil: dicke Kontur, Pop-Farben, ohne Bilddatei.
// Alle sind dekorativ (aria-hidden), der Text daneben trägt die Bedeutung.

// Herz mit Terminal-Prompt: das mentat.codes-Herz.
export function StrahlenHerz({ size = 40, className = '' }) {
    return (
        <svg className={`hi hi-herz ${className}`} viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
            <path d="M24 42C10 32 4 25 4 16a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 9-6 16-20 26z" fill="var(--accent)" stroke="var(--border)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M16 18l5 4.5-5 4.5M23.5 27H32" fill="none" stroke="var(--pop)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13a5 5 0 0 1 5-3" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
        </svg>
    )
}

// Medaille mit Band, in der Mitte steht das Emoji des Abzeichens.
export function Medaille({ emoji, size = 64, className = '' }) {
    return (
        <span className={`hi-medaille ${className}`} style={{ width: size, height: size }} aria-hidden="true">
            <svg viewBox="0 0 64 64" width={size} height={size} focusable="false">
                <path d="M18 4h12l6 18H24zM46 4H34l-6 18h12z" fill="var(--pop-2)" stroke="var(--border)" strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="32" cy="40" r="20" fill="var(--pop)" stroke="var(--border)" strokeWidth="3" />
                <circle cx="32" cy="40" r="14" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
            <span className="hi-medaille-emoji">{emoji}</span>
        </span>
    )
}

// Briefumschlag mit Herzsiegel, für Ideen an Jean und fürs Weitersagen.
export function BriefHerz({ size = 56, className = '' }) {
    return (
        <svg className={`hi hi-brief ${className}`} viewBox="0 0 64 48" width={size} height={(size * 48) / 64} aria-hidden="true" focusable="false">
            <rect x="4" y="6" width="56" height="38" rx="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="3" />
            <path d="M6 9l26 20L58 9" fill="none" stroke="var(--border)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M32 38c-6-4-9-7-9-11a4.5 4.5 0 0 1 9-1.5 4.5 4.5 0 0 1 9 1.5c0 4-3 7-9 11z" fill="var(--accent)" stroke="var(--border)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    )
}

// Kleiner Roboter, der winkt. Für leere Zustände und die 404-Seite.
export function WinkeRoboter({ size = 96, className = '' }) {
    return (
        <svg className={`hi hi-roboter ${className}`} viewBox="0 0 96 96" width={size} height={size} aria-hidden="true" focusable="false">
            <line x1="48" y1="8" x2="48" y2="18" stroke="var(--border)" strokeWidth="3" />
            <circle cx="48" cy="7" r="4" fill="var(--accent)" stroke="var(--border)" strokeWidth="2" />
            <rect x="24" y="18" width="48" height="34" rx="10" fill="var(--pop-2)" stroke="var(--border)" strokeWidth="3" />
            <circle cx="38" cy="34" r="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
            <circle cx="58" cy="34" r="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
            <circle cx="39" cy="35" r="2" fill="var(--border)" />
            <circle cx="59" cy="35" r="2" fill="var(--border)" />
            <path d="M40 44q8 6 16 0" fill="none" stroke="var(--border)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="30" cy="42" r="3" fill="var(--accent)" opacity=".5" />
            <circle cx="66" cy="42" r="3" fill="var(--accent)" opacity=".5" />
            <rect x="30" y="56" width="36" height="28" rx="8" fill="var(--pop)" stroke="var(--border)" strokeWidth="3" />
            <path d="M44 66c-3-2-4-3.5-4-5.5a2.3 2.3 0 0 1 4-.8 2.3 2.3 0 0 1 4 .8c0 2-1 3.5-4 5.5z" transform="translate(4 4)" fill="var(--accent)" stroke="var(--border)" strokeWidth="1.5" />
            <path d="M30 64q-12 4-12 16" fill="none" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
            <g className="hi-roboter-arm">
                <path d="M66 64q12-4 14-18" fill="none" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="80" cy="44" r="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="2.5" />
            </g>
        </svg>
    )
}
