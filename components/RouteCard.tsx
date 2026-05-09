"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { useI18n } from "../lib/i18n/useI18n";
import { type Currency, type TransferRoute } from "../lib/transferRoutes";
import { formatTransferPrice, getStartingPrice } from "../lib/transferPricing";

type RouteCardProps = {
  route: TransferRoute;
  currency?: Currency;
};

export function RouteCard({ route, currency = "gbp" }: RouteCardProps) {
  const { dictionary, t } = useI18n();
  const copy = dictionary.site.routeCard;

  return (
    <article className="route-card">
      <div className="route-card-icon">
        <MapPin size={20} aria-hidden="true" />
      </div>
      <div>
        <span className="route-card-kicker">{route.origin}</span>
        <h3>{route.name}</h3>
        <p>{route.destinations.join(" / ")}</p>
      </div>
      <div className="route-card-footer">
        <strong>
          {copy.from} {formatTransferPrice(getStartingPrice(route, currency), currency)}
        </strong>
        <a href={`/routes?route=${route.id}#price-finder`} aria-label={t("site.routeCard.checkRouteAria", { route: route.name })}>
          {copy.checkRoute}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
