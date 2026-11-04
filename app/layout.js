import Link from './components/NavLink'
import { getGuides } from '../lib/guides'
import './globals.css'
import './styles/a-layout.css'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, REPO_URL, withBase } from '../lib/site'
import Reveal from './components/Reveal'
import LeadBox from './components/LeadBox'
import JeansSenf from './components/JeansSenf'
import LeseFortschritt from './components/LeseFortschritt'
import Gruss from './components/Gruss'
import SeitenAnhang from './components/SeitenAnhang'
import { SidebarLeft, SidebarRight, MobileDock } from './components/Sidebars'
import BackToTop from './components/BackToTop'
import JeanIcon, { JeanSprite } from './components/JeanIcon'
import BartModus from './components/BartModus'
import ToastHost from './components/ToastHost'
import Herzstuecke from './components/Herzstuecke'
import SeitenAktionen from './components/SeitenAktionen'
import FooterExtras from './components/FooterExtras'
import LeseHelfer from './components/LeseHelfer'
import KontoKnopf from './components/KontoKnopf'
import { Glocke, Kommentare, KontoSync } from './components/KontoInseln'
import { KONTO_AKTIV } from '../lib/konto'
import HauptNav from './components/HauptNav'
import MerkZaehler from './components/MerkZaehler'
import RuheKnopf from './components/RuheKnopf'
import ThemeSchalter from './components/ThemeSchalter'
import { HeuteKarte } from './components/HeuteWidgets'
import SENF_TEXTE from '../db/texte/hubs.json'
import JsonLd from './components/JsonLd'
import { absoluteUrl } from '../lib/site'
import { getKbRubriken } from '../lib/kb'
import { getTestKategorien } from '../lib/kitests'
import { RECHNER } from '../lib/rechner'
import { AUTOR_ID } from '../lib/autor'

// Nur die Pfade mit eigenem „Jeans Senf“-Text; die Texte selbst lädt JeansSenf bei Bedarf nach.
const SENF_PFADE = Object.keys(SENF_TEXTE)

// Hauptnavigation: die Kernaufgaben. Gratis, Deals, DACH, Skills, Tutorials, KI-Test und Über Jean stehen im Footer.
const HAUPTNAV = [
    { href: '/#alle', label: 'Verzeichnisse', emoji: '📇', bereich: ['/', '/verzeichnis', '/liste', '/top-50', '/deutsche-ki-verzeichnisse', '/neu-entdeckt', '/vergleich', '/ki-verzeichnis', '/freischaltung'] },
    { href: '/ki-tools', label: 'KI-Tools', emoji: '🛠️', bereich: ['/ki-tools', '/tools', '/tool-finder', '/tool-vergleiche', '/beste-ki-tools'] },
    { href: '/launch-kit', label: 'Launch-Kit', emoji: '🧰' },
    { href: '/prompts', label: 'Prompts', emoji: '💬', bereich: ['/prompts', '/prompt-baukasten', '/prompt-check'] },
    { href: '/ratgeber', label: 'Ratgeber', emoji: '📖', bereich: ['/ratgeber', '/tutorials', '/glossar'] },
    { href: '/rechner', label: 'Rechner', emoji: '🧮' },
    { href: '/ki-news', label: 'News', emoji: '📰' },
    ...(KONTO_AKTIV ? [{ href: '/forum', label: 'Forum', emoji: '🗣️' }] : []),
]

const SITE_SCHEMA = [
    {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organisation`,
        name: SITE_NAME,
        alternateName: 'AIGeddon',
        url: SITE_URL,
        logo: absoluteUrl('/opengraph-image.png'),
        founder: { '@type': 'Person', '@id': AUTOR_ID, name: 'Jean Maurice Port', url: absoluteUrl('/ueber-jean') },
        sameAs: ['https://www.youtube.com/@AIGeddon', REPO_URL],
        knowsAbout: ['KI-Verzeichnisse', 'AI Directories', 'KI-Tools', 'Prompt Engineering', 'Agent Skills', 'Technical SEO'],
        publishingPrinciples: absoluteUrl('/so-pruefen-wir'),
    },
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: 'AIGeddon',
        url: SITE_URL,
        inLanguage: 'de-DE',
        publisher: { '@id': `${SITE_URL}/#organisation` },
        potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${absoluteUrl('/ki-tools')}?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
        },
    },
]

// Linknetz im Footer: jede Rubrik von jeder Seite aus erreichbar (Hub and Spoke).
const footerSpalten = () => [
    [
        'KI-Tools',
        [
            ['/ki-tools', 'KI-Tool-Datenbank'],
            ['/ki-news', 'KI-News der Woche'],
            ['/neue-ki-modelle', 'Neue KI-Modelle 2026'],
            ['/beste-ki-tools', 'Beste KI-Tools 2026'],
            ['/tool-finder', 'KI-Tool-Finder'],
            ['/ki-tools/kostenlos', 'Kostenlose KI-Tools'],
            ['/ki-tools/chatgpt-alternativen', 'ChatGPT-Alternativen'],
            ['/ki-tools/alternativen', 'Tool-Alternativen'],
            ['/ki-tools/fuer', 'KI nach Zielgruppe'],
            ...getKbRubriken()
                .slice(0, 8)
                .map((r) => [`/ki-tools/${r.key}`, r.name]),
            ['/tools', 'KI-Tools mit Preisen'],
            ['/tool-vergleiche', 'Tool-Vergleiche'],
        ],
    ],
    [
        'KI-Verzeichnisse',
        [
            ['/ki-verzeichnis', 'Was ist ein KI-Verzeichnis?'],
            ['/#alle', 'Alle KI-Verzeichnisse'],
            ['/liste/kostenlos', 'Kostenlose KI-Verzeichnisse'],
            ['/liste/domain-rating-50-plus', 'Domain Rating 50+'],
            ['/deutsche-ki-verzeichnisse', 'Deutsche KI-Verzeichnisse'],
            ['/neu-entdeckt', 'Neu entdeckte Verzeichnisse'],
            ['/top-50', 'Top 50'],
            ['/vergleich', 'Verzeichnisse vergleichen'],
            ['/liste/rabattcodes', 'Rabattcodes'],
            ['/freischaltung', 'Freischaltdauer'],
            ['/launch-kit', 'Launch-Kit'],
        ],
    ],
    [
        'KI-Test & Rechner',
        [
            ['/ki-test', 'KI-Test: Chatbots vergleichen'],
            ['/quiz', 'Quiz'],
            ...getTestKategorien().map((k) => [`/ki-test/${k.key}`, `KI-Test ${k.name}`]),
            ['/rechner', 'KI-Rechner'],
            ...RECHNER.map((r) => [`/rechner/${r.slug}`, r.titel]),
        ],
    ],
    [
        'Prompts & Lernen',
        [
            ['/prompts', 'Prompt-Bibliothek'],
            ['/prompts/archiv', 'Prompt-Archiv'],
            ['/prompt-baukasten', 'Prompt-Baukasten'],
            ['/prompt-check', 'Prompt-Check'],
            ['/skills', 'KI-Skills'],
            ['/tutorials', 'Tutorials'],
            ...(getGuides().length ? [['/guides', 'Gratis-Guides']] : []),
            ['/downloads', 'Downloads'],
            ['/ratgeber', 'Ratgeber'],
            ['/glossar', 'KI-Glossar'],
            ['https://promptgott.mentat.codes', 'PromptGott-Blog'],
            ['https://promptgott.substack.com', 'PromptGott-Newsletter'],
        ],
    ],
]

const TICKER = [
    '⚡ Launch-Radar aktiv: Trag dein KI-Tool in die stärksten Verzeichnisse ein',
    '🚨 Eilmeldung: Backlink gesichtet, Gründer weint vor Glück',
    '🤖 Kein Roboter wurde beim Pflegen dieser Liste gelangweilt',
    '📈 DR 90 klingt toll, ist aber auch nur eine Zahl mit Selbstbewusstsein',
    '☕ Dieser Ticker läuft auf Kaffee und Domain Rating',
    '🔗 nofollow ist auch eine Form von Liebe',
    '🏆 20 passende Einträge schlagen 200 Linkfriedhöfe',
]

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    referrer: 'strict-origin-when-cross-origin',
    description:
        'mentat.codes: die kuratierte Liste der KI-Verzeichnisse mit Domain Rating, Traffic, Preis, Freischaltdauer und Einreichungs-Check. Dazu Launch-Kit, Ratgeber und KI-Use-Cases. Ehrlich, kostenlos und mit mehr Humor, als SEO erlaubt.',
    applicationName: SITE_NAME,
    openGraph: {
        type: 'website',
        locale: 'de_DE',
        siteName: SITE_NAME,
    },
    // Großes Vorschaubild: Die Bilder sind 1200 x 630. Das Bild selbst übernimmt Next.js aus og:image.
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
    // Inhaberschaftsnachweis für LinkApprove (Partnernetzwerk), Meta-Tag im <head> jeder Seite.
    other: { 'linkapprove-verification': 'a923b123-8b81-4593-8e92-bd430e7dfb9d' },
}

export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f4f7fb' },
        { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
    ],
}

// Content-Security-Policy per Meta (GitHub Pages erlaubt keine eigenen Header). Fremde Skripte, Plugins und ein
// umgebogenes base-URL sind gesperrt. 'unsafe-inline' braucht Next.js für seine eingebetteten Daten-Skripte;
// Verbindungen und Bilder bleiben für https offen (FormSubmit, Supabase, Profilbilder). Im Entwicklungsmodus aus,
// weil der Dev-Server eval nutzt. frame-ancestors geht per Meta nicht.
const CSP = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "frame-src https:",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formsubmit.co",
].join('; ')

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <head>
                {process.env.NODE_ENV === 'production' && <meta httpEquiv="Content-Security-Policy" content={CSP} />}
                <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME}: Neues auf einen Blick`} href={absoluteUrl('/feed.xml')} />
                <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME}: KI-News`} href={absoluteUrl('/ki-news/feed.xml')} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('mentat-theme');if(t==='"dark"'||t==='dark'){document.documentElement.dataset.theme='dark'}else if(t==='"light"'||t==='light'){document.documentElement.dataset.theme='light'}}catch(e){}})()`,
                    }}
                />
            </head>
            <body>
                <JeanSprite />
                <LeseFortschritt />
                <a className="skip-link" href="#inhalt">
                    Zum Inhalt springen
                </a>
                <header className="site-header">
                    <div className="container header-inner">
                        <Link href="/" className="brand">
                            <JeanIcon cool badge="strahlung" size={44} className="brand-icon" />
                            <span>
                                MENTAT.CODES <span aria-hidden="true">&gt;</span>
                            </span>
                            <span className="brand-sub">{SITE_TAGLINE}</span>
                        </Link>
                        <Gruss />
                        <div className="konto-leiste">
                            <ThemeSchalter kompakt className="header-theme-toggle" />
                            {!KONTO_AKTIV && <MerkZaehler />}
                            <Glocke />
                            <KontoKnopf />
                        </div>
                        <HauptNav punkte={HAUPTNAV} />
                    </div>
                </header>
                <div className="ticker a-ticker">
                    <div className="a-ticker-ruhe-wrap">
                        <RuheKnopf />
                    </div>
                    <div className="ticker-viewport">
                        <div className="ticker-track" aria-hidden="true">
                            {TICKER.map((t) => (
                                <span key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="a-ticker-schutz-rechts" aria-hidden="true" />
                </div>
                <div className="page-grid">
                    <aside className="sidebar sidebar-left" aria-label="Jeans Kompass">
                        <SidebarLeft />
                    </aside>
                    <main id="inhalt" tabIndex={-1} className="page-main">
                        {children}
                        <HeuteKarte />
                        <SeitenAktionen />
                        <Kommentare />
                        <JeansSenf pfade={SENF_PFADE} />
                        <SeitenAnhang />
                        <LeadBox />
                        <Reveal />
                    </main>
                    <aside className="sidebar sidebar-right" aria-label="Deals, Tools und Neuigkeiten">
                        <SidebarRight />
                    </aside>
                </div>
                <footer className="site-footer">
                    <div className="moped-strecke" aria-hidden="true">
                        <svg className="moped" viewBox="0 0 64 36" width="64" height="36">
                            <circle cx="12" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
                            <circle cx="52" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path d="M12 28 L22 16 H38 L46 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                            <path d="M22 16 C24 10 34 10 38 16" fill="#ffe14d" stroke="currentColor" strokeWidth="2.5" />
                            <path d="M46 28 L50 12 H56" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="30" cy="6" r="4" fill="#ff6fa8" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className="moped-wolke">💨</span>
                    </div>
                    <JsonLd data={SITE_SCHEMA} />
                    <nav className="footer-hub container" aria-label="Alle Rubriken">
                        {footerSpalten().map(([titel, links]) => (
                            <div key={titel}>
                                <p className="footer-hub-title">{titel}</p>
                                <ul>
                                    {links.map(([href, label]) => (
                                        <li key={href}>
                                            <Link href={href}>{label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                    <div className="container">
                        <FooterExtras />
                        <p>
                            Gebaut von <Link href="/ueber-jean">Jean Maurice Port</Link>, Senior SEO/SGE Manager bei der MotoMobilityGroup. ·{' '}
                            <Link href="/transparenz">Transparenz</Link> · <Link href="/so-pruefen-wir">So prüfen wir</Link> ·{' '}
                            <Link href="/impressum">Impressum</Link> · <Link href="/datenschutz">Datenschutz</Link> · <Link href="/merkliste">
                                Merkliste <span aria-hidden="true">⭐</span>
                            </Link> ·{' '}
                            {KONTO_AKTIV && (
                                <>
                                    <Link href="/forum">Forum</Link> · <Link href="/community-regeln">Community-Regeln</Link> ·{' '}
                                </>
                            )}
                            <a href="https://www.youtube.com/@AIGeddon">YouTube</a> ·{' '}
                            <a href="https://me.developers.google.com/u/portai" rel="me noopener">
                                Google Developer Profil
                            </a>
                        </p>
                        <p>
                            Open Source auf <a href={REPO_URL}>GitHub</a> (Pull Requests werden mit Konfetti empfangen) · Rohdaten als{' '}
                            <a href={withBase('/api/directories.json')}>JSON-API</a> · Für KI-Assistenten, die auch mal lachen wollen:{' '}
                            <a href={withBase('/llms.txt')}>llms.txt</a> · Neues per RSS: <a href={withBase('/feed.xml')}>Gesamt-Feed</a> ·{' '}
                            <a href={withBase('/ki-news/feed.xml')}>KI-News-Feed</a>
                        </p>
                        <p className="footer-liebe">
                            Mit ❤️, viel ☕ und einem Schuss Zweitakt-Öl von Hand geschraubt. Kein Algorithmus wurde beim Lesen dieser Zeile verletzt.
                        </p>
                        <p>
                            Domain Rating und Besuche sind Schätzwerte ohne Gewähr, ungefähr so verlässlich wie ein Wetterbericht für nächsten
                            Monat. Kein Backlink wurde bei der Herstellung dieser Seite gequält.
                        </p>
                    </div>
                </footer>
                <MobileDock />
                <BackToTop />
                <BartModus />
                <Herzstuecke />
                <ToastHost />
                <LeseHelfer />
                <KontoSync />
            </body>
        </html>
    )
}
