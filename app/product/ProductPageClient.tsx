"use client";

import { useEffect, useState } from "react";
import type { ShopifyProduct, ShopifyImage } from "@/lib/shopify";
import { ProductConfigurator } from "./ProductConfigurator";
import { ProductGallery } from "@/components/ProductGallery";
import AudioPlayer from "@/components/AudioPlayer";
import ConsumerStudyResults from "@/components/ConsumerStudyResults";
import IngredientsCarousel from "@/components/IngredientsCarousel";
import HowItWorks from "@/components/HowItWorks";
import OralCareRoutine from "@/components/OralCareRoutine";
import TimelineSection from "@/components/Timeline";
import BrightabsFAQ from "@/components/Faq";
import BrightabsTestimonials from "@/components/Testimonials";
import { PixelCustomData, trackCustomEvent } from "@/lib/fpixel";

type Step = "bundle" | "variants";

interface ProductPageClientProps {
  product: ShopifyProduct;
  imagesForGallery: ShopifyImage[];
}

export function ProductPageClient({
  product,
  imagesForGallery,
}: ProductPageClientProps) {
  const [step, setStep] = useState<Step>("bundle");

  const mainImage = product.featuredImage ?? product.images[0] ?? null;
  const fallbackImage = mainImage ?? imagesForGallery[0] ?? null;

  // =======================================================
  // 1. TRACK VIEWCONTENT ON MOUNT
  // =======================================================
  useEffect(() => {
    // Determine the product price and currency
    const priceAmount = parseFloat(product.priceRange.minVariantPrice.amount);
    const currencyCode = product.priceRange.minVariantPrice.currencyCode;
    const contentId = product.id.split("/").pop() || product.id;

    const contentData: PixelCustomData = {
      content_name: product.title,
      content_ids: [contentId],
      value: priceAmount,
      currency: currencyCode,
    };

    trackCustomEvent("ViewContent", contentData);
    console.log("Meta Pixel: ViewContent tracked on page load.");
  }, [product]);

  // =======================================================
  // 2. DEFINE INITIATE CHECKOUT HANDLER
  // This tracks the user clicking the button to leave for checkout.
  // =======================================================
  const handleInitiateCheckout = (): void => {
    const priceAmount = parseFloat(product.priceRange.minVariantPrice.amount);
    const currencyCode = product.priceRange.minVariantPrice.currencyCode;
    const contentId = product.id.split("/").pop() || product.id;

    const checkoutData: PixelCustomData = {
      content_name: product.title,
      content_ids: [contentId],
      value: priceAmount,
      currency: currencyCode,
    };

    trackCustomEvent("AddToCart", checkoutData);
    trackCustomEvent("InitiateCheckout", checkoutData);
    console.log("Meta Pixel: AddToCart and InitiateCheckout tracked.");
  };

  return (
    <>
      <div className="bg-[linear-gradient(180deg,rgba(50,153,158,0.1)_0%,rgba(50,153,158,0)_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-0 md:gap-10 px-4 py-6 md:py-10 md:flex-row">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 md:sticky md:top-24 md:self-start">
            {step === "bundle" ? (
              <>
                <ProductGallery
                  images={imagesForGallery}
                  productTitle={product.title}
                  maxThumbs={10}
                />
                <AudioPlayer />
              </>
            ) : fallbackImage ? (
              <div className="hidden md:block aspect-square overflow-hidden rounded-lg shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fallbackImage.url}
                  alt={fallbackImage.altText ?? product.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </div>

          {/* RIGHT SIDE: configurator */}
          <div className="w-full md:w-1/2">
            <ProductConfigurator
              product={product}
              onStepChange={setStep}
              onInitiateCheckout={handleInitiateCheckout}
            />
          </div>
        </div>
      </div>

      {step === "bundle" && (
        <>
          <ConsumerStudyResults />
          <IngredientsCarousel />
          <OralCareRoutine />
          <HowItWorks />
          <TimelineSection />
          <BrightabsTestimonials />
          <BrightabsFAQ />
        </>
      )}
    </>
  );
}
