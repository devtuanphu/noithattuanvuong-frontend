import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import CompanyIntro from "@/components/home/CompanyIntro";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import DesignServices from "@/components/home/DesignServices";
import ConstructionServices from "@/components/home/ConstructionServices";
import CTABanner from "@/components/home/CTABanner";
import Achievements from "@/components/home/Achievements";
import MediaSection from "@/components/home/MediaSection";
import BlogSection from "@/components/home/BlogSection";
import { getGlobalConfig, getHomepageData } from "@/lib/server/pages";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export async function generateMetadata(): Promise<Metadata> {
  const [homepageData, globalConfig] = await Promise.all([
    getHomepageData(),
    getGlobalConfig(),
  ]);

  const seo = homepageData?.seo;
  const siteName = globalConfig?.siteName || 'Nội Thất Tuấn Vương';

  // Fallback values
  const title = seo?.metaTitle || `${siteName} - Thiết Kế & Thi Công Nội Thất Cao Cấp`;
  const description = seo?.metaDescription || 'Nội Thất Tuấn Vương - Đơn vị thiết kế và thi công nội thất uy tín hàng đầu. Hơn 15 năm kinh nghiệm, 500+ dự án hoàn thành.';
  const canonical = seo?.canonicalUrl || 'https://noithattuanvuong.vn';
  const ogImageUrl = seo?.ogImage?.url 
    ? (seo.ogImage.url.startsWith('http') ? seo.ogImage.url : `${STRAPI_URL}${seo.ogImage.url}`)
    : '/images/og-home.jpg';

  return {
    title,
    description,
    keywords: seo?.metaKeywords?.split(',').map(k => k.trim()) || ['nội thất cao cấp', 'thiết kế nội thất', 'thi công nội thất'],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: 'website',
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: seo?.noIndex 
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function Home() {
  return (
    <>
      <HeroSection />
      <CompanyIntro />
      <FeaturedProjects />
      <DesignServices />
      <ConstructionServices />
      <CTABanner />
      <Achievements />
      <MediaSection />
      <BlogSection />
      </>
  );
}
