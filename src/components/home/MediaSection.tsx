import Link from "next/link";
import { ArrowRight, Play, Star, Quote, Newspaper } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

// Helper function to extract YouTube video ID from URL
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Match various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default async function MediaSection() {
  const homepageData = await getHomepageData();
  
  // Get media section content from CMS
  const sectionTitle = homepageData?.mediaSectionTitle || "TRUYỀN THÔNG - BÁO CHÍ NÓI VỀ";
  const sectionSubtitle = homepageData?.mediaSectionSubtitle || "NỘI THẤT TUẤN Vương";
  const buttonText = homepageData?.mediaSectionButtonText || "Xem thêm video";
  const buttonLink = homepageData?.mediaSectionButtonLink || "/video";
  const mediaLogosSubtitle = homepageData?.mediaLogosSubtitle || "Được đưa tin bởi các đơn vị truyền thông uy tín";
  const testimonials = homepageData?.testimonials || [];
  const mediaLogos = homepageData?.mediaLogos || [];
  const videoUrl = homepageData?.mediaVideoUrl;
  const youtubeId = videoUrl ? extractYouTubeId(videoUrl) : null;

  return (
    <section className="py-16 lg:py-24 bg-background-alt">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 
            className="text-2xl lg:text-3xl font-bold text-primary"
            dangerouslySetInnerHTML={{ 
              __html: sectionTitle.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>') 
            }}
          />
          <p className="text-accent text-xl font-semibold mt-2">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            {youtubeId ? (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Video truyền thông"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white!">
                  <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 cursor-pointer hover:bg-accent transition-colors">
                    <Play size={36} className="ml-1 text-white!" />
                  </div>
                  <p className="text-lg font-medium text-white!">
                    Chưa có video
                  </p>
                  <p className="text-sm text-white/70! mt-1">Thêm URL video trong Strapi CMS</p>
                </div>
              </div>
            )}
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.length > 0 ? (
              testimonials.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-lg relative"
                >
                  <Quote size={32} className="absolute top-4 right-4 text-gray-100" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white! font-bold shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-primary">{item.name}</h4>
                        {item.location && (
                          <span className="text-sm text-gray-500">- {item.location}</span>
                        )}
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <p className="text-gray-500">Chưa có đánh giá</p>
              </div>
            )}

            {/* View More */}
            <Link
              href={buttonLink}
              className="inline-flex items-center text-accent font-semibold hover:text-primary transition-colors"
            >
              {buttonText}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Media Logos */}
        {mediaLogos.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <p className="text-center text-gray-500 mb-8">
              {mediaLogosSubtitle}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {mediaLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <Newspaper size={24} />
                    <span className="font-medium">{logo.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
