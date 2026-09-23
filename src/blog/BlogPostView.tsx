import React, { useEffect, useState } from 'react';
import { BlogPost } from './types';
import { BLOG_POSTS } from './posts';
import { 
  ArrowLeft, Clock, Calendar, Share2, Check, 
  Copy, ArrowRight, ShieldCheck, User, Sparkles, BookOpen 
} from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onOpenGenerator: () => void;
  onSelectPost: (slug: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  onBackToBlog,
  onOpenGenerator,
  onSelectPost
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    document.title = `${post.title} | Vib Tools Blog`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inject dynamic BlogPosting JSON-LD for Search Console
    const scriptId = 'blog-post-json-ld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'keywords': post.keywords.join(', '),
      'articleSection': post.category,
      'datePublished': post.publishedDate,
      'dateModified': post.modifiedDate,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://fakenamegenerator.vib.tools/blog/${post.slug}`
      },
      'author': {
        '@type': 'Person',
        'name': post.author.name,
        'jobTitle': post.author.role,
        'url': post.author.url
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Vib Tools',
        'url': 'https://vib.tools/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png'
        }
      }
    });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [post]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = (a.category === post.category ? 2 : 0) + a.tags.filter(t => post.tags.includes(t)).length;
      const bMatch = (b.category === post.category ? 2 : 0) + b.tags.filter(t => post.tags.includes(t)).length;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in text-slate-800 dark:text-slate-200">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <button 
          type="button"
          onClick={onBackToBlog}
          className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Blog Articles</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {shareSuccess ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3 h-3 text-slate-400" />
              <span>Share Article</span>
            </>
          )}
        </button>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-400 text-[11.5px]">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1 text-slate-400 text-[11.5px]">
            <Calendar className="w-3.5 h-3.5" />
            Published {post.publishedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
          {post.emoji} {post.title}
        </h1>

        {/* Author Bio Snippet */}
        <div className="flex items-center gap-3 pt-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-800" 
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              {post.author.name}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {post.author.role}
            </span>
          </div>
        </div>
      </header>

      {/* Intro paragraph */}
      <div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800">
        {post.content.intro}
      </div>

      {/* Article Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {post.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {section.heading}
            </h2>
            {section.subheading && (
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {section.subheading}
              </p>
            )}

            <div className="space-y-2.5">
              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Comparison Table (if present) */}
            {section.table && (
              <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
                <table className="w-full text-left border-collapse text-[11.5px] sm:text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold">
                      {section.table.headers.map((header, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3 whitespace-nowrap">
                          {header}
                        </th>
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
                          <td key={cIdx} className="py-2 px-3 whitespace-normal leading-normal">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Code Snippet Box (if present) */}
            {section.codeSnippet && (
              <div className="my-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 text-slate-400 text-[11px] font-mono border-b border-slate-800">
                  <span>{section.codeSnippet.language}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(section.codeSnippet!.code)}
                    className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-3.5 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{section.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Key Takeaways Callout */}
            {section.keyTakeaways && (
              <div className="mt-3 p-3.5 rounded-lg border border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 text-xs space-y-1.5">
                <span className="font-semibold text-[11.5px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Key Takeaways
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11.5px] text-slate-700 dark:text-slate-300">
                  {section.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <section className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Summary</h3>
          <p className="leading-relaxed">{post.content.conclusion}</p>
        </section>
      </div>

      {/* CTA Box to Open the Tool */}
      <div className="p-5 sm:p-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-blue-950/40 dark:via-slate-900 dark:to-blue-950/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Need Instant Test Data or Synthetic Profiles?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Generate 100% realistic profiles across 24 countries with Luhn test cards and bulk CSV exports.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenGenerator}
          className="shrink-0 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Generator</span>
        </button>
      </div>

      {/* Related Posts */}
      <div className="space-y-3 pt-6 border-t border-slate-200/80 dark:border-slate-800">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          Related Technical Guides
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {relatedPosts.map(related => (
            <button
              key={related.slug}
              type="button"
              onClick={() => onSelectPost(related.slug)}
              className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-700 text-left transition-all cursor-pointer space-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">{related.emoji} {related.category}</span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                  {related.title}
                </p>
              </div>
              <span className="text-[10.5px] text-blue-600 dark:text-blue-400 font-medium">Read article →</span>
            </button>
          ))}
        </div>
      </div>

    </article>
  );
};
