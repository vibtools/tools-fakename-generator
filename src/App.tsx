import React, { useState, useEffect, useCallback } from 'react';
import { FakeIdentity, GeneratorOptions } from './types';
import { generateIdentity } from './utils/generator';
import { fetchRandomUserIdentity } from './services/randomUserApi';
import { Header } from './components/Header';
import { ControlBar } from './components/ControlBar';
import { ProfileCard } from './components/ProfileCard';
import { DataSections } from './components/DataSections';
import { QuickCopyDock } from './components/QuickCopyDock';
import { BulkGeneratorModal } from './components/BulkGeneratorModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { MicrojobGuideModal } from './components/MicrojobGuideModal';
import { SeoContent } from './components/SeoContent';
import { Footer } from './components/Footer';
import { BlogList, BlogPostView, BLOG_POSTS } from './blog';
import { DocsLayout, getDocBySlug } from './docs';
import { 
  AboutPage, ContactPage, PrivacyPolicyPage, TermsPage, 
  DisclaimerPage, FaqPage, CookiePolicyPage, NotFoundPage 
} from './pages';
import { Check, Sparkles, Shield, Info, Layers, RefreshCw } from 'lucide-react';

const DEFAULT_OPTIONS: GeneratorOptions = {
  gender: 'random',
  nameSet: 'american',
  country: 'US',
  minAge: 20,
  maxAge: 62,
  middleInitial: true,
  emailDomainType: 'realistic'
};

export default function App() {
  const [options, setOptions] = useState<GeneratorOptions>(() => {
    try {
      const saved = localStorage.getItem('fng_options');
      return saved ? JSON.parse(saved) : DEFAULT_OPTIONS;
    } catch {
      return DEFAULT_OPTIONS;
    }
  });

  const [currentIdentity, setCurrentIdentity] = useState<FakeIdentity>(() => 
    generateIdentity(DEFAULT_OPTIONS)
  );

  const [history, setHistory] = useState<FakeIdentity[]>(() => {
    try {
      const saved = localStorage.getItem('fng_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<FakeIdentity[]>(() => {
    try {
      const saved = localStorage.getItem('fng_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fng_theme');
      if (saved) return saved === 'dark';
      return false; // Default theme is strictly LIGHT
    } catch {
      return false;
    }
  });

  // Client-Side SEO-friendly Routing for Blog, Docs, Legal & Generator
  const [currentView, setCurrentView] = useState<
    'generator' | 'blog' | 'blog-post' | 'docs' | 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'faq' | 'cookies' | '404'
  >(() => {
    if (typeof window === 'undefined') return 'generator';
    const path = window.location.pathname;
    if (path === '/blog' || path === '/blog/') return 'blog';
    if (path.startsWith('/blog/')) return 'blog-post';
    if (path === '/docs' || path === '/docs/' || path.startsWith('/docs/')) return 'docs';
    if (path === '/about' || path === '/about/') return 'about';
    if (path === '/contact' || path === '/contact/') return 'contact';
    if (path === '/privacy' || path === '/privacy/') return 'privacy';
    if (path === '/terms' || path === '/terms/') return 'terms';
    if (path === '/disclaimer' || path === '/disclaimer/') return 'disclaimer';
    if (path === '/faq' || path === '/faq/') return 'faq';
    if (path === '/cookies' || path === '/cookies/') return 'cookies';
    if (path === '/' || path === '') return 'generator';
    return '404';
  });

  const [currentPostSlug, setCurrentPostSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
      return slug || null;
    }
    return null;
  });

  const [currentDocSlug, setCurrentDocSlug] = useState<string>(() => {
    if (typeof window === 'undefined') return 'getting-started';
    const path = window.location.pathname;
    if (path.startsWith('/docs/')) {
      const slug = path.replace(/^\/docs\//, '').replace(/\/$/, '');
      return slug || 'getting-started';
    }
    return 'getting-started';
  });

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/blog' || path === '/blog/') {
        setCurrentView('blog');
        setCurrentPostSlug(null);
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
        setCurrentView('blog-post');
        setCurrentPostSlug(slug);
      } else if (path === '/docs' || path === '/docs/') {
        setCurrentView('docs');
        setCurrentDocSlug('getting-started');
      } else if (path.startsWith('/docs/')) {
        const slug = path.replace(/^\/docs\//, '').replace(/\/$/, '');
        setCurrentView('docs');
        setCurrentDocSlug(slug || 'getting-started');
      } else if (path === '/about' || path === '/about/') {
        setCurrentView('about');
        setCurrentPostSlug(null);
      } else if (path === '/contact' || path === '/contact/') {
        setCurrentView('contact');
        setCurrentPostSlug(null);
      } else if (path === '/privacy' || path === '/privacy/') {
        setCurrentView('privacy');
        setCurrentPostSlug(null);
      } else if (path === '/terms' || path === '/terms/') {
        setCurrentView('terms');
        setCurrentPostSlug(null);
      } else if (path === '/disclaimer' || path === '/disclaimer/') {
        setCurrentView('disclaimer');
        setCurrentPostSlug(null);
      } else if (path === '/faq' || path === '/faq/') {
        setCurrentView('faq');
        setCurrentPostSlug(null);
      } else if (path === '/cookies' || path === '/cookies/') {
        setCurrentView('cookies');
        setCurrentPostSlug(null);
      } else if (path === '/' || path === '') {
        setCurrentView('generator');
        setCurrentPostSlug(null);
      } else {
        setCurrentView('404');
        setCurrentPostSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goToBlog = useCallback(() => {
    setCurrentView('blog');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/blog') {
      window.history.pushState({}, '', '/blog');
    }
  }, []);

  const goToPost = useCallback((slug: string) => {
    setCurrentView('blog-post');
    setCurrentPostSlug(slug);
    if (window.location.pathname !== `/blog/${slug}`) {
      window.history.pushState({}, '', `/blog/${slug}`);
    }
  }, []);

  const goToDocs = useCallback((slug?: string) => {
    const targetSlug = slug || 'getting-started';
    setCurrentView('docs');
    setCurrentDocSlug(targetSlug);
    const targetUrl = targetSlug === 'getting-started' ? '/docs' : `/docs/${targetSlug}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
  }, []);

  const goToAbout = useCallback(() => {
    setCurrentView('about');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/about') {
      window.history.pushState({}, '', '/about');
    }
  }, []);

  const goToContact = useCallback(() => {
    setCurrentView('contact');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/contact') {
      window.history.pushState({}, '', '/contact');
    }
  }, []);

  const goToPrivacy = useCallback(() => {
    setCurrentView('privacy');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/privacy') {
      window.history.pushState({}, '', '/privacy');
    }
  }, []);

  const goToTerms = useCallback(() => {
    setCurrentView('terms');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/terms') {
      window.history.pushState({}, '', '/terms');
    }
  }, []);

  const goToDisclaimer = useCallback(() => {
    setCurrentView('disclaimer');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/disclaimer') {
      window.history.pushState({}, '', '/disclaimer');
    }
  }, []);

  const goToFaq = useCallback(() => {
    setCurrentView('faq');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/faq') {
      window.history.pushState({}, '', '/faq');
    }
  }, []);

  const goToCookies = useCallback(() => {
    setCurrentView('cookies');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/cookies') {
      window.history.pushState({}, '', '/cookies');
    }
  }, []);

  const goToGenerator = useCallback(() => {
    setCurrentView('generator');
    setCurrentPostSlug(null);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    document.title = "Fake Name Generator – Realistic Identities, Addresses & Test Data | Vib Tools";
  }, []);

  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fng_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fng_theme', 'light');
    }
  }, [darkMode]);

  // Save history & favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fng_history', JSON.stringify(history.slice(0, 30)));
    } catch {}
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('fng_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('fng_options', JSON.stringify(options));
    } catch {}
  }, [options]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const newId = await fetchRandomUserIdentity(options);
      setCurrentIdentity(newId);
      // Add to history (avoid duplicates at the top)
      setHistory((prev) => [newId, ...prev.filter(p => p.id !== newId.id)].slice(0, 35));
    } catch (e) {
      console.warn('RandomUser generation failed, using built-in fallback:', e);
      const fallbackId = generateIdentity(options);
      fallbackId.dataSource = 'built-in';
      setCurrentIdentity(fallbackId);
      setHistory((prev) => [fallbackId, ...prev.filter(p => p.id !== fallbackId.id)].slice(0, 35));
    } finally {
      setIsGenerating(false);
    }
  }, [options]);

  // Initial fetch on mount to load fresh RandomUser data with portrait
  useEffect(() => {
    let active = true;
    fetchRandomUserIdentity(options).then((initId) => {
      if (active && initId) {
        setCurrentIdentity(initId);
      }
    }).catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Spacebar hotkey to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or select
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'TEXTAREA' ||
        isBulkOpen || 
        isHistoryOpen || 
        isGuideOpen
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate, isBulkOpen, isHistoryOpen, isGuideOpen]);

  const handleCopyField = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setToastMessage(`Copied ${label} to clipboard!`);

    setTimeout(() => {
      setCopiedLabel((current) => (current === label ? null : current));
    }, 1800);

    setTimeout(() => {
      setToastMessage((current) => (current ? null : current));
    }, 2400);
  };

  const handleToggleFavorite = (identity: FakeIdentity) => {
    setFavorites((prev) => {
      const exists = prev.some(f => f.id === identity.id);
      if (exists) {
        return prev.filter(f => f.id !== identity.id);
      } else {
        return [identity, ...prev];
      }
    });
  };

  const isCurrentFavorite = favorites.some(f => f.id === currentIdentity.id);
  const selectedBlogPost = currentPostSlug 
    ? (BLOG_POSTS.find(p => p.slug === currentPostSlug) || BLOG_POSTS[0])
    : null;

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-600 selection:text-white pb-20">
      
      {/* Top Header */}
      <Header
        onOpenBulk={() => setIsBulkOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenBlog={goToBlog}
        onOpenDocs={goToDocs}
        onOpenAbout={goToAbout}
        onOpenContact={goToContact}
        onOpenFaq={goToFaq}
        onOpenHome={goToGenerator}
        currentView={currentView}
        savedCount={favorites.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onGenerateQuick={handleGenerate}
      />

      {/* Developer Documentation & API Reference View */}
      {currentView === 'docs' && (
        <main className="flex-1 w-full">
          <DocsLayout
            currentSlug={currentDocSlug}
            onSelectDoc={goToDocs}
            onBackToGenerator={goToGenerator}
            onOpenBlog={goToBlog}
          />
        </main>
      )}

      {/* Blog Directory View */}
      {currentView === 'blog' && (
        <main className="flex-1 w-full">
          <BlogList 
            onSelectPost={goToPost} 
            onBackToHome={goToGenerator} 
          />
        </main>
      )}

      {/* Individual In-Depth Blog Article View */}
      {currentView === 'blog-post' && selectedBlogPost && (
        <main className="flex-1 w-full">
          <BlogPostView 
            post={selectedBlogPost}
            onBackToBlog={goToBlog}
            onOpenGenerator={goToGenerator}
            onSelectPost={goToPost}
          />
        </main>
      )}

      {/* About Us View */}
      {currentView === 'about' && (
        <main className="flex-1 w-full">
          <AboutPage 
            onBackToGenerator={goToGenerator}
            onOpenContact={goToContact}
            onOpenDocs={() => goToDocs('getting-started')}
          />
        </main>
      )}

      {/* Contact Us View */}
      {currentView === 'contact' && (
        <main className="flex-1 w-full">
          <ContactPage 
            onBackToGenerator={goToGenerator}
          />
        </main>
      )}

      {/* Privacy Policy View */}
      {currentView === 'privacy' && (
        <main className="flex-1 w-full">
          <PrivacyPolicyPage 
            onBackToGenerator={goToGenerator}
            onOpenContact={goToContact}
          />
        </main>
      )}

      {/* Terms & Conditions View */}
      {currentView === 'terms' && (
        <main className="flex-1 w-full">
          <TermsPage 
            onBackToGenerator={goToGenerator}
            onOpenDisclaimer={goToDisclaimer}
          />
        </main>
      )}

      {/* Legal Disclaimer View */}
      {currentView === 'disclaimer' && (
        <main className="flex-1 w-full">
          <DisclaimerPage 
            onBackToGenerator={goToGenerator}
            onOpenTerms={goToTerms}
          />
        </main>
      )}

      {/* FAQ & Help View */}
      {currentView === 'faq' && (
        <main className="flex-1 w-full">
          <FaqPage 
            onBackToGenerator={goToGenerator}
            onOpenDocs={() => goToDocs('getting-started')}
            onOpenContact={goToContact}
          />
        </main>
      )}

      {/* Cookie Policy View */}
      {currentView === 'cookies' && (
        <main className="flex-1 w-full">
          <CookiePolicyPage 
            onBackToGenerator={goToGenerator}
            onOpenPrivacy={goToPrivacy}
          />
        </main>
      )}

      {/* 404 Not Found View */}
      {currentView === '404' && (
        <main className="flex-1 w-full">
          <NotFoundPage 
            onBackToGenerator={goToGenerator}
            onOpenDocs={() => goToDocs('getting-started')}
            onOpenBlog={goToBlog}
            onOpenFaq={goToFaq}
          />
        </main>
      )}

      {/* Primary Generator View */}
      {currentView === 'generator' && (
        <main className="flex-1 max-w-5xl mx-auto px-3 sm:px-6 py-4 w-full space-y-3.5">
          
          {/* Sub-header Context Banner - Compact on Mobile */}
          <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-2xs">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-[11.5px] sm:text-[12px] font-normal text-slate-600 dark:text-slate-300 truncate">
                <span className="font-medium text-slate-800 dark:text-slate-200">Mode:</span> Verified Zip codes &amp; Luhn-checked cards
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] shrink-0">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-normal cursor-pointer"
              >
                Tips
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <span className="hidden sm:inline text-slate-400 font-normal">Press <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-mono">Space</kbd></span>
            </div>
          </div>

          {/* Control Bar (Gender, Nameset, Country, Age range, Generate) */}
          <ControlBar
            options={options}
            onOptionsChange={setOptions}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          {/* Primary Identity Profile Card */}
          <ProfileCard
            identity={currentIdentity}
            onCopyField={handleCopyField}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isCurrentFavorite}
            copiedLabel={copiedLabel}
          />

          {/* Structured Biodata Cards (Phone, Financial, Employment, Physical, Digital) */}
          <DataSections
            identity={currentIdentity}
            onCopyField={handleCopyField}
            copiedLabel={copiedLabel}
          />

          {/* Microjob Info & Assurance Section */}
          <div className="mt-4 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-3.5 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 text-xs">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Ethical Testing &amp; Microjob Automation Notice</span>
            </div>
            <p className="font-normal leading-relaxed text-slate-500 dark:text-slate-400">
              This tool provides 100% synthetically generated names, street addresses, and biodata. 
              All phone numbers, postal codes, and credit cards are mathematically generated using standardized algorithms (such as the Luhn mod 10 formula). 
              Ideal for QA software testing, web form verification, lead capture debugging, and microtask form filling simulations.
            </p>
          </div>

          {/* Semantic SEO & Comprehensive On-Page Technical Guide */}
          <SeoContent 
            onOpenBlog={goToBlog}
            onOpenPost={goToPost}
            onOpenDocs={goToDocs}
          />

        </main>
      )}

      {/* Vib Tools Official Company & Author Footer */}
      <Footer 
        onOpenBlog={goToBlog} 
        onOpenDocs={goToDocs}
        onOpenAbout={goToAbout}
        onOpenContact={goToContact}
        onOpenPrivacy={goToPrivacy}
        onOpenTerms={goToTerms}
        onOpenDisclaimer={goToDisclaimer}
        onOpenFaq={goToFaq}
        onOpenCookies={goToCookies}
      />

      {/* Floating Quick Copy Dock for Fast Form Filling (Only in Generator View) */}
      {currentView === 'generator' && (
        <QuickCopyDock
          identity={currentIdentity}
          onCopyField={handleCopyField}
          copiedLabel={copiedLabel}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-normal rounded-lg shadow-lg border border-slate-700 dark:border-slate-200 transition-all animate-in fade-in slide-in-from-top-2">
          <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <BulkGeneratorModal
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        baseOptions={options}
        onSelectIdentity={(id) => setCurrentIdentity(id)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        favorites={favorites}
        onSelectIdentity={(id) => setCurrentIdentity(id)}
        onClearHistory={() => setHistory([])}
        onToggleFavorite={handleToggleFavorite}
      />

      <MicrojobGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

    </div>
  );
}
