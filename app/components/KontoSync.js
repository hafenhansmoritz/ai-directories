'use client'

import { useEffect } from 'react'
import useKonto from './useKonto'
import { supabase, istAktuell } from '../../lib/konto'
import { erstAbgleich, schreibeNach, SYNC_KEYS } from '../../lib/sync'
import { toast } from '../../lib/herz'

// Hält die Browser-Sammlung mit dem Konto synchron, sobald jemand angemeldet ist.
export default function KontoSync() {
    const { user } = useKonto()
    useEffect(() => {
        if (!user) return
        let aktiv = true
        const offen = new Map()
        let sb = null
        const gilt = () => aktiv && istAktuell(user.id)
        // sessionStorage kann gesperrt sein (privates Fenster); der Abgleich läuft trotzdem.
        const sitzungLesen = () => {
            try {
                return sessionStorage.getItem('mentat-sync')
            } catch {
                return null
            }
        }
        const sitzungMerken = () => {
            try {
                sessionStorage.setItem('mentat-sync', user.id)
            } catch {}
        }
        supabase()
            .then(async (client) => {
                sb = client
                if (!sb || !aktiv) return
                const schon = sitzungLesen() === user.id
                const ok = await erstAbgleich(sb, user.id, gilt).catch(() => false)
                if (ok && !schon) {
                    sitzungMerken()
                    toast('Deine Merkliste, Herzen und Abzeichen sind jetzt in deinem Konto gesichert.', '☁️')
                }
            })
            .catch(() => {})
        const geaendert = (e) => {
            const key = e.detail?.key
            if (!sb || !SYNC_KEYS.includes(key)) return
            clearTimeout(offen.get(key))
            offen.set(key, setTimeout(() => gilt() && schreibeNach(sb, user.id, key, gilt).catch(() => {}), 800))
        }
        window.addEventListener('mentat-speicher', geaendert)
        return () => {
            aktiv = false
            window.removeEventListener('mentat-speicher', geaendert)
            offen.forEach((t) => clearTimeout(t))
        }
    }, [user])
    return null
}
