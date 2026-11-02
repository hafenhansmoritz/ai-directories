'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useKonto from '../components/useKonto'
import { KONTO_AKTIV, supabase, bildUrl } from '../../lib/konto'
import { toast } from '../../lib/herz'
import { lokalLeeren } from '../../lib/sync'

// Kontoseite: Überblick, Einwilligungen, Datenexport, Abmelden und Konto löschen.
export default function Konto() {
    const router = useRouter()
    const { bereit, user, profil } = useKonto()
    const [konto, setKonto] = useState(null)
    const [zahlen, setZahlen] = useState(null)
    const [loeschen, setLoeschen] = useState('')

    useEffect(() => {
        // Kontowechsel: alte Werte sofort weg, späte Antworten des vorigen Kontos verwerfen.
        setKonto(null)
        setZahlen(null)
        if (!user) return
        let gilt = true
        supabase().then(async (sb) => {
            const { data } = await sb.from('konten').select('newsletter, angebote, plan, regeln_akzeptiert').eq('id', user.id).maybeSingle()
            if (!gilt) return
            setKonto(data)
            const { data: items } = await sb.from('saved_items').select('art').eq('user_id', user.id)
            const { count } = await sb.from('badges').select('name', { count: 'exact', head: true }).eq('user_id', user.id)
            if (!gilt) return
            const z = { merk: 0, herz: 0, gelesen: 0, abzeichen: count || 0 }
            ;(items || []).forEach((i) => (z[i.art] = (z[i.art] || 0) + 1))
            setZahlen(z)
        })
        return () => {
            gilt = false
        }
    }, [user?.id])

    if (!KONTO_AKTIV) return <p className="lead">Konten sind gerade noch in Vorbereitung.</p>
    if (!bereit) return <p className="widget-note">Einen Moment …</p>
    if (!user)
        return (
            <p className="konto-karte">
                Du bist nicht angemeldet. <Link href="/anmelden?zurueck=/konto">Jetzt anmelden oder kostenlos registrieren</Link>.
            </p>
        )

    const umschalten = async (feld) => {
        if (!konto) return
        const sb = await supabase()
        const neu = !konto[feld]
        const { error } = await sb.from('konten').update({ [feld]: neu }).eq('id', user.id)
        if (error) return toast('Das hat nicht geklappt. Bitte versuch es noch einmal.', '⚠️')
        setKonto({ ...konto, [feld]: neu })
        toast(neu ? 'Gespeichert. Danke für dein Vertrauen!' : 'Abbestellt. Kein Problem.', neu ? '💌' : '👍')
    }

    const exportieren = async () => {
        const sb = await supabase()
        const tabellen = {}
        for (const [name, spalte] of [
            ['profiles', 'id'],
            ['profil_details', 'id'],
            ['konten', 'id'],
            ['einwilligungs_log', 'user_id'],
            ['saved_items', 'user_id'],
            ['badges', 'user_id'],
            ['launch_eintraege', 'user_id'],
            ['stack_eintraege', 'user_id'],
            ['comments', 'user_id'],
            ['forum_themen', 'user_id'],
            ['forum_beitraege', 'user_id'],
            ['reaktionen', 'user_id'],
            ['thema_abos', 'user_id'],
            ['meldungen', 'melder'],
            ['benachrichtigungen', 'user_id'],
        ]) {
            // Seitenweise laden, damit auch große Sammlungen vollständig im Export landen.
            const zeilen = []
            for (let von = 0; ; von += 1000) {
                const { data, error } = await sb.from(name).select('*').eq(spalte, user.id).range(von, von + 999)
                if (error) return toast('Der Export ist unvollständig fehlgeschlagen. Bitte versuch es noch einmal.', '⚠️')
                zeilen.push(...(data || []))
                if (!data || data.length < 1000) break
            }
            tabellen[name] = zeilen
        }
        const datei = new Blob([JSON.stringify({ exportiert: new Date().toISOString(), email: user.email, ...tabellen }, null, 2)], { type: 'application/json' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(datei)
        a.download = 'mentat-codes-meine-daten.json'
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const abmelden = async () => {
        const sb = await supabase()
        await sb.auth.signOut()
        lokalLeeren()
        toast('Bis bald! Deine Sammlung bleibt im Konto gespeichert.', '👋')
        router.push('/')
    }

    const endgueltigLoeschen = async () => {
        const sb = await supabase()
        // Eigene Bilder zuerst entfernen, danach das Konto mit allen Daten.
        for (const bucket of ['avatare', 'banner']) {
            const { data, error } = await sb.storage.from(bucket).list(user.id)
            if (error) return toast('Deine Bilder konnten nicht gelöscht werden. Dein Konto bleibt bestehen, bitte versuch es gleich noch einmal.', '⚠️')
            if (data?.length) {
                const { error: weg } = await sb.storage.from(bucket).remove(data.map((f) => `${user.id}/${f.name}`))
                if (weg) return toast('Deine Bilder konnten nicht gelöscht werden. Dein Konto bleibt bestehen, bitte versuch es gleich noch einmal.', '⚠️')
            }
        }
        const { error } = await sb.rpc('konto_loeschen')
        if (error) return toast('Löschen hat nicht geklappt. Schreib uns bitte über das Kontaktformular.', '⚠️')
        await sb.auth.signOut()
        lokalLeeren()
        toast('Dein Konto und alle Daten sind gelöscht. Danke, dass du da warst.', '🕊️')
        router.push('/')
    }

    const bild = bildUrl('avatare', profil?.avatar_pfad)
    return (
        <>
            <section className={`konto-kopf banner-${profil?.banner_verlauf || 'sonne'}`}>
                {bild ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={bild} alt="" width="88" height="88" className="konto-avatar konto-avatar-gross" />
                ) : (
                    <span className="konto-avatar konto-avatar-gross konto-avatar-leer" aria-hidden="true">
                        {(profil?.anzeigename || '?').slice(0, 1).toUpperCase()}
                    </span>
                )}
                <div>
                    <p className="konto-gross">{profil?.anzeigename || 'Neues Mitglied'}</p>
                    <p className="konto-handle">@{profil?.handle || '…'}</p>
                    <p className="widget-note">
                        Plan: <strong>{konto?.plan === 'pro' ? 'Pro' : konto?.plan === 'team' ? 'Team' : 'Gratis'}</strong> · angemeldet als {user.email}
                    </p>
                </div>
            </section>

            <ul className="merk-stats">
                <li>
                    <strong>{zahlen?.merk ?? '…'}</strong> gemerkte Seiten
                </li>
                <li>
                    <strong>{zahlen?.herz ?? '…'}</strong> Herzen
                </li>
                <li>
                    <strong>{zahlen?.gelesen ?? '…'}</strong> gelesene Artikel
                </li>
                <li>
                    <strong>{zahlen?.abzeichen ?? '…'}</strong> Abzeichen
                </li>
            </ul>
            <p className="konto-links">
                <Link className="button" href="/merkliste">
                    ⭐ Merkliste und Sammelalbum
                </Link>{' '}
                <Link className="button" href="/konto/profil">
                    🎨 Profil bearbeiten
                </Link>{' '}
                <Link className="button" href="/launch-tracker">
                    🚀 Launch-Tracker
                </Link>{' '}
                <Link className="button" href="/mein-stack">
                    🧰 Mein KI-Stack
                </Link>
            </p>

            {konto && !konto.regeln_akzeptiert && (
                <div className="konto-karte konto-regeln">
                    <p>
                        <strong>Fast geschafft!</strong> Bevor du kommentieren und im Forum schreiben kannst, bestätige bitte einmal die{' '}
                        <Link href="/community-regeln">Community-Regeln</Link> und die <Link href="/datenschutz">Datenschutzerklärung</Link>.
                    </p>
                    <button
                        type="button"
                        className="button"
                        onClick={async () => {
                            const sb = await supabase()
                            const { error } = await sb.rpc('regeln_akzeptieren')
                            if (error) return toast('Das hat nicht geklappt. Bitte versuch es noch einmal.', '⚠️')
                            setKonto({ ...konto, regeln_akzeptiert: new Date().toISOString() })
                            toast('Danke! Jetzt kannst du überall mitreden.', '🎉')
                        }}
                    >
                        Regeln gelesen, ich bin dabei
                    </button>
                </div>
            )}

            <h2>💌 Deine Einwilligungen</h2>
            {konto ? (
                <ul className="konto-schalter">
                    <li>
                        <label className="konto-check">
                            <input type="checkbox" checked={konto.newsletter} onChange={() => umschalten('newsletter')} /> Newsletter mit neuen KI-Tools, News
                            und Deals
                        </label>
                    </li>
                    <li>
                        <label className="konto-check">
                            <input type="checkbox" checked={konto.angebote} onChange={() => umschalten('angebote')} /> Persönliche Empfehlungen passend zu
                            meinen gespeicherten Tools
                        </label>
                    </li>
                </ul>
            ) : (
                <p className="widget-note">Lade …</p>
            )}
            <p className="widget-note">Jede Änderung wird mit Datum protokolliert, damit du und wir jederzeit nachvollziehen können, was gilt.</p>

            <h2>🗂️ Deine Daten</h2>
            <p>Alles, was wir über dein Konto speichern, kannst du hier als Datei herunterladen.</p>
            <p>
                <button type="button" className="button button-small" onClick={exportieren}>
                    Meine Daten herunterladen (JSON)
                </button>{' '}
                <button type="button" className="button button-small" onClick={abmelden}>
                    Abmelden
                </button>
            </p>

            <details className="konto-gefahr">
                <summary>Konto löschen</summary>
                <p>
                    Das löscht dein Konto, dein Profil, deine Bilder und deine gespeicherte Sammlung endgültig. Deine Beiträge im Forum werden anonymisiert.
                    Tipp ein <strong>LÖSCHEN</strong> zur Bestätigung.
                </p>
                <label htmlFor="konto-loeschen" className="sr-only">
                    Bestätigung
                </label>
                <input id="konto-loeschen" value={loeschen} onChange={(e) => setLoeschen(e.target.value)} placeholder="LÖSCHEN" />{' '}
                <button type="button" className="button button-small konto-rot" disabled={loeschen !== 'LÖSCHEN'} onClick={endgueltigLoeschen}>
                    Endgültig löschen
                </button>
            </details>
        </>
    )
}
