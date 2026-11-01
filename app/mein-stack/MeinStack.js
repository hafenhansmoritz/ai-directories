'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import useKonto from '../components/useKonto'
import { KONTO_AKTIV } from '../../lib/konto'
import { toast } from '../../lib/herz'
import { partnerRel } from '../../lib/monetization'
import PartnerHinweis from '../components/PartnerHinweis'
import {
    beobachteStack,
    bereinige,
    ladeStack,
    lokalLesen,
    lokalSchreiben,
    proMonat,
    stackAendern,
    stackEntfernen,
    stackHinzu,
    stackTipps,
    stackUebernehmen,
    summen,
} from '../../lib/stack'

const geld = (betrag, waehrung) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: waehrung, maximumFractionDigits: 2 }).format(betrag)
// auto: Tarif und Preis wurden aus ABO_PREISE vorbelegt und werden beim Wechsel des Tools ersetzt.
const LEER = { name: '', tool_slug: null, tarif: '', betrag: '', waehrung: 'EUR', intervall: 'monat', notiz: '', auto: false }

function Zeile({ e, tool, aendern, entfernen }) {
    const [betrag, setBetrag] = useState(String(e.betrag).replace('.', ','))
    const [tarif, setTarif] = useState(e.tarif)
    // Gespeicherter Stand gewinnt, etwa wenn ein Speichern scheitert und zurückgerollt wird.
    useEffect(() => setBetrag(String(e.betrag).replace('.', ',')), [e.betrag])
    useEffect(() => setTarif(e.tarif), [e.tarif])
    return (
        <li className="st-zeile">
            <div className="st-kopf">
                {tool ? (
                    <Link href={`/tools/${tool.slug}`} className="lt-name">
                        {e.name}
                    </Link>
                ) : (
                    <strong className="lt-name">{e.name}</strong>
                )}
                {tool && <span className="widget-note">{tool.category}</span>}
                <span className="st-monat">{geld(proMonat(e), e.waehrung)} im Monat</span>
            </div>
            <div className="lt-felder st-felder">
                <label>
                    Tarif
                    <input value={tarif} maxLength={60} placeholder="z. B. Pro" onChange={(ev) => setTarif(ev.target.value)} onBlur={() => tarif !== e.tarif && aendern(e.id, { tarif })} />
                </label>
                <label>
                    Betrag
                    <input
                        inputMode="decimal"
                        value={betrag}
                        onChange={(ev) => setBetrag(ev.target.value)}
                        onBlur={() => {
                            const neu = bereinige({ betrag }).betrag
                            setBetrag(String(neu).replace('.', ','))
                            if (neu !== Number(e.betrag)) aendern(e.id, { betrag: neu })
                        }}
                    />
                </label>
                <label>
                    Währung
                    <select value={e.waehrung} onChange={(ev) => aendern(e.id, { waehrung: ev.target.value })}>
                        <option value="EUR">Euro</option>
                        <option value="USD">US-Dollar</option>
                    </select>
                </label>
                <label>
                    Abrechnung
                    <select value={e.intervall} onChange={(ev) => aendern(e.id, { intervall: ev.target.value })}>
                        <option value="monat">pro Monat</option>
                        <option value="jahr">pro Jahr</option>
                    </select>
                </label>
                <button type="button" className="c-link st-weg" onClick={() => entfernen(e.id)} aria-label={`${e.name} entfernen`}>
                    Entfernen
                </button>
            </div>
        </li>
    )
}

export default function MeinStack({ tools, abo, stand, vergleiche = [] }) {
    const { bereit: kontoBereit, user } = useKonto()
    const [wolke, setWolke] = useState({ uid: null, bereit: false, fehler: false, eintraege: [] })
    const [lokal, setLokal] = useState(null)
    const [neu, setNeu] = useState(LEER)
    const [importLaeuft, setImportLaeuft] = useState(false)
    const [sendet, setSendet] = useState(false)
    const toolBySlug = useMemo(() => new Map(tools.map((t) => [t.slug, t])), [tools])
    const toolByName = useMemo(() => new Map(tools.map((t) => [t.name.toLowerCase(), t])), [tools])

    useEffect(() => beobachteStack(setWolke), [])
    useEffect(() => setLokal(lokalLesen()), [])
    useEffect(() => {
        if (KONTO_AKTIV && user) ladeStack(user.id, true)?.catch(() => {})
    }, [user?.id])

    const imKonto = Boolean(KONTO_AKTIV && user && wolke.uid === user.id)
    const eintraege = imKonto ? wolke.eintraege : lokal || []
    const s = useMemo(() => summen(eintraege), [eintraege])
    const tipps = useMemo(() => stackTipps(eintraege, tools, abo), [eintraege, tools, abo])
    const gewaehlt = neu.tool_slug && toolBySlug.get(neu.tool_slug)
    // Doppelte Kategorie: passenden Tool-Vergleich finden, in dem mindestens zwei der Tools vorkommen
    const vergleichFuer = (kategorie) => {
        const slugs = eintraege.map((e) => e.tool_slug).filter((sl) => sl && toolBySlug.get(sl)?.category === kategorie)
        return vergleiche.find((c) => c.tools.filter((sl) => slugs.includes(sl)).length >= 2) || null
    }
    const partnerSichtbar = tipps.some((t) => t.art === 'jaehrlich' && toolBySlug.get(t.slug)?.partner)

    if (lokal === null || (KONTO_AKTIV && !kontoBereit)) return <p className="widget-note">Lade deinen Stack …</p>
    if (KONTO_AKTIV && user && (!imKonto || !wolke.bereit)) return <p className="widget-note">Lade deinen Stack aus dem Konto …</p>
    if (imKonto && wolke.fehler) return <p className="konto-karte">Dein Stack konnte gerade nicht geladen werden. Bitte lade die Seite neu.</p>

    const fehler = () => toast('Das hat nicht geklappt. Bitte versuch es noch einmal.', '⚠️')
    const lokalAendern = (f) =>
        setLokal((l) => {
            const n = f(l)
            lokalSchreiben(n)
            return n
        })
    const hinzu = async (e) => {
        e.preventDefault()
        const eintrag = bereinige(neu)
        if (!eintrag.name) return toast('Bitte gib einen Namen ein.', '✍️')
        if (eintraege.length >= 100) return toast('Mehr als 100 Tools passen nicht in den Stack.', '🧰')
        if (sendet) return
        if (imKonto) {
            setSendet(true)
            const ok = await stackHinzu(user.id, eintrag).finally(() => setSendet(false))
            if (!ok) return fehler()
        } else lokalAendern((l) => [...l, { ...eintrag, id: `l${Date.now()}${Math.random().toString(36).slice(2, 6)}` }])
        setNeu(LEER)
        toast(`${eintrag.name} ist im Stack.`, '🧰')
    }
    const aendern = async (id, felder) => {
        if (imKonto) return (await stackAendern(user.id, id, felder)) || fehler()
        lokalAendern((l) => l.map((x) => (x.id === id ? { ...x, ...bereinige({ ...x, ...felder }) } : x)))
    }
    const entfernen = async (id) => {
        if (imKonto) return (await stackEntfernen(user.id, id)) || fehler()
        lokalAendern((l) => l.filter((x) => x.id !== id))
    }
    const uebernehmen = async () => {
        if (importLaeuft) return
        setImportLaeuft(true)
        const n = await stackUebernehmen(user.id).finally(() => setImportLaeuft(false))
        if (n > 0) {
            setLokal(lokalLesen())
            toast(`${n} ${n === 1 ? 'Tool' : 'Tools'} aus dem Browser übernommen.`, '☁️')
        } else toast(n === -2 ? 'Dein Stack im Konto ist voll (100 Tools).' : 'Das hat nicht geklappt. Bitte versuch es noch einmal.', '⚠️')
    }
    const toolWaehlen = (name) => {
        const t = toolByName.get(name.trim().toLowerCase())
        // Automatisch vorbelegte Werte gehören zum vorher gewählten Tool und werden zurückgesetzt.
        const basis = neu.auto ? { tarif: '', betrag: '', waehrung: 'EUR', intervall: 'monat', auto: false } : {}
        if (!t) return setNeu({ ...neu, ...basis, name, tool_slug: null })
        const a = abo.find((x) => x.slug === t.slug)
        const frei = neu.auto || !neu.betrag
        setNeu({
            ...neu,
            ...basis,
            name: t.name,
            tool_slug: t.slug,
            ...(a && frei ? { tarif: a.plan, betrag: String(a.monatlich).replace('.', ','), waehrung: 'USD', intervall: 'monat', auto: true } : {}),
        })
    }

    return (
        <>
            {KONTO_AKTIV && !user && (
                <p className="konto-karte">
                    Dein Stack liegt gerade nur in diesem Browser. <Link href="/anmelden?zurueck=/mein-stack">Mit kostenlosem Konto</Link> hast du ihn auf allen Geräten.
                </p>
            )}
            {imKonto && lokal.length > 0 && (
                <p className="konto-karte">
                    {lokal.length === 1 ? 'In diesem Browser liegt noch 1 Tool' : `In diesem Browser liegen noch ${lokal.length} Tools`} aus deinem Stack ohne Konto.{' '}
                    <button type="button" className="button button-small" onClick={uebernehmen} disabled={importLaeuft}>
                        {importLaeuft ? 'Übernehme …' : 'Ins Konto übernehmen'}
                    </button>
                </p>
            )}

            <form className="st-neu konto-karte" onSubmit={hinzu}>
                <p className="konto-gross">Tool hinzufügen</p>
                <div className="lt-felder st-felder">
                    <label className="st-name">
                        Tool
                        <input list="st-tools" value={neu.name} maxLength={80} placeholder="z. B. ChatGPT oder eigenes Tool" onChange={(e) => toolWaehlen(e.target.value)} required />
                        <datalist id="st-tools">
                            {tools.map((t) => (
                                <option key={t.slug} value={t.name} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Tarif
                        <input value={neu.tarif} maxLength={60} placeholder="z. B. Pro" onChange={(e) => setNeu({ ...neu, tarif: e.target.value, auto: false })} />
                    </label>
                    <label>
                        Betrag
                        <input inputMode="decimal" value={neu.betrag} placeholder="0,00" onChange={(e) => setNeu({ ...neu, betrag: e.target.value, auto: false })} />
                    </label>
                    <label>
                        Währung
                        <select value={neu.waehrung} onChange={(e) => setNeu({ ...neu, waehrung: e.target.value, auto: false })}>
                            <option value="EUR">Euro</option>
                            <option value="USD">US-Dollar</option>
                        </select>
                    </label>
                    <label>
                        Abrechnung
                        <select value={neu.intervall} onChange={(e) => setNeu({ ...neu, intervall: e.target.value, auto: false })}>
                            <option value="monat">pro Monat</option>
                            <option value="jahr">pro Jahr</option>
                        </select>
                    </label>
                    <button type="submit" className="button" disabled={sendet}>
                        {sendet ? 'Speichere …' : 'Hinzufügen'}
                    </button>
                </div>
                {gewaehlt?.price_from && (
                    <p className="widget-note">
                        Laut Anbieter ab {gewaehlt.price_from}
                        {gewaehlt.quelle && (
                            <>
                                {' '}
                                (
                                <a href={gewaehlt.quelle} target="_blank" rel="nofollow noopener noreferrer">
                                    Quelle
                                </a>
                                , Stand {stand})
                            </>
                        )}
                        . Trag ein, was du wirklich zahlst.
                    </p>
                )}
            </form>

            {eintraege.length === 0 ? (
                <p className="c-leer">Noch leer. Fang mit dem Tool an, das du am häufigsten nutzt. 🧰</p>
            ) : (
                <>
                    <ul className="lt-zahlen st-summen" aria-label="Summen">
                        {Object.entries(s).map(([w, x]) => (
                            <li key={w}>
                                <strong>{geld(x.monat, w)}</strong> im Monat
                                <span className="widget-note">
                                    {' '}
                                    · {geld(x.jahr, w)} im Jahr · {x.anzahl} {x.anzahl === 1 ? 'Tool' : 'Tools'}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <ul className="lt-liste">
                        {eintraege.map((e) => (
                            <Zeile key={e.id} e={e} tool={e.tool_slug && toolBySlug.get(e.tool_slug)} aendern={aendern} entfernen={entfernen} />
                        ))}
                    </ul>
                    <h2>💡 Spar-Hinweise</h2>
                    {tipps.length === 0 ? (
                        <p className="widget-note">Keine Hinweise. Dein Stack wirkt schlank, oder deine Tools haben noch keinen Steckbrief bei uns.</p>
                    ) : (
                        <ul className="st-tipps">
                            {tipps.map((t, i) => (
                                <li key={i}>
                                    {t.art === 'doppelt' && (
                                        <>
                                            🔁 <strong>{t.namen.join(' und ')}</strong> sind beide in der Kategorie {t.kategorie}. Brauchst du wirklich beide?
                                            {vergleichFuer(t.kategorie) && (
                                                <>
                                                    {' '}
                                                    <Link href={`/tool-vergleiche/${vergleichFuer(t.kategorie).slug}`}>Im Vergleich: {vergleichFuer(t.kategorie).title} →</Link>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {t.art === 'jaehrlich' && (
                                        <>
                                            📅 <strong>{t.name}</strong>: Laut Anbieter kostet {t.plan} bei jährlicher Zahlung {geld(t.jaehrlich, 'USD')} im Monat
                                            {t.ersparnis
                                                ? `, du zahlst gerade ${geld(t.betrag, 'USD')}. Das wären ${geld(t.ersparnis, 'USD')} weniger im Jahr`
                                                : ` statt ${geld(t.monatlich, 'USD')} bei monatlicher Zahlung`}
                                            . Lohnt sich, wenn du das Tool das ganze Jahr nutzt.
                                            {toolBySlug.get(t.slug)?.href && (
                                                <>
                                                    {' '}
                                                    <a href={toolBySlug.get(t.slug).href} target="_blank" rel={partnerRel(toolBySlug.get(t.slug).partner)}>
                                                        Tarif bei {t.name} umstellen ↗{toolBySlug.get(t.slug).partner && <sup>*</sup>}
                                                    </a>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {t.art === 'gratis' && (
                                        <>
                                            🆓 <strong>{t.name}</strong> hat laut <Link href={`/tools/${t.slug}`}>Steckbrief</Link> auch einen Gratis-Tarif. Vielleicht reicht der für dich?
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    <PartnerHinweis zeigen={partnerSichtbar} />
                </>
            )}
            <p className="widget-note">{imKonto ? 'Gespeichert in deinem Konto.' : 'Gespeichert nur in diesem Browser.'}</p>
        </>
    )
}
