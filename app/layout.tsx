import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMİRSTRANSFER.COM | Dalaman Airport VIP Transfer to Fethiye, Kalkan & Kas",
  description:
    "Book private VIP transfers from Dalaman Airport to Fethiye, Gocek, Kalkan and Kas. Fixed prices, Mercedes-Benz Vito vehicles, 24/7 service and airport meet & greet.",
  keywords: [
    "Dalaman Airport Transfer",
    "Fethiye Transfer",
    "Dalaman to Fethiye Transfer",
    "Dalaman Airport to Kalkan Transfer",
    "Dalaman Airport to Kas Transfer",
    "VIP Transfer Fethiye",
    "Private Airport Transfer Turkey"
  ]
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
      <body>{children}</body>
    </html>
  );
}
