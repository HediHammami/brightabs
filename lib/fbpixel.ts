// lib/fbpixel.ts

type PixelEventName =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase";

// Content item for e-commerce events
export interface PixelContent {
  id: string;
  quantity?: number;
  item_price?: number;
}

// Base parameters for most e-commerce events
export interface PixelEventParams {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string; // e.g. "product" or "product_group"
  contents?: PixelContent[];
}

// Arguments allowed for raw fbq
type FbqArgument = string | number | boolean | PixelEventParams;

// fbq function type
export type FbqFunction = (...args: FbqArgument[]) => void;

// Pixel ID
export const FB_PIXEL_ID: string =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "";

// Runtime-safe raw wrapper
export const fbq: FbqFunction = (...args: FbqArgument[]): void => {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;

  window.fbq(...args);
};

// Typed helpers for common events
export const trackPageView = (): void => {
  fbq("track", "PageView");
};

export const trackViewContent = (params: PixelEventParams): void => {
  fbq("track", "ViewContent", params);
};

export const trackAddToCart = (params: PixelEventParams): void => {
  fbq("track", "AddToCart", params);
};

export const trackInitiateCheckout = (params: PixelEventParams): void => {
  fbq("track", "InitiateCheckout", params);
};

export const trackPurchase = (params: PixelEventParams): void => {
  fbq("track", "Purchase", params);
};

// Extend window for TypeScript
declare global {
  interface Window {
    fbq: FbqFunction;
  }
}

// Keep file as a module
export {};
