# Emissa SaaS Platform

Production application foundation for the Emissa compliance operating system.

## Included

- Next.js 15 application
- PostgreSQL + Prisma multi-tenant data model
- Organizations, users, memberships and roles
- Emissions, EPR, CBAM, climate-risk and LCA records
- Evidence-file relationships and audit events
- Organization onboarding API
- Tenant-scoped emissions API
- Executive dashboard aggregation API
- Stripe subscription Checkout and webhook handling
- Demo seed data
- Health endpoint and production security headers

## Local setup

```bash
cd platform
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Required environment variables

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `APP_URL`

## Vercel deployment

1. Set the Vercel project Root Directory to `platform`.
2. Add every variable from `.env.example` to Vercel.
3. Provision PostgreSQL through Neon, Supabase, Vercel Postgres or another managed provider.
4. Run `npm run db:deploy` against the production database.
5. Configure the Stripe webhook URL as `/api/stripe/webhook`.
6. Subscribe to `checkout.session.completed` and `customer.subscription.deleted`.
7. Deploy and verify `/api/health` returns `status: ok`.

## Security requirement before customer launch

The temporary `x-emissa-user-id` API context must be replaced by a real authenticated session provider before handling customer data. Recommended options are Auth.js, Clerk or WorkOS. All production routes must derive the user ID from the verified server-side session rather than accepting it from a client-controlled header.

## Data isolation

Every operational record includes an `organizationId`. API handlers call tenant-membership helpers before reading or writing data. New endpoints must follow this same pattern and include audit logging for material changes.
