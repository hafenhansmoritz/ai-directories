#!/bin/sh
# Spielt alle Migrationen in eine frische lokale Datenbank und führt die Tests aus.
# Aufruf: sh supabase/tests/run.sh "<psql-Verbindungsoptionen>"   z. B. "-h /var/run/postgresql -p 5432"
set -e
VERB="$1"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
psql $VERB -q -c 'drop database if exists aigeddon_test' -c 'create database aigeddon_test'
ARGS="-f $DIR/tests/auth-stub.sql"
for m in "$DIR"/migrations/*.sql; do ARGS="$ARGS -f $m"; done
for t in "$DIR"/tests/*_test.sql; do ARGS="$ARGS -f $t"; done
# ON_ERROR_STOP auch für die Migrationen: ein Fehler dort bricht ab, statt die Tests auf halbem Schema laufen zu lassen.
psql $VERB -d aigeddon_test -v ON_ERROR_STOP=1 -q -t -A $ARGS
