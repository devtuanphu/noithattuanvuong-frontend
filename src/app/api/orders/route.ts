import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface CreateOrderRequest {
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'bank_transfer';
  note?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();

    // Validate required fields
    if (!body.customer.name || !body.customer.phone || !body.customer.address) {
      return NextResponse.json(
        { success: false, error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `NTTV-${Date.now()}`;

    // Create order in Strapi
    const strapiOrderData = {
      data: {
        orderNumber,
        customerName: body.customer.name,
        customerPhone: body.customer.phone,
        customerEmail: body.customer.email || null,
        customerAddress: body.customer.address,
        items: body.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: body.subtotal,
        shipping: body.shipping,
        total: body.total,
        paymentMethod: body.paymentMethod,
        note: body.note || null,
        status: 'pending',
      },
    };



    const response = await fetch(`${STRAPI_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      body: JSON.stringify(strapiOrderData),
    });

    const responseText = await response.text();
  
    if (!response.ok) {
      console.error('Strapi order creation failed:', responseText);
      return NextResponse.json(
        { success: false, error: `Failed to create order: ${responseText}` },
        { status: 500 }
      );
    }

    const data = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: data.data?.id || data.data?.documentId,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
