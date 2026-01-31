"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeImage = useCallback((newIndex: number) => {
    if (newIndex === activeIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  }, [activeIndex, isTransitioning]);
  
  // Fallback if no images
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <Package className="w-24 h-24 text-gray-300" />
      </div>
    );
  }

  const goToPrevious = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    changeImage(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    changeImage(newIndex);
  };

  return (
    <div className="space-y-4 overflow-hidden max-w-full">
      {/* Main Image with Navigation */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - ${activeIndex + 1}`}
          fill
          className={`object-cover transition-all duration-300 ease-in-out ${
            isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          priority
        />
        
        {/* Navigation Arrows - always visible on mobile, hover on desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Gallery - Horizontal Scroll */}
      {images.length > 1 && (
        <div className="overflow-x-auto pb-2 -mx-1 scroll-smooth">
          <div className="flex gap-2 px-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                className={`w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative transition-all duration-200 ${
                  index === activeIndex 
                    ? "ring-2 ring-primary ring-offset-2 scale-105" 
                    : "hover:ring-2 ring-gray-300 hover:scale-105"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

