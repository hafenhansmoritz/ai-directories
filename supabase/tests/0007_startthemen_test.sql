-- Test für den Seed-Vorschlag supabase/seed/startthemen.sql (keine Migration): fünf angepinnte Themen, zweiter Lauf ändert nichts.
\set ON_ERROR_STOP 1
reset role;
select set_config('request.jwt.claim.sub', '', false);
insert into auth.users (id, email) values ('a7000000-0000-0000-0000-000000000001', 'admin7@x.de');
update public.konten set regeln_akzeptiert = now() where id = 'a7000000-0000-0000-0000-000000000001';
update public.profiles set rolle = 'admin', handle = 'jean_admin' where id = 'a7000000-0000-0000-0000-000000000001';
\ir ../seed/startthemen.sql
select test.gleich((select count(*) from public.forum_themen where user_id = 'a7000000-0000-0000-0000-000000000001' and angepinnt and status = 'sichtbar')::text, '5', 'Fünf angepinnte Startthemen');
\ir ../seed/startthemen.sql
select test.gleich((select count(*) from public.forum_themen where user_id = 'a7000000-0000-0000-0000-000000000001')::text, '5', 'Zweiter Lauf legt nichts doppelt an');
select test.gleich(coalesce(current_setting('request.jwt.claim.sub', true), ''), '', 'Admin-Kennung gilt nur in der Seed-Transaktion');
