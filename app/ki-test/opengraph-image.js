import { ogImage, ogSize } from '../og'
import { TESTS, getTestKategorien } from '../../lib/kitests'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'KI-Test auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Selbst testen statt Benchmarks glauben',
        title: 'Der große KI-Test: ChatGPT, Claude, Gemini im Vergleich',
        footer: `${TESTS.length} Testaufgaben in ${getTestKategorien().length} Kategorien`,
        bg: '#dbeafe',
    })
}
