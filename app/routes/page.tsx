import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Car } from "lucide-react";
import { hotelTransferRoutes } from "../../lib/hotelTransferRoutes";
import { RoutesFooter, RoutesHeader } from "./RoutesChrome";

export const metadata: Metadata = {
  title: "Dalaman Airport Hotel Transfer Routes | Emirs Transfer",
  description:
    "Browse fixed-price private Dalaman Airport hotel transfer routes with Mercedes Vito and Sprinter options from Emirs Transfer."
};

function formatHotelCount(count: number) {
  return `${count} ${count === 1 ? "hotel" : "hotels"}`;
}

export default function RoutesPage() {
  return (
    <div className="services-page routes-index-page">
      <RoutesHeader />

      <main>
        <section className="services-page-hero routes-index-hero">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Fixed hotel transfer routes</span>
              <h1>Dalaman Airport Hotel Transfer Routes</h1>
              <p>
                Private fixed-price transfers from Dalaman Airport to selected hotel regions with Mercedes Vito and
                Mercedes Sprinter options.
              </p>
            </div>

            <div className="route-grid routes-index-grid">
              {hotelTransferRoutes.map((route) => (
                <Link className="route-card route-index-card" href={`/routes/${route.slug}`} key={route.id}>
                  <div>
                    <span className="route-label">{route.regionName}</span>
                    <h2>{route.title}</h2>
                    <p>{route.description}</p>
                  </div>
                  <div className="route-meta">
                    <span>
                      <Car size={16} aria-hidden="true" />
                      Mercedes Vito & Sprinter
                    </span>
                    <span>
                      <Building2 size={16} aria-hidden="true" />
                      {formatHotelCount(route.hotels.length)}
                    </span>
                  </div>
                  <div className="route-footer">
                    <strong>From £{route.prices[0]?.gbp}</strong>
                    <span>View details</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <RoutesFooter />
    </div>
  );
}
