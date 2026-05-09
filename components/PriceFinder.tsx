"use client";

import { useId, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Plane, Search, Users } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
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

export function PriceFinder({ initialRouteId, initialQuery, heading, subheading }: PriceFinderProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.priceFinder;
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
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2 id="price-finder-title">{heading ?? copy.title}</h2>
        <p>{subheading ?? copy.text}</p>
      </div>

      <div className="price-finder-panel">
        <div className="finder-fields">
          <label className="finder-field finder-field-static">
            <span>{copy.fromLabel}</span>
            <strong>
              <Plane size={18} aria-hidden="true" />
              {dictionary.destinations["Dalaman Airport"]}
            </strong>
          </label>

          <label className="finder-field finder-field-search">
            <span>{copy.hotelLabel}</span>
            <div className="finder-input-shell">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={query}
                list={optionsId}
                placeholder={copy.hotelPlaceholder}
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
            <span>{copy.passengersLabel}</span>
            <div className="segmented-control" aria-label={copy.passengersLabel}>
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
            <span>{copy.currencyLabel}</span>
            <div className="segmented-control segmented-control-currency" aria-label={copy.currencyLabel}>
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
                <span>{isExample ? copy.exampleRoute : copy.selectedRoute}</span>
                <strong>
                  {activeRoute.origin}
                  <ArrowRight size={18} aria-hidden="true" />
                  {destinationLabel}
                </strong>
              </div>

              <div className="result-detail-grid">
                <span>{copy.region}</span>
                <strong>{activeRoute.name}</strong>
                <span>{copy.vehicle}</span>
                <strong>{vehicle}</strong>
                <span>{copy.passengersLabel}</span>
                <strong>{passengerTierLabels[tier]}</strong>
                <span>{copy.fixedPrice}</span>
                <strong className="result-price">{formatTransferPrice(price ?? 0, currency)}</strong>
              </div>
            </>
          ) : (
            <>
              <div className="result-route-line">
                <span>{copy.noFixedRouteMatched}</span>
                <strong>{destinationLabel || copy.unknownDestination}</strong>
              </div>
              <p className="empty-result-copy">{copy.emptyResultCopy}</p>
            </>
          )}

          <div className="finder-result-footer">
            <span>
              <CheckCircle2 size={16} aria-hidden="true" />
              {copy.noSurprise}
            </span>
            <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppBrandIcon />
              {copy.bookNow}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
