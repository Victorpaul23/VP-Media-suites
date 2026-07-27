import React from 'react';
import { AGENCY_INFO } from '../data/agencyData';
import { Sparkles, MessageSquare, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-lg">
                VP
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                VP Media <span className="text-gold-gradient">Suites</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {AGENCY_INFO.tagline}
            </p>

            <div className="text-xs text-slate-300 font-semibold pt-2">
              Founded & Engineered by Victor Paul • Lagos, Nigeria
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#web-services" className="hover:text-amber-300 transition-colors">
                  Portfolio Websites (₦30,000)
                </a>
              </li>
              <li>
                <a href="#web-services" className="hover:text-amber-300 transition-colors">
                  SMB Platforms (₦90,000) + Free AI Agent
                </a>
              </li>
              <li>
                <a href="#social-marketing" className="hover:text-amber-300 transition-colors">
                  Social Growth & Short-Form Video Reels
                </a>
              </li>
              <li>
                <a href="#social-marketing" className="hover:text-amber-300 transition-colors">
                  WhatsApp & Meta Conversion Funnels
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Direct Reach</h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`https://wa.me/${AGENCY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-300 hover:text-white font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-amber-300 text-slate-950" />
                <span>WhatsApp: {AGENCY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${AGENCY_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email: {AGENCY_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-400">
            © {new Date().getFullYear()} VP Media Suites. All rights reserved. Precision engineering for high-conversion brands.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 flex items-center gap-2 transition-all"
          >
            <span className="font-mono text-[11px] font-bold">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};

