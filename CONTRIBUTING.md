# Contributing to Fake Name Generator by Vib Tools

Thank you for your interest in contributing to **Fake Name Generator**! We welcome community contributions to help improve datasets, enhance performance, fix bugs, and expand localized cultural namesets.

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment. Please treat all contributors with respect, professionalism, and constructive feedback.

---

## How Can You Contribute?

1. **Adding New Countries & Namesets:**
   - Add localized first names, surnames, street formats, cities, and postal code regex patterns in `src/data/names.ts` and `src/data/locations.ts`.
2. **Improving Edge APIs & Functions:**
   - Enhance Cloudflare Pages Functions in `/functions/api/`.
3. **Documentation & SEO Guides:**
   - Submit technical articles to `src/blog/blogData.ts` or developer documentation to `src/docs/docsData.ts`.
4. **Bug Reports & Optimizations:**
   - Open an issue describing reproducible steps or submit a pull request with unit tests.

---

## Development Workflow

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/fake-name-generator.git
cd fake-name-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Server
```bash
npm run dev
```

### 4. Code Quality & Linting
Before submitting your pull request, ensure there are no TypeScript or build errors:
```bash
npm run lint
npm run build
```

---

## Submitting Pull Requests

1. Create a feature branch (`git checkout -b feature/new-country-nameset`).
2. Commit your changes (`git commit -m 'feat: add Italian nameset & postal patterns'`).
3. Push to your branch (`git push origin feature/new-country-nameset`).
4. Open a Pull Request with a clear explanation of changes.

---

## License

By contributing to this repository, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
