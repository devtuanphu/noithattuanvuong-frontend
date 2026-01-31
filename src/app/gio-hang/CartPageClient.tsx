"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function CartPageClient() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

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
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Tiếp tục mua sắm
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.product.salePrice || item.product.price;
              const originalPrice = item.product.price;
              const hasDiscount = item.product.salePrice && item.product.salePrice < originalPrice;

              return (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl p-4 lg:p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 96px, 128px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/san-pham/chi-tiet/${item.product.slug}`}
                        className="font-semibold text-primary hover:text-accent transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.category}
                      </p>

                      {/* Price */}
                      <div className="mt-2">
                        <span className="text-lg font-bold text-accent">
                          {formatPrice(price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            {formatPrice(originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="hidden lg:block text-right">
                      <p className="text-sm text-gray-500">Thành tiền</p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-primary mb-4">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-3 pb-4 border-b border-gray-100">
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

              <Link
                href="/thanh-toan"
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white! font-semibold rounded-lg hover:bg-accent-light transition-colors"
              >
                Tiến hành thanh toán
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/san-pham"
                className="block text-center mt-4 text-primary hover:text-accent transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
