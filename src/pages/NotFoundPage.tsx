import React, { useEffect } from 'react';
import { FileQuestion, ArrowLeft, Home, BookOpen, FileText, Sparkles, HelpCircle } from 'lucide-react';

interface NotFoundPageProps {
  onBackToGenerator: () => void;
  onOpenDocs: () => void;
  onOpenBlog: () => void;
  onOpenFaq: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackToGenerator,
  onOpenDocs,
  onOpenBlog,
  onOpenFaq
}) => {
  useEffect(() => {
    document.title = "404 – Page Not Found | Fake Name Generator by Vib Tools";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center mx-auto shadow-2xs">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The resource, documentation guide, or synthetic endpoint you are looking for might have been moved, renamed, or temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs">
          <button
            type="button"
            onClick={onBackToGenerator}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Launch Generator</span>
          </button>

          <button
            type="button"
            onClick={onOpenDocs}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Browse Docs</span>
          </button>
        </div>

        {/* Helpful quick links */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <button 
            type="button" 
            onClick={onOpenBlog} 
            className="hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
          >
            Technical Blog
          </button>
          <span>·</span>
          <button 
            type="button" 
            onClick={onOpenFaq} 
            className="hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
          >
            FAQ &amp; Help
          </button>
        </div>

      </div>
    </div>
  );
};
