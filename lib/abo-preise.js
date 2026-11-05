// Abo-Preise für den Rechner „Monatlich oder jährlich?“. Nur Tools, für die db/tools.json (laut Anbieter)
// sowohl einen Monatspreis bei monatlicher Zahlung als auch einen Monatspreis bei jährlicher Zahlung nennt.
// Werte in US-Dollar pro Monat, Quelle: Feld price_from des jeweiligen Steckbriefs.
export const ABO_PREISE = [
    { slug: 'claude', name: 'Claude', plan: 'Pro', monatlich: 20, jaehrlich: 17 },
    { slug: 'midjourney', name: 'Midjourney', plan: 'Basic', monatlich: 10, jaehrlich: 8 },
    { slug: 'runway', name: 'Runway', plan: 'Standard', monatlich: 15, jaehrlich: 12 },
    { slug: 'descript', name: 'Descript', plan: 'Hobbyist', monatlich: 24, jaehrlich: 16 },
    { slug: 'otter-ai', name: 'Otter.ai', plan: 'Pro', monatlich: 16.99, jaehrlich: 8.33 },
    { slug: 'elevenlabs', name: 'ElevenLabs', plan: 'Starter', monatlich: 6, jaehrlich: 5 },
    { slug: 'wordtune', name: 'Wordtune', plan: 'Advanced', monatlich: 6.99, jaehrlich: 4.89 },
    { slug: 'replit', name: 'Replit', plan: 'Core', monatlich: 20, jaehrlich: 18 },
    { slug: 'krea', name: 'Krea', plan: 'Basic', monatlich: 9, jaehrlich: 5 },
    { slug: 'luma-dream-machine', name: 'Luma Dream Machine', plan: 'Plus', monatlich: 30, jaehrlich: 25 },
    { slug: 'genspark', name: 'Genspark', plan: 'Plus', monatlich: 24.99, jaehrlich: 19.99 },
    { slug: 'fireflies-ai', name: 'Fireflies.ai', plan: 'Pro', monatlich: 18, jaehrlich: 10 },
    { slug: 'jasper', name: 'Jasper', plan: 'Pro', monatlich: 69, jaehrlich: 59 },
    { slug: 'grammarly', name: 'Grammarly', plan: 'Pro', monatlich: 30, jaehrlich: 12 },
    { slug: 'kit', name: 'Kit', plan: 'Creator', monatlich: 39, jaehrlich: 33 },
    { slug: 'se-ranking', name: 'SE Ranking', plan: 'Core', monatlich: 129, jaehrlich: 103.2 },
    { slug: 'lovable', name: 'Lovable', plan: 'Pro', monatlich: 25, jaehrlich: 20.83 },
    { slug: 'cursor', name: 'Cursor', plan: 'Plus', monatlich: 8, jaehrlich: 6.67 },
    { slug: 'tally', name: 'Tally', plan: 'Pro', monatlich: 29, jaehrlich: 24.17 },
]

// Ab wie vielen Monaten Nutzung lohnt sich das Jahresabo? (12 × Jahrespreis pro Monat) / Monatspreis, aufgerundet.
export const breakEvenMonate = (a) => Math.ceil((12 * a.jaehrlich) / a.monatlich - 1e-9)
