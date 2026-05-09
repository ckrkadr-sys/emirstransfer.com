import type { Metadata } from "next";
import { HomePageContent } from "./HomePageContent";

export const metadata: Metadata = {
  title: "Emirs Transfer | Dalaman Airport VIP Transfer",
  description:
    "Private VIP transfers from Dalaman Airport to Fethiye, Oludeniz, Gocek, Faralya, Kabak, Marmaris and nearby hotels with fixed prices and Mercedes vehicles."
};

export default function HomePage() {
  return <HomePageContent />;
}
