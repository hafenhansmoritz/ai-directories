import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import JsonLd from '../../components/JsonLd'
import CopyButton from '../../components/CopyButton'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'
import { withBase, absoluteUrl } from '../../../lib/site'
import { getSkills, getSkill, installBefehle, PLATTFORMEN, SKILL_KATEGORIEN, SKILLS_QUELLE, SKILLS_REPO_URL } from '../../../lib/skills'
import { getPrompt } from '../../../lib/prompts'
import { getTool } from '../../../lib/tools'
import NETZ from '../../../db/vernetzung.json'

export const dynamicParams = false

export function generateStaticParams() {
    return getSkills().map((s) => ({ slug: s.name }))
}

const kurzTitel = (s) => (s.titel.length > 40 ? s.titel.split(':')[0] : s.titel)

export function generateMetadata({ params }) {
    const s = getSkill(params.slug)
    if (!s) return {}
    return {
        title: [`${kurzTitel(s)}: Skill für ChatGPT, Claude, Gemini`, `${kurzTitel(s)}: KI-Skill zum Installieren`, `Skill: ${kurzTitel(s)}`].find((t) => t.length <= 59),
        description: `${s.nutzen} Kostenloser Agent Skill auf Deutsch: ZIP für ChatGPT, Claude und Gemini oder ein Befehl für Claude Code, Codex und Cursor.`.slice(0, 300),
        alternates: { canonical: `/skills/${s.name}` },
    }
}

function SkillPage({ params }) {
    const s = getSkill(params.slug)
    if (!s) notFound()
    const befehle = installBefehle(s.name)
    const zip = withBase(`/skills-dl/${s.name}.zip`)
    const roh = withBase(`/skills-dl/${s.name}/SKILL.md`)
    const prompts = s.prompts.map(getPrompt).filter(Boolean)
    const tools = s.tools.map(getTool).filter(Boolean)
    const verwandt = getSkills().filter((x) => x.kategorie === s.kategorie && x.name !== s.name)
    const crumbs = [
        { name: 'mentat.codes', path: '/' },
        { name: 'Skills', path: '/skills' },
        { name: s.titel, path: `/skills/${s.name}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: s.name,
            description: s.description,
            programmingLanguage: 'Markdown',
            codeRepository: SKILLS_REPO_URL,
            license: 'https://opensource.org/licenses/MIT',
            url: absoluteUrl(`/skills/${s.name}`),
            isBasedOn: s.metadata.source,
        },
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    🧩 Skill · {SKILL_KATEGORIEN[s.kategorie][1]} · {s.woerter.toLocaleString('de-DE')} Wörter Anleitung
                </p>
                <h1>
                    {s.emoji} {s.titel}
                </h1>
                <p className="lead">{s.nutzen}</p>
                <p>
                    <strong>Wann die KI den Skill nutzt:</strong> {s.description}
                </p>
            </section>

            <section aria-labelledby="installieren" className="skill-install">
                <h2 id="installieren">Mit einem Klick installieren ⚡</h2>
                <p>
                    <a className="button" href={zip} download>
                        ZIP herunterladen ⬇
                    </a>{' '}
                    für ChatGPT, Claude und Gemini: Datei herunterladen, beim Assistenten unter Skills hochladen.
                </p>
                <p>Für Claude Code, Codex, Cursor, GitHub Copilot und weitere Coding-Agenten im Terminal:</p>
                <p>
                    <code>{befehle.npx}</code> <CopyButton value={befehle.npx} label="Kopieren" />
                </p>
                <p>
                    <code>{befehle.gh}</code> <CopyButton value={befehle.gh} label="Kopieren" />
                </p>
                <p>
                    Für alle anderen LLMs: <CopyButton value={s.markdown} label="SKILL.md kopieren" /> und als Projekt- oder Systemanweisung einfügen.
                </p>
            </section>

            <section aria-labelledby="schritte">
                <h2 id="schritte">Schritt für Schritt je Plattform</h2>
                {PLATTFORMEN.map((p) => (
                    <details key={p.id} className="klapp">
                        <summary>{p.name}</summary>
                        <ol>
                            {p.schritte.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ol>
                        {p.weg === 'befehl' && (
                            <p>
                                <code>{befehle.npx}</code>
                            </p>
                        )}
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

            <section aria-labelledby="skill-inhalt">
                <h2 id="skill-inhalt">Was im Skill steht</h2>
                <p>Lies die Anleitung, bevor du sie installierst. Sie enthält nur Text, keine Skripte.</p>
                <details className="klapp">
                    <summary>SKILL.md anzeigen ({s.woerter.toLocaleString('de-DE')} Wörter)</summary>
                    <pre className="skill-quelltext">{s.markdown}</pre>
                </details>
                <p>
                    <a href={roh}>SKILL.md als Datei öffnen</a> · <a href={`${SKILLS_REPO_URL}/${s.name}`}>Auf GitHub ansehen ↗</a>
                </p>
            </section>

            {(prompts.length > 0 || tools.length > 0 || s.seiten.length > 0) && (
                <section aria-labelledby="passt-dazu">
                    <h2 id="passt-dazu">Passt dazu</h2>
                    <ul className="link-cards">
                        {prompts.map((p) => (
                            <li key={p.slug}>
                                <Link href={`/prompts/${p.slug}`}>
                                    <strong>✍️ Prompt: {p.title}</strong>
                                </Link>
                                <span>{p.ziel}</span>
                            </li>
                        ))}
                        {tools.map((t) => (
                            <li key={t.slug}>
                                <Link href={`/tools/${t.slug}`}>
                                    <strong>🧰 {t.name}</strong>
                                </Link>
                                <span>{t.summary_de}</span>
                            </li>
                        ))}
                        {s.seiten.map((p) => (
                            <li key={p}>
                                <Link href={p}>
                                    <strong>📖 {NETZ.titel[`${p}/`] || p}</strong>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {verwandt.length > 0 && (
                <section aria-labelledby="mehr-skills">
                    <h2 id="mehr-skills">Mehr Skills für {SKILL_KATEGORIEN[s.kategorie][1]}</h2>
                    <ul>
                        {verwandt.map((x) => (
                            <li key={x.name}>
                                <Link href={`/skills/${x.name}`}>
                                    {x.emoji} {x.titel}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <p>
                Lizenz: MIT. Grundlage: <a href={s.metadata.source || SKILLS_QUELLE.url}>{SKILLS_QUELLE.name}</a>, übersetzt und für den deutschsprachigen Markt angepasst. Hinweise zu Recht und Steuern ersetzen keine
                Beratung im Einzelfall.
            </p>
            <p>
                <Link href="/skills">← Alle Skills</Link> · <Link href="/ratgeber/ki-skills-wiederkehrende-aufgaben">Ratgeber: KI-Skills</Link>
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <SkillPage params={params} />
            <Vernetzt pfad={seitenPfad('/skills/[slug]', params)} />
        </>
    )
}
