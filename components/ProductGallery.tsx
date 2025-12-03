"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ShopifyImage } from "@/lib/shopify";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  maxThumbs?: number;
}

export function ProductGallery({
  images,
  productTitle,
  maxThumbs,
}: ProductGalleryProps) {
  const hasImages = images && images.length > 0;
  const galleryImages = hasImages ? images : [];
  const thumbsImages =
    typeof maxThumbs === "number"
      ? galleryImages.slice(0, maxThumbs)
      : galleryImages;

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Main carousel (horizontal)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Desktop thumbs (vertical, left)
  const [thumbsDesktopRef, thumbsDesktopApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Mobile thumbs (horizontal, below)
  const [thumbsMobileRef, thumbsMobileApi] = useEmblaCarousel({
    axis: "x",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);

    // keep both thumbs carousels in sync
    if (thumbsDesktopApi) thumbsDesktopApi.scrollTo(index);
    if (thumbsMobileApi) thumbsMobileApi.scrollTo(index);
  }, [emblaApi, thumbsDesktopApi, thumbsMobileApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off?.("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  if (!hasImages) {
    return (
      <div className="aspect-square w-full rounded-lg border bg-gray-100" />
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      {/* Desktop thumbs: vertical on the LEFT */}
      <div className="hidden md:block md:w-24">
        <div className="overflow-hidden max-h-[480px]" ref={thumbsDesktopRef}>
          <div className="flex flex-col gap-2">
            {thumbsImages.map((image, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={image.id ?? index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={[
                    "relative aspect-square w-full overflow-hidden rounded-md transition",
                    isActive ? "opacity-100" : "opacity-40",
                  ].join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.altText ?? productTitle}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main carousel */}
      <div
        className="overflow-hidden rounded-md shadow-md aspect-square flex-1"
        ref={emblaRef}
      >
        <div className="flex">
          {galleryImages.map((image, index) => (
            <div
              className="min-w-0 shrink-0 grow-0 basis-full"
              key={image.id ?? index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.altText ?? productTitle}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile thumbs: horizontal UNDER main image */}
      <div className="mt-3 block md:hidden">
        <div className="overflow-hidden" ref={thumbsMobileRef}>
          <div className="flex gap-2">
            {thumbsImages.map((image, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={image.id ?? index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={[
                    "relative aspect-square w-20 overflow-hidden rounded-md transition",
                    isActive ? "opacity-100" : "opacity-40",
                  ].join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.altText ?? productTitle}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
