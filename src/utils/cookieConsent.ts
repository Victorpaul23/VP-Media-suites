// Cookie consent manager for VP Media Suites
// Strictly respects user consent before loading or firing non-essential advertising/analytics (such as the X / Twitter Pixel)

export interface CookiePreferences {
  essential: boolean;
  advertising: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'vp_media_cookie_consent_v1';
export const CONSENT_UPDATED_EVENT = 'vp_cookie_consent_updated';
export const OPEN_SETTINGS_EVENT = 'vp_open_cookie_settings';

let isScriptLoaded = false;
let isTikTokScriptLoaded = false;

export const TIKTOK_PIXEL_ID = 'DAVOHVBC77U88MSOGEB0';

declare global {
  interface Window {
    twq?: (...args: unknown[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ttq?: any;
    TiktokAnalyticsObject?: string;
    openCookieSettings?: () => void;
  }
}

/**
 * Retrieve current cookie preferences from localStorage
 */
export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && 'advertising' in parsed) {
      return parsed as CookiePreferences;
    }
  } catch (err) {
    console.error('Error reading cookie consent', err);
  }
  return null;
}

/**
 * Check if the user has already provided or rejected cookie consent
 */
export function hasAnsweredConsent(): boolean {
  return getCookieConsent() !== null;
}

/**
 * Check specifically if advertising & non-essential tracking is permitted
 */
export function isAdvertisingConsentGranted(): boolean {
  const consent = getCookieConsent();
  return Boolean(consent && consent.advertising);
}

/**
 * Save user cookie preferences and trigger tracking initialization if granted
 */
export function setCookieConsent(advertising: boolean): CookiePreferences {
  const prefs: CookiePreferences = {
    essential: true,
    advertising,
    timestamp: Date.now(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: prefs }));
    } catch (err) {
      console.error('Error saving cookie consent', err);
    }

    if (advertising) {
      loadXPixelScript();
      loadTikTokPixelScript();
    }
  }

  return prefs;
}

/**
 * Loads the X (Twitter) Pixel base script asynchronously ONLY when consent is granted.
 */
export function loadXPixelScript(): void {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingConsentGranted()) return;
  if (isScriptLoaded) return;

  try {
    // Standard Twitter / X tracking script injection
    const win = window as unknown as { twq?: { (...args: unknown[]): void; exe?: unknown; queue?: unknown[]; version?: string } };
    if (!win.twq) {
      const twq = function (...args: unknown[]) {
        if (twq.exe) {
          (twq.exe as (...a: unknown[]) => void).apply(twq, args);
        } else {
          twq.queue.push(args);
        }
      };
      twq.version = '1.1';
      twq.queue = [] as unknown[];
      twq.exe = undefined;
      win.twq = twq;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://static.ads-twitter.com/uwt.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    if (typeof win.twq === 'function') {
      // Primary / existing X Ads account pixel
      win.twq('config', 'rf672');
      // Secondary X Ads account pixel
      win.twq('config', 'rg2tf');
    }
    isScriptLoaded = true;
  } catch (err) {
    console.warn('Could not initialize X Pixel', err);
  }
}

/**
 * Loads the TikTok Pixel base script asynchronously ONLY when advertising consent is granted.
 * Pixel ID: DAVOHVBC77U88MSOGEB0
 * Prevents duplicate loading via isTikTokScriptLoaded flag and DOM inspection.
 */
export function loadTikTokPixelScript(): void {
  if (typeof window === 'undefined') return;
  if (!isAdvertisingConsentGranted()) return;
  if (isTikTokScriptLoaded) return;

  try {
    // Official TikTok Base Pixel implementation
    (function (w: any, d: Document, t: string) {
      w.TiktokAnalyticsObject = t;
      const ttq = (w[t] = w[t] || []);
      ttq.methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie',
        'holdConsent',
        'revokeConsent',
        'grantConsent',
      ];
      ttq.setAndDefer = function (target: any, method: string) {
        target[method] = function () {
          // eslint-disable-next-line prefer-rest-params
          target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      ttq.instance = function (instanceKey: string) {
        const e = ttq._i[instanceKey] || [];
        for (let n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n]);
        }
        return e;
      };
      ttq.load = function (e: string, n?: any) {
        const r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        const o = n && n.partner;
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.src = r + '?sdkid=' + e + '&lib=' + t;
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(scriptElement, firstScript);
        } else {
          document.head.appendChild(scriptElement);
        }
      };

      ttq.load(TIKTOK_PIXEL_ID);
      ttq.page();
    })(window, document, 'ttq');

    isTikTokScriptLoaded = true;
  } catch (err) {
    console.warn('Could not initialize TikTok Pixel', err);
  }
}

/**
 * Initializes all advertising pixels (X & TikTok) if the visitor has already granted advertising consent
 */
export function initAdvertisingPixelsIfConsented(): void {
  if (isAdvertisingConsentGranted()) {
    loadXPixelScript();
    loadTikTokPixelScript();
  }
}

/**
 * Compatibility alias for existing callers
 */
export function initXPixelIfConsented(): void {
  initAdvertisingPixelsIfConsented();
}

/**
 * Initializes TikTok Pixel if advertising consent is granted
 */
export function initTikTokPixelIfConsented(): void {
  if (isAdvertisingConsentGranted()) {
    loadTikTokPixelScript();
  }
}

/**
 * Fire an X conversion event safely ONLY IF non-essential advertising cookies are consented to.
 */
export function fireXConversionEvent(eventId: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  // Strict check: if the visitor has not consented or explicitly rejected advertising cookies, do NOT fire!
  if (!isAdvertisingConsentGranted()) {
    return;
  }

  try {
    if (typeof window.twq === 'function') {
      window.twq('event', eventId, params);
    }
  } catch (err) {
    console.warn('X Pixel conversion event skipped or failed', err);
  }
}

/**
 * Open the cookie settings modal from anywhere in the app (e.g. from footer link)
 */
export function openCookieSettings(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
  }
}

// Assign to window for direct accessibility if needed
if (typeof window !== 'undefined') {
  window.openCookieSettings = openCookieSettings;
}
