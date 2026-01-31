"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowUp } from "lucide-react";
import Image from "next/image";

interface HotlineConfig {
  phone1?: string;
  phone2?: string;
  zalo1?: string;
  zalo2?: string;
}

interface FloatingButtonsClientProps {
  hotlineConfig: HotlineConfig | null;
}

export default function FloatingButtonsClient({ hotlineConfig }: FloatingButtonsClientProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Extract values with defaults
  const phone1 = hotlineConfig?.phone1 || "0901234567";
  const phone2 = hotlineConfig?.phone2 || "0901234568";
  const zalo1 = hotlineConfig?.zalo1 || "0901234567";
  const zalo2 = hotlineConfig?.zalo2 || "0901234568";

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatPhone = (phone: string) => phone.replace(/\s/g, '');

  return (
    <>
      {/* Desktop: Floating buttons on left side */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {/* Zalo 1 */}
        <a
          href={`https://zalo.me/${formatPhone(zalo1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-all overflow-hidden"
          title={zalo1}
        >
          <Image src="/Logo-Zalo-Arc.webp" alt="Zalo" width={48} height={48} />
        </a>

        {/* Zalo 2 */}
        <a
          href={`https://zalo.me/${formatPhone(zalo2)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-all overflow-hidden"
          title={zalo2}
        >
          <Image src="/Logo-Zalo-Arc.webp" alt="Zalo" width={48} height={48} />
        </a>

        {/* Phone 1 */}
        <a
          href={`tel:${formatPhone(phone1)}`}
          className="w-12 h-12 bg-[#25D366] text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-[#1da851] transition-all hover:scale-110"
          title={phone1}
        >
          <Phone size={22} />
        </a>

        {/* Phone 2 */}
        <a
          href={`tel:${formatPhone(phone2)}`}
          className="w-12 h-12 bg-[#25D366] text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-[#1da851] transition-all hover:scale-110"
          title={phone2}
        >
          <Phone size={22} />
        </a>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all hover:scale-110"
            title="Về đầu trang"
          >
            <ArrowUp size={22} />
          </button>
        )}
      </div>

      {/* Mobile: Fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around py-3 px-2">
          {/* Zalo 1 */}
          <a
            href={`https://zalo.me/${formatPhone(zalo1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <Image src="/Logo-Zalo-Arc.webp" alt="Zalo" width={40} height={40} />
          </a>

          {/* Zalo 2 */}
          <a
            href={`https://zalo.me/${formatPhone(zalo2)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <Image src="/Logo-Zalo-Arc.webp" alt="Zalo" width={40} height={40} />
          </a>

          {/* Phone 1 */}
          <a
            href={`tel:${formatPhone(phone1)}`}
            className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center"
          >
            <Phone size={20} className="text-white" />
          </a>

          {/* Phone 2 */}
          <a
            href={`tel:${formatPhone(phone2)}`}
            className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center"
          >
            <Phone size={20} className="text-white" />
          </a>
        </div>
      </div>

      {/* Mobile: Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="lg:hidden fixed left-4 bottom-20 z-40 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg"
          title="Về đầu trang"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
