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

declare global {
  interface Window {
    twq?: (...args: unknown[]) => void;
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
      win.twq('config', 'rf672');
    }
    isScriptLoaded = true;
  } catch (err) {
    console.warn('Could not initialize X Pixel', err);
  }
}

/**
 * Initializes X Pixel if the visitor has already granted advertising consent
 */
export function initXPixelIfConsented(): void {
  if (isAdvertisingConsentGranted()) {
    loadXPixelScript();
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
