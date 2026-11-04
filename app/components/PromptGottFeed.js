import { PROMPTGOTT_BLOG_URL, PROMPTGOTT_SUBSTACK_URL, getBlogBeitraege, getNewsletterAusgaben } from '../../lib/promptgott'

const datum = (s) => {
    const d = new Date(s)
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Neueste Beiträge aus dem PromptGott-Blog und dem Newsletter, beim Build eingelesen.
// Nur auf thematisch passenden Seiten einsetzen (KI-SEO, Prompts, Agenten, Automatisierung).
export default async function PromptGottFeed({ blog = 4, newsletter = 2 }) {
    const [beitraege, ausgaben] = await Promise.all([getBlogBeitraege(blog), newsletter ? getNewsletterAusgaben(newsletter) : []])
    if (!beitraege.length && !ausgaben.length) return null
    return (
        <section aria-labelledby="promptgott-feed" className="promptgott-feed">
            <h2 id="promptgott-feed">Neu bei PromptGott ☢️</h2>
            <p>
                PromptGott ist der Autoblog zu mentat.codes: Systeme für Programmatic SEO, KI-Suche, Automatisierung und
                Agenten, jeder Beitrag mit Primärquellen. Einmal pro Woche kommt der Digest per Mail.
            </p>
            {beitraege.length > 0 && (
                <ul className="quick-links">
                    {beitraege.map((b) => (
                        <li key={b.url}>
                            <a href={b.url}>{b.title}</a>
                        </li>
                    ))}
                </ul>
            )}
            {ausgaben.length > 0 && (
                <>
                    <p className="footer-hub-title">Aus dem Newsletter</p>
                    <ul className="quick-links">
                        {ausgaben.map((a) => (
                            <li key={a.url}>
                                <a href={a.url} rel="noopener">
                                    {a.title}
                                </a>
                                {a.datum && <small> · {datum(a.datum)}</small>}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <p>
                <a href={PROMPTGOTT_BLOG_URL}>Zum PromptGott-Blog →</a> ·{' '}
                <a href={`${PROMPTGOTT_SUBSTACK_URL}/subscribe?utm_source=mentat&utm_medium=feed`} rel="noopener">
                    Newsletter kostenlos abonnieren →
                </a>
            </p>
        </section>
    )
}
