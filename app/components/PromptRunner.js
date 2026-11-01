'use client'

import { useMemo, useState } from 'react'
import SendToAI from './SendToAI'

const fill = (template, values) => template.replace(/\{(\w+)\}/g, (m, key) => (values[key]?.trim() ? values[key].trim() : `[${key.toUpperCase()}]`))

// Felder ausfüllen, Vorschau sehen, an eine KI schicken. Leere Felder bleiben als [PLATZHALTER] sichtbar.
export default function PromptRunner({ vorlage, felder }) {
    const [values, setValues] = useState({})
    const prompt = useMemo(() => fill(vorlage, values), [vorlage, values])
    const offen = felder.filter((f) => !values[f.key]?.trim()).length

    const beispiel = () => setValues(Object.fromEntries(felder.map((f) => [f.key, f.beispiel])))

    return (
        <div className="prompt-runner">
            <div className="prompt-fields">
                {felder.map((f) => (
                    <label key={f.key}>
                        <span>{f.label}</span>
                        {f.mehrzeilig ? (
                            <textarea rows={5} value={values[f.key] || ''} placeholder={`z. B. ${f.beispiel}`} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                        ) : (
                            <input type="text" value={values[f.key] || ''} placeholder={`z. B. ${f.beispiel}`} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                        )}
                    </label>
                ))}
                <p className="prompt-fields-actions">
                    <button type="button" className="copy-button" onClick={beispiel}>
                        Mit Beispiel füllen
                    </button>
                    <button type="button" className="copy-button" onClick={() => setValues({})}>
                        Leeren
                    </button>
                    <span>{offen ? `${offen} Feld${offen > 1 ? 'er' : ''} offen` : 'Alles ausgefüllt ✓'}</span>
                </p>
            </div>
            <div className="prompt-preview">
                <p className="send-to-ai-label">Dein Prompt</p>
                <pre tabIndex={0} role="region" aria-label="Prompt-Text">{prompt}</pre>
                <SendToAI prompt={prompt} />
            </div>
        </div>
    )
}
