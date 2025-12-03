import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { ProductPageClient } from "./ProductPageClient";

export default async function ProductPage() {
  const handle = process.env.SHOPIFY_MAIN_PRODUCT_HANDLE;
  if (!handle) {
    throw new Error("SHOPIFY_MAIN_PRODUCT_HANDLE is not set in .env.local");
  }

  const product = await getProductByHandle(handle);
  if (!product) {
    notFound();
  }

  const mainImage = product.featuredImage ?? product.images[0] ?? null;
  const imagesForGallery =
    product.images.length > 0 ? product.images : mainImage ? [mainImage] : [];

  return (
    <ProductPageClient product={product} imagesForGallery={imagesForGallery} />
  );
}
