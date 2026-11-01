-- Vorschlag: angepinnte Startthemen für das Forum, damit die ersten Besucher keine leeren Kategorien sehen.
-- KEINE Migration. Jean prüft und ändert die Texte und führt die Datei einmal im SQL-Editor von Supabase aus,
-- nachdem sein Konto angelegt, die Community-Regeln bestätigt und die Rolle auf 'admin' gesetzt ist.
-- Die Themen erscheinen unter dem ersten Admin-Konto. Ein zweiter Lauf ändert nichts.
-- Das Ratenlimit (5 Beiträge in 10 Minuten) gilt auch hier: Darum sind es genau fünf Themen.
do $$
declare
    admin uuid;
begin
    select p.id into admin from public.profiles p where p.rolle = 'admin' order by p.erstellt limit 1;
    if admin is null then
        raise exception 'kein_admin: erst das eigene Konto anlegen und die Rolle auf admin setzen';
    end if;
    if exists (select 1 from public.forum_themen t where t.user_id = admin and t.titel = 'Stell dich vor: Wer bist du, woran baust du?') then
        raise notice 'Startthemen sind schon angelegt';
        return;
    end if;
    -- Die Trigger prüfen Autor, Regeln und Ratenlimit über auth.uid(): für diese Transaktion das Admin-Konto.
    perform set_config('request.jwt.claim.sub', admin::text, true);
    insert into public.forum_themen (kategorie_id, titel, text) values
        ('vorstellung', 'Stell dich vor: Wer bist du, woran baust du?',
         'Schreib kurz, woran du gerade arbeitest, welche KI-Tools du jeden Tag nutzt und wobei du Hilfe suchst. Ich fange an: Ich bin Jean, Senior SEO/SGE Manager bei der MotoMobilityGroup, und baue hier AIGeddon.'),
        ('ki-tools', 'Welches KI-Tool hat dich diesen Monat überrascht?',
         'Positiv oder negativ, beides zählt. Schreib dazu, wofür du es nutzt und welchen Tarif du hast. So haben die anderen etwas davon.'),
        ('launch', 'Erfahrungen mit KI-Verzeichnissen: Was hat bei dir gewirkt?',
         'Welche Verzeichnisse haben dir echte Besucher gebracht, welche nur eine Rechnung? Am besten mit Zeitraum und groben Zahlen. Bitte keine Werbelinks, Links von neuen Konten schaue ich mir vor dem Freischalten an.'),
        ('prompts', 'Dein bester Prompt der Woche',
         'Teil einen Prompt, der dir Zeit gespart hat, und schreib dazu, mit welchem Modell du ihn nutzt und was du am Ergebnis noch nachbessern musstest.'),
        ('hilfe', 'Fehler gefunden oder einen Wunsch? Hier rein',
         'Falsche Angabe, kaputter Link oder eine Idee für AIGeddon: Schreib, auf welcher Seite und was dir aufgefallen ist.');
    update public.forum_themen set angepinnt = true
    where user_id = admin and titel in (
        'Stell dich vor: Wer bist du, woran baust du?',
        'Welches KI-Tool hat dich diesen Monat überrascht?',
        'Erfahrungen mit KI-Verzeichnissen: Was hat bei dir gewirkt?',
        'Dein bester Prompt der Woche',
        'Fehler gefunden oder einen Wunsch? Hier rein'
    );
end $$;
