import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'
import { SITE_NAME } from '../../../lib/site'
import { KB_SOURCES, KB_STAND, kbStats } from '../../../lib/kb'
import { datumDe } from '../../../lib/text'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const metadata = {
    title: 'KI-Tool-Datenbank: Quellen, Lizenzen und Methode',
    description: 'Woher die Einträge der mentat.codes KI-Tool-Datenbank stammen, unter welchen Lizenzen sie stehen und wie Konsens und Rubriken entstehen.',
    alternates: { canonical: '/ki-tools/quellen' },
}

function QuellenPage() {
    const s = kbStats()
    return (
        <>
            <Breadcrumbs
                items={[
                    { name: SITE_NAME, path: '/' },
                    { name: 'KI-Tool-Datenbank', path: '/ki-tools' },
                    { name: 'Quellen', path: '/ki-tools/quellen' },
                ]}
            />
            <section className="hero">
                <p className="eyebrow">Methode</p>
                <h1>Quellen, Lizenzen und Methode</h1>
                <p className="lead">
                    Die Datenbank führt die drei größten frei lizenzierten KI-Tool-Listen auf GitHub zusammen, gemessen an Sternen und Forks. Stand {datumDe(KB_STAND)}: {s.gesamt} eindeutige Tools.
                </p>
            </section>
            <div className="table-scroll">
                <table>
                <thead>
                    <tr>
                        <th>Liste</th>
                        <th>Sterne</th>
                        <th>Forks</th>
                        <th>Lizenz</th>
                    </tr>
                </thead>
                <tbody>
                    {KB_SOURCES.map((q) => (
                        <tr key={q.id}>
                            <td>
                                <a href={q.url} rel="noopener">
                                    {q.repo}
                                </a>
                            </td>
                            <td>{q.stars.toLocaleString('de-DE')}</td>
                            <td>{q.forks.toLocaleString('de-DE')}</td>
                            <td>{q.license}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
            <h2>So entsteht die Datenbank</h2>
            <ul>
                <li>Übernommen werden nur Fakten: Name, Link, Rubrik der Quelle, Kurzbeschreibung und, falls vorhanden, die Preisangabe. Die Originalbeschreibungen bleiben unverändert in der Datenbank und sind der Quelle zugeordnet.</li>
                <li>Doppelte Einträge werden über die Domain erkannt (bei GitHub über das Repository) und zusammengeführt.</li>
                <li>
                    <strong>Konsens</strong> zählt, in wie vielen der drei Listen ein Tool steht. Die Listen werden unabhängig gepflegt; mehrfache Nennung ist deshalb ein Qualitätssignal, kein Testergebnis.
                </li>
                <li>Für jedes Tool der Datenbank gibt es eine eigene deutsche Kurzbeschreibung (db/kb-de.json), formuliert auf Basis der Quellenangaben ohne neue Behauptungen.</li>
                <li>Die Rubriken und Einleitungstexte sind von mentat.codes. Lernmaterial, Linklisten und Forschungsrubriken der Quellen sind nicht enthalten.</li>
                <li>
                    Tools mit <strong>🧔 Steckbrief</strong> hat Jean einzeln mit Preisen und Gratis-Tarif erfasst (<Link href="/tools">Tool-Verzeichnis</Link>).
                </li>
                <li>Links in der Datenbank sind ungeprüft und deshalb mit nofollow gekennzeichnet.</li>
            </ul>
            <h2>Lizenzhinweise</h2>
            <ul>
                <li>
                    <a href="https://github.com/steven2358/awesome-generative-ai" rel="noopener">Awesome Generative AI</a> von Steven Van Vaerenbergh und Mitwirkenden: CC0 1.0 (gemeinfrei).
                </li>
                <li>
                    <a href="https://github.com/mahseema/awesome-ai-tools" rel="noopener">Awesome AI Tools</a>: Copyright (c) 2024 Mahsima Dastan, MIT License. Die Software und die Inhalte werden „wie besehen“ ohne Gewährleistung bereitgestellt.
                </li>
                <li>
                    <a href="https://github.com/ikaijua/Awesome-AITools" rel="noopener">Awesome-AITools</a> von ikaijua und Mitwirkenden: <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener">CC BY 4.0</a>. Geändert: Einträge ausgewählt, gekürzt, neu kategorisiert und mit den anderen Listen zusammengeführt.
                </li>
            </ul>
            <p>
                Fehlt ein Tool oder ist ein Link tot? Trag es in einer der drei Listen ein, beim nächsten Abgleich ist es auch hier. Oder <a href="#anfrage-tool-vorschlag">melde dich direkt</a>.
            </p>
            <p>
                <Link href="/ki-tools">← Zur KI-Tool-Datenbank</Link>
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <QuellenPage />
            <Vernetzt pfad={seitenPfad('/ki-tools/quellen')} />
        </>
    )
}
