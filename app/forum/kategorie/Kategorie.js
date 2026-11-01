'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { KONTO_AKTIV, supabase } from '../../../lib/konto'
import { AUTOR_FELDER } from '../../../lib/community'
import { ThemenListe } from '../ForumStart'
import useKonto from '../../components/useKonto'

const SORTIERUNG = [
    ['aktiv', 'Zuletzt aktiv'],
    ['neu', 'Neueste'],
    ['offen', 'Ohne Lösung'],
]

export default function Kategorie() {
    const { user } = useKonto()
    const [kat, setKat] = useState(undefined)
    const [themen, setThemen] = useState(null)
    const [sort, setSort] = useState('aktiv')

    const k = useSearchParams().get('k') || ''
    useEffect(() => {
        setThemen(null)
        if (!KONTO_AKTIV || !/^[a-z0-9-]{2,40}$/.test(k)) return setKat(null)
        setKat(undefined)
        // Späte Antworten einer vorherigen Kategorie verwerfen.
        let aktiv = true
        supabase()
            .then(async (sb) => {
                const { data } = await sb.from('forum_kategorien').select('*').eq('id', k).maybeSingle()
                if (!aktiv) return
                setKat(data || null)
                if (data) document.title = `${data.name} | KI-Forum | AIGeddon`
            })
            .catch(() => aktiv && setKat(null))
        return () => {
            aktiv = false
        }
    }, [k])

    useEffect(() => {
        if (!kat) return
        // Wechselt Sortierung oder Kategorie schnell, gilt nur die letzte Antwort.
        let aktiv = true
        supabase()
            .then(async (sb) => {
                let q = sb
                    .from('forum_themen')
                    .select(`id, titel, kategorie_id, antworten, letzte_aktivitaet, erstellt, angepinnt, geschlossen, geloest_beitrag_id, ${AUTOR_FELDER}`)
                    .eq('kategorie_id', kat.id)
                    .order('angepinnt', { ascending: false })
                if (sort === 'neu') q = q.order('erstellt', { ascending: false })
                else q = q.order('letzte_aktivitaet', { ascending: false })
                if (sort === 'offen') q = q.is('geloest_beitrag_id', null)
                const { data, error } = await q.limit(100)
                if (aktiv) setThemen(error ? [] : data || [])
            })
            .catch(() => aktiv && setThemen([]))
        return () => {
            aktiv = false
        }
    }, [kat, sort])

    if (kat === undefined) return <p className="widget-note">Lade Kategorie …</p>
    if (kat === null)
        return (
            <p>
                Diese Kategorie gibt es nicht. <Link href="/forum">Zurück zum Forum</Link>
            </p>
        )
    return (
        <>
            <section className="hero">
                <p className="eyebrow">
                    <Link href="/forum">KI-Forum</Link>
                </p>
                <h1>
                    {kat.emoji} {kat.name}
                </h1>
                <p className="lead">{kat.beschreibung}</p>
                {kat.gesponsert_von && <p className="f-sponsor">Diese Kategorie wird präsentiert von {kat.gesponsert_von}* (Anzeige)</p>}
            </section>
            <div className="f-leiste">
                <div className="f-sortierung" role="group" aria-label="Sortierung">
                    {SORTIERUNG.map(([k, l]) => (
                        <button key={k} type="button" className={`c-reaktion${sort === k ? ' an' : ''}`} aria-pressed={sort === k} onClick={() => setSort(k)}>
                            {l}
                        </button>
                    ))}
                </div>
                {!kat.nur_team && (
                    <Link className="button" href={user ? `/forum/neu?k=${kat.id}` : `/anmelden?zurueck=${encodeURIComponent(`/forum/neu?k=${kat.id}`)}`}>
                        ✍️ Neues Thema
                    </Link>
                )}
            </div>
            {themen === null ? (
                <p className="widget-note">Lade Themen …</p>
            ) : themen.length === 0 ? (
                <p className="c-leer">Hier ist es noch still. Mach den Anfang!</p>
            ) : (
                <ThemenListe themen={themen} kategorien={[kat]} />
            )}
        </>
    )
}
