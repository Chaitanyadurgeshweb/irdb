# Loading the data
Regenerate: `python3 scripts/clean_import.py && python3 scripts/make_seed.py`

**Local Docker:** `docker compose up -d` (runs schema then seed on first start). Check: `docker compose exec db psql -U postgres locodb -c "select count(*) from locomotives"` -> 16174.

**Supabase:** SQL Editor -> run `supabase/migrations/0001_schema.sql`, then `supabase/seed.sql`.

Status: NOT yet executed against a live Postgres (none available in the build sandbox). The seed ends with a count check that aborts the transaction if the total is not 16174.
