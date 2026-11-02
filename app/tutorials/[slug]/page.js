import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '../../components/JsonLd'
import Breadcrumbs, { breadcrumbSchema } from '../../components/Breadcrumbs'
import Jean from '../../components/Jean'
import TutorialStepper from '../../components/TutorialStepper'
import LeadMagnetBox from '../../components/LeadMagnetBox'
import SlideInLead from '../../components/SlideInLead'
import EmailCapture from '../../components/EmailCapture'
import { SITE_NAME } from '../../../lib/site'
import { getTutorials, getTutorial } from '../../../lib/tutorials'
import { getPrompt } from '../../../lib/prompts'
import { getTool, toolHref, toolRel } from '../../../lib/tools'
import { getLeadmagnet } from '../../../lib/leadmagnets'
import { NEWSLETTER_NAME, NEWSLETTER_URL } from '../../../lib/monetization'
import Vernetzt, { seitenPfad } from '../../components/Vernetzt'

export const dynamicParams = false

export function generateStaticParams() {
    return getTutorials().map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }) {
    const t = getTutorial(params.slug)
    if (!t) return {}
    return { title: t.title.length > 45 ? t.title : `${t.title}: Tutorial`, description: t.description.slice(0, 300), alternates: { canonical: `/tutorials/${t.slug}` } }
}

function TutorialPage({ params }) {
    const t = getTutorial(params.slug)
    if (!t) notFound()
    const prompts = (t.prompts || []).map(getPrompt).filter(Boolean)
    const tools = (t.tools || []).map(getTool).filter(Boolean)
    const magnet = getLeadmagnet(t.magnet)
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: t.title, path: `/tutorials/${t.slug}` },
    ]
    const schema = [
        breadcrumbSchema(crumbs),
        {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: t.title,
            description: t.description,
            totalTime: `PT${t.minuten}M`,
            step: t.schritte.map((s, n) => ({ '@type': 'HowToStep', position: n + 1, name: s.titel, text: s.text.join(' '), url: `#schritt-${n + 1}` })),
        },
    ]
    const finale = (
        <p className="cta-row">
            <Link className="button" href="/prompt-baukasten">
                Jetzt eigenen Prompt bauen →
            </Link>
            {magnet && <Link href="/downloads">{magnet.title} holen</Link>}
        </p>
    )
    return (
        <>
            <JsonLd data={schema} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">
                    Tutorial · {t.level} · {t.minuten} Minuten
                </p>
                <h1>{t.title}</h1>
                <p className="lead">{t.description}</p>
            </section>
            <Jean>{t.jean}</Jean>
            <TutorialStepper schritte={t.schritte} quiz={t.quiz} finale={finale} />
            {magnet && <LeadMagnetBox id={magnet.id} />}
            {prompts.length > 0 && (
                <section aria-labelledby="prompts">
                    <h2 id="prompts">Passende Prompt-Vorlagen</h2>
                    <ul className="link-cards">
                        {prompts.map((p) => (
                            <li key={p.slug}>
                                <Link href={`/prompts/${p.slug}`}>
                                    <strong>{p.title}</strong>
                                </Link>
                                <span>{p.ziel}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {tools.length > 0 && (
                <section aria-labelledby="tools">
                    <h2 id="tools">Werkzeuge für diesen Workflow</h2>
                    <ul className="link-cards">
                        {tools.map((x) => (
                            <li key={x.slug}>
                                <Link href={`/tools/${x.slug}`}>
                                    <strong>{x.name}</strong>
                                </Link>
                                <span>{x.summary_de}</span>
                                <a href={toolHref(x)} target="_blank" rel={toolRel(x)}>
                                    {x.name} ansehen ↗{x.affiliate && <sup>*</sup>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <SlideInLead id={`tutorial-${t.slug}`} title={NEWSLETTER_URL ? `Jede Woche neue Prompts von ${NEWSLETTER_NAME} 📬` : 'Mehr davon als Video? 🎬'}>
                <p>{NEWSLETTER_URL ? 'Die besten Prompts der Woche, ein Trick, ein Tool. Kostenlos, jederzeit kündbar.' : 'Prompt-Tricks, Tool-Tests und Case Studies auf dem mentat.codes-Kanal.'}</p>
                <EmailCapture />
            </SlideInLead>
            <p>
                <Link href="/tutorials">← Alle Tutorials</Link>
            </p>
        </>
    )
}

export default function Seite({ params }) {
    return (
        <>
            <TutorialPage params={params} />
            <Vernetzt pfad={seitenPfad('/tutorials/[slug]', params)} />
        </>
    )
}
