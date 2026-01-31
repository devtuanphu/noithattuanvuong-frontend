import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiMedia {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
  };
}

interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  price: string;
  salePrice: string | null;
  images: StrapiMedia[] | null;
}

interface SearchResult {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string | null;
}

function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [], total: 0 });
  }

  try {
    // Use populate=* to get all relations including images
    const endpoint = `${STRAPI_URL}/api/products?filters[name][$containsi]=${encodeURIComponent(query)}&populate=*&pagination[pageSize]=5&sort=name:asc`;
    
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Strapi search failed:', response.status);
      return NextResponse.json({ products: [], total: 0 });
    }

    const data = await response.json();
    const strapiProducts: StrapiProduct[] = data.data || [];
    const total = data.meta?.pagination?.total || 0;

    // Transform to simplified format
    const products: SearchResult[] = strapiProducts.map((product) => {
      let imageUrl: string | null = null;
      
      if (product.images && product.images.length > 0) {
        const img = product.images[0];
        // Prefer thumbnail for performance, fallback to main url
        const thumbnailUrl = img.formats?.thumbnail?.url || img.formats?.small?.url || img.url;
        imageUrl = getStrapiMediaUrl(thumbnailUrl);
      }

      return {
        id: product.id,
        documentId: product.documentId,
        name: product.name,
        slug: product.slug,
        price: Number(product.price) || 0,
        salePrice: product.salePrice ? Number(product.salePrice) : null,
        image: imageUrl,
      };
    });

    return NextResponse.json({ products, total });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ products: [], total: 0 });
  }
}

