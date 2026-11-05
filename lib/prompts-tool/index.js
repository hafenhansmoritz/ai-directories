import * as chat from './chat.js'
import * as audioBild from './audio-bild.js'
import * as videoDesign from './video-design.js'
import * as coding from './coding.js'

const GRUPPEN = [chat, audioBild, videoDesign, coding]
export const TOOL_PROMPTS = GRUPPEN.flatMap((g) => g.PROMPTS)
export const TOOL_PROMPT_TEXTE_EXTRA = Object.assign({}, ...GRUPPEN.map((g) => g.TEXTE))
export const TOOL_SEITEN_EXTRA = Object.assign({}, ...GRUPPEN.map((g) => g.SEITEN))
