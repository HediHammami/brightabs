"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { badges, CarouselIngredients } from "@/data/dummyData";

export default function IngredientsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 2,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 4,
      },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="bg-[#2D5B5D] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-white text-xs uppercase tracking-wider mb-2">
            NO TOOTHPASTE ON THE MARKET MET OUR STANDARDS, SO WE CREATED THE
            FIRST TOOTHPASTE TABLETS WITH
          </p>
          <h2 className="text-white text-3xl font-bold">
            Pure, Science-Backed Natural Ingredients
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative mb-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {CarouselIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex-none w-full sm:w-[50%] md:w-[33%] lg:w-[25%] pl-4"
               
                >
                  <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center text-center">
                    <div className="w-32 h-32 mb-4 flex items-center justify-center">
                      <Image
                        src={ingredient.image}
                        alt={ingredient.title}
                        className="w-full h-full object-contain"
                        width={120}
                        height={120}
                      />
                    </div>
                    <h3 className="text-base font-bold uppercase mb-3 text-[#505257] border-b-5 border-[#32999E] pb-2">
                      {ingredient.title}
                    </h3>
                    <p className="text-sm text-[#4A5565] leading-relaxed">
                      {ingredient.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Centered Below Carousel */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <BiChevronLeft className="w-6 h-6 text-teal-800" />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <BiChevronRight className="w-6 h-6 text-teal-800" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-6 gap-8 justify-items-center">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={badge.icon}
                alt={badge.text}
                className="object-cover"
                width={48}
                height={48}
              />
              <span className="text-white text-xs uppercase font-medium mt-2">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
