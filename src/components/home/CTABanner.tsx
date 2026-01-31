import { FileText, Download, Sparkles } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";
import CTABannerForm from "./CTABannerForm";

export default async function CTABanner() {
  const homepageData = await getHomepageData();

  // Get CTA content from CMS
  const tagline = homepageData?.ctaTagline || "Miễn phí tư vấn & báo giá";
  const title = homepageData?.ctaTitle || "XEM BẢNG GIÁ THIẾT KẾ";
  const description = homepageData?.ctaDescription || 
    "Đăng ký ngay để nhận báo giá chi tiết và tư vấn miễn phí từ chuyên gia";
  const buttonText = homepageData?.ctaButtonText || "TẢI BẢNG GIÁ NGAY";
  const pricingFileUrl = homepageData?.pricingFileUrl;
  
  // Get CTA features from CMS or use defaults
  const ctaFeatures = homepageData?.ctaFeatures || [
    { icon: "FileText", text: "Báo giá trong 24h" },
    { icon: "Download", text: "Tải PDF miễn phí" },
  ];

  // Get project types from CMS or use defaults
  const projectTypes = homepageData?.projectTypes || [
    { value: "apartment", label: "Căn hộ chung cư" },
    { value: "house", label: "Nhà phố" },
    { value: "villa", label: "Biệt thự" },
    { value: "office", label: "Văn phòng" },
  ];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-dark to-primary" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Sparkles size={16} />
                {tagline}
              </div>
              <h2 
                className="text-3xl lg:text-4xl font-bold text-white! mb-3"
                dangerouslySetInnerHTML={{ 
                  __html: title
                    .replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>')
                    .replace(/\^\^(.*?)\^\^/g, '<span class="text-gold">$1</span>')
                }}
              />
              <p className="text-white/70! text-lg max-w-md mx-auto lg:mx-0">
                {description}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                {ctaFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80! text-sm">
                    {feature.icon === "FileText" ? (
                      <FileText size={16} className="text-accent" />
                    ) : (
                      <Download size={16} className="text-accent" />
                    )}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <CTABannerForm 
                  projectTypes={projectTypes}
                  buttonText={buttonText}
                  pricingFileUrl={pricingFileUrl}
                />
                <p className="text-white/50! text-xs text-center mt-4">
                  * Chúng tôi cam kết bảo mật thông tin của bạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
