import type { Service } from '@/types';
import {
  fetchStrapi,
  fetchStrapiOne,
  getStrapiImageUrl,
  getStrapiImageUrls,
  type StrapiService,
} from '../strapi';

// Transform Strapi response to frontend type
function transformService(strapiService: StrapiService): Service {
  return {
    id: strapiService.documentId,
    slug: strapiService.slug,
    title: strapiService.title,
    type: strapiService.type,
    shortDescription: strapiService.shortDescription,
    description: strapiService.description,
    content: strapiService.content,
    image: getStrapiImageUrl(strapiService.image),
    gallery: getStrapiImageUrls(strapiService.gallery),
    features: strapiService.features || [],
    price: strapiService.price || undefined,
    createdAt: strapiService.createdAt,
  };
}

// Mock data fallback
const mockServices: Service[] = [
  {
    id: '1',
    slug: 'can-ho',
    title: 'Thiết Kế Nội Thất Căn Hộ Chung Cư',
    type: 'thiet-ke',
    shortDescription: 'Giải pháp thiết kế nội thất căn hộ chung cư tối ưu không gian, hiện đại và tiện nghi.',
    description: 'Chúng tôi chuyên thiết kế nội thất căn hộ chung cư với phong cách hiện đại.',
    content: '<h2>Dịch Vụ Thiết Kế Nội Thất Căn Hộ Chung Cư</h2>',
    image: '/images/services/thiet-ke-can-ho.jpg',
    gallery: [],
    features: ['Thiết kế 2D & 3D chuyên nghiệp', 'Tối ưu công năng'],
    price: 'Từ 150.000đ/m²',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    slug: 'nha-pho',
    title: 'Thiết Kế Nội Thất Nhà Phố',
    type: 'thiet-ke',
    shortDescription: 'Thiết kế nội thất nhà phố sang trọng, tinh tế.',
    description: 'Dịch vụ thiết kế nội thất nhà phố sáng tạo.',
    content: '<h2>Thiết Kế Nội Thất Nhà Phố</h2>',
    image: '/images/services/thiet-ke-nha-pho.jpg',
    gallery: [],
    features: ['Thiết kế theo từng tầng'],
    price: 'Từ 180.000đ/m²',
    createdAt: '2024-01-02',
  },
  {
    id: '5',
    slug: 'can-ho',
    title: 'Thi Công Nội Thất Căn Hộ Chung Cư',
    type: 'thi-cong',
    shortDescription: 'Thi công nội thất căn hộ trọn gói với chất lượng cao.',
    description: 'Dịch vụ thi công nội thất căn hộ trọn gói từ A-Z.',
    content: '<h2>Thi Công Nội Thất Căn Hộ</h2>',
    image: '/images/services/thi-cong-can-ho.jpg',
    gallery: [],
    features: ['Thi công trọn gói từ A-Z', 'Bảo hành dài hạn'],
    price: 'Từ 18 triệu/m²',
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    slug: 'nha-pho',
    title: 'Thi Công Nội Thất Nhà Phố',
    type: 'thi-cong',
    shortDescription: 'Thi công nội thất nhà phố chất lượng cao.',
    description: 'Thi công nội thất nhà phố từ cơ bản đến cao cấp.',
    content: '<h2>Thi Công Nội Thất Nhà Phố</h2>',
    image: '/images/services/thi-cong-nha-pho.jpg',
    gallery: [],
    features: ['Đội ngũ thợ lành nghề', 'Bảo hành 5 năm'],
    price: 'Từ 20 triệu/m²',
    createdAt: '2024-01-06',
  },
];

// API functions with Strapi integration
export async function getServices(type?: 'thiet-ke' | 'thi-cong'): Promise<Service[]> {
  try {
    const filter = type ? `filters[type][$eq]=${type}&` : '';
    const strapiServices = await fetchStrapi<StrapiService>(
      `/services?${filter}populate=*&sort=createdAt:desc`
    );
    return strapiServices.map(transformService);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    if (type) {
      return mockServices.filter((s) => s.type === type);
    }
    return mockServices;
  }
}

export async function getServiceBySlug(
  type: 'thiet-ke' | 'thi-cong',
  slug: string
): Promise<Service | null> {
  try {
    const strapiService = await fetchStrapiOne<StrapiService>(
      `/services?filters[type][$eq]=${type}&filters[slug][$eq]=${slug}&populate=*`
    );
    return strapiService ? transformService(strapiService) : null;
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockServices.find((s) => s.type === type && s.slug === slug) || null;
  }
}

export async function getServiceSlugs(type: 'thiet-ke' | 'thi-cong'): Promise<string[]> {
  try {
    const strapiServices = await fetchStrapi<StrapiService>(
      `/services?filters[type][$eq]=${type}&fields[0]=slug`
    );
    return strapiServices.map((s) => s.slug);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockServices.filter((s) => s.type === type).map((s) => s.slug);
  }
}
