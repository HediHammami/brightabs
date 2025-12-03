import Image from "next/image";
import React, { JSX } from "react";
import { HiOutlineSparkles } from "react-icons/hi";

interface BenefitItem {
  icon: string;
  title: string;
}

const BENEFITS_DATA: BenefitItem[] = [
  {
    icon: "/images/product-icons/1.png",
    title: "PLAQUE REDUCTION & GUM HEALTH",
  },
  {
    icon: "/images/product-icons/2.png",
    title: "BRIGHTENS & WHITENS TEETH",
  },
  {
    icon: "/images/product-icons/3.png",
    title: "LONG-LASTING FRESH BREATH",
  },
];

const BenefitColumn: React.FC<BenefitItem> = ({ icon: imagePath, title }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="mb-4">
      <Image
        src={imagePath}
        alt={title}
        className="object-contain"
        width={32}
        height={32}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src =
            "https://placehold.co/80x80/CCCCCC/666666?text=X";
        }}
      />
    </div>

    <h3 className="text-xs font-semibold tracking-wide uppercase text-[#3A4C4C]">
      {title}
    </h3>
  </div>
);

/**
 * Main component for the Visible Results Block.
 */
export default function BenefitsBlock(): JSX.Element {
  return (
    <div className="py-4 md:py-5">
      <div className="w-full">
        {/* Top Separator Line */}
        <div className="border-t border-[#32999E]"></div>

        {/* Title and Sparkles */}
        <div className="flex justify-center items-center py-2.5">
          <p className="text-xs font-extrabold tracking-widest uppercase text-[#32999E]">
            VISIBLE RESULTS IN 4 WEEKS
          </p>
          {/* Sparkles icon placeholder */}
          <HiOutlineSparkles className="w-4 h-4 text-[#32999E]" />
        </div>

        {/* Bottom Separator Line */}
        <div className="border-t border-[#32999E]"></div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 mt-3">
          {BENEFITS_DATA.map((item, index) => (
            <BenefitColumn key={index} icon={item.icon} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
