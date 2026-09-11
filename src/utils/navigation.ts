import { useState, useEffect } from 'react';

// Custom event name for client-side navigation
const NAVIGATE_EVENT = 'vpmedia:navigate';

export function normalizePath(): string {
  if (typeof window === 'undefined') return '/';

  // 1. Check direct window pathname (e.g. /Getquote, /getquote, /GetQuote)
  const pathname = window.location.pathname;
  if (pathname && pathname !== '/' && pathname !== '') {
    return pathname;
  }

  // 2. Check query param fallback (e.g. ?p=/Getquote or ?page=Getquote or ?redirect=/Getquote)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam =
      searchParams.get('p') ||
      searchParams.get('page') ||
      searchParams.get('path') ||
      searchParams.get('redirect');

    if (queryParam) {
      return queryParam.startsWith('/') ? queryParam : `/${queryParam}`;
    }
  } catch {
    // Ignore URL parse errors
  }

  // 3. Check hash fallback (e.g. #/Getquote or #Getquote or #getquote)
  if (window.location.hash) {
    const cleanHash = window.location.hash.replace(/^#\/?/, '/');
    const lower = cleanHash.toLowerCase();
    if (lower.includes('getquote') || lower.includes('get-quote') || lower.includes('quote')) {
      return cleanHash.startsWith('/') ? cleanHash : `/${cleanHash}`;
    }
  }

  return '/';
}

export function navigateTo(path: string) {
  if (typeof window === 'undefined') return;
  
  if (window.location.pathname + window.location.search !== path) {
    window.history.pushState({}, '', path);
  }
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useCurrentPath(): string {
  const [currentPath, setCurrentPath] = useState<string>(() => normalizePath());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener(NAVIGATE_EVENT, handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener(NAVIGATE_EVENT, handleLocationChange);
    };
  }, []);

  return currentPath;
}

