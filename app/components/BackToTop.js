'use client'

import JeanIcon from './JeanIcon'
import useUeberScroll from './useUeberScroll'

// Jean mit Sonnenbrille bringt dich nach oben, sobald du weit genug gescrollt hast.
export default function BackToTop() {
    const show = useUeberScroll(600)
    return (
        <button
            type="button"
            className={`back-to-top${show ? ' is-visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Nach oben"
            tabIndex={show ? 0 : -1}
        >
            <JeanIcon cool badge="rakete" size={52} />
        </button>
    )
}
