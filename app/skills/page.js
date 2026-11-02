import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import Jean from '../components/Jean'
import CopyButton from '../components/CopyButton'
import Faq, { faqSchema } from '../components/Faq'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { absoluteUrl, withBase } from '../../lib/site'
import { getSkills, SKILL_KATEGORIEN, ALLE_BEFEHL, PLATTFORMEN, SKILLS_QUELLE, SKILLS_REPO_URL } from '../../lib/skills'

export const metadata = {
    title: 'KI-Skills für ChatGPT, Claude und Gemini gratis',
    description:
        'Deutsche Agent Skills für Marketing, SEO und Vertrieb: einmal installieren, in ChatGPT, Claude, Gemini, Claude Code, Codex, Cursor und Copilot nutzen. ZIP-Download oder ein Befehl, DACH-Recht eingebaut.',
    alternates: { canonical: '/skills' },
    openGraph: { url: '/skills' },
}

const FAQ = [
    ['Was ist ein Skill?', 'Ein Ordner mit einer Datei namens SKILL.md: Name, Beschreibung und eine Arbeitsanleitung. Der Assistent liest zuerst nur Name und Beschreibung und lädt die Anleitung, wenn deine Aufgabe dazu passt. Das Format ist ein offener Standard, den laut Anthropic über 70 Plattformen unterstützen.'],
    ['Kosten die Skills etwas?', 'Nein. Die Skills sind kostenlos und stehen unter der MIT-Lizenz. Du brauchst nur einen Zugang zu einem Assistenten, der Skills unterstützt. Bei Claude gibt es Skills laut Anthropic auch im Gratis-Tarif, bei ChatGPT und Gemini gelten die Voraussetzungen der jeweiligen Hilfeseiten.'],
    ['Woher stammen die Skills?', 'Grundlage ist die Sammlung marketingskills von Corey Haines (MIT-Lizenz). mentat.codes hat die Skills übersetzt, gekürzt und an den deutschsprachigen Markt angepasst, etwa an UWG, DSGVO, Preisangabenverordnung und Impressumspflicht.'],
    ['Sind fremde Skills gefährlich?', 'Skills können Skripte enthalten, und das ist fremder Code. Die Skills hier enthalten keine Skripte, nur Text. Prüf trotzdem jede SKILL.md, bevor du sie installierst, das geht auf jeder Skill-Seite mit einem Klick.'],
    ['Ersetzen die Skills eine Rechtsberatung?', 'Nein. Skills wie Kaltakquise oder Preisgestaltung weisen auf rechtliche Fallstricke hin, ersetzen aber keine Prüfung im Einzelfall.'],
]

function SkillsIndex() {
    const skills = getSkills()
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Skills', path: '/skills' },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'KI-Skills für alle LLMs',
            itemListElement: skills.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/skills/${s.name}`), name: s.titel })),
        },
        faqSchema(FAQ),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">🧩 {skills.length} Skills · kostenlos · MIT-Lizenz</p>
                <h1>KI-Skills für alle LLMs: einmal installieren, überall nutzen</h1>
                <p className="lead">
                    Fertige Arbeitsanleitungen für Marketing, SEO und Vertrieb, auf Deutsch und mit DACH-Recht im Gepäck. Läuft in ChatGPT, Claude und Gemini per ZIP-Upload und in Claude Code, Codex, Cursor und
                    GitHub Copilot mit einem Befehl.
                </p>
                <Jean>Ein Prompt ist ein Zettel, den du jedes Mal neu schreibst. Ein Skill ist der Ordner, den die KI selbst aus dem Regal zieht.</Jean>
            </section>

            <section aria-labelledby="alle-auf-einmal" className="skill-install">
                <h2 id="alle-auf-einmal">Alle Skills mit einem Befehl ⚡</h2>
                <p>Für Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI und weitere Coding-Agenten. Der Befehl fragt, welche Skills und welche Agenten du willst:</p>
                <p>
                    <code>{ALLE_BEFEHL}</code> <CopyButton value={ALLE_BEFEHL} label="Befehl kopieren" />
                </p>
                <p>
                    Für ChatGPT, Claude und Gemini im Browser lädst du auf der jeweiligen Skill-Seite die ZIP-Datei herunter und lädst sie dort hoch. <a href={SKILLS_REPO_URL}>Alle Dateien auf GitHub ↗</a>
                </p>
            </section>

            {Object.entries(SKILL_KATEGORIEN).map(([key, [emoji, name]]) => {
                const liste = skills.filter((s) => s.kategorie === key)
                if (!liste.length) return null
                return (
                    <section key={key} aria-labelledby={`kat-${key}`}>
                        <h2 id={`kat-${key}`}>
                            {emoji} {name}
                        </h2>
                        <ul className="link-cards">
                            {liste.map((s) => (
                                <li key={s.name}>
                                    <Link href={`/skills/${s.name}`}>
                                        <strong>
                                            {s.emoji} {s.titel}
                                        </strong>
                                    </Link>
                                    <span>{s.nutzen}</span>
                                    <a href={withBase(`/skills-dl/${s.name}.zip`)} download>
                                        ZIP herunterladen ⬇
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            })}

            <section aria-labelledby="installieren">
                <h2 id="installieren">So installierst du einen Skill 🛠️</h2>
                {PLATTFORMEN.map((p) => (
                    <details key={p.id} className="klapp">
                        <summary>{p.name}</summary>
                        <ol>
                            {p.schritte.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ol>
                        {p.quelle && (
                            <p>
                                <a href={p.quelle} target="_blank" rel="noopener">
                                    Offizielle Anleitung ↗
                                </a>
                            </p>
                        )}
                    </details>
                ))}
            </section>

            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={FAQ} />
            </section>

            <p>
                Grundlage: <a href={SKILLS_QUELLE.url}>{SKILLS_QUELLE.name}</a> ({SKILLS_QUELLE.lizenz}-Lizenz), übersetzt und für den deutschsprachigen Markt angepasst von mentat.codes. Mehr zum Thema im Ratgeber{' '}
                <Link href="/ratgeber/ki-skills-wiederkehrende-aufgaben">KI-Skills statt Copy-Paste-Prompts</Link>.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <SkillsIndex />
            <Vernetzt pfad={seitenPfad('/skills')} />
        </>
    )
}
