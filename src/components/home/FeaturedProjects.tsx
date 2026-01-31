import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export default async function FeaturedProjects() {
  const homepageData = await getHomepageData();
  
  // Get projects from relation (or fallback to empty array)
  const featuredProjects = homepageData?.featuredProjects || [];

  // Get section content from CMS
  const tagline = homepageData?.featuredProjectsTagline || "Dự án tiêu biểu";
  const title = homepageData?.featuredProjectsTitle || "DỰ ÁN NỔI BẬT";
  const description = homepageData?.featuredProjectsDescription || 
    "Khám phá các dự án thiết kế và thi công nội thất tiêu biểu đã được Tuấn Vương Interior thực hiện";
  const buttonText = homepageData?.featuredProjectsButtonText || "Xem tất cả dự án";
  const buttonLink = homepageData?.featuredProjectsButtonLink || "/du-an";

  return (
    <section className="py-16 lg:py-24 bg-background-alt">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-accent font-medium mb-2">
            {tagline}
          </p>
          <h2 
            className="text-2xl lg:text-3xl font-bold text-primary"
            dangerouslySetInnerHTML={{ __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>') }}
          />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/du-an/${project.slug}`}
              className="group relative aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Image or Placeholder */}
              {project.image?.url ? (
                <Image
                  src={project.image.url.startsWith('http') ? project.image.url : `${STRAPI_URL}${project.image.url}`}
                  alt={project.image.alternativeText || project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-500">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-white! text-xs font-medium rounded-full">
                {project.categoryName}
              </div>
              
              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white! font-semibold text-lg group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-all hover:shadow-lg"
          >
            {buttonText}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
