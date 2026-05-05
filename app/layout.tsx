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
      <body>{children}</body>
    </html>
  );
}
