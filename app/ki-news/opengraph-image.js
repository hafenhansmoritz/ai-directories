import { ogImage, ogSize } from '../og'
import { NEWS, NEWS_STAND } from '../../lib/news'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'KI-News auf AIGeddon'

export default function Image() {
    return ogImage({
        eyebrow: `KI-News, Stand ${NEWS_STAND}`,
        title: 'KI-News: was wirklich wichtig ist',
        footer: `${NEWS.length} Meldungen, jede mit offizieller Quelle`,
        bg: '#e0f2fe',
    })
}
