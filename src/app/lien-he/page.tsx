import { Metadata } from 'next';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Facebook,
  Youtube,
  MessageCircle
} from 'lucide-react';

import ContactForm from '@/components/contact/ContactForm';
import { getContactPageData, getGlobalConfig } from '@/lib/server/pages';

export const metadata: Metadata = {
  title: 'Liên Hệ | Nội Thất Tuấn Vương',
  description: 'Liên hệ Nội Thất Tuấn Vương để được tư vấn miễn phí.',
  keywords: ['liên hệ nội thất', 'tư vấn nội thất', 'hotline nội thất'],
  alternates: { canonical: 'https://noithattuanvuong.vn/lien-he' },
  openGraph: {
    title: 'Liên Hệ | Nội Thất Tuấn Vương',
    description: 'Liên hệ để được tư vấn miễn phí.',
    url: 'https://noithattuanvuong.vn/lien-he',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liên Hệ | Nội Thất Tuấn Vương',
    description: 'Liên hệ để được tư vấn miễn phí.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default async function LienHePage() {
  const [pageData, globalConfig] = await Promise.all([
    getContactPageData(),
    getGlobalConfig(),
  ]);

  if (!pageData && !globalConfig) {
    return (
      <>
        <div className="container text-center">
            <p className="text-gray-500">Không thể tải dữ liệu trang. Vui lòng thử lại sau.</p>
          </div>
      </>
    );
  }

  const phone = globalConfig?.phone;
  const email = globalConfig?.email;
  const address = globalConfig?.address;
  const workingHours = globalConfig?.workingHours;
  const socialLinks = globalConfig?.socialLinks || [];

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-accent font-medium mb-4 tracking-wider uppercase">
                Liên hệ
              </p>
              {pageData?.heroTitle && (
                <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-6">
                  {pageData.heroTitle}
                </h1>
              )}
              {pageData?.heroDescription && (
                <p className="text-lg text-white/80!">
                  {pageData.heroDescription}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phone && (
                <div className="p-6 rounded-xl border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Hotline</p>
                  <a 
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-lg font-semibold text-primary hover:text-accent transition-colors block"
                  >
                    {phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Tư vấn miễn phí 24/7</p>
                </div>
              )}

              {email && (
                <div className="p-6 rounded-xl border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a 
                    href={`mailto:${email}`}
                    className="text-lg font-semibold text-primary hover:text-accent transition-colors block"
                  >
                    {email}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Phản hồi trong 2h</p>
                </div>
              )}

              {address && (
                <div className="p-6 rounded-xl border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Showroom</p>
                  <p className="text-lg font-semibold text-primary">{address}</p>
                  <p className="text-sm text-gray-500 mt-1">Mở cửa 8:00 - 20:00</p>
                </div>
              )}

              {workingHours && (
                <div className="p-6 rounded-xl border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Giờ làm việc</p>
                  <p className="text-lg font-semibold text-primary">{workingHours}</p>
                  <p className="text-sm text-gray-500 mt-1">Mở cửa tất cả các ngày</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Form + Map */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <div className="mb-8">
                  {pageData?.formTagline && (
                    <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                      {pageData.formTagline}
                    </p>
                  )}
                  {pageData?.formTitle && (
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                      {pageData.formTitle}
                    </h2>
                  )}
                  {pageData?.formDescription && (
                    <p className="text-gray-600 mt-2">
                      {pageData.formDescription}
                    </p>
                  )}
                </div>

                <ContactForm />
              </div>

              {/* Map */}
              <div>
                <div className="mb-8">
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    Vị trí showroom
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    Ghé Thăm Showroom
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Trải nghiệm trực tiếp các sản phẩm nội thất tại showroom của chúng tôi.
                  </p>
                </div>

                {/* Map */}
                {pageData?.mapEmbed && (
                  <div className="aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden">
                    <iframe
                      src={pageData.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nội Thất Tuấn Vương Showroom"
                    />
                  </div>
                )}

                {/* Address Card */}
                {address && (
                  <div className="mt-6 p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-white!" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Showroom Chính</h3>
                        <p className="text-gray-600">{address}</p>
                        <a 
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-accent hover:underline mt-2 text-sm"
                        >
                          Xem chỉ đường
                          <Send size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">
                  Kết Nối Với Chúng Tôi
                </h2>
              </div>

              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => {
                  const iconMap: Record<string, React.ElementType> = { Facebook, Youtube, MessageCircle };
                  const IconComponent = iconMap[social.icon] || Facebook;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 ${social.color || 'bg-primary'} rounded-full flex items-center justify-center text-white! hover:opacity-90 transition-opacity`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </>
  );
}
