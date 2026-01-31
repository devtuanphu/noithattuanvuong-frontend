import { Metadata } from 'next';
import { getWorkProcessPageData } from '@/lib/server/pages';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getWorkProcessPageData();
  
  return {
    title: pageData?.seo?.metaTitle || 'Quy Trình Làm Việc | Nội Thất Tuấn Vượng',
    description: pageData?.seo?.metaDescription || 'Quy trình làm việc chuyên nghiệp của Nội Thất Tuấn Vượng - Từ tư vấn, thiết kế đến thi công hoàn thiện.',
    keywords: ['quy trình làm việc', 'nội thất tuấn vượng', 'thi công nội thất'],
    alternates: { canonical: 'https://noithattuanvuong.vn/quy-trinh-lam-viec' },
    openGraph: {
      title: pageData?.seo?.metaTitle || 'Quy Trình Làm Việc | Nội Thất Tuấn Vượng',
      description: pageData?.seo?.metaDescription || 'Quy trình làm việc chuyên nghiệp của Nội Thất Tuấn Vượng.',
      url: 'https://noithattuanvuong.vn/quy-trinh-lam-viec',
      siteName: 'Nội Thất Tuấn Vượng',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData?.seo?.metaTitle || 'Quy Trình Làm Việc | Nội Thất Tuấn Vượng',
      description: pageData?.seo?.metaDescription || 'Quy trình làm việc chuyên nghiệp của Nội Thất Tuấn Vượng.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function QuyTrinhLamViecPage() {
  const pageData = await getWorkProcessPageData();

  if (!pageData) {
    return (
      <>
        <div className="container text-center">
            <p className="text-gray-500">Không thể tải dữ liệu trang. Vui lòng thử lại sau.</p>
          </div>
      </>
    );
  }

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

        {/* Content Section */}
        {pageData.content && (
          <section className="py-16 lg:py-24 bg-white">
            <div className="container">
              <div 
                className="prose prose-lg max-w-4xl mx-auto"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </div>
          </section>
        )}
      </>
  );
}
