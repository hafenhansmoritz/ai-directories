'use client'

import dynamic from 'next/dynamic'

// Community-Bausteine (Glocke, Kommentare, Konto-Abgleich) nur laden, wenn Konten eingeschaltet sind.
// Ohne Schalter landet ihr Code nicht im Layout-Bündel, das jede Seite lädt; mit Schalter kommt er als eigener Teil nach.
// Bewusst direkt aus process.env gelesen: So ersetzt der Build den Wert und wirft den ungenutzten Zweig weg.
const AN = process.env.NEXT_PUBLIC_KONTO === '1' && process.env.NEXT_PUBLIC_KONTO_AVV === '1'
const nichts = () => null

export const Glocke = AN ? dynamic(() => import('./community/Glocke'), { ssr: false }) : nichts
export const Kommentare = AN ? dynamic(() => import('./community/Kommentare'), { ssr: false }) : nichts
export const KontoSync = AN ? dynamic(() => import('./KontoSync'), { ssr: false }) : nichts
