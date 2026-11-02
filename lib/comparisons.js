// Tool-Vergleiche. Empfehlungen stützen sich nur auf die Angaben in db/tools.json (laut Anbieter);
// pro Anwendungsfall genau ein Tool, mit Begründung aus diesen Daten.
import { getTool } from './tools'

const COMPARISONS = [
    {
        slug: 'make-vs-zapier-vs-n8n',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Zapier Free: 100 Tasks pro Monat, nur zweistufige Zaps, 15 Minuten Abfrageintervall. Make Free: 1.000 Credits pro Monat, 15 Minuten Mindestintervall. n8n: Community Edition selbst gehostet kostenlos, die Cloud startet bei 20 € im Monat (jährlich), Stand Oktober 2026. Bei Zapier ist der Gratis-Tarif also eher eine Kostprobe als ein Mittagessen.',
            ],
            [
                'Wie viele Apps passen ran?',
                'Laut Anbieter über 9.000 Apps bei Zapier, über 3.500 Apps bei Make und über 2.000 Integrationen bei n8n. Dafür hat n8n den HTTP-Request-Node für jede API, quasi den Universalschlüssel im Werkzeugkasten.',
            ],
            [
                'Datenstandort',
                'Zapier speichert Kundendaten laut Anbieter in AWS-Rechenzentren in den USA, eine reine EU-Speicherung gibt es nicht. Make lässt dich beim Anlegen der Organisation zwischen EU- und US-Rechenzentrum wählen. n8n Cloud läuft laut Anbieter auf Microsoft Azure in der EU. Für deinen Datenschutzbeauftragten ist das kein Detail, sondern die halbe Miete.',
            ],
            [
                'Selbst hosten und Lizenz',
                'Nur n8n lässt sich selbst hosten. Die Community Edition steht unter der Sustainable Use License (fair-code): Interne Nutzung ist frei, n8n als Dienst für Kunden anzubieten, die selbst Workflows bauen, ist nicht erlaubt. Kurz: Werkstatt für dich ja, Werkstatt vermieten nein.',
            ],
            [
                'Was landet auf der Rechnung?',
                'Zapier zählt Tasks (jeder erfolgreiche Aktionsschritt), Make zählt Credits pro Modul-Aktion. n8n zählt laut Anbieter nur komplette Workflow-Ausführungen, egal wie viele Schritte sie haben. Das ist wie Taxi mit Festpreis pro Fahrt statt Taxameter pro Ampel.',
            ],
        ],
        faq: [
            [
                'Welches Tool hat den größten Gratis-Tarif?',
                'Make: 1.000 Credits pro Monat gegenüber 100 Tasks bei Zapier (Stand Oktober 2026). Komplett ohne Nutzungslimit ist nur die selbst gehostete n8n Community Edition, dafür brauchst du aber einen eigenen Server. Der Motor ist gratis, die Garage stellst du.',
            ],
            [
                'Ist n8n DSGVO-freundlicher als Zapier?',
                'Beim Datenstandort ja: n8n Cloud hostet laut Anbieter in der EU, selbst gehostet bleiben die Workflow-Daten komplett bei dir. Zapier speichert laut eigener Datenschutzseite in den USA und bietet keine EU-only-Option, nutzt aber das EU-US Data Privacy Framework. Ganz schwarz-weiß ist das Bild also nicht.',
            ],
            [
                'Ist Make günstiger als Zapier?',
                'Im Einstieg ja: Make Core kostet ab $9 im Monat (jährlich), Zapier Professional ab $19,99 im Monat (Stand Oktober 2026). Wie viel du real zahlst, hängt davon ab, wie viele Credits oder Tasks deine Abläufe verbrauchen. Wie beim Moped: Der Kaufpreis ist das eine, der Spritverbrauch das andere.',
            ],
        ],
        quellen: [
            { titel: 'Make Preise', url: 'https://www.make.com/en/pricing' },
            { titel: 'Make Rechenzentrum der Organisation', url: 'https://help.make.com/organizations' },
            { titel: 'Zapier Preise', url: 'https://zapier.com/pricing' },
            { titel: 'Zapier Gratis-Tarif', url: 'https://help.zapier.com/hc/en-us/articles/32337438839565-What-s-included-in-Zapier-s-Free-plan' },
            { titel: 'Zapier Datenschutz und Datenstandort', url: 'https://zapier.com/legal/data-privacy' },
            { titel: 'n8n Preise', url: 'https://n8n.io/pricing/' },
        ],
        geprueft: '2026-10-26',
        title: 'Make vs. Zapier vs. n8n',
        topic: 'Automatisierung',
        tools: ['make', 'zapier', 'n8n'],
        intro: 'Drei Wege, Apps und KI-Agenten zu verbinden: visuell und günstig, maximal einfach oder selbst gehostet. Bausatz, Fertigmoped oder eigene Garage, such dir eins aus.',
        picks: [
            ['Du willst Apps schnell verbinden, ohne Technik', 'zapier', 'Laut Anbieter für Nicht-Techniker gemacht und mit Tausenden Apps verbunden. Einstecken, losfahren, keine Schraube anfassen.'],
            [
                'Deine Abläufe haben viele Verzweigungen',
                'make',
                'Visueller Editor für komplexe Workflows, Core ab $9 im Monat bei jährlicher Zahlung (Stand Oktober 2026). Wenn dein Ablauf aussieht wie ein Kabelbaum, siehst du hier wenigstens jede Ader.',
            ],
            ['Daten sollen auf deinem eigenen Server bleiben', 'n8n', 'Die Community Edition ist selbst gehostet kostenlos. Du schraubst selbst, dafür bleibt alles in deiner eigenen Garage.'],
        ],
    },
    {
        slug: 'semrush-vs-se-ranking-vs-surfer-seo',
        unterschiede: [
            [
                'Gratis-Zugang',
                'Semrush hat einen Gratis-Tarif mit 10 Abfragen pro Tag und einem Demo-Projekt. SE Ranking bietet 14 Tage Testphase. Surfer hat weder Gratis-Tarif noch eine auf der Preisseite genannte Testdauer, da entscheidest du also ohne Probefahrt.',
            ],
            [
                'Einstiegspreise',
                'Surfer Discovery ab $49 im Monat (jährlich), SE Ranking Core ab $103,20 (jährlich), Semrush SEO ab $117,33 (jährlich) bzw. $139 monatlich (Stand Oktober 2026). Surfer ist am günstigsten, beherrscht aber auch nur ein Gewerk.',
            ],
            [
                'Rank Tracking zum Start',
                'Semrush SEO: 5 Websites und 500 Keywords täglich. SE Ranking Core: 10 Projekte, 2.000 Keywords täglich und 100 KI-Prompts. Surfer ist kein klassischer Rank Tracker, Discovery verfolgt 10 Seiten. Wer viele Keywords beobachtet, hat bei SE Ranking das größte Fernglas.',
            ],
            [
                'KI-Sichtbarkeit',
                'Semrush trackt Prompts erst ab Starter (50 pro Tag). SE Ranking Core trackt 100 Prompts täglich. Surfer trackt KI-Prompts ab Standard (25, wöchentlich aktualisiert), also eher Wochenzeitung als Liveticker.',
            ],
            [
                'API und MCP',
                'SE Ranking Core enthält 25.000 API-Credits und MCP-Zugang. Bei Semrush gibt es die API laut Anbieter erst im Advanced-Tarif, bei Surfer erst in Peace of Mind. Wer gern Daten anzapft, hat bei SE Ranking den Zapfhahn schon im Einstieg dran.',
            ],
        ],
        faq: [
            [
                'Welches SEO-Tool ist am günstigsten?',
                'Surfer Discovery mit $49 im Monat (jährlich), deckt aber nur Content-Optimierung ab. Als Allrounder ist SE Ranking Core mit $103,20 (jährlich) günstiger als Semrush SEO mit $117,33 (Stand Oktober 2026). Billig und vollständig liegen hier also nicht im selben Karton.',
            ],
            [
                'Kann ich Semrush kostenlos nutzen?',
                'Ja, mit dem Gratis-Tarif: 10 Abfragen pro Tag in den Recherche-Tools, ein Demo-Projekt, keine Kreditkarte nötig. Zum Reinschnuppern reicht das, für den Arbeitsalltag eher nicht. Für mehr gibt es laut Anbieter eine 7-tägige Testphase der bezahlten Tarife.',
            ],
            [
                'Brauche ich Surfer zusätzlich zu Semrush?',
                'Nur wenn du viel Content schreibst: Surfer ist auf Erstellung und Optimierung von Artikeln spezialisiert, Semrush deckt Keyword-Recherche, Wettbewerb, Position Tracking und Site Audit ab. Wer nur ab und zu einen Artikel schreibt, braucht keinen zweiten Werkzeugkoffer.',
            ],
        ],
        quellen: [
            { titel: 'Semrush Tarife und Toolkits', url: 'https://www.semrush.com/kb/1011-subscriptions' },
            { titel: 'Semrush Preise SEO und KI-Suche', url: 'https://www.semrush.com/pricing/seo-ai-search/' },
            { titel: 'SE Ranking Preise', url: 'https://seranking.com/subscription.html' },
            { titel: 'Surfer Preise', url: 'https://surferseo.com/pricing/' },
            { titel: 'Surfer Preis-FAQ', url: 'https://docs.surferseo.com/en/articles/7545943-pricing-faq' },
        ],
        geprueft: '2026-10-26',
        title: 'Semrush vs. SE Ranking vs. Surfer SEO',
        topic: 'SEO',
        tools: ['semrush', 'se-ranking', 'surfer-seo'],
        intro: 'Komplettpaket, Budget-Allrounder oder Content-Spezialist: drei SEO-Werkzeuge für unterschiedliche Aufgaben. Werkzeugwagen, Ratschenkasten oder Feinmechaniker-Schraubendreher, je nachdem, was auf deiner Werkbank liegt.',
        picks: [
            [
                'Du brauchst alles aus einer Hand',
                'semrush',
                'Keyword-Recherche, Wettbewerbsanalyse, Position Tracking und Site Audit in einer Plattform. Der ganze Werkzeugwagen statt fünf loser Kisten im Kofferraum.',
            ],
            [
                'Du hast ein kleines Budget',
                'se-ranking',
                'Rank Tracker, Audit und Backlinks im Tarif Core ab $103,20 im Monat bei jährlicher Zahlung, monatlich $129 (Stand Oktober 2026). Zum Vergleich: Semrush SEO kostet $117,33 (jährlich). Viel Werkzeug, und es bleibt noch was fürs Mittagessen übrig.',
            ],
            [
                'Du schreibst Artikel und Landingpages',
                'surfer-seo',
                'Spezialisiert auf das Erstellen und Optimieren von Content für Google und KI-Suche. Kein Alleskönner, sondern der Spezialist für deinen Schreibtisch.',
            ],
        ],
    },
    {
        slug: 'beehiiv-vs-kit-vs-getresponse-vs-brevo',
        unterschiede: [
            [
                'Gratis-Tarif',
                'beehiiv Free: bis 2.500 Abonnenten. Kit Free: bis 10.000 Abonnenten. GetResponse Free: bis 500 Kontakte und 2.500 Newsletter pro Monat. Brevo Free: 300 E-Mails pro Tag, bis 100.000 gespeicherte Kontakte. Die Zahlen klingen ähnlich, messen aber verschiedene Dinge, also genau hinschauen.',
            ],
            [
                'Wonach wird abgerechnet?',
                'beehiiv, Kit und GetResponse rechnen nach Größe der Liste ab. Brevo rechnet nach Versandvolumen ab (Starter ab 5.000 E-Mails im Monat), nicht nach Kontakten. Bei Brevo zahlst du also fürs Porto, nicht für dein Adressbuch.',
            ],
            [
                'Wie klingelt die Kasse?',
                'beehiiv hat ab Lite Paid Subscriptions mit 0 % Provision und ein Werbenetzwerk. Kit verkauft digitale Produkte und Abos schon im Gratis-Tarif, mit 3,5 % plus 30 Cent Gebühr. GetResponse bietet Premium-Newsletter und Kurse im Creator-Tarif. Drei Kassen, drei Modelle, also erst klären, was du eigentlich verkaufen willst.',
            ],
            [
                'Transaktionsmails und SMS',
                'Laut Anbieter können alle Brevo-Tarife Transaktionsmails per API und SMTP verschicken, SMS gibt es als Guthaben dazu. GetResponse nennt Transaktionsmails und SMS erst im Enterprise-Tarif. Für Bestellbestätigungen aus dem kleinen Shop ist Brevo damit der kürzere Weg.',
            ],
            [
                'Webinare und Kurse',
                'GetResponse hat Webinare, Website-Builder und Kurs-Ersteller im Creator-Tarif (bis 500 Kursteilnehmende). beehiiv nennt Webinare ab dem Pro-Tarif. Wer gern vor Publikum erklärt, findet bei GetResponse das vollständigere Klassenzimmer.',
            ],
        ],
        faq: [
            [
                'Welches Newsletter-Tool ist kostenlos am großzügigsten?',
                'Kit: bis 10.000 Abonnenten gratis mit unbegrenzten Broadcasts (Stand Oktober 2026). Automationen und Sequenzen brauchen dort aber einen bezahlten Tarif. Der Briefkasten ist riesig, der Autopilot kostet extra.',
            ],
            [
                'Was kostet Brevo?',
                'Starter ab 7 € im Monat für 5.000 E-Mails, Standard ab 15 €, Professional ab 499 € (Stand Oktober 2026). Der Gratis-Tarif erlaubt 300 E-Mails pro Tag. Zwischen Standard und Professional liegt ein ordentlicher Sprung, rechne also vorher nach.',
            ],
            [
                'Was kostet Kit im Vergleich zu beehiiv?',
                'Bei 1.000 Abonnenten kostet Kit Creator $33 im Monat (jährlich), beehiiv Lite $49 (jährlich), Stand Oktober 2026. Beide haben einen Gratis-Tarif, du kannst also erst probefahren und dann zahlen.',
            ],
        ],
        quellen: [
            { titel: 'beehiiv Preise', url: 'https://www.beehiiv.com/pricing' },
            { titel: 'Kit Preise', url: 'https://kit.com/pricing' },
            { titel: 'Kit Gratis-Tarif', url: 'https://help.kit.com/en/articles/16627071-the-kit-free-plan' },
            { titel: 'GetResponse Free (deutsch)', url: 'https://www.getresponse.com/de/pricing/free' },
            { titel: 'GetResponse Preise', url: 'https://www.getresponse.com/pricing' },
            { titel: 'Brevo Preispakete (deutsch)', url: 'https://help.brevo.com/hc/de/articles/208589409-%C3%9Cber-die-Brevo-Preispakete' },
        ],
        geprueft: '2026-10-26',
        title: 'beehiiv vs. Kit vs. GetResponse vs. Brevo',
        topic: 'Newsletter',
        tools: ['beehiiv', 'kit', 'getresponse', 'brevo'],
        intro: 'Vier Newsletter- und E-Mail-Tools, alle mit Gratis-Tarif. Am Eintritt scheitert es also nicht. Der Unterschied liegt darin, womit du Geld verdienen willst.',
        picks: [
            ['Der Newsletter soll selbst Geld bringen', 'beehiiv', 'Paid Subscriptions und ein eigenes Werbenetzwerk sind eingebaut. Dein Newsletter wird hier vom Hobby zum kleinen Kiosk.'],
            ['Du verkaufst digitale Produkte', 'kit', 'E-Mail-Marketing für Creator mit Verkauf digitaler Produkte. Briefkasten und Ladentheke stehen hier im selben Raum.'],
            [
                'Du brauchst Webinare oder Kurse dazu',
                'getresponse',
                'Landingpages, Webinare und Onlinekurse in einem Tool, Oberfläche auf Deutsch. Klassenzimmer, Bühne und Briefkasten unter einem Dach.',
            ],
            [
                'Du verschickst auch SMS oder Transaktionsmails',
                'brevo',
                'E-Mail, SMS und Transaktionsmails, bezahlt ab 7 € im Monat, Oberfläche auf Deutsch. Ob Newsletter oder Passwort-Reset, hier läuft beides über denselben Schalter.',
            ],
        ],
    },
    {
        slug: 'framer-vs-webflow-vs-hostinger',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Framer Free und Webflow Starter sind kostenlos, aber nur mit Subdomain des Anbieters. Webflow Starter erlaubt 2 statische Seiten und 50 Formulareinsendungen. Hostinger hat keinen Gratis-Tarif, dafür 30 Tage Geld-zurück-Garantie. Zum Testen reicht gratis, für den Launch willst du eine eigene Adresse.',
            ],
            [
                'Einstiegspreis',
                'Framer Basic $10 im Monat (jährlich), Webflow Basic $15 im Monat (jährlich), Hostinger Premium $2,49 im Monat bei 48 Monaten Vorauszahlung, danach $10,99 (Stand Oktober 2026). Hostingers Lockpreis ist ein Langstreckenticket, kein Tagesticket.',
            ],
            [
                'Wo wohnt dein Blog?',
                'Framer Basic hat 2 CMS-Sammlungen und 1.000 Einträge, Pro 10 Sammlungen. Bei Webflow ist das CMS erst ab Premium ($25 im Monat, jährlich) dabei, Basic ist für Seiten ohne CMS gedacht. Wer bloggen will, steigt bei Webflow also direkt eine Etage höher ein.',
            ],
            [
                'Mehrsprachigkeit',
                'Framer: Übersetzungs-Locales als Add-on für $20 pro Locale. Webflow: Localize als Add-on ab $9 im Monat. Hostinger nennt in den Tarifen keine Lokalisierungsfunktion. Bei Framer wird jede Sprache zum eigenen Posten auf der Rechnung.',
            ],
            [
                'Postfach und Domain',
                'Nur Hostinger bündelt Postfächer (2 pro Website bei Premium) und eine Domain, beides im ersten Jahr kostenlos. Framer gibt bei jährlicher Zahlung eine Domain dazu, Postfächer gibt es dort nicht. Wer Briefkasten und Hausnummer gleich mitbuchen will, landet bei Hostinger.',
            ],
        ],
        faq: [
            [
                'Welcher Website-Builder ist am günstigsten?',
                'Hostinger mit $2,49 im Monat, aber nur bei 48 Monaten Vorauszahlung ($119,52), danach $10,99 im Monat (Stand Oktober 2026). Framer Basic kostet $10 im Monat bei jährlicher Zahlung. Der kleinste Monatspreis ist also nicht automatisch die kleinste Überweisung.',
            ],
            [
                'Kann ich Framer oder Webflow kostenlos nutzen?',
                'Ja, beide haben einen Gratis-Tarif. Eine eigene Domain kannst du dort nicht verbinden, dafür brauchst du einen bezahlten Tarif. Zum Basteln gut, fürs Firmenschild an der Tür nicht.',
            ],
            [
                'Brauche ich für einen Blog Webflow Premium?',
                'Ja, wenn du Webflow nutzt: Das CMS steckt laut Preisseite erst im Premium-Tarif. Bei Framer ist ein kleines CMS schon in Basic enthalten, für den ersten Blog musst du dort also nicht aufrüsten.',
            ],
        ],
        quellen: [
            { titel: 'Framer Preise', url: 'https://www.framer.com/pricing' },
            { titel: 'Webflow Preise', url: 'https://webflow.com/pricing' },
            { titel: 'Webflow Localize Überblick', url: 'https://help.webflow.com/hc/en-us/articles/33961240752147-Localization-overview' },
            { titel: 'Hostinger AI Builder Preise', url: 'https://www.hostinger.com/ai-builder/pricing' },
        ],
        geprueft: '2026-10-26',
        title: 'Framer vs. Webflow vs. Hostinger Website Builder',
        topic: 'Website & Landingpage',
        tools: ['framer', 'webflow', 'hostinger-website-builder'],
        intro: 'Die Launch-Seite für dein Tool: Design-Freiheit, professionelles CMS oder alles inklusive zum kleinen Preis. Schaufenster, Lagerhalle oder Komplettpaket mit Briefkasten.',
        picks: [
            [
                'Du willst eine schöne Launch-Seite ohne Entwickler',
                'framer',
                'Design-Editor mit CMS und Hosting, bezahlt ab $10 im Monat (jährlich). Du schiebst Pixel, Framer kümmert sich um den Rest.',
            ],
            [
                'Du planst Blog, Docs und viele Seiten',
                'webflow',
                'Visuelle Webentwicklung mit CMS und Lokalisierung für professionelle Websites. Das Regal, das mitwächst, wenn dein Content mehr wird.',
            ],
            [
                'Hosting, Domain und Postfach sollen dabei sein',
                'hostinger-website-builder',
                'Website-Builder mit Hosting, Domain und E-Mail. Achtung: Der Einstiegspreis gilt nur bei 48 Monaten Vorauszahlung. Das Kleingedruckte lohnt sich hier wirklich.',
            ],
        ],
    },
    {
        slug: 'synthesia-vs-heygen-vs-invideo-vs-pictory',
        unterschiede: [
            [
                'Gratis-Zugang',
                'Synthesia Basic: 10 Minuten Video im Monat mit Wasserzeichen. HeyGen Free: 3 Videos im Monat, je bis 1 Minute, mit Wasserzeichen. InVideo: Gratis-Tarif mit wöchentlich erneuerten Credits. Pictory: keine Gratisversion, aber 14 Tage Testphase. Bei Synthesia und HeyGen fährt das Wasserzeichen gratis immer mit.',
            ],
            [
                'Einstiegspreise',
                'Synthesia Starter $19 im Monat (erster Monat $9), HeyGen Creator $29, InVideo Starter $10 pro Seat (jährlich), Pictory Starter $25 (jährlich), Stand Oktober 2026. Bei Synthesia ist der erste Monat also ein Schnupperpreis.',
            ],
            [
                'Wie viele Sprachen kann dein Video?',
                'Laut Anbieter übersetzt HeyGen Videos in über 175 Sprachen und Dialekte mit Lippensynchronisation, Synthesia in über 140 Sprachen. Pictory nennt KI-Stimmen von ElevenLabs und Übersetzung ohne konkrete Zahl. Wer in viele Märkte will, schaut hier zuerst hin.',
            ],
            [
                'Wie lang darf es werden?',
                'HeyGen Free bis 1 Minute, Creator bis 30 Minuten, Business bis 60 Minuten pro Video. Pictory erzeugt in den bezahlten Tarifen Videos aus Skript oder URL bis 30 Minuten. Für den langen Vortrag am Stück brauchst du bei HeyGen also Business.',
            ],
            [
                'Export für Schulungen',
                'SCORM-Export für Lernplattformen gibt es bei Synthesia im Enterprise-Tarif, bei HeyGen ab Business und bei Pictory im Enterprise-Tarif. Wer Lernplattformen füttert, bucht also überall eine Etage höher.',
            ],
        ],
        faq: [
            [
                'Welches KI-Videotool hat einen Gratis-Tarif?',
                'Synthesia, HeyGen und InVideo haben einen Gratis-Tarif, jeweils mit Wasserzeichen. Pictory bietet nur eine 14-tägige Testphase. Gratis heißt hier: Probefahrt mit Aufkleber auf der Motorhaube.',
            ],
            [
                'Kann ich KI-Videos auf Deutsch erstellen?',
                'Ja. Synthesia nennt über 140 Sprachen, HeyGen über 175 Sprachen und Dialekte, beide führen Deutsch ausdrücklich auf. Dein Avatar darf also auch Moin sagen.',
            ],
            [
                'Was ist das günstigste Abo?',
                'InVideo Starter mit $10 pro Seat im Monat bei jährlicher Zahlung (Stand Oktober 2026). Synthesia Starter kostet $19 im Monat, der erste Monat $9. Wer nur kurz reinschnuppern will, kommt also auch mit dem Synthesia-Startmonat günstig weg.',
            ],
        ],
        quellen: [
            { titel: 'Synthesia Preise', url: 'https://www.synthesia.io/pricing' },
            { titel: 'Synthesia Sprachen', url: 'https://www.synthesia.io/features/languages' },
            { titel: 'HeyGen Preise', url: 'https://www.heygen.com/pricing' },
            { titel: 'HeyGen Videoübersetzung', url: 'https://www.heygen.com/translate' },
            { titel: 'InVideo Preise', url: 'https://invideo.io/pricing/' },
            { titel: 'Pictory Preise', url: 'https://pictory.ai/pricing/' },
        ],
        geprueft: '2026-10-26',
        title: 'Synthesia vs. HeyGen vs. InVideo vs. Pictory',
        topic: 'KI-Video',
        tools: ['synthesia', 'heygen', 'invideo-ai', 'pictory'],
        intro: 'Demo-Video, Erklärvideo oder Social Clip: vier KI-Videotools mit unterschiedlichen Stärken. Keins kann alles, jedes hat sein eigenes Revier.',
        picks: [
            [
                'Du drehst Schulungs- und Erklärvideos',
                'synthesia',
                'KI-Avatare, Dubbing und interaktive Elemente, mit Gratis-Tarif. Der Avatar hält die Schulung, du sparst dir den Termin im Konferenzraum.',
            ],
            ['Dein Video soll in andere Sprachen', 'heygen', 'Avatare, Voice Cloning und Videoübersetzung. Dein Video lernt Sprachen schneller als du im Volkshochschulkurs.'],
            [
                'Du machst viele Clips für Social Media',
                'invideo-ai',
                'Agenten und generative Video- und Bildmodelle mit Timeline-Editor. Gebaut für die Serienfertigung, nicht für das eine Meisterwerk.',
            ],
            [
                'Aus Blogartikeln sollen Videos werden',
                'pictory',
                'Macht aus Skripten, URLs oder Präsentationen Videos mit Stockmaterial und Untertiteln. Dein Blogartikel bekommt so ein zweites Leben auf dem Bildschirm.',
            ],
        ],
    },
    {
        slug: 'claude-vs-perplexity',
        unterschiede: [
            [
                'Preis: Unentschieden',
                'Claude Pro und Perplexity Pro kosten beide $17 im Monat bei jährlicher Zahlung, Claude Pro monatlich $20 (Stand Oktober 2026). Beim Preis steht es also unentschieden, entschieden wird woanders.',
            ],
            [
                'Modellauswahl',
                'Perplexity Pro lässt dich laut Anbieter Modelle von OpenAI, Google, Anthropic, xAI und anderen wählen. Claude nutzt nur eigene Modelle: Free hat Sonnet und Haiku, Opus gibt es ab Pro. Buffet gegen Hausmannskost, beides hat seine Fans.',
            ],
            [
                'Quellen',
                'Perplexity liefert laut Anbieter jede Antwort mit Inline-Quellen, Pro mit zehnmal so vielen Zitaten pro Antwort. Claude kann im Web suchen, ist aber in erster Linie ein Assistent für Texte, Analyse und Code. Wenn du jeden Satz belegen musst, ist Perplexity dein Bibliothekar.',
            ],
            [
                'Programmieren',
                'Claude Code ist ab Claude Pro enthalten. Perplexity bietet mit Computer einen Agenten, der Dokumente und einfache Apps erstellt. Wer Code schreibt, hat bei Claude das Werkzeug direkt in der Kiste.',
            ],
            [
                'Projekte und Recherche',
                'Claude Free erlaubt bis zu 5 Projekte, ab Pro unbegrenzt. Research gibt es bei Claude ab Pro, Deep Research bei Perplexity ebenfalls ab Pro. Bei der Tiefenrecherche steht es also wieder unentschieden.',
            ],
        ],
        faq: [
            [
                'Ist Claude teurer als Perplexity?',
                'Nein, im Jahresabo kosten Claude Pro und Perplexity Pro je $17 im Monat (Stand Oktober 2026). Monatlich zahlst du für Claude Pro $20. Wer sich fürs ganze Jahr festlegt, spart bei Claude also ein paar Dollar.',
            ],
            [
                'Haben Claude und Perplexity einen Gratis-Tarif?',
                'Ja, beide. Claude Free bietet Chat, Websuche, Artifacts und bis zu 5 Projekte. Perplexity Free bietet Suche mit Quellen und eine begrenzte Zahl Pro-Suchen, aber keine manuelle Modellwahl. Zum Reinschnuppern reicht also bei beiden der Gratis-Zugang.',
            ],
            [
                'Kann ich bei Perplexity Claude-Modelle nutzen?',
                'Ja, laut Perplexity-Hilfe stehen in Pro unter anderem Claude Sonnet und Opus zur Auswahl, neben Modellen von OpenAI und Google. Die Liste ändert sich laut Anbieter laufend, also kurz nachschauen, bevor du dich auf ein Modell verlässt.',
            ],
        ],
        quellen: [
            { titel: 'Claude Preise', url: 'https://claude.com/pricing' },
            { titel: 'Perplexity Pro', url: 'https://www.perplexity.ai/pro' },
            { titel: 'Perplexity Preise', url: 'https://www.perplexity.ai/hub/pricing' },
            { titel: 'Perplexity Modelle je Tarif', url: 'https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription' },
        ],
        geprueft: '2026-10-26',
        title: 'Claude vs. Perplexity',
        topic: 'KI-Chat & Recherche',
        tools: ['claude', 'perplexity'],
        intro: 'Assistent oder Suchmaschine? Beide kosten im Jahresabo gleich viel, lösen aber unterschiedliche Aufgaben. Der eine ist der Kollege am Schreibtisch, der andere der Rechercheur mit Quellenzettel.',
        picks: [
            [
                'Du schreibst, analysierst oder programmierst',
                'claude',
                'Assistent für Texte, Analyse und Code; Pro mit Projekten, Research und Claude Code. Der Kollege, der mitdenkt, wenn du ein leeres Dokument anstarrst.',
            ],
            [
                'Du brauchst Antworten mit nachprüfbaren Quellen',
                'perplexity',
                'KI-Suchmaschine, die Antworten aus dem Web samt Quellen liefert. Du bekommst nicht nur die Antwort, sondern gleich den Beleg zum Nachschlagen.',
            ],
            [
                'Du willst verschiedene Modelle ausprobieren',
                'perplexity',
                'Pro erlaubt die Auswahl zwischen Modellen verschiedener Anbieter. Wie ein Autohaus, in dem mehrere Marken zur Probefahrt bereitstehen.',
            ],
        ],
    },
    {
        slug: 'elevenlabs-vs-murf',
        unterschiede: [
            [
                'Gratis-Tarif',
                'ElevenLabs Free: 10.000 Credits im Monat, ohne kommerzielle Lizenz. Murf Free: 10 Minuten Sprachgenerierung und 2 Projekte, Downloads sind dort nicht möglich. Bei Murf darfst du also hören, aber nichts mitnehmen.',
            ],
            [
                'Einstiegspreis',
                'ElevenLabs Starter $6 im Monat bzw. $5 bei jährlicher Zahlung. Murf Creator ab $19 im Monat bei jährlicher Zahlung (Stand Oktober 2026). Der Abstand im Einstieg ist deutlich.',
            ],
            [
                'Sprachen',
                'ElevenLabs Eleven v3 unterstützt laut Anbieter 74 Sprachen, Multilingual v2 29 Sprachen. Murf nennt über 35 Sprachen und über 200 Stimmen im Studio. Wer seltene Sprachen braucht, schaut genau in die Listen.',
            ],
            [
                'Funktionsumfang',
                'ElevenLabs bündelt Text-to-Speech, Speech-to-Text, Voice Cloning, Dubbing, Soundeffekte und Musik in einem Credit-Pool. Murf konzentriert sich auf das Voiceover-Studio mit Steuerung von Tonhöhe, Tempo und Betonung. Taschenmesser gegen fein eingestelltes Mischpult.',
            ],
            [
                'API',
                'Beide haben eine API. Murf rechnet die API nutzungsbasiert ab, ab $0,01 pro 1.000 Zeichen für das Echtzeit-Modell Falcon. ElevenLabs zieht API-Nutzung vom Credit-Kontingent des Tarifs ab. Bei Murf zahlst du pro Zeichen, bei ElevenLabs aus dem gemeinsamen Topf.',
            ],
        ],
        faq: [
            [
                'Ist ElevenLabs günstiger als Murf?',
                'Im Einstieg ja: ElevenLabs Starter kostet $5 im Monat (jährlich), Murf Creator ab $19 (jährlich), Stand Oktober 2026. Wer nur ab und zu etwas vertont, kommt bei ElevenLabs also deutlich billiger weg.',
            ],
            [
                'Kann ich mit ElevenLabs oder Murf deutsche Stimmen erzeugen?',
                'Ja, beide führen Deutsch in ihren Sprachlisten. Bei ElevenLabs unterstützen sowohl Eleven v3 als auch Multilingual v2 Deutsch. Dein Voiceover darf also gern Deutsch sprechen.',
            ],
            [
                'Darf ich Stimmen aus dem Gratis-Tarif kommerziell nutzen?',
                'Bei ElevenLabs ist die kommerzielle Lizenz erst ab Starter enthalten. Bei Murf kannst du im Gratis-Tarif gar nicht herunterladen. Gratis ist hier also zum Üben da, nicht für den Kundenauftrag.',
            ],
        ],
        quellen: [
            { titel: 'ElevenLabs Preise', url: 'https://elevenlabs.io/pricing' },
            { titel: 'ElevenLabs Sprachen', url: 'https://help.elevenlabs.io/hc/en-us/articles/13313366263441-What-languages-do-you-support' },
            { titel: 'Murf Preise', url: 'https://murf.ai/pricing' },
            { titel: 'Murf Free Trial', url: 'https://help.murf.ai/is-murf-free-to-use' },
            { titel: 'Murf Text to Speech', url: 'https://murf.ai/text-to-speech' },
        ],
        geprueft: '2026-10-26',
        title: 'ElevenLabs vs. Murf',
        topic: 'KI-Stimmen',
        tools: ['elevenlabs', 'murf'],
        intro: 'Zwei KI-Voice-Plattformen für Voiceover, Dubbing und Sprachausgabe im Vergleich. Du musst dafür nicht mal selbst ins Mikro räuspern.',
        picks: [
            ['Du willst kostenlos starten', 'elevenlabs', 'Gratis-Tarif vorhanden, bezahlt ab $5 im Monat (jährlich). Günstiger wird es nur, wenn du selbst sprichst.'],
            [
                'Du brauchst Stimmen klonen, Soundeffekte oder Musik',
                'elevenlabs',
                'Text-to-Speech, Voice Cloning, Dubbing, Soundeffekte und Musik auf einer Plattform. Das ganze Tonstudio, ohne dass du Eierkartons an die Wand nageln musst.',
            ],
            [
                'Du vertonst E-Learning und Präsentationen',
                'murf',
                'Laut Anbieter für Voiceovers in E-Learning, Präsentationen und Videos gemacht, mit Text-to-Speech-Studio. Die ruhige Sprecherstimme für deine Folien, ganz ohne Kaffeepause.',
            ],
        ],
    },
    {
        slug: 'tally-vs-typeform',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Tally erlaubt unbegrenzte Formulare und Antworten gratis im Rahmen seiner Fair-Use-Regeln, inklusive Logik, Zahlungen, Unterschriften und Datei-Uploads bis 10 MB. Typeform hat ebenfalls einen Gratis-Tarif, Basic enthält 100 Antworten im Monat. Bei Tally ist gratis kein Probierhäppchen, sondern eine volle Mahlzeit.',
            ],
            [
                'Preise',
                'Tally Pro $29 im Monat oder $290 im Jahr (rund $24 pro Monat). Typeform Basic $28 im Monat jährlich ($39 monatlich), Plus $56, Business $91 (Stand Oktober 2026). Typeform steigt also in ziemlich großen Treppenstufen.',
            ],
            [
                'Datenstandort',
                'Tally sitzt laut Anbieter in Belgien und speichert alle Formulardaten in Europa. Bei Typeform ist die Wahl zwischen US- und EU-Rechenzentrum laut Preisseite Teil des Enterprise-Angebots. Wer Daten in Europa halten will, hat es bei Tally deutlich leichter.',
            ],
            [
                'Team und Branding',
                'Tally Pro: unbegrenzt viele Teammitglieder und Branding entfernen. Typeform Basic: 1 Nutzer, das Typeform-Branding fällt erst ab Plus weg. Bei Typeform Basic sitzt du also allein im Büro, mit dem Logo des Anbieters an der Wand.',
            ],
            [
                'Sprachen der Formulare',
                'Tally nennt über 45 Sprachen und Unterstützung für rechts-nach-links-Schrift. Mehrsprachige Formulare nennt Typeform ausdrücklich im Talent- und im Growth-Flow-Tarif. Wer international Antworten sammelt, prüft das besser vor dem Kauf.',
            ],
        ],
        faq: [
            [
                'Ist Tally wirklich kostenlos?',
                'Ja, laut Anbieter mit unbegrenzten Formularen und Antworten, solange du die Fair-Use-Regeln einhältst. Pro brauchst du für eigenes Branding, eigene Domains und Teamarbeit. Für ein Gratis-Angebot ist das ehrlich gesagt ziemlich großzügig.',
            ],
            [
                'Ist Tally günstiger als Typeform?',
                'Ja: Tally Pro kostet $290 im Jahr (rund $24 im Monat) oder $29 monatlich, Typeform Basic $28 mit nur 100 Antworten im Monat (Stand Oktober 2026). Typeform hat das Showtalent, Tally das größere Kontingent.',
            ],
            [
                'Wo speichert Tally die Daten?',
                'Laut Anbieter in Europa. Tally ist ein belgisches Unternehmen und verschlüsselt Daten bei der Übertragung und im Ruhezustand. Deine Formulardaten bleiben also quasi in der Nachbarschaft.',
            ],
        ],
        quellen: [
            { titel: 'Tally Preise', url: 'https://tally.so/pricing' },
            { titel: 'Tally Tarife erklärt', url: 'https://tally.so/help/plans-and-pricing' },
            { titel: 'Typeform Preise', url: 'https://www.typeform.com/pricing' },
        ],
        geprueft: '2026-10-26',
        title: 'Tally vs. Typeform',
        topic: 'Formulare',
        tools: ['tally', 'typeform'],
        intro: 'Formular-Builder für Leads, Umfragen und Anmeldungen: großzügig kostenlos oder stark in Interaktion und Analyse. Sparbüchse gegen Showbühne.',
        picks: [
            ['Du willst viel kostenlos', 'tally', 'Unbegrenzte Formulare und Antworten kostenlos, inklusive Logik und Zahlungen. So großzügig, dass man kurz nach dem Haken sucht.'],
            [
                'Du brauchst interaktive Quizze und Analysen',
                'typeform',
                'Interaktive KI-Formulare, Umfragen und Quizze mit Logik und Analysen. Hier fühlt sich ein Formular eher wie ein Gespräch an als wie ein Amtsbogen.',
            ],
            [
                'Dein Budget ist klein, aber du brauchst Pro-Funktionen',
                'tally',
                'Pro für $29 im Monat oder $290 im Jahr, Typeform Basic ab $28. Preislich fast gleich, aber bei Tally steckt mehr im Karton.',
            ],
        ],
    },
    {
        slug: 'descript-vs-pictory',
        unterschiede: [
            [
                'Gratis-Zugang',
                'Descript Free: 1 Medienstunde im Monat, 100 KI-Credits einmalig, Export in 720p mit Wasserzeichen. Pictory: keine Gratisversion, aber 14 Tage Testphase mit 300 Credits und bis zu 3 Videos. Beides reicht, um herauszufinden, ob dir der Ansatz liegt.',
            ],
            [
                'Einstiegspreise',
                'Descript Hobbyist $16 im Monat jährlich ($24 monatlich). Pictory Starter $25 im Monat jährlich (Stand Oktober 2026). Im Einstieg ist Descript also die kleinere Rechnung.',
            ],
            [
                'Polieren oder bauen?',
                'Descript schneidet vorhandene Aufnahmen über das Transkript. Pictory baut aus Skript, URL oder PowerPoint neue Videos mit Stockmaterial von Getty und Storyblocks. Descript poliert, was du hast, Pictory baut, was dir noch fehlt.',
            ],
            [
                'Transkription und Sprachen',
                'Descript transkribiert laut Anbieter in 25 Sprachen, darunter Deutsch, und übersetzt in über 30 Sprachen. Pictory erzeugt automatische Untertitel und exportiert sie als SRT, VTT oder TXT. Untertitel gibt es also bei beiden, ohne Abtippen.',
            ],
            [
                'Exportqualität',
                'Descript exportiert ab Hobbyist in 1080p ohne Wasserzeichen, ab Creator in 4K. Pictory begrenzt Videos aus Skript oder URL auf 30 Minuten. Wer große Leinwände bespielt, landet bei Descript ab Creator.',
            ],
        ],
        faq: [
            [
                'Gibt es Descript kostenlos?',
                'Ja, mit 1 Medienstunde im Monat und 720p-Export mit Wasserzeichen. Für Export ohne Wasserzeichen brauchst du mindestens Hobbyist. Zum Ausprobieren gut, für deinen Kanal brauchst du das Upgrade.',
            ],
            ['Kann Descript deutsche Aufnahmen transkribieren?', 'Ja, Deutsch gehört laut Preisseite zu den 25 Transkriptionssprachen. Dein Podcast auf Deutsch ist dort also kein Sonderfall.'],
            [
                'Ist Pictory günstiger als Descript?',
                'Nein: Pictory Starter kostet $25 im Monat (jährlich), Descript Hobbyist $16 (Stand Oktober 2026). Im Einstieg zahlst du bei Descript also weniger.',
            ],
        ],
        quellen: [
            { titel: 'Descript Preise', url: 'https://www.descript.com/pricing' },
            { titel: 'Descript Transkription', url: 'https://www.descript.com/transcription' },
            { titel: 'Pictory Preise', url: 'https://pictory.ai/pricing/' },
        ],
        geprueft: '2026-10-26',
        title: 'Descript vs. Pictory',
        topic: 'KI-Video',
        tools: ['descript', 'pictory'],
        intro: 'Eigene Aufnahmen schneiden oder aus Text ein Video bauen: zwei Ansätze für Video-Content. Der eine ist die Schneidebank, der andere die Montagehalle.',
        picks: [
            [
                'Du schneidest Podcasts und eigene Videos',
                'descript',
                'Textbasierter Video- und Podcast-Editor mit Studio Sound und Clip-Erstellung. Du schneidest, als würdest du einen Text redigieren.',
            ],
            [
                'Du willst Blogartikel in Videos verwandeln',
                'pictory',
                'Erstellt Videos aus Skripten, URLs oder Präsentationen mit Stockmaterial, KI-Stimmen und Untertiteln. Die Kamera darf im Schrank bleiben.',
            ],
            ['Du willst erst gratis testen', 'descript', 'Gratis-Tarif vorhanden; Pictory bietet 14 Tage Testphase. Bei Descript läuft die Probefahrt also ohne Stoppuhr.'],
        ],
    },
    {
        slug: 'gamma-vs-canva',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Gamma Free: 400 Start-Credits, die sich nicht auffüllen, bis 10 Folien pro Prompt. Canva Free: über 1,6 Mio. Vorlagen, 5 GB Speicher und begrenzter KI-Zugang. Bei Gamma ist der Gratis-Tank also einmal voll und dann leer.',
            ],
            [
                'Bezahlte Tarife',
                'Canva Pro kostet 110 € im Jahr für eine Person (Stand Oktober 2026). Gamma Plus enthält 1.000 Credits im Monat und bis 100 Folien pro Prompt, Pro 4.000 Credits. Canva nennt einen festen Jahrespreis, Gamma rechnet in Credits.',
            ],
            [
                'Export',
                'Gamma exportiert laut Anbieter schon im Gratis-Tarif nach PDF, PPTX, PNG und Google Slides und importiert PDF und PPTX. Die Kollegen mit PowerPoint bleiben also nicht vor der Tür.',
            ],
            [
                'Werkzeugschrank oder Akkuschrauber?',
                'Canva deckt über 1.000 Designtypen ab, von Social Posts bis Video, mit Brand Kits (Free 1, Pro 5). Gamma erstellt Präsentationen, Dokumente, Websites und Social Posts aus einem Prompt. Canva ist der Werkzeugschrank, Gamma der schnelle Akkuschrauber.',
            ],
            ['Eigene Domains', 'Gamma Pro veröffentlicht bis zu 10 Websites auf eigenen Domains, Ultra bis zu 100. Gamma stellt also auch kleine Websites ins eigene Schaufenster.'],
        ],
        faq: [
            [
                'Ist Gamma kostenlos?',
                'Ja, der Gratis-Tarif enthält 400 Credits einmalig. Danach verdienst du Credits über Empfehlungen oder wechselst in einen bezahlten Tarif. Die Credits sind ein Starterpaket, kein Abo.',
            ],
            [
                'Kann ich Gamma-Präsentationen in PowerPoint öffnen?',
                'Ja, Gamma exportiert laut Anbieter in allen Tarifen nach PPTX, außerdem nach PDF, PNG und Google Slides. Der Umzug nach PowerPoint klappt also ohne Kartonschleppen.',
            ],
            [
                'Was kostet Canva Pro?',
                '110 € im Jahr für eine Person (Stand Oktober 2026). Canva Pro bringt laut Anbieter über 3,6 Mio. Vorlagen, 100 GB Speicher und einen Social-Media-Planer. Für einen ganzen Jahrgang Design-Werkzeug ist das überschaubar.',
            ],
        ],
        quellen: [
            { titel: 'Gamma Preise', url: 'https://gamma.app/pricing' },
            { titel: 'Gamma Tarife im Detail', url: 'https://help.gamma.app/en/articles/8077107-how-can-i-upgrade-my-gamma-subscription' },
            { titel: 'Gamma Credits', url: 'https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma' },
            { titel: 'Canva Preise', url: 'https://www.canva.com/pricing/' },
        ],
        geprueft: '2026-10-26',
        title: 'Gamma vs. Canva',
        topic: 'Präsentation & Design',
        tools: ['gamma', 'canva'],
        intro: 'Präsentation aus einem Prompt oder volle Design-Freiheit mit Vorlagen: zwei Wege zu schönen Folien. Folienautomat gegen Bastelkeller mit vollem Regal.',
        picks: [
            [
                'Die Präsentation soll aus einem Prompt entstehen',
                'gamma',
                'Erstellt Präsentationen, Dokumente und Websites aus einem Prompt, Export nach PDF, PPTX und Google Slides. Du tippst die Idee, Gamma baut die Folien, du hast Zeit für einen Kaffee.',
            ],
            [
                'Du gestaltest auch Social Posts, Videos und Markenmaterial',
                'canva',
                'Designplattform mit Vorlagen, Stockmedien, Brand Kits und KI-Tools, Oberfläche auf Deutsch. Wenn du neben Folien auch Flyer und Videos brauchst, ist das dein Bastelkeller.',
            ],
            ['Du willst den günstigsten Einstieg', 'gamma', 'Gratis-Tarif mit 400 Credits, Plus entfernt das Gamma-Branding. Zum Start zahlst du also erst mal nichts.'],
        ],
    },
    {
        slug: 'rytr-vs-writesonic',
        unterschiede: [
            [
                'Gratis-Zugang',
                'Rytr Free: 10.000 Zeichen im Monat, über 40 Anwendungsfälle und über 30 Sprachen. Writesonic hat keinen Gratis-Tarif, sondern laut Anbieter eine 7-tägige Testphase ohne Kreditkarte. Rytr lässt dich also dauerhaft rein, Writesonic nur zur Besichtigung.',
            ],
            [
                'Zwei Ligen',
                'Rytr Lite $9 im Monat (jährlich 20 % günstiger), Writesonic Starter $79 im Monat bei jährlicher Zahlung (Stand Oktober 2026). Das ist kein Preisunterschied mehr, das ist eine andere Liga.',
            ],
            [
                'Ausrichtung',
                'Rytr ist ein Schreibassistent für kurze Texte. Writesonic ist eine SEO- und GEO-Plattform: Starter trackt 50 Prompts täglich in ChatGPT, Gemini und Google AI Overviews. Der eine schreibt dir die Zeilen, der andere schaut, wo du gefunden wirst.',
            ],
            [
                'Artikel und Audits',
                'Writesonic Starter enthält 15 KI-Artikel und 10 Site Audits mit je 100 Seiten pro Monat. Rytr Lite hebt das Zeichenlimit auf. Rytr gibt dir freie Fahrt beim Tippen, Writesonic Werkzeug für die ganze Website.',
            ],
            [
                'Erstattung und Kündigung',
                'Writesonic nennt eine 7-tägige Erstattung ohne Rückfragen. Rytr erlaubt laut Anbieter jederzeitige Kündigung zum Ende der Laufzeit. Festgekettet wirst du also bei keinem der beiden.',
            ],
        ],
        faq: [
            [
                'Ist Rytr kostenlos?',
                'Ja, mit 10.000 Zeichen pro Monat. Unbegrenzt schreiben kannst du ab Lite für $9 im Monat (Stand Oktober 2026). Für kurze Texte kommst du gratis schon ein gutes Stück weit.',
            ],
            [
                'Kann Writesonic meine Sichtbarkeit in ChatGPT messen?',
                'Ja, laut Anbieter trackt schon Starter ChatGPT, Gemini und Google AI Overviews. Alle 9 Plattformen inklusive Perplexity und Claude gibt es nur im Enterprise-Tarif. Wer das volle Panorama will, löst also das große Ticket.',
            ],
            ['Schreibt Rytr auf Deutsch?', 'Laut Anbieter unterstützt Rytr über 30 Sprachen. Wie dein Deutsch dabei klingt, testest du am besten selbst im Gratis-Tarif.'],
        ],
        quellen: [
            { titel: 'Rytr Preise', url: 'https://rytr.me/pricing' },
            { titel: 'Writesonic Preise', url: 'https://writesonic.com/pricing' },
            { titel: 'Writesonic Startseite mit Testphase', url: 'https://writesonic.com/' },
        ],
        geprueft: '2026-10-26',
        title: 'Rytr vs. Writesonic',
        topic: 'KI-Texte & SEO',
        tools: ['rytr', 'writesonic'],
        intro: 'Günstiger Schreibassistent oder SEO-Plattform mit KI-Sichtbarkeit: zwei sehr unterschiedliche Preisklassen. Lastenrad oder Lieferwagen, je nachdem, was du transportieren willst.',
        picks: [
            [
                'Du brauchst regelmäßig kurze Texte mit kleinem Budget',
                'rytr',
                'Über 40 Anwendungsfälle, Gratis-Tarif mit 10.000 Zeichen, Lite ab $9. Der Kleinwagen unter den Schreibtools: sparsam und für die Stadt gemacht.',
            ],
            [
                'Du willst Sichtbarkeit in ChatGPT und Gemini messen',
                'writesonic',
                'Plattform für SEO und KI-Sichtbarkeit (GEO) mit Tracking in ChatGPT und Gemini. Für alle, die wissen wollen, ob die KI über sie spricht.',
            ],
            ['Du schreibst in vielen Sprachen', 'rytr', 'Laut Anbieter mehr als 30 Sprachen. Ein Tool, viele Sprachen, kein Dolmetscher nötig.'],
        ],
    },
    {
        slug: 'midjourney-vs-leonardo-ai',
        unterschiede: [
            ['Gratis-Zugang', 'Midjourney hat nur Abos. Leonardo Free gibt 150 Fast Tokens pro Tag, die Bilder sind öffentlich. Bei Midjourney kommst du ohne Ticket nicht ins Stadion.'],
            [
                'Einstiegspreise',
                'Midjourney Basic $10 im Monat oder $96 im Jahr ($8 pro Monat). Leonardo Essential $12 im Monat (Stand Oktober 2026). Im Einstieg liegen die beiden nur ein paar Dollar auseinander.',
            ],
            [
                'Privatsphäre',
                'Leonardo erlaubt private Generierung in allen bezahlten Tarifen. Bei Midjourney gibt es den Stealth-Modus nur in Pro ($60) und Mega ($120). Wer am neuen Firmenlogo tüftelt, will das selten vor Publikum tun.',
            ],
            [
                'Unbegrenzte Generierung',
                'Midjourney: unbegrenzte Bilder im Relax-Modus ab Standard ($30), unbegrenzte SD-Videos ab Pro. Leonardo: unbegrenzte langsame Bildgenerierung für ausgewählte Modelle ab Premium ($30), Video ab Ultimate ($60). Unbegrenzt heißt bei beiden: mit angezogener Handbremse.',
            ],
            [
                'Wem gehören die Bilder?',
                'Midjourney verlangt Pro oder Mega, wenn deine Firma mehr als 1 Mio. US-Dollar Jahresumsatz hat. Bei Leonardo besitzen nur zahlende Nutzer die Rechte an ihren Bildern, Gratis-Nutzer erhalten eine nicht exklusive kommerzielle Lizenz. Das ist Kleingedrucktes, das du wirklich lesen solltest.',
            ],
        ],
        faq: [
            [
                'Gibt es Midjourney kostenlos?',
                'Nein, Midjourney gibt es nur im Abo, ab $10 im Monat oder $8 im Monat bei jährlicher Zahlung (Stand Oktober 2026). Freikarten verteilt Midjourney nicht.',
            ],
            [
                'Darf ich Leonardo-Bilder aus dem Gratis-Tarif kommerziell nutzen?',
                'Ja, laut Leonardo mit einer nicht exklusiven, gebührenfreien Lizenz. Die Rechte selbst liegen dann aber bei Leonardo, und die Bilder sind für andere Nutzer sichtbar. Für dein Firmenlogo ist das also eher keine gute Idee.',
            ],
            [
                'Welches Tool ist günstiger für private Bilder?',
                'Leonardo: privat generierst du schon ab Essential für $12 im Monat. Bei Midjourney brauchst du dafür Pro für $60 im Monat (Stand Oktober 2026). Wenn deine Ideen geheim bleiben sollen, ist der Unterschied deutlich.',
            ],
        ],
        quellen: [
            { titel: 'Midjourney Tarifvergleich', url: 'https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans' },
            { titel: 'Leonardo Preise', url: 'https://leonardo.ai/pricing/' },
            { titel: 'Leonardo Hilfe-FAQ', url: 'https://intercom.help/leonardo-ai/en/articles/7051613-frequently-asked-questions' },
        ],
        geprueft: '2026-10-26',
        title: 'Midjourney vs. Leonardo AI',
        topic: 'KI-Bilder',
        tools: ['midjourney', 'leonardo-ai'],
        intro: 'Zwei KI-Bildgeneratoren: Midjourney nur im Abo, Leonardo AI mit täglichem Gratis-Kontingent. Der eine verlangt Eintritt, der andere lässt dich jeden Tag ein bisschen gratis malen.',
        picks: [
            ['Du willst kostenlos starten', 'leonardo-ai', 'Gratis-Tarif mit 150 Fast Tokens pro Tag; die Ergebnisse sind dort allerdings öffentlich. Du malst also im Schaufenster.'],
            [
                'Du willst sehr viele Bilder ohne Kontingentsorgen',
                'midjourney',
                'Ab Standard unbegrenzte Bilder im Relax-Modus, Basic ab $10 im Monat ($8 jährlich). Der Relax-Modus heißt nicht ohne Grund so: Geduld ist hier die Währung.',
            ],
            [
                'Deine Bilder sollen privat bleiben',
                'leonardo-ai',
                'Private Ergebnisse schon in den bezahlten Tarifen ab $12; bei Midjourney gibt es den Stealth-Modus erst ab Pro. Bei Leonardo bekommst du die Vorhänge also früher.',
            ],
            ['Deine Firma macht über 1 Mio. US-Dollar Umsatz', 'midjourney', 'Dann verlangt Midjourney laut Anbieter Pro oder Mega; vor dem Kauf einplanen. Sonst rächt sich der Sparkurs später.'],
        ],
    },
    {
        slug: 'wordtune-vs-rytr',
        unterschiede: [
            [
                'Deutsch rein, Englisch raus',
                'Wordtune versteht laut Anbieter Eingaben auf Deutsch und neun weiteren Sprachen, liefert aber nur englische Ergebnisse. Rytr schreibt laut Anbieter in über 30 Sprachen. Das solltest du wissen, bevor du loslegst.',
            ],
            ['Gratis-Tarif', 'Wordtune Basic ist kostenlos mit Tageslimit für Umformulierungen. Rytr Free gibt dir 10.000 Zeichen pro Monat. Tagesration gegen Monatsbudget.'],
            ['Preise', 'Wordtune Advanced $4,89 im Monat bei jährlicher Zahlung ($6,99 regulär). Rytr Lite $9 im Monat (Stand Oktober 2026). Beide bleiben im Bereich Taschengeld.'],
            [
                'Rabatte und Test',
                'Wordtune gibt 30 % Rabatt für Studierende, Lehrende und Non-Profits und bietet eine 3-tägige Testphase. Rytr gibt bei jährlicher Zahlung 20 % Rabatt. Sparen kannst du also bei beiden, nur auf unterschiedlichen Wegen.',
            ],
            [
                'Wo arbeitet das Tool?',
                'Wordtune arbeitet als Browser-Erweiterung für Chrome, Edge, Firefox und Arc direkt in deinen Textfeldern. Rytr bietet über 40 Anwendungsfälle mit Vorlagen. Wordtune sitzt also direkt neben deinem Cursor.',
            ],
        ],
        faq: [
            [
                'Gibt es Wordtune auf Deutsch?',
                'Nur eingeschränkt: Du kannst deutsch schreiben, Wordtune gibt die Umformulierung aber auf Englisch aus. Für deutsche Texte ist Rytr die passendere Wahl. Wordtune versteht dich also, antwortet aber auf Englisch.',
            ],
            [
                'Ist Wordtune günstiger als Rytr?',
                'Ja, Wordtune Advanced kostet $4,89 im Monat bei jährlicher Zahlung, Rytr Lite $9 im Monat (Stand Oktober 2026). Der Preisvorteil zählt aber nur, wenn du mit englischen Ergebnissen leben kannst.',
            ],
            [
                'Welches Tool hat den planbareren Gratis-Tarif?',
                'Rytr mit festen 10.000 Zeichen im Monat. Wordtune Basic begrenzt die Nutzung pro Tag. Bei Rytr teilst du dir das Budget selbst ein, statt jeden Morgen neu anzustehen.',
            ],
        ],
        quellen: [
            { titel: 'Wordtune Preise', url: 'https://www.wordtune.com/pricing' },
            { titel: 'Wordtune Sprachen', url: 'https://support.wordtune.com/en/articles/5856755-translate-with-rewrite-which-languages-does-wordtune-support' },
            { titel: 'Rytr Preise', url: 'https://rytr.me/pricing' },
        ],
        geprueft: '2026-10-26',
        title: 'Wordtune vs. Rytr',
        topic: 'KI-Texte',
        tools: ['wordtune', 'rytr'],
        intro: 'Bestehende Texte glätten oder neue Texte erzeugen: zwei günstige Schreibassistenten mit Gratis-Tarif. Schleifpapier oder Hobelbank, je nachdem, ob das Brett schon da ist.',
        picks: [
            [
                'Du schreibst auf Englisch und willst Sätze verbessern',
                'wordtune',
                'Korrigiert Rechtschreibung und Grammatik und formuliert englische Sätze um. Der Feinschliff für dein Englisch, bevor die Mail an den Kunden rausgeht.',
            ],
            [
                'Du brauchst Texte auf Deutsch oder in vielen Sprachen',
                'rytr',
                'Laut Anbieter mehr als 30 Sprachen und über 40 Anwendungsfälle. Wenn dein Ergebnis nicht auf Englisch landen soll, bist du hier richtig.',
            ],
            [
                'Du studierst oder arbeitest für eine Non-Profit',
                'wordtune',
                '30 % Rabatt für Studierende und Non-Profits, Advanced ab $4,89 im Monat (jährlich). Ein Tarif, der auch ins Studentenbudget passt.',
            ],
            ['Du willst den Gratis-Tarif planbar nutzen', 'rytr', 'Fest 10.000 Zeichen pro Monat kostenlos, Lite ab $9. Du weißt am Monatsanfang genau, was im Tank ist.'],
        ],
    },
    {
        slug: 'runway-vs-invideo-ai',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Runway Free: 125 Credits einmalig und 5 GB Speicher. InVideo Free: Credits, die sich jeden Montag erneuern, Exporte mit Wasserzeichen. Runway füllt den Tank einmal, InVideo jede Woche nach.',
            ],
            [
                'Einstiegspreise',
                'Runway Standard $12 im Monat jährlich ($15 monatlich) mit 625 Credits. InVideo Starter $10 pro Seat im Monat jährlich mit 400 Credits (Stand Oktober 2026). Preislich liegen die beiden nah beieinander, bei den Credits nicht.',
            ],
            [
                'Bildqualität',
                'Runway bietet ab Standard 4K-Upscaling ohne Wasserzeichen, Max zusätzlich ProRes und HDR bis 16 Bit. InVideo gibt Seedance 2.0 in 4K erst ab dem mittleren Tarif frei, Starter hat keinen Zugang zu Seedance 2.5. Wer auf Pixel schaut, ist bei Runway früher zufrieden.',
            ],
            [
                'Teamarbeit',
                'InVideo erlaubt gemeinsames Bearbeiten mit bis zu 5 Seats schon in Starter. Runway nennt Teamspaces und Single Sign-on im Enterprise-Tarif. Im Team sitzt ihr bei InVideo also schon im Einstieg gemeinsam am Schnittplatz.',
            ],
            [
                'Was passiert mit Rest-Credits?',
                'Runway Max überträgt ungenutzte Credits einen Monat. Bei InVideo verfallen ungenutzte Credits zum Monatsende. Bei InVideo gilt also: aufbrauchen oder verlieren, wie beim Resturlaub.',
            ],
        ],
        faq: [
            [
                'Kann ich Runway kostenlos testen?',
                'Ja, mit 125 einmaligen Credits. Die reichen laut Anbieter nur für erste Tests, danach brauchst du einen bezahlten Tarif. Ein Schnuppertag, kein Dauerticket.',
            ],
            [
                'Ist InVideo günstiger als Runway?',
                'Im Einstieg leicht: InVideo Starter kostet $10 pro Seat im Monat, Runway Standard $12, beide bei jährlicher Zahlung (Stand Oktober 2026). Der Unterschied ist eher Kleingeld.',
            ],
            [
                'Haben die Videos ein Wasserzeichen?',
                'In den Gratis-Tarifen bei InVideo ja. Runway nennt ab Standard ausdrücklich Videos ohne Wasserzeichen. Wer sauber veröffentlichen will, plant also ein Abo ein.',
            ],
        ],
        quellen: [
            { titel: 'Runway Preise', url: 'https://runwayml.com/pricing' },
            { titel: 'InVideo Preise', url: 'https://invideo.io/pricing/' },
            { titel: 'InVideo Gratis-Tarif', url: 'https://help.invideo.io/en/articles/9380226-can-i-use-invideo-ai-for-free' },
        ],
        geprueft: '2026-10-26',
        title: 'Runway vs. InVideo AI',
        topic: 'KI-Video',
        tools: ['runway', 'invideo-ai'],
        intro: 'Kreatives KI-Videostudio oder schnelle Social-Clips mit Agenten: zwei Videotools für unterschiedliche Ansprüche. Atelier gegen Fließband, beides hat seinen Platz.',
        picks: [
            ['Du willst KI-Video erst gratis ausprobieren', 'runway', 'Gratis-Tarif mit 125 einmaligen Credits. Genug für ein paar Probeläufe, nicht für eine ganze Serie.'],
            [
                'Du brauchst hohe Bildqualität und 4K',
                'runway',
                'Bezahlte Tarife ohne Wasserzeichen und mit 4K-Upscaling, ab $12 im Monat (jährlich). Für Bilder, die auch auf dem großen Fernseher noch scharf aussehen.',
            ],
            [
                'Du produzierst regelmäßig YouTube- und Social-Clips',
                'invideo-ai',
                'Agenten und Timeline-Editor für schnelle Clips, Starter ab $10 pro Seat (jährlich). Die Clipfabrik für deinen Upload-Rhythmus.',
            ],
        ],
    },
    {
        slug: 'otter-ai-vs-descript',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Otter Basic: 300 Minuten Transkription im Monat, maximal 30 Minuten pro Gespräch, 3 Datei-Importe insgesamt. Descript Free: 1 Medienstunde im Monat und Export in 720p mit Wasserzeichen. Für lange Meetings wird es bei Otter gratis also knapp.',
            ],
            [
                'Sprachen',
                'Otter transkribiert nur Englisch, Spanisch, Französisch, Deutsch, Japanisch und vereinfachtes Chinesisch, Deutsch laut Anbieter noch in Beta. Descript nennt 25 Transkriptionssprachen inklusive Deutsch. Für deutsche Meetings ist Otter also noch in der Probezeit.',
            ],
            ['Oberfläche bleibt englisch', 'Die Otter-Oberfläche bleibt laut Anbieter auf Englisch, auch wenn du auf Deutsch transkribierst. Ein bisschen Schulenglisch solltest du also mitbringen.'],
            [
                'Meeting-Integration',
                'Otter tritt Zoom, Microsoft Teams und Google Meet automatisch bei und schreibt live mit. Descript ist ein Editor für Aufnahmen und kein Meeting-Assistent. Otter sitzt mit am Tisch, Descript wartet im Schneideraum.',
            ],
            [
                'Export',
                'Otter Pro exportiert MP3, TXT, PDF, DOCX und SRT. Descript exportiert Video ab Hobbyist in 1080p und ab Creator in 4K. Otter liefert dir das Protokoll, Descript den fertigen Film.',
            ],
        ],
        faq: [
            ['Kann Otter.ai Deutsch?', 'Ja, Otter transkribiert auch Deutsch, laut Hilfe-Center aber noch als Beta. Menüs und Einstellungen bleiben englisch. Beta heißt: Rechne mit kleinen Macken.'],
            [
                'Ist Otter günstiger als Descript?',
                'Ja: Otter Pro kostet $8,49 pro Nutzer im Monat bei jährlicher Zahlung, Descript Hobbyist $16 (Stand Oktober 2026). Für reine Meeting-Protokolle bist du bei Otter also günstiger unterwegs.',
            ],
            [
                'Kann ich mit Descript Meetings mitschreiben?',
                'Descript transkribiert aufgenommene oder importierte Dateien. Für automatische Meeting-Protokolle in Zoom, Teams und Meet ist Otter gebaut. Descript ist der Schneidetisch, nicht der Protokollant.',
            ],
        ],
        quellen: [
            { titel: 'Otter Preise', url: 'https://otter.ai/pricing' },
            { titel: 'Otter Sprachen', url: 'https://help.otter.ai/hc/en-us/articles/360047247414-Supported-languages' },
            { titel: 'Otter Limits im Gratis-Tarif', url: 'https://help.otter.ai/hc/en-us/articles/360047538094-Conversation-import-and-app-limits-on-the-Basic-free-plan' },
            { titel: 'Descript Preise', url: 'https://www.descript.com/pricing' },
        ],
        geprueft: '2026-10-26',
        title: 'Otter.ai vs. Descript',
        topic: 'Transkription',
        tools: ['otter-ai', 'descript'],
        intro: 'Beide machen aus Sprache Text, aber für verschiedene Zwecke: Meetings protokollieren oder Aufnahmen schneiden. Protokollant im Meetingraum gegen Cutter im Schneideraum.',
        picks: [
            [
                'Du willst Online-Meetings automatisch mitschreiben',
                'otter-ai',
                'Läuft in Zoom, Teams und Google Meet mit Live-Transkription, Sprechererkennung und Zusammenfassung. Du hörst zu, statt mitzutippen.',
            ],
            [
                'Du schneidest Podcasts oder Videos über das Transkript',
                'descript',
                'Textbasierter Editor: Wörter im Transkript löschen schneidet die Aufnahme, dazu Studio Sound. Ein Wort weg, ein Schnitt drin, ganz ohne Schere.',
            ],
            ['Du suchst den günstigsten Bezahltarif', 'otter-ai', 'Pro ab $8,49 pro Nutzer (jährlich); Descript Hobbyist ab $16 (jährlich). Der günstigere Bezahlweg führt hier zu Otter.'],
        ],
    },
    {
        slug: 'systeme-io-vs-kit',
        unterschiede: [
            [
                'Gratis-Tarif',
                'systeme.io Free: 2.000 Kontakte, 3 Sales Funnels, 1 Kurs, unbegrenzte E-Mails. Kit Free: bis 10.000 Abonnenten, unbegrenzte Broadcasts, aber nur 1 einfache Automation. Kit hat die größere Liste, systeme.io den volleren Werkzeugkasten.',
            ],
            [
                'Einstiegspreise',
                'systeme.io Startup $17 im Monat für 5.000 Kontakte. Kit Creator $33 im Monat bei jährlicher Zahlung für 1.000 Abonnenten (Stand Oktober 2026). systeme.io gibt dir also mehr Kontakte für weniger Geld.',
            ],
            [
                'Wer verdient mit?',
                'systeme.io nennt 0 % Transaktionsgebühren. Kit berechnet bei digitalen Produkten und Abos 3,5 % plus 30 Cent pro Verkauf. Bei Kit verdient der Anbieter an jedem Verkauf ein kleines Stück mit.',
            ],
            [
                'Funktionsumfang',
                'systeme.io bündelt Funnels, Kurse, Website, Blog, Affiliate-Programm und Webinare (Evergreen ab Webinar-Tarif). Kit konzentriert sich auf Newsletter, Visual Automations, Landingpages und Formulare. Bauchladen gegen Fachgeschäft, beides ehrliche Arbeit.',
            ],
            [
                'API',
                'Kit enthält laut Hilfe-Center schon im Gratis-Tarif API-Zugang. systeme.io bindet laut Preisseite unter anderem Google Sheets, Google Calendar, Stripe und PayPal an. Wer gern selbst Kabel verlegt, freut sich über die API bei Kit.',
            ],
        ],
        faq: [
            [
                'Welches Tool ist günstiger, systeme.io oder Kit?',
                'systeme.io: Startup kostet $17 im Monat für 5.000 Kontakte, Kit Creator $33 im Monat (jährlich) für 1.000 Abonnenten (Stand Oktober 2026). Mehr Kontakte für weniger Geld, zumindest im Einstieg.',
            ],
            [
                'Kann ich mit Kit kostenlos Produkte verkaufen?',
                'Ja, digitale Produkte und Abos sind laut Kit-Hilfe schon im Gratis-Tarif enthalten. Pro Verkauf fallen 3,5 % plus 30 Cent an. Die Kasse ist also gratis, der Kassenbon hat aber einen kleinen Abzug.',
            ],
            [
                'Gibt es systeme.io auf Deutsch?',
                'Ja, systeme.io hat ein deutschsprachiges Hilfe-Center, und du kannst Websites mehrsprachig anlegen. Übersetzen musst du die Seiten laut Anbieter selbst. Die Vokabelarbeit bleibt also bei dir.',
            ],
        ],
        quellen: [
            { titel: 'systeme.io Preise', url: 'https://systeme.io/pricing' },
            { titel: 'systeme.io Hilfe (deutsch)', url: 'https://help-de.systeme.io/article/6105-so-erstellen-sie-eine-website' },
            { titel: 'Kit Preise', url: 'https://kit.com/pricing' },
            { titel: 'Kit Gratis-Tarif', url: 'https://help.kit.com/en/articles/16627071-the-kit-free-plan' },
        ],
        geprueft: '2026-10-26',
        title: 'Systeme.io vs. Kit',
        topic: 'Funnel & E-Mail',
        tools: ['systeme-io', 'kit'],
        intro: 'Komplette Verkaufsplattform oder spezialisiertes Creator-Mailing: beide mit Gratis-Tarif. Einkaufszentrum gegen gut sortierten Fachladen.',
        picks: [
            [
                'Du willst Funnels, Kurse und Website in einem Tool',
                'systeme-io',
                'All-in-one für Sales Funnels, E-Mail, Onlinekurse, Websites und Affiliate-Programme, Oberfläche auf Deutsch. Der ganze Laden aus einer Hand statt eines Abo-Flickenteppichs.',
            ],
            ['Dein Schwerpunkt ist der Newsletter', 'kit', 'E-Mail-Marketing für Creator mit Visual Automations, Landingpages und Formularen. Für alle, deren Herz am Newsletter hängt.'],
            ['Du willst den niedrigsten Einstiegspreis', 'systeme-io', 'Startup ab $17 im Monat; Kit Creator ab $33 (jährlich, 1.000 Abonnenten). Den Preiskampf im Einstieg gewinnt hier systeme.io.'],
        ],
    },
    {
        slug: 'surfer-seo-vs-writesonic',
        unterschiede: [
            [
                'Einstiegspreise',
                'Surfer Discovery $49 im Monat, Writesonic Starter $79 im Monat, jeweils bei jährlicher Zahlung (Stand Oktober 2026). Surfer ist der günstigere Einstieg, Writesonic packt mehr in den Karton.',
            ],
            [
                'KI-Sichtbarkeit',
                'Writesonic trackt schon in Starter 50 Prompts täglich in ChatGPT, Gemini und Google AI Overviews. Bei Surfer beginnt das Prompt-Tracking erst mit Standard ($99, 25 Prompts wöchentlich). Writesonic schaut also jeden Tag nach, Surfer einmal die Woche.',
            ],
            [
                'Content-Kontingent',
                'Surfer Discovery: 120 Dokumente erstellen oder optimieren. Writesonic Starter: 15 KI-Artikel und 10 Site Audits mit je 100 Seiten pro Monat. Surfer feilt an vielen Texten, Writesonic schreibt weniger, prüft dafür die ganze Website.',
            ],
            ['Vorher ausprobieren', 'Writesonic bietet 7 Tage Test ohne Kreditkarte und 7 Tage Erstattung. Surfer hat keinen Gratis-Tarif. Bei Writesonic schnupperst du also ohne Risiko rein.'],
            ['Jahresrabatt', 'Surfer nennt bis zu 17 % Rabatt bei jährlicher Zahlung, Writesonic 20 %. Wer sich fürs ganze Jahr festlegt, spart bei beiden.'],
        ],
        faq: [
            [
                'Kann ich Surfer SEO kostenlos nutzen?',
                'Nein, Surfer hat keinen Gratis-Tarif. Kostenlos sind nur Zusatztools wie die Chrome-Erweiterung, die Hauptplattform startet mit Discovery. Gratis gibt es also das Zubehör, nicht den Motor.',
            ],
            [
                'Ist Surfer günstiger als Writesonic?',
                'Ja: Surfer Discovery kostet $49 im Monat, Writesonic Starter $79, beide bei jährlicher Zahlung (Stand Oktober 2026). Writesonic enthält dafür schon KI-Sichtbarkeits-Tracking. Du zahlst mehr, bekommst aber das KI-Fernglas gleich mit.',
            ],
            [
                'Welches Tool misst Sichtbarkeit in Perplexity?',
                'Writesonic trackt Perplexity, Claude und Copilot laut Anbieter nur im Enterprise-Tarif. Surfer nennt ChatGPT, Gemini, AI Overviews und weitere KI-Modelle für seinen AI Tracker. Für Perplexity greifst du bei Writesonic also ins oberste Regal.',
            ],
        ],
        quellen: [
            { titel: 'Surfer Preise', url: 'https://surferseo.com/pricing/' },
            { titel: 'Surfer Preis-FAQ', url: 'https://docs.surferseo.com/en/articles/7545943-pricing-faq' },
            { titel: 'Writesonic Preise', url: 'https://writesonic.com/pricing' },
            { titel: 'Writesonic Startseite mit Testphase', url: 'https://writesonic.com/' },
        ],
        geprueft: '2026-10-26',
        title: 'Surfer SEO vs. Writesonic',
        topic: 'SEO & KI-Suche',
        tools: ['surfer-seo', 'writesonic'],
        intro: 'Zwei SEO-Werkzeuge, die auch die Sichtbarkeit in KI-Antworten messen, mit unterschiedlichem Schwerpunkt. Content-Feinmechaniker gegen Allrounder mit KI-Fernglas.',
        picks: [
            [
                'Du optimierst vor allem Artikel und Landingpages',
                'surfer-seo',
                'Spezialisiert auf Erstellung und Optimierung von Content, Discovery ab $49 im Monat bei jährlicher Zahlung (Stand Oktober 2026). Für alle, die jeden Artikel auf Hochglanz bringen wollen.',
            ],
            [
                'Du brauchst KI-Artikel und Site Audits dazu',
                'writesonic',
                'SEO- und GEO-Plattform mit KI-Artikeln, Site Audits und Tracking in ChatGPT und Gemini. Mehr Werkzeug im Koffer, wenn du Content und Technik in einem Tool willst.',
            ],
            [
                'Du willst vor dem Kauf testen',
                'writesonic',
                'Laut Anbieter 7 Tage kostenlos testen ohne Kreditkarte; Surfer hat keinen Gratis-Tarif und nennt auf der Preisseite keine Testdauer. Die Probefahrt ist bei Writesonic klar geregelt.',
            ],
        ],
    },
    {
        slug: 'claude-vs-chatgpt',
        unterschiede: [
            [
                'Preis und Jahresabo',
                'ChatGPT Plus kostet 20 USD im Monat, ein Jahresabo gibt es für Go, Plus und Pro laut OpenAI nicht. Claude Pro kostet 20 USD monatlich oder 17 USD im Monat bei jährlicher Zahlung (200 USD im Voraus), Stand November 2026. Wer sich festlegt, fährt bei Claude etwas günstiger.',
            ],
            [
                'Tarifstufen dazwischen und darüber',
                'OpenAI hat mit Go für 8 USD im Monat eine kleine Stufe unter Plus, laut Preisseite kann Go Werbung enthalten. Nach oben gibt es Pro in drei Stufen für 100, 200 und 500 USD. Claude hat über Pro den Max-Tarif für 100 USD und Ultra für 200 USD. Beide bauen also eine Treppe, nur mit unterschiedlichen Stufen.',
            ],
            [
                'Was gratis drin ist',
                'ChatGPT Free bietet laut OpenAI begrenzten Zugriff auf Bildgenerierung, Deep Research und Memory. Claude Free hat Websuche, Memory, Artifacts, Dateierstellung und bis zu 5 Projekte. Research und Claude Code gibt es bei Claude erst ab Pro. Zum Reinschnuppern reichen beide.',
            ],
            [
                'Bilder',
                'ChatGPT erzeugt Bilder direkt im Chat, ab Plus mit höheren Grenzen. Auf der Preisseite von Claude steht keine Bildgenerierung. Wenn du regelmäßig Bilder brauchst, liegt ChatGPT vorn.',
            ],
            [
                'Training mit deinen Chats',
                'Bei ChatGPT steuerst du das über den Schalter „Improve the model for everyone“ in den Datenkontrollen, temporäre Chats werden laut OpenAI nicht zum Training genutzt. Bei Claude werden Chats laut Anthropic nur genutzt, wenn du es erlaubst; Inkognito-Chats nie. Bei beiden lohnt ein Blick in die Einstellungen, bevor du Kundendaten eintippst.',
            ],
        ],
        faq: [
            [
                'Ist Claude besser als ChatGPT?',
                'Pauschal nicht. ChatGPT bringt Bildgenerierung und eine günstige Go-Stufe mit, Claude ein Jahresabo und Research plus Claude Code ab Pro. Teste beide mit den drei Prompts oben, dann siehst du, welche Antworten dir besser liegen.',
            ],
            [
                'Was kostet ChatGPT Plus im Vergleich zu Claude Pro?',
                'Beide 20 USD im Monat. Claude Pro gibt es im Jahresabo für 17 USD im Monat, ChatGPT Plus laut OpenAI nur monatlich (Stand November 2026).',
            ],
            [
                'Kann ich ChatGPT und Claude gratis nutzen?',
                'Ja, beide haben einen Gratis-Tarif mit Nutzungsgrenzen. Für den direkten Vergleich reicht das völlig.',
            ],
        ],
        testen: [
            ['Text: Kundenmail beantworten', 'Ein Kunde schreibt: „Mein bestelltes Ersatzteil passt nicht, ich will mein Geld zurück, und zwar sofort.“ Schreib eine freundliche, klare Antwort von unserem Shop, höchstens 120 Wörter, Sie-Form. Biete Rücksendung an und frag nach der Bestellnummer.'],
            ['Analyse: Zahlen erklären', 'Unser Shop hatte im September 1.200 Besuche und 36 Bestellungen, im Oktober 1.500 Besuche und 39 Bestellungen. Berechne die Conversion-Rate beider Monate, erkläre die Entwicklung in 3 Sätzen und nenne 3 mögliche Ursachen, die ich prüfen sollte.'],
            ['Ehrlichkeit: Wissenslücke', 'Was steht in Paragraf 7 der Moped-Werkstattverordnung von 2019? Wenn du dir nicht sicher bist, ob es dieses Gesetz gibt, sag das offen.'],
        ],
        kitest: 'ehrlichkeit',
        quellen: [
            { titel: 'ChatGPT Preise', url: 'https://openai.com/chatgpt/pricing/' },
            { titel: 'ChatGPT Plus (OpenAI-Hilfe)', url: 'https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus' },
            { titel: 'ChatGPT Go (OpenAI-Hilfe)', url: 'https://help.openai.com/en/articles/11989085-what-is-chatgpt-go' },
            { titel: 'ChatGPT Pro Stufen', url: 'https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers' },
            { titel: 'OpenAI Datenkontrollen', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
            { titel: 'Claude Preise', url: 'https://claude.com/pricing' },
            { titel: 'Claude Max und Ultra', url: 'https://claude.com/pricing/max' },
            { titel: 'Claude: Daten und Training', url: 'https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training' },
        ],
        geprueft: '2026-11-02',
        title: 'Claude vs. ChatGPT',
        topic: 'KI-Chat & Recherche',
        tools: ['claude', 'chatgpt'],
        intro: 'Die zwei bekanntesten KI-Assistenten, beide ab 20 USD im Monat. Unterschiede gibt es bei Jahresabo, Bildern, Tarifstufen und dem Umgang mit deinen Daten. Hier steht, was die Anbieter selbst sagen, und drei Prompts zum Selbsttest.',
        picks: [
            ['Du brauchst regelmäßig Bilder', 'chatgpt', 'Bildgenerierung direkt im Chat, ab Plus mit höheren Grenzen. Text und Bild aus einer Hand.'],
            ['Du willst ein Jahresabo und programmierst', 'claude', 'Pro für 17 USD im Monat bei jährlicher Zahlung, mit Research und Claude Code. Der Werkzeugkasten für Schreibtisch und Code.'],
            ['Dein Budget ist knapp', 'chatgpt', 'Go kostet 8 USD im Monat und bietet mehr als der Gratis-Tarif. Laut OpenAI kann Go Werbung enthalten.'],
        ],
    },
    {
        slug: 'chatgpt-vs-claude-vs-gemini',
        unterschiede: [
            [
                'Preise und Währung',
                'ChatGPT Plus und Claude Pro kosten je 20 USD im Monat, Claude Pro im Jahresabo 17 USD im Monat. Google rechnet in Deutschland in Euro ab: Google AI Plus 4,99 EUR, Google AI Pro 21,99 EUR und Google AI Ultra ab 99,99 EUR im Monat, Stand November 2026. Ein Jahresabo nennt Google auf der Abo-Seite nicht.',
            ],
            [
                'Tarifstufen',
                'OpenAI baut die Treppe mit Go (8 USD), Plus und Pro in drei Stufen bis 500 USD. Anthropic mit Pro, Max (100 USD) und Ultra (200 USD). Google mit Plus, Pro und Ultra in zwei Stufen: 99,99 EUR für 5-mal und 219,99 EUR für 20-mal höhere Nutzungslimits als AI Pro. Plus hat laut Google doppelte, Pro vierfache Limits der Gratis-Version.',
            ],
            [
                'Google-Integration und Workspace',
                'Das ist der eigentliche Unterschied: Gemini steckt ab Google AI Plus direkt in Gmail, Vids und weiteren Google-Apps, ab Pro auch in Docs. Wer den Arbeitstag in Gmail, Docs und Drive verbringt, muss mit Gemini nichts hin und her kopieren. ChatGPT und Claude laufen dagegen als eigene App neben deinen Google-Tools.',
            ],
            [
                'Was im Abo sonst noch steckt',
                'Bei Google zahlst du für mehr als den Chat: Plus bringt 400 GB Cloud-Speicher für Gmail, Drive und Fotos, Pro 5 TB plus YouTube Premium Lite, Ultra ab 20 TB plus YouTube Premium. Den Speicher kannst du laut Google mit bis zu fünf weiteren Personen teilen. Hast du schon ein Google-One-Abo, rechne das gegen.',
            ],
            [
                'Gratis-Tarif und Daten',
                'Gemini gratis bietet laut Google Bilderstellung, Deep Research, Gemini Live, Canvas, Gems und 15 GB Speicher, das Modell ist Flash-Lite. Zum Training: Ist „Aktivitäten speichern“ an, können Prüfteams deine Chats sehen und Google nutzt sie zur Verbesserung. Abschalten geht, temporäre Chats und Chats ohne gespeicherte Aktivitäten liegen laut Google trotzdem 72 Stunden im Konto. Wie bei ChatGPT und Claude gilt: Erst Einstellungen prüfen, dann Kundendaten eintippen.',
            ],
        ],
        faq: [
            [
                'Was kostet Gemini im Vergleich zu ChatGPT und Claude?',
                'Google AI Plus kostet in Deutschland 4,99 EUR, Google AI Pro 21,99 EUR im Monat. ChatGPT Plus und Claude Pro kosten je 20 USD im Monat, Claude Pro im Jahresabo 17 USD im Monat (Stand November 2026).',
            ],
            [
                'Welches Gemini-Abo enthält Gemini 4 Argon?',
                'Laut Google enthalten Google AI Pro und Google AI Ultra Gemini 4 Argon, Googles neues Spitzenmodell. Plus und der Gratis-Tarif nutzen Flash- beziehungsweise Flash-Lite-Modelle.',
            ],
            [
                'Lohnt sich Gemini, wenn ich kein Gmail nutze?',
                'Dann fällt der größte Vorteil weg, die Einbindung in Gmail, Docs und Drive. Der Chat allein lässt sich gratis testen, der Rest des Abos ist vor allem Speicher und YouTube.',
            ],
        ],
        testen: [
            ['Recherche: aktuelle Fakten mit Quelle', 'Welche Tarife hat Google Gemini aktuell in Deutschland und was kosten sie im Monat? Nenne zu jeder Zahl die Quelle mit Link. Wenn du eine Angabe nicht sicher prüfen kannst, schreib das dazu.'],
            ['Alltag: Mail zusammenfassen', 'Hier ist eine lange Mail von einem Lieferanten: [Mail einfügen]. Fass sie in 3 Stichpunkten zusammen, nenne alle Termine und Beträge und schlag eine kurze Antwort in Du-Form vor.'],
            ['Planung: Tabelle bauen', 'Ich will 4 Wochen lang jede Woche einen Blogartikel veröffentlichen. Bau mir eine Tabelle mit Woche, Thema, Ziel-Keyword, Entwurf fertig bis und Veröffentlichung. Thema des Blogs: Moped-Pflege im Winter.'],
        ],
        kitest: 'fakten',
        quellen: [
            { titel: 'Gemini Abos (Deutschland)', url: 'https://gemini.google/subscriptions/' },
            { titel: 'Google AI Abos bei Google One', url: 'https://one.google.com/intl/de_de/about/google-ai-plans/' },
            { titel: 'Privacy Hub für Gemini-Apps', url: 'https://support.google.com/gemini/answer/13594961?hl=de' },
            { titel: 'ChatGPT Preise', url: 'https://openai.com/chatgpt/pricing/' },
            { titel: 'ChatGPT Go (OpenAI-Hilfe)', url: 'https://help.openai.com/en/articles/11989085-what-is-chatgpt-go' },
            { titel: 'ChatGPT Pro Stufen', url: 'https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers' },
            { titel: 'Claude Preise', url: 'https://claude.com/pricing' },
            { titel: 'Claude Max und Ultra', url: 'https://claude.com/pricing/max' },
        ],
        geprueft: '2026-11-02',
        title: 'ChatGPT vs. Claude vs. Google Gemini',
        topic: 'KI-Chat & Recherche',
        tools: ['chatgpt', 'claude', 'google-gemini'],
        intro: 'Die drei großen KI-Assistenten im direkten Vergleich. ChatGPT gegen Claude steht schon im Zweiervergleich, hier geht es um das, was Gemini mitbringt: Google-Apps, Cloud-Speicher im Abo und Preise in Euro.',
        picks: [
            ['Du arbeitest den ganzen Tag in Gmail, Docs und Drive', 'google-gemini', 'Gemini direkt in den Google-Apps, ab Google AI Plus für 4,99 EUR im Monat mit 400 GB Speicher. Kein Kopieren zwischen Fenstern.'],
            ['Du willst ein Jahresabo und programmierst', 'claude', 'Pro für 17 USD im Monat bei jährlicher Zahlung, mit Research und Claude Code.'],
            ['Du brauchst regelmäßig Bilder und willst unabhängig von Google bleiben', 'chatgpt', 'Bildgenerierung direkt im Chat, ab Plus mit höheren Grenzen, und mit Go eine kleine Stufe für 8 USD im Monat.'],
        ],
    },
    {
        slug: 'lovable-vs-bolt-new-vs-v0',
        unterschiede: [
            [
                'Gratis-Tarif',
                'Lovable Free: 5 Build-Credits pro Tag, höchstens 30 im Monat. Bolt Free: 1 Million Token im Monat, höchstens 300.000 pro Tag. v0 Free: höchstens 7 Nachrichten pro Tag. Drei Tankfüllungen, aber in drei verschiedenen Einheiten.',
            ],
            [
                'Einstiegspreis',
                'Lovable Pro ab 25 USD im Monat für 100 Credits, jährlich 250 USD. Bolt Pro 25 USD im Monat mit 10 Millionen Token und Rollover. v0 Plus 30 USD pro Nutzer und Monat mit 30 USD Credits, zzgl. Steuern (Stand November 2026).',
            ],
            [
                'Was abgerechnet wird',
                'Lovable zählt Credits für Bauen, Chat, Hosting, Backend und KI-Funktionen in der App. Bolt zählt Token. v0 rechnet Token-Credits je nach gewähltem Modell ab. Wer viel nachbessert, sollte vorher schauen, wie schnell die eigene Füllung leer ist.',
            ],
            [
                'Datenbank und Backend',
                'Lovable bringt Backend und Datenbank über Lovable Cloud mit. Bolt hat Bolt Database in jedem Plan, Supabase verbinden geht ab Pro. v0 bindet laut Doku Neon, Supabase, Upstash und Vercel Blob an. Fertiger Unterbau bei Lovable und Bolt, Baukasten bei v0.',
            ],
            [
                'Code mitnehmen',
                'Lovable synchronisiert in allen Plänen mit GitHub, den Download der Codebasis gibt es nur in Bezahlplänen. Bolt synchronisiert mit GitHub und bietet das Projekt als ZIP an. v0 legt über die Einstellungen ein GitHub-Repo an und deployt auf Vercel. Bei allen drei kommst du an deinen Code, nur die Wege sind verschieden.',
            ],
        ],
        faq: [
            ['Welches Tool ist am günstigsten zum Ausprobieren?', 'Alle drei haben einen Gratis-Tarif. Bolt gibt mit 1 Million Token im Monat das größte Volumen an, Lovable und v0 begrenzen pro Tag. Was davon mehr bringt, hängt davon ab, wie groß deine Änderungen sind.'],
            ['Kann ich eine eigene Domain nutzen?', 'Ja. Bei Lovable nur in Bezahlplänen, bei Bolt ab Pro, bei v0 über die Domain-Einstellungen des Projekts.'],
            ['Brauche ich Programmierkenntnisse?', 'Zum Starten nein, alle drei arbeiten per Chat. Für eine App mit echten Kundendaten solltest du aber verstehen, was im Code und in der Datenbank passiert, oder jemanden fragen, der es versteht.'],
        ],
        quellen: [
            { titel: 'Lovable Tarife', url: 'https://docs.lovable.dev/introduction/subscription-plans' },
            { titel: 'Lovable Preise', url: 'https://lovable.dev/pricing' },
            { titel: 'Lovable GitHub', url: 'https://docs.lovable.dev/integrations/github' },
            { titel: 'Lovable eigene Domain', url: 'https://docs.lovable.dev/features/custom-domain' },
            { titel: 'Bolt Preise', url: 'https://bolt.new/pricing' },
            { titel: 'Bolt und Supabase', url: 'https://support.bolt.new/integrations/supabase' },
            { titel: 'Bolt GitHub', url: 'https://support.bolt.new/integrations/git' },
            { titel: 'v0 Preise', url: 'https://v0.app/pricing' },
            { titel: 'v0 Datenbanken', url: 'https://v0.app/docs/databases' },
        ],
        geprueft: '2026-11-02',
        title: 'Lovable vs. Bolt.new vs. v0',
        topic: 'Vibe Coding',
        tools: ['lovable', 'bolt-new', 'v0'],
        intro: 'Drei Tools, die aus einem Satz eine Web-App machen. Sie unterscheiden sich darin, wie sie abrechnen, wo die Datenbank herkommt und wie du deinen Code mitnimmst.',
        picks: [
            ['Du hast keine Technikkenntnisse und willst alles an einem Ort', 'lovable', 'Hosting, Backend und Datenbank über Lovable Cloud, GitHub-Sync in allen Plänen. Einsteigen, losfahren.'],
            ['Du willst viel ausprobieren, bevor du zahlst', 'bolt-new', 'Laut Anbieter 1 Million Token im Monat gratis, Hosting und Datenbanken inklusive. Die größte Probefahrt der drei.'],
            ['Du arbeitest mit Vercel und eigenem Code', 'v0', 'GitHub-Sync, Deployment auf Vercel und Anbindung von Neon, Supabase oder Upstash. Für alle, die selbst weiterschrauben wollen.'],
        ],
    },
    {
        slug: 'github-copilot-vs-cursor-vs-replit',
        unterschiede: [
            [
                'Wo du arbeitest',
                'GitHub Copilot ist eine Erweiterung für deinen bestehenden Editor, etwa VS Code, Visual Studio, JetBrains, Xcode oder Neovim, dazu github.com und die Kommandozeile. Cursor ist ein eigener Desktop-Editor für macOS, Windows und Linux. Replit läuft komplett im Browser. Anbauteil, neues Moped oder Mietwerkstatt.',
            ],
            [
                'Gratis-Tarif',
                'Copilot Free: 2.000 Code-Vervollständigungen im Monat und ein Kontingent an KI-Credits, Agenten eingeschränkt. Cursor Free: Agent- und Chat-Anfragen begrenzt. Replit Starter: tägliche Agent-Credits bis zu einer Monatsgrenze und eine veröffentlichte App, die nach 30 Tagen offline geht.',
            ],
            [
                'Einstiegspreis',
                'Copilot Pro 10 USD im Monat mit 1.500 KI-Credits. Cursor ist inzwischen Teil eines Pakets mit Grok und X: Plus kostet 8 USD im Monat und nutzt nur Grok-Modelle, andere Modelle laufen zum API-Listenpreis extra. Replit Core 20 USD im Monat oder 18 USD bei jährlicher Zahlung, mit 20 USD Credits (Stand November 2026).',
            ],
            [
                'Abrechnung',
                'Copilot rechnet seit 1. Juni 2026 nach KI-Credits ab, ein Credit entspricht laut GitHub 0,01 USD. Cursor rechnet Drittanbieter-Modelle nach Verbrauch ab. Replit zählt Credits für Agent und Hosting, nicht genutzte Credits verfallen. Bei allen dreien lohnt der Blick in die Verbrauchsanzeige nach der ersten Woche.',
            ],
            [
                'Hosting',
                'Replit hostet deine App direkt mit, etwa als Autoscale-Deployment ab 2 USD Grundgebühr im Monat plus Nutzung. Copilot und Cursor schreiben Code, das Hosting organisierst du selbst. Cursor bietet ab Premium Cloud Agents und Code-Hosting an.',
            ],
        ],
        faq: [
            ['Welches Tool ist für Anfänger am einfachsten?', 'Replit, weil nichts installiert werden muss und Hosting dabei ist. Wer schon einen Editor nutzt, kommt mit Copilot am schnellsten rein, ohne umzuziehen.'],
            ['Kann ich bei Cursor noch Claude- oder GPT-Modelle nutzen?', 'Laut Preisseite ja, aber Drittanbieter-Modelle werden zusätzlich zum API-Listenpreis abgerechnet. Der Plus-Tarif selbst enthält nur Grok-Modelle (Stand November 2026).'],
            ['Gibt es ein Jahresabo?', 'Replit Core ja, 18 USD im Monat bei jährlicher Zahlung. Cursor nennt nur Monatspreise. Bei Copilot erwähnt GitHub Jahrespläne nur noch als bestehende Altverträge.'],
        ],
        quellen: [
            { titel: 'GitHub Copilot Pläne', url: 'https://github.com/features/copilot/plans' },
            { titel: 'GitHub Copilot Tarife und Credits', url: 'https://docs.github.com/en/copilot/get-started/plans' },
            { titel: 'Cursor Preise', url: 'https://cursor.com/pricing' },
            { titel: 'Cursor Download', url: 'https://cursor.com/download' },
            { titel: 'Replit Preise', url: 'https://replit.com/pricing' },
            { titel: 'Replit Starter', url: 'https://docs.replit.com/billing/plans/starter-plan' },
            { titel: 'Replit Hosting-Preise', url: 'https://docs.replit.com/billing/deployment-pricing' },
        ],
        geprueft: '2026-11-02',
        title: 'GitHub Copilot vs. Cursor vs. Replit',
        topic: 'Coding',
        tools: ['github-copilot', 'cursor', 'replit'],
        intro: 'Drei Wege, mit KI zu programmieren: als Erweiterung im gewohnten Editor, als eigener KI-Editor oder komplett im Browser mit Hosting. Die Preismodelle haben sich 2026 bei allen dreien verändert.',
        picks: [
            ['Du willst deinen Editor behalten', 'github-copilot', 'Erweiterung für VS Code, JetBrains, Xcode und mehr, Pro für 10 USD im Monat. Anbauteil statt neues Fahrzeug.'],
            ['Du willst einen Editor, der um den Agenten gebaut ist', 'cursor', 'Eigener Desktop-Editor mit Agent in allen Plänen. Achtung: Plus nutzt nur Grok-Modelle, andere kosten extra.'],
            ['Du willst nichts installieren und gleich veröffentlichen', 'replit', 'Läuft im Browser, Hosting inklusive, Core ab 18 USD im Monat bei jährlicher Zahlung.'],
        ],
    },
    {
        slug: 'fireflies-ai-vs-tldv-vs-otter-ai',
        unterschiede: [
            [
                'Datenstandort',
                'tl;dv wird von der Tldx Solutions GmbH betrieben und hostet laut Anbieter im EWR, unter anderem bei Hetzner in Deutschland. Fireflies speichert standardmäßig in den USA, EU-Speicherung gibt es nur mit Private Storage im Enterprise-Tarif. Otter speichert bei AWS in der Region US West. Beide US-Anbieter nennen eine Zertifizierung unter dem EU-US Data Privacy Framework.',
            ],
            [
                'Gratis-Tarif',
                'Fireflies Free: unbegrenzte Transkription, 400 Minuten Speicher pro Nutzer, 20 KI-Credits im Monat. tl;dv Free: unbegrenzte Aufnahmen, Speicherung 3 Monate, volle KI-Notizen nur für die ersten 10 Meetings. Otter Basic: 300 Minuten im Monat, höchstens 30 Minuten pro Gespräch.',
            ],
            [
                'Einstiegspreis',
                'Fireflies Pro 18 USD pro Nutzer und Monat, 10 USD bei jährlicher Zahlung. tl;dv Pro 29 EUR pro Nutzer und Monat, 18 EUR bei jährlicher Zahlung. Otter Pro 16,99 USD pro Nutzer und Monat, günstiger bei jährlicher Zahlung; Aktionspreise gelten laut Otter nur für Neukunden (Stand November 2026).',
            ],
            [
                'Deutsch',
                'Alle drei transkribieren laut Anbieter Deutsch. Fireflies nennt über 100 Sprachen, tl;dv über 30, Otter sechs Sprachen. Gemischte Sprachen in einem Meeting erkennt Fireflies laut Hilfe nur in Business und Enterprise.',
            ],
            [
                'Mit oder ohne Bot',
                'Alle drei schicken einen Bot in Zoom, Google Meet und Teams, der sichtbar teilnimmt. Fireflies und tl;dv können laut Anbieter auch ohne Bot aufzeichnen, über Desktop-App oder Browser-Erweiterung. Bei Otter tritt der Notetaker laut Hilfe immer sichtbar bei.',
            ],
        ],
        faq: [
            ['Welches Meeting-Tool ist am DSGVO-freundlichsten?', 'Beim Datenstandort tl;dv, weil es laut Anbieter im EWR hostet und eine deutsche GmbH ist. Für jedes der drei brauchst du trotzdem einen AVV und das Einverständnis der Teilnehmenden. Wie das geht, zeigt unser Tutorial zu Meeting-Notizen.'],
            ['Werden meine Meetings zum KI-Training genutzt?', 'Fireflies und tl;dv schreiben laut eigenen Seiten, dass sie keine Kundendaten zum Training nutzen. Bei Otter steht das in der Datenschutzerklärung, lies sie vor dem Einsatz mit Kundendaten.'],
            ['Kann ich die Tools gratis testen?', 'Ja, alle drei haben einen Gratis-Tarif. Bei tl;dv gelten die Grenzen der KI-Notizen einmalig für das Konto, nicht pro Monat.'],
        ],
        quellen: [
            { titel: 'Fireflies Gratis-Tarif', url: 'https://guide.fireflies.ai/articles/4027724828-learn-about-the-fireflies-free-plan' },
            { titel: 'Fireflies Pro', url: 'https://guide.fireflies.ai/articles/1092250300-learn-about-fireflies-pro-tier-features' },
            { titel: 'Fireflies Datenspeicherung', url: 'https://guide.fireflies.ai/articles/9596505232-learn-about-data-storage-and-transfer' },
            { titel: 'Fireflies Sprachen', url: 'https://guide.fireflies.ai/articles/2973706448-learn-about-fireflies-supported-languages' },
            { titel: 'tl;dv Preise', url: 'https://tldv.io/pricing/' },
            { titel: 'tl;dv Gratis-Tarif', url: 'https://intercom.help/tldv/en/articles/8919450-what-are-the-limits-of-the-free-plan' },
            { titel: 'tl;dv Datenschutz', url: 'https://tldv.io/privacy/' },
            { titel: 'Otter Preise', url: 'https://otter.ai/pricing' },
            { titel: 'Otter Notetaker', url: 'https://help.otter.ai/hc/en-us/articles/4425393298327-Otter-Notetaker-Overview' },
            { titel: 'Otter Datenschutz', url: 'https://otter.ai/privacy-policy' },
        ],
        geprueft: '2026-11-02',
        title: 'Fireflies.ai vs. tl;dv vs. Otter.ai',
        topic: 'Meetings & Transkription',
        tools: ['fireflies-ai', 'tldv', 'otter-ai'],
        intro: 'Drei Protokoll-Tools für Zoom, Meet und Teams. Der größte Unterschied liegt nicht in der Zusammenfassung, sondern darin, wo deine Meetings gespeichert werden.',
        picks: [
            ['Datenstandort in Europa ist dir wichtig', 'tldv', 'Deutsche GmbH, Hosting laut Anbieter im EWR. Die kürzeste Antwort auf die Frage deiner Datenschutzbeauftragten.'],
            ['Du willst viel transkribieren, ohne zu zahlen', 'fireflies-ai', 'Unbegrenzte Transkription im Gratis-Tarif, Pro ab 10 USD im Monat bei jährlicher Zahlung.'],
            ['Du brauchst schnelle Mitschriften auf Englisch und Deutsch', 'otter-ai', '300 Minuten im Monat gratis, sechs Sprachen inklusive Deutsch.'],
        ],
    },
    {
        slug: 'deepl-vs-grammarly-vs-quillbot',
        unterschiede: [
            [
                'Wofür sie gebaut sind',
                'DeepL übersetzt, Grammarly korrigiert und schreibt mit KI, vor allem auf Englisch, QuillBot formuliert um und fasst zusammen. Drei Werkzeuge aus derselben Schublade, aber nicht für dieselbe Schraube.',
            ],
            [
                'Gratis-Tarif',
                'DeepL Free: 50.000 Zeichen im Monat, 1 Datei, 1 Glossar. Grammarly Free: Rechtschreibung, Grammatik, Tonerkennung und 100 KI-Prompts im Monat. QuillBot Free: Umformulieren mit Wortgrenze pro Durchgang und 2 Modi; die Grenze steht auf den QuillBot-Seiten widersprüchlich mit 100 oder 125 Wörtern.',
            ],
            [
                'Einstiegspreis',
                'DeepL Pro Individual 7,49 EUR im Monat bei jährlicher Zahlung, inkl. MwSt. Grammarly Pro 30 USD bei monatlicher Zahlung oder 144 USD im Jahr, also 12 USD im Monat. QuillBot Premium 8,33 USD im Monat bei jährlicher Zahlung (Stand November 2026).',
            ],
            [
                'Deutsch',
                'DeepL übersetzt von und nach Deutsch. Grammarly nennt Schreibhilfe in Englisch, Spanisch, Französisch, Deutsch, Portugiesisch und Italienisch. QuillBot formuliert laut Anbieter in 23 Sprachen um, die Grammatikprüfung gibt es in 6 Sprachen.',
            ],
            [
                'Training mit deinen Texten',
                'DeepL nutzt Texte aus der Gratis-Version zeitlich begrenzt zum Training, Pro-Texte laut Anbieter nie. Bei Grammarly ist die Nutzung für Training in Free und Pro standardmäßig an, abschaltbar. QuillBot nutzt Eingaben laut Hilfe ebenfalls, mit Opt-out in den Einstellungen, Team-Pläne ausgenommen. Vertrauliches also nur in Bezahltarifen oder mit Opt-out.',
            ],
        ],
        faq: [
            ['Kann Grammarly deutsche Texte korrigieren?', 'Laut Grammarly ja, Deutsch steht in der Liste der Sprachen für die Schreibhilfe. Der Schwerpunkt des Produkts liegt aber auf Englisch.'],
            ['Ist DeepL Free datenschutzfreundlich?', 'Laut DeepL werden Texte der Gratis-Version zeitlich begrenzt zum Training verwendet, personenbezogene Daten sollst du dort nicht eingeben. In Pro werden Texte nach der Übersetzung gelöscht.'],
            ['Brauche ich alle drei?', 'Selten. Übersetzt du viel, reicht DeepL. Schreibst du auf Englisch, hilft Grammarly. QuillBot lohnt sich, wenn du Texte umformulieren oder kürzen willst.'],
        ],
        quellen: [
            { titel: 'DeepL Pro Preise', url: 'https://www.deepl.com/en/pro' },
            { titel: 'DeepL Datenschutz', url: 'https://www.deepl.com/en/privacy' },
            { titel: 'Grammarly Pläne', url: 'https://www.grammarly.com/plans' },
            { titel: 'Grammarly Pro Preis', url: 'https://support.grammarly.com/hc/en-us/articles/115000090011-How-much-does-Grammarly-Pro-cost' },
            { titel: 'Grammarly Training', url: 'https://support.grammarly.com/hc/en-us/articles/25555503115277' },
            { titel: 'QuillBot Premium', url: 'https://quillbot.com/premium' },
            { titel: 'QuillBot Datennutzung', url: 'https://help.quillbot.com/hc/en-us/articles/360056530894-How-does-Quillbot-use-my-data' },
        ],
        geprueft: '2026-11-02',
        title: 'DeepL vs. Grammarly vs. QuillBot',
        topic: 'Schreiben & Übersetzen',
        tools: ['deepl', 'grammarly', 'quillbot'],
        intro: 'Übersetzen, korrigieren, umformulieren: Diese drei werden oft in einen Topf geworfen, lösen aber verschiedene Aufgaben. Dazu kommt die Frage, was mit deinen Texten passiert.',
        picks: [
            ['Du übersetzt Texte, auch vertrauliche', 'deepl', 'Pro ab 7,49 EUR im Monat bei jährlicher Zahlung, Pro-Texte laut DeepL nie fürs Training genutzt.'],
            ['Du schreibst viel auf Englisch', 'grammarly', 'Korrektur, Tonerkennung und KI-Schreibhilfe mit Schwerpunkt Englisch.'],
            ['Du willst Texte umformulieren oder kürzen', 'quillbot', 'Paraphrasieren in 23 Sprachen und Zusammenfassen, Premium ab 8,33 USD im Monat bei jährlicher Zahlung.'],
        ],
    },
]

const withTools = (c) => ({ ...c, items: c.tools.map(getTool).filter(Boolean) })

export const getComparisons = () => COMPARISONS.map(withTools)
export const getComparison = (slug) => {
    const c = COMPARISONS.find((x) => x.slug === slug)
    return c ? withTools(c) : null
}
export const comparisonsForTool = (toolSlug) => COMPARISONS.filter((c) => c.tools.includes(toolSlug))
