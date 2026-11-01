import Link from 'next/link'
import { kbPfad } from '../../lib/kb'
import { toolHref, toolRel } from '../../lib/tools'
import PartnerHinweis, { hatPartnerlink } from './PartnerHinweis'

// Karten für Tools aus der Datenbank (lib/kb.js) mit Konsens-Abzeichen und Steckbrief-Link.
// Anbieter-Link über die Helfer: Partnerlink aus db/affiliate-links.json mit * und rel="sponsored", sonst nofollow.
export default function ToolCards({ tools }) {
    return (
        <>
            <ul className="kb-list">
                {tools.map((t) => (
                    <li key={t.slug} className={t.konsens === 3 ? 'is-gold' : t.konsens === 2 ? 'is-silver' : ''}>
                        <div className="kb-head">
                            <span className="kb-name">
                                <Link href={kbPfad(t)}>
                                    <strong>{t.name}</strong>
                                </Link>
                                <a className="kb-extern" href={toolHref(t)} target="_blank" rel={toolRel(t)} aria-label={`${t.name} beim Anbieter öffnen${t.affiliate ? ' (Partnerlink)' : ''}`}>
                                    ↗{t.affiliate && <sup>*</sup>}
                                </a>
                            </span>
                            <span className="kb-badges">
                                {t.konsens === 3 && <span title="In allen 3 Listen">🏆 3/3</span>}
                                {t.konsens === 2 && <span title="In 2 von 3 Listen">🥈 2/3</span>}
                                {t.open_source && <span title="Open Source">🔓</span>}
                            </span>
                        </div>
                        {t.beschreibung && <p lang={t.deutsch ? 'de' : 'en'}>{t.beschreibung}</p>}
                        {t.profil && (
                            <Link className="kb-profil" href={`/tools/${t.profil.slug}`}>
                                🧔 Steckbrief mit Preisen →
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
            <PartnerHinweis zeigen={hatPartnerlink(tools)} />
        </>
    )
}
