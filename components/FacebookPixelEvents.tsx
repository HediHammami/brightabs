// components/FacebookPixelEvents.tsx
"use client";

import React, { useEffect } from "react";
// NOTE: In a real Next.js app, you would use these hooks to detect route changes:
// import { usePathname, useSearchParams } from 'next/navigation';
import { pageView } from "@/lib/fpixel";

/**
 * Tracks 'PageView' events when the route changes.
 */
const FacebookPixelEvents: React.FC = () => {
  // --- REAL NEXT.JS IMPLEMENTATION ---
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // MOCK DATA for this environment
  const pathname: string = "mock-path";
  const searchParams: string = "mock-params";

  useEffect(() => {
    // Calls the type-safe pageView utility
    pageView();
  }, [pathname, searchParams]);

  return null;
};

export default FacebookPixelEvents;
