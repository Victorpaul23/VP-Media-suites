import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';
import { navigateTo } from '../utils/navigation';
import {
  fireXConversionEvent,
  fireTikTokEvent,
  openCookieSettings,
  trackVendorEvent,
} from '../utils/cookieConsent';
import {
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Clock,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Globe,
  Zap,
  Users,
  Play,
  Maximize,
  X,
} from 'lucide-react';

export interface QuoteTierOption {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  subtitle: string;
  targetFit: string;
  nichesTitle?: string;
  niches: string[];
  features: string[];
  highlight?: boolean;
  featuredBadge?: string;
}

const QUOTE_TIERS: QuoteTierOption[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    price: '₦150,000',
    numericPrice: 150000,
    subtitle: 'For freelancers and Small businesses',
    targetFit: 'This is for you if you are a small business, a professional, or a freelancer',
    nichesTitle: 'Example:',
    niches: [
      'Video editors or videographers',
      'Photographers',
      'Coaches',
      'Consultants',
      'Creatives',
      'Influencers',
      'online vendors (for clothes, shoes etc).',
      'and similar businesses',
    ],
    features: [
      'A custom domain name',
      'Business pages',
      'A WhatsApp delivery system',
      'A featured catalogue section',
      'Free website hosting',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Website',
    price: '₦250,000',
    numericPrice: 250000,
    subtitle: 'For large and e-commerce businesses',
    targetFit: 'This is for you if you sell to high-ticket clients or you get frequent orders from clients;',
    niches: [
      'Real estate',
      'Solar',
      'Automobile',
      'Jewelry',
      'High-end Gadgets & computers',
      'Home appliances',
    ],
    highlight: true,
    featuredBadge: 'MOST POPULAR FOR SCALING BRANDS',
    features: [
      'Custom domain name & high-speed cloud hosting',
      'Interactive product / service catalogue & add-to-cart',
      'Automated WhatsApp order workflow & payment checkout',
      'High-converting copywriting & mobile optimization',
      'Admin management dashboard & ongoing support',
      'Free website management for 3 months.',
    ],
  },
  {
    id: 'custom',
    name: 'Advanced website',
    price: '₦500,000+',
    numericPrice: 500000,
    subtitle: 'For large corporations, software companies, and big brands',
    targetFit: 'For large corporations, software companies, and big brands.',
    niches: [],
    features: [
      'Custom database and client management system integration',
      'Payment gateways (Paystack / Flutterwave / Stripe)',
      'Advanced API integrations & automated workflows',
      'Monthly maintenance and monitoring',
      'Free website hosting for 3 years.',
    ],
  },
];

// Hero layout slides (Consultant, Personal Brand, Car, Hair Vendor, Cybersecurity, Gadget Store, Real Estate, Skin care)
const HERO_LAYOUT_SLIDES = [
  {
    name: 'Consultant website',
    image: 'https://lh3.googleusercontent.com/d/163-YOGvqCU04RfJmmMQKWGgBoauypzFb',
  },
  {
    name: 'Personal brand website',
    image: 'https://lh3.googleusercontent.com/d/1E8WGrW-fnC_Ohtv8oBJBxXoiZrj69jMy',
  },
  {
    name: 'Car website',
    image: 'https://lh3.googleusercontent.com/d/1b3f7E5OqDysrGOvIE_6XldRAPIFYhQw3',
  },
  {
    name: 'Hair vendor website',
    image: 'https://lh3.googleusercontent.com/d/1k3jipn0_BVacvjtG2tqmYHTteIgI0r9C',
  },
  {
    name: 'Cybersecurity website',
    image: 'https://lh3.googleusercontent.com/d/1IGYF8yd9QRI6J0UKXVFHbGpGvdKWknUD',
  },
  {
    name: 'Gadget store',
    image: 'https://lh3.googleusercontent.com/d/1PAhGqjq1TM8fIbPrLkY3A0NNwPnNiO7t',
  },
  {
    name: 'Real estate',
    image: 'https://lh3.googleusercontent.com/d/1OiwbGk6TnlXyamzbewYiA3J12tDc4kOa',
  },
  {
    name: 'Skin care brand website',
    image: 'https://lh3.googleusercontent.com/d/1FphXbLnxFcG-SitF-tDd4OXJM6O-b5rl',
  },
];

interface WebsiteSampleItem {
  id: string;
  name: string;
  category: string;
  image: string;
  url?: string;
}

const FEATURED_WEBSITE_SAMPLES: WebsiteSampleItem[] = [
  {
    id: 'consultant',
    name: 'The premium consultant',
    category: 'Consultant website',
    image: 'https://lh3.googleusercontent.com/d/163-YOGvqCU04RfJmmMQKWGgBoauypzFb',
    url: 'https://www.thepremiumconsultant.com/',
  },
  {
    id: 'victor-paul',
    name: 'Victor paul',
    category: 'Personal brand',
    image: 'https://lh3.googleusercontent.com/d/1E8WGrW-fnC_Ohtv8oBJBxXoiZrj69jMy',
    url: 'https://www.victorpaul.online/',
  },
  {
    id: 'fedarch',
    name: 'Fedarch Stores',
    category: 'Online store',
    image: 'https://lh3.googleusercontent.com/d/1jP6OA_L0sQuKE8xzANtegt2wIrbJeMfR',
    url: 'https://www.fedarchstores.com/',
  },
  {
    id: 'strongersource',
    name: 'StrongerSource Cyber',
    category: 'Cybersecurity',
    image: 'https://lh3.googleusercontent.com/d/1IGYF8yd9QRI6J0UKXVFHbGpGvdKWknUD',
    url: 'https://www.strongersourcecyberllc.com/',
  },
  {
    id: 'gerald-ezekwe',
    name: 'Gerald Ezekwe',
    category: 'Personal brand',
    image: 'https://lh3.googleusercontent.com/d/1VNkvXoH231MKAMQlwzzQHFhM89VpZDuE',
    url: 'https://www.geraldezekwe.com/',
  },
  {
    id: 'bundo',
    name: 'Bundo Enterprise',
    category: 'SMB business platform',
    image: 'https://lh3.googleusercontent.com/d/1YVDEr0HwkwLW7WyJgP_8rqz8fuT8j-TA',
    url: 'https://bundos-enterprise.vercel.app/',
  },
];

interface VideoTestimonialItem {
  id: string;
  name: string;
  driveId: string;
  thumbnail: string;
  embedUrl: string;
  badge: string;
}

const VIDEO_TESTIMONIALS: VideoTestimonialItem[] = [
  {
    id: 'bundo-enterprise',
    name: 'CEO, Bundo Enterprise',
    driveId: '1ZaBuDgS6ygj3aqpA06MsUouJd0oKGGxy',
    thumbnail: 'https://lh3.googleusercontent.com/d/1ZaBuDgS6ygj3aqpA06MsUouJd0oKGGxy',
    embedUrl: 'https://drive.google.com/file/d/1ZaBuDgS6ygj3aqpA06MsUouJd0oKGGxy/preview',
    badge: 'Enterprise Platform',
  },
  {
    id: 'creativus-john',
    name: 'John, CEO, Creativus',
    driveId: '10sLNpPcaDCHiLSrbVe74J0RR_GU4OMiZ',
    thumbnail: 'https://lh3.googleusercontent.com/d/10sLNpPcaDCHiLSrbVe74J0RR_GU4OMiZ',
    embedUrl: 'https://drive.google.com/file/d/10sLNpPcaDCHiLSrbVe74J0RR_GU4OMiZ/preview',
    badge: 'Creative Agency Brand',
  },
];

export const GetQuotePage: React.FC = () => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [timeline, setTimeline] = useState('This week');
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inlinePlaying, setInlinePlaying] = useState<Record<string, boolean>>({});
  const [modalVideo, setModalVideo] = useState<VideoTestimonialItem | null>(null);

  const handlePlayInline = (id: string) => {
    setInlinePlaying((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleOpenLargerVideo = (video: VideoTestimonialItem) => {
    setModalVideo(video);
  };

  // Layout showcase slide state (slides in, expands, stays for 3 seconds)
  const [layoutSlideIndex, setLayoutSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLayoutSlideIndex((prev) => (prev + 1) % HERO_LAYOUT_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const formSectionRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  // Set document title and track page view on mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Build Your High-Converting Website | VP Media Suites';

    // Track PageView strictly respecting advertising consent
    trackVendorEvent('PageView', { path: '/getquote' });
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }

    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Read URL query parameter on mount and map gracefully
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get('tier')?.toLowerCase();
      if (tierParam) {
        if (tierParam === 'portfolio' || tierParam === 'starter') {
          setSelectedTier('starter');
        } else if (tierParam === 'smb' || tierParam === 'premium') {
          setSelectedTier('premium');
        } else if (tierParam === 'enterprise' || tierParam === 'custom') {
          setSelectedTier('custom');
        }
      }
    }
  }, []);

  const activeTier = QUOTE_TIERS.find((t) => t.id === selectedTier) || QUOTE_TIERS[1];

  const scrollToOrderForm = (tierId?: string) => {
    if (tierId) {
      setSelectedTier(tierId);
    }
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Form submission handler: preserves existing validation, pixels, and WhatsApp handoff
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields before proceeding to WhatsApp
    if (!name.trim()) {
      const nameInput = document.querySelector<HTMLInputElement>('input[required]');
      if (nameInput) {
        nameInput.focus();
        nameInput.reportValidity?.();
      }
      return;
    }

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });

    const whatsappMessage = `*VP MEDIA SUITES - WEBSITE ORDER & QUOTE*
━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name.trim()}
🏢 *Business / Brand:* ${businessName.trim() || 'Not specified'}
📧 *Email:* ${email.trim() || 'Not specified'}
📱 *Phone / WhatsApp:* ${phone.trim() || 'Not specified'}

💼 *Selected Package:* ${activeTier.name} (${activeTier.price})
⏱️ *Target Timeline:* ${timeline}

📝 *Project Vision & Details:*
${projectDetails.trim() || 'Let us discuss details on WhatsApp.'}
━━━━━━━━━━━━━━━━━━━━━
Hi Victor! I selected the ${activeTier.name} (${activeTier.price}) on your website. Let's discuss building my high-converting website!`;

    const url = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Trigger advertising conversion tracking events strictly with non-essential cookie consent
    fireXConversionEvent('tw-rf672-rf8d1', {});
    fireXConversionEvent('tw-rg2tf-rg9ir', {});
    fireTikTokEvent('Lead');
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }

    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-['Inter',sans-serif] antialiased selection:bg-[#f1c72c] selection:text-[#0f172a]">
      {/* ───────────────────────────────────────────────────────────
          TOP BAR
      ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#233dff] via-[#1a32ed] to-[#1222cc] border-b border-white/10 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="flex items-center gap-2.5 font-['Sora',sans-serif] font-bold text-base tracking-tight text-white hover:text-[#f1c72c] transition-colors whitespace-nowrap"
            >
              <span className="w-8 h-8 rounded-lg bg-[#f1c72c] text-[#0f172a] flex items-center justify-center font-black text-xs shadow-xs">
                VP
              </span>
              <span>VP MEDIA SUITES</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/90">
            <a href="#why-website" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap">
              Why Build a Website?
            </a>
            <a href="#why-trust-us" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap">
              Why Trust Us
            </a>
            <a href="#pricing" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap">
              Our Pricing
            </a>
            <a href="#samples" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap">
              Website Samples
            </a>
            <a href="#reviews" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap">
              Reviews
            </a>
          </nav>

          <button
            onClick={() => scrollToOrderForm('premium')}
            className="px-4 py-2 rounded-xl bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a] font-['Sora',sans-serif] font-bold text-xs tracking-tight shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Build my website
          </button>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
      ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] text-white overflow-hidden">
        {/* Subtle Ambient Background Mesh */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#f1c72c]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Header Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#f1c72c]" />
              <span className="font-['Sora',sans-serif] tracking-wide uppercase">
                High-Converting Web Development
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-['Sora',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white"
            >
              We Design Websites for businesses and personal brands that attract high-value
              customers and clients.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="font-['Inter',sans-serif] text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto font-normal"
            >
              A website isn’t just a place to display products and services. It&apos;s a place to
              gain trust and convert interest into sales. Let’s build your high-converting website.
            </motion.p>

            {/* Primary Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => scrollToOrderForm()}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a] font-['Sora',sans-serif] font-bold text-base shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Build my website</span>
                <ArrowRight className="w-5 h-5 text-[#0f172a]" />
              </button>

              <button
                onClick={scrollToPricing}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-['Sora',sans-serif] font-bold text-base border border-white/20 transition-all cursor-pointer"
              >
                <span>View Pricing</span>
              </button>
            </motion.div>

            {/* Supporting Copy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="pt-4 space-y-1.5"
            >
              <p className="text-sm sm:text-base font-semibold text-white">
                You’ve registered your business. You’ve set up your social media; now let’s build
                your website.
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#f1c72c] uppercase tracking-wider">
                Take your business to the next level
              </p>
            </motion.div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            SLIDING LAYOUT SHOWCASE (ONE SLIDES IN, EXPANDS, STAYS 3 SECONDS)
        ─────────────────────────────────────────────────────────── */}
        <div className="mt-14 pt-6 border-t border-white/10 relative">
          <div className="max-w-4xl mx-auto px-4">
            <div className="pb-4 flex items-center justify-between text-xs text-blue-200">
              <span className="font-bold text-[#f1c72c] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#f1c72c]" />
                <span>Featured Website Layouts</span>
              </span>
              <span className="text-white/80 font-mono text-xs">
                {layoutSlideIndex + 1} of {HERO_LAYOUT_SLIDES.length}
              </span>
            </div>

            {/* Sliding & Expanding Stage */}
            <div className="relative w-full overflow-hidden flex justify-center py-2 min-h-[300px] sm:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={layoutSlideIndex}
                  initial={{ x: 90, opacity: 0, scale: 0.92 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -90, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-3xl"
                >
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/30 bg-slate-950 shadow-2xl ring-1 ring-white/15">
                    <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={HERO_LAYOUT_SLIDES[layoutSlideIndex].image}
                        alt={HERO_LAYOUT_SLIDES[layoutSlideIndex].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#f1c72c] font-bold border border-white/15">
                        FEATURED LAYOUT
                      </div>
                    </div>
                    <div className="bg-slate-950/95 py-3.5 px-5 text-center border-t border-white/10">
                      <p className="font-['Sora',sans-serif] font-bold text-sm sm:text-base text-white tracking-tight">
                        {HERO_LAYOUT_SLIDES[layoutSlideIndex].name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots and Controls */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  setLayoutSlideIndex(
                    (prev) =>
                      (prev - 1 + HERO_LAYOUT_SLIDES.length) % HERO_LAYOUT_SLIDES.length
                  )
                }
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Previous layout"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {HERO_LAYOUT_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.name}
                    type="button"
                    onClick={() => setLayoutSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      layoutSlideIndex === idx
                        ? 'w-8 bg-[#f1c72c]'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={slide.name}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setLayoutSlideIndex(
                    (prev) => (prev + 1) % HERO_LAYOUT_SLIDES.length
                  )
                }
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Next layout"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 2: WHY BUILD A WEBSITE?
      ─────────────────────────────────────────────────────────── */}
      <section id="why-website" className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-3 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Strategic Digital Advantage
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0f172a]">
              Why build a website?
            </h2>
          </div>

          <div className="space-y-12">
            {/* 01 */}
            <motion.div
              initial={{ opacity: 0, x: 75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 pl-5 border-l-4 border-[#233dff]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#233dff]">01.</span>
                <h3 className="font-['Sora',sans-serif] text-xl sm:text-2xl font-bold text-[#0f172a]">
                  Build trust before the first conversation
                </h3>
              </div>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Give potential customers a professional place to learn about your business,
                understand your services, and evaluate your credibility. Clean, straight to the point.
                professional.
              </p>
            </motion.div>

            {/* 02 */}
            <motion.div
              initial={{ opacity: 0, x: 75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 pl-5 border-l-4 border-[#f1c72c]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#233dff]">02.</span>
                <h3 className="font-['Sora',sans-serif] text-xl sm:text-2xl font-bold text-[#0f172a]">
                  Make it easier for customers to take action
                </h3>
              </div>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Help visitors discover and buy your product, explore your services, and book you
                without unnecessary friction.
              </p>
            </motion.div>

            {/* 03 */}
            <motion.div
              initial={{ opacity: 0, x: 75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 pl-5 border-l-4 border-[#233dff]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#233dff]">03.</span>
                <h3 className="font-['Sora',sans-serif] text-xl sm:text-2xl font-bold text-[#0f172a]">
                  Give your business a digital home you control
                </h3>
              </div>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Create a central place to showcase your brand, products, services, and contact
                information.
              </p>
            </motion.div>
          </div>

          {/* Quick CTA Bridge */}
          <div className="pt-4 text-center">
            <button
              onClick={() => scrollToOrderForm()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#233dff] to-[#1222cc] text-white font-['Sora',sans-serif] font-bold text-sm shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Build my website</span>
              <ArrowRight className="w-4 h-4 text-[#f1c72c]" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3: WHY TRUST US TO BUILD YOUR WEBSITE?
      ─────────────────────────────────────────────────────────── */}
      <section id="why-trust-us" className="py-20 md:py-28 bg-[#f8f9ff] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              VP Media Standards
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0f172a]">
              Why trust us to build your website?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* 1. Fast & Optimal Delivery */}
            <div className="p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] border-2 border-blue-400/30 text-white shadow-xl shadow-blue-900/10 hover:border-[#f1c72c] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#f1c72c] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-[#f1c72c]" />
              </div>
              <h3 className="font-['Sora',sans-serif] text-xl font-bold text-white">
                Fast & Optimal Delivery
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                We deliver when we say we will deliver. No hassles, no delays, no excuses. Strict project timelines respected always.
              </p>
            </div>

            {/* 2. Customer Centric */}
            <div className="p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] border-2 border-blue-400/30 text-white shadow-xl shadow-blue-900/10 hover:border-[#f1c72c] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#f1c72c] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-[#f1c72c]" />
              </div>
              <h3 className="font-['Sora',sans-serif] text-xl font-bold text-white">
                Customer Centric
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                We’re all about you! Every project, recommendation, and design decision is made with your goals in mind. You are the centre of our business.
              </p>
            </div>

            {/* 3. Continuous Client Relationship */}
            <div className="p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] border-2 border-blue-400/30 text-white shadow-xl shadow-blue-900/10 hover:border-[#f1c72c] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#f1c72c] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#f1c72c]" />
              </div>
              <h3 className="font-['Sora',sans-serif] text-xl font-bold text-white">
                Continuous Client Relationship
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                We don’t just deliver and ghost you. We are always here for your inquiries, roadblocks, strategy check-ins, and ongoing support.
              </p>
            </div>

            {/* 4. Premium Quality Service */}
            <div className="p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] border-2 border-blue-400/30 text-white shadow-xl shadow-blue-900/10 hover:border-[#f1c72c] transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#f1c72c] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-[#f1c72c]" />
              </div>
              <h3 className="font-['Sora',sans-serif] text-xl font-bold text-white">
                Premium Quality Service
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                We make you feel special because you are. Everything is executed with top-tier craft, conversion science, and aesthetic mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 4: NOT CONVINCED? CLIENT VIDEO REVIEWS
      ─────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Proven Results
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
              Not convinced? Hear what other people are saying about VP Media.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
              Real video feedback from founders and executives who scaled their businesses with VP Media Suites.
            </p>
          </div>

          {/* 2-Column Video Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEO_TESTIMONIALS.map((video) => {
              const isPlaying = !!inlinePlaying[video.id];
              return (
                <div
                  key={video.id}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 bg-[#f8f9ff] shadow-md hover:border-[#233dff] transition-all flex flex-col justify-between group"
                >
                  {/* Video Screen / Player */}
                  <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 relative overflow-hidden">
                    {isPlaying ? (
                      <iframe
                        src={video.embedUrl}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        title={`${video.name} Video Testimonial`}
                      />
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => handlePlayInline(video.id)}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/45 hover:bg-slate-950/30 transition-colors" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-[#f1c72c] font-bold border border-white/15 uppercase">
                          {video.badge}
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenLargerVideo(video);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black/90 text-white border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] font-bold"
                            title="Watch in larger pop-up"
                          >
                            <Maximize className="w-3.5 h-3.5 text-[#f1c72c]" />
                            <span>Expand</span>
                          </button>
                          <div className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wide shadow-sm">
                            Verified
                          </div>
                        </div>

                        {/* Central Play Button */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-[#233dff] text-[#f1c72c] flex items-center justify-center shadow-2xl ring-4 ring-white/40 group-hover:scale-110 transition-all">
                            <Play className="w-7 h-7 fill-[#f1c72c] text-[#f1c72c] ml-1" />
                          </div>
                          <span className="text-white text-xs font-['Sora',sans-serif] font-bold bg-black/60 px-3.5 py-1 rounded-full backdrop-blur-md">
                            Click to play video
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer / Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#f1c72c]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#f1c72c] text-[#f1c72c]" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-[#233dff] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {video.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-['Sora',sans-serif] text-lg font-bold text-[#0f172a]">
                        {video.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Client Testimonial · VP Media Suites
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handlePlayInline(video.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#233dff] hover:text-[#1222cc] transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#233dff]" />
                        <span>{isPlaying ? 'Replay Video' : 'Watch Video'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenLargerVideo(video)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#233dff] text-xs font-bold transition-colors cursor-pointer border border-blue-200 hover:border-blue-300"
                        title="Watch in larger pop-up"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                        <span>Watch Larger</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Larger Video Pop-up Lightbox Modal */}
          <AnimatePresence>
            {modalVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                onClick={() => setModalVideo(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="font-['Sora',sans-serif] font-bold text-sm sm:text-base text-white">
                        {modalVideo.name}
                      </h3>
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-[#f1c72c] bg-white/10 border border-white/10 uppercase">
                        {modalVideo.badge}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalVideo(null)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label="Close video pop-up"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 16:9 Video Embed Player */}
                  <div className="aspect-[16/9] w-full bg-black relative">
                    <iframe
                      src={modalVideo.embedUrl}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={`${modalVideo.name} Video Testimonial`}
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="px-5 py-3 bg-slate-900 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
                    <div className="flex items-center gap-1 text-[#f1c72c]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#f1c72c] text-[#f1c72c]" />
                      ))}
                      <span className="text-slate-300 ml-2 font-medium">Verified Client Video Review</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalVideo(null)}
                      className="text-slate-300 hover:text-white underline cursor-pointer font-medium"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 4: OUR PRICING
      ─────────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        ref={pricingSectionRef}
        className="py-20 md:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Transparent Investment
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0f172a]">
              Our pricing:
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              These are the prices of our websites:
            </p>
          </div>

          <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
            {QUOTE_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] text-white border-2 border-[#f1c72c] shadow-2xl ring-2 ring-[#f1c72c]/40'
                      : 'bg-[#f8f9ff] text-[#0f172a] border-2 border-slate-200 shadow-md hover:border-[#233dff]'
                  }`}
                >
                  {tier.featuredBadge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#f1c72c] text-[#0f172a] font-['Sora',sans-serif] font-black text-[10px] tracking-wider uppercase shadow-md whitespace-nowrap">
                      {tier.featuredBadge}
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2 border-b pb-4 border-slate-200/50">
                      <h3
                        className={`font-['Sora',sans-serif] text-xl font-extrabold ${
                          tier.highlight ? 'text-white' : 'text-[#0f172a]'
                        }`}
                      >
                        {tier.name}
                      </h3>
                      <p
                        className={`text-xs font-medium ${
                          tier.highlight ? 'text-blue-100' : 'text-slate-600'
                        }`}
                      >
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Price */}
                    <div>
                      <span
                        className={`font-['Sora',sans-serif] text-4xl sm:text-5xl font-black tracking-tight ${
                          tier.highlight ? 'text-[#f1c72c]' : 'text-[#233dff]'
                        }`}
                      >
                        {tier.price}
                      </span>
                    </div>

                    {/* Target Fit Note */}
                    <div
                      className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                        tier.highlight
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      <p className={`font-bold ${tier.niches && tier.niches.length > 0 ? 'mb-2' : ''}`}>
                        {tier.targetFit}
                      </p>
                      {tier.nichesTitle && (
                        <p
                          className={`font-semibold text-[11px] mb-1.5 ${
                            tier.highlight ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {tier.nichesTitle}
                        </p>
                      )}
                      {tier.niches && tier.niches.length > 0 && (
                        <div className="space-y-1">
                          {tier.niches.map((niche, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs">
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  tier.highlight ? 'bg-[#f1c72c]' : 'bg-[#233dff]'
                                }`}
                              />
                              <span>{niche}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Package Deliverables */}
                    <div className="space-y-2.5 pt-1">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider block ${
                          tier.highlight ? 'text-[#f1c72c]' : 'text-slate-500'
                        }`}
                      >
                        This package includes:
                      </span>
                      <div className="space-y-2">
                        {tier.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <div
                              className={`mt-0.5 p-0.5 rounded-full shrink-0 ${
                                tier.highlight
                                  ? 'bg-[#f1c72c] text-[#0f172a]'
                                  : 'bg-[#233dff] text-white'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                            </div>
                            <span className={tier.highlight ? 'text-white' : 'text-slate-700'}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Select CTA */}
                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => scrollToOrderForm(tier.id)}
                      className={`w-full py-3.5 rounded-xl font-['Sora',sans-serif] font-bold text-xs tracking-tight shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        tier.highlight
                          ? 'bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a]'
                          : 'bg-gradient-to-r from-[#233dff] to-[#1222cc] hover:from-[#1b33ea] hover:to-[#0f1eb7] text-white'
                      }`}
                    >
                      <span>{isSelected ? '✓ Selected in Form Below' : `Select ${tier.name}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5: VIEW SOME SAMPLES OF OUR WEBSITES
      ─────────────────────────────────────────────────────────── */}
      <section id="samples" className="py-20 md:py-28 bg-[#f8f9ff] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Live Proof & Engineering
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
              View some samples of our websites
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore real websites and platforms designed and engineered by VP Media Suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_WEBSITE_SAMPLES.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-md flex flex-col justify-between group hover:border-[#233dff] transition-all"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-[#f1c72c] font-bold border border-white/10 uppercase">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-['Sora',sans-serif] font-bold text-base sm:text-lg text-[#0f172a]">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">{item.category}</span>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#233dff] hover:text-[#1222cc] transition-colors"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 6: ORDER BUILDER & CTA SUBMISSION FORM
      ─────────────────────────────────────────────────────────── */}
      <section
        id="order-form"
        ref={formSectionRef}
        className="py-20 md:py-28 bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Blueprint Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f1c72c]">
                  Get Started Today
                </span>
                <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Let’s build your high-converting website.
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Fill in your details, select your website package, and send your order straight to
                  WhatsApp.
                </p>
              </div>

              {/* Selected Tier Box */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3">
                <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                  <span className="text-xs font-bold text-white">Selected Website Tier:</span>
                  <span className="text-sm font-black font-['Sora',sans-serif] text-[#f1c72c]">
                    {activeTier.price}
                  </span>
                </div>
                <h3 className="font-['Sora',sans-serif] font-bold text-base text-white">
                  {activeTier.name}
                </h3>
                <p className="text-xs text-blue-100">{activeTier.subtitle}</p>

                <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-blue-100">
                  {activeTier.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#f1c72c] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs text-blue-100">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f1c72c]" /> Official Agency Direct Contact:{' '}
                  {AGENCY_INFO.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#f1c72c]" /> We deliver on schedule
                </p>
              </div>
            </div>

            {/* Right Form Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-7 sm:p-9 text-[#0f172a] border border-slate-200 shadow-2xl">
                {isSubmitted ? (
                  <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-['Sora',sans-serif] text-2xl font-bold text-[#0f172a]">
                        Website Order Dispatched!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        WhatsApp was opened in a new tab. If it was blocked by your browser, tap below
                        to message Victor directly on WhatsApp:
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${AGENCY_INFO.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-['Sora',sans-serif] font-bold text-xs tracking-tight transition-all shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp Chat ({AGENCY_INFO.phone})</span>
                    </a>

                    <div className="pt-2">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs text-slate-500 hover:text-[#0f172a] underline cursor-pointer"
                      >
                        Edit or submit another order
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="font-['Sora',sans-serif] text-lg font-bold text-[#0f172a]">
                        Website Order & Proposal Builder
                      </h3>
                      <p className="text-xs text-slate-500">
                        Select your package, fill in your details, and click submit to proceed.
                      </p>
                    </div>

                    {/* Package Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Select Your Website Package:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {QUOTE_TIERS.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedTier(tier.id)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                              selectedTier === tier.id
                                ? 'bg-gradient-to-r from-[#233dff] to-[#1222cc] text-white border-[#f1c72c] ring-1 ring-[#f1c72c] shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="font-bold block truncate">{tier.name}</span>
                            <span
                              className={`font-mono text-xs font-extrabold mt-1 ${
                                selectedTier === tier.id ? 'text-[#f1c72c]' : 'text-[#233dff]'
                              }`}
                            >
                              {tier.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
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
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#233dff] focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Business / Brand Name
                        </label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Your brand or business"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#233dff] focus:bg-white transition-all"
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
                          placeholder="yourname@brand.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#233dff] focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 08077021080"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#233dff] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Target Timeline (when do you want your website?):
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['This week', 'Next week or 2', 'Next month'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              timeline === t
                                ? 'bg-[#233dff] text-white border-[#233dff]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vision Details */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Tell our Website architect about your brand vision or reference links
                      </label>
                      <textarea
                        rows={3}
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder="Briefly describe what your business does and any website styles you like..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#233dff] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Submit CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a] font-['Sora',sans-serif] font-bold text-sm tracking-tight shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <MessageSquare className="w-4 h-4 text-[#0f172a]" />
                        <span>
                          Submit My Website order ({activeTier.name} — {activeTier.price})
                        </span>
                      </button>
                      <p className="text-center text-[10px] text-slate-500 mt-2">
                        Opens your WhatsApp discussion with Victor ({AGENCY_INFO.phone}) with your
                        selected package
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          FOOTER
      ─────────────────────────────────────────────────────────── */}
      <footer className="bg-gradient-to-r from-[#1222cc] via-[#0d1bb0] to-[#08127c] text-white/90 py-12 text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/15">
            <div className="space-y-1.5">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/');
                }}
                className="flex items-center gap-2 font-['Sora',sans-serif] font-bold text-sm text-white tracking-tight"
              >
                <span className="w-6 h-6 rounded-md bg-[#f1c72c] text-[#0f172a] flex items-center justify-center font-black text-xs shadow-xs">
                  VP
                </span>
                <span>VP MEDIA SUITES</span>
              </a>
              <p className="text-blue-100 text-xs">
                We design websites for businesses and personal brands that attract high-value
                customers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-white/90">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/');
                }}
                className="hover:text-[#f1c72c] transition-colors"
              >
                Agency Homepage
              </a>
              <a
                href="/vendors"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/vendors');
                }}
                className="hover:text-[#f1c72c] transition-colors"
              >
                Vendor Storefronts
              </a>
              <a
                href="/PrivacyPolicy"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/PrivacyPolicy');
                }}
                className="hover:text-[#f1c72c] transition-colors"
              >
                Privacy Policy
              </a>
              <button
                type="button"
                onClick={openCookieSettings}
                className="hover:text-[#f1c72c] transition-colors cursor-pointer"
              >
                Cookie Preferences
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-blue-200">
            <p>© {new Date().getFullYear()} VP Media Suites. All rights reserved.</p>
            <p>
              WhatsApp: <span className="text-white font-mono font-bold">08077021080</span> · Email:{' '}
              <span className="text-white font-mono">Paulvictor138@gmail.com</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
