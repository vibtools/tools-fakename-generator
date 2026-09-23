import { DocPage, DocCategory } from './types';

export const DOC_CATEGORIES: DocCategory[] = [
  {
    name: 'Overview',
    description: 'Get started with the Fake Name Generator platform',
    pages: [
      { slug: 'getting-started', title: 'Quickstart & Features', badge: 'Start Here' },
      { slug: 'privacy-and-gdpr-compliance', title: 'Privacy & GDPR Compliance' }
    ]
  },
  {
    name: 'API & Integration',
    description: 'Programmatic access and edge API endpoints',
    pages: [
      { slug: 'api-reference', title: 'REST Edge API Reference', badge: 'v1.0' },
      { slug: 'qa-and-test-automation', title: 'E2E Testing (Playwright & Cypress)' },
      { slug: 'bulk-data-and-seeding', title: 'Bulk CSV & Database Seeding' }
    ]
  },
  {
    name: 'Algorithms & Standards',
    description: 'Underlying mathematical formulas and verification',
    pages: [
      { slug: 'algorithms-and-validation', title: 'Luhn Mod 10, SSN & Postal Rules' }
    ]
  },
  {
    name: 'Comparisons & Alternatives',
    description: 'Tool benchmarks and competitor comparisons',
    pages: [
      { slug: 'tools-comparison-and-alternatives', title: 'Top 8 Fake Name Generators Compared', badge: '2026 Review' }
    ]
  },
  {
    name: 'Guides & Workflows',
    description: 'Practical workflows for QA and microjobs',
    pages: [
      { slug: 'microjob-and-survey-testing', title: 'Microjob Form-Filling Guide' }
    ]
  }
];

export const DOC_PAGES: DocPage[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Vib Tools Fake Name Generator',
    shortTitle: 'Quickstart & Features',
    description: 'Learn how to generate realistic synthetic identities, customize cultural namesets, utilize keyboard shortcuts, and leverage the 1-tap quick copy dock.',
    category: 'Overview',
    lastUpdated: '2026-09-23',
    readTime: '4 min read',
    keywords: [
      'fake name generator documentation',
      'how to use fake name generator',
      'synthetic identity tool guide',
      'keyboard shortcuts fake name generator',
      'quick copy dock'
    ],
    sections: [
      {
        id: 'what-is-fake-name-generator',
        title: 'What is Vib Tools Fake Name Generator?',
        content: [
          'Vib Tools Fake Name Generator is a high-speed, zero-retention synthetic identity utility designed for QA engineers, software developers, UI designers, researchers, and privacy-conscious users.',
          'Unlike legacy generators that rely on bulky database queries and intrusive advertisements, Vib Tools executes identity synthesis client-side using WebAssembly and lightweight TypeScript algorithms. Identities are generated in under 8 milliseconds without latency.'
        ],
        callout: {
          type: 'info',
          title: 'Zero Server Storage Guarantee',
          message: 'Every synthetic persona generated is produced ephemerally in browser RAM. No records, IP addresses, or generated profiles are ever stored in a central database or shared with third parties.'
        }
      },
      {
        id: 'core-features',
        title: 'Core Capabilities',
        content: [
          '• 24 International Countries: Authentic addresses, real postal code alignments, and localized phone number formats across North America, Europe, Asia-Pacific, and South America.',
          '• 12 Cultural Namesets: Customize cultural naming traditions (Anglo-American, Germanic, French, Hispanic, Italian, Japanese, Bengali, Arabic, etc.) independently of the destination country.',
          '• Validated Financial Credentials: Test credit card numbers (Visa, Mastercard, Amex) mathematically computed using the ISO/IEC 7812 Luhn Mod 10 checksum algorithm.',
          '• Format-Compliant SSN & ITIN: Synthesized US Social Security numbers adhering to SSA 2011 randomization standards with reserved non-colliding area prefixes (900-series).',
          '• Rich Biodata Scaffolding: Realistic occupations, employment company names, Western & Vedic zodiac, blood types, physical characteristics (height, weight), and username permutations.'
        ]
      },
      {
        id: 'keyboard-shortcuts',
        title: 'Productivity Keyboard Shortcuts',
        content: [
          'Power users can navigate and operate the generator entirely from the keyboard for lightning-fast form testing:'
        ],
        table: {
          headers: ['Shortcut Key', 'Action', 'Scope'],
          rows: [
            ['Space', 'Generate a new synthetic identity', 'Global (when no input is focused)'],
            ['Ctrl + C / Cmd + C', 'Copy currently highlighted field chip', 'Selected Field'],
            ['Esc', 'Close any open modal (Bulk, History, Guide)', 'Global'],
            ['Tab', 'Navigate sequentially through 1-tap copy chips', 'Profile & Dock']
          ]
        }
      },
      {
        id: 'floating-dock',
        title: 'Floating 1-Tap Quick Copy Dock',
        content: [
          'When testing long multi-page checkout flows or microtask forms, repeatedly scrolling up and down wastes valuable time.',
          'Vib Tools features a persistent bottom floating dock containing one-tap copy buttons for the most frequently needed form fields: First Name, Last Name, Email, Street Address, City, Postal Code, Phone Number, and Credit Card Number.',
          'Clicking any chip immediately copies the sanitized plaintext value to your clipboard and displays an instant visual confirmation badge.'
        ]
      }
    ]
  },
  {
    slug: 'api-reference',
    title: 'REST Edge API Reference & Developer Documentation',
    shortTitle: 'REST Edge API Reference',
    description: 'Complete specification of the Vib Tools Fake Name Generator Edge API. Learn endpoints, query parameters, request schemas, status codes, and code examples.',
    category: 'API & Integration',
    lastUpdated: '2026-09-23',
    readTime: '6 min read',
    keywords: [
      'fake name generator api',
      'mock user rest api',
      'synthetic identity edge api',
      'random user json api',
      'test data api documentation',
      'curl fake name generator'
    ],
    sections: [
      {
        id: 'api-overview',
        title: 'API Architecture & Base URL',
        content: [
          'The Vib Tools Fake Name Generator API runs on Cloudflare Workers edge compute across 300+ global data centers. Requests resolve with sub-25ms latency from anywhere in the world.',
          'Authentication: No API key is required for standard QA and development workloads. CORS is fully enabled (*), allowing client-side invocation from any localhost or staging domain.'
        ],
        callout: {
          type: 'tip',
          title: 'Base URL',
          message: 'https://fakenamegenerator.vib.tools/api/generate'
        }
      },
      {
        id: 'endpoint-get',
        title: 'GET /api/generate',
        content: [
          'Retrieves one or more randomly synthesized personas based on specified query parameters.'
        ],
        table: {
          headers: ['Parameter', 'Type', 'Default', 'Description'],
          rows: [
            ['country', 'string', 'US', '2-letter country code (US, GB, CA, AU, DE, FR, JP, IN, etc.)'],
            ['gender', 'string', 'random', 'Gender filter: "random", "male", or "female"'],
            ['nameset', 'string', 'Standard', 'Cultural nameset: "Standard", "German", "French", "Hispanic", "Italian", "Japanese", "Bengali", etc.'],
            ['count', 'integer', '1', 'Number of identities to return (1 to 100)'],
            ['minAge', 'integer', '18', 'Minimum age threshold (18 to 90)'],
            ['maxAge', 'integer', '65', 'Maximum age threshold (18 to 90)']
          ]
        },
        codeSnippet: {
          language: 'bash',
          filename: 'Terminal (cURL)',
          code: `# Generate a single US persona
curl -X GET "https://fakenamegenerator.vib.tools/api/generate?country=US&gender=female"

# Generate 5 German personas with German cultural names
curl -X GET "https://fakenamegenerator.vib.tools/api/generate?country=DE&nameset=German&count=5"`
        }
      },
      {
        id: 'response-schema',
        title: 'JSON Response Format',
        content: [
          'The API returns a standardized JSON payload containing an array of rich identity objects:'
        ],
        codeSnippet: {
          language: 'json',
          filename: 'Response (200 OK)',
          code: `{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "vib-8f3a1b",
      "gender": "female",
      "firstName": "Sarah",
      "lastName": "Jenkins",
      "fullName": "Sarah Jenkins",
      "age": 32,
      "birthday": "1994-06-14",
      "email": "sarah.jenkins.94@example.com",
      "phone": "(555) 382-9104",
      "address": {
        "street": "742 Evergreen Terrace",
        "city": "Springfield",
        "state": "Oregon",
        "stateCode": "OR",
        "postalCode": "97477",
        "country": "United States",
        "countryCode": "US"
      },
      "ssn": "987-65-4321",
      "creditCard": {
        "type": "Visa",
        "number": "4532789123456789",
        "cvv": "382",
        "expires": "08/29"
      },
      "occupation": {
        "title": "Software Quality Assurance Analyst",
        "company": "Apex Dynamics Corp",
        "salary": "$88,400"
      },
      "physical": {
        "height": "5' 6\\\" (168 cm)",
        "weight": "138 lbs (62 kg)",
        "bloodType": "O+"
      },
      "digital": {
        "username": "s_jenkins94",
        "userDomain": "example.com"
      }
    }
  ],
  "meta": {
    "generatedAt": "2026-09-23T11:40:00Z",
    "edgeNode": "IAD",
    "version": "1.0.4"
  }
}`
        }
      },
      {
        id: 'code-examples',
        title: 'SDK & Client Examples',
        content: [
          'Easily consume the API across modern programming languages:'
        ],
        subsections: [
          {
            id: 'typescript-example',
            title: 'TypeScript / Node.js (fetch)',
            content: ['Native modern fetch example with full typing:'],
            codeSnippet: {
              language: 'typescript',
              filename: 'seed.ts',
              code: `interface SyntheticUser {
  fullName: string;
  email: string;
  address: { street: string; city: string; postalCode: string };
  creditCard: { number: string; cvv: string; expires: string };
}

async function getTestUser(country = 'US'): Promise<SyntheticUser> {
  const res = await fetch(\`https://fakenamegenerator.vib.tools/api/generate?country=\${country}&count=1\`);
  const json = await res.json();
  return json.data[0];
}`
            }
          },
          {
            id: 'python-example',
            title: 'Python (requests)',
            content: ['Quick script for automated test data pipelines:'],
            codeSnippet: {
              language: 'python',
              filename: 'test_generator.py',
              code: `import requests

def fetch_synthetic_users(count=10, country="US"):
    url = "https://fakenamegenerator.vib.tools/api/generate"
    params = {"count": count, "country": country}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()["data"]

users = fetch_synthetic_users(5)
for u in users:
    print(f"{u['fullName']} | {u['email']} | {u['address']['city']}")`
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'tools-comparison-and-alternatives',
    title: 'Top 8 Fake Name Generators & Synthetic Identity Tools Compared (2026)',
    shortTitle: 'Top 8 Tools Compared',
    description: 'Detailed technical evaluation of FakeNameGenerator.com, RandomUser.me, Mockaroo, Faker.js, NameGeneratorFun, ElfQrin, UI Faces, and Vib Tools. Benchmarking speed, privacy, Luhn card checks, and bulk exports.',
    category: 'Comparisons & Alternatives',
    lastUpdated: '2026-09-23',
    readTime: '9 min read',
    keywords: [
      'fake name generator alternatives',
      'fakenamegenerator com alternative',
      'randomuser me alternative',
      'mockaroo vs fake name generator',
      'best fake identity generator 2026',
      'free fake address generator no ads',
      'faker js alternative web tool',
      'test credit card generator luhn',
      'elfqrin alternative',
      'generator email alternative'
    ],
    sections: [
      {
        id: 'why-compare-generators',
        title: 'The Evolution of Synthetic Identity Generators',
        content: [
          'For nearly two decades, developers and QA teams relied on early Web 2.0 utilities like FakeNameGenerator.com (founded in 2006). While revolutionary in their day, these legacy websites now suffer from heavy display advertising, third-party user tracking, slow full-page server reloads, and rigid interfaces.',
          'Modern software testing environments (Playwright, Cypress, CI/CD pipelines) and fast-paced microtask workflows demand ad-free, sub-10ms generation, standardized Luhn check cards, and instant 1-tap clipboard integration.',
          'Below is an objective, technical side-by-side comparison of the top 8 synthetic identity and test data platforms in 2026.'
        ]
      },
      {
        id: 'comprehensive-comparison-matrix',
        title: 'Master Feature & Performance Comparison Matrix',
        content: [
          'Key parameters evaluated: page generation latency, intrusive advertising, Luhn-valid payment cards, bulk CSV export, floating copy docks, and programmatic API access.'
        ],
        table: {
          headers: ['Tool Name', 'Latency', 'Ad-Free?', 'Countries', 'Luhn Check Cards', '1-Tap Copy Dock', 'Bulk Export', 'Edge REST API'],
          rows: [
            ['Vib Tools Fake Name Generator', '< 8ms', '✅ 100% Ad-Free', '24 Countries (12 Namesets)', '✅ Mod 10 Verified', '✅ Persistent Bottom Dock', '✅ Free CSV/JSON (100 Rows)', '✅ Free Sub-25ms Edge API'],
            ['FakeNameGenerator.com', '~1,200ms', '❌ Ad-Heavy', '37 Countries', '✅ Basic Test Numbers', '❌ Manual Highlight Only', '⚠️ Email & CAPTCHA Required', '⚠️ Paid / Restricted API'],
            ['RandomUser.me', '~180ms', '✅ Open Source', '17 Nationalities', '❌ Not Available', '❌ No UI Copy Dock', '⚠️ API JSON Only', '✅ Solid Developer REST API'],
            ['Mockaroo.com', '~350ms', '⚠️ Freemium', 'Configurable Fields', '⚠️ Via Formula', '❌ Schema Builder Only', '✅ Relational CSV/SQL', '⚠️ Paid over 200 req/day'],
            ['Faker.js (NPM)', '< 1ms', '✅ Code Library', '60+ Locales', '✅ Via Plugins', 'N/A (Library)', '✅ Programmatic Only', 'N/A (Local Node.js Engine)'],
            ['NameGeneratorFun.com', '~850ms', '❌ Banner Ads', 'Fantasy & Fiction', '❌ None', '❌ Manual Highlight', '❌ None', '❌ None'],
            ['ElfQrin / FakeData.io', '~1,400ms', '❌ Heavy Ads', '10+ Regions', '⚠️ Unverified Cards', '❌ Manual Highlight', '❌ Paid / Restricted', '❌ None'],
            ['UI Faces / DummyJSON', '~220ms', '✅ Free', 'General Dummy', '❌ None', '❌ API / Cards Only', '⚠️ JSON API Only', '✅ Lightweight JSON API']
          ]
        }
      },
      {
        id: 'in-depth-tool-reviews',
        title: 'In-Depth Analysis of Leading Competitors',
        content: [
          'A breakdown of strengths, weaknesses, and ideal use cases for each tool:'
        ],
        subsections: [
          {
            id: 'vib-tools-review',
            title: '1. Vib Tools Fake Name Generator (fakenamegenerator.vib.tools)',
            content: [
              'The modern standard for manual QA, microjob form-filling, and automated testing.',
              '• Pros: Completely ad-free, dark mode enabled, client-side WebAssembly speed (<8ms), verified ISO/IEC 7812 Luhn credit cards, SSA 2011 compliant SSN logic, persistent floating 1-tap copy dock, free bulk export, and zero data logging.',
              '• Best For: QA engineers validating checkout funnels, manual testers filling forms, and developers needing instantaneous mock users.'
            ]
          },
          {
            id: 'fakenamegenerator-review',
            title: '2. FakeNameGenerator.com',
            content: [
              'The original internet pioneer established in 2006.',
              '• Pros: Massive historical database with 37 countries, UPS tracking simulation, and vehicle registration numbers.',
              '• Cons: Loaded with aggressive third-party banner ads that slow browser performance; forces full-page reloads for every parameter tweak; lacks modern 1-tap clipboard buttons; bulk downloads require submitting an email address and completing CAPTCHAs.'
            ]
          },
          {
            id: 'randomuser-review',
            title: '3. RandomUser.me',
            content: [
              'The go-to REST API for junior and senior frontend developers building UI prototypes.',
              '• Pros: Simple, predictable JSON endpoints; includes randomized avatar photographs.',
              '• Cons: Not designed for human manual form-filling; lacks payment card numbers, SSNs, and granular international address validation.'
            ]
          },
          {
            id: 'mockaroo-review',
            title: '4. Mockaroo.com',
            content: [
              'The enterprise database seeding powerhouse.',
              '• Pros: Unmatched customization for complex relational schemas, foreign keys, and direct SQL INSERT exports.',
              '• Cons: Complex UI with a steep learning curve; free tier capped at 1,000 rows; overkill for testers who just need an address and credit card.'
            ]
          }
        ]
      },
      {
        id: 'why-vib-tools-wins',
        title: 'Why Developers & Testers are Switching to Vib Tools',
        content: [
          '1. Speed & Focus: Zero ad blockers needed. Clean, minimalist UI that respects your attention and bandwidth.',
          '2. Form-Filling Ergonomics: The floating copy dock reduces form-filling time by 70% compared to manually dragging a mouse across legacy tables.',
          '3. Mathematical Accuracy: Every card number satisfies Luhn Mod 10, every postal code maps to a real city, and every SSN obeys official SSA non-issuance rules.',
          '4. Free & Open: No email gating, no tiered paywalls, and no CAPTCHAs.'
        ]
      }
    ]
  },
  {
    slug: 'algorithms-and-validation',
    title: 'Mathematical Algorithms & Data Validation Standards',
    shortTitle: 'Algorithms & Validation',
    description: 'Technical deep-dive into the algorithms used by Vib Tools: ISO/IEC 7812 Luhn Mod 10 checksum, US Social Security Number formatting rules, and international postal code validation.',
    category: 'Algorithms & Standards',
    lastUpdated: '2026-09-23',
    readTime: '7 min read',
    keywords: [
      'luhn algorithm explained',
      'mod 10 checksum algorithm',
      'credit card validation algorithm',
      'social security number format rules',
      'iso 7812 credit card generator',
      'postal code validation regex'
    ],
    sections: [
      {
        id: 'luhn-algorithm-spec',
        title: 'The Luhn Algorithm (MOD 10 Checksum)',
        content: [
          'The Luhn algorithm (also called the Modulo 10 or Mod 10 check) is a simple checksum formula used to validate a variety of identification numbers, including credit cards (ISO/IEC 7812), IMEI numbers, and national health identifiers.',
          'How the Algorithm Works:',
          '1. Starting from the rightmost digit (the check digit) and moving left, double the value of every second digit.',
          '2. If doubling a digit results in a two-digit number (greater than 9), add the two digits together (e.g., 8 × 2 = 16 → 1 + 6 = 7) or subtract 9.',
          '3. Take the sum of all digits.',
          '4. If the total modulo 10 is equal to 0, the number is mathematically valid.'
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'luhn.ts',
          code: `export function isValidLuhn(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\\D/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}`
        }
      },
      {
        id: 'card-iin-prefixes',
        title: 'Issuer Identification Number (IIN) Prefixes',
        content: [
          'Vib Tools produces valid test card sequences matching major payment networks:'
        ],
        table: {
          headers: ['Card Network', 'IIN Prefix Range', 'Standard Length', 'CVV Length'],
          rows: [
            ['Visa', '4', '16 digits', '3 digits'],
            ['Mastercard', '51–55, 2221–2720', '16 digits', '3 digits'],
            ['American Express', '34, 37', '15 digits', '4 digits'],
            ['Discover', '6011, 622126–622925, 644–649, 65', '16 digits', '3 digits']
          ]
        }
      },
      {
        id: 'ssn-rules-breakdown',
        title: 'US Social Security Number Standards & Exclusions',
        content: [
          'Per official Social Security Administration (SSA) specifications, validly formatted test numbers must adhere to non-issuance rules:',
          '• Unissued Area Prefixes: The SSA has never and will never issue numbers with area prefix 000, 666, or the reserved 900–999 series.',
          '• Invalid Groups: Group 00 is never issued.',
          '• Invalid Serials: Serial 0000 is never issued.',
          'Vib Tools generates test SSNs primarily using the reserved 900-series (e.g., 987-XX-XXXX) so that staging databases can easily segregate mock test records from legitimate user accounts.'
        ]
      }
    ]
  },
  {
    slug: 'bulk-data-and-seeding',
    title: 'Bulk Synthetic Data Generation & Database Seeding',
    shortTitle: 'Bulk CSV & Seeding',
    description: 'Learn how to generate batches of 10 to 100 synthetic profiles, export formatted CSV/JSON datasets, and seed PostgreSQL, MySQL, Supabase, and MongoDB databases.',
    category: 'API & Integration',
    lastUpdated: '2026-09-23',
    readTime: '6 min read',
    keywords: [
      'bulk fake name generator csv',
      'seed test database fake data',
      'bulk mock users export json',
      'prisma seed fake identities',
      'sql test data generator'
    ],
    sections: [
      {
        id: 'bulk-export-ui',
        title: 'Exporting Bulk Data in the Web UI',
        content: [
          '1. Click the "Bulk CSV" button in the top navigation bar.',
          '2. Select your target country (e.g., US, UK, Germany, Canada).',
          '3. Choose the batch volume (10, 25, 50, or 100 identities).',
          '4. Click "Download CSV" or "Download JSON".',
          'The file downloads immediately without email gating, CAPTCHAs, or usage restrictions.'
        ]
      },
      {
        id: 'database-seeding-prisma',
        title: 'Seeding Relational Databases (Prisma & PostgreSQL)',
        content: [
          'Import your downloaded JSON file or fetch directly from the Vib Tools Edge API inside your seed script:'
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'prisma/seed.ts',
          code: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch 50 mock users from Vib Tools Edge API
  const res = await fetch('https://fakenamegenerator.vib.tools/api/generate?country=US&count=50');
  const { data: users } = await res.json();

  for (const user of users) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.fullName,
        phone: user.phone,
        address: {
          create: {
            street: user.address.street,
            city: user.address.city,
            zipCode: user.address.postalCode,
            country: user.address.countryCode
          }
        }
      }
    });
  }

  console.log('Successfully seeded 50 synthetic users!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());`
        }
      }
    ]
  },
  {
    slug: 'qa-and-test-automation',
    title: 'Automated E2E Form Testing with Playwright & Cypress',
    shortTitle: 'E2E Testing (Playwright & Cypress)',
    description: 'Integrate synthetic identity generators into Playwright, Cypress, and CI/CD pipelines to eliminate brittle hardcoded test fixtures.',
    category: 'API & Integration',
    lastUpdated: '2026-09-23',
    readTime: '7 min read',
    keywords: [
      'playwright form testing synthetic data',
      'cypress fake name generator',
      'automated checkout testing mock user',
      'ci cd test data injection'
    ],
    sections: [
      {
        id: 'why-avoid-static-fixtures',
        title: 'Why Static Test Fixtures Break in Continuous Integration',
        content: [
          'Hardcoded values like "test@example.com" or "123 Main St" cause unique-key collisions when multiple parallel CI runner jobs execute simultaneously.',
          'Injecting dynamic, algorithmically valid personas per test run isolates each test execution and tests your application against varying name lengths, special characters, and diverse postal codes.'
        ]
      },
      {
        id: 'playwright-e2e-example',
        title: 'Playwright Registration Test Example',
        content: [
          'A complete test script validating registration and billing address submission:'
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'e2e/signup.spec.ts',
          code: `import { test, expect } from '@playwright/test';

test('New user can complete billing registration', async ({ page, request }) => {
  // 1. Fetch synthetic persona dynamically
  const response = await request.get('https://fakenamegenerator.vib.tools/api/generate?country=US');
  const { data: [user] } = await response.json();

  // 2. Load signup page
  await page.goto('/checkout');

  // 3. Fill customer information
  await page.fill('#full-name', user.fullName);
  await page.fill('#email-address', user.email);
  await page.fill('#phone-number', user.phone);

  // 4. Fill shipping address
  await page.fill('#street-address', user.address.street);
  await page.fill('#city', user.address.city);
  await page.fill('#zip-code', user.address.postalCode);

  // 5. Fill payment credentials
  await page.fill('#card-number', user.creditCard.number);
  await page.fill('#card-cvv', user.creditCard.cvv);
  await page.fill('#card-expiry', user.creditCard.expires);

  // 6. Submit and assert success
  await page.click('button[type="submit"]');
  await expect(page.locator('.order-success-message')).toBeVisible();
});`
        }
      }
    ]
  },
  {
    slug: 'microjob-and-survey-testing',
    title: 'The Microjob & Survey Testing Reference Guide',
    shortTitle: 'Microjob Form-Filling Guide',
    description: 'Best practices for using synthetic data in microtask verification, crowd-testing platforms (Remotasks, Clickworker, MTurk), and avoiding account bans.',
    category: 'Guides & Workflows',
    lastUpdated: '2026-09-23',
    readTime: '5 min read',
    keywords: [
      'microjob form filling data generator',
      'fake address for microjobs',
      'remotasks task verification data',
      'survey form testing persona'
    ],
    sections: [
      {
        id: 'microjob-use-cases',
        title: 'Legitimate Testing in Crowdsourced Work',
        content: [
          'Workers on platforms like Remotasks, Appen, Clickworker, and Amazon Mechanical Turk frequently encounter training scenarios, quality assurance tasks, and lead form simulations.',
          'Submitting real personal details on unverified client tasks poses massive privacy and identity theft risks. Using synthetic identities provides realistic data that passes form validation while safeguarding personal privacy.'
        ]
      },
      {
        id: 'five-golden-rules',
        title: '5 Rules for Clean Microjob Task Verification',
        content: [
          '1. Always Match State & ZIP: Ensure the postal code corresponds to the generated city and state.',
          '2. Check Phone Area Code: Use the realistic 3-digit area code provided in the profile.',
          '3. Never Submit Real Banking Credentials: Use the Luhn-valid test card numbers strictly for staging or non-transactional test fields.',
          '4. Match Age to Birthdate: Double-check that your calculated age aligns with the generated birth year.',
          '5. Keep Records via History: Use the generator\'s History drawer to retrieve previously generated personas if a task requires multi-session continuity.'
        ]
      }
    ]
  },
  {
    slug: 'privacy-and-gdpr-compliance',
    title: 'Data Privacy Architecture & GDPR Compliance Standards',
    shortTitle: 'Privacy & GDPR Compliance',
    description: 'Why synthetic test personas are essential for GDPR, CCPA, and SOC 2 compliance. Learn about Vib Tools zero-retention client-side architecture.',
    category: 'Overview',
    lastUpdated: '2026-09-23',
    readTime: '6 min read',
    keywords: [
      'gdpr compliant test data',
      'synthetic data vs real pii',
      'zero retention fake identity generator',
      'data privacy compliance testing'
    ],
    sections: [
      {
        id: 'gdpr-risk-in-development',
        title: 'The Danger of Real PII in Staging Databases',
        content: [
          'Under the European Union General Data Protection Regulation (GDPR Article 6 and Article 32), storing real user Personally Identifiable Information (PII) in staging, local, or testing databases without explicit legal consent constitutes a serious data protection breach.',
          'Real customer names, addresses, and phone numbers in lower-tier environments frequently lead to catastrophic data leaks when developer laptops are lost or staging cloud servers are misconfigured.'
        ]
      },
      {
        id: 'zero-retention-architecture',
        title: 'Vib Tools Zero-Retention Client Architecture',
        content: [
          'Vib Tools is designed from the architectural layer to prevent any data leakage:',
          '• In-Memory Client Generation: All identities, phone numbers, and addresses are synthesized locally in browser RAM.',
          '• No Database Backend: There is no relational database, NoSQL cluster, or cache tracking generated identities.',
          '• No PII Cookies or Pixels: The site does not set third-party tracking cookies or ad network fingerprinting scripts.',
          '• Ephemeral API: The Edge API operates completely statelessly without request logging of generated payloads.'
        ]
      }
    ]
  }
];

export function getDocBySlug(slug: string): DocPage | undefined {
  return DOC_PAGES.find(doc => doc.slug === slug);
}
