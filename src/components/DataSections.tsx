import React, { useState } from 'react';
import { FakeIdentity } from '../types';
import { 
  Phone, Mail, Lock, Eye, EyeOff, Globe, CreditCard, 
  Briefcase, GraduationCap, ShieldCheck, Activity, Laptop, 
  Car, Copy, Check, Hash, Calendar, Key, AlertCircle
} from 'lucide-react';

interface DataSectionsProps {
  identity: FakeIdentity;
  onCopyField: (text: string, label: string) => void;
  copiedLabel: string | null;
}

export const DataSections: React.FC<DataSectionsProps> = ({
  identity,
  onCopyField,
  copiedLabel
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [maskCard, setMaskCard] = useState(false);

  // Render a clean field row with label, value, and one-click copy affordance
  const renderRow = (
    label: string, 
    value: string | number, 
    copyValue?: string, 
    subtext?: string,
    isMonospace: boolean = false,
    extraAction?: React.ReactNode
  ) => {
    const textToCopy = String(copyValue !== undefined ? copyValue : value);
    const isCopied = copiedLabel === label;

    return (
      <div className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
        <div className="min-w-0 pr-2">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal block leading-tight">
            {label}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-xs font-normal text-slate-800 dark:text-slate-200 truncate ${isMonospace ? 'font-mono text-[11px] tracking-tight' : ''}`}>
              {value}
            </span>
            {subtext && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                {subtext}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {extraAction}
          <button
            type="button"
            onClick={() => onCopyField(textToCopy, label)}
            className="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-600 transition-all cursor-pointer opacity-70 group-hover:opacity-100"
            title={`Copy ${label}`}
          >
            {isCopied ? (
              <Check className="w-3 h-3 text-emerald-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
      
      {/* 1. Phone & Online Identity */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-3 sm:p-3.5 shadow-2xs transition-colors">
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Phone &amp; Online Account
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Direct Format</span>
        </div>

        <div className="divide-y divide-slate-100/70 dark:divide-slate-800/70">
          {renderRow('Phone Number', identity.phone, identity.phone, `+${identity.countryCallingCode}`, true, (
            <button
              type="button"
              onClick={() => onCopyField(identity.phonePlain, 'Plain Phone')}
              className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Copy plain digits without formatting"
            >
              Plain
            </button>
          ))}
          {renderRow('Birthday & Age', identity.birthday, identity.birthday, `${identity.age} yrs · ${identity.zodiac}`)}
          {renderRow('Email Address', identity.email, identity.email)}
          {renderRow('Username', identity.username, identity.username, undefined, true)}
          {renderRow('Password', showPassword ? identity.password : '••••••••••••', identity.password, undefined, true, (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          ))}
          {renderRow('Personal Website', identity.website, identity.website)}
        </div>
      </div>

      {/* 2. Finance & Credit Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-3 sm:p-3.5 shadow-2xs transition-colors">
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Finance &amp; Card Details
            </h3>
          </div>
          <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
            Luhn Verified
          </span>
        </div>

        <div className="divide-y divide-slate-100/70 dark:divide-slate-800/70">
          {renderRow('Card Type', identity.creditCard.type, identity.creditCard.type)}
          {renderRow(
            'Card Number',
            maskCard 
              ? `•••• •••• •••• ${identity.creditCard.number.slice(-4)}` 
              : identity.creditCard.formattedNumber,
            identity.creditCard.number,
            undefined,
            true,
            (
              <button
                type="button"
                onClick={() => setMaskCard(!maskCard)}
                className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                title={maskCard ? 'Show digits' : 'Mask digits'}
              >
                {maskCard ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            )
          )}
          {renderRow('Expiration Date', identity.creditCard.expires, identity.creditCard.expires, 'MM/YYYY', true)}
          {renderRow('CVV / Security Code', identity.creditCard.cvv, identity.creditCard.cvv, '3-4 Digits', true)}
          {renderRow('Annual Salary', identity.salary, identity.salary, 'Estimated compensation')}
        </div>

        <div className="mt-2.5 p-2 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-md flex items-start gap-1.5 text-[10px] text-amber-800 dark:text-amber-300 font-normal">
          <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
          <span>Card numbers conform strictly to the Luhn checksum standard for mock testing and form testing only.</span>
        </div>
      </div>

      {/* 3. Employment & Education */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-3 sm:p-3.5 shadow-2xs transition-colors">
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Employment &amp; Education
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Corporate Profile</span>
        </div>

        <div className="divide-y divide-slate-100/70 dark:divide-slate-800/70">
          {renderRow('Company Name', identity.company, identity.company)}
          {renderRow('Job Title / Occupation', identity.occupation, identity.occupation)}
          {renderRow('Industry Sector', identity.industry, identity.industry)}
          {renderRow('Highest Degree', identity.degree, identity.degree)}
          {renderRow('Alma Mater / University', identity.university, identity.university)}
        </div>
      </div>

      {/* 4. Personal Characteristics & Government IDs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-3 sm:p-3.5 shadow-2xs transition-colors">
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Physical &amp; Government ID
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Standard Formats</span>
        </div>

        <div className="divide-y divide-slate-100/70 dark:divide-slate-800/70">
          {renderRow('SSN / National ID', identity.ssn, identity.ssn, 'Valid country format', true)}
          {renderRow('Blood Type', identity.bloodType, identity.bloodType, 'Rh Factor')}
          {renderRow('Height', `${identity.heightImperial} (${identity.heightMetric})`, identity.heightMetric)}
          {renderRow('Weight', `${identity.weightImperial} (${identity.weightMetric})`, identity.weightMetric)}
          {renderRow('Eye Color', identity.eyeColor, identity.eyeColor)}
          {renderRow('Hair Color', identity.hairColor, identity.hairColor)}
          {identity.maidenName && renderRow("Mother's Maiden Name", identity.maidenName, identity.maidenName)}
        </div>
      </div>

      {/* 5. Digital & Tech Footprint (Spans 2 columns on desktop) */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-lg p-3 sm:p-3.5 shadow-2xs transition-colors">
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <Laptop className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Digital &amp; Technical Fingerprint (QA / Microjobs)
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Network Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 divide-y md:divide-y-0 divide-slate-100/70 dark:divide-slate-800/70">
          <div className="divide-y divide-slate-100/70 dark:divide-slate-800/70">
            {renderRow('IPv4 Address', identity.ipv4, identity.ipv4, undefined, true)}
            {renderRow('IPv6 Address', identity.ipv6, identity.ipv6, undefined, true)}
            {renderRow('MAC Address', identity.macAddress, identity.macAddress, undefined, true)}
            {renderRow('UUID / GUID', identity.guid, identity.guid, undefined, true)}
          </div>
          <div className="divide-y divide-slate-100/70 dark:divide-slate-800/70">
            {renderRow('Vehicle Info', `${identity.vehicle.year} ${identity.vehicle.make} ${identity.vehicle.model}`, `${identity.vehicle.year} ${identity.vehicle.make} ${identity.vehicle.model}`, `Plate: ${identity.vehicle.plate}`)}
            {renderRow('Tracking Number', identity.trackingNumber, identity.trackingNumber, 'Courier standard', true)}
            {renderRow('User Agent', identity.userAgent, identity.userAgent, 'Desktop / Mobile browser', true)}
          </div>
        </div>
      </div>

    </div>
  );
};
