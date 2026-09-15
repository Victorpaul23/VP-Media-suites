import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';
import { navigateTo } from '../utils/navigation';
import {
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface TierOption {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  turnaround: string;
  popular?: boolean;
  features: string[];
  gradientBg: string;
  borderClass: string;
  selectedBorderClass: string;
  glowColor: string;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  tierId: string;
}

const ALL_TIERS: TierOption[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    price: '₦30,000',
    subtitle: 'For creatives, freelancers, professionals & personal brands',
    turnaround: '3–5 Business Days',
    gradientBg: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 100%)',
    borderClass: 'border-blue-400/50 hover:border-white',
    selectedBorderClass: 'border-white ring-4 ring-white/35 shadow-2xl shadow-blue-600/50',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    features: [
      'High-converting single/multi-page portfolio',
      'Bio, service offer & work showcase catalog',
      'Client reviews & trust testimonials',
      'Direct WhatsApp booking trigger',
      'Fast mobile optimization & Vercel hosting',
    ],
  },
  {
    id: 'smb',
    name: 'SMB Business Website',
    price: '₦100,000',
    subtitle: 'For Medium scale businesses - If you are a vendor, you sell products and services online, etc',
    turnaround: '5–7 Days',
    popular: true,
    gradientBg: 'linear-gradient(145deg, #2563eb 0%, #1d4ed8 100%)',
    borderClass: 'border-blue-400/50 hover:border-amber-300',
    selectedBorderClass: 'border-amber-300 ring-4 ring-amber-300/35 shadow-2xl shadow-blue-600/60',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    features: [
      'Interactive product/service showcase',
      'Lead generation forms with email & WhatsApp alerts',
      'High-conversion copywriting & messaging strategy',
      'SEO & Google search readiness',
      'FREE AI agent + Meta Pixel & Google Tracker setup',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Platform',
    price: '₦500,000+',
    subtitle: 'Custom web platforms, E-commerce, SaaS & portals',
    turnaround: '2–3 Weeks',
    gradientBg: 'linear-gradient(145deg, #1d4ed8 0%, #1e40af 100%)',
    borderClass: 'border-blue-400/50 hover:border-white',
    selectedBorderClass: 'border-white ring-4 ring-white/35 shadow-2xl shadow-blue-600/50',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    features: [
      'Custom database, dashboards & authentication',
      'Payment gateways (Paystack / Flutterwave / Stripe)',
      'Advanced API integrations & automated workflows',
      'Full brand system & custom interactive UI',
      'Dedicated priority support & security audits',
    ],
  },
];

export const GetQuotePage: React.FC = () => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('smb');
  const [timeline, setTimeline] = useState('5-10 days');
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Trigger ripple from pointer coordinate when clicking card
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, tierId: string) => {
    setSelectedTier(tierId);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple: ClickRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      tierId,
    };

    setRipples((prev) => [...prev.slice(-4), newRipple]);

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);
  };

  // Read URL query param on mount if provided (e.g. /GetQuote?tier=portfolio)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get('tier');
      if (tierParam && ALL_TIERS.some((t) => t.id === tierParam.toLowerCase())) {
        setSelectedTier(tierParam.toLowerCase());
      }
    }
  }, []);

  const activeTier = ALL_TIERS.find((t) => t.id === selectedTier) || ALL_TIERS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });

    const whatsappMessage = `*VP MEDIA SUITES - CUSTOM PROJECT QUOTE*
━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
🏢 *Business / Brand:* ${businessName || 'Not specified'}
📧 *Email:* ${email || 'Not specified'}
📱 *Phone / WhatsApp:* ${phone || 'Not specified'}

💼 *Selected Tier:* ${activeTier.name} (${activeTier.price})
⏱️ *Target Timeline:* ${timeline}

📝 *Project Vision & Details:*
${projectDetails || 'Let us discuss details on WhatsApp.'}
━━━━━━━━━━━━━━━━━━━━━
Hi Victor! I generated this custom quote on the website. I would love to discuss starting my project with VP Media Suites!`;

    const url = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    // Trigger X conversion tracking event safely
    try {
      if (typeof window !== 'undefined' && typeof (window as unknown as { twq?: (...args: unknown[]) => void }).twq === 'function') {
        (window as unknown as { twq: (...args: unknown[]) => void }).twq('event', 'tw-rf672-rf8d1', {});
      }
    } catch {
      // Ignore tracking errors
    }
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white pb-20">
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-100/50 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Logo */}
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
              VP
            </div>
            <span className="text-base font-black text-slate-900 tracking-tight">
              VP Media <span className="text-blue-gradient">Suites</span>
            </span>
          </div>

          <a
            href={`https://wa.me/${AGENCY_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Support</span>
          </a>
        </div>
      </header>

      {/* Main Quote Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>OFFICIAL PROPOSAL & QUOTE BUILDER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Build Your Custom <span className="text-blue-gradient">Project Quote</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your preferred website package tier, outline your brand vision, and immediately launch your direct discussion with Victor Paul on WhatsApp with everything pre-configured.
          </p>
        </div>

        {/* Success Banner if already submitted */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 sm:p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-md text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-2xl bg-emerald-500 text-white shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Quote Dispatched to WhatsApp!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your customized scope has been generated. If WhatsApp didn't open automatically, click the button to continue your chat with Victor Paul.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-900 text-xs font-bold hover:bg-emerald-100"
              >
                Edit Form
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
              >
                Return Home
              </button>
            </div>
          </motion.div>
        )}

        {/* Form Grid: Left Configuration & Right Live Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Client Information */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-base font-black text-slate-900">Your Contact Details</h2>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">* Required fields</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Victor Paul"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Business or Brand Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Bundo Enterprise / Freelance Brand"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. yourname@brand.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 807 702 1080"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Website Package Selection */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-base font-black text-slate-900">Select your website package</h2>
                  </div>
                  <span className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Transparent Pricing
                  </span>
                </div>

                {/* Package Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-stretch">
                  {ALL_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    const tierRipples = ripples.filter((r) => r.tierId === tier.id);
                    return (
                      <div
                        key={tier.id}
                        onClick={(e) => handleCardClick(e, tier.id)}
                        style={{ background: tier.gradientBg }}
                        className={`group relative p-4.5 rounded-2xl cursor-pointer flex flex-col justify-between overflow-hidden text-white transition-all duration-300 transform-gpu ${
                          isSelected
                            ? `border-2 ${tier.selectedBorderClass} scale-[1.03] z-20`
                            : `border ${tier.borderClass} shadow-md shadow-slate-900/10 hover:scale-[1.015] hover:shadow-lg opacity-90 hover:opacity-100 z-10`
                        }`}
                      >
                        {/* Tactile Click Ripple Expanding Outward */}
                        {tierRipples.map((ripple) => (
                          <span
                            key={ripple.id}
                            className="tactile-ripple-wave pointer-events-none absolute rounded-full"
                            style={{
                              left: `${ripple.x}px`,
                              top: `${ripple.y}px`,
                              width: '180px',
                              height: '180px',
                              backgroundColor: tier.glowColor,
                              boxShadow: `0 0 25px ${tier.glowColor}`,
                            }}
                          />
                        ))}

                        {/* Shine Sweep: Gloss sweep glides diagonally across the card upon hover */}
                        <div
                          className="pointer-events-none absolute inset-0 -top-1/2 -bottom-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine-sweep z-20"
                          aria-hidden="true"
                        />

                        {tier.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-md z-30">
                            Most Popular
                          </span>
                        )}

                        <div className="relative z-10">
                          <div className="flex items-baseline justify-between gap-1">
                            <h3 className="text-sm font-black text-white tracking-tight">{tier.name}</h3>
                            <span
                              className={`text-sm font-black shrink-0 ${
                                isSelected ? 'text-white' : 'text-blue-100'
                              }`}
                            >
                              {tier.price}
                            </span>
                          </div>

                          <p className="text-[11px] text-blue-100 mt-1.5 leading-relaxed font-normal">
                            {tier.subtitle}
                          </p>

                          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-blue-100">
                            <Clock className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                            <span>Estimated time of delivery: {tier.turnaround}</span>
                          </div>
                        </div>

                        <div className="relative z-10 mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : 'text-blue-200'}`}>
                            {isSelected ? '✓ Selected' : 'Tap to select'}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'border-white bg-white text-blue-600 shadow-xs'
                                : 'border-white/40 bg-blue-900/30 group-hover:border-white/80'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Timeline & Brand Vision */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <h2 className="text-base font-black text-slate-900">
                      Time of delivery - How fast do you want your website to be delivered?
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      '3-5 Days',
                      '5-10 days',
                      'A month+',
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeline(t)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          timeline === t
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Tell Victor About Your Brand Vision or Any Reference Links
                    </label>
                    <textarea
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Briefly describe what your business does, your main goal for the website, and any websites you like the style of..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button on Mobile */}
              <div className="block lg:hidden">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Submit My Website order</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Live Summary Sticky Card (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-xl relative overflow-hidden space-y-6">
              {/* Gold Top Accent Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-800">
                    LIVE QUOTE SUMMARY
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Your Project Blueprint</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900">
                  <Sparkles className="w-4 h-4 fill-amber-500" />
                </div>
              </div>

              {/* Selected Tier Highlights */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Selected Package</span>
                  <span className="text-xs font-black text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    {activeTier.turnaround}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-lg font-black text-slate-900">{activeTier.name}</h4>
                  <span className="text-xl font-black text-blue-600">{activeTier.price}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {activeTier.subtitle}
                </p>
              </div>

              {/* What is Included in this Tier */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Included In {activeTier.name}:
                </span>
                <div className="space-y-2">
                  {activeTier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white text-white" />
                <span>Submit My Website order</span>
              </button>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-slate-500 font-medium">
                  Instant dispatch to WhatsApp with your pre-configured specs
                </p>
                <p className="text-[10px] text-slate-400">
                  Zero spam • Fast quote turnaround • Friendly consultation
                </p>
              </div>
            </div>

            {/* Quick Contact Alternative */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Need an immediate conversation?</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                You can also call or email our team directly at{' '}
                <a href={`mailto:${AGENCY_INFO.email}`} className="text-blue-600 font-bold underline">
                  {AGENCY_INFO.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
