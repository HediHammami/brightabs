"use client";

import { highlights, ingredients } from "@/data/dummyData";
import Image from "next/image";
import { useState } from "react";

export default function TaniTabsProduct() {
  const [activeTab, setActiveTab] = useState("highlights");

  return (
    <div className="w-full mb-5 mt-5">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("highlights")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === "highlights"
              ? "text-[#32999E] border-b-2 border-[#32999E]"
              : "text-[#6A7282] hover:text-gray-700"
          }`}
        >
          Highlights
        </button>
        <button
          onClick={() => setActiveTab("isItForMe")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === "isItForMe"
              ? "text-[#32999E] border-b-2 border-[#32999E]"
              : "text-[#6A7282] hover:text-gray-700"
          }`}
        >
          Is it for me?
        </button>
        <button
          onClick={() => setActiveTab("ingredients")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === "ingredients"
              ? "text-[#32999E] border-b-2 border-[#32999E]"
              : "text-[#6A7282] hover:text-gray-700"
          }`}
        >
          Ingredients
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {/* Highlights Tab */}
        {activeTab === "highlights" && (
          <div className="grid grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-1">
                  <Image
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="text-xs font-semibold uppercase text-[#364153]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* Is it for me? Tab */}
        {activeTab === "isItForMe" && (
          <div>
            <p className="text-gray-600 mb-6">
              BRIGHTABS are designed for anyone who wants to improve their oral
              health without compromise.
            </p>

            <h3 className="text-lg font-bold mb-4">
              It&apos;s the perfect choice if you:
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 shrink-0"></span>
                <span className="text-gray-700">
                  Want stronger & visibly brighter teeth
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 shrink-0"></span>
                <span className="text-gray-700">
                  Struggle with stains from coffee, tea, or wine
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 shrink-0"></span>
                <span className="text-gray-700">
                  Need a fresh breath boost that lasts
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 shrink-0"></span>
                <span className="text-gray-700">
                  Deal with sensitive gums or enamel
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 shrink-0"></span>
                <span className="text-gray-700">
                  Prefer fluoride-free and additive-free formulas
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div className="space-y-6">
            {ingredients.map((item, index) => (
              <div key={index} className="bg-gray-50 p-2">
                <h4 className="text-sm font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
