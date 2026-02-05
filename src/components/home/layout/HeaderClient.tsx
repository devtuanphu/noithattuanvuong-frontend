"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  Search,
  Menu, 
  X, 
  ChevronDown,
  Sofa,
  Bed,
  ChefHat,
  Bath,
  Building2,
  Home,
  Warehouse,
  Store,
  ShoppingCart
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import SearchAutocomplete from "@/components/search/SearchAutocomplete";

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

interface HeaderClientProps {
  navData: {
    designServices: { name: string; href: string }[];
    constructionServices: { name: string; href: string }[];
  };
  contactInfo: {
    phone: string;
    email: string;
  };
}

const quickCategories = [
  { name: "Phòng khách", icon: Sofa, href: "/san-pham/phong-khach" },
  { name: "Phòng ngủ", icon: Bed, href: "/san-pham/phong-ngu" },
  { name: "Phòng bếp", icon: ChefHat, href: "/san-pham/phong-bep" },
  { name: "Phòng tắm", icon: Bath, href: "/san-pham/phong-tam" },
  { name: "Căn hộ", icon: Building2, href: "/san-pham/can-ho" },
  { name: "Nhà phố", icon: Home, href: "/san-pham/nha-pho" },
  { name: "Biệt thự", icon: Warehouse, href: "/san-pham/biet-thu" },
  { name: "Showroom", icon: Store, href: "/showroom" },
];

export default function HeaderClient({ navData, contactInfo }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();

  // Build nav items with dynamic Strapi data
  const navItems: NavItem[] = [
    { name: "Trang chủ", href: "/" },
    {
      name: "Thiết Kế Nội Thất",
      href: "/thiet-ke",
      children: navData.designServices,
    },
    {
      name: "Thi Công Nội Thất",
      href: "/thi-cong",
      children: navData.constructionServices,
    },
    { name: "Dự Án", href: "/du-an" },
    { name: "Sản Phẩm", href: "/san-pham" },
    { name: "Bảng Giá", href: "/bang-gia" },
    { name: "Tin Tức", href: "/tin-tuc" },
    { name: "Video", href: "/video" },
    { name: "Liên Hệ", href: "/lien-he" },
  ];

  return (
    <>
      {/* Non-sticky Header: Top Bar + Logo */}
      <header className="bg-white">
        {/* Top Bar - Hidden on mobile */}
        <div className="hidden sm:block bg-primary text-white text-sm py-2">
          <div className="container flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-accent">
                <Phone size={14} />
                <span>{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="hidden sm:flex items-center gap-2 hover:text-accent">
                <Mail size={14} />
                <span>{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop: Logo + Search */}
        <div className="container">
          <div className="hidden lg:flex items-center justify-between border-b border-gray-100">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Nội Thất Tuấn Vương"
                width={320}
                height={112}
                className="w-[200px] h-auto"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="flex flex-1 max-w-md mx-8 justify-end">
              <SearchAutocomplete />
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Mobile Sticky Header: Menu | Logo | Cart */}
        <div className="lg:hidden container">
          <div className="flex items-center justify-between py-3">
            {/* Menu Button */}
            <button
              className="p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>

            {/* Centered Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Nội Thất Tuấn Vương"
                width={200}
                height={70}
                className="w-[140px] h-auto"
                priority
              />
            </Link>

            {/* Cart Button */}
            <Link
              href="/gio-hang"
              className="relative p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="container">
          {/* Main Navigation with Cart */}
          <nav className="hidden lg:flex items-center justify-between border-b border-gray-100">
            {/* Nav Items */}
            <ul className="flex items-center">
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 py-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors ${index === 0 ? 'pr-4' : 'px-4'}`}
                  >
                    {item.name}
                    {item.children && item.children.length > 0 && <ChevronDown size={16} />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && item.children.length > 0 && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary hover:text-white transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Cart Button - Always visible in sticky nav */}
            <Link
              href="/gio-hang"
              className="relative flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Giỏ hàng</span>
              {totalItems > 0 && (
                <span className="ml-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Quick Categories */}
          <div className="hidden lg:flex items-center justify-between py-2.5">
            {quickCategories.map((cat, index) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors whitespace-nowrap ${index === 0 ? 'pr-2' : index === quickCategories.length - 1 ? 'pl-2' : 'px-2'}`}
              >
                <cat.icon size={16} className="text-accent" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/images/logo.webp"
              alt="Nội Thất Tuấn Vương"
              width={200}
              height={70}
              className="w-[160px] h-auto"
            />
          </Link>
          <button
            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content - Scrollable */}
        <div className="h-[calc(100%-72px)] overflow-y-auto">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100">
            <form action="/tim-kiem" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Bạn đang tìm gì?"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Mobile Nav Items */}
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary hover:text-white rounded-xl font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                    {item.children && item.children.length > 0 && (
                      <ChevronDown size={16} className="opacity-50" />
                    )}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <ul className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-gray-100 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Quick Categories */}
          <div className="px-4 pb-4">
            <div className="px-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Danh mục nhanh</p>
              <div className="grid grid-cols-2 gap-2">
                {quickCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 bg-gray-50 hover:bg-primary hover:text-white rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <cat.icon size={16} className="text-accent" />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 mt-auto border-t border-gray-100 bg-gray-50">
            <a 
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
              className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              <Phone size={18} />
              <span>{contactInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
