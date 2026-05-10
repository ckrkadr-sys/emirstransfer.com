"use client";

import { useState } from "react";
import { HomeBottomCta } from "../components/home/HomeBottomCta";
import { HomeOtherServices } from "../components/home/HomeOtherServices";
import { HomePopularRoutes } from "../components/home/HomePopularRoutes";
import { HomePriceFinder } from "../components/home/HomePriceFinder";
import { HomeVehiclePriceSection } from "../components/home/HomeVehiclePriceSection";

export function HomePageContent() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>();

  return (
    <main className="home-page">
      <HomePriceFinder selectedRouteId={selectedRouteId} />
      <HomePopularRoutes onSelectRoute={setSelectedRouteId} />
      <HomeVehiclePriceSection />
      <HomeOtherServices />
      <HomeBottomCta />
    </main>
  );
}
