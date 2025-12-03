export interface ShopifyImage {
  id: string;
  altText: string | null;
  url: string;
  width: number;
  height: number;
}

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoneyV2;
  maxVariantPrice: ShopifyMoneyV2;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoneyV2;
  compareAtPrice?: ShopifyMoneyV2 | null;
  image: ShopifyImage | null;
  selectedOptions: ShopifySelectedOption[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  priceRange: ShopifyPriceRange;
  variants: ShopifyProductVariant[];
}

// Response shape for our specific query
interface GetProductByHandleResponse {
  productByHandle: {
    id: string;
    title: string;
    handle: string;
    description: string;
    descriptionHtml: string;
    featuredImage: ShopifyImage | null;
    images: {
      edges: { node: ShopifyImage }[];
    };
    priceRange: ShopifyPriceRange;
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          availableForSale: boolean;
          price: ShopifyMoneyV2;
          compareAtPrice?: ShopifyMoneyV2 | null;
          image: ShopifyImage | null; // ✅ NEW
          selectedOptions: ShopifySelectedOption[]; // ✅ NEW
        };
      }[];
    };
  } | null;
}

// ----- Config -----

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-01";

const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// ----- Generic fetch helper -----

async function shopifyFetch<TResponse>(
  query: string,
  variables?: Record<string, unknown>
): Promise<TResponse> {
  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    // In App Router this runs on the server by default
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // you can change this to 'force-cache' for static pages
  });

  if (!res.ok) {
    console.error("Shopify API error:", res.status, res.statusText);
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data?: TResponse; errors?: unknown };

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Shopify GraphQL error");
  }

  if (!json.data) {
    throw new Error("No data returned from Shopify");
  }

  return json.data;
}

// ----- Concrete function: get product by handle -----

const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      featuredImage {
        id
        altText
        url
        width
        height
      }
      images(first: 10) {
        edges {
          node {
            id
            altText
            url
            width
            height
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              # ✅ variant image (Storefront: url, not src)
              id
              altText
              url
              width
              height
            }
            selectedOptions {
              # ✅ like your previous project
              name
              value
            }
          }
        }
      }
    }
  }
`;

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<GetProductByHandleResponse>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );

  if (!data.productByHandle) return null;

  const { productByHandle } = data;

  // Normalize edges -> arrays
  const images = productByHandle.images.edges.map((edge) => edge.node);

  const variants: ShopifyProductVariant[] = productByHandle.variants.edges.map(
    (edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      price: edge.node.price,
      compareAtPrice: edge.node.compareAtPrice ?? null,
      image: edge.node.image ?? null,
      selectedOptions: edge.node.selectedOptions ?? [],
    })
  );

  const product: ShopifyProduct = {
    id: productByHandle.id,
    title: productByHandle.title,
    handle: productByHandle.handle,
    description: productByHandle.description,
    descriptionHtml: productByHandle.descriptionHtml,
    featuredImage: productByHandle.featuredImage,
    images,
    priceRange: productByHandle.priceRange,
    variants,
  };

  return product;
}

// -------- Checkout using Cart API --------

export interface CheckoutLineItemInput {
  variantId: string;
  quantity: number;
}

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: {
      field: string[] | null;
      message: string;
    }[];
  };
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Creates a Cart and returns checkoutUrl to redirect to
export async function createCheckout(
  lineItems: CheckoutLineItemInput[]
): Promise<string> {
  if (!lineItems.length) {
    throw new Error("No line items provided for checkout");
  }

  const data = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    input: {
      lines: lineItems.map((item) => ({
        quantity: item.quantity,
        merchandiseId: item.variantId, // Product variant ID
      })),
      // Optional: you can add buyerIdentity, attributes, etc. here later
    },
  });

  const { cartCreate } = data;

  if (cartCreate.userErrors?.length) {
    console.error("Shopify cartCreate errors:", cartCreate.userErrors);
    throw new Error(cartCreate.userErrors[0]?.message || "Cart error");
  }

  const checkoutUrl = cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("No checkoutUrl returned from Shopify");
  }

  return checkoutUrl;
}
