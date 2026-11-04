// Alles, was Leads oder Umsatz bringt, an einer Stelle. Leere Werte blenden den zugehörigen Baustein aus
// oder fallen auf den YouTube-Kanal zurück, damit keine Seite einen toten Link zeigt.

export const YOUTUBE_URL = 'https://www.youtube.com/@AIGeddon'
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_URL}?sub_confirmation=1`

// Adresse des Newsletters PromptGott auf Substack. Überschreibbar über NEXT_PUBLIC_NEWSLETTER_URL
// (Repository-Variable NEWSLETTER_URL im Pages-Workflow), auch mit einer Brevo-Formular-URL (https://….sibforms.com/serve/…).
// Wird der Fallback hier geleert und ist keine Variable gesetzt, zeigen alle Lead-Bausteine das YouTube-Abo.
export const NEWSLETTER_URL = (process.env.NEXT_PUBLIC_NEWSLETTER_URL || 'https://promptgott.substack.com').trim()
export const NEWSLETTER_SUBSTACK = /substack\.com/i.test(NEWSLETTER_URL)
// Brevo-Formulare sind fertige Anmeldeseiten mit Double-Opt-in: Sie werden direkt verlinkt, ohne /subscribe und ohne Einbettung.
export const NEWSLETTER_BREVO = /sibforms\.com|brevo\.com/i.test(NEWSLETTER_URL)
export const NEWSLETTER_NAME = 'PromptGott'
// Download-Sperre: Nur mit NEXT_PUBLIC_NEWSLETTER_GATE=1 gibt es gesperrte Downloads (gated in lib/leadmagnets) erst
// per Willkommensmail. Erst setzen, wenn die Willkommensmail die Download-Links nachweislich enthält. Sonst bleiben alle frei.
export const NEWSLETTER_GATE = Boolean(NEWSLETTER_URL) && process.env.NEXT_PUBLIC_NEWSLETTER_GATE === '1'

// Eingebettetes Anmeldeformular (iframe des Anbieters) nur, wenn NEXT_PUBLIC_NEWSLETTER_EMBED ausdrücklich gesetzt ist.
// Standard ist ein reiner Link zur Anmeldeseite: So lädt mentat.codes vor dem Klick nichts vom Anbieter,
// wie in der Datenschutzerklärung beschrieben. Wer einbettet, muss /datenschutz anpassen.
export const NEWSLETTER_EMBED = process.env.NEXT_PUBLIC_NEWSLETTER_EMBED || ''
export const SUBSCRIBE_URL = !NEWSLETTER_URL
    ? YOUTUBE_SUBSCRIBE_URL
    : NEWSLETTER_BREVO
      ? NEWSLETTER_URL
      : `${NEWSLETTER_URL.replace(/\/$/, '')}/subscribe`

// Empfänger aller Formular-Anfragen (Lead-Formular auf jeder Seite). Versand ohne eigenen Server über FormSubmit:
// Die allererste Anfrage löst eine Aktivierungsmail an diese Adresse aus, erst nach dem Klick darauf kommen Anfragen an.
// Danach kann hier statt der Adresse der zufällige Alias aus der Aktivierungsmail stehen, damit die Adresse nicht im Quelltext liegt.
export const LEAD_EMAIL = process.env.NEXT_PUBLIC_LEAD_EMAIL || 'jeanmauriceport@gmail.com'
export const LEAD_ENDPOINT = `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_LEAD_ALIAS || LEAD_EMAIL}`

// Postfach für Werbe-, Featured- und Service-Anfragen (mailto-Links). Ohne Variable das öffentliche Postfach der Seite.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@mentat.codes'

// Partnerlinks und eigene Rabattcodes stehen nur in db/affiliate-links.json (gelesen von lib/partners.js).
// Ein eigener Code ersetzt den bisherigen. Steht ONLY_OWN_DEALS auf true, verschwinden alle fremden Codes;
// es werden dann nur noch Verzeichnisse mit eigenem Code als Deal gezeigt.
export const ONLY_OWN_DEALS = true

// Eine Stelle für die Kennzeichnung aller Anbieter-Links: Partnerlinks sind bezahlte Links (rel="sponsored"),
// alle übrigen Links zu Anbietern und Verzeichnissen bekommen nofollow. Browser-tauglich, ohne das Register.
export const partnerRel = (affiliate) => (affiliate ? 'sponsored noopener noreferrer' : 'nofollow noopener noreferrer')
export const submitRel = (d) => partnerRel(d.affiliate)

export const mailto = (subject) => (CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` : null)

// Werkzeuge, die Gründer für den Launch brauchen. Der Partnerlink kommt aus db/affiliate-links.json (gleicher slug wie im
// Tool-Verzeichnis); ohne Eintrag zeigt die Karte die normale Website ohne Werbekennzeichnung.
export const TOOL_PARTNERS = [
    { slug: 'semrush', name: 'Semrush', use: 'Keywords, Wettbewerb und Backlinks prüfen, bevor du launchst', url: 'https://www.semrush.com/' },
    { slug: 'systeme-io', name: 'Systeme.io', use: 'Landingpage, Funnel, E-Mail und Kurs in einem, mit Gratis-Tarif', url: 'https://systeme.io/' },
    { slug: 'tiiny-host', name: 'Tiiny Host', use: 'Landingpage, Prototyp oder PDF per Upload in Sekunden online, mit Gratis-Tarif', url: 'https://tiiny.host/' },
    { slug: 'gohighlevel', name: 'GoHighLevel', use: 'CRM, Funnels und Automationen für Agenturen mit mehreren Kunden, 14 Tage testen', url: 'https://www.gohighlevel.com/' },
    { slug: 'beehiiv', name: 'beehiiv', use: 'Newsletter für deine ersten Nutzer, mit Empfehlungsprogramm', url: 'https://www.beehiiv.com/' },
    { slug: 'kit', name: 'Kit', use: 'E-Mail-Marketing für Creator und kleine SaaS-Teams', url: 'https://kit.com/' },
    { slug: 'framer', name: 'Framer', use: 'Schöne Launch-Seite ohne Entwickler', url: 'https://www.framer.com/' },
    { slug: 'webflow', name: 'Webflow', use: 'Website mit CMS für Blog, Changelog und Docs', url: 'https://webflow.com/' },
    { slug: 'make', name: 'Make', use: 'Einreichungen, Leads und Follow-ups automatisieren', url: 'https://www.make.com/' },
    { slug: 'n8n', name: 'n8n', use: 'Automatisierung mit KI-Agenten, selbst hostbar', url: 'https://n8n.io/' },
    { slug: 'elevenlabs', name: 'ElevenLabs', use: 'Voiceover für Demo-Videos und Product-Hunt-Clips', url: 'https://elevenlabs.io/' },
    { slug: 'surfer-seo', name: 'Surfer SEO', use: 'Launch-Artikel und Landingpages auf Rankings trimmen', url: 'https://surferseo.com/' },
]
