'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import useKonto from '../useKonto'
import { KONTO_AKTIV, supabase } from '../../../lib/konto'
import { zeitText } from '../../../lib/community'

// Benachrichtigungen im Header: Zähler, Liste der letzten 15, alles als gelesen markieren.
const ICON = { antwort: '💬', erwaehnung: '📣', loesung: '✅', moderation: '🛡️', abzeichen: '🏅' }

export default function Glocke() {
    const { user } = useKonto()
    const [liste, setListe] = useState([])
    const [ungelesen, setUngelesen] = useState(0)
    const [offen, setOffen] = useState(false)
    const box = useRef(null)

    // Kontowechsel: nichts vom vorigen Konto stehen lassen
    useEffect(() => {
        setListe([])
        setUngelesen(0)
        setOffen(false)
    }, [user?.id])

    // Ungelesene zuerst: So rücken ältere ungelesene nach, sobald die angezeigten gelesen sind.
    const laden = useCallback(async () => {
        if (!user) return
        const sb = await supabase()
        const { data } = await sb.from('benachrichtigungen').select('id, art, link, text, gelesen, erstellt, von:profiles!benachrichtigungen_von_fkey(anzeigename)').order('gelesen', { ascending: true }).order('erstellt', { ascending: false }).limit(15)
        setListe(data || [])
        const { count } = await sb.from('benachrichtigungen').select('id', { count: 'exact', head: true }).eq('gelesen', false)
        setUngelesen(count || 0)
    }, [user])

    useEffect(() => {
        if (!user) return
        laden().catch(() => {})
        const t = setInterval(() => document.visibilityState === 'visible' && laden().catch(() => {}), 120000)
        const fokus = () => laden().catch(() => {})
        window.addEventListener('focus', fokus)
        return () => {
            clearInterval(t)
            window.removeEventListener('focus', fokus)
        }
    }, [user, laden])

    useEffect(() => {
        if (!offen) return
        const zu = (e) => {
            if (e.key === 'Escape' || (e.type === 'click' && box.current && !box.current.contains(e.target))) setOffen(false)
        }
        document.addEventListener('keydown', zu)
        document.addEventListener('click', zu)
        return () => {
            document.removeEventListener('keydown', zu)
            document.removeEventListener('click', zu)
        }
    }, [offen])

    if (!KONTO_AKTIV || !user) return null
    // Nur die angezeigten Meldungen als gelesen markieren, ältere bleiben ungelesen und rücken nach.
    const allesGelesen = async () => {
        const ids = liste.filter((b) => !b.gelesen).map((b) => b.id)
        if (!ids.length) return
        const sb = await supabase()
        const { error } = await sb.from('benachrichtigungen').update({ gelesen: true }).in('id', ids)
        if (!error) laden()
    }
    const sichtbarUngelesen = liste.some((b) => !b.gelesen)
    return (
        <div className="glocke" ref={box}>
            <button type="button" className="konto-knopf glocke-knopf" aria-expanded={offen} aria-label={`Benachrichtigungen, ${ungelesen} ungelesen`} onClick={() => setOffen(!offen)}>
                <span aria-hidden="true">🔔</span>
                {ungelesen > 0 && <span className="glocke-zahl">{ungelesen > 99 ? '99+' : ungelesen}</span>}
            </button>
            {offen && (
                <div className="glocke-liste" role="region" aria-label="Benachrichtigungen">
                    <p className="glocke-kopf">
                        <strong>Benachrichtigungen</strong>
                        {sichtbarUngelesen && (
                            <button type="button" className="c-link" onClick={allesGelesen}>
                                Diese als gelesen markieren
                            </button>
                        )}
                    </p>
                    {liste.length === 0 ? (
                        <p className="widget-note">Noch nichts Neues. Schreib einen Kommentar, dann wird es hier lebendig!</p>
                    ) : (
                        <ul>
                            {liste.map((b) => (
                                <li key={b.id} className={b.gelesen ? '' : 'neu'}>
                                    <Link href={b.link} onClick={() => setOffen(false)}>
                                        <span aria-hidden="true">{ICON[b.art]}</span> <strong>{b.von?.anzeigename || 'mentat.codes'}</strong> {b.text}
                                        <span className="c-zeit"> · {zeitText(b.erstellt)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
