import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Search, ChevronRight, ChevronLeft, Copy, Check, 
  ExternalLink, ArrowLeft, Menu, X, Hash, Sparkles, Shield, 
  Code2, FileText, ArrowRight, Share2, Layers, Cpu
} from 'lucide-react';
import { DocPage } from './types';
import { DOC_CATEGORIES, DOC_PAGES, getDocBySlug } from './docsData';

interface DocsLayoutProps {
  currentSlug: string;
  onSelectDoc: (slug: string) => void;
  onBackToGenerator: () => void;
  onOpenBlog?: () => void;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  currentSlug,
  onSelectDoc,
  onBackToGenerator,
  onOpenBlog
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Active Document Page (defaults to 'getting-started' if not matched)
  const currentDoc: DocPage = useMemo(() => {
    return getDocBySlug(currentSlug) || DOC_PAGES[0];
  }, [currentSlug]);

  // Determine Previous & Next Docs for Bottom Navigation
  const { prevDoc, nextDoc } = useMemo(() => {
    const currentIndex = DOC_PAGES.findIndex(d => d.slug === currentDoc.slug);
    return {
      prevDoc: currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null,
      nextDoc: currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null
    };
  }, [currentDoc.slug]);

  // Filtered pages based on search query
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return DOC_PAGES.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.keywords.some(k => k.toLowerCase().includes(q)) ||
      p.sections.some(s => s.title.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // SEO & Schema Ingestion for AI & Search Engines
  useEffect(() => {
    document.title = `${currentDoc.title} | Vib Tools Documentation`;

    // Inject TechArticle JSON-LD Structured Data
    const scriptId = 'tech-article-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": currentDoc.title,
      "description": currentDoc.description,
      "url": `https://fakenamegenerator.vib.tools/docs/${currentDoc.slug}`,
      "datePublished": "2026-04-01T00:00:00Z",
      "dateModified": `${currentDoc.lastUpdated}T00:00:00Z`,
      "author": {
        "@type": "Organization",
        "name": "Vib Tools",
        "url": "https://vib.tools/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vib Tools",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://fakenamegenerator.vib.tools/docs/${currentDoc.slug}`
      },
      "keywords": currentDoc.keywords.join(', ')
    };

    scriptTag.text = JSON.stringify(schemaData);

    // Scroll to top on doc change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [currentDoc]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCopyPageUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Docs Sticky Sub-Navigation */}
      <div className="sticky top-12 sm:top-13 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          
          {/* Breadcrumbs & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="Open documentation navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Generator</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">/</span>

            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Docs
            </span>

            <span className="text-slate-300 dark:text-slate-700">/</span>

            <span className="text-blue-600 dark:text-blue-400 font-semibold truncate">
              {currentDoc.shortTitle || currentDoc.title}
            </span>
          </div>

          {/* Quick Actions Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyPageUrl}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer text-[11px] font-medium"
              title="Copy Page URL"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3 text-slate-400" />}
              <span>{copiedUrl ? 'Copied!' : 'Share Doc'}</span>
            </button>

            <button
              type="button"
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-2xs cursor-pointer text-[11px]"
            >
              <span>Open Tool</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Docs Body: 3-Column Layout (Sidebar, Content, On-This-Page TOC) */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 flex gap-8">
        
        {/* ============================================================ */}
        {/* DESKTOP SIDEBAR (Sticky on Left) */}
        {/* ============================================================ */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-4 select-none">
          <div className="sticky top-28 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-6 custom-scrollbar">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* If Search Query Active */}
            {filteredPages ? (
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                  Search Results ({filteredPages.length})
                </div>
                {filteredPages.length === 0 ? (
                  <p className="text-xs text-slate-400 p-2 italic">No matching documentation pages.</p>
                ) : (
                  filteredPages.map(page => (
                    <button
                      key={page.slug}
                      onClick={() => {
                        onSelectDoc(page.slug);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer block ${
                        currentDoc.slug === page.slug
                          ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {page.shortTitle || page.title}
                    </button>
                  ))
                )}
              </div>
            ) : (
              /* Standard Categorized Tree */
              <div className="space-y-5">
                {DOC_CATEGORIES.map(category => (
                  <div key={category.name} className="space-y-1.5">
                    <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
                      {category.name}
                    </h3>
                    <div className="space-y-0.5">
                      {category.pages.map(p => {
                        const isActive = currentDoc.slug === p.slug;
                        return (
                          <button
                            key={p.slug}
                            onClick={() => onSelectDoc(p.slug)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-all flex items-center justify-between group cursor-pointer ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold border-l-2 border-blue-600 dark:border-blue-400 rounded-l-none'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <span className="truncate">{p.title}</span>
                            {p.badge && (
                              <span className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-1.5 ${
                                isActive 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-300'
                              }`}>
                                {p.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Link to Knowledge Base Blog */}
            {onOpenBlog && (
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onOpenBlog}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900 hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left transition-colors cursor-pointer text-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <div className="min-w-0">
                    <span className="font-semibold block truncate">Engineering Blog</span>
                    <span className="text-[10px] text-slate-400 block truncate">Read in-depth guides</span>
                  </div>
                </button>
              </div>
            )}

          </div>
        </aside>

        {/* ============================================================ */}
        {/* MOBILE SIDEBAR DRAWER (Slide-over with Backdrop) */}
        {/* ============================================================ */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div 
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            />
            {/* Drawer Panel */}
            <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full p-4 flex flex-col shadow-2xl z-10 border-r border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-white">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Documentation</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="my-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search docs..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 py-2">
                {DOC_CATEGORIES.map(cat => (
                  <div key={cat.name} className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      {cat.name}
                    </div>
                    {cat.pages.map(p => (
                      <button
                        key={p.slug}
                        onClick={() => {
                          onSelectDoc(p.slug);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                          currentDoc.slug === p.slug
                            ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{p.title}</span>
                        {p.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                            {p.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CENTER COLUMN: MAIN DOCUMENTATION CONTENT */}
        {/* ============================================================ */}
        <main className="flex-1 min-w-0 max-w-3xl space-y-8 pb-16">
          
          {/* Header Metadata */}
          <header className="space-y-3 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10.5px] font-semibold rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                {currentDoc.category}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-400">{currentDoc.readTime}</span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-400">Updated: {currentDoc.lastUpdated}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {currentDoc.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {currentDoc.description}
            </p>
          </header>

          {/* Document Sections Body */}
          <div className="space-y-10">
            {currentDoc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 space-y-3.5">
                
                {/* Section Title with Anchor */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 group">
                  <span>{section.title}</span>
                  <a
                    href={`#${section.id}`}
                    aria-label={`Direct link to ${section.title}`}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition-opacity"
                  >
                    <Hash className="w-4 h-4" />
                  </a>
                </h2>

                {/* Section Paragraphs */}
                <div className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Callout Alert Box (if present) */}
                {section.callout && (
                  <div className={`p-3.5 rounded-lg border text-xs sm:text-[12.5px] leading-relaxed flex items-start gap-2.5 my-3 ${
                    section.callout.type === 'tip'
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                      : section.callout.type === 'warning'
                      ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                      : 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200'
                  }`}>
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <div className="space-y-0.5">
                      <strong className="font-semibold block">{section.callout.title}</strong>
                      <p>{section.callout.message}</p>
                    </div>
                  </div>
                )}

                {/* Section Table (if present) */}
                {section.table && (
                  <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <table className="w-full text-left border-collapse text-[11.5px] sm:text-xs">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold">
                          {section.table.headers.map((h, i) => (
                            <th key={i} className="py-2.5 px-3 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {section.table.rows.map((row, rIdx) => (
                          <tr 
                            key={rIdx} 
                            className={rIdx % 2 === 0 ? 'bg-white dark:bg-slate-900/40' : 'bg-slate-50/50 dark:bg-slate-800/30'}
                          >
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 whitespace-normal leading-normal font-mono text-[11px] sm:text-[11.5px]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Section Code Snippet (if present) */}
                {section.codeSnippet && (
                  <div className="my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3 h-3 text-blue-400" />
                        <span>{section.codeSnippet.filename || section.codeSnippet.language}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(section.id, section.codeSnippet!.code)}
                        className="inline-flex items-center gap-1 text-[10.5px] text-slate-300 hover:text-white cursor-pointer transition-colors"
                      >
                        {copiedCodeId === section.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 text-[11.5px] font-mono leading-relaxed text-slate-200 overflow-x-auto">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Subsections (if present) */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-6 pt-2 pl-3 border-l-2 border-slate-200/80 dark:border-slate-800">
                    {section.subsections.map(sub => (
                      <div key={sub.id} id={sub.id} className="scroll-mt-32 space-y-2">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                          {sub.title}
                        </h3>
                        <div className="space-y-2 text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          {sub.content.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>

                        {sub.codeSnippet && (
                          <div className="my-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                              <span>{sub.codeSnippet.filename || sub.codeSnippet.language}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyCode(sub.id, sub.codeSnippet!.code)}
                                className="inline-flex items-center gap-1 text-[10.5px] text-slate-300 hover:text-white cursor-pointer"
                              >
                                {copiedCodeId === sub.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <pre className="p-3 text-[11.5px] font-mono leading-relaxed text-slate-200 overflow-x-auto">
                              <code>{sub.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </section>
            ))}
          </div>

          {/* Bottom Next / Prev Document Navigation */}
          <nav className="pt-8 mt-12 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs">
            {prevDoc ? (
              <button
                type="button"
                onClick={() => onSelectDoc(prevDoc.slug)}
                className="flex flex-col items-start gap-1 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-slate-900 transition-all text-left cursor-pointer group flex-1 max-w-[48%]"
              >
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3" />
                  <span>Previous</span>
                </span>
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                  {prevDoc.shortTitle || prevDoc.title}
                </span>
              </button>
            ) : <div />}

            {nextDoc ? (
              <button
                type="button"
                onClick={() => onSelectDoc(nextDoc.slug)}
                className="flex flex-col items-end gap-1 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-slate-900 transition-all text-right cursor-pointer group flex-1 max-w-[48%]"
              >
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                  {nextDoc.shortTitle || nextDoc.title}
                </span>
              </button>
            ) : <div />}
          </nav>

          {/* Bottom CTA Card */}
          <div className="mt-8 p-4 rounded-xl border border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Ready to test with realistic synthetic identities?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate 100% valid addresses, Luhn cards, and personas with sub-8ms speed.
              </p>
            </div>
            <button
              type="button"
              onClick={onBackToGenerator}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
            >
              Launch Generator Now
            </button>
          </div>

        </main>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: ON THIS PAGE (TOC) DESKTOP ONLY */}
        {/* ============================================================ */}
        <aside className="hidden xl:block w-56 shrink-0 select-none">
          <div className="sticky top-28 space-y-3 text-xs pr-2">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span>On This Page</span>
            </h4>
            
            <nav className="space-y-1.5 border-l border-slate-200 dark:border-slate-800 pl-2.5">
              {currentDoc.sections.map(sec => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5 text-[11.5px] leading-tight line-clamp-1"
                >
                  {sec.title}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-[11px]">
              <a
                href="https://github.com/victorsteele"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
              >
                <span>Edit or report issue</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <button
                type="button"
                onClick={handleCopyPageUrl}
                className="flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>Copy canonical link</span>
              </button>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
};
