import { 
  fetchStrapi, 
  type StrapiDesignService, 
  type StrapiConstructionService 
} from '@/lib/strapi';
import { getGlobalConfig } from '@/lib/server/pages';
import HeaderClient from './HeaderClient';

// Fetch services from Strapi for navigation
async function getNavigationData() {
  try {
    const [designServices, constructionServices] = await Promise.all([
      fetchStrapi<StrapiDesignService>('/design-services?fields[0]=title&fields[1]=slug&pagination[pageSize]=20'),
      fetchStrapi<StrapiConstructionService>('/construction-services?fields[0]=title&fields[1]=slug&pagination[pageSize]=20'),
    ]);

    return {
      designServices: designServices.map(s => ({
        name: s.title,
        href: `/thiet-ke/${s.slug}`,
      })),
      constructionServices: constructionServices.map(s => ({
        name: s.title,
        href: `/thi-cong/${s.slug}`,
      })),
    };
  } catch (error) {
    console.warn('Failed to fetch navigation data:', error);
    // Fallback to default
    return {
      designServices: [
        { name: 'Thiết kế căn hộ', href: '/thiet-ke/can-ho' },
        { name: 'Thiết kế nhà phố', href: '/thiet-ke/nha-pho' },
        { name: 'Thiết kế biệt thự', href: '/thiet-ke/biet-thu' },
        { name: 'Thiết kế văn phòng', href: '/thiet-ke/van-phong' },
      ],
      constructionServices: [
        { name: 'Thi công căn hộ', href: '/thi-cong/can-ho' },
        { name: 'Thi công nhà phố', href: '/thi-cong/nha-pho' },
        { name: 'Thi công biệt thự', href: '/thi-cong/biet-thu' },
      ],
    };
  }
}

export default async function Header() {
  const [navData, globalConfig] = await Promise.all([
    getNavigationData(),
    getGlobalConfig(),
  ]);
  
  const contactInfo = {
    phone: globalConfig?.phone || '0901 234 567',
    email: globalConfig?.email || 'info@noithattuanvuong.vn',
  };
  
  return <HeaderClient navData={navData} contactInfo={contactInfo} />;
}

