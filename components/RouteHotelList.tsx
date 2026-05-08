import { transferRoutes } from "../lib/transferRoutes";
import { SectionHeading } from "./SectionHeading";

export function RouteHotelList() {
  return (
    <section className="section section-white">
      <div className="container">
        <SectionHeading
          eyebrow="Hotel Coverage"
          title="Hotel lists grouped by region"
          text="Search by hotel in the price finder, or browse the fixed-price zones below."
        />
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
                <p className="hotel-empty">Hotel list coming soon. Search Marmaris or İçmeler to use this fixed route.</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
