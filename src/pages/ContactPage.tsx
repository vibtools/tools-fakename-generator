import React, { useState, useEffect } from 'react';
import { 
  Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, 
  ArrowLeft, Github, Globe, ExternalLink, Clock, Shield 
} from 'lucide-react';

interface ContactPageProps {
  onBackToGenerator: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToGenerator }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback & General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us – Fake Name Generator & Vib Tools Engineering";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    
    // Simulate instantaneous client-side acknowledgment
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      
      {/* Breadcrumb Header */}
      <div className="sticky top-12 sm:top-13 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Generator</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Contact Us</span>
          </div>
          <button
            onClick={onBackToGenerator}
            className="px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all cursor-pointer shadow-2xs"
          >
            Launch Tool
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Support &amp; Developer Channels</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Get in Touch with the Engineering Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Have a question about the Edge REST API, feature requests, bug reports, or enterprise data formats? We respond to all inquiries within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & Information */}
          <div className="md:col-span-5 space-y-4">
            
            <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Direct Contact Channels
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Email Address</span>
                    <a href="mailto:teamdarkdevil24@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      teamdarkdevil24@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">WhatsApp &amp; Support</span>
                    <a href="tel:+8801795470603" className="hover:underline">
                      +880 1795-470603
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Office Location</span>
                    <p className="text-slate-500 dark:text-slate-400">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Response SLA</span>
                    <p className="text-slate-500 dark:text-slate-400">Under 24 Hours (Mon – Sat)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900 dark:text-blue-200">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Vib Tools Developer Network</span>
              </div>
              <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Discover our suite of open developer tools, formatters, generators, and productivity utilities.
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

          {/* Right Column: Interactive Contact Form */}
          <div className="md:col-span-7">
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-5">
              
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you, {name}. Our engineering team has received your message and will respond to <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span> within 24 hours.
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
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Send Us a Direct Message
                  </h3>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    >
                      <option value="Feedback & General Inquiry">Feedback &amp; General Inquiry</option>
                      <option value="Edge REST API Support">Edge REST API Support</option>
                      <option value="Bug Report or Data Correction">Bug Report or Data Correction</option>
                      <option value="Country/Nameset Addition Request">Country / Nameset Addition Request</option>
                      <option value="Commercial & Partner Collaboration">Commercial &amp; Partner Collaboration</option>
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
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your question, feedback, or API inquiry in detail..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Engineering</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
