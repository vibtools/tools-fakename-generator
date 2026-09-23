import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Layers, History, Moon, Sun, RefreshCw, 
  ExternalLink, Menu, X, ChevronRight, Zap, BookOpen, FileText
} from 'lucide-react';

interface HeaderProps {
  onOpenBulk: () => void;
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  onOpenBlog?: () => void;
  onOpenDocs?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenFaq?: () => void;
  onOpenHome?: () => void;
  currentView?: 'generator' | 'blog' | 'blog-post' | 'docs' | 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'faq' | 'cookies' | '404';
  savedCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onGenerateQuick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBulk,
  onOpenHistory,
  onOpenGuide,
  onOpenBlog,
  onOpenDocs,
  onOpenAbout,
  onOpenContact,
  onOpenFaq,
  onOpenHome,
  currentView = 'generator',
  savedCount,
  darkMode,
  onToggleDarkMode,
  onGenerateQuick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header ref={menuRef} className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-12 sm:h-13 flex items-center justify-between gap-2">
        
        {/* Left: Mobile Sidebar Toggle + Brand/Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Mobile Menu / Sidebar Toggle (Left of Logo) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden relative w-7.5 h-7.5 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            ) : (
              <>
                <Menu className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[8.5px] font-bold bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xs">
                    {savedCount > 9 ? '•' : savedCount}
                  </span>
                )}
              </>
            )}
          </button>

          {/* Logo & Wordmark */}
          <button 
            type="button"
            onClick={(e) => {
              if (onOpenHome) {
                e.preventDefault();
                onOpenHome();
              }
            }}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <img 
              src="https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png" 
              alt="Vib Tools Logo" 
              className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-md object-contain transition-transform group-hover:scale-105 shadow-2xs shrink-0" 
            />
            <div className="flex flex-col">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-none">
                FakeName<span className="hidden xs:inline">Generator</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-normal text-slate-400 dark:text-slate-500 mt-0.5 leading-none">
                Realistic Biodata &amp; Microjob Data
              </span>
            </div>
          </button>
        </div>

        {/* Center: Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-normal text-slate-600 dark:text-slate-300">
          <button 
            type="button"
            onClick={onOpenBulk}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-[11.5px]"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Bulk CSV</span>
          </button>

          <button 
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-[11.5px]"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>History</span>
            {savedCount > 0 && (
              <span className="text-[10px] font-medium leading-none bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-800">
                {savedCount}
              </span>
            )}
          </button>

          <button 
            type="button"
            onClick={onOpenGuide}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-[11.5px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Microjob Tips</span>
          </button>

          <button 
            type="button"
            onClick={onOpenBlog}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[11.5px] ${
              currentView === 'blog' || currentView === 'blog-post'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>Blog</span>
          </button>

          <button 
            type="button"
            onClick={onOpenDocs}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[11.5px] ${
              currentView === 'docs'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Docs</span>
          </button>
        </nav>

        {/* Right: Only Theme Switcher & Vib Tools CTA on Mobile; + Generate on Desktop */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Primary Quick Generate Button (Desktop Only) */}
          <button
            type="button"
            onClick={onGenerateQuick}
            title="Generate New Identity (Spacebar)"
            className="hidden md:inline-flex items-center gap-1.5 px-3 h-7.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md transition-all active:scale-97 cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate</span>
          </button>

          {/* Compact Theme Toggle Button (Mobile & Desktop) */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-800 transition-all cursor-pointer hover:border-slate-300 dark:hover:border-slate-700"
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* Vib Tools Official CTA Button (Mobile & Desktop) */}
          <a
            href="https://vib.tools/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Vib Tools (https://vib.tools/)"
            className="h-7 sm:h-7.5 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 text-[11px] sm:text-[11.5px] font-medium text-amber-950 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-300/80 dark:border-amber-700/60 rounded-md transition-all active:scale-97 cursor-pointer shadow-2xs group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform shrink-0" />
            <span className="font-semibold tracking-tight">Vib Tools</span>
            <ExternalLink className="w-3 h-3 text-amber-700 dark:text-amber-400 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>

        </div>

      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/90 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg px-3 py-3 shadow-xl animate-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-2 gap-2 mb-2.5">
            {/* Bulk CSV Card */}
            <button
              type="button"
              onClick={() => {
                onOpenBulk();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-left transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">Bulk CSV</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate">Export 10-100</div>
              </div>
            </button>

            {/* History Card */}
            <button
              type="button"
              onClick={() => {
                onOpenHistory();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-left transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 relative">
                <History className="w-3.5 h-3.5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[8.5px] font-bold bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">History</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate">{savedCount} Saved</div>
              </div>
            </button>
          </div>

          {/* Microjob Tips Full Width */}
          <button
            type="button"
            onClick={() => {
              onOpenGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100/70 dark:hover:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/50 text-left transition-colors cursor-pointer mb-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-medium text-emerald-950 dark:text-emerald-200">Microjob Form Filling Guide</div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400">Tips for QA &amp; fast microtask verification</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Technical & QA Blog */}
          <button
            type="button"
            onClick={() => {
              if (onOpenBlog) onOpenBlog();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 hover:bg-blue-100/70 dark:hover:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50 text-left transition-colors cursor-pointer mb-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-medium text-blue-950 dark:text-blue-200">Engineering &amp; QA Blog</div>
                <div className="text-[10px] text-blue-700 dark:text-blue-400">Luhn formula, postal standards &amp; tutorials</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </button>

          {/* Documentation & API Reference */}
          <button
            type="button"
            onClick={() => {
              if (onOpenDocs) onOpenDocs();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-900/50 text-left transition-colors cursor-pointer mb-2.5"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-medium text-indigo-950 dark:text-indigo-200">Developer Documentation &amp; API</div>
                <div className="text-[10px] text-indigo-700 dark:text-indigo-400">Edge API, tool benchmarks &amp; algorithms</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          </button>

          {/* Quick Help & FAQ Links */}
          <div className="grid grid-cols-3 gap-1.5 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-[11px]">
            {onOpenFaq && (
              <button
                type="button"
                onClick={() => { onOpenFaq(); setMobileMenuOpen(false); }}
                className="py-1.5 px-2 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-center cursor-pointer"
              >
                FAQ / Help
              </button>
            )}
            {onOpenAbout && (
              <button
                type="button"
                onClick={() => { onOpenAbout(); setMobileMenuOpen(false); }}
                className="py-1.5 px-2 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-center cursor-pointer"
              >
                About Us
              </button>
            )}
            {onOpenContact && (
              <button
                type="button"
                onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
                className="py-1.5 px-2 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-center cursor-pointer"
              >
                Contact
              </button>
            )}
          </div>

          {/* Footer inside mobile menu */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Generate anytime using <b>Generate</b> bar below</span>
            </span>
            <a 
              href="https://vib.tools/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>vib.tools</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
