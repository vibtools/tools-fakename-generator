import React from 'react';
import { 
  ShieldCheck, CheckCircle2, HelpCircle, Code2, 
  Layers, Lock, Globe2, FileSpreadsheet, Cpu, BookOpen, FileText, ArrowRight
} from 'lucide-react';

interface SeoContentProps {
  onOpenBlog?: () => void;
  onOpenPost?: (slug: string) => void;
  onOpenDocs?: (slug?: string) => void;
}

export const SeoContent: React.FC<SeoContentProps> = ({ onOpenBlog, onOpenPost, onOpenDocs }) => {
  return (
    <article className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800 space-y-8 text-slate-700 dark:text-slate-300">
      
      {/* 1. Main Heading & Strategic Introduction */}
      <section className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Fake Name Generator – Realistic Synthetic Identities, Addresses &amp; QA Test Data
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Welcome to the official <strong>Fake Name Generator</strong> by <strong>Vib Tools</strong>—the premier developer and tester utility engineered to generate 100% realistic, mathematically verified synthetic personas. Whether you need a <span className="text-slate-900 dark:text-slate-200 font-medium">random address generator</span> with regional postal codes, a <span className="text-slate-900 dark:text-slate-200 font-medium">test credit card generator</span> with Luhn checksum validation, or a <span className="text-slate-900 dark:text-slate-200 font-medium">bulk fake name generator CSV</span> for database seeding, our engine produces complete biodata across 24 countries without exposing any real personal identifiable information (PII).
        </p>
      </section>

      {/* 2. Step-by-Step Workflow (How It Works) */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>How It Works: 3-Step Synthetic Identity Generation</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-200 dark:border-blue-900">
              1
            </div>
            <h3 className="font-semibold text-xs text-slate-900 dark:text-white">Select Region &amp; Parameters</h3>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Choose your target country (24 regions), nameset format, and gender toggle (Random, Male, or Female). Fine-tune age ranges, middle initials, and email domain types.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-200 dark:border-blue-900">
              2
            </div>
            <h3 className="font-semibold text-xs text-slate-900 dark:text-white">Instant Algorithmic Synthesis</h3>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Our generator executes client-side algorithms to pair authentic first/last names with valid city-state-zip combinations, telephone area codes, and Luhn-valid test credit card numbers.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-200 dark:border-blue-900">
              3
            </div>
            <h3 className="font-semibold text-xs text-slate-900 dark:text-white">1-Tap Copy &amp; CSV Export</h3>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Copy individual fields (Street, City, Zip, Phone, SSN) with a single tap, copy the entire profile text, or export up to 100 profiles as a structured RFC 4180 CSV file.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Key Technical Advantages & Features */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Key Technical Advantages for QA Engineers &amp; Testers</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div className="p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Luhn Checksum (MOD 10) Validated Cards</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Generates sandbox test credit cards (Visa, Mastercard, Amex, Discover) strictly adhering to ISO/IEC 7812 checksum requirements for payment gateway testing.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Region-Specific Postal Code Formatting</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Zip codes, UK postcodes (SW1A), Canadian postal codes (A1A 1A1), and Australian postcodes are verified to pass front-end input masks and API validators.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Microjob Form Verification &amp; Quick-Fill</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Specifically optimized for workers and testers on platforms like Appen, Remotasks, Clickworker, and MTurk who require rapid, reliable mock data entry.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Bulk Data Export &amp; Cloudflare Edge API</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Supports headless automation and bulk export. Access programmatically through our Cloudflare Pages Functions endpoint (<code className="text-blue-600 dark:text-blue-400">/api/generate</code>).
            </p>
          </div>

        </div>
      </section>

      {/* 4. Security, Privacy & Zero-Data Storage Guarantee */}
      <section className="p-4 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-blue-950 dark:text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Zero-Data Storage &amp; Privacy Guarantee (E-E-A-T)</span>
        </div>
        <p className="text-[11.5px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          At <strong>Vib Tools</strong>, ethical engineering is paramount. All identities generated on this platform are completely synthetic. <strong>We do not track, log, or store generated identities on remote servers.</strong> All calculations, randomizations, and formatting run client-side in your web browser. This tool should only be used for software engineering QA, education, automated testing, and mock dataset seeding.
        </p>
      </section>

      {/* 5. Rich FAQ Section with Semantic HTML (<details>/<summary>) matching Google FAQPage Schema */}
      <section className="space-y-3" id="faq">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Frequently Asked Questions (FAQ)</span>
        </h2>
        
        <div className="space-y-2 text-xs">
          
          <details className="group border border-slate-200/80 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/60 overflow-hidden transition-colors">
            <summary className="p-3 font-medium text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span>What is a Fake Name Generator and what is it used for?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-sm">▼</span>
            </summary>
            <div className="px-3 pb-3 pt-1 text-slate-600 dark:text-slate-400 text-[11.5px] leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
              A fake name generator is a developer and QA tool that algorithmically generates realistic synthetic personas—including localized names, valid street addresses, postal codes, test credit card numbers, phone numbers, and employment details. It is used to test web forms, simulate microjob tasks, populate development databases, and protect personal privacy during demo recordings.
            </div>
          </details>

          <details className="group border border-slate-200/80 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/60 overflow-hidden transition-colors">
            <summary className="p-3 font-medium text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span>Are the generated credit cards and addresses real?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-sm">▼</span>
            </summary>
            <div className="px-3 pb-3 pt-1 text-slate-600 dark:text-slate-400 text-[11.5px] leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
              No. All data is synthetically produced. The test credit cards pass the mathematical Luhn MOD 10 algorithm check used by payment gateway validation forms, but they possess zero funds and cannot be charged. Addresses utilize authentic city, state, and postal code conventions without representing real residential individuals.
            </div>
          </details>

          <details className="group border border-slate-200/80 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/60 overflow-hidden transition-colors">
            <summary className="p-3 font-medium text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span>Which countries and localized namesets are supported?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-sm">▼</span>
            </summary>
            <div className="px-3 pb-3 pt-1 text-slate-600 dark:text-slate-400 text-[11.5px] leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
              Our generator supports 24 countries: United States (US), United Kingdom (GB), Canada (CA), Australia (AU), Germany (DE), France (FR), Spain (ES), Switzerland (CH), Denmark (DK), Finland (FI), Ireland (IE), India (IN), Iran (IR), Mexico (MX), Netherlands (NL), Norway (NO), New Zealand (NZ), Serbia (RS), Turkey (TR), Ukraine (UA), Brazil (BR), Bangladesh (BD), Italy (IT), and Japan (JP), paired with 12 authentic localized namesets.
            </div>
          </details>

          <details className="group border border-slate-200/80 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/60 overflow-hidden transition-colors">
            <summary className="p-3 font-medium text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span>Can I download bulk fake identities in CSV format?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-sm">▼</span>
            </summary>
            <div className="px-3 pb-3 pt-1 text-slate-600 dark:text-slate-400 text-[11.5px] leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
              Yes. Click the &ldquo;Bulk (CSV)&rdquo; button in the top navigation header to generate between 10 and 100 complete synthetic identity profiles. You can configure custom country distributions, genders, age bounds, and download a structured CSV file ready for database seeding or automated testing suites.
            </div>
          </details>

          <details className="group border border-slate-200/80 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/60 overflow-hidden transition-colors">
            <summary className="p-3 font-medium text-slate-900 dark:text-white flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span>Is there an API available for automated script execution?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-sm">▼</span>
            </summary>
            <div className="px-3 pb-3 pt-1 text-slate-600 dark:text-slate-400 text-[11.5px] leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
              Yes. The platform includes a Cloudflare Edge Pages Function at <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">/api/generate</code>. You can send GET or POST requests with query parameters (e.g., <code className="text-slate-500">?country=US&amp;gender=female&amp;count=5</code>) to receive raw JSON responses directly in your CI/CD test pipelines.
            </div>
          </details>

        </div>
      </section>

      {/* 5. Featured Technical Knowledge Base & Guides */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Developer, QA &amp; Privacy Engineering Guides</span>
          </h2>
          {onOpenBlog && (
            <button
              type="button"
              onClick={onOpenBlog}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              View all 10 guides →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div 
            onClick={() => onOpenPost ? onOpenPost('best-fake-name-generator-alternatives-compared') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border-2 border-blue-500/40 dark:border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              🏆 Comparison Matrix · 2026 Guide
            </span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              Top 7 Best Fake Name Generators: FakeNameGenerator.com Alternatives Compared
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              Compare FakeNameGenerator.com, RandomUser.me, Mockaroo, and Vib Tools on speed, ad-free UI, Luhn cards, and bulk exports.
            </p>
          </div>

          <div 
            onClick={() => onOpenPost ? onOpenPost('fake-ssn-generator-rules-and-testing') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-slate-400 font-medium">🔢 Engineering</span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              How Fake SSNs Work: US Social Security Number Format &amp; Rules
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              Detailed breakdown of the 9-digit SSN structure (AAA-GG-SSSS), reserved area prefixes (900-999, 666, 000), and test regex rules.
            </p>
          </div>

          <div 
            onClick={() => onOpenPost ? onOpenPost('luhn-algorithm-test-credit-cards') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-slate-400 font-medium">💳 QA Testing</span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              Understanding the Luhn Algorithm: Valid Test Credit Cards for Payment QA
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              Learn how the ISO/IEC 7812 MOD 10 checksum operates and how developers simulate checkout flows safely.
            </p>
          </div>

          <div 
            onClick={() => onOpenPost ? onOpenPost('why-use-a-fake-name-legitimate-reasons') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-slate-400 font-medium">🕵️‍♂️ Privacy &amp; Anonymity</span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              10 Legitimate Reasons to Use a Fake Name &amp; Synthetic Persona Online
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              Why privacy advocates, researchers, writers, and citizens generate pseudonyms to avoid data aggregation and spam.
            </p>
          </div>

          <div 
            onClick={() => onOpenPost ? onOpenPost('automated-form-testing-playwright-cypress') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-slate-400 font-medium">🤖 Automation &amp; APIs</span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              Automated Form Testing with Cypress &amp; Playwright Using Synthetic Personas
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              Integrate synthetic identity APIs directly into automated E2E test suites with runnable TypeScript examples.
            </p>
          </div>

          <div 
            onClick={() => onOpenPost ? onOpenPost('character-names-for-writers-game-developers') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-slate-400 font-medium">🎭 Creative &amp; Writing</span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              Generating Believable Character Names for Fiction &amp; Game Design
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              How authors and D&amp;D dungeon masters generate culturally authentic character names and NPC biodata sheets.
            </p>
          </div>

          <div 
            onClick={() => onOpenPost ? onOpenPost('address-validation-ecommerce-checkout-testing') : onOpenBlog?.()}
            className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer space-y-1.5 group"
          >
            <span className="text-xs text-slate-400 font-medium">📦 QA Testing</span>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              How to Test E-Commerce Address Validation &amp; Shipping Form Workflows
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              Test address normalization (USPS CASS, FedEx, UPS), apartment line numbers, and delivery checkout edge cases.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Official Developer Documentation & API Reference Hub */}
      {onOpenDocs && (
        <section className="p-4 sm:p-5 rounded-xl border border-indigo-200/70 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/30 dark:from-indigo-950/20 dark:via-slate-900 dark:to-blue-950/20 space-y-3 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Official Developer Documentation &amp; API Reference
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenDocs('getting-started')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <span>Explore all documentation pages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Need to automate test personas in CI/CD, seed databases via cURL/TypeScript, or benchmark fake identity tools? Browse our technical documentation hubs:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onOpenDocs('getting-started')}
              className="p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 text-left transition-all cursor-pointer"
            >
              <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">🚀 Quickstart</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Shortcuts &amp; 1-tap dock</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenDocs('api-reference')}
              className="p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 text-left transition-all cursor-pointer"
            >
              <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">⚡ Edge REST API</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">JSON schema &amp; endpoints</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenDocs('tools-comparison-and-alternatives')}
              className="p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 text-left transition-all cursor-pointer"
            >
              <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">🏆 Tool Comparison</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Top 8 generators evaluated</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenDocs('algorithms-and-validation')}
              className="p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 text-left transition-all cursor-pointer"
            >
              <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">📐 Algorithms</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Luhn Mod 10 &amp; SSA SSN</span>
            </button>
          </div>
        </section>
      )}

    </article>
  );
};
