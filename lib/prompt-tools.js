// Seiten /prompts/tool/[slug]: Prompts, die in genau dieses Tool eingegeben werden (Feld `fuer` in lib/prompts.js).
// Nie nach `tools` filtern, das sind die Werkzeuge zum Umsetzen des Ergebnisses.
// Eine Seite erscheint erst, wenn hier Texte stehen und mindestens 5 Prompts das Tool in `fuer` haben.
import { getPrompts } from './prompts.js'
import { getTool } from './tools.js'
import { TOOL_SEITEN_EXTRA } from './prompts-tool/index.js'

export const TOOL_PROMPT_TEXTE = {
    chatgpt: {
        titel: 'ChatGPT-Prompts auf Deutsch: Vorlagen zum Ausfüllen',
        intro: 'Vorlagen, die für ChatGPT geschrieben sind: Projekte, Work, Bilder, Tabellen, Übersetzen, Deep Research und eigene Assistenten. Felder ausfüllen, Vorschau prüfen, mit einem Klick an ChatGPT schicken.',
        vergleiche: ['claude-vs-chatgpt'],
        kitest: 'deutsch',
        tipps: [
            ['Kontext vor Aufgabe', 'Erst sagen, wofür das Ergebnis ist und wer es liest, dann die Aufgabe. Ohne Kontext rät ChatGPT, und Raten klingt leider genauso überzeugt wie Wissen.'],
            ['Projekte für Wiederkehrendes', 'Was du jede Woche erklärst, gehört in die Anweisungen eines Projekts. Dann startet jeder Chat dort mit demselben Stand.'],
            ['Format festlegen', 'Tabelle, Liste, Codeblock: Sag, in welcher Form du das Ergebnis weiterverarbeitest. Das spart die Runde „mach das bitte als Tabelle“.'],
            ['Gegenprüfen lassen', 'Zahlen, Fristen und Zitate prüfst du selbst. Der Prompt „Antwort gegenprüfen“ zeigt dir, wo es wackelt.'],
        ],
        faq: [
            ['Funktionieren die Prompts auch im Gratis-Tarif?', 'Die Text-Prompts ja. Work, Deep Research und manche Datei- und Bildfunktionen sind laut OpenAI je nach Tarif begrenzt oder nur in Bezahltarifen enthalten. Was dein Tarif kann, zeigt die Preisseite von OpenAI.'],
            ['Kann ich die Prompts auch in Claude oder Gemini nutzen?', 'Die meisten ja, die Sprache ist anbieterneutral. Ausnahmen sind Prompts für ChatGPT-Funktionen wie Projekte, Work oder eigene Assistenten; dort heißen die Gegenstücke bei anderen Anbietern anders.'],
            ['Warum Platzhalter statt fertiger Prompts?', 'Weil der Kontext den Unterschied macht. Ein Prompt mit deiner Zielgruppe und deinem Zweck schlägt jeden allgemeinen Prompt.'],
        ],
    },
}

Object.assign(TOOL_PROMPT_TEXTE, TOOL_SEITEN_EXTRA)

export const promptsFuerTool = (slug) => getPrompts().filter((p) => (p.fuer || []).includes(slug))

export const getToolPromptSeiten = () =>
    Object.keys(TOOL_PROMPT_TEXTE)
        .map((slug) => ({ slug, tool: getTool(slug), prompts: promptsFuerTool(slug), ...TOOL_PROMPT_TEXTE[slug] }))
        .filter((s) => s.tool && s.prompts.length >= 5)

export const getToolPromptSeite = (slug) => getToolPromptSeiten().find((s) => s.slug === slug) || null
