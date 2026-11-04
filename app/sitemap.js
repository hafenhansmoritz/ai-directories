import { getDirectories, LISTS } from '../lib/data'
import { absoluteUrl } from '../lib/site'
import { ARTIKEL } from '../lib/ratgeber'
import { getTools } from '../lib/tools'
import { getComparisons } from '../lib/comparisons'
import { getPrompts, promptsByKategorie } from '../lib/prompts'
import { getToolPromptSeiten } from '../lib/prompt-tools'
import { KATEGORIE_TEXTE } from '../lib/prompt-kategorien'
import { getTutorials } from '../lib/tutorials'
import { getKbRubriken, getKbTools, kbIndexierbar } from '../lib/kb'
import { ALTERNATIVEN } from '../lib/alternativen'
import { ZIELGRUPPEN } from '../lib/zielgruppen'
import { KI_GLOSSAR, glossarSlug } from '../lib/ki-glossar'
import { getTestKategorien } from '../lib/kitests'
import { RECHNER } from '../lib/rechner'
import { MODELLE, FAMILIEN } from '../lib/modelle'
import { NEWS } from '../lib/news'
import { getSkills } from '../lib/skills'
import { getGuides } from '../lib/guides'
import { RUBRIK_RATGEBER } from '../lib/rubrik-ratgeber'
import { dateiStand, seitenStand, spaetestes } from '../lib/stand'
import { KONTO_AKTIV } from '../lib/konto'
import { eintragStand } from '../lib/eintrag-stand'

// lastModified ist das echte Änderungsdatum: Prüfdatum des Inhalts oder letzter Git-Commit der Quelldateien.
// Ein Datum, das sich täglich ändert, obwohl nichts passiert ist, ignoriert Google; ein ehrliches nutzt es.
const STATISCH = {
    '/deutsche-ki-verzeichnisse': ['lib/dach.js'],
    '/launch-kit': [],
    '/ratgeber': ['lib/ratgeber.js'],
    '/glossar': ['lib/ki-glossar.js'],
    '/freischaltung': ['db/checks.json'],
    '/werben': [],
    '/beratung': ['lib/angebote.js'],
    '/website-erstellen-lassen': ['lib/angebote.js'],
    '/transparenz': [],
    '/tools': ['db/tools.json'],
    '/mein-stack': ['app/mein-stack/MeinStack.js', 'lib/stack.js', 'lib/abo-preise.js'],
    '/tool-vergleiche': ['lib/comparisons.js'],
    '/top-50': ['db/directories.json'],
    '/verzeichnis': ['app/verzeichnis/page.js', 'db/directories.json'],
    '/liste': ['app/liste/page.js', 'lib/data.js'],
    '/prompts': ['lib/prompts.js'],
    '/skills': ['lib/skills.js', 'db/skills.json'],
    ...(KONTO_AKTIV ? { '/forum': ['app/forum/page.js'], '/community-regeln': ['app/community-regeln/page.js'] } : {}),
    '/prompt-baukasten': [],
    '/prompt-check': [],
    '/tutorials': ['lib/tutorials.js'],
    '/downloads': [],
    '/downloads/prompt-spickzettel': ['lib/prompts.js'],
    '/ki-tools': ['db/kb-tools.json'],
    '/ki-tools/quellen': ['db/kb-sources.json'],
    '/prompts/archiv': ['db/prompt-archiv.json'],
    '/ki-test': ['lib/kitests.js'],
    '/rechner': ['lib/rechner.js'],
    '/beste-ki-tools': ['db/tools.json'],
    '/ki-tools/kostenlos': ['db/kb-tools.json', 'db/tools.json'],
    '/ki-tools/chatgpt-alternativen': ['db/tools.json', 'db/kb-tools.json'],
    '/ki-tools/alternativen': ['lib/alternativen.js'],
    '/ki-tools/fuer': ['lib/zielgruppen.js'],
    '/ki-verzeichnis': [],
    '/tool-finder': ['db/tools.json'],
    '/neue-ki-modelle': ['lib/modelle.js'],
    '/neu-entdeckt': ['db/neu-entdeckt.json'],
    '/ki-news': ['lib/news.js'],
    '/quiz': [],
    '/vergleich': ['db/directories.json'],
    '/ueber-jean': [],
    '/so-pruefen-wir': [],
}

export default function sitemap() {
    const eintrag = (path, lastModified, changeFrequency, priority) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority })
    return [
        eintrag('/', seitenStand('/', 'db/directories.json', 'lib/news.js'), 'weekly', 1),
        ...Object.entries(STATISCH).map(([path, daten]) => eintrag(path, seitenStand(path, ...daten), 'monthly', ['/quiz', '/vergleich', '/ueber-jean', '/so-pruefen-wir'].includes(path) ? 0.6 : 0.8)),
        ...NEWS.map((n) => eintrag(`/ki-news/${n.slug}`, new Date(n.veroeffentlicht), 'weekly', 0.8)),
        ...[...FAMILIEN, ...MODELLE].map((m) => eintrag(`/neue-ki-modelle/${m.slug}`, dateiStand('lib/modelle.js'), 'weekly', 0.7)),
        ...ARTIKEL.map((a) => eintrag(`/ratgeber/${a.slug}`, spaetestes(a.geprueft, dateiStand('lib/ratgeber.js')), 'monthly', 0.7)),
        ...Object.entries(LISTS)
            .filter(([, l]) => getDirectories().some(l.filter))
            .map(([slug]) => eintrag(`/liste/${slug}`, dateiStand('db/directories.json', 'lib/data.js'), 'weekly', 0.8)),
        ...getComparisons().map((c) => eintrag(`/tool-vergleiche/${c.slug}`, spaetestes(c.geprueft, dateiStand('lib/comparisons.js')), 'monthly', 0.7)),
        ...RECHNER.map((r) => eintrag(`/rechner/${r.slug}`, seitenStand(`/rechner/${r.slug}`, 'lib/preise.js', 'lib/abo-preise.js'), 'monthly', 0.8)),
        ...getTestKategorien().map((k) => eintrag(`/ki-test/${k.key}`, dateiStand('lib/kitests.js'), 'monthly', 0.7)),
        ...getKbRubriken().map((r) => eintrag(`/ki-tools/${r.key}`, spaetestes(RUBRIK_RATGEBER[r.key]?.geprueft, dateiStand('db/kb-tools.json', 'lib/rubrik-ratgeber.js')), 'weekly', 0.8)),
        ...KI_GLOSSAR.map(([term]) => eintrag(`/glossar/${glossarSlug(term)}`, eintragStand(glossarSlug(term), 'db/texte/glossar.json') || dateiStand('lib/ki-glossar.js', 'lib/ki-glossar-details.js', 'db/texte/glossar.json'), 'monthly', 0.5)),
        ...ZIELGRUPPEN.map((z) => eintrag(`/ki-tools/fuer/${z.slug}`, spaetestes(z.geprueft, dateiStand('lib/zielgruppen.js')), 'monthly', 0.7)),
        ...ALTERNATIVEN.map((a) => eintrag(`/ki-tools/alternativen/${a.slug}`, dateiStand('lib/alternativen.js', 'db/kb-tools.json'), 'weekly', 0.7)),
        ...getKbTools()
            .filter(kbIndexierbar)
            .map((t) => eintrag(`/ki-tools/tool/${t.slug}`, eintragStand(t.slug, 'db/kb-tools.json', 'db/texte/kb.json') || dateiStand('db/kb-tools.json', 'db/texte/kb.json'), 'monthly', 0.5)),
        ...getTutorials().map((t) => eintrag(`/tutorials/${t.slug}`, dateiStand('lib/tutorials.js'), 'monthly', 0.8)),
        ...getPrompts().map((p) => eintrag(`/prompts/${p.slug}`, dateiStand('lib/prompts.js', 'db/texte/prompts.json'), 'monthly', 0.7)),
        ...(getGuides().length ? [eintrag('/guides', dateiStand('lib/guides.js'), 'monthly', 0.8)] : []),
        ...getSkills().map((s) => eintrag(`/skills/${s.name}`, dateiStand(`skills/${s.name}/SKILL.md`, 'lib/skills.js'), 'monthly', 0.7)),
        ...promptsByKategorie()
            .filter((k) => k.prompts.length && KATEGORIE_TEXTE[k.key])
            .map((k) => eintrag(`/prompts/kategorie/${k.key}`, dateiStand('lib/prompts.js', 'lib/prompt-kategorien.js'), 'monthly', 0.7)),
        ...getToolPromptSeiten().map((s) => eintrag(`/prompts/tool/${s.slug}`, dateiStand('lib/prompts.js', 'lib/prompt-tools.js'), 'monthly', 0.7)),
        ...getTools().map((t) => eintrag(`/tools/${t.slug}`, eintragStand(t.slug, 'db/tools.json', 'db/texte/tools.json') || dateiStand('db/tools.json', 'db/texte/tools.json'), 'monthly', 0.6)),
        // Je Verzeichnis das Datum der letzten Änderung an genau diesem Eintrag (Daten, Text, Freischaltungs-Check).
        ...getDirectories().map((d) =>
            eintrag(`/verzeichnis/${d.slug}`, eintragStand(d.slug, 'db/directories.json', 'db/texte/verzeichnisse.json', 'db/checks.json') || dateiStand('db/directories.json', 'db/texte/verzeichnisse.json', 'db/checks.json'), 'monthly', 0.5)
        ),
    ]
}
