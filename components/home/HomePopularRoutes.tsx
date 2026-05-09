"use client";

import Image from "next/image";
import { useI18n } from "../../lib/i18n/useI18n";
import { formatTransferPrice, getStartingPrice } from "../../lib/transferPricing";
import { type TransferRoute } from "../../lib/transferRoutes";
import { getHomeRouteName, homePopularRoutes, homeRouteIcons } from "./homeData";

type HomePopularRoutesProps = {
  onSelectRoute: (routeId: string) => void;
};

function selectRoute(route: TransferRoute, onSelectRoute: (routeId: string) => void) {
  onSelectRoute(route.id);
  window.requestAnimationFrame(() => {
    document.getElementById("price-finder")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

export function HomePopularRoutes({ onSelectRoute }: HomePopularRoutesProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.site.home.popularRoutes;
  const routeNames = dictionary.site.routeNames as Record<string, string>;

  return (
    <section className="home-routes-section">
      <div className="container">
        <div className="home-section-title">
          <span aria-hidden="true" />
          <h2>{copy.title}</h2>
          <span aria-hidden="true" />
        </div>

        <div className="home-route-strip">
          {homePopularRoutes.map((route) => (
            <button className="home-route-card" type="button" key={route.id} onClick={() => selectRoute(route, onSelectRoute)}>
              <Image src={homeRouteIcons[route.id]} alt="" aria-hidden="true" width={78} height={43} />
              <strong>{getHomeRouteName(routeNames, route)}</strong>
              <span>
                {dictionary.site.common.from} <b>{formatTransferPrice(getStartingPrice(route, "gbp"), "gbp")}</b>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
