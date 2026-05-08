import { defaultLocale, fallbackLocale, isLocale, type Locale } from "../../lib/i18n/config";
import { findRouteByHotelOrDestination, getPriceForRoute } from "../../lib/transferPricing";
import { BookingReservationFlow, type BookingPageData } from "./BookingReservationFlow";

type BookPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function readNumber(params: Record<string, string | string[] | undefined>, key: string) {
  const value = Number(readParam(params, key));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function findRoute(from: string, to: string) {
  const destination = from === "Dalaman Airport" ? to : from;
  return findRouteByHotelOrDestination(destination);
}

function getLocale(params: Record<string, string | string[] | undefined>): Locale {
  const localeParam = readParam(params, "locale");
  return isLocale(localeParam) ? localeParam : defaultLocale;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  const from = readParam(params, "from");
  const to = readParam(params, "to");
  const tripType = readParam(params, "tripType") === "round-trip" ? "round-trip" : "one-way";
  const route = findRoute(from, to);
  const routePrice = readNumber(params, "price") ?? (route ? getPriceForRoute(route, "pax_1_5", "gbp") : 0);
  const multiplier = tripType === "round-trip" ? 2 : 1;
  const totalPrice = readNumber(params, "totalPrice") ?? routePrice * multiplier;
  const reservationFee = readNumber(params, "reservationFee") ?? Number((totalPrice * 0.1).toFixed(2));
  const remainingBalance = readNumber(params, "remainingBalance") ?? Number((totalPrice - reservationFee).toFixed(2));

  const booking: BookingPageData = {
    from,
    to,
    date: readParam(params, "date"),
    time: readParam(params, "time"),
    returnDate: readParam(params, "returnDate"),
    returnTime: readParam(params, "returnTime"),
    passengers: readNumber(params, "passengers") ?? 2,
    tripType,
    currency: readParam(params, "currency") === "GBP" ? "GBP" : "GBP",
    totalPrice,
    reservationFee,
    remainingBalance,
    isPriced: Boolean(route || totalPrice > 0)
  };

  return <BookingReservationFlow locale={getLocale(params) ?? fallbackLocale} booking={booking} />;
}
