'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import useKonto from '../../components/useKonto'
import { KONTO_AKTIV, supabase, bildUrl, ladeProfil } from '../../../lib/konto'
import { bildVorbereiten } from '../../../lib/bild'
import { toast } from '../../../lib/herz'

const VERLAEUFE = [
    ['sonne', 'Sonne'],
    ['meer', 'Meer'],
    ['wald', 'Wald'],
    ['nacht', 'Nacht'],
    ['beere', 'Beere'],
    ['atom', 'Atom'],
]
const FARBEN = [
    ['', 'Pink'],
    ['blau', 'Blau'],
    ['gruen', 'Grün'],
    ['lila', 'Lila'],
]
const FORMATE = { avatare: { breite: 256, hoehe: 256 }, banner: { breite: 1200, hoehe: 300 } }

export default function ProfilEditor() {
    const { bereit, user, profil } = useKonto()
    const [p, setP] = useState(null)
    const [d, setD] = useState(null)
    const [status, setStatus] = useState('')
    const [vorschau, setVorschau] = useState({})
    const [ladeFehler, setLadeFehler] = useState(false)
    // Das Formular wird pro Konto genau einmal aus der Datenbank befüllt. Spätere Profil-Updates
    // (etwa nach einem Bild-Upload) überschreiben so keine ungespeicherten Eingaben.
    const befuellt = useRef(null)

    // Kontowechsel: Formular sofort leeren, damit nie Angaben eines anderen Kontos angezeigt oder gespeichert werden.
    useEffect(() => {
        befuellt.current = null
        setP(null)
        setD(null)
        setVorschau({})
        setLadeFehler(false)
    }, [user?.id])

    useEffect(() => {
        if (!user || !profil || profil.id !== user.id || befuellt.current === user.id) return
        befuellt.current = user.id
        let gilt = true
        setP({
            handle: profil.handle,
            anzeigename: profil.anzeigename,
            banner_verlauf: profil.banner_verlauf,
            akzent: profil.akzent,
            oeffentlich: profil.oeffentlich,
            avatar_pfad: profil.avatar_pfad,
            banner_pfad: profil.banner_pfad,
        })
        supabase().then(async (sb) => {
            const { data, error } = await sb.from('profil_details').select('bio, beruf, pronomen, links').eq('id', user.id).maybeSingle()
            if (!gilt) return
            // Bei einem Fehler nie leere Felder anzeigen, sonst würde Speichern die echten Angaben überschreiben.
            if (error || !data) {
                befuellt.current = null
                return setLadeFehler(true)
            }
            setD({ bio: data?.bio || '', beruf: data?.beruf || '', pronomen: data?.pronomen || '', links: [...(data?.links || []), '', '', ''].slice(0, 3) })
        })
        return () => {
            gilt = false
        }
    }, [user, profil])

    if (!KONTO_AKTIV) return <p className="lead">Profile sind gerade noch in Vorbereitung.</p>
    if (!bereit) return <p className="widget-note">Einen Moment …</p>
    if (!user)
        return (
            <p className="konto-karte">
                Bitte zuerst <Link href="/anmelden?zurueck=/konto/profil">anmelden</Link>.
            </p>
        )
    if (ladeFehler) return <p className="konto-karte">Dein Profil konnte gerade nicht geladen werden. Bitte lade die Seite neu.</p>
    if (!p || !d) return <p className="widget-note">Lade dein Profil …</p>

    const hochladen = async (bucket, datei) => {
        if (!datei) return
        setStatus(`Bild wird vorbereitet …`)
        try {
            const blob = await bildVorbereiten(datei, FORMATE[bucket])
            const sb = await supabase()
            const pfad = `${user.id}/${Date.now()}.webp`
            const { error } = await sb.storage.from(bucket).upload(pfad, blob, { contentType: 'image/webp', upsert: false, cacheControl: '31536000' })
            if (error) throw error
            const alt = bucket === 'avatare' ? p.avatar_pfad : p.banner_pfad
            const feld = bucket === 'avatare' ? 'avatar_pfad' : 'banner_pfad'
            const { error: fehlerProfil } = await sb.from('profiles').update({ [feld]: pfad }).eq('id', user.id)
            if (fehlerProfil) {
                await sb.storage.from(bucket).remove([pfad])
                throw fehlerProfil
            }
            if (alt) await sb.storage.from(bucket).remove([alt])
            // Aufräumen: alles im eigenen Ordner außer dem neuen Bild entfernen (Reste abgebrochener Uploads)
            const { data: liste } = await sb.storage.from(bucket).list(user.id, { limit: 20 })
            const reste = (liste || []).map((o) => `${user.id}/${o.name}`).filter((x) => x !== pfad)
            if (reste.length) await sb.storage.from(bucket).remove(reste)
            // Nur die Bildfelder ändern, alle anderen (ggf. ungespeicherten) Eingaben bleiben.
            setP((x) => ({ ...x, [feld]: pfad }))
            setVorschau((v) => ({ ...v, [bucket]: URL.createObjectURL(blob) }))
            await ladeProfil()
            setStatus('')
            toast(bucket === 'avatare' ? 'Neues Profilbild gespeichert. Steht dir!' : 'Neues Banner gespeichert.', '📸')

        } catch (e) {
            setStatus(
                e.message === 'typ'
                    ? 'Bitte ein PNG-, JPG-, WebP- oder GIF-Bild wählen.'
                    : e.message === 'gross'
                      ? 'Das Bild ist größer als 15 MB. Bitte ein kleineres wählen.'
                      : 'Hochladen hat nicht geklappt. Bitte versuch es noch einmal.'
            )
        }
    }

    const bildWeg = async (bucket) => {
        const sb = await supabase()
        const feld = bucket === 'avatare' ? 'avatar_pfad' : 'banner_pfad'
        // Erst die Datei löschen: Scheitert das, bleibt der Pfad stehen und nichts verwaist unbemerkt.
        if (p[feld]) {
            const { error: fehlerDatei } = await sb.storage.from(bucket).remove([p[feld]])
            if (fehlerDatei) return setStatus('Entfernen hat nicht geklappt. Bitte versuch es noch einmal.')
        }
        const { error } = await sb.from('profiles').update({ [feld]: null }).eq('id', user.id)
        if (error) return setStatus('Entfernen hat nicht geklappt. Bitte versuch es noch einmal.')
        setP((x) => ({ ...x, [feld]: null }))
        setVorschau((v) => ({ ...v, [bucket]: null }))
        await ladeProfil()
    }

    const speichern = async (e) => {
        e.preventDefault()
        setStatus('Speichere …')
        const sb = await supabase()
        const handle = p.handle.trim().toLowerCase()
        const links = d.links.map((l) => l.trim()).filter(Boolean)
        if (links.some((l) => !/^https:\/\/\S{3,190}$/.test(l))) return setStatus('Links müssen mit https:// beginnen.')
        // Reihenfolge schützt private Angaben: wer auf privat stellt, wird zuerst privat; wer öffentlich wird,
        // wird es erst, nachdem die Details erfolgreich gespeichert sind.
        const karte = () =>
            sb
                .from('profiles')
                .update({ handle, anzeigename: p.anzeigename.trim() || 'Neues Mitglied', banner_verlauf: p.banner_verlauf, akzent: p.akzent, oeffentlich: p.oeffentlich })
                .eq('id', user.id)
        const details = () => sb.from('profil_details').update({ bio: d.bio.trim(), beruf: d.beruf.trim(), pronomen: d.pronomen.trim(), links }).eq('id', user.id)
        const kartenFehler = (e) => setStatus(e.code === '23505' ? `Der Handle @${handle} ist schon vergeben.` : 'Bitte prüf Handle und Anzeigenamen.')
        if (!p.oeffentlich) {
            const r1 = await karte()
            if (r1.error) return kartenFehler(r1.error)
            const r2 = await details()
            if (r2.error) return setStatus('Bitte prüf Bio und Links.')
        } else {
            const r2 = await details()
            if (r2.error) return setStatus('Bitte prüf Bio und Links. Dein Profil bleibt bis dahin unverändert.')
            const r1 = await karte()
            if (r1.error) return kartenFehler(r1.error)
        }
        await ladeProfil()
        setStatus('')
        toast('Profil gespeichert. Sieht großartig aus!', '✨')
    }

    const avatar = vorschau.avatare || bildUrl('avatare', p.avatar_pfad)
    const banner = vorschau.banner || bildUrl('banner', p.banner_pfad)
    return (
        <form className="profil-editor" onSubmit={speichern}>
            <div className={`profil-vorschau banner-${p.banner_verlauf}`} style={banner ? { backgroundImage: `url(${banner})` } : undefined}>
                {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt="Dein Profilbild" width="96" height="96" className="konto-avatar konto-avatar-gross" />
                ) : (
                    <span className="konto-avatar konto-avatar-gross konto-avatar-leer" aria-hidden="true">
                        {(p.anzeigename || '?').slice(0, 1).toUpperCase()}
                    </span>
                )}
                <div className="profil-vorschau-text">
                    <p className="konto-gross">{p.anzeigename || 'Neues Mitglied'}</p>
                    <p className="konto-handle">@{p.handle}</p>
                </div>
            </div>

            <fieldset>
                <legend>📸 Bilder</legend>
                <label className="profil-datei">
                    Profilbild (quadratisch, wird auf 256 × 256 zugeschnitten)
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => hochladen('avatare', e.target.files[0])} />
                </label>
                {p.avatar_pfad && (
                    <button type="button" className="button button-small" onClick={() => bildWeg('avatare')}>
                        Profilbild entfernen
                    </button>
                )}
                <label className="profil-datei">
                    Banner (breit, wird auf 1200 × 300 zugeschnitten)
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => hochladen('banner', e.target.files[0])} />
                </label>
                {p.banner_pfad && (
                    <button type="button" className="button button-small" onClick={() => bildWeg('banner')}>
                        Banner entfernen
                    </button>
                )}
                <p className="widget-note">Bilder werden vor dem Hochladen in deinem Browser neu gespeichert. Dabei gehen Standort- und Kameradaten verloren.</p>
            </fieldset>

            <fieldset>
                <legend>🪪 Wer du bist</legend>
                <label>
                    Anzeigename
                    <input value={p.anzeigename} maxLength={40} required onChange={(e) => setP({ ...p, anzeigename: e.target.value })} />
                </label>
                <label>
                    Handle (3 bis 24 Zeichen: a bis z, 0 bis 9, Unterstrich)
                    <input
                        value={p.handle}
                        pattern="[a-z0-9_]{3,24}"
                        required
                        onChange={(e) => setP({ ...p, handle: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    />
                </label>
                <label>
                    Beruf oder Rolle
                    <input value={d.beruf} maxLength={60} placeholder="z. B. Gründerin, SEO, Entwickler" onChange={(e) => setD({ ...d, beruf: e.target.value })} />
                </label>
                <label>
                    Pronomen (optional)
                    <input value={d.pronomen} maxLength={20} placeholder="z. B. sie/ihr" onChange={(e) => setD({ ...d, pronomen: e.target.value })} />
                </label>
                <label>
                    Über dich ({300 - d.bio.length} Zeichen frei)
                    <textarea value={d.bio} maxLength={300} rows={4} onChange={(e) => setD({ ...d, bio: e.target.value })} />
                </label>
                {d.links.map((l, i) => (
                    <label key={i}>
                        Link {i + 1}
                        <input
                            type="url"
                            value={l}
                            placeholder="https://"
                            onChange={(e) => {
                                const links = [...d.links]
                                links[i] = e.target.value
                                setD({ ...d, links })
                            }}
                        />
                    </label>
                ))}
            </fieldset>

            <fieldset>
                <legend>🎨 Aussehen</legend>
                <p>Banner-Farbverlauf (wenn kein Bild gewählt ist)</p>
                <div className="profil-verlaeufe" role="radiogroup" aria-label="Banner-Farbverlauf">
                    {VERLAEUFE.map(([wert, name]) => (
                        <button
                            key={wert}
                            type="button"
                            role="radio"
                            aria-checked={p.banner_verlauf === wert}
                            className={`verlauf-punkt banner-${wert}${p.banner_verlauf === wert ? ' an' : ''}`}
                            onClick={() => setP({ ...p, banner_verlauf: wert })}
                        >
                            {name}
                        </button>
                    ))}
                </div>
                <label>
                    Lieblingsfarbe für dein Profil
                    <select value={p.akzent} onChange={(e) => setP({ ...p, akzent: e.target.value })}>
                        {FARBEN.map(([wert, name]) => (
                            <option key={name} value={wert}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="konto-check">
                    <input type="checkbox" checked={p.oeffentlich} onChange={(e) => setP({ ...p, oeffentlich: e.target.checked })} /> Öffentliches Profil (aus:
                    Bio, Beruf, Pronomen, Links und Abzeichen sieht nur du)
                </label>
            </fieldset>

            {status && (
                <p className="konto-fehler" role="status">
                    {status}
                </p>
            )}
            <p className="konto-links">
                <button type="submit" className="button">
                    Profil speichern
                </button>{' '}
                <Link className="button button-small" href={`/u?h=${p.handle}`}>
                    Öffentliches Profil ansehen
                </Link>
            </p>
        </form>
    )
}
