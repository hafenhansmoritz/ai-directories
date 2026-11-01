import Link from 'next/link'
import { TOOL_PARTNERS, partnerRel } from '../../lib/monetization'
import { TOOL_AFFILIATES } from '../../lib/partners'

// Werkzeug-Empfehlungen; Karten mit Partnerlink werden gekennzeichnet und als rel="sponsored" ausgegeben.
export default function ToolPartners({ title = 'Werkzeuge für deinen Launch 🧰', limit = TOOL_PARTNERS.length }) {
    const tools = TOOL_PARTNERS.slice(0, limit).map((t) => ({ ...t, affiliate: TOOL_AFFILIATES[t.slug] || '' }))
    const anyAffiliate = tools.some((t) => t.affiliate)
    return (
        <section aria-labelledby="werkzeuge">
            <h2 id="werkzeuge">{title}</h2>
            <ul className="link-cards">
                {tools.map((t) => (
                    <li key={t.name}>
                        <a
                            href={t.affiliate || t.url}
                            target="_blank"
                            rel={partnerRel(t.affiliate)}
                        >
                            <strong>{t.name}</strong> ↗{t.affiliate && <sup>*</sup>}
                        </a>
                        <span>{t.use}</span>
                    </li>
                ))}
            </ul>
            {anyAffiliate && (
                <p className="source">
                    * Partnerlink: Kaufst du darüber, erhalten wir eine Provision. Für dich ändert sich am Preis nichts.{' '}
                    <Link href="/transparenz">Mehr dazu</Link>
                </p>
            )}
        </section>
    )
}
