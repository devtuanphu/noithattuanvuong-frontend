import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Thanh Toán | Nội Thất Tuấn Vương',
  description: 'Hoàn tất đơn hàng của bạn. Thanh toán nhanh chóng, an toàn.',
  alternates: {
    canonical: 'https://noithattuanvuong.vn/thanh-toan',
  },
  openGraph: {
    title: 'Thanh Toán | Nội Thất Tuấn Vương',
    description: 'Hoàn tất đơn hàng của bạn.',
    url: 'https://noithattuanvuong.vn/thanh-toan',
    siteName: 'Nội Thất Tuấn Vương',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Thanh Toán | Nội Thất Tuấn Vương',
    description: 'Hoàn tất đơn hàng của bạn.',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThanhToanPage() {
  return (
    <>
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-primary">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl lg:text-4xl font-bold text-white! mb-2">
                Thanh Toán
              </h1>
              <p className="text-white/80!">
                Điền thông tin để hoàn tất đơn hàng
              </p>
            </div>
          </div>
        </section>

        {/* Checkout Content */}
        <CheckoutClient />
      </>
  );
}
