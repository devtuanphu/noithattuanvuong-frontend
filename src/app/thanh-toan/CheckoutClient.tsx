"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Truck, Building2, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          address: formData.address,
        },
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          price: item.product.salePrice || item.product.price,
          quantity: item.quantity,
        })),
        subtotal: totalPrice,
        shipping: 0, // Free shipping
        total: totalPrice,
        paymentMethod,
        note: formData.note || undefined,
      };

      // Call order API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        // Clear cart and redirect
        clearCart();
        router.push(`/dat-hang-thanh-cong?order=${result.orderNumber}`);
      } else {
        throw new Error(result.error || 'Order failed');
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại hoặc liên hệ hotline.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán
            </p>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-primary mb-4">
                  Thông tin liên hệ
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="0901 234 567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-primary mb-4">
                  Địa chỉ giao hàng
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ đầy đủ *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Ghi chú về đơn hàng, thời gian giao hàng..."
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-primary mb-4">
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-5 h-5 text-accent"
                    />
                    <Truck className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-sm text-gray-500">Thanh toán tiền mặt khi nhận được hàng</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === "bank_transfer" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={() => setPaymentMethod("bank_transfer")}
                      className="w-5 h-5 text-accent"
                    />
                    <Building2 className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-gray-500">Chuyển khoản trước, giao hàng sau</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-primary mb-4">
                  Đơn hàng của bạn
                </h2>

                {/* Items */}
                <div className="space-y-3 pb-4 border-b border-gray-100">
                  {items.map((item) => {
                    const price = item.product.salePrice || item.product.price;
                    return (
                      <div key={item.productId} className="flex justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            x{item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900 shrink-0">
                          {formatPrice(price * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-3 py-4 border-b border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-accent font-medium">Miễn phí</span>
                  </div>
                </div>

                <div className="flex justify-between py-4 text-lg font-bold">
                  <span className="text-primary">Tổng cộng</span>
                  <span className="text-accent">{formatPrice(totalPrice)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Đặt hàng
                    </>
                  )}
                </button>

                <Link
                  href="/gio-hang"
                  className="flex items-center justify-center gap-2 mt-4 text-primary hover:text-accent transition-colors"
                >
                  <ArrowLeft size={16} />
                  Quay lại giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
