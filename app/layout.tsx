/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Poppins, Rubik } from "next/font/google";
import "./globals.css";
import Announcement from "@/components/Announcement";
import Header from "@/components/Header";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "BRIGHTABS – Remineralizing Toothpaste Tablets | Natural Enamel Restoration",
  description:
    "BRIGHTABS remineralizing toothpaste tablets restore enamel & clean teeth with natural, dentist-trusted ingredients. Support gum health & strengthen enamel naturally.",
  keywords:
    "remineralizing toothpaste, enamel restoration, natural toothpaste tablets, gum health, dentist-approved",
  openGraph: {
    title: "BRIGHTABS – Remineralizing Toothpaste Tablets",
    description:
      "Restore enamel, clean teeth, and support gums with natural, dentist-trusted ingredients.",
    type: "website",
    url: "https://brightabs.vercel.app/",
    images: [
      {
        url: "/images/brightaps.webp",
        width: 1200,
        height: 630,
        alt: "BRIGHTABS Remineralizing Toothpaste Tablets",
      },
    ],
    siteName: "BRIGHTABS",
  },
  other: {
    "product:brand": "BRIGHTABS",
    "product:category": "Oral Care",
    "og:price:currency": "USD",
    "og:availability": "in_stock",
  },
};

const PIXEL_ID: string | undefined = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

const facebookPixelBaseCode: string = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', '${PIXEL_ID}');
  fbq('track', 'PageView'); 
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${rubik.variable}`}
    >
      <body className="antialiased">
        <Announcement />
        <Header />
        <main>{children}</main>
      </body>

      {/* --- Place Scripts Here --- */}

      {/* 1. Facebook Pixel Script */}
      <Script
        id="fb-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: facebookPixelBaseCode }}
      />

      {/* 2. Facebook Pixel Noscript Fallback */}
      {PIXEL_ID && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt="Facebook Pixel Fallback"
          />
        </noscript>
      )}

      {/* 3. Google Analytics */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
