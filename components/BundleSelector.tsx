"use client";
import { FaLock } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export type BundleSize = 1 | 2 | 3 | 4;

export interface BundleOption {
  id: string;
  label: string;
  packs: BundleSize;
  pricePerUnit: string;
  badgeLabel?: string;
  badgeClassName?: string;
}

export interface GiftOption {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  unlockAtPacks: BundleSize;
  badgeLabel?: string;
}

export interface BundleSelectorValue {
  bundle: BundleOption;
  selectedGifts: GiftOption[];
}

export interface BundleSelectorProps {
  onChange?: (value: BundleSelectorValue) => void;
}

export const BUNDLE_OPTIONS: BundleOption[] = [
  {
    id: "bundle-4",
    label: "4 Packs",
    packs: 4,
    pricePerUnit: "$14.99/each",
    badgeLabel: "Best Deal",
    badgeClassName: "bg-[#F36E21] text-white",
  },
  {
    id: "bundle-3",
    label: "3 Packs",
    packs: 3,
    pricePerUnit: "$16.99/each",
    // badgeLabel: "Smart Choice",
    // badgeClassName: "bg-blue-500 text-white",
  },
  {
    id: "bundle-2",
    label: "2 Packs",
    packs: 2,
    pricePerUnit: "$18.99/each",
    // badgeLabel: "Most Popular",
    // badgeClassName: "bg-amber-500 text-white",
  },
  {
    id: "bundle-1",
    label: "1 Pack",
    packs: 1,
    pricePerUnit: "$19.99/each",
    // no badge
  },
];

export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: "gift-1",
    name: "Free Shipping",
    imageUrl: "/images/gifts/free_shipping.webp",
    unlockAtPacks: 1,
    badgeLabel: "$9.99",
  },
  {
    id: "gift-2",
    name: "3 Grease Cleaner Tablets",
    imageUrl: "/images/gifts/revolubar.webp",
    unlockAtPacks: 2,
    badgeLabel: "$12.00",
  },
  {
    id: "gift-3",
    name: "Mouthwash Tablets 2-month supply",
    imageUrl: "/images/gifts/brightabs.webp",
    unlockAtPacks: 3,
    badgeLabel: "$21.00",
  },
  {
    id: "gift-4",
    name: "Mystery Gift",
    imageUrl: "/images/gifts/free_gift.webp",
    unlockAtPacks: 4,
    badgeLabel: "$40.00",
  },
];

function getSelectedGiftsForBundle(bundle: BundleOption): GiftOption[] {
  // Selected gifts = all unlocked gifts for this bundle
  return GIFT_OPTIONS.filter((gift) => gift.unlockAtPacks <= bundle.packs);
}

export const BundleSelector: React.FC<BundleSelectorProps> = ({ onChange }) => {
  // Default: 4 Packs (first in array)
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(
    BUNDLE_OPTIONS[0]
  );

  const allowedGiftCount = selectedBundle.packs;
  const selectedGifts = getSelectedGiftsForBundle(selectedBundle);

  // Initial notify so parent has the default 4-pack state
  useEffect(() => {
    if (!onChange) return;
    onChange({
      bundle: selectedBundle,
      selectedGifts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // once on mount

  const handleBundleChange = (bundleId: string) => {
    const bundle = BUNDLE_OPTIONS.find((b) => b.id === bundleId);
    if (!bundle) return;

    setSelectedBundle(bundle);

    if (onChange) {
      onChange({
        bundle,
        selectedGifts: getSelectedGiftsForBundle(bundle),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Bundles */}
      <div className="mb-3">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {BUNDLE_OPTIONS.map((bundle) => {
            const isSelected = bundle.id === selectedBundle.id;

            return (
              <button
                key={bundle.id}
                type="button"
                onClick={() => handleBundleChange(bundle.id)}
                className={[
                  "relative flex flex-col items-center justify-center rounded-xl border px-4 py-5 text-center transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black",
                  isSelected
                    ? "border-black bg-[#FBCEB1] text-black"
                    : "border-[#d7d7d7] bg-white hover:border-black/60",
                ].join(" ")}
              >
                {/* Top badge (4 / 3 / 2 packs) */}
                {bundle.badgeLabel && (
                  <div
                    className={[
                      "pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 items-center rounded-md px-3 py-1 text-[8px] font-semibold uppercase tracking-wide",
                      bundle.badgeClassName ?? "bg-gray-900 text-white",
                    ].join(" ")}
                  >
                    {bundle.badgeLabel}
                  </div>
                )}

                <input
                  type="radio"
                  name="bundle"
                  value={bundle.id}
                  checked={isSelected}
                  readOnly
                  className="sr-only"
                />

                <span className="text-base font-semibold">{bundle.label}</span>
                <span
                  className={
                    "mt-1 text-xs " + (isSelected ? "text-black" : "text-black")
                  }
                >
                  {bundle.pricePerUnit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Free gifts (not clickable) */}
      <div>
        <p className="mb-4 text-black text-[10px] text-center">
          <strong>Early Exclusive Holiday Sale!</strong> FREE Gifts With Your
          First Order
        </p>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {GIFT_OPTIONS.map((gift) => {
            const isUnlocked = selectedBundle.packs >= gift.unlockAtPacks;

            return (
              <div
                key={gift.id}
                className="flex flex-col items-center space-y-2 text-center"
              >
                {/* Outer wrapper: relative, NO overflow-hidden */}
                <div className="relative w-full">
                  {/* Badge on top center (now fully visible) */}
                  {gift.badgeLabel && (
                    <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-md bg-[#FBE8BB] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-black whitespace-nowrap">
                      <span className="mr-1">Free</span>
                      <span className="line-through opacity-80">
                        {gift.badgeLabel}
                      </span>
                    </div>
                  )}

                  {/* Box with dashed border + image, handles overflow */}
                  <div
                    className={[
                      "aspect-square w-full overflow-hidden rounded-xl border border-dashed bg-white",
                      isUnlocked
                        ? "border-black"
                        : "border-gray-300 bg-gray-100 text-gray-400",
                    ].join(" ")}
                  >
                    {/* Locked overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                        <FaLock className="text-black w-4 h-4" />
                        <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-black">
                          {gift.unlockAtPacks}+ Packs
                        </span>
                      </div>
                    )}

                    {/* Image takes full box */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                      src={gift.imageUrl}
                      alt={gift.name}
                      className={
                        "p-1 rounded-xl object-contain " +
                        (!isUnlocked ? "opacity-0" : "")
                      }
                      width={240}
                      height={240}
                    />
                  </div>
                </div>

                {/* Text BELOW the box */}
                <div className={isUnlocked ? "" : "opacity-40"}>
                  <div className="text-[11px] font-semibold">{gift.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
