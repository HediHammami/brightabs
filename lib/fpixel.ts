// lib/fpixel.ts

// 1. Define the interface for standard and custom event data payload
export interface PixelCustomData {
  // Standard properties often used for e-commerce/conversions
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  // Allows for other custom data properties not explicitly listed
  [key: string]: string | number | string[] | undefined;
}

// 2. Define the global fbq function interface to avoid 'any'
interface FBQ {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
}

// 3. Extend the global Window object
declare global {
  interface Window {
    fbq?: FBQ;
    _fbq?: FBQ;
  }
}

const FB_PIXEL_ID: string | undefined =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

/**
 * Tracks a standard PageView event.
 * NOTE: For initial page load, this is now handled directly in app/layout.tsx.
 */
export const pageView = (): void => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    // fbq('track', 'PageView')
    window.fbq("track", "PageView");
    console.log("[Pixel] Tracked PageView");
  }
};

/**
 * Tracks a custom event (e.g., ViewContent, AddToCart, Purchase).
 * @param eventName The name of the event.
 * @param data Optional data object for the event, conforming to PixelCustomData.
 */
export const trackCustomEvent = (
  eventName: string,
  data: PixelCustomData = {}
): void => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    // fbq('track', 'CustomEventName', { ...data })
    window.fbq("track", eventName, data);
    console.log(`[Pixel] Tracked Custom Event: ${eventName}`, data);
  }
};
