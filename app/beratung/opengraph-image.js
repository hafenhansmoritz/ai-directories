import { ogImage, ogSize } from '../og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'KI-Beratung von Jean auf mentat.codes'

export default function Image() {
    return ogImage({
        eyebrow: 'Lieber machen lassen?',
        title: 'Coding-Agenten, KI-Workflows und GEO mit Jean',
        footer: 'Start mit kostenlosem Erstgespräch · 30 Minuten',
        bg: '#d1fae5',
    })
}
