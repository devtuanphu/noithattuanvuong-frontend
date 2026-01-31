import { Metadata } from 'next';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Giỏ Hàng | Nội Thất Tuấn Vương',
  description: 'Xem và quản lý giỏ hàng của bạn. Thanh toán nhanh chóng, tiện lợi.',
  alternates: {
    canonical: 'https://noithattuanvuong.vn/gio-hang',
  },
  openGraph: {
    title: 'Giỏ Hàng | Nội Thất Tuấn Vương',
    description: 'Xem và quản lý giỏ hàng của bạn.',
    url: 'https://noithattuanvuong.vn/gio-hang',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Giỏ Hàng | Nội Thất Tuấn Vương',
    description: 'Xem và quản lý giỏ hàng của bạn.',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GioHangPage() {
  return (
    <>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-primary">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl lg:text-4xl font-bold text-white! mb-2">
                Giỏ Hàng
              </h1>
              <p className="text-white/80!">
                Xem lại sản phẩm và tiến hành thanh toán
              </p>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <CartPageClient />
      </>
  );
}
