import React from 'react';
import { motion } from 'motion/react';
import { AGENCY_INFO, WHY_WORK_WITH_US } from '../data/agencyData';
import { Zap, Heart, RefreshCw, Sparkles, CheckCircle, ShieldCheck, ArrowRight, Star, Flame, Award } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-500" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-amber-600" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, rotate: -2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section id="why-us" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Canva-Style Animated Background Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-10 w-96 h-96 bg-blue-200/50 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 35, -25, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/50 blur-[130px] rounded-full pointer-events-none"
      />

      {/* Floating Decorative Canva Stickers */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-4, 2, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute top-16 left-12 items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-300 text-slate-900 font-black text-xs shadow-lg border border-amber-400 rotate-[-4deg] z-20 pointer-events-none"
      >
        <Flame className="w-4 h-4 text-amber-900 fill-amber-900" />
        <span>⚡ 100% SLA Guarantee</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [5, -3, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:flex absolute top-28 right-12 items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-lg border border-blue-500 rotate-[5deg] z-20 pointer-events-none"
      >
        <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
        <span>💎 Elite Engineering</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-black shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>THE VP MEDIA STANDARD</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            WHY WORK WITH <span className="text-blue-gradient">VP MEDIA SUITES</span>?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are not a generic agency that delivers basic templates and disappears. We partner with you to engineer high-performance web applications and digital campaigns that directly fuel your bottom line.
          </p>
        </motion.div>

        {/* 4 Core Pillars Grid with Fun Canva Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WHY_WORK_WITH_US.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: idx % 2 === 0 ? 1.5 : -1.5,
                boxShadow: '0 20px 30px -10px rgba(37, 99, 235, 0.15)',
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white p-7 rounded-3xl border-2 border-slate-200 hover:border-blue-500 transition-colors duration-300 flex flex-col justify-between shadow-xs cursor-pointer overflow-hidden"
            >
              {/* Canva-Style Floating Corner Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1, type: 'spring' }}
                className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black tracking-wider uppercase border border-amber-300"
              >
                Pillar 0{idx + 1}
              </motion.div>

              <div className="space-y-4 pt-2">
                {/* Icon Circle with Bouncy Motion */}
                <motion.div
                  whileHover={{
                    scale: 1.25,
                    rotate: [0, -12, 12, -6, 0],
                    transition: { duration: 0.4 },
                  }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-600/10 transition-all duration-300 shadow-sm"
                >
                  {getIcon(item.icon)}
                </motion.div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Bottom Interactive Tag */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600">
                <span className="font-mono text-slate-400 text-[11px]">GUARANTEED</span>
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Canva-Style Interactive Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.01 }}
          className="mt-14 p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-amber-50 border-2 border-amber-300 text-slate-900 shadow-lg relative overflow-hidden"
        >
          {/* Subtle Background Badge */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Award className="w-48 h-48 text-blue-900" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>OUR CLIENT COMMITMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                "You are the centre of our business. Every architectural decision is engineered for your measurable growth."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                Victor Paul • Founder & Digital Strategist, VP Media Suites
              </p>
            </div>

            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hi Victor, I read your commitment on the website and I want to start a project with VP Media!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>Launch Your Project</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

