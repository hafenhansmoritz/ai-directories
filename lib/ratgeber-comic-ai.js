// Editorial case studies from POSCHDPARK (2026-11-01).
// No fabricated external statistics or claim that 200 generated pages were finished.
export const COMIC_ARTIKEL = [
  {
    slug: "ki-comic-figuren-konsistent-halten",
    title: "KI-Comic mit konsistenten Figuren: Charakterbibel statt Prompt-Lotterie",
    description: "So bleiben Gesichter, Outfits, Schauplätze und Beziehungen über viele KI-Comicseiten hinweg konsistent: Figurenkarten, visuelle Anker, Kanon und QA.",
    jean: "Hundert schöne Einzelbilder ergeben noch keine Geschichte. Wenn die Hauptfigur auf Seite zwölf ein anderes Gesicht hat, ist das kein Comic, sondern ein Identitätswechsel mit Sprechblasen.",
    minutes: 7,
    links: [["/ratgeber","Alle KI-Ratgeber"],["/tutorials","Praktische Tutorials"]],
    sections: [
      { h: "Das eigentliche Problem ist Kontinuität", p: ["Bild-KI kann eine Szene überzeugend darstellen und trotzdem beim nächsten Bild Haarfarbe, Kleidung, Alter oder Perspektive ändern. Bei langen Comics summieren sich diese kleinen Abweichungen. Leser müssen Figuren wiedererkennen können, bevor sie dem Plot folgen.","Im POSCHDPARK-Konzept ist die Kontinuität absichtlich konkret: Jupp trägt den roten Trainingsblouson und hat eine Narbe an der linken Braue; Tine den grünen Schal; Ronny hat eine violett-schwarze Jacke und bewahrt eine Postkarte im Geldbeutel auf. Solche Merkmale werden nicht in jeder Szene neu erfunden."] },
      { h: "Schreibe zuerst Character Cards", p: ["Eine gute Figurenkarte enthält mindestens Silhouette, Gesichtsmerkmale, Altersspanne, festes Outfit, besondere Gegenstände, Haltung, Sprache, Wunsch, inneren Widerspruch und die Beziehung zu anderen Figuren. Vermeide Angaben wie 'cooler Typ': Das ist keine reproduzierbare Beschreibung.","Erzeuge je Hauptfigur eine neutrale Referenz mit Vorderansicht, Profil, Dreiviertelansicht und zwei charakteristischen Emotionen. Halte Licht und Farbpalette gleich. Eine veränderte Kleidung ist nur dann erlaubt, wenn die Handlung sie begründet."] },
      { h: "Schauplätze brauchen denselben Schutz", p: ["Eine Set Card erklärt, wo welche Requisite steht, wie Licht und Farbtemperatur wirken und wie der Ort relativ zu anderen Schauplätzen liegt. Im Beispiel liegt Bank 3 zwischen Laterne und Weg zur Busbucht; Kikis Kiosk hat eine beschädigte gelbe Markise.","Ein Standortwechsel muss in der Sequenz erkennbar sein: Totale, Halbnahe und Blickachsen. Die nächste Seite darf nicht plötzlich ein anderes Kioskfenster oder eine neue Parkgeografie zeigen."] },
      { h: "Ein Kanon, viele kleine Prompts", p: ["Führe eine Master-Bibel, eine Ereignis-Timeline und pro Folge eine Szenenkarte. Für den aktuellen Render bekommt das Modell nur die relevanten Figuren, den aktuellen Schauplatz, die Handlung bis dahin und die unveränderlichen Regeln.","Prompt-Skelett: 'Erzeuge Panel 4 von Seite 3. Figuren: Jupp und Tine gemäß Referenz A/B. Ort: Bank 3 gemäß Set Card. Handlung: Tine zeigt auf das Kleingedruckte. Kamera: Halbnahe, Blickachse konstant. Nicht verändern: Narbenposition, Kleidung, Bankmarkierung. Keine neue Requisite.'"] },
      { h: "Qualitätskontrolle vor dem nächsten Bild", p: ["Kontrolliere pro Seite: Figurenmerkmale, Blickrichtungen, Requisiten, Lichtkontinuität, Reihenfolge, Sprechblaseninhalt und Ende des Panels. Bei Widersprüchen korrigiere sofort, statt den Fehler über 30 Seiten fortzuschreiben.","Der kleinste produktive Test ist eine sechsseitige Szene mit zwei Figuren und einem Set. Wer diese sechs Seiten nicht konstant hinbekommt, sollte nicht mit einem angeblichen 200-Seiten-Autolauf beginnen."] }
    ]
  },
  {
    slug: "comic-drehbuch-ki-panel-fuer-panel",
    title: "Comic-Drehbuch mit KI: 10 Seiten planen, 50 Panels sauber schreiben",
    description: "Vom Figurenkonflikt zum panelgenauen Skript: A-Plot, B-Plot, visuelle Kausalität, Seite-zu-Seite-Spannung und Sprechblasen-Limits für KI-Comics.",
    jean: "Eine Pointe ist noch keine Handlung. Wenn nach zehn Seiten nichts passiert ist außer zehn Beleidigungen, fehlt keine bessere KI: Es fehlt ein Drehbuch.",
    minutes: 8,
    links: [["/ratgeber","Alle KI-Ratgeber"],["/tutorials","Praktische Tutorials"]],
    sections: [
      { h: "Beginne mit einer Entscheidung", p: ["Ein brauchbarer Pilot braucht eine Figur, die etwas will, unter Druck eine falsche Wahl trifft und deren Folgen den Rest der Episode antreiben. In POSCHDPARK unterschreibt Jupp eine Interessenbekundung zur Umgestaltung seiner Parkbank. Das rote X macht seine Entscheidung sichtbar.","Die eigentliche Frage lautet nicht 'Was passiert Lustiges?', sondern: Was riskiert Jupp? Was entdeckt Tine? Warum ist die Bank für Ronny wichtig? Welche neue Information hat der Leser auf jeder Seite?"] },
      { h: "Nutze A-, B- und Staffel-Plot", p: ["Der A-Plot trägt die äußere Aktion: die Parkumgestaltung. Der B-Plot trägt das Verhältnis von Jupp zu Tine und Ronny. Der Staffel-Plot beantwortet allmählich, welche Variante der Planung überhaupt legitim ist.","Alle Stränge müssen sich gegenseitig verändern. Eine Nebenfigur darf nicht nur für einen Gag auftauchen, wenn man sie später ohne Konsequenz vergessen kann."] },
      { h: "Ein brauchbares Zehn-Seiten-Gerüst", p: ["Seite 1 etabliert Ort und Machtverhältnis. Seiten 2 bis 3 liefern Angebot und Warnsignal. Seite 4 den Wendepunkt. Seiten 5 bis 7 die Folgen. Seite 8 die persönliche Wahrheit. Seite 9 neue Belege. Seite 10 den Cliffhanger.","Ein Zehn-Seiten-Skript mit fünf Panels pro Seite hat 50 feste Bildentscheidungen. Pro Panel notierst du: Set, Figuren, sichtbare Handlung, Kamera, Text, Übergang und Kontinuitätsprüfung."] },
      { h: "Dialog gehört in die Figur", p: ["Jupp spricht großspurig, Kiki knapp, Tine präzise, Mirgel verknüpft Halbwissen, Ronny hat bei Erinnerungen seines Vaters eine andere Stimme als beim öffentlichen Streit. So erkennt man Figuren auch ohne Namensschild.","Pro Sprechblase besser ein Gedanke und kurze Sätze statt Romanabsätze. Dialekt kann den Klang färben, muss aber lesbar bleiben. Für Neunkirchen ist Saar-Umgangssprache passender als norddeutsches Platt."] },
      { h: "Prompt-Vorlage für die Panelproduktion", p: ["'Du bist Comic-Dramaturg und zeichnerischer Regisseur. Schreibe zehn Seiten mit je fünf Panels. Quellen: Figurenkarten, Staffel-Timeline, Set Cards. Jede Seite: dramatisches Ziel, vollständige Panelliste, Sprechblasen maximal 20 Wörter, sichtbare Kausalität, Ende mit kleinem Impuls für die nächste Seite.'","Erzeuge zunächst nur das Beat Sheet und prüfe, ob jede Handlung ein auslösendes Ereignis hat. Dann schreibe Dialoge. Danach zeichne testweise zwei benachbarte Seiten und passe die Bildregie an."] }
    ]
  },
  {
    slug: "gamma-ki-comic-workflow-grenzen",
    title: "Gamma für einen KI-Comic: Was funktioniert und wo 200 Seiten scheitern",
    description: "Ein Praxis-Workflow für lange visuelle Geschichten mit Gamma und Bild-KI: Seitenplanung, Export, Lettering, Bildkontinuität und ehrliche Produktionsgrenzen.",
    jean: "200 beauftragte Karten sind nicht 200 verifizierte Comicseiten. Ein exportierter Stapel ist noch keine Geschichte.",
    minutes: 6,
    links: [["/ratgeber","Alle KI-Ratgeber"],["/tutorials","Praktische Tutorials"]],
    sections: [
      { h: "Gamma ist Layout-Hilfe, kein Seriengedächtnis", p: ["Gamma kann viel Text in visuelle Seiten überführen. Das löst aber weder dauerhaft dieselben Gesichter noch die kontrollierte Anordnung von Panels und Sprechblasen. Dafür brauchst du separate Referenzen und redaktionelle Abnahme.","Im POSCHDPARK-Projekt wurde ein Umfang von zehn Kapiteln à 20 Karten beauftragt. Das ist ein Produktionsziel, kein Nachweis, dass schon 200 konsistente Comicseiten fertig und exportiert sind."] },
      { h: "Teile ein Großprojekt in kleine Abnahmen", p: ["Statt 200 Karten blind zu generieren: Serienbibel, Pilot mit zehn Seiten, Bildserie aus drei Szenen, festes Lettering-System, danach Chargen von 10 bis 20 Seiten. Jede Charge erhält eine klare Definition of Done.","Halte für jede Seite fest: Seiten-ID, Kapitel, Szenenziel, freigegebenes Bild, geprüfter Text, Revisionsstatus. Ein einfacher Tabellen- oder Dateilisten-Workflow reicht anfangs aus."] },
      { h: "Drei Ebenen getrennt halten", p: ["Ebene 1 ist die Handlung als reiner Text; Ebene 2 die Bildkomposition; Ebene 3 das editierbare Lettering. Wenn Dialog ausschließlich als generierte Schrift im Bild sitzt, werden Tippfehler und Sprechblasenkorrekturen unnötig teuer.","Für professionelle PDFs sollten Sprechblasen und Captions im Layout-Tool editierbar bleiben. Das ist vor allem bei Dialekt und derber Sprache wichtig, bei denen automatische Schrift oft Buchstaben verschluckt."] },
      { h: "Export und Qualitätsprüfung", p: ["Erst nach Fertigmeldung exportieren. Prüfe die Seitenzahl, die Lesbarkeit auf dem Smartphone, abgeschnittene Blasen, wiederkehrende Figurenmerkmale, die Reihenfolge und die Dateigröße. Ein PDF ist nicht automatisch druckfertig.","Für Druck zusätzlich Beschnitt, Innenrand, Schriftgröße und Farbprofil festlegen. Für Social Media lieber ausgewählte Panels als separat gesetztes Carousel statt 20 Comicseiten als unlesbares Einzelbild."] },
      { h: "Die minimal sinnvolle Produktionsprobe", p: ["Nimm eine Szene mit zwei Personen, einem Kiosk, einem Dokument und einem kleinen Cliffhanger. Setze drei Seiten sauber um und lasse eine zweite Person ohne Erklärung lesen. Versteht sie Handlung und Figuren? Dann kann skaliert werden.","Richtiges Automatisieren heißt nicht, jede Zwischenprüfung abzuschaffen, sondern die zu wiederholenden Checks standardisiert ablaufen zu lassen."] }
    ]
  },
  {
    slug: "ki-inhalte-linkedin-substack-repurposing",
    title: "Ein KI-Projekt in LinkedIn und Substack verwandeln, ohne Copy-Paste-Spam",
    description: "Aus einem echten Projekt eine LinkedIn-Story, einen Substack-Fachartikel und fünf wiederverwendbare Website-Module erstellen: mit Quellen, Kanalstrategie und Freigabe.",
    jean: "Ein Post ist kein Ausschnitt aus dem Blog, dem man fünf Emojis ans Ende klebt. Jeder Kanal braucht seine eigene Aufgabe.",
    minutes: 7,
    links: [["/ratgeber","Alle KI-Ratgeber"],["/tutorials","Praktische Tutorials"]],
    sections: [
      { h: "Erst den belegbaren Kern isolieren", p: ["Trenne 'geplant', 'produziert', 'getestet' und 'veröffentlicht'. Ein guter Case-Study-Post behauptet keine 200 fertigen Seiten, wenn lediglich die Gamma-Generierung gestartet wurde. Genau diese Statusdisziplin macht Content glaubwürdig.","Das belastbare Learning aus dem POSCHDPARK-Vorhaben ist die Serienbibel mit Figurenkarten, festen Sets, Zehn-Seiten-Pilot und dem Versuch, eine große Staffel kohärent zu generieren."] },
      { h: "LinkedIn braucht einen Konflikt und einen Beleg", p: ["Formel: klare Gegenposition, eigener Fehler, konkrete Arbeitsweise, ein überprüfbarer Befund, eine Frage. Der LinkedIn-Post erklärt die Erkenntnis in wenigen Absätzen, statt die gesamte Handlung des Comics zu referieren.","Beispiel-Hook: 'Mein größter Fehler bei KI-Comics war nicht das Bildmodell. Es war die fehlende Kontinuitätskontrolle.' Darauf folgen zwei bis drei konkrete Projektentscheidungen und ein sichtbarer Zustand."] },
      { h: "Substack braucht ein belastbares Argument", p: ["PromptGott passt, wenn die Geschichte als Fallstudie zu Prompt Engineering, Wissensarchitektur, Multi-Step-Content-Operations oder automatisierter Qualitätssicherung erzählt wird. Ein derber Neunkirchen-Comic selbst gehört nicht ungefiltert in einen AI-SEO-Fachnewsletter.","Gliederung: Experiment, methodischer Fehler, Architektur der Serienbibel, Versionierung, Bild-Lettering-Trennung, wo KI versagt, was andere Operator daraus übernehmen können."] },
      { h: "Website erhält vertiefende How-tos", p: ["Auf einer AI-Directory-Plattform sind eigenständige Tutorials sinnvoller als die doppelte Veröffentlichung derselben Marketinggeschichte. Dazu gehören Charakterkonsistenz, Panel-Skripting, Export-QA und kanalabhängiges Repurposing.","Verlinke die Artikel mit semantischem Ankertext untereinander. Vermeide fünf nahezu identische Seiten mit minimal verändertem Keyword: Das erhöht Pflegeaufwand, nicht Nutzen."] },
      { h: "Automatisierung erst nach einer Testserie", p: ["Ein Markdown-Repo kann die redaktionelle Quelle sein. Erstellt werden LinkedIn-Draft und Substack-Draft mit eigenem Titel, Format, Datum und Veröffentlichungsstatus. Nach Prüfung kann ein natives Connector- oder Scheduling-Tool posten.","Die wichtigste Grenze: Ein erfolgreicher GitHub-Merge ist noch keine Substack- oder LinkedIn-Veröffentlichung. Ohne verbundenes Konto und funktionierenden Veröffentlichungsadapter bleibt der Status 'Entwurf'."] }
    ]
  },
  {
    slug: "github-first-content-qa-publishing",
    title: "GitHub-first Publishing für KI-Content: Merge, Review und echte Veröffentlichung trennen",
    description: "Wie du einen kleinen Content-Workflow mit GitHub, Markdown, Review-Checkliste und Plattformadaptern aufbaust, ohne versehentlich ungeprüfte Entwürfe zu veröffentlichen.",
    jean: "Ein grüner Merge-Button ist keine Distribution. Erst wenn die Zielplattform den Beitrag zeigt, ist er draußen.",
    minutes: 8,
    links: [["/ratgeber","Alle KI-Ratgeber"],["/tutorials","Praktische Tutorials"]],
    sections: [
      { h: "Eine redaktionelle Quelle statt fünf Kopien", p: ["Speichere den vollständigen Gedanken als Markdown mit Titel, Datum, Status, Zielgruppe und Quellen. Daraus werden unterschiedliche Kanalversionen erzeugt, die ihre eigene Tonalität haben.","Lege fest, welche Fassung führend ist, welche abgeleitet wird und wie du nach einer Korrektur alle Fassungen wiederfindest. Schon eine kleine `publication-manifest.json` reduziert Verwechslungen."] },
      { h: "Pull Request als Qualitätsgrenze", p: ["Neue Artikel gehen zunächst auf einen Feature-Branch. Der Pull Request zeigt Änderung, Metadaten und Freigabe-Checkliste. Erst nach Review wird gemerged.","Prüfe bei Fachbeiträgen zusätzlich alle fremden Zahlen, Produktfeatures und Links. Bei einem Erfahrungsbericht darfst du deine eigene Vorgehensweise beschreiben, aber nicht den Erfolg eines noch laufenden Exports erfinden."] },
      { h: "Merge und Publish sind zwei verschiedene Zustände", p: ["GitHub kann Markdown-Dateien committen. Ein Adapter muss die Inhalte anschließend an die Zielplattform übertragen und eine Artikel-ID oder URL zurückliefern. Erst dann wird `published` in die Manifestdatei geschrieben.","Im Projekt `omniposter` existiert ein Hashnode-GitHub-Export, der Inhalte in kompatible Markdown-Dateien umwandelt. Er ersetzt keine verifizierte Verbindung zu LinkedIn oder Substack."] },
      { h: "Vermeide fragiles Browser-Autoposting", p: ["Sicherer sind offizielle APIs, zugelassene Scheduler oder native Verbindungen. Bevor du Bots für Logins und CAPTCHAs baust, prüfe, ob ein bestehendes Tool den Vorgang mit weniger Wartung erledigt.","Automatische Ausspielung braucht Idempotenz: derselbe Beitrag darf beim zweiten Workflowlauf nicht doppelt gepostet werden. Kennzeichne die Zielplattform, externe Post-ID, Veröffentlichungszeit und Fehlerzustand."] },
      { h: "Ein operativer Minimalprozess", p: ["Ein Autor erstellt zwei Formate, ein Reviewer prüft sie, ein Scheduler plant sie, und ein Bericht bestätigt die endgültigen URLs. Die nötigen Felder: slug, source_commit, channel, status, scheduled_at, external_id, external_url.","Starte mit zwei LinkedIn-Posts und einem Substack-Entwurf, bevor du 30 Texte im Blindflug veröffentlichst. Sind Tonalität, Klickpfade und technische Verbindungen in Ordnung, lässt sich die Menge steigern."] }
    ]
  }
]
