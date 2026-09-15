import React, { useState, useEffect } from 'react';
import {
  getCookieConsent,
  setCookieConsent,
  hasAnsweredConsent,
  OPEN_SETTINGS_EVENT,
  CONSENT_UPDATED_EVENT,
  initXPixelIfConsented,
} from '../utils/cookieConsent';
import { navigateTo } from '../utils/navigation';
import { Shield, Cookie, Check, X, Settings2, ExternalLink } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [advertisingAllowed, setAdvertisingAllowed] = useState(false);

  useEffect(() => {
    // Initialize X pixel if already consented in a previous session
    initXPixelIfConsented();

    // Check if new visitor
    if (!hasAnsweredConsent()) {
      // Small delay for smooth entry
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const consent = getCookieConsent();
      if (consent) {
        setAdvertisingAllowed(consent.advertising);
      }
    }
  }, []);

  // Listen for open settings event (e.g. from footer link)
  useEffect(() => {
    const handleOpenSettings = () => {
      const current = getCookieConsent();
      setAdvertisingAllowed(current ? current.advertising : false);
      setShowSettingsModal(true);
    };

    const handleConsentUpdated = () => {
      const current = getCookieConsent();
      if (current) {
        setAdvertisingAllowed(current.advertising);
      }
    };

    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated);

    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
      window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated);
    };
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent(true);
    setAdvertisingAllowed(true);
    setShowBanner(false);
    setShowSettingsModal(false);
  };

  const handleRejectNonEssential = () => {
    setCookieConsent(false);
    setAdvertisingAllowed(false);
    setShowBanner(false);
    setShowSettingsModal(false);
  };

  const handleSavePreferences = () => {
    setCookieConsent(advertisingAllowed);
    setShowBanner(false);
    setShowSettingsModal(false);
  };

  const handleOpenPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('/PrivacyPolicy');
  };

  return (
    <>
      {/* Fixed Cookie Banner (appears for new visitors) */}
      {showBanner && !showSettingsModal && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="max-w-4xl mx-auto bg-slate-950/95 backdrop-blur-md border border-slate-800 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl pointer-events-auto ring-1 ring-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <Cookie className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    Cookie & Privacy Preferences
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We use necessary cookies to ensure the proper functionality of our website. With your consent, we also use advertising and analytics technologies, including the{' '}
                  <strong className="text-white font-semibold">X (Twitter) Pixel</strong>, to measure conversions, assess marketing campaign effectiveness, and understand visitor interactions. Learn more in our{' '}
                  <a
                    href="/PrivacyPolicy"
                    onClick={handleOpenPrivacy}
                    className="text-blue-400 hover:text-blue-300 underline font-semibold transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              {/* 3 Action Controls */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Cookie Settings</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                >
                  Reject Non-Essential
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Cookie Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Customize Cookie Preferences</h3>
                  <p className="text-xs text-slate-400">VP Media Suites Consent Center</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You can choose which cookies and tracking technologies to allow. Essential cookies are necessary for the website to function properly and cannot be disabled. Non-essential cookies, such as advertising and analytics tracking via the X (Twitter) Pixel, can be accepted or rejected at any time.
            </p>

            <div className="space-y-4">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Strictly Necessary Cookies</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Always Active
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  These cookies and local storage tokens are essential for navigating our website, maintaining core session security, and preserving your privacy and cookie choices.
                </p>
              </div>

              {/* Category 2: Advertising & Analytics (X Pixel) */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">
                      Advertising & Analytics (X / Twitter Pixel)
                    </span>
                    <p className="text-[10px] text-slate-400">Operated by X Corp.</p>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advertisingAllowed}
                      onChange={(e) => setAdvertisingAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Allows the X Pixel to measure the effectiveness of our advertising campaigns, perform conversion measurement when visitors explore our website or generate project quotes, and tailor relevant ad campaigns on the X platform. If disabled, the X Pixel will not load or collect interaction data.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
              <a
                href="/PrivacyPolicy"
                onClick={(e) => {
                  handleOpenPrivacy(e);
                  setShowSettingsModal(false);
                }}
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline font-medium"
              >
                <span>Read our full Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer text-center"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all cursor-pointer text-center"
              >
                Save Preferences
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
