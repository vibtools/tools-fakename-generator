import React from 'react';
import { ExternalLink, Github, Mail, Globe, MapPin, Phone, ShieldCheck, Heart, ShieldAlert, FileText, HelpCircle, Lock, Cookie, FileCheck } from 'lucide-react';

interface FooterProps {
  onOpenBlog?: () => void;
  onOpenDocs?: (slug?: string) => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenDisclaimer?: () => void;
  onOpenFaq?: () => void;
  onOpenCookies?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenBlog, 
  onOpenDocs,
  onOpenAbout,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
  onOpenFaq,
  onOpenCookies
}) => {
  return (
    <footer className="mt-12 border-t border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-xs space-y-8">
        
        {/* Top Grid: 4 Columns (Brand, Developer & Knowledge, Legal & Compliance, Contact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b border-slate-200/70 dark:border-slate-800/80">
          
          {/* Column 1: Brand & Core Statement */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <img 
                src="https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png" 
                alt="Vib Tools" 
                className="w-5 h-5 rounded object-contain shrink-0" 
              />
              <a 
                href="https://vib.tools/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Vib Tools</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
              Practical software for real workflows. Free, mathematically valid synthetic data and engineering utilities with zero ads.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-[11.5px]">
              {onOpenAbout && (
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  About Vib Tools &amp; Mission
                </button>
              )}
              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  Contact &amp; Support Form
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Knowledge & Developer Resources */}
          <div className="space-y-2.5">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Knowledge &amp; Docs</span>
            </div>
            <div className="flex flex-col gap-1.5 text-[11.5px] text-slate-600 dark:text-slate-400">
              {onOpenDocs && (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenDocs('getting-started')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                  >
                    Documentation Hub
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenDocs('api-reference')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                  >
                    Edge REST API Reference
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenDocs('tools-comparison-and-alternatives')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                  >
                    Tools Comparison (Top 8)
                  </button>
                </>
              )}
              {onOpenBlog && (
                <button
                  type="button"
                  onClick={onOpenBlog}
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer font-medium text-blue-600 dark:text-blue-400"
                >
                  Engineering &amp; QA Blog
                </button>
              )}
              {onOpenFaq && (
                <button
                  type="button"
                  onClick={onOpenFaq}
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  FAQ &amp; Help Center
                </button>
              )}
            </div>
          </div>

          {/* Column 3: Legal, Trust & Privacy */}
          <div className="space-y-2.5">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Legal &amp; Trust Center</span>
            </div>
            <div className="flex flex-col gap-1.5 text-[11.5px] text-slate-600 dark:text-slate-400">
              {onOpenPrivacy && (
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  Privacy Policy (GDPR / CCPA)
                </button>
              )}
              {onOpenTerms && (
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              )}
              {onOpenDisclaimer && (
                <button
                  type="button"
                  onClick={onOpenDisclaimer}
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  Synthetic Data Disclaimer
                </button>
              )}
              {onOpenCookies && (
                <button
                  type="button"
                  onClick={onOpenCookies}
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-left cursor-pointer"
                >
                  Cookie &amp; Storage Policy
                </button>
              )}
            </div>
          </div>

          {/* Column 4: Author & Contact */}
          <div className="space-y-2.5">
            <div className="font-semibold text-slate-900 dark:text-white">
              Author &amp; HQ
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
              <p>
                Maintained by{' '}
                <a 
                  href="https://github.com/victorsteele" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-slate-900 dark:text-slate-100 hover:underline"
                >
                  Md Nurnobi (@victorsteele)
                </a>
              </p>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <a href="mailto:hello@vib.tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  hello@vib.tools
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <a href="tel:+8801795470603" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  +880 1795-470603
                </a>
              </div>
              <div className="pt-1 flex items-center gap-2 text-xs">
                <a 
                  href="https://github.com/vibtools" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <a 
                  href="https://vib.tools/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  vib.tools
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Disclaimer Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>&copy; 2026</span>
            <a 
              href="https://vib.tools/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Vib Tools
            </a>
            <span>· All synthetic profiles are non-real test artifacts.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenPrivacy && (
              <button onClick={onOpenPrivacy} className="hover:underline cursor-pointer">
                Privacy
              </button>
            )}
            <span className="text-slate-300 dark:text-slate-700">·</span>
            {onOpenTerms && (
              <button onClick={onOpenTerms} className="hover:underline cursor-pointer">
                Terms
              </button>
            )}
            <span className="text-slate-300 dark:text-slate-700">·</span>
            {onOpenDisclaimer && (
              <button onClick={onOpenDisclaimer} className="hover:underline cursor-pointer">
                Disclaimer
              </button>
            )}
            <span className="text-slate-300 dark:text-slate-700">·</span>
            {onOpenFaq && (
              <button onClick={onOpenFaq} className="hover:underline cursor-pointer">
                FAQ
              </button>
            )}
            <span className="text-slate-300 dark:text-slate-700">·</span>
            {onOpenContact && (
              <button onClick={onOpenContact} className="hover:underline cursor-pointer">
                Contact
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
