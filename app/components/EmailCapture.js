import { NEWSLETTER_EMBED, NEWSLETTER_NAME, NEWSLETTER_URL, SUBSCRIBE_URL } from '../../lib/monetization'

// Mail-Erfassung ohne eigenen Server: eingebettetes Formular des Newsletter-Anbieters (Double-Opt-in inklusive).
// Ohne Embed ein Button zur Anmeldeseite, ohne Newsletter der YouTube-Kanal.
export default function EmailCapture({ cta }) {
    if (NEWSLETTER_EMBED)
        return (
            <iframe
                className="email-embed"
                src={NEWSLETTER_EMBED}
                title={`${NEWSLETTER_NAME} abonnieren`}
                loading="lazy"
                width="480"
                height="150"
                frameBorder="0"
                scrolling="no"
            />
        )
    return (
        <a className="button" href={SUBSCRIBE_URL} target="_blank" rel="noopener">
            {cta || (NEWSLETTER_URL ? `${NEWSLETTER_NAME} kostenlos abonnieren →` : 'Auf YouTube abonnieren →')}
        </a>
    )
}
