'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { getScore, jeanLine } from '../../lib/score'
import { formatRating, formatVisits, pricingLabel } from '../../utils/i18n-de'
import konfetti from '../../lib/konfetti'
import { verleihe } from '../../lib/herz'
import TeilenKnopf from '../components/TeilenKnopf'

const QUESTIONS = [
    {
        id: 'budget',
        q: 'Wie viel Budget hast du für Einträge?',
        a: [
            ['zero', 'Null. Ich lebe von Instant-Nudeln.'],
            ['some', 'Ein bisschen, wenn es sich lohnt.'],
            ['any', 'Egal, Hauptsache es bringt was.'],
        ],
    },
    {
        id: 'goal',
        q: 'Was willst du vor allem?',
        a: [
            ['links', 'Starke Backlinks für SEO.'],
            ['traffic', 'Echte Besucher und Nutzer.'],
            ['both', 'Beides. Ich bin gierig.'],
        ],
    },
    {
        id: 'patience',
        q: 'Wie viel Geduld hast du mit Formularen?',
        a: [
            ['none', 'Keine. Ein Captcha und ich bin raus.'],
            ['some', 'Etwas, solange es nicht ewig dauert.'],
        ],
    },
]

function recommend(options, answers) {
    return options
        .filter((d) => answers.budget !== 'zero' || d.pricing === 'Free')
        .filter((d) => answers.budget !== 'some' || d.pricing !== 'Paid' || d.domain_rating >= 50)
        .filter((d) => answers.patience !== 'none' || d.submission_experience === 'Good')
        .map((d) => {
            const s = getScore(d).parts
            const weight =
                answers.goal === 'links' ? s.dr * 2 + s.traffic : answers.goal === 'traffic' ? s.dr + s.traffic * 3 : s.dr + s.traffic * 1.5
            return { ...d, weight: weight + s.price + s.submission }
        })
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 5)
}

// Antworten im Hash, damit das Ergebnis teilbar ist und Neuladen übersteht: #a=zero,links,none
const ausHash = (hash) => {
    const m = hash.match(/(?:^#|&)a=([a-z,]+)/)
    if (!m) return null
    const werte = m[1].split(',')
    const antworten = {}
    QUESTIONS.forEach((q, i) => {
        if (q.a.some(([v]) => v === werte[i])) antworten[q.id] = werte[i]
    })
    return QUESTIONS.every((q) => antworten[q.id]) ? antworten : null
}
const hashSetzen = (antworten) => {
    try {
        const ziel = antworten ? `#a=${QUESTIONS.map((q) => antworten[q.id]).join(',')}` : window.location.pathname + window.location.search
        window.history.replaceState(null, '', ziel)
    } catch {}
}

export default function Quiz({ options }) {
    const [answers, setAnswers] = useState({})
    const ergebnisRef = useRef(null)
    const fokusNachher = useRef(false)
    const finished = QUESTIONS.every((q) => answers[q.id])
    const results = useMemo(() => (finished ? recommend(options, answers) : []), [finished, options, answers])

    useEffect(() => {
        const geteilt = ausHash(window.location.hash)
        if (geteilt) {
            fokusNachher.current = true
            setAnswers(geteilt)
        }
    }, [])

    useEffect(() => {
        if (!finished) return
        hashSetzen(answers)
        if (fokusNachher.current && ergebnisRef.current) {
            fokusNachher.current = false
            ergebnisRef.current.focus()
        }
    }, [finished, answers])

    const choose = (id, value) => {
        const next = { ...answers, [id]: value }
        setAnswers(next)
        if (QUESTIONS.every((q) => next[q.id]) && !finished) {
            fokusNachher.current = true
            konfetti()
            verleihe('Detektiv-Abzeichen')
        }
    }

    const neustart = () => {
        hashSetzen(null)
        setAnswers({})
    }

    const teilText = `Meine passenden KI-Verzeichnisse laut AIGeddon-Quiz:\n${results.map((d, i) => `${i + 1}. ${d.name}`).join('\n')}\n\nSelbst ausprobieren:`

    return (
        <div className="quiz">
            {QUESTIONS.map((q, i) => (
                <fieldset key={q.id} className="quiz-q">
                    <legend>
                        {i + 1}. {q.q}
                    </legend>
                    <div className="quiz-a">
                        {q.a.map(([value, label]) => (
                            <button
                                type="button"
                                key={value}
                                className={`quiz-option${answers[q.id] === value ? ' is-active' : ''}`}
                                aria-pressed={answers[q.id] === value}
                                onClick={() => choose(q.id, value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </fieldset>
            ))}

            {finished && (
                <section aria-labelledby="ergebnis" className="quiz-result">
                    <h2 id="ergebnis" tabIndex={-1} ref={ergebnisRef}>
                        Deine Top 5 🎯
                    </h2>
                    {results.length === 0 ? (
                        <p>Mit diesen Antworten bleibt nichts übrig. Gönn dir etwas mehr Budget oder Geduld.</p>
                    ) : (
                        <ol className="quiz-list">
                            {results.map((d) => (
                                <li key={d.slug}>
                                    <p>
                                        <Link href={`/verzeichnis/${d.slug}`}>
                                            <strong>{d.name}</strong>
                                        </Link>{' '}
                                        · Score {getScore(d).total} · DR {formatRating(d.domain_rating)} · {formatVisits(d.monthly_visits)} Besuche ·{' '}
                                        {pricingLabel(d.pricing)}
                                    </p>
                                    <p className="quiz-jean">🧔 {jeanLine(d)}</p>
                                </li>
                            ))}
                        </ol>
                    )}
                    <p className="e-teilen">
                        {results.length > 0 && (
                            <TeilenKnopf titel="Mein Quiz-Ergebnis" text={teilText} link={() => window.location.href} />
                        )}
                        <button type="button" className="button button-small" onClick={neustart}>
                            Nochmal von vorn
                        </button>
                    </p>
                </section>
            )}
        </div>
    )
}
