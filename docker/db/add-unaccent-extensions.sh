#!/bin/bash

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

# Load PostGIS into both template_database and $POSTGRES_DB
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --no-password --dbname="$POSTGRES_DB" <<-'EOSQL'
        CREATE EXTENSION IF NOT EXISTS "unaccent";
EOSQL


