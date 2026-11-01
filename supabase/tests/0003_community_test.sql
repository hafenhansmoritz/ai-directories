-- Test für Migration 0003: Kommentare, Forum, Moderation, Benachrichtigungen, Punkte. Jede Erwartung ist eine Prüfung.
\set ON_ERROR_STOP 1
insert into auth.users (id, email) values
    ('d0000000-0000-0000-0000-000000000001', 'd1@x.de'),
    ('d0000000-0000-0000-0000-000000000002', 'd2@x.de'),
    ('d0000000-0000-0000-0000-000000000003', 'mod@x.de');
update public.profiles set handle = 'dora' where id = 'd0000000-0000-0000-0000-000000000001';
update public.profiles set handle = 'emil' where id = 'd0000000-0000-0000-0000-000000000002';
update public.profiles set handle = 'moni', rolle = 'moderator' where id = 'd0000000-0000-0000-0000-000000000003';
insert into public.wortfilter values ('casino') on conflict do nothing;
insert into auth.users (id, email) values ('d0000000-0000-0000-0000-000000000004', 'neu@x.de');
update public.konten set regeln_akzeptiert = now() where id <> 'd0000000-0000-0000-0000-000000000004';

set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000004', false);
select test.scheitert($$insert into public.comments (pfad, text) values ('/ratgeber/x', 'ohne Regeln')$$, '%regeln_fehlen%');
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000001', false);
insert into public.comments (pfad, text) values ('/ratgeber/test', 'Toller Artikel, danke!');
select test.gleich((select status from public.comments where text like 'Toller%'), 'sichtbar', 'Kommentar sichtbar');
select test.scheitert($$insert into public.comments (pfad, text, status) values ('/ratgeber/test', 'x', 'ausgeblendet')$$, '%permission denied%');
select test.scheitert($$insert into public.comments (pfad, text) values ('/Böse Seite', 'x')$$, '%check constraint%');
select test.scheitert($$insert into public.comments (pfad, text) values ('/gibts-nicht/x', 'Spam')$$, '%check constraint%');
insert into public.comments (pfad, text) values ('/ratgeber/test', 'Hier gibts Casino-Boni!');
select test.gleich((select status from public.comments where text like '%Casino%'), 'pruefen', 'Wortfilter schickt in die Prüfung');
insert into public.forum_themen (kategorie_id, titel, text) values ('ki-tools', 'Welches Tool für Podcasts?', 'Suche ein KI-Tool für Schnitt.');
select test.scheitert($$insert into public.forum_themen (kategorie_id, titel, text) values ('ankuendigungen', 'Ich kündige was an', 'Hallo')$$, '%nur_team%');
insert into public.comments (pfad, text) values ('/ratgeber/a', '3');
insert into public.comments (pfad, text) values ('/ratgeber/a', '4');
select test.scheitert($$insert into public.comments (pfad, text) values ('/ratgeber/a', '5')$$, '%zu_schnell%');

select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000002', false);
select test.gleich((select count(*) from public.comments where text like '%Casino%')::text, '0', 'Andere sehen Inhalte in Prüfung nicht');
insert into public.comments (pfad, parent_id, text) select '/ratgeber/test', id, 'Finde ich auch, @dora!' from public.comments where text like 'Toller%';
select test.scheitert($$insert into public.comments (pfad, parent_id, text) select '/ratgeber/test', id, 'tief' from public.comments where text like 'Finde%'$$, '%antwort_ungueltig%');
update public.comments set text = 'gehackt' where text like 'Toller%';
select test.gleich((select text from public.comments where text like 'Toller%'), 'Toller Artikel, danke!', 'Fremden Kommentar nicht bearbeitbar');
insert into public.forum_beitraege (thema_id, text) select id, 'Probier Tool X, das kann das.' from public.forum_themen where titel like 'Welches%';
insert into public.reaktionen (ziel_art, ziel_id, emoji) select 'kommentar', id, '👍' from public.comments where text like 'Toller%';
select test.scheitert($$select public.loesung_markieren((select id from public.forum_themen limit 1), (select id from public.forum_beitraege limit 1))$$, '%nicht_erlaubt%');
select test.scheitert($$select public.moderieren('kommentar', (select id from public.comments where text like 'Toller%'), 'ausgeblendet', 'test')$$, '%nicht_erlaubt%');
insert into public.meldungen (ziel_art, ziel_id, grund, text) select 'kommentar', id::text, 'spam', 'Werbung' from public.comments where text like 'Toller%';
select test.scheitert($$insert into public.meldungen (ziel_art, ziel_id, grund) select 'kommentar', id::text, 'spam' from public.comments where text like 'Toller%'$$, '%meldungen_einmal_idx%');
select test.scheitert($$insert into public.badges (user_id, name) values ('d0000000-0000-0000-0000-000000000002', 'Problemlöser-Abzeichen')$$, '%row-level security%');
select test.scheitert($$select public.punkte_plus('d0000000-0000-0000-0000-000000000002', 1000)$$, '%permission denied%');

select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000001', false);
select test.gleich((select string_agg(art, ',' order by id) from public.benachrichtigungen), 'antwort,erwaehnung,antwort', 'Antwort, Erwähnung und Forum-Antwort benachrichtigt');
select public.loesung_markieren((select id from public.forum_themen limit 1), (select id from public.forum_beitraege limit 1));
select test.gleich((select (geloest_beitrag_id is not null) || ':' || antworten from public.forum_themen), 'true:1', 'Lösung markiert, Zähler stimmt');
select public.alles_gelesen();
select test.gleich((select count(*) from public.benachrichtigungen where not gelesen)::text, '0', 'Alles gelesen');
-- Ratenlimit-Fenster für den Test zurücksetzen.
reset role;
update public.comments set erstellt = now() - interval '1 hour' where user_id = 'd0000000-0000-0000-0000-000000000001';
update public.forum_themen set erstellt = now() - interval '1 hour' where user_id = 'd0000000-0000-0000-0000-000000000001';
set role authenticated;
insert into public.comments (pfad, text) values ('/ratgeber/b', 'gleich wieder weg');
select test.gleich((select punkte from public.profiles where handle = 'dora')::text, '7', 'Punkt für neuen Kommentar');
select public.eigenes_loeschen('kommentar', (select id from public.comments where text = 'gleich wieder weg'));
select test.gleich((select punkte from public.profiles where handle = 'dora')::text, '6', 'Punkt beim Zurückziehen wieder abgezogen');
select test.scheitert($$update public.benachrichtigungen set text = 'x'$$, '%permission denied%');

select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select test.gleich((select count(*) from public.meldungen)::text, '1', 'Moderation sieht Meldungen');
select test.gleich((select count(*) from public.comments where status = 'pruefen')::text, '1', 'Moderation sieht Prüf-Warteschlange');
select public.moderieren('kommentar', (select id from public.comments where text like '%Casino%'), 'ausgeblendet', 'Spam');
select public.meldung_entscheiden((select id from public.meldungen limit 1), 'erledigt', 'Ausgeblendet, danke!');
select public.sperren('d0000000-0000-0000-0000-000000000002', 7, 'Test-Sperre');
select test.gleich((select string_agg(aktion, ',' order by id) from public.moderations_log), 'ausgeblendet,meldung_erledigt,gesperrt_7_tage', 'Protokoll vollständig');
-- Zurückgehaltene Antwort freigeben: Punkte und Benachrichtigungen kommen erst jetzt.
insert into public.forum_beitraege (thema_id, text) select id, 'Mein Tipp: Casino-Werbung (Test)' from public.forum_themen limit 1;
select test.gleich((select status from public.forum_beitraege where text like 'Mein Tipp%'), 'pruefen', 'Moderation-Antwort mit Filterwort wartet');
select test.gleich((select punkte from public.profiles where handle = 'moni')::text, '0', 'Keine Punkte für zurückgehaltene Antwort');
select public.moderieren('beitrag', (select id from public.forum_beitraege where text like 'Mein Tipp%'), 'sichtbar', 'ok');
select test.gleich((select punkte from public.profiles where handle = 'moni')::text, '1', 'Punkte nach Freigabe');

select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000002', false);
select test.scheitert($$insert into public.comments (pfad, text) values ('/ratgeber/x', 'darf ich?')$$, '%schreiben_gesperrt%');
select test.scheitert($$update public.comments set text = 'noch schnell geändert' where text like 'Finde%'$$, '%schreiben_gesperrt%');
select test.gleich((select string_agg(art, ',' order by id) from public.benachrichtigungen), 'loesung,moderation,moderation,antwort', 'Emil über Lösung, Meldung, Sperre und freigegebene Antwort informiert');
reset role;

select set_config('request.jwt.claim.sub', '', false);
set role anon;
select test.gleich((select count(*) from public.comments)::text, '4', 'Gäste sehen nur sichtbare Kommentare');
select test.gleich((select count(*) from public.forum_beitraege)::text, '2', 'Gäste sehen Antworten sichtbarer Themen');
reset role;
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select public.moderieren('thema', (select id from public.forum_themen limit 1), 'ausgeblendet', 'Test');
reset role;
select set_config('request.jwt.claim.sub', '', false);
set role anon;
select test.gleich((select count(*) from public.forum_beitraege)::text, '0', 'Antworten ausgeblendeter Themen sind verborgen');
select test.scheitert($$insert into public.comments (pfad, text) values ('/ratgeber/x', 'anonym')$$, '%permission denied%');
reset role;

select test.gleich((select string_agg(handle || ':' || punkte, ' ' order by handle) from public.profiles where handle in ('dora', 'emil', 'moni')), 'dora:4 emil:17 moni:1', 'Punkte nur für sichtbare Inhalte (Thema ausgeblendet: -2)');
select test.gleich((select string_agg(p.handle || ':' || b.name, ' ' order by p.handle, b.name) from public.badges b join public.profiles p on p.id = b.user_id where p.handle in ('dora', 'emil')),
    'dora:Erster-Kommentar-Abzeichen dora:Forums-Starter-Abzeichen emil:Erster-Kommentar-Abzeichen emil:Problemlöser-Abzeichen', 'Community-Abzeichen');
delete from auth.users where id = 'd0000000-0000-0000-0000-000000000001';
select test.gleich((select count(*) from public.comments where user_id is null)::text, '5', 'Beiträge gelöschter Konten bleiben anonym');

-- Lösung zurückziehen: Markierung und Bonus verschwinden, Antwortzähler sinkt.
reset role;
update public.konten set gesperrt_bis = null;
update public.forum_themen set status = 'sichtbar';
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000002', false);
set role authenticated;
select public.eigenes_loeschen('beitrag', (select id from public.forum_beitraege where text like 'Probier%'));
reset role;
select test.gleich((select (geloest_beitrag_id is null) || ':' || antworten from public.forum_themen), 'true:1', 'Lösung zurückgenommen, nur sichtbare Antworten gezählt');
select test.gleich((select punkte from public.profiles where handle = 'emil')::text, '1', 'Lösungsbonus und Antwortpunkt abgezogen');
-- Freigabe eines Kommentars, dessen Konto inzwischen gelöscht ist, funktioniert.
insert into public.comments (pfad, text) values ('/ratgeber/y', 'alt mit casino');
select test.gleich((select status from public.comments where pfad = '/ratgeber/y'), 'pruefen', 'Kommentar wartet auf Prüfung');
update public.comments set user_id = null where pfad = '/ratgeber/y';
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
set role authenticated;
select public.moderieren('kommentar', (select id from public.comments where pfad = '/ratgeber/y'), 'sichtbar', 'ok');
reset role;
select test.gleich((select status from public.comments where pfad = '/ratgeber/y'), 'sichtbar', 'Anonymer Kommentar freigegeben');

-- Tageslimit für Kommentarpunkte: höchstens 10 pro Tag.
insert into auth.users (id, email) values ('d0000000-0000-0000-0000-000000000005', 'viel@x.de');
update public.konten set regeln_akzeptiert = now() where id = 'd0000000-0000-0000-0000-000000000005';
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000005', false);
do $$ begin
    for i in 1..12 loop
        insert into public.comments (pfad, text) values ('/ratgeber/viel', 'Kommentar ' || i);
        update public.comments set erstellt = now() - interval '2 hours' where user_id = 'd0000000-0000-0000-0000-000000000005' and erstellt > now() - interval '1 hour';
    end loop;
end $$;
select test.gleich((select punkte from public.profiles where id = 'd0000000-0000-0000-0000-000000000005')::text, '10', 'Kommentarpunkte auf 10 pro Tag begrenzt');
set role authenticated;
select public.eigenes_loeschen('kommentar', (select id from public.comments where text = 'Kommentar 12'));
reset role;
select test.gleich((select punkte from public.profiles where id = 'd0000000-0000-0000-0000-000000000005')::text, '10', 'Kein Abzug für einen nicht belohnten Kommentar');
-- Meldung ausblenden und erledigen in einem Schritt.
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000002', false);
insert into public.meldungen (ziel_art, ziel_id, grund) select 'kommentar', id::text, 'spam' from public.comments where text = 'Kommentar 1';
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select public.meldung_ausblenden((select id from public.meldungen where status = 'offen' order by id desc limit 1), 'Ausgeblendet.');
reset role;
select test.gleich((select status from public.comments where text = 'Kommentar 1'), 'ausgeblendet', 'Gemeldeter Inhalt ausgeblendet');
select test.gleich((select status from public.meldungen order by id desc limit 1), 'erledigt', 'Meldung im selben Schritt erledigt');

-- Meldung lässt sich nur einmal entscheiden; Reaktionen auf Antworten in ausgeblendeten Themen sind gesperrt.
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select test.scheitert($$select public.meldung_entscheiden((select id from public.meldungen order by id desc limit 1), 'abgelehnt', 'doch nicht')$$, '%meldung_schon_erledigt%');
select public.moderieren('thema', (select id from public.forum_themen order by id limit 1), 'ausgeblendet', 'Test');
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000005', false);
reset role;
select id as beitrag_versteckt from public.forum_beitraege where status = 'sichtbar' and thema_id = (select id from public.forum_themen order by id limit 1) limit 1 \gset
set role authenticated;
select test.scheitert(format($$insert into public.reaktionen (ziel_art, ziel_id, emoji) values ('beitrag', %s, '👍')$$, :beitrag_versteckt), '%ziel_fehlt%');
reset role;

-- Tageslimit gilt auch bei später Freigabe alter Kommentare.
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000005', false);
insert into public.comments (pfad, text) values ('/ratgeber/spaet', 'Alter Tipp mit casino');
insert into public.comments (pfad, text) values ('/ratgeber/spaet', 'Zweiter alter Tipp mit casino');
reset role;
update public.comments set erstellt = now() - interval '2 days' where user_id = 'd0000000-0000-0000-0000-000000000005';
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select public.moderieren('kommentar', id, 'sichtbar', 'ok') from public.comments where pfad = '/ratgeber/spaet';
reset role;
select test.gleich((select punkte from public.profiles where id = 'd0000000-0000-0000-0000-000000000005')::text, '10', 'Späte Freigabe überschreitet das Tageslimit nicht');

-- Benachrichtigungen nur einmal, auch nach Bearbeiten mit Filterwort und erneuter Freigabe.
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000005', false);
insert into public.comments (pfad, text) values ('/ratgeber/neu', 'Eltern X');
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
insert into public.comments (pfad, parent_id, text) select '/ratgeber/neu', id, 'Antwort Y' from public.comments where text = 'Eltern X';
update public.comments set text = 'Antwort Y casino' where text = 'Antwort Y';
select public.moderieren('kommentar', (select id from public.comments where text = 'Antwort Y casino'), 'sichtbar', 'ok');
reset role;
select test.gleich((select count(*) from public.benachrichtigungen where user_id = 'd0000000-0000-0000-0000-000000000005' and art = 'antwort')::text, '1', 'Antwort nur einmal gemeldet');

-- Keine Freigabe, solange der Eltern-Kommentar verborgen ist.
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select public.moderieren('kommentar', (select id from public.comments where text = 'Eltern X'), 'ausgeblendet', 'Test');
update public.comments set text = 'Antwort Y casino 2' where text = 'Antwort Y casino';
select test.scheitert($$select public.moderieren('kommentar', (select id from public.comments where text = 'Antwort Y casino 2'), 'sichtbar', 'ok')$$, '%eltern_verborgen%');
reset role;

-- Runde 7: Meldeziele, Antworten unter verborgenen Kommentaren, Zurückziehen löscht den Text, Lösung nur im sichtbaren Thema.
insert into auth.users (id, email) values ('d0000000-0000-0000-0000-000000000006', 'sechs@x.de');
update public.konten set regeln_akzeptiert = now() where id = 'd0000000-0000-0000-0000-000000000006';
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000006', false);
select test.scheitert($$insert into public.meldungen (ziel_art, ziel_id, grund) values ('kommentar', '999999', 'spam')$$, '%ziel_fehlt%');
select test.scheitert($$insert into public.meldungen (ziel_art, ziel_id, grund) values ('profil', 'kein-uuid', 'spam')$$, '%ziel_fehlt%');
insert into public.comments (pfad, text) values ('/ratgeber/eigen', 'Eigener Kommentar mit casino');
select test.scheitert($$insert into public.comments (pfad, parent_id, text) select '/ratgeber/eigen', id, 'Antwort unter eigenem Prüffall' from public.comments where pfad = '/ratgeber/eigen'$$, '%antwort_ungueltig%');
insert into public.comments (pfad, text) values ('/ratgeber/privat', 'Meine Telefonnummer ist 0123');
select public.eigenes_loeschen('kommentar', (select id from public.comments where pfad = '/ratgeber/privat'));
reset role;
select test.gleich((select text || '|' || status from public.comments where pfad = '/ratgeber/privat'), '[zurückgezogen]|geloescht', 'Zurückgezogener Text ist wirklich entfernt');
update public.comments set erstellt = now() - interval '1 day' where user_id = 'd0000000-0000-0000-0000-000000000006';
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000006', false);
insert into public.forum_themen (kategorie_id, titel, text) values ('ki-tools', 'Frage von sechs', 'Hilfe?');
reset role;
update public.forum_themen set erstellt = now() - interval '1 day' where titel = 'Frage von sechs';
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
insert into public.forum_beitraege (thema_id, text) select id, 'Antwort der Moderation' from public.forum_themen where titel = 'Frage von sechs';
select public.moderieren('thema', (select id from public.forum_themen where titel = 'Frage von sechs'), 'ausgeblendet', 'Test');
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000006', false);
select test.scheitert($$select public.loesung_markieren((select id from public.forum_themen where titel = 'Frage von sechs'), (select id from public.forum_beitraege where text = 'Antwort der Moderation'))$$, '%thema_verborgen%');
select public.eigenes_loeschen('thema', (select id from public.forum_themen where titel = 'Frage von sechs'));
reset role;
select test.gleich((select titel from public.forum_themen where user_id = 'd0000000-0000-0000-0000-000000000006'), '[zurückgezogen]', 'Zurückziehen nach Ablauf der Frist entfernt auch den Titel');
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select public.moderieren('thema', (select id from public.forum_themen where user_id = 'd0000000-0000-0000-0000-000000000006'), 'sichtbar', 'zurück');
reset role;
select test.gleich((select status from public.forum_themen where user_id = 'd0000000-0000-0000-0000-000000000006'), 'geloescht', 'Moderation holt Zurückgezogenes nicht zurück');

-- Ausblenden über eine Meldung erledigt alle offenen Meldungen zum selben Inhalt.
set role authenticated;
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000006', false);
insert into public.comments (pfad, text) values ('/ratgeber/doppelt', 'Spam hier');
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000004', false);
insert into public.meldungen (ziel_art, ziel_id, grund) select 'kommentar', id::text, 'spam' from public.comments where text = 'Spam hier';
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000005', false);
insert into public.meldungen (ziel_art, ziel_id, grund) select 'kommentar', id::text, 'spam' from public.comments where text = 'Spam hier';
select set_config('request.jwt.claim.sub', 'd0000000-0000-0000-0000-000000000003', false);
select public.meldung_ausblenden((select min(id) from public.meldungen where status = 'offen' and ziel_id = (select id::text from public.comments where text = 'Spam hier')), 'Ausgeblendet.');
reset role;
select test.gleich((select count(*) from public.meldungen where status = 'offen' and ziel_id = (select id::text from public.comments where text = 'Spam hier'))::text, '0', 'Doppelte Meldungen gemeinsam erledigt');
