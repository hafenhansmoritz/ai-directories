import Link from 'next/link'
import DirectoryTable from './components/DirectoryTable'
import JsonLd from './components/JsonLd'
import Faq, { faqSchema } from './components/Faq'
import EintragsserviceWarteliste from './components/EintragsserviceWarteliste'
import SchicksalsWuerfel from './components/SchicksalsWuerfel'
import Jean, { HELLO } from './components/Jean'
import ToolPartners from './components/ToolPartners'
import { Band, Trenner } from './components/Deko'
import { kbStats, getKbTools, kbIndexierbar, kbPfad, kbPrimary } from '../lib/kb'
import { getPrompts, promptsByKategorie } from '../lib/prompts'
import { getComparisons } from '../lib/comparisons'
import { getAlternativenHubs } from '../lib/alternativen'
import { ZIELGRUPPEN } from '../lib/zielgruppen'
import { KI_GLOSSAR } from '../lib/ki-glossar'
import { KATEGORIE_TEXTE } from '../lib/prompt-kategorien'
import { getTutorials } from '../lib/tutorials'
import archiv from '../db/prompt-archiv.json'
import { TESTS } from '../lib/kitests'
import { RECHNER } from '../lib/rechner'

const testCount = TESTS.length
import { effectiveRating } from '../lib/fresh'
import { hasStatusIssue } from '../lib/checks'
import { getDirectories, getSiteStats, tabellenZeilen } from '../lib/data'
import { dateiStand } from '../lib/stand'
import { SITE_NAME, SITE_URL, absoluteUrl, withBase } from '../lib/site'
import getFaq from '../utils/faq-de'
import { formatNumber } from '../utils/i18n-de'
import Vernetzt, { seitenPfad } from './components/Vernetzt'
import MemeChat from './components/MemeChat'

export function generateMetadata() {
    const stats = getSiteStats()
    return {
        title: { absolute: `KI-Verzeichnisse & KI-Tools 2026: ${stats.total} Directories | mentat.codes` },
        description: `Die deutsche Liste der KI-Verzeichnisse: ${stats.total} AI Directories mit Domain Rating, Traffic, Preis und Einreichungs-Check. ${stats.free.length} davon kostenlos. Dazu ${kbStats().gesamt} KI-Tools, KI-Test und Rechner.`,
        alternates: { canonical: '/' },
        openGraph: { url: '/' },
    }
}

function Home() {
    const directories = getDirectories()
    const stats = getSiteStats()
    // Top 10 nach belastbarem DR: fragwürdige Werte zählen mit dem frisch gemessenen Authority Score.
    const topFree = stats.freeAndSmooth
        .filter((d) => !hasStatusIssue(d.slug))
        .sort((a, b) => effectiveRating(b) - effectiveRating(a) || b.monthly_visits - a.monthly_visits)
        .slice(0, 10)
    const faq = [
        ...getFaq({ ...stats, topFreeSmooth: topFree }),
        {
            q: 'Wie finde ich das richtige KI-Tool?',
            a: `Starte mit dem Tool-Finder (drei Fragen) oder such direkt in der KI-Tool-Datenbank mit ${kbStats().gesamt} Tools. Für Preise laut Anbieter gibt es Steckbriefe, für Entscheidungen zwischen zwei Tools die Tool-Vergleiche.`,
        },
        {
            q: 'Welche KI ist die beste: ChatGPT, Claude oder Gemini?',
            a: 'Das hängt von der Aufgabe ab. Im KI-Test auf mentat.codes schickst du dieselben Aufgaben an mehrere KIs, bewertest die Antworten selbst und bekommst eine Rangliste. Ohne gekaufte Testsieger.',
        },
        {
            q: 'Kann ich mein KI-Tool eintragen lassen, statt es selbst zu machen?',
            a: 'Bald. Der Eintragsservice ist in Vorbereitung: Jean trägt dein Tool dann in die passenden Verzeichnisse ein. Trag dich auf der Warteliste unten auf dieser Seite ein, dann bekommst du eine Mail, sobald es losgeht.',
        },
    ]
    const beliebt = getKbTools()
        // Tools mit Steckbrief zählen mit und verlinken direkt auf den Steckbrief.
        .filter((t) => t.konsens === 3 && kbPrimary(t).slug === t.slug && (kbIndexierbar(t) || t.profil))
        .slice(0, 12)
    // Echtes Änderungsdatum der Verzeichnisdaten statt Baudatum (der Build läuft täglich).
    const stand = dateiStand('db/directories.json', 'db/checks.json', 'db/fresh-semrush.json')
    const updated = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(stand)

    const schema = [
        {
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'KI-Verzeichnisse: Liste der AI Directories',
            description: `${stats.total} KI-Verzeichnisse und Startup-Plattformen mit Domain Rating, geschätzten monatlichen Besuchen, Preismodell und Bewertung der Einreichung.`,
            url: SITE_URL,
            inLanguage: 'de-DE',
            dateModified: stand.toISOString().slice(0, 10),
            keywords: ['KI-Verzeichnis', 'AI Directory', 'KI-Tool eintragen', 'Backlinks', 'Startup Launch'],
            variableMeasured: ['Domain Rating', 'Besuche pro Monat', 'Preismodell', 'Einreichung'],
            distribution: {
                '@type': 'DataDownload',
                encodingFormat: 'application/json',
                contentUrl: absoluteUrl('/api/directories.json'),
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Die 50 KI-Verzeichnisse mit dem höchsten Domain Rating',
            numberOfItems: 50,
            itemListElement: [...directories]
                .sort((a, b) => b.domain_rating - a.domain_rating)
                .slice(0, 50)
                .map((d, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: d.name,
                    url: absoluteUrl(`/verzeichnis/${d.slug}`),
                })),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KI-Tool in Verzeichnisse eintragen',
            inLanguage: 'de-DE',
            totalTime: 'PT10M',
            step: [
                ['Einmal sauber vorbereiten', 'Name, Einzeiler, Beschreibung mit 100 bis 300 Wörtern, Logo, 3 bis 5 Screenshots, Kategorie, Preismodell und Kontakt-Mail bereitlegen.'],
                ['Überall gleich benennen', 'Gleicher Name, gleicher Einzeiler, gleiche URL in jedem Verzeichnis.'],
                ['Mit den starken, kostenlosen anfangen', 'Zuerst die kostenlosen Verzeichnisse mit reibungsloser Einreichung und hohem Domain Rating eintragen.'],
                ['UTM-Parameter setzen', 'Links mit utm_source und utm_medium versehen, um Klicks pro Verzeichnis zu messen.'],
                ['Buch führen', 'Datum, Verzeichnis, Status und Link zur Listing-Seite notieren und nach 4 Wochen prüfen.'],
                ['Erst dann Geld ausgeben', 'Bezahlte Einträge nur bei passendem Traffic, nach dofollow fragen und Rabattcodes nutzen.'],
            ].map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
        },
        faqSchema(faq),
    ]

    return (
        <>
            <JsonLd data={schema} />

            <section className="hero">
                <p className="eyebrow">
                    Daten zuletzt aktualisiert: <time dateTime={stand.toISOString().slice(0, 10)}>{updated}</time>
                </p>
                <h1>
                    KI-Verzeichnisse: {stats.total} AI Directories, in die du dein KI-Tool eintragen kannst (statt es nur deiner
                    Mutter zu zeigen)
                </h1>
                <p className="lead">
                    <strong>Kurz gesagt:</strong> Hier findest du {stats.total} KI-Verzeichnisse, Startup-Plattformen und
                    Launch-Seiten mit Domain Rating, Traffic, Preis und einer ehrlichen Einschätzung, wie gut die Einreichung
                    klappt. {stats.free.length} sind kostenlos, bei {stats.freeAndSmooth.length} geht der Eintrag gratis und ohne
                    Stolpersteine. Der Rest ist Arbeit, Kaffee und gelegentlich Fluchen.
                </p>
                <p className="c-hero-ctas">
                    <a className="button" href="#alle">
                        Alle {stats.total} Verzeichnisse filtern
                    </a>
                    <Link className="c-knopf-zweit" href="/launch-kit">
                        Launch-Kit: Texte in 2 Minuten
                    </Link>
                    <Link className="c-knopf-zweit" href="/top-50">
                        Top 50 als Abkürzung
                    </Link>
                </p>
                <Jean>
                    {HELLO[new Date().getDate() % HELLO.length]} <Link href="/ueber-jean">Mehr über mich →</Link>
                </Jean>
                <dl className="stats">
                    <div>
                        <dt>Verzeichnisse 📚</dt>
                        <dd data-count={stats.total}>{formatNumber(stats.total)}</dd>
                    </div>
                    <div>
                        <dt>Kostenlos (juhu) 🎁</dt>
                        <dd data-count={stats.free.length}>{formatNumber(stats.free.length)}</dd>
                    </div>
                    <div>
                        <dt>Domain Rating 50+ 💪</dt>
                        <dd data-count={stats.strong.length}>{formatNumber(stats.strong.length)}</dd>
                    </div>
                    {stats.withDeal.length > 0 && (
                        <div>
                            <dt>Mit eigenem Rabattcode 🤑</dt>
                            <dd data-count={stats.withDeal.length}>{formatNumber(stats.withDeal.length)}</dd>
                        </div>
                    )}
                </dl>
                <SchicksalsWuerfel
                    options={stats.freeAndSmooth.map((d) => ({
                        name: d.name,
                        slug: d.slug,
                        submission_link: d.submission_link,
                        affiliate: Boolean(d.affiliate),
                    }))}
                />
                <ul className="quick-links">
                    <li>
                        <Link href="/liste/kostenlos">Nur Gratis-Zeug, bitte →</Link>
                    </li>
                    <li>
                        <Link href="/liste/domain-rating-50-plus">Die Muskelprotze unter den Domains →</Link>
                    </li>
                    {stats.withDeal.length > 0 && (
                        <li>
                            <Link href="/liste/rabattcodes">Rabattcodes für Sparfüchse →</Link>
                        </li>
                    )}
                    <li>
                        <Link href="/deutsche-ki-verzeichnisse">Deutsche Verzeichnisse 🇩🇪 →</Link>
                    </li>
                    <li>
                        <Link href="/ki-verzeichnis">Was ist ein KI-Verzeichnis? →</Link>
                    </li>
                    <li>
                        <Link href="/beste-ki-tools">Beste KI-Tools 2026 →</Link>
                    </li>
                    <li>
                        <Link href="/freischaltung">Freischaltdauer der Verzeichnisse →</Link>
                    </li>
                    <li>
                        <Link href="/ratgeber">Ratgeber zum Eintragen →</Link>
                    </li>
                    <li>
                        <Link href="/quiz">Quiz: Was passt zu mir? →</Link>
                    </li>
                    <li>
                        <Link href="/vergleich">Vergleichen →</Link>
                    </li>
                </ul>
            </section>

            <section aria-labelledby="top-kostenlos">
                <h2 id="top-kostenlos">Top 10: kostenlos und reibungslos 🏆</h2>
                <p>
                    Mein Startpunkt, wenn das Budget bei null liegt (also bei den meisten Gründern am Montag). Sortiert nach
                    Domain Rating.
                </p>
                <DirectoryTable directories={tabellenZeilen(topFree)} interactive={false} caption="Top 10 der kostenlosen Verzeichnisse mit reibungsloser Einreichung, sortiert nach Domain Rating" />
            </section>

            <section aria-labelledby="alle">
                <h2 id="alle">Alle {stats.total} KI-Verzeichnisse 📚</h2>
                <p>
                    Filtern, sortieren, eintragen, abhaken. Ein Klick auf den Namen zeigt Details, Einschätzung und Alternativen.
                    Deine Filter stehen in der Adresszeile, du kannst die gefilterte Liste also als Link teilen.
                </p>
                <DirectoryTable directories={tabellenZeilen(directories)} defaultSort="score" tracker caption={`Alle ${stats.total} KI-Verzeichnisse mit Jean-Score, Domain Rating, Besuchen, Preis und Einreichung`} />
            </section>

            <Band farbe="blau" id="legende" titel="So liest du die Tabelle 🔍">
                <dl className="legend">
                    <dt>Domain Rating (DR)</dt>
                    <dd>
                        Ahrefs-Wert von 0 bis 100 für die Linkstärke einer Domain. Ab etwa 50 wird es für ein junges Tool richtig
                        interessant. Darunter ist es eher ein Händedruck als ein Empfehlungsschreiben.
                    </dd>
                    <dt>Besuche/Monat</dt>
                    <dd>Geschätzter Traffic der Verzeichnis-Domain. Ein Richtwert, keine Garantie für Klicks auf deinen Eintrag. Nicht jeder Besucher sucht ausgerechnet dich.</dd>
                    <dt>Einreichung</dt>
                    <dd>
                        Reibungslos heißt: Formular funktioniert, Eintrag geht ohne Umwege live. Hakelig heißt: Formular kaputt, nur
                        per Mail, lange Wartezeit oder Pflicht-Backlink. Kurz: Kaktus statt Butter.
                    </dd>
                    <dt>Preis</dt>
                    <dd>Kostenlos oder kostenpflichtig. Viele kostenlose Verzeichnisse verkaufen zusätzlich Featured-Plätze. Gratis ist selten ganz gratis, aber oft nah dran.</dd>
                </dl>
            </Band>

            <Band farbe="dunkel" id="checkliste" titel="Checkliste: So trägst du dein Tool richtig ein ✅" sticker="6 Schritte">
                <ol className="checklist">
                    <li>
                        <strong>Einmal sauber vorbereiten.</strong> Name, Einzeiler (max. 60 Zeichen), Beschreibung mit 100 bis 300
                        Wörtern, Logo als PNG/SVG, 3 bis 5 Screenshots, Kategorie, Preismodell, Kontakt-Mail. Wer das zehnmal
                        neu tippt, wird zum Schreibwarenhändler seiner selbst.
                    </li>
                    <li>
                        <strong>Überall gleich benennen.</strong> Gleicher Name, gleicher Einzeiler, gleiche URL. So erkennen Google
                        und KI-Systeme dein Tool als eine Marke statt als zehn verschiedene Zwillinge mit Identitätskrise.
                    </li>
                    <li>
                        <strong>Mit den starken, kostenlosen anfangen.</strong> Die Top 10 weiter oben bringen am meisten pro Minute. Das ist der Burger-Gutschein unter den Backlinks.
                    </li>
                    <li>
                        <strong>UTM-Parameter setzen.</strong> Zum Beispiel <code>?utm_source=verzeichnisname&amp;utm_medium=referral&amp;utm_campaign=launch</code> (mit „referral“ landet der Besuch in GA4 im Kanal „Referral“ statt unter „Unassigned“),
                        damit du in der Analyse siehst, welches Verzeichnis wirklich Nutzer bringt und welches nur nett aussieht.
                    </li>
                    <li>
                        <strong>Buch führen.</strong> Datum, Verzeichnis, Status, Link zur Listing-Seite. Nach 4 Wochen prüfen, was
                        live ist und was Klicks bringt. Tabellenkalkulation ist die Liebessprache der SEOs.
                    </li>
                    <li>
                        <strong>Erst dann Geld ausgeben.</strong> Bezahlte Einträge nur, wenn Traffic und Zielgruppe passen. Vorher
                        nach dofollow fragen und Rabattcodes checken. Nein, „Exposure“ ist keine Währung.
                    </li>
                </ol>
            </Band>
            <Trenner art="strahlung" farbe="orange" />

            <MemeChat />

            <Band farbe="lila" id="einstieg" titel="Wohin als Nächstes? 🧭" sticker="Neu: KI-Tool-Datenbank">
                <p>Vier Wege durch mentat.codes, jeweils in der Reihenfolge, die Jean selbst nehmen würde. Darunter alle Bereiche auf einen Blick.</p>
                <ul className="pfade">
                    {[
                        ['🚀', 'Mein KI-Tool launchen', '#fde68a', [['/launch-kit', 'Texte und Unterlagen mit dem Launch-Kit erstellen'], ['/liste/kostenlos', 'Mit den kostenlosen Verzeichnissen starten'], ['/freischaltung', 'Freischaltdauer nachschlagen, von sofort bis 80 Tage'], ['/ratgeber', 'Ratgeber: Eintragen, SEO-Einordnung, Product Hunt'], ['/neu-entdeckt', 'Frisch entdeckte Verzeichnisse mitnehmen'], ['/rechner/launch-zeit', 'Aufwand mit dem Launch-Zeit-Rechner planen'], ['#warteliste-eintragsservice', 'Bald: Jean trägt für dich ein (Warteliste)']]],
                        ['🎯', 'Das richtige KI-Tool finden', '#bfdbfe', [['/tool-finder', 'Drei Fragen im Tool-Finder beantworten'], ['/beste-ki-tools', 'Die besten Tools nach Aufgabe ansehen'], ['/tools', 'Preise laut Anbieter vergleichen'], ['/rechner/abo-monatlich-oder-jaehrlich', 'Monatlich oder jährlich zahlen?']]],
                        ['🎓', 'KI besser nutzen', '#a7f3d0', [['/tutorials/chatgpt-richtig-nutzen', 'Einsteigerkurs: ChatGPT richtig nutzen'], ['/prompts', 'Fertige Prompts zum Ausfüllen'], ['/prompt-check', 'Eigene Prompts prüfen lassen'], ['/glossar', 'Begriffe im KI-Glossar nachschlagen']]],
                        ['🥊', 'KIs fair vergleichen', '#fbcfe8', [['/ki-news', 'KI-News der Woche, verständlich erklärt'], ['/neue-ki-modelle', 'Neue Modelle: GPT-6, Gemini 4, Claude 5.5'], ['/ki-test', 'Den KI-Test mit 50 Aufgaben machen'], ['/tool-vergleiche', 'Tool-Duelle mit klarer Empfehlung'], ['/ki-tools/alternativen', 'Alternativen zu bekannten Tools'], ['/ki-tools/chatgpt-alternativen', 'ChatGPT-Alternativen im Überblick']]],
                    ].map(([emoji, titel, farbe, schritte]) => (
                        <li key={titel} style={{ '--tile': farbe }}>
                            <p className="pfad-titel">
                                <span aria-hidden="true">{emoji}</span> {titel}
                            </p>
                            <ol>
                                {schritte.map(([href, text]) => (
                                    <li key={href}>{href.startsWith('#') ? <a href={href}>{text}</a> : <Link href={href}>{text}</Link>}</li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ul>
                <ul className="entry-tiles">
                    {[
                        ['/ki-tools', '🛠️', 'KI-Tools', 'Die große Datenbank mit Konsens-Signal aus den 3 größten Community-Listen.', `${kbStats().gesamt} Tools`, '#bfdbfe'],
                        ['/#alle', '📚', 'KI-Verzeichnisse', 'Wo du dein KI-Tool einträgst, mit Domain Rating, Preis und Check.', `${stats.total} Verzeichnisse`, '#fde68a'],
                        ['/prompts', '💬', 'Prompts', 'Vorlagen zum Ausfüllen und Rollen-Prompts, mit einem Klick an ChatGPT und Claude.', `${getPrompts().length + archiv.anzahl} Prompts`, '#a7f3d0'],
                        ['/tutorials', '🎓', 'Tutorials', 'Interaktiv mit Vorher/Nachher-Regler, Quiz und Konfetti.', `${getTutorials().length} Kurse`, '#fbcfe8'],
                        ['/tool-finder', '🎯', 'Tool-Finder', 'Drei Fragen, sechs passende KI-Tools.', '3 Klicks', '#fecdd3'],
                        ['/ki-test', '🧪', 'KI-Test', 'ChatGPT, Claude, Gemini & Co. selbst testen und Rangliste erhalten.', `${testCount} Aufgaben`, '#c7d2fe'],
                        ['/rechner', '🧮', 'KI-Rechner', 'KI-Abo, API-Kosten, Automatisierung, Newsletter-Umsatz und Launch-Dauer berechnen.', `${RECHNER.length} Rechner`, '#99f6e4'],
                        ['/prompt-check', '🔍', 'Prompt-Check', 'Prompt einfügen, Score sehen, besser werden.', 'Gratis-Tool', '#ddd6fe'],
                        ['/tool-vergleiche', '🥊', 'Tool-Vergleiche', 'Make vs. Zapier, Midjourney vs. Leonardo, Otter vs. Descript und mehr, mit klarer Empfehlung.', `${getComparisons().length} Vergleiche`, '#fed7aa'],
                        ['/downloads', '🎁', 'Downloads', 'Spickzettel, Prompt-Paket und Top-50-Tabelle zum Mitnehmen.', 'Gratis', '#bbf7d0'],
                        ['/ki-tools/fuer', '🍎', 'KI nach Zielgruppe', 'Für Lehrer, Schüler, Shops, Creator, HR, Handwerk und mehr: Aufgaben, Tools, Prompts.', `${ZIELGRUPPEN.length} Zielgruppen`, '#fde68a'],
                        ['/ki-tools/alternativen', '🔁', 'Tool-Alternativen', 'Alternativen zu ChatGPT, Midjourney, Perplexity, Copilot und Co.', `${getAlternativenHubs().length} Übersichten`, '#a7f3d0'],
                        ['/glossar', '📖', 'KI-Glossar', 'Token, RAG, Halluzination, KI-Agent: Begriffe einfach erklärt.', `${KI_GLOSSAR.length} Begriffe`, '#c7d2fe'],
                        ['/top-50', '🏆', 'Top 50', 'Die 50 besten KI-Verzeichnisse nach Jean-Score.', 'Rangliste', '#fecaca'],
                    ].map(([href, emoji, name, text, count, tile]) => (
                        <li key={href}>
                            <Link href={href} style={{ '--tile': tile }}>
                                <span className="entry-emoji" aria-hidden="true">
                                    {emoji}
                                </span>
                                <strong>{name}</strong>
                                <span>{text}</span>
                                <span className="entry-count">{count}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Band>
            <section className="kb-hero-suche" aria-labelledby="tool-suche">
                <h2 id="tool-suche">Welches KI-Tool suchst du? 🔎</h2>
                <form action={withBase('/ki-tools/')} method="get" role="search" aria-label="KI-Tool-Datenbank durchsuchen">
                    <label className="sr-only" htmlFor="kb-q">
                        KI-Tool-Datenbank durchsuchen
                    </label>
                    <input id="kb-q" name="q" type="search" placeholder={`z. B. Transkription, Logo, Video`} />
                    <button type="submit" className="button">
                        Suchen
                    </button>
                </form>
                <p className="kb-hero-chips">
                    <span>Beliebt:</span>
                    {beliebt.map((t) => (
                        <Link key={t.slug} href={kbPfad(t)}>
                            {t.name}
                        </Link>
                    ))}
                </p>
            </section>

            <section aria-labelledby="prompt-themen" className="prompt-themen">
                <h2 id="prompt-themen">Prompts nach Thema 💬</h2>
                <ul className="kb-hero-chips">
                    {promptsByKategorie()
                        .filter((k) => k.prompts.length && KATEGORIE_TEXTE[k.key])
                        .map((k) => (
                            <li key={k.key}>
                                <Link href={`/prompts/kategorie/${k.key}`}>
                                    {k.name} ({k.prompts.length})
                                </Link>
                            </li>
                        ))}
                </ul>
            </section>

            <section aria-labelledby="warum">
                <h2 id="warum">Warum überhaupt KI-Verzeichnisse? 🤔</h2>
                <p>
                    Wer ein KI-Tool launcht, hat am Anfang drei Probleme: keine Backlinks, keine Sichtbarkeit, keine ersten
                    Nutzer. Dazu kommt ein viertes: Die einzige Person, die das Tool täglich benutzt, bist du selbst. Verzeichnisse
                    lösen das nicht komplett. Aber sie bringen dir mit ein paar Stunden Arbeit themenrelevante Links, erste
                    Referral-Klicks und Nennungen, die auch ChatGPT, Perplexity und Google AI Overviews aufgreifen. Aus SEO-Sicht
                    gilt trotzdem: lieber 20 passende Verzeichnisse mit echtem Traffic als 200 Linkfriedhöfe, auf denen nur noch
                    der Wind weht und ein Cookie-Banner.
                </p>
            </section>

            <ToolPartners limit={6} />
            <section aria-labelledby="mentat-herkunft">
                <h2 id="mentat-herkunft">Woher kommt der Name mentat.codes? 🛠️</h2>
                <p>
                    Bevor hier KI-Verzeichnisse standen, war mentat.codes ab 2023 die Heimat von Mentat, einem der ersten
                    Open-Source-Assistenten, der direkt im Terminal Code geschrieben hat. Das Projekt ist seit Januar 2025
                    archiviert. <Link href="/ratgeber/was-wurde-aus-mentat">Was aus Mentat wurde und was du heute stattdessen nimmst →</Link>
                </p>
                <ul className="quick-links">
                    <li><Link href="/ratgeber/terminal-coding-agenten-vergleich">Terminal-Coding-Agenten im Vergleich</Link></li>
                    <li><Link href="/ratgeber/claude-code-anleitung">Claude Code auf Deutsch</Link></li>
                    <li><Link href="/ratgeber/claude-code-installieren">Claude Code installieren</Link></li>
                    <li><Link href="/ratgeber/claude-code-kosten">Was kostet Claude Code?</Link></li>
                    <li><Link href="/ratgeber/codex-cli-anleitung">Codex CLI Anleitung</Link></li>
                    <li><Link href="/ratgeber/claude-code-vs-codex">Claude Code oder Codex?</Link></li>
                    <li><Link href="/ratgeber/agents-md-claude-md">AGENTS.md und CLAUDE.md</Link></li>
                    <li><Link href="/ratgeber/gemini-cli-antigravity-cli">Von Gemini CLI zu Antigravity CLI</Link></li>
                    <li><Link href="/ratgeber/aider-ollama-lokal">Aider mit Ollama lokal</Link></li>
                    <li><Link href="/ratgeber/cursor-alternative-kostenlos">Cursor-Alternativen</Link></li>
                </ul>
            </section>
            <section aria-labelledby="wer">
                <h2 id="wer">Wer steckt dahinter? 🧔</h2>
                <div className="about-head">
                    <p>
                        Ich bin Jean, Senior SEO/SGE Manager bei der MotoMobilityGroup. Diese Liste
                        ist mein Nebenprojekt: ehrlich bewertet, mit Humor und ohne Affiliate-Tricks.{' '}
                        <Link href="/ueber-jean">Über den Autor →</Link>
                    </p>
                </div>
            </section>

            <Band farbe="pink" id="faq" titel="Häufige Fragen zu KI-Verzeichnissen 🙋">
                <Faq items={faq} />
            </Band>
            <EintragsserviceWarteliste />
        </>
    )
}

export default function Seite() {
    return (
        <>
            <Home />
            <Vernetzt pfad={seitenPfad('/')} />
        </>
    )
}
