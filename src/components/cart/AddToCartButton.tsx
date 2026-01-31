"use client";

import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!product.inStock || isAdding) return;
    
    setIsAdding(true);
    
    // Short delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Add to cart context
    addItem(product, 1);
    
    setIsAdding(false);
    setAdded(true);

    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.inStock) {
    return (
      <button
        disabled
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
      >
        <ShoppingCart size={18} />
        Hết hàng
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${
        added 
          ? 'bg-green-500 text-white!' 
          : 'bg-accent text-white! hover:bg-accent-light'
      } disabled:opacity-70`}
    >
      {isAdding ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Đang thêm...
        </>
      ) : added ? (
        <>
          <Check size={18} />
          Đã thêm vào giỏ
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          Thêm vào giỏ hàng
        </>
      )}
    </button>
  );
}
