const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiResponse<T> = {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

/**
 * Fetch data from Strapi API with authentication
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<T[]> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }

  const json: StrapiResponse<T[]> = await res.json();
  return json.data;
}

/**
 * Fetch single item from Strapi API
 */
export async function fetchStrapiOne<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<T | null> {
  const data = await fetchStrapi<T>(endpoint, options);
  return data[0] || null;
}

/**
 * Fetch Single Type from Strapi API
 */
export async function fetchStrapiSingle<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<T | null> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }

  const json: StrapiResponse<T> = await res.json();
  return json.data || null;
}

/**
 * POST data to Strapi API
 */
export async function postStrapi<T, R = unknown>(
  endpoint: string,
  data: T
): Promise<R> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error(`Failed to post ${endpoint}: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

/**
 * Fetch data from Strapi API with pagination support
 */
export async function fetchStrapiWithPagination<T>(
  endpoint: string,
  page: number = 1,
  pageSize: number = 24,
  options?: { revalidate?: number }
): Promise<PaginatedResult<T>> {
  const separator = endpoint.includes('?') ? '&' : '?';
  const paginatedEndpoint = `${endpoint}${separator}pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  
  const res = await fetch(`${STRAPI_URL}/api${paginatedEndpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }

  const json = await res.json();
  return {
    data: json.data || [],
    pagination: json.meta?.pagination || {
      page: 1,
      pageSize: pageSize,
      pageCount: 1,
      total: 0,
    },
  };
}

/**
 * Convert Strapi media URL to full URL
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Get image URL from Strapi media object
 */
export function getStrapiImageUrl(media: StrapiMedia | null | undefined): string {
  if (!media) return '/images/placeholder.jpg';
  return getStrapiMedia(media.url);
}

/**
 * Get multiple image URLs from Strapi media array
 */
export function getStrapiImageUrls(
  media: StrapiMedia[] | null | undefined
): string[] {
  if (!media || media.length === 0) return ['/images/placeholder.jpg'];
  return media.map((m) => getStrapiMedia(m.url));
}

// =======================
// Type Definitions
// =======================

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  ogImage: StrapiMedia | null;
  noIndex: boolean;
}

// Collection Types
export interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  type: 'thiet-ke' | 'thi-cong';
  shortDescription: string;
  description: string;
  content: string;
  features: string[] | null;
  price: string | null;
  image: StrapiMedia | null;
  gallery: StrapiMedia[] | null;
  seo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiDesignService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  content: string;
  features: string[] | null;
  price: string | null;
  image: StrapiMedia | null;
  gallery: StrapiMedia[] | null;
  seo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiConstructionService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  content: string;
  features: string[] | null;
  price: string | null;
  image: StrapiMedia | null;
  gallery: StrapiMedia[] | null;
  seo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: 'can-ho' | 'nha-pho' | 'biet-thu' | 'van-phong' | 'showroom';
  categoryName: string;
  shortDescription: string;
  description: string;
  content: string;
  area: string;
  location: string;
  style: string;
  completedAt: string;
  image: StrapiMedia | null;
  gallery: StrapiMedia[] | null;
  seo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProductCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  image: StrapiMedia | null;
  seo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiSpecification {
  id: number;
  key: string;
  value: string;
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  price: string;
  salePrice: string | null;
  description: string;
  content: string;
  inStock: boolean;
  featured: boolean;
  category: StrapiProductCategory | null;
  images: StrapiMedia[] | null;
  specifications: StrapiSpecification[] | null;
  seo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiNewsArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  image: StrapiMedia | null;
  seo: StrapiSeo | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiVideo {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string | null;
  youtubeId: string | null;
  duration: string;
  category: string;
  thumbnail: StrapiMedia | null;
  seo: StrapiSeo | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Single Types
export interface StrapiHomepage {
  id: number;
  documentId: string;
  heroTitle: string;
  heroSubtitle: string | null;
  heroImage: StrapiMedia | null;
  aboutTitle: string | null;
  aboutDescription: string | null;
  ctaTitle: string | null;
  ctaDescription: string | null;
  seo: StrapiSeo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAboutPage {
  id: number;
  documentId: string;
  title: string;
  subtitle: string | null;
  content: string;
  heroImage: StrapiMedia | null;
  missionTitle: string | null;
  missionContent: string | null;
  visionTitle: string | null;
  visionContent: string | null;
  gallery: StrapiMedia[] | null;
  stats: Record<string, unknown>[] | null;
  teamMembers: Record<string, unknown>[] | null;
  seo: StrapiSeo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiContactPage {
  id: number;
  documentId: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  address: string;
  phone: string;
  email: string;
  workingHours: string | null;
  mapUrl: string | null;
  mapEmbed: string | null;
  seo: StrapiSeo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiShowroomPage {
  id: number;
  documentId: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  heroImage: StrapiMedia | null;
  gallery: StrapiMedia[] | null;
  address: string | null;
  openingHours: string | null;
  features: string[] | null;
  mapEmbed: string | null;
  seo: StrapiSeo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiPricingPage {
  id: number;
  documentId: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  heroImage: StrapiMedia | null;
  pricingCategories: Record<string, unknown>[] | null;
  faqTitle: string | null;
  faqs: Record<string, unknown>[] | null;
  ctaTitle: string | null;
  ctaDescription: string | null;
  seo: StrapiSeo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiGlobal {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string | null;
  logo: StrapiMedia | null;
  favicon: StrapiMedia | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  zaloUrl: string | null;
  instagramUrl: string | null;
  footerText: string | null;
  defaultSeo: StrapiSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
