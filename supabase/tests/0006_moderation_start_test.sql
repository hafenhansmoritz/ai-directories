-- Test für Migration 0006: Links neuer Konten und Wortfilter-Startliste schicken Beiträge in die Prüfung.
\set ON_ERROR_STOP 1
insert into auth.users (id, email) values
    ('a6000000-0000-0000-0000-000000000001', 'neu6@x.de'),
    ('a6000000-0000-0000-0000-000000000002', 'alt6@x.de'),
    ('a6000000-0000-0000-0000-000000000003', 'altarm6@x.de'),
    ('a6000000-0000-0000-0000-000000000004', 'mod6@x.de');
update public.konten set regeln_akzeptiert = now() where id::text like 'a6000000%';
-- Altes Konto mit Punkten, altes Konto ohne genug Punkte, frisches Moderationskonto.
update public.profiles set erstellt = now() - interval '8 days', punkte = 10 where id = 'a6000000-0000-0000-0000-000000000002';
update public.profiles set erstellt = now() - interval '30 days', punkte = 9 where id = 'a6000000-0000-0000-0000-000000000003';
update public.profiles set rolle = 'moderator' where id = 'a6000000-0000-0000-0000-000000000004';
select test.gleich((select count(*) from public.wortfilter where wort in ('viagra', 'sportwetten', 't.me/'))::text, '3', 'Startliste im Wortfilter');

set role authenticated;
select set_config('request.jwt.claim.sub', 'a6000000-0000-0000-0000-000000000001', false);
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Neu ohne Link');
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Neu mit https://beispiel.de');
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Neu mit WWW.beispiel.de');
insert into public.forum_themen (kategorie_id, titel, text) values ('launch', 'Neu Thema', 'Schaut mal http://beispiel.de');
select test.gleich((select status from public.comments where text = 'Neu ohne Link'), 'sichtbar', 'Neues Konto ohne Link sofort sichtbar');
select test.gleich((select status from public.comments where text like 'Neu mit https%'), 'pruefen', 'Link von neuem Konto wartet');
select test.gleich((select status from public.comments where text like 'Neu mit WWW%'), 'pruefen', 'www-Link von neuem Konto wartet');
select test.gleich((select status from public.forum_themen where titel = 'Neu Thema'), 'pruefen', 'Thema mit Link von neuem Konto wartet');
-- Auch eine Bearbeitung, die einen Link einfügt, geht in die Prüfung.
update public.comments set text = 'Jetzt mit https://beispiel.de' where text = 'Neu ohne Link';
select test.gleich((select status from public.comments where text like 'Jetzt mit%'), 'pruefen', 'Nachträglicher Link wartet');

select set_config('request.jwt.claim.sub', 'a6000000-0000-0000-0000-000000000002', false);
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Alt mit https://beispiel.de');
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Alt und billig Viagra');
select test.gleich((select status from public.comments where text like 'Alt mit%'), 'sichtbar', 'Erfahrenes Konto darf verlinken');
select test.gleich((select status from public.comments where text like 'Alt und%'), 'pruefen', 'Wortfilter gilt für alle');

select set_config('request.jwt.claim.sub', 'a6000000-0000-0000-0000-000000000003', false);
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Altarm mit https://beispiel.de');
select test.gleich((select status from public.comments where text like 'Altarm%'), 'pruefen', 'Altes Konto unter 10 Punkten wartet');

select set_config('request.jwt.claim.sub', 'a6000000-0000-0000-0000-000000000004', false);
insert into public.comments (pfad, text) values ('/ratgeber/m6', 'Mod mit https://beispiel.de');
select test.gleich((select status from public.comments where text like 'Mod mit%'), 'sichtbar', 'Moderation darf verlinken');

-- Die Prüffunktion selbst ist nicht direkt aufrufbar.
select test.scheitert($$select public.braucht_pruefung('x')$$, '%permission denied%');
reset role;
set role anon;
select test.scheitert($$select public.braucht_pruefung('x')$$, '%permission denied%');
select test.scheitert($$insert into public.wortfilter values ('test')$$, '%row-level security%');
reset role;
