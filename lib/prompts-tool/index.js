import * as chat from './chat'
import * as audioBild from './audio-bild'
import * as videoDesign from './video-design'

const GRUPPEN = [chat, audioBild, videoDesign]
export const TOOL_PROMPTS = GRUPPEN.flatMap((g) => g.PROMPTS)
export const TOOL_PROMPT_TEXTE_EXTRA = Object.assign({}, ...GRUPPEN.map((g) => g.TEXTE))
export const TOOL_SEITEN_EXTRA = Object.assign({}, ...GRUPPEN.map((g) => g.SEITEN))
