import type { Metadata } from "next";
import { CtaBand } from "../../components/CtaBand";
import { FaqSection } from "../../components/FaqSection";
import { PageHero } from "../../components/PageHero";
import { PriceFinder } from "../../components/PriceFinder";
import { PriceOverviewTable } from "../../components/PriceOverviewTable";
import { RouteCard } from "../../components/RouteCard";
import { RouteHotelList } from "../../components/RouteHotelList";
import { SectionHeading } from "../../components/SectionHeading";
import { getRouteById } from "../../lib/transferPricing";
import { transferRoutes } from "../../lib/transferRoutes";

export const metadata: Metadata = {
  title: "Dalaman Airport Transfer Routes & Prices",
  description:
    "Check fixed VIP transfer prices from Dalaman Airport to Çalış, Fethiye, Ölüdeniz, Ovacık, Hisarönü, Faralya, Kabak, Göcek, Marmaris and İçmeler."
};

type RoutesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function RoutesPage({ searchParams }: RoutesPageProps) {
  const params = await searchParams;
  const requestedRoute = readParam(params, "route");
  const initialRouteId = getRouteById(requestedRoute)?.id ?? "oludeniz-hotels";

  return (
    <main>
      <PageHero
        eyebrow="Routes & Prices"
        title="Dalaman Airport VIP Transfer Routes & Prices"
        text="Check fixed private transfer prices from Dalaman Airport to popular hotels and regions including Fethiye, Çalış, Ölüdeniz, Ovacık, Hisarönü, Faralya, Kabak, Göcek, Marmaris and İçmeler."
      />

      <section className="section section-finder">
        <div className="container">
          <PriceFinder
            initialRouteId={initialRouteId}
            heading="Search fixed transfer prices"
            subheading="Choose a hotel, resort area, passenger tier and currency to see the correct Mercedes transfer price."
          />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <SectionHeading
            eyebrow="All Fixed Routes"
            title="Dalaman Airport route cards"
            text="Every card uses the same central pricing data as the search tool and WhatsApp booking messages."
          />
          <div className="route-grid">
            {transferRoutes.map((route) => (
              <RouteCard route={route} key={route.id} />
            ))}
          </div>
        </div>
      </section>

      <PriceOverviewTable allRoutes title="Full Pricing Table" text="Compare every fixed route by passenger tier." />
      <RouteHotelList />
      <FaqSection />
      <CtaBand />
    </main>
  );
}
