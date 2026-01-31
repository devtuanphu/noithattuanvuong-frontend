import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
  Factory,
  Target,
  Heart,
  Shield,
  Sparkles
} from 'lucide-react';

import { getAboutPageData } from '@/lib/server/pages';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Trophy, Users, Factory, Target, Heart, Shield, Sparkles
};

export const metadata: Metadata = {
  title: 'Giới Thiệu | Nội Thất Tuấn Vương',
  description: 'Tìm hiểu về Nội Thất Tuấn Vương - Công ty thiết kế và thi công nội thất uy tín với hơn 15 năm kinh nghiệm, 5000+ dự án hoàn thành.',
  keywords: ['giới thiệu nội thất tuấn Vương', 'về chúng tôi', 'công ty nội thất'],
  alternates: { canonical: 'https://noithattuanvuong.vn/gioi-thieu' },
  openGraph: {
    title: 'Giới Thiệu | Nội Thất Tuấn Vương',
    description: 'Công ty thiết kế và thi công nội thất uy tín với hơn 15 năm kinh nghiệm.',
    url: 'https://noithattuanvuong.vn/gioi-thieu',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới Thiệu | Nội Thất Tuấn Vương',
    description: 'Công ty thiết kế và thi công nội thất uy tín với hơn 15 năm kinh nghiệm.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default async function GioiThieuPage() {
  const pageData = await getAboutPageData();

  if (!pageData) {
    return (
      <>
        <div className="container text-center">
            <p className="text-gray-500">Không thể tải dữ liệu trang. Vui lòng thử lại sau.</p>
          </div>
      </>
    );
  }

  const stats = pageData.stats || [];
  const values = pageData.values || [];
  const milestones = pageData.milestones || [];
  const whyChooseItems = pageData.whyChooseItems || [];

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
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
                <p className="text-lg text-white/80! leading-relaxed">
                  {pageData.heroDescription}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container">
              <div className="grid md:grid-cols-3 gap-8">
                {stats.map((stat) => {
                  const IconComponent = iconMap[stat.icon || 'Trophy'] || Trophy;
                  return (
                    <div 
                      key={stat.id}
                      className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary hover:text-white! group transition-all duration-300"
                    >
                      <IconComponent className="w-12 h-12 text-accent mb-4 group-hover:text-white!" />
                      <span className="text-4xl font-bold text-primary group-hover:text-white! mb-2">
                        {stat.number}
                      </span>
                      <span className="text-gray-600 group-hover:text-white/80!">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Story Section */}
        {(pageData.storyTitle || pageData.storyContent) && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {pageData.storyTagline && (
                    <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                      {pageData.storyTagline}
                    </p>
                  )}
                  {pageData.storyTitle && (
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                      {pageData.storyTitle}
                    </h2>
                  )}
                  {pageData.storyContent && (
                    <div className="space-y-4 text-gray-600">
                      <p>{pageData.storyContent}</p>
                    </div>
                  )}
                  
                  <Link 
                    href="/du-an"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Xem dự án của chúng tôi
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="relative">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                    <div className="w-full h-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center">
                      <Factory className="w-24 h-24 text-white/30!" />
                    </div>
                  </div>
                  {(pageData.storyBadgeNumber || pageData.storyBadgeLabel) && (
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                          <Trophy className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-primary">{pageData.storyBadgeNumber}</p>
                          <p className="text-sm text-gray-600">{pageData.storyBadgeLabel}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Values Section */}
        {values.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.valuesTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.valuesTagline}
                  </p>
                )}
                {pageData.valuesTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.valuesTitle}
                  </h2>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value) => {
                  const IconComponent = iconMap[value.icon || 'Target'] || Target;
                  return (
                    <div 
                      key={value.id}
                      className="p-6 rounded-xl border border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        {milestones.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                {pageData.milestonesTagline && (
                  <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                    {pageData.milestonesTagline}
                  </p>
                )}
                {pageData.milestonesTitle && (
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {pageData.milestonesTitle}
                  </h2>
                )}
              </div>

              <div className="max-w-3xl mx-auto">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white! font-bold shrink-0">
                        {milestone.year.slice(2)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="text-accent font-semibold">{milestone.year}</span>
                      <p className="text-gray-700 mt-1">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        {whyChooseItems.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-2xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/30!" />
                    </div>
                    <div className="aspect-square rounded-2xl bg-linear-to-br from-accent to-accent-light flex items-center justify-center mt-8">
                      <Trophy className="w-16 h-16 text-white/30!" />
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  {pageData.whyChooseTagline && (
                    <p className="text-accent font-medium mb-2 uppercase tracking-wider">
                      {pageData.whyChooseTagline}
                    </p>
                  )}
                  {pageData.whyChooseTitle && (
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                      {pageData.whyChooseTitle}
                    </h2>
                  )}

                  <ul className="space-y-4">
                    {whyChooseItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/lien-he"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                  >
                    Liên hệ tư vấn miễn phí
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
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
                    href={pageData.ctaButton1Link || '/lien-he'}
                    className="px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                  >
                    {pageData.ctaButton1Text || 'Liên hệ ngay'}
                  </Link>
                  <Link 
                    href={pageData.ctaButton2Link || '/bang-gia'}
                    className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {pageData.ctaButton2Text || 'Xem bảng giá'}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
  );
}
