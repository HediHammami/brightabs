"use client";

interface StickyFlavorBarProps {
  canProceed: boolean;
  onSelectFlavor: () => void;
}

export function StickyFlavorBar({
  canProceed,
  onSelectFlavor,
}: StickyFlavorBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-700">
            Limited Time Offer
          </span>
          <span className="text-xs text-gray-500">
            Save 57% on your first order when you bundle.
          </span>
        </div>

        <button
          type="button"
          onClick={onSelectFlavor}
          disabled={!canProceed}
          className="rounded-md bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Select a flavor
        </button>
      </div>
    </div>
  );
}
