import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle2, Phone } from 'lucide-react';

import RichTextRenderer from '@/components/shared/RichTextRenderer';
import { getDesignServiceBySlug, getDesignServicesWithPagination, getGlobalConfig } from '@/lib/server/pages';
import { getStrapiImageUrl, getStrapiImageUrls } from '@/lib/strapi';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getDesignServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Dịch vụ không tồn tại | Nội Thất Tuấn Vương',
    };
  }

  const imageUrl = service.image ? getStrapiImageUrl(service.image) : null;

  return {
    title: `${service.title} | Thiết Kế Nội Thất | Nội Thất Tuấn Vương`,
    description: service.shortDescription || service.description,
    keywords: ['thiết kế nội thất', service.title.toLowerCase(), 'nội thất tuấn Vương'],
    alternates: {
      canonical: `https://noithattuanvuong.vn/thiet-ke/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Nội Thất Tuấn Vương`,
      description: service.shortDescription || service.description,
      url: `https://noithattuanvuong.vn/thiet-ke/${service.slug}`,
      siteName: 'Nội Thất Tuấn Vương',
      type: 'article',
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Nội Thất Tuấn Vương`,
      description: service.shortDescription || service.description,
      images: imageUrl ? [imageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function ThietKeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [service, servicesResult, globalConfig] = await Promise.all([
    getDesignServiceBySlug(slug),
    getDesignServicesWithPagination(1),
    getGlobalConfig(),
  ]);

  if (!service) {
    notFound();
  }

  const phone = globalConfig?.phone || '0901 234 567';

  const relatedServices = servicesResult.data
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const features = service.features || [];
  const imageUrl = service.image ? getStrapiImageUrl(service.image) : null;
  const galleryUrls = getStrapiImageUrls(service.gallery);

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-white/60!">
                <li>
                  <Link href="/" className="hover:text-white!">Trang chủ</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/thiet-ke" className="hover:text-white!">Thiết kế nội thất</Link>
                </li>
                <li>/</li>
                <li className="text-white!">{service.title}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="text-accent font-medium mb-4 tracking-wider uppercase">
                Dịch vụ thiết kế
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-6">
                {service.title}
              </h1>
              <p className="text-lg text-white/80!">
                {service.shortDescription || service.description}
              </p>
              {service.price && (
                <p className="mt-4 text-2xl font-bold text-accent">
                  {service.price}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Content */}
              <div className="lg:col-span-2">
                {/* Featured Image */}
                {imageUrl && (
                  <div className="aspect-video relative rounded-2xl mb-8 overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Rich Text Content */}
                {service.content && (
                  <RichTextRenderer content={service.content} />
                )}

                {/* Features */}
                {features.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-xl font-bold text-primary mb-6">
                      Dịch Vụ Bao Gồm
                    </h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gallery */}
                {galleryUrls.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-xl font-bold text-primary mb-6">
                      Hình Ảnh Mẫu
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {galleryUrls.map((url, index) => (
                        <div 
                          key={index}
                          className="aspect-4/3 relative rounded-lg overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={url}
                            alt={`${service.title} - Hình ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Contact Card */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-primary mb-4">Nhận Tư Vấn Miễn Phí</h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Liên hệ ngay để được tư vấn chi tiết về dịch vụ và nhận báo giá.
                    </p>
                    <div className="space-y-3">
                      <a 
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <Phone size={18} />
                        {phone}
                      </a>
                      <Link
                        href="/lien-he"
                        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white! transition-colors"
                      >
                        Gửi yêu cầu online
                      </Link>
                    </div>
                  </div>

                  {/* Price Card */}
                  {service.price && (
                    <div className="bg-accent/10 p-6 rounded-2xl">
                      <p className="text-sm text-gray-600 mb-1">Giá tham khảo</p>
                      <p className="text-2xl font-bold text-accent">{service.price}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        * Giá chính xác tùy thuộc vào quy mô và yêu cầu cụ thể
                      </p>
                    </div>
                  )}

                  {/* Related Services */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-primary mb-4">Dịch Vụ Liên Quan</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link 
                          href="/thi-cong"
                          className="flex items-center justify-between text-gray-700 hover:text-accent transition-colors"
                        >
                          <span>Thi công nội thất</span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/san-pham"
                          className="flex items-center justify-between text-gray-700 hover:text-accent transition-colors"
                        >
                          <span>Sản phẩm nội thất</span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/du-an"
                          className="flex items-center justify-between text-gray-700 hover:text-accent transition-colors"
                        >
                          <span>Xem dự án đã thực hiện</span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                Dịch Vụ Thiết Kế Khác
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((related) => {
                  const relatedImage = related.image ? getStrapiImageUrl(related.image) : null;
                  return (
                    <Link
                      key={related.id}
                      href={`/thiet-ke/${related.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-video relative bg-gray-100">
                        {relatedImage ? (
                          <Image
                            src={relatedImage}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-gray-400 text-sm">Chưa có ảnh</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-primary group-hover:text-accent transition-colors mb-2">
                          {related.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{related.shortDescription}</p>
                        <span className="inline-flex items-center gap-1 text-accent text-sm mt-4 group-hover:underline">
                          Xem chi tiết <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-8 bg-white">
          <div className="container">
            <Link 
              href="/thiet-ke"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại danh sách dịch vụ thiết kế
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white! mb-4">
                Sẵn Sàng Bắt Đầu Dự Án?
              </h2>
              <p className="text-white/80! mb-8">
                Liên hệ ngay để được tư vấn miễn phí và nhận báo giá chi tiết
              </p>
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
      </>
  );
}
