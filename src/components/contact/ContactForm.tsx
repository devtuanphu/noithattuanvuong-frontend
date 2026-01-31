"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  area: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    area: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
          <Send className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">
          Gửi Yêu Cầu Thành Công!
        </h3>
        <p className="text-gray-600">
          Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại trong vòng 2 giờ.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="0901 234 567"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            Loại công trình
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white"
          >
            <option value="">Chọn loại công trình</option>
            <option value="can-ho">Căn hộ chung cư</option>
            <option value="nha-pho">Nhà phố</option>
            <option value="biet-thu">Biệt thự</option>
            <option value="van-phong">Văn phòng</option>
            <option value="khac">Khác</option>
          </select>
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
            Diện tích (m²)
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Ví dụ: 80"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung yêu cầu
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Mô tả chi tiết yêu cầu của bạn..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary text-white! font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Gửi yêu cầu tư vấn
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Bằng việc gửi form, bạn đồng ý với{" "}
        <a href="/chinh-sach-bao-mat" className="text-accent hover:underline">
          chính sách bảo mật
        </a>{" "}
        của chúng tôi.
      </p>
    </form>
  );
}
