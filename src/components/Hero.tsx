import React from 'react';
import { AGENCY_INFO } from '../data/agencyData';
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Cpu,
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const defaultWhatsAppUrl = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hi Victor, I saw your VP Media tech platform hero offer and I want to launch a project!'
  )}`;

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white text-slate-900">
      {/* Background Subtle Mesh Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-100/60 via-amber-100/50 to-indigo-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-5 w-80 h-80 bg-blue-100/50 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <Cpu className="w-3.5 h-3.5 text-amber-600" />
              <span>VP MEDIA SUITES • DIGITAL ERA LAB</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              ELEVATE YOUR BRAND.{' '}
              <span className="text-blue-gradient drop-shadow-xs">
                DOMINATE THE DIGITAL ERA.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl font-normal leading-relaxed">
              VP Media: Your go-to media agency for everything you need to elevate your digital presence and grow your brand in the Digital era.
            </p>

            <div className="space-y-1.5 text-sm sm:text-base text-slate-800">
              <p className="font-bold text-amber-800">Our services:</p>
              <p className="font-medium text-slate-700">
                Web Design, Social media Marketing, Digital Advertising, Video editing
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-4 h-4 fill-white text-white" />
                <span>DM Victor on WhatsApp ({AGENCY_INFO.phone})</span>
              </a>

              <a
                href="#web-services"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Web Packages (From ₦30k)</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3–5 Days Rapid Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Security & Continuous Support</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Premium Aurora Conic Gradient Border */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Soft Ambient Background Glow */}
              <div className="aurora-border-ambient">
                <div className="aurora-border-glow" />
              </div>

              {/* Rotating Conic Gradient Border Wrapper */}
              <div className="aurora-border-wrapper">
                <div className="aurora-border-glow" />
                
                {/* Inner Image Frame */}
                <div className="relative z-10 bg-white rounded-[1.55rem] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/d/1hnxm3eDhKN76sRiRpaATcaxJhHAyfrzV"
                    alt="VP Media - Digital Elevation"
                    className="w-full h-auto object-cover rounded-[1.55rem] hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://drive.google.com/uc?export=view&id=1hnxm3eDhKN76sRiRpaATcaxJhHAyfrzV';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Stats Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {AGENCY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-black text-blue-600 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1.5 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

