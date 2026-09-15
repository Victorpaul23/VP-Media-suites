import React, { useEffect } from 'react';
import { AGENCY_INFO } from '../data/agencyData';
import { navigateTo } from '../utils/navigation';
import { openCookieSettings } from '../utils/cookieConsent';
import { Shield, ArrowLeft, Cookie, ExternalLink, Mail, MessageSquare, CheckCircle, Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white pb-24">
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-100/50 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            onClick={handleBackHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openCookieSettings()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
            >
              <Cookie className="w-3.5 h-3.5 text-blue-600" />
              <span>Manage Cookie Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 relative z-10">
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Document Title Header */}
          <div className="border-b border-slate-100 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>TRANSPARENCY & DATA PRIVACY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Section 1: Overview */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>1. Overview</span>
            </h2>
            <p>
              At <strong>VP Media Suites</strong>, we are committed to respecting your privacy and safeguarding any information you provide while interacting with our website. This Privacy Policy explains what information we collect, how it is used, and the choices you have regarding cookies, advertising measurement, and your personal data.
            </p>
          </section>

          {/* Section 2: Form Information */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>2. Information Submitted Through the Get Quote Form</span>
            </h2>
            <p>
              When you request a proposal or quote for website design, software engineering, or related services on our website, you may voluntarily provide certain personal and business information, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
              <li><strong>Your full name</strong></li>
              <li><strong>Email address</strong></li>
              <li><strong>Phone or WhatsApp contact number</strong></li>
              <li><strong>Business or brand name</strong></li>
              <li><strong>Project requirements, target timeline preferences, and specific website specifications</strong></li>
            </ul>
            <p>
              <strong>How We Use This Information:</strong> The information submitted through our quotation generator and contact forms is used strictly to evaluate your project scope, prepare tailored quotes, communicate regarding your enquiry, and provide the requested digital design and engineering services. We do not sell, rent, or trade your contact information to third parties for independent marketing purposes.
            </p>
          </section>

          {/* Section 3: X (Twitter) Pixel */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>3. Advertising Measurement & The X (Twitter) Pixel</span>
            </h2>
            <p>
              Our website uses the <strong>X (Twitter) Pixel</strong>, an advertising and analytics tool operated by X Corp. The X Pixel allows us to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
              <li>Measure the effectiveness and performance of our advertising campaigns on the X platform;</li>
              <li>Track conversion actions (such as when visitors explore website packages or submit quote requests);</li>
              <li>Analyze aggregated website traffic and audience engagement patterns;</li>
              <li>Potentially build advertising audiences to reach prospective clients interested in our web development services.</li>
            </ul>
            <p>
              <strong>How X Uses Tracking Technologies:</strong> X may use cookies, pixels, tags, local storage, or similar technologies to collect information about your browser and your interactions with our website. This data is transmitted to and processed by X Corp. in accordance with X’s Privacy Policy.
            </p>
          </section>

          {/* Section 4: Managing Consent & Opting Out */}
          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-blue-600" />
              <span>4. Managing Your Cookie Preferences & Opting Out</span>
            </h2>
            <p>
              We believe in giving you control over non-essential tracking technologies. You have multiple ways to manage or withdraw your consent:
            </p>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <h3 className="font-bold text-blue-950 text-sm">A. On-Site Cookie Settings (VP Media Suites)</h3>
              <p className="text-xs text-blue-900/90 leading-relaxed">
                You can accept, customize, or withdraw consent for non-essential advertising and analytics cookies (including the X Pixel) at any time directly on this website. Click the button below or use the <strong>"Cookie Settings"</strong> link located in our footer:
              </p>
              <button
                type="button"
                onClick={() => openCookieSettings()}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Cookie className="w-3.5 h-3.5" />
                <span>Open Cookie Settings</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">B. Opting Out of Interest-Based Advertising on X</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you have an account on X (Twitter), you can control how your data is used for personalized advertising:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                <li>Log in to your X account and navigate to <strong>Settings and privacy &gt; Privacy and safety &gt; Personalization and data</strong>.</li>
                <li>Adjust or toggle off <strong>Personalized ads</strong> and <strong>Data sharing with business partners</strong>.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">C. Industry-Wide Consumer Opt-Out Choices</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can also opt out of interest-based advertising from participating companies through self-regulatory advertising programs:
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline font-semibold"
                >
                  <span>Digital Advertising Alliance (DAA) Choice Tool</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline font-semibold"
                >
                  <span>Network Advertising Initiative (NAI) Opt-Out</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">D. Browser and Device Settings</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most web browsers allow you to modify cookie settings, block third-party cookies, or clear previously stored cookies via browser preferences or settings.
              </p>
            </div>
          </section>

          {/* Section 5: Third-Party Services Used */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">
              5. Communications & External Tools
            </h2>
            <p>
              Our website facilitates direct client communication via <strong>WhatsApp</strong> (operated by Meta) when you choose to dispatch your quote or start a direct conversation. When you click our WhatsApp links, you are directed to WhatsApp’s interface, which operates under WhatsApp’s respective privacy terms.
            </p>
          </section>

          {/* Section 6: Policy Updates */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">
              6. Policy Updates
            </h2>
            <p>
              We may revise this Privacy Policy periodically to reflect updates in our operational practices, marketing tools, or regulatory standards. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          {/* Section 7: Contact Us */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900">
              7. Contact VP Media Suites
            </h2>
            <p>
              If you have any questions, inquiries, or requests regarding this Privacy Policy or your data, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={`mailto:${AGENCY_INFO.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{AGENCY_INFO.email}</span>
              </a>
              <a
                href={`https://wa.me/${AGENCY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Direct WhatsApp Consultation</span>
              </a>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
