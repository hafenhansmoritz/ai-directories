// Fachbegriffe in Fließtext automatisch mit der Glossar-Seite verlinken, jeweils nur beim ersten Vorkommen pro Seite.
// Bewusst ohne sehr häufige Wörter wie „Prompt“ oder „Temperatur“, damit Texte nicht zu Linklisten werden.
import { glossarSlug } from './ki-glossar'
import { TOOL_NAMEN } from './tool-links'

const BEGRIFFE = [
    ['Prompt Engineering', 'Prompt Engineering'],
    ['System-Prompts?', 'System-Prompt'],
    ['Rollen-Prompts?', 'Rollen-Prompt'],
    ['Few-Shot', 'Few-Shot'],
    ['Zero-Shot', 'Zero-Shot'],
    ['Chain of Thought', 'Chain of Thought'],
    ['Prompt-Ketten?', 'Prompt-Kette'],
    ['Meta-Prompts?', 'Meta-Prompt'],
    ['Sprachmodell(?:e|en|s)?|LLMs?', 'Large Language Model (LLM)'],
    ['Tokens?', 'Token'],
    ['Kontextfensters?', 'Kontextfenster'],
    ['Halluzination(?:en)?|halluziniert', 'Halluzination'],
    ['Grounding', 'Grounding'],
    ['RAG', 'RAG (Retrieval-Augmented Generation)'],
    ['Embeddings?', 'Embedding'],
    ['Vektordatenbank(?:en)?', 'Vektordatenbank'],
    ['Fine-Tuning', 'Fine-Tuning'],
    ['Trainingsdaten', 'Trainingsdaten'],
    ['Wissensstand', 'Wissensstand (Knowledge Cutoff)'],
    ['multimodale?n?', 'Multimodal'],
    ['KI-Agent(?:en)?', 'KI-Agent'],
    ['Function Calling|Tool Use', 'Tool Use (Function Calling)'],
    ['MCP', 'MCP (Model Context Protocol)'],
    ['Prompt-Injections?', 'Prompt-Injection'],
    ['Jailbreaks?', 'Jailbreak'],
    ['Guardrails', 'Guardrails'],
    ['Custom GPTs?', 'Custom GPT'],
    ['Diffusionsmodell(?:e|en)?', 'Diffusionsmodell'],
    ['Text-to-Speech', 'Text-to-Speech (TTS)'],
    ['Speech-to-Text', 'Speech-to-Text'],
    ['Open-Weight-Modell(?:e|en)?', 'Open-Weight-Modell'],
    ['Benchmarks?', 'Benchmark'],
    ['Prompt Caching', 'Prompt Caching'],
    ['KI-Detektor(?:en)?', 'KI-Detektor'],
    ['Transformer', 'Transformer'],
    ['Reasoning-Modell(?:e|en)?', 'Reasoning-Modell'],
    ['Kontext-Engineering', 'Kontext-Engineering'],
    ['Vibe Coding', 'Vibe Coding'],
    ['Inpainting', 'Inpainting'],
    ['Upscaling', 'Upscaling'],
    ['Deepfakes?', 'Deepfake'],
    ['C2PA|Content Credentials', 'C2PA'],
    ['LoRAs?', 'LoRA'],
    ['Quantisierung|quantisierte', 'Quantisierung'],
    ['VRAM', 'VRAM'],
    ['Rate Limits?', 'Rate Limit'],
    ['Text-to-Image', 'Text-to-Image'],
    ['Text-to-Video', 'Text-to-Video'],
    ['agentische[nrs]? Workflows?', 'Agentischer Workflow'],
    ['Model Cards?', 'Model Card'],
]

// Erst Tool-Namen (Link auf den Steckbrief), dann Fachbegriffe (Link ins Glossar).
const ALLE = [...TOOL_NAMEN.map(([m, slug]) => [m, { tool: slug }]), ...BEGRIFFE.map(([m, term]) => [m, { slug: glossarSlug(term) }])]
const MUSTER = new RegExp(`(?<![\\p{L}\\p{N}-])(${ALLE.map(([m]) => `(?:${m})`).join('|')})(?![\\p{L}\\p{N}-])`, 'gu')
const ZIEL = ALLE.map(([m, ziel]) => [new RegExp(`^(?:${m})$`, 'u'), ziel])

// Zerlegt einen Text in Teile: Strings, { text, slug } für Glossar-Links und { text, tool } für Tool-Steckbriefe.
// gesehen: Set der schon verlinkten Ziele auf dieser Seite (wird ergänzt). ausser: Glossar-Slug oder 'tool:<slug>'.
export function glossarTeile(text, gesehen = new Set(), ausser = null) {
    if (typeof text !== 'string') return [text]
    const teile = []
    let rest = 0
    for (const m of text.matchAll(MUSTER)) {
        const ziel = ZIEL.find(([re]) => re.test(m[1]))?.[1]
        const key = ziel && (ziel.tool ? `tool:${ziel.tool}` : ziel.slug)
        if (!key || gesehen.has(key) || key === ausser) continue
        gesehen.add(key)
        if (m.index > rest) teile.push(text.slice(rest, m.index))
        teile.push({ text: m[1], ...ziel })
        rest = m.index + m[1].length
    }
    if (rest < text.length) teile.push(text.slice(rest))
    return teile
}
