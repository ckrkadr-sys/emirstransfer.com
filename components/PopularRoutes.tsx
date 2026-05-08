import { popularRouteIds, transferRoutes } from "../lib/transferRoutes";
import { SectionHeading } from "./SectionHeading";
import { RouteCard } from "./RouteCard";

export function PopularRoutes() {
  const routes = popularRouteIds
    .map((id) => transferRoutes.find((route) => route.id === id))
    .filter((route): route is (typeof transferRoutes)[number] => Boolean(route));

  return (
    <section className="section section-ivory" id="popular-routes">
      <div className="container">
        <SectionHeading
          eyebrow="Popular Routes"
          title="Popular Routes from Dalaman Airport"
          text="The most requested fixed-price VIP routes for hotels, beaches, marinas and resort areas."
        />
        <div className="route-grid">
          {routes.map((route) => (
            <RouteCard route={route} key={route.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
