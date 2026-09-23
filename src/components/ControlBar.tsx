import React, { useState } from 'react';
import { GeneratorOptions, Gender, NameSet, CountryCode } from '../types';
import { SlidersHorizontal, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface ControlBarProps {
  options: GeneratorOptions;
  onOptionsChange: (newOptions: GeneratorOptions) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  options,
  onOptionsChange,
  onGenerate,
  isGenerating
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenderChange = (gender: Gender) => {
    onOptionsChange({ ...options, gender });
  };

  const handleNameSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onOptionsChange({ ...options, nameSet: e.target.value as NameSet });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value as CountryCode;
    // Map default nameset to match country if suitable
    let matchedNameSet = options.nameSet;
    if (newCountry === 'US') matchedNameSet = 'american';
    else if (newCountry === 'GB' || newCountry === 'IE' || newCountry === 'NZ') matchedNameSet = 'british';
    else if (newCountry === 'CA') matchedNameSet = 'canadian';
    else if (newCountry === 'AU') matchedNameSet = 'australian';
    else if (newCountry === 'DE' || newCountry === 'CH') matchedNameSet = 'german';
    else if (newCountry === 'FR') matchedNameSet = 'french';
    else if (newCountry === 'ES' || newCountry === 'MX') matchedNameSet = 'spanish';
    else if (newCountry === 'IT') matchedNameSet = 'italian';
    else if (newCountry === 'BR') matchedNameSet = 'brazilian';
    else if (newCountry === 'BD') matchedNameSet = 'bengali';
    else if (newCountry === 'IN') matchedNameSet = 'indian';
    else if (newCountry === 'JP') matchedNameSet = 'japanese';

    onOptionsChange({ ...options, country: newCountry, nameSet: matchedNameSet });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg sm:rounded-xl shadow-2xs p-2.5 sm:p-3.5 transition-colors">
      
      {/* Main Grid: On mobile cleanly stacked, on desktop 4-column grid */}
      <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 items-end">
        
        {/* 1. Gender Selector */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
            Gender
          </label>
          <div className="flex rounded-md p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 h-8 sm:h-[30px] items-center">
            <button
              type="button"
              onClick={() => handleGenderChange('random')}
              className={`flex-1 h-full flex items-center justify-center text-[11.5px] rounded transition-all cursor-pointer ${
                options.gender === 'random'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-medium shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-normal'
              }`}
            >
              Random
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`flex-1 h-full flex items-center justify-center text-[11.5px] rounded transition-all cursor-pointer ${
                options.gender === 'male'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-medium shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-normal'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`flex-1 h-full flex items-center justify-center text-[11.5px] rounded transition-all cursor-pointer ${
                options.gender === 'female'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-medium shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-normal'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Mobile Dual-Column for Country & Nameset */}
        <div className="grid grid-cols-2 gap-2 sm:contents">
          
          {/* 2. Nameset Selector */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1 truncate">
              Nameset
            </label>
            <div className="relative">
              <select
                value={options.nameSet}
                onChange={handleNameSetChange}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md pl-2 pr-7 text-xs font-normal text-slate-800 dark:text-white focus:outline-hidden focus:border-blue-500 transition-colors cursor-pointer appearance-none h-8 sm:h-[30px]"
              >
                <option value="american">🇺🇸 American</option>
                <option value="british">🇬🇧 British (UK)</option>
                <option value="canadian">🇨🇦 Canadian</option>
                <option value="australian">🇦🇺 Australian</option>
                <option value="german">🇩🇪 German</option>
                <option value="french">🇫🇷 French</option>
                <option value="spanish">🇪🇸 Spanish</option>
                <option value="italian">🇮🇹 Italian</option>
                <option value="brazilian">🇧🇷 Brazilian</option>
                <option value="bengali">🇧🇩 Bengali (BD)</option>
                <option value="indian">🇮🇳 Indian (Hindi)</option>
                <option value="japanese">🇯🇵 Japanese</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 sm:px-2 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 3. Country & Address Format */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                Country
              </label>
              <span className="hidden sm:inline text-[9.5px] text-emerald-600 dark:text-emerald-400 font-normal">
                Verified (24)
              </span>
            </div>
            <div className="relative">
              <select
                value={options.country}
                onChange={handleCountryChange}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md pl-2 pr-7 text-xs font-normal text-slate-800 dark:text-white focus:outline-hidden focus:border-blue-500 transition-colors cursor-pointer appearance-none h-8 sm:h-[30px]"
              >
                <optgroup label="Supported Countries">
                  <option value="US">🇺🇸 United States (US)</option>
                  <option value="GB">🇬🇧 United Kingdom (GB)</option>
                  <option value="CA">🇨🇦 Canada (CA)</option>
                  <option value="AU">🇦🇺 Australia (AU)</option>
                  <option value="DE">🇩🇪 Germany (DE)</option>
                  <option value="FR">🇫🇷 France (FR)</option>
                  <option value="ES">🇪🇸 Spain (ES)</option>
                  <option value="CH">🇨🇭 Switzerland (CH)</option>
                  <option value="DK">🇩🇰 Denmark (DK)</option>
                  <option value="FI">🇫🇮 Finland (FI)</option>
                  <option value="IE">🇮🇪 Ireland (IE)</option>
                  <option value="IN">🇮🇳 India (IN)</option>
                  <option value="IR">🇮🇷 Iran (IR)</option>
                  <option value="MX">🇲🇽 Mexico (MX)</option>
                  <option value="NL">🇳🇱 Netherlands (NL)</option>
                  <option value="NO">🇳🇴 Norway (NO)</option>
                  <option value="NZ">🇳🇿 New Zealand (NZ)</option>
                  <option value="RS">🇷🇸 Serbia (RS)</option>
                  <option value="TR">🇹🇷 Turkey (TR)</option>
                  <option value="UA">🇺🇦 Ukraine (UA)</option>
                  <option value="BR">🇧🇷 Brazil (BR)</option>
                  <option value="BD">🇧🇩 Bangladesh (BD)</option>
                  <option value="IT">🇮🇹 Italy (IT)</option>
                  <option value="JP">🇯🇵 Japan (JP)</option>
                </optgroup>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 sm:px-2 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

        {/* 4. Generate Action Button */}
        <div>
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full h-8.5 sm:h-[30px] inline-flex items-center justify-center gap-1.5 px-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs rounded-md shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate Identity</span>
            <span className="hidden xl:inline text-[10px] font-normal text-blue-200 opacity-80">
              (Space)
            </span>
          </button>
        </div>

      </div>

      {/* Advanced Options Bar Toggle */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-normal transition-colors cursor-pointer py-0.5"
        >
          <SlidersHorizontal className="w-3 h-3 text-slate-400" />
          <span>{showAdvanced ? 'Hide advanced filters' : 'More filters (Age, Email, Initial)'}</span>
          {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <span className="hidden sm:inline text-[10px] text-slate-400 dark:text-slate-500 font-normal">
          Algorithmic valid postal codes &amp; Luhn checksums
        </span>
      </div>

      {/* Advanced Drawer Content */}
      {showAdvanced && (
        <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Age range */}
          <div className="bg-slate-50/70 dark:bg-slate-850 p-2 rounded-md border border-slate-200/60 dark:border-slate-800 sm:bg-transparent sm:p-0 sm:border-0">
            <div className="flex justify-between items-center text-[11px] font-normal text-slate-600 dark:text-slate-300 mb-1.5">
              <span>Age Range</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">{options.minAge} - {options.maxAge} yrs</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="18"
                max="50"
                value={options.minAge}
                onChange={(e) => onOptionsChange({ ...options, minAge: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-slate-400">to</span>
              <input
                type="range"
                min="51"
                max="85"
                value={options.maxAge}
                onChange={(e) => onOptionsChange({ ...options, maxAge: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer h-1.5"
              />
            </div>
          </div>

          {/* Email Type */}
          <div>
            <label className="block text-[11px] font-normal text-slate-600 dark:text-slate-300 mb-1">
              Email Provider
            </label>
            <select
              value={options.emailDomainType}
              onChange={(e) => onOptionsChange({ ...options, emailDomainType: e.target.value as any })}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-xs font-normal text-slate-700 dark:text-white focus:outline-hidden cursor-pointer h-8 sm:h-[30px]"
            >
              <option value="realistic">Realistic (Gmail, Yahoo, Outlook)</option>
              <option value="disposable">Disposable (TempMail, Mailsac)</option>
              <option value="tech">Tech / Privacy (Proton, iCloud, Hey)</option>
            </select>
          </div>

          {/* Middle Initial */}
          <div className="flex items-center sm:pt-4">
            <label className="relative flex items-center gap-2 text-[11.5px] font-normal text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={options.middleInitial}
                onChange={(e) => onOptionsChange({ ...options, middleInitial: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>Include Middle Initial</span>
            </label>
          </div>

        </div>
      )}

    </div>
  );
};
