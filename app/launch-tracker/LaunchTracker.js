'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import useKonto from '../components/useKonto'
import useLaunch from '../components/useLaunch'
import { KONTO_AKTIV } from '../../lib/konto'
import { LOKAL_EVENT, LOKAL_LAUNCH, LOKAL_KEY, STATUS, datumDe, heute, lokalLaunch, setzeLaunch, setzeLokal, uebernehmeLokal } from '../../lib/launch'
import { submitRel } from '../../lib/monetization'
import { toast } from '../../lib/herz'

const FILTER = [['alle', 'Alle'], ['offen', 'Noch offen'], ...STATUS.map(([k, name]) => [k, name]), ['faellig', 'Erinnerung fällig']]
const STATUS_NAME = Object.fromEntries(STATUS.map(([k, name, emoji]) => [k, `${emoji} ${name}`]))

// Tracker im Browser (ohne Konto): liest den lokalen Stand und folgt Änderungen aus der Tabelle oder anderen Tabs.
function useLokalLaunch() {
    const [eintraege, setEintraege] = useState(() => new Map())
    useEffect(() => {
        const laden = () => setEintraege(lokalLaunch())
        const aufStorage = (e) => (!e.key || e.key === LOKAL_LAUNCH || e.key === LOKAL_KEY) && laden()
        laden()
        window.addEventListener(LOKAL_EVENT, laden)
        window.addEventListener('storage', aufStorage)
        return () => {
            window.removeEventListener(LOKAL_EVENT, laden)
            window.removeEventListener('storage', aufStorage)
        }
    }, [])
    return eintraege
}

function Zeile({ v, e, speichernIn }) {
    const [notiz, setNotiz] = useState(e?.notiz || '')
    useEffect(() => setNotiz(e?.notiz || ''), [e?.notiz])
    const speichern = async (felder) => {
        const ok = await speichernIn(v.slug, felder)
        if (!ok) toast('Das hat nicht geklappt. Bitte versuch es noch einmal.', '⚠️')
    }
    const faellig = e?.erinnerung && e.erinnerung <= heute() && e.status !== 'live'
    return (
        <li className={`lt-zeile status-${e?.status || 'offen'}${faellig ? ' lt-faellig' : ''}`}>
            <div className="lt-kopf">
                <Link href={`/verzeichnis/${v.slug}`} className="lt-name">
                    {v.name}
                </Link>
                <span className="widget-note">DR {v.domain_rating}</span>
                <a href={v.submission_link} target="_blank" rel={submitRel(v)} className="c-link">
                    Einreichen ↗{v.affiliate && <sup title="Partnerlink: Wir erhalten ggf. eine Provision.">*</sup>}
                </a>
            </div>
            <div className="lt-felder">
                <label>
                    Status
                    <select value={e?.status || ''} onChange={(ev) => speichern({ status: ev.target.value || 'geplant' })}>
                        {!e && <option value="">Noch offen</option>}
                        {STATUS.map(([k, name, emoji]) => (
                            <option key={k} value={k}>
                                {emoji} {name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Erinnerung
                    <input type="date" value={e?.erinnerung || ''} min="2020-01-01" max="2100-12-31" onChange={(ev) => speichern({ erinnerung: ev.target.value || null })} />
                </label>
                <label className="lt-notiz">
                    Notiz
                    <input
                        value={notiz}
                        maxLength={500}
                        placeholder="z. B. Login, Antwort abwarten, Preis"
                        onChange={(ev) => setNotiz(ev.target.value)}
                        onBlur={() => notiz !== (e?.notiz || '') && speichern({ notiz })}
                    />
                </label>
            </div>
            {faellig && <p className="lt-hinweis">⏰ Erinnerung fällig seit {datumDe(e.erinnerung)}</p>}
        </li>
    )
}

export default function LaunchTracker({ verzeichnisse }) {
    const { bereit: kontoBereit, user } = useKonto()
    const launch = useLaunch(true)
    const lokal = useLokalLaunch()
    const [filter, setFilter] = useState('alle')
    const [suche, setSuche] = useState('')
    const erlaubt = useMemo(() => new Set(verzeichnisse.map((v) => v.slug)), [verzeichnisse])

    // Mit Konto liegt der Tracker in der Cloud, sonst in diesem Browser.
    const imKonto = Boolean(KONTO_AKTIV && user)
    const eintraege = imKonto ? launch.eintraege : lokal
    const speichernIn = imKonto ? (slug, felder) => setzeLaunch(launch.uid, slug, felder) : async (slug, felder) => setzeLokal(slug, felder)

    const zahlen = useMemo(() => {
        const z = { offen: 0, faellig: 0 }
        STATUS.forEach(([k]) => (z[k] = 0))
        const h = heute()
        verzeichnisse.forEach((v) => {
            const e = eintraege.get(v.slug)
            if (!e) z.offen++
            else {
                z[e.status]++
                if (e.erinnerung && e.erinnerung <= h && e.status !== 'live') z.faellig++
            }
        })
        return z
    }, [verzeichnisse, eintraege])

    const liste = useMemo(() => {
        const q = suche.trim().toLowerCase()
        const h = heute()
        return verzeichnisse.filter((v) => {
            const e = eintraege.get(v.slug)
            if (q && !v.name.toLowerCase().includes(q)) return false
            if (filter === 'alle') return true
            if (filter === 'offen') return !e
            if (filter === 'faellig') return e?.erinnerung && e.erinnerung <= h && e.status !== 'live'
            return e?.status === filter
        })
    }, [verzeichnisse, eintraege, filter, suche])

    if (KONTO_AKTIV && !kontoBereit) return <p className="widget-note">Einen Moment …</p>
    if (imKonto && (!launch.aktiv || !launch.bereit)) return <p className="widget-note">Lade deinen Launch-Tracker …</p>
    if (imKonto && launch.fehler) return <p className="konto-karte">Dein Launch-Tracker konnte gerade nicht geladen werden. Bitte lade die Seite neu.</p>

    const offenLokal = imKonto ? [...lokal.keys()].filter((s) => erlaubt.has(s) && !launch.eintraege.has(s)).length : 0
    const uebernehmen = async () => {
        const n = await uebernehmeLokal(launch.uid, erlaubt)
        toast(n > 0 ? `${n} ${n === 1 ? 'Eintrag' : 'Einträge'} aus diesem Browser übernommen.` : n < 0 ? 'Das hat nicht geklappt. Bitte versuch es noch einmal.' : 'Alles schon da.', n < 0 ? '⚠️' : '☁️')
    }
    const exportieren = () => {
        const zeilen = [['Verzeichnis', 'Website', 'Einreichung', 'Status', 'Erinnerung', 'Notiz', 'Geändert']]
        verzeichnisse.forEach((v) => {
            const e = eintraege.get(v.slug)
            zeilen.push([v.name, v.link, v.submission_link, e ? STATUS.find(([k]) => k === e.status)?.[1] : 'Offen', e?.erinnerung || '', e?.notiz || '', e?.aktualisiert ? e.aktualisiert.slice(0, 10) : ''])
        })
        const csv = zeilen.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(';')).join('\n')
        const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }))
        const a = document.createElement('a')
        a.href = url
        a.download = 'mentat-codes-launch-tracker.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <>
            {!imKonto && (
                <div className="konto-karte">
                    <p>
                        <strong>Dein Tracker liegt nur in diesem Browser.</strong> Kein Konto nötig, nichts geht an einen Server. Häkchen aus der{' '}
                        <Link href="/#alle">Tabelle auf der Startseite</Link> stehen hier als „{STATUS_NAME.eingereicht}“. Leerst du den Browser-Speicher, ist der Stand weg: Sichere ihn
                        ab und zu als CSV.
                    </p>
                    {KONTO_AKTIV && (
                        <p className="konto-links">
                            <Link className="button button-small" href="/anmelden?zurueck=/launch-tracker">
                                Mit Konto auf allen Geräten nutzen
                            </Link>
                        </p>
                    )}
                </div>
            )}
            <ul className="lt-zahlen" aria-label="Überblick">
                {STATUS.map(([k, name, emoji]) => (
                    <li key={k}>
                        <strong>{zahlen[k]}</strong> {emoji} {name}
                    </li>
                ))}
                <li>
                    <strong>{zahlen.offen}</strong> Noch offen
                </li>
            </ul>
            {zahlen.faellig > 0 && (
                <p className="lt-hinweis">
                    ⏰ {zahlen.faellig} {zahlen.faellig === 1 ? 'Erinnerung ist' : 'Erinnerungen sind'} fällig.{' '}
                    <button type="button" className="c-link" onClick={() => setFilter('faellig')}>
                        Anzeigen
                    </button>
                </p>
            )}
            {offenLokal > 0 && (
                <p className="konto-karte">
                    {offenLokal === 1
                        ? 'In diesem Browser steht 1 Verzeichnis im Tracker, das noch nicht im Konto ist.'
                        : `In diesem Browser stehen ${offenLokal} Verzeichnisse im Tracker, die noch nicht im Konto sind.`}{' '}
                    <button type="button" className="button button-small" onClick={uebernehmen}>
                        Ins Konto übernehmen
                    </button>
                </p>
            )}
            <div className="f-leiste">
                <label className="f-suche">
                    <span className="sr-only">Verzeichnis suchen</span>
                    <input type="search" value={suche} placeholder="Verzeichnis suchen …" onChange={(e) => setSuche(e.target.value)} />
                </label>
                <button type="button" className="button button-small" onClick={exportieren}>
                    Als CSV exportieren
                </button>
            </div>
            <div className="f-sortierung" role="group" aria-label="Filter">
                {FILTER.map(([k, name]) => (
                    <button key={k} type="button" className={`c-reaktion${filter === k ? ' an' : ''}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>
                        {name}
                    </button>
                ))}
            </div>
            {liste.length === 0 ? (
                <p className="c-leer">Hier ist gerade nichts. {filter !== 'alle' && 'Probier einen anderen Filter.'}</p>
            ) : (
                <ul className="lt-liste">
                    {liste.map((v) => (
                        <Zeile key={v.slug} v={v} e={eintraege.get(v.slug)} speichernIn={speichernIn} />
                    ))}
                </ul>
            )}
            <p className="widget-note">
                Häkchen in der Tabelle auf der Startseite setzen hier den Status „{STATUS_NAME.eingereicht}“. Partnerlinks sind mit * markiert (<Link href="/transparenz">Transparenz</Link>).
            </p>
        </>
    )
}
