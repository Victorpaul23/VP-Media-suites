import React, { useState } from 'react';
import { WEBSITE_TIERS, AGENCY_INFO } from '../data/agencyData';
import { AuroraCard } from './AuroraCard';
import {
  Globe,
  Check,
  Gift,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  BarChart,
  Cpu,
} from 'lucide-react';

interface WebsiteServicesProps {
  onOpenConsultation: () => void;
}

export const WebsiteServices: React.FC<WebsiteServicesProps> = ({ onOpenConsultation }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'NGN' | 'USD'>('NGN');

  const formatPrice = (priceStr: string, numericVal: number) => {
    if (selectedCurrency === 'USD') {
      if (numericVal >= 500000) return '$350+ USD';
      if (numericVal === 90000) return '$65 USD';
      if (numericVal === 30000) return '$22 USD';
    }
    return priceStr;
  };

  return (
    <section id="web-services" className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Backdrop */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-amber-100/50 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>DIGITAL PLATFORM ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Our Website Offerings
            </h2>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSelectedCurrency('NGN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCurrency === 'NGN'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇳🇬 Naira (₦)
            </button>
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCurrency === 'USD'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇺🇸 USD ($)
            </button>
          </div>
        </div>

        {/* Website Tiers Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {WEBSITE_TIERS.map((tier) => {
            const whatsAppUrl = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
              tier.whatsAppMessage
            )}`;

            // Popular Tier (SMB - ₦90k) gets Gold Aurora Card Wrapper
            if (tier.popular) {
              return (
                <div key={tier.id} className="aurora-card-wrapper h-full">
                  <div className="gold-aurora-card-bg" />
                  <div className="aurora-card-content bg-gradient-to-b from-amber-50/80 via-white to-amber-50/50 p-7 flex flex-col justify-between h-full text-slate-900 border border-amber-300 shadow-md">
                    <div>
                      {/* Top Badge */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-wide uppercase shadow-xs">
                          <Sparkles className="w-3 h-3 text-slate-950" /> Most Popular Choice
                        </span>
                        <span className="text-[10px] text-amber-900 font-mono font-bold">SMB SPECIALIST</span>
                      </div>

                      {/* Tier Title & Price */}
                      <div className="mt-5 space-y-2">
                        <h3 className="text-2xl font-black text-slate-900">{tier.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{tier.tagline}</p>
                        <div className="pt-2 flex items-baseline gap-2">
                          <span className="text-4xl font-black text-blue-600">
                            {formatPrice(tier.price, tier.numericPrice)}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/ complete build</span>
                        </div>
                      </div>

                      {/* Hosting Info */}
                      <div className="mt-4 p-3 rounded-xl bg-amber-100/60 border border-amber-300 text-xs text-amber-900 font-semibold flex items-center gap-2">
                        <Globe className="w-4 h-4 shrink-0 text-amber-700" />
                        <span>{tier.hosting}</span>
                      </div>

                      {/* Features List */}
                      <div className="mt-6 space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Architecture & Features:
                        </span>
                        {tier.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                            <div className="mt-0.5 p-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* FREE Bonuses Section */}
                      <div className="mt-6 p-3.5 rounded-xl bg-amber-100/80 border border-amber-300 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                          <Gift className="w-4 h-4 text-amber-700" />
                          <span>FREE Included Tech Bonuses:</span>
                        </div>
                        {tier.freeBonuses.map((bonus, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-amber-950 font-medium">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{bonus}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 pt-4 border-t border-amber-200 space-y-2">
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <MessageSquare className="w-4 h-4 fill-white text-white" />
                        <span>Order SMB Platform (₦90,000)</span>
                      </a>
                      <p className="text-[10px] text-center text-slate-500">
                        Fast turnaround • Direct WhatsApp onboarding with Victor
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard Cards (Portfolio & Enterprise)
            return (
              <div
                key={tier.id}
                className="bg-white rounded-3xl p-7 border border-slate-200 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {tier.targetAudience}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono font-medium">{tier.hosting}</span>
                  </div>

                  {/* Title & Price */}
                  <div className="mt-5 space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">{tier.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{tier.tagline}</p>
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">
                        {formatPrice(tier.price, tier.numericPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Key Highlights:
                    </span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="mt-0.5 p-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* FREE Bonuses */}
                  <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>Free Launch Gift:</span>
                    </div>
                    {tier.freeBonuses.map((bonus, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-4 border-t border-slate-100 space-y-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span>
                      {tier.id === 'portfolio'
                        ? 'Order Portfolio Site (₦30,000)'
                        : 'Discuss Enterprise Project'}
                    </span>
                  </a>
                  <p className="text-[10px] text-center text-slate-500">
                    Direct pre-filled WhatsApp message to Victor
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

