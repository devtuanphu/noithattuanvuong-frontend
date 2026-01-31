// Service Types (Thiết kế / Thi công)
export interface Service {
  id: string;
  slug: string;
  title: string;
  type: 'thiet-ke' | 'thi-cong';
  shortDescription: string;
  description: string;
  content: string;
  image: string;
  gallery: string[];
  features: string[];
  price?: string;
  createdAt: string;
}

// Project Types
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'can-ho' | 'nha-pho' | 'biet-thu' | 'van-phong' | 'showroom';
  categoryName: string;
  shortDescription: string;
  description: string;
  content: string;
  image: string;
  gallery: string[];
  area: string;
  location: string;
  style: string;
  completedAt: string;
  createdAt: string;
}

// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  description: string;
  content: string;
  images: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
}

// News/Blog Types
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  createdAt: string;
}

// Video Types
export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  youtubeId?: string;
  duration: string;
  category: string;
  publishedAt: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

// Cart Types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}
