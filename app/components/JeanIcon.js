// Jean als Icon-Familie: dieselbe gezeichnete Comicfigur (Maskottchen), wahlweise mit Sonnenbrille,
// dazu ein Abzeichen unten rechts, das zeigt, worum es geht. Reines SVG, keine Bilddateien.

const SKIN = '#f4c8ac'
const EAR = '#efbb9c'
const BEARD = '#c4581f'
const BEARD_DARK = '#b54d18'
const INK = '#0f172a'

function Face({ cool }) {
    return (
        <g>
            <ellipse cx="9" cy="31" rx="4.5" ry="6.5" fill={EAR} />
            <ellipse cx="47" cy="31" rx="4.5" ry="6.5" fill={EAR} />
            <ellipse cx="28" cy="28" rx="19" ry="22" fill={SKIN} />
            <ellipse cx="21" cy="12" rx="7" ry="3.2" fill="#fff" opacity=".5" />
            <path d="M10 30c0 15 8 25 18 25s18-10 18-25c-2 6-5 9-8 9H18c-3 0-6-3-8-9z" fill={BEARD} />
            <path d="M20 38c4-3 12-3 16 0-3 1.6-13 1.6-16 0z" fill={BEARD_DARK} />
            <path d="M23.5 44c3 2 6 2 9 0" stroke="#7a2f0c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {cool ? (
                <g>
                    <path d="M13 25h12c1 0 2 1 2 2v2.5c0 3-2.2 5-5 5h-4.2c-2.8 0-4.8-2.2-4.8-5z" fill={INK} />
                    <path d="M31 25h12v4.5c0 2.8-2 5-4.8 5H34c-2.8 0-5-2-5-5V27c0-1 1-2 2-2z" fill={INK} />
                    <path d="M27 27h2" stroke={INK} strokeWidth="2" />
                    <path d="M15.5 27.5l4 0M33.5 27.5l4 0" stroke="#67e8f9" strokeWidth="1.4" opacity=".85" strokeLinecap="round" />
                </g>
            ) : (
                <g>
                    <path d="M15 22c3-2 7-2 10-.5M31 21.5c3-1.5 7-1.5 10 .5" stroke={BEARD} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    <ellipse cx="20.5" cy="28" rx="3.2" ry="2.6" fill="#fff" />
                    <ellipse cx="35.5" cy="28" rx="3.2" ry="2.6" fill="#fff" />
                    <circle cx="21.2" cy="28.4" r="1.8" fill="#4d4c2a" />
                    <circle cx="36.2" cy="28.4" r="1.8" fill="#4d4c2a" />
                </g>
            )}
        </g>
    )
}

const TERMINAL_BADGE = (
    <g>
        <rect x="41" y="42.5" width="16" height="13" rx="2.5" fill={INK} stroke="#fff" strokeWidth="1.4" />
        <path d="M44 46.5l3 2.5-3 2.5M48.5 51.5h4.5" stroke="#6ee7b7" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
)

// Abzeichen: Kreis unten rechts mit Symbol.
const BADGES = {
    lupe: (
        <g stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round">
            <circle cx="49" cy="49" r="4.5" fill="#fff" />
            <path d="M52.3 52.3l4 4" />
        </g>
    ),
    deal: (
        <g>
            <path d="M43 45.5v-4h7.5l7 7-6.5 6.5-7-7z" fill="#fff" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="46.5" cy="45" r="1.3" fill={INK} />
        </g>
    ),
    post: (
        <g>
            <rect x="41" y="44" width="16" height="11" rx="2" fill="#fff" stroke={INK} strokeWidth="1.8" />
            <path d="M41.8 45l7.2 5.4 7.2-5.4" stroke={INK} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        </g>
    ),
    play: (
        <g>
            <rect x="40.5" y="43" width="17" height="12" rx="3.5" fill="#e0262c" stroke={INK} strokeWidth="1.6" />
            <path d="M47.5 46v6l5-3z" fill="#fff" />
        </g>
    ),
    werkzeug: (
        <path
            d="M55.8 44.2a4.6 4.6 0 0 1-6 5.6l-6.2 6.2a1.8 1.8 0 0 1-2.6-2.6l6.2-6.2a4.6 4.6 0 0 1 5.6-6l-2.8 2.8 1.2 2.4 2.4 1.2z"
            fill="#fff"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
    ),
    strahlung: TERMINAL_BADGE,
    terminal: TERMINAL_BADGE,
    pokal: (
        <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
            <path d="M44 42h10v4a5 5 0 0 1-10 0z" fill="#ffe14d" />
            <path d="M44 43.5h-2.5a3 3 0 0 0 3 3.5M54 43.5h2.5a3 3 0 0 1-3 3.5" fill="none" />
            <path d="M49 51v3M45.5 56h7" fill="none" strokeLinecap="round" />
        </g>
    ),
    rakete: (
        <g stroke={INK} strokeWidth="1.5" strokeLinejoin="round">
            <path d="M49 40c4 3 5 8 3.5 12.5h-7C44 48 45 43 49 40z" fill="#fff" />
            <circle cx="49" cy="46" r="1.6" fill="#6ee7b7" />
            <path d="M46 55l-1.5 2.5M52 55l1.5 2.5M49 55v3" stroke="#e0262c" strokeWidth="1.8" strokeLinecap="round" />
        </g>
    ),
    herz: <path d="M49 57s-7.5-4.6-7.5-9.4a3.9 3.9 0 0 1 7.5-1.6 3.9 3.9 0 0 1 7.5 1.6C56.5 52.4 49 57 49 57z" fill="#e0262c" stroke={INK} strokeWidth="1.5" />,
    perle: (
        <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
            <circle cx="49" cy="49" r="5.5" fill="#fff" />
            <path d="M46.8 46.8a3 3 0 0 1 3-1.8" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="51.8" cy="46.2" r="1" fill="#fff" />
        </g>
    ),
    prompt: (
        <g>
            <path d="M40.5 43.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7l-4 3.5v-3.5a3 3 0 0 1-3-3z" fill="#fff" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M44 44.5l2.5 2.3-2.5 2.3M48 49.5h5" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    ),
    tattoo: (
        <g stroke={INK} strokeWidth="1.4" strokeLinejoin="round">
            <path d="M40 57c1-6 4-11 9-13l5-2c2 0 3 2 2 3.5l-3 2.5c3 1 4 4 2 6-3 3-9 3-15 3z" fill={SKIN} />
            <path d="M44 51.5c1.5-1 3-1 4 0M45 54c1.5-.8 3-.8 4 .2" stroke="#3b6aa0" fill="none" strokeLinecap="round" />
            <circle cx="50.5" cy="49" r="1" fill="#3b6aa0" stroke="none" />
        </g>
    ),
}

const LABELS = {
    lupe: 'Jean mit Lupe',
    deal: 'Jean mit Preisschild',
    post: 'Jean mit Brief',
    play: 'Jean mit Play-Button',
    werkzeug: 'Jean mit Schraubenschlüssel',
    strahlung: 'Jean mit Terminal-Prompt',
    terminal: 'Jean mit Terminal-Prompt',
    pokal: 'Jean mit Pokal',
    rakete: 'Jean mit Rakete',
    herz: 'Jean mit Herz',
    perle: 'Jean mit Perle',
    prompt: 'Jean mit Prompt-Sprechblase',
    tattoo: 'Jean zeigt seinen tätowierten Arm',
}

// Alle Formen einmal pro Seite als SVG-Sprite (im Layout eingebunden); jedes Icon verweist nur noch per <use>.
// Spart pro Seite rund 40 eingebettete Zeichnungen.
export function JeanSprite() {
    return (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
            <defs>
                <symbol id="jf-plain" viewBox="0 0 64 64">
                    <Face cool={false} />
                </symbol>
                <symbol id="jf-cool" viewBox="0 0 64 64">
                    <Face cool />
                </symbol>
                {Object.entries(BADGES).map(([key, badge]) => (
                    <symbol key={key} id={`jb-${key}`} viewBox="0 0 64 64">
                        <circle cx="49" cy="49" r="12" fill="#67e8f9" stroke={INK} strokeWidth="2" />
                        {badge}
                    </symbol>
                ))}
            </defs>
        </svg>
    )
}

export default function JeanIcon({ badge, cool = false, size = 40, title, className = '' }) {
    const label = title || (badge ? LABELS[badge] : cool ? 'Jean mit Sonnenbrille' : 'Jean')
    return (
        <svg
            className={`jean-icon ${className}`}
            viewBox="0 0 64 64"
            width={size}
            height={size}
            role={title ? 'img' : undefined}
            aria-hidden={title ? undefined : true}
            aria-label={title ? label : undefined}
            focusable="false"
        >
            <use href={cool ? '#jf-cool' : '#jf-plain'} width="64" height="64" />
            {badge && BADGES[badge] && <use href={`#jb-${badge}`} width="64" height="64" />}
        </svg>
    )
}
