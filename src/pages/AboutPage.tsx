import React, { useEffect } from 'react';
import { 
  ShieldCheck, Sparkles, Cpu, Users, Globe2, Heart, 
  ArrowLeft, CheckCircle2, Award, Zap, Code2, ExternalLink 
} from 'lucide-react';

interface AboutPageProps {
  onBackToGenerator: () => void;
  onOpenContact: () => void;
  onOpenDocs: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToGenerator,
  onOpenContact,
  onOpenDocs
}) => {
  useEffect(() => {
    document.title = "About Us – Fake Name Generator by Vib Tools | Realistic Synthetic Personas";
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
            <span className="text-blue-600 dark:text-blue-400 font-semibold">About Us</span>
          </div>
          <button
            onClick={onBackToGenerator}
            className="px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all cursor-pointer shadow-2xs"
          >
            Launch Tool
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built by Vib Tools</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            About Vib Tools &amp; The Fake Name Generator Project
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Vib Tools Fake Name Generator was built to replace slow, ad-heavy legacy utilities with an instantaneous, 100% ad-free, mathematically verified synthetic identity engine for developers, QA engineers, privacy advocates, and digital workers worldwide.
          </p>
        </section>

        {/* Core Mission Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sub-8ms Client Generation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Synthesizes names, addresses, phone numbers, and check-digit credit cards locally in memory without full-page reloads.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero Data Logging</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We never store or log generated identities in a backend database. Your testing sessions remain 100% private and ephemeral.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Open Developer Standards</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              ISO/IEC 7812 Luhn checksum validation, official SSA 2011 SSN non-issuance rules, and free Edge REST API endpoints.
            </p>
          </div>
        </section>

        {/* Creator & Vib Tools Team Section */}
        <section className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Engineering Leadership &amp; Maintenance</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img 
              src="https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png" 
              alt="Md Nurnobi" 
              className="w-16 h-16 rounded-xl object-contain border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs" 
            />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Md Nurnobi (@victorsteele)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Connected Repository Maintainer &amp; Engineer &bull; Vib Tools
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Vib Tools builds practical desktop applications, self-hosted software, automation tooling, developer utilities, reusable frameworks, and open-source projects for real workflows.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                <a 
                  href="https://vib.tools/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>vib.tools</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <a 
                  href="https://github.com/victorsteele" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline"
                >
                  GitHub Profile
                </a>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                >
                  Contact Engineering Team
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Synthetic Data Matters */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Our Philosophy: Ethical Testing &amp; Data Privacy
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Modern web development requires testing complex checkout forms, registration funnels, and CRM ingestion pipelines with lifelike inputs. However, using real customer personal data in staging environments violates international data protection regulations (including GDPR Article 6 &amp; CCPA).
            </p>
            <p>
              Our tool bridges this gap by generating algorithmically realistic but strictly non-real personas. No actual credit cards are charged, no real individuals are targeted, and staging databases remain compliant with zero PII liabilities.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};
