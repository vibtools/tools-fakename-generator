import React from 'react';
import { FakeIdentity } from '../types';
import { X, Trash2, Bookmark, Check, ArrowRight, UserCheck } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: FakeIdentity[];
  favorites: FakeIdentity[];
  onSelectIdentity: (identity: FakeIdentity) => void;
  onClearHistory: () => void;
  onToggleFavorite: (identity: FakeIdentity) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  favorites,
  onSelectIdentity,
  onClearHistory,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = React.useState<'recent' | 'favorites'>('recent');

  if (!isOpen) return null;

  const currentList = activeTab === 'recent' ? history : favorites;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-2xs flex justify-end">
      <div className="bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 w-full max-w-sm h-full flex flex-col shadow-xl transition-colors">
        
        {/* Drawer Header */}
        <div className="px-4 py-3 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">
              Identities History
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 pt-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('recent')}
            className={`flex-1 pb-2 text-xs font-normal border-b-2 transition-colors cursor-pointer ${
              activeTab === 'recent'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Recent ({history.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 pb-2 text-xs font-normal border-b-2 transition-colors cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Saved ({favorites.length})
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {currentList.length === 0 ? (
            <div className="py-14 text-center text-slate-400 text-xs font-normal">
              {activeTab === 'recent' 
                ? 'No generated history yet.' 
                : 'No saved favorites yet.'}
            </div>
          ) : (
            currentList.map((item) => {
              const isFav = favorites.some(f => f.id === item.id);
              return (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start justify-between gap-2.5 group"
                >
                  <div 
                    className="min-w-0 flex-1 cursor-pointer flex items-start gap-2.5"
                    onClick={() => {
                      onSelectIdentity(item);
                      onClose();
                    }}
                  >
                    {item.photoThumbnailUrl || item.photoUrl ? (
                      <img 
                        src={item.photoThumbnailUrl || item.photoUrl} 
                        alt="" 
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700 mt-0.5" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs flex items-center justify-center font-medium shrink-0 mt-0.5">
                        {item.firstName[0]}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-slate-900 dark:text-white truncate">
                          {item.fullName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({item.countryCode})
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                        {item.streetAddress}, {item.city}
                      </p>

                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(item)}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        isFav
                          ? 'text-amber-500 hover:text-amber-600'
                          : 'text-slate-300 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      title={isFav ? 'Remove Favorite' : 'Save Favorite'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectIdentity(item);
                        onClose();
                      }}
                      className="p-1 rounded text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Load this profile"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {activeTab === 'recent' && history.length > 0 && (
          <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex justify-between items-center text-[11px] font-normal">
            <span className="text-slate-400">{history.length} profiles</span>
            <button
              type="button"
              onClick={onClearHistory}
              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 cursor-pointer font-normal"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
