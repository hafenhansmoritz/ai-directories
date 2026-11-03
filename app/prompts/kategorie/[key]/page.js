import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../../components/Breadcrumbs'
import Faq, { faqSchema } from '../../../components/Faq'
import Toc from '../../../components/Toc'
import JeanIcon from '../../../components/JeanIcon'
import GlossarText from '../../../components/GlossarText'
import LeadMagnetBox from '../../../components/LeadMagnetBox'
import { Band } from '../../../components/Deko'
import { SITE_NAME, absoluteUrl } from '../../../../lib/site'
import { promptsByKategorie, TECHNIKEN } from '../../../../lib/prompts'
import { KATEGORIE_TEXTE } from '../../../../lib/prompt-kategorien'
import { getTutorial } from '../../../../lib/tutorials'
import { getZielgruppe } from '../../../../lib/zielgruppen'
import { getKbRubrik } from '../../../../lib/kb'
import Vernetzt, { seitenPfad } from '../../../components/Vernetzt'
import PromptCardList from '../../../components/PromptCardList'

export const dynamicParams = false

const getKategorie = (key) => {
    const k = promptsByKategorie().find((x) => x.key === key)
    return k && k.prompts.length && KATEGORIE_TEXTE[key] ? { ...k, ...KATEGORIE_TEXTE[key] } : null
}

export function generateStaticParams() {
    return promptsByKategorie()
        .filter((k) => k.prompts.length && KATEGORIE_TEXTE[k.key])
        .map((k) => ({ key: k.key }))
}

export function generateMetadata({ params }) {
    const k = getKategorie(params.key)
    if (!k) return {}
    return {
        title: k.titel,
        description: `${k.prompts.length} Vorlagen auf Deutsch. ${k.intro} Felder ausfüllen und mit einem Klick an ChatGPT, Claude, Perplexity oder Grok senden.`.slice(0, 300),
        alternates: { canonical: `/prompts/kategorie/${k.key}` },
    }
}

const FARBEN = ['#fde68a', '#a7f3d0', '#bfdbfe', '#fbcfe8', '#ddd6fe']

function PromptKategoriePage({ params }) {
    const k = getKategorie(params.key)
    if (!k) notFound()
    const tutorials = k.tutorials.map(getTutorial).filter(Boolean)
    const zielgruppen = k.zielgruppen.map(getZielgruppe).filter(Boolean)
    const rubrik = k.rubrik && getKbRubrik(k.rubrik)
    const gesehen = new Set()
    const andere = promptsByKategorie().filter((x) => x.key !== k.key && x.prompts.length && KATEGORIE_TEXTE[x.key])
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Prompts', path: '/prompts' },
        { name: k.name, path: `/prompts/kategorie/${k.key}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: k.titel,
            itemListElement: k.prompts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: absoluteUrl(`/prompts/${p.slug}`) })),
        },
        faqSchema(k.faq),
    ]
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    Prompt-Kategorie · {k.prompts.length} Vorlagen
                </p>
                <h1 className="with-icon">
                    <JeanIcon badge={k.icon} size={40} /> {k.titel}
                </h1>
                <p className="lead">
                    <GlossarText text={k.intro} gesehen={gesehen} />
                </p>
            </section>
            <Toc
                items={[
                    ['vorlagen', 'Vorlagen'],
                    ['tipps', 'Tipps'],
                    ['lernen', 'Weiterlernen'],
                    ['faq', 'FAQ'],
                ]}
            />
            <section aria-labelledby="vorlagen">
                <h2 id="vorlagen">Alle {k.prompts.length} Vorlagen 💬</h2>
                <PromptCardList prompts={k.prompts} />
            </section>
            <Band farbe="mint" id="tipps" titel="So holst du mehr raus 🧭" sticker={`${k.tipps.length} Tipps`}>
                <ul className="kriterien-grid">
                    {k.tipps.map(([titel, text], i) => (
                        <li key={titel} style={{ '--tile': FARBEN[i % FARBEN.length] }}>
                            <span className="kriterien-icon" aria-hidden="true">
                                {i + 1}
                            </span>
                            <strong>{titel}</strong>
                            <span>
                                <GlossarText text={text} gesehen={gesehen} />
                            </span>
                        </li>
                    ))}
                </ul>
            </Band>
            <section aria-labelledby="lernen">
                <h2 id="lernen">Weiterlernen und passende Tools</h2>
                <ul className="link-cards">
                    {tutorials.map((t) => (
                        <li key={t.slug}>
                            <Link href={`/tutorials/${t.slug}`}>
                                <strong>🎓 {t.title}</strong>
                            </Link>
                            <span>{t.minuten} Minuten, interaktiv mit Quiz</span>
                        </li>
                    ))}
                    {rubrik && (
                        <li>
                            <Link href={`/ki-tools/${rubrik.key}`}>
                                <strong>🧰 {rubrik.name}</strong>
                            </Link>
                            <span>{rubrik.tools.length} Tools in der Datenbank, mit Auswahlhilfe.</span>
                        </li>
                    )}
                    <li>
                        <Link href="/prompt-baukasten">
                            <strong>🧱 Prompt-Baukasten</strong>
                        </Link>
                        <span>Eigenen Prompt Schritt für Schritt zusammenstellen.</span>
                    </li>
                    <li>
                        <Link href="/prompt-check">
                            <strong>✅ Prompt-Check</strong>
                        </Link>
                        <span>Deinen eigenen Prompt prüfen und verbessern lassen.</span>
                    </li>
                </ul>
                {zielgruppen.length > 0 && (
                    <p>
                        Passend für:{' '}
                        {zielgruppen.map((z, i) => (
                            <span key={z.slug}>
                                {i > 0 && ' · '}
                                <Link href={`/ki-tools/fuer/${z.slug}`}>{z.titel}</Link>
                            </span>
                        ))}
                    </p>
                )}
            </section>
            <section aria-labelledby="faq">
                <h2 id="faq">Häufige Fragen 🙋</h2>
                <Faq items={k.faq} />
            </section>
            <LeadMagnetBox id="prompt-paket" />
            <section aria-labelledby="andere">
                <h2 id="andere">Weitere Prompt-Kategorien</h2>
                <ul className="kb-hero-chips">
                    {andere.map((x) => (
                        <li key={x.key}>
                            <Link href={`/prompts/kategorie/${x.key}`}>
                                {x.name} ({x.prompts.length})
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <PromptKategoriePage params={params} />
            <Vernetzt pfad={seitenPfad('/prompts/kategorie/[key]', params)} />
        </>
    )
}
