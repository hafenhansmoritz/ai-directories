import Link from 'next/link'
import JeanIcon from '../../components/JeanIcon'
import PrintButton from '../../components/PrintButton'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const metadata = {
    title: 'Coding-Agenten-Spickzettel: Claude Code, Codex, Aider (PDF)',
    description: 'Installation, wichtigste Befehle und eine AGENTS.md-Vorlage für Claude Code, Codex CLI und Aider auf einer Seite. Kostenlos zum Ausdrucken oder als PDF speichern. Stand November 2026.',
    alternates: { canonical: '/downloads/coding-agenten-spickzettel' },
}

// Befehle aus den offiziellen Dokumentationen, geprüft am 2026-11-03 (Quellen in den verlinkten Ratgebern).
const INSTALL = [
    ['Claude Code', 'irm https://claude.ai/install.ps1 | iex', 'oder winget install Anthropic.ClaudeCode, braucht mindestens Claude Pro'],
    ['Codex CLI', 'irm https://chatgpt.com/codex/install.ps1 | iex', 'CLI ab ChatGPT Plus oder mit API-Schlüssel'],
    ['Aider', 'irm https://aider.chat/install.ps1 | iex', 'kostenlos, mit beliebigem Modell, auch lokal über Ollama'],
]

const BEFEHLE = [
    ['/init', 'Claude Code', 'legt eine CLAUDE.md für dein Projekt an'],
    ['/usage', 'Claude Code und Codex', 'zeigt, wie viel vom Kontingent verbraucht ist'],
    ['/model', 'Claude Code und Codex', 'wechselt das Modell'],
    ['/clear', 'Claude Code und Codex', 'startet frisch und spart Kontext'],
    ['claude -p "…"', 'Claude Code', 'ohne Dialog, für Skripte und CI'],
    ['codex exec "…"', 'Codex CLI', 'ohne Dialog, für Skripte und CI'],
    ['/add datei.py', 'Aider', 'Datei in den Chat holen'],
    ['/undo', 'Aider', 'letzten Commit von Aider zurücknehmen'],
]

const AGENTS_MD = ['# Projektregeln', 'Tests: npm test (vor jedem Commit)', 'Code liegt in src/, Tests in tests/', 'Keine neuen Abhängigkeiten ohne Rückfrage', 'Keine Geheimnisse in Dateien schreiben']

const REGELN = [
    'Immer in einem Git-Repository arbeiten, jeden Diff lesen.',
    'Erst planen lassen, dann ändern lassen.',
    'Tests zuerst: Der Agent soll sie schreiben und laufen lassen.',
    'Eine Aufgabe pro Sitzung, danach /clear.',
    'Keine Passwörter oder API-Schlüssel in AGENTS.md oder CLAUDE.md.',
]

function Spickzettel() {
    return (
        <article className="cheatsheet">
            <p className="no-print cta-row">
                <PrintButton />
                <Link href="/downloads">← Alle Downloads</Link>
            </p>
            <header className="cheatsheet-head">
                <JeanIcon badge="werkzeug" cool size={72} />
                <div>
                    <h1>Coding-Agenten-Spickzettel</h1>
                    <p>mentat.codes · Claude Code, Codex CLI und Aider auf einer Seite · Stand November 2026</p>
                </div>
            </header>
            <section>
                <h2>Installieren unter Windows (PowerShell)</h2>
                <dl className="cheatsheet-grid">
                    {INSTALL.map(([name, cmd, hinweis]) => (
                        <div key={name}>
                            <dt>{name}</dt>
                            <dd>
                                <code>{cmd}</code> {hinweis}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>
            <section>
                <h2>Befehle, die du täglich brauchst</h2>
                <dl className="cheatsheet-grid">
                    {BEFEHLE.map(([cmd, tool, text]) => (
                        <div key={cmd}>
                            <dt>
                                <code>{cmd}</code>
                            </dt>
                            <dd>
                                {tool}: {text}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>
            <section>
                <h2>AGENTS.md zum Abschreiben</h2>
                <pre>{AGENTS_MD.join('\n')}</pre>
                <p>Für Claude Code zusätzlich eine CLAUDE.md mit der einen Zeile @AGENTS.md anlegen.</p>
            </section>
            <section>
                <h2>5 Regeln, damit nichts kaputtgeht</h2>
                <ol className="cheatsheet-saetze">
                    {REGELN.map((s) => (
                        <li key={s}>{s}</li>
                    ))}
                </ol>
            </section>
            <footer className="cheatsheet-foot">Ausführlich: mentat.codes → Ratgeber → Terminal-Coding-Agenten im Vergleich</footer>
        </article>
    )
}

export default function Seite() {
    return (
        <>
            <Spickzettel />
            <Vernetzt pfad={seitenPfad('/downloads/coding-agenten-spickzettel')} />
        </>
    )
}
