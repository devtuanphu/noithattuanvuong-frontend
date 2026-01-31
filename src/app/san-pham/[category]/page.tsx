import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

import { getProducts, getProductCategoryBySlug, getCategorySlugs, getProductCategories } from '@/lib/server/products';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await getProductCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: 'Danh mục không tồn tại | Nội Thất Tuấn Vương',
    };
  }

  return {
    title: `${categoryData.name} | Sản Phẩm Nội Thất Tuấn Vương`,
    description: categoryData.description,
    keywords: [categoryData.name.toLowerCase(), 'nội thất', 'sản phẩm nội thất', 'mua nội thất'],
    alternates: {
      canonical: `https://noithattuanvuong.vn/san-pham/${category}`,
    },
    openGraph: {
      title: `${categoryData.name} | Sản Phẩm Nội Thất Tuấn Vương`,
      description: categoryData.description,
      url: `https://noithattuanvuong.vn/san-pham/${category}`,
      siteName: 'Nội Thất Tuấn Vương',
      type: 'website',
      images: [categoryData.image || '/images/og-products.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: categoryData.name,
      description: categoryData.description,
      images: [categoryData.image || '/images/og-products.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const [categoryData, products, allCategories] = await Promise.all([
    getProductCategoryBySlug(category),
    getProducts(category),
    getProductCategories(),
  ]);

  if (!categoryData) {
    notFound();
  }

  return (
    <>
        {/* Breadcrumb & Hero */}
        <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
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
                  <Link href="/san-pham" className="hover:text-white!">Sản phẩm</Link>
                </li>
                <li>/</li>
                <li className="text-white!">{categoryData.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-3xl lg:text-5xl font-bold text-white! mb-4">
                {categoryData.name}
              </h1>
              <p className="text-lg text-white/80!">
                {categoryData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-6 bg-white border-b sticky top-0 z-20">
          <div className="container">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible lg:flex-wrap scrollbar-hide">
              <Link
                href="/san-pham"
                className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
              >
                Tất cả
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/san-pham/${cat.slug}`}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    cat.slug === category
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
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container">
            <div className="mb-6">
              <p className="text-gray-600">
                Hiển thị {products.length} sản phẩm
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có sản phẩm nào trong danh mục này</p>
                <Link 
                  href="/san-pham"
                  className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
                >
                  <ArrowLeft size={16} />
                  Xem tất cả sản phẩm
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/san-pham/chi-tiet/${product.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                      
                      {product.salePrice && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white! text-xs font-medium rounded">
                          Giảm giá
                        </span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
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
            )}
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 bg-white">
          <div className="container">
            <Link 
              href="/san-pham"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={18} />
              Xem tất cả sản phẩm
            </Link>
          </div>
        </section>
      </>
  );
}
