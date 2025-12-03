import type { Metadata } from "next";
import { Poppins, Rubik } from "next/font/google";
import "./globals.css";
import Announcement from "@/components/Announcement";
import Header from "@/components/Header";

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
    "BRIGHTTABS – Remineralizing Toothpaste Tablets | Natural Enamel Restoration",
  description:
    "BRIGHTTABS remineralizing toothpaste tablets restore enamel & clean teeth with natural, dentist-trusted ingredients. Support gum health & strengthen enamel naturally.",
  keywords:
    "remineralizing toothpaste, enamel restoration, natural toothpaste tablets, gum health, dentist-approved",
  openGraph: {
    title: "BRIGHTTABS – Remineralizing Toothpaste Tablets",
    description:
      "Restore enamel, clean teeth, and support gums with natural, dentist-trusted ingredients.",
    type: "website",
    url: "https://brightabs.vercel.app/",
    images: [
      {
        url: "/images/brightaps.webp",
        width: 1200,
        height: 630,
        alt: "BRIGHTTABS Remineralizing Toothpaste Tablets",
      },
    ],
    siteName: "BRIGHTTABS",
  },
  other: {
    "product:brand": "BRIGHTTABS",
    "product:category": "Oral Care",
    "og:price:currency": "USD",
    "og:availability": "in_stock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    </html>
  );
}
