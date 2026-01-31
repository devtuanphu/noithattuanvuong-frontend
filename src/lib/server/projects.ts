import type { Project } from '@/types';
import {
  fetchStrapi,
  fetchStrapiOne,
  getStrapiImageUrl,
  getStrapiImageUrls,
  type StrapiProject,
} from '../strapi';

// Transform Strapi response to frontend type
function transformProject(strapiProject: StrapiProject): Project {
  return {
    id: strapiProject.documentId,
    slug: strapiProject.slug,
    title: strapiProject.title,
    category: strapiProject.category,
    categoryName: strapiProject.categoryName,
    shortDescription: strapiProject.shortDescription,
    description: strapiProject.description,
    content: strapiProject.content,
    image: getStrapiImageUrl(strapiProject.image),
    gallery: getStrapiImageUrls(strapiProject.gallery),
    area: strapiProject.area,
    location: strapiProject.location,
    style: strapiProject.style,
    completedAt: strapiProject.completedAt,
    createdAt: strapiProject.createdAt,
  };
}

// Mock data fallback
const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'can-ho-vinhomes-central-park',
    title: 'Căn Hộ Vinhomes Central Park',
    category: 'can-ho',
    categoryName: 'Căn hộ chung cư',
    shortDescription: 'Thiết kế nội thất căn hộ 3 phòng ngủ theo phong cách hiện đại.',
    description: 'Dự án thiết kế và thi công nội thất căn hộ cao cấp tại Vinhomes Central Park.',
    content: '<h2>Dự Án Căn Hộ Vinhomes Central Park</h2>',
    image: '/images/projects/vinhomes-central-park.jpg',
    gallery: [],
    area: '120m²',
    location: 'Quận Bình Thạnh, TP.HCM',
    style: 'Hiện đại - Tối giản',
    completedAt: '2024-06',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    slug: 'nha-pho-quan-7',
    title: 'Nhà Phố Quận 7',
    category: 'nha-pho',
    categoryName: 'Nhà phố',
    shortDescription: 'Nội thất nhà phố 4 tầng theo phong cách Tân cổ điển.',
    description: 'Thiết kế và thi công nội thất nhà phố 4 tầng.',
    content: '<h2>Dự Án Nhà Phố Quận 7</h2>',
    image: '/images/projects/nha-pho-quan-7.jpg',
    gallery: [],
    area: '180m²',
    location: 'Quận 7, TP.HCM',
    style: 'Tân cổ điển',
    completedAt: '2024-05',
    createdAt: '2024-01-02',
  },
];

// API functions with Strapi integration
export async function getProjects(category?: string): Promise<Project[]> {
  try {
    const filter = category ? `filters[category][$eq]=${category}&` : '';
    const strapiProjects = await fetchStrapi<StrapiProject>(
      `/projects?${filter}populate=*&sort=createdAt:desc`
    );
    return strapiProjects.map(transformProject);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    if (category) {
      return mockProjects.filter((p) => p.category === category);
    }
    return mockProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const strapiProject = await fetchStrapiOne<StrapiProject>(
      `/projects?filters[slug][$eq]=${slug}&populate=*`
    );
    return strapiProject ? transformProject(strapiProject) : null;
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  try {
    const strapiProjects = await fetchStrapi<StrapiProject>(
      `/projects?populate=*&sort=createdAt:desc&pagination[limit]=${limit}`
    );
    return strapiProjects.map(transformProject);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockProjects.slice(0, limit);
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const strapiProjects = await fetchStrapi<StrapiProject>(`/projects?fields[0]=slug`);
    return strapiProjects.map((p) => p.slug);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockProjects.map((p) => p.slug);
  }
}
