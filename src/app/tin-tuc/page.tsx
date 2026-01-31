import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';

import Pagination from '@/components/shared/Pagination';
import { getNewsCategories } from '@/lib/server/news';
import { getNewsPageData, getNewsArticlesWithPagination } from '@/lib/server/pages';
import { getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Tin Tức Nội Thất | Nội Thất Tuấn Vương',
  description: 'Cập nhật tin tức, xu hướng thiết kế nội thất mới nhất. Kiến thức phong thủy, mẫu nhà đẹp, kinh nghiệm trang trí nội thất.',
  keywords: ['tin tức nội thất', 'xu hướng nội thất', 'mẫu nhà đẹp', 'phong thủy nhà ở', 'kiến thức nội thất'],
  alternates: {
    canonical: 'https://noithattuanvuong.vn/tin-tuc',
  },
  openGraph: {
    title: 'Tin Tức Nội Thất | Nội Thất Tuấn Vương',
    description: 'Cập nhật tin tức, xu hướng thiết kế nội thất mới nhất.',
    url: 'https://noithattuanvuong.vn/tin-tuc',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
    images: ['/images/og-news.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tin Tức Nội Thất | Nội Thất Tuấn Vương',
    description: 'Cập nhật tin tức, xu hướng thiết kế nội thất mới nhất.',
    images: ['/images/og-news.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function TinTucPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const category = params.category;

  const [articlesResult, categories, pageData] = await Promise.all([
    getNewsArticlesWithPagination(currentPage, category),
    getNewsCategories(),
    getNewsPageData(),
  ]);

  const articles = articlesResult.data;
  const { pagination } = articlesResult;

  // Get page content from CMS
  const heroTagline = pageData?.heroTagline || 'Blog';
  const heroTitle = pageData?.heroTitle || 'Tin Tức & Kiến Thức Nội Thất';
  const heroDescription = pageData?.heroDescription || 'Cập nhật xu hướng, kinh nghiệm và mẹo hay về thiết kế nội thất';
  const gridTitle = pageData?.gridTitle || 'Bài Viết Mới Nhất';
  const ctaTitle = pageData?.ctaTitle || 'Cần Tư Vấn Thiết Kế?';
  const ctaDescription = pageData?.ctaDescription || 'Liên hệ ngay để được tư vấn miễn phí từ đội ngũ chuyên gia';

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-accent font-medium mb-4 tracking-wider uppercase">
                {heroTagline}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-6">
                {heroTitle}
              </h1>
              <p className="text-lg text-white/80!">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-white border-b">
          <div className="container">
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible lg:flex-wrap lg:justify-center scrollbar-hide">
              <Link
                href="/tin-tuc"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  !category 
                    ? 'bg-accent text-white!' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/tin-tuc?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    category === cat 
                      ? 'bg-accent text-white!' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                {gridTitle} ({pagination.total})
              </h2>
            </div>

            {articles.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/tin-tuc/${article.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-video relative bg-gray-100 overflow-hidden">
                        {article.image ? (
                          <Image
                            src={getStrapiImageUrl(article.image)}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <BookOpen className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {article.category && (
                          <span className="text-xs text-accent font-medium uppercase tracking-wider">
                            {article.category}
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mt-1 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-3">
                            {article.author && (
                              <span className="flex items-center gap-1">
                                <User size={14} />
                                {article.author}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <span className="text-accent group-hover:underline flex items-center gap-1">
                            Đọc tiếp
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pageCount}
                  basePath="/tin-tuc"
                  searchParams={category ? { category } : undefined}
                />
      </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có bài viết nào.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white! mb-4">
                {ctaTitle}
              </h2>
              <p className="text-white/80! mb-8">
                {ctaDescription}
              </p>
              <Link 
                href="/lien-he"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
              >
                Liên hệ ngay
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </>
  );
}
