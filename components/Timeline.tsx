"use client";
import Image from "next/image";
import React, { JSX } from "react";
import { BiCheckCircle } from "react-icons/bi";

interface TimelineItemData {
  month: string;
  title: string;
  details: string[];
}

interface TimelineItemProps extends TimelineItemData {
  isLast: boolean;
}

const TIMELINE_DATA: TimelineItemData[] = [
  {
    month: "Month 1–2",
    title: "THE CLEAN START",
    details: [
      "Your mouth starts adjusting to clean, natural ingredients, free from harsh chemicals and artificial foaming agents.",
      "You'll notice a consistently fresh, clean feeling after each brush.",
      "Early signs of reduced plaque buildup and less gum irritation.",
    ],
  },
  {
    month: "Month 3–4",
    title: "STRENGTH IN EVERY BRUSH",
    details: [
      "Mineral-rich ingredients help support enamel remineralization.",
      "Gums feel less sensitive and more resilient.",
      "Breath stays fresher for longer throughout the day.",
    ],
  },
  {
    month: "Month 5–6",
    title: "WHITER, BRIGHTER SMILE",
    details: [
      "Surface stains from coffee, tea, or wine start to fade thanks to gentle, plant-based polishing agents.",
      "Teeth appear naturally whiter without harsh bleaching.",
      "Your mouth feels balanced and fresh — no dryness, no irritation.",
    ],
  },
  {
    month: "Month 7–8",
    title: "LONG-TERM PROTECTION & REPAIR",
    details: [
      "Ongoing use supports tissue repair and gum regeneration.",
      "Enamel stays strong and protected from daily wear.",
      "Oral microbiome stays balanced for sustained health and freshness.",
    ],
  },
];

/**
 * Renders a single timeline item with the marker structure.
 * The vertical line is drawn in the parent component for continuity.
 * @param {TimelineItemProps} props -
 */
const TimelineItem: React.FC<TimelineItemProps> = ({
  month,
  title,
  details,
}) => {
  const primaryColor = "bg-[#32999E]";
  const dotColor = "bg-white border-2 border-[#E9F8FE]";

  return (
    <div className="relative pt-4 pb-8">
      <div
        className={`absolute left-0 top-4 h-4 w-4 rounded-full ${dotColor} flex items-center justify-center z-10 shadow-md`}
      >
        <div className={`h-2 w-2 rounded-full ${primaryColor}`} />
      </div>

      <div className="ml-8">
        <span
          className={`inline-block px-4 py-3 mb-2 text-xs font-semibold text-white ${primaryColor} rounded-full`}
        >
          {month}
        </span>

        <h3 className="text-xl font-bold text-[#32999E] mb-3">{title}</h3>

        <ul className="list-none space-y-2 text-gray-600 text-sm">
          {details.map((detail: string, index: number) => (
            <li key={index} className="flex items-start">
              <BiCheckCircle className="shrink-0 w-4 h-4 mt-1 mr-2 text-[#4A5565]" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function BrightabsTimeline(): JSX.Element {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center px-4 mb-12 md:mb-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#101828] leading-tight mb-2">
          What To Expect With Consistent Use of BRIGHTABS
        </h1>
        <p className="text-lg md:text-xl font-semibold text-[#101828]">
          The #1 Rated Toothpaste Tablets
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative max-w-lg">
            <div
              className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-[#E9F8FE]"
              style={{ top: "1.5rem", bottom: "1rem" }}
            ></div>

            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem
                key={item.month}
                month={item.month}
                title={item.title}
                details={item.details}
                isLast={index === TIMELINE_DATA.length - 1}
              />
            ))}
          </div>

          {/* Right Column: Image/Video - Made sticky */}
          <div className="flex flex-col">
            <div className="md:sticky md:top-12 self-start w-full">
              <div className="overflow-hidden rounded-xl shadow-2xl aspect-square md:aspect-4/5 bg-gray-100">
                <Image
                  src="/images/gifs/timeline-gif.gif"
                  alt="A woman using Brightabs toothpaste tablets, illustrating the product experience."
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  width={440}
                  height={440}
                  unoptimized={true}
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      "/images/gifs/timeline-gif.gif";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:h-40"></div>
      </div>
    </div>
  );
}
