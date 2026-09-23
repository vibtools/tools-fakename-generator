import React, { useState, useEffect } from 'react';
import { 
  Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, 
  ArrowLeft, Github, Globe, ExternalLink, Clock, Shield, AlertCircle, Loader2,
  LifeBuoy, HelpCircle, Code2, Users, AtSign, Share2
} from 'lucide-react';

interface ContactPageProps {
  onBackToGenerator: () => void;
}

const WEB3FORMS_ACCESS_KEY = 'a1ba16d8-79c9-4c3d-83f9-7de97cff20f9';

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToGenerator }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry & Feedback');
  const [message, setMessage] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Contact Us – Vib Tools | Official Support & Engineering Inquiries";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Honeypot spam check
    if (botcheck) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name.trim(),
          email: email.trim(),
          subject: `[Vib Tools - Fake Name Generator] ${subject}`,
          message: message.trim(),
          from_name: `${name.trim()} (Vib Tools User)`,
          replyto: email.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Unable to deliver message. Please try again or reach out via direct email.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network connection error. Please check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      
      {/* Breadcrumb Header */}
      <div className="sticky top-12 sm:top-13 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Generator</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Contact &amp; Support</span>
          </div>
          <button
            onClick={onBackToGenerator}
            className="px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all cursor-pointer shadow-2xs"
          >
            Launch Tool
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* Header Hero */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Vib Tools &bull; Canonical Organization Identity</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contact Vib Tools &amp; Engineering Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Vib Tools builds practical software, desktop applications, self-hosted infrastructure, and developer utilities for real workflows. We welcome product inquiries, API questions, developer feedback, and bug reports.
          </p>
        </div>

        {/* Main Grid: Details + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact & Company Details */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Contact Channels */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Official Company Contacts
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                
                {/* General Email */}
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">General Inquiries &amp; Press</span>
                    <a href="mailto:hello@vib.tools" className="text-blue-600 dark:text-blue-400 hover:underline">
                      hello@vib.tools
                    </a>
                  </div>
                </div>

                {/* Support Email */}
                <div className="flex items-start gap-2.5">
                  <LifeBuoy className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Product &amp; Technical Support</span>
                    <a href="mailto:support@vib.tools" className="text-blue-600 dark:text-blue-400 hover:underline">
                      support@vib.tools
                    </a>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Phone &amp; WhatsApp Support</span>
                    <a href="tel:+8801795470603" className="hover:underline text-slate-700 dark:text-slate-200 font-medium">
                      +880 1795-470603
                    </a>
                    <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Normalized: +8801795470603
                    </span>
                  </div>
                </div>

                {/* Head Office Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Head Office Address</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">
                      Vib Tools HQ<br />
                      5660 Kochakata, Nageswari<br />
                      Kurigram, Rangpur<br />
                      Bangladesh
                    </p>
                  </div>
                </div>

                {/* Timezone & SLA */}
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Business Hours &amp; SLA</span>
                    <p className="text-slate-500 dark:text-slate-400">
                      GMT+6 (Asia/Dhaka) &bull; Under 24h Response (Mon – Sat)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Author / Maintainer Context */}
            <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Connected Repository Maintainer</span>
              </div>
              <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">Md Nurnobi</strong> (GitHub: <a href="https://github.com/victorsteele" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">@victorsteele</a>) maintains and administers repositories in the Vib Tools organization.
              </p>
            </div>

            {/* Official Social & Community Profiles */}
            <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Official Community Profiles
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a 
                  href="https://github.com/vibtools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Github className="w-3.5 h-3.5 text-slate-900 dark:text-white shrink-0" />
                  <span className="truncate">GitHub @vibtools</span>
                </a>

                <a 
                  href="https://gitlab.com/vibtools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Code2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="truncate">GitLab @vibtools</span>
                </a>

                <a 
                  href="https://x.com/vibtools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <AtSign className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">X (Twitter)</span>
                </a>

                <a 
                  href="https://www.facebook.com/vib.tools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">Facebook</span>
                </a>

                <a 
                  href="https://www.instagram.com/vib.tools/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Share2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span className="truncate">Instagram</span>
                </a>

                <a 
                  href="https://www.reddit.com/user/VibTools/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                >
                  <Share2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate">Reddit u/VibTools</span>
                </a>
              </div>
            </div>

            {/* Official Website Card */}
            <div className="p-4 rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900 dark:text-blue-200">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Vib Tools Official Website</span>
              </div>
              <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Discover our catalog of open-source tools, desktop applications, and self-hosted software.
              </p>
              <a 
                href="https://vib.tools/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1"
              >
                <span>Visit vib.tools</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: Web3Forms Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-5">
              
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you, {name}. Your inquiry has been routed to the Vib Tools engineering and support inbox. We will respond from <a href="mailto:support@vib.tools" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">support@vib.tools</a> within 24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Send Us a Direct Message
                    </h3>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Messages are securely delivered directly to our support desk via Web3Forms.
                    </p>
                  </div>

                  {/* Anti-spam honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                  />

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block">Submission Notice:</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="e.g., Alex Robinson"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Inquiry Category / Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    >
                      <option value="General Inquiry & Feedback">General Inquiry &amp; Feedback (hello@vib.tools)</option>
                      <option value="Product & Technical Support">Product &amp; Technical Support (support@vib.tools)</option>
                      <option value="Edge REST API & Developer Integration">Edge REST API &amp; Developer Integration</option>
                      <option value="Bug Report or Data Correction">Bug Report or Data Correction</option>
                      <option value="Country / Nameset Addition Request">Country / Nameset Addition Request</option>
                      <option value="Partnership & Collaboration">Partnership &amp; Commercial Collaboration</option>
                      <option value="Security Vulnerability Disclosure">Security Disclosure (Private)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Please describe your question, feedback, API requirement, or issue in detail..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting to Web3Forms...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Vib Tools</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Official Inquiry Routing Guide (Section 18 of Master Context) */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Official Inquiry Routing Rules
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            For fastest resolution, please direct your request to the specific channel designated by the Vib Tools engineering policy:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500">
                  <th className="py-2 pr-4 font-semibold">Request Type</th>
                  <th className="py-2 px-4 font-semibold">Preferred Channel</th>
                  <th className="py-2 pl-4 font-semibold">Notes &amp; SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-white">General Company Inquiry / Press</td>
                  <td className="py-2.5 px-4"><a href="mailto:hello@vib.tools" className="text-blue-600 dark:text-blue-400 hover:underline">hello@vib.tools</a></td>
                  <td className="py-2.5 pl-4 text-slate-500 dark:text-slate-400">Response within 24h</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-white">Product &amp; Technical Support</td>
                  <td className="py-2.5 px-4"><a href="mailto:support@vib.tools" className="text-blue-600 dark:text-blue-400 hover:underline">support@vib.tools</a></td>
                  <td className="py-2.5 pl-4 text-slate-500 dark:text-slate-400">Troubleshooting &amp; API assistance</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-white">Bug Report &amp; Feature Requests</td>
                  <td className="py-2.5 px-4"><a href="https://github.com/vibtools" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub Issues</a></td>
                  <td className="py-2.5 pl-4 text-slate-500 dark:text-slate-400">Public repository issue trackers</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-white">Security Vulnerability Report</td>
                  <td className="py-2.5 px-4"><a href="mailto:support@vib.tools" className="text-blue-600 dark:text-blue-400 hover:underline">support@vib.tools</a></td>
                  <td className="py-2.5 pl-4 text-slate-500 dark:text-slate-400">Private disclosure per SECURITY.md</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-white">Direct Phone / WhatsApp</td>
                  <td className="py-2.5 px-4"><a href="tel:+8801795470603" className="hover:underline text-emerald-600 dark:text-emerald-400 font-medium">+880 1795-470603</a></td>
                  <td className="py-2.5 pl-4 text-slate-500 dark:text-slate-400">GMT+6 business hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

