import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, Youtube } from 'lucide-react';

import Pagination from '@/components/shared/Pagination';
import { getVideoPageData, getVideosWithPagination } from '@/lib/server/pages';
import { getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Video Nội Thất | Nội Thất Tuấn Vương',
  description: 'Xem video review dự án nội thất, hướng dẫn chọn nội thất, tour showroom và nhiều nội dung hữu ích khác.',
  keywords: ['video nội thất', 'review nội thất', 'tour showroom', 'hướng dẫn nội thất'],
  alternates: {
    canonical: 'https://noithattuanvuong.vn/video',
  },
  openGraph: {
    title: 'Video Nội Thất | Nội Thất Tuấn Vương',
    description: 'Xem video review dự án nội thất và nhiều nội dung hữu ích khác.',
    url: 'https://noithattuanvuong.vn/video',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
    images: ['/images/og-videos.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Nội Thất | Nội Thất Tuấn Vương',
    description: 'Xem video review dự án nội thất và nhiều nội dung hữu ích khác.',
    images: ['/images/og-videos.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VideoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);

  const [videosResult, pageData] = await Promise.all([
    getVideosWithPagination(currentPage),
    getVideoPageData(),
  ]);

  const videos = videosResult.data;
  const { pagination } = videosResult;

  // Get page content from CMS
  const heroTagline = pageData?.heroTagline || 'Video';
  const heroTitle = pageData?.heroTitle || 'Video Nội Thất';
  const heroDescription = pageData?.heroDescription || 'Xem video review, hướng dẫn và tour tham quan các dự án nội thất';
  const gridTitle = pageData?.gridTitle || 'Video Mới Nhất';
  const youtubeChannelUrl = pageData?.youtubeChannelUrl || 'https://youtube.com/@noithattuanvuong';
  const youtubeCTATitle = pageData?.youtubeCTATitle || 'Đăng Ký Kênh YouTube';
  const youtubeCTADescription = pageData?.youtubeCTADescription || 'Theo dõi kênh YouTube để nhận thông báo video mới nhất';

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
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

        {/* Videos Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                {gridTitle} ({pagination.total})
              </h2>
            </div>

            {videos.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => {
                    const thumbnailUrl = video.youtubeId 
                      ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
                      : null;
                    
                    return (
                      <Link
                        key={video.id}
                        href={`/video/${video.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        <div className="aspect-video relative bg-gray-100 overflow-hidden">
                          {thumbnailUrl || video.thumbnail ? (
                            <Image
                              src={thumbnailUrl || getStrapiImageUrl(video.thumbnail)}
                              alt={video.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200" />
                          )}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 text-white! ml-0.5" />
                            </div>
                          </div>
                          {video.duration && (
                            <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 text-white! text-xs rounded">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          {video.category && (
                            <span className="text-xs text-accent font-medium uppercase tracking-wider">
                              {video.category}
                            </span>
                          )}
                          <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mt-1 mb-2 line-clamp-2">
                            {video.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            {video.duration && (
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {video.duration}
                              </span>
                            )}
                            <span>
                              {new Date(video.publishedAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pageCount}
                  basePath="/video"
                />
      </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có video nào.</p>
              </div>
            )}
          </div>
        </section>

        {/* YouTube CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Youtube className="w-16 h-16 text-white! mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white! mb-4">
                {youtubeCTATitle}
              </h2>
              <p className="text-white/80! mb-8">
                {youtubeCTADescription}
              </p>
              <a 
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white! font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Youtube size={20} />
                Đăng ký ngay
              </a>
            </div>
          </div>
        </section>
      </>
  );
}
