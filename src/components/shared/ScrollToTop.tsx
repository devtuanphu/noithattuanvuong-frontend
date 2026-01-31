"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Use useLayoutEffect for instant execution before paint
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useIsomorphicLayoutEffect(() => {
    // Skip first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Force scroll to 0 immediately - before browser paints
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}
