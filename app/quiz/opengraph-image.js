import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Quiz auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Drei Fragen, fünf Empfehlungen',
        title: 'Welche KI-Verzeichnisse passen zu deinem Launch?',
        footer: 'Das Quiz von mentat.codes, kostenlos im Browser',
        bg: '#ffedd5',
    })
}
