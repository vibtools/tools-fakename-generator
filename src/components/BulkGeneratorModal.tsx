import React, { useState } from 'react';
import { FakeIdentity, GeneratorOptions } from '../types';
import { generateBulkIdentities, exportToCSV } from '../utils/generator';
import { fetchBulkRandomUserIdentities } from '../services/randomUserApi';
import { X, Download, Copy, Check, Search, FileSpreadsheet, RefreshCw, FileText } from 'lucide-react';

interface BulkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseOptions: GeneratorOptions;
  onSelectIdentity: (identity: FakeIdentity) => void;
}

export const BulkGeneratorModal: React.FC<BulkGeneratorModalProps> = ({
  isOpen,
  onClose,
  baseOptions,
  onSelectIdentity
}) => {
  const [count, setCount] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [identities, setIdentities] = useState<FakeIdentity[]>(() => 
    generateBulkIdentities(10, baseOptions)
  );
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRegenerate = async (newCount = count) => {
    setIsLoading(true);
    try {
      const list = await fetchBulkRandomUserIdentities(newCount, baseOptions);
      setIdentities(list);
    } catch {
      setIdentities(generateBulkIdentities(newCount, baseOptions));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    const csv = exportToCSV(identities);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fake-identities-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify(identities, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fake-identities-${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyClipboard = () => {
    const csv = exportToCSV(identities);
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = identities.filter(i => 
    i.fullName.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase()) ||
    i.city.toLowerCase().includes(search.toLowerCase()) ||
    i.occupation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg shadow-xl max-w-5xl w-full flex flex-col max-h-[88vh] overflow-hidden transition-colors">
        
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-medium text-slate-900 dark:text-white">
                Bulk Identity Generator
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
              Generate multiple realistic identities for Excel, testing datasets, and mass microjob forms.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
              Qty:
            </span>
            {[5, 10, 25, 50].map((q) => (
              <button
                key={q}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setCount(q);
                  handleRegenerate(q);
                }}
                className={`px-2 py-0.5 text-xs font-normal rounded transition-colors cursor-pointer ${
                  count === q
                    ? 'bg-blue-600 text-white shadow-2xs font-medium'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {q}
              </button>
            ))}

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleRegenerate(count)}
              className="ml-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-normal rounded shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Fetching...' : 'Refresh'}</span>
            </button>
          </div>

          {/* Search box & Export actions */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-36 sm:w-44 pl-7 pr-2.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-normal text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
              />
              <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1.5" />
            </div>

            <button
              type="button"
              onClick={handleCopyClipboard}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-normal rounded transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy CSV'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium rounded shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-700 hover:bg-slate-800 text-white text-[11px] font-normal rounded shadow-2xs transition-colors cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="flex-1 overflow-auto p-3 max-h-[58vh]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/90 dark:border-slate-700 text-slate-400 dark:text-slate-400 font-normal bg-slate-50/40 dark:bg-slate-800/40">
                <th className="p-2 font-normal">Name</th>
                <th className="p-2 font-normal">Address</th>
                <th className="p-2 font-normal">Phone</th>
                <th className="p-2 font-normal">Email</th>
                <th className="p-2 font-normal">Occupation</th>
                <th className="p-2 font-normal">Card Number</th>
                <th className="p-2 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-normal">
              {filtered.map((item) => (
                <tr 
                  key={item.id}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <td className="p-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {item.photoThumbnailUrl ? (
                        <img 
                          src={item.photoThumbnailUrl} 
                          alt="" 
                          className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700" 
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] flex items-center justify-center font-medium shrink-0 border border-slate-200/80 dark:border-slate-700">
                          {item.firstName[0]}
                        </div>
                      )}
                      <div>
                        <div>{item.fullName}</div>
                        <span className="text-[10px] text-slate-400 font-normal">{item.gender} · {item.age} yrs</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-slate-600 dark:text-slate-300">
                    <div>{item.streetAddress}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{item.city}, {item.stateCode} {item.zipCode}</span>
                  </td>
                  <td className="p-2 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {item.phone}
                  </td>
                  <td className="p-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    {item.email}
                  </td>
                  <td className="p-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {item.occupation}
                  </td>
                  <td className="p-2 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    •••• {item.creditCard.number.slice(-4)}
                  </td>
                  <td className="p-2 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectIdentity(item);
                        onClose();
                      }}
                      className="px-2 py-0.5 text-[11px] font-normal text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded transition-colors cursor-pointer"
                    >
                      Load
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-10 text-center text-slate-400 text-xs font-normal">
              No matching identities found.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center justify-between text-[11px] text-slate-500 font-normal">
          <span>Showing {filtered.length} of {identities.length} generated identities</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-normal rounded transition-colors cursor-pointer text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
