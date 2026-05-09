"use client";

import { useI18n } from "../lib/i18n/useI18n";
import { popularRouteIds, transferRoutes } from "../lib/transferRoutes";
import { SectionHeading } from "./SectionHeading";
import { RouteCard } from "./RouteCard";

export function PopularRoutes() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.home.popularRoutes;
  const routes = popularRouteIds
    .map((id) => transferRoutes.find((route) => route.id === id))
    .filter((route): route is (typeof transferRoutes)[number] => Boolean(route));

  return (
    <section className="section section-ivory" id="popular-routes">
      <div className="container">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
        <div className="route-grid">
          {routes.map((route) => (
            <RouteCard route={route} key={route.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
