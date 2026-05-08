"use client";

import { useId, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Plane, Search, Users } from "lucide-react";
import {
  buildWhatsAppUrl,
  findRouteMatchByHotelOrDestination,
  formatTransferPrice,
  getPriceForRoute,
  getRouteById,
  getSearchOptions,
  getVehicleForPassengerTier,
  passengerTierLabels,
  type TransferRouteMatch
} from "../lib/transferPricing";
import { currencies, passengerTiers, transferRoutes, type Currency, type PassengerTier, type TransferRoute } from "../lib/transferRoutes";
import { WhatsAppBrandIcon } from "./WhatsAppBrandIcon";

type PriceFinderProps = {
  initialRouteId?: string;
  initialQuery?: string;
  heading?: string;
  subheading?: string;
};

const currencyLabels: Record<Currency, string> = {
  gbp: "GBP",
  eur: "EUR",
  usd: "USD"
};

function getDefaultRoute(initialRouteId?: string) {
  return getRouteById(initialRouteId || "oludeniz-hotels") ?? transferRoutes[0];
}

function getInitialQuery(route: TransferRoute, initialQuery?: string) {
  if (initialQuery) {
    return initialQuery;
  }

  return route.id === "oludeniz-hotels" ? "Liberty Lykia" : route.shortName;
}

export function PriceFinder({
  initialRouteId,
  initialQuery,
  heading = "Find Your Hotel Transfer Price",
  subheading = "Search by hotel or region and see the fixed private transfer price instantly."
}: PriceFinderProps) {
  const defaultRoute = useMemo(() => getDefaultRoute(initialRouteId), [initialRouteId]);
  const [query, setQuery] = useState(() => getInitialQuery(defaultRoute, initialQuery));
  const [tier, setTier] = useState<PassengerTier>("pax_1_5");
  const [currency, setCurrency] = useState<Currency>("gbp");
  const optionsId = useId();

  const searchOptions = useMemo(() => Array.from(new Set(getSearchOptions())).sort((a, b) => a.localeCompare(b)), []);
  const match = useMemo<TransferRouteMatch | null>(() => findRouteMatchByHotelOrDestination(query), [query]);
  const hasQuery = query.trim().length > 0;
  const activeRoute = match?.route ?? (!hasQuery ? defaultRoute : null);
  const destinationLabel = match?.matchedLabel ?? (!hasQuery ? getInitialQuery(defaultRoute, initialQuery) : query);
  const isExample = !match && !hasQuery;
  const price = activeRoute ? getPriceForRoute(activeRoute, tier, currency) : null;
  const vehicle = getVehicleForPassengerTier(tier);
  const whatsappUrl = activeRoute
    ? buildWhatsAppUrl({ route: activeRoute, destinationLabel, tier, currency })
    : buildWhatsAppUrl({
        message: [
          "Hello Emirs Transfer,",
          "",
          "I would like to confirm a VIP transfer price.",
          "",
          `Hotel / Destination: ${destinationLabel}`,
          `Passengers: ${passengerTierLabels[tier]}`,
          "Date:",
          "Flight Number:",
          "Name:"
        ].join("\n")
      });

  return (
    <section className="price-finder" id="price-finder" aria-labelledby="price-finder-title">
      <div className="price-finder-intro">
        <span className="eyebrow">Smart Price Finder</span>
        <h2 id="price-finder-title">{heading}</h2>
        <p>{subheading}</p>
      </div>

      <div className="price-finder-panel">
        <div className="finder-fields">
          <label className="finder-field finder-field-static">
            <span>From</span>
            <strong>
              <Plane size={18} aria-hidden="true" />
              Dalaman Airport
            </strong>
          </label>

          <label className="finder-field finder-field-search">
            <span>Hotel or Region</span>
            <div className="finder-input-shell">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={query}
                list={optionsId}
                placeholder="Search hotel or region"
                onChange={(event) => setQuery(event.target.value)}
              />
              <datalist id={optionsId}>
                {searchOptions.map((option) => (
                  <option value={option} key={option} />
                ))}
              </datalist>
            </div>
          </label>

          <div className="finder-field">
            <span>Passengers</span>
            <div className="segmented-control" aria-label="Passenger tier">
              {passengerTiers.map((passengerTier) => (
                <button
                  type="button"
                  className={tier === passengerTier ? "active" : ""}
                  key={passengerTier}
                  onClick={() => setTier(passengerTier)}
                >
                  <Users size={15} aria-hidden="true" />
                  {passengerTierLabels[passengerTier]}
                </button>
              ))}
            </div>
          </div>

          <div className="finder-field">
            <span>Currency</span>
            <div className="segmented-control segmented-control-currency" aria-label="Currency">
              {currencies.map((currencyOption) => (
                <button
                  type="button"
                  className={currency === currencyOption ? "active" : ""}
                  key={currencyOption}
                  onClick={() => setCurrency(currencyOption)}
                >
                  {currencyLabels[currencyOption]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <article className={activeRoute ? "finder-result" : "finder-result finder-result-empty"} aria-live="polite">
          {activeRoute ? (
            <>
              <div className="result-route-line">
                <span>{isExample ? "Example route" : "Selected route"}</span>
                <strong>
                  {activeRoute.origin}
                  <ArrowRight size={18} aria-hidden="true" />
                  {destinationLabel}
                </strong>
              </div>

              <div className="result-detail-grid">
                <span>Region</span>
                <strong>{activeRoute.name}</strong>
                <span>Vehicle</span>
                <strong>{vehicle}</strong>
                <span>Passengers</span>
                <strong>{passengerTierLabels[tier]}</strong>
                <span>Fixed price</span>
                <strong className="result-price">{formatTransferPrice(price ?? 0, currency)}</strong>
              </div>
            </>
          ) : (
            <>
              <div className="result-route-line">
                <span>No fixed route matched</span>
                <strong>{destinationLabel || "Unknown destination"}</strong>
              </div>
              <p className="empty-result-copy">
                Send your hotel or destination on WhatsApp and we will confirm the exact private transfer price.
              </p>
            </>
          )}

          <div className="finder-result-footer">
            <span>
              <CheckCircle2 size={16} aria-hidden="true" />
              No taxi meter, no surprise charges.
            </span>
            <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppBrandIcon />
              Book Now on WhatsApp
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
