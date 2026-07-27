import React, { useState } from 'react';
import { FAQS } from '../data/agencyData';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faqs" className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/40 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>EXPERT KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="text-blue-gradient">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Everything you need to know regarding our web architecture, AI sales assistant deployment, ad campaign management, and turnaround SLAs.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-blue-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search knowledge base (e.g. delivery, ₦90k, AI chatbot)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
          </div>
        </div>

        {/* Accordion Feed */}
        <div className="mt-10 space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-blue-400 bg-blue-50/30 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className={`p-1.5 rounded-xl border transition-all shrink-0 ${isOpen ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60">
                    <p className="pt-3.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

