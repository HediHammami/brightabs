"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ShopifyImage } from "@/lib/shopify";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  const [thumbsDesktopRef, thumbsDesktopApi] = useEmblaCarousel(
    {
      axis: "y",
      containScroll: "keepSnaps",
      dragFree: true,
    },
    [WheelGesturesPlugin()]
  );

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

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  if (!hasImages) {
    return (
      <div className="aspect-square w-full rounded-lg border bg-gray-100" />
    );
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-start">
      {/* Desktop thumbs: vertical on the LEFT */}
      <div className="hidden md:block md:w-24">
        <div className="overflow-hidden lg:max-h-[450px] max-h-[300px]" ref={thumbsDesktopRef}>
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
      {/* Main carousel + arrows */}
      {/* Main carousel + arrows + tagline bar */}
      <div className="flex-1">
        {/* Relative wrapper for image + arrows */}
        <div className="relative">
          {/* Arrows centered vertically over the image */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-md hover:bg-white"
            >
              <BsChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-md hover:bg-white"
            >
              <BsChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Embla viewport */}
          <div
            className="overflow-hidden rounded-md shadow-md aspect-square w-full"
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
        </div>

        {/* Tagline bar under image, same width */}
        <div className="w-full rounded-md bg-[#E0FEFF] px-4 py-2 text-left text-sm font-bold uppercase tracking-wide text-[#002325]">
          0% Plastic. 100% Bright.
        </div>
      </div>

      {/* Mobile thumbs: horizontal UNDER main image */}
      <div className="mt-0 md:mt-3 block md:hidden">
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
