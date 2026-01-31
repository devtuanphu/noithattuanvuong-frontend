import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/home/layout/Header";
import Footer from "@/components/home/layout/Footer";
import FloatingButtons from "@/components/home/layout/FloatingButtons";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/shared/ScrollToTop";

// Open Sans: Body text, paragraphs - highly readable
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Poppins: Headings, buttons, navigation - modern & impactful
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nội Thất Tuấn Vương | Thiết Kế & Thi Công Nội Thất Uy Tín",
  description: "Công ty thiết kế và thi công nội thất chuyên nghiệp. Chuyên thiết kế nội thất căn hộ, nhà phố, biệt thự, văn phòng với phong cách hiện đại, sang trọng.",
  keywords: ["nội thất", "thiết kế nội thất", "thi công nội thất", "nội thất căn hộ", "nội thất nhà phố", "nội thất biệt thự"],
  authors: [{ name: "Nội Thất Tuấn Vương" }],
  openGraph: {
    title: "Nội Thất Tuấn Vương | Thiết Kế & Thi Công Nội Thất Uy Tín",
    description: "Công ty thiết kế và thi công nội thất chuyên nghiệp",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${openSans.variable} ${poppins.variable} antialiased`}>
        <NextTopLoader 
          color="#C9A050"
          showSpinner={false}
          height={3}
        />
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <CartProvider>
          <Header />
          <main className="relative z-0">{children}</main>
          <Footer />
          <FloatingButtons />
        </CartProvider>
      </body>
    </html>
  );
}

