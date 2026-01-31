import { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight, Filter } from 'lucide-react';
import { getProducts } from '@/lib/server/products';
import { getProjects } from '@/lib/server/projects';
import { getNewsArticles } from '@/lib/server/news';

interface Props {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || '';
  
  return {
    title: query ? `Tìm kiếm "${query}" | Nội Thất Tuấn Vương` : 'Tìm kiếm | Nội Thất Tuấn Vương',
    description: query ? `Kết quả tìm kiếm cho "${query}" tại Nội Thất Tuấn Vương` : 'Tìm kiếm sản phẩm, dự án, tin tức tại Nội Thất Tuấn Vương',
    alternates: {
      canonical: 'https://noithattuanvuong.vn/tim-kiem',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default async function TimKiemPage({ searchParams }: Props) {
  const { q, type } = await searchParams;
  const query = q?.toLowerCase() || '';
  const filterType = type || 'all';

  // Fetch all data
  const [products, projects, news] = await Promise.all([
    getProducts(),
    getProjects(),
    getNewsArticles(),
  ]);

  // Filter by search query
  const filteredProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  const filteredProjects = query
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      )
    : [];

  const filteredNews = query
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.excerpt.toLowerCase().includes(query)
      )
    : [];

  // Apply type filter
  const showProducts = filterType === 'all' || filterType === 'products';
  const showProjects = filterType === 'all' || filterType === 'projects';
  const showNews = filterType === 'all' || filterType === 'news';

  const totalResults =
    (showProducts ? filteredProducts.length : 0) +
    (showProjects ? filteredProjects.length : 0) +
    (showNews ? filteredNews.length : 0);

  return (
    <>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-primary">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl lg:text-4xl font-bold text-white! mb-4">
                Kết Quả Tìm Kiếm
              </h1>
              
              {/* Search Form */}
              <form action="/tim-kiem" method="GET" className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="w-full px-5 py-4 pr-12 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-accent"
                  >
                    <Search size={22} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container">
            {query ? (
              <>
                {/* Results Summary */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <p className="text-gray-600">
                    Tìm thấy <span className="font-semibold text-primary">{totalResults}</span> kết quả cho &quot;
                    <span className="font-semibold">{q}</span>&quot;
                  </p>
                  
                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-400" />
                    <div className="flex gap-2">
                      <Link
                        href={`/tim-kiem?q=${q}&type=all`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterType === 'all'
                            ? 'bg-accent text-white!'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Tất cả ({filteredProducts.length + filteredProjects.length + filteredNews.length})
                      </Link>
                      <Link
                        href={`/tim-kiem?q=${q}&type=products`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterType === 'products'
                            ? 'bg-accent text-white!'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Sản phẩm ({filteredProducts.length})
                      </Link>
                      <Link
                        href={`/tim-kiem?q=${q}&type=projects`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterType === 'projects'
                            ? 'bg-accent text-white!'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Dự án ({filteredProjects.length})
                      </Link>
                      <Link
                        href={`/tim-kiem?q=${q}&type=news`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterType === 'news'
                            ? 'bg-accent text-white!'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Tin tức ({filteredNews.length})
                      </Link>
                    </div>
                  </div>
                </div>

                {totalResults === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Search className="w-12 h-12 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-bold text-primary mb-2">
                      Không tìm thấy kết quả
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Thử tìm kiếm với từ khóa khác hoặc duyệt sản phẩm của chúng tôi
                    </p>
                    <Link
                      href="/san-pham"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Xem sản phẩm
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {/* Products */}
                    {showProducts && filteredProducts.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-primary mb-6">
                          Sản phẩm ({filteredProducts.length})
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {filteredProducts.slice(0, 8).map((product) => (
                            <Link
                              key={product.id}
                              href={`/san-pham/chi-tiet/${product.slug}`}
                              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                            >
                              <div className="aspect-4/3 bg-gray-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                  <Search size={32} />
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-xs text-accent font-medium mb-1">
                                  {product.category}
                                </p>
                                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-2">
                                  {product.name}
                                </h3>
                                <p className="font-bold text-accent">
                                  {formatPrice(product.salePrice || product.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        {filteredProducts.length > 8 && (
                          <div className="text-center mt-6">
                            <Link
                              href={`/san-pham?q=${q}`}
                              className="text-accent hover:text-accent-light font-medium"
                            >
                              Xem thêm {filteredProducts.length - 8} sản phẩm →
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Projects */}
                    {showProjects && filteredProjects.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-primary mb-6">
                          Dự án ({filteredProjects.length})
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredProjects.slice(0, 6).map((project) => (
                            <Link
                              key={project.id}
                              href={`/du-an/${project.slug}`}
                              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                            >
                              <div className="aspect-video bg-gray-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                  <Search size={32} />
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-xs text-accent font-medium mb-1">
                                  {project.categoryName}
                                </p>
                                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mb-2">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {project.shortDescription}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* News */}
                    {showNews && filteredNews.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold text-primary mb-6">
                          Tin tức ({filteredNews.length})
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredNews.slice(0, 6).map((article) => (
                            <Link
                              key={article.id}
                              href={`/tin-tuc/${article.slug}`}
                              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                            >
                              <div className="aspect-video bg-gray-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                  <Search size={32} />
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-xs text-accent font-medium mb-1">
                                  {article.category}
                                </p>
                                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mb-2">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {article.excerpt}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
      </>
            ) : (
              /* No Query State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-xl font-bold text-primary mb-2">
                  Nhập từ khóa để tìm kiếm
                </h2>
                <p className="text-gray-600 mb-6">
                  Tìm kiếm sản phẩm, dự án, tin tức trên website của chúng tôi
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/san-pham" className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    Sản phẩm
                  </Link>
                  <Link href="/du-an" className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    Dự án
                  </Link>
                  <Link href="/thiet-ke" className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    Thiết kế
                  </Link>
                  <Link href="/thi-cong" className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    Thi công
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </>
  );
}
