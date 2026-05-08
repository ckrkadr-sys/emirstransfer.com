import { ArrowRight, MapPin } from "lucide-react";
import { type Currency, type TransferRoute } from "../lib/transferRoutes";
import { formatTransferPrice, getStartingPrice } from "../lib/transferPricing";

type RouteCardProps = {
  route: TransferRoute;
  currency?: Currency;
};

export function RouteCard({ route, currency = "gbp" }: RouteCardProps) {
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
        <strong>from {formatTransferPrice(getStartingPrice(route, currency), currency)}</strong>
        <a href={`/routes?route=${route.id}#price-finder`} aria-label={`Check prices for ${route.name}`}>
          Check route
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
