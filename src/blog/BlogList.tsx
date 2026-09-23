import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS } from './posts';
import { BlogPost } from './types';
import { 
  BookOpen, Search, Clock, ArrowRight, Tag, 
  Sparkles, ShieldCheck, ChevronRight, ArrowLeft 
} from 'lucide-react';

interface BlogListProps {
  onSelectPost: (slug: string) => void;
  onBackToHome: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost, onBackToHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    document.title = "Engineering & QA Blog – Fake Name Generator & Test Data | Vib Tools";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(BLOG_POSTS.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      
      {/* Top Breadcrumb & Back button */}
      <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <button 
            type="button" 
            onClick={onBackToHome}
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Generator Tool</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Blog &amp; Knowledge Base</span>
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 transition-colors cursor-pointer"
        >
          Open Generator →
        </button>
      </div>

      {/* Header Banner */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200/70 dark:border-blue-900/60">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vib Tools Engineering Blog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Synthetic Data, Form Testing &amp; QA Engineering
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Technical deep-dives, Luhn algorithm breakdowns, international address standards, and best practices for ethical mock data generation and microjob form testing.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles &amp; topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 space-y-2">
            <p className="text-sm font-medium">No articles found matching your query.</p>
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredPosts.map(post => (
            <article
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className="group p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md font-medium text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11.5px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {post.readTime}
                  </span>
                </div>
                <time dateTime={post.publishedDate} className="text-[11.5px]">
                  {post.publishedDate}
                </time>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-baseline gap-2">
                  <span className="text-lg shrink-0">{post.emoji}</span>
                  <span>{post.title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  Read Guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* SEO Bottom Callout */}
      <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Vib Tools Ethical Testing Standard</span>
        </div>
        <p className="text-[11.5px] leading-relaxed">
          All tutorials, code snippets, and guides published by Vib Tools strictly promote ethical software engineering, sandbox gateway testing, and privacy-preserving mock dataset generation.
        </p>
      </div>

    </div>
  );
};
