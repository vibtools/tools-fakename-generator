# Cloudflare Pages & Functions Deployment Guide

This project is 100% pre-configured and ready for **Cloudflare Pages & Pages Functions** (without standalone Workers).

---

## 1. Cloudflare Pages Dashboard Settings (Git Integration - Recommended)

When connecting your GitHub/GitLab repository to Cloudflare Pages:

| Setting | Value |
|---|---|
| **Project Name** | `fakename-generator` (or your choice) |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

---

## 2. Included Cloudflare Pages Configurations

- **`public/_redirects`**: Automatically copied to `dist/_redirects`. Handles SPA HTML5 fallback routing (`/* /index.html 200`).
- **`public/_headers`**: Enforces strict security headers (no-sniff, SAMEORIGIN, referrer-policy) and immutable asset caching (`Cache-Control: public, max-age=31536000, immutable`).
- **`public/_routes.json`**: Optimizes Cloudflare Pages routing so static assets bypass Edge Workers, directing only `/api/*` to Pages Functions.
- **`wrangler.toml`**: Configured with `pages_build_output_dir = "dist"` and `compatibility_flags = ["nodejs_compat"]`.

---

## 3. Serverless Edge API Endpoints (`/functions`)

Cloudflare Pages automatically mounts the `/functions` directory onto the edge network:

- **`GET /api/health`**: Real-time edge health check, server timestamp, and Cloudflare Colocation data center code.
- **`GET /api/generate`**:
  Generate fake identities on Cloudflare Edge via query parameters:
  - Example: `/api/generate?country=US&gender=female&nameset=american&count=5`
- **`POST /api/generate`**:
  Programmatic API for form automation or microtask QA tools with JSON body:
  ```json
  {
    "country": "US",
    "gender": "male",
    "count": 10,
    "emailDomainType": "realistic"
  }
  ```
- **`GET /api/random-user`**:
  Edge caching proxy for RandomUser API to eliminate client-side CORS issues and latency.

---

## 4. Deploying via Wrangler CLI

If deploying directly from terminal:

```bash
# 1. Build the production assets
npm run build

# 2. Deploy directly to Cloudflare Pages
npx wrangler pages deploy dist
```
