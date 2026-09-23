# Fake Name Generator – Ultra-Fast Synthetic Identity & QA Test Data Engine

[![Live Application](https://img.shields.io/badge/Live%20App-fakenamegenerator.vib.tools-2563eb?style=for-the-badge&logo=cloudflare&logoColor=white)](https://fakenamegenerator.vib.tools/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](./LICENSE)
[![Built with TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages & Functions](https://img.shields.io/badge/Cloudflare-Pages%20%26%20Functions-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

> 🚀 **Live Demo:** [https://fakenamegenerator.vib.tools/](https://fakenamegenerator.vib.tools/)  
> 📖 **Developer Documentation:** [https://fakenamegenerator.vib.tools/docs](https://fakenamegenerator.vib.tools/docs)  
> 📰 **Technical Blog & Guides:** [https://fakenamegenerator.vib.tools/blog](https://fakenamegenerator.vib.tools/blog)

---

## 📌 Overview

**Fake Name Generator by Vib Tools** is an open-source, zero-latency synthetic persona and test data generation platform. Designed for software engineers, QA automation testers, database administrators, and privacy advocates, it generates 100% algorithmically valid, non-real identities with zero advertisements and instant in-memory client rendering.

Unlike legacy generators from the 2000s that require heavy full-page reloads and bombard users with ads, **Vib Tools Fake Name Generator** runs entirely in-memory with sub-8ms generation times, mathematical Luhn check-digit verification, SSA-compliant non-issued SSNs, 24-country address alignments, and built-in Cloudflare Edge Functions REST APIs.

---

## ✨ Key Features

- ⚡ **Instant Client-Side Generation (<8ms):** Generates full identity records in browser RAM without server roundtrips or page reloads.
- 🌍 **24 Supported Countries:** Real-world postal codes, states, cities, and localized phone dialing formats for US, UK, Canada, Australia, Germany, France, Japan, India, Bangladesh, Brazil, Italy, Spain, and more.
- 🎭 **12 Cultural Namesets:** Realistic first names and surnames matching regional demographic distributions (American, British, Canadian, Australian, German, French, Spanish, Italian, Brazilian, Bengali, Indian/Hindi, Japanese).
- 💳 **ISO/IEC 7812 Luhn Checksum Cards:** Synthesizes Visa, Mastercard, American Express, and Discover card numbers that pass the Modulo 10 check algorithm for frontend validation testing.
- 🆔 **Compliant Government & Tax Identifiers:** US SSN (using non-issued 900-series prefixes), UK National Insurance Number formats, and Australian Tax File Numbers.
- 📦 **Bulk CSV & JSON Exporter:** Download 10, 25, 50, or 100 complete identity records in one click, ready for direct database seeding (PostgreSQL, MySQL, SQLite, MongoDB, Prisma, Drizzle).
- 📋 **Floating 1-Tap Quick Copy Dock:** One-click copy for Full Name, Street Address, Postal Code, Phone Number, SSN, and Credit Card details with visual toast feedback.
- ⌨️ **Keyboard Shortcuts:** Press `Space` to generate a new persona, `B` for Bulk Export, `H` for Saved History, `G` for Microjob Guide, and `D` for Dark Mode toggle.
- 🛡️ **Zero-Retention Privacy Architecture:** 100% GDPR (Article 6 & 32) and CCPA compliant. Zero logging or server-side retention of generated test data.
- 🌐 **Free Edge REST API:** Built-in Cloudflare Pages Functions providing instantaneous JSON endpoints (`/api/generate`, `/api/health`) without API keys or rate walls.

---

## 📊 Benchmark & Feature Comparison

| Feature | Vib Tools Fake Name Generator | FakeNameGenerator.com | RandomUser.me | Mockaroo |
|---|:---:|:---:|:---:|:---:|
| **Live URL** | [fakenamegenerator.vib.tools](https://fakenamegenerator.vib.tools/) | fakenamegenerator.com | randomuser.me | mockaroo.com |
| **Generation Speed** | **<8ms (Client RAM)** | ~1,200ms (Page reload) | ~250ms (HTTP fetch) | ~400ms (Server request) |
| **Advertisements** | **0 (100% Ad-Free)** | Heavy Display Banners | Ad-Free | Limited Free Tier |
| **Luhn Checksum Cards** | ✅ Yes (ISO/IEC 7812) | ✅ Yes | ❌ Basic / Partial | ✅ Yes |
| **24-Country Alignment** | ✅ Verified City/State/Zip | ✅ Legacy | ⚠️ Generic Nat | ✅ Configurable |
| **Floating 1-Tap Copy Dock** | ✅ Included | ❌ No | ❌ No | ❌ No |
| **Free Edge REST API** | ✅ Cloudflare Edge API | ❌ Paid / API Key | ✅ REST API | ⚠️ 200/day limit |
| **Open Source** | ✅ MIT Licensed | ❌ Closed Source | ✅ Open Source | ❌ Proprietary |

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 6+](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting & Serverless:** [Cloudflare Pages](https://pages.cloudflare.com/) & [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- **Schema & SEO:** Schema.org JSON-LD structured data (`WebApplication`, `TechArticle`, `FAQPage`)

---

## 🚀 Cloudflare Pages & Functions Deployment Guide

This repository is pre-configured for one-click deployment on **Cloudflare Pages**.

### Method 1: Cloudflare Dashboard (Recommended)

1. Fork or push this repository to your **GitHub** or **GitLab** account.
2. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Project Name:** `fakename-generator` (or custom name)
   - **Production branch:** `main`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave as root)
4. Click **Save and Deploy**. Cloudflare will build the static frontend into `dist/` and automatically mount `/functions` as Edge APIs.

### Method 2: Wrangler CLI Deployment

```bash
# 1. Clone the repository
git clone https://github.com/vibtools/fake-name-generator.git
cd fake-name-generator

# 2. Install dependencies
npm install

# 3. Build the production bundle
npm run build

# 4. Deploy directly to Cloudflare Pages via Wrangler
npx wrangler pages deploy dist --project-name=fakename-generator
```

### 📁 Cloudflare Configuration Files Included

- **`public/_redirects`**: Handles SPA client routing (`/* /index.html 200`) so paths like `/blog`, `/docs`, `/about`, `/contact`, `/privacy`, `/faq` never return 404 on refresh.
- **`public/_headers`**: Enforces strict security headers (`X-Content-Type-Options: nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`) and immutable cache policies for `/assets/*`.
- **`public/_routes.json`**: Optimizes edge routing by invoking Functions exclusively on `/api/*` requests and serving static assets directly from Cloudflare's CDN.
- **`wrangler.toml`**: Cloudflare Pages configuration with `pages_build_output_dir = "dist"` and `nodejs_compat` compatibility flag.

---

## 💻 Local Development

```bash
# Clone repository
git clone https://github.com/vibtools/fake-name-generator.git
cd fake-name-generator

# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ⚡ Serverless Edge REST API Reference

You can invoke the Edge REST API from cURL, Python, TypeScript, Playwright, or Cypress test scripts:

### 1. `GET /api/generate`
Fetch one or multiple synthetic profiles.

```bash
# Generate single US profile
curl -X GET "https://fakenamegenerator.vib.tools/api/generate?country=US&gender=female&nameset=american"

# Generate 5 German profiles
curl -X GET "https://fakenamegenerator.vib.tools/api/generate?country=DE&gender=random&nameset=german&count=5"
```

#### Query Parameters:
| Parameter | Type | Default | Options |
|---|---|---|---|
| `country` | `string` | `US` | `US`, `GB`, `CA`, `AU`, `DE`, `FR`, `ES`, `IT`, `JP`, `IN`, `BD`, `BR`, etc. |
| `gender` | `string` | `random` | `random`, `male`, `female` |
| `nameset` | `string` | `american` | `american`, `british`, `canadian`, `german`, `french`, `spanish`, `bengali`, `hindi`, `japanese`, etc. |
| `count` | `number` | `1` | `1` to `100` |

---

### 2. `POST /api/generate`
Generate personas via JSON payload.

```bash
curl -X POST "https://fakenamegenerator.vib.tools/api/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "GB",
    "gender": "male",
    "nameset": "british",
    "count": 3,
    "minAge": 25,
    "maxAge": 45,
    "emailDomainType": "realistic"
  }'
```

---

### 3. `GET /api/health`
Edge network status and colocation data center info.

```bash
curl -X GET "https://fakenamegenerator.vib.tools/api/health"
```

---

## 📚 Official Pages & Technical Hubs

- **Core Generator:** [https://fakenamegenerator.vib.tools/](https://fakenamegenerator.vib.tools/)
- **Developer Documentation:** [https://fakenamegenerator.vib.tools/docs](https://fakenamegenerator.vib.tools/docs)
  - [Quickstart & Shortcuts](https://fakenamegenerator.vib.tools/docs/getting-started)
  - [Edge REST API Reference](https://fakenamegenerator.vib.tools/docs/api-reference)
  - [Top 8 Tools Benchmark Comparison](https://fakenamegenerator.vib.tools/docs/tools-comparison-and-alternatives)
  - [Luhn Mod 10 & SSN Algorithms](https://fakenamegenerator.vib.tools/docs/algorithms-and-validation)
  - [Bulk CSV & Database Seeding](https://fakenamegenerator.vib.tools/docs/bulk-data-and-seeding)
  - [QA & E2E Test Automation](https://fakenamegenerator.vib.tools/docs/qa-and-test-automation)
  - [Privacy & GDPR Standards](https://fakenamegenerator.vib.tools/docs/privacy-and-gdpr-compliance)
- **Engineering Blog:** [https://fakenamegenerator.vib.tools/blog](https://fakenamegenerator.vib.tools/blog)
- **About Us:** [https://fakenamegenerator.vib.tools/about](https://fakenamegenerator.vib.tools/about)
- **Contact Team:** [https://fakenamegenerator.vib.tools/contact](https://fakenamegenerator.vib.tools/contact)
- **FAQ & Help:** [https://fakenamegenerator.vib.tools/faq](https://fakenamegenerator.vib.tools/faq)
- **Privacy Policy:** [https://fakenamegenerator.vib.tools/privacy](https://fakenamegenerator.vib.tools/privacy)
- **Terms of Service:** [https://fakenamegenerator.vib.tools/terms](https://fakenamegenerator.vib.tools/terms)
- **Disclaimer:** [https://fakenamegenerator.vib.tools/disclaimer](https://fakenamegenerator.vib.tools/disclaimer)
- **Cookie Policy:** [https://fakenamegenerator.vib.tools/cookies](https://fakenamegenerator.vib.tools/cookies)

---

## ⚖️ Legal Disclaimer

All data generated by this tool is strictly **synthetic, fictitious, and intended solely for software development, QA testing, form verification, privacy protection, and creative writing**. Credit card numbers are algorithmically formatted using the Luhn checksum for frontend format validation only; they have no monetary value, no linked bank account, and cannot be used for financial transactions.

---

## 🤝 Contributing

Contributions are welcome! Please check our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for instructions on submitting pull requests, requesting new country namesets, or proposing new edge features.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

Maintained with ❤️ by **[Md Nurnobi (@victorsteele)](https://github.com/victorsteele)** and the **[Vib Tools](https://vib.tools/)** Team.
