import type { NewsArticle } from '@/types';
import {
  fetchStrapi,
  fetchStrapiOne,
  getStrapiImageUrl,
  type StrapiNewsArticle,
} from '../strapi';

// Transform Strapi response to frontend type
function transformNewsArticle(strapiArticle: StrapiNewsArticle): NewsArticle {
  return {
    id: strapiArticle.documentId,
    slug: strapiArticle.slug,
    title: strapiArticle.title,
    category: strapiArticle.category,
    excerpt: strapiArticle.excerpt,
    content: strapiArticle.content,
    image: getStrapiImageUrl(strapiArticle.image),
    author: strapiArticle.author,
    publishedAt: strapiArticle.publishedAt,
    createdAt: strapiArticle.createdAt,
  };
}

// Mock data fallback
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'xu-huong-thiet-ke-2024',
    title: 'Xu Hướng Thiết Kế Nội Thất 2024',
    category: 'Xu hướng',
    excerpt: 'Khám phá những xu hướng thiết kế nội thất hot nhất năm 2024.',
    content: '<h2>Xu Hướng Thiết Kế 2024</h2>',
    image: '/images/news/xu-huong-2024.jpg',
    author: 'Admin',
    publishedAt: '2024-01-15',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'meo-trang-tri-phong-khach-nho',
    title: '10 Mẹo Trang Trí Phòng Khách Nhỏ',
    category: 'Kinh nghiệm',
    excerpt: 'Biến phòng khách nhỏ trở nên rộng rãi hơn.',
    content: '<h2>10 Mẹo Trang Trí Phòng Khách Nhỏ</h2>',
    image: '/images/news/phong-khach-nho.jpg',
    author: 'Admin',
    publishedAt: '2024-02-10',
    createdAt: '2024-02-10',
  },
];

// API functions with Strapi integration
export async function getNewsArticles(category?: string): Promise<NewsArticle[]> {
  try {
    const filter = category ? `filters[category][$eq]=${category}&` : '';
    const strapiArticles = await fetchStrapi<StrapiNewsArticle>(
      `/news-articles?${filter}populate=image&sort=publishedAt:desc`
    );
    return strapiArticles.map(transformNewsArticle);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    if (category) {
      return mockArticles.filter((a) => a.category === category);
    }
    return mockArticles;
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const strapiArticle = await fetchStrapiOne<StrapiNewsArticle>(
      `/news-articles?filters[slug][$eq]=${slug}&populate=image`
    );
    return strapiArticle ? transformNewsArticle(strapiArticle) : null;
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockArticles.find((a) => a.slug === slug) || null;
  }
}

export async function getLatestNews(limit: number = 6): Promise<NewsArticle[]> {
  try {
    const strapiArticles = await fetchStrapi<StrapiNewsArticle>(
      `/news-articles?populate=image&sort=publishedAt:desc&pagination[limit]=${limit}`
    );
    return strapiArticles.map(transformNewsArticle);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockArticles.slice(0, limit);
  }
}

export async function getNewsSlugs(): Promise<string[]> {
  try {
    const strapiArticles = await fetchStrapi<StrapiNewsArticle>(
      `/news-articles?fields[0]=slug`
    );
    return strapiArticles.map((a) => a.slug);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockArticles.map((a) => a.slug);
  }
}

export async function getNewsCategories(): Promise<string[]> {
  try {
    const strapiArticles = await fetchStrapi<StrapiNewsArticle>(
      `/news-articles?fields[0]=category`
    );
    const categories = [...new Set(strapiArticles.map((a) => a.category))];
    return categories.filter(Boolean);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    const categories = [...new Set(mockArticles.map((a) => a.category))];
    return categories.filter(Boolean);
  }
}

