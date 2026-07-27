import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';
import { Star, Quote, Sparkles, CheckCircle, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-100/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>VERIFIED CLIENT OUTCOMES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Trusted By Entrepreneurs & <span className="text-blue-gradient">High-Growth Brands</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See how founders, agency heads, and online creators scaled revenue using VP Media Suites digital infrastructure.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 flex flex-col justify-between space-y-6 relative hover:border-blue-400 transition-all duration-300 shadow-xs hover:shadow-md group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  {t.resultsBadge && (
                    <span className="text-[10px] font-mono bg-amber-50 text-amber-900 px-3 py-1 rounded-full font-bold border border-amber-200">
                      {t.resultsBadge}
                    </span>
                  )}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-600 text-white" />
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.role}, <span className="text-slate-700 font-medium">{t.company}</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-amber-800 mt-0.5">
                    {t.serviceUsed}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

