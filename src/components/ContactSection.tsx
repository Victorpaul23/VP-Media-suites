import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AGENCY_INFO } from '../data/agencyData';
import { Mail, Phone, MessageSquare, Send, Sparkles, CheckCircle2, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: 'Small/Medium Business',
    serviceNeeded: 'SMB Website (₦90,000)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const whatsappText = `Hi Victor! New message from website contact form:
Name: ${formData.name}
Email: ${formData.email}
Business Type: ${formData.businessType}
Service Interested In: ${formData.serviceNeeded}
Message: ${formData.message}`;

    const url = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-100/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>DIRECT AGENCY CONTACT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Let's Build Your <span className="text-blue-gradient">Digital Dominance</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Have a project in mind, need a custom software or web quote, or want to deploy automated WhatsApp ad funnels? Contact Victor Paul directly.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5 pt-2">
              <a
                href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hi Victor, I want to talk about a digital media project for my business.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                  <MessageSquare className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                    WhatsApp Direct
                  </div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {AGENCY_INFO.phone}
                  </div>
                  <div className="text-[10px] text-slate-500">Fastest response • Available 24/7</div>
                </div>
              </a>

              <a
                href={`mailto:${AGENCY_INFO.email}?subject=Project Inquiry - VP Media Suites`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-amber-800 border border-slate-200 flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {AGENCY_INFO.email}
                  </div>
                  <div className="text-[10px] text-slate-500">Detailed proposals & contract decks</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Form Column with Gold Aurora Wrapper */}
          <div className="lg:col-span-7">
            <div className="aurora-card-wrapper w-full">
              <div className="gold-aurora-card-bg" />
              <div className="aurora-card-content p-6 sm:p-8 bg-white rounded-[22px] border border-amber-300 shadow-md">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto border border-amber-300">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Message Dispatched!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Your message has been formatted and redirected to WhatsApp. Victor Paul will respond shortly!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Quick Project Request</h3>
                        <p className="text-xs text-slate-500">Fill in details to launch your custom build</p>
                      </div>
                      <Sparkles className="w-5 h-5 text-amber-600" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Victor Paul"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Your Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. paulvictor138@gmail.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Business Type</label>
                        <select
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Freelancer/Creative">Freelancer / Creative</option>
                          <option value="Small/Medium Business">Small / Medium Business</option>
                          <option value="Enterprise/E-commerce">Enterprise / E-commerce</option>
                          <option value="Creator/Coach">Creator / Coach</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Service Interested In</label>
                        <select
                          value={formData.serviceNeeded}
                          onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Portfolio Website (₦30,000)">Portfolio Website (₦30,000)</option>
                          <option value="SMB Website (₦90,000)">SMB Website (₦90,000)</option>
                          <option value="Enterprise Website (₦500,000+)">Enterprise Website (₦500k+)</option>
                          <option value="Elite Social Marketing">Elite Social Marketing</option>
                          <option value="WhatsApp/Meta Ads">WhatsApp / Meta Ads</option>
                          <option value="Video Reels Editing">Video Reels Editing</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Tell us about your brand vision</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe what you want to achieve..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                    >
                      <Send className="w-4 h-4 fill-white text-white" />
                      <span>Submit & Chat Victor On WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

