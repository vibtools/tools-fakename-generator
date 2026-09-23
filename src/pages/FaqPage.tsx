import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, ArrowLeft, 
  Sparkles, CheckCircle2, ShieldCheck, Zap, Code2, BookOpen 
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'General' | 'Credit Cards & Finance' | 'Addresses & SSN' | 'API & Developers' | 'Legal & Privacy';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Is Vib Tools Fake Name Generator completely free to use?',
    answer: 'Yes, 100% free with zero advertisements, paywalls, or premium tiers. You can generate unlimited individual identities, use keyboard shortcuts, and export bulk CSV files up to 100 records per batch without creating an account.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'How does Vib Tools compare to FakeNameGenerator.com or RandomUser.me?',
    answer: 'Unlike legacy generators with heavy banner ads and full-page reloads, Vib Tools delivers instantaneous sub-8ms client-side generation, a floating 1-tap quick copy dock, ISO/IEC 7812 Luhn-valid test cards, 24 country postal alignments, and a free Edge REST API.'
  },
  {
    id: 'faq-3',
    category: 'Credit Cards & Finance',
    question: 'Are the generated credit cards real or can they be used to buy items?',
    answer: 'No. The generated test credit card numbers are strictly for software validation (such as testing if your checkout form correctly verifies the Luhn Mod 10 checksum algorithm and card brand IIN prefix). They have no monetary balance and will be rejected by real payment processors like Stripe or PayPal.'
  },
  {
    id: 'faq-4',
    category: 'Credit Cards & Finance',
    question: 'How do you generate valid Luhn check digits?',
    answer: 'We compute card digits using the ISO/IEC 7812 standard Modulo 10 algorithm. Starting from the rightmost digit, every second number is doubled (with digits > 9 summed), and the total sum modulo 10 equals 0.'
  },
  {
    id: 'faq-5',
    category: 'Addresses & SSN',
    question: 'Are the generated US Social Security Numbers (SSNs) valid?',
    answer: 'They are formatted correctly according to SSA 2011 standards (XXX-XX-XXXX), but specifically use non-issued area prefixes (such as the reserved 900–999 series, 000, or 666). They do not belong to real living individuals.'
  },
  {
    id: 'faq-6',
    category: 'Addresses & SSN',
    question: 'Do international postal codes match real cities?',
    answer: 'Yes. Across 24 supported countries (US, UK, Germany, France, Canada, Australia, Japan, India, etc.), our database matches valid postal code ranges and formatting regexes to authentic cities and states.'
  },
  {
    id: 'faq-7',
    category: 'API & Developers',
    question: 'Is there a REST API for automated CI/CD and Playwright testing?',
    answer: 'Yes! You can fetch personas via GET/POST https://fakenamegenerator.vib.tools/api/generate. No API key is required, CORS is enabled, and responses resolve in sub-25ms from Cloudflare edge locations.'
  },
  {
    id: 'faq-8',
    category: 'API & Developers',
    question: 'Can I export bulk data to seed my PostgreSQL or MongoDB database?',
    answer: 'Yes. Use the "Bulk CSV" button in the top navigation to download batches of 10, 25, 50, or 100 identities in standard CSV or JSON format formatted for Prisma, Drizzle, or direct SQL INSERT queries.'
  },
  {
    id: 'faq-9',
    category: 'Legal & Privacy',
    question: 'Do you log or store my generated identities on a server?',
    answer: 'No. We operate on a strict Zero-Retention client-side architecture. Identities are synthesized dynamically in your browser RAM and are never stored in a central database.'
  },
  {
    id: 'faq-10',
    category: 'Legal & Privacy',
    question: 'Is using a fake name generator legal for testing?',
    answer: 'Yes. Generating synthetic data for QA testing, staging environments, UI design, privacy protection on public forms, and creative writing is 100% legal. It is illegal only if used for fraudulent transactions or identity impersonation.'
  }
];

interface FaqPageProps {
  onBackToGenerator: () => void;
  onOpenDocs: () => void;
  onOpenContact: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onBackToGenerator,
  onOpenDocs,
  onOpenContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openItemIds, setOpenItemIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
    'faq-7': true
  });

  const categories = ['All', 'General', 'Credit Cards & Finance', 'Addresses & SSN', 'API & Developers', 'Legal & Privacy'];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = !searchQuery.trim() || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    document.title = "FAQ & Help Center – Fake Name Generator | Vib Tools";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inject FAQPage Schema
    const scriptId = 'faq-jsonld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    script.text = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  const toggleItem = (id: string) => {
    setOpenItemIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      
      {/* Breadcrumb Header */}
      <div className="sticky top-12 sm:top-13 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Generator</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">FAQ &amp; Help</span>
          </div>
          <button
            onClick={onBackToGenerator}
            className="px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all cursor-pointer shadow-2xs"
          >
            Launch Tool
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center &amp; Frequently Asked Questions</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Everything you need to know about synthetic identities, ISO/IEC 7812 Luhn checksums, API integration, and privacy compliance.
          </p>
        </header>

        {/* Search & Category Filter Bar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions (e.g. Luhn, SSN, API, CSV)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer text-[11.5px] ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <p className="text-xs text-slate-400">No questions matched your search query.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map(faq => {
              const isOpen = !!openItemIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/40">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-5 rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Still have questions or need a custom API integration?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Read our developer docs or talk directly to our engineering team.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenDocs}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 cursor-pointer"
            >
              Read Docs
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-2xs"
            >
              Contact Us
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};
