import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GetQuotePage } from './pages/GetQuotePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { VendorLandingPage } from './pages/VendorLandingPage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { useCurrentPath, navigateTo } from './utils/navigation';
import { trackVendorEvent } from './utils/cookieConsent';

export default function App() {
  const currentPath = useCurrentPath();
  const lowerPath = currentPath.toLowerCase();

  const isVendors =
    lowerPath.startsWith('/vendors') ||
    lowerPath.startsWith('/vendor');

  const isGetQuote =
    lowerPath.startsWith('/getquote') ||
    lowerPath.startsWith('/get-quote') ||
    lowerPath.startsWith('/get_quote') ||
    lowerPath.startsWith('/quote');

  const isPrivacyPolicy =
    lowerPath.startsWith('/privacypolicy') ||
    lowerPath.startsWith('/privacy-policy') ||
    lowerPath.startsWith('/privacy_policy') ||
    lowerPath.startsWith('/privacy');

  // Track PageView on client-side route navigation to home page (deduped automatically against index.html)
  useEffect(() => {
    if (!isVendors && !isGetQuote && !isPrivacyPolicy) {
      trackVendorEvent('PageView', { path: '/' });
    }
  }, [isVendors, isGetQuote, isPrivacyPolicy]);

  if (isVendors) {
    return (
      <>
        <VendorLandingPage />
        <CookieConsentBanner />
      </>
    );
  }

  if (isPrivacyPolicy) {
    return (
      <>
        <PrivacyPolicyPage />
        <CookieConsentBanner />
      </>
    );
  }

  if (isGetQuote) {
    return (
      <>
        <GetQuotePage />
        <CookieConsentBanner />
      </>
    );
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

      {/* Cookie Consent Banner & Settings Modal */}
      <CookieConsentBanner />
    </div>
  );
}

