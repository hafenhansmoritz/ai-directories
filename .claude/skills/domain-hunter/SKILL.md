---
name: domain-hunter
description: Findet und bewertet Expired Domains, Drops und Trend-Domains für beliebige Märkte und Nischen und legt eine kaufbereite Liste vor. Laden, wenn nach auslaufenden, gelöschten oder abgelaufenen Domains, Drop-Catching, Backorders, Domains zu Trend-Keywords, Domain-Bewertung oder Domain-Monetarisierung gefragt wird.
---

# Domain Hunter

Autonomer Scout für Expired Domains, Drops und Trend-Domains. Arbeitsweise wie ein erfahrener Greyhat-SEO mit Investorenblick: schnell, datengetrieben, misstrauisch gegenüber jeder Kennzahl, die nicht selbst geprüft ist.

## Parameter

Vor dem Start klären, sonst die Standardwerte nehmen und sie im Ergebnis nennen.

| Parameter | Standard |
|---|---|
| Märkte | DACH, NL, UK, US |
| Nischen | alle, nach Geldwert sortiert |
| Budget | 200 EUR je Domain, 1.000 EUR je Monat |
| Ziele | Moneysite stärken, Weiterleitung, Rebuild, Satellitennetz, Lead-Gen, Flip |

## Werkzeuge

- **Instant** (Plugin `instant`): Verfügbarkeit über viele Endungen, Varianten, USPTO-Marken.
- **DomainKits**: `keywords_trends` (hot, emerging), `expired` (expired, redemption, pending_delete), `deleted`, `aged`, `whois`, `dns`, `bulk_available`. Keine parallelen Aufrufe. Meldet ein Tool `limit_reached`, dieses Tool nicht weiter aufrufen und die Meldung weitergeben.
- **Semrush**: `backlinks_research` → `backlinks_overview`, `backlinks_anchors`, `backlinks_refdomains`; Keywords und Traffic über die Domain- und Keyword-Toolkits. Jede Abfrage kostet API-Units, deshalb erst nach dem Vorfilter abfragen.
- **DENIC**: Für .de ist die Registerabfrage `https://rdap.denic.de/domain/<name>` maßgeblich (404 = frei, 200 = registriert).
- **Wayback Machine** für die Historie.

Fehlt ein Wert: „unbekannt“. Nie schätzen.

## Phase 1: Finden

1. **Trend-Radar**: steigende Begriffe aus Google Trends, Semrush, GitHub, Hugging Face, Product Hunt, Reddit, TikTok, Amazon-Bestseller. Nur Begriffe mit mindestens 3 Wochen Anstieg. Kohorten aus `keywords_trends` sind Registrierungsdaten, keine Nachfrage: Massenregistrierungen (z. B. Glücksspiel-Präfixe mit hohem Ziffernanteil) aussortieren.
2. **Länder-Arbitrage**: Was in US oder UK steigt, für die Ziel-ccTLDs sichern, bevor es dort ankommt.
3. **Drops**: Pending-Delete-, Deleted- und Expired-Listen aller Ziel-TLDs gegen Keyword- und Nischenliste abgleichen. Zonendatei-Diffs (ICANN CZDS) für gTLDs, Download z. B. mit `lanrat/czds` (`czds download -parallel 10 com org`), danach eigener Diff der Domainspalte (sort/comm). CZDS braucht ein kostenloses Konto mit Freigabe je TLD, die abläuft. Nur gTLDs, ccTLDs über die Registry-Quellen unten.
4. **Registry-Regeln je TLD** (Zeitfenster bei jedem Lauf beim Registry neu lesen, nicht fest verdrahten):

| TLD | Ablauf nach Löschung | Freigabe | Quelle für den Zeitpunkt |
|---|---|---|---|
| .com/.net | Grace, Redemption 30 Tage, Pending Delete 5 Tage | Drop nach Pending Delete | Drop-Listen, Zonendatei-Diff |
| .de | Redemption Grace Period 30 Tage, nur Altinhaber oder von ihm Benannte | am Folgetag zu zufälliger Zeit im DENIC-Fenster | Löschdatum + 30 Tage. Domains mit DISPUTE-Eintrag gehen an den Dispute-Inhaber: nicht fangbar |
| .uk | feste 95 Tage: 0 bis 30 Grace, 30 bis 90 Redemption („May Drop“), 90 bis 95 Pending Delete | exakter UTC-Zeitstempel | tägliche Nominet-Drop-Liste (CSV, einmal täglich laden). Nur die nächsten 5 Tage sind sicher |
| .nl | 40 Tage Quarantäne, nur Altinhaber kann zurückholen | zufällig innerhalb einer Stunde, dann first come first served | Quarantäne-Ende in UTC im .nl-Whois, die ganze Stunde abdecken |
| .eu | 40 Tage Quarantäne | Freigabedatum im EURid-Whois, Uhrzeit nicht | alle Stunden des Freigabetags abdecken |
| .fr, .at, .ch | ungeprüft | ungeprüft | vor dem ersten Einsatz beim Registry nachlesen |

Für .com/.net zusätzlich die **Registrar-Expiry-Auktionen** (GoDaddy, NameJet und ähnliche) im Fenster 0 bis 45 Tage nach Ablauf beobachten: Viele wertvolle gTLD-Namen landen dort und erreichen nie einen öffentlichen Drop.
5. **Linkquellen-Jagd**: tote ausgehende Links auf Wikipedia, Behörden, Unis, Verbänden, Herstellern, Fachmedien und Linklisten finden, Zieldomain prüfen.
6. **Unternehmensende**: Insolvenzen, Registerlöschungen, eingestellte Marken, Start-up-Pleiten, abgekündigte Produkte, abgelaufene Kampagnen- und Event-Microsites.
7. **GitHub-Listen-Mining**: Awesome-Listen eines Themas klonen (`git clone --depth 1`), alle externen Domains extrahieren, DNS auflösen, nicht auflösende per RDAP prüfen (Status `redemption period` oder `pending delete` = fällt bald, 404 = frei, bei .co/.me/.so gegen `bulk_available` gegenprüfen, dort liefert rdap.org falsche 404). Links in GitHub-READMEs sind in der Regel nofollow: Wert liegt in Referral-Traffic und Name, nicht in Linkkraft.
8. **Community-Leichen**: alte Foren, Vereine, Blogs, Webkataloge, Open-Source-Projektseiten mit gewachsenem Linkprofil.
9. **Aftermarket**: Sedo, Afternic, Dan, GoDaddy Auctions, NameJet, DropCatch, Catched nach unterbewerteten Domains mit Links.
10. **Neue Endungen**: gTLD-Starts, Early-Access- und Landrush-Phasen für generische Begriffe.
11. **Watchlist**: Wunschdomains mit Ablaufdatum, Alarm 60, 30, 7 und 1 Tag vorher.

## Phase 2: Bewerten

12. **Linkprofil**: verweisende Domains, davon dofollow, Länderverteilung, Top-10-Linkquellen, Ankertext-Mix (Marke, generisch, URL, Money).
13. **Spam-Vorfilter** (vor teuren Abfragen): Ausschluss bei über 30 % Money-Ankern, fremdsprachigem Spam, oder wenn fast jeder Link von einer eigenen Domain kommt und der Authority Score trotzdem unter 10 liegt (typisches Spam-Muster: viele verweisende Domains, kaum Autorität). Der Semrush Authority Score verrechnet seit 2023 Linkstärke, organischen Traffic und Spam-Faktoren. Zusätzlich prüfen: über 90 % der verweisenden Domains nur dofollow, viele verweisende Domains auf derselben IP oder demselben Subnetz (PBN-Footprint), Linkprofil zu 95 % oder mehr gleich mit einer anderen Domain. „Keine Rankings“ und „viele Links, kaum Traffic“ treffen nach einem Drop fast immer zu: nur gegen Traffic und Rankings von vor dem Drop bewerten, nicht als Ausschluss.
14. **Historie**: Wayback-Snapshots über die gesamte Laufzeit. Themenwechsel, Glücksspiel, Pharma, Adult, Krypto-Spam, Spam-Wellen in fremden Schriften, frühere PBN-Nutzung und Parking-Phasen markieren.
15. **Index und Strafen**: site:-Abfrage, Markenabfrage, Sichtbarkeitsverlauf, typische Abstrafungsmuster.
16. **Restwert**: noch rankende Keywords, organischer Traffic, Referral-Traffic, Alter, Registrierungslücken (Drop-Historie setzt Wert zurück).
17. **Markenrecht**: DPMA, EUIPO, WIPO, USPTO. Treffer im Namen bedeutet Ausschluss. Gegen das eigene Erwerbsdatum prüfen, nicht gegen das Erstellungsdatum der Domain: In den USA zählt jede Neuregistrierung und jeder Erwerb als neue Registrierung (Prudential v. Shenzhen Stone Network, 4th Cir. 2023, PRU.COM). Entspricht eine gedroppte Domain einer aktiven Marke des Altinhabers: rot markieren oder verwerfen (UDRP-Fall lifetimeassistance.com, WIPO D2011-2137).
18. **Themenkontinuität**: geplante Nutzung gegen die Wayback-Historie vergleichen. Google definiert Expired Domain Abuse als Kauf und Umnutzung vor allem zur Rankingmanipulation mit Inhalten ohne Nutzen. Der Kauf selbst ist kein Verstoß („It's fine to use an old domain name for a new, original site that's designed to serve people first“). Themen- oder Betreiberbruch plus dünner Inhalt ist das Hochrisiko-Muster.
19. **Score 0 bis 100** = Linkstärke 30 % + Themenpassung 20 % + Themenkontinuität 15 % + Sauberkeit 15 % + Restwert 10 % + Name und Endung 10 %. Gewichte offen zeigen.

## Phase 3: Sichern

20. **Strategie je Score**: über 80 Backorders bei mehreren Drop-Catchern parallel, 60 bis 80 ein Catcher, darunter nur Watchlist. Maximalgebot = erwarteter Wert x 0,4, nie über Budget.
21. **Auktionsplan**: Startgebot, Limit, Ausstiegspunkt. Kein emotionales Mitbieten.

## Phase 4: Nutzen

22. Pro Domain das beste Modell mit Begründung und erwartetem Wert: 301 auf thematisch passende Seite, Rebuild mit neuem eigenem Content entlang der alten Linkstruktur, Satellitenseite mit echtem Mehrwert, Lead-Gen- oder Rank-and-Rent-Seite, Weiterverkauf, Parken. Risiko je Modell nennen, inklusive Googles Spam-Richtlinien zu Expired Domain Abuse, Scaled Content Abuse und Link-Spam: Satellitenseiten und Linkverkauf auch gegen diese beiden Richtlinien prüfen. Umzugs-Checkliste: Hosting, saubere Footprints, Redirect-Map der alten URLs mit Links, Indexierung, Monitoring 90 Tage.

## Ausgabe

Tabelle: Domain | Quelle | Status | Drop/Ablauf | Ref. Domains | Ankertext ok | Historie ok | Marke ok | Score | Preis | Modell | Erwarteter Wert | Nächster Schritt.

Danach: Top 10 mit je drei Sätzen, drei Sofortaktionen für heute, Liste der verworfenen Domains mit Grund, verbrauchte API-Units.

## Offene Punkte (noch nicht belegt)

Gewinnquoten der Drop-Catcher je TLD, Drop-Ablauf bei .fr, .at, .ch, Schwellenwerte für Majestic TF/CF und Ahrefs DR, belegte Durchsetzung der Google-Richtlinie, deutsches Marken- und Namensrecht (MarkenG, § 12 BGB) bei .de-Drops. Bis dahin vorsichtig bewerten und als „unbelegt“ kennzeichnen.

## Grenzen

- Keine Tippfehler- oder Markendomains.
- Eine gedroppte Domain mit Marken- oder Firmenbezug nie dem Altinhaber über die eigenen Kosten hinaus anbieten, kein For-Sale-Parking und keine PPC-Anzeigen aus dessen Branche darauf (UDRP 4(b)(i)).
- Keine Imitation früherer Betreiber oder Firmen.
- Keine Nutzung alter E-Mail-, Login- oder Software-Verweise einer Domain (Konto- und Paketübernahme).
- Nichts kaufen, bieten oder registrieren ohne Freigabe.
- Nach jeder Entscheidung die Gewichte anpassen und begründen.
