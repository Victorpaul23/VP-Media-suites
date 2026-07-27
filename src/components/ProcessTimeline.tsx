import React from 'react';
import { Lightbulb, Code2, Rocket, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Strategy',
      desc: 'We initiate a rapid strategy session on WhatsApp to align on your offer, target demographic, unique value proposition, and feature requirements.',
      icon: Lightbulb,
    },
    {
      num: '02',
      title: 'Conversion Copy & UI Architecture',
      desc: 'Our design unit crafts high-converting website copy, bespoke visual assets, and high-fidelity interactive UI layouts tailored for maximum conversion.',
      icon: Code2,
    },
    {
      num: '03',
      title: 'Engineering & AI Deployment',
      desc: 'We engineer your platform on lightning-fast Vercel/Cloud infrastructure, integrate security, SEO schema, Meta Pixel, and train your AI Sales Assistant.',
      icon: Rocket,
    },
    {
      num: '04',
      title: 'Deployment & Continuous Growth',
      desc: 'We deliver your platform on schedule with FREE launch marketing graphics! Plus, we maintain ongoing monitoring and performance check-ins.',
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>AGENCY WORKFLOW PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our 4-Step <span className="text-blue-gradient">Precision Process</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Zero friction, zero delays. From initial strategic kickoff to live market launch in 3 to 10 business days guaranteed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 p-7 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all duration-300 space-y-4 group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono font-black text-blue-200 group-hover:text-blue-600 transition-colors">
                    {step.num}
                  </span>
                  <div className="p-3.5 rounded-2xl bg-white text-amber-800 border border-slate-200 group-hover:border-blue-300 transition-all shadow-xs">
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

