import Link from 'next/link'
import JeanIcon from './JeanIcon'
import EmailCapture from './EmailCapture'
import { getLeadmagnet } from '../../lib/leadmagnets'
import { NEWSLETTER_GATE, NEWSLETTER_NAME, NEWSLETTER_URL, SUBSCRIBE_URL } from '../../lib/monetization'
import { withBase } from '../../lib/site'

// Content-Upgrade: ein Download passend zur Seite. Gesperrte Downloads gibt es nur mit NEXT_PUBLIC_NEWSLETTER_GATE=1
// per Willkommensmail, sonst direkt, mit dem Newsletter-Abo als zusätzlichem Angebot daneben.
export default function LeadMagnetBox({ id }) {
    const m = getLeadmagnet(id)
    if (!m) return null
    const locked = m.gated && NEWSLETTER_GATE
    const isPage = !/\.\w+$/.test(m.href)
    return (
        <aside className="magnet-box" aria-label={`Download: ${m.title}`}>
            <div className="magnet-icon">
                <JeanIcon badge={m.icon} cool size={64} />
                <span className="magnet-tag">Gratis</span>
            </div>
            <div>
                <p className="magnet-title">{m.title}</p>
                <p>{m.teaser}</p>
                <p className="magnet-format">{m.format}</p>
                {locked ? (
                    <>
                        <p>Trag dich bei {NEWSLETTER_NAME} ein, der Download kommt mit der Willkommensmail.</p>
                        <EmailCapture />
                    </>
                ) : (
                    <>
                        <p>
                            {isPage ? (
                                <Link className="button" href={m.href}>
                                    Jetzt öffnen →
                                </Link>
                            ) : (
                                <a className="button" href={withBase(m.href)} download>
                                    Herunterladen ↓
                                </a>
                            )}
                        </p>
                        {NEWSLETTER_URL && (
                            <p>
                                Mehr davon jede Woche:{' '}
                                <a href={SUBSCRIBE_URL} target="_blank" rel="noopener">
                                    {NEWSLETTER_NAME} abonnieren →
                                </a>
                            </p>
                        )}
                    </>
                )}
            </div>
        </aside>
    )
}
