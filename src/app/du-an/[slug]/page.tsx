import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, MapPin, Calendar, Ruler, Building2, Star, Phone } from 'lucide-react';

import RichTextRenderer from '@/components/shared/RichTextRenderer';
import { getProjectBySlug, getProjectSlugs, getProjects } from '@/lib/server/projects';
import { getGlobalConfig } from '@/lib/server/pages';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Không tìm thấy dự án | Nội Thất Tuấn Vương',
    };
  }

  return {
    title: `${project.title} | Dự Án Nội Thất Tuấn Vương`,
    description: project.description,
    keywords: [project.title.toLowerCase(), 'dự án nội thất', project.categoryName.toLowerCase(), 'nội thất tuấn Vương'],
    alternates: {
      canonical: `https://noithattuanvuong.vn/du-an/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Dự Án Nội Thất Tuấn Vương`,
      description: project.description,
      url: `https://noithattuanvuong.vn/du-an/${slug}`,
      siteName: 'Nội Thất Tuấn Vương',
      type: 'article',
      images: project.image ? [project.image] : ['/images/og-projects.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : ['/images/og-projects.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function DuAnDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects, globalConfig] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
    getGlobalConfig(),
  ]);

  if (!project) {
    notFound();
  }

  const phone = globalConfig?.phone || '0901 234 567';

  // Get related projects
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  return (
    <>
        {/* Breadcrumb & Hero */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-white/60!">
                <li>
                  <Link href="/" className="hover:text-white!">Trang chủ</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/du-an" className="hover:text-white!">Dự án</Link>
                </li>
                <li>/</li>
                <li className="text-white!">{project.title}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="text-accent font-medium uppercase tracking-wider">
                {project.categoryName}
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mt-2 mb-6">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80!">
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Ruler size={18} />
                  {project.area}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {project.completedAt}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Content */}
              <div className="lg:col-span-2">
                {/* Main Image */}
                <div className="aspect-video bg-gray-100 rounded-2xl mb-8 relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <h2>Giới Thiệu Dự Án</h2>
                  <p>{project.description}</p>
                  
                  {project.content && <RichTextRenderer content={project.content} />}
                </div>

                {/* Gallery */}
                {project.gallery.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-xl font-bold text-primary mb-6">
                      Hình Ảnh Dự Án
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.gallery.map((galleryImage, index) => (
                        <div 
                          key={index}
                          className="aspect-4/3 bg-gray-100 rounded-lg relative overflow-hidden"
                        >
                          <Image
                            src={galleryImage}
                            alt={`${project.title} - ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client Review */}
                <div className="mt-12 bg-gray-50 p-8 rounded-2xl">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    &ldquo;Rất hài lòng với chất lượng thiết kế và thi công. Đội ngũ làm việc chuyên nghiệp, đúng tiến độ. Chắc chắn sẽ giới thiệu cho bạn bè.&rdquo;
                  </blockquote>
                  <p className="font-semibold text-primary">Khách hàng</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Project Info */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-primary mb-4">Thông Tin Dự Án</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Loại công trình</span>
                        <span className="font-medium text-primary">{project.categoryName}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Diện tích</span>
                        <span className="font-medium text-primary">{project.area}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Địa điểm</span>
                        <span className="font-medium text-primary">{project.location}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Năm hoàn thành</span>
                        <span className="font-medium text-primary">{project.completedAt}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Phong cách</span>
                        <span className="font-medium text-primary">{project.style}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-primary p-6 rounded-2xl text-center">
                    <h3 className="font-bold text-white! mb-2">Muốn Có Dự Án Như Này?</h3>
                    <p className="text-white/80! text-sm mb-6">
                      Liên hệ ngay để được tư vấn miễn phí
                    </p>
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                    >
                      <Phone size={18} />
                      {phone}
                    </a>
                  </div>

                  {/* Related Links */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-primary mb-4">Dịch Vụ Liên Quan</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link 
                          href="/thiet-ke"
                          className="flex items-center justify-between text-gray-700 hover:text-accent transition-colors"
                        >
                          <span>Thiết kế nội thất</span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/thi-cong"
                          className="flex items-center justify-between text-gray-700 hover:text-accent transition-colors"
                        >
                          <span>Thi công nội thất</span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/bang-gia"
                          className="flex items-center justify-between text-gray-700 hover:text-accent transition-colors"
                        >
                          <span>Xem bảng giá</span>
                          <ArrowRight size={16} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                  Dự Án Tương Tự
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/du-an/${relatedProject.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {relatedProject.image ? (
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{relatedProject.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-8 bg-white">
          <div className="container">
            <Link 
              href="/du-an"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại danh sách dự án
            </Link>
          </div>
        </section>
      </>
  );
}
