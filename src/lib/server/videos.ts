import type { Video } from '@/types';
import {
  fetchStrapi,
  fetchStrapiOne,
  getStrapiImageUrl,
  type StrapiVideo,
} from '../strapi';

// Transform Strapi response to frontend type
function transformVideo(strapiVideo: StrapiVideo): Video {
  return {
    id: strapiVideo.documentId,
    slug: strapiVideo.slug,
    title: strapiVideo.title,
    description: strapiVideo.description,
    thumbnailUrl: getStrapiImageUrl(strapiVideo.thumbnail),
    videoUrl: strapiVideo.videoUrl || '',
    youtubeId: strapiVideo.youtubeId || undefined,
    duration: strapiVideo.duration,
    category: strapiVideo.category,
    publishedAt: strapiVideo.publishedAt,
  };
}

// Mock data fallback
const mockVideos: Video[] = [
  {
    id: '1',
    slug: 'tour-can-ho-120m2',
    title: 'Tour Căn Hộ 120m² Phong Cách Hiện Đại',
    description: 'Video tour căn hộ 120m² với thiết kế hiện đại.',
    thumbnailUrl: '/images/videos/tour-can-ho.jpg',
    videoUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '8:45',
    category: 'Tour',
    publishedAt: '2024-01-20',
  },
  {
    id: '2',
    slug: 'thiet-ke-phong-ngu-nho',
    title: 'Thiết Kế Phòng Ngủ Nhỏ 12m²',
    description: 'Chia sẻ kinh nghiệm thiết kế phòng ngủ nhỏ gọn.',
    thumbnailUrl: '/images/videos/phong-ngu-nho.jpg',
    videoUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '6:30',
    category: 'Tips',
    publishedAt: '2024-02-15',
  },
];

// API functions with Strapi integration
export async function getVideos(category?: string): Promise<Video[]> {
  try {
    const filter = category ? `filters[category][$eq]=${category}&` : '';
    const strapiVideos = await fetchStrapi<StrapiVideo>(
      `/videos?${filter}populate=thumbnail&sort=publishedAt:desc`
    );
    return strapiVideos.map(transformVideo);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    if (category) {
      return mockVideos.filter((v) => v.category === category);
    }
    return mockVideos;
  }
}

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const strapiVideo = await fetchStrapiOne<StrapiVideo>(
      `/videos?filters[slug][$eq]=${slug}&populate=thumbnail`
    );
    return strapiVideo ? transformVideo(strapiVideo) : null;
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockVideos.find((v) => v.slug === slug) || null;
  }
}

export async function getLatestVideos(limit: number = 6): Promise<Video[]> {
  try {
    const strapiVideos = await fetchStrapi<StrapiVideo>(
      `/videos?populate=thumbnail&sort=publishedAt:desc&pagination[limit]=${limit}`
    );
    return strapiVideos.map(transformVideo);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockVideos.slice(0, limit);
  }
}

export async function getVideoSlugs(): Promise<string[]> {
  try {
    const strapiVideos = await fetchStrapi<StrapiVideo>(`/videos?fields[0]=slug`);
    return strapiVideos.map((v) => v.slug);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockVideos.map((v) => v.slug);
  }
}

export async function getVideoCategories(): Promise<string[]> {
  try {
    const strapiVideos = await fetchStrapi<StrapiVideo>(`/videos?fields[0]=category`);
    const categories = [...new Set(strapiVideos.map((v) => v.category))];
    return categories.filter(Boolean);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    const categories = [...new Set(mockVideos.map((v) => v.category))];
    return categories.filter(Boolean);
  }
}

