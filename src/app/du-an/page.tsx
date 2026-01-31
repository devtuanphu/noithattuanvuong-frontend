import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, MapPin, Calendar } from 'lucide-react';

import Pagination from '@/components/shared/Pagination';
import { getHomepageData, getProjectsWithPagination } from '@/lib/server/pages';
import { getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Dự Án Nội Thất | Nội Thất Tuấn Vương',
  description: 'Xem các dự án thiết kế và thi công nội thất đã hoàn thành: căn hộ, nhà phố, biệt thự. Hơn 5000+ dự án thành công với đánh giá 5 sao.',
  keywords: ['dự án nội thất', 'công trình nội thất', 'thi công hoàn thành', 'mẫu nội thất thực tế'],
  alternates: {
    canonical: 'https://noithattuanvuong.vn/du-an',
  },
  openGraph: {
    title: 'Dự Án Nội Thất | Nội Thất Tuấn Vương',
    description: 'Xem các dự án thiết kế và thi công nội thất đã hoàn thành.',
    url: 'https://noithattuanvuong.vn/du-an',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
    images: ['/images/og-projects.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dự Án Nội Thất | Nội Thất Tuấn Vương',
    description: 'Xem các dự án thiết kế và thi công nội thất đã hoàn thành.',
    images: ['/images/og-projects.jpg'],
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

export default async function DuAnPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const category = params.category;

  const [projectsResult, homepageData] = await Promise.all([
    getProjectsWithPagination(currentPage, category),
    getHomepageData(),
  ]);

  const projects = projectsResult.data;
  const { pagination } = projectsResult;
  const stats = homepageData?.heroStats || [];

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-accent font-medium mb-4 tracking-wider uppercase">
                Dự án
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-6">
                Dự Án Đã Hoàn Thành
              </h1>
              <p className="text-lg text-white/80!">
                Khám phá các dự án thiết kế và thi công nội thất thực tế đã được chúng tôi thực hiện
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        {stats.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container">
              <div className="grid md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <span className="text-4xl font-bold text-primary">{stat.number}</span>
                    <p className="text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                Các Dự Án Nổi Bật
              </h2>
            </div>

            {projects.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/du-an/${project.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-video relative bg-gray-100 overflow-hidden">
                        {project.image ? (
                          <Image
                            src={getStrapiImageUrl(project.image)}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Building2 className="w-16 h-16 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <span className="text-xs text-accent font-medium uppercase tracking-wider">
                          {project.categoryName}
                        </span>
                        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mt-1 mb-2">
                          {project.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          {project.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {project.location}
                            </span>
                          )}
                          {project.completedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {project.completedAt}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {project.shortDescription}
                        </p>

                        <div className="flex items-center justify-between">
                          {project.area && (
                            <span className="text-sm text-gray-500">{project.area}</span>
                          )}
                          <span className="inline-flex items-center gap-1 text-primary group-hover:text-accent transition-colors text-sm">
                            Xem chi tiết
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
                  basePath="/du-an"
                  searchParams={category ? { category } : undefined}
                />
      </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có dự án nào.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white! mb-4">
                Muốn Có Dự Án Như Thế Này?
              </h2>
              <p className="text-white/80! mb-8">
                Liên hệ ngay để được tư vấn và nhận báo giá miễn phí cho dự án của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/lien-he"
                  className="px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                >
                  Liên hệ ngay
                </Link>
                <Link 
                  href="/thiet-ke"
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Xem dịch vụ thiết kế
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}
