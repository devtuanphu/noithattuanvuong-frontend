"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface ProjectType {
  value: string;
  label: string;
}

interface CTABannerFormProps {
  projectTypes: ProjectType[];
  buttonText: string;
  pricingFileUrl?: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export default function CTABannerForm({ 
  projectTypes, 
  buttonText, 
  pricingFileUrl 
}: CTABannerFormProps) {
  const [formData, setFormData] = useState({
    hoTen: "",
    soDienThoai: "",
    loaiDuAn: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.hoTen.trim() || !formData.soDienThoai.trim()) {
      setError("Vui lòng điền đầy đủ họ tên và số điện thoại");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form data to Strapi
      const response = await fetch(`${STRAPI_URL}/api/yeu-cau-bao-gias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            hoTen: formData.hoTen,
            soDienThoai: formData.soDienThoai,
            loaiDuAn: formData.loaiDuAn || null,
            nguonYeuCau: "homepage-cta",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi thông tin. Vui lòng thử lại.");
      }

      setSuccess(true);

      // Download the pricing file
      if (pricingFileUrl) {
        const fileUrl = pricingFileUrl.startsWith('http') 
          ? pricingFileUrl 
          : `${STRAPI_URL}${pricingFileUrl}`;
        
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'bang-gia-thiet-ke.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Reset form after success
      setFormData({ hoTen: "", soDienThoai: "", loaiDuAn: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Họ tên của bạn *"
        value={formData.hoTen}
        onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
        className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white! placeholder-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all lg:min-w-[300px]"
        disabled={isSubmitting}
      />
      <input
        type="tel"
        placeholder="Số điện thoại *"
        value={formData.soDienThoai}
        onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
        className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white! placeholder-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        disabled={isSubmitting}
      />
      <select 
        value={formData.loaiDuAn}
        onChange={(e) => setFormData({ ...formData, loaiDuAn: e.target.value })}
        className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white/70! focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
        disabled={isSubmitting}
      >
        <option value="">Loại dự án</option>
        {projectTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      {success && (
        <p className="text-green-400 text-sm text-center">
          ✓ Đã gửi thành công! File bảng giá đang được tải xuống...
        </p>
      )}

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-linear-to-r from-accent to-accent-light text-white! font-bold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Download size={20} />
            {buttonText}
          </>
        )}
      </button>
    </form>
  );
}
