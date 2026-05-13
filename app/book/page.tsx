import { defaultLocale, fallbackLocale, isLocale, type Locale } from "../../lib/i18n/config";
import { getBookingQuoteForSelection } from "../../lib/pricing/pricing.service";
import { type Currency, type TripType } from "../../lib/pricing/pricing.types";
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

function getLocale(params: Record<string, string | string[] | undefined>): Locale {
  const localeParam = readParam(params, "locale");
  return isLocale(localeParam) ? localeParam : defaultLocale;
}

function getCurrency(params: Record<string, string | string[] | undefined>): Currency {
  const currency = readParam(params, "currency");
  return currency === "EUR" || currency === "USD" ? currency : "GBP";
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  const from = readParam(params, "from");
  const to = readParam(params, "to");
  const tripType: TripType = readParam(params, "tripType") === "round-trip" ? "round-trip" : "one-way";
  const passengers = readNumber(params, "passengers") ?? 2;
  const quote = getBookingQuoteForSelection({
    from,
    to,
    passengers,
    tripType,
    currency: getCurrency(params)
  });

  const booking: BookingPageData = {
    from,
    to,
    date: readParam(params, "date"),
    time: readParam(params, "time"),
    returnDate: readParam(params, "returnDate"),
    returnTime: readParam(params, "returnTime"),
    passengers,
    tripType,
    currency: quote?.currency ?? "GBP",
    totalPrice: quote?.totalPrice ?? 0,
    reservationFee: quote?.reservationFee ?? 0,
    remainingBalance: quote?.remainingBalance ?? 0,
    isPriced: Boolean(quote)
  };

  return <BookingReservationFlow locale={getLocale(params) ?? fallbackLocale} booking={booking} />;
}
