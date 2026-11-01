import { ogImage, ogSize } from '../og'
import { MODELLE, MODELLE_STAND } from '../../lib/modelle'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Neue KI-Modelle auf AIGeddon'

export default function Image() {
    return ogImage({
        eyebrow: `Stand ${MODELLE_STAND}`,
        title: 'Neue KI-Modelle: Start, Preis und Fakten',
        footer: `${MODELLE.length} Modelle mit Quellen der Anbieter`,
        bg: '#ede9fe',
    })
}
