import Link from 'next/link'
import JeanIcon from './JeanIcon'
import EmailCapture from './EmailCapture'
import { getLeadmagnet } from '../../lib/leadmagnets'
import { BREVO_FORM_URL, HAS_NEWSLETTER, NEWSLETTER_NAME } from '../../lib/monetization'
import { withBase } from '../../lib/site'

// Content-Upgrade: ein Download passend zur Seite. Gesperrte Downloads gibt es per Willkommensmail,
// solange kein Newsletter läuft, direkt. Freie Downloads bleiben frei; mit Brevo steht darunter zusätzlich die Anmeldung.
// anlass: ein Satz, der den Download mit genau dieser Seite verbindet (statt desselben Textes auf hunderten Seiten).
// frei: Download immer direkt zeigen (auf /downloads, wohin Brevo nach der Bestätigung weiterleitet).
export default function LeadMagnetBox({ id, anlass, frei = false }) {
    const m = getLeadmagnet(id)
    if (!m) return null
    const locked = m.gated && HAS_NEWSLETTER && !frei
    const isPage = !/\.\w+$/.test(m.href)
    return (
        <aside className="magnet-box" aria-label={`Download: ${m.title}`}>
            <div className="magnet-icon">
                <JeanIcon badge={m.icon} cool size={64} />
                <span className="magnet-tag">Gratis</span>
            </div>
            <div>
                {anlass && <p className="magnet-anlass">{anlass}</p>}
                <p className="magnet-title">{m.title}</p>
                <p>{m.teaser}</p>
                <p className="magnet-format">{m.format}</p>
                {locked ? (
                    <>
                        <p>
                            {BREVO_FORM_URL
                                ? 'Trag dich ein und bestätige den Link in der Mail. Danach landest du direkt bei den Downloads.'
                                : `Trag dich bei ${NEWSLETTER_NAME} ein, der Download kommt mit der Willkommensmail.`}
                        </p>
                        <EmailCapture quelle={`magnet-${m.id}`} knopf="Download per Mail holen" />
                    </>
                ) : isPage ? (
                    <>
                        <Link className="button" href={m.href}>
                            Jetzt öffnen →
                        </Link>
                        {BREVO_FORM_URL && !frei && (
                            <>
                                <p className="magnet-format">Neue Spickzettel und die besten Prompts der Woche per Mail:</p>
                                <EmailCapture quelle={`magnet-${m.id}`} />
                            </>
                        )}
                    </>
                ) : (
                    <a className="button" href={withBase(m.href)} download>
                        Herunterladen ↓
                    </a>
                )}
            </div>
        </aside>
    )
}
