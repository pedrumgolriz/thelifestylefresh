# The Lifestyle Fresh

Invite-only monthly correspondence. $34.99 a month. Contiguous United States only.

The site is a Next.js house with a journal, request list, Stripe Checkout, and an admin desk on Postgres.

## Local

```bash
cp .env.example .env
docker compose up -d
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Admin desk: `/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Founding invite code: `FRESH-FOUNDING`.

## Shipping rule

We post only to the contiguous 48 states and Washington, D.C. Alaska, Hawaii, territories, military addresses, and international destinations are rejected in the request form, the join form, and Stripe Checkout copy.

## Railway

1. Create a project and attach a Postgres plugin.
2. Set the variables from `.env.example`.
3. In Stripe, create a recurring Price for **$34.99 / month**.
4. Add a webhook to `https://<your-domain>/api/webhooks/stripe` for `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.
5. Deploy. The start command runs migrations and an idempotent seed.

## Stripe notes

- Checkout is `subscription` mode.
- `shipping_address_collection.allowed_countries` is `US` only.
- Fulfillment address of record is the continental-US form the member submits before Checkout.
