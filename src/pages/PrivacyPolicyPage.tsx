import React, { useEffect } from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, ArrowLeft, CheckCircle2, Globe } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToGenerator: () => void;
  onOpenContact: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToGenerator,
  onOpenContact
}) => {
  useEffect(() => {
    document.title = "Privacy Policy – Zero-Retention Architecture & GDPR Compliance | Vib Tools";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Privacy Policy</span>
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GDPR &amp; CCPA Compliant Zero-Retention Policy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy &amp; Data Protection Standards
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last Updated &amp; Effective Date: September 23, 2026 · Maintained by Vib Tools
          </p>
        </header>

        {/* Highlight Callout Box */}
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200 font-bold text-xs sm:text-sm">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Zero-Retention Architecture Summary</span>
          </div>
          <p className="text-xs text-emerald-900/90 dark:text-emerald-300 leading-relaxed">
            Vib Tools Fake Name Generator does NOT collect, store, transmit, or monetize any personal identity data. Synthetic profiles and test card numbers are generated entirely in client-side browser memory (RAM) and destroyed upon tab closure.
          </p>
        </div>

        {/* Content Sections */}
        <article className="space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              1. Information We Do NOT Collect
            </h2>
            <p>
              Unlike legacy websites, we do not require account registration, email addresses, phone numbers, or credit card details to use this tool. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>No logging of generated names, SSNs, credit card numbers, or addresses.</li>
              <li>No association between user IP addresses and generated test records.</li>
              <li>No resale or syndication of user search terms or data exports to third parties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              2. How Data is Generated (Client-Side Architecture)
            </h2>
            <p>
              All synthetic identities are produced locally on your device using deterministic TypeScript and WebAssembly algorithms. When you click "Generate" or export a CSV file, data calculation executes inside your browser sandbox. No generated profiles are sent to a central backend database.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              3. LocalStorage &amp; Browser Cache
            </h2>
            <p>
              We utilize your browser’s native <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono">localStorage</code> exclusively for user experience preferences:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li><strong>Dark Mode Preference:</strong> Saves your theme selection (<code className="text-xs font-mono">fng_dark_mode</code>).</li>
              <li><strong>Saved Profiles / History:</strong> Saves personas you explicitly choose to star/favorite (<code className="text-xs font-mono">fng_favorites_v1</code>). This remains 100% offline on your device.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              4. Third-Party Services &amp; Network Delivery
            </h2>
            <p>
              Our application is hosted via Cloudflare Pages edge network for DDoS protection, SSL encryption, and high-speed content delivery. Standard non-identifying HTTP server logs (such as request timestamps and edge response codes) are processed strictly for uptime and security monitoring.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              5. European Union (GDPR) &amp; California (CCPA) Rights
            </h2>
            <p>
              Because we do not store personal data or maintain user accounts, there is no personal data record to delete, rectify, or export under GDPR Articles 15–20. Users retain total control by clearing their browser cache and LocalStorage at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              6. Data Protection Officer &amp; Contact
            </h2>
            <p>
              If you have inquiries regarding privacy practices or technical compliance, contact our team:
            </p>
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <p><strong>Vib Tools Privacy &amp; Compliance Team</strong></p>
              <p>Email: <a href="mailto:teamdarkdevil24@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">teamdarkdevil24@gmail.com</a></p>
              <p>Website: <a href="https://vib.tools/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://vib.tools/</a></p>
            </div>
          </section>

        </article>

      </main>
    </div>
  );
};
