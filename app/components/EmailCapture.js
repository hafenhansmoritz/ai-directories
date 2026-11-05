import { BREVO_FORM_URL, NEWSLETTER_EMBED, NEWSLETTER_NAME, NEWSLETTER_URL, SUBSCRIBE_URL } from '../../lib/monetization'
import BrevoForm from './BrevoForm'

// Mail-Erfassung ohne eigenen Server. Mit Brevo (NEXT_PUBLIC_BREVO_FORM_URL) ein eigenes Formular, das direkt an Brevo
// sendet (Double-Opt-in macht Brevo). Sonst das eingebettete Formular des Newsletter-Anbieters,
// ohne Embed ein Button zur Anmeldeseite, ohne Newsletter der YouTube-Kanal.
// quelle: kurzer Name des Bausteins (z. B. 'leadbox', 'magnet-top-50'), geht nur mit BREVO_SOURCE_FIELD an Brevo.
export default function EmailCapture({ cta, quelle, knopf }) {
    if (BREVO_FORM_URL) return <BrevoForm quelle={quelle} knopf={knopf} />
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
