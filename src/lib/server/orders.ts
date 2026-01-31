import { Order, OrderItem } from "@/types";
import { postStrapi, fetchStrapi, fetchStrapiOne } from "../strapi";

// Strapi types
interface StrapiOrderItem {
  id: number;
  productId: string;
  productName: string;
  productImage: string;
  price: string;
  quantity: number;
}

interface StrapiOrder {
  id: number;
  documentId: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: StrapiOrderItem[];
  subtotal: string;
  shipping: string;
  total: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

function transformOrder(strapiOrder: StrapiOrder): Order {
  return {
    id: strapiOrder.documentId,
    orderNumber: strapiOrder.orderNumber,
    status: strapiOrder.status,
    items: strapiOrder.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      price: Number(item.price),
      quantity: item.quantity,
    })),
    subtotal: Number(strapiOrder.subtotal),
    shipping: Number(strapiOrder.shipping),
    total: Number(strapiOrder.total),
    customer: {
      name: strapiOrder.customerName,
      email: strapiOrder.customerEmail,
      phone: strapiOrder.customerPhone,
      address: strapiOrder.customerAddress,
    },
    note: strapiOrder.note || undefined,
    createdAt: strapiOrder.createdAt,
    updatedAt: strapiOrder.updatedAt,
  };
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const strapiOrder = await fetchStrapiOne<StrapiOrder>(
      `/orders?filters[$or][0][documentId][$eq]=${id}&filters[$or][1][orderNumber][$eq]=${id}&populate=items`
    );
    return strapiOrder ? transformOrder(strapiOrder) : null;
  } catch (error) {
    console.warn('Failed to fetch order from Strapi:', error);
    return null;
  }
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  try {
    const strapiOrder = await fetchStrapiOne<StrapiOrder>(
      `/orders?filters[orderNumber][$eq]=${orderNumber}&populate=items`
    );
    return strapiOrder ? transformOrder(strapiOrder) : null;
  } catch (error) {
    console.warn('Failed to fetch order from Strapi:', error);
    return null;
  }
}

export async function createOrder(orderData: {
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  note?: string;
}): Promise<Order> {
  const now = new Date();
  const orderNumber = `NTTV-${now.toISOString().split("T")[0].replace(/-/g, "")}-${String(Date.now()).slice(-4)}`;

  try {
    const strapiOrder = await postStrapi<{
      orderNumber: string;
      status: string;
      items: { productId: string; productName: string; productImage: string; price: number; quantity: number }[];
      subtotal: number;
      shipping: number;
      total: number;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      customerAddress: string;
      note: string | null;
    }, StrapiOrder>('/orders', {
      orderNumber,
      status: 'pending',
      items: orderData.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      customerName: orderData.customer.name,
      customerEmail: orderData.customer.email,
      customerPhone: orderData.customer.phone,
      customerAddress: orderData.customer.address,
      note: orderData.note || null,
    });

    return transformOrder(strapiOrder);
  } catch (error) {
    console.error('Failed to create order in Strapi:', error);
    // Fallback: return mock order for development
    const mockOrder: Order = {
      id: `mock-${Date.now()}`,
      orderNumber,
      status: 'pending',
      ...orderData,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
    return mockOrder;
  }
}

export function formatOrderStatus(status: Order["status"]): string {
  const statusMap: Record<Order["status"], string> = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    processing: "Đang xử lý",
    shipped: "Đang giao hàng",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
  };
  return statusMap[status];
}

export function getOrderStatusColor(status: Order["status"]): string {
  const colorMap: Record<Order["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colorMap[status];
}

export async function getOrders(): Promise<Order[]> {
  try {
    const strapiOrders = await fetchStrapi<StrapiOrder>(
      `/orders?populate=items&sort=createdAt:desc`
    );
    return strapiOrders.map(transformOrder);
  } catch (error) {
    console.warn('Failed to fetch orders from Strapi:', error);
    return [];
  }
}
