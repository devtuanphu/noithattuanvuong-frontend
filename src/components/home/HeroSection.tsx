import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Award, Users } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

const iconMap: Record<string, React.ElementType> = { Clock, Award, Users };

export default async function HeroSection() {
  const homepageData = await getHomepageData();
  const heroStats = homepageData?.heroStats || [];
  const heroImages = homepageData?.heroImages || [];

  // Get homepage content from Strapi
  const heroTitle = homepageData?.heroTitle || '';
  const heroSubtitle = homepageData?.heroSubtitle || '';
  const heroButtonText = homepageData?.heroButtonText || 'Liên hệ ngay';
  const heroButtonLink = homepageData?.heroButtonLink || '/lien-he';
  const heroSecondaryButtonText = homepageData?.heroSecondaryButtonText || 'Xem dự án';
  const heroSecondaryButtonLink = homepageData?.heroSecondaryButtonLink || '/du-an';

  // Helper to get image URL
  const getImageUrl = (index: number) => {
    if (heroImages[index]?.url) {
      const url = heroImages[index].url;
      return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${url}`;
    }
    return null;
  };

  return (
    <section className="relative isolate bg-linear-to-br from-gray-50 to-white py-12 lg:py-20 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {heroTitle ? (
              <h1 
                className="text-3xl lg:text-5xl font-bold text-primary leading-tight"
                dangerouslySetInnerHTML={{ __html: heroTitle.replace(/\n/g, '<br />') }}
              />
            ) : (
              <h1 className="text-3xl lg:text-5xl font-bold text-primary leading-tight">
                Thiết Kế & Thi Công <span className="text-accent">Nội Thất Cao Cấp</span>
              </h1>
            )}
            
            {heroSubtitle && (
              <p className="text-gray-600 text-lg max-w-lg">
                {heroSubtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={heroButtonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-all hover:shadow-lg"
              >
                {heroButtonText}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={heroSecondaryButtonLink}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white! transition-all"
              >
                {heroSecondaryButtonText}
              </Link>
            </div>

            {/* Stats */}
            {heroStats.length > 0 && (
              <div className="flex flex-wrap gap-8 pt-6">
                {heroStats.map((stat) => {
                  const IconComponent = iconMap[stat.icon || 'Award'] || Award;
                  return (
                    <div key={stat.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <IconComponent size={24} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{stat.number}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  {getImageUrl(0) ? (
                    <Image
                      src={getImageUrl(0)!}
                      alt={heroImages[0]?.alternativeText || 'Nội thất cao cấp'}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <Award size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  {getImageUrl(1) ? (
                    <Image
                      src={getImageUrl(1)!}
                      alt={heroImages[1]?.alternativeText || 'Thiết kế nội thất'}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <Award size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  {getImageUrl(2) ? (
                    <Image
                      src={getImageUrl(2)!}
                      alt={heroImages[2]?.alternativeText || 'Thi công nội thất'}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <Award size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  {getImageUrl(3) ? (
                    <Image
                      src={getImageUrl(3)!}
                      alt={heroImages[3]?.alternativeText || 'Showroom nội thất'}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <Award size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
