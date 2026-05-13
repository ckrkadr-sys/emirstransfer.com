import { fixedRoutePrices, priceProfiles } from "../../data/prices";
import type { FixedRoutePrice, PriceProfile } from "./pricing.types";

export function listPriceProfiles(): PriceProfile[] {
  return priceProfiles;
}

export function getPriceProfileById(priceProfileId: string) {
  return priceProfiles.find((profile) => profile.id === priceProfileId);
}

export function listFixedRoutePrices(): FixedRoutePrice[] {
  return fixedRoutePrices;
}

export function findFixedRoutePrice(from: string, to: string) {
  return fixedRoutePrices.find(
    (routePrice) =>
      (routePrice.from === from && routePrice.to === to) || (routePrice.from === to && routePrice.to === from)
  );
}
