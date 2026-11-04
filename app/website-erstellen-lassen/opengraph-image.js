import { ogImage, ogSize } from '../og'
import { WEBSITE_PAKETE, euro } from '../../lib/angebote'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Website erstellen lassen bei Jean von mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Für Selbstständige, KMU und KI-Tool-Gründer',
        title: 'Website erstellen lassen, zum Festpreis',
        footer: WEBSITE_PAKETE.map((p) => `${p.name} ${euro(p.preis)}`).join(' · '),
        bg: '#fde68a',
    })
}
