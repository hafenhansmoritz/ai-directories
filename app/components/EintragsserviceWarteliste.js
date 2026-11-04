import { WAITLIST_FORM_URL } from '../../lib/monetization'
import BrevoForm from './BrevoForm'

// Vorab-Anmeldung für den geplanten Eintragsservice (eigene Brevo-Liste mit Double-Opt-in). Kein Preis, kein Angebot.
// Steht bewusst nur auf der Startseite und auf /launch-kit; andere Seiten verlinken auf /#warteliste-eintragsservice.
export default function EintragsserviceWarteliste() {
    if (!WAITLIST_FORM_URL) return null
    return (
        <aside className="leadbox" id="warteliste-eintragsservice" aria-labelledby="warteliste-eintragsservice-titel">
            <p className="leadbox-title" id="warteliste-eintragsservice-titel">
                Demnächst: Jean trägt dein KI-Tool in die passenden Verzeichnisse ein 🚀
            </p>
            <p>Du sparst dir Dutzende Formulare und behältst trotzdem den Überblick, wo dein Tool steht. Du bekommst eine Mail, sobald es losgeht.</p>
            <BrevoForm formUrl={WAITLIST_FORM_URL} quelle="warteliste-eintragsservice" knopf="Auf die Warteliste" />
        </aside>
    )
}
