import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ServiceWorkerRegister } from "@/components/site/service-worker-register";
import { CONTACT } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ishaaiya.com"),
  title: "Ishaaiya Restaurant & Catering — Delicious Taste, Best Quality",
  description:
    "BBQ, Desi Food, Fast Food, Chinese aur bohot kuch — sab ek hi jagah. Hot, fresh aur affordable. Order on WhatsApp for quick home delivery.",
  applicationName: "Ishaaiya Restaurant & Catering",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/ishaaiyalogo-cropped.png",
    apple: "/ishaaiyalogo-cropped.png",
  },
  openGraph: {
    title: "Ishaaiya Restaurant & Catering",
    description:
      "BBQ, Desi Food, Fast Food, Chinese aur Tandoor — sab ek hi jagah. Order on WhatsApp.",
    url: "https://ishaaiya.com",
    siteName: "Ishaaiya Restaurant & Catering",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishaaiya Restaurant & Catering",
    description:
      "BBQ, Desi Food, Fast Food, Chinese aur Tandoor — sab ek hi jagah.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta name="theme-color" content="#0d0b09" />
        <link rel="icon" href="/ishaaiyalogo-cropped.png" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Ishaaiya Restaurant & Catering",
              image: "/images/hero-bbq.jpg",
              servesCuisine: [
                "Fast Food",
                "BBQ",
                "Pakistani",
                "Chinese",
                "Halal",
              ],
              priceRange: "Rs. 60 – Rs. 2,899",
              telephone: CONTACT.phone,
              url: "https://ishaaiya.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "11:00",
                closes: "23:00",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "10000",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
        <Toaster position="bottom-center" theme="dark" richColors />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}