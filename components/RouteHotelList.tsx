"use client";

import { useI18n } from "../lib/i18n/useI18n";
import { transferRoutes } from "../lib/transferRoutes";
import { SectionHeading } from "./SectionHeading";

export function RouteHotelList() {
  const { dictionary } = useI18n();
  const copy = dictionary.site.routeHotels;

  return (
    <section className="section section-white">
      <div className="container">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
        <div className="hotel-region-grid">
          {transferRoutes.map((route) => (
            <article className="hotel-region-card" key={route.id}>
              <h3>{route.name}</h3>
              <p>{route.destinations.join(" / ")}</p>
              {route.hotels.length > 0 ? (
                <ul>
                  {route.hotels.map((hotel) => (
                    <li key={hotel}>{hotel}</li>
                  ))}
                </ul>
              ) : (
                <p className="hotel-empty">{copy.empty}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
