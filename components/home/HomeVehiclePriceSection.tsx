"use client";

import Image from "next/image";
import { useI18n } from "../../lib/i18n/useI18n";
import { formatTransferPrice, getPriceForRoute } from "../../lib/transferPricing";
import { passengerTiers } from "../../lib/transferRoutes";
import { getHomeRouteName, homeOverviewRoutes } from "./homeData";

const vehicleImages = ["/images/minibus-city-tour-sprinter.png", "/images/mercedes-benz-sprinter-fleet.png"];

export function HomeVehiclePriceSection() {
  const { dictionary } = useI18n();
  const vehicleCopy = dictionary.site.vehicles;
  const priceCopy = dictionary.site.priceOverview;
  const routeNames = dictionary.site.routeNames as Record<string, string>;

  return (
    <section className="home-vehicle-price-section">
      <div className="container home-vehicle-price-grid">
        <div>
          <div className="home-section-title home-section-title-compact">
            <span aria-hidden="true" />
            <h2>{vehicleCopy.title}</h2>
            <span aria-hidden="true" />
          </div>

          <div className="home-vehicle-cards">
            {vehicleCopy.items.map((vehicle, index) => (
              <article className="home-vehicle-card" key={vehicle.name}>
                <div className="home-vehicle-image">
                  <Image
                    src={vehicleImages[index] ?? vehicleImages[0]}
                    alt={vehicle.alt}
                    fill
                    sizes="(max-width: 760px) 88vw, 260px"
                  />
                </div>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.passengers}</p>
                {index === 1 && <small>{vehicle.description}</small>}
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="home-section-title home-section-title-compact">
            <span aria-hidden="true" />
            <h2>{priceCopy.title}</h2>
            <span aria-hidden="true" />
          </div>

          <div className="home-price-table-shell">
            <table className="home-price-table">
              <thead>
                <tr>
                  <th scope="col">{priceCopy.route}</th>
                  {passengerTiers.map((tier) => (
                    <th scope="col" key={tier}>
                      {priceCopy.columns[tier]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {homeOverviewRoutes.map((route) => (
                  <tr key={route.id}>
                    <th scope="row">{getHomeRouteName(routeNames, route)}</th>
                    {passengerTiers.map((tier) => (
                      <td key={tier}>{formatTransferPrice(getPriceForRoute(route, tier, "gbp"), "gbp")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
