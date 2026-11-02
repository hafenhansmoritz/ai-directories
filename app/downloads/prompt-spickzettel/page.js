import Link from 'next/link'
import JeanIcon from '../../components/JeanIcon'
import PrintButton from '../../components/PrintButton'
import { TECHNIKEN } from '../../../lib/prompts'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const metadata = {
    title: 'Prompt-Spickzettel zum Ausdrucken (gratis PDF)',
    description: 'Prompt Engineering auf einer Seite: die Bausteine eines guten Prompts, 8 Techniken und 10 Sätze, die jede KI-Antwort besser machen. Kostenlos als PDF speichern.',
    alternates: { canonical: '/downloads/prompt-spickzettel' },
}

const BAUSTEINE = [
    ['Rolle', 'Du bist erfahrener …'],
    ['Aufgabe', 'Schreibe / Vergleiche / Erstelle …'],
    ['Kontext', 'Wofür, warum, Rahmenbedingungen'],
    ['Zielgruppe', 'Für wen ist das Ergebnis?'],
    ['Format', 'Tabelle, Liste, 150 Wörter, JSON'],
    ['Qualität', 'Woran erkennst du ein gutes Ergebnis?'],
]

const SAETZE = [
    'Stell mir zuerst bis zu 3 Rückfragen, bevor du anfängst.',
    'Erfinde keine Fakten. Markiere, was du nicht sicher weißt.',
    'Gib mir 5 Varianten mit unterschiedlichen Ansätzen.',
    'Prüfe dein Ergebnis gegen die Aufgabe und verbessere es, bevor du antwortest.',
    'Erkläre es so, dass es eine 12-Jährige versteht.',
    'Antworte als Tabelle mit den Spalten …',
    'Nutze dieses Beispiel als Vorlage für Stil und Länge: """…"""',
    'Geh Schritt für Schritt vor.',
    'Was fehlt dir, um das besser zu machen?',
    'Kürze auf die Hälfte, ohne Inhalt zu verlieren.',
]

function Spickzettel() {
    return (
        <article className="cheatsheet">
            <p className="no-print cta-row">
                <PrintButton />
                <Link href="/downloads">← Alle Downloads</Link>
            </p>
            <header className="cheatsheet-head">
                <JeanIcon badge="prompt" cool size={72} />
                <div>
                    <h1>Prompt-Spickzettel</h1>
                    <p>mentat.codes · Prompt Engineering auf einer Seite</p>
                </div>
            </header>
            <section>
                <h2>Die 6 Bausteine</h2>
                <ol className="cheatsheet-bausteine">
                    {BAUSTEINE.map(([name, text]) => (
                        <li key={name}>
                            <strong>{name}</strong>
                            <span>{text}</span>
                        </li>
                    ))}
                </ol>
            </section>
            <section>
                <h2>8 Techniken</h2>
                <dl className="cheatsheet-grid">
                    {Object.entries(TECHNIKEN).map(([key, [name, text]]) => (
                        <div key={key}>
                            <dt>{name}</dt>
                            <dd>{text}</dd>
                        </div>
                    ))}
                </dl>
            </section>
            <section>
                <h2>10 Sätze, die jede Antwort besser machen</h2>
                <ol className="cheatsheet-saetze">
                    {SAETZE.map((s) => (
                        <li key={s}>{s}</li>
                    ))}
                </ol>
            </section>
            <footer className="cheatsheet-foot">Mehr Prompts zum Absenden: mentat.codes → Prompt-Bibliothek und Prompt-Baukasten</footer>
        </article>
    )
}

export default function Seite() {
    return (
        <>
            <Spickzettel />
            <Vernetzt pfad={seitenPfad('/downloads/prompt-spickzettel')} />
        </>
    )
}
