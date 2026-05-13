import { findFixedRoutePrice } from "./static-pricing.repository";
import { findHotelTransferRouteMatch } from "../routes/static-route.repository";
import type { Currency, FixedRoutePrice, PriceTier, PricingQuote, TripType } from "./pricing.types";
import type { TransferRoute } from "../routes/route.types";

const RESERVATION_FEE_RATE = 0.1;

export type PricingSelection = {
  from: string;
  to: string;
  passengers: number;
  tripType: TripType;
  currency?: Currency;
};

export function getPriceTierForPassengers(prices: PriceTier[], passengers: number) {
  return (
    prices.find((price) => {
      const { min, max } = price.passengerRange;
      return passengers >= min && (max === null || passengers <= max);
    }) ?? null
  );
}

export function calculatePriceQuote({
  unitPrice,
  currency,
  tripType,
  priceTier,
  fixedRoutePrice
}: {
  unitPrice: number;
  currency: Currency;
  tripType: TripType;
  priceTier?: PriceTier;
  fixedRoutePrice?: FixedRoutePrice;
}): PricingQuote {
  const totalPrice = unitPrice * (tripType === "round-trip" ? 2 : 1);
  const reservationFee = Number((totalPrice * RESERVATION_FEE_RATE).toFixed(2));
  const remainingBalance = Number((totalPrice - reservationFee).toFixed(2));

  return {
    currency,
    unitPrice,
    totalPrice,
    reservationFee,
    remainingBalance,
    tripType,
    priceTier,
    fixedRoutePrice
  };
}

export function calculateFixedRouteQuote({
  fixedRoutePrice,
  tripType
}: {
  fixedRoutePrice: FixedRoutePrice;
  tripType: TripType;
}) {
  return calculatePriceQuote({
    unitPrice: fixedRoutePrice.price,
    currency: fixedRoutePrice.currency,
    tripType,
    fixedRoutePrice
  });
}

export function calculateTransferRouteQuote({
  route,
  passengers,
  tripType,
  currency = "GBP"
}: {
  route: TransferRoute;
  passengers: number;
  tripType: TripType;
  currency?: Currency;
}) {
  const priceTier = getPriceTierForPassengers(route.prices, passengers);

  if (!priceTier) {
    return null;
  }

  return calculatePriceQuote({
    unitPrice: priceTier.prices[currency],
    currency,
    tripType,
    priceTier
  });
}

export function getBookingQuoteForSelection({ from, to, passengers, tripType, currency = "GBP" }: PricingSelection) {
  const fixedRoutePrice = findFixedRoutePrice(from, to);

  if (fixedRoutePrice) {
    return calculateFixedRouteQuote({ fixedRoutePrice, tripType });
  }

  const hotelRouteMatch = findHotelTransferRouteMatch(to);

  if (!hotelRouteMatch) {
    return null;
  }

  const quote = calculateTransferRouteQuote({
    route: hotelRouteMatch.route,
    passengers,
    tripType,
    currency
  });

  if (!quote) {
    return null;
  }

  return {
    ...quote,
    route: hotelRouteMatch.route,
    hotelName: hotelRouteMatch.hotelName ?? hotelRouteMatch.route.destination
  };
}
