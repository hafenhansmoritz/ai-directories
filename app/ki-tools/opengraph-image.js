import { ogImage, ogSize } from '../og'
import { kbStats, KB_RUBRIKEN } from '../../lib/kb'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'KI-Tool-Datenbank auf mentat.codes'

export default function Image() {
    const s = kbStats()
    return ogImage({
        eyebrow: 'Die deutsche KI-Tool-Datenbank',
        title: `${s.gesamt} KI-Tools in ${Object.keys(KB_RUBRIKEN).length} Rubriken`,
        footer: `${s.konsens} Konsens-Favoriten · ${s.profile} Steckbriefe mit Preisen`,
        bg: '#d1fae5',
    })
}
