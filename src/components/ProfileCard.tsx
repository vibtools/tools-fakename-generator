import React, { useState, useRef, useEffect } from 'react';
import { FakeIdentity } from '../types';
import { downloadProfilePhoto, PhotoDownloadSize } from '../services/randomUserApi';
import { getHighResPortraitUrl } from '../data/portraits';
import { 
  Copy, Check, Bookmark, MapPin, ExternalLink, 
  Download, Printer, Sparkles, ChevronDown, Image as ImageIcon
} from 'lucide-react';

interface ProfileCardProps {
  identity: FakeIdentity;
  onCopyField: (text: string, label: string) => void;
  onToggleFavorite: (identity: FakeIdentity) => void;
  isFavorite: boolean;
  copiedLabel: string | null;
  onNotify?: (message: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  identity,
  onCopyField,
  onToggleFavorite,
  isFavorite,
  copiedLabel,
  onNotify
}) => {
  const [isDownloadingPhoto, setIsDownloadingPhoto] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [photoSrc, setPhotoSrc] = useState<string | undefined>(identity.photoUrl);
  const [fallbackCount, setFallbackCount] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<PhotoDownloadSize>(800);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSizeDropdown(false);
      }
    };
    if (showSizeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSizeDropdown]);

  // Address single-line string
  const fullAddress = `${identity.streetAddress}, ${identity.city}, ${identity.stateCode || identity.state} ${identity.zipCode}, ${identity.country}`;

  // Sync photo src when identity changes
  React.useEffect(() => {
    setPhotoSrc(identity.photoUrl);
    setFallbackCount(0);
    setIsImageLoading(true);
    setDownloadSuccess(false);
  }, [identity.id, identity.photoUrl]);

  const handleImageError = () => {
    setIsImageLoading(false);

    if (fallbackCount === 0) {
      // First fallback: alternate high-definition studio portrait
      setFallbackCount(1);
      setPhotoSrc(getHighResPortraitUrl(identity.gender, `${identity.id}_alt_seed`, 800));
    } else if (fallbackCount === 1) {
      // Second fallback: Pravatar high-res 800x800 portrait
      setFallbackCount(2);
      const hash = Math.abs(
        identity.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + (identity.age || 28)
      );
      const pravatarId = (hash % 70) + 1;
      setPhotoSrc(`https://i.pravatar.cc/800?img=${pravatarId}`);
    } else if (fallbackCount === 2) {
      // Third fallback: DiceBear modern SVG avatar
      setFallbackCount(3);
      setPhotoSrc(`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(identity.fullName || identity.id)}`);
    } else if (fallbackCount === 3) {
      // Fourth fallback: DiceBear Micah avatar
      setFallbackCount(4);
      setPhotoSrc(`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(identity.fullName || identity.id)}`);
    } else {
      setPhotoSrc(undefined);
    }
  };

  const handleDownloadPhoto = async (targetSize: PhotoDownloadSize = selectedSize, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setShowSizeDropdown(false);
    const targetUrl = photoSrc || identity.photoUrl;
    if (!targetUrl) return;

    setIsDownloadingPhoto(true);
    try {
      const ok = await downloadProfilePhoto(targetUrl, identity.fullName, targetSize);
      if (ok) {
        setDownloadSuccess(true);
        const sizeLabel = targetSize === 'original' ? 'original size' : `${targetSize}×${targetSize} Studio HD`;
        if (onNotify) {
          onNotify(`Profile photo downloaded in ${sizeLabel} crystal-clear quality!`);
        }
        setTimeout(() => setDownloadSuccess(false), 2500);
      }
    } catch (err) {
      console.error('Download photo error:', err);
    } finally {
      setIsDownloadingPhoto(false);
    }
  };

  const copyFullBio = () => {
    const text = `--- IDENTITY PROFILE ---
Name: ${identity.fullName}
Gender: ${identity.gender}
Address: ${identity.streetAddress}, ${identity.city}, ${identity.stateCode || identity.state} ${identity.zipCode}, ${identity.country}
Phone: ${identity.phone}
Email: ${identity.email}
Username: ${identity.username}
Password: ${identity.password}
Birthday: ${identity.birthday} (${identity.age} years old)
SSN / ID: ${identity.ssn}
Credit Card: ${identity.creditCard.formattedNumber} (${identity.creditCard.type})
Card Exp: ${identity.creditCard.expires} | CVV: ${identity.creditCard.cvv}
Occupation: ${identity.occupation} at ${identity.company}
Education: ${identity.degree} - ${identity.university}`;

    onCopyField(text, 'Full Biodata');
  };

  const handlePrint = () => {
    window.print();
  };

  // Flag emoji mapper
  const getFlag = (code: string) => {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg sm:rounded-xl shadow-2xs overflow-hidden transition-colors">
      
      {/* Top Accent Strip */}
      <div className="h-1 bg-blue-600 w-full" />

      <div className="p-3 sm:p-5">
        
        {/* Top Header: Avatar + Name + Core Meta + Action Buttons */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-4">
          
          {/* Left: Avatar Column (with download button underneath) + Identity Titles */}
          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            
            {/* Avatar Column with Photo & Compact Download Button */}
            <div className="flex flex-col items-center shrink-0">
              
              {/* Avatar Box with flag badge */}
              <div className="relative group">
                {photoSrc ? (
                  <div 
                    onClick={(e) => handleDownloadPhoto(selectedSize, e)}
                    title="Click to download high-resolution HD profile photo"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-2xs cursor-pointer relative group/avatar"
                  >
                    {/* Image loading skeleton indicator */}
                    {isImageLoading && (
                      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700/80 animate-pulse flex items-center justify-center z-0">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 select-none">
                          {identity.firstName[0]}{identity.lastName[0]}
                        </span>
                      </div>
                    )}

                    <img 
                      key={`${identity.id}-${fallbackCount}`}
                      src={photoSrc} 
                      alt={identity.fullName}
                      onLoad={() => setIsImageLoading(false)}
                      onError={handleImageError}
                      className={`w-full h-full object-cover transition-all duration-300 group-hover/avatar:scale-105 relative z-10 ${
                        isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}
                    />
                    
                    {/* Photo hover/tap download overlay */}
                    <div className={`absolute inset-0 z-20 bg-slate-950/60 flex flex-col items-center justify-center gap-0.5 text-white text-[9px] font-medium transition-opacity backdrop-blur-2xs ${
                      isDownloadingPhoto || downloadSuccess ? 'opacity-100' : 'opacity-0 group-hover/avatar:opacity-100'
                    }`}>
                      {downloadSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-[9px] text-emerald-300 font-semibold">HD Saved!</span>
                        </>
                      ) : (
                        <>
                          <Download className={`w-3.5 h-3.5 ${isDownloadingPhoto ? 'animate-bounce text-blue-300' : ''}`} />
                          <span className="text-[8.5px] font-semibold">{isDownloadingPhoto ? 'Saving...' : 'Save HD'}</span>
                          <span className="text-[7.5px] text-blue-200">{selectedSize === 'original' ? 'Orig' : `${selectedSize}px`}</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center border shadow-2xs ${
                    identity.gender === 'male'
                      ? 'bg-blue-50/70 dark:bg-slate-800 border-blue-200/80 dark:border-blue-900 text-blue-600 dark:text-blue-300'
                      : 'bg-rose-50/70 dark:bg-slate-800 border-rose-200/80 dark:border-rose-900 text-rose-600 dark:text-rose-300'
                  }`}>
                    <span className="text-lg sm:text-2xl font-semibold tracking-tight">
                      {identity.firstName[0]}{identity.lastName[0]}
                    </span>
                  </div>
                )}

                {/* Country Flag Overlay Badge */}
                <span 
                  title={`${identity.country} (${identity.countryCode})`} 
                  className="absolute -bottom-1 -right-1 text-xs sm:text-sm bg-white dark:bg-slate-800 rounded-full px-1 py-0.2 shadow-2xs border border-slate-200/80 dark:border-slate-700 select-none z-20"
                >
                  {getFlag(identity.countryCode)}
                </span>
              </div>

              {/* Clean Small Download Button under profile photo */}
              {photoSrc && (
                <div className="mt-1.5 flex flex-col items-center relative w-full" ref={dropdownRef}>
                  <div className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all">
                    {/* Small Download button */}
                    <button
                      type="button"
                      onClick={() => handleDownloadPhoto(selectedSize)}
                      disabled={isDownloadingPhoto}
                      title="Click to download profile photo in HD"
                      className="inline-flex items-center justify-center gap-1 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-l-md transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
                    >
                      {downloadSuccess ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[9px] sm:text-[10px]">Saved</span>
                        </>
                      ) : (
                        <>
                          <Download className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 ${isDownloadingPhoto ? 'animate-bounce text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-blue-400'}`} />
                          <span>{isDownloadingPhoto ? 'Saving...' : 'Download'}</span>
                        </>
                      )}
                    </button>

                    {/* Small resolution dropdown toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSizeDropdown(prev => !prev);
                      }}
                      disabled={isDownloadingPhoto}
                      title={`Resolution: ${selectedSize === 'original' ? 'Original' : `${selectedSize}px`}`}
                      aria-label="Change photo resolution"
                      className="px-1 py-0.5 border-l border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0"
                    >
                      <ChevronDown className={`w-2.5 h-2.5 transition-transform ${showSizeDropdown ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                  </div>

                  {/* Clean "Click to download" subtitle */}
                  <span className="text-[8px] sm:text-[8.5px] text-slate-400 dark:text-slate-500 font-normal mt-0.5 select-none text-center whitespace-nowrap">
                    Click to download
                  </span>

                  {/* Resolution Selector Dropdown Menu */}
                  {showSizeDropdown && (
                    <div className="absolute top-full left-0 mt-1 z-40 w-52 sm:w-56 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 text-xs animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700/60 font-semibold text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400">
                        Select Photo Resolution
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSize(800);
                          handleDownloadPhoto(800);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700/70 transition-colors cursor-pointer ${
                          selectedSize === 800 ? 'bg-blue-50/60 dark:bg-slate-700/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="flex items-center gap-1.5">
                            <strong>HD 800 × 800 px</strong>
                            <span className="text-[8.5px] px-1 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-medium">Recommended</span>
                          </span>
                          <span className="text-[9.5px] text-slate-400">Crisp, high clarity for testing</span>
                        </div>
                        {selectedSize === 800 && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ml-1.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSize(1024);
                          handleDownloadPhoto(1024);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700/70 transition-colors cursor-pointer ${
                          selectedSize === 1024 ? 'bg-blue-50/60 dark:bg-slate-700/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="flex items-center gap-1.5">
                            <strong>Full HD 1024 × 1024</strong>
                            <span className="text-[8.5px] px-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-medium">Ultra High</span>
                          </span>
                          <span className="text-[9.5px] text-slate-400">Maximum resolution & detail</span>
                        </div>
                        {selectedSize === 1024 && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ml-1.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSize(512);
                          handleDownloadPhoto(512);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700/70 transition-colors cursor-pointer ${
                          selectedSize === 512 ? 'bg-blue-50/60 dark:bg-slate-700/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span><strong>Standard 512 × 512 px</strong></span>
                          <span className="text-[9.5px] text-slate-400">Standard web avatar size</span>
                        </div>
                        {selectedSize === 512 && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ml-1.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSize('original');
                          handleDownloadPhoto('original');
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 hover:bg-blue-50 dark:hover:bg-slate-700/70 transition-colors cursor-pointer ${
                          selectedSize === 'original' ? 'bg-blue-50/60 dark:bg-slate-700/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span><strong>Original Size</strong></span>
                          <span className="text-[9.5px] text-slate-400">Direct source dimensions</span>
                        </div>
                        {selectedSize === 'original' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ml-1.5" />}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Name and Quick Meta */}
            <div className="min-w-0 flex-1 pt-0.5">
              
              {/* Full Name & 1-Tap Copy */}
              <div className="flex items-center gap-1.5 group">
                <h2 className="text-base sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight truncate">
                  {identity.fullName}
                </h2>
                <button
                  type="button"
                  onClick={() => onCopyField(identity.fullName, 'Full Name')}
                  className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors cursor-pointer shrink-0"
                  title="Copy Full Name"
                >
                  {copiedLabel === 'Full Name' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Meta Tags / Badges */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {identity.prefix} {identity.gender}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span>Age {identity.age} ({identity.zodiac})</span>
                <span className="hidden xs:inline text-slate-300 dark:text-slate-700">·</span>
                <span className="hidden xs:inline text-slate-600 dark:text-slate-400">{identity.country}</span>
              </div>
            </div>

          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Bookmark / Favorite Button */}
            <button
              type="button"
              onClick={() => onToggleFavorite(identity)}
              className={`w-7.5 h-7.5 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border text-xs transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Print Slip (Desktop Only) */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Print Profile Slip"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* Copy All Button */}
            <button
              type="button"
              onClick={copyFullBio}
              className="h-7.5 sm:h-8 inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[11px] sm:text-xs font-medium rounded-md transition-colors cursor-pointer"
              title="Copy Complete Biodata"
            >
              {copiedLabel === 'Full Biodata' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy All</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Structured Address & Location Box */}
        <div className="mt-3 p-2.5 sm:p-3 bg-slate-50/70 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 rounded-lg">
          
          {/* Header Row of Address Box */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-1.5">
            <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>Address &amp; Location</span>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10.5px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>View Map</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span>·</span>
              <button
                type="button"
                onClick={() => onCopyField(fullAddress, 'Full Address')}
                className="text-[10.5px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                {copiedLabel === 'Full Address' ? 'Address Copied!' : 'Copy Full'}
              </button>
            </div>
          </div>

          {/* Street & City/State/Zip Lines */}
          <div className="space-y-1.5">
            
            {/* Street Address Row (Always touch-friendly copy button on mobile) */}
            <div className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none mb-0.5">
                  Street Address
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-900 dark:text-slate-100 truncate block">
                  {identity.streetAddress}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onCopyField(identity.streetAddress, 'Street Address')}
                className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                title="Copy Street Address"
              >
                {copiedLabel === 'Street Address' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* City, State & Zip Code Row */}
            <div className="grid grid-cols-3 gap-1.5">
              
              {/* City */}
              <div className="flex items-center justify-between gap-1 p-1.5 sm:p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none mb-0.5">
                    City
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium text-slate-900 dark:text-slate-100 truncate block">
                    {identity.city}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyField(identity.city, 'City')}
                  className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded cursor-pointer shrink-0"
                  title="Copy City"
                >
                  {copiedLabel === 'City' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* State */}
              <div className="flex items-center justify-between gap-1 p-1.5 sm:p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none mb-0.5">
                    State
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium text-slate-900 dark:text-slate-100 truncate block">
                    {identity.stateCode || identity.state}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyField(identity.stateCode || identity.state, 'State')}
                  className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded cursor-pointer shrink-0"
                  title="Copy State"
                >
                  {copiedLabel === 'State' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* Zip Code */}
              <div className="flex items-center justify-between gap-1 p-1.5 sm:p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none mb-0.5">
                    Zip Code
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium text-slate-900 dark:text-slate-100 font-mono truncate block">
                    {identity.zipCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyField(identity.zipCode, 'Zip Code')}
                  className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded cursor-pointer shrink-0"
                  title="Copy Zip Code"
                >
                  {copiedLabel === 'Zip Code' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

            </div>

          </div>

          {/* Geolocation Coordinates & Country */}
          <div className="mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-[10.5px] text-slate-400 dark:text-slate-500">
            <span>{identity.country} ({identity.countryCode})</span>
            <span className="font-mono tabular-nums">{identity.latitude}°, {identity.longitude}°</span>
          </div>

        </div>

        {/* Quick Split Pills for Fast Microtask Form Filling */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="font-medium text-slate-600 dark:text-slate-400">Quick-Fill:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {/* First Name Pill */}
            <button
              type="button"
              onClick={() => onCopyField(identity.firstName, 'First Name')}
              className="shrink-0 px-2 py-0.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[11px] transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700 active:scale-95"
            >
              First: <span className="font-semibold text-slate-900 dark:text-white">{identity.firstName}</span>
            </button>

            {/* Last Name Pill */}
            <button
              type="button"
              onClick={() => onCopyField(identity.lastName, 'Last Name')}
              className="shrink-0 px-2 py-0.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[11px] transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700 active:scale-95"
            >
              Last: <span className="font-semibold text-slate-900 dark:text-white">{identity.lastName}</span>
            </button>

            {/* Phone Pill */}
            <button
              type="button"
              onClick={() => onCopyField(identity.phone, 'Phone')}
              className="shrink-0 px-2 py-0.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[11px] transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700 active:scale-95"
            >
              Phone: <span className="font-semibold text-slate-900 dark:text-white">{identity.phone}</span>
            </button>

            {/* Email Pill */}
            <button
              type="button"
              onClick={() => onCopyField(identity.email, 'Email')}
              className="shrink-0 px-2 py-0.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[11px] transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700 active:scale-95"
            >
              Email: <span className="font-semibold text-slate-900 dark:text-white">{identity.email.split('@')[0]}@...</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
