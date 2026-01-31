import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Trophy, Factory } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export default async function CompanyIntro() {
  const homepageData = await getHomepageData();

  // Get first 2 stats from heroStats for display
  const displayStats = (homepageData?.heroStats || []).slice(0, 2);

  // Get company intro content from CMS
  const tagline = homepageData?.companyIntroTagline || "Về chúng tôi";
  const title = homepageData?.companyIntroTitle || "VỀ NỘI THẤT **TUẤN Vương**";
  const description = homepageData?.companyIntroDescription || `Với hơn <strong>15 năm kinh nghiệm</strong> trong lĩnh vực thiết kế và thi công nội thất, <strong>Nội Thất Tuấn Vương</strong> tự hào là đơn vị mang đến những giải pháp nội thất toàn diện, sáng tạo và phù hợp với phong cách sống hiện đại của mọi gia đình.

Chúng tôi đáp ứng đa dạng phong cách thiết kế (<strong>Hiện Đại, Tân Cổ Điển, Luxury...</strong>) cho nhiều loại hình không gian: <strong>nhà phố, căn hộ chung cư, biệt thự...</strong> cùng các công trình thương mại như <strong>showroom, văn phòng, khách sạn</strong>.

Với xưởng sản xuất riêng quy mô lớn cùng đội ngũ kiến trúc sư, kỹ sư giàu kinh nghiệm, chúng tôi cam kết mang đến sản phẩm chất lượng cao, đúng tiến độ và giá thành hợp lý nhất.`;
  const buttonText = homepageData?.companyIntroButtonText || "Xem thêm về chúng tôi";
  const buttonLink = homepageData?.companyIntroButtonLink || "/gioi-thieu";
  
  // Get image URL
  const imageUrl = homepageData?.companyIntroImage?.url
    ? (homepageData.companyIntroImage.url.startsWith('http') 
        ? homepageData.companyIntroImage.url 
        : `${STRAPI_URL}${homepageData.companyIntroImage.url}`)
    : null;

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden isolate">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-wider text-accent font-medium">
              {tagline}
            </p>
            <h2 
              className="text-2xl lg:text-3xl font-bold text-primary"
              dangerouslySetInnerHTML={{ 
                __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>') 
              }}
            />
            <div 
              className="text-gray-600 leading-relaxed space-y-4 [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Link
              href={buttonLink}
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              {buttonText}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right - Image with Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={homepageData?.companyIntroImage?.alternativeText || "Nội Thất Tuấn Vương"}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                  <Users size={64} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Floating Stats */}
            {displayStats[0] && (
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Factory size={24} className="text-white!" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{displayStats[0].label}</p>
                  <p className="text-xl font-bold text-primary">{displayStats[0].number}</p>
                </div>
              </div>
            )}

            {displayStats[1] && (
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Trophy size={24} className="text-white!" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{displayStats[1].label}</p>
                  <p className="text-xl font-bold text-primary">{displayStats[1].number}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
