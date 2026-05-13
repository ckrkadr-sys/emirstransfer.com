import type { Locale as ConfigLocale } from "../i18n/config";
import type { PriceTier } from "../pricing/pricing.types";

export type Locale = ConfigLocale;

export type Location = {
  id: string;
  name: string;
  dictionaryKey: string;
  aliases?: string[];
  selectable?: boolean;
};

export type TransferRouteCategory = "popular" | "hotel";

export type TransferRoute = {
  id: string;
  slug: string;
  title: string;
  regionName: string;
  origin: string;
  destination: string;
  description: string;
  hotels: string[];
  priceProfileId: string;
  prices: PriceTier[];
  category: TransferRouteCategory;
};

export type StaticTransferRoute = Omit<TransferRoute, "prices">;

export type Service = {
  id: "minibusTour" | "boatRental";
  dictionaryKey: "minibusTour" | "boatRental";
  image: string;
  icon: "map" | "sailboat";
};

export type TransferRouteMatch = {
  hotelName?: string;
  route: TransferRoute;
  matchType: "hotel" | "route";
};
