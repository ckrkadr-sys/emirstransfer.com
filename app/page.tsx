import type { Metadata } from "next";
import { HomePageContent } from "./HomePageContent";

export const metadata: Metadata = {
  title: "Emirs Transfer | Dalaman Airport VIP Transfer Prices",
  description:
    "Check fixed private transfer prices from Dalaman Airport to Fethiye, Oludeniz, Gocek, Marmaris and nearby hotels. Book Mercedes VIP transfer via WhatsApp."
};

export default function HomePage() {
  return <HomePageContent />;
}
