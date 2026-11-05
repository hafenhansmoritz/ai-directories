'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { KONTO_AKTIV, supabase } from '../../lib/konto'
import { AUTOR_FELDER, rang, zeitText } from '../../lib/community'
import Autor from '../components/community/Autor'
import useKonto from '../components/useKonto'

// Forum-Startseite: Kategorien, neueste Themen, Suche und Bestenliste.
export default function ForumStart() {
    const { user } = useKonto()
    const [kategorien, setKategorien] = useState(null)
    const [neu, setNeu] = useState([])
    const [beste, setBeste] = useState([])
    const [suche, setSuche] = useState('')
    const [treffer, setTreffer] = useState(null)

    useEffect(() => {
        if (!KONTO_AKTIV) return
        supabase()
            .then(async (sb) => {
                const [{ data: kats }, { data: themen }, { data: top }, { data: zaehler }] = await Promise.all([
                    sb.from('forum_kategorien').select('*').order('sortierung'),
                    sb.from('forum_themen').select(`id, titel, kategorie_id, antworten, letzte_aktivitaet, erstellt, geloest_beitrag_id, ${AUTOR_FELDER}`).order('letzte_aktivitaet', { ascending: false }).limit(10),
                    sb.from('profiles').select('handle, anzeigename, avatar_pfad, punkte, rolle').gt('punkte', 0).order('punkte', { ascending: false }).limit(10),
                    sb.from('forum_themen').select('kategorie_id').limit(5000),
                ])
                const anzahl = {}
                ;(zaehler || []).forEach((t) => (anzahl[t.kategorie_id] = (anzahl[t.kategorie_id] || 0) + 1))
                setKategorien((kats || []).map((k) => ({ ...k, themen: anzahl[k.id] || 0 })))
                setNeu(themen || [])
                setBeste(top || [])
            })
            .catch(() => setKategorien([]))
    }, [])

    const suchen = async (e) => {
        e.preventDefault()
        if (suche.trim().length < 3) return
        const sb = await supabase()
        const { data } = await sb
            .from('forum_themen')
            .select(`id, titel, kategorie_id, antworten, letzte_aktivitaet, erstellt, geloest_beitrag_id, ${AUTOR_FELDER}`)
            .textSearch('suche', suche.trim(), { type: 'websearch', config: 'german' })
            .limit(20)
        setTreffer(data || [])
    }

    if (!KONTO_AKTIV) return <p className="lead">Das Forum öffnet bald. Wir polieren noch die Stühle. 🪑</p>
    if (!kategorien) return <p className="widget-note">Lade Forum …</p>

    return (
        <>
            <div className="f-leiste">
                <form className="f-suche" onSubmit={suchen} role="search">
                    <label className="sr-only" htmlFor="forum-suche">
                        Forum durchsuchen
                    </label>
                    <input id="forum-suche" type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Forum durchsuchen, z. B. Podcast-Tool" />
                    <button type="submit" className="button button-small">
                        Suchen
                    </button>
                </form>
                <Link className="button" href={user ? '/forum/neu' : '/anmelden?zurueck=/forum/neu'}>
                    ✍️ Neues Thema
                </Link>
            </div>
            {treffer && (
                <section>
                    <h2>🔎 {treffer.length} Treffer</h2>
                    <ThemenListe themen={treffer} kategorien={kategorien} />
                </section>
            )}
            <h2>Kategorien</h2>
            <ul className="f-kategorien">
                {kategorien.map((k) => (
                    <li key={k.id}>
                        <Link href={`/forum/kategorie?k=${k.id}`}>
                            <span className="f-kat-emoji" aria-hidden="true">
                                {k.emoji}
                            </span>
                            <span>
                                <strong>{k.name}</strong>
                                <br />
                                <span className="widget-note">{k.beschreibung}</span>
                            </span>
                            <span className="f-zahl">{k.themen}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="f-zwei">
                <section>
                    <h2>🔥 Gerade aktiv</h2>
                    {neu.length ? <ThemenListe themen={neu} kategorien={kategorien} /> : <p className="c-leer">Noch ganz frisch hier. Starte das erste Thema!</p>}
                </section>
                <aside className="f-beste">
                    <h2>🏆 Bestenliste</h2>
                    {beste.length === 0 ? (
                        <p className="widget-note">Wer hier zuerst hilft, steht ganz oben.</p>
                    ) : (
                        <ol>
                            {beste.map((p) => (
                                <li key={p.handle}>
                                    <Link href={`/u?h=${p.handle}`}>{p.anzeigename}</Link>{' '}
                                    <span className="widget-note">
                                        {rang(p.punkte)[2]} {p.punkte} Punkte
                                    </span>
                                </li>
                            ))}
                        </ol>
                    )}
                    <p className="widget-note">Punkte gibt es für Beiträge, Reaktionen anderer und vor allem für Lösungen (15 Punkte).</p>
                </aside>
            </div>
        </>
    )
}

export function ThemenListe({ themen, kategorien = [] }) {
    return (
        <ul className="f-themen">
            {themen.map((t) => {
                const kat = kategorien.find((k) => k.id === t.kategorie_id)
                return (
                    <li key={t.id} className={t.angepinnt ? 'f-angepinnt' : ''}>
                        <Link href={`/forum/thema?id=${t.id}`} className="f-thema-titel">
                            {t.angepinnt && '📌 '}
                            {t.geloest_beitrag_id && '✅ '}
                            {t.geschlossen && '🔒 '}
                            {t.titel}
                        </Link>
                        <div className="f-thema-meta">
                            <Autor autor={t.autor} groesse={24} />
                            {kat && (
                                <span className="widget-note">
                                    {kat.emoji} {kat.name}
                                </span>
                            )}
                            <span className="widget-note">
                                {t.antworten} {t.antworten === 1 ? 'Antwort' : 'Antworten'} · aktiv {zeitText(t.letzte_aktivitaet)}
                            </span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
