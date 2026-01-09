// This is a SERVER COMPONENT — NO "use client"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

// Google Fonts
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ---------------- GLOBAL SEO METADATA ---------------- */

export const metadata = {
  metadataBase: new URL("https://www.telaura.com"), // update when live

  title: {
    default: "Telaura | Mobiles & Gadgets – Dubai & Kerala",
    template: "%s | Telaura",
  },

  description:
    "Telaura offers new and used mobile phones, laptops, tablets, smart watches, accessories, and mobile services in Dubai and Kerala.",

  keywords: [
    "Telaura",
    "mobile shop Dubai",
    "mobile shop Kerala",
    "used mobile phones",
    "new mobiles",
    "laptops",
    "tablets",
    "smart watches",
    "mobile accessories",
    "mobile service center",
    "gadget shop Dubai",
    "gadget shop Kerala",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Telaura | Mobiles & Gadgets",
    description:
      "Trusted store for new & used mobiles, gadgets, accessories, and mobile services in Dubai and Kerala.",
    url: "https://www.telaura.com",
    siteName: "Telaura",
    images: [
      {
        url: "/images/og-image.jpg", // add this image (1200x630)
        width: 1200,
        height: 630,
        alt: "Telaura Mobiles & Gadgets – Dubai & Kerala",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Telaura | Mobiles & Gadgets",
    description:
      "New & used mobiles, gadgets and professional mobile services in Dubai & Kerala.",
    images: ["/images/og-image.jpg"],
  },

  alternates: {
    canonical: "https://www.telaura.com",
  },
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-black antialiased font-inter">
        {/* Scroll indicator */}
        <ScrollProgress />

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
