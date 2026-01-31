import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Home, ShoppingBag, Phone, Mail } from 'lucide-react';
import { getGlobalConfig } from '@/lib/server/pages';

export const metadata: Metadata = {
  title: 'Đặt Hàng Thành Công | Nội Thất Tuấn Vương',
  description: 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.',
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function DatHangThanhCongPage({ searchParams }: Props) {
  const [{ order }, globalConfig] = await Promise.all([
    searchParams,
    getGlobalConfig(),
  ]);
  const orderNumber = order || 'NTTV-XXXXXX';
  const phone = globalConfig?.phone || '0901 234 567';
  const email = globalConfig?.email || 'info@noithattuanvuong.vn';

  return (
    <>
        {/* Success Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success Icon */}
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              {/* Success Message */}
              <h1 className="text-2xl lg:text-4xl font-bold text-primary mb-4">
                Đặt Hàng Thành Công!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Cảm ơn bạn đã đặt hàng tại Nội Thất Tuấn Vương. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
              </p>

              {/* Order Number */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-500 mb-2">Mã đơn hàng của bạn</p>
                <p className="text-2xl font-bold text-accent">{orderNumber}</p>
              </div>

              {/* What's Next */}
              <div className="bg-primary/5 rounded-xl p-6 mb-8 text-left">
                <h2 className="font-bold text-primary mb-4">Bước tiếp theo:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent text-white! rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                    <span className="text-gray-700">Nhân viên sẽ gọi điện xác nhận đơn hàng trong vòng 24 giờ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent text-white! rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                    <span className="text-gray-700">Xác nhận phương thức thanh toán và thời gian giao hàng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent text-white! rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                    <span className="text-gray-700">Chuẩn bị hàng và giao đến địa chỉ của bạn</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-500 mb-4">Nếu có thắc mắc, vui lòng liên hệ:</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-primary hover:text-accent">
                    <Phone size={18} />
                    <span>{phone}</span>
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 text-primary hover:text-accent">
                    <Mail size={18} />
                    <span>{email}</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Home size={18} />
                  Về trang chủ
                </Link>
                <Link
                  href="/san-pham"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white! transition-colors"
                >
                  <ShoppingBag size={18} />
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}

