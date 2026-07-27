import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { WebsiteServices } from './components/WebsiteServices';
import { SocialMediaServices } from './components/SocialMediaServices';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* Why Work With VP Media */}
        <WhyUs />

        {/* Website Packages (₦30k Portfolio, ₦90k SMB, ₦500k Enterprise) */}
        <WebsiteServices onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* Social Media Marketing, Paid Ads & Video Editing */}
        <SocialMediaServices />

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

      {/* Quick Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
