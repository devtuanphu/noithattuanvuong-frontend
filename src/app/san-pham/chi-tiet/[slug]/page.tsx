import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight,
  ShoppingCart, 
  Phone, 
  Heart,
  Share2,
  CheckCircle2,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';

import AddToCartButton from '@/components/cart/AddToCartButton';
import RichTextRenderer from '@/components/shared/RichTextRenderer';
import ProductGallery from '@/components/product/ProductGallery';
import { getProductBySlug, getProductSlugs, getRelatedProducts } from '@/lib/server/products';
import { getGlobalConfig } from '@/lib/server/pages';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại | Nội Thất Tuấn Vương',
    };
  }

  return {
    title: `${product.name} | Nội Thất Tuấn Vương`,
    description: product.description,
    keywords: [product.name.toLowerCase(), product.category.toLowerCase(), 'mua nội thất', 'nội thất tuấn Vương'],
    alternates: {
      canonical: `https://noithattuanvuong.vn/san-pham/chi-tiet/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Nội Thất Tuấn Vương`,
      description: product.description,
      url: `https://noithattuanvuong.vn/san-pham/chi-tiet/${slug}`,
      siteName: 'Nội Thất Tuấn Vương',
      type: 'website',
      images: product.images[0] ? [product.images[0]] : ['/images/og-products.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : ['/images/og-products.jpg'],
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

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // First fetch the product to get its category
  const [product, globalConfig] = await Promise.all([
    getProductBySlug(slug),
    getGlobalConfig(),
  ]);

  if (!product) {
    notFound();
  }

  // Then fetch related products by same category
  const relatedProducts = await getRelatedProducts(product.categorySlug, slug, 4);

  const phone = globalConfig?.phone || '0901 234 567';

  return (
    <>
        {/* Breadcrumb */}
        <section className="py-4 bg-gray-50 border-b">
          <div className="container">
            <nav>
              <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-accent">Trang chủ</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/san-pham" className="hover:text-accent">Sản phẩm</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={`/san-pham/${product.categorySlug}`} className="hover:text-accent">
                    {product.category}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-primary font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12 lg:py-16 bg-white overflow-hidden">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Gallery */}
              <ProductGallery images={product.images} productName={product.name} />

              {/* Info */}
              <div>
                <span className="text-sm text-accent font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                
                <h1 className="text-2xl lg:text-3xl font-bold text-primary mt-2 mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-bold text-accent">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-lg sm:text-xl text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-600 text-xs sm:text-sm font-medium rounded-full">
                        -{Math.round((product.price - product.salePrice) / product.price * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  {product.inStock ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-medium">Còn hàng</span>
      </>
                  ) : (
                    <span className="text-red-500 font-medium">Hết hàng</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <AddToCartButton product={product} />
                  
                  <a 
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white! transition-colors"
                  >
                    <Phone size={18} />
                    Gọi đặt hàng
                  </a>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-6 pb-6 border-b">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors">
                    <Heart size={18} />
                    <span className="text-sm">Yêu thích</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm">Chia sẻ</span>
                  </button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 py-6">
                  <div className="text-center">
                    <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-1 sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-gray-600">Giao hàng toàn quốc</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-1 sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-gray-600">Bảo hành 5 năm</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-1 sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-gray-600">Đổi trả 30 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <section className="py-12 lg:py-16 bg-gray-50">
            <div className="container">
              <h2 className="text-xl font-bold text-primary mb-6">Thông Số Kỹ Thuật</h2>
              <div className="bg-white rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-4 px-6 font-medium text-primary w-1/3">{key}</td>
                        <td className="py-4 px-6 text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Product Description */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container">
            <h2 className="text-xl font-bold text-primary mb-6">Mô Tả Chi Tiết</h2>
            {product.content && <RichTextRenderer content={product.content} />}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 lg:py-16 bg-gray-50">
            <div className="container">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-primary">Sản Phẩm Liên Quan</h2>
                <Link 
                  href="/san-pham"
                  className="text-accent hover:underline flex items-center gap-1"
                >
                  Xem tất cả
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/san-pham/chi-tiet/${relatedProduct.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {relatedProduct.images[0] ? (
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-accent mt-2">
                        {formatPrice(relatedProduct.salePrice || relatedProduct.price)}
                      </p>
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
              href={`/san-pham/${product.categorySlug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại {product.category}
            </Link>
          </div>
        </section>
      </>
  );
}
