import { NEWS } from '../../lib/news'
import { getDirectories, getSiteStats, LISTS } from '../../lib/data'
import { SITE_NAME, absoluteUrl } from '../../lib/site'
import { getScore } from '../../lib/score'
import { DACH, DACH_STAND } from '../../lib/dach'
import { ARTIKEL } from '../../lib/ratgeber'
import { getCheck, checkCount, CHECK_STAND } from '../../lib/checks'
import { getTools, TOOLS_STAND } from '../../lib/tools'
import { getPrompts } from '../../lib/prompts'
import { getSkills, ALLE_BEFEHL } from '../../lib/skills'
import { getGuides } from '../../lib/guides'
import { getTutorials } from '../../lib/tutorials'
import { getKbRubriken, kbStats, KB_SOURCES } from '../../lib/kb'
import { TESTS, getTestKategorien } from '../../lib/kitests'
import { RECHNER } from '../../lib/rechner'
import { getComparisons } from '../../lib/comparisons'
import { MODELLE, FAMILIEN } from '../../lib/modelle'
import { KI_GLOSSAR, glossarSlug } from '../../lib/ki-glossar'
import { getAlternativenHubs } from '../../lib/alternativen'
import { ZIELGRUPPEN } from '../../lib/zielgruppen'
import { experienceLabel, pricingLabel, dealLabel, formatRating, formatVisits } from '../../utils/i18n-de'

export const dynamic = 'force-static'

// llms.txt (https://llmstxt.org): kompakte Markdown-Fassung für KI-Assistenten und Answer Engines.
export function GET() {
    const stats = getSiteStats()
    // Angaben der Verzeichnisse selbst (Freischaltung, Link-Typ, Status), nur wo belegt.
    const checkNote = (d) => {
        const c = getCheck(d.slug)
        if (!c) return ''
        if (c.status) return ` ACHTUNG, derzeit nicht eintragbar: ${c.status}`
        return [c.approval && ` Freischaltung laut Verzeichnis: ${c.approval}.`, c.link_type && ` Link-Typ laut Verzeichnis: ${c.link_type}.`]
            .filter(Boolean)
            .join('')
    }

    const rows = [...getDirectories()]
        .sort((a, b) => b.domain_rating - a.domain_rating)
        .map(
            (d) =>
                `- [${d.name}](${absoluteUrl(`/verzeichnis/${d.slug}`)}): Jean-Score ${getScore(d).total}/100, DR ${formatRating(d.domain_rating)}, ${formatVisits(d.monthly_visits)} Besuche/Monat, ${pricingLabel(d.pricing)}, Einreichung ${getCheck(d.slug)?.status ? 'derzeit zu' : experienceLabel(d.submission_experience).toLowerCase()}${d.dealCode ? `, Rabattcode ${d.dealCode} (${dealLabel(d.dealText)})` : ''}.${getCheck(d.slug)?.status ? '' : ` Eintragen: ${d.submission_link}`}${checkNote(d)}`
        )
        .join('\n')

    const lists = Object.entries(LISTS)
        .map(([slug, l]) => `- [${l.title}](${absoluteUrl(`/liste/${slug}`)})`)
        .join('\n')

    const body = `# ${SITE_NAME}

> Deutschsprachige, gepflegte Liste von ${stats.total} KI-Verzeichnissen (AI Directories), Startup-Plattformen und Launch-Seiten, in die Gründer ihr KI-Tool eintragen können. Pro Eintrag: Jean-Score (0 bis 100, gewichtet aus DR, Traffic, Preis und Einreichung), Domain Rating (Ahrefs, 0 bis 100), geschätzte Besuche pro Monat, Preismodell (kostenlos/kostenpflichtig), Qualität der Einreichung und ggf. Rabattcode.

Kennzahlen: ${stats.free.length} kostenlos, ${stats.paid.length} kostenpflichtig, ${stats.strong.length} mit Domain Rating ab 50${stats.withDeal.length ? `, ${stats.withDeal.length} mit eigenem Rabattcode` : ''}.
Rohdaten als JSON: ${absoluteUrl('/api/directories.json')}

## Listen
${lists}
- [Deutsche KI-Verzeichnisse](${absoluteUrl('/deutsche-ki-verzeichnisse')})
- [Neu entdeckte KI-Verzeichnisse, geprüft im Oktober 2026](${absoluteUrl('/neu-entdeckt')})
- [Neue KI-Modelle 2026: GPT-6, Gemini 4 Argon, Claude 5.5 mit Quellen und Preisen](${absoluteUrl('/neue-ki-modelle')})
- [KI-News: aktuelle Meldungen mit Quellen, Handlungsempfehlung und Fristen-Kalender](${absoluteUrl('/ki-news')}) · RSS: ${absoluteUrl('/ki-news/feed.xml')} · Gesamt-Feed (News, Ratgeber, neue Verzeichnisse): ${absoluteUrl('/feed.xml')}
${NEWS.map((n) => `- [${n.titel}](${absoluteUrl(`/ki-news/${n.slug}`)}): ${n.description}`).join('\n')}

## Werkzeuge und Ratgeber
- [Freischaltdauer und Link-Typ, belegt für ${checkCount()} Verzeichnisse (Stand ${CHECK_STAND})](${absoluteUrl('/freischaltung')})
- [Launch-Kit: Einreichungstexte erzeugen](${absoluteUrl('/launch-kit')})
- [Quiz](${absoluteUrl('/quiz')})
- [Vergleich](${absoluteUrl('/vergleich')})
- [Glossar](${absoluteUrl('/glossar')})
${ARTIKEL.map((a) => `- [${a.title}](${absoluteUrl(`/ratgeber/${a.slug}`)}): ${a.description}`).join('\n')}

## Deutschsprachige KI-Verzeichnisse (Semrush, Stand ${DACH_STAND})
${DACH.map((d) => `- [${d.name}](${d.link}): Authority Score ${d.authority}, organischer Traffic DE ${d.traffic}/Monat. ${d.note} Eintragen: ${d.submission_link}`).join('\n')}

## Rechner

${RECHNER.map((r) => `- [${r.titel}](${absoluteUrl(`/rechner/${r.slug}`)}): ${r.kurz}`).join('\n')}

## Übersichtsseiten

- [Die besten KI-Tools 2026 nach Aufgabe](${absoluteUrl('/beste-ki-tools')})
- [Kostenlose KI-Tools](${absoluteUrl('/ki-tools/kostenlos')})
- [ChatGPT-Alternativen](${absoluteUrl('/ki-tools/chatgpt-alternativen')})
- [Alternativen zu bekannten KI-Tools](${absoluteUrl('/ki-tools/alternativen')})
- [KI-Tools nach Zielgruppe](${absoluteUrl('/ki-tools/fuer')})
- [KI-Verzeichnis: Was es ist und welche sich lohnen](${absoluteUrl('/ki-verzeichnis')})

## Tool-Vergleiche

${getComparisons().map((c) => `- [${c.items.map((t) => t.name).join(' vs. ')}](${absoluteUrl(`/tool-vergleiche/${c.slug}`)})`).join('\n')}

## Neue KI-Modelle

${FAMILIEN.map((f) => `- [${f.titel || f.name}](${absoluteUrl(`/neue-ki-modelle/${f.slug}`)}): ${f.description || ''}`).join('\n')}
${MODELLE.map((m) => `- [${m.name} (${m.anbieter}, ${m.datumText})](${absoluteUrl(`/neue-ki-modelle/${m.slug}`)}): ${m.kurz}`).join('\n')}

## Alternativen zu bekannten KI-Tools

${getAlternativenHubs().map((h) => `- [${h.tool.name}-Alternativen](${absoluteUrl(`/ki-tools/alternativen/${h.slug || h.tool.slug}`)}): ${h.liste.slice(0, 5).map((t) => t.name).join(', ')}`).join('\n')}

## KI-Tools nach Zielgruppe

${ZIELGRUPPEN.map((z) => `- [${z.titel}](${absoluteUrl(`/ki-tools/fuer/${z.slug}`)}): ${z.intro}`).join('\n')}

## KI-Glossar

${KI_GLOSSAR.map(([term, text]) => `- [${term}](${absoluteUrl(`/glossar/${glossarSlug(term)}`)}): ${text}`).join('\n')}

## KI-Test

Interaktiver Selbsttest für KI-Chatbots (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) mit ${TESTS.length} Aufgaben und Lösungen: ${absoluteUrl('/ki-test')}. Kategorien: ${getTestKategorien().map((k) => `[${k.name}](${absoluteUrl(`/ki-test/${k.key}`)})`).join(', ')}. AIGeddon veröffentlicht keine eigenen Testwerte; Nutzer bewerten selbst.

## KI-Tool-Datenbank

${kbStats().gesamt} KI-Tools aus ${KB_SOURCES.map((s) => s.repo).join(', ')}; Konsens = Anzahl der Listen, in denen ein Tool steht. Übersicht: ${absoluteUrl('/ki-tools')}

${getKbRubriken().map((r) => `- [${r.name}](${absoluteUrl(`/ki-tools/${r.key}`)}): ${r.tools.length} Tools. Konsens-Favoriten: ${r.tools.filter((t) => t.konsens > 1).slice(0, 5).map((t) => t.name).join(', ') || 'keine'}.`).join('\n')}

## Tutorials

${getTutorials().map((t) => `- [${t.title}](${absoluteUrl(`/tutorials/${t.slug}`)}): ${t.description}`).join('\n')}

Prompt-Check (Score für eigene Prompts): ${absoluteUrl('/prompt-check')} · Downloads: ${absoluteUrl('/downloads')}

## Prompt-Archiv

103 Rollen-Prompts („act as …“) aus f/prompts.chat (CC0) mit deutschen Titeln und Senden-Buttons: ${absoluteUrl('/prompts/archiv')}

## Prompt-Bibliothek

Vorlagen auf Deutsch zum Ausfüllen, mit Absprung zu ChatGPT, Claude, Perplexity und Grok. Eigener Prompt mit Score: ${absoluteUrl('/prompt-baukasten')}

${getPrompts().map((p) => `- [${p.title}](${absoluteUrl(`/prompts/${p.slug}`)}): ${p.ziel}`).join('\n')}

${getGuides().length ? `## Gratis-Guides (PDF)\n\n${absoluteUrl('/guides')}: ${getGuides().map((g) => g.titel).join(', ')}. Download nach Eintrag der E-Mail.\n\n` : ''}## KI-Skills für alle LLMs

Deutsche Agent Skills (SKILL.md, MIT-Lizenz) als ZIP für ChatGPT, Claude und Gemini oder per Befehl für Coding-Agenten: \`${ALLE_BEFEHL}\`. Übersicht: ${absoluteUrl('/skills')}

${getSkills().map((s) => `- [${s.titel}](${absoluteUrl(`/skills/${s.name}`)}): ${s.nutzen}`).join('\n')}

## KI-Tools (Angaben laut Anbieter, Stand ${TOOLS_STAND})
${getTools().map((t) => `- [${t.name}](${absoluteUrl(`/tools/${t.slug}`)}): ${t.category}. ${t.summary_de} Gratis-Tarif: ${t.free_plan === true ? 'ja' : t.free_plan === false ? 'nein' : 'keine Angabe'}. Bezahlt ab: ${t.price_from || 'keine Angabe'}.`).join('\n')}

## Alle Verzeichnisse, sortiert nach Domain Rating
${rows}
`

    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
