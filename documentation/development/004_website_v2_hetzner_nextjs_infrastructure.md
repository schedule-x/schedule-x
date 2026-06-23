Updated: 2026-06-22
Author: Tom Osterlund

---

# Website v2 Hetzner Next.js infrastructure

## Decision

Website v2 should be deployed as a self-hosted Next.js application on a Hetzner Cloud server, even though the site is expected to be mostly static.

The app should not be deployed as a fully static `next export` site, because future requirements include server-side endpoints such as Stripe webhooks. Instead, the production shape should be:

1. Hetzner Cloud VM
2. Reverse proxy with TLS termination
3. Long-running Next.js Node server, preferably packaged as a standalone Docker image
4. No application database for the first production version

This keeps the operational model small while preserving the ability to add webhook endpoints and server-side handlers later.

## Context

The previous infrastructure direction assumed data persistence. That is no longer needed for the first version of website v2.

The website is expected to behave like a static marketing/docs surface most of the time, with a small amount of server behavior for:

1. Webhooks from third-party services
2. Future Stripe integration
3. Server-side form handling or internal actions if needed
4. Search endpoints already present in the app

The current app is a Next.js App Router project in `website-v2`. It already has an API route at `website-v2/app/api/search/route.ts`, which means the deployment must support server-side route handlers.

## Feasibility

Yes, this is possible with Next.js on Hetzner.

Next.js supports self-hosting on a Node.js server or Docker image. For this project, the practical deployment target should be a Node runtime behind a reverse proxy, not static object hosting.

Next.js Route Handlers support HTTP methods such as `GET` and `POST`, which is the right shape for webhook endpoints. Stripe webhook handling can be implemented as a Next.js Route Handler, provided the handler reads and verifies the raw request body before parsing JSON.

## Non-goals

The first production version should not include:

1. Postgres
2. Redis
3. Persistent queues
4. Object storage
5. Multi-node horizontal scaling
6. Kubernetes
7. A separate backend service

These can be added later if the product starts needing durable application state, background jobs, or high availability.

## Proposed server topology

Use one small Hetzner Cloud VM.

Recommended initial shape:

1. Ubuntu LTS server
2. Docker and Docker Compose
3. Caddy or nginx as the public reverse proxy
4. Next.js container listening on an internal port such as `3000`
5. Firewall allowing only SSH, HTTP, and HTTPS
6. Domain DNS pointing to the server's public IPv4/IPv6 address

The reverse proxy should own:

1. TLS certificates
2. HTTP to HTTPS redirects
3. Request size limits
4. Basic rate limiting where supported
5. Forwarding traffic to the Next.js process

The Next.js process should not be exposed directly to the internet.

## Next.js production mode

The preferred production mode is a standalone Docker image.

Add this to `website-v2/next.config.mjs` when the deployment work begins:

```js
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },
}
```

Then build a production image from `website-v2`, copy the generated standalone server output, and run it as a Node process inside the container.

An acceptable simpler first version is to run:

```sh
npm ci
npm run build
npm run start
```

directly on the VM under `systemd`. Docker is still preferred because it makes rollback and dependency isolation cleaner.

## Static rendering model

Most pages should remain static or cacheable by default.

Guidelines:

1. Use static MDX/pages where possible.
2. Avoid adding request-specific APIs like `headers()` or `cookies()` to marketing/docs pages unless truly needed.
3. Keep webhook and API behavior under `app/api/**/route.ts`.
4. Treat server-side code as a small edge of the app, not the core architecture.

This preserves the performance profile of a static site while still allowing server endpoints.

## Webhook design

Webhook endpoints should use Route Handlers, for example:

```txt
website-v2/app/api/webhooks/stripe/route.ts
```

For Stripe specifically:

1. Accept `POST` only.
2. Read the raw request body with `request.text()`.
3. Verify `Stripe-Signature` with the endpoint secret before processing.
4. Return a fast `2xx` response after successful handling.
5. Return `400` for invalid signatures or malformed events.
6. Keep secrets in runtime environment variables, never in `next.config.mjs`.

Without persistence, webhook processing must be intentionally limited. The app can safely:

1. Verify that an event came from Stripe
2. Trigger stateless side effects
3. Call Stripe's API as the source of truth
4. Forward events to another service
5. Send notifications where duplicate delivery is acceptable or externally deduplicated

The app should not rely on local memory or local disk to remember which webhook events have already been processed.

## Server ramifications of no persistence

No database is fine for a mostly static site, but it has concrete consequences.

### Idempotency

Webhook providers may retry events. Stripe can deliver the same event more than once. Without a database, this app cannot store processed event IDs.

Any webhook handler must therefore be naturally idempotent or delegate idempotency to another durable system. For Stripe, the safest pattern is to treat Stripe as the durable source of truth and retrieve current object state from Stripe before acting.

### No durable app state

The app cannot own customer state, subscription state, entitlement state, form submissions, audit logs, or job state. If those become product requirements, add persistence at that time.

### No reliable background jobs

The server can handle requests, but should not be treated as a durable job runner. If a webhook triggers work that must complete eventually, use a persistent queue or an external service.

### Local filesystem is disposable

Generated files, local caches, and uploaded assets should be considered disposable. Deployments, restarts, and server replacement may remove them.

### Backups are simpler

Without a database, backup scope is limited to:

1. Source code in git
2. Server configuration
3. Reverse proxy config
4. Environment variables and secrets, stored outside git

There is no application data backup requirement until persistence is introduced.

## Caching ramifications

A single self-hosted Next.js instance can use its local filesystem cache. That is acceptable for the initial architecture.

If the deployment later uses multiple app instances, a Hetzner Load Balancer, ephemeral containers, or an external CDN, cache behavior must be revisited. Multi-instance deployments can need cache coordination, shared cache storage, or stricter static generation rules.

For the first version, prefer one app instance and simple deploy-time static generation.

## Security requirements

Minimum production requirements:

1. HTTPS only
2. Reverse proxy in front of Next.js
3. Firewall exposing only `22`, `80`, and `443`
4. SSH key authentication only
5. No secrets committed to git
6. Stripe webhook secret stored as a server runtime environment variable
7. Security headers configured either in Next.js or the reverse proxy
8. Request body limits configured at the reverse proxy
9. Logs must not include webhook secrets, API keys, or raw payment payloads

If the app later stores user or payment state, revisit this section before shipping that change.

## Deployment workflow

Recommended deploy flow:

1. Build and test `website-v2` in CI.
2. Build a Docker image for the website.
3. Push the image to a registry.
4. SSH into the Hetzner server from CI or a deploy script.
5. Pull the new image.
6. Restart the container with Docker Compose.
7. Run a health check against `/`.
8. Roll back to the previous image if the health check fails.

For a simpler first deployment, image build and pull can happen directly on the server. That is slower and less reproducible, but acceptable for an early low-traffic marketing site.

## Observability

Minimum observability:

1. Container or systemd restart policy
2. Reverse proxy access logs
3. Next.js application logs
4. Basic uptime monitoring against `/`
5. Alert when the site is down
6. Alert on repeated `5xx` responses from webhook routes

Stripe-specific monitoring should be configured in the Stripe Dashboard when the integration is added.

## Scaling path

Start with one Hetzner VM.

Only add more infrastructure when a specific constraint appears:

1. Add Hetzner Load Balancer when one VM is no longer enough or deployments need no-downtime replacement.
2. Add Postgres when the app needs durable application-owned state.
3. Add Redis or a queue when webhook processing needs reliable asynchronous work.
4. Add object storage when user uploads or generated assets must persist.
5. Add CDN caching when global latency or bandwidth becomes a problem.

## Open questions

1. Which domain or subdomain will serve website v2?
2. Should production and staging be separate Hetzner servers, or should staging live on a separate subdomain on the same VM?
3. Should deployments be manual at first, or wired into CI immediately?
4. Should the first reverse proxy be Caddy for automatic HTTPS simplicity, or nginx for familiarity?

## References

1. Next.js self-hosting: https://nextjs.org/docs/app/guides/self-hosting
2. Next.js Route Handlers: https://nextjs.org/docs/app/api-reference/file-conventions/route
3. Next.js Backend for Frontend guide, including webhook callback guidance: https://nextjs.org/docs/app/guides/backend-for-frontend
4. Next.js production checklist: https://nextjs.org/docs/app/guides/production-checklist
5. Stripe webhook signature verification: https://docs.stripe.com/webhooks/signature
