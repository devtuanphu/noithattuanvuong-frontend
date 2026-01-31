import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Car,
  Sofa,
  Bed,
  ChefHat,
  ArrowRight,
  Star,
  Users
} from 'lucide-react';

import { getShowroomPageData, getGlobalConfig } from '@/lib/server/pages';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export const metadata: Metadata = {
  title: 'Showroom Nội Thất | Nội Thất Tuấn Vương',
  description: 'Tham quan Showroom Nội Thất Tuấn Vương tại Quận 7, TP.HCM.',
  keywords: ['showroom nội thất', 'showroom nội thất quận 7', 'trưng bày nội thất'],
  alternates: { canonical: 'https://noithattuanvuong.vn/showroom' },
  openGraph: {
    title: 'Showroom Nội Thất | Nội Thất Tuấn Vương',
    description: 'Tham quan Showroom Nội Thất Tuấn Vương với hơn 1000+ mẫu nội thất cao cấp.',
    url: 'https://noithattuanvuong.vn/showroom',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Showroom Nội Thất | Nội Thất Tuấn Vương',
    description: 'Tham quan Showroom với hơn 1000+ mẫu nội thất cao cấp.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const iconMap: Record<string, React.ElementType> = { Sofa, Bed, ChefHat };

export default async function ShowroomPage() {
  const [pageData, globalConfig] = await Promise.all([
    getShowroomPageData(),
    getGlobalConfig(),
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

  const phone = pageData.phone || globalConfig?.phone;
  const address = pageData.address || globalConfig?.address;
  const openingHours = pageData.openingHours;
  const features = pageData.features || [];
  const highlights = pageData.highlights || [];
  const testimonials = pageData.testimonials || [];

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
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
                <p className="text-lg text-white/80! mb-8">
                  {pageData.heroDescription}
                </p>
              )}
              {phone && (
                <a 
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                >
                  <Phone size={18} />
                  Đặt lịch tham quan
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Highlights */}
        {highlights.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container">
              <div className="grid md:grid-cols-3 gap-8">
                {highlights.map((item) => (
                  <div key={item.id} className="text-center">
                    <span className="text-4xl font-bold text-primary">{item.number}</span>
                    <p className="text-gray-600 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Showroom Features */}
        {features.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.featuresTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.featuresTagline}
                  </p>
                )}
                {pageData.featuresTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.featuresTitle}
                  </h2>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature) => {
                  const IconComponent = iconMap[feature.icon || 'Sofa'] || Sofa;
                  return (
                    <div 
                      key={feature.id}
                      className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Placeholder */}
        {(pageData.galleryTagline || pageData.galleryTitle) && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.galleryTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.galleryTagline}
                  </p>
                )}
                {pageData.galleryTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.galleryTitle}
                  </h2>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(pageData.gallery && pageData.gallery.length > 0) ? (
                  pageData.gallery.map((img, index) => {
                    const imageUrl = img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`;
                    return (
                      <div 
                        key={index}
                        className={`aspect-4/3 bg-gray-100 rounded-xl overflow-hidden relative ${
                          index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : ''
                        }`}
                      >
                        <Image
                          src={imageUrl}
                          alt={img.alternativeText || `Showroom ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    );
                  })
                ) : (
                  [1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i}
                      className={`aspect-4/3 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center ${
                        i === 1 ? 'md:col-span-2 md:row-span-2 aspect-square' : ''
                      }`}
                    >
                      <div className="text-center">
                        <Sofa className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <span className="text-sm text-gray-400">Showroom {i}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Location & Info */}
        {(address || openingHours || phone) && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {pageData.infoTagline && (
                    <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                      {pageData.infoTagline}
                    </p>
                  )}
                  {pageData.infoTitle && (
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                      {pageData.infoTitle}
                    </h2>
                  )}

                  <div className="space-y-6">
                    {address && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-white!" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">Địa chỉ</h3>
                          <p className="text-gray-600">{address}</p>
                        </div>
                      </div>
                    )}

                    {openingHours && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6 text-white!" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">Giờ mở cửa</h3>
                          <p className="text-gray-600">{openingHours}</p>
                          {pageData.openingNote && (
                            <p className="text-sm text-gray-500">{pageData.openingNote}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {phone && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                          <Phone className="w-6 h-6 text-white!" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">Hotline</h3>
                          <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-accent hover:underline">{phone}</a>
                        </div>
                      </div>
                    )}

                    {pageData.parkingInfo && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                          <Car className="w-6 h-6 text-white!" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">Bãi đậu xe</h3>
                          <p className="text-gray-600">{pageData.parkingInfo}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link 
                    href="/lien-he"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                  >
                    Đặt lịch hẹn
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Map */}
                {pageData.mapEmbed && (
                  <div className="aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden">
                    <iframe
                      src={pageData.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Showroom Nội Thất Tuấn Vương"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.testimonialsTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.testimonialsTagline}
                  </p>
                )}
                {pageData.testimonialsTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.testimonialsTitle}
                  </h2>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= (testimonial.rating || 5) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white!" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        {testimonial.location && (
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                  {phone && (
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                    >
                      <Phone size={18} />
                      {phone}
                    </a>
                  )}
                  <Link 
                    href="/lien-he"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Gửi yêu cầu online
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
  );
}
