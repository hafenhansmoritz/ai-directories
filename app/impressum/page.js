import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { SITE_NAME } from '../../lib/site'

export const metadata = {
    title: 'Impressum',
    description: 'Anbieterkennzeichnung von mentat.codes nach § 5 DDG und Verantwortlicher für den Inhalt nach § 18 Abs. 2 MStV.',
    alternates: { canonical: '/impressum' },
    robots: { index: false, follow: true },
}

const NAME = 'Hans Moritz Hafen'
const ANSCHRIFT = ['Grabenstraße 28', '66538 Neunkirchen', 'Deutschland']
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
                <p className="lead">Angaben gemäß § 5 DDG</p>
            </section>
            <div className="prose">
                <section aria-labelledby="impressum-anbieter">
                    <h2 id="impressum-anbieter">Anbieter</h2>
                    <address>
                        {NAME}
                        {ANSCHRIFT.map((zeile) => (
                            <span key={zeile}>
                                <br />
                                {zeile}
                            </span>
                        ))}
                    </address>
                </section>
                <section aria-labelledby="impressum-kontakt">
                    <h2 id="impressum-kontakt">Kontakt</h2>
                    <p>
                        E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </p>
                </section>
                <section aria-labelledby="impressum-mstv">
                    <h2 id="impressum-mstv">Verantwortlich für den Inhalt</h2>
                    <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: {NAME}, Anschrift wie oben.</p>
                </section>
            </div>
            <p className="box box-info">
                Zur <Link href="/datenschutz">Datenschutzerklärung</Link> und zur <Link href="/transparenz">Transparenz-Seite</Link>.
            </p>
        </>
    )
}
