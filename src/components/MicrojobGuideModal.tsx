import React from 'react';
import { X, Sparkles, CheckCircle2, Zap, Shield, FileText, Layers } from 'lucide-react';

interface MicrojobGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MicrojobGuideModal: React.FC<MicrojobGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg shadow-xl max-w-xl w-full flex flex-col max-h-[88vh] overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-900 dark:text-white">
                Microjob &amp; Form Guide
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                Tips for fast form submissions on microtask sites &amp; QA verification.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          
          <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 rounded-md">
            <h3 className="font-medium text-blue-900 dark:text-blue-200 flex items-center gap-1.5 text-xs mb-0.5">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              1. Lightning Quick-Copy Dock
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Keep this tool open in a split browser tab. The floating dock at the bottom lets you copy <b>First Name, Last Name, Street, City, State, Zip, Phone, Email</b> in a single tap without selecting text.
            </p>
          </div>

          <div className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 rounded-md">
            <h3 className="font-medium text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 text-xs mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              2. Realistic Address &amp; Zip Code Consistency
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Microjob forms check if the Zip Code matches the State and City. This generator matches real US states (e.g. CA with 900xx, NY with 100xx, TX with 770xx) and real postal code syntax.
            </p>
          </div>

          <div className="p-2.5 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 rounded-md">
            <h3 className="font-medium text-purple-900 dark:text-purple-200 flex items-center gap-1.5 text-xs mb-0.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              3. Bulk Generator for Spreadsheet Deliverables
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              When a client asks for sample leads or entries, open the <b>Bulk Generator</b>, select your quantity, and click <b>Export CSV</b> to get an instant Excel-ready table.
            </p>
          </div>

          <div className="p-2.5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-md">
            <h3 className="font-medium text-amber-900 dark:text-amber-200 flex items-center gap-1.5 text-xs mb-0.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              4. Ethical Notice &amp; Sample Data Only
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              All identities, SSNs, and credit cards are mathematically generated test samples (using the Luhn checksum standard). Designed exclusively for quality assurance, interface testing, and microtask simulations.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-normal text-xs rounded transition-colors cursor-pointer"
          >
            Start Generating
          </button>
        </div>

      </div>
    </div>
  );
};
