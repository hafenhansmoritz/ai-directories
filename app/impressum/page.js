import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { SITE_NAME } from '../../lib/site'

export const metadata = {
    title: 'Impressum',
    description: 'Wer hinter mentat.codes steht und wie du Jean erreichst: ein privates, nichtkommerzielles Projekt zu Unterhaltungs- und Demonstrationszwecken.',
    alternates: { canonical: '/impressum' },
    robots: { index: false, follow: true },
}

const NAME = 'Jean Maurice Port'
const EMAIL = 'hello@mentat.codes'

export default function ImpressumPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Impressum', path: '/impressum' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <h1>Impressum</h1>
                <p className="lead">Wer hinter mentat.codes steht und wie du Kontakt aufnimmst.</p>
            </section>
            <div className="prose">
                <section aria-labelledby="impressum-anbieter">
                    <h2 id="impressum-anbieter">Betrieben von</h2>
                    <p>{NAME}</p>
                </section>
                <section aria-labelledby="impressum-projekt">
                    <h2 id="impressum-projekt">Über das Projekt</h2>
                    <p>mentat.codes ist ein privates, nichtkommerzielles Projekt zu Unterhaltungs- und Demonstrationszwecken.</p>
                </section>
                <section aria-labelledby="impressum-kontakt">
                    <h2 id="impressum-kontakt">Kontakt</h2>
                    <p>
                        E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </p>
                </section>
            </div>
            <p className="box box-info">
                Zur <Link href="/datenschutz">Datenschutzerklärung</Link> und zur <Link href="/transparenz">Transparenz-Seite</Link>.
            </p>
        </>
    )
}
