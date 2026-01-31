import type { Product, ProductCategory } from '@/types';
import {
  fetchStrapi,
  fetchStrapiOne,
  getStrapiImageUrl,
  getStrapiImageUrls,
  type StrapiProduct,
  type StrapiProductCategory,
} from '../strapi';

// Transform Strapi response to frontend type
function transformProduct(strapiProduct: StrapiProduct): Product {
  return {
    id: strapiProduct.documentId,
    slug: strapiProduct.slug,
    name: strapiProduct.name,
    category: strapiProduct.category?.name || '',
    categorySlug: strapiProduct.category?.slug || '',
    price: Number(strapiProduct.price),
    salePrice: strapiProduct.salePrice ? Number(strapiProduct.salePrice) : undefined,
    description: strapiProduct.description,
    content: strapiProduct.content,
    images: getStrapiImageUrls(strapiProduct.images),
    specifications: strapiProduct.specifications?.reduce(
      (acc, spec) => {
        acc[spec.key] = spec.value;
        return acc;
      },
      {} as Record<string, string>
    ) || {},
    inStock: strapiProduct.inStock,
    featured: strapiProduct.featured,
    createdAt: strapiProduct.createdAt,
  };
}

function transformCategory(strapiCategory: StrapiProductCategory): ProductCategory {
  return {
    slug: strapiCategory.slug,
    name: strapiCategory.name,
    description: strapiCategory.description,
    image: getStrapiImageUrl(strapiCategory.image),
  };
}

// Mock data fallback
const mockCategories: ProductCategory[] = [
  { slug: 'phong-khach', name: 'Phòng Khách', description: 'Sofa, bàn trà, kệ TV', image: '/images/categories/phong-khach.jpg' },
  { slug: 'phong-ngu', name: 'Phòng Ngủ', description: 'Giường, tủ quần áo', image: '/images/categories/phong-ngu.jpg' },
  { slug: 'phong-bep', name: 'Phòng Bếp', description: 'Tủ bếp, kệ bếp', image: '/images/categories/phong-bep.jpg' },
];

const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'sofa-phong-cach-hien-dai',
    name: 'Sofa Phong Cách Hiện Đại',
    category: 'Phòng Khách',
    categorySlug: 'phong-khach',
    price: 25000000,
    salePrice: 22000000,
    description: 'Sofa góc L chất liệu da cao cấp.',
    content: '<h2>Sofa Phong Cách Hiện Đại</h2>',
    images: ['/images/products/sofa-1.jpg'],
    specifications: { 'Kích thước': '280 x 180 x 85 cm' },
    inStock: true,
    featured: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    slug: 'giuong-ngu-go-oc-cho',
    name: 'Giường Ngủ Gỗ Óc Chó',
    category: 'Phòng Ngủ',
    categorySlug: 'phong-ngu',
    price: 35000000,
    description: 'Giường ngủ gỗ óc chó nhập khẩu.',
    content: '<h2>Giường Ngủ Gỗ Óc Chó</h2>',
    images: ['/images/products/giuong-1.jpg'],
    specifications: { 'Kích thước': '200 x 180 x 100 cm' },
    inStock: true,
    featured: true,
    createdAt: '2024-01-02',
  },
];

// API functions with Strapi integration
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const filter = categorySlug ? `filters[category][slug][$eq]=${categorySlug}&` : '';
    const strapiProducts = await fetchStrapi<StrapiProduct>(
      `/products?${filter}populate=*&sort=createdAt:desc`
    );
    return strapiProducts.map(transformProduct);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    if (categorySlug) {
      return mockProducts.filter((p) => p.categorySlug === categorySlug);
    }
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const strapiProduct = await fetchStrapiOne<StrapiProduct>(
      `/products?filters[slug][$eq]=${slug}&populate=*`
    );
    return strapiProduct ? transformProduct(strapiProduct) : null;
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  try {
    const strapiProducts = await fetchStrapi<StrapiProduct>(
      `/products?filters[featured][$eq]=true&populate=*&pagination[limit]=${limit}`
    );
    return strapiProducts.map(transformProduct);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockProducts.filter((p) => p.featured).slice(0, limit);
  }
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string, limit: number = 4): Promise<Product[]> {
  try {
    // Filter by same category and exclude current product
    const strapiProducts = await fetchStrapi<StrapiProduct>(
      `/products?filters[category][slug][$eq]=${categorySlug}&filters[slug][$ne]=${excludeSlug}&populate=*&pagination[limit]=${limit}`
    );
    return strapiProducts.map(transformProduct);
  } catch (error) {
    console.warn('Failed to fetch related products from Strapi:', error);
    return mockProducts.filter((p) => p.categorySlug === categorySlug && p.slug !== excludeSlug).slice(0, limit);
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const strapiCategories = await fetchStrapi<StrapiProductCategory>(
      `/product-categories?populate=image`
    );
    return strapiCategories.map(transformCategory);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockCategories;
  }
}

export async function getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  try {
    const strapiCategory = await fetchStrapiOne<StrapiProductCategory>(
      `/product-categories?filters[slug][$eq]=${slug}&populate=image`
    );
    return strapiCategory ? transformCategory(strapiCategory) : null;
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockCategories.find((c) => c.slug === slug) || null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  try {
    const strapiProducts = await fetchStrapi<StrapiProduct>(`/products?fields[0]=slug`);
    return strapiProducts.map((p) => p.slug);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockProducts.map((p) => p.slug);
  }
}

export async function getCategorySlugs(): Promise<string[]> {
  try {
    const strapiCategories = await fetchStrapi<StrapiProductCategory>(
      `/product-categories?fields[0]=slug`
    );
    return strapiCategories.map((c) => c.slug);
  } catch (error) {
    console.warn('Failed to fetch from Strapi, using mock data:', error);
    return mockCategories.map((c) => c.slug);
  }
}
