// Gemeinsame Helfer für die kleinen Herzstücke: lokaler Speicher (fehlertolerant) und Toast-Meldungen.
// Alles bleibt im Browser des Besuchers, nichts wird an einen Server geschickt.
export const lies = (key, fallback = null) => {
    try {
        const v = localStorage.getItem(key)
        return v === null ? fallback : JSON.parse(v)
    } catch {
        return fallback
    }
}
export const schreib = (key, wert) => {
    try {
        localStorage.setItem(key, JSON.stringify(wert))
    } catch {}
    // Für den Konto-Sync: meldet jede Änderung im eigenen Tab (das storage-Ereignis feuert nur in anderen Tabs).
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('mentat-speicher', { detail: { key } }))
}
export const sitzung = (key) => {
    try {
        if (sessionStorage.getItem(key)) return true
        sessionStorage.setItem(key, '1')
    } catch {}
    return false
}
// auto = true: Meldung kam ohne Klick zustande. Davon zeigt ToastHost höchstens eine pro Seitenaufruf.
export const toast = (text, emoji = '💛', auto = false) => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('mentat-toast', { detail: { text, emoji, auto } }))
}
export const ruhig = () =>
    typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.ruhig === 'an')

// Alle Abzeichen fürs Sammelalbum: [Name, Emoji, wie man es bekommt, geheim]. Geheime zeigen nur einen Hinweis.
export const ABZEICHEN_KATALOG = [
    ['Neugier-Abzeichen', '🔍', '3 Bereiche entdeckt', false],
    ['Entdecker-Abzeichen', '🧭', '6 Bereiche entdeckt', false],
    ['Weltreise-Abzeichen', '🌍', '10 Bereiche entdeckt', false],
    ['Leseratten-Abzeichen', '🏅', 'Einen Artikel ganz gelesen', false],
    ['Herzensmensch-Abzeichen', '💖', '5 Herzen verschenkt', false],
    ['Kopier-Abzeichen', '📋', 'Zum ersten Mal einen Kopieren-Knopf benutzt', false],
    ['Detektiv-Abzeichen', '🕵️', 'Quiz oder Tool-Finder bis zum Ende gespielt', false],
    ['Skill-Sammler-Abzeichen', '🧩', 'Einen KI-Skill heruntergeladen', false],
    ['Botschafter-Abzeichen', '💌', 'mentat.codes weitergesagt', false],
    ['Nachteulen-Abzeichen', '🦉', 'Zwischen 23 und 5 Uhr vorbeigeschaut', false],
    ['Mitglieds-Abzeichen', '🪪', 'Kostenloses Konto angelegt', false],
    ['Gesicht-zeigen-Abzeichen', '📸', 'Ein eigenes Profilbild hochgeladen', false],
    ['Erster-Kommentar-Abzeichen', '💬', 'Den ersten Kommentar geschrieben', false],
    ['Forums-Starter-Abzeichen', '🧵', 'Das erste Thema im Forum gestartet', false],
    ['Problemlöser-Abzeichen', '✅', 'Eine Antwort wurde als Lösung markiert', false],
    ['Hilfsbereit-Abzeichen', '🤝', '10 Reaktionen auf eigene Beiträge bekommen', false],
    ['Geheimagenten-Abzeichen', '🎮', 'Ein Code aus alten Konsolentagen, mit Pfeiltasten', true],
    ['Atomkern-Abzeichen', '⚡', 'Das Logo mag Aufmerksamkeit. Viel Aufmerksamkeit.', true],
    ['Hupkonzert-Abzeichen', '🛵', 'Ganz unten wartet jemand mit Hupe', true],
    ['Liebesbrief-Abzeichen', '💘', 'Tipp ein Wort mit fünf Buchstaben, das hier überall drinsteckt', true],
]

// Verleiht ein Abzeichen genau einmal und gibt true zurück, wenn es neu war.
// Die Meldung zählt standardmäßig als automatisch (höchstens eine pro Seite, siehe ToastHost) und kommt ohne Konfetti.
// Konfetti nur auf Wunsch (konfetti: true), also nach einer bewussten Aktion, nie beim Laden oder über einem Ergebnis.
export const verleihe = (name, { auto = true, konfetti = false } = {}) => {
    if (typeof window === 'undefined') return false
    const alle = lies('mentat-abzeichen', []) || []
    if (alle.includes(name)) return false
    schreib('mentat-abzeichen', [...alle, name])
    const k = ABZEICHEN_KATALOG.find(([n]) => n === name)
    toast(`${name} verdient! ${k ? k[2] + '.' : ''} Alle Abzeichen findest du in deiner Merkliste.`, k ? k[1] : '🏅', auto)
    if (konfetti && !ruhig()) import('./konfetti').then((m) => m.default(50))
    return true
}

// Ruhe-Modus an oder aus: keine Animationen, kein Konfetti, keine automatischen Meldungen.
// Meldet die Änderung, damit alle Schalter (Kopf und Footer) denselben Stand zeigen.
export const setzeRuhe = (an) => {
    schreib('mentat-ruhig', an)
    if (an) document.documentElement.dataset.ruhig = 'an'
    else delete document.documentElement.dataset.ruhig
    window.dispatchEvent(new CustomEvent('mentat-ruhe', { detail: { an } }))
}

// Ein-Buchstaben-Tastenkürzel lassen sich abschalten (WCAG 2.1.4), gespeichert nur im eigenen Browser.
export const kuerzelAus = () => Boolean(lies('mentat-kuerzel-aus'))
export const setzeKuerzel = (an) => {
    schreib('mentat-kuerzel-aus', !an)
    window.dispatchEvent(new CustomEvent('mentat-kuerzel', { detail: { an } }))
}

// Ostersonntag nach der Gaußschen Osterformel (Anonymer Gregorianischer Algorithmus).
const ostern = (j) => {
    const a = j % 19, b = Math.floor(j / 100), c = j % 100, d = Math.floor(b / 4), e = b % 4
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451)
    const monat = Math.floor((h + l - 7 * m + 114) / 31), tag = ((h + l - 7 * m + 114) % 31) + 1
    return new Date(j, monat - 1, tag)
}

// Bundesweite Feiertage plus Heiligabend und Silvester: [Name, Emoji, Gruß].
export const feiertag = (d) => {
    const fest = {
        '1-1': ['Neujahr', '🎆', 'Frohes neues Jahr! Schön, dass du das Jahr mit uns beginnst.'],
        '5-1': ['Tag der Arbeit', '🌷', 'Schönen 1. Mai! Heute darf die Arbeit auch mal liegen bleiben.'],
        '10-3': ['Tag der Deutschen Einheit', '🇩🇪', 'Schönen Tag der Deutschen Einheit!'],
        '12-24': ['Heiligabend', '🎄', 'Frohe Weihnachten! Danke, dass du heute hier vorbeischaust.'],
        '12-25': ['1. Weihnachtstag', '🎁', 'Frohe Weihnachten und ganz viel Ruhe!'],
        '12-26': ['2. Weihnachtstag', '🍪', 'Schöne Feiertage! Noch ein Plätzchen?'],
        '12-31': ['Silvester', '🥂', 'Guten Rutsch! Danke für ein Jahr voller Neugier.'],
    }
    const f = fest[`${d.getMonth() + 1}-${d.getDate()}`]
    if (f) return f
    const o = ostern(d.getFullYear())
    const diff = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - o) / 86400000)
    const beweglich = {
        '-2': ['Karfreitag', '🕊️', 'Einen ruhigen Karfreitag wünschen wir dir.'],
        0: ['Ostersonntag', '🐣', 'Frohe Ostern! Hier sind keine Eier versteckt. Aber ein paar Geheimnisse.'],
        1: ['Ostermontag', '🐰', 'Schönen Ostermontag!'],
        39: ['Christi Himmelfahrt', '☁️', 'Schönen Feiertag!'],
        50: ['Pfingstmontag', '🕊️', 'Schönen Pfingstmontag!'],
    }
    return beweglich[diff] || null
}

export const nachts = (d) => d.getHours() >= 23 || d.getHours() < 5

// Mutmacher des Tages und Glückskeks-Sprüche: eigene Texte, keine Zitate.
export const MUTMACHER = [
    'Dein erster Entwurf muss nicht gut sein. Er muss nur existieren.',
    'Jedes große Tool hatte mal null Nutzer. Du bist in guter Gesellschaft.',
    'Ein gelöstes Problem pro Tag ist eine ziemlich gute Bilanz.',
    'Fertig ist besser als perfekt. Perfekt kommt in Version 2.',
    'Heute reicht ein kleiner Schritt. Morgen auch.',
    'Du musst nicht alles automatisieren. Nur das, was dich nervt.',
    'Fragen stellen ist kein Zeichen von Schwäche, sondern von gutem Prompting.',
    'Wer heute etwas Neues ausprobiert, hat morgen einen Vorsprung.',
    'Auch die beste KI braucht jemanden, der weiß, was er will. Das bist du.',
    'Pausen sind kein Zeitverlust, sondern Ladezeit.',
    'Dein Projekt ist spannender, als du gerade glaubst.',
    'Kleine Schritte, oft gemacht, schlagen große Pläne, nie begonnen.',
    'Ein Nein vom Verzeichnis ist nur ein Ja, das sich verspätet.',
    'Die beste Zeit zum Starten war gestern. Die zweitbeste ist jetzt.',
    'Du hast schon Schwierigeres geschafft als dieses Formular.',
    'Neugier ist der wichtigste Prompt.',
    'Heute ist ein guter Tag, um etwas zu verschiffen.',
    'Feedback ist Treibstoff, auch wenn es manchmal nach Zweitakt riecht.',
    'Mach heute eine Sache fertig. Nur eine. Das zählt.',
    'Niemand weiß alles über KI. Auch die nicht, die so tun.',
    'Dein Geschmack ist das, was keine KI dir abnehmen kann.',
    'Lieber zehn Leute, die dein Tool lieben, als tausend, die es überfliegen.',
    'Wenn es dich zum Lächeln bringt, bring es in die Welt.',
    'Ein guter Plan passt auf einen Bierdeckel.',
    'Mutig sein heißt auch: auf Veröffentlichen klicken.',
    'Du lernst schneller, als es sich anfühlt.',
    'Heute ist ein perfekter Tag für einen sauberen Commit.',
    'Glaub an dein Projekt, gerade an den Tagen, an denen es knirscht.',
    'Wer fragt, was Kunden wirklich brauchen, hat schon halb gewonnen.',
    'Jede Zeile, die du heute schreibst, ist eine mehr als gestern.',
    'Du bist nicht zu spät. Du bist genau rechtzeitig.',
]
export const GLUECKSKEKSE = [
    'Ein Prompt mit Beispiel wird dir heute doppelt so gute Antworten bringen.',
    'Bald findest du ein Verzeichnis mit dofollow-Link. Halte die Augen offen.',
    'Dein nächster Skill spart dir mehr Zeit, als du denkst.',
    'Wer heute seine Modellnamen prüft, schläft im Januar ruhiger.',
    'Eine kurze Antwort oben auf der Seite bringt dich in KI-Antworten.',
    'Heute wird ein guter Tag für einen Anbieterwechsel ohne Ausfall.',
    'Eine Kundin wird bald genau nach deinem Produkt fragen. Sei bereit.',
    'Dein bester Text entsteht, nachdem du den ersten gelöscht hast.',
    'Teste dieselbe Aufgabe in zwei Chatbots. Die Überraschung lohnt sich.',
    'Ein freundliches „Danke“ an deine KI kostet nichts. Sagt man.',
    'Der Cache ist dein Freund. Besonders bei langen Anweisungen.',
    'Heute klickst du auf Veröffentlichen. Das Glück ist mit den Mutigen.',
    'Dein Impressum ist vollständig. Das ist mehr wert, als es klingt.',
    'Eine Pause bringt dir heute die beste Idee des Tages.',
    'Du wirst einen Fehler finden, bevor ihn ein Kunde findet.',
    'Wer Quellen angibt, gewinnt Vertrauen. Und Backlinks.',
    'Dein Agent wird heute nichts kaufen, was du nicht freigibst. Gut so.',
    'Ein altes Projekt verdient heute einen zweiten Blick.',
    'Die richtige Frage ist heute wertvoller als jede Antwort.',
    'Du bist kurz davor, etwas Großartiges zu bauen. Weiter so.',
]
