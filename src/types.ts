export interface WebsiteTier {
  id: string;
  title: string;
  tagline: string;
  price: string;
  numericPrice: number;
  popular?: boolean;
  targetAudience: string;
  hosting: string;
  features: string[];
  freeBonuses: string[];
  whatsAppMessage: string;
}

export interface SocialTier {
  id: string;
  title: string;
  badge?: string;
  platforms: string;
  postFrequency: string;
  contentTypes: string;
  analytics: string;
  features: string[];
  recommendedFor: string;
  whatsAppMessage: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'website' | 'social' | 'video' | 'branding';
  clientName: string;
  image: string;
  description: string;
  tags: string[];
  metrics?: string;
  demoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  serviceUsed: string;
  resultsBadge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'websites' | 'social' | 'payment';
}

export interface CalculatorSelection {
  websiteTierId: string | null;
  socialTierId: string | null;
  digitalAds: string[];
  videoEditing: boolean;
  customNotes: string;
}
