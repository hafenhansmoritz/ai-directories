'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { lies, schreib, ABZEICHEN_KATALOG } from '../../lib/herz'
import { Medaille, WinkeRoboter } from '../components/HerzIcons'
import { IdeeBox, Weitersagen } from '../components/HerzBoxen'
import KontoEinladung from '../components/KontoEinladung'
import SpeicherOrt from './SpeicherOrt'

export default function Merkliste() {
    const [daten, setDaten] = useState(null)

    const [runde, setRunde] = useState(0)
    useEffect(() => {
        const neu = () => setRunde((r) => r + 1)
        window.addEventListener('mentat-sync', neu)
        return () => window.removeEventListener('mentat-sync', neu)
    }, [])
    useEffect(() => {
        setDaten({
            liste: lies('mentat-merkliste', []) || [],
            verlauf: lies('mentat-verlauf', []) || [],
            herzen: (lies('mentat-herzen', []) || []).length,
            gelesen: (lies('mentat-gelesen', []) || []).length,
            bereiche: (lies('mentat-bereiche', []) || []).length,
            abzeichen: lies('mentat-abzeichen', []) || [],
            besuche: lies('mentat-besuche', 0) || 0,
        })
    }, [runde])

    if (!daten) return <p className="widget-note">Lade deine Merkliste …</p>

    const entfernen = (pfad) => {
        const liste = daten.liste.filter((m) => m.pfad !== pfad)
        schreib('mentat-merkliste', liste)
        setDaten({ ...daten, liste })
    }
    const verdient = ABZEICHEN_KATALOG.filter(([n]) => daten.abzeichen.includes(n)).length

    return (
        <>
            <KontoEinladung />
            <h2>⭐ Gemerkte Seiten</h2>
            {daten.liste.length === 0 ? (
                <div className="merk-leer">
                    <WinkeRoboter size={88} />
                    <p>
                        Noch leer, aber das ändert sich schnell. Unter jeder Seite findest du den Knopf <strong>☆ Merken</strong>. Probier es gleich bei
                        den <Link href="/ki-news">KI-News</Link> oder im <Link href="/ratgeber">Ratgeber</Link> aus.
                    </p>
                </div>
            ) : (
                <ul className="merk-liste">
                    {daten.liste.map((m) => (
                        <li key={m.pfad}>
                            <Link href={m.pfad}>{m.titel || m.pfad}</Link>
                            <span className="widget-note"> gemerkt am {new Date(m.zeit).toLocaleDateString('de-DE')}</span>
                            <button type="button" className="merk-weg" onClick={() => entfernen(m.pfad)} aria-label={`${m.titel || m.pfad} entfernen`}>
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {daten.verlauf.length > 0 && (
                <>
                    <h2>🕰️ Zuletzt angesehen</h2>
                    <ul className="merk-verlauf">
                        {daten.verlauf.map((v) => (
                            <li key={v.pfad}>
                                <Link href={v.pfad}>{v.titel || v.pfad}</Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <h2>🏅 Dein Sammelalbum</h2>
            <p>
                {verdient} von {ABZEICHEN_KATALOG.length} Abzeichen gesammelt.{' '}
                {verdient === ABZEICHEN_KATALOG.length ? 'Alle! Du bist offiziell ein mentat.codes-Herzensmensch. 💖' : 'Die mit Schloss warten noch auf dich.'}
            </p>
            <ul className="merk-stats">
                <li>
                    <strong>{daten.besuche}</strong> {daten.besuche === 1 ? 'Besuch' : 'Besuche'}
                </li>
                <li>
                    <strong>{daten.herzen}</strong> {daten.herzen === 1 ? 'Herz' : 'Herzen'} verschenkt
                </li>
                <li>
                    <strong>{daten.gelesen}</strong> Artikel ganz gelesen
                </li>
                <li>
                    <strong>{daten.bereiche}</strong> {daten.bereiche === 1 ? 'Bereich' : 'Bereiche'} entdeckt
                </li>
            </ul>
            <ul className="merk-abzeichen">
                {ABZEICHEN_KATALOG.map(([name, emoji, wie, geheim]) => {
                    const hat = daten.abzeichen.includes(name)
                    return (
                        <li key={name} className={hat ? 'hat' : ''}>
                            {hat ? (
                                <Medaille emoji={emoji} size={64} />
                            ) : (
                                <span className="merk-abzeichen-icon" aria-hidden="true">
                                    🔒
                                </span>
                            )}
                            <strong>{hat || !geheim ? name : 'Geheimes Abzeichen'}</strong>
                            <span className="widget-note">{hat ? wie : geheim ? `Hinweis: ${wie}` : wie}</span>
                        </li>
                    )
                })}
            </ul>
            <p className="widget-note">
                <SpeicherOrt art="album" />
            </p>

            <h2>💛 Für Herzensmenschen</h2>
            <div className="herz-boxen">
                <Weitersagen />
                <IdeeBox />
            </div>
        </>
    )
}
