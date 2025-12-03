"use client";
import { FAQ_DATA } from "@/data/dummyData";
import { FAQItemProps } from "@/types/types";
import Image from "next/image";
import React, { JSX, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

/**
 * Renders a single, clickable FAQ item (Accordion Header and Content).
 */
const FAQItemComponent: React.FC<FAQItemProps> = ({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  const isList = Array.isArray(answer);

  return (
    <>
      <button
        onClick={() => onToggle(id)}
        className="flex justify-between items-start w-full py-4 text-left font-semibold text-white transition duration-300 hover:text-teal-200 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
      >
        <span>{question}</span>
        <div className="shrink-0 ml-4 p-0.5 rounded-full border border-white/50">
          {isOpen ? (
            <BiMinus className="w-4 h-4 transition-transform duration-300" />
          ) : (
            <BiPlus className="w-4 h-4 transition-transform duration-300" />
          )}
        </div>
      </button>

      <div
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm text-teal-100/90 leading-relaxed pr-8">
          {isList ? (
            (answer as string[]).map((paragraph, index) => (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{answer as string}</p>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * Main component rendering the two-column FAQ section.
 */
export default function BrightabsFAQ(): JSX.Element {
  const [openId, setOpenId] = useState<number | null>(FAQ_DATA[0].id);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#32999e] p-8 md:p-12 lg:p-16 flex flex-col justify-start">
          <h1 className="text-3xl lg:text-5xl font-light text-[#5AC7CD] mb-10 tracking-tight">
            FAQs
          </h1>

          <div className="space-y-0 divide-y divide-teal-500/50">
            {FAQ_DATA.map((item) => (
              <FAQItemComponent
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        <div className="relative aspect-square md:aspect-auto">
          <Image
            src="/images/faq.png"
            alt="A woman holding the BRIGHTABS Toothpaste Tablets pouch in a bathroom."
            className="w-full h-full object-cover"
            width={720}
            height={820}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "/images/faq.png";
            }}
          />
          <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply"></div>
        </div>
      </div>
    </div>
  );
}
