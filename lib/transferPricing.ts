import {
  currencies,
  passengerTiers,
  transferRoutes,
  type Currency,
  type PassengerTier,
  type TransferRoute
} from "./transferRoutes";

export const WHATSAPP_PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "").replace(/[^\d]/g, "");

export const currencySymbols: Record<Currency, string> = {
  gbp: "£",
  eur: "€",
  usd: "$"
};

export const passengerTierLabels: Record<PassengerTier, string> = {
  pax_1_5: "1-5",
  pax_6_12: "6-12",
  pax_12_16: "12-16"
};

type RouteMatchType = "hotel" | "destination" | "route";

export type TransferRouteMatch = {
  route: TransferRoute;
  matchedLabel: string;
  matchType: RouteMatchType;
};

export type WhatsAppBuildOptions = {
  message?: string;
  route?: TransferRoute;
  destinationLabel?: string;
  tier?: PassengerTier;
  currency?: Currency;
};

export function normalizeSearchText(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getVehicleForPassengerTier(tier: PassengerTier) {
  return tier === "pax_1_5" ? "Mercedes Vito" : "Mercedes Sprinter";
}

export function getPriceForRoute(route: TransferRoute, tier: PassengerTier, currency: Currency) {
  return route.prices[tier][currency];
}

export function getStartingPrice(route: TransferRoute, currency: Currency) {
  return Math.min(...passengerTiers.map((tier) => route.prices[tier][currency]));
}

export function formatTransferPrice(amount: number, currency: Currency) {
  return `${currencySymbols[currency]}${amount}`;
}

export function getRouteById(id: string) {
  return transferRoutes.find((route) => route.id === id);
}

export function getRouteBySlug(slug: string) {
  return transferRoutes.find((route) => route.slug === slug);
}

function getRouteSearchFields(route: TransferRoute) {
  const fields: Array<{ label: string; type: RouteMatchType }> = [
    { label: route.name, type: "route" },
    { label: route.shortName, type: "route" },
    ...route.destinations.map((label) => ({ label, type: "destination" as const })),
    ...route.hotels.map((label) => ({ label, type: "hotel" as const }))
  ];

  return fields;
}

export function findRouteMatchByHotelOrDestination(query: string): TransferRouteMatch | null {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return null;
  }

  const allMatches = transferRoutes.flatMap((route) =>
    getRouteSearchFields(route).map((field) => ({
      route,
      matchedLabel: field.label,
      matchType: field.type,
      normalizedLabel: normalizeSearchText(field.label)
    }))
  );

  const exactMatch = allMatches.find((item) => item.normalizedLabel === normalizedQuery);

  if (exactMatch) {
    return {
      route: exactMatch.route,
      matchedLabel: exactMatch.matchedLabel,
      matchType: exactMatch.matchType
    };
  }

  const partialMatch = allMatches.find(
    (item) => item.normalizedLabel.includes(normalizedQuery) || normalizedQuery.includes(item.normalizedLabel)
  );

  if (!partialMatch) {
    return null;
  }

  return {
    route: partialMatch.route,
    matchedLabel: partialMatch.matchedLabel,
    matchType: partialMatch.matchType
  };
}

export function findRouteByHotelOrDestination(query: string) {
  return findRouteMatchByHotelOrDestination(query)?.route ?? null;
}

export function getSearchOptions() {
  return transferRoutes.flatMap((route) => [
    route.name,
    route.shortName,
    ...route.destinations,
    ...route.hotels
  ]);
}

function buildGenericWhatsAppMessage() {
  return [
    "Hello Emirs Transfer,",
    "",
    "I would like to book a private VIP transfer from Dalaman Airport.",
    "",
    "Please help me confirm price and availability.",
    "",
    "Date:",
    "Flight Number:",
    "Hotel / Destination:",
    "Passengers:",
    "Name:"
  ].join("\n");
}

function buildRouteWhatsAppMessage(options: Required<Pick<WhatsAppBuildOptions, "route" | "tier" | "currency">> &
  Pick<WhatsAppBuildOptions, "destinationLabel">) {
  const { route, tier, currency, destinationLabel } = options;
  const destination = destinationLabel || route.name;
  const price = getPriceForRoute(route, tier, currency);

  return [
    "Hello Emirs Transfer,",
    "",
    "I would like to book a VIP airport transfer.",
    "",
    `Route: ${route.origin} to ${destination}`,
    `Region: ${route.name}`,
    `Passengers: ${passengerTierLabels[tier]}`,
    `Vehicle: ${getVehicleForPassengerTier(tier)}`,
    `Fixed Price: ${formatTransferPrice(price, currency)}`,
    "",
    "Date:",
    "Flight Number:",
    "Hotel:",
    "Name:"
  ].join("\n");
}

export function buildWhatsAppUrl(options: WhatsAppBuildOptions = {}) {
  const message =
    options.message ??
    (options.route && options.tier && options.currency
      ? buildRouteWhatsAppMessage({
          route: options.route,
          tier: options.tier,
          currency: options.currency,
          destinationLabel: options.destinationLabel
        })
      : buildGenericWhatsAppMessage());

  const baseUrl = WHATSAPP_PHONE ? `https://wa.me/${WHATSAPP_PHONE}` : "https://api.whatsapp.com/send";
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function isCurrency(value: string): value is Currency {
  return currencies.includes(value as Currency);
}

export function isPassengerTier(value: string): value is PassengerTier {
  return passengerTiers.includes(value as PassengerTier);
}
