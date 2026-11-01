import Link from './NavLink'
import NETZ from '../../db/vernetzung.json'
import KLAPP from '../../db/texte/klapp.json'
import { KI_GLOSSAR, glossarSlug } from '../../lib/ki-glossar'
import { NEWS } from '../../lib/news'

// Interne Verlinkung pro Seite aus db/vernetzung.json (utils/vernetzung/build.mjs):
// ausgehend „Passt dazu“, eingehend „Wer hierher verlinkt“, dazu aufklappbare Zusatzinfos.
const DEF = new Map(KI_GLOSSAR.map(([term, text]) => [glossarSlug(term), { term, text }]))
// Rückverweise aus den KI-News: Seiten, die eine Meldung als passend nennt, zeigen diese Meldung an.
const IN_DEN_NEWS = new Map()
for (const n of NEWS)
    for (const [href] of n.bezug) {
        if (!IN_DEN_NEWS.has(href)) IN_DEN_NEWS.set(href, [])
        IN_DEN_NEWS.get(href).push(n)
    }

const TYPEN = {
    tools: ['🧰', 'Steckbrief'],
    verzeichnis: ['📇', 'Verzeichnis'],
    ratgeber: ['📖', 'Ratgeber'],
    glossar: ['📚', 'Glossar'],
    prompts: ['✍️', 'Prompt'],
    'prompts/kategorie': ['🗃️', 'Prompt-Sammlung'],
    tutorials: ['🎓', 'Tutorial'],
    'tool-vergleiche': ['⚖️', 'Vergleich'],
    'ki-tools': ['🗂️', 'Rubrik'],
    'ki-tools/tool': ['🔧', 'KI-Tool'],
    'ki-tools/alternativen': ['🔁', 'Alternativen'],
    'ki-tools/fuer': ['👥', 'Für deinen Job'],
    rechner: ['🧮', 'Rechner'],
    'neue-ki-modelle': ['🆕', 'KI-Modell'],
    liste: ['📋', 'Liste'],
    'ki-test': ['🧪', 'KI-Test'],
    'ki-news': ['📰', 'KI-News'],
    skills: ['🧩', 'Skill'],
}
const typVon = (p) => {
    const t = p.split('/').filter(Boolean)
    if (t[0] === 'ki-tools' && ['tool', 'alternativen', 'fuer'].includes(t[1]) && t[2]) return `ki-tools/${t[1]}`
    if (t[0] === 'prompts' && t[1] === 'kategorie') return 'prompts/kategorie'
    return t.length > 1 || TYPEN[t[0]] ? t[0] : 'seite'
}
const marke = (p) => TYPEN[typVon(p)] || ['📌', 'Seite']

// Fester Text pro Seite: gleicher Pfad ergibt immer dieselbe Zeile.
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
const INTRO = [
    'Diese Seiten hat mein Algorithmus aus Kaffee und Textvergleich für dich rausgesucht.',
    'Thematisch am nächsten dran, ausgewählt per Textvergleich.',
    'Thematisch verwandt, handverlesen von einem Skript mit gutem Geschmack.',
    'Falls du noch nicht genug hast: Hier geht es inhaltlich direkt weiter.',
    'Nachbarseiten mit dem meisten gemeinsamen Thema. Kein Zufall, reine Statistik.',
    'Die nächste Abzweigung. Navi sagt: lohnt sich.',
]
const LIEBE = ['Ein paar Freunde', 'Gut vernetzt', 'Beliebt im Viertel', 'Herzstück']
const liebe = (n) => LIEBE[n >= 20 ? 3 : n >= 10 ? 2 : n >= 5 ? 1 : 0]

// Woher die Zahlen stammen, je Seitentyp. Nur Aussagen, die für alle Seiten dieses Typs stimmen.
const WISSEN = {
    verzeichnis: [
        [
            'Wie entsteht der Jean-Score?',
            'Aus vier Teilen mit festen Höchstpunkten: Domain Rating bis 45, Besuche bis 25, Preis bis 20 und Einreichung bis 10. Ist ein Verzeichnis gerade nicht eintragbar, bleibt es bei höchstens 30 Punkten. Partnerlinks ändern daran nichts.',
            ['/transparenz/', 'Transparenz'],
        ],
        [
            'Wie genau sind Domain Rating und Besuche?',
            'Beides sind Schätzwerte von Analyse-Tools, keine Zahlen der Betreiber. Für die Reihenfolge taugen sie gut, für eine Umsatzplanung nicht. Bei auffälligen Werten nutzen wir einen frisch gemessenen Authority Score.',
        ],
    ],
    tools: [
        [
            'Woher kommen die Preise?',
            'Nur von der offiziellen Preisseite oder dem Hilfe-Center des Anbieters, mit Stand-Datum. Steht nirgends offiziell ein Preis, schreiben wir lieber nichts als etwas Geratenes.',
            ['/transparenz/', 'Transparenz'],
        ],
        [
            'Warum Dollar und nicht Euro?',
            'Viele Anbieter rechnen in US-Dollar ab und weisen Euro-Preise gar nicht oder erst im Checkout aus. Wir übernehmen die Währung, die der Anbieter selbst nennt. Dazu kann Umsatzsteuer kommen.',
        ],
    ],
    'ki-tools/tool': [
        [
            'Woher stammt dieser Eintrag?',
            'Aus offenen Tool-Sammlungen auf GitHub, die wir zusammenführen und abgleichen. Je mehr Sammlungen ein Tool unabhängig voneinander nennen, desto eher landet es auf einer eigenen Seite. Alle Quellen und Lizenzen findest du gesammelt.',
            ['/ki-tools/quellen/', 'Quellen und Lizenzen'],
        ],
        ['Warum fehlt manchmal der Preis?', 'Weil die Quellen ihn nicht oder nur grob angeben und wir keine Zahl erfinden. Im Zweifel gilt immer die Preisseite des Anbieters.'],
    ],
    prompts: [
        [
            'Mit welcher KI funktioniert die Vorlage?',
            'Mit jedem aktuellen Chat-Modell, egal ob ChatGPT, Claude, Gemini oder Mistral. Die Platzhalter ersetzt du durch deine Angaben, der Rest bleibt stehen.',
        ],
        ['Darf ich die Vorlage weitergeben?', 'Klar. Kopieren, anpassen, im Team teilen. Ein Link auf AIGeddon freut mich, ist aber keine Pflicht.'],
    ],
    'prompts/kategorie': [['Wie sind die Prompts sortiert?', 'Nach Einsatzzweck. Jede Vorlage hat Platzhalter, ein Beispiel und einen Tipp, welcher typische Fehler das Ergebnis verdirbt.']],
    glossar: [['Warum so kurz erklärt?', 'Weil ein Glossar zum Nachschlagen da ist. Wer tiefer will, findet unten die Seiten, auf denen der Begriff in der Praxis vorkommt.']],
    ratgeber: [
        [
            'Wie aktuell ist dieser Ratgeber?',
            'Oben steht das Prüfdatum. Bis dahin haben wir Zahlen, Preise und Regeln mit den unten genannten Quellen abgeglichen. Neuere Änderungen der Anbieter können wir erst beim nächsten Durchgang einarbeiten.',
        ],
    ],
    'tool-vergleiche': [
        [
            'Wer gewinnt den Vergleich?',
            'Kommt auf deinen Fall an. Darum steht in jedem Vergleich, für wen welches Tool passt. Preise und Funktionen stammen von den offiziellen Seiten, Stand siehe Prüfdatum.',
        ],
    ],
    'neue-ki-modelle': [
        ['Woher stammen Datum und Preis?', 'Aus den Ankündigungen und Preisseiten der Anbieter. Gerüchte stehen getrennt und klar als Gerücht markiert auf der Übersicht der neuen KI-Modelle.'],
    ],
    'ki-news': [
        [
            'Wie prüft AIGeddon die News?',
            'Jede Meldung wird an den offiziellen Seiten der Anbieter, Behörden oder Projekte abgeglichen, Presseberichte zählen nur als Ergänzung. Angaben der Hersteller stehen als „laut Anbieter“ da, Kundenzitate sind keine unabhängigen Tests.',
            ['/transparenz/', 'Transparenz'],
        ],
    ],
    skills: [
        [
            'Woher stammen die Skills?',
            'Grundlage ist die Sammlung marketingskills von Corey Haines unter MIT-Lizenz. AIGeddon hat sie übersetzt, gekürzt und an den deutschsprachigen Markt angepasst. Die Skills enthalten nur Text, keine Skripte.',
            ['/skills/', 'Alle Skills'],
        ],
    ],
    rechner: [
        ['Wird gespeichert, was ich eintippe?', 'Nein. Der Rechner läuft komplett in deinem Browser, nichts wird an einen Server geschickt. Ergebnisse sind Schätzungen auf Basis deiner Eingaben.'],
    ],
    liste: [
        [
            'Wie oft wird die Liste aktualisiert?',
            'Die Zahlen stammen aus derselben Datenbank wie die einzelnen Verzeichnis-Seiten. Domain Rating und Besuche sind Schätzwerte, gut für die Reihenfolge, nicht für den Taschenrechner.',
        ],
    ],
    'ki-tools': [
        [
            'Wie kommen Tools in diese Rubrik?',
            'Über die Kategorie aus den offenen Tool-Sammlungen, die wir zusammenführen. Jedes Tool steht in genau einer Rubrik, damit nichts doppelt auftaucht.',
            ['/ki-tools/quellen/', 'Quellen und Lizenzen'],
        ],
    ],
    'ki-tools/alternativen': [
        [
            'Nach welchen Kriterien sind die Alternativen sortiert?',
            'Redaktionell nach Einsatzzweck. Partnerlinks sind mit Sternchen markiert und kaufen keinen besseren Platz.',
            ['/transparenz/', 'Transparenz'],
        ],
    ],
}

export const seitenPfad = (muster, params = {}) => {
    const p = muster.replace(/\[(\w+)\]/g, (_, k) => params[k])
    return p.endsWith('/') ? p : `${p}/`
}

const LinkListe = ({ pfade }) => (
    <ul className="vernetzt-liste">
        {pfade.map((p) => {
            const [emoji, typ] = marke(p)
            return (
                <li key={p}>
                    <Link href={p}>
                        <span className="vernetzt-typ" aria-hidden="true">
                            {emoji}
                        </span>
                        <span className="vernetzt-text">
                            <small>{typ}</small>
                            {NETZ.titel[p]}
                        </span>
                    </Link>
                </li>
            )
        })}
    </ul>
)

export default function Vernetzt({ pfad }) {
    const s = NETZ.seiten[pfad] || { raus: [], rein: [], reinGesamt: 0 }
    const news = IN_DEN_NEWS.get(pfad) || []
    if (!s.raus.length && !news.length) return null
    const h = hash(pfad)
    const begriffe = (s.glossar || []).map((g) => [g, DEF.get(g)]).filter(([, d]) => d)
    // Seiteneigene Zusatzinfos (db/texte/klapp.json) zuerst, danach die allgemeinen zum Seitentyp.
    const wissen = [...(KLAPP[pfad] || []), ...(WISSEN[typVon(pfad)] || [])]
    const id = `vernetzt-${h.toString(36)}`
    return (
        <section className="vernetzt" aria-labelledby={id}>
            <h2 id={id}>Weiter geht&apos;s 🧭</h2>
            <p className="vernetzt-intro">{INTRO[h % INTRO.length]}</p>
            {news.length > 0 && (
                <div className="vernetzt-news">
                    <p>
                        <span aria-hidden="true">📰</span> <strong>Gerade in den KI-News:</strong>
                    </p>
                    <ul>
                        {news.map((n) => (
                            <li key={n.slug}>
                                <Link href={`/ki-news/${n.slug}/`}>{n.titel}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="vernetzt-grid">
                {s.raus.length > 0 && (
                <details className="klapp" open>
                    <summary>
                        Passt dazu <span className="klapp-zahl">{s.raus.length}</span>
                    </summary>
                    <LinkListe pfade={s.raus} />
                </details>
                )}
                {s.rein.length > 0 && (
                    <details className="klapp">
                        <summary>
                            Wer hierher verlinkt <span className="klapp-zahl">{s.reinGesamt}</span>
                        </summary>
                        <p className="vernetzt-liebe">
                            <span aria-hidden="true">{'💞'.repeat(Math.min(5, Math.max(1, Math.round(s.reinGesamt / 5))))}</span> {liebe(s.reinGesamt)}:{' '}
                            {s.reinGesamt === 1 ? 'eine Seite zeigt' : `${s.reinGesamt} Seiten zeigen`} auf diese hier. Die passendsten:
                        </p>
                        <LinkListe pfade={s.rein} />
                    </details>
                )}
            </div>
            {(begriffe.length > 0 || wissen.length > 0) && (
                <div className="vernetzt-extra">
                    {begriffe.length > 0 && (
                        <details className="klapp">
                            <summary>
                                Begriffe kurz erklärt <span className="klapp-zahl">{begriffe.length}</span>
                            </summary>
                            <dl className="vernetzt-begriffe">
                                {begriffe.map(([slug, d]) => (
                                    <div key={slug}>
                                        <dt>
                                            <Link href={`/glossar/${slug}/`}>{d.term}</Link>
                                        </dt>
                                        <dd>{d.text}</dd>
                                    </div>
                                ))}
                            </dl>
                        </details>
                    )}
                    {wissen.map(([frage, antwort, mehr]) => (
                        <details className="klapp" key={frage}>
                            <summary>{frage}</summary>
                            <p>
                                {antwort}
                                {mehr && (
                                    <>
                                        {' '}
                                        Mehr dazu: <Link href={mehr[0]}>{mehr[1]}</Link>.
                                    </>
                                )}
                            </p>
                        </details>
                    ))}
                </div>
            )}
        </section>
    )
}
