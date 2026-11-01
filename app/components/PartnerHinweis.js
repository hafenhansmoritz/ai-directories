import Link from 'next/link'
import '../styles/d-tools.css'

// Erklärt das Sternchen an Partnerlinks, aber nur dort, wo wirklich ein Partnerlink sichtbar ist.
// zeigen: true, sobald auf der Seite (bzw. im Baustein) mindestens ein Link mit affiliate steht.
export default function PartnerHinweis({ zeigen, className = '' }) {
    if (!zeigen) return null
    return (
        <p className={`partner-hinweis ${className}`.trim()}>
            <sup>*</sup> Partnerlink: Kaufst du darüber etwas, bekommen wir eine Provision. Für dich ändert sich am Preis nichts.{' '}
            <Link href="/transparenz">Mehr unter Transparenz</Link>
        </p>
    )
}

// Hilfsfunktion für Listen: steckt in irgendeinem Eintrag ein Partnerlink? (Server: affiliate, Client-Liste: a)
export const hatPartnerlink = (liste) => (liste || []).some((t) => t && (t.affiliate || t.a))
