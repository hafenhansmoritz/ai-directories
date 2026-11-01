// Alles, was Leads oder Umsatz bringt, an einer Stelle. Leere Werte blenden den zugehörigen Baustein aus
// oder fallen auf den YouTube-Kanal zurück, damit keine Seite einen toten Link zeigt.

export const YOUTUBE_URL = 'https://www.youtube.com/@AIGeddon'
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_URL}?sub_confirmation=1`

// Adresse des Newsletters PromptGott (Substack oder beehiiv), z. B. 'https://promptgott.substack.com'. Leer = YouTube-Abo als Ersatz.
export const NEWSLETTER_URL = process.env.NEXT_PUBLIC_NEWSLETTER_URL || ''
export const NEWSLETTER_NAME = 'PromptGott'

// Eingebettetes Anmeldeformular: die einfachste Art, Mails ohne eigenen Server einzusammeln.
// Substack liefert es automatisch unter /embed; für beehiiv die Embed-URL aus dem Dashboard
// (Grow → Subscribe Forms) in NEXT_PUBLIC_NEWSLETTER_EMBED eintragen. Double-Opt-in macht der Anbieter.
export const NEWSLETTER_EMBED =
    process.env.NEXT_PUBLIC_NEWSLETTER_EMBED || (/substack\.com/.test(NEWSLETTER_URL) ? `${NEWSLETTER_URL.replace(/\/$/, '')}/embed` : '')
export const SUBSCRIBE_URL = NEWSLETTER_URL ? `${NEWSLETTER_URL.replace(/\/$/, '')}/subscribe` : YOUTUBE_SUBSCRIBE_URL

// Empfänger aller Formular-Anfragen (Lead-Formular auf jeder Seite). Versand ohne eigenen Server über FormSubmit:
// Die allererste Anfrage löst eine Aktivierungsmail an diese Adresse aus, erst nach dem Klick darauf kommen Anfragen an.
// Danach kann hier statt der Adresse der zufällige Alias aus der Aktivierungsmail stehen, damit die Adresse nicht im Quelltext liegt.
export const LEAD_EMAIL = process.env.NEXT_PUBLIC_LEAD_EMAIL || 'jeanmauriceport@gmail.com'
export const LEAD_ENDPOINT = `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_LEAD_ALIAS || LEAD_EMAIL}`

// Postfach für Werbe-, Featured- und Service-Anfragen (mailto-Links). Fällt auf die Lead-Adresse zurück.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || LEAD_EMAIL

// Partnerlinks und eigene Rabattcodes stehen nur in db/partners.json (gelesen von lib/partners.js).
// Ein eigener Code ersetzt den bisherigen. Steht ONLY_OWN_DEALS auf true, verschwinden alle fremden Codes;
// es werden dann nur noch Verzeichnisse mit eigenem Code als Deal gezeigt.
export const ONLY_OWN_DEALS = false

// Eine Stelle für die Kennzeichnung aller Anbieter-Links: Partnerlinks sind bezahlte Links (rel="sponsored"),
// alle übrigen Links zu Anbietern und Verzeichnissen bekommen nofollow. Browser-tauglich, ohne das Register.
export const partnerRel = (affiliate) => (affiliate ? 'sponsored noopener noreferrer' : 'nofollow noopener noreferrer')
export const submitRel = (d) => partnerRel(d.affiliate)

export const mailto = (subject) => (CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` : null)

// Werkzeuge, die Gründer für den Launch brauchen. Der Partnerlink kommt aus db/partners.json (gleicher slug wie im
// Tool-Verzeichnis); ohne Eintrag zeigt die Karte die normale Website ohne Werbekennzeichnung.
export const TOOL_PARTNERS = [
    { slug: 'semrush', name: 'Semrush', use: 'Keywords, Wettbewerb und Backlinks prüfen, bevor du launchst', url: 'https://www.semrush.com/' },
    { slug: 'systeme-io', name: 'Systeme.io', use: 'Landingpage, Funnel, E-Mail und Kurs in einem, mit Gratis-Tarif', url: 'https://systeme.io/' },
    { slug: 'beehiiv', name: 'beehiiv', use: 'Newsletter für deine ersten Nutzer, mit Empfehlungsprogramm', url: 'https://www.beehiiv.com/' },
    { slug: 'kit', name: 'Kit', use: 'E-Mail-Marketing für Creator und kleine SaaS-Teams', url: 'https://kit.com/' },
    { slug: 'framer', name: 'Framer', use: 'Schöne Launch-Seite ohne Entwickler', url: 'https://www.framer.com/' },
    { slug: 'webflow', name: 'Webflow', use: 'Website mit CMS für Blog, Changelog und Docs', url: 'https://webflow.com/' },
    { slug: 'make', name: 'Make', use: 'Einreichungen, Leads und Follow-ups automatisieren', url: 'https://www.make.com/' },
    { slug: 'n8n', name: 'n8n', use: 'Automatisierung mit KI-Agenten, selbst hostbar', url: 'https://n8n.io/' },
    { slug: 'elevenlabs', name: 'ElevenLabs', use: 'Voiceover für Demo-Videos und Product-Hunt-Clips', url: 'https://elevenlabs.io/' },
    { slug: 'surfer-seo', name: 'Surfer SEO', use: 'Launch-Artikel und Landingpages auf Rankings trimmen', url: 'https://surferseo.com/' },
]
