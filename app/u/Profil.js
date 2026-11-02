'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { KONTO_AKTIV, supabase, bildUrl } from '../../lib/konto'
import { ABZEICHEN_KATALOG } from '../../lib/herz'
import { Medaille, WinkeRoboter } from '../components/HerzIcons'
import useKonto from '../components/useKonto'

// Öffentliches Profil unter /u?h=handle. Private Profile zeigen nur Name, Handle und Bild.
export default function Profil() {
    const { user } = useKonto()
    const [daten, setDaten] = useState(undefined)

    const handle = (useSearchParams().get('h') || '').toLowerCase()
    useEffect(() => {
        if (!KONTO_AKTIV || !/^[a-z0-9_]{3,24}$/.test(handle)) return setDaten(null)
        setDaten(undefined)
        // Wechselt Handle oder Anmeldung, zählt nur die letzte Antwort.
        let aktiv = true
        supabase()
            .then(async (sb) => {
                const { data: profil } = await sb
                    .from('profiles')
                    .select('id, handle, anzeigename, avatar_pfad, banner_pfad, banner_verlauf, oeffentlich, rolle, punkte, erstellt')
                    .eq('handle', handle)
                    .maybeSingle()
                if (!aktiv) return
                if (!profil) return setDaten(null)
                const [{ data: details }, { data: abzeichen }, { data: themen }, { data: kommentare }] = await Promise.all([
                    sb.from('profil_details').select('bio, beruf, pronomen, links').eq('id', profil.id).maybeSingle(),
                    sb.from('badges').select('name, zeit').eq('user_id', profil.id),
                    // Aktivität nur bei öffentlichen Profilen (oder dem eigenen) abfragen.
                    profil.oeffentlich || (user && user.id === profil.id)
                        ? sb.from('forum_themen').select('id, titel, erstellt').eq('user_id', profil.id).eq('status', 'sichtbar').order('erstellt', { ascending: false }).limit(5)
                        : Promise.resolve({ data: [] }),
                    profil.oeffentlich || (user && user.id === profil.id)
                        ? sb.from('comments').select('id, pfad, text, erstellt').eq('user_id', profil.id).eq('status', 'sichtbar').order('erstellt', { ascending: false }).limit(5)
                        : Promise.resolve({ data: [] }),
                ])
                if (!aktiv) return
                document.title = `${profil.anzeigename} (@${profil.handle}) | mentat.codes`
                setDaten({ profil, details, abzeichen: abzeichen || [], themen: themen || [], kommentare: kommentare || [] })
            })
            .catch(() => aktiv && setDaten(null))
        return () => {
            aktiv = false
        }
    }, [handle, user])

    if (daten === undefined) return <p className="widget-note">Lade Profil …</p>
    if (daten === null)
        return (
            <div className="merk-leer">
                <WinkeRoboter size={88} />
                <p>
                    Dieses Profil gibt es nicht oder nicht mehr. Vielleicht wurde der Handle geändert? <Link href="/forum">Zum Forum</Link>
                </p>
            </div>
        )

    const { profil, details, abzeichen, themen, kommentare } = daten
    const avatar = bildUrl('avatare', profil.avatar_pfad)
    const banner = bildUrl('banner', profil.banner_pfad)
    const eigenes = user && user.id === profil.id
    return (
        <article className="profil">
            <div className={`profil-vorschau banner-${profil.banner_verlauf}`} style={banner ? { backgroundImage: `url(${banner})` } : undefined}>
                {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt="" width="96" height="96" className="konto-avatar konto-avatar-gross" />
                ) : (
                    <span className="konto-avatar konto-avatar-gross konto-avatar-leer" aria-hidden="true">
                        {profil.anzeigename.slice(0, 1).toUpperCase()}
                    </span>
                )}
                <div className="profil-vorschau-text">
                    <h1 className="konto-gross">{profil.anzeigename}</h1>
                    <p className="konto-handle">
                        @{profil.handle}
                        {details?.pronomen ? ` · ${details.pronomen}` : ''}
                        {profil.rolle !== 'nutzer' && <span className="profil-rolle">{profil.rolle === 'admin' ? 'Team mentat.codes' : 'Moderation'}</span>}
                    </p>
                </div>
            </div>
            {eigenes && (
                <p>
                    <Link className="button button-small" href="/konto/profil">
                        ✏️ Profil bearbeiten
                    </Link>
                </p>
            )}
            {!details ? (
                <p className="widget-note">🔒 Dieses Profil ist privat.</p>
            ) : (
                <>
                    {details.beruf && <p className="profil-beruf">💼 {details.beruf}</p>}
                    {details.bio && <p className="profil-bio">{details.bio}</p>}
                    {details.links?.length > 0 && (
                        <ul className="merk-verlauf">
                            {details.links.map((l) => (
                                <li key={l}>
                                    <a href={l} rel="nofollow ugc noopener" target="_blank">
                                        🔗 {l.replace(/^https:\/\/(www\.)?/, '').slice(0, 40)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                    <ul className="merk-stats">
                        <li>
                            <strong>{profil.punkte}</strong> Punkte
                        </li>
                        <li>
                            <strong>{abzeichen.length}</strong> Abzeichen
                        </li>
                        <li>
                            <strong>
                                {new Date(profil.erstellt).toLocaleDateString('de-DE', {
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </strong>{' '}
                            dabei seit
                        </li>
                    </ul>
                    {abzeichen.length > 0 && (
                        <>
                            <h2>🏅 Abzeichen-Vitrine</h2>
                            <ul className="merk-abzeichen">
                                {abzeichen.map((a) => {
                                    const k = ABZEICHEN_KATALOG.find(([n]) => n === a.name)
                                    return (
                                        <li key={a.name} className="hat">
                                            <Medaille emoji={k ? k[1] : '🏅'} size={56} />
                                            <strong>{a.name}</strong>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    )}
                </>
            )}
            {details && themen.length > 0 && (
                <>
                    <h2>🧵 Themen im Forum</h2>
                    <ul className="merk-verlauf">
                        {themen.map((t) => (
                            <li key={t.id}>
                                <Link href={`/forum/thema?id=${t.id}`}>{t.titel}</Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {details && kommentare.length > 0 && (
                <>
                    <h2>💬 Letzte Kommentare</h2>
                    <ul className="c-liste">
                        {kommentare.map((k) => (
                            <li key={k.id} className="c-kommentar">
                                <Link href={`${k.pfad}#kommentar-${k.id}`}>{k.text.slice(0, 140)}{k.text.length > 140 ? ' …' : ''}</Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </article>
    )
}
