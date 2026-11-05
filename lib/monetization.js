// Alles, was Leads oder Umsatz bringt, an einer Stelle. Leere Werte blenden den zugehörigen Baustein aus
// oder fallen auf den YouTube-Kanal zurück, damit keine Seite einen toten Link zeigt.

export const YOUTUBE_URL = 'https://www.youtube.com/@AIGeddon'
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_URL}?sub_confirmation=1`

// Adresse des Newsletters PromptGott auf Substack. Überschreibbar über NEXT_PUBLIC_NEWSLETTER_URL
// (Repository-Variable NEWSLETTER_URL im Pages-Workflow), auch mit einer Brevo-Formular-URL (https://….sibforms.com/serve/…).
// Wird der Fallback hier geleert und ist keine Variable gesetzt, zeigen alle Lead-Bausteine das YouTube-Abo.
// Universelle Einstiegsadresse für alle Seiten: promptgott.mentat.codes/newsletter/ (Anmeldung über dieselbe Brevo-Liste, Archiv aller Ausgaben).
export const NEWSLETTER_URL = (process.env.NEXT_PUBLIC_NEWSLETTER_URL || 'https://promptgott.mentat.codes/newsletter/').trim()
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
    : NEWSLETTER_SUBSTACK
      ? `${NEWSLETTER_URL.replace(/\/$/, '')}/subscribe`
      : NEWSLETTER_URL

// Brevo ist das primäre System (Liste „mentat.codes Newsletter“, Double-Opt-in). Action-URL des Brevo-Formulars
// (Simple HTML), öffentlich wie in jedem Brevo-Embed. EmailCapture, LeadBox und LeadMagnetBox schicken die Adresse
// direkt per POST an Brevo; Brevo verschickt die Bestätigungsmail und leitet danach auf /downloads/ weiter.
// Per NEXT_PUBLIC_BREVO_FORM_URL überschreibbar; ein leerer oder ungültiger Wert = Substack-Link bzw. YouTube wie oben.
const BREVO_DEFAULT =
    'https://3365dee0.sibforms.com/serve/MUIFAIouMcwOi85cEyR6w3FSk0WzDOvcFF3e6VX_kPMgEuqL43zDwgqmHxNl0ZTsYy-mtpu1C8LNQO9iFWlPC811aZEkLiH-4uQJy09wuF_Hi3DamB6FPqMZ1GCL12G4a_831AK3bb9KQpDMwl9I5PCp8XByAU27LEJZEHOdSTsz8fykFBQuQu50cqxCYhuk9P7asVHrRaveTL4FWQ=='
const BREVO_WAHL = process.env.NEXT_PUBLIC_BREVO_FORM_URL ?? BREVO_DEFAULT
// Warteliste für den geplanten Eintragsservice: eigene Brevo-Liste „mentat.codes Eintragsservice Warteliste“ mit Double-Opt-in.
export const WAITLIST_FORM_URL = process.env.NEXT_PUBLIC_WAITLIST_FORM_URL || 'https://3365dee0.sibforms.com/serve/MUIFAMznbs8hyaGlIpjlInKHggNnzt8A8EcoiKGTM460rIwjCKdDtraj0QkfCH9_iYBvtMH2CKKnsIFZxPqDo4IUOljjfjG7FFQBtG2B7Jus1aSEsU99h2S-tzSTLdPylP7eOdGSlDvUhKxSStPTRI966na_H4VV_ON4MMjY2icHQaS8hVz7d7FVWRSNomzRs9XKjZUQm619HtAD9Q=='
export const BREVO_FORM_URL = /^https:\/\/[\w.-]+\.sibforms\.com\/serve\//.test(BREVO_WAHL) ? BREVO_WAHL : ''
// Optional: Name eines Brevo-Kontaktattributs (Typ Text, im Formular als verstecktes Feld angelegt), z. B. 'QUELLE'.
// Nur gesetzt wird die Herkunft (Baustein und Seite) mitgeschickt; Brevo verwirft Felder, die nicht im Formular stehen.
export const BREVO_SOURCE_FIELD = process.env.NEXT_PUBLIC_BREVO_SOURCE_FIELD || ''
// Läuft irgendein Newsletter (Brevo oder Substack)? Dann zeigen die Lead-Bausteine Anmeldung statt YouTube.
export const HAS_NEWSLETTER = Boolean(BREVO_FORM_URL || NEWSLETTER_URL)
// Download-Sperre für gated Downloads (lib/leadmagnets): mit Brevo immer, weil Brevo nach der Bestätigung auf
// /downloads/ leitet und die Downloads dort frei stehen. Ohne Brevo nur mit NEXT_PUBLIC_NEWSLETTER_GATE=1 (siehe oben).
export const DOWNLOAD_GATE = Boolean(BREVO_FORM_URL) || NEWSLETTER_GATE

// Empfänger aller Formular-Anfragen (Lead-Formular auf jeder Seite). Versand ohne eigenen Server über FormSubmit:
// Die allererste Anfrage löst eine Aktivierungsmail an diese Adresse aus, erst nach dem Klick darauf kommen Anfragen an.
// Danach kann hier statt der Adresse der zufällige Alias aus der Aktivierungsmail stehen, damit die Adresse nicht im Quelltext liegt.
export const LEAD_EMAIL = process.env.NEXT_PUBLIC_LEAD_EMAIL || 'jeanmauriceport@gmail.com'
export const LEAD_ENDPOINT = `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_LEAD_ALIAS || LEAD_EMAIL}`

// Öffentliches Postfach der Seite (Kontakt, Datenschutz, Fallback im Formular). Ohne Variable hello@mentat.codes.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@mentat.codes'

// Partnerlinks und eigene Rabattcodes stehen nur in db/affiliate-links.json (gelesen von lib/partners.js).
// Ein eigener Code ersetzt den bisherigen. Steht ONLY_OWN_DEALS auf true, verschwinden alle fremden Codes;
// es werden dann nur noch Verzeichnisse mit eigenem Code als Deal gezeigt.
export const ONLY_OWN_DEALS = true

// Eine Stelle für die Kennzeichnung aller Anbieter-Links: Partnerlinks sind bezahlte Links (rel="sponsored"),
// alle übrigen Links zu Anbietern und Verzeichnissen bekommen nofollow. Browser-tauglich, ohne das Register.
export const partnerRel = (affiliate) => (affiliate ? 'sponsored noopener noreferrer' : 'nofollow noopener noreferrer')
export const submitRel = (d) => partnerRel(d.affiliate)

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
