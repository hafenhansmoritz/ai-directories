import { ogImage, ogSize } from '../../og'
import { getDirectories, getDirectory } from '../../../lib/data'
import { getScore, scoreLabel } from '../../../lib/score'
import { formatRating, pricingLabel } from '../../../utils/i18n-de'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Verzeichnis im Check'

export function generateStaticParams() {
    return getDirectories().map((d) => ({ slug: d.slug }))
}

export default function Image({ params }) {
    const d = getDirectory(params.slug)
    const { total } = getScore(d)
    return ogImage({
        eyebrow: `${pricingLabel(d.pricing)} · DR ${formatRating(d.domain_rating)} · ${scoreLabel(total)}`,
        title: `${d.name} eintragen: lohnt sich das?`,
        score: total,
        footer: 'Jeans Urteil auf AIGeddon',
    })
}
