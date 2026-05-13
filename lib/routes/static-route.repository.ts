import { getLocationById as getStaticLocationById, selectableLocations } from "../../data/locations";
import { hotelTransferRoutesData } from "../../data/routes";
import { services } from "../../data/services";
import { getPriceProfileById } from "../pricing/static-pricing.repository";
import type { Location, Service, StaticTransferRoute, TransferRoute, TransferRouteMatch } from "./route.types";

function hydrateRoute(route: StaticTransferRoute): TransferRoute {
  return {
    ...route,
    prices: getPriceProfileById(route.priceProfileId)?.tiers ?? []
  };
}

export function listLocations(): Location[] {
  return selectableLocations;
}

export function getLocationById(locationId: string) {
  return getStaticLocationById(locationId);
}

export function listServices(): Service[] {
  return services;
}

export function listHotelTransferRoutes(): TransferRoute[] {
  return hotelTransferRoutesData.map(hydrateRoute);
}

export function getHotelTransferRouteBySlug(slug: string) {
  return listHotelTransferRoutes().find((route) => route.slug === slug);
}

export function getAllHotelTransferRouteSlugs() {
  return hotelTransferRoutesData.map((route) => route.slug);
}

export function normalizeRouteSearchValue(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const hotelSearchStopWords = new Set(["hotel", "hotels", "otel", "oteli", "otelleri", "resort", "resorts"]);

function removeSearchStopWords(value: string) {
  const meaningfulTokens = value.split(" ").filter((token) => token && !hotelSearchStopWords.has(token));
  return meaningfulTokens.join(" ").trim();
}

function isNormalizedSearchMatch(query: string, target: string) {
  if (!query || !target) {
    return false;
  }

  const searchableQuery = removeSearchStopWords(query) || query;
  const searchableTarget = removeSearchStopWords(target) || target;

  if (searchableTarget.includes(searchableQuery)) {
    return true;
  }

  const queryTokens = searchableQuery.split(" ").filter(Boolean);
  return queryTokens.length > 0 && queryTokens.every((token) => searchableTarget.includes(token));
}

function normalizeHotelName(hotelName: string) {
  return normalizeRouteSearchValue(hotelName);
}

function getRouteSearchText(route: TransferRoute) {
  return normalizeRouteSearchValue([route.title, route.regionName, route.origin, route.destination, route.slug].join(" "));
}

export function findHotelTransferRouteMatchByHotelName(hotelName: string): TransferRouteMatch | undefined {
  const normalizedHotelName = normalizeRouteSearchValue(hotelName);

  if (!normalizedHotelName) {
    return undefined;
  }

  for (const route of listHotelTransferRoutes()) {
    const hotel = route.hotels.find((hotelNameOption) =>
      isNormalizedSearchMatch(normalizedHotelName, normalizeHotelName(hotelNameOption))
    );

    if (hotel) {
      return {
        hotelName: hotel,
        route,
        matchType: "hotel"
      };
    }
  }

  return undefined;
}

export function searchHotelTransferRoutes(searchValue: string, limit = 6): TransferRouteMatch[] {
  const normalizedSearchValue = normalizeRouteSearchValue(searchValue);

  if (!normalizedSearchValue) {
    return [];
  }

  const matches: TransferRouteMatch[] = [];
  const routes = listHotelTransferRoutes();

  for (const route of routes) {
    for (const hotelName of route.hotels) {
      if (isNormalizedSearchMatch(normalizedSearchValue, normalizeHotelName(hotelName))) {
        matches.push({
          hotelName,
          route,
          matchType: "hotel"
        });

        if (matches.length >= limit) {
          return matches;
        }
      }
    }
  }

  for (const route of routes) {
    if (matches.some((match) => match.route.id === route.id)) {
      continue;
    }

    if (isNormalizedSearchMatch(normalizedSearchValue, getRouteSearchText(route))) {
      matches.push({
        route,
        matchType: "route"
      });

      if (matches.length >= limit) {
        return matches;
      }
    }
  }

  return matches;
}

export function findHotelTransferRouteMatch(searchValue: string): TransferRouteMatch | undefined {
  return searchHotelTransferRoutes(searchValue, 1)[0];
}
