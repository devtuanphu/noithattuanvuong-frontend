import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Tag } from 'lucide-react';

import Pagination from '@/components/shared/Pagination';
import { getProductCategories } from '@/lib/server/products';
import { getProductsPageData, getProductsWithPagination } from '@/lib/server/pages';
import { getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Sản Phẩm Nội Thất | Nội Thất Tuấn Vương',
  description: 'Mua sản phẩm nội thất cao cấp: sofa, giường, tủ bếp, bàn ghế... Chất lượng đảm bảo, giao hàng toàn quốc, bảo hành 5 năm.',
  keywords: ['sản phẩm nội thất', 'mua nội thất', 'nội thất cao cấp', 'sofa', 'giường', 'tủ bếp'],
  alternates: {
    canonical: 'https://noithattuanvuong.vn/san-pham',
  },
  openGraph: {
    title: 'Sản Phẩm Nội Thất | Nội Thất Tuấn Vương',
    description: 'Mua sản phẩm nội thất cao cấp với giá tốt nhất.',
    url: 'https://noithattuanvuong.vn/san-pham',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
    images: ['/images/og-products.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sản Phẩm Nội Thất | Nội Thất Tuấn Vương',
    description: 'Mua sản phẩm nội thất cao cấp với giá tốt nhất.',
    images: ['/images/og-products.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function SanPhamPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const category = params.category;

  const [productsResult, categories, pageData] = await Promise.all([
    getProductsWithPagination(currentPage, category),
    getProductCategories(),
    getProductsPageData(),
  ]);

  const products = productsResult.data;
  const { pagination } = productsResult;

  // Get page content from CMS
  const heroTagline = pageData?.heroTagline || 'Sản phẩm';
  const heroTitle = pageData?.heroTitle || 'Sản Phẩm Nội Thất Cao Cấp';
  const heroDescription = pageData?.heroDescription || 'Khám phá bộ sưu tập nội thất đa dạng với chất lượng hàng đầu';
  const categoryShowcaseTitle = pageData?.categoryShowcaseTitle || 'Mua Sắm Theo Danh Mục';
  const ctaTitle = pageData?.ctaTitle || 'Cần Tư Vấn Chọn Sản Phẩm?';
  const ctaDescription = pageData?.ctaDescription || 'Liên hệ ngay để được tư vấn miễn phí về sản phẩm phù hợp với không gian của bạn';

  return (
    <>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-accent font-medium mb-4 tracking-wider uppercase">
                {heroTagline}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-6">
                {heroTitle}
              </h1>
              <p className="text-lg text-white/80!">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-white border-b">
          <div className="container">
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible lg:flex-wrap lg:justify-center scrollbar-hide">
              <Link
                href="/san-pham"
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  !category 
                    ? 'border-accent bg-accent text-white!' 
                    : 'border-gray-200 text-gray-700 hover:border-accent hover:text-accent'
                }`}
              >
                Tất cả
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/san-pham?category=${cat.slug}`}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    category === cat.slug 
                      ? 'border-accent bg-accent text-white!' 
                      : 'border-gray-200 text-gray-700 hover:border-accent hover:text-accent'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">
                {category ? `Danh mục: ${category}` : 'Tất Cả Sản Phẩm'} ({pagination.total})
              </h2>
            </div>

            {products.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/san-pham/chi-tiet/${product.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-square relative bg-gray-100 overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={getStrapiImageUrl(product.images[0])}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ShoppingCart className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                        
                        {product.salePrice && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white! text-xs font-medium rounded">
                            Giảm giá
                          </span>
                        )}
                        
                        {!product.inStock && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-gray-500 text-white! text-xs font-medium rounded">
                            Hết hàng
                          </span>
                        )}
                      </div>
                      
                      <div className="p-4">
                        {product.category && (
                          <span className="text-xs text-accent font-medium uppercase tracking-wider">
                            {product.category.name}
                          </span>
                        )}
                        <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mt-1 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="mt-3 flex items-center gap-2">
                          {product.salePrice ? (
                            <>
                              <span className="text-lg font-bold text-accent">
                                {formatPrice(Number(product.salePrice))}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(Number(product.price))}
                              </span>
      </>
                          ) : (
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(Number(product.price))}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pageCount}
                  basePath="/san-pham"
                  searchParams={category ? { category } : undefined}
                />
      </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có sản phẩm nào.</p>
              </div>
            )}
          </div>
        </section>

        {/* Category Showcase */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                {categoryShowcaseTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/san-pham?category=${cat.slug}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-primary to-primary-dark"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <Tag className="w-12 h-12 text-white!/50! mb-4" />
                    <h3 className="text-xl font-bold text-white!">{cat.name}</h3>
                    <span className="text-white/80! text-sm mt-2 group-hover:text-accent transition-colors">
                      Xem sản phẩm →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white! mb-4">
                {ctaTitle}
              </h2>
              <p className="text-white/80! mb-8">
                {ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/lien-he"
                  className="px-8 py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
                >
                  Liên hệ tư vấn
                </Link>
                <Link 
                  href="/showroom"
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Đến showroom
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}
