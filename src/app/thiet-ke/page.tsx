import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Ruler, Lightbulb, CheckCircle2 } from 'lucide-react';

import Pagination from '@/components/shared/Pagination';
import { getDesignPageData, getDesignServicesWithPagination } from '@/lib/server/pages';
import { getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Thiết Kế Nội Thất | Nội Thất Tuấn Vương',
  description: 'Dịch vụ thiết kế nội thất chuyên nghiệp: căn hộ, nhà phố, biệt thự, văn phòng. Đội ngũ kiến trúc sư giàu kinh nghiệm, thiết kế 3D chân thực.',
  keywords: ['thiết kế nội thất', 'thiết kế căn hộ', 'thiết kế nhà phố'],
  alternates: { canonical: 'https://noithattuanvuong.vn/thiet-ke' },
  openGraph: {
    title: 'Thiết Kế Nội Thất | Nội Thất Tuấn Vương',
    description: 'Dịch vụ thiết kế nội thất chuyên nghiệp cho mọi không gian.',
    url: 'https://noithattuanvuong.vn/thiet-ke',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiết Kế Nội Thất | Nội Thất Tuấn Vương',
    description: 'Dịch vụ thiết kế nội thất chuyên nghiệp.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ThietKePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);

  const [servicesResult, pageData] = await Promise.all([
    getDesignServicesWithPagination(currentPage),
    getDesignPageData(),
  ]);

  if (!pageData) {
    return (
      <>
        <div className="container text-center">
            <p className="text-gray-500">Không thể tải dữ liệu trang. Vui lòng thử lại sau.</p>
          </div>
      </>
    );
  }

  const services = servicesResult.data;
  const { pagination } = servicesResult;
  const processSteps = pageData.process || [];
  const features = pageData.features || [];

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {pageData.heroTagline && (
                <p className="text-accent font-medium mb-4 tracking-wider uppercase">
                  {pageData.heroTagline}
                </p>
              )}
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-6">
                {pageData.heroTitle}
              </h1>
              {pageData.heroDescription && (
                <p className="text-lg text-white/80!">
                  {pageData.heroDescription}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              {pageData.servicesTagline && (
                <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                  {pageData.servicesTagline}
                </p>
              )}
              {pageData.servicesTitle && (
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                  {pageData.servicesTitle}
                </h2>
              )}
            </div>

            {services.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/thiet-ke/${service.slug}`}
                      className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-video relative bg-gray-200">
                        <Image
                          src={getStrapiImageUrl(service.image)}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{service.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          {service.price && (
                            <span className="text-accent font-semibold">{service.price}</span>
                          )}
                          <span className="inline-flex items-center gap-1 text-primary group-hover:text-accent transition-colors">
                            Xem chi tiết
                            <ArrowRight size={16} />
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
                  basePath="/thiet-ke"
                />
      </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có dịch vụ thiết kế nào.</p>
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        {processSteps.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.processTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.processTagline}
                  </p>
                )}
                {pageData.processTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.processTitle}
                  </h2>
                )}
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {processSteps.map((item, index) => (
                  <div key={item.id} className="text-center relative">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-white! text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {pageData.featuresTagline && (
                    <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                      {pageData.featuresTagline}
                    </p>
                  )}
                  {pageData.featuresTitle && (
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                      {pageData.featuresTitle}
                    </h2>
                  )}

                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/lien-he"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Nhận tư vấn miễn phí
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-linear-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center">
                    <Ruler className="w-16 h-16 text-white/30!" />
                  </div>
                  <div className="aspect-square bg-linear-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mt-8">
                    <Lightbulb className="w-16 h-16 text-white/30!" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        {(pageData.ctaTitle || pageData.ctaDescription) && (
          <section className="py-16 lg:py-20 bg-primary">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                {pageData.ctaTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-white! mb-4">
                    {pageData.ctaTitle}
                  </h2>
                )}
                {pageData.ctaDescription && (
                  <p className="text-white/80! mb-8">
                    {pageData.ctaDescription}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/lien-he"
                    className="px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                  >
                    Liên hệ ngay
                  </Link>
                  <Link 
                    href="/bang-gia"
                    className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Xem bảng giá
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
  );
}
