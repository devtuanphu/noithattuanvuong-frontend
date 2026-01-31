import { Metadata } from 'next';
import { getShippingPageData } from '@/lib/server/pages';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getShippingPageData();
  
  return {
    title: pageData?.seo?.metaTitle || 'Vận Chuyển - Giao Nhận | Nội Thất Tuấn Vượng',
    description: pageData?.seo?.metaDescription || 'Chính sách vận chuyển và giao nhận của Nội Thất Tuấn Vượng - Giao hàng toàn quốc, đảm bảo an toàn.',
    keywords: ['vận chuyển nội thất', 'giao nhận', 'nội thất tuấn vượng'],
    alternates: { canonical: 'https://noithattuanvuong.vn/van-chuyen-giao-nhan' },
    openGraph: {
      title: pageData?.seo?.metaTitle || 'Vận Chuyển - Giao Nhận | Nội Thất Tuấn Vượng',
      description: pageData?.seo?.metaDescription || 'Chính sách vận chuyển và giao nhận.',
      url: 'https://noithattuanvuong.vn/van-chuyen-giao-nhan',
      siteName: 'Nội Thất Tuấn Vượng',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData?.seo?.metaTitle || 'Vận Chuyển - Giao Nhận | Nội Thất Tuấn Vượng',
      description: pageData?.seo?.metaDescription || 'Chính sách vận chuyển và giao nhận.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function VanChuyenGiaoNhanPage() {
  const pageData = await getShippingPageData();

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
