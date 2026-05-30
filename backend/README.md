# Lumina Backend

This directory contains the NestJS API for Lumina.

It handles authentication, role guards, KYC, fund data, portfolios, orders,
research content, market-data sync, Redis caching, BullMQ jobs, and report
generation.

## Local Setup

From the repository root:

```bash
docker compose up -d
```

Then run the backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

The API runs at `http://localhost:3001/api` by default.

## Environment

Copy the example file:

```bash
cp backend/.env.example backend/.env
```

Important variables:

| Variable | Purpose |
| --- | --- |
| `PORT` | API port, usually `3001` |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `MFAPI_BASE_URL` | Indian mutual fund API base URL |
| `AMFI_NAV_URL` | AMFI bulk NAV feed |
| `ALPHA_VANTAGE_KEY` | USA fund data key |
| `ENABLE_REDIS` | Set `false` for local startup without Redis |
| `REDIS_HOST` / `REDIS_PORT` | Redis connection settings |

## Commands

| Command | Description |
| --- | --- |
| `npm run start:dev` | Start NestJS in watch mode |
| `npm run build` | Compile TypeScript and copy generated Prisma assets |
| `npm run start:local` | Run compiled API with Redis disabled |
| `npm run start:prod` | Run compiled production API |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |

## Quality Gates

Before deploying or pushing backend changes, run:

```bash
npm run lint
npm run build
npm run test -- --runInBand
```

Generated Prisma files under `src/generated/` are excluded from linting. After
editing `prisma/schema.prisma`, run `npx prisma generate` before building.

## Main Modules

| Module | Responsibility |
| --- | --- |
| `auth` | Register, login, JWT guards, role guards, KYC |
| `funds` | Fund catalog, details, history, stats, screener, comparison |
| `market-data` | mfapi.in, AMFI, Alpha Vantage, sync workers |
| `orders` | Direct-invest order placement |
| `portfolio` | Portfolio list, valuation, rebalance, PDF/XLSX reports |
| `research` | Research articles and market news |
| `common` | Prisma, Redis, queues, interceptors |

## Useful Routes

Routes are mounted under `/api`.

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Login and receive a JWT |
| `GET` | `/api/auth/me` | Current authenticated user |
| `GET` | `/api/funds` | Fund catalog |
| `GET` | `/api/funds/:id` | Fund detail |
| `GET` | `/api/funds/:id/history` | NAV history |
| `GET` | `/api/funds/stats/summary` | Fund and sync summary |
| `POST` | `/api/funds/refresh` | Queue manual sync jobs, admin only |
| `GET` | `/api/portfolio` | User portfolios |
| `POST` | `/api/orders` | Place an order |
| `GET` | `/api/research` | Research articles |

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Redis connection refused | Start Redis with `docker compose up -d redis`, or build and run `npm run start:local`. |
| Generated Prisma client missing | Run `npx prisma generate` and then `npm run build`. |
| Empty fund responses | Run sync jobs or seed data, then check provider keys and rate limits. |
| pgvector extension missing | Confirm `docker/postgres/init.sql` ran or manually create the extension. |
| PostgreSQL SSL-mode warning | Set `DATABASE_URL` with explicit SSL behavior, for example `sslmode=verify-full` or `uselibpqcompat=true&sslmode=require`. |
