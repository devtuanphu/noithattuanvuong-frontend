"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Loader2, Package } from "lucide-react";

interface SearchResult {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string | null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export default function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data.products || []);
        setTotalResults(data.total || 0);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, router]);

  const handleSuggestionClick = useCallback(() => {
    setShowDropdown(false);
    setQuery("");
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowDropdown(true)}
          placeholder="Bạn đang tìm gì?"
          className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && (query.length >= 2) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-100">
          {suggestions.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-50">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/san-pham/chi-tiet/${product.slug}`}
                      onClick={handleSuggestionClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Package className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {product.salePrice ? (
                            <>
                              <span className="text-sm font-semibold text-accent">
                                {formatPrice(product.salePrice)}
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-primary">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* View All Results */}
              {totalResults > 5 && (
                <Link
                  href={`/tim-kiem?q=${encodeURIComponent(query)}`}
                  onClick={handleSuggestionClick}
                  className="block px-4 py-3 text-sm text-center text-primary font-medium bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100"
                >
                  Xem tất cả {totalResults} kết quả →
                </Link>
              )}
            </>
          ) : !isLoading ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              Không tìm thấy sản phẩm nào
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
