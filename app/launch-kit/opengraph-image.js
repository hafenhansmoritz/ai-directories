import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Launch-Kit auf AIGeddon'

export default function Image() {
    return ogImage({
        eyebrow: 'Einmal eingeben, überall einreichen',
        title: 'Launch-Kit: Texte für KI-Verzeichnisse',
        footer: 'Deutsch und Englisch, mit UTM-Links, kostenlos',
        bg: '#fef9c3',
    })
}
