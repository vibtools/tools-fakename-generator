import React, { useEffect } from 'react';
import { Cookie, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CookiePolicyPageProps {
  onBackToGenerator: () => void;
  onOpenPrivacy: () => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({
  onBackToGenerator,
  onOpenPrivacy
}) => {
  useEffect(() => {
    document.title = "Cookie Policy – LocalStorage & Tracking Transparency | Vib Tools";
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
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Cookie Policy</span>
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
            <Cookie className="w-3.5 h-3.5" />
            <span>Browser Storage &amp; Cookie Transparency</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cookie &amp; LocalStorage Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Effective Date: September 23, 2026 · Compliant with EU ePrivacy Directive &amp; GDPR
          </p>
        </header>

        {/* Highlight Box */}
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
          <h3 className="font-bold text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Zero Third-Party Advertising Cookies</span>
          </h3>
          <p className="text-xs text-emerald-900/90 dark:text-emerald-300 leading-relaxed">
            Vib Tools does NOT use tracking cookies, surveillance pixels, or behavioral advertising cookies. We only use essential browser <code className="font-mono text-xs">localStorage</code> to remember your UI preferences (dark mode and your saved favorite personas).
          </p>
        </div>

        <article className="space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              1. What Storage Mechanisms Do We Use?
            </h2>
            <p>
              Instead of placing HTTP tracking cookies on your device, we utilize modern HTML5 LocalStorage. The storage keys used are strictly operational:
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-slate-100">
                  <tr>
                    <th className="p-2.5">Key Name</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Duration</th>
                    <th className="p-2.5">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">fng_dark_mode</td>
                    <td className="p-2.5">LocalStorage</td>
                    <td className="p-2.5">Persistent</td>
                    <td className="p-2.5">Stores your light/dark theme toggle state.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">fng_favorites_v1</td>
                    <td className="p-2.5">LocalStorage</td>
                    <td className="p-2.5">Persistent</td>
                    <td className="p-2.5">Stores synthetic identities you star for quick reference in the History drawer.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              2. How to Clear Your LocalStorage Data
            </h2>
            <p>
              You can wipe all stored preferences at any time by clearing your browser cache/cookies or opening DevTools (F12) &gt; Application &gt; Local Storage &gt; Clear All.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              3. Questions &amp; More Information
            </h2>
            <p>
              For additional details on how we safeguard user privacy, please view our full{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-blue-600 dark:text-blue-400 font-semibold underline cursor-pointer"
              >
                Privacy Policy
              </button>.
            </p>
          </section>

        </article>

      </main>
    </div>
  );
};
