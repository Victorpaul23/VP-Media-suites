import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { AGENCY_INFO, FAQS } from '../data/agencyData';
import { navigateTo } from '../utils/navigation';
import {
  trackVendorEvent,
  getUtmParameters,
  openCookieSettings,
  fireXConversionEvent,
} from '../utils/cookieConsent';
import {
  Store,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CreditCard,
  MessageCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ExternalLink,
  Play,
  Maximize,
  X,
} from 'lucide-react';

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

// Exclude the 2nd (index 1) and 5th (index 4) FAQ on the vendor landing page
const VENDOR_FAQS = FAQS.filter((_, index) => index !== 1 && index !== 4);

// Pre-generated High-Fidelity Assets
import heroMockupImg from '../assets/images/vendor_hero_mockup_1793876611676.jpg';
import productShowcaseImg from '../assets/images/vendor_product_showcase_1793876612121.jpg';
import mobileStoreMockupImg from '../assets/images/vendor_mobile_store_mockup_1793876612622.jpg';
import checkoutExperienceImg from '../assets/images/vendor_checkout_experience_1793876612791.jpg';

export type VendorPackageId = 'standard' | 'credit_alert';

interface VendorPackage {
  id: VendorPackageId;
  name: string;
  tagline: string;
  headerNote: string;
  price: string;
  numericPrice: number;
  highlight?: boolean;
  featuredBadge?: string;
  includes: string[];
  excludes?: string[];
  ctaText: string;
}

const VENDOR_PACKAGES: VendorPackage[] = [
  {
    id: 'standard',
    name: 'STANDARD ONLINE STORE',
    tagline: 'Organize your products & streamline WhatsApp orders',
    headerNote:
      'This is for you if you dont get too many daily orders or you dont sell high-end luxury items',
    price: '₦120,000',
    numericPrice: 120000,
    highlight: false,
    includes: [
      'Website design and development.',
      'Product catalogue.',
      'Add-to-cart functionality.',
      'WhatsApp ordering workflow.',
      'Free website hosting.',
      'No monthly management fee.',
    ],
    excludes: [
      'Domain name.',
      'Paystack integration.',
      'Ongoing website management.',
    ],
    ctaText: 'Select Standard Store (₦120,000)',
  },
  {
    id: 'credit_alert',
    name: 'MAKE SALES WHILE YOU SLEEP',
    tagline: 'Automated online sales and direct payment notifications',
    headerNote:
      'This is for you if you get high daily purchases or you sell high-end luxury products',
    price: '₦250,000',
    numericPrice: 250000,
    highlight: true,
    featuredBadge: 'RECOMMENDED FOR VENDORS',
    includes: [
      'Website design and development.',
      'Product catalogue.',
      'Add-to-cart functionality.',
      'WhatsApp ordering workflow.',
      'Domain name.',
      'Free website hosting.',
      'Admin management dashboard.',
      'Paystack payment integration.',
      'Three months of free website management.',
    ],
    ctaText: 'Select Make Sales While You Sleep (₦250,000)',
  },
];

const HERO_SHOWCASE = [
  {
    name: 'Luxury Bag website',
    imageUrl: 'https://lh3.googleusercontent.com/d/1QDQEao8ln9EjfCXznwwEhzjva1MXvKWv',
  },
  {
    name: 'Shoes and sneakers website',
    imageUrl: 'https://lh3.googleusercontent.com/d/1xeo1okCEFsqxJgsOhW-LTaBkBoErkhN2',
  },
  {
    name: 'Skincare brand website',
    imageUrl: 'https://lh3.googleusercontent.com/d/1FphXbLnxFcG-SitF-tDd4OXJM6O-b5rl',
  },
  {
    name: 'Wigs',
    imageUrl: 'https://lh3.googleusercontent.com/d/1k3jipn0_BVacvjtG2tqmYHTteIgI0r9C',
  },
];

const CATEGORIES_LIST = [
  'Clothes & Fashion Apparel',
  'Shoes & Footwear',
  'Perfumes & Fragrances',
  'Handbags & Leather Goods',
  'Skincare & Cosmetics',
  'Wigs & Hair Products',
  'Lingerie & Nightwear',
  'Other Physical Products',
];

export const VendorLandingPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Give Your Products a Proper Online Store | VP Media Suites';

    trackVendorEvent('PageView', { path: '/vendors' });

    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Hero Continuous Slideshow State
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Form State
  const [selectedPackage, setSelectedPackage] = useState<VendorPackageId>('credit_alert');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState(CATEGORIES_LIST[0]);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');

  // Video Testimonials State
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

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const enquiryFormRef = useRef<HTMLDivElement>(null);

  const handleSelectPackage = (packageId: VendorPackageId) => {
    setSelectedPackage(packageId);
    trackVendorEvent('InitiateEnquiry', { package: packageId }, `pkg_click_${packageId}`);
    enquiryFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    trackVendorEvent('ViewPackages', { source: 'hero_cta' }, 'hero_view_packages');
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Form Validation & Submission
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your name';
    if (!businessName.trim()) errors.businessName = 'Please enter your business or brand name';
    if (!whatsappNumber.trim()) {
      errors.whatsappNumber = 'Please enter your WhatsApp phone number';
    } else {
      const clean = whatsappNumber.replace(/[^0-9+]/g, '');
      if (clean.length < 9) {
        errors.whatsappNumber = 'Please enter a valid phone number';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    const utm = getUtmParameters();
    const pkg = VENDOR_PACKAGES.find((p) => p.id === selectedPackage) || VENDOR_PACKAGES[1];

    const lines = [
      `*VP MEDIA SUITES — VENDOR WEBSITE INQUIRY*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${fullName.trim()}`,
      `🏢 *Business / Brand:* ${businessName.trim()}`,
      `🏷️ *Category:* ${category}`,
      `📱 *WhatsApp Number:* ${whatsappNumber.trim()}`,
      `💼 *Selected Package:* ${pkg.name} (${pkg.price})`,
      utm.source ? `📊 *Source:* ${utm.source}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hi Victor! I sell physical products and want to build a proper online store with VP Media Suites. Let's discuss getting started!`,
    ].filter(Boolean);

    const message = lines.join('\n');
    const waUrl = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    setSubmittedWhatsAppUrl(waUrl);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });

    trackVendorEvent('Lead', {
      package: pkg.id,
      packageName: pkg.name,
      value: pkg.numericPrice,
      currency: 'NGN',
      category,
    });
    fireXConversionEvent('tw-rf672-rf8d1', {});
    fireXConversionEvent('tw-rg2tf-rg9ir', {});

    window.open(waUrl, '_blank');
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  // Animation variants
  // Canva "Rise" animation for section headers
  const canvaRiseVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Canva "Pan" animation for the 5 points headings (slides horizontally into view smoothly)
  const canvaPanHeadingVariant = {
    hidden: { opacity: 0, x: -38 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Snappy text slide-up for body copy
  const textSlideUpVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut', delay: 0.08 },
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-['Inter',sans-serif] antialiased selection:bg-[#f1c72c] selection:text-[#0f172a]">
      {/* ───────────────────────────────────────────────────────────
          TOP BAR
      ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#233dff] via-[#1a32ed] to-[#1222cc] border-b border-white/10 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="flex items-center gap-2.5 font-['Sora',sans-serif] font-bold text-base tracking-tight text-white hover:text-[#f1c72c] transition-colors whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded-lg bg-[#f1c72c] text-[#0f172a] flex items-center justify-center font-black text-xs shadow-xs">
              VP
            </span>
            <span>VP MEDIA SUITES</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/90">
            <a href="#why-website" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap shrink-0">
              Why You Need a Website
            </a>
            <a href="#reviews" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap shrink-0">
              Client Feedback
            </a>
            <a href="#pricing" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap shrink-0">
              Packages & Pricing
            </a>
            <a href="#faqs" className="hover:text-[#f1c72c] transition-colors whitespace-nowrap shrink-0">
              FAQs
            </a>
          </nav>

          <button
            onClick={() => handleSelectPackage('credit_alert')}
            className="px-4 py-2 rounded-xl bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a] font-['Sora',sans-serif] font-bold text-xs tracking-tight shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Get My Website
          </button>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
      ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] text-white overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#f1c72c]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Supporting Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Exact Brief Headline with BOLD main statement & smaller legible subline */}
              <div className="space-y-3">
                <h1 className="font-['Sora',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.14] text-white">
                  Give Your Products a Proper Online Store.
                </h1>
                <p className="font-['Sora',sans-serif] text-base sm:text-lg lg:text-xl font-semibold text-blue-100 leading-snug max-w-2xl">
                  Build a website that stands out and attracts quality clients who will want to buy.
                </p>
              </div>

              {/* Exact Brief Supporting Copy */}
              <div className="space-y-3.5 text-blue-50 text-sm sm:text-base leading-relaxed max-w-2xl">
                <p className="font-medium">
                  We build high-quality, conversion-focused websites for Online product vendors and
                  brands.
                </p>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-white space-y-1.5 shadow-sm">
                  <p className="font-bold text-[#f1c72c]">
                    If you sell any of these products or services:
                  </p>
                  <p className="text-white font-medium">
                    Clothes, Shoes, perfumes, Handbags, skincare, cosmetics, Wigs, lingerie, etc,
                  </p>
                  <p className="text-blue-100 font-bold pt-1">This is for you:</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPackage('credit_alert')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a] font-['Sora',sans-serif] font-bold text-sm shadow-xl shadow-black/10 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Store className="w-4 h-4 text-[#0f172a]" />
                  <span>Get My Website</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToPricing}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white text-[#233dff] hover:bg-blue-50 font-['Sora',sans-serif] font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>View Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#233dff]" />
                </motion.button>
              </div>

              <div className="flex items-center gap-6 text-xs text-blue-100 font-medium pt-2">
                <span className="flex items-center gap-1.5 text-white">
                  <Clock className="w-4 h-4 text-[#f1c72c]" /> We deliver on schedule
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-[#f1c72c]" /> WhatsApp & Paystack Ready
                </span>
              </div>
            </motion.div>

            {/* Right Column: Continuous Slideshow Sliding in from Top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border-2 border-white/30 bg-slate-950 shadow-2xl">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={heroSlideIndex}
                    initial={{ y: '-100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    <div className="relative flex-1 w-full overflow-hidden bg-slate-900">
                      <img
                        src={HERO_SHOWCASE[heroSlideIndex].imageUrl}
                        alt={HERO_SHOWCASE[heroSlideIndex].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-slate-950/95 py-3 px-4 text-center border-t border-white/15">
                      <p className="font-['Sora',sans-serif] font-bold text-white text-sm sm:text-base tracking-tight">
                        {HERO_SHOWCASE[heroSlideIndex].name}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slideshow Indicators */}
              <div className="flex items-center justify-center gap-2 pt-3">
                {HERO_SHOWCASE.map((item, idx) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setHeroSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      heroSlideIndex === idx
                        ? 'w-8 bg-[#f1c72c]'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={item.name}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 2: WHY YOU NEED A WEBSITE (TEXT-BASED EDITORIAL, NOT CARDS)
          Canva Rise on Main Title, Canva Pan on Headings, Smooth Slide-Up on Text
      ─────────────────────────────────────────────────────────── */}
      <section id="why-website" className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Section Header with Canva Rise Animation */}
          <motion.div
            variants={canvaRiseVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center space-y-3 pb-4 border-b border-slate-100"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Essential For Growth
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0f172a]">
              Why you need a website:
            </h2>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              POINT 1: IT SAVES YOU TIME
          ───────────────────────────────────────────────────────── */}
          <div className="space-y-6">
            <motion.h3
              variants={canvaPanHeadingVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#233dff] flex items-center gap-2.5"
            >
              <span className="w-2.5 h-8 bg-[#f1c72c] rounded-full inline-block shrink-0" />
              <span>1. It saves you time:</span>
            </motion.h3>

            <motion.div
              variants={textSlideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed pl-5 border-l-2 border-slate-100"
            >
              <p>
                Aren’t you tired of sending 20+ pictures to a customer anytime he/she wants to buy?
                The back-and-forth of negotiation and constant online and offline battle before making
                the sale. It&apos;s tiring.
              </p>
              <p className="font-medium text-[#0f172a]">
                A website can display what you sell on a page, and your customer can select what they
                want. Easily..
              </p>

              {/* Video / Visual Demonstration of someone clicking and purchasing on a website */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Video / Interactive View: Customer Clicking & Buying on a Storefront
                </span>
                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg bg-[#0f172a] group">
                  <img
                    src={checkoutExperienceImg}
                    alt="Customer browsing online store, adding to cart, and placing order"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[420px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <div className="flex items-center justify-between w-full text-white text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold">
                          Customer clicks product → selects variant → submits order in 15 seconds
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-[#f1c72c] text-[#0f172a] font-black text-[10px] uppercase">
                        Zero DM Hassle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              POINT 2: ATTRACT CUSTOMERS WILLING TO SPEND
          ───────────────────────────────────────────────────────── */}
          <div className="space-y-5 pt-4">
            <motion.h3
              variants={canvaPanHeadingVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#233dff] flex items-center gap-2.5"
            >
              <span className="w-2.5 h-8 bg-[#f1c72c] rounded-full inline-block shrink-0" />
              <span>2. Attract customers willing to spend</span>
            </motion.h3>

            <motion.div
              variants={textSlideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed pl-5 border-l-2 border-slate-100"
            >
              <p>
                Why do you think rich people go to boutiques to buy clothes instead of okirika or even
                umbrella shops?
              </p>
              <p className="font-semibold text-[#0f172a]">
                It&apos;s because they are after quality, class, and experience.
              </p>
              <p>
                Your online store is a place where you can display all 3. Attract clients who can pay
                you for your product or service. If they can&apos;t pay, they don&apos;t buy. Think about
                it, have you ever gone to a website to price? A good website means no more pricing.
              </p>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              POINT 3: YOUR MARKET LOOKS CHEAP? A WEBSITE FIXES THAT
          ───────────────────────────────────────────────────────── */}
          <div className="space-y-5 pt-4">
            <motion.h3
              variants={canvaPanHeadingVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#233dff] flex items-center gap-2.5"
            >
              <span className="w-2.5 h-8 bg-[#f1c72c] rounded-full inline-block shrink-0" />
              <span>3. Your market looks cheap? A website fixes that</span>
            </motion.h3>

            <motion.div
              variants={textSlideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed pl-5 border-l-2 border-slate-100"
            >
              <p>
                One thing that make your products look cheap, are low quality and blurry images. To
                get people to buy, your products need to signal that it&apos;s high quality. That&apos;s
                why we only use high-quality images on our website.
              </p>
              <p className="font-semibold text-[#0f172a]">
                When someone sees your product on a website, they can easily pay more money for it
                because they are in a different environment; they can’t price you on the website
              </p>

              {/* Showcase Graphic */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md">
                  <img
                    src={productShowcaseImg}
                    alt="High-Quality Product Presentation"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[360px]"
                  />
                  <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold text-[#0f172a]">High-Definition Product Visuals</span>
                    <span className="text-[#233dff] font-bold">Signals Premium Value</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              POINT 4: WAKE UP TO CREDIT ALERT
          ───────────────────────────────────────────────────────── */}
          <div className="space-y-5 pt-4">
            <motion.h3
              variants={canvaPanHeadingVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#233dff] flex items-center gap-2.5"
            >
              <span className="w-2.5 h-8 bg-[#f1c72c] rounded-full inline-block shrink-0" />
              <span>
                4: Wake up to credit Alert:{' '}
                <span className="text-lg sm:text-xl font-normal text-slate-600 block sm:inline">
                  (let your customers shop even when you&apos;re unavailable).
                </span>
              </span>
            </motion.h3>

            <motion.div
              variants={textSlideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed pl-5 border-l-2 border-slate-100"
            >
              <p>You have a life outside your business.</p>
              <p>
                Sometimes you&apos;re sleeping, travelling, attending to customers, sourcing products,
                or simply taking a break.
              </p>
              <p>But your customers don&apos;t necessarily shop according to your schedule.</p>
              <p className="font-semibold text-[#0f172a]">
                With an online store, your products remain accessible around the clock.
              </p>

              {/* Bullet Breakdown */}
              <div className="space-y-2 pt-2 pb-2 pl-2">
                {[
                  'Customers can browse your available products.',
                  'Check prices and product descriptions.',
                  'Select their preferred items.',
                  'Add products to their cart.',
                  'Place an order through WhatsApp or an integrated online payment system, depending on your package.',
                ].map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#0f172a]">
                    <div className="mt-1 w-4 h-4 rounded-full bg-[#f1c72c] text-[#0f172a] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <p className="font-semibold text-[#233dff]">
                Imagine waking up to find that customers have placed orders while you were asleep.
              </p>
              <p className="font-bold text-[#0f172a]">
                Your business doesn&apos;t have to stop selling just because you&apos;re offline.
              </p>

              {/* Credit Alert Image */}
              <div className="pt-3 max-w-lg">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-50">
                  <img
                    src="https://lh3.googleusercontent.com/d/1Wr91QQ4GTJpNi83msy8faDnhsCr51Vuz"
                    alt="Credit alert"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              POINT 5: BUILD TRUST + BUILD MY WEBSITE CTA
          ───────────────────────────────────────────────────────── */}
          <div className="space-y-5 pt-4">
            <motion.h3
              variants={canvaPanHeadingVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#233dff] flex items-center gap-2.5"
            >
              <span className="w-2.5 h-8 bg-[#f1c72c] rounded-full inline-block shrink-0" />
              <span>5: Build Trust:</span>
            </motion.h3>

            <motion.div
              variants={textSlideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed pl-5 border-l-2 border-slate-100"
            >
              <p>In the online space how can people trust you?</p>
              <p>
                Adding in screenshots, alerts, and reviews of people who bought from you successfully
                and are satisfied with what you gave them is a great way to build trust.
              </p>
              <p className="font-semibold text-[#0f172a]">
                Where else to add it than your website?
              </p>

              {/* Exact CTA from brief */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPackage('credit_alert')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#233dff] to-[#1222cc] text-white font-['Sora',sans-serif] font-bold text-base shadow-xl flex items-center gap-2.5 cursor-pointer transition-all hover:shadow-2xl"
                >
                  <Store className="w-5 h-5 text-[#f1c72c]" />
                  <span>Build my website</span>
                  <ArrowRight className="w-5 h-5 text-[#f1c72c]" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3: CLIENT TESTIMONIAL VIDEOS
      ─────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 md:py-28 bg-[#f8f9ff] border-b border-slate-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={canvaRiseVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-3 mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Proven Results
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
              What Our Clients Say.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
              Real video feedback from founders and executives who scaled their businesses with VP Media Suites.
            </p>
          </motion.div>

          {/* 2-Column Video Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEO_TESTIMONIALS.map((video) => {
              const isPlaying = !!inlinePlaying[video.id];
              return (
                <div
                  key={video.id}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-md hover:border-[#233dff] transition-all flex flex-col justify-between group"
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
          SCARCITY NOTICE (BEFORE PAYMENT / PRICING SECTION)
      ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#f1c72c] text-[#0f172a] py-3.5 px-4 text-center border-y border-[#e0b71e] shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2.5 font-['Sora',sans-serif] font-bold text-sm sm:text-base tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
          <span>&ldquo;We design only 5 websites every month. Get yours now or wait till next year&rdquo;</span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          SECTION 4: PRICING AND PACKAGES SECTION
          Unified colors: Yellow #f1c72c, Electric Blue #233dff, and White
      ─────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={canvaRiseVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>We design only 5 websites every month. Get yours now or wait till next year</span>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff] block">
              Packages & Pricing
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
              Choose Your Website Package.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Two straightforward packages with transparent deliverables. Pick the one that fits
              your business.
            </p>
          </motion.div>

          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {VENDOR_PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                  pkg.highlight
                    ? 'bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] text-white border-2 border-[#f1c72c] shadow-2xl ring-2 ring-[#f1c72c]/40'
                    : 'bg-white text-[#0f172a] border-2 border-slate-200 shadow-md hover:border-[#233dff]'
                }`}
              >
                {pkg.featuredBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#f1c72c] text-[#0f172a] font-['Sora',sans-serif] font-black text-[10px] tracking-wider uppercase shadow-md">
                    {pkg.featuredBadge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2 border-b pb-4 border-white/20">
                    <h3
                      className={`font-['Sora',sans-serif] text-xl font-bold ${
                        pkg.highlight ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p className={`text-xs ${pkg.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                      {pkg.tagline}
                    </p>
                    <div
                      className={`mt-2.5 p-3 rounded-xl text-xs leading-relaxed font-medium ${
                        pkg.highlight
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {pkg.headerNote}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span
                      className={`font-['Sora',sans-serif] text-4xl sm:text-5xl font-black ${
                        pkg.highlight ? 'text-[#f1c72c]' : 'text-[#233dff]'
                      }`}
                    >
                      {pkg.price}
                    </span>
                  </div>

                  {/* Includes List */}
                  <div className="space-y-2.5 pt-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block ${
                        pkg.highlight ? 'text-[#f1c72c]' : 'text-slate-500'
                      }`}
                    >
                      Includes:
                    </span>
                    <div className="space-y-2">
                      {pkg.includes.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs">
                          <div
                            className={`mt-0.5 p-0.5 rounded-full shrink-0 ${
                              pkg.highlight ? 'bg-[#f1c72c] text-[#0f172a]' : 'bg-[#233dff] text-white'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                          <span className={pkg.highlight ? 'text-white' : 'text-slate-700'}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Excludes List */}
                  {pkg.excludes && pkg.excludes.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Excludes:
                      </span>
                      <div className="space-y-1.5">
                        {pkg.excludes.map((ex, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                            <span className="text-slate-300 font-bold">•</span>
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`w-full py-4 rounded-xl font-['Sora',sans-serif] font-bold text-xs tracking-tight shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      pkg.highlight
                        ? 'bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a]'
                        : 'bg-gradient-to-r from-[#233dff] to-[#1222cc] hover:from-[#1b33ea] hover:to-[#0f1eb7] text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5: FREQUENTLY ASKED QUESTIONS SECTION (REAL FAQS)
      ─────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-20 md:py-28 bg-[#f8f9ff] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={canvaRiseVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-3 mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#233dff]">
              Common Inquiries
            </span>
            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
              Frequently Asked Questions.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Clear answers regarding delivery, workflows, and post-delivery support.
            </p>
          </motion.div>

          <div className="space-y-3.5">
            {VENDOR_FAQS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-['Sora',sans-serif] font-bold text-sm text-[#0f172a] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-[#233dff] text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 6: FINAL CALL TO ACTION & ENQUIRY FORM SECTION
      ─────────────────────────────────────────────────────────── */}
      <section
        id="enquiry"
        ref={enquiryFormRef}
        className="py-20 md:py-28 bg-gradient-to-br from-[#233dff] via-[#1c33ea] to-[#1222cc] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column */}
            <motion.div
              variants={canvaRiseVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-5"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#f1c72c]">
                Ready to Start
              </span>
              <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Give Your Products a Proper Online Store.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Fill in your details below and choose your package. We will connect with you directly
                on WhatsApp to get started on your website.
              </p>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Selected Package:</span>
                  <span className="font-bold text-[#f1c72c] font-['Sora',sans-serif]">
                    {selectedPackage === 'credit_alert'
                      ? '₦250,000 (Make sales while you sleep)'
                      : '₦120,000 (Standard Online Store)'}
                  </span>
                </div>
                <p className="text-[11px] text-blue-200">
                  {selectedPackage === 'credit_alert'
                    ? 'Includes domain, Paystack card payments, admin dashboard & 3 months management.'
                    : 'Includes product catalogue, add-to-cart, WhatsApp order workflow & free hosting.'}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-blue-100">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f1c72c]" /> Direct WhatsApp: {AGENCY_INFO.phone}
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f1c72c]" /> We deliver on schedule
                </p>
              </div>
            </motion.div>

            {/* Right Column: Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-2xl p-7 sm:p-9 text-[#0f172a] border border-slate-200 shadow-2xl">
                {isSubmitted ? (
                  <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-['Sora',sans-serif] text-xl font-bold text-[#0f172a]">
                        Inquiry Received!
                      </h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        WhatsApp was opened in a new tab. If it was blocked, click below to message Victor directly:
                      </p>
                    </div>

                    <a
                      href={submittedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-['Sora',sans-serif] font-bold text-xs tracking-tight transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Chat (08077021080)</span>
                    </a>

                    <div className="pt-2">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs text-slate-500 hover:text-[#0f172a] underline cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="font-['Sora',sans-serif] text-base font-bold text-[#0f172a]">
                        Vendor Store Website Inquiry
                      </h3>
                    </div>

                    {/* Package Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Select Package:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedPackage('standard')}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            selectedPackage === 'standard'
                              ? 'bg-[#233dff] text-white border-[#233dff] shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="block font-bold">Standard Online Store</span>
                          <span
                            className={`block font-mono text-[11px] mt-0.5 ${
                              selectedPackage === 'standard' ? 'text-[#f1c72c]' : 'text-[#233dff]'
                            }`}
                          >
                            ₦120,000
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPackage('credit_alert')}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            selectedPackage === 'credit_alert'
                              ? 'bg-gradient-to-r from-[#233dff] to-[#1222cc] text-white border-[#f1c72c] shadow-sm ring-1 ring-[#f1c72c]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="block font-bold">Make sales while you sleep</span>
                          <span
                            className={`block font-mono text-[11px] mt-0.5 ${
                              selectedPackage === 'credit_alert' ? 'text-[#f1c72c]' : 'text-[#233dff]'
                            }`}
                          >
                            ₦250,000
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (formErrors.fullName) {
                              setFormErrors((prev) => ({ ...prev, fullName: '' }));
                            }
                          }}
                          placeholder="Your name"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs text-slate-900 focus:outline-none focus:bg-white transition-all ${
                            formErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-[#233dff]'
                          }`}
                        />
                        {formErrors.fullName && (
                          <span className="text-[10px] text-rose-600">{formErrors.fullName}</span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Business / Brand Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => {
                            setBusinessName(e.target.value);
                            if (formErrors.businessName) {
                              setFormErrors((prev) => ({ ...prev, businessName: '' }));
                            }
                          }}
                          placeholder="Your brand name"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs text-slate-900 focus:outline-none focus:bg-white transition-all ${
                            formErrors.businessName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-[#233dff]'
                          }`}
                        />
                        {formErrors.businessName && (
                          <span className="text-[10px] text-rose-600">{formErrors.businessName}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Product Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#233dff] focus:bg-white transition-all"
                        >
                          {CATEGORIES_LIST.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          WhatsApp Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={whatsappNumber}
                          onChange={(e) => {
                            setWhatsappNumber(e.target.value);
                            if (formErrors.whatsappNumber) {
                              setFormErrors((prev) => ({ ...prev, whatsappNumber: '' }));
                            }
                          }}
                          placeholder="e.g. 08077021080"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs text-slate-900 focus:outline-none focus:bg-white transition-all ${
                            formErrors.whatsappNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-[#233dff]'
                          }`}
                        />
                        {formErrors.whatsappNumber && (
                          <span className="text-[10px] text-rose-600">{formErrors.whatsappNumber}</span>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-[#f1c72c] hover:bg-[#e0b71e] text-[#0f172a] font-['Sora',sans-serif] font-bold text-xs tracking-tight shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span>Sending to WhatsApp...</span>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 text-[#0f172a]" />
                            <span>
                              Send My Inquiry to WhatsApp (
                              {selectedPackage === 'credit_alert' ? '₦250,000' : '₦120,000'})
                            </span>
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-[10px] text-slate-500 mt-2">
                        Opens your WhatsApp chat with Victor (08077021080)
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
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
                Websites and online stores for product vendors and brands.
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
                href="/GetQuote"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/GetQuote');
                }}
                className="hover:text-[#f1c72c] transition-colors"
              >
                Quote Builder
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
