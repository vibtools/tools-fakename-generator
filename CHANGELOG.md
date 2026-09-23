# Changelog

All notable changes to **Fake Name Generator by Vib Tools** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-23

### Added
- **Core Generator Engine:**
  - In-memory sub-8ms synthetic identity generator.
  - 24 supported country alignments with authentic postal codes and telecom prefixes.
  - 12 cultural namesets (American, British, Canadian, Australian, German, French, Spanish, Italian, Brazilian, Bengali, Hindi, Japanese).
  - ISO/IEC 7812 Luhn Checksum card generation (Visa, Mastercard, American Express, Discover).
  - US SSA 2011 compliant non-issuance Social Security Number algorithm.
- **Developer Documentation & Hubs:**
  - Complete `/docs` technical hub covering REST APIs, database seeding scripts (Prisma, PostgreSQL, MongoDB), and automated test scripts (Playwright & Cypress).
  - Pillar guide comparing top 8 synthetic identity tools (FakeNameGenerator.com, RandomUser.me, Mockaroo, Faker.js, etc.).
- **Cloudflare Edge Functions:**
  - `GET /api/generate` and `POST /api/generate` for serverless API consumption.
  - `GET /api/health` with real-time colocation diagnostics.
  - `GET /api/random-user` caching proxy.
- **SEO, Trust & Legal Pages:**
  - `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/faq`, `/cookies`, and custom `404` page.
  - Schema.org JSON-LD structured data (`WebApplication`, `TechArticle`, `FAQPage`).
  - Search engine index files: `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, and `openapi.yaml`.
- **UI & UX:**
  - Floating 1-tap quick copy dock with toast feedback.
  - Bulk CSV/JSON exporter (10, 25, 50, 100 profiles).
  - Offline localStorage history & favorites drawer.
  - Dark/Light mode theme engine.
  - Keyboard shortcuts (`Space`, `B`, `H`, `G`, `D`).
