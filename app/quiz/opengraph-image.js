import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Quiz auf AIGeddon'

export default function Image() {
    return ogImage({
        eyebrow: 'Drei Fragen, fünf Empfehlungen',
        title: 'Welche KI-Verzeichnisse passen zu deinem Launch?',
        footer: 'Das Quiz von AIGeddon, kostenlos im Browser',
        bg: '#ffedd5',
    })
}
