import React, { useState } from 'react';
import { SOCIAL_TIERS, DIGITAL_ADS, AGENCY_INFO } from '../data/agencyData';
import { AuroraCard } from './AuroraCard';
import {
  Share2,
  Check,
  MessageSquare,
  Video,
  BarChart2,
  Users,
  Target,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Instagram,
  Facebook,
  Play,
  Film,
  Zap,
} from 'lucide-react';

export const SocialMediaServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'ads' | 'video'>('tiers');

  return (
    <section id="social-marketing" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
            <Share2 className="w-3.5 h-3.5 text-amber-600" />
            <span>SOCIAL GROWTH & AD ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            SOCIAL MEDIA MARKETING, PAID ADS & VIRAL REELS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Turn passive scrollers into passionate buyers with high-converting visual assets, viral video reels, and precision-targeted WhatsApp & Meta advertising funnels.
          </p>

          {/* Sub-navigation Tabs */}
          <div className="pt-6 flex justify-center">
            <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('tiers')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'tiers'
                    ? 'bg-blue-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Social Growth Tiers
              </button>
              <button
                onClick={() => setActiveTab('ads')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'ads'
                    ? 'bg-blue-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Digital Advertising
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'video'
                    ? 'bg-blue-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Video Editing & Reels
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Social Tiers */}
        {activeTab === 'tiers' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch animate-in fade-in duration-300">
            {SOCIAL_TIERS.map((tier) => {
              const whatsAppUrl = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                tier.whatsAppMessage
              )}`;

              const isElite = tier.id === 'elite';

              if (isElite) {
                return (
                  <div key={tier.id} className="aurora-card-wrapper h-full">
                    <div className="gold-aurora-card-bg" />
                    <div className="aurora-card-content bg-gradient-to-b from-amber-50/80 via-white to-amber-50/50 p-7 flex flex-col justify-between h-full text-slate-900 border border-amber-300 shadow-md">
                      <div>
                        {/* Badge */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase shadow-xs">
                            <Sparkles className="w-3 h-3 text-slate-950" /> Most Recommended
                          </span>
                          <span className="text-[10px] text-amber-900 font-mono font-bold">3 PLATFORMS</span>
                        </div>

                        {/* Title & Frequency */}
                        <div className="mt-5 space-y-2">
                          <h3 className="text-2xl font-black text-slate-900">{tier.title}</h3>
                          <div className="text-sm font-bold text-amber-800">{tier.postFrequency}</div>
                          <p className="text-xs text-slate-600">{tier.contentTypes}</p>
                        </div>

                        {/* Features */}
                        <div className="mt-6 space-y-2.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Comprehensive Package:
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
                      </div>

                      {/* CTA */}
                      <div className="mt-8 pt-4 border-t border-amber-200 space-y-2">
                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                        >
                          <MessageSquare className="w-4 h-4 fill-white text-white" />
                          <span>Get Started with Elite Tier</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={tier.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200 flex flex-col justify-between hover:border-blue-400 transition-all shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                        {tier.recommendedFor}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mt-5 space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">{tier.title}</h3>
                      <div className="text-sm font-semibold text-blue-600">{tier.postFrequency}</div>
                      <p className="text-xs text-slate-500">{tier.contentTypes}</p>
                    </div>

                    {/* Features */}
                    <div className="mt-6 space-y-2.5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Package Scope:
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
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>Inquire About {tier.title}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Digital Advertising */}
        {activeTab === 'ads' && (
          <div className="mt-12 space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                  ADVERTISING DIVISION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Get Placed Directly In Front Of Buyers Ready To Buy
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  We engineer multi-channel paid ad campaigns with high-impact copywriting, custom audience targeting, retargeting pixels, and direct WhatsApp click funnels.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DIGITAL_ADS.map((ad, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Target className="w-5 h-5 text-amber-700" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{ad.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{ad.description}</p>
                    <a
                      href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hi Victor, I want to run ${ad.name} for my brand!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 pt-2"
                    >
                      <span>Launch Campaign</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Video Editing */}
        {activeTab === 'video' && (
          <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold">
                  <Film className="w-3.5 h-3.5 text-amber-700" /> FOR CREATORS, ENTREPRENEURS & BRANDS
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
                  Too Busy To Edit Your Reels & TikToks? We Handle It All.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Whether it's TikTok Reels, Instagram Highlights, animated captions, or raw footage transformation — we edit your videos into scroll-stopping content that builds authority and drives sales.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    ✓ High-retention cuts & pacing
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    ✓ Animated text & captions
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    ✓ Sound FX & viral audio sync
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    ✓ Fast 24-48hr video turnaround
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                      'Hi Victor, I need video editing for my Reels/TikToks! Here is what I need:'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:scale-[1.02] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Raw Footage / Inquire Video Editing</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border border-amber-300">
                  <Video className="w-8 h-8 text-amber-700" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Raw Footage → Viral Reels</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Send us your raw phone videos via WhatsApp or Google Drive, and we return polished, caption-ready videos built to convert!
                </p>
                <div className="text-xs font-mono font-bold text-amber-800">
                  ⚡ 24-48 HOURS GUARANTEED TURNAROUND
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

