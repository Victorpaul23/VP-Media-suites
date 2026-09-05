import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { WebsiteServices } from './components/WebsiteServices';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GetQuotePage } from './pages/GetQuotePage';
import { useCurrentPath, navigateTo } from './utils/navigation';

export default function App() {
  const currentPath = useCurrentPath();
  const isGetQuote =
    currentPath.toLowerCase().startsWith('/getquote') ||
    currentPath.toLowerCase().startsWith('/get-quote');

  if (isGetQuote) {
    return <GetQuotePage />;
  }

  const handleOpenQuote = (tierId?: string) => {
    if (tierId) {
      navigateTo(`/GetQuote?tier=${tierId}`);
    } else {
      navigateTo('/GetQuote');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar onOpenConsultation={() => handleOpenQuote()} />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero onOpenConsultation={() => handleOpenQuote()} />

        {/* Why Work With VP Media */}
        <WhyUs />

        {/* Website Packages (₦30k Portfolio, ₦100k SMB, ₦500k Enterprise) */}
        <WebsiteServices onOpenConsultation={(tierId) => handleOpenQuote(tierId)} />

        {/* Web Design & Projects Showcase */}
        <PortfolioShowcase />

        {/* 4-Step Agency Process */}
        <ProcessTimeline />

        {/* Client Reviews & Testimonials */}
        <Testimonials />

        {/* FAQs */}
        <FaqSection />

        {/* Direct Contact & WhatsApp Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

