import Link from 'next/link'
import { glossarTeile } from '../../lib/autolink'

// Fließtext mit Links beim ersten Vorkommen: Fachbegriffe ins Glossar, Tool-Namen auf den Steckbrief (dort steht der
// Anbieter-Link, als Partnerlink mit *, sobald einer aktiv ist). gesehen wird über die Seite geteilt.
export default function GlossarText({ text, gesehen, ausser }) {
    return glossarTeile(text, gesehen, ausser).map((t, i) =>
        typeof t === 'string' ? (
            t
        ) : t.tool ? (
            <Link key={i} href={`/tools/${t.tool}`} className="glossar-link" title="Zum Tool-Steckbrief mit Preisen">
                {t.text}
            </Link>
        ) : (
            <Link key={i} href={`/glossar/${t.slug}`} className="glossar-link" title="Im KI-Glossar erklärt">
                {t.text}
            </Link>
        )
    )
}
