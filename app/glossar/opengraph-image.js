import { ogImage, ogSize } from '../og'
import { KI_GLOSSAR } from '../../lib/ki-glossar'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'KI-Glossar auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Fachchinesisch, übersetzt',
        title: 'KI-Glossar: Begriffe einfach erklärt',
        footer: `${KI_GLOSSAR.length} KI-Begriffe mit Beispiel und Praxis-Tipp`,
        bg: '#dcfce7',
    })
}
