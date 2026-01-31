import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Image as ImageIcon, Hammer } from "lucide-react";
import { getHomepageData } from "@/lib/server/pages";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export default async function ConstructionServices() {
  const homepageData = await getHomepageData();
  
  // Get services from homepage relation data
  const constructionServices = homepageData?.constructionServices || [];

  // Get section content from CMS
  const tagline = homepageData?.constructionServicesTagline || "Dịch vụ thi công";
  const title = homepageData?.constructionServicesTitle || "THI CÔNG NỘI THẤT";
  const description = homepageData?.constructionServicesDescription || 
    "Dịch vụ thi công nội thất trọn gói với đội ngũ thợ lành nghề";
  const buttonText = homepageData?.constructionServicesButtonText || "Xem tất cả";
  const buttonLink = homepageData?.constructionServicesButtonLink || "/thi-cong";

  return (
    <section className="py-16 lg:py-24 bg-background-alt">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-wider text-accent font-medium mb-2">
              {tagline}
            </p>
            <h2 
              className="text-2xl lg:text-3xl font-bold text-primary"
              dangerouslySetInnerHTML={{ __html: title.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>') }}
            />
            <p className="text-gray-600 mt-2 max-w-xl">
              {description}
            </p>
          </div>
          <Link
            href={buttonLink}
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all whitespace-nowrap"
          >
            {buttonText}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {constructionServices.length > 0 ? (
            constructionServices.slice(0, 4).map((service) => (
              <Link
                key={service.id}
                href={`/thi-cong/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="aspect-4/3 bg-gray-200 relative overflow-hidden">
                  {service.image?.url ? (
                    <Image
                      src={service.image.url.startsWith('http') ? service.image.url : `${STRAPI_URL}${service.image.url}`}
                      alt={service.image.alternativeText || service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-500">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )}
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Hammer size={20} className="text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.shortDescription}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              Đang tải dịch vụ thi công...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
