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
    "BRIGHTTAB – Remineralizing Toothpaste Tablets | Natural Enamel Restoration",
  description:
    "BRIGHTTAB remineralizing toothpaste tablets restore enamel & clean teeth with natural, dentist-trusted ingredients. Support gum health & strengthen enamel naturally.",
  keywords:
    "remineralizing toothpaste, enamel restoration, natural toothpaste tablets, gum health, dentist-approved",
  openGraph: {
    title: "BRIGHTTAB – Remineralizing Toothpaste Tablets",
    description:
      "Restore enamel, clean teeth, and support gums with natural, dentist-trusted ingredients.",
    type: "website",
  },
  other: {
    "product:brand": "BRIGHTTAB",
    "product:category": "Oral Care",
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
