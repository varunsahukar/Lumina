# Deployment Guide

This project deploys as two services:

- **Frontend:** Next.js app from the repository root
- **Backend:** NestJS API from `backend/`

Run the deployment environment check before shipping staging or production:

```bash
DEPLOY_ENV=staging npm run check:deployment
DEPLOY_ENV=production npm run check:deployment
```

For backend-only deploy jobs:

```bash
cd backend
DEPLOY_ENV=production npm run check:deployment
```

## Required Frontend Variables

Set these in the frontend host for both staging and production:

| Variable | Required value |
| --- | --- |
| `BACKEND_API_URL` | Server-side Nest API URL, for example `https://api.example.com/api` or a trusted private URL |
| `NEXT_PUBLIC_BACKEND_API_URL` | Browser-visible HTTPS Nest API URL |
| `DATABASE_URL` | PostgreSQL URL used by frontend auth/fallback Prisma code |
| `DATABASE_URL_SSL_MODE_REQUIRED` | Use `false` only when the database provider does not require explicit SSL mode |
| `JWT_SECRET` | Strong per-environment secret |

Production and staging must not point at `localhost`, `127.0.0.1`, or `0.0.0.0`.

## Required Backend Variables

Set these in the Nest backend service:

| Variable | Required value |
| --- | --- |
| `PORT` | Service port supplied by the host or `3001` |
| `DATABASE_URL` | PostgreSQL URL for the deployed database |
| `DATABASE_URL_SSL_MODE_REQUIRED` | Use `false` only when explicit SSL mode is not required |
| `JWT_SECRET` | Strong per-environment secret |
| `MFAPI_BASE_URL` | `https://api.mfapi.in/mf` |
| `AMFI_NAV_URL` | `https://www.amfiindia.com/spages/NAVAll.txt` |
| `INDIA_SCHEME_CODES` | Comma-separated Indian scheme codes |
| `ALPHA_VANTAGE_KEY` | Real Alpha Vantage key |
| `ALPHA_VANTAGE_BASE_URL` | `https://www.alphavantage.co/query` |
| `USA_TICKERS` | Comma-separated USA ticker list |
| `ENABLE_REDIS` | `true` for production sync/cache jobs |
| `REDIS_URL` or `REDIS_HOST` + `REDIS_PORT` | Redis connection details |
| `RAPIDAPI_KEY` | Required only when `ENABLE_YAHOO_FINANCE=true` |
| `FINNHUB_API_KEY` | Required only when `ENABLE_WEBSOCKET_PRICES=true` |

## Database Migrations

Run Prisma migrations against the target database before the new backend starts:

```bash
cd backend
npm run migrate:deploy
```

On hosts with pre-deploy commands, use:

```bash
npm install && npx prisma generate && npm run build
npm run migrate:deploy
npm run start:prod
```

## Redis

Production should run Redis with `ENABLE_REDIS=true` so fund caching and BullMQ
sync jobs work. Use `ENABLE_REDIS=false` only for local debugging or a temporary
read-only deployment where sync jobs are intentionally disabled.

## PostgreSQL SSL Mode

If your database provider requires SSL, make it explicit in `DATABASE_URL`:

```text
postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=verify-full
```

If your provider intentionally manages SSL without an explicit URL parameter,
set:

```bash
DATABASE_URL_SSL_MODE_REQUIRED=false
```

## Recommended Hosting

### Fast Staging / Demo

Use this when speed and simplicity matter most:

- **Frontend:** Vercel
- **Backend:** Railway Node service or Render Web Service
- **Database:** Railway PostgreSQL with pgvector template, or Render PostgreSQL
- **Redis:** Railway Redis or Render Redis

This is the easiest path for staging because you can configure environment
variables per environment, keep the frontend and backend separate, and run
database migrations as part of backend deployment.

### Production For A Financial Product

Use AWS in `ap-south-1` when you need stronger control, private networking,
compliance posture, backups, and predictable regional latency for India:

- **Frontend:** Vercel or S3 + CloudFront
- **Backend:** AWS App Runner or ECS Fargate
- **Database:** RDS PostgreSQL with pgvector enabled
- **Redis:** ElastiCache Redis
- **Secrets:** AWS Secrets Manager / SSM Parameter Store
- **Logs and alarms:** CloudWatch

Recommended path:

1. Launch staging on Vercel + Railway to validate the product quickly.
2. Move production backend/data tier to AWS once the deployment flow and data
   volume are stable.
