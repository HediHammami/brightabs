import { NextRequest, NextResponse } from "next/server";
import { createCheckout, type CheckoutLineItemInput } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lineItems = body?.lineItems as CheckoutLineItemInput[] | undefined;

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        { error: "No line items provided" },
        { status: 400 }
      );
    }

    const cleaned = lineItems
      .filter((item) => item.variantId && item.quantity > 0)
      .map((item) => ({
        variantId: String(item.variantId),
        quantity: Number(item.quantity),
      }));

    if (cleaned.length === 0) {
      return NextResponse.json(
        { error: "No valid line items after cleaning" },
        { status: 400 }
      );
    }

    const checkoutUrl = await createCheckout(cleaned);

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
