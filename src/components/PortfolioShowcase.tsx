import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS, AGENCY_INFO } from '../data/agencyData';
import { PortfolioItem } from '../types';
import {
  LayoutGrid,
  ExternalLink,
  MessageSquare,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Globe,
  Sparkles,
  Sliders,
  CheckCircle2,
  X,
  ArrowLeft,
} from 'lucide-react';

export const PortfolioShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

  // Filter items
  const filteredItems =
    activeCategory === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  // Specifically website items for slider
  const websiteItems = PORTFOLIO_ITEMS.filter((item) => item.category === 'website');

  // Reset slider index if filtered items change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-play timer for slider
  useEffect(() => {
    if (!isAutoPlaying || filteredItems.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredItems.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-100/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-amber-800 text-xs font-bold shadow-xs">
              <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
              <span>VERIFIED BUILD CATALOGUE & SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Real Builds. <span className="text-blue-gradient">Live Production Samples.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Browse our high-performing website platforms, portfolios, and marketing campaigns built for clients with real live URLs.
            </p>
          </div>

          {/* Category Filter & View Mode Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-xs">
              {['all', 'website', 'social', 'video', 'branding'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white font-black shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {cat === 'all' ? 'All Builds' : cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle (Slider vs Grid) */}
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setViewMode('slider')}
                title="Smooth Slide Showcase"
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'slider'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Grid Layout"
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- SLIDER MODE (SMOOTH SLIDE ANIMATION) ---------------- */}
        {viewMode === 'slider' && filteredItems.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Main Slider Card Container */}
            <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 shadow-xl min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="w-full flex flex-col h-full"
                >
                  {/* WIDE RECTANGULAR IMAGE SECTION (Longer width, shorter height) */}
                  <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] bg-slate-900 overflow-hidden group">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (activeItem.image.includes('lh3.googleusercontent.com/d/')) {
                          const fileId = activeItem.image.split('/d/')[1];
                          (e.currentTarget as HTMLImageElement).src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                        }
                      }}
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black border border-slate-200 shadow-sm flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>{activeItem.clientName}</span>
                      </span>

                      {activeItem.metrics && (
                        <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                          <span>{activeItem.metrics}</span>
                        </span>
                      )}
                    </div>

                    {/* Floating Center Action Button on Image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[2px] gap-3">
                      {activeItem.demoUrl && (
                        <a
                          href={activeItem.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                          <span>Visit Live Website</span>
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedItem(activeItem)}
                        className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span>Inspect Specs</span>
                      </button>
                    </div>
                  </div>

                  {/* COMPACT WRITE-UP SECTION (Small space, concise info) */}
                  <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {activeItem.title}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-600 text-white shrink-0" />
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                        {activeItem.description}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeItem.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons in Write-up */}
                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      {activeItem.demoUrl && (
                        <a
                          href={activeItem.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-white" />
                          <span>Visit Site</span>
                        </a>
                      )}
                      <a
                        href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Hi Victor, I saw "${activeItem.title}" (${activeItem.demoUrl || ''}) in your portfolio and I want a similar platform build!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Order Similar</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation Bar */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                {/* Auto-play toggle & slide counter */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-2xs flex items-center gap-1.5 text-[11px]"
                    title={isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-600" />
                        <span>Auto-Sliding</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-blue-600" />
                        <span>Paused</span>
                      </>
                    )}
                  </button>

                  <span className="font-mono text-slate-500">
                    Sample {currentIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                {/* Dot Indicators */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {filteredItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? 'w-7 bg-blue-600'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Prev / Next Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xs"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xs"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- GRID MODE (WIDE RECTANGULAR CARDS) ---------------- */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const whatsAppUrl = `https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                `Hi Victor, I saw the build "${item.title}" (${item.demoUrl || ''}) in your portfolio and I want to order a similar project!`
              )}`;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg"
                >
                  <div>
                    {/* WIDE RECTANGULAR IMAGE (Longer width, shorter height) */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (item.image.includes('lh3.googleusercontent.com/d/')) {
                            const fileId = item.image.split('/d/')[1];
                            (e.currentTarget as HTMLImageElement).src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                          }
                        }}
                      />

                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        {item.demoUrl && (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                            <span>Visit Site</span>
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>Inspect</span>
                        </button>
                      </div>

                      {/* Result Badge */}
                      {item.metrics && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-mono font-bold shadow-xs">
                          {item.metrics}
                        </div>
                      )}
                    </div>

                    {/* COMPACT WRITE-UP AREA (Small height, minimal space) */}
                    <div className="p-4 space-y-2">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
                        {item.clientName}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs border border-blue-200 flex items-center justify-center gap-1.5 transition-all shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>Visit Site</span>
                      </a>
                    )}
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs text-center border border-slate-200 flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>Order Similar</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for viewing detailed item */}
        {selectedItem && (
          <div
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-slate-900 my-auto"
            >
              {/* Modal Header Bar with Title and Clear Close (X) Button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                  {selectedItem.clientName} Specs
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-slate-700" />
                  <span>Close</span>
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-slate-200">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (selectedItem.image.includes('lh3.googleusercontent.com/d/')) {
                      const fileId = selectedItem.image.split('/d/')[1];
                      (e.currentTarget as HTMLImageElement).src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">{selectedItem.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedItem.description}</p>
              </div>

              {selectedItem.metrics && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Verified Outcome: {selectedItem.metrics}</span>
                </div>
              )}

              {/* Modal Action Footer with Go Back Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-700" />
                  <span>Go Back</span>
                </button>

                {selectedItem.demoUrl && (
                  <a
                    href={selectedItem.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                    <span>Visit Live Website</span>
                  </a>
                )}

                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Victor, I saw "${selectedItem.title}" on your website and want to order a similar build!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs text-center rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Order On WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
