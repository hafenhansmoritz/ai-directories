import { ogImage, ogSize } from '../og'
import { RECHNER } from '../../lib/rechner'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'KI-Rechner auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Rechnen statt raten',
        title: 'KI-Rechner: Zeit, Kosten und Launch kalkulieren',
        footer: `${RECHNER.length} kostenlose Rechner mit Preisen laut Anbieter`,
        bg: '#fde68a',
    })
}
