import { getPrompts, PROMPT_KATEGORIEN, TECHNIKEN } from '../../../lib/prompts'
import { absoluteUrl } from '../../../lib/site'

export const dynamic = 'force-static'

// Alle Prompt-Vorlagen als eine Markdown-Datei, wächst automatisch mit der Bibliothek.
export function GET() {
    const body = [
        '# mentat.codes Prompt-Paket',
        '',
        `Alle Vorlagen aus ${absoluteUrl('/prompts')}. Platzhalter in [GROSSBUCHSTABEN] ersetzen, dann einfügen.`,
        '',
        ...Object.entries(PROMPT_KATEGORIEN).flatMap(([key, k]) => {
            const prompts = getPrompts().filter((p) => p.kategorie === key)
            if (!prompts.length) return []
            return [
                `## ${k.name}`,
                '',
                ...prompts.flatMap((p) => [
                    `### ${p.title}`,
                    '',
                    `${p.ziel} Techniken: ${p.techniken.map((t) => TECHNIKEN[t][0]).join(', ')}.`,
                    '',
                    '```',
                    p.vorlage.replace(/\{(\w+)\}/g, (m, key) => `[${key.toUpperCase()}]`),
                    '```',
                    '',
                    `Online ausfüllen und an ChatGPT oder Claude senden: ${absoluteUrl(`/prompts/${p.slug}`)}`,
                    '',
                ]),
            ]
        }),
        '---',
        'mentat.codes · KI-Verzeichnisse, Tools & Prompts · ' + absoluteUrl('/'),
    ].join('\n')
    return new Response(body, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Content-Disposition': 'attachment; filename="mentat-codes-prompt-paket.md"' },
    })
}
