import React, { useState, useEffect } from 'react';
import { AGENCY_INFO } from '../data/agencyData';
import { MessageSquare, Menu, X, Sparkles, ArrowUpRight, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why VP', href: '#why-us' },
    { name: 'Web Packages', href: '#web-services' },
    { name: 'Social & Ads', href: '#social-marketing' },
    { name: 'Showcase', href: '#portfolio' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const defaultWhatsAppUrl = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hi Victor, I visited VP Media Suites tech platform and I want to enquire about your services.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md py-3'
          : 'bg-white/60 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white font-black text-xl shadow-md shadow-blue-600/20 group-hover:scale-105 transition-all duration-300 border border-blue-400/30">
              <span className="relative z-10 tracking-tighter">VP</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  VP MEDIA<span className="text-amber-600 font-extrabold">.SUITES</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <Cpu className="w-2.5 h-2.5 text-amber-600 animate-pulse" /> NEXT-GEN
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide hidden sm:inline-block">
                Digital Engineering & Growth Lab
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-xl p-1.5 rounded-full border border-slate-200 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-white transition-all duration-200 hover:shadow-xs"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Call to Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all duration-200"
            >
              Custom Quote
            </button>

            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>DM Victor</span>
              <ArrowUpRight className="w-3 h-3 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-center"
              >
                Request Custom Proposal
              </button>
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 text-center flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>DM Victor on WhatsApp ({AGENCY_INFO.phone})</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

