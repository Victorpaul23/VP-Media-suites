import React from 'react';
import { motion } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';
import { navigateTo } from '../utils/navigation';
import heroImage from '../assets/images/hero_image.png';
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Cpu,
  FileText,
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] text-slate-900">
              <span className="block tracking-tight uppercase mb-3 font-extrabold text-4xl sm:text-5xl lg:text-6xl">
                <span className="text-slate-900">WEBSITE </span>
                <span className="text-blue-600">AGENCY</span>
              </span>
              <span className="relative inline-block font-auriol font-semibold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-snug">
                Building the <span className="text-blue-600 font-bold">website</span> you{' '}
                <span className="relative inline-block text-slate-950 font-bold text-glow-imagined">
                  imagined.
                  {/* Sleek yellow brush stroke underline - compact and placed under imagined */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-amber-400 pointer-events-none z-0"
                    viewBox="0 0 160 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9.5C35 4.5 95 3 158 7C125 11.5 65 13 2 9.5Z"
                      fill="#FBBF24"
                      opacity="0.92"
                    />
                    <path
                      d="M6 10.5C45 5.5 110 4.5 152 8"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl font-normal leading-relaxed">
              VP Media: Your go-to media agency for everything you need to elevate your digital presence and grow your brand in the Digital era.
            </p>

            <div className="space-y-1.5 text-sm sm:text-base text-slate-800">
              <p className="font-bold text-amber-800">Our services:</p>
              <p className="font-medium text-slate-700">
                Web Design, Custom Web Applications, E-Commerce, Business Platforms
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
                <span>Send us a message on WhatsApp</span>
              </a>

              <a
                href="/GetQuote"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/GetQuote');
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm border border-amber-400 shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-900" />
                <span>Build My Website</span>
              </a>

              <a
                href="#web-services"
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Packages</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Estimated delivery time line: Days not weeks</span>
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

          {/* Right Column: Premium 3D Glossy Blue Orb with Gentle Levitation */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none flex justify-center items-center py-6 sm:py-10">
              {/* Soft Ambient Radial Halo behind the orb */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-600/25 via-cyan-400/20 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Slow Bouncing Motion Container */}
              <motion.div
                animate={{
                  y: [-14, 14, -14],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 flex items-center justify-center p-2 sm:p-4"
              >
                <div className="relative group cursor-pointer">
                  {/* Subtle outer neon ambient aura */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-cyan-500/30 to-blue-400/30 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                  
                  {/* Hero Emblem Image */}
                  <img
                    src={heroImage}
                    alt="VP Media - Premium Glass Emblem"
                    className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 object-contain drop-shadow-[0_20px_35px_rgba(37,99,235,0.35)] transition-transform duration-500 group-hover:scale-105 select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
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

