import { ogImage, ogSize } from '../og'
import { getPrompts } from '../../lib/prompts'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Prompt-Bibliothek auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Mit einem Klick an ChatGPT, Claude und Co.',
        title: 'Prompt-Bibliothek auf Deutsch',
        footer: `${getPrompts().length} geprüfte Prompts zum Ausfüllen und Absenden`,
        bg: '#fce7f3',
    })
}
