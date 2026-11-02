import { ogImage, ogSize } from './og'
import { getSiteStats } from '../lib/data'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'mentat.codes: KI-Verzeichnisse für deinen Tool-Launch'

export default function Image() {
    const stats = getSiteStats()
    return ogImage({
        eyebrow: 'Die deutsche Liste, mit Humor',
        title: `${stats.total} AI Directories für deinen Tool-Launch`,
        footer: `${stats.free.length} kostenlos · ehrlich bewertet von Jean`,
    })
}
