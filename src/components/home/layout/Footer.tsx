import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Youtube, 
  Instagram,
  Send,
  Clock
} from "lucide-react";
import { getGlobalConfig } from "@/lib/server/pages";

// Default footer links - used as fallback if CMS data not available
const defaultFooterLinks = {
  services: [
    { name: "Thiết kế nội thất", href: "/thiet-ke" },
    { name: "Thi công nội thất", href: "/thi-cong" },
    { name: "Sản xuất nội thất", href: "/san-xuat" },
    { name: "Tư vấn phong thủy", href: "/phong-thuy" },
  ],
  support: [
    { name: "Quy trình làm việc", href: "/quy-trinh" },
    { name: "Chính sách bảo hành", href: "/bao-hanh" },
    { name: "Hình thức thanh toán", href: "/thanh-toan" },
    { name: "Vận chuyển - Giao nhận", href: "/van-chuyen" },
  ],
};

const iconMap: Record<string, React.ElementType> = {
  Facebook,
  Youtube,
  Instagram,
};

export default async function Footer() {
  const globalConfig = await getGlobalConfig();

  // Get contact info from CMS
  const address = globalConfig?.address || "123 Nguyễn Văn Linh, Q.7, TP.HCM";
  const phone = globalConfig?.phone || "0901 234 567";
  const email = globalConfig?.email || "info@tuanvuong.vn";
  const workingHours = globalConfig?.workingHours || "8:00 - 18:00 (T2 - T7)";
  const footerDescription = globalConfig?.footerDescription || 
    "Đơn vị thiết kế và thi công nội thất uy tín với hơn 10 năm kinh nghiệm trong ngành.";
  const copyrightText = globalConfig?.copyrightText || 
    `© ${new Date().getFullYear()} Nội Thất Tuấn Vương. Bảo lưu mọi quyền.`;

  // Get footer links from CMS or use defaults
  const footerServices = globalConfig?.footerServices || defaultFooterLinks.services;
  const footerSupport = globalConfig?.footerSupport || defaultFooterLinks.support;

  // Get social links from CMS
  const socialLinks = globalConfig?.socialLinks || [];

  return (
    <footer className="bg-slate-900 pt-16 pb-24 lg:pb-8">
      {/* Main Footer */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Nội Thất Tuấn Vương"
                width={240}
                height={96}
                className="h-24 w-auto"
              />
            </div>
            
            <p className="text-white! text-sm leading-relaxed mb-6">
              {footerDescription}
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white!">
                <MapPin size={18} className="shrink-0 mt-0.5 text-white!" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3 text-white!">
                <Phone size={18} className="shrink-0 text-white!" />
                <span className="font-semibold">{phone}</span>
              </li>
              <li className="flex items-center gap-3 text-white!">
                <Mail size={18} className="shrink-0 text-white!" />
                <span>{email}</span>
              </li>
              <li className="flex items-center gap-3 text-white!">
                <Clock size={18} className="shrink-0 text-white!" />
                <span>{workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white! font-bold mb-5 text-lg border-b-2 border-amber-500 pb-2 inline-block">
              Dịch vụ
            </h4>
            <ul className="space-y-3 text-sm">
              {footerServices.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white! hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white! font-bold mb-5 text-lg border-b-2 border-amber-500 pb-2 inline-block">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-3 text-sm">
              {footerSupport.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white! hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white! font-bold mb-5 text-lg border-b-2 border-amber-500 pb-2 inline-block">
              Đăng ký tư vấn
            </h4>
            <p className="text-white! text-sm mb-4">
              Nhận báo giá và tư vấn miễn phí từ chuyên gia
            </p>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Họ tên *"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/30 text-white! placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <input
                type="tel"
                placeholder="Số điện thoại *"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/30 text-white! placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                GỬI NGAY
              </button>
            </form>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.length > 0 ? (
                socialLinks.map((social, index) => {
                  const IconComponent = iconMap[social.name] || Facebook;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white! hover:bg-blue-600 transition-all"
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })
              ) : (
                <>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white! hover:bg-blue-600 transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white! hover:bg-red-600 transition-all"
                    aria-label="Youtube"
                  >
                    <Youtube size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white! hover:bg-pink-600 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white!">
              {copyrightText}
            </p>
            <div className="flex gap-6 text-white!">
              <Link href="/chinh-sach-bao-mat" className="hover:text-amber-500 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/dieu-khoan-su-dung" className="hover:text-amber-500 transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
