import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import {
  getAllHotelTransferRouteSlugs,
  getHotelTransferRouteBySlug,
  type HotelTransferRoute
} from "../../../lib/hotelTransferRoutes";
import { createWhatsAppLink } from "../../../lib/whatsapp";
import { RoutesFooter, RoutesHeader } from "../RoutesChrome";

type RouteDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function createRouteWhatsAppMessage(route: HotelTransferRoute) {
  return [
    "Hello, I would like to book a transfer.",
    `Route: ${route.title}`,
    `Region: ${route.regionName}`,
    "Passengers:",
    "Date:",
    "Flight Number:",
    "Hotel:"
  ].join("\n");
}

function getMetadataDescription(route: HotelTransferRoute) {
  return `${route.description} Fixed prices for private Mercedes Vito and Sprinter transfers from Dalaman Airport.`;
}

function formatPrice(symbol: "£" | "€" | "$", amount: number) {
  return `${symbol}${amount}`;
}

export function generateStaticParams() {
  return getAllHotelTransferRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getHotelTransferRouteBySlug(slug);

  if (!route) {
    return {
      title: "Transfer Route Not Found | Emirs Transfer"
    };
  }

  return {
    title: `${route.title} | Emirs Transfer`,
    description: getMetadataDescription(route)
  };
}

export default async function RouteDetailPage({ params }: RouteDetailPageProps) {
  const { slug } = await params;
  const route = getHotelTransferRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const whatsappUrl = createWhatsAppLink(createRouteWhatsAppMessage(route));

  return (
    <div className="route-detail-page">
      <RoutesHeader />

      <main>
        <section className="route-detail-hero">
          <div className="container">
            <span className="eyebrow">{route.regionName}</span>
            <h1>{route.title}</h1>
            <p>{route.description}</p>
            <div className="route-detail-route-line">
              <span>{route.origin}</span>
              <span aria-hidden="true">→</span>
              <span>{route.destination}</span>
            </div>
          </div>
        </section>

        <section className="section route-detail-content">
          <div className="container route-detail-grid">
            <div className="route-detail-stack">
              <section className="route-detail-panel" aria-labelledby="route-prices">
                <div className="route-detail-section-head">
                  <span className="route-label">Fixed prices</span>
                  <h2 id="route-prices">Transfer prices</h2>
                </div>

                <div className="route-price-table-wrap">
                  <table className="route-price-table">
                    <thead>
                      <tr>
                        <th scope="col">Passengers</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">GBP</th>
                        <th scope="col">EUR</th>
                        <th scope="col">USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {route.prices.map((price) => (
                        <tr key={`${route.id}-${price.pax}`}>
                          <td>{price.pax}</td>
                          <td>{price.vehicle}</td>
                          <td>{formatPrice("£", price.gbp)}</td>
                          <td>{formatPrice("€", price.eur)}</td>
                          <td>{formatPrice("$", price.usd)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="route-detail-panel" aria-labelledby="covered-hotels">
                <div className="route-detail-section-head">
                  <span className="route-label">Hotel coverage</span>
                  <h2 id="covered-hotels">Covered Hotels</h2>
                </div>

                {route.hotels.length > 0 ? (
                  <ul className="covered-hotels-grid">
                    {route.hotels.map((hotel) => (
                      <li key={hotel}>{hotel}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="route-empty-hotels">
                    Hotel list coming soon. Please contact us on WhatsApp for your hotel.
                  </p>
                )}
              </section>
            </div>

            <aside className="route-detail-cta" aria-labelledby="route-booking">
              <span className="eyebrow">Private transfer</span>
              <h2 id="route-booking">Book this transfer on WhatsApp</h2>
              <p>
                Share your passenger count, arrival date, flight number and hotel name. We will confirm the fixed price
                and vehicle option for your transfer.
              </p>
              <a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} aria-hidden="true" />
                Book on WhatsApp
              </a>
              <Link className="route-detail-secondary-link" href="/routes">
                View all transfer routes
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <RoutesFooter />
    </div>
  );
}
