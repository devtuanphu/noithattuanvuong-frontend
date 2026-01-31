import { Trophy, Factory, Users, ThumbsUp, Clock, Wallet, Shield } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

const iconMap: Record<string, React.ElementType> = { Trophy, Factory, Users, ThumbsUp, Clock, Wallet, Shield };

export default async function Achievements() {
  const homepageData = await getHomepageData();
  
  // Get achievements section content from CMS
  const tagline = homepageData?.achievementsTagline || "Thành tựu";
  const title = homepageData?.achievementsTitle || "THÀNH TỰU CỦA **CHÚNG TÔI**";
  const description = homepageData?.achievementsDescription || 
    "Với Tuấn Vương, thành tựu chính là sự công nhận và lời khen ngợi từ quý khách hàng đã sử dụng sản phẩm và dịch vụ của chúng tôi.";
  const achievements = homepageData?.achievements || [];
  const commitments = homepageData?.commitments || [];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-accent font-medium mb-2">
            {tagline}
          </p>
          <h2 
            className="text-2xl lg:text-3xl font-bold text-primary"
            dangerouslySetInnerHTML={{ 
              __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>') 
            }}
          />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Stats Grid */}
        {achievements.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item) => {
              const IconComponent = iconMap[item.icon || 'Trophy'] || Trophy;
              return (
                <div
                  key={item.id}
                  className="bg-linear-to-br from-primary to-primary-dark rounded-2xl p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent size={28} className="text-accent" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white!">
                    {item.number}
                  </div>
                  <h3 className="text-white! font-semibold mt-2">{item.label}</h3>
                </div>
              );
            })}
          </div>
        )}

        {/* Commitments */}
        {commitments.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            {commitments.map((item) => {
              const IconComponent = iconMap[item.icon || 'Clock'] || Clock;
              return (
                <div key={item.id} className="p-6">
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent size={32} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
