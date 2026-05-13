import type { Currency, FixedRoutePrice, PassengerRange, PriceProfile, PriceTier } from "../lib/pricing/pricing.types";
import { getVehicleById } from "./vehicles";

export const currencies: Currency[] = ["GBP", "EUR", "USD"];

export const passengerRanges: PassengerRange[] = [
  { id: "pax-1-5", label: "1-5 pax", min: 1, max: 5 },
  { id: "pax-6-12", label: "6-12 pax", min: 6, max: 12 },
  { id: "pax-13-16", label: "12-16 pax", min: 13, max: 16 },
  { id: "pax-1-20", label: "1-20 pax", min: 1, max: 20 }
];

const passengerRangeById = new Map(passengerRanges.map((range) => [range.id, range]));

function createPriceTier({
  id,
  passengerRangeId,
  vehicleId,
  gbp,
  eur,
  usd
}: {
  id: string;
  passengerRangeId: string;
  vehicleId: string;
  gbp: number;
  eur: number;
  usd: number;
}): PriceTier {
  const passengerRange = passengerRangeById.get(passengerRangeId);
  const vehicle = getVehicleById(vehicleId);

  if (!passengerRange) {
    throw new Error(`Unknown passenger range: ${passengerRangeId}`);
  }

  if (!vehicle) {
    throw new Error(`Unknown vehicle: ${vehicleId}`);
  }

  return {
    id,
    passengerRange,
    vehicle: vehicle.name,
    vehicleId,
    prices: { GBP: gbp, EUR: eur, USD: usd },
    pax: passengerRange.label,
    gbp,
    eur,
    usd
  };
}

function createPriceProfile(id: string, tiers: Array<Omit<Parameters<typeof createPriceTier>[0], "id">>): PriceProfile {
  return {
    id,
    tiers: tiers.map((tier, index) => createPriceTier({ ...tier, id: `${id}-${index + 1}` }))
  };
}

export const priceProfiles: PriceProfile[] = [
  createPriceProfile("fethiye-standard", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 40, eur: 50, usd: 55 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 80, eur: 100, usd: 110 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 100, eur: 115, usd: 135 }
  ]),
  createPriceProfile("fethiye-resort", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 45, eur: 55, usd: 60 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 90, eur: 110, usd: 120 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 100, eur: 115, usd: 135 }
  ]),
  createPriceProfile("oludeniz-hotels", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 50, eur: 60, usd: 65 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 90, eur: 110, usd: 120 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 100, eur: 115, usd: 135 }
  ]),
  createPriceProfile("ovacik-hisaronu-hotels", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 45, eur: 54, usd: 60 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 90, eur: 110, usd: 120 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 100, eur: 115, usd: 135 }
  ]),
  createPriceProfile("faralya-kabak-butterfly-valley", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 80, eur: 90, usd: 110 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 120, eur: 140, usd: 160 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 150, eur: 170, usd: 200 }
  ]),
  createPriceProfile("gocek-hotels", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 35, eur: 45, usd: 50 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 60, eur: 70, usd: 80 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 80, eur: 90, usd: 100 }
  ]),
  createPriceProfile("yaniklar-katranci-gunluklu-hotels", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 40, eur: 50, usd: 55 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 65, eur: 75, usd: 85 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 85, eur: 95, usd: 110 }
  ]),
  createPriceProfile("marmaris-icmeler-hotels", [
    { passengerRangeId: "pax-1-5", vehicleId: "mercedes-vito", gbp: 45, eur: 55, usd: 60 },
    { passengerRangeId: "pax-6-12", vehicleId: "mercedes-sprinter", gbp: 90, eur: 110, usd: 120 },
    { passengerRangeId: "pax-13-16", vehicleId: "mercedes-sprinter", gbp: 100, eur: 115, usd: 135 }
  ])
];

export const fixedRoutePrices: FixedRoutePrice[] = [
  { id: "dalaman-airport-to-fethiye", from: "Dalaman Airport", to: "Fethiye", duration: "45 min", price: 40, currency: "GBP" },
  { id: "dalaman-airport-to-calis", from: "Dalaman Airport", to: "Calis", duration: "45 min", price: 40, currency: "GBP" },
  { id: "dalaman-airport-to-oludeniz", from: "Dalaman Airport", to: "Oludeniz", duration: "60 min", price: 50, currency: "GBP" },
  { id: "dalaman-airport-to-gocek", from: "Dalaman Airport", to: "Gocek", duration: "30 min", price: 35, currency: "GBP" },
  { id: "dalaman-airport-to-kalkan", from: "Dalaman Airport", to: "Kalkan", duration: "90 min", price: 75, currency: "GBP" },
  { id: "dalaman-airport-to-kas", from: "Dalaman Airport", to: "Kas", duration: "120 min", price: 90, currency: "GBP" }
];
