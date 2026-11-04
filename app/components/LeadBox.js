'use client'

import { usePathname } from 'next/navigation'
import { NEWSLETTER_NAME, NEWSLETTER_URL, SUBSCRIBE_URL } from '../../lib/monetization'

// Lead-Baustein für jede Seite: Newsletter, solange keiner hinterlegt ist der YouTube-Kanal.
// Pro Seite ein anderer Spruch, damit nicht auf 1.300 Seiten derselbe Satz steht.
const SPRUECHE = [
    'KI-Tools, Launches und der ganz normale KI-Wahnsinn als Video. Abonnieren, bevor die Maschinen es tun.',
    'Jean testet, flucht, lacht und erklärt. Auf Video, damit du es nicht selbst tun musst.',
    'Neue Tools, ehrliche Urteile, kein Hochglanz. Der Kanal für KI ohne Glitzer.',
    'Hier zerlegt Jean KI-Tools wie andere Leute Vergaser. Mit Schraubenzieher und Humor.',
    'Prompts live ausprobiert, Fehler inklusive. Lernen durch Zuschauen war nie entspannter.',
    'Weniger Hype, mehr Handgriffe: KI-Videos für Leute, die Ergebnisse wollen.',
    'Neues Modell draußen? Auf dem Kanal ordnet Jean ein, was es wirklich kann.',
    'KI erklärt wie in der Werkstatt: erst anschauen, dann anfassen, dann verstehen.',
    'Tool-Duelle, Launch-Tipps und Prompt-Tricks. Kurz genug für die Mittagspause.',
    'Der Kanal für alle, die KI nutzen wollen, ohne einen Doktortitel nachzureichen.',
    'Ehrliche Tests statt gekaufter Testsieger. Auf Video, mit Abspann und ohne Ausreden.',
    'Jean probiert die KI-Tools aus, die du dir sparen kannst. Und die, die du brauchst.',
    'Zwischen zwei Launches erklärt Jean, was sich wirklich lohnt. Abonnieren tut nicht weh.',
    'KI-Wissen in kleinen Portionen. Wie Tapas, nur mit mehr Prompts.',
    'Für Gründer, Neugierige und Skeptiker: KI-Videos mit Haltung und Herz.',
    'KI-Alltag, ehrlich eingeordnet. Die Witze sind echt.',
    'Videos über KI, die man nicht dreimal anschauen muss, um sie zu verstehen.',
    'Hier geht es um Werkzeuge, nicht um Wunder. KI-Videos mit Bodenhaftung.',
    'Wenn du lieber zuschaust als liest: Jeans Kanal hat die bewegten Bilder dazu.',
    'Was taugt das neue Tool? Jean schaut nach, damit du nicht dein Wochenende opferst.',
    'Prompts, Pannen und Praxis. Der YouTube-Kanal zu dieser Seite und allen anderen.',
    'KI-Videos mit Schrauber-Mentalität: auseinandernehmen, verstehen, wieder zusammenbauen.',
    'Der Kanal für KI-Neuigkeiten, ohne dass du dafür zehn Newsletter brauchst.',
    'KI erklärt mit Schrauber-Vergleichen und ohne Fachchinesisch.',
]

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

export default function LeadBox({ title, text }) {
    const hasNewsletter = Boolean(NEWSLETTER_URL)
    const pfad = usePathname() || '/'
    return (
        <aside className="leadbox" aria-label={hasNewsletter ? 'Newsletter abonnieren' : 'YouTube-Kanal abonnieren'}>
            <p className="leadbox-title">{title || (hasNewsletter ? `${NEWSLETTER_NAME}: der Prompt-Newsletter ⚡` : 'YouTube-Kanal für KI-Praxis ⚡')}</p>
            <p>
                {text ||
                    (hasNewsletter
                        ? 'Jede Woche die besten Prompts, neue KI-Tools und Deals, bevor sie hier stehen. Einmal pro Woche, jederzeit kündbar.'
                        : SPRUECHE[hash(pfad) % SPRUECHE.length])}
            </p>
            <a
                className="button"
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noopener"
            >
                {hasNewsletter ? 'Kostenlos abonnieren →' : 'Kanal abonnieren →'}
            </a>
        </aside>
    )
}
