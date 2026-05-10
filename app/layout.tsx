import type { Metadata, Viewport } from "next";
import { defaultLocale, fallbackLocale } from "../lib/i18n/config";
import { dictionaries, type PageDictionary } from "../lib/i18n/dictionaries";
import "./globals.css";

const defaultDictionary = (dictionaries[defaultLocale] ?? dictionaries[fallbackLocale]) as PageDictionary;

export const metadata: Metadata = defaultDictionary.seo;

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
    <html lang={defaultLocale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
