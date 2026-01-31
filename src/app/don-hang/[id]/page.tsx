import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Phone, Mail } from 'lucide-react';
import { getOrderById, formatOrderStatus, getOrderStatusColor } from '@/lib/server/orders';
import { getGlobalConfig } from '@/lib/server/pages';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Đơn hàng ${id} | Nội Thất Tuấn Vương`,
    description: 'Xem chi tiết đơn hàng của bạn.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DonHangDetailPage({ params }: Props) {
  const { id } = await params;
  const [order, globalConfig] = await Promise.all([
    getOrderById(id),
    getGlobalConfig(),
  ]);

  if (!order) {
    notFound();
  }

  const phone = globalConfig?.phone || '0901 234 567';
  const email = globalConfig?.email || 'info@noithattuanvuong.vn';

  const statusSteps = [
    { key: "pending", label: "Chờ xác nhận", icon: Clock },
    { key: "confirmed", label: "Đã xác nhận", icon: CheckCircle },
    { key: "processing", label: "Đang xử lý", icon: Package },
    { key: "shipped", label: "Đang giao", icon: Truck },
    { key: "delivered", label: "Đã giao", icon: CheckCircle },
  ];

  const currentStepIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-primary">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl lg:text-4xl font-bold text-white! mb-2">
                Chi Tiết Đơn Hàng
              </h1>
              <p className="text-white/80!">
                Mã đơn hàng: <span className="font-semibold">{order.orderNumber}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Order Detail */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Progress */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-primary mb-6">Trạng thái đơn hàng</h2>
                  
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="flex-1 relative">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted ? "bg-accent text-white!" : "bg-gray-200 text-gray-400"
                            } ${isCurrent ? "ring-4 ring-accent/20" : ""}`}>
                              <Icon size={18} />
                            </div>
                            <p className={`text-xs mt-2 text-center ${
                              isCompleted ? "text-accent font-medium" : "text-gray-400"
                            }`}>
                              {step.label}
                            </p>
                          </div>
                          {index < statusSteps.length - 1 && (
                            <div className={`absolute top-5 left-[50%] w-full h-0.5 ${
                              index < currentStepIndex ? "bg-accent" : "bg-gray-200"
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-primary mb-4">Sản phẩm đã đặt</h2>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                          {item.productImage ? (
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-primary mb-4">Thông tin giao hàng</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Người nhận</span>
                      <span className="font-medium text-gray-900">{order.customer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số điện thoại</span>
                      <span className="font-medium text-gray-900">{order.customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium text-gray-900">{order.customer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Địa chỉ</span>
                      <span className="font-medium text-gray-900 text-right max-w-[60%]">
                        {order.customer.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-bold text-primary mb-4">Tóm tắt đơn hàng</h2>

                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}>
                      {formatOrderStatus(order.status)}
                    </span>
                  </div>

                  <div className="space-y-3 pb-4 border-b border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Mã đơn hàng</span>
                      <span className="font-medium">{order.orderNumber}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ngày đặt</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 py-4 border-b border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển</span>
                      <span>{order.shipping === 0 ? "Miễn phí" : formatPrice(order.shipping)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-4 text-lg font-bold">
                    <span className="text-primary">Tổng cộng</span>
                    <span className="text-accent">{formatPrice(order.total)}</span>
                  </div>

                  {/* Contact */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">Cần hỗ trợ?</p>
                    <div className="space-y-2">
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-primary hover:text-accent">
                        <Phone size={14} />
                        <span>{phone}</span>
                      </a>
                      <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-primary hover:text-accent">
                        <Mail size={14} />
                        <span>{email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                <ArrowLeft size={18} />
                Về trang chủ
              </Link>
            </div>
          </div>
        </section>
      </>
  );
}
