// KI-Tool-Datenbank: Fakten-Atome aus den drei größten frei lizenzierten KI-Tool-Listen auf GitHub
// (db/kb-tools.json, erzeugt mit utils/kb/import.js). Eigene Bewertungen kommen aus db/tools.json.
import kb from '../db/kb-tools.json'
import sources from '../db/kb-sources.json'
import de from '../db/kb-de.json'
import { getTools } from './tools'
import { HOST_AFFILIATES, TOOL_AFFILIATES } from './partners'
import { kuerzen } from './text'

export const KB_STAND = kb.stand
export const KB_SOURCES = sources

// Rubriken mit eigener Einordnung. prompts/tutorials verweisen auf passende Inhalte der Seite.
export const KB_RUBRIKEN = {
    chatbots: {
        name: 'KI-Chatbots',
        icon: 'prompt',
        intro: 'Die Allrounder: ChatGPT, Claude, Gemini und Co. beantworten Fragen, schreiben, rechnen und programmieren. Der Unterschied liegt in Kontextlänge, Datenschutz, Websuche und Preis.',
        prompts: ['prompt-verbessern', 'meeting-zusammenfassung'],
        tutorial: 'prompt-engineering-in-15-minuten',
    },
    suche: {
        name: 'KI-Suchmaschinen',
        icon: 'lupe',
        intro: 'Antworten mit Quellen statt zehn blauen Links. KI-Suchmaschinen fassen das Web zusammen und zeigen, woher die Aussage stammt. Für Recherche oft besser als ein reiner Chatbot.',
        prompts: ['keyword-cluster'],
    },
    schreiben: {
        name: 'KI-Schreibtools',
        icon: 'post',
        intro: 'Texte entwerfen, umschreiben, übersetzen, kürzen. Spezialisierte Schreibtools bieten Vorlagen, Markenstimme und Plagiatsprüfung; für vieles reicht aber ein guter Prompt im Chatbot.',
        prompts: ['blogartikel-gliederung', 'text-entkitschen', 'newsletter-ausgabe'],
        tutorial: 'prompt-kette-vom-thema-zum-artikel',
    },
    produktivitaet: {
        name: 'KI für Produktivität',
        icon: 'werkzeug',
        intro: 'Meetings mitschreiben, E-Mails sortieren, Notizen ordnen, Browser-Erweiterungen: KI, die im Arbeitsalltag Minuten spart, die sich zu Stunden summieren.',
        prompts: ['meeting-zusammenfassung', 'automatisierung-planen'],
    },
    recherche: {
        name: 'KI für Recherche & Wissenschaft',
        icon: 'lupe',
        intro: 'Paper finden, PDFs befragen, Texte aus Bildern lesen. Für Studium, Forschung und gründliche Recherche mit Quellenangaben.',
    },
    coding: {
        name: 'KI fürs Programmieren',
        icon: 'werkzeug',
        intro: 'Code vervollständigen, Fehler finden, ganze Apps aus Beschreibungen bauen. Von Copilot im Editor bis zu Coding-Agenten, die selbstständig Pull Requests schreiben.',
    },
    agenten: {
        name: 'KI-Agenten',
        icon: 'rakete',
        intro: 'Agenten planen Aufgaben selbst, nutzen Werkzeuge und arbeiten mehrere Schritte ab: recherchieren, klicken, schreiben, prüfen. Viele sind Open Source und selbst hostbar.',
        prompts: ['automatisierung-planen'],
        tutorial: 'ki-agenten-verstehen',
    },
    bild: {
        name: 'KI-Bildgeneratoren & Design',
        icon: 'herz',
        intro: 'Bilder aus Text, Logos, Produktfotos, Präsentationen. Midjourney, Flux, Stable Diffusion und Design-Tools mit KI-Funktionen im Überblick.',
        tutorial: 'bild-prompts-schreiben',
    },
    video: {
        name: 'KI-Videotools',
        icon: 'play',
        intro: 'Videos aus Text, Avatare, automatische Untertitel und Schnitt. Für Erklärvideos, Social Clips und Produktdemos ohne Kamera.',
        prompts: ['youtube-skript', 'video-zu-blogartikel'],
    },
    audio: {
        name: 'KI-Stimmen & Sprache',
        icon: 'play',
        intro: 'Text zu Sprache, Sprache zu Text, Stimmen klonen, Podcasts übersetzen. Von ElevenLabs bis zu Whisper als Open-Source-Transkription.',
    },
    musik: {
        name: 'KI-Musik',
        icon: 'herz',
        intro: 'Songs, Jingles und Soundeffekte aus einer Beschreibung. Achte bei kommerzieller Nutzung genau auf die Lizenzbedingungen der Anbieter.',
    },
    marketing: {
        name: 'KI fürs Marketing',
        icon: 'deal',
        intro: 'Werbetexte, Social Posts, Anzeigen und Kampagnen. Marketing-Tools bündeln Vorlagen und Markenstimme; die Prompts dieser Seite funktionieren in jedem Chatbot.',
        prompts: ['product-hunt-launch', 'meta-title-description'],
        tutorial: 'newsletter-mit-ki-in-einer-stunde',
    },
    modelle: {
        name: 'KI-Modelle & Plattformen',
        icon: 'strahlung',
        intro: 'Die Motoren unter der Haube: offene und geschlossene Sprachmodelle, Ranglisten, Plattformen zum lokalen Betrieb und zum Feintuning.',
    },
    sicherheit: {
        name: 'KI-Erkennung & Sicherheit',
        icon: 'strahlung',
        intro: 'KI-Texte erkennen, Modelle absichern, Schwachstellen finden. Wichtig: Kein KI-Detektor ist zuverlässig genug für harte Entscheidungen.',
    },
    finanzen: {
        name: 'KI für Finanzen',
        icon: 'deal',
        intro: 'Analyse, Research und Quant-Werkzeuge. Keine Anlageberatung: Prüfe jedes Ergebnis selbst.',
    },
}

const own = getTools()
const ownByHost = new Map(
    own.map((t) => {
        try {
            const u = new URL(t.url)
            const host = u.hostname.replace(/^www\./, '')
            // github.com führt die Datenbank mit Pfad (github.com/owner/repo), genauso hier
            return [host === 'github.com' ? `github.com/${u.pathname.split('/').slice(1, 3).join('/').toLowerCase()}` : host, t]
        } catch {
            return [t.slug, t]
        }
    })
)

// Gleiche Firma, andere Domain in den Quellen
const DOMAIN_ALIAS = { 'notion.so': 'notion.com', 'app.heygen.com': 'heygen.com', 'chat.deepseek.com': 'deepseek.com', 'kling.ai': 'klingai.com', 'v0.dev': 'v0.app' }

const isFree = (p) => (p ? /free/i.test(p) && !/paid/i.test(p) : null)

// Fremde Referral- und Tracking-Parameter aus den Quelllisten (z. B. ?ref=mahseema-awesome-ai-tools) entfernen.
// Eigene Partnerlinks kommen ausschließlich aus db/affiliate-links.json (affiliate), nie aus der URL der Quelle.
const TRACKING = /^(ref|via|fpr|aff|aff_id|affiliate|afmc|referral|ref_id|refer|fp_ref|a_aid|irclickid|sscid|ps_partner_key|utm_[a-z]+)$/i
export const ohneTracking = (url) => {
    try {
        const u = new URL(url)
        const weg = [...u.searchParams.keys()].filter((k) => TRACKING.test(k))
        if (!weg.length) return url
        for (const k of weg) u.searchParams.delete(k)
        return u.toString()
    } catch {
        return url
    }
}

// Ein Eintrag mit Signalen: Konsens (in wie vielen Listen), Open Source, gratis, von Jean geprüft.
const enrich = (t) => {
    const profil = ownByHost.get(t.domain) || ownByHost.get(DOMAIN_ALIAS[t.domain]) || null
    const d = de[t.slug]
    return {
        ...t,
        url: ohneTracking(t.url),
        rubrik: d?.rubrik || t.rubrik,
        beschreibung: d?.de || t.beschreibung.replace(/\s*#opensource\.?/gi, '').trim(),
        deutsch: Boolean(d?.de),
        konsens: t.quellen.length,
        gratis: isFree(t.preis),
        profil: profil ? { slug: profil.slug, name: profil.name, affiliate: Boolean(profil.affiliate), gratis: profil.free_plan === true } : null,
        // Partnerlink des Anbieters, falls vorhanden: erst über den Steckbrief, sonst über die Domain.
        affiliate: (profil && TOOL_AFFILIATES[profil.slug]) || HOST_AFFILIATES[t.domain] || null,
    }
}

const TOOLS = kb.tools.filter((t) => KB_RUBRIKEN[t.rubrik]).map(enrich)

export const getKbTools = () => TOOLS
export const getKbTool = (slug) => TOOLS.find((t) => t.slug === slug) || null

// Gleicher Name aus mehreren Quellen: Die Seite mit dem stärksten Konsens ist kanonisch. Bei Gleichstand gewinnt
// der sauberste Slug (der kürzeste, also ohne angehängte Domain wie „deepseek-deepseek-com“).
const byName = new Map()
for (const t of TOOLS) {
    const key = t.name.toLowerCase()
    const best = byName.get(key)
    if (!best || t.konsens > best.konsens || (t.konsens === best.konsens && t.slug.length < best.slug.length)) byName.set(key, t)
}
export const kbPrimary = (t) => byName.get(t.name.toLowerCase()) || t

// Eigene Seite in den Index nur mit Substanz: Konsens aus 2+ Listen. Hat das Tool einen Steckbrief (/tools/…),
// rankt der Steckbrief mit Preisen und FAQ; die Datenbank-Seite bleibt dann noindex, follow (keine Kannibalisierung).
export const kbIndexierbar = (t) => kbPrimary(t).slug === t.slug && t.konsens > 1 && !t.profil

// Wohin ein Tool intern verlinkt: auf den Steckbrief, wenn es einen gibt, sonst auf die Datenbank-Seite.
export const kbPfad = (t) => (t.profil ? `/tools/${t.profil.slug}` : `/ki-tools/tool/${t.slug}`)

export const kbAlternativen = (t, n = 8) => {
    const name = t.name.toLowerCase()
    // Indexierbare Seiten und Steckbriefe zuerst, damit interne Links nicht auf dünne noindex-Seiten zielen.
    const ziel = (x) => (kbIndexierbar(x) || x.profil ? 1 : 0)
    return TOOLS.filter((x) => x.slug !== t.slug && x.rubrik === t.rubrik && x.name.toLowerCase() !== name && kbPrimary(x).slug === x.slug)
        .sort((a, b) => ziel(b) - ziel(a) || b.konsens - a.konsens || Number(Boolean(b.profil)) - Number(Boolean(a.profil)) || a.name.localeCompare(b.name, 'de'))
        .slice(0, n)
}

const PREIS_DE = {
    free: 'kostenlos',
    'free/paid': 'kostenlos und kostenpflichtig',
    freemium: 'kostenlos und kostenpflichtig',
    paid: 'kostenpflichtig',
    'paid/free trial': 'kostenpflichtig, mit Testphase',
    'free trial/paid': 'kostenpflichtig, mit Testphase',
}
export const kbPreis = (p) => (p ? PREIS_DE[p.toLowerCase()] || `laut Quelle: ${p}` : null)
export const getKbRubrik = (key) => (KB_RUBRIKEN[key] ? { key, ...KB_RUBRIKEN[key], tools: TOOLS.filter((t) => t.rubrik === key) } : null)
export const getKbRubriken = () => Object.keys(KB_RUBRIKEN).map(getKbRubrik).filter((r) => r.tools.length)
export const kbStats = () => ({
    gesamt: TOOLS.length,
    konsens: TOOLS.filter((t) => t.konsens > 1).length,
    alle: TOOLS.filter((t) => t.konsens === 3).length,
    openSource: TOOLS.filter((t) => t.open_source).length,
    profile: own.length,
})

export { kbSortKonsens } from './kb-client'

// Schlanke Fassung für die Client-Suche (KbExplorer, Tool-Finder): nur, was die Liste anzeigt.
// Leere Merkmale fallen weg, damit die Liste klein bleibt. a = Partnerlink aus db/affiliate-links.json (über enrich),
// f = Gratis-Tarif laut Steckbrief, e = Beschreibung noch englisch.
export const kbForClient = (tools) =>
    tools.map((t) => {
        const x = { s: t.slug, n: t.name, u: t.url, r: t.rubrik, d: kuerzen(t.beschreibung, 160), k: t.konsens }
        if (t.affiliate) x.a = t.affiliate
        if (t.open_source) x.o = 1
        if (t.gratis) x.g = 1
        if (t.profil?.gratis) x.f = 1
        if (t.profil) x.p = t.profil.slug
        if (!t.deutsch) x.e = 1
        return x
    })
