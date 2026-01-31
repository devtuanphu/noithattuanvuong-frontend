import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export default async function BlogSection() {
  const homepageData = await getHomepageData();

  // Get articles from homepage relation data
  const blogArticles = homepageData?.blogArticles || [];

  // Get blog section content from CMS
  const badgeNumber = homepageData?.blogBadgeNumber || "20";
  const badgeLabel = homepageData?.blogBadgeLabel || "Năm KINH NGHIỆM";
  const description = homepageData?.blogDescription ||
    "Được thể hiện qua **1001+ bài viết** chia sẻ dưới đây, mời bạn tham khảo";
  const buttonText = homepageData?.blogButtonText || "Xem tất cả bài viết";
  const buttonLink = homepageData?.blogButtonLink || "/tin-tuc";

  // Get blog image URL
  const blogImageUrl = homepageData?.blogImage?.url
    ? (homepageData.blogImage.url.startsWith('http')
      ? homepageData.blogImage.url
      : `${STRAPI_URL}${homepageData.blogImage.url}`)
    : null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Years Badge */}
          <div className="flex items-center">
            <div className="relative">
              <div className="text-[120px] lg:text-[180px] font-bold text-gold leading-none">
                {badgeNumber}
              </div>
              <div className="absolute bottom-4 left-full ml-4">
                {badgeLabel.split(' ').map((word, index) => (
                  <p
                    key={index}
                    className={`text-${index === 0 ? '2xl lg:text-4xl' : 'xl lg:text-2xl'} font-bold ${index === 0 ? 'text-gold' : 'text-primary'}`}
                  >
                    {word}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Description */}
          <div className="flex items-center">
            <div>
              <p
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
              {/* Team Image */}
              <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
                {blogImageUrl ? (
                  <div className="aspect-video relative">
                    <Image
                      src={blogImageUrl}
                      alt={homepageData?.blogImage?.alternativeText || "Đội ngũ Tuấn Vương"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <BookOpen size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogArticles.length > 0 ? (
            blogArticles.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                href={`/tin-tuc/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-4/3 bg-gray-200 relative overflow-hidden">
                  {post.image?.url ? (
                    <Image
                      src={post.image.url.startsWith('http') ? post.image.url : `${STRAPI_URL}${post.image.url}`}
                      alt={post.image.alternativeText || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform">
                      <BookOpen size={48} className="text-gray-400" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-white! text-xs font-medium rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="text-accent font-medium group-hover:underline flex items-center gap-1">
                      Đọc thêm
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              Chưa có bài viết được chọn. Vui lòng thêm bài viết trong Strapi CMS.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white! transition-all"
          >
            {buttonText}
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
