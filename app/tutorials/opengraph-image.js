import { ogImage, ogSize } from '../og'
import { getTutorials } from '../../lib/tutorials'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Tutorials auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Interaktiv, mit Quiz und Beispielen',
        title: 'KI-Tutorials: Prompt Engineering lernen',
        footer: `${getTutorials().length} Tutorials Schritt für Schritt`,
        bg: '#ede9fe',
    })
}
