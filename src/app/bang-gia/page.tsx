import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Check, 
  Phone, 
  ArrowRight,
  Sparkles,
  Crown,
  Star,
  Zap
} from 'lucide-react';

import { getPricingPageData, getGlobalConfig } from '@/lib/server/pages';

export const metadata: Metadata = {
  title: 'Bảng Giá Thiết Kế & Thi Công Nội Thất | Nội Thất Tuấn Vương',
  description: 'Bảng giá thiết kế và thi công nội thất chi tiết, minh bạch.',
  keywords: ['bảng giá nội thất', 'giá thiết kế nội thất', 'giá thi công nội thất'],
  alternates: { canonical: 'https://noithattuanvuong.vn/bang-gia' },
  openGraph: {
    title: 'Bảng Giá Thiết Kế & Thi Công Nội Thất | Nội Thất Tuấn Vương',
    description: 'Bảng giá thiết kế và thi công nội thất chi tiết, minh bạch.',
    url: 'https://noithattuanvuong.vn/bang-gia',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bảng Giá Thiết Kế & Thi Công Nội Thất',
    description: 'Bảng giá thiết kế và thi công nội thất chi tiết, minh bạch.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const iconMap: Record<string, React.ElementType> = { Zap, Star, Crown, Sparkles };

export default async function BangGiaPage() {
  const [pageData, globalConfig] = await Promise.all([
    getPricingPageData(),
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

  const phone = globalConfig?.phone;
  const designPackages = pageData.designPackages || [];
  const constructionPackages = pageData.constructionPackages || [];
  const faqs = pageData.faqs || [];
  const includedItems = pageData.includeItems || [];

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

        {/* Design Packages */}
        {designPackages.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.designPackagesTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.designPackagesTagline}
                  </p>
                )}
                {pageData.designPackagesTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.designPackagesTitle}
                  </h2>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {designPackages.map((pkg) => {
                  const IconComponent = iconMap[pkg.icon || 'Zap'] || Zap;
                  return (
                    <div 
                      key={pkg.id}
                      className={`relative rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl ${
                        pkg.popular 
                          ? 'border-primary shadow-lg scale-105' 
                          : 'border-gray-200 hover:border-accent'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white! text-sm font-medium rounded-full">
                          Phổ biến nhất
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                          pkg.color === 'accent' ? 'bg-accent/10' :
                          pkg.color === 'gold' ? 'bg-gold/10' : 'bg-primary/10'
                        }`}>
                          <IconComponent className={`w-7 h-7 ${
                            pkg.color === 'accent' ? 'text-accent' :
                            pkg.color === 'gold' ? 'text-gold' : 'text-primary'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold text-primary">{pkg.name}</h3>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                          <span className="text-gray-600">{pkg.unit}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {(pkg.features || []).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                        {(pkg.notIncluded || []).map((item, index) => (
                          <li key={index} className="flex items-start gap-2 opacity-50">
                            <span className="w-5 h-5 text-center shrink-0">—</span>
                            <span className="text-sm text-gray-500 line-through">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/lien-he"
                        className={`block w-full py-3 text-center font-semibold rounded-lg transition-colors ${
                          pkg.popular
                            ? 'bg-primary text-white! hover:bg-primary-dark'
                            : 'bg-gray-100 text-primary hover:bg-primary hover:text-white!'
                        }`}
                      >
                        Nhận báo giá
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Construction Packages */}
        {constructionPackages.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.constructionPackagesTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.constructionPackagesTagline}
                  </p>
                )}
                {pageData.constructionPackagesTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.constructionPackagesTitle}
                  </h2>
                )}
              </div>

              <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
                  <thead>
                    <tr className="bg-primary text-white!">
                      <th className="py-4 px-6 text-left font-semibold">Loại công trình</th>
                      <th className="py-4 px-6 text-center font-semibold">Cơ bản</th>
                      <th className="py-4 px-6 text-center font-semibold">Cao cấp</th>
                      <th className="py-4 px-6 text-center font-semibold">Luxury</th>
                    </tr>
                  </thead>
                  <tbody>
                    {constructionPackages.map((pkg, index) => (
                      <tr key={pkg.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-4 px-6 font-medium text-primary">{pkg.type}</td>
                        <td className="py-4 px-6 text-center text-gray-700">{pkg.basic}</td>
                        <td className="py-4 px-6 text-center text-gray-700">{pkg.premium}</td>
                        <td className="py-4 px-6 text-center text-gray-700">{pkg.luxury}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                * Giá trên tính theo m² sàn, chưa bao gồm VAT. Liên hệ để được báo giá chi tiết.
              </p>
            </div>
          </section>
        )}

        {/* What's Included */}
        {includedItems.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              {pageData.includesTitle && (
                <div className="text-center mb-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.includesTitle}
                  </h2>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              {pageData.faqsTitle && (
                <div className="text-center mb-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.faqsTitle}
                  </h2>
                </div>
              )}

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white p-6 rounded-xl">
                    <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {(pageData.ctaTitle || pageData.ctaDescription) && (
          <section className="py-16 lg:py-20 bg-primary">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
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
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                  >
                    Nhận báo giá ngay
                    <ArrowRight size={18} />
                  </Link>
                  {phone && (
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Phone size={18} />
                      {phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </>
  );
}
