# SipTrack

SipTrack is a hydration tracking app built to help users monitor daily water intake, compare progress against a daily goal, and keep a lightweight overview of their drinking habits.

## Stack

- Runtime: Bun
- Frontend: React, TanStack Router, TanStack Query
- UI: shadcn/ui, Tailwind CSS, Lucide React, Recharts
- Backend: Hono
- Database: PostgreSQL
- ORM and migrations: Drizzle ORM, Drizzle Kit
- Authentication: Clerk
- Tests: Bun test runner
- Deployment: Docker on Render
- CI: GitHub Actions

## Requirements

- Bun 1.3.5 or newer
- PostgreSQL (local or through Docker Compose)
- Clerk publishable key
- Docker with Compose, when using the container-based setup

## Environment variables

Create a local `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required variables:

```env
BUN_PUBLIC_CLERK_PUBLISHABLE_KEY=
DATABASE_URL=postgres://postgres:postgres@localhost:5432/siptrack
POSTGRES_DB=siptrack
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
APP_PORT=3000
```

Set `BUN_PUBLIC_CLERK_PUBLISHABLE_KEY` to your Clerk instance's publishable key.
For Bun running on the host, `DATABASE_URL` must match the database name,
credentials, and host port configured above. Docker Compose sets the app
container's database URL automatically using the `database` service hostname.

## Installation

```bash
bun install
```

## Running with Bun

After configuring `.env` and installing dependencies, start PostgreSQL, apply
migrations, and run the development server:

```bash
docker compose up -d database
bun run db:migrate
bun run dev
```

If PostgreSQL is already running outside Docker, skip the first command and set
`DATABASE_URL` to that instance instead.

The app runs at `http://localhost:3000` with hot reload. Frontend changes update
through HMR, and server changes are handled by `bun --hot`. Stop it with `Ctrl+C`.

Do not run the Bun app and the Docker app on the same port. If the Docker app is
already running, stop only that service with `docker compose stop app` before
starting `bun run dev`. The database stays running.

If port `5432` is occupied, set `POSTGRES_PORT=5433` in `.env` and update the port
in `DATABASE_URL` to match before running migrations or other database commands.
For example, with the default local credentials:

```env
POSTGRES_PORT=5433
DATABASE_URL=postgres://postgres:postgres@localhost:5433/siptrack
```

Optionally create development fixtures with `bun run db:seed`. Seeding is not
required to start the app.

`http://localhost:3000/api/health` checks the HTTP process.
`http://localhost:3000/api/health/ready` checks the database connection and the
three required tables, returning HTTP 503 if they are unavailable. Apply new
migrations explicitly with `bun run db:migrate` while developing with Bun.

## Tests

Check TypeScript using the locally installed compiler:

```bash
bun run typecheck
```

Run the test suite:

```bash
bun test
```

Watch mode:

```bash
bun run test:watch
```

## Build

Create a production build:

```bash
bun run build
```

Run the production server locally:

```bash
bun run start
```

With the production server running, verify direct navigation to home, auth,
callback and app routes, including their JavaScript and CSS assets:

```bash
bun run check:production
```

Use `CHECK_BASE_URL` to check another local port. Production assets use root-based
URLs so OAuth callbacks and deep links can load the application after a reload.

## Docker

After configuring `.env`, build and start the app and PostgreSQL:

```bash
docker compose up -d --build
```

The app is available at `http://localhost:3000`, or the port set by `APP_PORT`.
Compose applies pending migrations before starting the app and preserves database
data in a named volume. This runs a **production build**, without hot reload.

After changing source files, rebuild and recreate the app:

```bash
docker compose up -d --build app
```

Check the services and follow app logs:

```bash
docker compose ps
docker compose logs -f app
```

Stop and remove the containers while keeping the database volume:

```bash
docker compose down
```

## Architecture

```txt
src/
  app/                  React app shell, providers, and routing
  features/             Feature-first UI modules
  server/               Hono API, routes, environment, and database access
    db/                 Drizzle schema and PostgreSQL client
    routes/             API route modules
  shared/               Shared UI components, layouts, assets, and utilities
scripts/                Database seed/reset scripts
src/server/db/drizzle/  Generated SQL migrations and Drizzle metadata
```
