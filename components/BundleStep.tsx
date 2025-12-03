"use client";

import { useState } from "react";
import {
  BundleSelector,
  type BundleSelectorValue,
} from "@/components/BundleSelector";

export function BundleStep() {
  const [bundleState, setBundleState] = useState<BundleSelectorValue | null>(
    null
  );

  return (
    <div className="space-y-3">
      <BundleSelector
        onChange={(value) => {
          setBundleState(value);
          console.log("Bundle changed:", value);
        }}
      />
    </div>
  );
}
