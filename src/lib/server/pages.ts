/**
 * Server utilities for fetching Single Type page data from Strapi
 */
import { 
  fetchStrapiSingle, 
  fetchStrapiWithPagination,
  type PaginatedResult,
  type StrapiProject, 
  type StrapiDesignService, 
  type StrapiConstructionService, 
  type StrapiNewsArticle,
  type StrapiProduct,
  type StrapiVideo
} from '../strapi';

// Component Types
interface StatItem {
  id: number;
  number: string;
  label: string;
  icon?: string;
}

interface ValueItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface Milestone {
  id: number;
  year: string;
  event: string;
}

interface ContactInfoItem {
  id: number;
  icon: string;
  label: string;
  value: string;
  href?: string;
  description?: string;
}

interface SocialLink {
  id: number;
  name: string;
  icon: string;
  href: string;
  color?: string;
}

interface DesignPackage {
  id: number;
  name: string;
  price: string;
  unit: string;
  icon?: string;
  color?: string;
  features?: string[];
  notIncluded?: string[];
  popular?: boolean;
}

interface ConstructionPricing {
  id: number;
  type: string;
  basic: string;
  premium: string;
  luxury: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface ShowroomFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  location?: string;
  content: string;
  rating?: number;
}

interface Commitment {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface MediaLogo {
  id: number;
  name: string;
  url?: string;
}

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
}

interface Advantage {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface SeoComponent {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogImage?: { url: string; alternativeText?: string };
  noIndex: boolean;
}

// Single Type Interfaces
export interface FooterLink {
  name: string;
  href: string;
}

export interface Hotline {
  id: number;
  label: string;
  phone: string;
  type: 'phone' | 'zalo';
}

export interface GlobalConfig {
  siteName: string;
  siteDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  zalo?: string;
  workingHours?: string;
  socialLinks?: SocialLink[];
  footerDescription?: string;
  footerServices?: FooterLink[];
  footerSupport?: FooterLink[];
  copyrightText?: string;
  defaultSeo?: SeoComponent;
  hotlines?: Hotline[];
}

export interface HotlineConfig {
  phone1?: string;
  phone2?: string;
  zalo1?: string;
  zalo2?: string;
}

export interface ProjectType {
  value: string;
  label: string;
}

export interface CtaFeature {
  icon: string;
  text: string;
}

export interface HomepageData {
  // Hero Section
  heroTitle: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroStats?: StatItem[];
  heroImages?: { url: string; alternativeText?: string }[];
  // Company Intro Section
  companyIntroTagline?: string;
  companyIntroTitle?: string;
  companyIntroDescription?: string;
  companyIntroImage?: { url: string; alternativeText?: string };
  companyIntroButtonText?: string;
  companyIntroButtonLink?: string;
  // Featured Projects Section
  featuredProjectsTagline?: string;
  featuredProjectsTitle?: string;
  featuredProjectsDescription?: string;
  featuredProjectsButtonText?: string;
  featuredProjectsButtonLink?: string;
  featuredProjects?: StrapiProject[];
  // Design Services Section
  designServicesTagline?: string;
  designServicesTitle?: string;
  designServicesDescription?: string;
  designServicesButtonText?: string;
  designServicesButtonLink?: string;
  designServices?: StrapiDesignService[];
  // Construction Services Section
  constructionServicesTagline?: string;
  constructionServicesTitle?: string;
  constructionServicesDescription?: string;
  constructionServicesButtonText?: string;
  constructionServicesButtonLink?: string;
  constructionServices?: StrapiConstructionService[];
  // CTA Banner Section
  ctaTagline?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaFeatures?: CtaFeature[];
  projectTypes?: ProjectType[];
  pricingFileUrl?: string;
  // Achievements Section
  achievementsTagline?: string;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: StatItem[];
  commitments?: Commitment[];
  // Media Section
  mediaSectionTitle?: string;
  mediaSectionSubtitle?: string;
  mediaSectionButtonText?: string;
  mediaSectionButtonLink?: string;
  mediaLogosSubtitle?: string;
  mediaVideoUrl?: string;
  testimonials?: Testimonial[];
  mediaLogos?: MediaLogo[];
  // Blog Section
  blogBadgeNumber?: string;
  blogBadgeLabel?: string;
  blogDescription?: string;
  blogImage?: { url: string; alternativeText?: string };
  blogButtonText?: string;
  blogButtonLink?: string;
  blogArticles?: StrapiNewsArticle[];
  // SEO
  seo?: SeoComponent;
}

export interface AboutPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  stats?: StatItem[];
  storyTagline?: string;
  storyTitle?: string;
  storyContent?: string;
  storyBadgeNumber?: string;
  storyBadgeLabel?: string;
  valuesTagline?: string;
  valuesTitle?: string;
  values?: ValueItem[];
  milestonesTagline?: string;
  milestonesTitle?: string;
  milestones?: Milestone[];
  whyChooseTagline?: string;
  whyChooseTitle?: string;
  whyChooseItems?: string[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButton1Text?: string;
  ctaButton1Link?: string;
  ctaButton2Text?: string;
  ctaButton2Link?: string;
  seo?: SeoComponent;
}

export interface ContactPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  contactInfo?: ContactInfoItem[];
  formTagline?: string;
  formTitle?: string;
  formDescription?: string;
  mapEmbed?: string;
  showroomTitle?: string;
  showroomAddress?: string;
  socialLinksTitle?: string;
  socialLinks?: SocialLink[];
  seo?: SeoComponent;
}

export interface PricingPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  designPackagesTagline?: string;
  designPackagesTitle?: string;
  designPackages?: DesignPackage[];
  constructionPackagesTagline?: string;
  constructionPackagesTitle?: string;
  constructionPackages?: ConstructionPricing[];
  includesTitle?: string;
  includeItems?: string[];
  faqsTitle?: string;
  faqs?: FaqItem[];
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface ShowroomPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  highlights?: StatItem[];
  featuresTagline?: string;
  featuresTitle?: string;
  features?: ShowroomFeature[];
  galleryTagline?: string;
  galleryTitle?: string;
  gallery?: { url: string; alternativeText?: string }[];
  infoTagline?: string;
  infoTitle?: string;
  address?: string;
  openingHours?: string;
  openingNote?: string;
  phone?: string;
  parkingInfo?: string;
  mapEmbed?: string;
  testimonialsTagline?: string;
  testimonialsTitle?: string;
  testimonials?: Testimonial[];
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface DesignPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  servicesTagline?: string;
  servicesTitle?: string;
  processTagline?: string;
  processTitle?: string;
  process?: ProcessStep[];
  featuresTagline?: string;
  featuresTitle?: string;
  features?: string[];
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface ConstructionPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  advantages?: Advantage[];
  servicesTagline?: string;
  servicesTitle?: string;
  processTagline?: string;
  processTitle?: string;
  process?: ProcessStep[];
  featuresTagline?: string;
  featuresTitle?: string;
  features?: string[];
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface ProjectsPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  stats?: StatItem[];
  gridTitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface ProductsPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  categoryShowcaseTitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface NewsPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  gridTitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SeoComponent;
}

export interface VideoPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  gridTitle?: string;
  youtubeChannelUrl?: string;
  youtubeCTATitle?: string;
  youtubeCTADescription?: string;
  seo?: SeoComponent;
}

// Fetch functions
export async function getGlobalConfig(): Promise<GlobalConfig | null> {
  try {
    return await fetchStrapiSingle<GlobalConfig>('/global?populate=*');
  } catch (error) {
    console.warn('Failed to fetch global config:', error);
    return null;
  }
}

export async function getHotlineConfig(): Promise<HotlineConfig | null> {
  try {
    return await fetchStrapiSingle<HotlineConfig>('/hotline');
  } catch (error) {
    console.warn('Failed to fetch hotline config:', error);
    return null;
  }
}

// Raw Strapi response interface for new component-based schema
interface StrapiHomepageResponse {
  seo?: SeoComponent;
  heroSection?: {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    stats?: StatItem[];
    images?: { url: string; alternativeText?: string }[];
  };
  companyIntroSection?: {
    tagline?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    image?: { url: string; alternativeText?: string };
  };
  featuredProjectsSection?: {
    tagline?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    projects?: StrapiProject[];
  };
  designServicesSection?: {
    tagline?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    services?: StrapiDesignService[];
  };
  constructionServicesSection?: {
    tagline?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    services?: StrapiConstructionService[];
  };
  ctaBannerSection?: {
    tagline?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    features?: CtaFeature[];
    projectTypes?: ProjectType[];
    pricingFile?: { url: string };
  };
  achievementsSection?: {
    tagline?: string;
    title?: string;
    description?: string;
    achievements?: StatItem[];
    commitments?: Commitment[];
  };
  mediaSection?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    mediaLogosSubtitle?: string;
    videoUrl?: string;
    testimonials?: Testimonial[];
    mediaLogos?: MediaLogo[];
  };
  blogSection?: {
    badgeNumber?: string;
    badgeLabel?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    image?: { url: string; alternativeText?: string };
    articles?: StrapiNewsArticle[];
  };
}

// Map nested component structure to flat structure for frontend compatibility
function mapHomepageData(raw: StrapiHomepageResponse): HomepageData {
  return {
    // Hero Section
    heroTitle: raw.heroSection?.title || '',
    heroSubtitle: raw.heroSection?.subtitle,
    heroButtonText: raw.heroSection?.buttonText,
    heroButtonLink: raw.heroSection?.buttonLink,
    heroSecondaryButtonText: raw.heroSection?.secondaryButtonText,
    heroSecondaryButtonLink: raw.heroSection?.secondaryButtonLink,
    heroStats: raw.heroSection?.stats,
    heroImages: raw.heroSection?.images,
    // Company Intro Section
    companyIntroTagline: raw.companyIntroSection?.tagline,
    companyIntroTitle: raw.companyIntroSection?.title,
    companyIntroDescription: raw.companyIntroSection?.description,
    companyIntroButtonText: raw.companyIntroSection?.buttonText,
    companyIntroButtonLink: raw.companyIntroSection?.buttonLink,
    companyIntroImage: raw.companyIntroSection?.image,
    // Featured Projects Section
    featuredProjectsTagline: raw.featuredProjectsSection?.tagline,
    featuredProjectsTitle: raw.featuredProjectsSection?.title,
    featuredProjectsDescription: raw.featuredProjectsSection?.description,
    featuredProjectsButtonText: raw.featuredProjectsSection?.buttonText,
    featuredProjectsButtonLink: raw.featuredProjectsSection?.buttonLink,
    featuredProjects: raw.featuredProjectsSection?.projects,
    // Design Services Section
    designServicesTagline: raw.designServicesSection?.tagline,
    designServicesTitle: raw.designServicesSection?.title,
    designServicesDescription: raw.designServicesSection?.description,
    designServicesButtonText: raw.designServicesSection?.buttonText,
    designServicesButtonLink: raw.designServicesSection?.buttonLink,
    designServices: raw.designServicesSection?.services,
    // Construction Services Section
    constructionServicesTagline: raw.constructionServicesSection?.tagline,
    constructionServicesTitle: raw.constructionServicesSection?.title,
    constructionServicesDescription: raw.constructionServicesSection?.description,
    constructionServicesButtonText: raw.constructionServicesSection?.buttonText,
    constructionServicesButtonLink: raw.constructionServicesSection?.buttonLink,
    constructionServices: raw.constructionServicesSection?.services,
    // CTA Banner Section
    ctaTagline: raw.ctaBannerSection?.tagline,
    ctaTitle: raw.ctaBannerSection?.title,
    ctaDescription: raw.ctaBannerSection?.description,
    ctaButtonText: raw.ctaBannerSection?.buttonText,
    ctaFeatures: raw.ctaBannerSection?.features,
    projectTypes: raw.ctaBannerSection?.projectTypes,
    pricingFileUrl: raw.ctaBannerSection?.pricingFile?.url,
    // Achievements Section
    achievementsTagline: raw.achievementsSection?.tagline,
    achievementsTitle: raw.achievementsSection?.title,
    achievementsDescription: raw.achievementsSection?.description,
    achievements: raw.achievementsSection?.achievements,
    commitments: raw.achievementsSection?.commitments,
    // Media Section
    mediaSectionTitle: raw.mediaSection?.title,
    mediaSectionSubtitle: raw.mediaSection?.subtitle,
    mediaSectionButtonText: raw.mediaSection?.buttonText,
    mediaSectionButtonLink: raw.mediaSection?.buttonLink,
    mediaLogosSubtitle: raw.mediaSection?.mediaLogosSubtitle,
    mediaVideoUrl: raw.mediaSection?.videoUrl,
    testimonials: raw.mediaSection?.testimonials,
    mediaLogos: raw.mediaSection?.mediaLogos,
    // Blog Section
    blogBadgeNumber: raw.blogSection?.badgeNumber,
    blogBadgeLabel: raw.blogSection?.badgeLabel,
    blogDescription: raw.blogSection?.description,
    blogButtonText: raw.blogSection?.buttonText,
    blogButtonLink: raw.blogSection?.buttonLink,
    blogImage: raw.blogSection?.image,
    blogArticles: raw.blogSection?.articles,
    // SEO
    seo: raw.seo,
  };
}

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    // Use pLevel from strapi-v5-plugin-populate-deep for deep population
    const raw = await fetchStrapiSingle<StrapiHomepageResponse>(
      '/homepage?pLevel=5'
    );
    
   
    if (!raw) {
    
      return null;
    }
    
    const mapped = mapHomepageData(raw);
  
    return mapped;
  } catch (error) {
    console.warn('Failed to fetch homepage data:', error);
    return null;
  }
}

export async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    return await fetchStrapiSingle<AboutPageData>('/about-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch about page data:', error);
    return null;
  }
}

export async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    return await fetchStrapiSingle<ContactPageData>('/contact-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch contact page data:', error);
    return null;
  }
}

export async function getPricingPageData(): Promise<PricingPageData | null> {
  try {
    return await fetchStrapiSingle<PricingPageData>('/pricing-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch pricing page data:', error);
    return null;
  }
}

export async function getShowroomPageData(): Promise<ShowroomPageData | null> {
  try {
    return await fetchStrapiSingle<ShowroomPageData>('/showroom-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch showroom page data:', error);
    return null;
  }
}

export async function getDesignPageData(): Promise<DesignPageData | null> {
  try {
    return await fetchStrapiSingle<DesignPageData>('/design-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch design page data:', error);
    return null;
  }
}

export async function getConstructionPageData(): Promise<ConstructionPageData | null> {
  try {
    return await fetchStrapiSingle<ConstructionPageData>('/construction-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch construction page data:', error);
    return null;
  }
}

export async function getProjectsPageData(): Promise<ProjectsPageData | null> {
  try {
    return await fetchStrapiSingle<ProjectsPageData>('/projects-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch projects page data:', error);
    return null;
  }
}

export async function getProductsPageData(): Promise<ProductsPageData | null> {
  try {
    return await fetchStrapiSingle<ProductsPageData>('/products-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch products page data:', error);
    return null;
  }
}

export async function getNewsPageData(): Promise<NewsPageData | null> {
  try {
    return await fetchStrapiSingle<NewsPageData>('/news-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch news page data:', error);
    return null;
  }
}

export async function getVideoPageData(): Promise<VideoPageData | null> {
  try {
    return await fetchStrapiSingle<VideoPageData>('/video-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch video page data:', error);
    return null;
  }
}

// =====================================
// Pagination Functions (24 items/page)
// =====================================

// Note: Uses fetchStrapiWithPagination, PaginatedResult, and Strapi types from '../strapi' (imported at top)

const PAGE_SIZE = 24;

export async function getDesignServicesWithPagination(page: number = 1): Promise<PaginatedResult<StrapiDesignService>> {
  return fetchStrapiWithPagination<StrapiDesignService>(
    '/design-services?populate=*&sort=createdAt:desc',
    page,
    PAGE_SIZE
  );
}

export async function getConstructionServicesWithPagination(page: number = 1): Promise<PaginatedResult<StrapiConstructionService>> {
  return fetchStrapiWithPagination<StrapiConstructionService>(
    '/construction-services?populate=*&sort=createdAt:desc',
    page,
    PAGE_SIZE
  );
}

export async function getProjectsWithPagination(page: number = 1, category?: string): Promise<PaginatedResult<StrapiProject>> {
  let endpoint = '/projects?populate=*&sort=createdAt:desc';
  if (category) {
    endpoint += `&filters[categoryName][$eq]=${encodeURIComponent(category)}`;
  }
  return fetchStrapiWithPagination<StrapiProject>(endpoint, page, PAGE_SIZE);
}

export async function getProductsWithPagination(page: number = 1, category?: string): Promise<PaginatedResult<StrapiProduct>> {
  let endpoint = '/products?populate=*&sort=createdAt:desc';
  if (category) {
    endpoint += `&filters[category][slug][$eq]=${encodeURIComponent(category)}`;
  }
  return fetchStrapiWithPagination<StrapiProduct>(endpoint, page, PAGE_SIZE);
}

export async function getNewsArticlesWithPagination(page: number = 1, category?: string): Promise<PaginatedResult<StrapiNewsArticle>> {
  let endpoint = '/news-articles?populate=*&sort=publishedAt:desc';
  if (category) {
    endpoint += `&filters[category][$eq]=${encodeURIComponent(category)}`;
  }
  return fetchStrapiWithPagination<StrapiNewsArticle>(endpoint, page, PAGE_SIZE);
}

export async function getVideosWithPagination(page: number = 1): Promise<PaginatedResult<StrapiVideo>> {
  return fetchStrapiWithPagination<StrapiVideo>(
    '/videos?populate=*&sort=createdAt:desc',
    page,
    PAGE_SIZE
  );
}

// =====================================
// Get By Slug Functions
// =====================================

import { fetchStrapiOne } from '../strapi';

export async function getDesignServiceBySlug(slug: string): Promise<StrapiDesignService | null> {
  try {
    return await fetchStrapiOne<StrapiDesignService>(`/design-services?filters[slug][$eq]=${slug}&populate=*`);
  } catch (error) {
    console.warn('Failed to fetch design service:', error);
    return null;
  }
}

export async function getConstructionServiceBySlug(slug: string): Promise<StrapiConstructionService | null> {
  try {
    return await fetchStrapiOne<StrapiConstructionService>(`/construction-services?filters[slug][$eq]=${slug}&populate=*`);
  } catch (error) {
    console.warn('Failed to fetch construction service:', error);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<StrapiProject | null> {
  try {
    return await fetchStrapiOne<StrapiProject>(`/projects?filters[slug][$eq]=${slug}&populate=*`);
  } catch (error) {
    console.warn('Failed to fetch project:', error);
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<StrapiProduct | null> {
  try {
    return await fetchStrapiOne<StrapiProduct>(`/products?filters[slug][$eq]=${slug}&populate=*`);
  } catch (error) {
    console.warn('Failed to fetch product:', error);
    return null;
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<StrapiNewsArticle | null> {
  try {
    return await fetchStrapiOne<StrapiNewsArticle>(`/news-articles?filters[slug][$eq]=${slug}&populate=*`);
  } catch (error) {
    console.warn('Failed to fetch news article:', error);
    return null;
  }
}

export async function getVideoBySlug(slug: string): Promise<StrapiVideo | null> {
  try {
    return await fetchStrapiOne<StrapiVideo>(`/videos?filters[slug][$eq]=${slug}&populate=*`);
  } catch (error) {
    console.warn('Failed to fetch video:', error);
    return null;
  }
}

// =====================================
// Policy Pages (Simple Content Pages)
// =====================================

export interface PolicyPageData {
  heroTitle: string;
  heroDescription?: string;
  content?: string;
  seo?: SeoComponent;
}

export async function getWorkProcessPageData(): Promise<PolicyPageData | null> {
  try {
    return await fetchStrapiSingle<PolicyPageData>('/work-process-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch work process page data:', error);
    return null;
  }
}

export async function getWarrantyPolicyPageData(): Promise<PolicyPageData | null> {
  try {
    return await fetchStrapiSingle<PolicyPageData>('/warranty-policy-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch warranty policy page data:', error);
    return null;
  }
}

export async function getPaymentMethodsPageData(): Promise<PolicyPageData | null> {
  try {
    return await fetchStrapiSingle<PolicyPageData>('/payment-methods-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch payment methods page data:', error);
    return null;
  }
}

export async function getShippingPageData(): Promise<PolicyPageData | null> {
  try {
    return await fetchStrapiSingle<PolicyPageData>('/shipping-page?populate=*');
  } catch (error) {
    console.warn('Failed to fetch shipping page data:', error);
    return null;
  }
}
