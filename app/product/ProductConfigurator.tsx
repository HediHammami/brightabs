// "use client";

import { useMemo, useState } from "react";
import type {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyMoneyV2,
} from "@/lib/shopify";
import {
  BundleSelector,
  type BundleSelectorValue,
  GIFT_OPTIONS,
} from "@/components/BundleSelector";
import { FaLock } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import ProductTabs from "@/components/ProductTabs";
import BenefitsBlock from "@/components/BenefitsBlock";
import TestimonialCard from "@/components/TestimonialCard";
import { FiTruck, FiShield } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";

/* 🔹 Sticky bar at bottom of viewport for STEP 1 (Bundles) */
function StickyFlavorBar(props: { canProceed: boolean; onClick: () => void }) {
  const { canProceed, onClick } = props;

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onClick();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#50000B1F] bg-[linear-gradient(93.54deg,rgba(224,240,255,0.95)_0%,rgba(255,255,255,0.98)_100%)]">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <button
              type="button"
              onClick={handleClick}
              disabled={!canProceed}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#32999E] px-4 py-3 text-sm font-semibold capitalize tracking-wide text-white transition disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Select Flavors
              <BsArrowRight className="h-4 w-4 text-white" />
            </button>

            <div className="mt-2 flex items-center justify-between text-xs font-semibold text-black">
              <div className="flex items-center gap-1">
                <FiShield className="h-4 w-4" />
                <span>100% Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <FiTruck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Sticky checkout bar for STEP 2 (Variants / flavors) */
interface StickyCheckoutBarProps {
  requiredPacks: number;
  totalPacks: number;
  isCheckingOut: boolean;
  onCheckout: () => void;
}

function StickyCheckoutBar({
  requiredPacks,
  totalPacks,
  isCheckingOut,
  onCheckout,
}: StickyCheckoutBarProps) {
  const remainingPacks =
    requiredPacks > 0 ? Math.max(requiredPacks - totalPacks, 0) : 0;

  const canCheckout =
    requiredPacks > 0 &&
    totalPacks >= requiredPacks &&
    totalPacks > 0 &&
    !isCheckingOut;

  let buttonLabel: string;

  if (requiredPacks === 0) {
    buttonLabel = "Select a bundle to unlock checkout";
  } else if (remainingPacks > 0) {
    buttonLabel = `Select ${remainingPacks} more pack${
      remainingPacks > 1 ? "s" : ""
    } to checkout`;
  } else {
    buttonLabel = isCheckingOut ? "Redirecting..." : "Continue to checkout";
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#50000B1F] bg-[linear-gradient(93.54deg,rgba(224,240,255,0.95)_0%,rgba(255,255,255,0.98)_100%)]">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Button with dynamic helper text INSIDE */}
            <button
              type="button"
              onClick={onCheckout}
              disabled={!canCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#32999E] px-4 py-3 text-xs md:text-sm font-semibold capitalize tracking-wide text-white transition disabled:cursor-not-allowed disabled:bg-gray-400 text-center"
            >
              <IoBagCheckOutline className="h-4 w-4 text-white" />
              <span className="leading-snug">{buttonLabel}</span>
            </button>

            {/* Benefits row – same width as button */}
            <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-black">
              <div className="flex items-center gap-1">
                <FiTruck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <FiShield className="h-4 w-4" />
                <span>100% Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Step = "bundle" | "variants";

interface ProductConfiguratorProps {
  product: ShopifyProduct;
  onStepChange?: (step: Step) => void;
  onInitiateCheckout: () => void;
}

interface VariantQuantity {
  variantId: string;
  quantity: number;
}

function formatPrice(money: ShopifyMoneyV2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

function getTotalPacks(quantities: VariantQuantity[]): number {
  return quantities.reduce((sum, v) => sum + v.quantity, 0);
}

export function ProductConfigurator({
  product,
  onStepChange,
  onInitiateCheckout,
}: ProductConfiguratorProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const variants: ShopifyProductVariant[] = product.variants;

  const [step, setStep] = useState<Step>("bundle");
  const [bundleState, setBundleState] = useState<BundleSelectorValue | null>(
    null
  );

  const [variantQuantities, setVariantQuantities] = useState<VariantQuantity[]>(
    () => variants.map((v) => ({ variantId: v.id, quantity: 0 }))
  );

  const totalPacks = useMemo(
    () => getTotalPacks(variantQuantities),
    [variantQuantities]
  );

  // priceLabel is ready if you ever need it, but currently unused.
  const _priceLabel = (() => {
    const min = product.priceRange.minVariantPrice;
    const max = product.priceRange.maxVariantPrice;
    if (min.amount === max.amount) return formatPrice(min);
    return `${formatPrice(min)} – ${formatPrice(max)}`;
  })();

  const requiredPacks = bundleState?.bundle.packs ?? 0;

  const goToVariantStep = () => {
    if (!bundleState) return;

    // ✅ Reset all variant quantities when entering the flavors step
    setVariantQuantities(
      variants.map((v) => ({
        variantId: v.id,
        quantity: 0,
      }))
    );

    setStep("variants");
    onStepChange?.("variants");
  };

  const handleQuantityChange = (variantId: string, delta: number) => {
    setVariantQuantities((prev) =>
      prev.map((entry) =>
        entry.variantId === variantId
          ? { ...entry, quantity: Math.max(0, entry.quantity + delta) }
          : entry
      )
    );
    setCheckoutError(null);
  };

  const unlockedGiftCount = totalPacks;
  const unlockedGiftIds = useMemo(
    () =>
      GIFT_OPTIONS.filter(
        (gift) => unlockedGiftCount >= gift.unlockAtPacks
      ).map((gift) => gift.id),
    [unlockedGiftCount]
  );

  const handleCheckout = async () => {
    if (totalPacks === 0) {
      setCheckoutError("Please select at least one flavor.");
      return;
    }

    if (requiredPacks > 0 && totalPacks < requiredPacks) {
      setCheckoutError(
        `Please select at least ${requiredPacks} pack${
          requiredPacks > 1 ? "s" : ""
        } to checkout.`
      );
      return;
    }

    onInitiateCheckout();

    setIsCheckingOut(true);
    setCheckoutError(null);

    const lineItems = variantQuantities
      .filter((v) => v.quantity > 0)
      .map((v) => ({
        variantId: v.variantId,
        quantity: v.quantity,
      }));

    if (!lineItems.length) {
      setCheckoutError("Please select at least one flavor.");
      setIsCheckingOut(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Checkout failed");
      }

      const data = await res.json();

      if (!data?.url) {
        throw new Error("No checkout URL returned");
      }

      window.location.href = data.url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.message || "Something went wrong during checkout");
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Top bar / navbar when in variants step */}
        {step === "variants" && (
          <div className="flex items-center justify-between rounded-md bg-[#32999E] px-4 py-2 text-xs text-white">
            <button
              type="button"
              onClick={() => {
                setStep("bundle");
                onStepChange?.("bundle");
              }}
              className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide hover:text-gray-200"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <BiArrowBack className="h-4 w-4 text-black" />
              </span>
              <span>Back to bundles</span>
            </button>
            <span className="text-[11px] font-semibold uppercase tracking-wide">
              Step 2 of 2 · Select flavors
            </span>
          </div>
        )}

        {/* STEP 1: BUNDLE */}
        {step === "bundle" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {product.title}
              </h1>
              <div className="prose max-w-none text-base text-black md:text-xl">
                <p>{product.description}</p>
              </div>
              <BenefitsBlock />
            </div>

            <BundleSelector
              onChange={(value) => {
                setBundleState(value);
              }}
            />

            <hr className="m-3 text-gray-200" />

            <button
              type="button"
              onClick={goToVariantStep}
              disabled={!bundleState}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#32999E] px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Select a flavor
              <BsArrowRight className="h-4 w-4 text-white" />
            </button>

            <ProductTabs />
            <TestimonialCard />
          </div>
        )}

        {/* STEP 2: VARIANTS */}
        {step === "variants" && (
          <div className="space-y-4">
            <div className="hidden md:block rounded-lg bg-gray-50 px-4 py-3 text-xs text-black">
              <div className="flex items-center justify-between">
                <span className="font-semibold uppercase tracking-wide">
                  Total packs selected
                </span>
                <span className="text-sm font-semibold">
                  {totalPacks} pack{totalPacks !== 1 ? "s" : ""}
                </span>
              </div>
              {bundleState && (
                <p className="mt-1 text-xs text-black">
                  You chose a{" "}
                  <span className="font-semibold uppercase">
                    {bundleState.bundle.packs}-pack
                  </span>{" "}
                  bundle. Select at least{" "}
                  <span className="font-semibold">
                    {bundleState.bundle.packs} pack
                    {bundleState.bundle.packs !== 1 ? "s" : ""}
                  </span>{" "}
                  across your favorite flavors to checkout.
                </p>
              )}
            </div>

            {/* Variants */}
            <div className="space-y-2">
              {variants.map((variant, index) => {
                const entry =
                  variantQuantities.find((v) => v.variantId === variant.id) ??
                  ({ variantId: variant.id, quantity: 0 } as VariantQuantity);

                const qty = entry.quantity;
                const hasQuantity = qty > 0;

                const variantImageUrl =
                  variant.image?.url ||
                  product.featuredImage?.url ||
                  product.images[0]?.url ||
                  "/images/flavors/default.png";

                return (
                  <div
                    key={variant.id}
                    className="relative flex items-stretch justify-between rounded-xl border border-gray-200 bg-white"
                  >
                    {index === 0 && (
                      <div className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center -rotate-90 bg-red-600 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-white md:-left-2">
                        Best seller
                      </div>
                    )}

                    <div className="flex flex-1 items-center gap-3">
                      <div className="h-18 w-18 overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={variantImageUrl}
                          alt={variant.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {variant.title}
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          {variant.price.amount} {variant.price.currencyCode} /
                          pack
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center p-3">
                      {!hasQuantity ? (
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(variant.id, 1)}
                          className="rounded-full bg-[#2e4c3c] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#2D5B5D]"
                        >
                          Add +
                        </button>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(variant.id, -1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e4c3c] text-sm font-semibold text-white hover:bg-[#2D5B5D]"
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(variant.id, 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e4c3c] text-sm font-semibold text-white hover:bg-[#2D5B5D]"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gifts */}
            <div className="space-y-3">
              <p className="mb-4 text-[10px] text-black text-center">
                <span className="font-bold">Exclusive Holiday Sale!</span>
                FREE Gifts With Your First Order
              </p>

              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {GIFT_OPTIONS.map((gift) => {
                  const isUnlocked = unlockedGiftIds.includes(gift.id);

                  return (
                    <div
                      key={gift.id}
                      className="flex flex-col items-center space-y-2 text-center"
                    >
                      <div className="relative w-full">
                        {gift.badgeLabel && (
                          <div className="pointer-events-none absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-md bg-[#FBE8BB] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-black">
                            <span className="mr-1">Free</span>
                            <span className="line-through opacity-80">
                              {gift.badgeLabel}
                            </span>
                          </div>
                        )}

                        <div
                          className={[
                            "aspect-square w-full overflow-hidden rounded-xl border border-dashed bg-white",
                            isUnlocked
                              ? "border-black"
                              : "border-gray-300 bg-gray-100 text-gray-400",
                          ].join(" ")}
                        >
                          {!isUnlocked && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                              <FaLock className="h-4 w-4 text-black" />
                              <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-black">
                                {gift.unlockAtPacks}+ Packs
                              </span>
                            </div>
                          )}

                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={gift.imageUrl}
                            alt={gift.name}
                            className={
                              "p-1 rounded-xl h-full w-full object-cover " +
                              (!isUnlocked ? "opacity-0" : "")
                            }
                          />
                        </div>
                      </div>

                      <div className={isUnlocked ? "" : "opacity-40"}>
                        <div className="text-[11px] font-semibold">
                          {gift.name}
                        </div>
                        {gift.description && (
                          <div className="mt-0.5 text-[10px] text-gray-500">
                            {gift.description}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {checkoutError && (
              <p className="mt-2 text-xs text-red-600">{checkoutError}</p>
            )}
          </div>
        )}
      </div>

      <div className="h-24 md:h-28" />

      {/* Sticky bars */}
      {step === "bundle" && (
        <StickyFlavorBar canProceed={!!bundleState} onClick={goToVariantStep} />
      )}

      {step === "variants" && bundleState && (
        <StickyCheckoutBar
          requiredPacks={requiredPacks}
          totalPacks={totalPacks}
          isCheckingOut={isCheckingOut}
          onCheckout={handleCheckout}
        />
      )}
    </>
  );
}
