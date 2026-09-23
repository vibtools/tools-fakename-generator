import React from 'react';
import { FakeIdentity } from '../types';
import { Copy, Check, Zap, Sparkles } from 'lucide-react';

interface QuickCopyDockProps {
  identity: FakeIdentity;
  onCopyField: (text: string, label: string) => void;
  copiedLabel: string | null;
}

export const QuickCopyDock: React.FC<QuickCopyDockProps> = ({
  identity,
  onCopyField,
  copiedLabel
}) => {
  const quickItems = [
    { label: 'Full Name', value: identity.fullName, short: 'Name' },
    { label: 'Email', value: identity.email, short: 'Email' },
    { label: 'Phone', value: identity.phone, short: 'Phone' },
    { label: 'Street', value: identity.streetAddress, short: 'Street' },
    { label: 'City', value: identity.city, short: 'City' },
    { label: 'Zip', value: identity.zipCode, short: 'Zip' },
    { label: 'Password', value: identity.password, short: 'Pass' },
    { label: 'Card Number', value: identity.creditCard.number, short: 'Card' },
    { label: 'SSN', value: identity.ssn, short: 'SSN' }
  ];

  return (
    <div className="fixed bottom-2.5 inset-x-0 z-30 flex justify-center px-3 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl rounded-lg p-1.5 max-w-4xl w-full flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        
        {/* Dock Kicker */}
        <div className="hidden sm:flex items-center gap-1 pl-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 shrink-0">
          <Zap className="w-3 h-3" />
          <span>Quick Copy:</span>
        </div>

        {/* Chips list */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar w-full sm:w-auto">
          {quickItems.map((item) => {
            const isCopied = copiedLabel === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onCopyField(item.value, item.label)}
                className={`group shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-normal transition-all active:scale-95 cursor-pointer border ${
                  isCopied
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/70 dark:border-slate-700'
                }`}
                title={`Click to copy: ${item.value}`}
              >
                {isCopied ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono">
                    {item.short}:
                  </span>
                )}
                <span className="font-normal max-w-[90px] sm:max-w-[120px] truncate">
                  {item.value}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
