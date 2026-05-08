import type { Metadata } from "next";
import { CtaBand } from "../components/CtaBand";
import { HeroSection } from "../components/HeroSection";
import { PopularRoutes } from "../components/PopularRoutes";
import { PriceFinder } from "../components/PriceFinder";
import { PriceOverviewTable } from "../components/PriceOverviewTable";
import { VehicleOptions } from "../components/VehicleOptions";

export const metadata: Metadata = {
  title: "Emirs Transfer | Dalaman Airport VIP Transfer",
  description:
    "Private VIP transfers from Dalaman Airport to Fethiye, Ölüdeniz, Göcek, Faralya, Kabak, Marmaris and nearby hotels with fixed prices and Mercedes vehicles."
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <section className="section section-finder">
        <div className="container">
          <PriceFinder />
        </div>
      </section>
      <PopularRoutes />
      <VehicleOptions />
      <PriceOverviewTable />
      <CtaBand />
    </main>
  );
}
