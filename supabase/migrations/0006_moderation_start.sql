-- AIGeddon Moderation zum Start: Links neuer Konten und eine Startliste für den Wortfilter.
-- Hintergrund: Ein Thema rund um KI-Verzeichnisse und Backlinks zieht Linkspam an, und zum Start moderiert nur Jean.

-- Prüfung, bevor ein Beitrag sichtbar wird. Bisher: Wortfilter-Treffer oder mehr als drei Links.
-- Neu: Jeder Link (http://, https:// oder www.) von einem Konto, das jünger als 7 Tage ist oder unter 10 Punkten liegt,
-- landet ebenfalls in der Prüfung. Moderation und Admins sind ausgenommen.
-- Aufgerufen wird die Funktion nur aus dem Trigger vor_inhalt (Migration 0003); dort ist auth.uid() der Autor.
create or replace function public.braucht_pruefung(t text)
returns boolean language sql stable security definer set search_path = '' as $$
    select exists (select 1 from public.wortfilter w where t ilike '%' || w.wort || '%')
        or (select count(*) from regexp_matches(t, 'https?://', 'g')) > 3
        or (
            t ~* '(https?://|www\.)'
            and not exists (
                select 1 from public.profiles p
                where p.id = (select auth.uid())
                  and (p.rolle in ('moderator', 'admin') or (p.erstellt <= now() - interval '7 days' and p.punkte >= 10))
            )
        )
$$;
revoke execute on function public.braucht_pruefung(text) from public, anon, authenticated;

-- Startliste für den Wortfilter: nur eindeutige Spam-Begriffe, damit normale Diskussionen nicht in der Prüfung hängen.
-- Ein Treffer blockiert nichts, der Beitrag wartet nur auf die Moderation. Pflege danach über die Tabelle wortfilter.
insert into public.wortfilter (wort) values
    ('casino'),
    ('viagra'),
    ('cialis'),
    ('sportwetten'),
    ('onlyfans'),
    ('escort service'),
    ('crypto signal'),
    ('krypto-signal'),
    ('guest post service'),
    ('t.me/'),
    ('wa.me/')
on conflict (wort) do nothing;
