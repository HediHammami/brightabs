"use client";

import { useState } from "react";
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

  return (
    <>
      <div className="bg-[linear-gradient(180deg,rgba(50,153,158,0.1)_0%,rgba(50,153,158,0)_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 md:flex-row">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2">
            {step === "bundle" ? (
              <ProductGallery
                images={imagesForGallery}
                productTitle={product.title}
                maxThumbs={5}
              />
            ) : fallbackImage ? (
              <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fallbackImage.url}
                  alt={fallbackImage.altText ?? product.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            <AudioPlayer />
          </div>

          {/* RIGHT SIDE: configurator */}
          <div className="w-full md:w-1/2">
            <ProductConfigurator product={product} onStepChange={setStep} />
          </div>
        </div>
      </div>

      <ConsumerStudyResults />
      <IngredientsCarousel />
      <OralCareRoutine />
      <HowItWorks />
      <TimelineSection />
      <BrightabsTestimonials />
      <BrightabsFAQ />
    </>
  );
}
