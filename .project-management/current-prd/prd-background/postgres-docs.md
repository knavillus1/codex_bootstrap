# Homebrew-Managed PostgreSQL 

A minimal, repeatable way to run PostgreSQL locally is to let **Homebrew** install the server and register it with **launchd** so it auto-starts at login. This keeps Postgres completely outside your Python venv while remaining just a CLI command away.

---

## 1  Install & Initialise

```bash
# install the latest 16.x formula
brew install postgresql@16
```

* Homebrew writes binaries to `/opt/homebrew/bin/` and the **data directory** to `/opt/homebrew/var/postgresql@16`.
* The formula runs `initdb` for you on first install (locale `C`, UTF-8). You can re-init later with
  `initdb --locale=C -D /opt/homebrew/var/postgresql@16`.

---

## 2  Start, Stop, & Autostart

```bash
# one-time registration with launchd
brew services start postgresql@16       # or restart / stop
brew services list                      # view status
```

`brew services` creates a LaunchAgent so Postgres boots automatically whenever you log in.

---

## 3  Idempotent Dev Start-Up Script

Save as `scripts/dev_up.sh`, `chmod +x`, run whenever you sit down to code:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."    # project root

# ----- 1. Activate existing venv if present (optional) -----
if [ -f ".venv/bin/activate" ]; then
  source .venv/bin/activate
fi

# ----- 2. Ensure PostgreSQL service is available ----------
PG_VERSION=16

if ! brew list postgresql@"$PG_VERSION" &>/dev/null; then
  echo "Installing PostgreSQL $PG_VERSION..."
  brew install postgresql@"$PG_VERSION"
fi

# Data dir is created by the formula, but guard just in case
DATA_DIR="/opt/homebrew/var/postgresql@$PG_VERSION"
if [ ! -d "$DATA_DIR" ]; then
  echo "Initialising cluster at $DATA_DIR..."
  initdb --locale=C -D "$DATA_DIR"
fi

echo "Starting (or reusing) launchd service…"
brew services start postgresql@"$PG_VERSION"   # no-op if already running

# ----- 3. Wait until server is ready ----------------------
echo "Waiting for Postgres to accept connections…"
until pg_isready -h 127.0.0.1 -p 5432 >/dev/null 2>&1; do
  sleep 1
done                                   # pg_isready exits 0 when ready

# ----- 4. Run database migrations -------------------------
alembic upgrade head                   # adjust for your tool

# ----- 5. Launch application --------------------------------
python -m myapp.api &                  # backend
npm --prefix web run dev &             # frontend

echo "✅  Dev environment ready."
```

### Why it’s idempotent

* `brew list` / `brew services start` do nothing when the component already exists.
* The cluster is initialised only if its directory is missing.
* Re-running the script leaves existing databases intact.

---

## 4  `.env` Best Practice

```env
# .env — NEVER commit to VCS
PGHOST=127.0.0.1
PGPORT=5432
PGUSER=myapp_user
PGPASSWORD=superSecret123   # or omit and use ~/.pgpass
PGDATABASE=myapp_db

# app-specific vars
FLASK_ENV=development
```

