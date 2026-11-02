// Alternativen-Hubs für viel gesuchte KI-Tools. Die Listen kommen aus der Datenbank (lib/kb.js),
// hier steht nur die redaktionelle Einordnung: warum Leute wechseln und worauf sie achten sollten.
import { getKbTool, kbAlternativen } from './kb'

const MAX = 15
const NICHT_OFFEN = new Set(['github-copilot'])

export const ALTERNATIVEN = [
    {
        slug: 'midjourney',
        zuerst: ['flux-bfl-ai', 'stable-diffusion', 'leonardo-ai', 'ideogram', 'krea', 'firefly', 'bing-image-creator', 'imagen', 'recraft', 'comfyui', 'canva', 'civitai', 'clipdrop', 'playground-ai', 'nightcafe'],
        grund: 'Midjourney hat keinen Gratis-Tarif, und private Bilder gibt es erst in den teureren Abos. Viele suchen deshalb eine kostenlose oder offene Alternative, mehr Kontrolle über das Modell oder einfachere Bearbeitung.',
        achte: ['Gratis-Tarif oder Open Source', 'Bildstil und Text im Bild', 'Nutzungsrechte für kommerzielle Projekte', 'Bearbeiten, Erweitern, Varianten'],
    },
    {
        slug: 'perplexity-ai',
        zuerst: ['phind', 'komo', 'exa', 'consensus', 'elicit', 'scite'],
        grund: 'Perplexity beantwortet Fragen mit Quellen. Wer Alternativen sucht, will oft andere Modelle, mehr Datenschutz, eine wissenschaftliche Ausrichtung oder eine Suche, die selbst gehostet werden kann.',
        achte: ['Qualität und Sichtbarkeit der Quellen', 'Websuche aktuell oder nur Trainingswissen', 'Datenschutz und Speicherung der Suchanfragen', 'Spezialisierung, etwa auf Wissenschaft'],
    },
    {
        slug: 'notion-ai',
        zuerst: ['mem', 'taskade', 'notebooklm', 'otter-ai', 'fireflies-ai', 'obsidian'],
        grund: 'Notion AI ist an Notion gebunden. Wer seine Notizen woanders hat, eine günstigere Lösung sucht oder KI direkt in Meetings, E-Mails oder im Browser braucht, schaut sich nach Alternativen um.',
        achte: ['Wo deine Notizen und Dokumente liegen', 'Zusammenfassen, Schreiben, Suchen im eigenen Wissen', 'Integration in Kalender, Mail, Browser', 'Preis pro Nutzer im Team'],
    },
    {
        slug: 'claude',
        zuerst: ['chatgpt', 'gemini', 'perplexity-ai', 'deepseek-deepseek-com', 'kimi', 'grok-grok-com', 'copilot', 'poe', 'ollama'],
        grund: 'Claude ist stark beim Schreiben, Analysieren und Programmieren. Alternativen interessieren, wenn du andere Stärken brauchst, etwa Bildgenerierung, eine bestimmte Integration oder ein Modell, das lokal läuft.',
        achte: ['Stärken beim Schreiben, Rechnen oder Programmieren', 'Kontextlänge für lange Dokumente', 'Websuche und Dateien', 'Datenschutz und Training mit deinen Daten'],
    },
    {
        slug: 'gemini',
        zuerst: ['chatgpt', 'claude', 'perplexity-ai', 'deepseek-deepseek-com', 'kimi', 'grok-grok-com', 'copilot', 'poe', 'ollama'],
        grund: 'Gemini ist eng mit Google verknüpft. Wer nicht noch mehr Daten bei Google haben will oder andere Antwortqualität sucht, vergleicht mit anderen Chatbots.',
        achte: ['Antwortqualität bei deinen eigenen Aufgaben', 'Anbindung an deine Werkzeuge', 'Datenschutz', 'Kosten des Abos'],
    },
    {
        slug: 'github-copilot',
        zuerst: ['cursor', 'openai-codex', 'claude-code', 'windsurf', 'tabnine', 'amazon-q', 'continue', 'aider', 'roocode', 'kilo-code', 'trae', 'devin'],
        grund: 'Copilot ist der bekannteste Code-Assistent, aber nicht der einzige. Entwickler suchen Alternativen für andere Modelle, einen eigenen Editor mit Agenten, Open Source oder den Betrieb ohne Cloud.',
        achte: ['Unterstützte Editoren und Sprachen', 'Agenten, die mehrere Dateien ändern', 'Wahl des Modells, auch lokal', 'Umgang mit deinem Code und Datenschutz'],
    },
    {
        slug: 'eleven-labs',
        zuerst: ['murf-ai', 'resemble-ai', 'wellsaid-labs', 'microsoft-azure-neural-tts', 'bark', 'tortoise', 'chattts'],
        grund: 'ElevenLabs ist bekannt für realistische Stimmen. Alternativen lohnen sich für Open-Source-Sprachausgabe, andere Sprachen und Stimmen oder ein Preismodell, das besser zu deinem Volumen passt.',
        achte: ['Natürlichkeit auf Deutsch', 'Stimmen klonen mit Einwilligung', 'Zeichenkontingent und Preis', 'API und Nutzungsrechte'],
    },
    {
        slug: 'synthesia',
        zuerst: ['heygen', 'd-id', 'colossyan', 'hour-one', 'fliki', 'pictory'],
        grund: 'Synthesia erstellt Videos mit KI-Avataren. Wer Alternativen sucht, will andere Avatare, günstigere Einstiege oder Videos ganz ohne Avatar aus Text.',
        achte: ['Qualität der Avatare und Lippensynchronität', 'Deutsche Stimmen', 'Wasserzeichen und Minuten im Tarif', 'Vorlagen für Schulungen und Marketing'],
    },
    {
        slug: 'jasper',
        zuerst: ['copy-ai', 'writesonic', 'rytr', 'anyword', 'hypotenuse-ai', 'copysmith', 'chatsonic', 'wordtune', 'quillbot', 'jenni', 'lex'],
        grund: 'Jasper richtet sich an Marketing-Teams. Einzelne Gründer und kleine Teams finden oft günstigere Schreibtools oder kommen mit einem Chatbot und guten Prompts aus.',
        achte: ['Markenstimme und Vorlagen', 'Qualität auf Deutsch', 'Preis pro Nutzer', 'SEO- und Kampagnenfunktionen'],
    },
    {
        slug: 'runway',
        zuerst: ['luma-dream-machine', 'kling-ai', 'pika', 'hailuoai', 'higgsfield', 'pixverse', 'wan-3-0', 'minimax-h3'],
        grund: 'Runway ist ein kreatives KI-Videostudio. Alternativen interessieren für andere Videomodelle, längere Clips, günstigere Credits oder einfachere Videos aus Text und Stockmaterial.',
        achte: ['Länge und Auflösung der Clips', 'Credits pro Sekunde Video', 'Kamerasteuerung und Bearbeitung', 'Nutzungsrechte'],
    },
    {
        slug: 'heygen',
        zuerst: ['synthesia', 'd-id', 'colossyan', 'hour-one', 'fliki', 'pictory'],
        grund: 'HeyGen erstellt Avatar-Videos und übersetzt Videos mit Lippensynchronität. Alternativen lohnen sich bei anderem Budget, anderen Avataren oder für Videos ohne Sprecher.',
        achte: ['Avatar-Qualität', 'Übersetzung mit Lippensynchronität', 'Preis pro Minute', 'Einwilligung bei eigenen Avataren'],
    },
    {
        slug: 'cursor',
        zuerst: ['github-copilot', 'windsurf', 'claude-code', 'openai-codex', 'trae', 'antigravity', 'continue', 'aider', 'roocode', 'kilo-code', 'v0', 'bolt-new', 'lovable'],
        grund: 'Cursor ist ein KI-Code-Editor. Wer Alternativen sucht, bevorzugt seinen gewohnten Editor, einen Agenten im Terminal, Open Source oder andere Modelle.',
        achte: ['Editor oder Terminal-Agent', 'Modellwahl und Kosten', 'Arbeiten über viele Dateien', 'Datenschutz für deinen Code'],
    },
]

export const getAlternativenHub = (slug) => {
    const h = ALTERNATIVEN.find((a) => a.slug === slug)
    const tool = h && getKbTool(slug)
    if (!tool) return null
    // Kuratierte Kandidaten zuerst, dann die stärksten Tools derselben Rubrik
    const gesehen = new Set([tool.slug])
    const liste = []
    for (const t of [...(h.zuerst || []).map(getKbTool).filter(Boolean), ...kbAlternativen(tool, MAX * 2)]) {
        if (gesehen.has(t.slug) || liste.some((x) => x.name.toLowerCase() === t.name.toLowerCase())) continue
        gesehen.add(t.slug)
        liste.push(t)
        if (liste.length === MAX) break
    }
    return { ...h, tool, liste }
}

export const getAlternativenHubs = () => ALTERNATIVEN.map((a) => getAlternativenHub(a.slug)).filter(Boolean)
export const hatAlternativenHub = (slug) => ALTERNATIVEN.some((a) => a.slug === slug)

// FAQ nur aus Daten der Liste: Namen, Konsens, Open Source, Gratis-Angabe.
export const alternativenFaq = (h) => {
    const n = h.tool.name
    const top = h.liste.filter((t) => t.konsens > 1).slice(0, 3).map((t) => t.name)
    const gratis = h.liste.filter((t) => t.gratis).slice(0, 4).map((t) => t.name)
    // Open-Source-Angabe nur für kuratierte Kandidaten, die Kennzeichnung in den Quellen ist uneinheitlich
    const kuratiert = new Set(h.zuerst || [])
    const offen = h.liste.filter((t) => t.open_source && kuratiert.has(t.slug) && !NICHT_OFFEN.has(t.slug)).slice(0, 4).map((t) => t.name)
    const faq = [
        {
            q: `Was ist die beste ${n}-Alternative?`,
            a: top.length
                ? `Am häufigsten empfohlen werden ${top.join(', ')}: Sie stehen in mindestens zwei der drei größten Community-Listen. Welche für dich am besten passt, hängt von deiner Aufgabe ab, deshalb lohnt ein Test mit einem eigenen Beispiel.`
                : `Eine klare Nummer eins gibt es nicht. Teste zwei oder drei Kandidaten aus der Liste mit einem eigenen Beispiel.`,
        },
        {
            q: `Gibt es kostenlose ${n}-Alternativen?`,
            a: gratis.length
                ? `Laut den Listen kostenlos nutzbar sind zum Beispiel ${gratis.join(', ')}. Prüfe die aktuellen Bedingungen beim Anbieter, Gratis-Tarife ändern sich oft.`
                : `Viele Anbieter haben einen Gratis-Tarif oder eine Testphase. Prüfe die aktuellen Bedingungen direkt beim Anbieter.`,
        },
    ]
    if (offen.length)
        faq.push({
            q: `Gibt es Open-Source-Alternativen zu ${n}?`,
            a: `Ja, zum Beispiel ${offen.join(', ')}. Open-Source-Werkzeuge lassen sich oft selbst betreiben, brauchen dafür aber eigene Hardware oder einen Server.`,
        })
    return faq
}
