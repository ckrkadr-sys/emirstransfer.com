import type { Metadata, Viewport } from "next";
import { MobileWhatsAppCta } from "../components/MobileWhatsAppCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Emirs Transfer | Dalaman Airport VIP Transfer",
    template: "%s | Emirs Transfer"
  },
  description:
    "Private VIP transfers from Dalaman Airport to Fethiye, Ölüdeniz, Göcek, Faralya, Kabak, Marmaris and nearby hotels with fixed prices and Mercedes vehicles.",
  keywords: [
    "Dalaman Airport transfer",
    "Fethiye VIP transfer",
    "Ölüdeniz transfer",
    "Göcek transfer",
    "Marmaris transfer",
    "private airport transfer Turkey"
  ],
  openGraph: {
    title: "Emirs Transfer | Dalaman Airport VIP Transfer",
    description:
      "Fixed-price Mercedes VIP transfers from Dalaman Airport to Fethiye, Ölüdeniz, Göcek, Marmaris and nearby hotel regions.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileWhatsAppCta />
      </body>
    </html>
  );
}
