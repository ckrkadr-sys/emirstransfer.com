export type Currency = "GBP" | "EUR" | "USD";

export type TripType = "one-way" | "round-trip";

export type PassengerRange = {
  id: string;
  label: string;
  min: number;
  max: number | null;
};

export type Vehicle = {
  id: string;
  name: string;
  passengerRangeIds: string[];
};

export type Money = {
  currency: Currency;
  amount: number;
};

export type PriceTier = {
  id: string;
  passengerRange: PassengerRange;
  vehicle: string;
  vehicleId: string;
  prices: Record<Currency, number>;
  pax: string;
  gbp: number;
  eur: number;
  usd: number;
};

export type PriceProfile = {
  id: string;
  tiers: PriceTier[];
};

export type FixedRoutePrice = {
  id: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  currency: Currency;
};

export type PricingQuote = {
  currency: Currency;
  unitPrice: number;
  totalPrice: number;
  reservationFee: number;
  remainingBalance: number;
  tripType: TripType;
  priceTier?: PriceTier;
  fixedRoutePrice?: FixedRoutePrice;
};
