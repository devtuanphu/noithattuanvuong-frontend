import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, BookOpen, Facebook, Twitter, Linkedin } from 'lucide-react';

import RichTextRenderer from '@/components/shared/RichTextRenderer';
import { getNewsArticleBySlug, getNewsSlugs, getNewsArticles } from '@/lib/server/news';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Bài viết không tồn tại | Nội Thất Tuấn Vương',
    };
  }

  return {
    title: `${article.title} | Nội Thất Tuấn Vương`,
    description: article.excerpt,
    keywords: [article.category.toLowerCase(), 'tin tức nội thất', 'kiến thức nội thất'],
    alternates: {
      canonical: `https://noithattuanvuong.vn/tin-tuc/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://noithattuanvuong.vn/tin-tuc/${slug}`,
      siteName: 'Nội Thất Tuấn Vương',
      type: 'article',
      images: [article.image || '/images/og-news.jpg'],
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image || '/images/og-news.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function TinTucDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getNewsArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <>
        {/* Breadcrumb */}
        <section className="py-4 bg-gray-50 border-b">
          <div className="container">
            <nav>
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-accent">Trang chủ</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/tin-tuc" className="hover:text-accent">Tin tức</Link>
                </li>
                <li>/</li>
                <li className="text-primary font-medium line-clamp-1">{article.title}</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Article */}
        <article className="py-12 lg:py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <span className="text-sm text-accent font-medium uppercase tracking-wider">
                  {article.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mt-2 mb-4">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(article.publishedAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={16} />
                    {article.category}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              <div className="aspect-video bg-gray-100 rounded-2xl mb-8 relative overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-8 font-medium">
                {article.excerpt}
              </p>

              {/* Content */}
              {article.content && <RichTextRenderer content={article.content} />}

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-gray-500 mb-4">Chia sẻ bài viết:</p>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white! hover:opacity-90 transition-opacity"
                  >
                    <Facebook size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white! hover:opacity-90 transition-opacity"
                  >
                    <Twitter size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white! hover:opacity-90 transition-opacity"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                  Bài Viết Liên Quan
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/tin-tuc/${relatedArticle.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {relatedArticle.image ? (
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(relatedArticle.publishedAt).toLocaleDateString('vi-VN')}
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
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại danh sách tin tức
            </Link>
          </div>
        </section>
      </>
  );
}
