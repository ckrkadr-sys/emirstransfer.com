"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Car, ChevronDown, MapPin, Search, ShieldCheck, Users } from "lucide-react";
import { useI18n } from "../../lib/i18n/useI18n";
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
} from "../../lib/transferPricing";
import { currencies, passengerTiers, transferRoutes, type Currency, type PassengerTier, type TransferRoute } from "../../lib/transferRoutes";
import { WhatsAppBrandIcon } from "../WhatsAppBrandIcon";
import { getHomeRouteName } from "./homeData";

type HomePriceFinderProps = {
  selectedRouteId?: string;
};

const currencyLabels: Record<Currency, string> = {
  gbp: "GBP",
  eur: "EUR",
  usd: "USD"
};

function getDefaultRoute(routeId?: string) {
  return getRouteById(routeId || "oludeniz-hotels") ?? transferRoutes[0];
}

function getInitialQuery(route: TransferRoute) {
  return route.id === "oludeniz-hotels" ? "Liberty Lykia" : route.shortName;
}

export function HomePriceFinder({ selectedRouteId }: HomePriceFinderProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.priceFinder;
  const routeNames = dictionary.site.routeNames as Record<string, string>;
  const defaultRoute = useMemo(() => getDefaultRoute(selectedRouteId), [selectedRouteId]);
  const [query, setQuery] = useState(() => getInitialQuery(defaultRoute));
  const [tier, setTier] = useState<PassengerTier>("pax_1_5");
  const [currency, setCurrency] = useState<Currency>("gbp");
  const optionsId = useId();

  useEffect(() => {
    if (!selectedRouteId) {
      return;
    }

    const route = getRouteById(selectedRouteId);
    if (route) {
      setQuery(route.hotels[0] ?? route.shortName);
    }
  }, [selectedRouteId]);

  const searchOptions = useMemo(() => Array.from(new Set(getSearchOptions())).sort((a, b) => a.localeCompare(b)), []);
  const match = useMemo<TransferRouteMatch | null>(() => findRouteMatchByHotelOrDestination(query), [query]);
  const hasQuery = query.trim().length > 0;
  const activeRoute = match?.route ?? (!hasQuery ? defaultRoute : null);
  const destinationLabel = match?.matchedLabel ?? (!hasQuery ? getInitialQuery(defaultRoute) : query);
  const price = activeRoute ? getPriceForRoute(activeRoute, tier, currency) : null;
  const vehicle = getVehicleForPassengerTier(tier);
  const activeRegion = activeRoute ? getHomeRouteName(routeNames, activeRoute) : copy.unknownDestination;
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
    <section className="home-finder-section" id="price-finder" aria-labelledby="home-price-finder-title">
      <div className="container">
        <div className="home-price-finder">
          <div className="home-finder-form">
            <h2 id="home-price-finder-title">{copy.title}</h2>

            <div className="home-finder-grid">
              <label className="home-field">
                <span>{copy.fromLabel}</span>
                <strong className="home-select-static">
                  {dictionary.destinations["Dalaman Airport"]}
                  <ChevronDown size={16} aria-hidden="true" />
                </strong>
              </label>

              <label className="home-field">
                <span>{copy.hotelLabel}</span>
                <div className="home-search-field">
                  <Search size={17} aria-hidden="true" />
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

              <div className="home-field">
                <span>{copy.passengersLabel}</span>
                <div className="home-pill-group" aria-label={copy.passengersLabel}>
                  {passengerTiers.map((passengerTier) => (
                    <button
                      type="button"
                      className={tier === passengerTier ? "active" : ""}
                      key={passengerTier}
                      onClick={() => setTier(passengerTier)}
                    >
                      {passengerTierLabels[passengerTier]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="home-field">
                <span>{copy.currencyLabel}</span>
                <div className="home-pill-group" aria-label={copy.currencyLabel}>
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

            <p className="home-finder-note">
              <ShieldCheck size={18} aria-hidden="true" />
              {copy.noSurprise}
            </p>
          </div>

          <article className="home-result-card" aria-live="polite">
            {activeRoute ? (
              <>
                <h3>
                  {activeRoute.origin}
                  <span aria-hidden="true">→</span>
                  {destinationLabel}
                </h3>
                <dl>
                  <div>
                    <dt>
                      <MapPin size={16} aria-hidden="true" />
                      {copy.region}
                    </dt>
                    <dd>{activeRegion}</dd>
                  </div>
                  <div>
                    <dt>
                      <Car size={16} aria-hidden="true" />
                      {copy.vehicle}
                    </dt>
                    <dd>{vehicle}</dd>
                  </div>
                  <div>
                    <dt>
                      <Users size={16} aria-hidden="true" />
                      {copy.passengersLabel}
                    </dt>
                    <dd>{passengerTierLabels[tier]}</dd>
                  </div>
                </dl>
                <div className="home-result-price-row">
                  <span>{copy.fixedPrice}</span>
                  <strong>{formatTransferPrice(price ?? 0, currency)}</strong>
                </div>
              </>
            ) : (
              <>
                <h3>{copy.noFixedRouteMatched}</h3>
                <p>{copy.emptyResultCopy}</p>
              </>
            )}

            <a className="home-btn home-btn-gold home-result-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppBrandIcon />
              {copy.bookNow}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
