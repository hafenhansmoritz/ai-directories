import Link from 'next/link'
import Breadcrumbs, { breadcrumbSchema } from '../components/Breadcrumbs'
import JsonLd from '../components/JsonLd'
import { SITE_NAME } from '../../lib/site'
import { LEAD_EMAIL, NEWSLETTER_EMBED, NEWSLETTER_NAME, NEWSLETTER_URL } from '../../lib/monetization'
import { getGuides } from '../../lib/guides'
import Vernetzt, { seitenPfad } from '../components/Vernetzt'
import { KONTO_AKTIV } from '../../lib/konto'

export const metadata = {
    title: 'Datenschutzerklärung',
    description: 'Welche Daten mentat.codes verarbeitet: Hosting bei GitHub Pages, Kontaktformular über FormSubmit, Speicherung im eigenen Browser, keine Analyse-Tools und keine Werbe-Cookies.',
    alternates: { canonical: '/datenschutz' },
    robots: { index: false, follow: true },
}

const STAND = '1. November 2026'

const ABSCHNITTE = [
    [
        'Verantwortlich',
        [
            `Jean Maurice Port, erreichbar per E-Mail an ${LEAD_EMAIL} oder über das Kontaktformular am Ende jeder Seite.`,
        ],
    ],
    [
        'Kurz gesagt',
        [
            KONTO_AKTIV
                ? 'mentat.codes setzt keine Analyse-Tools, keine Werbe-Cookies und keine Tracking-Pixel ein. Personenbezogene Daten verarbeiten wir, wenn du uns über das Formular schreibst, beim Abruf der Seite durch den Hosting-Anbieter und, falls du ein Konto anlegst, für dein Konto: E-Mail-Adresse, Profil, Sammlung, Kommentare und Forenbeiträge sowie deine Einwilligungen (siehe Abschnitt Benutzerkonto).'
                : 'mentat.codes setzt keine Analyse-Tools, keine Werbe-Cookies und keine Tracking-Pixel ein. Personenbezogene Daten verarbeiten wir nur, wenn du uns über das Formular schreibst, und beim Abruf der Seite durch den Hosting-Anbieter.',
        ],
    ],
    [
        'Hosting bei GitHub Pages',
        [
            'Die Website liegt bei GitHub Pages (GitHub, Inc., USA, eine Tochter der Microsoft Corporation). Beim Aufruf verarbeitet GitHub technisch notwendige Daten wie IP-Adresse, Zeitpunkt und aufgerufene Adresse, um die Seite auszuliefern und vor Missbrauch zu schützen.',
            'Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und schnellen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Für Übermittlungen in die USA stützt sich GitHub auf das EU-US Data Privacy Framework und Standardvertragsklauseln. Details stehen im GitHub Privacy Statement.',
            'Wie lange GitHub diese Zugriffsdaten aufbewahrt, legt GitHub selbst fest und beschreibt es im GitHub Privacy Statement. Wir selbst bekommen keine Zugriffsprotokolle und werten keine aus.',
        ],
    ],
    [
        'Kontaktformular',
        [
            'Wenn du das Formular abschickst, übermitteln wir Name (optional), E-Mail-Adresse, Anliegen, Website (optional), Nachricht und die Adresse der Seite, auf der du warst. Die Daten werden über den Dienst FormSubmit (formsubmit.co) per E-Mail an Jean weitergeleitet.',
            'Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du mit dem Häkchen im Formular gibst, und bei Anfragen zu einem Auftrag die Anbahnung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO). Du kannst die Einwilligung jederzeit per E-Mail widerrufen.',
            'Wir nutzen deine Angaben nur, um deine Anfrage zu beantworten. Die E-Mails löschen wir, wenn die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten bestehen.',
        ],
    ],
    [
        'Speicherung in deinem Browser',
        [
            'Einige Werkzeuge merken sich Eingaben nur in deinem eigenen Browser (localStorage oder sessionStorage), zum Beispiel deine Bewertungen im KI-Test, den Fortschritt im Launch-Kit, ob ein Hinweis schon angezeigt wurde, deine Merkliste, deinen KI-Stack, deinen Launch-Tracker (Status, Notizen und Erinnerungen je Verzeichnis), die zuletzt angesehenen Seiten, wie weit du einen Artikel gelesen hast, den Zeitpunkt deines letzten Besuchs (für den Hinweis auf neue KI-News), verschenkte Herzen, Abzeichen, die gewählte Farbe und den Ruhe-Modus. Ohne Anmeldung verlassen diese Daten deinen Browser nicht und lassen sich über die Browser-Einstellungen löschen.',
            ...(KONTO_AKTIV ? ['Wenn du dich mit einem Konto anmeldest, werden Merkliste, Herzen, gelesene Artikel, Verlauf und Abzeichen zusätzlich in deinem Konto gespeichert, damit du sie auf allen Geräten hast (siehe Abschnitt Benutzerkonto). Beim Abmelden entfernen wir sie aus dem Browser.'] : []),
        ],
    ],
    ...(KONTO_AKTIV
        ? [
              [
                  'Benutzerkonto, Profil und Community',
                  [
                      'Für ein Konto brauchen wir nur deine E-Mail-Adresse. Die Anmeldung läuft ohne Passwort über einen Link per E-Mail. Gespeichert werden außerdem, was du selbst anlegst: Profil (Anzeigename, Handle, Bio, Beruf, Pronomen, Links, Profilbild und Banner), deine Sammlung (Merkliste, Herzen, gelesene Artikel, Verlauf, Abzeichen), dein Launch-Tracker (Status, Notizen und Erinnerungsdaten je Verzeichnis), dein KI-Stack (Tools, Tarife und Beträge, die du einträgst), Kommentare und Forumsbeiträge sowie deine Einwilligungen mit Datum.',
                      'Die Daten liegen bei Supabase Inc. auf Servern in Frankfurt am Main (EU). Mit Supabase besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Supabase Inc. hat seinen Sitz in den USA, ein Zugriff von dort (etwa für Wartung und Support) ist deshalb nicht ganz auszuschließen. Wie solche Übermittlungen abgesichert sind, regelt der Vertrag zur Auftragsverarbeitung mit Supabase.',
                      'Die E-Mails mit dem Anmelde-Link verschickt Supabase in unserem Auftrag an die Adresse, die du eingibst.',
                      'Bilder, die du über den Bild-Editor im Profil hochlädst, werden vorher in deinem Browser neu gespeichert. Dabei gehen Standort- und Kameradaten (EXIF) verloren.',
                      'Rechtsgrundlage für Konto, Profil und Community ist der Nutzungsvertrag (Art. 6 Abs. 1 lit. b DSGVO). Newsletter und persönliche Empfehlungen schicken wir nur mit deiner gesonderten Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du jederzeit in deinem Konto widerrufen kannst. Jede Einwilligung und jeden Widerruf speichern wir mit Datum als Nachweis.',
                      'Öffentlich sichtbar sind Handle, Anzeigename, Profilbild und deine Beiträge. Bio, Beruf, Pronomen, Links und Abzeichen siehst nur du, wenn du dein Profil auf privat stellst. Deine E-Mail-Adresse zeigen wir nie öffentlich.',
                      'Im Konto kannst du alle Daten jederzeit als Datei herunterladen und dein Konto selbst löschen. Dann löschen wir Profil, Bilder, Sammlung, Launch-Tracker, KI-Stack und den Nachweis deiner Einwilligungen sofort.',
                      'Kommentare, Forenthemen, Forenbeiträge und Meldungen, die du geschrieben hast, bleiben nach dem Löschen ohne Namen stehen, damit Diskussionen verständlich bleiben. Willst du das nicht, ziehe deine Beiträge vor dem Löschen einzeln zurück, dann ersetzen wir ihren Text.',
                  ],
              ],
          ]
        : []),
    ...(NEWSLETTER_URL || NEWSLETTER_EMBED
        ? [
              [
                  'Newsletter',
                  [
                      `Für den Newsletter nutzen wir ${NEWSLETTER_NAME}. Anmeldung, Bestätigung deiner Adresse und Abmeldung laufen direkt beim Anbieter, nach dessen Datenschutzregeln. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du mit dem Abmeldelink in jeder Ausgabe widerrufen kannst.`,
                      ...(NEWSLETTER_EMBED ? ['Das eingebettete Anmeldeformular lädt der Anbieter selbst. Dabei erfährt er wie bei jedem Seitenaufruf deine IP-Adresse.'] : []),
                  ],
              ],
          ]
        : []),
    ...(getGuides().length
        ? [
              [
                  'Guides zum Herunterladen',
                  [
                      'Für einen Guide fragen wir deine E-Mail-Adresse ab. Sie geht wie beim Kontaktformular über FormSubmit per E-Mail an Jean. Ob du zusätzlich Neuigkeiten per Mail möchtest, entscheidest du mit einem eigenen Häkchen; ohne dieses Häkchen schreiben wir dir keine Werbung.',
                  ],
              ],
          ]
        : []),
    [
        'Links zu anderen Anbietern',
        [
            'Links zu Tools, Verzeichnissen, YouTube oder KI-Diensten führen auf fremde Websites. Erst mit dem Klick werden dort Daten verarbeitet, nach den Regeln des jeweiligen Anbieters. Bei den Buttons „Prompt senden an …“ wird der Text des Prompts in der Adresse an den gewählten KI-Dienst übergeben.',
            'Manche Links sind Partnerlinks. Der Anbieter erfährt dadurch, dass du von mentat.codes kommst. Mehr dazu auf der Seite Transparenz.',
        ],
    ],
    [
        'Deine Rechte',
        [
            'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Eine formlose E-Mail genügt.',
            'Eine Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Was bis dahin passiert ist, bleibt rechtmäßig.',
        ],
    ],
    [
        'Widerspruchsrecht nach Art. 21 DSGVO',
        [
            'Verarbeiten wir Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO), etwa beim Hosting, kannst du dieser Verarbeitung aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, es gibt zwingende schutzwürdige Gründe, die deine Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Eine formlose E-Mail genügt.',
        ],
    ],
]

function DatenschutzPage() {
    const crumbs = [
        { name: SITE_NAME, path: '/' },
        { name: 'Datenschutz', path: '/datenschutz' },
    ]
    return (
        <>
            <JsonLd data={breadcrumbSchema(crumbs)} />
            <Breadcrumbs items={crumbs} />
            <section className="hero">
                <p className="eyebrow">Stand: {STAND}</p>
                <h1>Datenschutzerklärung</h1>
                <p className="lead">Was mit deinen Daten passiert, wenn du mentat.codes besuchst oder uns schreibst. Ohne Juristendeutsch, so weit es geht.</p>
            </section>
            <div className="prose">
                {ABSCHNITTE.map(([h, absaetze], i) => (
                    <section key={h} aria-labelledby={`ds-${i}`}>
                        <h2 id={`ds-${i}`}>{h}</h2>
                        {absaetze.map((p) => (
                            <p key={p.slice(0, 30)}>{p}</p>
                        ))}
                    </section>
                ))}
            </div>
            <p className="box box-info">
                Fragen zum Datenschutz? Nutze das Formular unten oder schreib an <span className="leadform-adresse">{LEAD_EMAIL}</span>. Zur <Link href="/transparenz">Transparenz-Seite</Link>.
            </p>
        </>
    )
}

export default function Seite() {
    return (
        <>
            <DatenschutzPage />
            <Vernetzt pfad={seitenPfad('/datenschutz')} />
        </>
    )
}
